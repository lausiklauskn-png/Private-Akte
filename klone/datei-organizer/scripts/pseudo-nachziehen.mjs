// Pseudo-Kern byte-gleich aus PseudoDoc übernehmen und mit Pin festhalten. Nie von Hand ändern (Klaus 28.11.2026: PseudoDoc ist die Quelle).
//   node scripts/pseudo-nachziehen.mjs            → kopiert lib/pseudo/*.ts und schreibt lib/pseudo/HERKUNFT.json
//   node scripts/pseudo-nachziehen.mjs --pruefen  → prüft nur, dass jede Datei ihrem Pin entspricht (läuft im Bau)
// Quelle: PSEUDODOC (Vorgabe ../PseudoDoc): lib/pseudo/{auftrag,flaechen,pakete,rueckweg,bereinigen,zeichen}.ts
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), "..");
const PIN = join(WURZEL, "lib/pseudo/HERKUNFT.json");
const DATEIEN = ["auftrag", "flaechen", "pakete", "rueckweg", "bereinigen", "zeichen"].map((n) => `lib/pseudo/${n}.ts`);
const sha = (p) => createHash("sha256").update(readFileSync(p)).digest("hex");

if (process.argv.includes("--pruefen")) {
  const pins = JSON.parse(readFileSync(PIN, "utf8"));
  let fehler = 0;
  for (const [rel, h] of Object.entries(pins.dateien)) {
    const p = join(WURZEL, rel);
    if (!existsSync(p) || sha(p) !== h) { console.error(`✗ Pin verletzt: ${rel}`); fehler++; }
  }
  if (fehler) { console.error("Pseudo-Kern nie von Hand ändern – node scripts/pseudo-nachziehen.mjs"); process.exit(1); }
  console.log(`pseudo: ${Object.keys(pins.dateien).length} Dateien entsprechen ihrem Pin`);
  process.exit(0);
}
const PD = resolve(process.env.PSEUDODOC || join(WURZEL, "../PseudoDoc"));
const dateien = {};
for (const rel of DATEIEN) {
  const ziel = join(WURZEL, rel);
  mkdirSync(dirname(ziel), { recursive: true });
  copyFileSync(join(PD, rel), ziel);
  dateien[rel] = sha(ziel);
}
let commit = "?";
try { commit = execFileSync("git", ["-C", PD, "rev-parse", "--short", "HEAD"]).toString().trim(); } catch {}
writeFileSync(PIN, JSON.stringify({ quelle: "PseudoDoc (lib/pseudo/)", commit, gezogen: new Date().toISOString().slice(0, 10), dateien }, null, 1) + "\n");
console.log(`pseudo: ${Object.keys(dateien).length} Dateien übernommen (PseudoDoc @ ${commit})`);
