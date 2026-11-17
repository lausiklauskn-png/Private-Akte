// Erzeugt aus Datei-Organizer lib/archivnummer.ts (scripts/kern-js.mjs). Nicht von Hand ändern.
import { gesperrt, istUnsicher } from "./siebe.js";
const archivnummerMuster = /^A-(\d{4})-(\d{4,})$/;
function bereitFuerNummer(d) {
  return !gesperrt(d) && d.stufe >= 5 && ![2, 3, 4, 5].some((s) => istUnsicher(d, s)) && !d.pfad.includes(" \u203A ");
}
function offeneFuerNummer(dateien) {
  const ohne = dateien.filter((d) => !d.archivnummer && !gesperrt(d) && !d.pfad.includes(" \u203A "));
  return { bereit: ohne.filter(bereitFuerNummer), wartet: ohne.filter((d) => !bereitFuerNummer(d)) };
}
function archivnummernVergeben(dateien, jahr = (/* @__PURE__ */ new Date()).getFullYear()) {
  let hoechste = 0;
  for (const d of dateien) {
    const m = d.archivnummer?.match(archivnummerMuster);
    if (m && Number(m[1]) === jahr) hoechste = Math.max(hoechste, Number(m[2]));
  }
  const { bereit } = offeneFuerNummer(dateien);
  const reihenfolge = [...bereit].sort((a, b) => (a.felder.datum?.wert || "9999").localeCompare(b.felder.datum?.wert || "9999") || (a.felder.kategorie?.wert || "").localeCompare(b.felder.kategorie?.wert || "", "de") || (a.felder.absender?.wert || "").localeCompare(b.felder.absender?.wert || "", "de") || a.pfad.localeCompare(b.pfad, "de"));
  const vergabe = /* @__PURE__ */ new Map();
  for (const d of reihenfolge) vergabe.set(d.pfad, `A-${jahr}-${String(++hoechste).padStart(4, "0")}`);
  return { dateien: dateien.map((d) => vergabe.has(d.pfad) ? { ...d, archivnummer: vergabe.get(d.pfad) } : d), neu: vergabe.size };
}
export {
  archivnummerMuster,
  archivnummernVergeben,
  bereitFuerNummer,
  offeneFuerNummer
};
