// Kleiner Klassifikator für den Kontovorschlag (Regeln 23–28, docs/PRUEFSTAPEL-BLP-REGELN.md).
// Lernt aus Lehrdaten (Ordner mit ERWARTUNG.json: datei → konto) ein sparsames Wort-Modell (Naive Bayes über Wörter und Wortpaare),
// das in BookLedgerPro ohne Sprachmodell auf dem Gerät rechnet. Die Rechnung selbst steht in lehrer-modell.mjs (rein, ohne Dateien),
// damit Training, Messung und App dieselbe Fassung benutzen.
// Aufruf: node scripts/lehrer-trainieren.mjs --lernen ordner1,ordner2,… [--pruefen ordnerA,ordnerB] [--aus modell.json] [--minGewerbe 2]
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { merkmale, trainiere, vorhersage } from "./lehrer-modell.mjs";

const WURZEL = fileURLToPath(new URL("..", import.meta.url));
const arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const liste = (s) => String(s || "").split(",").map((x) => x.trim()).filter(Boolean).flatMap((p) => {
  const voll = resolve(WURZEL, p);
  if (existsSync(join(voll, "ERWARTUNG.json"))) return [voll];
  return readdirSync(voll).map((u) => join(voll, u)).filter((u) => statSync(u).isDirectory() && existsSync(join(u, "ERWARTUNG.json")));
});
export function lade(ordner, sollDatei) {
  const e = JSON.parse(readFileSync(join(ordner, "ERWARTUNG.json"), "utf8"));
  const soll = sollDatei && existsSync(join(ordner, sollDatei)) ? new Map(JSON.parse(readFileSync(join(ordner, sollDatei), "utf8")).map((x) => [x.datei, x.konto])) : null;
  return e.dateien.filter((x) => x.konto).map((x) => ({ gruppe: ordner, betrieb: e.betrieb || "", datei: x.datei, konto: soll?.get(x.datei) ?? x.konto, text: readFileSync(join(ordner, x.datei), "utf8") }));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const lern = liste(arg("--lernen")).flatMap((o) => lade(o));
  const optionen = { minGruppen: Number(arg("--minGewerbe", 2)), paare: arg("--paare", "ja") === "ja", proKlasse: Number(arg("--proKlasse", 400)) };
  const modell = trainiere(lern.map((b) => ({ gruppe: b.gruppe, konto: b.konto, merkmale: merkmale(b.text, b.betrieb) })), optionen);
  console.log(`Gelernt aus ${lern.length} Belegen in ${new Set(lern.map((b) => b.gruppe)).size} Gewerben: ${modell.konten.length} Konten, ${Object.keys(modell.gewichte).length} Merkmale`);
  for (const o of liste(arg("--pruefen"))) {
    const p = lade(o); let ok = 0, sicher = 0, sicherOk = 0;
    for (const b of p) { const v = vorhersage(modell, merkmale(b.text, b.betrieb)); if (v.konto === b.konto) ok++; if (v.abstand >= 2) { sicher++; if (v.konto === b.konto) sicherOk++; } }
    console.log(`  ${o.replace(WURZEL, "").padEnd(22)} ${ok}/${p.length} = ${(100 * ok / p.length).toFixed(1)} % · mit Abstand ≥ 2: ${sicherOk}/${sicher}`);
  }
  if (arg("--aus")) { writeFileSync(resolve(WURZEL, arg("--aus")), JSON.stringify(modell)); console.log("Modell:", arg("--aus"), Math.round(JSON.stringify(modell).length / 1024), "KB"); }
}
