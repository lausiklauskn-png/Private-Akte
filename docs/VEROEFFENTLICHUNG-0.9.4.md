# Private Akte Pro 0.9.4 veröffentlicht (Android)

Klaus' Wort 20.11.2026: „Alles zusammen als 0.9.4 ausgeben, sobald grün“. Inhalt (PR #74 in PR #75): sechs Grundbereiche immer auf der
Startseite, Klon Familienakte @ `ef1bb80` (2.28.75), Steckbrief der Person unter „Akten“ › Person.
Quelle main `14e77fb06f0f5d8d414d28ca3be9150953595f88`.

- [Android-APK](https://github.com/lausiklauskn-png/Private-Akte/releases/download/v0.9.4/Private-Akte-Pro-0.9.4.apk):
  225.112.297 Bytes, SHA-256 `00e3cc4e7e1f9f8a9e4d72df50f0580e305cb9d7b6b900cd2cbc32139c4fa267`, Code 94, eigene Signatur.
  Auch auf dem Update-Server (Fähnchen „Update 0.9.4“).
- Windows: keine öffentliche Ausgabe (unsigniert). Installer als CI-Download (Anmeldung nötig, bis 20.12.): Lauf „Windows-App“ 44698736064
  auf `main`, Artefakt `private-akte-pro-windows` (14612450510).
- Web-App: über Pages mit `main`.

## Nachweise

- Lauf „Android-App signiert“ 44698747051 mit `veroeffentlichen = ja`: grün im ersten Versuch. Lauf „Windows-App“ 44698736064 grün,
  „pruefung“ 44698736270 grün. Im PR war „android“ einmal rot an Maven Central („Could not find …“), nach einem Neustart grün.
- Download ohne Anmeldung geladen: Größe und SHA-256 gleich `SHA256SUMS` (Claude, 20.11.).

## Nicht geprüft

Installation von 0.9.4 am Tablet und unter Windows (Klaus). Nicht erneut auslösen; nächste Fassung 0.9.5 (Code 95).
