#!/usr/bin/env node
// Gerätezugriffe aus den Klonen für die Pro-Akte: legt die genannten Java-Dateien byte-gleich (gegen den Pin des Klons geprüft)
// in einen erzeugten Ordner, den Gradle (android/) bzw. die Windows-Engine mit übersetzt. Nichts wird abgeschrieben oder geändert;
// eine Verbesserung entsteht im Quell-Repo und kommt über tools/klon-nachziehen.mjs herein.
//   node tools/native/klon-quellen.mjs android|windows
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const WURZEL = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
/** Alle Java-Dateien eines Klons unter den genannten Ordnern, wie sie im Pin stehen (nichts ausgelassen, nichts dazu). */
const ausPin = (klon, ...ordner) => Object.keys(JSON.parse(readFileSync(join(WURZEL, 'klone', `${klon}.herkunft.json`), 'utf8')).dateien)
  .filter((p) => p.endsWith('.java') && ordner.some((o) => p.startsWith(o))).sort();
export const QUELLEN = {
  android: {
    ziel: 'android/app/src/klon/java',
    dateien: {
      // Organizer: Teilen/Öffnen mit (Eingang) und „Speichern unter“. Seinen Ordnerweg ersetzt der größere der Familienakte (gleicher Name
      // „FamilyFolders“, dieselben Grundaufrufe; dazu Ordner anlegen und Unterordner schreiben – das braucht das Backup auf SD-Karte/USB).
      // Dazu die Updates vom eigenen Server (Klaus 19.11.2026): DoUpdatesPlugin, UpdateFeed, Json – das Ziel der Akte steht im Manifest.
      'datei-organizer': ['DoEingangPlugin', 'EingangStapel', 'DoDateienPlugin', 'PluginWorker', 'NativeUtil', 'DoUpdatesPlugin', 'UpdateFeed', 'Json']
        .map((n) => `android/app/src/main/java/de/familyprojekt/dateiorganizer/${n}.java`),
      familienakte: [
        ...['FamilienakteKalenderPlugin', 'FamilienakteOrdnerPlugin'].map((n) => `android/app/src/main/java/de/familyprojekt/familienakte/${n}.java`),
        ...['Ablage', 'DateiAblage', 'Eintrag', 'Ersatzschluessel', 'Fach', 'Hauptordner', 'Json', 'Profile', 'SafAblage', 'TresorOrdner', 'Uebergaben', 'Umzug', 'UnterAblage', 'VaultCrypto']
          .map((n) => `android/app/src/main/java/de/familyprojekt/tresor/${n}.java`),
      ],
      // Private Brain Pro (Brief 0.9.0 Punkt 2, Mail nativ): das ganze Paket samt seiner MainActivity, von der die der Akte erbt
      // (ProMailPlugin holt Gmail über sie). Sein Ordner tresor/ fehlt hier mit Absicht: dieselben vier Dateien sind byte-gleich mit
      // denen der Familienakte oben (Probe in test-native.mjs).
      'privat-brain-pro': ausPin('privat-brain-pro', 'android/app/src/main/java/de/familyprojekt/privatebrain/pro/',
        'android/app/src/main/java/de/familyprojekt/hintergrund/'),
    },
    abschneiden: /^android\/app\/src\/main\/java\//,
  },
  windows: {
    ziel: 'windows/engine/build/klon-src',
    dateien: {
      // Die ganze Windows-Engine des Organizers (Ordner, Eingang, Speichern unter); DesktopBuild erzeugt windows/engine/build.mjs.
      'datei-organizer': ['EngineMain', 'DesktopService', 'DesktopOrdner', 'DesktopEingang', 'DesktopFiles', 'DesktopUpdates'].map((n) => `windows/engine/src/${n}.java`),
    },
    abschneiden: /^windows\/engine\/src\//,
  },
};
const sha = (b) => createHash('sha256').update(b).digest('hex');

export function legen(art) {
  const q = QUELLEN[art]; if (!q) throw new Error('android oder windows');
  const ziel = join(WURZEL, q.ziel); rmSync(ziel, { recursive: true, force: true });
  let n = 0;
  for (const [klon, liste] of Object.entries(q.dateien)) {
    const pin = JSON.parse(readFileSync(join(WURZEL, 'klone', `${klon}.herkunft.json`), 'utf8'));
    for (const pfad of liste) {
      const b = readFileSync(join(WURZEL, 'klone', klon, pfad));
      if (pin.dateien[pfad] !== sha(b)) throw new Error(`Klon ${klon}: ${pfad} weicht vom Pin ab`);
      const aus = join(ziel, art === 'android' ? pfad.replace(q.abschneiden, '') : `${klon}/${pfad.replace(q.abschneiden, '')}`);
      mkdirSync(dirname(aus), { recursive: true }); writeFileSync(aus, b); n++;
    }
  }
  console.log(`Klon-Quellen (${art}): ${n} Dateien gleich mit ihrem Pin nach ${q.ziel}`);
  return ziel;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) legen(process.argv[2]);
