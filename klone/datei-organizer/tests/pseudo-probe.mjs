// Oberflächen-Probe Pseudonymisierer: echter Browser gegen die gebaute Seite app/pseudonymisierer.html, nur erfundene Daten
// (Knopf „Beispiel“). Aufruf: npm run build && node tests/pseudo-probe.mjs
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { zipEintrag } from "../lib/zip.ts";
import { officeText } from "../lib/zip.ts";
const { chromium } = createRequire(import.meta.url)("playwright");

const WURZEL = fileURLToPath(new URL("..", import.meta.url));
const TYP = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".wasm": "application/wasm", ".webmanifest": "application/manifest+json" };
const server = createServer(async (req, res) => {
  try {
    const p = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^([/\\])+/, "");
    if (p.includes("..")) throw new Error("nein");
    let f = join(WURZEL, p); if ((await stat(f)).isDirectory()) f = join(f, "index.html");
    res.writeHead(200, { "content-type": TYP[extname(f)] || "application/octet-stream" }); res.end(await readFile(f));
  } catch { res.writeHead(404); res.end("fehlt"); }
});
await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
const basis = `http://127.0.0.1:${server.address().port}/app/`;

let gruen = 0, rot = 0;
const soll = (name, bed, mehr = "") => { if (bed) { gruen++; console.log(`  ✓ ${name}`); } else { rot++; console.log(`  ✗ ROT: ${name}${mehr ? ` – ${mehr}` : ""}`); } };
const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ acceptDownloads: true, viewport: { width: 1280, height: 900 }, permissions: ["clipboard-read", "clipboard-write"] });
  const page = await ctx.newPage();
  const fehler = [], fremd = [];
  page.on("pageerror", (e) => fehler.push(String(e)));
  page.on("console", (m) => { if (m.type() === "error") fehler.push(m.text()); });
  page.on("request", (r) => { const u = new URL(r.url()); if (!["127.0.0.1", "localhost"].includes(u.hostname) && !u.protocol.startsWith("blob") && !u.protocol.startsWith("data")) fremd.push(r.url()); });
  page.on("dialog", (d) => d.accept());
  const laden = async (wie, f) => { const [d] = await Promise.all([page.waitForEvent("download"), f()]); return { name: d.suggestedFilename(), bytes: await readFile(await d.path()) }; };

  console.log("Start");
  await page.goto(basis + "pseudonymisierer.html");
  await page.waitForSelector("[data-beispiel]");
  soll("Seite da, Name „Pseudonymisierer Basic“", (await page.title()) === "Pseudonymisierer Basic");
  soll("Modul 25 geladen", await page.evaluate(() => !!window.SbkimPseudonym));

  console.log("Beispiel einlesen");
  await page.click("[data-beispiel]");
  await page.waitForSelector("[data-stueck=D04]", { timeout: 150000 });
  await page.waitForFunction(() => !document.querySelector("[data-laeuft]"), null, { timeout: 150000 });
  soll("Vier Stücke in der Liste", (await page.locator("[data-stueck]").count()) === 4);
  const verdeckt = await page.locator("[data-stueck=D01] [data-verdeckt]").textContent();
  soll("Brief: Stellen verdeckt", /^\d+/.test(verdeckt || "") && parseInt(verdeckt) >= 5, verdeckt);
  soll("Kein Leck gemeldet", (await page.locator("[data-leck]").count()) === 0);
  const flaechenText = await page.locator("[data-stueck=D04] [data-flaechen]").textContent();
  soll("Foto: Vorschläge zum Abdecken (Kennzeichen, Name) gesetzt", parseInt(flaechenText) >= 2, flaechenText);

  console.log("Ansehen");
  await page.click("[data-stueck=D01] [data-auge]");
  const fassung = await page.locator("[data-fassung]").textContent();
  soll("Fassung ohne Namen, IBAN, Anschrift", !/Testfeld|Brink|DE89|Lindenweg|12345 Musterstadt|07531/.test(fassung) && fassung.includes("⟦"), fassung.slice(0, 200));
  soll("Betrag und Frist bleiben", fassung.includes("412,50 €") && fassung.includes("31.12.2026"));
  await page.locator("[data-fassung] mark").first().click();
  soll("Tipp auf Platzhalter zeigt den Klarwert (nur hier)", (await page.locator("[data-platzhalter-info]").count()) === 1);
  await page.click("[data-reiter=original]");
  soll("Original sichtbar", (await page.locator("[data-original-text]").textContent()).includes("Mara Testfeld"));
  await page.click("[data-fenster-zu]");

  console.log("Bild abdecken");
  await page.click("[data-stueck=D04] [data-stift]");
  await page.waitForSelector("[data-abdecken-svg]");
  const zahl = async () => Number(await page.locator("[data-flaechen-zahl]").getAttribute("data-flaechen-zahl"));
  const n0 = await zahl();
  const svg = await page.locator("[data-abdecken-svg]").boundingBox();
  soll("Zeichenfläche hat genau das Seitenverhältnis des Bildes (Klicks treffen)", Math.abs(svg.width / svg.height - 1.5) < 0.02, `${svg.width}×${svg.height}`);
  const bei = (u, v) => [svg.x + u * svg.width, svg.y + v * svg.height];
  await page.click("[data-werkzeug=rechteck]");
  await page.mouse.move(...bei(0.70, 0.10)); await page.mouse.down(); await page.mouse.move(...bei(0.80, 0.20), { steps: 5 }); await page.mouse.move(...bei(0.90, 0.30), { steps: 5 }); await page.mouse.up();
  soll("Rechteck aufgezogen", (await zahl()) === n0 + 1);
  await page.click("[data-rueck]");
  soll("Rückgängig", (await zahl()) === n0);
  await page.keyboard.press("Control+y");
  soll("Wiederholen (Strg+Y)", (await zahl()) === n0 + 1);
  await page.click("[data-werkzeug=ellipse]");
  await page.mouse.click(...bei(0.5, 0.9));
  soll("Kreis per Tipp (Vorgabegröße)", (await zahl()) === n0 + 2);
  await page.click("[data-flaeche-weg]");
  soll("Gewählte Fläche gelöscht", (await zahl()) === n0 + 1);
  await page.click("[data-werkzeug=vieleck]");
  for (const [u, v] of [[0.05, 0.6], [0.15, 0.6], [0.15, 0.75]]) { await page.mouse.click(...bei(u, v)); await page.waitForTimeout(450); }
  await page.mouse.click(...bei(0.05, 0.6));
  soll("Vieleck: Tipp auf den ersten Punkt schließt", (await zahl()) === n0 + 2);
  // Punkt dazu per Doppeltipp auf die Linie, dann ziehen der ganzen Fläche
  await page.mouse.dblclick(...bei(0.10, 0.6));
  { const k = await page.locator("[data-abdecken-svg] .auswahl circle").count(); soll("Vieleck: Doppeltipp auf Linie setzt Punkt", k === 4, `${k} Punkte`); }
  await page.mouse.move(...bei(0.12, 0.65)); await page.mouse.down(); await page.mouse.move(...bei(0.2, 0.7), { steps: 6 }); await page.mouse.up();
  soll("Fläche verschoben (Rückgängig möglich)", await page.locator("[data-rueck]").isEnabled());
  await page.click("[data-durch]");
  soll("Durchscheinend nur zur Ansicht", (await page.locator("[data-abdecken-svg] [data-flaeche]").first().getAttribute("fill-opacity")) === "0.55");
  await page.click("[data-abdecken-fertig]");
  soll("Fertig: Zahl der Flächen an der Zeile", parseInt(await page.locator("[data-stueck=D04] [data-flaechen]").textContent()) === n0 + 2);

  console.log("Auftrag und Ausgabe");
  await page.click("[data-stil=freundlich]");
  await page.selectOption("[data-brief]", "D01");
  await page.click("[data-kopieren]");
  const kopie = await page.evaluate(() => navigator.clipboard.readText());
  soll("Kopieren: Auftrag + alle Fassungen, ohne Klartext", kopie.includes("# Auftrag") && kopie.includes("## D03") && !/Testfeld|Brink|DE89|Lindenweg/.test(kopie), kopie.slice(0, 300));
  soll("Kopieren: Stil und Brief im Auftrag", kopie.includes("freundlich und zugewandt") && kopie.includes("D01 (Brief)"));
  const zip = await laden("zip", () => page.click("[data-zip]"));
  const png = await zipEintrag(new Uint8Array(zip.bytes), "2-Fuer-die-KI/D04.png");
  const auftragMd = new TextDecoder().decode(await zipEintrag(new Uint8Array(zip.bytes), "2-Fuer-die-KI/AUFTRAG.md"));
  soll("ZIP: Ordner für die KI mit abgedecktem Bild und Auftrag", png && png.length > 1000 && auftragMd.includes("⟦AUFTRAG "));
  soll("ZIP: kein Klartext in den Texten", !/Testfeld|Brink|DE89/.test(new TextDecoder().decode(zip.bytes)));
  const pix = await page.evaluate(async (b64) => { const bm = await createImageBitmap(new Blob([Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))])); const c = new OffscreenCanvas(bm.width, bm.height); const g = c.getContext("2d"); g.drawImage(bm, 0, 0); const d = g.getImageData(600, 537, 1, 1).data; return [...d]; }, Buffer.from(png).toString("base64"));
  soll("Kennzeichen im Bild für die KI schwarz", pix[0] < 10 && pix[1] < 10 && pix[2] < 10, pix.join(","));
  const md = await laden("md", () => page.click("[data-eine-datei]"));
  soll("Eine Datei für die KI (.md)", md.name.endsWith("fuer die KI.md") && md.bytes.toString().includes("## D02"), md.name);
  soll("Kein Aufruf ins Netz", fremd.length === 0, fremd.join(" "));

  console.log("Zurückführen");
  const tok = kopie.match(/⟦NAME-\d+⟧|⟦PERSON-\d+⟧/)?.[0];
  await page.click("[data-zum-rueckweg]");
  await page.waitForSelector("[data-antwort]");
  await page.fill("[data-antwort]", `${auftragMd.split("\n")[1]}\nSehr geehrte Damen und Herren,\nhiermit widerspricht ${tok} der Nachzahlung. ⟦NAME-99⟧`);
  await page.click("[data-zurueckfuehren]");
  const zurueck = await page.locator("[data-ergebnis-text]").inputValue();
  soll("Echter Name wieder drin, Auftragskopf weg", !zurueck.includes(tok) && /Testfeld|Brink/.test(zurueck) && !zurueck.includes("⟦AUFTRAG"), zurueck);
  soll("Unbekannter Platzhalter gemeldet", (await page.locator("[data-offen]").textContent()).includes("⟦NAME-99⟧"));
  const word = await laden("docx", () => page.click("[data-word]"));
  soll("Als Word-Datei", word.name.endsWith(".docx") && (await officeText(new Uint8Array(word.bytes), "x.docx")).includes("widerspricht"), word.name);
  await page.setInputFiles("[data-antwort-dateien]", { name: "D04.png", mimeType: "image/png", buffer: Buffer.from(png) });
  await page.waitForSelector("[data-ergebnis=bild]");
  soll("Bild zurückgeführt: abgedeckte Stellen aus dem Original", (await page.locator("[data-ergebnis=bild]").textContent()).includes("wieder eingesetzt"));
  const bildSrc = await page.locator("[data-ergebnis=bild] img").getAttribute("src");
  const pix2 = await page.evaluate(async (u) => { const bm = await createImageBitmap(await (await fetch(u)).blob()); const c = new OffscreenCanvas(bm.width, bm.height); const g = c.getContext("2d"); g.drawImage(bm, 0, 0); return [...g.getImageData(452, 537, 1, 1).data]; }, bildSrc);
  soll("Kennzeichen-Fläche wieder wie im Original (nicht schwarz)", pix2[0] > 200 || pix2[2] > 120, pix2.join(","));
  await page.click("[data-ergebnis-loeschen]");
  soll("Ergebnis löschen", (await page.locator("[data-ergebnis=text]").count()) === 0);

  console.log("Aufträge");
  await page.click("[data-seite=auftraege]");
  await page.waitForSelector("[data-auftrag]");
  soll("Auftrag gemerkt", (await page.locator("[data-auftrag]").count()) === 1);
  const roh = await page.evaluate(() => new Promise((ok) => { const r = indexedDB.open("pseudonymisierer"); r.onsuccess = () => { const t = r.result.transaction("auftraege").objectStore("auftraege").getAll(); t.onsuccess = () => ok(JSON.stringify(t.result)); }; }));
  soll("Gespeichert ohne Klartext (Zuordnung verschlüsselt)", !/Testfeld|Brink|DE89|Lindenweg|Brief Hausverwaltung/.test(roh));
  await page.click("[data-erledigt]");
  await page.waitForSelector("[data-keine-auftraege]");
  soll("Erledigt löscht den Auftrag", true);

  console.log("Handy");
  const handy = await browser.newPage({ viewport: { width: 360, height: 760 } });
  await handy.goto(basis + "pseudonymisierer.html");
  await handy.click("[data-beispiel]");
  await handy.waitForSelector("[data-stueck=D04]", { timeout: 150000 });
  soll("Handy: nichts läuft quer", await handy.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
  await handy.click("[data-stueck=D04] [data-stift]");
  soll("Handy: Editor passt in die Breite", await handy.evaluate(() => document.querySelector("[data-abdecken]").getBoundingClientRect().right <= innerWidth + 1));
  soll("Keine Fehler auf der Seite", fehler.length === 0, fehler.join(" | "));
} finally { await browser.close(); server.close(); }
console.log(`\nPseudonymisierer-Oberfläche: ${gruen} grün · ${rot} ROT`);
process.exit(rot ? 1 : 0);
