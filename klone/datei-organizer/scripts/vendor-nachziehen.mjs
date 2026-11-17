// Bausteine byte-gleich aus der Familienakte (Workflow-PDF-Klon) übernehmen und mit Pin festhalten. Nie von Hand ändern.
//   node scripts/vendor-nachziehen.mjs            → kopiert und schreibt src/public/vendor/HERKUNFT.json
//   node scripts/vendor-nachziehen.mjs --pruefen  → prüft nur, dass jede Datei ihrem Pin entspricht (läuft im Bau)
// Quelle: FAMILIENAKTE (Vorgabe ../Meine-Familienakte), dort public/apps/workflow-pdf/ – dessen Pins führen zum Auslieferungsprüfer
// (Prüfkern) und zu tesseract.js (Texterkennung). Nur Deutsch als Sprache (Klaus: Organizer zuerst für deutsche Unterlagen).
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), "..");
const ZIEL = join(WURZEL, "src/public/vendor");
const PIN = join(ZIEL, "HERKUNFT.json");
const DATEIEN = [
  "assets/pruefer-formate.js", "assets/pruefer-anhang.js", "assets/pruefer-mail.js",
  "vendor/tesseract/tesseract.min.js", "vendor/tesseract/tesseract.min.js.LICENSE.txt", "vendor/tesseract/worker.min.js",
  "vendor/tesseract/worker.min.js.LICENSE.txt", "vendor/tesseract/LICENSE-Apache-2.0.txt",
  "vendor/tesseract/tesseract-core-lstm.wasm.js", "vendor/tesseract/tesseract-core-simd-lstm.wasm.js",
  "vendor/tesseract/tesseract-core-relaxedsimd-lstm.wasm.js", "vendor/tesseract/lang/deu.traineddata",
];
const ziel = (q) => join(ZIEL, q.replace(/^assets\//, "pruefkern/").replace(/^vendor\//, ""));
const sha = (p) => createHash("sha256").update(readFileSync(p)).digest("hex");

if (process.argv.includes("--pruefen")) {
  const pins = JSON.parse(readFileSync(PIN, "utf8"));
  let fehler = 0;
  for (const [rel, h] of Object.entries(pins.dateien)) {
    const p = join(ZIEL, rel);
    if (!existsSync(p) || sha(p) !== h) { console.error(`✗ Pin verletzt: src/public/vendor/${rel}`); fehler++; }
  }
  if (fehler) { console.error("Bausteine nie von Hand ändern – node scripts/vendor-nachziehen.mjs"); process.exit(1); }
  console.log(`vendor: ${Object.keys(pins.dateien).length} Dateien entsprechen ihrem Pin`);
  process.exit(0);
}
const FA = resolve(process.env.FAMILIENAKTE || join(WURZEL, "../Meine-Familienakte"));
const QUELLE = join(FA, "public/apps/workflow-pdf");
const quellPins = JSON.parse(readFileSync(join(FA, "public/apps/HERKUNFT.json"), "utf8"));
const pinsQuelle = Object.values(quellPins.apps || quellPins).find((x) => x && x.dateien && x.dateien["assets/pruefer-anhang.js"]) || {};
if (!pinsQuelle.dateien) throw new Error("Pins der Familienakte nicht gefunden – Quelle ungeprüft");
const dateien = {};
for (const q of DATEIEN) {
  const von = join(QUELLE, q), nach = ziel(q);
  const h = sha(von);
  if (pinsQuelle.dateien && pinsQuelle.dateien[q] && pinsQuelle.dateien[q] !== h) throw new Error(`Quelle weicht vom Pin der Familienakte ab: ${q}`);
  mkdirSync(dirname(nach), { recursive: true }); copyFileSync(von, nach);
  dateien[nach.slice(ZIEL.length + 1)] = h;
}
let commit = "?";
try { commit = execFileSync("git", ["-C", FA, "rev-parse", "--short", "HEAD"]).toString().trim(); } catch {}
writeFileSync(PIN, JSON.stringify({ quelle: "Meine-Familienakte/public/apps/workflow-pdf (Klon von Workflow PDF; Prüfkern aus dem Auslieferungsprüfer, Texterkennung tesseract.js)", commit, gezogen: new Date().toISOString().slice(0, 10), dateien }, null, 1) + "\n");
console.log(`vendor: ${Object.keys(dateien).length} Dateien übernommen @ ${commit}`);
