# Datei-Organizer Pro – die Android-App (Fassung 0.4.1, Klaus 13.11.2026)

Klaus 13.11.2026: „die APK-App und die Windows-App mit der Download-Funktion genau wie bei den anderen oder Update-Funktionen“.
Dieser Stand ist **Android**; Windows: `docs/WINDOWS.md` (gleiche Verträge, gleicher Update-Schlüssel). Vorbild in allem: BookLedgerPro (`docs/ANDROID.md`, `docs/UPDATES-EIGENER-SERVER.md` dort).

| Fassung | Name | Wo |
|---|---|---|
| Web-App (PWA, kostenlose Testfassung) | **Datei-Organizer Basic** | GitHub Pages, `app/`, unverändert weiter |
| Android-App | **Datei-Organizer Pro** | Paket `de.familyprojekt.dateiorganizer`, APK `Datei-Organizer-Pro-X.Y.Z.apk` |

Welche Fassung läuft, steht an **einer** Stelle: `src/nativ.ts` (`APP_VARIANTE`, `APP_NAME`; Pro, sobald die Capacitor-Brücke da ist).
Speicher-Namen bleiben in beiden gleich (IndexedDB, Vorrat `datei-organizer-v…`, `version.json`) – sonst gingen gemerkte Stände verloren.

## Aufbau

| Teil | Datei |
|---|---|
| Web-Paket (gebauter Stand `app/`, byte-gleich, ohne `sw.js`, dazu der erfundene Testordner) | `tools/native/prepare-web.mjs` → `www/` + Beleg `native-bundle.json` |
| Capacitor (8.5.3, wie BookLedgerPro) | `capacitor.config.json` (`webDir: www`, `https://localhost`, keine WebView-Fehlersuche) |
| Android-Projekt | `android/` (Java in `android/app/src/main/java/de/familyprojekt/dateiorganizer/`) |
| Hülle | `MainActivity.java`: nur `https://localhost` im Fenster, fremde Adressen an den Browser, Schrift 100 %, Neuaufbau bei Anzeigeausfall |
| Ordner auf dem Gerät | `DoOrdnerPlugin.java` (Name `FamilyFolders`, dieselben Aufrufe wie in der Familienakte Pro → `src/quellen.ts` `nativWaehlen` unverändert) |
| Updates | `UpdateFeed.java` (Regel, rein) + `DoUpdatesPlugin.java` (`DoUpdates`: `pruefen`, `installieren`) |
| Oberfläche | `src/nativ.ts` + `useNativesUpdate` in `src/app.tsx` |
| Probe ohne Android | `tools/native/test-native.mjs` |
| JVM-Proben | `android/app/src/test/…/UpdateFeedTest.java`, `NativeUtilTest.java` |
| Signieren | `tools/signing/` (aus BookLedgerPro, Namen umgestellt; Freigabe `DO_SIGNING_UNLOCK`) |
| Abläufe | `.github/workflows/android.yml` (Prüf-Bau bei PR/main), `signing-identity.yml` (nur von Hand), `android-release.yml` (nur von Hand) |

### Was die App anders macht als die PWA

- **Kein Service Worker** in der App (`src/main.tsx`; `sw.js` liegt nicht im Paket): alles kommt aus dem App-Paket.
- **Kein `version.json`-Fähnchen**, sondern Updates vom eigenen Server (unten).
- **Name** „Datei-Organizer Pro“ in Kopf, Fuß und Seitentitel; Android-Name in `strings.xml`.
- **Ordner auf dem Gerät** (Knopf auf der Seite Ordner, nur in der App): Androids Ordnerwahl (Gerätespeicher, SD-Karte, USB).
  Eine Ordnerliste ist **eine** Abfrage je Ordner (Name, Art, Größe, Änderungsdatum zusammen), Dateien werden in Stücken bis 1 MiB
  gelesen – für große Mengen gedacht. Geschrieben wird nur eine `.json`-Datei direkt im gewählten Ordner (`organizer-index.json`);
  Originale werden nie verändert, nichts wird gelöscht. **Dauerhafte Freigabe (0.4.1):** die App nimmt Androids dauerhafte Freigabe und
  merkt sich die letzten 5 Ordner; „Zuletzt: …“ auf der Seite Ordner liest ohne Auswahl-Fenster wieder ein (✕ = vergessen, gibt die
  Freigabe an Android zurück). Ist der Ordner weg (SD-Karte entfernt), steht er nicht unter „Zuletzt“.
