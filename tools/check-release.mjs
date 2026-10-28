import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateCard } from '../lib.mjs';

// Check the files users actually receive, including project-site relative links.
export async function checkRelease(directory) {
  const root = resolve(directory), failures = [];
  async function exists(from, target) {
    if (!target || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(target)) return;
    const clean = target.split(/[?#]/)[0];
    if (!clean) return;
    const file = resolve(dirname(from), clean);
    if (clean.startsWith('/') || relative(root, file).split(sep).includes('..')) {
      failures.push(`${relative(root, from)}: use a project-relative path: ${target}`); return;
    }
    try { await stat(file); } catch { failures.push(`${relative(root, from)}: missing ${target}`); }
  }
  async function walk(folder) {
    for (const entry of await readdir(folder, { withFileTypes: true })) {
      const file = resolve(folder, entry.name);
      if (entry.isDirectory()) { await walk(file); continue; }
      if (/\.html$/.test(file)) {
        const html = await readFile(file, 'utf8');
        for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) await exists(file, match[1]);
      }
      if (/\.md$/.test(file)) {
        const markdown = await readFile(file, 'utf8');
        for (const match of markdown.matchAll(/\]\(([^\s)]+)\)/g)) await exists(file, match[1]);
      }
    }
  }
  await walk(root);
  const profiles = [resolve(root, 'data/card.json'), ...(await readdir(resolve(root, 'data/examples'))).filter(x => x.endsWith('.json')).map(x => resolve(root, 'data/examples', x))];
  for (const file of profiles) {
    const card = validateCard(JSON.parse(await readFile(file, 'utf8')));
    for (const key of ['photo', 'video']) await exists(resolve(root, 'index.html'), card[key]);
  }
  if (failures.length) throw new Error(`Release files are incomplete:\n${failures.join('\n')}`);
  return profiles.length;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const count = await checkRelease(process.argv[2] || new URL('../dist/', import.meta.url).pathname);
  console.log(`Release links and local media checked for ${count} profiles.`);
}
