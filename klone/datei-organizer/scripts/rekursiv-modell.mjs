// Dritte Versuchsreihe (15.11.2026): stärkeres gelerntes Modell für Bereich und Art – gemitteltes Perzeptron (lineares Modell,
// Online-Lernen aus Fehlern: falsch geraten → Gewichte zur Korrektur hin verschieben) mit Merkmalen nach Lage im Brief
// (Kopf, Betreffzeile, Rumpf, Wortpaare). Vergleich reihum gegen das bisherige Wortmodell (Naive Bayes), nur Modell allein.
// Nur Abstimmung an verbrauchten Stapeln, kein Nachweis. Aufruf: node scripts/rekursiv-modell.mjs [--feld art|bereich] [--runden 8]
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { merkmale as nbMerkmale, trainiere, vorhersage } from "./lehrer-modell.mjs";
const V = await import("./rekursiv-versuch.mjs");
const W = fileURLToPath(new URL("..", import.meta.url));
const arg = (n, v) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : v; };
const FELD = arg("--feld", "art"), RUNDEN = Number(arg("--runden", "8"));
const NEU = arg("--neu", "familie-k3,runde-c,runde-d,runde-e,runde-f,rest,absender").split(",");
const ALT = ["unabhaengig", "briefe-2", "briefe-a", "briefe-b", "briefe-h", "vermieterin", "vermieterin-2026"];
const GROB = { "Arbeit & Sozialversicherung": "Rente, Arbeit & Sozialversicherung", "Rente": "Rente, Arbeit & Sozialversicherung", "Einkäufe": "Einkäufe, Rechnungen & Garantien", "Rechnungen & Garantien": "Einkäufe, Rechnungen & Garantien", "Erbschaft": "Erbschaft, Vollmachten & Vorsorge", "Vollmachten & Vorsorge": "Erbschaft, Vollmachten & Vorsorge" };

