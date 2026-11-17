// Erzeugt aus Datei-Organizer lib/innen.ts (scripts/kern-js.mjs). Nicht von Hand ändern.
const FELD = {
  Author: "autor",
  "dc:creator": "autor",
  Creator: "programm",
  "xmp:CreatorTool": "programm",
  Producer: "erzeuger",
  "pdf:Producer": "erzeuger",
  Title: "titel",
  Subject: "betreff",
  "xmp:CreateDate": "erstellt"
};
function innenAusBefunden(befunde) {
  if (!befunde?.length) return void 0;
  const innen = { befunde: [] };
  for (const b of befunde) {
    if (!innen.befunde.includes(b.kennung)) innen.befunde.push(b.kennung);
    if (b.kennung !== "PDF-METADATEN") continue;
    const m = /^([A-Za-z:]+): (.+?)(?: \(.*\))?$/.exec(b.satz.trim());
    if (!m || !FELD[m[1]]) continue;
    const feld = FELD[m[1]];
    let wert = m[2].replace(/\s+…$/, "").trim();
    if (feld === "erstellt") {
      const d = /^(\d{4})-(\d{2})-(\d{2})/.exec(wert);
      if (!d) continue;
      wert = `${d[1]}-${d[2]}-${d[3]}`;
    }
    if (wert && !innen[feld]) innen[feld] = wert;
  }
  const hatFeld = Object.keys(innen).some((k) => k !== "befunde");
  return hatFeld || innen.befunde.length ? innen : void 0;
}
function innenKurz(i) {
  if (!i) return "";
  const de = (iso) => iso.split("-").reverse().join(".");
  return [i.autor, i.titel && `\u201E${i.titel}\u201C`, i.programm || i.erzeuger, i.erstellt && `erstellt ${de(i.erstellt)}`, i.pdfKennung && `PDF-Kennung ${i.pdfKennung.herkunft.slice(0, 8)}\u2026`].filter(Boolean).join(" \xB7 ");
}
export {
  innenAusBefunden,
  innenKurz
};
