# Private Akte Pro 0.9.3 veröffentlicht (Android)

Klaus' Wort 19.11.2026: „dann veröffentliche das, sobald es grün ist und ziehe es gleich in der Windows-Akte nach“. Inhalt (PR #72):
Klon Private Brain Pro @ `33775c1` (1.0.57: Telekom-Server im Fenster „Mailkonto verbinden“), Brief für die Familienakte.
Quelle main `57c5e4aea442ad798aa2e31fa01d81c903b8326e`.

- [Android-APK](https://github.com/lausiklauskn-png/Private-Akte/releases/download/v0.9.3/Private-Akte-Pro-0.9.3.apk):
  225.104.105 Bytes, SHA-256 `bdbf701d779400ffc26229741eaacb67e65529a5e5be8302e207c9aa59129e0a`, Code 93, eigene Signatur.
  Auch auf dem Update-Server (Fähnchen „Update 0.9.3“).
- Windows: keine öffentliche Ausgabe (unsigniert). Installer als CI-Download (Anmeldung nötig, 30 Tage): Lauf „Windows-App“ 44622224404
  auf `main`, Artefakt `private-akte-pro-windows` (14578306617).
- Web-App: über Pages mit `main`.

## Nachweise

- Lauf „Android-App signiert“ 44622229146 mit `veroeffentlichen = ja`: Versuch 1 rot an Maven Central („Could not find …“, nichts
  veröffentlicht), Versuch 2 grün. Lauf „Windows-App“ 44622224404: Versuch 1 rot (Abhängigkeit nicht ladbar), Versuch 2 grün.
- Download ohne Anmeldung geladen: Größe und SHA-256 gleich `SHA256SUMS` (Claude, 19.11.).

## Nicht geprüft

Installation von 0.9.3 am Tablet und unter Windows (Klaus). Nicht erneut auslösen; nächste Fassung 0.9.4 (Code 94).
