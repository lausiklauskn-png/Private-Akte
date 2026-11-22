# Private Akte Pro 0.9.8 veröffentlicht (Android und Windows)

Klaus' Wort 22.11.2026: „Ja, mach das. Und dann als App ausgeben.“ (Baum dichter), dazu „Möglichkeit machen, den Vollbildschirm anzugucken
in der Vorschau“ (geht mit in 0.9.8). Inhalt: PR #85 (Unterordner ohne Unterordner nicht mehr 52 px hoch, Klon Datei-Organizer @ `ae56da7`,
0.4.25), PR #86 (Vollbild ⤢ an der Vorschau im Steckbrief; zweiter und dritter Maven-Spiegel in `android/build.gradle` und
`windows/engine/build.mjs`). Quelle main `2988fc8de9213f9c859e00000a8edca3197c3cc3`.

- [Android-APK](https://github.com/lausiklauskn-png/Private-Akte/releases/download/v0.9.8/Private-Akte-Pro-0.9.8.apk):
  225.116.393 Bytes, SHA-256 `a8420f8e078b34467cffe70888ea5e44541377084a409e37fe14504036331451`, Code 98, eigene Signatur.
  Auch auf dem Update-Server (Fähnchen „Update 0.9.8“). Lauf „Android-App signiert“ 45001858505.
- [Windows-Installer](https://github.com/lausiklauskn-png/Private-Akte/releases/download/v0.9.8/Private-Akte-Pro-Windows-0.9.8-x64-setup.exe):
  101.913.574 Bytes, SHA-256 `6e496b06c9bd9c8ed4d3f5b70d17d9a3ce0df5f4d00cb2a634d87c5eecf28c35`, nicht signiert. Lauf „Windows-App“
  45002227759 mit `veroeffentlichen = ja`.
- Web-App: über Pages mit `main`.

## Nachweise

- Beide Downloads ohne Anmeldung geladen: SHA-256 gleich `SHA256SUMS` bzw. `SHA256SUMS-windows` (Claude, 22.11.).
- PR #85 und #86 grün. Lokal Probe 536 grün, `test-native` 37 grün.

## Nicht geprüft

Vollbild und Baum am Tablet; Installation unter Windows (Klaus). Nicht erneut ausgeben; nächste Fassung 0.9.9 (Code 99).
