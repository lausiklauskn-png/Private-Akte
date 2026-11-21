import type { Datei, DateiArt } from "./typen.ts";
import { innenAusBefunden, type Befund } from "./innen.ts";
import { pdfKennung } from "./pdfkennung.ts";
import { aehnlicheFinden } from "./aehnlich.ts";
import { erkenneArt, sha256Hex } from "./dateiart.ts";
import { leseExif } from "./exif.ts";
import { leseEml } from "./eml.ts";
import { officeText } from "./zip.ts";
import { htmlText, istHtml } from "./htmltext.ts";

/**
 * Sieb 1 und das Lesen des Textes. Die App reicht die Bytes jeder Datei herein; PDF-Text liefert eine
 * eingespritzte Funktion (im Browser pdf.js, in den Proben dieselbe Bibliothek in Node).
 * E-Mail-Anhänge werden zu eigenen Dateien „Mail.eml › Anhang“.
 */
export type PdfLeser = (bytes: Uint8Array) => Promise<{ kopf: string; voll: string }>;
export type Eingabe = { pfad: string; name: string; geaendert: number; bytes: Uint8Array };
/** Texterkennung für Fotos und Scans (im Browser Tesseract aus dem Workflow-PDF-Klon, in den Proben tesseract.js). Ohne sie bleibt ein Bild ohne Text. */
export type BildLeser = (bytes: Uint8Array) => Promise<string>;
/** Prüfkern des Auslieferungsprüfers (byte-gleich, src/public/vendor/pruefkern/): liest Merkmale aus dem Datei-Innern und den Text von
 *  Excel/PowerPoint. Eingespritzt wie PdfLeser – der Kern bleibt rein. Ohne ihn fehlen nur diese Merkmale. */
export type KernLeser = (name: string, bytes: Uint8Array, art: DateiArt) => Promise<{ befunde?: Befund[]; text?: string | null } | null>;

const MAX_TEXT_BYTES = 30 * 1024 * 1024;
/** Systemdateien und Synchronisierungsreste, die nie ein Dokument sind (Windows, OneDrive, macOS, Office-Sperrdateien). */
export const ueberspringen = (name: string) => /^(organizer-index\.json|desktop\.ini|thumbs\.db|\.ds_store|icon\r?)$/i.test(name) || name.startsWith(".") || name.startsWith("~$");

