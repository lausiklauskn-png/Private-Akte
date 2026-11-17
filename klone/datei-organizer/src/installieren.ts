/**
 * Erstinstallation der Web-App (Klaus 17.11.: Installationsknopf). Der Browser meldet mit „beforeinstallprompt“, dass sich die Seite
 * als App installieren lässt; das Ereignis kommt oft, bevor die Oberfläche steht – darum wird es hier sofort beim Laden gemerkt.
 * Kein Knopf, wo der Browser das nicht anbietet (iPhone/Safari: dort nur über „Teilen → Zum Home-Bildschirm“) oder schon installiert ist.
 */
type InstallEreignis = Event & { prompt: () => Promise<unknown>; userChoice?: Promise<{ outcome: string }> };
let angebot: InstallEreignis | null = null;
const hoerer = new Set<() => void>();
const melden = () => { for (const h of hoerer) h(); };
if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); angebot = e as InstallEreignis; melden(); });
  window.addEventListener("appinstalled", () => { angebot = null; melden(); });
}
export const installHoeren = (h: () => void) => { hoerer.add(h); return () => { hoerer.delete(h); }; };
export const installMoeglich = () => !!angebot;
export async function installieren() {
  const a = angebot; if (!a) return;
  await a.prompt();
  const wahl = await a.userChoice?.catch(() => null);
  // Das Angebot gilt nur einmal; nach „Abbrechen“ meldet der Browser es später neu.
  if (!wahl || wahl.outcome === "accepted" || angebot === a) { angebot = null; melden(); }
}