const STOPP = new Set("der die das und oder für von vom mit bei den dem des ein eine einer eines einem einen ist sind wird wurde werden auf aus zum zur nach bis über unter ihre ihr ihrem ihren ihres wir sie uns unser unsere unserer bitte danke vielen dank gmbh kg ohg ag mbh tel telefon fax mail www http https iban bic bank blz str straße strasse weg platz allee ring nr seite datum eur euro".split(" "));
export function merkmaleLage(text, eigen = new Set()) {
  const zeilen = text.split(/\r?\n/).map((z) => z.trim()).filter(Boolean);
  const w = (s) => (s.toLowerCase().match(/[a-zäöüß]{3,}/g) || []).filter((x) => !STOPP.has(x) && !eigen.has(x));
  const m = new Set();
  const an = zeilen.findIndex((z) => /^(sehr geehrte|liebe|lieber|hallo|guten tag|moin)/i.test(z));
  const kopfEnde = an > 0 ? an : Math.min(12, zeilen.length);
  const kopf = w(zeilen.slice(0, kopfEnde).join(" ")), rumpf = w(zeilen.slice(kopfEnde).join(" "));
  const betr = zeilen.filter((z) => /^(betreff|betr\.|re:|aw:|wg\.|subject)/i.test(z)); if (an > 0) betr.push(...zeilen.slice(Math.max(0, an - 2), an));
  for (const x of kopf) m.add("k:" + x);
  for (const x of w(betr.join(" "))) m.add("b:" + x);
  const alle = [...kopf, ...rumpf]; for (const x of alle) m.add("t:" + x);
  if (!globalThis.__OHNE_PAARE) for (let i = 0; i + 1 < alle.length; i++) m.add("p:" + alle[i] + " " + alle[i + 1]);
  if (an >= 0) m.add("x:anrede"); if (/^(von|from):/im.test(text)) m.add("x:mail");
  if (/(?<![\d,.])19(?:[.,]0{1,2})?\s?%/.test(text)) m.add("x:19"); if (/(?<![\d,.])7(?:[.,]0{1,2})?\s?%/.test(text)) m.add("x:7");
  if (/\d+[.,]\d{2}\s*(€|eur)/i.test(text)) m.add("x:betrag"); if (zeilen.length < 15) m.add("x:kurz"); else if (zeilen.length > 60) m.add("x:lang");
  return [...m];
}
// gemitteltes Perzeptron (mehrere Klassen)
export function perzeptron(belege0, runden = RUNDEN, minGruppen = Number(arg("--minGruppen", "1"))) {
  // Merkmale, die nur in einer Gruppe (Stapel/Lehrordner) vorkommen, sind meist Namen und Orte dieser Welt – sie lernen auswendig
  const gr = new Map(); if (minGruppen > 1) for (const b of belege0) for (const f of b.x) { let g = gr.get(f); if (!g) gr.set(f, g = new Set()); if (g.size < minGruppen) g.add(b.g); }
  const belege = minGruppen > 1 ? belege0.map((b) => ({ ...b, x: b.x.filter((f) => gr.get(f).size >= minGruppen) })) : belege0;
  const klassen = [...new Set(belege.map((b) => b.y))].sort(), K = new Map(klassen.map((k, i) => [k, i]));
  const w = new Map(), u = new Map(); let c = 1;
  const get = (m, f) => { let g = m.get(f); if (!g) m.set(f, g = new Float64Array(klassen.length)); return g; };
  const ord = belege.map((_, i) => i);
  for (let r = 0; r < runden; r++) {
    for (let i = ord.length - 1; i > 0; i--) { const j = (i * 2654435761 + r * 97) % (i + 1); [ord[i], ord[j]] = [ord[j], ord[i]]; }
    for (const i of ord) { const b = belege[i], s = new Float64Array(klassen.length);
      for (const f of b.x) { const g = w.get(f); if (g) for (let k = 0; k < g.length; k++) s[k] += g[k]; }
      let a = 0; for (let k = 1; k < s.length; k++) if (s[k] > s[a]) a = k; const y = K.get(b.y);
      if (a !== y) for (const f of b.x) { const g = get(w, f), h = get(u, f); g[y] += 1; g[a] -= 1; h[y] += c; h[a] -= c; }
      c++; }
  }
  const gew = new Map(); for (const [f, g] of w) { const h = u.get(f), n = new Float64Array(g.length); for (let k = 0; k < g.length; k++) n[k] = g[k] - h[k] / c; gew.set(f, n); }
  return { klassen, gew };
}
export function ratePz(m, x) { const s = new Float64Array(m.klassen.length); for (const f of x) { const g = m.gew.get(f); if (g) for (let k = 0; k < g.length; k++) s[k] += g[k]; }
  let a = 0; for (let k = 1; k < s.length; k++) if (s[k] > s[a]) a = k; let b = a ? 0 : 1; for (let k = 0; k < s.length; k++) if (k !== a && s[k] > s[b]) b = k; return { wert: m.klassen[a], abstand: s[a] - s[b] }; }

const namenSet = (o) => { const f = join(o, "HAUSHALTE.json"); return new Set(existsSync(f) ? JSON.parse(readFileSync(f, "utf8")).haushalte.flatMap((h) => [h.name, ...h.personen.flatMap((p) => [p.vorname, p.name])]).join(" ").toLowerCase().match(/[a-zäöüß]{3,}/g) || [] : []); };
const ordnerVon = (s) => s.startsWith("/") ? s : join(W, "pruefstapel-" + s);
const cache = new Map();
export function belege(s) {
  if (cache.has(s)) return cache.get(s);
  const o = ordnerVon(s), eig = namenSet(o), soll = V.sollVon(s);
  const b = [...soll].filter(([d]) => existsSync(join(o, d))).map(([d, x]) => { const t = readFileSync(join(o, d), "utf8"); return { gruppe: s, datei: d, bereich: x.bereich ?? null, art: x.schriftstueck ?? null, x: merkmaleLage(t, eig), nb: nbMerkmale(t, [...eig].join(" ")) }; });
  cache.set(s, b); return b;
}
const LO = join(W, "lehrdaten-briefe"), LEHR = readdirSync(LO).map((u) => join(LO, u)).filter((u) => existsSync(join(u, "ERWARTUNG.json")));
const lehr = LEHR.flatMap((o) => { const eig = namenSet(o); return JSON.parse(readFileSync(join(o, "ERWARTUNG.json"), "utf8")).dateien.map((x) => { const t = readFileSync(join(o, x.datei), "utf8"), b = x.bereich ?? x.kategorie; return { gruppe: o, bereich: b ? (GROB[b] ?? b) : null, art: x.schriftstueck || null, x: merkmaleLage(t, eig), nb: nbMerkmale(t, [...eig].join(" ")) }; }); });

