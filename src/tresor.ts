// Brücke zwischen der Hülle (app.js) und dem unveränderten Tresor der Familienakte (klone/familienakte).
// Hier steht keine eigene Speicherlogik: jede Funktion reicht nur an den Klon weiter.
import { browserVault, browserStorageKind, listLocalDocuments, saveLocalDocument, readLocalDocumentFile, dokumenteAussortieren, LIMITS,
  sicherungsOrdnerWaehlbar, chooseExportDestination, writeFullFamilyBackup, sicherungArt, sicherungProben, sicherungEinlesen } from "../klone/familienakte/app/local-vault.ts";
import { passwortPruefen, notfallblattText, PASSWORT_MINDESTLAENGE } from "../klone/familienakte/lib/sicherung-krypto.ts";
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

// Tresor exportieren / importieren: die Vollsicherung der Familienakte, unverändert. Der Ordner auf dem Gerät, der SD-Karte oder
// dem Stick wird vom Nutzer gewählt; mit Passwort ist er verschlüsselt. Eine Familienakte kann ihn genauso einlesen.
type Zugang = { passwort?: string; notfall?: string };
let importOrdner: FileSystemDirectoryHandle | null = null;
const sicherung = {
  ordnerWaehlbar: () => sicherungsOrdnerWaehlbar(),
  passwortMindestens: PASSWORT_MINDESTLAENGE,
  passwortPruefen: (passwort: string) => passwortPruefen(passwort),
  /** Fragt nach dem Zielordner und schreibt die Sicherung hinein. `fassung` steht im Kopf der Sicherung und auf dem Notfallblatt. */
  async exportieren(passwort: string | null, fassung: string) {
    const ziel = await chooseExportDestination("Wohin soll der Tresor exportiert werden?");
    const r = await writeFullFamilyBackup({ destination: ziel, source: await browserVault(), appVersion: fassung, passwort });
    return { ziel: ziel.name, ordner: r.folderName, dateien: r.manifest.files.length, erstellt: r.manifest.createdAt, notfall: r.notfall ?? null,
      notfallblatt: r.notfall ? notfallblattText({ notfall: r.notfall, createdAt: r.manifest.createdAt, ordner: r.folderName, appVersion: fassung }) : null };
  },
  /** Fragt nach dem Ordner mit der Sicherung und sagt, was dort liegt. Geschrieben wird nichts. */
  async importWaehlen() { importOrdner = await chooseExportDestination("Wo liegt der exportierte Tresor?"); return sicherungArt(importOrdner); },
  /** Probe ohne Schreiben: jede Datei wird gelesen und mit ihrer Prüfsumme verglichen. */
  async importPruefen(zugang?: Zugang) { if (!importOrdner) throw new Error("Bitte zuerst den Ordner wählen."); return sicherungProben(importOrdner, await browserVault(), zugang); },
  /** Liest die geprüfte Sicherung ein. Leere Akte: alles kommt herein. Volle Akte: zusammenführen, bei Widerspruch bleibt die Fassung hier. */
  async importieren(zugang?: Zugang, revision?: number) { if (!importOrdner) throw new Error("Bitte zuerst den Ordner wählen."); return sicherungEinlesen(importOrdner, await browserVault(), {}, revision, zugang); },
};
const alles = { ...tresor, sicherung };
(window as unknown as { PrivateAkteTresor: typeof alles }).PrivateAkteTresor = alles;
