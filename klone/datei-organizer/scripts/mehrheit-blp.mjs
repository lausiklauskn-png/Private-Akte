// Mehrere unabhängige Einordner am selben Belegstapel (Regeln 14–17, docs/PRUEFSTAPEL-BLP-REGELN.md):
// Übereinstimmung je Paar, Fleiss' Kappa, Mehrheits-Soll (mindestens zwei gleich), strittige Belege getrennt;
// danach BookLedgerPro alt und neu gegen das Mehrheits-Soll (Wilson, McNemar).
// Aufruf: node scripts/mehrheit-blp.mjs <ordner> --eigen "Betriebsname" [--json datei]
//   Einordner für Mehrheit und Kappa: ERWARTUNG.json, ZWEITER.json, DRITTER.json (was davon da ist).
//   BAUPLAN-ERGEBNIS.json (fremder Bauplan, darf null liefern) wird daneben berichtet, zählt aber nicht zur Mehrheit.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { wilson, mcnemar } from "./statistik.mjs";

const WURZEL = fileURLToPath(new URL("..", import.meta.url));
const arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const ORDNER = resolve(WURZEL, process.argv[2]);
const EIGEN = arg("--eigen", "");
const lade = (f) => existsSync(join(ORDNER, f)) ? JSON.parse(readFileSync(join(ORDNER, f), "utf8")) : null;

const erw = lade("ERWARTUNG.json");
const dateien = erw.dateien.map((x) => x.datei);
const einordner = [["Erster (Stapel-Autor)", erw], ["Zweiter (Claude-Agent)", lade("ZWEITER.json")], ["Dritter (fremde KI)", lade("DRITTER.json")]]
  .filter(([, d]) => d).map(([name, d]) => ({ name, modell: d.einordner || null, konto: new Map(d.dateien.map((x) => [x.datei, x.konto ?? null])), richtung: new Map(d.dateien.map((x) => [x.datei, x.richtung ? String(x.richtung).toLowerCase() : null])) }));
const bauplan = lade("BAUPLAN-ERGEBNIS.json");

// Übereinstimmung je Paar
const paare = [];
for (let i = 0; i < einordner.length; i++) for (let j = i + 1; j < einordner.length; j++) {
  const gleich = dateien.filter((d) => einordner[i].konto.get(d) === einordner[j].konto.get(d)).length;
  paare.push({ a: einordner[i].name, b: einordner[j].name, gleich, n: dateien.length });
}
// Fleiss' Kappa über alle Einordner
function fleiss() {
  const m = einordner.length, N = dateien.length; if (m < 2) return null;
  const kat = [...new Set(einordner.flatMap((e) => dateien.map((d) => e.konto.get(d))))];
  let Pquer = 0; const pj = Object.fromEntries(kat.map((k) => [k, 0]));
  for (const d of dateien) {
    const n = Object.fromEntries(kat.map((k) => [k, 0])); for (const e of einordner) n[e.konto.get(d)]++;
    Pquer += (kat.reduce((s, k) => s + n[k] * n[k], 0) - m) / (m * (m - 1));
    for (const k of kat) pj[k] += n[k];
  }
  Pquer /= N; const Pe = kat.reduce((s, k) => s + (pj[k] / (N * m)) ** 2, 0);
  return (Pquer - Pe) / (1 - Pe);
}
// Mehrheits-Soll
const mehrheit = new Map(), strittig = [], einstimmig = [];
for (const d of dateien) {
  const z = {}; for (const e of einordner) { const k = e.konto.get(d); z[k] = (z[k] || 0) + 1; }
  const [k, n] = Object.entries(z).sort((a, b) => b[1] - a[1])[0];
  if (n >= 2 && k !== "null") { mehrheit.set(d, k); if (n === einordner.length) einstimmig.push(d); }
  else strittig.push({ datei: d, stimmen: einordner.map((e) => e.konto.get(d)) });
}
const mehrheitRichtung = new Map(dateien.map((d) => { const z = {}; for (const e of einordner) { const r = e.richtung.get(d); if (r) z[r] = (z[r] || 0) + 1; } const s = Object.entries(z).sort((a, b) => b[1] - a[1])[0]; return [d, s && s[1] >= 2 ? s[0] : null]; }));

