// Dritter Blindtest (Regeln 18–22, docs/PRUEFSTAPEL-BLP-REGELN.md): Datum, Steuersatz, Betrag (und Konto, Richtung)
// mit mehreren unabhängigen Einordnern. Soll = Mehrheit (mindestens zwei gleich); ohne Mehrheit „strittig“.
// Danach BookLedgerPro alt und neu je Feld gegen das Mehrheits-Soll (Wilson, McNemar).
// Aufruf: node scripts/mehrheit-felder.mjs <ordner> [--alt pfad] [--neu pfad] [--json datei]
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { wilson, mcnemar } from "./statistik.mjs";

const WURZEL = fileURLToPath(new URL("..", import.meta.url));
const arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const ORDNER = resolve(WURZEL, process.argv[2]);
const lade = (f) => existsSync(join(ORDNER, f)) ? JSON.parse(readFileSync(join(ORDNER, f), "utf8")) : null;
const cents = (s) => { if (s == null) return null; const m = String(s).replace(/\s|€|EUR/g, "").match(/^-?(\d{1,3}(?:\.\d{3})*|\d+),(\d{2})$/); return m ? Number(m[1].replace(/\./g, "")) * 100 + Number(m[2]) : null; };
// Jedes Feld in eine vergleichbare Form bringen; „nichts“ (null) ist ein eigener Wert, kein fehlender.
const FORM = { datum: (v) => v ?? null, ust: (v) => (v === null || v === undefined ? null : Number(v)), betrag: (v) => cents(v), konto: (v) => v ?? null, richtung: (v) => (v ? String(v).toLowerCase() : null) };
const FELDER = Object.keys(FORM);

const erw = lade("ERWARTUNG.json");
const dateien = erw.dateien.map((x) => x.datei);
const einordner = [["Erster (Stapel-Autor)", erw], ["Zweiter (Claude-Agent)", lade("ZWEITER.json")], ["Dritter (fremde KI)", lade("DRITTER.json")]]
  .filter(([, d]) => d).map(([name, d]) => ({ name, modell: d.einordner || null, wert: new Map(d.dateien.map((x) => [x.datei, Object.fromEntries(FELDER.map((f) => [f, FORM[f](x[f])]))])) }));
const fehlend = einordner.map((e) => ({ name: e.name, fehlt: dateien.filter((d) => !e.wert.has(d)).length })).filter((x) => x.fehlt);

const ALT = resolve(WURZEL, arg("--alt", "../lausiklauskn-png/bookledgerpro")), NEU = resolve(WURZEL, arg("--neu", "../bookledgerpro"));
const lies = async (p) => { const x = (await import(join(p, "src/ai/extract.js"))).extractFromText; return (t) => { const r = x(t); return { datum: r.datum ?? null, ust: r.ustSatz ?? null, betrag: r.betragBrutto ?? null }; }; };
const systeme = { alt: await lies(ALT), neu: await lies(NEU) };
const ist = Object.fromEntries(Object.keys(systeme).map((s) => [s, new Map(dateien.map((d) => [d, systeme[s](readFileSync(join(ORDNER, d), "utf8"))]))]));

