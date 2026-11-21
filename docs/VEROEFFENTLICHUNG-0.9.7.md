# Private Akte Pro 0.9.7 veröffentlicht (Android und Windows)

Klaus' Wort 21.11.2026: „bei Dateiorganizer für die Familienakte die Pro-Variante draußen und die PA und die APK, PWA und … so weiter“.
Inhalt (PR #83): HTML-Unterlagen zeigen lesbaren Text statt Code (Klon Datei-Organizer @ `4fab221`, 0.4.24), Absender wie „doctype html>“
ausgeblendet, „Öffnen“ und „Teilen“ in der Android-App über Androids „Öffnen mit“ bzw. das Teilen-Fenster. Quelle main
`fd855b6241976bec1abb3ddb7fb8dc36ab1731cb`.

- [Android-APK](https://github.com/lausiklauskn-png/Private-Akte/releases/download/v0.9.7/Private-Akte-Pro-0.9.7.apk):
  225.116.393 Bytes, SHA-256 `38a8680257712fc537b4f8c7a4c4f0c5e03b2c5ec20025946f6806f9893273f7`, Code 97, eigene Signatur.
  Auch auf dem Update-Server (Fähnchen „Update 0.9.7“). Lauf „Android-App signiert“ 44891595982 (zweiter Versuch – der erste scheiterte
  an Maven Central, vorhandene Dateien kamen als 404, auch vom zweiten Spiegel).
- [Windows-Installer](https://github.com/lausiklauskn-png/Private-Akte/releases/download/v0.9.7/Private-Akte-Pro-Windows-0.9.7-x64-setup.exe):
  101.974.751 Bytes, SHA-256 `413b17cc6053a807556ff9a553ac890b9152a292e4f7a1d7fb098016c3fdaa69`, nicht signiert. Lauf „Windows-App“
  44893008092 mit `veroeffentlichen = ja` (Prüfbau installiert, gestartet, entfernt; danach zum Release gelegt).
- Web-App: über Pages mit `main`.

## Nachweise

- Beide Downloads ohne Anmeldung geladen: SHA-256 gleich `SHA256SUMS` bzw. `SHA256SUMS-windows` (Claude, 21.11.).
- PR #83 grün. Lokal Probe 528 grün, `test-native` 37 grün.

## Nicht geprüft

HTML-Unterlage, „Öffnen mit“ und Teilen am Tablet; Installation unter Windows (Klaus). Nicht erneut ausgeben; nächste Fassung 0.9.8 (Code 98).
