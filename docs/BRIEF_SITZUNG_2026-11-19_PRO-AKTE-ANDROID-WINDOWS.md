# Brief – Pro-Akte: Private Akte als Android- und Windows-App (für die Sitzung ab 19.11.2026)

Entschieden von Klaus am 18.11.2026 abends, im Chat der Sitzung, die die PRs aufgeräumt hat. Stand vorher: Private Akte 0.8.1 auf `main`.
In Private-Akte, BookLedgerPro und BookLedger-Basic ist kein PR mehr offen.

## Entschieden (Klaus 18.11.)

1. **Ein Repo.** PWA und Pro-Akte bleiben zusammen in `Private-Akte`. Es kommen die Ordner `android/` und `windows/` dazu, nach dem Muster der
   Familienakte und des Datei-Organizers (Capacitor für Android, Tauri und Java-Engine für Windows). Gearbeitet wird zuerst an der PWA; jeder Bau
   von APK und Windows nimmt denselben Stand mit, ohne Nachziehen. Ein drittes Repo nur, falls Klaus später eine eigene Variante will.
2. **Android und Windows kommen gleichzeitig heraus**, vom selben Commit. **Keine Testfassungen:** die erste Ausgabe ist gleich die richtige
   (Klaus: „die anderen haben auch funktioniert“). Veröffentlicht wird trotzdem nur auf Klaus' Wort im Moment der Ausgabe.
3. **Paketgröße egal** (rund 370 MB mit allen Apps). Ins Paket gehört trotzdem nur, was die Seite lädt; Prüfstapel, Testdaten, `android/` und
   `windows/` der Klone gehören nicht hinein.
4. **Signatur:** eigener Schlüssel und eigene Kennung (Vorschlag `de.familyprojekt.privateakte`). Angelegt wird er erst, wenn es so weit ist,
   und nie ohne Klaus (`signing/`, wie in den anderen Pro-Apps).
5. **Eingebaut (Klon mit Pin, Klone nie von Hand ändern), läuft also ohne andere installierte App:**
   - **Datei-Organizer** (ist schon da). Die Gerätezugriffe seiner Pro-Fassung (Ordner wählen usw.) liegen im Klon und müssen in die Hülle
     angeschlossen werden.
   - **Kalender und Notizen** aus der Familienakte (sind schon da). Den Gerätekalender gibt es dort nur in der Android-App; in der Pro-Akte
     anschließen.
   - **Portemonnaie** (gehört zur Hülle).
   - **Workflow PDF als Pro:** die Pro-Teile aus dem Repo `Workflow-PDF-Pro` (Scanner, Kamera, Tresor) kommen als Kopie mit Pin in die
     Pro-Akte. Die eigenständige App Workflow PDF Pro läuft getrennt weiter; ändern oder löschen dort berührt die Akte nicht.
   - **Private Brain Pro gleich eingebaut** (Klaus: „nicht vorerst auslagern“), samt **E-Mail** und Kalender. Grund: Klaus will jetzt mit
     seinen Daten arbeiten, die Mail-Postfächer und den Kalender brauchen. Die Familienakte ist ihm zu komplex; er arbeitet mit der Privaten
     Akte und verbessert die Familienakte nebenbei weiter.
6. **Ausgelagert (eigene App, wird nur aufgerufen; fehlt sie, sagt die Akte „nicht installiert“):** BookLedgerPro (die Akte gibt die
   Monatsdatei weiter, die Rechenteile sind eingebaut) und Familienbüro (AGPL wegen ONLYOFFICE).
7. **Speicher, wählbar:**
   - **Hauptort:** Speicher des Geräts, SD-Karte oder externe Festplatte.
   - **Kopien:** beliebig viele (SD-Karte, Festplatte 1, Festplatte 2). Ist eine Kopie angeschlossen, wird sie beim Öffnen der App von selbst
     auf den neuesten Stand gebracht; fehlt sie, läuft alles am Hauptort weiter.
   - **Zurückholen:** jeder Ort lässt sich einlesen (Handy verloren → von der SD-Karte oder einer Festplatte zurückholen).
   - **Verschlüsselt:** alle Kopien liegen verschlüsselt mit dem Passwort; offen gearbeitet wird nur im eigenen Speicher der App (Regel
     „Verschlüsselung an einem Ort“).
   - Am Handy auch „Daten hinüberschicken“ an das Tablet bzw. das andere Gerät.

## Befund aus dieser Sitzung (nur gelesen)

