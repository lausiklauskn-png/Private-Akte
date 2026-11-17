// Versuchsanlage „rekursive Verbesserung“ (15.11.2026, Regeln docs/PRUEFSTAPEL-REKURSIV-REGELN.md): vergleicht reihum an verbrauchten
// Stapeln, was eine Lernmethode bringt. Nur Abstimmung, kein Nachweis.
//   A  = heutiger Kern (Wortmodell wie ausgeliefert)
//   B  = bisheriges Vorgehen: Wortmodell neu gelernt aus Lehrdaten + allen verbrauchten Stapeln außer dem ausgelassenen
//   C  = B + Schleife (fehlergetriebene Regeln nach Brill, scripts/tbl-lernen.mjs) – gelernt an den Fehlern von B auf den übrigen
//        neuen Stapeln, deren Ausgabe ihrerseits ohne sie selbst und ohne den Teststapel entstand (verschachtelt, keine Leckage)
//   P  = Placebo: wie C, aber mit vertauschten Korrekturen (darf nichts gewinnen)
// Braucht eine Kern-Kopie mit Modell-Haken (globalThis.__WM), siehe --kern. Aufruf:
//   node scripts/rekursiv-versuch.mjs --kern /tmp/claude-0/kern-emu [--neu runde-c,…] [--felder bereich,schriftstueck] [--min 3]
import { readFileSync, existsSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { merkmale as nbMerkmale, trainiere } from "./lehrer-modell.mjs";
import { merkmaleTbl, lernen as tblLernen, anwenden as tblAnwenden } from "./tbl-lernen.mjs";

const W = fileURLToPath(new URL("..", import.meta.url));
const arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const KERN = resolve(arg("--kern", "/tmp/claude-0/kern-emu"));
const NEU = arg("--neu", "familie-k3,runde-c,runde-d,runde-e,runde-f,rest,absender").split(",");
const ALT = ["unabhaengig", "briefe-2", "briefe-a", "briefe-b", "briefe-h", "vermieterin", "vermieterin-2026"];
const FELDER_LERN = arg("--felder", "bereich,schriftstueck").split(",");
const MIN = Number(arg("--min", "3"));

// ---- Soll wie scripts/messen-briefe.mjs ----
const GROB = { "Arbeit & Sozialversicherung": "Rente, Arbeit & Sozialversicherung", "Rente": "Rente, Arbeit & Sozialversicherung", "Einkäufe": "Einkäufe, Rechnungen & Garantien", "Rechnungen & Garantien": "Einkäufe, Rechnungen & Garantien", "Erbschaft": "Erbschaft, Vollmachten & Vorsorge", "Vollmachten & Vorsorge": "Erbschaft, Vollmachten & Vorsorge" };
const norm = (s) => s == null || s === "" || s === "null" ? null : String(s).toLowerCase().replace(/\b(gmbh|ag|e\.?\s?k\.?|kg|ohg|mbh|e\.?\s?v\.?|co\.?|&|und)\b/g, " ").replace(/[^a-zäöüß0-9]+/g, " ").trim() || null;
const leer = (v) => v == null || v === "" || v === "null" ? null : v;
const FORM = { bereich: (x) => { const b = leer(x.bereich ?? x.kategorie); return b ? (GROB[b] ?? b) : null; }, schriftstueck: (x) => leer(x.schriftstueck), absender: (x) => norm(x.absender), person: (x) => norm(x.person), frist: (x) => leer(x.frist) };
const FELDER = Object.keys(FORM);
const ordnerVon = (s) => s.startsWith("/") ? s : join(W, "pruefstapel-" + s);
export function sollVon(s) {
  const o = ordnerVon(s);
  if (existsSync(join(o, "SOLL.json"))) return new Map(JSON.parse(readFileSync(join(o, "SOLL.json"), "utf8")).dateien.map((x) => [x.datei, Object.fromEntries(FELDER.map((k) => [k, (x.strittig || []).includes(k) ? undefined : FORM[k](x)]))]));
  const e = JSON.parse(readFileSync(join(o, "ERWARTUNG.json"), "utf8"));
  const q = [e, ...["ZWEITER.json", "DRITTER.json"].filter((f) => existsSync(join(o, f))).map((f) => JSON.parse(readFileSync(join(o, f), "utf8")))].map((d) => new Map(d.dateien.map((x) => [x.datei, x])));
  if (q.length === 1) return new Map(e.dateien.map((x) => [x.datei, Object.fromEntries(FELDER.map((k) => [k, FORM[k](x)]))]));
  return new Map(e.dateien.map((x) => [x.datei, Object.fromEntries(FELDER.map((k) => { const z = new Map(); for (const m of q) { const v = JSON.stringify(m.has(x.datei) ? FORM[k](m.get(x.datei)) : "fehlt"); z.set(v, (z.get(v) || 0) + 1); }
    const [v, n] = [...z.entries()].sort((a, b) => b[1] - a[1])[0]; return [k, n >= 2 ? JSON.parse(v) : undefined]; }))]));
}

// ---- Wortmodell lernen (wie scripts/briefmodell-abstimmen.mjs) ----
const namen = (o) => { const f = join(o, "HAUSHALTE.json"); return existsSync(f) ? JSON.parse(readFileSync(f, "utf8")).haushalte.flatMap((h) => [h.name, ...h.personen.flatMap((p) => [p.vorname, p.name])]).join(" ") : ""; };
const nbCache = new Map();
function nbBelege(s) {
  if (nbCache.has(s)) return nbCache.get(s);
  const o = ordnerVon(s), eig = namen(o), soll = sollVon(s);
  const b = [...soll].filter(([d]) => existsSync(join(o, d))).map(([d, x]) => ({ gruppe: s, bereich: x.bereich ?? null, art: x.schriftstueck ?? null, merkmale: nbMerkmale(readFileSync(join(o, d), "utf8"), eig) }));
  nbCache.set(s, b); return b;
}
const LO = join(W, "lehrdaten-briefe"), LEHR = readdirSync(LO).map((u) => join(LO, u)).filter((u) => existsSync(join(u, "ERWARTUNG.json")));
const lehrBel = LEHR.flatMap((o) => { const eig = namen(o); return JSON.parse(readFileSync(join(o, "ERWARTUNG.json"), "utf8")).dateien.map((x) => ({ gruppe: o, bereich: FORM.bereich(x), art: FORM.schriftstueck(x), merkmale: nbMerkmale(readFileSync(join(o, x.datei), "utf8"), eig) })); });
const gen = readFileSync(join(W, "ergebnisse/trainingsdaten.jsonl"), "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)).filter((x) => x.text.length > 50 && x.soll.schriftstueck && x.soll.schriftstueck !== "Foto");
const jeH = {}; const genBel = gen.filter((x, i) => i % 7 === 0 && (jeH[x.haushalt] = (jeH[x.haushalt] || 0) + 1) <= 60).map((x) => ({ gruppe: "gen-" + x.haushalt, bereich: null, art: x.soll.schriftstueck, merkmale: nbMerkmale(x.text, "") }));
const OPT = { minGruppen: 2, proKlasse: 250 };
export function wortmodell(stapel) {
  const bel = [...lehrBel, ...stapel.flatMap(nbBelege)];
  const t = (feld, extra) => trainiere([...bel, ...extra].filter((b) => b[feld]).map((b) => ({ gruppe: b.gruppe, konto: b[feld], merkmale: b.merkmale })), OPT);
  // „Foto“ ist eine Form, keine Art aus dem Text (ein einziges Stück in der Lernstadt kippte sonst das ganze Wortmodell)
  return { bereich: t("bereich", []), art: trainiere([...bel, ...genBel].filter((b) => b.art && b.art !== "Foto").map((b) => ({ gruppe: b.gruppe, konto: b.art, merkmale: b.merkmale })), OPT) };
}

// ---- Kern laufen lassen ----
const L = (f) => import(join(KERN, "lib", f));
const [{ einlesen }, { siebe }, { absenderVereinheitlichen }, { personZuordnen }] = await Promise.all([L("einlesen.ts"), L("siebe.ts"), L("abgleich.ts"), L("personen.ts")]);
export const KERN_PFAD = KERN;
export async function lauf(s, modell) {
  globalThis.__WM = modell || undefined;
  const o = ordnerVon(s), soll = sollVon(s);
  const hh = existsSync(join(o, "HAUSHALTE.json")) ? Object.fromEntries(JSON.parse(readFileSync(join(o, "HAUSHALTE.json"), "utf8")).haushalte.map((h) => [h.id, h])) : {};
  const e = new Map(JSON.parse(readFileSync(join(o, "ERWARTUNG.json"), "utf8")).dateien.map((x) => [x.datei, x]));
  const ds = []; let i = 0;
  for (const d of soll.keys()) { if (!existsSync(join(o, d))) continue; const t = await einlesen({ pfad: d, name: d, geaendert: Date.UTC(2026, 10, 1) + i++, bytes: new Uint8Array(readFileSync(join(o, d))) }, async () => "", 0, async () => ""); t[0].pfad = d; ds.push(...t); }
  const rec = {}; let cur; globalThis.__REC = (f, r, t) => { (rec[cur] ||= {})[f] = { wert: r ? FORM[f]({ [f]: r.wert }) : null, sicher: !!r?.sicher, roh: r?.wert ?? null, text: t }; };
  const org = new Map(absenderVereinheitlichen(ds.map((d) => { cur = d.pfad; return siebe(d, 5, []); })).map((d) => [d.pfad, d]));
  globalThis.__REC = undefined;
  globalThis.__WM = undefined;
  return [...soll].filter(([d]) => org.has(d)).map(([d, sw]) => { const x = org.get(d), f = x.felder || {}, h = hh[e.get(d)?.haushalt];
    const p = h ? personZuordnen(`${x.email?.an || ""}\n${x.volltext || ""}`, f.betrifft?.wert, h) : undefined;
    const w = { bereich: f.kategorie, schriftstueck: f.schriftstueck, absender: f.absender, person: p, frist: f.frist };
    const rat = Object.fromEntries(FELDER.map((k) => [k, FORM[k]({ [k]: w[k]?.wert })]));
    return { stapel: s, datei: d, soll: sw, rat, regel: rec[d] || {}, text: x.volltext || readFileSync(join(o, d), "utf8") }; });
}

// ---- Zählen ----
const zaehle = (zeilen, sicht) => { const z = {}; for (const f of FELDER) { const m = zeilen.filter((r) => r.soll[f] !== undefined && !(f === "person" && r.soll[f] === null)); z[f] = { ok: m.filter((r) => sicht(r)[f] === r.soll[f]).length, n: m.length }; } return z; };
const pr = (z) => FELDER.map((f) => `${f.slice(0, 6)} ${(100 * z[f].ok / z[f].n).toFixed(1)}`).join(" · ") + ` · gesamt ${(100 * FELDER.reduce((a, f) => a + z[f].ok, 0) / FELDER.reduce((a, f) => a + z[f].n, 0)).toFixed(2)}`;

// ---- Schicht nach Brill über die Ausgabe ----
function tblSchicht(lernZeilen, placebo = false) {
  const regeln = {};
  for (const f of FELDER_LERN) {
    const anders = f === "bereich" ? "schriftstueck" : "bereich";
    let daten = lernZeilen.filter((r) => r.soll[f] != null).map((r) => ({ soll: r.soll[f], rat: r.rat[f] ?? "-", m: merkmaleTbl(r.text, { absender: r.rat.absender, anders: r.rat[anders] }) }));
    if (placebo) { const s = daten.map((d) => d.soll); for (let i = s.length - 1; i > 0; i--) { const j = (i * 7919 + 13) % (i + 1); [s[i], s[j]] = [s[j], s[i]]; } daten = daten.map((d, i) => ({ ...d, soll: s[i] })); }
    regeln[f] = tblLernen(daten, MIN, 200);
  }
  return (r) => { const a = { ...r.rat }; for (const f of FELDER_LERN) { const anders = f === "bereich" ? "schriftstueck" : "bereich"; a[f] = tblAnwenden(regeln[f], r.rat[f] ?? "-", merkmaleTbl(r.text, { absender: r.rat.absender, anders: r.rat[anders] })); if (a[f] === "-") a[f] = null; } return a; };
}

if (process.argv[1].endsWith("rekursiv-versuch.mjs")) {
  const alle = { A: [], B: [], C: [], P: [] }, flips = { B: [0, 0], C: [0, 0] };
  for (const t of NEU) {
    const a = await lauf(t, null);
    const b = await lauf(t, wortmodell([...ALT, ...NEU.filter((x) => x !== t)]));
    // verschachtelt: Ausgabe der übrigen neuen Stapel ohne sie selbst und ohne t
    const lernZ = [];
    for (const s of NEU.filter((x) => x !== t)) lernZ.push(...await lauf(s, wortmodell([...ALT, ...NEU.filter((x) => x !== t && x !== s)])));
    const c = tblSchicht(lernZ), p = tblSchicht(lernZ, true);
    const cz = b.map((r) => ({ ...r, rat: c(r) })), pz = b.map((r) => ({ ...r, rat: p(r) }));
    alle.A.push(...a); alle.B.push(...b); alle.C.push(...cz); alle.P.push(...pz);
    for (const [k, v] of [["B", b], ["C", cz]]) for (const [i, r] of v.entries()) for (const f of FELDER) { if (r.soll[f] === undefined) continue; const vor = a[i].rat[f] === r.soll[f], nach = r.rat[f] === r.soll[f]; if (vor && !nach) flips[k][0]++; if (!vor && nach) flips[k][1]++; }
    console.log(`${t.padEnd(12)} A ${pr(zaehle(a, (r) => r.rat))}`);
    console.log(`${"".padEnd(12)} B ${pr(zaehle(b, (r) => r.rat))}`);
    console.log(`${"".padEnd(12)} C ${pr(zaehle(cz, (r) => r.rat))}`);
    console.log(`${"".padEnd(12)} P ${pr(zaehle(pz, (r) => r.rat))}`);
  }
  for (const k of Object.keys(alle)) console.log(`ALLE ${k} ${pr(zaehle(alle[k], (r) => r.rat))}`);
  console.log(`Flips gegen A (verdorben/behoben): B ${flips.B.join("/")} · C ${flips.C.join("/")}`);
  if (arg("--aus")) writeFileSync(arg("--aus"), JSON.stringify(Object.fromEntries(Object.entries(alle).map(([k, v]) => [k, v.map((r) => ({ stapel: r.stapel, datei: r.datei, soll: r.soll, rat: r.rat }))]))));
}
