// Baut aktuell-android.json für den Update-Server der Akte aus der signierten APK (Lauf „Android-App signiert“ mit veroeffentlichen=ja).
// Gleiches Format wie im Datei-Organizer (tools/native/update-feed-android.mjs dort); App-Name und Dateiname wie im Manifest der Akte.
//   node tools/native/update-feed-android.mjs <apk> <ausgabe/aktuell-android.json>
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { basename } from 'node:path';
const [apk, aus] = process.argv.slice(2);
const lies = (p) => readFileSync(new URL('../../' + p, import.meta.url), 'utf8');
const gradle = lies('android/app/build.gradle'), manifest = lies('android/app/src/main/AndroidManifest.xml');
const meta = (n) => (new RegExp(`android:name="de\\.familyprojekt\\.update\\.${n}" android:value="([^"]*)"`).exec(manifest) || [])[1];
const version = (/^\s*versionName "([^"]+)"/m.exec(gradle) || [])[1], code = Number((/^\s*versionCode (\d+)/m.exec(gradle) || [])[1]);
const app = meta('app'), praefix = meta('datei'), datei = basename(apk);
if (!/^\d+\.\d+\.\d+$/.test(version || '') || !(code > 0) || !app || datei !== `${praefix}-${version}.apk`) throw Error('APK, Manifest oder build.gradle passt nicht: ' + datei + ' / ' + version + ' / ' + code);
const bytes = readFileSync(apk);
const feed = { format: 1, app, version, datum: new Date().toISOString().slice(0, 10), quelle: process.env.GITHUB_SHA || '',
  android: { datei, groesse: statSync(apk).size, sha256: createHash('sha256').update(bytes).digest('hex'), versionCode: code } };
writeFileSync(aus, JSON.stringify(feed, null, 2) + '\n');
console.log('aktuell-android.json: ' + version + ' (Code ' + code + ') · ' + datei + ' · ' + feed.android.groesse + ' B');
