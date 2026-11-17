/**
 * PDF-Kennung zur Herkunftserkennung (Klaus 13.11.2026: „die PDF-Kennung zur Herkunftserkennung liest der Prüfkern bisher nicht“).
 * Jede PDF trägt im Trailer meist ein Paar /ID [<erste> <zweite>]: die erste vergibt das Programm beim ersten Speichern und behält
 * sie bei jedem weiteren Speichern bei, die zweite ändert sich mit jeder Änderung. Gleiche erste Kennung bei anderem Inhalt heißt also:
 * aus derselben Datei entstanden (spätere Fassung, neu gespeichert, ergänzt) – auch wenn Name und Text sich unterscheiden.
 * Gelesen wird nur das Ende der Datei (dort steht der Trailer, auch bei Querverweis-Strömen) und, wenn dort nichts steht, der
 * Anfang (linearisierte PDFs). Nur die Hex-Form <…>; die seltene Textform (…) und verschlüsselte Kennungen werden nicht gelesen.
 * Rein, ohne Browser. Der Prüfkern (byte-gleich) bleibt unverändert – das hier ist eigener Code des Organizers.
 */
export type PdfKennung = { herkunft: string; fassung: string };

const FENSTER = 64 * 1024;
const ID = /\/ID\s*\[\s*<([0-9A-Fa-f\s]*)>\s*<([0-9A-Fa-f\s]*)>\s*\]/g;

function latin1(b: Uint8Array): string {
  let s = "";
  for (let i = 0; i < b.length; i += 8192) s += String.fromCharCode(...b.subarray(i, i + 8192));
  return s;
}
const sauber = (h: string) => h.replace(/\s+/g, "").toLowerCase();
const brauchbar = (h: string) => h.length >= 16 && !/^0+$/.test(h);

/** Liest das letzte /ID-Paar (das gilt nach inkrementellem Speichern). undefined, wenn keines da oder unbrauchbar ist. */
export function pdfKennung(bytes: Uint8Array): PdfKennung | undefined {
  if (bytes.length < 8 || latin1(bytes.subarray(0, 5)) !== "%PDF-") return undefined;
  const teile = [bytes.subarray(Math.max(0, bytes.length - FENSTER))];
  if (bytes.length > FENSTER) teile.push(bytes.subarray(0, FENSTER));
  for (const teil of teile) {
    let letzte: RegExpExecArray | null = null;
    for (const m of latin1(teil).matchAll(ID)) letzte = m;
    if (!letzte) continue;
    const herkunft = sauber(letzte[1]), fassung = sauber(letzte[2]);
    if (brauchbar(herkunft)) return { herkunft, fassung: brauchbar(fassung) ? fassung : herkunft };
  }
  return undefined;
}
