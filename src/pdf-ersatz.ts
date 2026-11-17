// Ersatz für klone/familienakte/app/file-viewer.tsx beim Bau von tresor.js: die Datei hängt an React und der Anzeige der
// Familienakte, die es in der Hülle der Privaten Akte nicht gibt. Der Klon bleibt unverändert; nur der Bau leitet den
// einen Import um. Geladen wird dieselbe PDF-Bibliothek wie dort – unverändert aus dem Klon (klone/familienakte/public/vendor/pdfjs),
// keine Verbindung nach außen. Gelesen wird die Textebene; gescannte Seiten ohne Textebene liefern nichts.
type PdfJs = { GlobalWorkerOptions: { workerSrc: string }; getDocument: (quelle: unknown) => { promise: Promise<unknown> } };
let geladen: Promise<PdfJs> | null = null;
const skript = (src: string) => new Promise<void>((ja, nein) => {
  const s = document.createElement("script"); s.src = src; s.onload = () => ja(); s.onerror = () => nein(new Error("PDF_LESEN_FEHLT")); document.head.appendChild(s);
});
export function loadPdfJs(): Promise<PdfJs> {
  if (!geladen) {
    const basis = new URL("klone/familienakte/public/vendor/pdfjs", document.baseURI).href;
    // Wie im Klon: der Worker wird im Hauptfenster geladen, pdf.js nutzt ihn dann ohne eigenen Hintergrundprozess.
    geladen = skript(`${basis}/pdf.min.js`).then(() => skript(`${basis}/pdf.worker.min.js`)).then(() => {
      const lib = (window as unknown as { pdfjsLib?: PdfJs }).pdfjsLib;
      if (!lib) throw new Error("PDF_LESEN_FEHLT");
      lib.GlobalWorkerOptions.workerSrc = `${basis}/pdf.worker.min.js`;
      return lib;
    }).catch((fehler) => { geladen = null; throw fehler; });
  }
  return geladen;
}
