# Abschluss – Signatur und Mail nativ in der Android-App (19.11.2026)

Auftrag: `docs/BRIEF_ABSCHLUSS_2026-11-18_PRO-AKTE-0.9.0.md`, Punkte 1 und 2. Klaus 19.11.: „Windows erst mal unsigniert lassen,
weiter mit Mail nativ“; Signatur gemeinsam Schritt für Schritt; „Ja, auf main und bauen“.

## Erledigt und am Tablet bestätigt

- **Eigene Android-Signatur.** Werkzeug `tools/signing/` (aus dem Organizer-Klon, nur Namen und Kennung geändert), `signing-identity.yml`
  (PR #62), Identität angelegt (PR #63). Umgebung `android-production` mit Secret `PA_SIGNING_UNLOCK`. Die Freigabe ist bei Klaus mit `age`
  gesichert (Termux und Ordner Download), die offene Datei ist gelöscht. Zertifikat und SHA-1 stehen in `docs/SIGNIERUNG.md`.
  Windows bleibt unsigniert.
- **Google-Client** „Private Akte Pro Android“ im Projekt `privat-brain-pro` (Paket `de.familyprojekt.privateakte` + SHA-1). Die App braucht
  keine Client-ID. Die App steht im Status „Test“: anmelden darf nur der Testnutzer, die Gmail-Freigabe läuft nach 7 Tagen ab.
- **Signierte APK** über „Android-App signiert“ (Download, nicht veröffentlicht). Läufe #6 (44520602531) und nach der Abhilfe
  44527171833. Die APK installiert sich über die vorige, der App-Speicher bleibt.
- **Mail nativ** (PR #61, dazu #60 auf `main`): Private Brain Pro läuft in der APK als App-Seite, Java byte-gleich aus dem Klon, die
  MainActivity der Akte erbt von dessen MainActivity.
- **Abhilfe für den Rahmen** (PR #64): Capacitor 8 nimmt Plugin-Aufrufe nur aus dem Hauptfenster an. `rahmen/capacitor-rahmen.js` gibt
  den Seiten im Rahmen die Brücke des Hauptfensters (gilt auch für Organizer, Workflow PDF, Kalender).
- **Am Tablet (Klaus 19.11., 14:12):** Die Mail-Seite lädt ohne Hängen, der Netz-Schalter zeigt den richtigen Stand, das Fenster
  „Mailkonto verbinden“ von Android öffnet. **Gmail angemeldet, Mails abgerufen** (Posteingang 45, Gesendet 40).
- Fassung 0.9.0 ist mit #60/#61 auf `main` und damit auch als Web-App über Pages veröffentlicht (Klaus' Wort).

## Offen (nächste Sitzung, Reihenfolge)

1. **Telekom-Postfach.** In der Akte meldet der Server „Anmeldung fehlgeschlagen“, weil Klaus das „Passwort für E-Mail-Programme“ nicht
   mehr kennt (nicht das Login-Passwort). Es liegt nur verschlüsselt im eigenständigen Private Brain Pro. Dort läuft das Konto weiter;
   ein zweites Hinzufügen scheitert dort genauso, es ist also kein Fehler der Akte. Nach vielen Fehlversuchen drosselt die Telekom
   vermutlich: die Verbindung hängt, und der Knopf „Verbinden und prüfen“ scheint nichts zu tun. **Weg:** im E-Mail-Center › Passwörter
   › „Passwort für E-Mail-Programme“ › „Passwort ändern“; etwa eine Stunde warten; dann das neue Passwort im Original-Konto eintragen
   und in der Akte einmal einrichten. IMAP/SMTP-Zugang ist bei der Telekom aktiviert, die Server stimmen mit der Vorlage der App überein.
   Hängt es danach weiter, ist es ein Befund für das Repo Privat-Brain-Pro: keine Zeitgrenze beim Prüfen, und der Knopf gibt keine
   Rückmeldung.
2. **Am Tablet weiter prüfen:** Organizer im Rahmen mit „Ordner wählen“ (FamilyFolders), Workflow PDF und Kalender im Rahmen. Alle drei
   gehen jetzt über die Brücke des Hauptfensters und sind am Gerät noch nicht probiert. Dazu „Exportieren“ › „Kopie einrichten“ auf
   die SD-Karte (Klaus will die Daten dort gesichert haben).
3. **Kleinigkeit:** Private Brain zeigt in der Akte „v0.9.0“ statt seiner eigenen Fassung (ProDevice liefert die Fassung der Akte).
   Updates von Private Brain sind in der Akte aus.
4. Danach aus dem Brief 0.9.0: Workflow PDF Pro (Punkt 3), mehrere Kopien (4), Glocke/Diktat/Teilen (5), Kalender-Anmeldung in der App (6).
   Mail unter Windows (Java-Engine von Private Brain Pro) ist nicht gebaut.

## Lehren

- Capacitor 8 verwirft Plugin-Aufrufe aus einem Unterfenster ohne Antwort („Plugin execution is allowed in Main Frame only“). Jede
  Hülle, die Tools im Rahmen zeigt, braucht die Brücke des Hauptfensters. Die Probe in `test-native.mjs` stellt das jetzt nach.
- GitHub Actions darf in diesem Repo keine PRs anlegen. Läufe, die einen PR anlegen wollen (signing-identity), enden rot, obwohl der
  Zweig fertig ist. Den PR dann von Hand anlegen.
- Bei Anleitungen für Klaus immer dazuschreiben, wohin etwas gehört (Browser, Termux, App). Eine Adresse landete sonst in Termux.

## Startauftrag

```
Repo: lausiklauskn-png/Private-Akte. Lies CLAUDE.md, dann docs/BRIEF_ABSCHLUSS_2026-11-19_SIGNATUR-MAIL-NATIV.md.
Auftrag: Klaus' Stand zum Telekom-Postfach aufnehmen (Punkt 1); dann am Tablet Organizer, Workflow PDF, Kalender und „Kopie einrichten“
im Rahmen mit ihm prüfen (Punkt 2); danach Workflow PDF Pro. Neue signierte APK: Actions › „Android-App signiert“ auf main.
Nichts veröffentlichen ohne Klaus' Wort, Klone nie von Hand ändern.
```
