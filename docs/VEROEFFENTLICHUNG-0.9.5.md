# Private Akte Pro 0.9.5 veröffentlicht (Android)

Klaus' Wort 20.11.2026: „wenn du fertig bist selbstständig mergen und online stellen der Apps in PWA APK und Windowsversion. auch zum
Download. Familienakte und Privat Akte“. Inhalt (PR #77): Klon Familienakte @ `706711b` (2.28.76: Kalender je Person, flacher Fuß) –
der Kalender in der Akte mit „Wem gehört dieses Handy?“, „Kalender von …“, fest/vorläufig, „Für wen noch“, privat; zweiter Maven-Spiegel
in `android/build.gradle`. Quelle main `30220ce75ee41414ec1c30b627c5dc2257e0f1a9`.

- [Android-APK](https://github.com/lausiklauskn-png/Private-Akte/releases/download/v0.9.5/Private-Akte-Pro-0.9.5.apk):
  225.112.297 Bytes, SHA-256 `fe7f0883c19e215cdf1c8f2e0a40940e4289914dba211c86eb8a17adcb83bb7d`, Code 95, eigene Signatur.
  Auch auf dem Update-Server (Fähnchen „Update 0.9.5“).
- Windows: keine öffentliche Ausgabe (unsigniert, Klaus 19.11.). Installer als CI-Download (Anmeldung nötig, bis 20.12.): Lauf „Windows-App“
  44713090183 auf `main`, Artefakt `private-akte-pro-windows` (14619180295).
- Web-App: über Pages mit `main`.

## Nachweise

- Lauf „Android-App signiert“ 44713094379 mit `veroeffentlichen = ja`: grün. „Windows-App“ 44713090183, „pruefung“ 44713090351: grün.
  Im PR war „android“ einmal rot an Maven Central (404 für eine vorhandene Datei); behoben mit dem zweiten Spiegel `repo1.maven.org`.
- Download ohne Anmeldung geladen: Größe und SHA-256 gleich `SHA256SUMS` (Claude, 20.11.).

## Nicht geprüft

Installation von 0.9.5 am Tablet und unter Windows (Klaus). Nicht erneut auslösen; nächste Fassung 0.9.6 (Code 96).
