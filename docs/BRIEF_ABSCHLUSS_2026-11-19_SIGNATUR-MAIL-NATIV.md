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
  „Mailkonto verbinden“ von Android öffnet. **Gmail angemeldet, Mails abgerufen** (Posteingang 45, Gesendet 40). **Hetzner-Konto
  (IMAP) eingerichtet** (14:58, Postfach leer, Ordner da).
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
2. **Mail im Explorer als Rohtext – geklärt (Klaus 15:19–15:27, Bilder aus Akte 0.9.0 und Original 1.0.54): kein Fehler der Akte.**
   Beide Fassungen verhalten sich gleich. „Dateien“ › „Öffnen“ zeigt bei einer Mail den gespeicherten Mailtext, nicht die gestaltete
   Ansicht (die gibt es unter „Mail“). Mails mit eigenem Textteil sehen gut aus (Link-Code, ChatGPT „Plan wird nicht verlängert“,
   Anthropic-Beleg im Original). Reine HTML-Mails (Newsletter wie Kleinanzeigen, OpenAI „Mehr Nutzungskontingent“) zeigen die
   Gestaltungsregeln (`<style>`-Inhalt) als Text, weil beim Umwandeln in Text der Stil-Block nicht entfernt wird. Nichts ist verloren
   oder verschlüsselt, das Original liegt beim Anbieter. **Befund für das Repo Privat-Brain-Pro** (dort beheben, dann den Klon
   nachziehen): im Mailtext `<style>`/`<head>` weglassen, oder im Explorer bei Mails die gestaltete Ansicht wie unter „Mail“ öffnen.
3. **Am Tablet weiter prüfen:** Organizer im Rahmen mit „Ordner wählen“ (FamilyFolders), Workflow PDF und Kalender im Rahmen. Alle drei
   gehen jetzt über die Brücke des Hauptfensters und sind am Gerät noch nicht probiert. Dazu „Exportieren“ › „Kopie einrichten“ auf
   die SD-Karte (Klaus will die Daten dort gesichert haben).
4. **Kleinigkeit:** Private Brain zeigt in der Akte „v0.9.0“ statt seiner eigenen Fassung (ProDevice liefert die Fassung der Akte).
   Updates von Private Brain sind in der Akte aus.
5. Danach aus dem Brief 0.9.0: Workflow PDF Pro (Punkt 3), mehrere Kopien (4), Glocke/Diktat/Teilen (5), Kalender-Anmeldung in der App (6).
   Mail unter Windows (Java-Engine von Private Brain Pro) ist nicht gebaut.

## Lehren

- Capacitor 8 verwirft Plugin-Aufrufe aus einem Unterfenster ohne Antwort („Plugin execution is allowed in Main Frame only“). Jede
  Hülle, die Tools im Rahmen zeigt, braucht die Brücke des Hauptfensters. Die Probe in `test-native.mjs` stellt das jetzt nach.
- GitHub Actions darf in diesem Repo keine PRs anlegen. Läufe, die einen PR anlegen wollen (signing-identity), enden rot, obwohl der
  Zweig fertig ist. Den PR dann von Hand anlegen.
- Bei Anleitungen für Klaus immer dazuschreiben, wohin etwas gehört (Browser, Termux, App). Eine Adresse landete sonst in Termux.

## Startauftrag (Klaus 19.11. abends: nächste Sitzung behebt die Mail-Anzeige in Private Brain Pro 1.0.54 und Akte 0.9.0)

