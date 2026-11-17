import type { Datei } from "./typen.ts";
import { gesperrt, istUnsicher } from "./siebe.ts";

/**
 * Archivnummern (Klaus 12.11.2026, S8: „Archivnummern sollen parallel laufen, fortlaufend nur dann, wenn die
 * Reihenfolge steht“). Eine Nummer bekommt nur eine Datei, die ganz gesiebt ist und kein „bitte prüfen“ mehr hat.
 * Vergeben wird in der Reihenfolge Datum › Bereich › Absender. Einmal vergebene Nummern ändern sich nie; neue
 * schließen an die höchste an. Die Nummer schreibt man auf das Papieroriginal – so findet man es im Regal.
 */
export const archivnummerMuster = /^A-(\d{4})-(\d{4,})$/;

export function bereitFuerNummer(d: Datei): boolean {
  return !gesperrt(d) && d.stufe >= 5 && ![2, 3, 4, 5].some((s) => istUnsicher(d, s)) && !d.pfad.includes(" › ");
}

export function offeneFuerNummer(dateien: Datei[]): { bereit: Datei[]; wartet: Datei[] } {
  const ohne = dateien.filter((d) => !d.archivnummer && !gesperrt(d) && !d.pfad.includes(" › "));
  return { bereit: ohne.filter(bereitFuerNummer), wartet: ohne.filter((d) => !bereitFuerNummer(d)) };
}

export function archivnummernVergeben(dateien: Datei[], jahr = new Date().getFullYear()): { dateien: Datei[]; neu: number } {
  let hoechste = 0;
  for (const d of dateien) { const m = d.archivnummer?.match(archivnummerMuster); if (m && Number(m[1]) === jahr) hoechste = Math.max(hoechste, Number(m[2])); }
  const { bereit } = offeneFuerNummer(dateien);
  const reihenfolge = [...bereit].sort((a, b) =>
    (a.felder.datum?.wert || "9999").localeCompare(b.felder.datum?.wert || "9999") ||
    (a.felder.kategorie?.wert || "").localeCompare(b.felder.kategorie?.wert || "", "de") ||
    (a.felder.absender?.wert || "").localeCompare(b.felder.absender?.wert || "", "de") || a.pfad.localeCompare(b.pfad, "de"));
  const vergabe = new Map<string, string>();
  for (const d of reihenfolge) vergabe.set(d.pfad, `A-${jahr}-${String(++hoechste).padStart(4, "0")}`);
  return { dateien: dateien.map((d) => vergabe.has(d.pfad) ? { ...d, archivnummer: vergabe.get(d.pfad) } : d), neu: vergabe.size };
}
