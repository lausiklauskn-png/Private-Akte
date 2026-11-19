# Abschluss – Pro-Akte 0.9.0: Private Akte Pro für Android und Windows (18./19.11.2026)

Auftrag: `docs/BRIEF_SITZUNG_2026-11-19_PRO-AKTE-ANDROID-WINDOWS.md`. Klaus 18.11. abends, Freibrief: erst bauen, APK und Windows-App zum
Herunterladen bereitstellen; Anmeldung und Freigaben (Mail, Konten, Kalender) danach. Pro-Zeichen (`bilder/logo-pro-rund.png`) ist App-Symbol
und Favicon. PR #60.

## Gebaut

- **`android/`** (Capacitor 8.5.3, Muster Datei-Organizer Pro) und **`windows/`** (Tauri 2.12.5 + Java-Engine). Kennung
  `de.familyprojekt.privateakte`, Name „Private Akte Pro“, Fassung **0.9.0** (versionCode 90) überall gleich.
- **Web-Paket** `tools/native/web-paket.mjs`: dieselbe Seite wie die PWA, nur was sie lädt; Klone byte-gleich, nur ihre Laufzeit-Teile
  (keine Prüfstapel, docs, android/, windows/ der Klone); kein `sw.js` der Akte; in index.html der App `window.PA_PRO`, Titel, Pro-Zeichen,
  Favicon. Rund 216 MB. Kopf zeigt „0.9.0 · Pro“ (PWA: „· Basic“).
- **Gerätezugriffe aus den Klonen**, nie abgeschrieben: `tools/native/klon-quellen.mjs` legt die Java-Dateien beim Bau gegen den Pin geprüft
  in einen erzeugten Ordner (Android `android/app/src/klon/java`, Windows `windows/engine/build/klon-src`).
  Android: Familienakte `FamilienakteOrdnerPlugin` + `tresor/*` (Ordner auf Gerät/SD-Karte/USB – Backup und Kopie schreiben damit; heißt
  „FamilyFolders“ wie der Ordnerweg des Organizers, dessen Grundaufrufe er auch hat), `FamilienakteKalenderPlugin` (Gerätekalender);
  Organizer `DoEingangPlugin`, `DoDateienPlugin` („Speichern unter“). Windows: die ganze Engine des Organizer-Klons unverändert
  (EngineMain…), freigegeben nur `DoEingang`, `DoDateien`; Ordner wählt die Seite selbst (WebView2 `showDirectoryPicker`).
  Brücke `windows/bridge/capacitor-tauri.js`: Tools im Rahmen bekommen die Brücke des Hauptfensters.
- **Kopie an einem zweiten Ort** (Speicher-Orte, Kern für die Datensicherheit): „Exportieren“ › „Kopie einrichten“ – der Zweite Ort der
  Familienakte unverändert (`klone/familienakte/app/zweiter-ort.ts`): Ort wählen (SD-Karte, Festplatte, Stick), mit Passwort verschlüsselt,
  Notfallschlüssel; danach von selbst beim Öffnen der App, wenn sich etwas geändert hat (höchstens einmal am Tag), und „Jetzt kopieren“.
  Fehlt der Ort, läuft alles am Hauptort weiter; auf dem Gerät bleiben zwei Kopien im App-Speicher. **Einlesen:** „Backup einlesen“ und den
  Ordner der Kopie wählen (jede Vollsicherung darin wird gefunden). `T().kopie` in `src/tresor.ts`, `kopieTeil`/`fKopie` in `app.js`.
- **Herunterladen in der App:** CSV, Monatsdatei, Notfallblatt, Teilen/Öffnen einer Unterlage gehen nativ über „Speichern unter“
  (`geben()` in `app.js`); im Browser wie bisher.
- **Private Brain Pro als 1:1-Klon** `klone/privat-brain-pro` @ `6fe4070` (ganzer Stand, 1115 Dateien). Nachgeprüft: die Web-Seite läuft
  Datei für Datei aus dem Repo (die Feststellung aus 0.7.1 „nur mit build:web“ war falsch). In der Pro-App öffnet die Stadt „Private Brain“
  den Klon im Rahmen; die PWA weiter die veröffentlichte Web-App.
- CI: `android.yml` (Klone prüfen, `test-native.mjs`, Paket, `assembleDebug`, APK als Download), `windows.yml` (Engine als Kindprozess,
  jlink-Laufzeit, NSIS-Installer, installieren/starten/entfernen, Installer als Download). Probe PWA 506 grün, `test-native` 24 grün.

## Herunterladen (Prüf-Bau, nicht veröffentlicht)

