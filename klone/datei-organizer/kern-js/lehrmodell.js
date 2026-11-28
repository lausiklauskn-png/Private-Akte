// Erzeugt aus Datei-Organizer lib/lehrmodell.ts (scripts/kern-js.mjs). Nicht von Hand ändern.
const UNSICHTBAR = /[​-‏‪-‮⁠-⁤﻿­]/g;
function merkmaleAus(text, max = 24) {
  const t = text.replace(UNSICHTBAR, "").normalize("NFC").toLowerCase().replace(/⟦[^⟧]*⟧/g, " ");
  return [...new Set(t.match(/\p{L}{5,}/gu) || [])].slice(0, max);
}
function lehrModell(faelle) {
  var _a;
  const m = { faelle: 0, faecher: {}, woerter: {} };
  for (const f of faelle) {
    if (!f?.bestaetigt || !Array.isArray(f.merkmale)) continue;
    m.faelle++;
    m.faecher[f.bestaetigt] = (m.faecher[f.bestaetigt] || 0) + 1;
    for (const w of new Set(f.merkmale)) {
      const z = (_a = m.woerter)[w] || (_a[w] = {});
      z[f.bestaetigt] = (z[f.bestaetigt] || 0) + 1;
    }
  }
  return m;
}
function lehrVorschlag(m, merkmale, minFaelle = 2) {
  const faecher = Object.keys(m.faecher);
  if (m.faelle < 20 || faecher.length < 2) return null;
  const punkte = {};
  for (const f of faecher) punkte[f] = Math.log(m.faecher[f] / m.faelle);
  let genutzt = 0;
  for (const w of new Set(merkmale)) {
    const z = m.woerter[w];
    if (!z) continue;
    const n = Object.values(z).reduce((a2, b2) => a2 + b2, 0);
    if (n < minFaelle) continue;
    genutzt++;
    for (const f of faecher) punkte[f] += Math.log(((z[f] || 0) + 0.5) / (m.faecher[f] + 0.5 * faecher.length));
  }
  if (genutzt < 3) return null;
  const [a, b] = Object.entries(punkte).sort((x, y) => y[1] - x[1]);
  return { fach: a[0], abstand: a[1] - b[1], woerter: genutzt };
}
const LEHR_ABSTAND = 4;
function lehrAnwenden(d, m, abstand = LEHR_ABSTAND) {
  const k = d.felder.kategorie;
  if (!m || !k || k.sicher || k.quelle !== "regel" || d.bestaetigt?.kategorie) return d;
  const v = lehrVorschlag(m, merkmaleAus(d.volltext || d.kopfText || ""));
  if (!v || v.abstand < abstand || v.fach === k.wert) return d;
  return { ...d, felder: { ...d.felder, kategorie: { wert: v.fach, sicher: false, grund: `aus deinen Best\xE4tigungen gelernt (vorher \u201E${k.wert}\u201C)`, quelle: "gelernt", vorher: k.wert } } };
}
export {
  LEHR_ABSTAND,
  lehrAnwenden,
  lehrModell,
  lehrVorschlag,
  merkmaleAus
};
