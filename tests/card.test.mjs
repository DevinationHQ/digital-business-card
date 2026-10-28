import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { validateCard, cardUrl, vcard, webUrl, mediaPath, contactActions } from '../lib.mjs';
import { create } from '../vendor/qr.mjs';
const example = JSON.parse(await readFile(new URL('../data/examples/theo.json', import.meta.url)));
test('approved showcase and fictional profiles all use demo contacts and include videos', async () => {
  for (const file of ['card.json', 'examples/theo.json', 'examples/mira.json', 'examples/founder.json']) {
    const card = validateCard(JSON.parse(await readFile(new URL('../data/' + file, import.meta.url))));
    assert.equal(card.example, file !== 'examples/founder.json'); assert.match(card.email, /@example\.com$/); assert.match(card.phone, /^\+447700900\d{3}$/);
    assert.equal(contactActions(card).length,3); assert.ok(contactActions(card).every(action=>action.demo));
    assert.equal(Boolean(card.video),true);
  }
});
test('real customised contact fields produce call and message routes, with WhatsApp optional', () => {
  const card = validateCard({...example,email:'maker@example.org',phone:'+44 117 496 0123',messagePhone:'+44 117 496 0124',messageChannel:'sms'});
  assert.equal(contactActions(card).find(x=>x.label==='Call').href,'tel:+441174960123');
  assert.equal(contactActions(card).find(x=>x.label==='Message').href,'sms:+441174960124');
  assert.equal(contactActions({...card,messageChannel:'whatsapp'}).find(x=>x.label==='Message').href,'https://wa.me/441174960124');
  assert.throws(()=>validateCard({...card,messagePhone:'javascript:alert(1)'}));
});
test('import rejects executable links and traversal in media paths', () => {
  assert.equal(webUrl('javascript:alert(1)'), ''); assert.equal(webUrl('https://name:secret@example.com'), '');
  assert.equal(mediaPath('assets/../private.jpg'), ''); assert.equal(mediaPath('data:image/svg+xml,bad'), '');
  assert.throws(() => validateCard({ ...example, projects: [{ title: 'bad', url: 'javascript:alert(1)' }] }));
  assert.throws(() => validateCard({ ...example, email: 'hello@example.com\r\nINJECT:yes' }));
});
test('sharing keeps a GitHub project subpath and only the selected public example', () => {
  assert.equal(cardUrl(example, { href: 'https://someone.github.io/my-card/index.html?preview=1#x' }, 'mira'), 'https://someone.github.io/my-card/index.html?example=mira');
  assert.equal(cardUrl(example, { href: 'https://someone.github.io/my-card/' }, 'founder'), 'https://someone.github.io/my-card/?example=founder');
  assert.equal(cardUrl({ ...example, publicUrl: 'https://my.example/card/' }, { href: 'http://127.0.0.1/' }), 'https://my.example/card/');
});
test('contact files preserve Unicode and escape injected vCard content', () => {
  const card = validateCard({ ...example, name: 'Zoë, 王', bio: 'Line one\nEND:VCARD;another\\note' });
  const text = vcard(card, 'https://example.com/my-card/');
  assert.ok(text.includes('FN:Zoë\\, 王')); assert.ok(text.includes('Line one\\nEND:VCARD\\;another\\\\note'));
  assert.equal(text.split('\r\n').filter(line => line === 'END:VCARD').length, 1);
  assert.ok(text.endsWith('END:VCARD\r\n'));
  const long = vcard({ ...card, bio: '王'.repeat(200) }, 'https://example.com');
  for (const line of long.split('\r\n')) assert.ok(new TextEncoder().encode(line).length <= 75);
});
test('bundled QR encoder produces a matrix for a published project URL', () => {
  const qr = create('https://someone.github.io/my-card/?example=mira', { errorCorrectionLevel: 'M' });
  assert.ok(qr.modules.size >= 21); assert.equal(qr.modules.data.length, qr.modules.size ** 2);
});