// BookLedgerPro alt/neu
const ALT = resolve(WURZEL, arg("--alt", "../lausiklauskn-png/bookledgerpro")), NEU = resolve(WURZEL, arg("--neu", "../bookledgerpro"));
const catAlt = (await import(join(ALT, "src/ai/categorize.js"))).categorize, catNeu = (await import(join(NEU, "src/ai/categorize.js"))).categorize;
const text = (d) => readFileSync(join(ORDNER, d), "utf8");
const systeme = { alt: (t) => catAlt(t), "neu ohne Namen": (t) => catNeu(t), "neu mit Namen": (t) => catNeu(t, { eigenerName: EIGEN }) };
const ist = Object.fromEntries(Object.keys(systeme).map((s) => [s, new Map(dateien.map((d) => [d, systeme[s](text(d))]))]));
const messe = (soll, feld, menge) => Object.fromEntries(Object.keys(systeme).map((s) => { const ok = menge.filter((d) => ist[s].get(d)[feld] === soll.get(d)).length; return [s, { ok, n: menge.length, spanne: wilson(ok, menge.length) }]; }));
const mcn = (soll, feld, menge, a, b) => { const nurA = menge.filter((d) => ist[a].get(d)[feld] === soll.get(d) && ist[b].get(d)[feld] !== soll.get(d)).length, nurB = menge.filter((d) => ist[b].get(d)[feld] === soll.get(d) && ist[a].get(d)[feld] !== soll.get(d)).length; return { nurAltRichtig: nurA, nurNeuRichtig: nurB, p: mcnemar(nurA, nurB) }; };
const mitMehrheit = dateien.filter((d) => mehrheit.has(d)), mitRichtung = dateien.filter((d) => mehrheitRichtung.get(d));
const erstSoll = new Map(erw.dateien.map((x) => [x.datei, x.konto]));
const ergebnis = {
  ordner: ORDNER.replace(WURZEL, ""), belege: dateien.length, einordner: einordner.map((e) => ({ name: e.name, modell: e.modell })),
  paare, fleissKappa: fleiss(), einstimmig: einstimmig.length, mehrheit: mitMehrheit.length, strittig,
  ersterGegenMehrheit: { ok: mitMehrheit.filter((d) => erstSoll.get(d) === mehrheit.get(d)).length, n: mitMehrheit.length },
  konto: { sollErster: messe(erstSoll, "konto", dateien), sollMehrheit: messe(mehrheit, "konto", mitMehrheit), sollEinstimmig: messe(mehrheit, "konto", einstimmig) },
  richtung: { sollMehrheit: messe(mehrheitRichtung, "richtung", mitRichtung) },
  mcnemar: { "Konto, Mehrheit, ohne Namen": mcn(mehrheit, "konto", mitMehrheit, "alt", "neu ohne Namen"), "Konto, Mehrheit, mit Namen": mcn(mehrheit, "konto", mitMehrheit, "alt", "neu mit Namen"), "Richtung, Mehrheit, ohne Namen": mcn(mehrheitRichtung, "richtung", mitRichtung, "alt", "neu ohne Namen"), "Richtung, Mehrheit, mit Namen": mcn(mehrheitRichtung, "richtung", mitRichtung, "alt", "neu mit Namen") },
};
if (bauplan) {
  const b = new Map(bauplan.dateien.map((x) => [x.datei, x.konto ?? null]));
  const mitKonto = mitMehrheit.filter((d) => b.get(d) != null);
  ergebnis.bauplan = { modell: bauplan.einordner, ohneKonto: dateien.filter((d) => b.get(d) == null).length, unsicher: bauplan.dateien.filter((x) => x.sicher === false).length,
    gegenMehrheitAlle: { ok: mitMehrheit.filter((d) => b.get(d) === mehrheit.get(d)).length, n: mitMehrheit.length }, gegenMehrheitWoKonto: { ok: mitKonto.filter((d) => b.get(d) === mehrheit.get(d)).length, n: mitKonto.length } };
}
const pz = (x) => x.n ? `${x.ok}/${x.n} = ${(100 * x.ok / x.n).toFixed(1)} %` + (x.spanne ? ` (95 %: ${x.spanne.map((v) => (100 * v).toFixed(0)).join("–")} %)` : "") : "nicht gemessen";
console.log(`Mehrere Einordner, ${ergebnis.ordner}: ${dateien.length} Belege, ${einordner.length} Einordner\n`);
for (const p of paare) console.log(`${p.a} ⟷ ${p.b}: ${pz({ ok: p.gleich, n: p.n })} gleich`);
console.log(`Fleiss' Kappa: ${ergebnis.fleissKappa?.toFixed(3)} · einstimmig ${einstimmig.length} · Mehrheit ${mitMehrheit.length} · strittig ${strittig.length}`);
console.log(`Soll des ersten Einordners gegen die Mehrheit: ${pz(ergebnis.ersterGegenMehrheit)}`);
for (const [titel, t] of [["Konto, Soll = erster Einordner (wie berichtet)", ergebnis.konto.sollErster], ["Konto, Soll = Mehrheit", ergebnis.konto.sollMehrheit], ["Konto, nur einstimmige Belege", ergebnis.konto.sollEinstimmig], ["Richtung, Soll = Mehrheit", ergebnis.richtung.sollMehrheit]]) {
  console.log(`\n${titel}`); for (const [s, x] of Object.entries(t)) console.log(`  ${s.padEnd(15)} ${pz(x)}`);
}
console.log(""); for (const [k, v] of Object.entries(ergebnis.mcnemar)) console.log(`McNemar ${k}: nur alt richtig ${v.nurAltRichtig}, nur neu richtig ${v.nurNeuRichtig}, p=${v.p < 0.001 ? v.p.toExponential(1) : v.p.toFixed(3)}`);
if (ergebnis.bauplan) console.log(`\nFremder Bauplan, von Claude ausgeführt: ohne Konto ${ergebnis.bauplan.ohneKonto}, unsicher ${ergebnis.bauplan.unsicher}; gegen Mehrheit ${pz(ergebnis.bauplan.gegenMehrheitAlle)} (alle), ${pz(ergebnis.bauplan.gegenMehrheitWoKonto)} (wo er ein Konto nennt)`);
if (strittig.length) console.log("\nStrittig:", strittig.map((s) => `${s.datei} [${s.stimmen.join("/")}]`).join("; "));
if (arg("--json")) writeFileSync(resolve(WURZEL, arg("--json")), JSON.stringify(ergebnis, null, 1));
