// Paket für unabhängige Einordner aus einem Briefstapel bauen: alle Texte in einer Datei (ohne Soll), Listen, Fachregel, Auftrag.
// Aufruf: node scripts/einordner-paket.mjs <stapelordner> <zielordner> [--zusatz "Text am Ende des Auftrags"]
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { join, resolve } from "node:path";
const [stapel, ziel] = [resolve(process.argv[2]), resolve(process.argv[3])]; const zi = process.argv.indexOf("--zusatz");
const e = JSON.parse(readFileSync(join(stapel, "ERWARTUNG.json"), "utf8")).dateien, n = e.length;
const { KATEGORIEN } = await import("../lib/kategorien.ts"); const { SCHRIFTSTUECKE } = await import("../lib/erkennen.ts");
mkdirSync(ziel, { recursive: true });
// feste, vom Soll unabhängige Reihenfolge (nach Dateiname), damit die Lage im Paket nichts verrät
const sortiert = [...e].sort((a, b) => a.datei.localeCompare(b.datei, "de"));
writeFileSync(join(ziel, "BRIEFE.txt"), sortiert.map((x, i) => `######## BRIEF ${i + 1} von ${n} · Datei: ${x.datei} · Haushalt: ${x.haushalt} ########\n${readFileSync(join(stapel, x.datei), "utf8").trim()}\n`).join("\n"));
writeFileSync(join(ziel, "BEREICHE.json"), JSON.stringify([...KATEGORIEN], null, 1));
writeFileSync(join(ziel, "SCHRIFTSTUECKE.json"), JSON.stringify(SCHRIFTSTUECKE.filter((s) => s !== "Foto" && s !== "Unklar").sort(), null, 1));
copyFileSync(join(stapel, "HAUSHALTE.json"), join(ziel, "HAUSHALTE.json"));
copyFileSync(new URL("../docs/FACHREGEL.md", import.meta.url), join(ziel, "FACHREGEL.md"));
writeFileSync(join(ziel, "AUFTRAG.md"), `# Auftrag: ${n} Schriftstücke eines Haushalts-Archivs einordnen

Du bist ein unabhängiger Prüfer. In diesem Ordner liegen:

- \`BRIEFE.txt\` – ${n} erfundene Schriftstücke privater Haushalte als Text (wie nach Texterkennung). Jedes beginnt mit
  \`######## BRIEF n von ${n} · Datei: <Dateiname> · Haushalt: <Kennung> ########\`.
- \`BEREICHE.json\` – die erlaubten Bereiche (Ablagefächer) einer Familienakte.
- \`SCHRIFTSTUECKE.json\` – die erlaubten Arten von Schriftstücken.
- \`HAUSHALTE.json\` – wer zu welchem Haushalt gehört.
- \`FACHREGEL.md\` – die vereinbarte Regel für Schriftstücke, die in zwei Fächer passen (nur der Abschnitt mit der Tabelle zählt
  für dich; was dort über die Bedienung steht, ist Hintergrund).

## Aufgabe

Bestimme für JEDES der ${n} Schriftstücke nach deinem eigenen Urteil (kein Stichwort-Skript), so wie ein sorgfältiger Mensch es
in seiner Familienakte ablegen würde, und halte dich bei Grenzfällen an die Fachregel:

- \`bereich\` = genau ein Eintrag aus BEREICHE.json (wörtlich).
- \`zweitfach\` = ein weiterer Eintrag aus BEREICHE.json, wenn die Fachregel eines nennt oder ein zweites Fach gleich gut passt, sonst "".
- \`schriftstueck\` = genau ein Eintrag aus SCHRIFTSTUECKE.json (wörtlich). Die Hauptsache entscheidet.
- \`absender\` = Name der Stelle, Firma oder Person, von der das Schriftstück stammt, wörtlich wie im Text (ohne Anschrift).
- \`person\` = "Vorname Name" des Haushaltsmitglieds, um das es geht (Patient, Kind, Versicherter, Vertragspartner), oder "" bei
  gemeinsamen Sachen oder niemand Bestimmtem.
- \`frist\` = Datum JJJJ-MM-TT, bis zu dem der Haushalt etwas tun muss (zahlen ohne Lastschrift, antworten) oder ein Termin
  wahrzunehmen ist, oder "" wenn es keine gibt. Bloße Widerspruchsfristen, Laufzeiten und Abbuchungstermine sind keine Frist.
- \`sicher\` = false, sobald du bei einem Feld zweifelst; \`grund\` nennt Feld und zweite Möglichkeit (höchstens 15 Wörter).

## Ergebnis

    {"einordner":"<Kennzeichnung>","dateien":[
     {"datei":"<Dateiname genau wie in der Kopfzeile>","bereich":"…","zweitfach":"","schriftstueck":"…","absender":"…","person":"…","frist":"","sicher":true,"grund":""}
    ]}

Prüfe am Ende selbst: ${n} Einträge, jeder Dateiname genau einmal, jeder Bereich und jede Art wörtlich aus den Listen.
${zi > 0 ? "\n" + process.argv[zi + 1] + "\n" : ""}`);
console.log(ziel, n, "Schriftstücke");
