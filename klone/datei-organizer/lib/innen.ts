import type { Innen } from "./typen.ts";

/**
 * Merkmale aus dem Inneren einer Datei. Gelesen werden sie vom Prüfkern des Auslieferungsprüfers (byte-gleich im Organizer,
 * src/public/vendor/pruefkern/), der sie als Befunde meldet – z. B. „Author: Muster GmbH“ (PDF-Infofeld) oder
 * „xmp:CreateDate: 2025-03-04T10:12:00+01:00“ (XMP). Hier werden diese Sätze zu Feldern; so lassen sich Dateien zuordnen,
 * nach echtem Erstellungsdatum sortieren und als Fassungen erkennen, auch wenn ihr Text nicht lesbar ist.
 * Rein, ohne Browser. Unbekannte Sätze werden ignoriert, nie geraten.
 */
export type Befund = { kennung: string; satz: string };

const FELD: Record<string, keyof Omit<Innen, "befunde" | "pdfKennung">> = {
  Author: "autor", "dc:creator": "autor", Creator: "programm", "xmp:CreatorTool": "programm",
  Producer: "erzeuger", "pdf:Producer": "erzeuger", Title: "titel", Subject: "betreff", "xmp:CreateDate": "erstellt",
};

/** Befunde des Prüfkerns → Innen (oder undefined, wenn nichts Verwertbares dabei ist). */
export function innenAusBefunden(befunde: Befund[] | undefined): Innen | undefined {
  if (!befunde?.length) return undefined;
  const innen: Innen = { befunde: [] };
  for (const b of befunde) {
    if (!innen.befunde.includes(b.kennung)) innen.befunde.push(b.kennung);
    if (b.kennung !== "PDF-METADATEN") continue;
    const m = /^([A-Za-z:]+): (.+?)(?: \(.*\))?$/.exec(b.satz.trim());
    if (!m || !FELD[m[1]]) continue;
    const feld = FELD[m[1]];
    let wert = m[2].replace(/\s+…$/, "").trim();
    if (feld === "erstellt") { const d = /^(\d{4})-(\d{2})-(\d{2})/.exec(wert); if (!d) continue; wert = `${d[1]}-${d[2]}-${d[3]}`; }
    if (wert && !innen[feld]) innen[feld] = wert;
  }
  const hatFeld = Object.keys(innen).some((k) => k !== "befunde");
  return hatFeld || innen.befunde.length ? innen : undefined;
}

/** Kurzer Satz für die Anzeige: „Muster GmbH · Word · erstellt 04.03.2025“. */
export function innenKurz(i: Innen | undefined): string {
  if (!i) return "";
  const de = (iso: string) => iso.split("-").reverse().join(".");
  return [i.autor, i.titel && `„${i.titel}“`, i.programm || i.erzeuger, i.erstellt && `erstellt ${de(i.erstellt)}`, i.pdfKennung && `PDF-Kennung ${i.pdfKennung.herkunft.slice(0, 8)}…`].filter(Boolean).join(" · ");
}
