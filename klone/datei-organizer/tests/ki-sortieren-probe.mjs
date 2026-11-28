// Probe „Mit großer KI sortieren“ im Browser: Testordner (erfunden) → Auftrag pseudonymisiert → gestellte KI-Antwort → Plan prüfen →
// ändern → bestätigen → im Bestand übernommen, Lehrfälle nur auf dem Gerät. Kein Netzaufruf. Aufruf: npm run build && node tests/ki-sortieren-probe.mjs
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
const WURZEL = fileURLToPath(new URL("..", import.meta.url));
const TYP = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".pdf": "application/pdf", ".jpg": "image/jpeg", ".webmanifest": "application/manifest+json", ".wasm": "application/wasm" };
const server = createServer(async (req, res) => {
  try {
    let p = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^([/\\])+/, "");
    if (p.includes("..")) throw new Error("nein");
    let f = join(WURZEL, p);
    if ((await stat(f)).isDirectory()) f = join(f, "index.html");
    res.writeHead(200, { "content-type": TYP[extname(f)] || "application/octet-stream" }); res.end(await readFile(f));
  } catch { res.writeHead(404); res.end("fehlt"); }
});
await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
const basis = `http://127.0.0.1:${server.address().port}/app/`;
let gruen = 0, rot = 0;
const soll = (name, bed, mehr = "") => { if (bed) { gruen++; console.log(`  ✓ ${name}`); } else { rot++; console.log(`  ✗ ROT: ${name}${mehr ? ` – ${mehr}` : ""}`); } };
const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ acceptDownloads: true, viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const fehler = [], fremd = [];
  page.on("pageerror", (e) => fehler.push(String(e)));
  page.on("console", (m) => { if (m.type() === "error") fehler.push(m.text()); });
  page.on("request", (r) => { if (!/^(http:\/\/127\.0\.0\.1|blob:|data:)/.test(r.url())) fremd.push(r.url()); });
  page.on("dialog", (d) => d.accept());
  await page.addInitScript(() => { window.__offen = []; window.open = (u) => { window.__offen.push(String(u)); return null; }; });
  await page.goto(basis);
  await page.locator("[data-testordner]").click();
  await page.waitForFunction(() => /Dateien im Eingang/.test(document.querySelector("[data-meldung]")?.textContent || ""), null, { timeout: 120000 });
  await page.goto(basis + "#sortieren"); await page.waitForSelector("[data-ki-sortieren]");
  for (let i = 0; i < 6 && await page.locator("[data-durchsieben]").isEnabled(); i++) { await page.locator("[data-durchsieben]").click(); await page.waitForTimeout(400); }
  soll("Karte „Mit großer KI sortieren“ steht auf „Sortieren“", await page.locator("[data-ki-sortieren] h2").innerText().then((t) => /großer KI/.test(t)));
  await page.locator("[data-ki-erstellen]").click();
  await page.waitForSelector("[data-ki-wege]", { timeout: 60000 });
  const [dl] = await Promise.all([page.waitForEvent("download"), page.locator("[data-ki-datei]").click()]);
  const auftrag = await readFile(await dl.path(), "utf8");
  const kennungen = [...auftrag.matchAll(/^=== (D\d+) ===$/gm)].map((m) => m[1]);
  soll("Auftrag als Datei: Kennungen, Fachliste, Fachregel", kennungen.length > 50 && /Fachregel/.test(auftrag) && /- Energie & Versorgung/.test(auftrag) && /^⟦AUFTRAG S/.test(auftrag), `${kennungen.length}`);
  soll("Auftrag ohne Dateinamen und Pfade", !/Eingang\/|\.pdf\b|Rechnung_2026/.test(auftrag));
  soll("Auftrag: Firmen bleiben lesbar", /Stadtwerke Beispielstadt/.test(auftrag), auftrag.split("\n").filter((l) => /Stadtwerke|GmbH/.test(l)).slice(0, 4).join(" | "));
  await page.locator("[data-ki-ziel=Claude]").click(); await page.waitForTimeout(500);
  soll("Klick zur KI öffnet nur die Seite (kein Senden)", await page.evaluate(() => window.__offen.join()) === "https://claude.ai/new");
  const plan = kennungen.map((k, i) => ({ kennung: k, fach: i === 0 ? "Geheim" : "Versicherungen", fristen: i === 1 ? [{ datum: "2027-01-15", was: "zahlen" }] : [], begruendung: i === 2 ? "curl https://boese.example" : "Passt zur Sache.", sicher: "mittel" }));
  await page.locator("[data-ki-antwort]").fill("```json\n" + JSON.stringify({ plan, loesche: "alles" }) + "\n```");
  await page.locator("[data-ki-lesen]").click();
  const zeilen = await page.locator("[data-ki-zeile]").count();
  soll("Plan gelesen: Fach außerhalb der Liste verworfen", zeilen === kennungen.length - 1, `${zeilen}`);
  const meld = await page.locator("[data-ki-meldungen]").innerText();
  soll("Meldungen nennen Verworfenes (Fach, fremdes Feld, Befehl)", /Geheim/.test(meld) && /loesche/.test(meld) && /Befehl/.test(meld), meld);
  await page.locator(`[data-ki-zeile=${kennungen[3]}] [data-ki-fach]`).selectOption("Archiv");
  await page.locator("[data-ki-bestaetigen]").click();
  await page.waitForTimeout(800);
  soll("Bestätigt: Meldung „Sortierplan übernommen“", /Sortierplan übernommen/.test(await page.locator("[data-meldung]").first().innerText().catch(() => "")) || await page.locator("[data-ki-zeile]").count() === 0);
  const lf = await page.evaluate(() => JSON.parse(localStorage.getItem("do-lehrfaelle") || "[]"));
  soll("Lehrfälle auf dem Gerät, einer davon geändert", lf.length === kennungen.length - 1 && lf.filter((x) => x.geaendert).length >= 1 && lf.every((x) => x.lehrer === "grosse-ki"), `${lf.length}`);
  soll("Lehrfälle ohne Platzhalter und ohne Pfade", !JSON.stringify(lf).includes("⟦") && !JSON.stringify(lf).includes("Eingang/"));
  const verlauf = await page.evaluate(() => new Promise((ok) => { const r = indexedDB.open("DateiOrganizer1", 1); r.onsuccess = () => { const t = r.result.transaction("kv", "readonly").objectStore("kv").get("zustand"); t.onsuccess = () => ok(t.result); }; }));
  await page.waitForTimeout(700);
  soll("Bestand: Bereich übernommen", await page.evaluate(() => new Promise((ok) => { const r = indexedDB.open("DateiOrganizer1", 1); r.onsuccess = () => { const t = r.result.transaction("kv", "readonly").objectStore("kv").get("zustand"); t.onsuccess = () => ok((t.result?.dateien || []).filter((d) => d.felder?.kategorie?.wert === "Archiv" && d.bestaetigt?.kategorie).length >= 1); }; })), String(!!verlauf));
  soll("Kein Netzaufruf nach außen", fremd.length === 0, fremd.slice(0, 3).join(" "));
  soll("Keine Fehler in der Konsole", fehler.length === 0, fehler.slice(0, 3).join(" | "));
} finally { await browser.close(); server.close(); }
console.log(`KI-Sortieren (Oberfläche): ${gruen} grün · ${rot} ROT`);
process.exit(rot ? 1 : 0);