- **Private Brain Pro** (`lausiklauskn-png/Privat-Brain-Pro`, öffentlich, 1.0.54 auf Android und Windows ausgegeben):
  - Die Web-Seite ist build-frei (`index.html`, `modules/`, `assets/`, `vendor/`). `npm run build:web` (`tools/native/prepare-web.mjs`)
    stellt sie für die App zusammen. 0.7.1 hielt fest: ein Klon Datei für Datei liefe nicht, die Seite entsteht erst durch `build:web` –
    **das zuerst nachprüfen**, dann den Klon wie bei Workflow PDF über eine erzeugte Startseite unter `rahmen/` mit Brücke und eigenem
    Speicher laufen lassen.
  - **Die Mail ist nativ:** `android/app/src/main/java/de/familyprojekt/privatebrain/pro/` (MailEngine, MailAccount, EncryptedMailStore,
    Gmail…), unter Windows in seiner Java-Engine. Diese Teile müssen als Kopie mit Pin in `android/` bzw. `windows/` der Pro-Akte – nach dem
    Muster von `tools/native/tresor-nachziehen.mjs` in BookLedgerPro (Pins, `--pruefen`, nie von Hand).
  - **Achtung Anmeldung:** die Google-Anmeldung (Gmail) ist an Paketname und Signatur der App gebunden. Eine neue App
    (`de.familyprojekt.privateakte`) braucht bei Google (und bei Microsoft, falls genutzt) einen eigenen Eintrag. Das macht Klaus; die Sitzung
    schreibt die Schritte auf. Für IMAP-Postfächer (Passwort/App-Passwort) gilt das nicht.
- **Kalender in der Akte:** Notizen und Erinnerungen stehen schon im selben Register wie in der Familienakte. Der Abgleich mit Google/Microsoft
  über „Kalender verbinden“ ist eingebaut, aber nie echt angemeldet (Weiterleitungs-Adressen siehe `CLAUDE.md` 0.6.0). In der App kommt der
  Gerätekalender aus dem Klon der Familienakte dazu.
- **Datei-Organizer 0.4.21:** APK und Windows sind dort auf ab Montag 23.11. verschoben (Klaus). Nicht von hier auslösen.

## Vorschlag zur Reihenfolge (eine Sitzung schafft nicht alles – was nicht fertig wird, mit Brief weitergeben)

1. `android/` und `windows/` nach dem Muster des Klons der Familienakte anlegen (eigene Kennung, Paket aus den Laufzeit-Dateien), CI-Läufe
   `android.yml` und `windows.yml` grün. Noch nicht signieren, nicht ausgeben.
2. Speicher-Orte (Hauptort und Kopien, verschlüsselt, einlesen) – das ist der Kern für Klaus' Datensicherheit.
3. Private Brain Pro als Klon mit Pin: erst die Web-Seite im Rahmen der PWA, dann Mail nativ in der App.
4. Pro-Teile von Workflow PDF Pro, Gerätezugriffe von Datei-Organizer und Kalender anschließen.
5. Signatur mit Klaus, dann Android und Windows zugleich ausgeben (auf sein Wort).

## Nicht

Keine Klone von Hand ändern. Keine Testfassungen. Nichts veröffentlichen ohne Klaus' Wort. Keine Schlüssel, Passwörter oder echten Daten ins Repo
(öffentlich). Keine Erklärsätze auf der Oberfläche. Das Gelernte nie löschen. Forschung nur nach Kimhub.

## Startauftrag zum Einfügen

```
Repo: lausiklauskn-png/Private-Akte (dazu lesen: Privat-Brain-Pro, Workflow-PDF-Pro, meine-familienakte, Datei-Organizer – alle öffentlich).
Lies zuerst CLAUDE.md, dann docs/BRIEF_SITZUNG_2026-11-19_PRO-AKTE-ANDROID-WINDOWS.md.
Auftrag (Klaus 18.11.): aus der Privaten Akte im selben Repo eine Pro-App für Android und Windows machen, PWA bleibt; eingebaut: Datei-Organizer,
Kalender/Notizen, Portemonnaie, Workflow PDF als Pro, Private Brain Pro mit Mail; ausgelagert nur BookLedgerPro und Familienbüro.
Speicher wählbar (Gerät, SD-Karte, externe Festplatte), Kopien verschlüsselt, jeder Ort einlesbar.
Reihenfolge laut Brief: android/ + windows/ mit CI grün, dann Speicher-Orte, dann Private Brain, dann Workflow PDF Pro.
Signatur nur mit Klaus, keine Testfassungen, veröffentlichen nur auf sein Wort.
Nicht: Klone von Hand ändern, Schlüssel/echte Daten ins Repo, Erklärsätze auf der Oberfläche, Datei-Organizer 0.4.21 vor Montag 23.11. ausgeben.
```
