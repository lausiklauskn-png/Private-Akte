import type { BildLeser, KernLeser } from "../lib/einlesen.ts";
import type { DateiArt } from "../lib/typen.ts";

/**
 * Bausteine aus src/public/vendor/ (byte-gleich mit Pin, scripts/vendor-nachziehen.mjs): der Prüfkern des Auslieferungsprüfers und die
 * Texterkennung (tesseract.js, deutsche Sprachdaten). Beide werden erst geladen, wenn die erste passende Datei kommt – kein Abruf aus
 * dem Netz außer von der eigenen Seite, nichts verlässt das Gerät.
 */
type PF = { pruefePdf: (b: Uint8Array, erlaubt: string[]) => Promise<{ stellen: Array<{ kennung: string; satz: string }> }> };
type PA = { pruefe: (name: string, b: Uint8Array) => Promise<{ befunde: Array<{ kennung: string; satz: string }>; text: string | null }> };
type Welt = typeof globalThis & { PrueferFormate?: PF; PrueferAnhang?: PA; Tesseract?: { createWorker: (s: string, o: number, x: object) => Promise<TessWorker> } };
type TessWorker = { recognize: (b: Blob) => Promise<{ data: { text: string } }> };
const welt = globalThis as Welt;
const basis = () => new URL("vendor/", document.baseURI).href;

const geladen = new Map<string, Promise<void>>();
function skript(rel: string): Promise<void> {
  if (!geladen.has(rel)) geladen.set(rel, new Promise((ok, nein) => {
    const s = document.createElement("script"); s.src = basis() + rel;
    s.onload = () => ok(); s.onerror = () => { geladen.delete(rel); nein(new Error(`${rel} nicht geladen`)); };
    document.head.appendChild(s);
  }));
  return geladen.get(rel)!;
}

/** Prüfkern: PDF → Metadaten-Befunde (ohne Seitentext, den liest pdf.js schon); Office → Befunde und Text (auch Excel/PowerPoint). */
export const kernLeser: KernLeser = async (name: string, bytes: Uint8Array, art: DateiArt) => {
  await skript("pruefkern/pruefer-formate.js");
  if (art === "pdf") {
    const r = await welt.PrueferFormate!.pruefePdf(bytes, []);
    return { befunde: r.stellen.map((x) => ({ kennung: x.kennung, satz: x.satz.replace(/ \([^()]*\)$/, "") })) };
  }
  await skript("pruefkern/pruefer-anhang.js");
  const r = await welt.PrueferAnhang!.pruefe(name, bytes);
  return { befunde: r.befunde.map((x) => ({ kennung: x.kennung, satz: x.satz })), text: r.text };
};

/** Texterkennung für Fotos und Scans – deutsch, Frist je Bild. Mehrere Arbeiter nebeneinander (Training 14.11.2026: bisher einer für alle
 *  Bilder, eine Erkennung nach der anderen). Wie viele, bestimmt die Leistung des Geräts (src/arbeit.ts `gleichzeitig`). */
let ocrPlaetze = 1;
export function ocrGleichzeitig(n: number) { ocrPlaetze = Math.max(1, Math.min(4, Math.floor(n) || 1)); }
const arbeiter: Array<Promise<TessWorker> | null> = [];
const frei: number[] = [], warten: Array<(i: number) => void> = [];
let angelegt = 0;
function arbeiterNeu(i: number): Promise<TessWorker> {
  const p = skript("tesseract/tesseract.min.js").then(() => welt.Tesseract!.createWorker("deu", 1, {
    workerPath: basis() + "tesseract/worker.min.js", corePath: basis() + "tesseract/", langPath: basis() + "tesseract/lang", gzip: false, cacheMethod: "none",
  }));
  p.catch(() => { arbeiter[i] = null; });
  arbeiter[i] = p;
  return p;
}
async function platzHolen(): Promise<number> {
  if (frei.length) return frei.pop()!;
  if (angelegt < ocrPlaetze) return angelegt++;
  return new Promise((ok) => warten.push(ok));
}
function platzZurueck(i: number) { const w = warten.shift(); if (w) w(i); else frei.push(i); }
export const bildLeser: BildLeser = async (bytes: Uint8Array) => {
  const i = await platzHolen();
  try {
    const w = await (arbeiter[i] || arbeiterNeu(i));
    const bild = new Blob([bytes as BlobPart]);
    const frist = new Promise<never>((_, nein) => setTimeout(() => nein(new Error("Texterkennung dauerte zu lange")), 60000));
    const r = await Promise.race([w.recognize(bild), frist]);
    return r.data.text || "";
  } finally { platzZurueck(i); }
};

