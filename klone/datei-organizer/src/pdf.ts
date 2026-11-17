import { pdfTextLesen } from "../lib/pdf-text.ts";
import type { BildLeser } from "../lib/einlesen.ts";

/** pdf.js erst laden, wenn das erste PDF kommt (gehört zur App, kein Abruf aus dem Netz). */
type PdfJsVoll = Parameters<typeof pdfTextLesen>[0];
type ScanPdf = {
  getDocument: (o: Record<string, unknown>) => { promise: Promise<{ numPages: number; getPage: (n: number) => Promise<{ getViewport: (o: { scale: number }) => { width: number; height: number }; render: (o: { canvasContext: CanvasRenderingContext2D; viewport: unknown }) => { promise: Promise<void> } }>; destroy: () => Promise<void> }> };
};
let bereit: Promise<PdfJsVoll> | null = null;
const SCAN_SEITEN = 2;

/** Seiten eines Scans ohne Textebene als Bild zeichnen und der Texterkennung geben (höchstens SCAN_SEITEN Seiten). */
async function scanLesen(pdfjs: ScanPdf, bytes: Uint8Array, ocr: BildLeser): Promise<string> {
  const doc = await pdfjs.getDocument({ data: bytes.slice(), isEvalSupported: false, verbosity: 0 }).promise;
  try {
    const teile: string[] = [];
    for (let n = 1; n <= Math.min(doc.numPages, SCAN_SEITEN); n++) {
      const seite = await doc.getPage(n);
      const vp = seite.getViewport({ scale: 2 });
      const c = document.createElement("canvas"); c.width = Math.ceil(vp.width); c.height = Math.ceil(vp.height);
      await seite.render({ canvasContext: c.getContext("2d")!, viewport: vp }).promise;
      const blob = await new Promise<Blob | null>((ok) => c.toBlob(ok, "image/png"));
      if (blob) teile.push((await ocr(new Uint8Array(await blob.arrayBuffer()))).trim());
    }
    return teile.filter(Boolean).join("\n\n");
  } finally { await doc.destroy(); }
}

const laden = () => bereit || (bereit = (async () => {
  const [pdfjs, worker] = await Promise.all([import("pdfjs-dist"), import("pdfjs-dist/build/pdf.worker.min.mjs?url")]);
  pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
  return pdfjs as unknown as PdfJsVoll;
})());

/** Vorschau des Originals (Klaus 16.11.): die ersten Seiten als Bild, in der App gezeichnet – kein neues Fenster, nichts verlässt das Gerät. */
export async function pdfVorschau(bytes: Uint8Array, hoechstens = 3, schaerfe = 1.5): Promise<{ bilder: string[]; seiten: number }> {
  const pdfjs = await laden() as unknown as ScanPdf;
  const doc = await pdfjs.getDocument({ data: bytes.slice(), isEvalSupported: false, verbosity: 0 }).promise;
  try {
    const bilder: string[] = [];
    for (let n = 1; n <= Math.min(doc.numPages, hoechstens); n++) {
      const seite = await doc.getPage(n);
      const vp = seite.getViewport({ scale: schaerfe });
      const c = document.createElement("canvas"); c.width = Math.ceil(vp.width); c.height = Math.ceil(vp.height);
      await seite.render({ canvasContext: c.getContext("2d")!, viewport: vp }).promise;
      const blob = await new Promise<Blob | null>((ok) => c.toBlob(ok, "image/jpeg", 0.85));
      if (blob) bilder.push(URL.createObjectURL(blob));
    }
    return { bilder, seiten: doc.numPages };
  } finally { await doc.destroy(); }
}

export async function pdfLeser(ocr?: BildLeser) {
  const pdfjs = await laden();
  return async (b: Uint8Array) => {
    const t = await pdfTextLesen(pdfjs, b);
    if (t.voll.trim() || !ocr) return t;
    // Gescanntes PDF ohne Textebene: erste Seiten per Texterkennung lesen (Klaus 13.11.: Texterkennung in der App).
    const text = await scanLesen(pdfjs as unknown as ScanPdf, b, ocr).catch(() => "");
    return (text.match(/[A-Za-zÄÖÜäöüß]{3,}/g) || []).length >= 4 ? { kopf: text.slice(0, 1500), voll: text } : t;
  };
}
