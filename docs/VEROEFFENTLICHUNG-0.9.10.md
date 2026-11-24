# Private Akte Pro 0.9.10 veröffentlicht (Android und Windows)

Klaus' Wort 24.11.2026: „Ja, bitte ausgeben.“ Anlass: Galaxy Z Fold 7 (Android 17), das Mikrofon „wurde nicht erkannt“.
Inhalt: PR #95. In der App diktieren Suche, Kalender und Workflow PDF jetzt über Androids Sprachfenster (Plugin ProSpeech, Klebstoff
der Familienakte unverändert aus dem Klon); die App braucht dafür kein Mikrofon-Recht. Quelle main `d8fd31303eb37c0170831d898ebc56567c8685d2`.

- [Android-APK](https://github.com/lausiklauskn-png/Private-Akte/releases/download/v0.9.10/Private-Akte-Pro-0.9.10.apk):
  225.124.585 Bytes, SHA-256 `e2af447c77b89f8287d0bea88e59be5a76554ad246e60393c46afb039fa2dae1`, Code 100, eigene Signatur.
  Auch auf dem Update-Server (Fähnchen „Update 0.9.10“; der Lauf prüft den Feed von außen). Lauf „Android-App signiert“ 45436065958.
- [Windows-Installer](https://github.com/lausiklauskn-png/Private-Akte/releases/download/v0.9.10/Private-Akte-Pro-Windows-0.9.10-x64-setup.exe):
  101.912.931 Bytes, SHA-256 `b6275b79b93594cdea0649cd35bddf665aadef63e4ab4288163240feabb5666e`, nicht signiert. Lauf „Windows-App“
  45437047787 mit `veroeffentlichen = ja`.
- Web-App: über Pages mit `main` (für die Web-App ändert sich nichts außer der Fassung; Chrome hat eine eigene Spracherkennung).

## Nachweise

- Beide Downloads ohne Anmeldung geladen: SHA-256 gleich `SHA256SUMS` bzw. `SHA256SUMS-windows` (Claude, 24.11.).
- In der APK nachgesehen: `index.html` mit `app.js?v=0.9.10` und `familienakte-android.js`, Kalender im Rahmen mit
  `familienakte-android.js`, Brücke von Workflow PDF mit `FamilienakteDiktat`, Manifest mit 0.9.10. (Die Größe der APK gleicht zufällig
  der von 0.9.9 auf das Byte.)
- PR #95 grün; lokal `test-native` 41 grün (Gegenproben rot), Web-Probe 536 grün.

## Nicht geprüft

Diktat am Fold 7 und am Tablet (braucht das Sprachfenster von Google, Google-App mit Mikrofon-Recht); Installation unter Windows
(dort bleibt das Diktat wie vorher, ProSpeech gibt es unter Windows nicht). Nicht erneut ausgeben; nächste Fassung 0.9.11 (Code 101).
