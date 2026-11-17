// Maske (Pseudonymisieren) byte-gleich aus der Familienakte übernehmen und mit Pin festhalten. Nie von Hand ändern.
//   node scripts/maske-nachziehen.mjs            → kopiert und schreibt lib/maske/HERKUNFT.json
//   node scripts/maske-nachziehen.mjs --pruefen  → prüft nur, dass jede Datei ihrem Pin entspricht (läuft im Bau)
// Quelle: FAMILIENAKTE (Vorgabe ../Meine-Familienakte): lib/maske.ts (Schicht über Modul 25), lib/ki-auftrag.ts (Familien-Muster),
// lib/namensmuster.ts und Modul 25 public/native/25_pseudonym.js (byte-1:1 aus Sage). Sobald Sage Modul 25 Gen. 3 gebaut hat und die
// Familienakte es übernimmt, kommt es über dieses Skript hierher.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const WURZEL = join(dirname(fileURLToPath(import.meta.url)), "..");
const PIN = join(WURZEL, "lib/maske/HERKUNFT.json");
const DATEIEN = {
  "lib/maske.ts": "lib/maske/maske.ts",
  "lib/ki-auftrag.ts": "lib/maske/ki-auftrag.ts",
  "lib/namensmuster.ts": "lib/maske/namensmuster.ts",
  "public/native/25_pseudonym.js": "src/public/vendor/maske/25_pseudonym.js",
};
const sha = (p) => createHash("sha256").update(readFileSync(p)).digest("hex");

if (process.argv.includes("--pruefen")) {
  const pins = JSON.parse(readFileSync(PIN, "utf8"));
  let fehler = 0;
  for (const [rel, h] of Object.entries(pins.dateien)) {
    const p = join(WURZEL, rel);
    if (!existsSync(p) || sha(p) !== h) { console.error(`✗ Pin verletzt: ${rel}`); fehler++; }
  }
  if (fehler) { console.error("Maske nie von Hand ändern – node scripts/maske-nachziehen.mjs"); process.exit(1); }
  console.log(`maske: ${Object.keys(pins.dateien).length} Dateien entsprechen ihrem Pin`);
  process.exit(0);
}
const FA = resolve(process.env.FAMILIENAKTE || join(WURZEL, "../Meine-Familienakte"));
const dateien = {};
for (const [von, nach] of Object.entries(DATEIEN)) {
  const ziel = join(WURZEL, nach);
  mkdirSync(dirname(ziel), { recursive: true });
  copyFileSync(join(FA, von), ziel);
  dateien[nach] = sha(ziel);
}
let commit = "?";
try { commit = execFileSync("git", ["-C", FA, "rev-parse", "--short", "HEAD"]).toString().trim(); } catch {}
writeFileSync(PIN, JSON.stringify({ quelle: "Meine-Familienakte (lib/maske.ts, lib/ki-auftrag.ts, lib/namensmuster.ts, public/native/25_pseudonym.js)", commit, gezogen: new Date().toISOString().slice(0, 10), dateien }, null, 1) + "\n");
console.log(`maske: ${Object.keys(dateien).length} Dateien übernommen (Familienakte @ ${commit})`);
