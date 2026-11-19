# Private Akte Pro 0.9.1 veröffentlicht (Android)

Klaus' Wort 19.11.2026: „Du kannst alles veröffentlichen, sobald es grün ist.“ Inhalt (PR #68): App-Symbol ohne weißen Rand,
Klon Private Brain Pro @ `5164a4b` (1.0.55: Mailtext ohne `<style>`-Inhalt), Updates mit Fähnchen (Klon Datei-Organizer @ `b3cd3a0`,
Ziel `family-projekt.de/updates/private-akte/`). Quelle main `b6d6a66c4a3af4d2a6e6a85abbcbf4e80f36fb39`.

- [Android-APK](https://github.com/lausiklauskn-png/Private-Akte/releases/download/v0.9.1/Private-Akte-Pro-0.9.1.apk):
  225.100.009 Bytes, SHA-256 `d90271ebe948ea620ba5c92f7ef46bf7ef712419b5a52d8c66a0b3eaf53da1fb`, Code 91, eigene Signatur
  (Zertifikat in `docs/SIGNIERUNG.md`). Über die vorhandene App installieren.
- Update-Server: `https://family-projekt.de/updates/private-akte/` (`aktuell-android.json` + `.sig`, APK). Feed gegen den Schlüssel im
  Manifest geprüft („Signature Verified Successfully“), von außen nachgeladen und verglichen (Lauf).
- Windows: keine Ausgabe (unsigniert, ohne Updates; Prüfbau in der CI grün).
- Web-App: über Pages mit `main`.

## Nachweise

- PR #68 auf `49ada64`: alle Prüfungen grün (`android` einmal neu gestartet: Maven Central „Could not find …“, kein Test betroffen).
- Lauf „Android-App signiert“ 44562491948 auf `main` mit `veroeffentlichen = ja`: Bau, Signatur, Release `v0.9.1`, Update-Server – grün.
- Download ohne Anmeldung geladen: Größe und SHA-256 gleich `SHA256SUMS` (Claude, 19.11.).
- Klaus 19.11.: am Tablet über die vorhandene App installiert („Installation hat geklappt“).

## Nicht geprüft

Fähnchen am Gerät (erst mit der nächsten Fassung sichtbar), Erreichbarkeit des Update-Servers aus der Sitzung (Proxy gesperrt; der Lauf
hat ihn geprüft). Diese Veröffentlichung nicht erneut auslösen; nächste Fassung 0.9.2 (Code 92).
