// Erzeugt aus Datei-Organizer lib/index-format.ts (scripts/kern-js.mjs). Nicht von Hand ändern.
import { dringlichkeit } from "./erkennen.js";
import { STUFEN } from "./siebe.js";
const INDEX_FORMAT = "datei-organizer-index";
const INDEX_FASSUNG = 1;
const INDEX_DATEI = "organizer-index.json";
const TEXT_MAX = 2e4;
const sicherheit = (v) => !v ? void 0 : v.quelle === "du" ? "von dir" : v.quelle === "gelernt" ? "gelernt" : v.sicher ? "sicher" : "bitte pr\xFCfen";
function kurzfassung(d) {
  const f = d.felder;
  if (d.auffaellig) return `Gesperrt: ${d.auffaellig}.`;
  if (d.doppeltVon) return `Doppelt (gleicher Inhalt wie ${d.doppeltVon}).`;
  const teile = [
    f.schriftstueck?.wert,
    f.absender && f.absender.wert !== "unbekannt" ? `von ${f.absender.wert}` : "",
    f.datum ? `vom ${deutsch(f.datum.wert)}` : "",
    f.betrifft && !["unbekannt", "allgemein"].includes(f.betrifft.wert) ? `f\xFCr ${f.betrifft.wert}` : "",
    f.betrag ? `\xFCber ${f.betrag.wert}` : "",
    f.frist ? `Frist ${deutsch(f.frist.wert)}` : ""
  ].filter(Boolean);
  return teile.length ? `${teile.join(", ")}.` : "Noch nicht gesiebt.";
}
const deutsch = (iso) => /^\d{4}-\d{2}-\d{2}/.test(iso) ? `${iso.slice(8, 10)}.${iso.slice(5, 7)}.${iso.slice(0, 4)}` : iso;
function abschnitte(d, text, max = 900) {
  const kopf = [d.felder.schriftstueck?.wert, d.felder.absender?.wert, d.felder.kategorie?.wert, d.felder.datum ? deutsch(d.felder.datum.wert) : ""].filter(Boolean).join(" \xB7 ");
  const bloecke = text.split(/\n\s*\n/).map((b) => b.replace(/\s+/g, " ").trim()).filter(Boolean);
  const aus = [];
  let jetzt = "";
  for (const b of bloecke) {
    if ((jetzt + " " + b).length > max && jetzt) {
      aus.push(jetzt);
      jetzt = "";
    }
    jetzt = jetzt ? `${jetzt} ${b}` : b;
    while (jetzt.length > max) {
      aus.push(jetzt.slice(0, max));
      jetzt = jetzt.slice(max);
    }
  }
  if (jetzt) aus.push(jetzt);
  return aus.slice(0, 40).map((a) => `[${kopf}] ${a}`);
}
function steckbrief(d, heute, mitText = true) {
  const f = d.felder;
  const s = {
    pfad: d.pfad,
    name: d.name,
    groesse: d.groesse,
    sha256: d.sha256,
    art: d.artText,
    archivnummer: d.archivnummer,
    pruefstand: d.auffaellig ? "auff\xE4llig" : d.doppeltVon ? "doppelt" : "frei",
    auffaellig: d.auffaellig,
    doppeltVon: d.doppeltVon,
    gesiebt_bis: STUFEN[Math.min(d.stufe, 5)].name,
    schriftstueck: f.schriftstueck?.wert,
    datum: f.datum?.wert,
    kategorie: f.kategorie?.wert,
    absender: f.absender?.wert,
    betrifft: f.betrifft?.wert,
    frist: f.frist?.wert,
    betrag: f.betrag?.wert,
    dringlichkeit: dringlichkeit(f.frist?.wert, heute),
    nummern: f.nummern || [],
    sicherheit: {},
    gruende: {},
    foto: d.bild,
    email: d.email,
    kurzfassung: kurzfassung(d),
    paperless: { correspondent: f.absender?.wert, document_type: f.schriftstueck?.wert, created: f.datum?.wert, tags: [f.kategorie?.wert, f.betrifft?.wert].filter((x) => !!x && x !== "unbekannt"), archive_serial_number: d.archivnummer }
  };
  for (const feld of ["schriftstueck", "datum", "kategorie", "absender", "betrifft", "frist", "betrag"]) {
    const v = f[feld];
    const si = sicherheit(v);
    if (v && si) {
      s.sicherheit[feld] = si;
      s.gruende[feld] = v.grund;
    }
  }
  const text = d.volltext || d.kopfText;
  if (mitText && text) {
    s.text = text.slice(0, TEXT_MAX);
    if (text.length > TEXT_MAX) s.text_gekuerzt = true;
    s.abschnitte = abschnitte(d, text);
  }
  return s;
}
function organizerIndex(dateien, regeln, verlauf, heute, app, mitText = true) {
  return {
    format: INDEX_FORMAT,
    fassung: INDEX_FASSUNG,
    erstellt: (/* @__PURE__ */ new Date()).toISOString(),
    app,
    hinweis: "Vom Datei-Organizer erzeugt. Die Originale liegen unver\xE4ndert daneben. Werte mit \u201Ebitte pr\xFCfen\u201C sind Vorschl\xE4ge.",
    dateien: dateien.map((d) => steckbrief(d, heute, mitText)),
    lernregeln: regeln,
    verlauf
  };
}
function indexLesen(text) {
  let j;
  try {
    j = JSON.parse(text);
  } catch {
    return { ok: false, grund: "keine g\xFCltige JSON-Datei" };
  }
  const o = j;
  if (o.format !== INDEX_FORMAT) return { ok: false, grund: "kein Index des Datei-Organizers" };
  if (typeof o.fassung !== "number" || o.fassung > INDEX_FASSUNG) return { ok: false, grund: `Fassung ${o.fassung} ist neuer als diese App` };
  if (!Array.isArray(o.dateien)) return { ok: false, grund: "Dateiliste fehlt" };
  return { ok: true, index: o };
}
export {
  INDEX_DATEI,
  INDEX_FASSUNG,
  INDEX_FORMAT,
  TEXT_MAX,
  abschnitte,
  deutsch,
  indexLesen,
  kurzfassung,
  organizerIndex,
  steckbrief
};
