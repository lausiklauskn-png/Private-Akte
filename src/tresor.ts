// Brücke zwischen der Hülle (app.js) und dem unveränderten Tresor der Familienakte (klone/familienakte).
// Hier steht keine eigene Speicherlogik: jede Funktion reicht nur an den Klon weiter.
import { browserVault, browserStorageKind, listLocalDocuments, saveLocalDocument, readLocalDocumentFile, dokumenteAussortieren, LIMITS } from "../klone/familienakte/app/local-vault.ts";
import { FAMILY_CATEGORIES } from "../klone/familienakte/lib/family-categories.ts";

const tresor = {
  bereiche: [...FAMILY_CATEGORIES],
  hoechstBytes: LIMITS.documentBytes,
  speicherArt: () => browserStorageKind(),
  /** Was in der Akte liegt; Herausgenommenes (im Klon „aussortiert“) wird nicht gezeigt. */
  async liste() { return (await listLocalDocuments(await browserVault())).filter((d) => !d.aussortiert); },
  async ablegen(datei: File, angaben: { bereich: string; datum: string | null; titel: string | null; notiz: string | null }) {
    return saveLocalDocument(await browserVault(), datei, { category: angaben.bereich, documentDate: angaben.datum, notes: angaben.notiz, titel: angaben.titel });
  },
  async datei(id: string) { return readLocalDocumentFile(await browserVault(), id); },
  async herausnehmen(id: string) { return dokumenteAussortieren(await browserVault(), [id]); },
};
(window as unknown as { PrivateAkteTresor: typeof tresor }).PrivateAkteTresor = tresor;
