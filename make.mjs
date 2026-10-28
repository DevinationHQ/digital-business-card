try { sessionStorage.removeItem("devination-card-draft"); } catch {}
import { themes, validateCard, download } from "./lib.mjs";
const $ = id => document.getElementById(id);
const fields = ["theme", "name", "role", "location", "initials", "eyebrow", "bio", "email", "phone", "messagePhone", "messageChannel", "photo", "video", "publicUrl", "sideLabel", "headline", "intro"];
let original, dirty = false;
function status(message) { $("editor-error").textContent = ""; $("editor-status").textContent = message; }
function error(e) { $("editor-status").textContent = ""; $("editor-error").textContent = e.message; }
function projectEditor(project = {}) {
  const section = document.createElement("section"); section.className = "project-editor";
  const id = crypto.randomUUID();
  for (const [key, label, max] of [["title", "Link title", 100], ["description", "Short description", 180], ["url", "Full web address", 400]]) {
    const l = document.createElement("label"), input = document.createElement("input"); l.htmlFor = `${id}-${key}`; l.textContent = label; input.id = l.htmlFor; input.dataset.field = key; input.maxLength = max; input.value = project[key] || ""; if (key === "url") input.type = "url"; section.append(l, input);
  }
  const remove = document.createElement("button"); remove.type = "button"; remove.className = "small-button"; remove.textContent = "Remove this link"; remove.onclick = () => { section.remove(); dirty = true; }; section.append(remove); $("project-editors").append(section);
}
function fill(card) {
  original = card; for (const key of fields) $(key).value = card[key] || ""; $("videoAutoplay").value = String(card.videoAutoplay); $("badges").value = card.badges.join(", ");
  $("project-editors").replaceChildren(); card.projects.forEach(projectEditor); document.documentElement.dataset.theme = card.theme; dirty = false;
}
function collect() {
  const raw = { ...original }; for (const key of fields) raw[key] = $(key).value;
  raw.badges = $("badges").value.split(",").map(x => x.trim()).filter(Boolean);
  raw.videoAutoplay = $("videoAutoplay").value === "true";
  raw.projects = [...document.querySelectorAll(".project-editor")].map(section => Object.fromEntries([...section.querySelectorAll("[data-field]")].map(input => [input.dataset.field, input.value])));
  // A changed name, portrait or contact makes this a personal card rather than an example.
  raw.example = original.example && ["name", "email", "phone", "photo", "video"].every(key => raw[key] === (original[key] || ""));
  return validateCard(raw);
}
async function preset(value) { const res = await fetch(value === "starter" ? "data/card.json" : `data/examples/${value}.json`); if (!res.ok) throw new Error("That example could not load. Refresh and try again."); fill(validateCard(await res.json())); }
$("editor-form").addEventListener("input", () => { dirty = true; });
$("theme").addEventListener("change", () => { if (themes.includes($("theme").value)) document.documentElement.dataset.theme = $("theme").value; });
let prior = "starter";
$("preset").addEventListener("change", async () => { const value = $("preset").value; if (dirty && !confirm("Replace the current draft with this example? Download your JSON first if you want to keep it.")) { $("preset").value = prior; return; } try { await preset(value); prior = value; status("Example loaded. Make it your own."); } catch (e) { error(e); } });
$("add-project").onclick = () => { if (document.querySelectorAll(".project-editor").length >= 8) return status("Eight links is the limit for this card."); projectEditor(); dirty = true; };
$("preview").onclick = () => { try { const card = collect(); sessionStorage.setItem("devination-business-card-draft-v3", JSON.stringify(card)); dirty = false; location.href = "index.html?preview=1"; } catch (e) { error(e); } };
$("export").onclick = () => { try { const card = collect(); download(JSON.stringify(card, null, 2) + "\n", "card.json", "application/json"); sessionStorage.setItem("devination-business-card-draft-v3", JSON.stringify(card)); dirty = false; status("Downloaded card.json. Replace data/card.json in your own repository to publish these details."); } catch (e) { error(e); } };
$("import").onclick = () => $("import-file").click();
$("import-file").onchange = async () => { const file = $("import-file").files[0]; if (!file) return; try { if (file.size > 100000) throw new Error("This file is too large. Choose a card JSON under 100 KB."); fill(validateCard(JSON.parse(await file.text()))); dirty = true; status("Card imported. Preview it before publishing."); } catch (e) { error(e instanceof SyntaxError ? new Error("That file is not valid JSON. Choose an exported card.json.") : e); } finally { $("import-file").value = ""; } };
$("clear-draft").onclick = () => { sessionStorage.removeItem("devination-business-card-draft-v3"); status("Saved browser draft cleared. The current form remains until you leave this page."); };
try {
  const requested = new URLSearchParams(location.search).get("example");
  const example = requested === "theo" ? "starter" : requested;
  if (["starter", "mira", "founder", "blank"].includes(example)) { $("preset").value = example; prior = example; await preset(example); }
  else { const saved = sessionStorage.getItem("devination-business-card-draft-v3"); if (saved) { fill(validateCard(JSON.parse(saved))); status("Restored this tab’s draft. Nothing has been published."); } else await preset("starter"); }
} catch (e) { error(e); }
