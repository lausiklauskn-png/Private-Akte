# Datei-Organizer Pro für Windows (Fassung 0.4.1, Klaus 13.11.2026)

Klaus 13.11.2026: „die APK-App und die Windows-App mit der Download-Funktion … oder Update-Funktionen“. Vorbild in allem:
BookLedgerPro `windows/` (Tauri 2 / WebView2, Java-Engine als privater Kindprozess, Updates vom eigenen Server).
Dieselbe Oberfläche wie die Android-App: `windows/tools/build-web.mjs` nimmt das native Web-Paket aus `tools/native/prepare-web.mjs`
(gebauter Stand `app/` byte-gleich, ohne `sw.js`, mit Testordner). Die Hülle stellt dieselben Capacitor-Plugins bereit
(`windows/bridge/capacitor-tauri.js`), `src/quellen.ts` und `src/nativ.ts` laufen unverändert; `Capacitor.getPlatform()` = `windows`.

## Was drin ist

| Teil | Windows | Android (zum Vergleich) |
|---|---|---|
| Ordner | „Ordner am PC“: Windows-Ordnerdialog, Engine liest in Stücken bis 1 MiB (`DesktopOrdner.java`, Vertrag `FamilyFolders`) | Android-Ordnerwahl (`DoOrdnerPlugin`) |
| Ordner merken | die letzten 5 Ordner in `ordner-v1.json` im App-Datenordner; „Zuletzt: …“ öffnet ohne Dialog | dauerhafte Freigabe von Android (`takePersistableUriPermission`) |
| Index schreiben | nur `.json` direkt im Ordner, atomar über eine Zwischendatei | nur `.json` direkt im Ordner |
| Speichern unter | Windows-Speichern-Dialog (`DoDateien.speichern`) | Android-Speichern-Fenster (`DoDateienPlugin`) |
| Eingang | „Öffnen mit → Datei-Organizer Pro“ und Dateien auf dem Programmsymbol; ein zweiter Start reicht an die laufende App (`DesktopEingang.java`) | Teilen an die App, „Öffnen mit“ (`DoEingangPlugin`) |
| Hineinziehen | wie in der Web-App (Block „Dateien einfügen per Drag and Drop“) | – |
| Updates | `DesktopUpdates.java`: `aktuell-windows.json` + `.sig`, Setup `Datei-Organizer-Pro-Windows-X.Y.Z-x64-setup.exe` | `UpdateFeed.java`: `aktuell-android.json`, APK |
| Fassung | `windows/src-tauri/tauri.conf.json` = `package.json` = `FASSUNG` | `versionName` |

Eingang heißt: eine **Kopie** in einen Stapel im App-Datenordner (`eingang-v1`); die Seite holt den Stapel ab und nimmt ihn zum Bestand
dazu (gleicher Inhalt → als doppelt markiert). Abgeholte Stapel bleiben 14 Tage lesbar (Ansehen), dann räumt die App sie weg.
Originale werden nie verändert, nichts wird gelöscht. Deinstallieren lässt Ordner und Originale stehen.

Daten: WebView-Daten und Engine-Dateien unter `%LOCALAPPDATA%\de.familyprojekt.dateiorganizer\`, Programm unter
`%LOCALAPPDATA%\Datei-Organizer Pro\`. Kein Passwort, kein Tresor (der Organizer braucht keinen).

## Updates vom eigenen Server

Wie BookLedgerPro (`docs/UPDATES-EIGENER-SERVER.md` dort): Feed `https://family-projekt.de/updates/datei-organizer/aktuell-windows.json` + `.sig`
(Ed25519 über genau die Bytes, Format 1, `app: "datei-organizer"`). **Ein Schlüssel für Windows und Android** (Geheimnis `UPDATE_SIGNING_KEY`);
der öffentliche Teil steht in `DesktopUpdates.SCHLUESSEL` **und** `UpdateFeed.SCHLUESSEL` – `tools/native/test-native.mjs` und
`windows-release.yml` prüfen, dass beide gleich sind. Die App glaubt nur der Unterschrift, nimmt nur eine neuere Fassung, nur den
festen Dateinamen, prüft Größe und SHA-256, startet das Setup und schließt sich. Ein Tipp auf Fähnchen oder Fassung lädt direkt
(gleiche Bedienung wie Android, `src/nativ.ts`).

✅ **Öffentlicher Schlüssel eingetragen** (Klaus 14.11.2026), gleich wie unter Android; die Geheimnisse liegen im Repo.

## Prüfen

```bash
LANG=C.UTF-8 node windows/engine/test.mjs      # Engine mit gestellter Hülle (55 Zeilen: Ordner, Gemerkt, Öffnen mit, Speichern, Updates)
LANG=C.UTF-8 node windows/engine/protocol-test.mjs   # echter Kindprozess über stdio
npm ci --ignore-scripts --prefix windows && NODE_PATH=windows/node_modules node windows/tools/test-bruecke.mjs   # Brücke im Browser, Verträge
node tests/ui-probe.mjs                        # Oberfläche, auch als „Windows-App“ mit gestellter Brücke
node tools/native/test-native.mjs              # Fassungen, Verträge Windows = Android, ein Update-Schlüssel
```

GitHub `windows.yml` (PR bei Änderungen an Windows-Teilen oder `app/`, auf main immer): Engine (Linux und Windows), eigene Java-Laufzeit (jlink),
Prüfbau mit Prüf-Schnittstelle installiert und zweimal gestartet (`windows/pruefung/installed.mjs`: Name, Fassung, Zugriffsschutz, Ordner über die
Oberfläche einlesen, Index schreiben, Speichern unter, „Öffnen mit“ über einen zweiten Programmstart, nach Neustart „Zuletzt“ ohne Dialog),
Deinstallieren, dann Auslieferungsbau ohne Prüf-Schnittstelle. Artefakt `datei-organizer-pro-windows-unsigniert`.

## Veröffentlichen (nur auf Klaus' Wort)

Erst wenn der öffentliche Schlüssel eingetragen ist (Schritte in `docs/ANDROID.md` (b), derselbe Block gilt für Windows): Actions →
„Datei-Organizer Pro Windows veröffentlichen“ auf `main`, Feld `bestaetigung` = `ja`. Der Lauf baut, installiert und startet den
Auslieferungsbau, unterschreibt den Feed, prüft ihn gegen den Schlüssel in der App, lädt nur die Windows-Dateien nach
`family-projekt.de/updates/datei-organizer/` (Android-Dateien im selben Ordner bleiben) und prüft von außen.

## Grenzen (benannt)

- **Nicht an einem echten Windows-PC gemessen**, kein Rust-Bau in der Sitzung (kein WebView/GTK im Behälter): ob die Hülle baut und
  installiert läuft, zeigt erst `windows.yml`.
- Unsigniertes Setup: SmartScreen warnt beim ersten Start (Code-Signatur des Setups, nicht die Update-Unterschrift).
- „Öffnen mit“ nimmt nur Dateien, keine Ordner; höchstens 500 Dateien bzw. 2 GB je Stapel, 512 MB je Datei.
- Gemerkte Ordner merken den Pfad: liegt der Ordner auf einem USB-Stick mit anderem Laufwerksbuchstaben, heißt es „nicht mehr erreichbar“ – neu wählen.