- **Teilen an die App / „Öffnen mit“ (0.4.1, `DoEingangPlugin`, rein `EingangStapel`):** jede Dateiart über Teilen, PDF/Bilder/Mail/Text/Office über
  „Öffnen mit“. Die App kopiert die Dateien sofort in einen Stapel im App-Speicher, die Seite nimmt sie zum Bestand dazu (wie Hineinziehen).
- **Speichern unter (0.4.1, `DoDateienPlugin`):** ohne Ordner (Dateien wählen, Teilen, Testordner) heißt der Knopf „Speichern unter …“ und öffnet
  Androids Speichern-Fenster; Inhalt vorher im Zwischenspeicher (BookLedgerPro-Befund: sonst bleiben leere Dateien stehen). Zahlen nie über `call.getLong`
  (Familienakte-Befund 11.11.: kleine Zahlen kommen als Integer) – `NativeUtil.zahl`.
- **Testordner** liegt im App-Paket unter `testdaten/` (101 erfundene Dateien), damit der Knopf auch in der App geht.

### Updates vom eigenen Server

- Feed `https://family-projekt.de/updates/datei-organizer/aktuell-android.json` + `.sig` (Ed25519 über genau die Bytes, Format 1,
  `app: "datei-organizer"`, Abschnitt `android: {datei, groesse, sha256, versionCode}`), gebaut von `tools/native/update-feed-android.mjs`.
- Die App glaubt nur der Unterschrift (öffentlicher Schlüssel in `UpdateFeed.SCHLUESSEL`), nimmt nur eine **neuere** Fassung
  (Name und versionCode), nur den Dateinamen `Datei-Organizer-Pro-X.Y.Z.apk`, setzt die Adresse selbst zusammen. Vor dem Installieren:
  Größe und SHA-256 wie im Feed, gleiches Paket, gleiches Signier-Zertifikat wie die installierte App, höherer versionCode – dann
  Androids Installieren-Fenster (`REQUEST_INSTALL_PACKAGES`; beim ersten Mal führt die App in „Apps installieren erlauben“).
- **Bedienung:** still gefragt beim Start (nach 2,5 s), beim Zurückholen und alle 15 Minuten, höchstens alle 10 Minuten eine Anfrage, nach einem Fehlschlag nach 2 Minuten (seit 0.4.13; vorher sperrte auch ein Fehlschlag eine Stunde; `localStorage`
  `do_update_still_v1`). Steht ein Update bereit, erscheint neben der Fassung das Fähnchen „Update X.Y.Z“. Ein Tipp auf das Fähnchen
  **oder** auf die Fassungsnummer im Kopf lädt direkt (mit Prozent) und öffnet das Installieren-Fenster – wie Workflow PDF Pro.
  Aktuell → kurze Meldung „Aktuelle Fassung …“. Ohne Netz → still (die stille Frage zeigt nie etwas an).
- **Öffentlicher Schlüssel eingetragen (Klaus 14.11.2026, Schritt b erledigt):** `UpdateFeed.SCHLUESSEL` = `DesktopUpdates.SCHLUESSEL`;
  die Geheimnisse `UPDATE_SIGNING_KEY` und `UPDATE_UPLOAD_KEY` liegen im Repo, der Server-Ordner `updates/datei-organizer/` antwortet.
  Solange nichts veröffentlicht ist, findet die App keinen Feed und bleibt still.

### Fassungsnummern

`package.json` = `src/public/version.json` = `FASSUNG` in `src/app.tsx` = `versionName` in `android/app/build.gradle`;
`versionCode` = Haupt × 1000 + Neben × 10 + Flick (0.4.1 → 41). `test-native.mjs` prüft beides. `VORRAT` in `src/public/sw.js` bei jeder
Fassung erhöhen (PWA).

## Proben

```bash
npm run build                      # Kern, Typen, Bau nach app/
node tests/ui-probe.mjs            # Browser; auch die App gestellt: Name Pro, kein Service Worker, Fähnchen, Tipp lädt direkt
node tools/native/test-native.mjs  # Web-Paket, Kennungen, Fassung, Rechte, Feed; App-Paket im Browser an der Wurzel + Testordner
npm run sync:android               # www/ bauen und in android/ legen
cd android && ./gradlew assembleDebug lintDebug testDebugUnitTest   # braucht ein Android-SDK → nur in GitHub (android.yml)
```

Die JVM-Proben (`UpdateFeedTest` mit Wegwerf-Schlüsseln, `NativeUtilTest`) laufen auch ohne Android mit `javac` + JUnit
(eddsa 0.3.0, hamcrest 1.3 von Maven Central).

## Was Klaus einmalig tun muss

Nichts davon kann Claude tun; nichts wird ohne Klaus' Wort ausgelöst oder veröffentlicht.

