/**
 * Drucken, was gerade offen ist (Klaus 17.11.: „aus dem heraus drucken, was man gerade vor sich hat“, vor allem vom Handy).
 * Der zuletzt geöffnete Steckbrief meldet seine Datei hier an; der Drucker-Knopf im Kopf druckt genau sie über das Druckfenster des
 * Geräts (das den zuletzt benutzten Drucker vorwählt). Gedruckt wird aus der Seite selbst: Bilder bzw. gezeichnete PDF-Seiten in
 * einem eigenen Blatt – ein PDF in einem neuen Fenster oder Rahmen druckt am Handy nicht verlässlich.
 */
export type DruckZiel = { pfad: string; name: string; art: "bild" | "pdf" | "text"; holen: () => Promise<Blob | null>; text?: string };

let ziel: DruckZiel | null = null;
const hoerer = new Set<() => void>();
const melden = () => { for (const h of hoerer) h(); };
export const druckZiel = () => ziel;
export const druckZielHoeren = (h: () => void) => { hoerer.add(h); return () => { hoerer.delete(h); }; };
export function druckZielSetzen(z: DruckZiel) { ziel = z; melden(); }
export function druckZielWeg(pfad: string) { if (ziel?.pfad === pfad) { ziel = null; melden(); } }

/** Höchstens so viele PDF-Seiten werden für den Druck gezeichnet (Speicher am Handy). */
export const DRUCK_SEITEN = 40;

/** Druckt das angemeldete Dokument. Fehler als Text für die Meldung; "" = Druckfenster wurde geöffnet. */
export async function drucken(z: DruckZiel): Promise<string> {
  const urls: string[] = [];
  const blatt = document.createElement("div"); blatt.id = "druck-blatt"; blatt.setAttribute("data-druck-blatt", z.art);
  try {
    if (z.art === "text") { const p = document.createElement("pre"); p.textContent = z.text || ""; blatt.appendChild(p); }
    else {
      const b = await z.holen();
      if (!b) return "Original nur nach dem Einlesen in dieser Sitzung erreichbar. Ordner neu wählen.";
      if (z.art === "bild") urls.push(URL.createObjectURL(new Blob([b], { type: "image/jpeg" })));
      else { const { pdfVorschau } = await import("./pdf.ts"); urls.push(...(await pdfVorschau(new Uint8Array(await b.arrayBuffer()), DRUCK_SEITEN, 2)).bilder); }
      await Promise.all(urls.map((u) => new Promise<void>((ok) => { const i = document.createElement("img"); i.onload = i.onerror = () => ok(); i.src = u; i.alt = z.name; blatt.appendChild(i); })));
    }
  } catch { for (const u of urls) URL.revokeObjectURL(u); return "Das Dokument ließ sich nicht für den Druck vorbereiten."; }
  document.body.appendChild(blatt); document.body.classList.add("druckt");
  const titel = document.title; document.title = z.name;
  const weg = () => { document.body.classList.remove("druckt"); blatt.remove(); document.title = titel; for (const u of urls) URL.revokeObjectURL(u); window.removeEventListener("afterprint", weg); };
  window.addEventListener("afterprint", weg);
  window.print();
  // Manche Browser melden „afterprint“ nicht: spätestens beim nächsten Tippen aufräumen (das Blatt ist am Bildschirm unsichtbar).
  setTimeout(() => window.addEventListener("pointerdown", weg, { once: true }), 1000);
  return "";
}
