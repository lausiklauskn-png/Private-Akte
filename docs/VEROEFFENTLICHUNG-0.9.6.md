# Private Akte Pro 0.9.6 veröffentlicht (Android und Windows)

Klaus' Wort 20.11.2026: „stell mir bitte die Apps hier zum Download zur Verfügung, PWA, APK und Windows … Geschenkbox … für Jens“.
Inhalt (PR #81): Klon Datei-Organizer @ `b2621a1` (0.4.23: Papierkorb an jeder Zeile von „Bitte prüfen“, Meldung nach dem Übernehmen eines
anderen Felds), Windows-Installer erstmals öffentlich am Release, Geschenkbox für Jens. Quelle main `f5ee6b6f56a3fbf5c20ad6a549ef78fce4d521a2`.

- [Android-APK](https://github.com/lausiklauskn-png/Private-Akte/releases/download/v0.9.6/Private-Akte-Pro-0.9.6.apk):
  225.112.297 Bytes, SHA-256 `5d818c06c35f0a4e98c6624fab10cb1b144385b0beb6716481df656f2b768be7`, Code 96, eigene Signatur.
  Auch auf dem Update-Server (Fähnchen „Update 0.9.6“). Lauf „Android-App signiert“ 44750090083.
- [Windows-Installer](https://github.com/lausiklauskn-png/Private-Akte/releases/download/v0.9.6/Private-Akte-Pro-Windows-0.9.6-x64-setup.exe):
  101.929.230 Bytes, SHA-256 `7130c429b2e258e9e664293475683429ed44de116341366234d7e57d85001b13`, nicht signiert. Lauf „Windows-App“
  44751111464 mit `veroeffentlichen = ja` (Prüfbau installiert, gestartet, entfernt; danach zum Release gelegt).
- Web-App: über Pages mit `main`.

## Nachweise

- Beide Downloads ohne Anmeldung geladen: SHA-256 gleich `SHA256SUMS` bzw. `SHA256SUMS-windows` (Claude, 20.11.).
- PR #81: klone, engine, windows, android (zweiter Versuch – der erste scheiterte an Maven Central, eine vorhandene Datei kam als 404),
  build, probe grün. Lokal Probe 520, `test-native` 37 grün.

## Nicht geprüft

Installation von 0.9.6 am Tablet und unter Windows (Klaus). Nicht erneut ausgeben; nächste Fassung 0.9.7 (Code 97).
