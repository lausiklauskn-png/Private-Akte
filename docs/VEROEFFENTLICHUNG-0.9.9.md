# Private Akte Pro 0.9.9 veröffentlicht (Android und Windows)

Klaus' Wort 22.11.2026: „Private Akte 0.9.9 auch für Android und Windows veröffentlichen“. Inhalt: PR #89, Klon `privat-brain-pro`
@ `8e082ae` (Private Brain Pro 1.0.58: „Alle Konten“ als drittes Postfach-Konto mit Index aller Ordner und Anhang-Angaben, Listen zu 15
mit „Weitere laden“, Vorausladen; vier Themen aus V3). Quelle main `40f1fa776131a7141f087d424dd9c2df6d24fcdc`.

- [Android-APK](https://github.com/lausiklauskn-png/Private-Akte/releases/download/v0.9.9/Private-Akte-Pro-0.9.9.apk):
  225.124.585 Bytes, SHA-256 `69c4df38d4f53a06ebb8b70316847e2437e964374b93364ac4c28978320a844b`, Code 99, eigene Signatur.
  Auch auf dem Update-Server (Fähnchen „Update 0.9.9“; der Lauf prüft den Feed von außen). Lauf „Android-App signiert“ 45071891966.
- [Windows-Installer](https://github.com/lausiklauskn-png/Private-Akte/releases/download/v0.9.9/Private-Akte-Pro-Windows-0.9.9-x64-setup.exe):
  101.916.332 Bytes, SHA-256 `cab039ebeaf0f02461d0a769801c3ef6655af766d8af95944ee53dcfd52c2009`, nicht signiert. Lauf „Windows-App“
  45072364821 mit `veroeffentlichen = ja`.
- Web-App: über Pages mit `main`.

## Nachweise

- Beide Downloads ohne Anmeldung geladen: SHA-256 gleich `SHA256SUMS` bzw. `SHA256SUMS-windows` (Claude, 22.11.).
- PR #89 grün; lokal Probe 536 grün, `test-native` 37 grün.

## Nicht geprüft

„Alle Konten“ und die neuen Themen am Tablet; Installation unter Windows (Klaus). Den Update-Server erreicht diese Sitzung nicht
selbst (nur über den Lauf). Nicht erneut ausgeben; nächste Fassung 1.0.0 oder 0.9.10 nach Klaus' Wahl (Code 100).
