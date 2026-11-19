#!/usr/bin/env node
// Private Brain Pro in der Android-App der Akte (Brief 0.9.0 Punkt 2, Klaus 19.11.2026: „weiter mit Mail nativ“).
// Die App-Seite von Private Brain Pro entsteht dort durch tools/native/prepare-web.mjs (native/*.js, CSP, Modelle, Texterkennung).
// Dieser Schritt lässt genau dieses Werkzeug unverändert laufen – auf einer Kopie des Klons (der Klon bleibt byte-gleich, sein
// Werkzeug schreibt www/ in seine Wurzel und braucht git ls-files). Ergebnis: <ziel> = deren www/.
//   node tools/native/brain-web.mjs [ziel]   (Standard: .cache/privat-brain-pro-www)
// Heruntergeladenes (Bedeutungs-Modell, Texterkennung, Film) liegt in .cache/privat-brain-pro/ und wird wiederverwendet.
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const WURZEL = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const KLON = join(WURZEL, 'klone/privat-brain-pro');

export function brainWeb(ziel = join(WURZEL, '.cache/privat-brain-pro-www')) {
  const pin = JSON.parse(readFileSync(join(WURZEL, 'klone/privat-brain-pro.herkunft.json'), 'utf8'));
  const kopie = mkdtempSync(join(tmpdir(), 'pa-brain-'));
  try {
    // Nur die Dateien des Pins (byte-gleich geprüft von klon-nachziehen --pruefen), als eigenes kleines Git, damit ls-files geht.
    for (const p of Object.keys(pin.dateien)) { mkdirSync(dirname(join(kopie, p)), { recursive: true }); cpSync(join(KLON, p), join(kopie, p)); }
    const git = (...a) => execFileSync('git', a, { cwd: kopie, stdio: 'ignore' });
    git('init', '-q'); git('add', '-A');
    // Capacitor-Lizenz liest deren Werkzeug aus node_modules/@capacitor/core (dieselbe Fassung 8.5.3 wie in der Akte).
    if (!existsSync(join(WURZEL, 'node_modules/@capacitor/core/LICENSE'))) throw new Error('npm ci fehlt (node_modules/@capacitor/core)');
    symlinkSync(join(WURZEL, 'node_modules'), join(kopie, 'node_modules'), 'dir');
    const vorrat = join(WURZEL, '.cache/privat-brain-pro'); mkdirSync(vorrat, { recursive: true });
    // Kein Verweis: deren Werkzeug weist verlinkte Ordner ab. Also hinein- und danach zurückkopieren.
    cpSync(vorrat, join(kopie, '.cache'), { recursive: true });
    execFileSync(process.execPath, ['tools/native/prepare-web.mjs'], { cwd: kopie, stdio: 'inherit' });
    rmSync(vorrat, { recursive: true, force: true }); cpSync(join(kopie, '.cache'), vorrat, { recursive: true });
    rmSync(ziel, { recursive: true, force: true }); mkdirSync(dirname(ziel), { recursive: true });
    cpSync(join(kopie, 'www'), ziel, { recursive: true, dereference: true });
    console.log('Private Brain Pro (App-Seite) nach ' + ziel);
    return ziel;
  } finally { rmSync(kopie, { recursive: true, force: true }); }
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) brainWeb(process.argv[2] ? resolve(process.argv[2]) : undefined);
