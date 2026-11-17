// Text einer Datei beim Ablegen lesen (Klaus 17.11.: Fotos von Belegen sollen über ihren Inhalt gefunden werden, ohne Umweg über
// Workflow PDF). PDF: erst die Textebene; fehlt sie (Scan), die Seiten als Bild (höchstens 60). Foto: Texterkennung. Alles auf dem Gerät.
// Die Texterkennung ist Tesseract aus dem Klon der Familienakte (klone/familienakte/public/apps/workflow-pdf/vendor/tesseract,
// unverändert, deutsches Sprachpaket) mit denselben Einstellungen wie dort (app/wfpdf-kern.ts); dessen Lader selbst hängt an den
// Pfaden der Familienakte und kann hier nicht benutzt werden.
import { loadPdfJs } from "./pdf-ersatz.ts";

type TessWorker = { recognize: (bild: HTMLCanvasElement) => Promise<{ data: { text?: string } }> };
type Fenster = Window & { Tesseract?: { createWorker: (sprache: string, oem: number, opt: Record<string, unknown>) => Promise<TessWorker> } };
let ocr: Promise<TessWorker> | null = null;
function ocrWorker() {
  if (!ocr) {
    const t = new URL("klone/familienakte/public/apps/workflow-pdf/vendor/tesseract/", document.baseURI).href;
    ocr = new Promise<void>((ja, nein) => { const s = document.createElement("script"); s.src = `${t}tesseract.min.js`; s.onload = () => ja(); s.onerror = () => nein(new Error("OCR_FEHLT")); document.head.appendChild(s); })
      .then(() => (window as Fenster).Tesseract!.createWorker("deu", 1, { workerPath: `${t}worker.min.js`, corePath: t, langPath: `${t}lang`, gzip: false, cacheMethod: "none" }));
    ocr.catch(() => { ocr = null; });
  }
  return ocr;
}
const sauber = (text: string) => text.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
async function erkennen(c: HTMLCanvasElement) { const r = await (await ocrWorker()).recognize(c); c.width = c.height = 0; return sauber(r.data.text || ""); }
const KANTE = 2400, OCR_SEITEN = 60, TEXT_SEITEN = 60;
// Was gerade geschieht, für die Anzeige (die Texterkennung braucht je Seite einige Sekunden).
let lage = "";
export const leseLage = () => lage;
export const leseLageSetzen = (text: string) => { lage = text; };
async function bildLeinwand(datei: File) {
  const bild = await createImageBitmap(datei), f = Math.min(1, KANTE / Math.max(bild.width, bild.height));
  const c = document.createElement("canvas"); c.width = Math.round(bild.width * f); c.height = Math.round(bild.height * f);
  c.getContext("2d")!.drawImage(bild, 0, 0, c.width, c.height); bild.close(); return c;
}
type Seite = { getTextContent: () => Promise<{ items: Array<{ str?: string }> }>; getViewport: (o: { scale: number }) => { width: number; height: number };
  render: (o: { canvasContext: CanvasRenderingContext2D; viewport: unknown }) => { promise: Promise<void> } };
type Pdf = { numPages: number; getPage: (n: number) => Promise<Seite>; destroy: () => Promise<void> };
export const istBild = (datei: File) => /^image\/(png|jpeg|webp)$/.test(datei.type) || /\.(png|jpe?g|webp)$/i.test(datei.name);
export const istPdf = (datei: File) => datei.type === "application/pdf" || /\.pdf$/i.test(datei.name);
/** Gelesener Text und woher er kommt: „textebene“ (PDF mit Text), „erkannt“ (Texterkennung), „“ (nichts gelesen). */
export async function textLesen(datei: File): Promise<{ text: string; art: "textebene" | "erkannt" | "" }> {
  if (istBild(datei)) { lage = `Texterkennung: ${datei.name}`; const text = await erkennen(await bildLeinwand(datei)); return { text, art: text ? "erkannt" : "" }; }
  if (!istPdf(datei)) return { text: "", art: "" };
  const lib = await loadPdfJs(), pdf = await lib.getDocument({ data: new Uint8Array(await datei.arrayBuffer()) }).promise as Pdf;
  try {
    const teile: string[] = [];
    for (let n = 1; n <= Math.min(pdf.numPages, TEXT_SEITEN); n++) teile.push((await (await pdf.getPage(n)).getTextContent()).items.map((i) => i.str || "").join(" "));
    const ebene = sauber(teile.join("\n"));
    if (ebene.length >= 20) return { text: ebene, art: "textebene" };
    const erkannt: string[] = [];
    for (let n = 1; n <= Math.min(pdf.numPages, OCR_SEITEN); n++) {
      lage = `Texterkennung: ${datei.name}, Seite ${n} von ${Math.min(pdf.numPages, OCR_SEITEN)}`;
      const seite = await pdf.getPage(n), grund = seite.getViewport({ scale: 1 }), viewport = seite.getViewport({ scale: KANTE / Math.max(grund.width, grund.height) });
      const c = document.createElement("canvas"); c.width = Math.round(viewport.width); c.height = Math.round(viewport.height);
      await seite.render({ canvasContext: c.getContext("2d")!, viewport }).promise; erkannt.push(await erkennen(c));
    }
    const text = sauber(erkannt.join("\n\n")); return { text, art: text ? "erkannt" : "" };
  } finally { await pdf.destroy(); }
}
// Für schon abgelegte Fotos und Scans ohne gespeicherten Text: einmal erkennen und im Browser merken (eigene kleine Datenbank,
// Schlüssel Name und Größe der Datei), damit die Suche nicht bei jedem Start neu liest.
function merkDb() { return new Promise<IDBDatabase>((ja, nein) => { const r = indexedDB.open("PrivateAkteText1", 1); r.onupgradeneeded = () => r.result.createObjectStore("text"); r.onsuccess = () => ja(r.result); r.onerror = () => nein(r.error); }); }
export async function textGemerkt(datei: File) {
  const key = `${datei.name}:${datei.size}`, db = await merkDb();
  try {
    const da = await new Promise<unknown>((ja, nein) => { const r = db.transaction("text").objectStore("text").get(key); r.onsuccess = () => ja(r.result); r.onerror = () => nein(r.error); });
    if (typeof da === "string") return da;
    const { text } = await textLesen(datei);
    await new Promise<void>((ja, nein) => { const t = db.transaction("text", "readwrite"); t.objectStore("text").put(text, key); t.oncomplete = () => ja(); t.onerror = () => nein(t.error); });
    return text;
  } finally { db.close(); }
}
