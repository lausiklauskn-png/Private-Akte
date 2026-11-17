// Abgleich in beide Richtungen zwischen Datei-Organizer und den Apps, die seine Bausteine nutzen (Klaus 13.11.2026:
// „da müsste es einen Abgleich geben“). Ein Kern, keine zweite Fassung – aber jede Richtung hat ihren eigenen Weg:
//   Organizer → Familienakte   lib/*.ts            → lib/sortierkern/   (dort: tools/sortierkern-nachziehen.mjs)
//   Organizer → BookLedgerPro  kern-js/*.js        → src/vendor/sortierkern/ (dort: tools/sortierkern-nachziehen.mjs)
//   Familienakte → Organizer   public/apps/workflow-pdf (Prüfkern, Texterkennung) → src/public/vendor/ (hier: scripts/vendor-nachziehen.mjs)
// Liest nur, ändert nichts. Fehlt ein Nachbar-Repo, wird die Richtung übersprungen und das gesagt.
// Aufruf: node scripts/abgleich.mjs [--streng]   (--streng: Ausgang 1, wenn etwas veraltet ist)
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const W = fileURLToPath(new URL("..", import.meta.url));
const nachbar = (...namen) => namen.map((n) => resolve(W, "..", n)).find((p) => existsSync(p));
const sha = (p) => createHash("sha256").update(readFileSync(p)).digest("hex");
let veraltet = 0;
const zeile = (gleich, text) => { if (!gleich) veraltet++; console.log(`  ${gleich ? "✓" : "✗"} ${text}`); };

function richtung(titel, repo, herkunftPfad, paare) {
  console.log(`\n${titel}`);
  if (!repo) { console.log("  – übersprungen (Repo nicht daneben)"); return; }
  const h = join(repo, herkunftPfad);
  if (!existsSync(h)) { console.log(`  – keine ${herkunftPfad}`); return; }
  const pin = JSON.parse(readFileSync(h, "utf8"));
  console.log(`  Stand dort: ${String(pin.commit || "").slice(0, 7)} (${pin.stand || pin.gezogen || "ohne Datum"})`);
  for (const [quelle, ziel, name] of paare(pin)) {
    if (!existsSync(quelle)) { zeile(false, `${name}: Quelle fehlt`); continue; }
    if (!existsSync(ziel)) { zeile(false, `${name}: dort nicht vorhanden`); continue; }
    zeile(sha(quelle) === sha(ziel), `${name}${sha(quelle) === sha(ziel) ? "" : " – weicht ab, nachziehen"}`);
  }
}

const fa = nachbar("Meine-Familienakte", "meine-familienakte"), blp = nachbar("BookLedgerPro");
richtung("Organizer → Familienakte (Sortier-Kern)", fa, "lib/sortierkern/HERKUNFT.json",
  (pin) => Object.keys(pin.dateien).map((d) => [join(W, "lib", d), join(fa, "lib/sortierkern", d), d]));
richtung("Organizer → BookLedgerPro (Kern als JavaScript)", blp, "src/vendor/sortierkern/HERKUNFT.json",
  (pin) => Object.keys(pin.dateien).map((d) => [join(W, "kern-js", d), join(blp, "src/vendor/sortierkern", d), d]));
richtung("Familienakte → Organizer (Prüfkern, Texterkennung)", fa ? W : null, "src/public/vendor/HERKUNFT.json",
  (pin) => Object.keys(pin.dateien).map((d) => [join(fa, "public/apps/workflow-pdf", d.startsWith("pruefkern/") ? d.replace("pruefkern/", "assets/") : `vendor/${d}`), join(W, "src/public/vendor", d), d]));

console.log(veraltet ? `\n${veraltet} veraltet – nachziehen (je Richtung mit dem genannten Werkzeug).` : "\nAlles abgeglichen.");
process.exit(veraltet && process.argv.includes("--streng") ? 1 : 0);
