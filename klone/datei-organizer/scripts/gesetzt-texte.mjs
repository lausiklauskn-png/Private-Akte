// Schreibt den Text, den die App aus den gesetzten Stücken liest (Texterkennung wie in der App, scripts/leser-node.mjs), als eigenen
// Stapel <ziel>/ (gleiche Dateinamen, ERWARTUNG/SOLL/HAUSHALTE kopiert) – Lernmaterial mit echten Lesefehlern (rekursive Verbesserung).
// Aufruf: node scripts/gesetzt-texte.mjs <stapel> <gesetzt-ordner mit SETZEN.json> <ziel>
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
const [stapel, gesetzt, ziel] = process.argv.slice(2, 5).map((p) => resolve(p));
const L = await import("./leser-node.mjs"), { einlesen } = await import("../lib/einlesen.ts");
const SETZEN = JSON.parse(readFileSync(join(gesetzt, "SETZEN.json"), "utf8"));
mkdirSync(ziel, { recursive: true });
for (const f of ["ERWARTUNG.json", "SOLL.json", "HAUSHALTE.json"]) if (existsSync(join(stapel, f))) copyFileSync(join(stapel, f), join(ziel, f));
let i = 0;
for (const [name, s] of Object.entries(SETZEN)) {
  if (s.inScanVon) continue;
  const d = await einlesen({ pfad: name, name: s.datei.split("/").pop(), geaendert: i++, bytes: new Uint8Array(readFileSync(join(gesetzt, s.datei))) }, L.pdfLeser(true), 0, L.ocr);
  writeFileSync(join(ziel, name), d[0]?.volltext || "");
}
await L.beenden(); console.log(i, "Texte →", ziel);