if (process.argv[1].endsWith("rekursiv-modell.mjs")) {
  let nbOk = 0, pzOk = 0, n = 0;
  for (const t of NEU) {
    const lern = [...lehr, ...[...ALT, ...NEU.filter((x) => x !== t)].flatMap(belege)].filter((b) => b[FELD]);
    const test = belege(t).filter((b) => b[FELD]);
    const nb = trainiere(lern.map((b) => ({ gruppe: b.gruppe, konto: b[FELD], merkmale: b.nb })), { minGruppen: 2, proKlasse: 250 });
    const pz = perzeptron(lern.map((b) => ({ y: b[FELD], x: b.x, g: b.gruppe })));
    const a = test.filter((b) => vorhersage(nb, b.nb).konto === b[FELD]).length, c = test.filter((b) => ratePz(pz, b.x).wert === b[FELD]).length;
    nbOk += a; pzOk += c; n += test.length;
    console.log(`${t.padEnd(12)} n=${test.length} NB ${(100 * a / test.length).toFixed(1)} · Perzeptron ${(100 * c / test.length).toFixed(1)}`);
  }
  console.log(`ALLE ${FELD}: NB ${(100 * nbOk / n).toFixed(2)} · Perzeptron ${(100 * pzOk / n).toFixed(2)} (n=${n})`);
}

/** Kleines Modell für den Kern: nur Merkmale mit spürbarem Gewicht, Gewichte gerundet, dünn gespeichert [klasse, gewicht, …]. */
export function kompakt(m, schwelle = 0.5, stellen = 1) {
  const f10 = 10 ** stellen, gewichte = {};
  for (const [f, g] of m.gew) { let mx = 0; for (const v of g) mx = Math.max(mx, Math.abs(v)); if (mx < schwelle) continue;
    const d = []; for (let k = 0; k < g.length; k++) { const v = Math.round(g[k] * f10) / f10; if (v) d.push(k, v); } if (d.length) gewichte[f] = d; }
  return { fassung: 1, klassen: m.klassen, gewichte };
}
export function rateKompakt(m, x) { const s = new Float64Array(m.klassen.length); for (const f of x) { const g = m.gewichte[f]; if (g) for (let i = 0; i < g.length; i += 2) s[g[i]] += g[i + 1]; }
  let a = 0; for (let k = 1; k < s.length; k++) if (s[k] > s[a]) a = k; let b = a ? 0 : 1; for (let k = 0; k < s.length; k++) if (k !== a && s[k] > s[b]) b = k; return { wert: m.klassen[a], abstand: s[a] - s[b] }; }
if (process.argv[1].endsWith("rekursiv-modell.mjs") && process.argv.includes("--kompakt")) {
  for (const sw of [0, 0.5, 1, 2, 3]) { let ok = 0, n = 0, groesse = 0;
    for (const t of NEU) { const lern = [...lehr, ...[...ALT, ...NEU.filter((x) => x !== t)].flatMap(belege)].filter((b) => b[FELD]);
      const k = kompakt(perzeptron(lern.map((b) => ({ y: b[FELD], x: b.x, g: b.gruppe }))), sw); groesse = JSON.stringify(k).length;
      for (const b of belege(t).filter((b) => b[FELD])) { n++; if (rateKompakt(k, b.x).wert === b[FELD]) ok++; } }
    console.log(`Schwelle ${sw}: ${(100 * ok / n).toFixed(2)} % · ${Math.round(groesse / 1024)} KB`); }
}
