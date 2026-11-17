// Ersatz für klone/familienakte/app/file-viewer.tsx beim Bau von tresor.js: die Datei hängt an React und der Anzeige der
// Familienakte, die es in der Hülle der Privaten Akte nicht gibt. Der Klon bleibt unverändert; nur der Bau leitet den
// einen Import um. Folge: PDFs werden für die Bedeutungssuche noch nicht gelesen – sie zählen mit Titel, Bereich und Notiz.
export async function loadPdfJs(): Promise<never> { throw new Error("PDF_LESEN_FEHLT"); }
