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
const BACKUP_PRAEFIX = "Privatakte_Backup_";
/** Legt am gewählten Ort „Privatakte_Backup_<Datum>_<Uhrzeit>“ an (Ortszeit); ist der Name vergeben, mit _2, _3 … */
async function backupOrdnerAnlegen(ziel: FileSystemDirectoryHandle) {
  const d = new Date(), z = (n: number) => String(n).padStart(2, "0");
  const grund = `${BACKUP_PRAEFIX}${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}_${z(d.getHours())}-${z(d.getMinutes())}-${z(d.getSeconds())}`;
  for (let i = 1; ; i++) {
    const name = i === 1 ? grund : `${grund}_${i}`;
    try { await ziel.getDirectoryHandle(name); } catch { return ziel.getDirectoryHandle(name, { create: true }); }
  }
}
let importOrdner: FileSystemDirectoryHandle | null = null;
const sicherung = {
  ordnerWaehlbar: () => sicherungsOrdnerWaehlbar(),
  passwortMindestens: PASSWORT_MINDESTLAENGE,
  passwortPruefen: (passwort: string) => passwortPruefen(passwort),
  /** Fragt nach dem Zielordner und schreibt die Sicherung hinein. `fassung` steht im Kopf der Sicherung und auf dem Notfallblatt. */
  async exportieren(passwort: string | null, fassung: string) {
    const ziel = await chooseExportDestination("Wohin soll das Backup?");
    // Der Ordner am gewählten Ort heißt nach dieser App (Klaus 17.11.: von der Familienakte unterscheidbar). Darin liegt die
    // unveränderte Vollsicherung des Klons unter ihrem eigenen Namen – so kann auch die Familienakte sie einlesen.
    const aussen = await backupOrdnerAnlegen(ziel);
    const r = await writeFullFamilyBackup({ destination: aussen, source: await browserVault(), appVersion: fassung, passwort });
    return { ziel: ziel.name, ordner: aussen.name, dateien: r.manifest.files.length, erstellt: r.manifest.createdAt, notfall: r.notfall ?? null,
      notfallblatt: r.notfall ? notfallblattText({ notfall: r.notfall, createdAt: r.manifest.createdAt, ordner: aussen.name, appVersion: fassung }) : null };
  },
  /** Fragt nach dem Ordner mit der Sicherung und sagt, was dort liegt. Geschrieben wird nichts. */
  async importWaehlen() {
    const gewaehlt = await chooseExportDestination("Wo liegt das Backup?");
    // Gewählt werden darf der Backup-Ordner selbst oder der Ordner darüber (dann das jüngste „Privatakte_Backup_…“ darin).
    const namen: string[] = [];
    for await (const e of (gewaehlt as unknown as { values(): AsyncIterable<{ kind: string; name: string }> }).values()) if (e.kind === "directory" && e.name.startsWith(BACKUP_PRAEFIX)) namen.push(e.name);
    namen.sort();
    importOrdner = namen.length ? await gewaehlt.getDirectoryHandle(namen[namen.length - 1]) : gewaehlt;
    const art = await sicherungArt(importOrdner);
    return importOrdner.name.startsWith(BACKUP_PRAEFIX) ? { ...art, name: importOrdner.name } : art;
  },
  /** Probe ohne Schreiben: jede Datei wird gelesen und mit ihrer Prüfsumme verglichen. */
  async importPruefen(zugang?: Zugang) { if (!importOrdner) throw new Error("Bitte zuerst den Ordner wählen."); return sicherungProben(importOrdner, await browserVault(), zugang); },
  /** Liest die geprüfte Sicherung ein. Leere Akte: alles kommt herein. Volle Akte: zusammenführen, bei Widerspruch bleibt die Fassung hier. */
  async importieren(zugang?: Zugang, revision?: number) { if (!importOrdner) throw new Error("Bitte zuerst den Ordner wählen."); return sicherungEinlesen(importOrdner, await browserVault(), {}, revision, zugang); },
};
const alles = { ...tresor, sicherung };
(window as unknown as { PrivateAkteTresor: typeof alles }).PrivateAkteTresor = alles;
