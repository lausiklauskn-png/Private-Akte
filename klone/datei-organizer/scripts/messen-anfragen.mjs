// Punkt 8: Workflow Calculate liest fremde Anfragen (Regeln: docs/PRUEFSTAPEL-CALCULATE-REGELN.md). Soll = Übereinstimmung der
// Einordner (ERWARTUNG.json, ZWEITER.json[, DRITTER.json]; Mehrheit je Feld). Gemessen wird WC.anfrage.lesen ohne Kundenliste.
// Aufruf: node scripts/messen-anfragen.mjs <stapel> [--calc ../workflow-calculate] [--json datei]
import { readFileSync, existsSync, writeFileSync, readdirSync } from "node:fs"; import { join, resolve } from "node:path"; import { createRequire } from "node:module";
import { wilson } from "./statistik.mjs";
const arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const S = resolve(process.argv[2]), C = resolve(arg("--calc", "../workflow-calculate")), require = createRequire(import.meta.url);
const kernListe = readFileSync(join(C, "tests/kern.mjs"), "utf8").match(/const KERN = \[([\s\S]*?)\];/)[1];
const origLog = console.log; console.log = () => {}; for (const f of eval("[" + kernListe + "]")) require(join(C, f)); console.log = origLog;
const WC = globalThis.WC, kat = JSON.parse(JSON.stringify(WC.START)); WC.katalog.gebietHinzufuegen(kat, WC.STARTKATALOGE.laser);
const ART = { digi_folie: ["Aufkleber/Folie", "Banner"], schild: ["Schild"], tasse: ["Tasse"], kuli: ["Kugelschreiber"], shirt: ["T-Shirt"], fahrzeug: ["Fahrzeugfolierung"], schriftzug: ["Plott-Schriftzug"],
  name_kuli_alu: ["Kugelschreiber"], name_kuli_edelstahl: ["Kugelschreiber"], name_karte_holz: ["Geschenkkarte Holz"], name_schiefer: ["Schiefer-Untersetzer"], name_sektglas: ["Sektglas"], name_leder: ["Schlüsselanhänger Leder"], name_oeffner: ["Flaschenöffner"], name_acryl: ["Tischkarte Acryl"] };
const arten = (id) => ART[id.replace(/_zukauf$/, "")] || [];
const lese = (p) => JSON.parse(readFileSync(p, "utf8"));
const q = ["ERWARTUNG.json", "ZWEITER.json", "DRITTER.json"].filter((f) => existsSync(join(S, f))).map((f) => new Map(lese(join(S, f)).dateien.map((x) => [x.datei, x])));
const mehr = (d, f) => { const v = q.map((m) => JSON.stringify(f(m.get(d)) ?? null)); const z = {}; v.forEach((x) => z[x] = (z[x] || 0) + 1); const t = Object.entries(z).sort((a, b) => b[1] - a[1])[0]; return t[1] >= 2 ? JSON.parse(t[0]) : undefined; };
const norm = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9äöüß]/g, "");
const feld = { absender: [0, 0], email: [0, 0], kundennr: [0, 0], produkt: [0, 0], produktFalsch: 0, menge: [0, 0], masse: [0, 0], farben: [0, 0] }, strittig = {};
const zaehl = (f, soll, ok) => { if (soll === undefined) { strittig[f] = (strittig[f] || 0) + 1; return; } feld[f][1]++; if (ok) feld[f][0]++; };
for (const d of q[0].keys()) {
  const a = WC.anfrage.lesen(readFileSync(join(S, d), "utf8"), kat, []);
  const sa = mehr(d, (x) => x?.absender ? norm(x.absender) : null); zaehl("absender", sa, !!sa && (norm(a.absender?.name).includes(sa) || sa.includes(norm(a.absender?.name)) && norm(a.absender?.name).length > 3));
  const se = mehr(d, (x) => x?.email ? String(x.email).toLowerCase() : null); zaehl("email", se, (se || null) === (a.absender?.email ? String(a.absender.email).toLowerCase() : null));
  const sk = mehr(d, (x) => x?.kundennr ? norm(x.kundennr) : null); zaehl("kundennr", sk, (sk || null) === (a.kundennr ? norm(a.kundennr) : null));
  const sp = mehr(d, (x) => [...new Set((x?.produkte || []).map((p) => p.art).filter((y) => y !== "anderes"))].sort());
  if (sp === undefined) strittig.produkt = (strittig.produkt || 0) + 1; else { const ist = new Set(a.produkte.flatMap((p) => arten(p.vorlage)));
    for (const art of sp) { feld.produkt[1]++; if (ist.has(art)) feld.produkt[0]++; } feld.produktFalsch += a.produkte.filter((p) => !arten(p.vorlage).some((x) => sp.includes(x))).length; }
  const sm = mehr(d, (x) => (x?.produkte || []).filter((p) => p.menge != null).map((p) => p.menge).sort((u, v) => u - v));
  if (sm === undefined) strittig.menge = (strittig.menge || 0) + 1; else { const ist = a.mengen.map((m) => m.menge); for (const m of sm) { feld.menge[1]++; if (ist.includes(m)) feld.menge[0]++; } }
  const sx = mehr(d, (x) => x?.masse ? [x.masse.breiteMm, x.masse.hoeheMm] : null); zaehl("masse", sx, JSON.stringify(sx) === JSON.stringify(a.masse ? [a.masse.breiteMm, a.masse.hoeheMm] : null));
  const sf = mehr(d, (x) => x?.farben ?? null); zaehl("farben", sf, (sf ?? null) === (a.farben ?? null));
}
const p = ([a, b]) => { const [u, o] = wilson(a, b); return `${a}/${b} = ${(100 * a / b).toFixed(1)} % (${Math.round(100 * u)}–${Math.round(100 * o)} %)`; };
for (const [f, w] of Object.entries(feld)) if (Array.isArray(w)) console.log(`${f.padEnd(9)} ${p(w)}${strittig[f] ? ` · strittig ${strittig[f]}` : ""}`);
console.log(`Produkte fälschlich erkannt: ${feld.produktFalsch}`);
if (arg("--json")) writeFileSync(arg("--json"), JSON.stringify({ stapel: S, calc: C, feld, strittig }, null, 1) + "\n");
