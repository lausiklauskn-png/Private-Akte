// Abstimmen (Regel 25): wie wirken Wortmodell und Regeln zusammen? Nur an den verbrauchten Stapeln 1–3.
// Aufruf: node scripts/lehrer-abstimmen.mjs [--blp ../bookledgerpro]
import { readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { merkmale, trainiere, vorhersage } from "./lehrer-modell.mjs";
import { lade } from "./lehrer-trainieren.mjs";
import { kombiniere } from "./lehrer-kombination.mjs";

const WURZEL = fileURLToPath(new URL("..", import.meta.url));
const arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const BLP = resolve(WURZEL, arg("--blp", "../bookledgerpro"));
const { categorize, istEigenerBeleg } = await import(join(BLP, "src/ai/categorize.js"));
const GEWERBE = ["friseur", "tischlerei", "physio", "it", "imbiss", "kfz", "onlinehandel", "elektro"].map((g) => join(WURZEL, "lehrdaten-blp", g));
const lern = GEWERBE.flatMap((o) => lade(o));
const NAMEN = { "pruefstapel-blp": "Café-Bäckerei Kornblume", "pruefstapel-blp-2": "Radwerk Tidemann", "pruefstapel-blp-3": "Blumenwerkstatt Harkort" };
// Soll: Mehrheit, wo vorhanden (ergebnisse/blpN-…), sonst Stapel-Autor
const mehrheit = (o) => { const e = JSON.parse(readFileSync(join(WURZEL, o, "ERWARTUNG.json"), "utf8")).dateien; const andere = ["ZWEITER.json", "DRITTER.json"].filter((f) => existsSync(join(WURZEL, o, f))).map((f) => new Map(JSON.parse(readFileSync(join(WURZEL, o, f), "utf8")).dateien.map((x) => [x.datei, x.konto])));
  return new Map(e.map((x) => { const st = [x.konto, ...andere.map((m) => m.get(x.datei))]; const z = {}; st.forEach((k) => (z[k] = (z[k] || 0) + 1)); const [k, n] = Object.entries(z).sort((a, b) => b[1] - a[1])[0]; return [x.datei, andere.length >= 2 ? (n >= 2 ? k : null) : x.konto]; })); };

for (const proKlasse of [400]) for (const minGruppen of [2]) {
  const modell = trainiere(lern.map((b) => ({ gruppe: b.gruppe, konto: b.konto, merkmale: merkmale(b.text, b.betrieb) })), { minGruppen, proKlasse });
  const zeile = [];
  for (const [o, name] of Object.entries(NAMEN)) {
    const soll = mehrheit(o); const p = lade(join(WURZEL, o)).filter((b) => soll.get(b.datei));
    const z = {};
    for (const b of p) {
      for (const mitName of [false, true]) {
        const eigen = mitName ? name : "";
        const r = categorize(b.text, eigen ? { eigenerName: eigen } : {});
        const m = vorhersage(modell, merkmale(b.text, eigen));   // ohne hinterlegten Namen kennt auch das Modell ihn nicht
        const fall = { regeln: r.konto, modell: m.konto };
        for (const t of [0, 0.5, 1, 1.5, 2]) fall["kombi2/" + t] = kombiniere(r, m, { schwelle: 2, schwelleOhneHinweis: t, eigen: mitName && istEigenerBeleg(b.text, eigen), nameBekannt: mitName }).konto;
        for (const [k, v] of Object.entries(fall)) { const key = (mitName ? "mit " : "ohne ") + k; z[key] = (z[key] || 0) + (v === soll.get(b.datei) ? 1 : 0); }
      }
    }
    zeile.push({ o, n: p.length, z });
  }
  console.log(`\nproKlasse ${proKlasse}, minGewerbe ${minGruppen}, Merkmale ${Object.keys(modell.gewichte).length}`);
  const keys = Object.keys(zeile[0].z);
  for (const k of keys) console.log("  " + k.padEnd(14) + zeile.map((s) => `${String(s.z[k]).padStart(3)}/${s.n}`).join("  ") + "   Summe Stapel 2+3: " + (zeile[1].z[k] + zeile[2].z[k]));
}
