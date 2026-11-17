// Teile mehrerer Stapel-Autoren zu einem Prüfstapel zusammenführen und die Pakete für die Einordner bauen (Training 14.11.2026).
// Jeder Teil: <teil>/*.txt, <teil>/ERWARTUNG.json ({dateien:[{datei, haushalt, bereich, zweitfach, schriftstueck, absender, person, frist, …}]}),
// <teil>/HAUSHALTE.json ({haushalte:[…]}). Gleiche Dateinamen bekommen „ (2)“; Bereich und Art werden gegen die Listen geprüft.
// Aufruf: node scripts/stapel-zusammen.mjs <ziel> <teil>[,<teil>…] [--pakete <wurzel>] [--haelften 2] [--satz] [--paare 15]
//   --satz: Die Teile enthalten Satz-Hinweise (@bon, @appbon, @spalten, @fuss, |Tabellen|). Dann liegen die Originale unter <ziel>/satz/
//           (für scripts/setzen-komplex.py) und im Stapel selbst der reine Text ohne Hinweise (für Einordner und Text-Messung).
//   --paare n: n Paare „zwei Stücke in einem Scan“ (Runde E) festlegen → <ziel>/PAARE.json
//   → <ziel>/ (Texte, ERWARTUNG.json = Soll des Autors, HAUSHALTE.json), <wurzel>/haelfte-<n>/ (Paket ohne Soll, scripts/einordner-paket.mjs)
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync, copyFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const WURZEL = fileURLToPath(new URL("..", import.meta.url));
const arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const ziel = resolve(WURZEL, process.argv[2]), teile = process.argv[3].split(",").map((t) => resolve(t));
const { KATEGORIEN } = await import("../lib/kategorien.ts"); const { SCHRIFTSTUECKE } = await import("../lib/erkennen.ts");
mkdirSync(ziel, { recursive: true });
const SATZ = process.argv.includes("--satz");
// Satz-Hinweise entfernen; Tabellen als Spalten mit drei Leerzeichen (wie ein Text aus einem Programm)
const rein = (t) => t.split("\n").filter((z) => !/^\s*@(bon|appbon|spalten|ende|seite|unterschrift)\b/.test(z))
  .map((z) => z.replace(/^\s*@(fuss|stempel)\s*/, "").replace(/^\s*#+\s+/, "").replace(/^\s*\|(.*)\|\s*$/, (m, x) => x.split("|").map((c) => c.trim()).join("   "))).join("\n");
const alle = [], haushalte = [], namen = new Set(), maengel = [];
for (const [ti, t] of teile.entries()) {
  const e = JSON.parse(readFileSync(join(t, "ERWARTUNG.json"), "utf8")).dateien;
  for (const h of JSON.parse(readFileSync(join(t, "HAUSHALTE.json"), "utf8")).haushalte) haushalte.push(h);
  for (const x of e) {
    if (!existsSync(join(t, x.datei))) { maengel.push(`Teil ${ti + 1}: ${x.datei} fehlt`); continue; }
    // Zeichen, die Windows in Dateinamen nicht erlaubt (Checkout im Windows-Bau scheitert sonst), werden zu „_“
    const sicher = x.datei.replace(/[<>:"\\|?*]/g, "_");
    let n = sicher; for (let k = 2; namen.has(n); k++) n = sicher.replace(/(\.txt)$/, ` (${k})$1`);
    namen.add(n);
    if (SATZ) { mkdirSync(join(ziel, "satz"), { recursive: true }); copyFileSync(join(t, x.datei), join(ziel, "satz", n)); writeFileSync(join(ziel, n), rein(readFileSync(join(t, x.datei), "utf8"))); }
    else copyFileSync(join(t, x.datei), join(ziel, n));
    if (!KATEGORIEN.includes(x.bereich)) maengel.push(`${n}: Bereich „${x.bereich}“ nicht in der Liste`);
    if (x.zweitfach && !KATEGORIEN.includes(x.zweitfach)) maengel.push(`${n}: Zweitfach „${x.zweitfach}“ nicht in der Liste`);
    if (!SCHRIFTSTUECKE.includes(x.schriftstueck)) maengel.push(`${n}: Art „${x.schriftstueck}“ nicht in der Liste`);
    if (x.frist && !/^\d{4}-\d{2}-\d{2}$/.test(x.frist)) maengel.push(`${n}: Frist „${x.frist}“ kein Datum`);
    alle.push({ ...x, datei: n, autor: `autor-${ti + 1}` });
  }
}
writeFileSync(join(ziel, "ERWARTUNG.json"), JSON.stringify({ hinweis: "Soll der Stapel-Autoren (erfunden). Gewertet wird die Mehrheit der drei Einordner (docs/PRUEFSTAPEL-TRAINING-WOCHENENDE-REGELN.md).", dateien: alle }, null, 1));
writeFileSync(join(ziel, "HAUSHALTE.json"), JSON.stringify({ haushalte }, null, 1));
console.log(`${alle.length} Stücke, ${haushalte.length} Haushalte → ${ziel}`);
if (arg("--paare")) {
  // feste Wahl: nach Namen sortiert, nur Briefe ohne Bon-Hinweis, jeweils zwei aufeinanderfolgende desselben Haushalts
  const n = Number(arg("--paare")), roh = (x) => readFileSync(join(ziel, SATZ ? "satz" : "", x.datei), "utf8");
  const kand = [...alle].sort((a, b) => a.datei.localeCompare(b.datei, "de")).filter((x) => !/^\s*@(bon|appbon)/.test(roh(x)));
  const paare = {}, belegt = new Set(); const schritt = Math.max(1, Math.floor(kand.length / (n * 2)));
  for (let i = 0; i + 1 < kand.length && Object.keys(paare).length < n; i += schritt) {
    const a = kand[i], b = kand.slice(i + 1).find((y) => y.haushalt === a.haushalt && !belegt.has(y.datei));
    if (!b || belegt.has(a.datei)) continue; paare[a.datei] = b.datei; belegt.add(a.datei); belegt.add(b.datei);
  }
  writeFileSync(join(ziel, "PAARE.json"), JSON.stringify(paare, null, 1)); console.log(`${Object.keys(paare).length} Paare „zwei Stücke in einem Scan“`);
} for (const m of maengel) console.log("  Mangel:", m);
const pw = arg("--pakete");
if (pw) {
  const H = Number(arg("--haelften", 1)), sortiert = [...alle].sort((a, b) => a.datei.localeCompare(b.datei, "de"));
  for (let h = 0; h < H; h++) {
    const q = join(resolve(pw), `_quelle-${h + 1}`), p = join(resolve(pw), `haelfte-${h + 1}`);
    rmSync(q, { recursive: true, force: true }); mkdirSync(q, { recursive: true });
    const teil = sortiert.filter((_, i) => i % H === h);
    for (const x of teil) copyFileSync(join(ziel, x.datei), join(q, x.datei));
    writeFileSync(join(q, "ERWARTUNG.json"), JSON.stringify({ dateien: teil.map((x) => ({ datei: x.datei, haushalt: x.haushalt })) }));
    copyFileSync(join(ziel, "HAUSHALTE.json"), join(q, "HAUSHALTE.json"));
    execFileSync("node", [join(WURZEL, "scripts/einordner-paket.mjs"), q, p], { stdio: "inherit" });
    rmSync(q, { recursive: true, force: true });
  }
}