**(a) Eigene Signieridentität** (dauerhafter Schlüssel nur für Datei-Organizer Pro, nie den einer anderen App):

1. Freigabe erzeugen (Termux): `openssl rand -hex 32 > ~/do-signing-freigabe.txt` – wie die anderen Freigaben verschlüsselt sichern
   (`age -p`), die offene Datei danach löschen. **Nie in den Chat.**
2. GitHub → Datei-Organizer → Settings → Environments → **New environment** `android-production` → **Add environment secret**
   Name `DO_SIGNING_UNLOCK`, Wert = Inhalt der Datei.
3. Actions → **„Dauerhafte Datei-Organizer-Pro-Signieridentität“** → Run workflow auf `main`, Operation **initialize**. Der Lauf erzeugt
   den Schlüssel, verschlüsselt ihn, prüft die Wiederherstellung und legt einen PR `signing/android-identity` an (nur das verschlüsselte
   Paket und der öffentliche Fingerabdruck). Danach jederzeit Operation **check**.
   ⚠ Der Lauf bricht ab, wenn es im Repo schon GitHub-Releases gibt (Schutz vor einem zweiten Schlüssel) – dann vorher Bescheid geben.
   ⚠ Wer die Freigabe verliert, kann nach der ersten Veröffentlichung keine Updates mehr ausliefern.

**(b) Update-Server** – ✅ erledigt am 14.11.2026 (Termux, ein Block; der Hochlade-Schlüssel von BookLedgerPro darf schon in `/srv/family-project/updates` schreiben):

```
A=datei-organizer; R=lausiklauskn-png/Datei-Organizer; S=root@167.233.204.72
ssh $S "mkdir -p /srv/family-project/updates/$A && echo '{\"probe\":1}' > /srv/family-project/updates/$A/probe.json"
curl -s https://family-projekt.de/updates/$A/probe.json; echo
mkdir -p ~/$A-update && cd ~/$A-update
[ -f signatur.pem ] || openssl genpkey -algorithm ed25519 -out signatur.pem; chmod 600 signatur.pem
gh secret set UPDATE_SIGNING_KEY -R $R < signatur.pem
gh secret set UPDATE_UPLOAD_KEY -R $R < ~/blp-update/upload
gh secret list -R $R | grep UPDATE_
echo "== öffentlicher Schlüssel:"; openssl pkey -in signatur.pem -pubout | sed -n 2p
```

Danach die **eine ausgegebene Zeile** nach „öffentlicher Schlüssel:“ (beginnt mit `MCowBQYDK2VwAyEA`, öffentlich, kein Geheimnis) an
Claude geben; sie kommt in `UpdateFeed.SCHLUESSEL` (Android) **und** `DesktopUpdates.SCHLUESSEL` (Windows) – ein Schlüssel für beide. `signatur.pem` bleibt nur in Termux (verschlüsselt sichern, z. B. `age -p`).

**(c) Veröffentlichen** (erst nach a und b, nur auf Klaus' Wort): Actions → „Datei-Organizer Pro Android veröffentlichen“ auf `main`,
Tag `v0.4.1` (= `versionName`), voller main-Commit (Check „android“ grün), Feld `bestaetigung` = `ja`. Der Lauf baut, signiert, prüft im
Emulator (Testordner einlesen, überinstallieren, Stand noch da), veröffentlicht auf GitHub, prüft den Download, unterschreibt den Feed,
prüft ihn gegen den Schlüssel in der App und lädt nach `family-projekt.de/updates/datei-organizer/` hoch.

## Grenzen (benannt)

- **Nicht am Gerät, kein Emulator-Lauf, kein Android-Bau in dieser Sitzung** (kein Android-SDK im Behälter). Ob Java, Manifest und
  Gradle bauen und Lint besteht, zeigt erst `android.yml`. Lokal geprüft: JVM-Proben (17), Node-Probe, Browser mit gestellter Brücke.
- **Ordner auf dem Gerät** ungeprüft am Gerät (SD-Karte, Cloud-Anbieter ohne suchbaren Kanal → Strom-Lesen); dauerhafte Freigabe,
  Teilen und Speichern unter nur mit gestellter Brücke und JVM-Proben (`EingangStapelTest`) geprüft; Schreiben nur mit Kürzen („wt“).
- Wird das Fenster nach einem Anzeige-Ausfall neu aufgebaut, kann ein eben geteilter Stapel ein zweites Mal ankommen (dann als doppelt markiert).
- Kein echter Update-Server, keine echte Unterschrift gemessen (nur Wegwerf-Schlüssel in der Probe).
- Windows-App (Tauri + Updates wie BookLedgerPro `windows/`) ist der nächste Auftrag.
