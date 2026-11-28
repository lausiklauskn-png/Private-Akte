/**
 * Lernen aus Lehrfällen (Klaus 28.11.2026): jede bestätigte Zeile aus „Mit großer KI sortieren“ ist ein Lehrfall – was der Kern riet
 * und was bestätigt wurde, dazu wenige Stichwörter aus dem Text. Daraus wird auf dem Gerät ein kleines Wortmodell (Stimmen je Wort und
 * Bereich). Es entscheidet nur, wo der Kern selbst unsicher ist, und nur mit klarem Abstand. Lehrfälle verlassen das Gerät nie.
 * Ohne Oberfläche, ohne Netz; die Familienakte zieht die Datei mit Pin.
 */
export type LehrfallKurz = { bestaetigt: string; merkmale: string[] };
export type LehrModell = { faelle: number; faecher: Record<string, number>; woerter: Record<string, Record<string, number>> };

const UNSICHTBAR = /[​-‏‪-‮⁠-⁤﻿­]/g;
/** Dieselben Stichwörter wie im Lehrfall: Wörter ab 5 Buchstaben, ohne Platzhalter, die ersten `max` verschiedenen. */
export function merkmaleAus(text: string, max = 24): string[] {
  const t = text.replace(UNSICHTBAR, "").normalize("NFC").toLowerCase().replace(/⟦[^⟧]*⟧/g, " ");
  return [...new Set(t.match(/\p{L}{5,}/gu) || [])].slice(0, max);
}

export function lehrModell(faelle: readonly LehrfallKurz[]): LehrModell {
  const m: LehrModell = { faelle: 0, faecher: {}, woerter: {} };
  for (const f of faelle) {
    if (!f?.bestaetigt || !Array.isArray(f.merkmale)) continue;
    m.faelle++; m.faecher[f.bestaetigt] = (m.faecher[f.bestaetigt] || 0) + 1;
    for (const w of new Set(f.merkmale)) { const z = (m.woerter[w] ||= {}); z[f.bestaetigt] = (z[f.bestaetigt] || 0) + 1; }
  }
  return m;
}

export type LehrVorschlag = { fach: string; abstand: number; woerter: number };
/** Bestes Fach nach den Stimmen der bekannten Wörter (Wörter aus mindestens `minFaelle` Lehrfällen). Abstand = log-Verhältnis zum zweiten. */
export function lehrVorschlag(m: LehrModell, merkmale: readonly string[], minFaelle = 2): LehrVorschlag | null {
  const faecher = Object.keys(m.faecher);
  if (m.faelle < 20 || faecher.length < 2) return null;
  const punkte: Record<string, number> = {};
  for (const f of faecher) punkte[f] = Math.log(m.faecher[f] / m.faelle);
  let genutzt = 0;
  for (const w of new Set(merkmale)) {
    const z = m.woerter[w]; if (!z) continue;
    const n = Object.values(z).reduce((a, b) => a + b, 0); if (n < minFaelle) continue;
    genutzt++;
    for (const f of faecher) punkte[f] += Math.log(((z[f] || 0) + 0.5) / (m.faecher[f] + 0.5 * faecher.length));
  }
  if (genutzt < 3) return null;
  const [a, b] = Object.entries(punkte).sort((x, y) => y[1] - x[1]);
  return { fach: a[0], abstand: a[1] - b[1], woerter: genutzt };
}

/** Schwelle aus scripts/lehrmodell-messen.mjs (28.11.2026, Richtwert an vier Stapeln, je 50 gelernt): Abstand 4 = über 50-mal wahrscheinlicher. */
export const LEHR_ABSTAND = 4;

type DateiTeil = { volltext?: string; kopfText?: string; bestaetigt?: Partial<Record<string, boolean>>; felder: { kategorie?: { wert: string; sicher: boolean; grund: string; quelle: "regel" | "gelernt" | "du"; vorher?: string } } };
/** Nur wo der Kern beim Bereich unsicher ist und nichts von Hand gesetzt oder gelernt wurde: Vorschlag aus den Lehrfällen, bleibt „bitte prüfen“. */
export function lehrAnwenden<T extends DateiTeil>(d: T, m: LehrModell | null, abstand = LEHR_ABSTAND): T {
  const k = d.felder.kategorie;
  if (!m || !k || k.sicher || k.quelle !== "regel" || d.bestaetigt?.kategorie) return d;
  const v = lehrVorschlag(m, merkmaleAus(d.volltext || d.kopfText || ""));
  if (!v || v.abstand < abstand || v.fach === k.wert) return d;
  return { ...d, felder: { ...d.felder, kategorie: { wert: v.fach, sicher: false, grund: `aus deinen Bestätigungen gelernt (vorher „${k.wert}“)`, quelle: "gelernt", vorher: k.wert } } };
}