PR #60 › Checks › „Android-App“ bzw. „Windows-App“ › Artefakt `private-akte-pro-android` (APK) / `private-akte-pro-windows` (Setup).
Die APK ist mit dem Wegwerf-Schlüssel des CI-Rechners signiert: jede neue Prüf-APK muss vorher deinstalliert werden – **dabei geht der
App-Speicher verloren, vorher „Backup erstellen“ oder eine Kopie einrichten.** Windows-Setup unsigniert (SmartScreen: „Weitere Informationen“
› „Trotzdem ausführen“).

## Nicht gebaut / offen (nächste Sitzung, Reihenfolge)

1. **Signatur mit Klaus** – vorbereitet (19.11., `docs/SIGNIERUNG.md`, PR #61); Windows bleibt unsigniert (Klaus 19.11.). (`signing/`, eigener Schlüssel, Kennung `de.familyprojekt.privateakte`), danach Ausgabe Android+Windows zugleich auf sein Wort.
2. **Mail nativ (Private Brain Pro)** – Android gebaut (19.11., PR #61, siehe `CLAUDE.md`); offen: Windows, Gerätetest, Gmail-Client bei Google. im Rahmen läuft Private Brain als Web-App (Mail dort nur über einen Mail-Dienst). Die Pro-Mail hängt
   an 17 Java-Plugins, `GmailAuthorization` in der MainActivity, Modell-Abfangen (`interceptAppRequest`), `prepare-web.mjs` (native/*.js,
   gebündelte Modelle) und Abhängigkeiten (`com.sun.mail:android-mail/activation 1.6.8`, `play-services-auth 22.0.0`). Plan: Java aus
   `klone/privat-brain-pro/android/…` über `klon-quellen.mjs` (ohne deren MainActivity), Plugins in unserer MainActivity anmelden, deren
   `prepare-web` auf eine Kopie des Klons laufen lassen und das Ergebnis statt der Web-Seite in den Rahmen. **Gmail braucht bei Google einen
   OAuth-Client „Android“ für `de.familyprojekt.privateakte` mit dem SHA-1 des echten Signierschlüssels – erst nach Punkt 1, macht Klaus.**
   IMAP mit App-Passwort braucht das nicht. Windows: Mail in der Java-Engine von Private Brain Pro (`klone/privat-brain-pro/windows`).
3. **Workflow PDF Pro:** Scanner und Kamera der Web-Fassung laufen in der App (Recht CAMERA). Die Pro-Teile aus `Workflow-PDF-Pro`
   (native/*.js, Plugins, Tresor) sind nicht eingebaut; als Klon mit Pin hereinholen wie Punkt 2.
4. **Kopien:** der Klon kennt **einen** zweiten Ort (plus zwei auf dem Gerät); Klaus wollte beliebig viele (SD-Karte, Festplatte 1, 2) – dafür
   braucht es die Mehrzahl in der Familienakte (`zweiter-ort.ts`), dann nachziehen. „Daten hinüberschicken“ an ein anderes Gerät: nicht gebaut
   (Familienakte hat dafür Paket/Netz-Abgleich).
5. Glocke bei geschlossener App (`FamilienakteGlockePlugin` hängt an der MainActivity der Familienakte), Diktat in der Android-WebView
   (kennt keine Spracherkennung; Familienakte hat `FamilienakteSpeechPlugin`), Teilen an die App (Eingang ist angemeldet, Intent-Filter fehlen),
   Updates vom eigenen Server (braucht Schlüssel), BookLedgerPro/Familienbüro „nicht installiert“ erkennen (öffnet jetzt die Web-Adresse).
6. Anmeldung Google/Microsoft-Kalender in der App: Rückkehr-Adresse der App bei Google/Microsoft eintragen (Klaus).

Am Gerät ist nichts geprüft. Datei-Organizer 0.4.21 eigene APK/Windows weiter erst ab 23.11. (hier nur als Klon in der Akte, wie in der PWA).

## Startauftrag

```
Repo: lausiklauskn-png/Private-Akte. Lies CLAUDE.md, dann docs/BRIEF_ABSCHLUSS_2026-11-18_PRO-AKTE-0.9.0.md.
Auftrag: Klaus' Rückmeldung zur Prüf-APK und zum Windows-Setup (PR #60) aufnehmen; dann Signatur mit Klaus, dann Mail nativ aus dem
Klon Private Brain Pro (Punkt 2), dann Workflow PDF Pro (Punkt 3). Nichts veröffentlichen ohne Klaus' Wort, Klone nie von Hand ändern.
```