const ergebnis = { ordner: ORDNER.replace(WURZEL, ""), belege: dateien.length, einordner: einordner.map((e) => ({ name: e.name, modell: e.modell })), fehlend, felder: {} };
const pz = (x) => x.n ? `${x.ok}/${x.n} = ${(100 * x.ok / x.n).toFixed(1)} %` + (x.spanne ? ` (95 %: ${x.spanne.map((v) => (100 * v).toFixed(0)).join("–")} %)` : "") : "nicht gemessen";
console.log(`Mehrere Einordner je Feld, ${ergebnis.ordner}: ${dateien.length} Belege, ${einordner.length} Einordner (${einordner.map((e) => e.modell || e.name).join(" · ")})`);
if (fehlend.length) console.log("⚠ Einträge fehlen:", JSON.stringify(fehlend));
for (const f of FELDER) {
  const w = (e, d) => { const x = e.wert.get(d); return x ? x[f] : undefined; };
  const paare = [];
  for (let i = 0; i < einordner.length; i++) for (let j = i + 1; j < einordner.length; j++)
    paare.push({ a: einordner[i].name, b: einordner[j].name, gleich: dateien.filter((d) => w(einordner[i], d) === w(einordner[j], d)).length, n: dateien.length });
  const soll = new Map(), strittig = []; let einstimmig = 0;
  for (const d of dateien) {
    const z = new Map(); for (const e of einordner) { const k = JSON.stringify(w(e, d)); z.set(k, (z.get(k) || 0) + 1); }
    const [k, n] = [...z.entries()].sort((a, b) => b[1] - a[1])[0];
    const noetig = einordner.length >= 3 ? 2 : einordner.length;      // bei zwei Einordnern zählt nur, wo beide gleich sind
    if (n >= noetig && k !== undefined) { soll.set(d, JSON.parse(k)); if (n === einordner.length) einstimmig++; }
    else strittig.push({ datei: d, stimmen: einordner.map((e) => w(e, d)) });
  }
  const menge = [...soll.keys()];
  const erst = menge.filter((d) => w(einordner[0], d) === soll.get(d)).length;
  const r = { paare, einstimmig, mehrheit: menge.length, strittig, ersterGegenMehrheit: { ok: erst, n: menge.length } };
  if (f in ist.alt.get(dateien[0])) {
    const tr = (s, d) => ist[s].get(d)[f] === soll.get(d);
    r.systeme = Object.fromEntries(Object.keys(systeme).map((s) => { const ok = menge.filter((d) => tr(s, d)).length; return [s, { ok, n: menge.length, spanne: wilson(ok, menge.length) }]; }));
    const nurAlt = menge.filter((d) => tr("alt", d) && !tr("neu", d)).length, nurNeu = menge.filter((d) => tr("neu", d) && !tr("alt", d)).length;
    r.mcnemar = { nurAltRichtig: nurAlt, nurNeuRichtig: nurNeu, p: mcnemar(nurAlt, nurNeu) };
    // dasselbe gegen das Soll des Stapel-Autors allein (zum Vergleich)
    const es = (s, d) => ist[s].get(d)[f] === w(einordner[0], d);
    r.gegenErsten = Object.fromEntries(Object.keys(systeme).map((s) => { const ok = dateien.filter((d) => es(s, d)).length; return [s, { ok, n: dateien.length, spanne: wilson(ok, dateien.length) }]; }));
    r.fehlerNeu = menge.filter((d) => !tr("neu", d)).map((d) => ({ datei: d, ist: ist.neu.get(d)[f], soll: soll.get(d) }));
  }
  ergebnis.felder[f] = r;
  console.log(`\n== ${f} ==`);
  for (const p of paare) console.log(`  ${p.a} ⟷ ${p.b}: ${pz({ ok: p.gleich, n: p.n })} gleich`);
  console.log(`  einstimmig ${einstimmig} · Mehrheit ${menge.length} · strittig ${strittig.length} · Stapel-Autor gegen Mehrheit ${pz(r.ersterGegenMehrheit)}`);
  if (r.systeme) {
    for (const [s, x] of Object.entries(r.systeme)) console.log(`  BookLedgerPro ${s.padEnd(4)} gegen Mehrheit: ${pz(x)}   · gegen Stapel-Autor allein: ${pz(r.gegenErsten[s])}`);
    const m = r.mcnemar; console.log(`  McNemar alt ⟷ neu: nur alt richtig ${m.nurAltRichtig}, nur neu richtig ${m.nurNeuRichtig}, p=${m.p < 0.001 ? m.p.toExponential(1) : m.p.toFixed(3)}${m.p < 0.05 ? (m.nurNeuRichtig > m.nurAltRichtig ? " → neu gesichert besser" : " → alt gesichert besser") : " → kein gesicherter Unterschied"}`);
  }
}
if (arg("--json")) writeFileSync(resolve(WURZEL, arg("--json")), JSON.stringify(ergebnis, null, 1));
