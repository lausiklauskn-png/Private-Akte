// Erzeugt aus Datei-Organizer lib/einlesen.ts (scripts/kern-js.mjs). Nicht von Hand ändern.
import { innenAusBefunden } from "./innen.js";
import { pdfKennung } from "./pdfkennung.js";
import { aehnlicheFinden } from "./aehnlich.js";
import { erkenneArt, sha256Hex } from "./dateiart.js";
import { leseExif } from "./exif.js";
import { leseEml } from "./eml.js";
import { officeText } from "./zip.js";
import { htmlText, istHtml } from "./htmltext.js";
const MAX_TEXT_BYTES = 30 * 1024 * 1024;
const ueberspringen = (name) => /^(organizer-index\.json|desktop\.ini|thumbs\.db|\.ds_store|icon\r?)$/i.test(name) || name.startsWith(".") || name.startsWith("~$");
async function einlesen(e, pdfLesen, tiefe = 0, bildLesen, kern) {
  const art = erkenneArt(e.name, e.bytes.slice(0, 600));
  const d = { pfad: e.pfad, name: e.name, groesse: e.bytes.length, geaendert: e.geaendert, art: art.art, artText: art.artText, auffaellig: art.auffaellig, stufe: 1, felder: {} };
  if (e.bytes.length) d.sha256 = await sha256Hex(e.bytes);
  const aus = [d];
  if (e.bytes.length === 0) {
    d.textQuelle = "keiner";
    d.felder.schriftstueck = { wert: "Unklar", sicher: false, grund: "leere Datei \u2013 Synchronisierung (z. B. OneDrive) noch nicht fertig? Original pr\xFCfen", quelle: "regel" };
    return aus;
  }
  if (d.auffaellig || e.bytes.length > MAX_TEXT_BYTES) {
    d.textQuelle = "keiner";
    return aus;
  }
  const k = kern && /^(pdf|office)$/.test(art.art || "") ? await kern(e.name, e.bytes, art.art).catch(() => null) : null;
  if (k) {
    const innen = innenAusBefunden(k.befunde);
    if (innen) d.innen = innen;
  }
  if (art.art === "pdf") {
    const id = pdfKennung(e.bytes);
    if (id) d.innen = { ...d.innen || { befunde: [] }, pdfKennung: id };
  }
  try {
    if (art.art === "pdf") {
      const t = await pdfLesen(e.bytes);
      d.kopfText = t.kopf;
      d.volltext = t.voll;
      d.textQuelle = t.voll.trim() ? "pdf" : "keiner";
    } else if (art.art === "bild") {
      d.bild = leseExif(e.bytes) || void 0;
      d.textQuelle = "keiner";
      if (bildLesen) {
        const t = (await bildLesen(e.bytes)).trim();
        if ((t.match(/[A-Za-zÄÖÜäöüß]{3,}/g) || []).length >= 4) {
          d.volltext = t;
          d.kopfText = t.slice(0, 1500);
          d.textQuelle = "ocr";
        }
      }
    } else if (art.art === "email" && /\.eml$/i.test(e.name)) {
      const m = leseEml(new TextDecoder("utf-8").decode(e.bytes));
      d.email = m.meta;
      d.volltext = `${m.meta.betreff || ""}

${m.text}`.trim();
      d.kopfText = d.volltext.slice(0, 1500);
      d.textQuelle = "email";
      if (tiefe < 3) for (const a of m.anhaenge) aus.push(...await einlesen({ pfad: `${e.pfad} \u203A ${a.name}`, name: a.name, geaendert: e.geaendert, bytes: a.daten }, pdfLesen, tiefe + 1, bildLesen, kern));
    } else if (art.art === "office" && /\.(docx|odt)$/i.test(e.name)) {
      const t = await officeText(e.bytes, e.name);
      d.volltext = t;
      d.kopfText = t.slice(0, 1500);
      d.textQuelle = t ? "office" : "keiner";
    } else if (art.art === "office" && k?.text && k.text.trim()) {
      const t = k.text.trim();
      d.volltext = t;
      d.kopfText = t.slice(0, 1500);
      d.textQuelle = "office";
    } else if (art.art === "text") {
      const roh = new TextDecoder("utf-8").decode(e.bytes.slice(0, 2e6));
      const t = istHtml(e.name, roh) ? htmlText(roh) : roh;
      d.volltext = t;
      d.kopfText = t.slice(0, 1500);
      d.textQuelle = "text";
    } else d.textQuelle = "keiner";
  } catch (fehler) {
    d.textQuelle = "keiner";
    d.kopfText = void 0;
    d.volltext = void 0;
    d.felder.schriftstueck = { wert: "Unklar", sicher: false, grund: `Inhalt nicht lesbar (${fehler instanceof Error ? fehler.message : String(fehler)})`, quelle: "regel" };
  }
  return aus;
}
function doppelteMarkieren(dateien, wahl = {}) {
  const erste = /* @__PURE__ */ new Map();
  const da = new Set(dateien.map((d) => d.pfad));
  for (const [sha, pfad] of Object.entries(wahl)) if (da.has(pfad) && dateien.some((d) => d.pfad === pfad && d.sha256 === sha)) erste.set(sha, pfad);
  const kopie = (d) => /kopie|copy|\(\d+\)|-(desktop|laptop|pc|tablet|handy|[a-z]+-pc)-[a-z0-9]+(?=\.\w+$)/i.test(d.name) ? 1 : 0;
  for (const d of [...dateien].sort((a, b) => kopie(a) - kopie(b) || a.geaendert - b.geaendert || a.pfad.localeCompare(b.pfad, "de"))) if (d.sha256 && !erste.has(d.sha256)) erste.set(d.sha256, d.pfad);
  return aehnlicheFinden(dateien.map((d) => {
    const e = d.sha256 ? erste.get(d.sha256) : void 0;
    return e && e !== d.pfad ? { ...d, doppeltVon: e } : { ...d, doppeltVon: void 0 };
  }));
}
export {
  doppelteMarkieren,
  einlesen,
  ueberspringen
};
