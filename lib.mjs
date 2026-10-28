export const themes = ["forest", "cobalt", "ivory"];
const clean = (v, max = 500) => typeof v === "string" ? v.trim().slice(0, max) : "";
export function webUrl(value) {
  if (!value) return "";
  try { const u = new URL(value); return ["https:", "http:"].includes(u.protocol) && !u.username && !u.password ? u.href : ""; } catch { return ""; }
}
export function mediaPath(value) {
  const s = clean(value, 300);
  if (!s) return "";
  if (webUrl(s)) return s;
  return /^assets\/[a-zA-Z0-9_./-]+$/.test(s) && !s.split("/").includes("..") ? s : "";
}
export function validateCard(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("Choose a card JSON file exported by this kit.");
  if (!clean(raw.name, 100)) throw new Error("Add a name for your card.");
  if (!themes.includes(raw.theme)) throw new Error("Choose Forest, Cobalt or Ivory as your theme.");
  const email = clean(raw.email, 160);
  if (email && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) throw new Error("Check the email address.");
  const phone = clean(raw.phone, 40);
  if (phone && !/^\+?[\d\s().-]{3,40}$/.test(phone)) throw new Error("Use a phone number with its country code, or leave it blank.");
  const messagePhone = clean(raw.messagePhone, 40);
  if (messagePhone && !/^\+?[\d\s().-]{3,40}$/.test(messagePhone)) throw new Error("Check the message number, or leave it blank to use the call number.");
  const url = clean(raw.publicUrl, 400);
  if (url && !webUrl(url)) throw new Error("The published card link must start with https:// or http://.");
  for (const key of ["photo", "video"]) if (raw[key] && !mediaPath(raw[key])) throw new Error(`Use an assets/ file path or a full web address for ${key}.`);
  const projects = Array.isArray(raw.projects) ? raw.projects.slice(0, 8).map((p, i) => {
    if (!p || typeof p !== "object") throw new Error(`Check project ${i + 1}.`);
    const title = clean(p.title, 100); const link = clean(p.url, 400);
    if (!title) throw new Error(`Give project ${i + 1} a title.`);
    if (!webUrl(link)) throw new Error(`Give project ${i + 1} a full https:// or http:// link.`);
    return { id: `project-${i + 1}`, title, description: clean(p.description, 180), url: webUrl(link) };
  }) : [];
  return {
    version: 1, theme: raw.theme, name: clean(raw.name, 100), role: clean(raw.role, 160), location: clean(raw.location, 100),
    initials: clean(raw.initials, 4) || clean(raw.name).split(/\s+/).slice(0, 2).map(x => x[0]).join(""),
    eyebrow: clean(raw.eyebrow, 100), bio: clean(raw.bio, 350), email, phone, messagePhone,
    messageChannel: raw.messageChannel === "whatsapp" ? "whatsapp" : "sms",
    photo: mediaPath(raw.photo), video: mediaPath(raw.video), videoAutoplay: raw.videoAutoplay === true, publicUrl: webUrl(url),
    badges: Array.isArray(raw.badges) ? raw.badges.map(x => clean(x, 40)).filter(Boolean).slice(0, 4) : [],
    sideLabel: clean(raw.sideLabel, 100), headline: clean(raw.headline, 160), intro: clean(raw.intro, 500),
    example: raw.example === true, projects
  };
}
export function contactActions(card) {
  const number = value => String(value || "").replace(/[^+\d]/g, "");
  const isDemo = value => /^\+447700900\d{3}$/.test(number(value));
  const phone = number(card.phone), message = number(card.messagePhone || card.phone);
  return [
    { label: "Email", href: card.email ? `mailto:${card.email}` : "", demo: /@example\.com$/i.test(card.email || "") },
    { label: "Call", href: phone ? `tel:${phone}` : "", demo: isDemo(phone) },
    { label: "Message", href: !message ? "" : card.messageChannel === "whatsapp" ? `https://wa.me/${message.replace(/\D/g, "")}` : `sms:${message}`, demo: isDemo(message) }
  ].filter(action => action.href);
}
export function cardUrl(card, location, example = "") {
  if (card.publicUrl) return card.publicUrl;
  const url = new URL(location.href); url.search = ""; url.hash = "";
  if (example) url.searchParams.set("example", example);
  return url.href;
}
export const vEscape = value => String(value || "").replace(/\\/g, "\\\\").replace(/\r\n|\r|\n/g, "\\n").replace(/;/g, "\\;").replace(/,/g, "\\,");
function fold(line) {
  const encoder = new TextEncoder(); let out = "", part = "", bytes = 0;
  for (const c of line) { const n = encoder.encode(c).length; if (bytes + n > 75) { out += part + "\r\n"; part = " "; bytes = 1; } part += c; bytes += n; }
  return out + part;
}
export function vcard(card, url) {
  const lines = ["BEGIN:VCARD", "VERSION:3.0", `FN:${vEscape(card.name)}`, `N:;${vEscape(card.name)};;;`, `TITLE:${vEscape(card.role)}`];
  if (card.email) lines.push(`EMAIL;TYPE=INTERNET:${vEscape(card.email)}`);
  if (card.phone) lines.push(`TEL;TYPE=CELL:${card.phone.replace(/[^+\d]/g, "")}`);
  if (webUrl(url)) lines.push(`URL:${vEscape(url)}`);
  if (card.bio) lines.push(`NOTE:${vEscape(card.bio)}`);
  lines.push("END:VCARD"); return lines.map(fold).join("\r\n") + "\r\n";
}
export function download(text, filename, type) {
  const href = URL.createObjectURL(new Blob([text], { type })); const a = document.createElement("a");
  a.href = href; a.download = filename; a.click(); setTimeout(() => URL.revokeObjectURL(href), 1000);
}
export function slug(name) { return name.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "my-card"; }
