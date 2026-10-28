import { validateCard, cardUrl, vcard, download, slug, contactActions } from "./lib.mjs";
import { create } from "./vendor/qr.mjs";
const $ = id => document.getElementById(id);
const params = new URLSearchParams(location.search);
const example = ["theo", "mira", "founder"].includes(params.get("example")) ? params.get("example") : "";
const isDraft = params.get("preview") === "1";
try { sessionStorage.removeItem("devination-card-draft"); } catch {}
function say(message) { $("status").textContent = message; $("status").hidden = false; clearTimeout(say.timer); say.timer = setTimeout(() => $("status").hidden = true, 4500); }
function text(id, content) { $(id).textContent = content || ""; }
function element(tag, className, content) { const e = document.createElement(tag); if (className) e.className = className; if (content) e.textContent = content; return e; }
function qrSVG(value) {
  const qr = create(value, { errorCorrectionLevel: "M" }); const margin = 4, size = qr.modules.size;
  const ns = "http://www.w3.org/2000/svg", svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", `0 0 ${size + margin * 2} ${size + margin * 2}`); svg.setAttribute("xmlns", ns); svg.setAttribute("role", "img"); svg.setAttribute("aria-label", "QR code for this card"); svg.setAttribute("shape-rendering", "crispEdges");
  const bg = document.createElementNS(ns, "rect"); bg.setAttribute("width", "100%"); bg.setAttribute("height", "100%"); bg.setAttribute("fill", "#fff"); svg.append(bg);
  let d = ""; for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (qr.modules.get(y, x)) d += `M${x + margin},${y + margin}h1v1h-1z`;
  const path = document.createElementNS(ns, "path"); path.setAttribute("fill", "#000"); path.setAttribute("d", d); svg.append(path); return svg;
}
try {
  let raw;
  if (isDraft) { const draft = sessionStorage.getItem("devination-business-card-draft-v3"); if (!draft) throw new Error("Your preview has expired. Open Make yours and preview the card again."); raw = JSON.parse(draft); }
  else { const response = await fetch(example ? `data/examples/${example}.json` : "data/card.json"); if (!response.ok) throw new Error("The card file could not be loaded. Check data/card.json or open the setup guide."); raw = await response.json(); }
  const card = validateCard(raw); const url = cardUrl(card, location, example); const dialog = $("share-dialog"); let qr;
  document.documentElement.dataset.theme = card.theme; document.title = `${card.name} · Digital Business Card`;
  document.querySelector('meta[name="description"]').content = card.bio || card.role;
  document.querySelector('meta[name="theme-color"]').content = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
  for (const key of ["name", "role", "location", "bio", "eyebrow", "initials", "headline", "intro"]) text(key, card[key]);
  text("placeholder-initials", card.initials); text("side-label", card.sideLabel);
  const examplePortrait = ["assets/photos/theo.webp", "assets/photos/mira.webp"].includes(card.photo);
  const generatedPortrait = examplePortrait || ["assets/photos/theo-work.webp", "assets/photos/mira-work.webp", "assets/photos/theo-video-poster.jpg", "assets/photos/mira-video-poster.jpg"].includes(card.photo);
  const approvedShowcase = card.photo === "assets/photos/founder.jpg";
  $("fiction-note").hidden = !card.example && !generatedPortrait && !approvedShowcase;
  text("fiction-note", approvedShowcase ? "Name and media used with permission · demonstration contact details" : card.example ? `Fictional example${generatedPortrait ? " · AI-generated media" : ""} · demonstration contact details` : "AI-generated example portrait · replace it with your own image if preferred.");
  if (card.photo) { $("portrait").src = card.photo; $("portrait").alt = generatedPortrait ? "AI-generated fictional example portrait" : card.name; $("portrait").hidden = false; $("placeholder").hidden = true; $("portrait").addEventListener("error", () => { $("portrait").hidden = true; $("placeholder").hidden = false; say("Portrait unavailable. Check its file path in Make yours."); }); }
  if (card.video) {
    const video = $("portrait-video"), toggle = $("motion-toggle"); video.src = card.video; if (card.photo) video.poster = card.photo; toggle.hidden = false;
    const motion = matchMedia("(prefers-reduced-motion: reduce)"); let userPaused = false;
    const stop = () => { video.pause(); video.hidden = true; toggle.textContent = "Play video"; };
    const play = async (manual = false) => { video.hidden = false; video.muted = true; try { await video.play(); toggle.textContent = "Pause video"; } catch { stop(); if (manual) say("The video could not play. Check its file path and format."); } };
    toggle.onclick = () => { if (!video.paused) { userPaused = true; stop(); } else { userPaused = false; void play(true); } };
    motion.addEventListener("change", stop);
    document.addEventListener("visibilitychange", () => { if (document.hidden) stop(); });
    const observer = new IntersectionObserver(entries => { if (!entries[0].isIntersecting) stop(); else if (card.videoAutoplay && !motion.matches && !userPaused && !document.hidden) void play(); }, { threshold: 0.2 });
    observer.observe(video.parentElement);
    video.addEventListener("error", () => { stop(); say("Video unavailable. The portrait image will stay visible."); });
    if (card.videoAutoplay && !motion.matches) void play();
  }
  for (const badge of card.badges) $("badges").append(element("span", "badge", badge));
  for (const action of contactActions(card)) { const a = element("a", "quick-action", action.label); a.href = action.href; if (action.demo) { a.setAttribute("aria-label", `${action.label} — example only`); a.onclick = e => { e.preventDefault(); say("Demonstration contact only. Add your own details in Make yours to activate this button."); }; } $("contacts").append(a); }
  for (const [i, project] of card.projects.entries()) {
    const a = element("a", "brand-link"); a.href = project.url; a.target = "_blank"; a.rel = "noopener noreferrer";
    a.append(element("span", "project-number", String(i + 1).padStart(2, "0")));
    const words = element("span", "project-words"); words.append(element("strong", "", project.title), element("small", "", project.description)); a.append(words, element("span", "arrow", "↗")); $("projects").append(a);
  }
  if (!card.projects.length) $("projects").previousElementSibling.hidden = true;
  for (const link of document.querySelectorAll("[data-example]")) if (link.dataset.example === (example || "theo") && !isDraft) link.setAttribute("aria-current", "page");
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(new URL(url).hostname); $("local-note").hidden = !local;
  const make = new URL("make.html", location.href); if (example) make.searchParams.set("example", example); document.querySelectorAll('a[href="make.html"]').forEach(a => a.href = make.href);
  if (isDraft) { $("preview-notice").hidden = false; text("preview-notice", "Private browser preview · Download your JSON from Make yours, then replace data/card.json to publish it. Sharing is disabled here."); $("share").disabled = true; $("qr").disabled = true; $("save-contact").disabled = true; }
  $("save-contact").onclick = () => { download(vcard(card, url), `${slug(card.name)}.vcf`, "text/vcard;charset=utf-8"); say("Contact file downloaded. Open it to add this person to your contacts."); };
  function openDialog(showQR) {
    text("dialog-title", showQR ? "Scan to connect" : "Share your card"); text("dialog-help", showQR ? "Point a phone camera at the code to open this card." : "Copy the link and send it in your preferred app."); $("share-url").value = url;
    $("qr-image").hidden = !showQR; $("download-qr").hidden = !showQR;
    text("qr-warning", local ? "Local preview: this address works only on this computer. Publish first, then download the QR again." : "If your published address changes, create a new QR. An NFC tag can also store this link; this is not phone-to-phone NFC sharing.");
    if (showQR) { try { qr = qrSVG(url); $("qr-image").replaceChildren(qr); } catch { say("This link is too long for the QR. Use a shorter published address."); return; } }
    if (!dialog.open) dialog.showModal();
  }
  $("share").onclick = async () => { if (navigator.share) { try { await navigator.share({ title: `${card.name} · Digital Business Card`, url }); return; } catch (error) { if (error.name === "AbortError") return; } } openDialog(false); };
  $("qr").onclick = () => openDialog(true); $("close-dialog").onclick = () => dialog.close();
  dialog.addEventListener("click", e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
  $("copy-link").onclick = async () => { try { await navigator.clipboard.writeText(url); say("Card link copied."); } catch { $("share-url").focus(); $("share-url").select(); say("Select and copy the link from this field."); } };
  $("download-qr").onclick = () => qr && download(new XMLSerializer().serializeToString(qr), `${slug(card.name)}-qr.svg`, "image/svg+xml");
  $("card").setAttribute("aria-busy", "false");
} catch (error) {
  text("name", "Let’s fix your card"); text("role", error.message); $("card").setAttribute("aria-busy", "false");
  for (const id of ["save-contact", "share", "qr"]) $(id).disabled = true;
  $("preview-notice").hidden = false; text("preview-notice", "Open the setup guide or Make yours to check your details. Serve this folder with npm run dev; opening the HTML file directly will not load JSON.");
}