export async function einlesen(e: Eingabe, pdfLesen: PdfLeser, tiefe = 0, bildLesen?: BildLeser, kern?: KernLeser): Promise<Datei[]> {
  const art = erkenneArt(e.name, e.bytes.slice(0, 600));
  const d: Datei = { pfad: e.pfad, name: e.name, groesse: e.bytes.length, geaendert: e.geaendert, art: art.art, artText: art.artText, auffaellig: art.auffaellig, stufe: 1, felder: {} };
  // Leere Dateien bekommen keinen Fingerabdruck: sie wären sonst alle „doppelt“ zueinander.
  if (e.bytes.length) d.sha256 = await sha256Hex(e.bytes);
  const aus: Datei[] = [d];
  if (e.bytes.length === 0) {
    d.textQuelle = "keiner";
    d.felder.schriftstueck = { wert: "Unklar", sicher: false, grund: "leere Datei – Synchronisierung (z. B. OneDrive) noch nicht fertig? Original prüfen", quelle: "regel" };
    return aus;
  }
  if (d.auffaellig || e.bytes.length > MAX_TEXT_BYTES) { d.textQuelle = "keiner"; return aus; }
  // Merkmale aus dem Datei-Innern: auch wenn kein Text lesbar ist, bleiben Autor, Programm, Titel, Erstelldatum (Klaus 13.11.: „aus dem Code heraus“).
  const k = kern && /^(pdf|office)$/.test(art.art || "") ? await kern(e.name, e.bytes, art.art as DateiArt).catch(() => null) : null;
  if (k) { const innen = innenAusBefunden(k.befunde); if (innen) d.innen = innen; }
  // PDF-Kennung zur Herkunft: eigener Leser, unabhängig vom Prüfkern (der liest sie nicht).
  if (art.art === "pdf") { const id = pdfKennung(e.bytes); if (id) d.innen = { ...(d.innen || { befunde: [] }), pdfKennung: id }; }
  try {
    if (art.art === "pdf") {
      const t = await pdfLesen(e.bytes);
      d.kopfText = t.kopf; d.volltext = t.voll; d.textQuelle = t.voll.trim() ? "pdf" : "keiner";
    } else if (art.art === "bild") {
      d.bild = leseExif(e.bytes) || undefined; d.textQuelle = "keiner";
      if (bildLesen) {
        const t = (await bildLesen(e.bytes)).trim();
        // Erst ab ein paar echten Wörtern gilt das Bild als Schriftstück; Rauschen aus Landschaftsfotos bleibt draußen.
        if ((t.match(/[A-Za-zÄÖÜäöüß]{3,}/g) || []).length >= 4) { d.volltext = t; d.kopfText = t.slice(0, 1500); d.textQuelle = "ocr"; }
      }
    } else if (art.art === "email" && /\.eml$/i.test(e.name)) {
      const m = leseEml(new TextDecoder("utf-8").decode(e.bytes));
      d.email = m.meta; d.volltext = `${m.meta.betreff || ""}\n\n${m.text}`.trim(); d.kopfText = d.volltext.slice(0, 1500); d.textQuelle = "email";
      if (tiefe < 3) for (const a of m.anhaenge) aus.push(...await einlesen({ pfad: `${e.pfad} › ${a.name}`, name: a.name, geaendert: e.geaendert, bytes: a.daten }, pdfLesen, tiefe + 1, bildLesen, kern));
    } else if (art.art === "office" && /\.(docx|odt)$/i.test(e.name)) {
      const t = await officeText(e.bytes, e.name);
      d.volltext = t; d.kopfText = t.slice(0, 1500); d.textQuelle = t ? "office" : "keiner";
    } else if (art.art === "office" && k?.text && k.text.trim()) {
      // Excel, PowerPoint und andere Office-Dateien: Text aus dem Prüfkern
      const t = k.text.trim();
      d.volltext = t; d.kopfText = t.slice(0, 1500); d.textQuelle = "office";
    } else if (art.art === "text") {
      const roh = new TextDecoder("utf-8").decode(e.bytes.slice(0, 2_000_000));
      // HTML: nur den lesbaren Text, nicht Stil und Tags (Klaus 20.11.2026, siehe lib/htmltext.ts)
      const t = istHtml(e.name, roh) ? htmlText(roh) : roh;
      d.volltext = t; d.kopfText = t.slice(0, 1500); d.textQuelle = "text";
    } else d.textQuelle = "keiner";
  } catch (fehler) {
    d.textQuelle = "keiner";
    d.kopfText = undefined; d.volltext = undefined;
    d.felder.schriftstueck = { wert: "Unklar", sicher: false, grund: `Inhalt nicht lesbar (${fehler instanceof Error ? fehler.message : String(fehler)})`, quelle: "regel" };
  }
  return aus;
}

/** Doppelte am Fingerabdruck markieren: eine bleibt, alle weiteren zeigen auf sie. Welche bleibt, entscheidet der Nutzer
 *  (wahl: Fingerabdruck → Pfad, Klaus 15.11.2026); ohne Wahl die ohne „Kopie“ im Namen, sonst die ältere. */
export function doppelteMarkieren(dateien: Datei[], wahl: Record<string, string> = {}): Datei[] {
  const erste = new Map<string, string>();
  const da = new Set(dateien.map((d) => d.pfad));
  for (const [sha, pfad] of Object.entries(wahl)) if (da.has(pfad) && dateien.some((d) => d.pfad === pfad && d.sha256 === sha)) erste.set(sha, pfad);
  // Original = die ohne „Kopie“/„(2)“ im Namen; sonst die ältere (Änderungszeiten sind nach Kopieren oder Auschecken unzuverlässig)
  const kopie = (d: Datei) => /kopie|copy|\(\d+\)|-(desktop|laptop|pc|tablet|handy|[a-z]+-pc)-[a-z0-9]+(?=\.\w+$)/i.test(d.name) ? 1 : 0;
  for (const d of [...dateien].sort((a, b) => kopie(a) - kopie(b) || a.geaendert - b.geaendert || a.pfad.localeCompare(b.pfad, "de"))) if (d.sha256 && !erste.has(d.sha256)) erste.set(d.sha256, d.pfad);
  // Danach Ähnliches markieren (Fassungen, gleicher Text, gleicher Beleg, gleiches Foto, Namenskonflikt) – nur markiert, nicht entfernt.
  return aehnlicheFinden(dateien.map((d) => {
    const e = d.sha256 ? erste.get(d.sha256) : undefined;
    return e && e !== d.pfad ? { ...d, doppeltVon: e } : { ...d, doppeltVon: undefined };
  }));
}
