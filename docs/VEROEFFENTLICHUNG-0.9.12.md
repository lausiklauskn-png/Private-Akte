# Private Akte Pro 0.9.12 veröffentlicht (Android und Windows)

Klaus' Wort 27.11.2026 („1 und 2“, dann: die Pro-Apps mit der Reparatur ausgeben). Inhalt: PR #103 – Kopf und Seitenleiste lagen am
DeX-Monitor (und am Handy) unter der Fensterleiste des Systems; oben gilt jetzt `env(safe-area-inset-top)`. Quelle main `71a01f3`.

- [Android-APK](https://github.com/lausiklauskn-png/Private-Akte/releases/download/v0.9.12/Private-Akte-Pro-0.9.12.apk):
  225.124.585 Bytes, SHA-256 `148f1564da249697aa50b94085824586044b99c19c17d63373def5ec26fb24d1`, Code 102, eigene Signatur.
  Auch auf dem Update-Server (Fähnchen „Update 0.9.12“). Lauf „Android-App signiert“ 46062187673.
- [Windows-Installer](https://github.com/lausiklauskn-png/Private-Akte/releases/download/v0.9.12/Private-Akte-Pro-Windows-0.9.12-x64-setup.exe):
  101.923.301 Bytes, SHA-256 `6ffb208f64c2d6820c0c5d4d9f8e4c4291e7724af70076dc537f52e51de5f8e7`, nicht signiert. Lauf „Windows-App“
  46064844766 mit `veroeffentlichen = ja`.
- Web-App: über Pages mit `main`.

Beide Downloads ohne Anmeldung geladen: SHA-256 gleich `SHA256SUMS` bzw. `SHA256SUMS-windows` (Claude, 27.11.). Vorher: Web-Probe 536 grün,
`test-native` 41 grün, PR-CI grün. Am Gerät ungeprüft. Nicht erneut ausgeben; nächste Fassung 0.9.13 (Code 103).
