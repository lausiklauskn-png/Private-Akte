# Private Akte Pro 0.9.11 veröffentlicht (Android und Windows)

Klaus' Wort 26.11.2026: „Ja, bitte 0.9.11 bauen und ausgeben“ – vorher prüfen, dass das Mikrofon/Diktat aus 0.9.10 erhalten bleibt.
Inhalt: PR #94 (Bereiche der Startseite: unter 700 px so viele gleich breite Spalten wie passen, flach, nach unten zu rollen; nach dem
Alphabet) und PR #97 (Fassung). Quelle main `f2df2add81afa701ac295e0f6e89f6c15cf093da`.

- [Android-APK](https://github.com/lausiklauskn-png/Private-Akte/releases/download/v0.9.11/Private-Akte-Pro-0.9.11.apk):
  225.124.585 Bytes, SHA-256 `021d2dda296012de155a1cc8ae0df9762c8dc6281fd4e2844df3603b8d610d3c`, Code 101, eigene Signatur.
  Auch auf dem Update-Server (Fähnchen „Update 0.9.11“). Lauf „Android-App signiert“ 45790198312.
- [Windows-Installer](https://github.com/lausiklauskn-png/Private-Akte/releases/download/v0.9.11/Private-Akte-Pro-Windows-0.9.11-x64-setup.exe):
  101.916.780 Bytes, SHA-256 `1d59644d382712a5561cdbfd837bcea380df5944e9a79536205fb403a6f35c6d`, nicht signiert. Lauf „Windows-App“
  45791193007 mit `veroeffentlichen = ja`.
- Web-App: über Pages mit `main`.

## Nachweise

- Beide Downloads ohne Anmeldung geladen: SHA-256 gleich `SHA256SUMS` bzw. `SHA256SUMS-windows` (Claude, 26.11.).
- In der APK nachgesehen: `index.html` mit `app.js?v=0.9.11` und `familienakte-android.js` (Diktat von 0.9.10), `app.css` mit den neuen
  Bereichen, Brücke von Workflow PDF mit `FamilienakteDiktat`.
- Vor der Ausgabe: keine offenen PRs, kein Zweig mit nicht übernommener Arbeit; lokal `test-native` 41 grün (wie 0.9.10), Web-Probe 536 grün;
  PR #97 in der CI grün.

## Nicht geprüft

Am Tablet und am Fold 7; Installation unter Windows. Nicht erneut ausgeben; nächste Fassung 0.9.12 (Code 102).