```
Repo: lausiklauskn-png/Privat-Brain-Pro (dazu lausiklauskn-png/Private-Akte mit add_repo holen).
Lies zuerst CLAUDE.md in beiden Repos, dann in Private-Akte docs/BRIEF_ABSCHLUSS_2026-11-19_SIGNATUR-MAIL-NATIV.md (Punkt 2).

Auftrag: (a) Fehler in der Mail-Anzeige von Private Brain Pro beheben (Punkte 1–4 unten), (b) danach in Private-Akte Punkte 5 (Symbol)
und 6 (Updates mit Fähnchen). Der Mail-Fehler steckt gleich in der eigenständigen App 1.0.54 und in der
Privaten Akte 0.9.0 (die Akte nutzt Private Brain Pro als 1:1-Klon).

Befund (Klaus am Tablet, 19.11.):
- Explorer („Dateien“) › Mail › „Öffnen“ zeigt den gespeicherten Mailtext. Bei reinen HTML-Mails (Newsletter, z. B. Kleinanzeigen,
  OpenAI „Mehr Nutzungskontingent“) stehen darin die Gestaltungsregeln aus dem <style>-Block als Text – unlesbar. Mails mit eigenem
  Textteil (Link-Code, ChatGPT „Plan wird nicht verlängert“) sind gut.
- Unter „Mail“ wird dieselbe Mail richtig gestaltet angezeigt.
- Kein Datenverlust: Einträge mit „Original fehlt · nicht prüfbar“ sind alte Katalog-Einträge ohne Datei (Testvorlagen) – so gewollt,
  nicht Teil dieses Auftrags.

Was zu tun ist:
1. Im Repo Privat-Brain-Pro die Ursache finden (Umwandlung HTML → Mailtext; <style>, <head>, Kommentare werden nicht entfernt) und
   beheben. Besser zusätzlich: „Öffnen“ einer Mail im Explorer zeigt die gestaltete Ansicht wie unter „Mail“. Schon gespeicherte
   Mailtexte sollen beim Anzeigen ebenfalls lesbar werden (nicht nur neu abgerufene).
2. Proben dort grün, dann zusammenführen. Fassung 1.0.55 für Android/Windows nur auf Klaus' Wort veröffentlichen.
3. In Private-Akte den Klon nachziehen: node tools/klon-nachziehen.mjs privat-brain-pro --quelle <Pfad> (nie von Hand ändern),
   --pruefen, node tools/native/test-native.mjs, PR, zusammenführen.
4. Signierte APK neu bauen: Actions › „Android-App signiert“ auf main (Private-Akte). Klaus installiert sie über die vorhandene App
   (Speicher bleibt) und prüft die Mails im Explorer.

Dazu in Private-Akte (Klaus 19.11. abends):
5. App-Symbol ohne weißen Rand: das Symbol der Pro-Akte (Android, adaptives Symbol) zeigt um das runde Pro-Zeichen einen weißen Ring –
   Ursache: Hintergrund `ic_launcher_background` ist #FFFFFF, der Vordergrund (bilder/logo-pro-rund.png) füllt die Fläche nicht.
   Hintergrund in der Randfarbe/als Verlauf des Zeichens und den Vordergrund größer setzen (Vorbild Private Brain Pro: eigener
   Hintergrund, Vordergrund mit Inset), so dass kein weißer Rand bleibt; vorher als Bild zeigen, Klaus sagt Ja.
6. Updates mit Fähnchen in der Pro-Akte (noch nicht gebaut): wie in Datei-Organizer Pro / Private Brain Pro – die App prüft beim Start,
   ob es eine neue Fassung gibt, zeigt neben der Fassung im Kopf ein Fähnchen „Update X.Y.Z“, lädt die signierte APK, prüft sie
   (Größe, SHA-256, Paket, Zertifikat, versionCode) und öffnet Androids Installieren-Fenster (Recht REQUEST_INSTALL_PACKAGES). Muster:
   klone/datei-organizer (UpdateFeed, android-release.yml, update-feed-android.mjs, docs/ANDROID.md „Update-Server“). Dafür braucht es
   einen Veröffentlichungs-Lauf (Release + family-projekt.de/updates/private-akte/) – nur auf Klaus' Wort. **Einrichtung mit Klaus
   Schritt für Schritt:** Ordner auf dem Server anlegen (Termux), Geheimnisse UPDATE_SIGNING_KEY und UPDATE_UPLOAD_KEY in der Umgebung
   android-production (wenn schon für den Organizer vorhanden: nachsehen, ob dieselben genommen werden dürfen), öffentlichen Schlüssel
   in die App eintragen. Erst prüfen, was schon da ist, dann nur das Fehlende einrichten.

Nebenbei, klein: In der Akte zeigt Private Brain „v0.9.0“ statt seiner eigenen Fassung – ansehen, wenn es sich ohne Änderung am Klon
lösen lässt, sonst im Brief lassen.

Klaus' eigene Aufgabe, nicht in dieser Sitzung: Telekom-Postfach (neues „Passwort für E-Mail-Programme“, Weg steht im Brief Punkt 1).

Regeln: Anleitungen für Klaus Schritt für Schritt auf Deutsch, immer dazuschreiben wohin (Browser, Termux, App). Nichts
veröffentlichen ohne Klaus' Wort. Klone nie von Hand ändern.
```
