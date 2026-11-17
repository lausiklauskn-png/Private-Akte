// Erzeugt aus Datei-Organizer lib/pdfkennung.ts (scripts/kern-js.mjs). Nicht von Hand ändern.
const FENSTER = 64 * 1024;
const ID = /\/ID\s*\[\s*<([0-9A-Fa-f\s]*)>\s*<([0-9A-Fa-f\s]*)>\s*\]/g;
function latin1(b) {
  let s = "";
  for (let i = 0; i < b.length; i += 8192) s += String.fromCharCode(...b.subarray(i, i + 8192));
  return s;
}
const sauber = (h) => h.replace(/\s+/g, "").toLowerCase();
const brauchbar = (h) => h.length >= 16 && !/^0+$/.test(h);
function pdfKennung(bytes) {
  if (bytes.length < 8 || latin1(bytes.subarray(0, 5)) !== "%PDF-") return void 0;
  const teile = [bytes.subarray(Math.max(0, bytes.length - FENSTER))];
  if (bytes.length > FENSTER) teile.push(bytes.subarray(0, FENSTER));
  for (const teil of teile) {
    let letzte = null;
    for (const m of latin1(teil).matchAll(ID)) letzte = m;
    if (!letzte) continue;
    const herkunft = sauber(letzte[1]), fassung = sauber(letzte[2]);
    if (brauchbar(herkunft)) return { herkunft, fassung: brauchbar(fassung) ? fassung : herkunft };
  }
  return void 0;
}
export {
  pdfKennung
};
