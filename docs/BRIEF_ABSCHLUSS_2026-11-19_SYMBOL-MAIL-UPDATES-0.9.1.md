# Abschluss – Symbol, Mail-Anzeige, Updates mit Fähnchen (19.11.2026 abends, 0.9.1)

Auftrag: `docs/BRIEF_ABSCHLUSS_2026-11-19_SIGNATUR-MAIL-NATIV.md`, Punkt 2 und Startauftrag Punkte 1–6. Klaus 19.11.: „Du kannst alles
veröffentlichen, sobald es grün ist“; Symbol Ja; Updates Weg 1 (Update-Teil im Datei-Organizer einstellbar, über den Klon).

## Erledigt

- **Mail-Anzeige (Private Brain Pro 1.0.55, PR #152 dort):** Ursache war `Html.fromHtml` in `MailMime.java` – lässt den Inhalt von
  `<style>`/`<head>` als Text stehen; der kam beim Merken einer Mail in den Katalog. Behoben in Java (`MailMime.htmlText`, Windows
  `DesktopHtml` ohne `head`) und beim Anzeigen schon gespeicherter Texte (`mailLesbar` in `index.html`). **Veröffentlicht:** Android
  1.0.55 (61.513.856 B, SHA-256 `d7da442b…b278`, Download geprüft), Windows 1.0.55 (Lauf gestartet 19.11. 16:36 UTC, Nachweis in
  Privat-Brain-Pro `docs/VEROEFFENTLICHUNG-1.0.55.md`), PWA über Pages.
- **Klon in der Akte** `privat-brain-pro` @ `5164a4b`.
- **App-Symbol ohne weißen Rand** (`tools/native/symbol-pro.py`).
- **Updates mit Fähnchen:** Datei-Organizer PR #75 (`UpdateFeed.Ziel`, Meta-Daten im Manifest; für den Organizer unverändert), Klon @
  `b3cd3a0`, Ziel und Schlüssel der Akte im Manifest, Fähnchen in `app.js`, Veröffentlichen über „Android-App signiert“ mit
  `veroeffentlichen = ja`. **Mit Klaus eingerichtet:** Server-Ordner `updates/private-akte`, eigener Ed25519-Schlüssel (Termux, mit `age`
  gesichert, Gegenprobe GLEICH), `UPDATE_SIGNING_KEY`/`UPDATE_UPLOAD_KEY` in der Umgebung `android-production`.
- **Akte 0.9.1 veröffentlicht** (`docs/VEROEFFENTLICHUNG-0.9.1.md`), Klaus hat sie am Tablet installiert.

## Offen (nächste Sitzung)

1. **Klaus' Rückmeldung vom Tablet** zu 0.9.1: Symbol, Newsletter-Mail im Explorer, Tipp auf „0.9.1 · Pro“ („ist aktuell“ = Server
   erreichbar). Das Fähnchen selbst zeigt sich erst mit 0.9.2 – bei der nächsten Fassung prüfen, dass es erscheint und das Update
   über die App installiert.
2. **Telekom-Postfach** (Klaus' eigene Aufgabe): neues „Passwort für E-Mail-Programme“ im E-Mail-Center, etwa eine Stunde warten, dann
   erst im eigenständigen Private Brain Pro, danach in der Akte eintragen. Das Termux-Passwort hat damit nichts zu tun (Klaus fragte).
3. **Nicht gebaut:** „Öffnen“ einer Mail im Explorer mit der gestalteten Ansicht wie unter „Mail“ (wechselt die Seite und braucht Netz –
   nur auf Klaus' Ja). In der Akte zeigt Private Brain weiter „v0.9.0“/die Fassung der Akte statt seiner eigenen (ProDevice liefert die
   Fassung der Hülle; ohne Änderung am Klon nicht lösbar). Updates für Windows der Akte nicht gebaut.
4. Aus den früheren Briefen: Organizer/Workflow PDF/Kalender im Rahmen am Tablet prüfen, „Kopie einrichten“ auf SD-Karte, Workflow PDF Pro,
   mehrere Kopien, Glocke/Diktat/Teilen, Kalender-Anmeldung in der App.

## Lehren

- **Maven Central** wies heute mehrfach Gradle-Abhängigkeiten ab („Could not find …“) – jedes Mal vor dem ersten Test. Einmal neu starten
  genügte. Erst die Ursache im Protokoll lesen, dann neu starten.
- Die Probe „Verlauf: aus den geänderten Bereichen ist gelernt“ im Datei-Organizer war wieder einmal rot (47 Einträge, 0 Regeln) und im
  Neustart grün – Ursache weiter offen (dort in `CLAUDE.md`).
- Bei Termux-Schritten immer den ganzen Block in der richtigen Reihenfolge geben und Prüf-Befehle zum Kopieren einzeln in einen Kasten
  setzen (Klaus suchte den Gegenprobe-Befehl zweimal).
- Das Fähnchen kommt erst mit der Fassung **nach** der, die es einführt: die erste muss von Hand installiert werden.
