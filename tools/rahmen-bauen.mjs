#!/usr/bin/env node
// Baut die Startseiten der Klone im Rahmen (Klaus 17.11.2026; Vorbild: Workflow PDF in der Familienakte, dort tools/wfpdf-app-patch.mjs).
// Die Klone unter klone/ bleiben byte-gleich. Die EINE erlaubte Abweichung je Klon ist seine Startseite – und die liegt nicht im
// Klon, sondern als eigene Datei unter rahmen/: aus der index.html des Klons erzeugt, mit
//   1. der Brücke der Privaten Akte als ERSTEM Skript (eigener Speicher, kein eigener Service Worker, Übergabe an die Akte),
//   2. die Brücke stellt die Adresse der Seite auf den Ordner des Klons um (history.replaceState auf „<Klon>/~rahmen“, ohne neu zu
//      laden) – alle Dateien der App kommen unverändert von dort, auch die, die der Klon über location.href sucht
//      (Scanner, Texterkennung, Prüfkern). Dazu <base href> auf denselben Ordner: der Browser lädt Skripte schon vorab,
//      bevor die Brücke läuft – ohne <base> von der alten Adresse (404). Eines allein reicht nicht (beides in der Probe gesehen).
//      Damit <base> vor und nach dem Umstellen auf denselben Ordner zeigt, liegt die Seite spiegelbildlich zum Klon:
//      rahmen/<Pfad im Klon>/index.html ↔ klone/<Pfad im Klon>/~rahmen.
//   3. der Farbdatei der Privaten Akte als letztem Stylesheet,
//   4. Workflow PDF: ohne eigene Service-Worker-Anmeldung und ohne Mycel-Knoten (wie in der Familienakte).
// `--pruefen` vergleicht die eingecheckten Seiten mit einem frischen Bau (läuft in `npm run bau:pruefen`).
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const wurzel = fileURLToPath(new URL("..", import.meta.url));
const V = "3"; // bei jeder Änderung an Brücke oder Farbdatei erhöhen
const einmal = (s, was, womit, name) => { const teile = typeof was === "string" ? s.split(was) : s.split(was); if (teile.length !== 2) throw new Error(`${name}: Stelle nicht genau einmal gefunden – der Klon ist anders gebaut, nicht raten.`); return teile.join(womit); };

const SEITEN = [
  { ziel: "rahmen/datei-organizer/app/index.html", hoch: "../../", basis: "../../../klone/datei-organizer/app/", quelle: "klone/datei-organizer/app/index.html", zurueck: "../../../rahmen/", bruecke: "organizer-bruecke.js", thema: "organizer-thema.css", charset: '<meta charset="utf-8" />',
    mehr: (s) => s },
  { ziel: "rahmen/workflow-pdf/index.html", hoch: "../", basis: "../../klone/workflow-pdf/", quelle: "klone/workflow-pdf/index.html", zurueck: "../../rahmen/", bruecke: "wfpdf-bruecke.js", thema: "wfpdf-thema.css", charset: '<meta charset="utf-8">',
    mehr: (s) => {
      s = einmal(s, /<script>if\('serviceWorker' in navigator&&location\.protocol==='https:'\)navigator\.serviceWorker\.register\('sw\.js'\)\.catch\(function\(\)\{\}\);<\/script>/, "<!-- Private Akte: kein eigener Service Worker im Klon -->", "Service-Worker-Anmeldung");
      return einmal(s, /<script defer src="assets\/sbkim-init\.js\?v=\d+"><\/script>/, "<!-- Private Akte: kein Mycel-Knoten im Klon -->", "sbkim-init.js");
    } },
];

let rot = 0;
for (const x of SEITEN) {
  let s = await readFile(wurzel + x.quelle, "utf8");
  s = einmal(s, x.charset, `${x.charset}\n<!-- Private Akte: erzeugt von tools/rahmen-bauen.mjs aus ${x.quelle}. Nicht von Hand ändern. -->\n<script src="${x.hoch}${x.bruecke}?v=${V}"></script>\n<base href="${x.basis}">`, "<meta charset>");
  s = x.mehr(s);
  s = einmal(s, "</head>", `<link rel="stylesheet" href="${x.zurueck}${x.thema}?v=${V}">\n</head>`, "</head>");
  if (process.argv.includes("--pruefen")) {
    const alt = await readFile(wurzel + x.ziel, "utf8").catch(() => "");
    if (alt !== s) { console.error(`🔴 ${x.ziel} passt nicht zum Klon. Bitte \`npm run bau\` und einchecken.`); rot++; } else console.log(`🟢 ${x.ziel} ist der frische Bau.`);
  } else { await mkdir(dirname(wurzel + x.ziel), { recursive: true }); await writeFile(wurzel + x.ziel, s); console.log(`${x.ziel} geschrieben`); }
}
process.exit(rot ? 1 : 0);
