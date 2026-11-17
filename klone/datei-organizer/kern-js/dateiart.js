// Erzeugt aus Datei-Organizer lib/dateiart.ts (scripts/kern-js.mjs). Nicht von Hand ändern.
const ENDUNGEN = {
  pdf: "pdf",
  jpg: "bild",
  jpeg: "bild",
  png: "bild",
  gif: "bild",
  webp: "bild",
  heic: "bild",
  heif: "bild",
  tif: "bild",
  tiff: "bild",
  bmp: "bild",
  eml: "email",
  msg: "email",
  docx: "office",
  xlsx: "office",
  pptx: "office",
  odt: "office",
  ods: "office",
  doc: "office",
  xls: "office",
  txt: "text",
  md: "text",
  csv: "text",
  json: "text",
  xml: "text",
  html: "text",
  htm: "text",
  ics: "text",
  vcf: "text",
  zip: "archiv",
  "7z": "archiv",
  rar: "archiv",
  exe: "programm",
  msi: "programm",
  bat: "programm",
  cmd: "programm",
  com: "programm",
  scr: "programm",
  js: "programm",
  vbs: "programm",
  ps1: "programm",
  apk: "programm",
  jar: "programm",
  sh: "programm",
  lnk: "programm"
};
const TEXT = {
  pdf: "PDF",
  bild: "Bild",
  email: "E-Mail",
  office: "Office-Dokument",
  text: "Text",
  archiv: "Archiv",
  programm: "Programm",
  unbekannt: "Unbekannt"
};
function endung(name) {
  const i = name.lastIndexOf(".");
  return i > 0 ? name.slice(i + 1).toLowerCase() : "";
}
const beginnt = (b, ...zahlen) => zahlen.every((z, i) => b[i] === z);
const ascii = (b, von, bis) => String.fromCharCode(...b.slice(von, bis));
function artNachKopf(b) {
  if (b.length < 4) return null;
  if (ascii(b, 0, 5) === "%PDF-") return { art: "pdf", was: "PDF" };
  if (beginnt(b, 255, 216, 255)) return { art: "bild", was: "JPEG" };
  if (beginnt(b, 137, 80, 78, 71)) return { art: "bild", was: "PNG" };
  if (ascii(b, 0, 4) === "GIF8") return { art: "bild", was: "GIF" };
  if (ascii(b, 0, 4) === "RIFF" && ascii(b, 8, 12) === "WEBP") return { art: "bild", was: "WebP" };
  if (ascii(b, 4, 8) === "ftyp" && /hei|mif|avif/.test(ascii(b, 8, 12))) return { art: "bild", was: "HEIC" };
  if (beginnt(b, 73, 73, 42, 0) || beginnt(b, 77, 77, 0, 42)) return { art: "bild", was: "TIFF" };
  if (beginnt(b, 66, 77)) return { art: "bild", was: "BMP" };
  if (beginnt(b, 77, 90)) return { art: "programm", was: "Windows-Programm" };
  if (beginnt(b, 127, 69, 76, 70)) return { art: "programm", was: "Linux-Programm" };
  if (beginnt(b, 80, 75, 3, 4)) return { art: "archiv", was: "ZIP-Beh\xE4lter" };
  if (beginnt(b, 208, 207, 17, 224)) return { art: "office", was: "Office (alt) / Outlook" };
  if (ascii(b, 0, 2) === "#!") return { art: "programm", was: "Skript" };
  const stichprobe = b.slice(0, Math.min(b.length, 512));
  let schlecht = 0;
  for (const z of stichprobe) if (z < 9 || z > 13 && z < 32) schlecht++;
  if (schlecht === 0) {
    const t = ascii(b, 0, Math.min(b.length, 512)).toLowerCase();
    if (/^(from|received|return-path|date|message-id|mime-version|subject|to|delivered-to):/m.test(t)) return { art: "email", was: "E-Mail" };
    return { art: "text", was: "Text" };
  }
  return null;
}
function erkenneArt(name, kopf) {
  const e = endung(name);
  const nachEndung = ENDUNGEN[e] || "unbekannt";
  const nachKopf = artNachKopf(kopf);
  const teile = name.toLowerCase().split(".");
  const doppel = teile.length > 2 && ENDUNGEN[teile[teile.length - 2]] && ENDUNGEN[teile[teile.length - 2]] !== "programm" && nachEndung === "programm";
  if (nachKopf?.art === "programm" || nachEndung === "programm") {
    const grund = doppel ? `Doppelte Endung \u201E.${teile[teile.length - 2]}.${e}\u201C \u2013 sieht aus wie ein Dokument, ist ein Programm` : nachKopf?.art === "programm" ? `Der Inhalt ist ein ${nachKopf.was}${e ? ` (Endung .${e})` : ""}` : `Endung .${e} ist ein Programm`;
    return { art: "programm", artText: TEXT.programm, auffaellig: grund, grund };
  }
  if (nachKopf) {
    let art = nachKopf.art;
    if (art === "archiv" && nachEndung === "office") art = "office";
    if (art === "text" && (nachEndung === "email" || nachEndung === "text")) art = nachEndung;
    if (art === "office" && nachEndung === "email") art = "email";
    if (nachEndung !== "unbekannt" && nachEndung !== art && !(art === "text" && nachEndung === "email")) {
      const grund = `Endung .${e} passt nicht zum Inhalt (${nachKopf.was})`;
      return { art, artText: TEXT[art], auffaellig: grund, grund };
    }
    return { art, artText: TEXT[art], grund: `Dateikopf: ${nachKopf.was}` };
  }
  if (nachEndung !== "unbekannt") return { art: nachEndung, artText: TEXT[nachEndung], grund: `nur an der Endung .${e} erkannt` };
  return { art: "unbekannt", artText: TEXT.unbekannt, grund: "weder Kopf noch Endung bekannt" };
}
async function sha256Hex(daten) {
  const puffer = daten instanceof Uint8Array ? daten : new Uint8Array(daten);
  const h = await crypto.subtle.digest("SHA-256", puffer);
  return [...new Uint8Array(h)].map((x) => x.toString(16).padStart(2, "0")).join("");
}
export {
  artNachKopf,
  endung,
  erkenneArt,
  sha256Hex
};
