# Bauplan · V-2026-0001 · Fassung 4

Kunde: ⟦KUNDE-1⟧ · Fassungsdatum 2026-11-04 · Anlass: beim Einrichten am Gerät entstanden falsche Ordner und leere Dateien; Nutzer sollen verstehen, wo was liegt. Laut Auftrag gibt es keine frühere Fassung – alle Zeilen K-01 bis K-12 sind NEU BAUEN, nichts ist UNVERÄNDERT.

## 1. Zweck und Nutzer

- Vorhaben: PDFs scannen, ausfüllen und übersetzen – als App auf Tablet und PC.
- Ausgangslage (B-01–B-03, B-08–B-10): Papier; drucken, von Hand ausfüllen, wieder einscannen; Formulare kommen schief und unleserlich zurück; die bisherige Web-App verliert ihre Daten beim Löschen des Browsers; kein Werkzeug erkennt Formularfelder ohne Konto.
- Ziel (B-16): Ein Formular ist in Minuten ausgefüllt und verschickt, ohne Drucker.
- Nutzer (B-06, B-07): eine Inhaberin, zwei Mitarbeiterinnen. Arbeitsgegenstand (B-04, B-05, B-27): Dokumente im Kundenkontakt – Briefe, Formulare, Fotos, ausgefüllte PDFs. Personenbezogene Daten: ja (B-28).

## 2. Plattformen, Datenort, Sicherung, Netz

- Geräte: Android (Handy/Tablet), Windows-PC, Browser (B-14, B-23, B-25). Die Web-App bleibt für iPhone/iPad bestehen und muss auf demselben Stand wie die Apps gehalten werden (B-20).
- Android-App dauerhaft signiert; Windows-Installer zunächst unsigniert, die Warnung beim Installieren wird erklärt (K-03, B-22). Kein Konto (B-14).
- Ohne Internet: immer (B-17, B-24). Kein Abgleich zwischen Geräten; ein Gerät reicht.
- Daten nur auf dem Gerät: interne Arbeitsablage ab dem ersten Start ohne Ordnerwahl (B-21); eigener Ordner oder Speicherkarte freiwillig (B-15). Ablage verschlüsselt.
- Originale bleiben unverändert (B-18).
- Sicherung: verschlüsselt, nur selbst angestoßen; Bibliothek als verschlüsselte Sicherungsdatei; Zurückholen fügt hinzu und überschreibt nie (B-34); gestreamt, stürzt bei großen Beständen nicht ab (K-06, B-31).
- KI: der Nutzer wählt in der App; nur auf Wunsch und mit eigenem Schlüssel (B-17). Kein Hochladen an fremde Dienste ohne Bestätigung (N-02).

## 3. Bereiche/Seiten

Der Auftrag nennt keine Seitenstruktur. Aus den Bausteinen ableitbar, ohne Gestaltung festzulegen:
- Scannen/Kamera (K-01, K-07)
- Formular-Bearbeitung: Felder erkennen, ausfüllen, Schriftgröße je Feld, eigene Feldarten, Ausgabe (K-01, K-10)
- Übersetzen (K-02)
- Bibliothek (Arbeitsablage) mit Prüfen/Einordnen auf Knopfdruck (K-06)
- Suche „Überall suchen“ (K-08)
- Einstellungen „Tresor & Ablage“ (K-04, K-05, K-11)
- Hilfe „Wo liegt was?“ und Übersichtskarte der Apps (K-12)

## 4. Funktionen

1. **K-01** (B-11, B-12) Briefe mit Tablet/Handy abfotografieren und als ordentliches PDF ablegen; Formularfelder erkennen und am Gerät ausfüllen; Ausgabe als festes oder ausfüllbares PDF. Prüfbar: Foto → PDF; Formular-PDF → Felder erkannt → ausgefüllt → beide Ausgabearten öffnen sich korrekt. Faktor Druck/PDF ×1,1; Vorlage Workflow PDF (80 %).
2. **K-02** (B-13) Fremdsprachige Schreiben übersetzen, im Aufbau des Originals. Prüfbar: übersetztes Dokument behält Aufbau. Faktor Mehrsprachig ×1,2.
3. **K-03** (B-14, B-22) Android-App, dauerhaft signiert; Windows-App, Installer zunächst unsigniert, mit Erklärung der Warnung. Prüfbar: Installation und Update ohne Konto auf beiden Plattformen.
4. **K-04** (B-15, B-21) Verschlüsselte Hauptablage, intern oder im gewählten Ordner; Ersatzschlüssel 3 von 5. Prüfbar: Start ohne Ordnerwahl funktioniert; mit 3 von 5 Ersatzschlüsseln Zugriff wiederherstellbar, mit 2 nicht. Vorlage Datei-Post (60 %).
5. **K-05** (B-30, B-33) Einzug in den gemeinsamen Tresorordner der Pro-Apps; Einstellungen „Tresor & Ablage“; Fächer je App und Übergabefächer mit verschlüsseltem Inhaltsverzeichnis je Fach. Vorlage Datei-Post (60 %).
6. **K-06** (B-31, B-34) Gestreamte Sicherung als Hintergrundaufgabe; nichts startet von selbst; Prüfen und Einordnen nur auf Knopfdruck. „Schlägt vor, der Kunde bestätigt“ gilt für B-31. Prüfbar: großer Bestand sichert ohne Absturz; nach App-Start läuft keine Prüfung/Einordnung ohne Tipp (N-01).
7. **K-07** (B-32) Scanner und Kamera unter Windows; andere Apps können den Scanner direkt starten (Rahmen: Scanner-Direktstart aus BookLedgerPro). Vorlage Workflow PDF (70 %).
8. **K-08** (B-35) „Überall suchen“ über Bibliothek, Ablageort und eigenes Netz. Vorlage Company Brain (40 %).
9. **K-09** (B-36, B-39) Übergabe an Familien-, Mail- und Buchhaltungs-App mit Quittung; Eingang mit Einzelauswahl; nur freiwillig.
10. **K-10** (B-37) Schriftgröße je Feld, eigene Feldarten. Vorlage Workflow PDF (80 %).
11. **K-11** (B-40) Tresor-Schutz beim Einrichten und Speichern: Ordnerwahl ohne Verschachtelung, Rückfrage vor neuer Ablage, Warnung beim Speichern in den Ablageort. Muss den Anlass beheben (falsche Ordner, leere Dateien). Prüfbar: verschachtelter Ordner wird abgewiesen; neue Ablage nur nach Rückfrage; beim Speichern in den Ablageort erscheint eine Warnung; keine leeren Dateien nach Abbruch.
12. **K-12** (B-41) Hilfe „Wo liegt was?“ und Übersichtskarte, wie die Apps zusammenhängen. Vorlage Mein-Rezeptbuch-Page, Workfloh-PDF-Page (50 %).

Ohne eigenen Baustein, trotzdem abzunehmen: B-17, B-18, B-19, B-20, B-21, B-33, B-34, B-39 (siehe 2, 5 und 7).

## 5. Schnittstellen zu anderen Programmen

- Gemeinsamer Ablageort/Tresorordner der Pro-Apps (K-05, B-30, B-33).
- Dateien hin- und hergeben; Übergabe mit Quittung an Familien-App, Mail-App, Buchhaltungs-App des Betriebs (K-09, B-36, B-38, B-39).
- Teilen an Mail und andere Apps (B-26).
- Scanner-Direktstart aus BookLedgerPro und anderen Apps (K-07, B-32).
- Gemeinsame Suche (K-08, B-35).
- KI-Anbieter nach Wahl, mit eigenem Schlüssel (B-17).

## 6. Ausdrücklich nicht

- N-01: Prüfen und Einordnen starten nie von selbst.
- N-02: Kein Hochladen von Dokumenten an fremde Dienste ohne Bestätigung.
- Kein Konto, kein Geräteabgleich, keine Daten außerhalb des Geräts (außer bewusst gewählter Ordner/Speicherkarte), keine automatische Sicherung.

## 7. Abnahme

- Je Funktion in Abschnitt 4 die genannte Prüfung; zusätzlich B-17 (alles läuft im Flugmodus), B-18 (Original nach Bearbeitung bytegleich), B-19 (Funktionsumfang der bestehenden Formular-Web-App vollständig vorhanden), B-20 (Web-App gleicher Stand), B-21, B-33, B-34 (Zurückholen fügt hinzu, überschreibt nie), B-39.
- Bewertung durch Sterne: B-11, B-12, B-13 haben bereits Sterne „bei der Abnahme“ (Ø 4,5 · 4,5 · 4) im Auftrag stehen.
- Rahmen Stunden F4: 193,9–366,1 h (inkl. Anpassung 2–6 h, Abstimmung 15 %, Puffer 20 %). Euro: nicht angegeben (weggelassen).

## 8. Offene Fragen und Widersprüche im Auftrag

1. **NOCH NICHT GESCHÄTZT:** keine Zeile so markiert. Aber K-03, K-06, K-09 und K-11 haben keine Vorlage-Angabe; K-02 hat „Vorlage –“ und trotzdem „80 % wiederverwendet“ – woraus?
2. **Vorlagen unbekannt:** Workflow PDF, Datei-Post, Company Brain, Mein-Rezeptbuch-Page, Workfloh-PDF-Page werden als Grundlage genannt, aber nicht beschrieben. Ohne Zugriff darauf ist 40–80 % Wiederverwendung nicht planbar.
3. **B-19:** „voller Funktionsumfang der bestehenden Formular-Web-App“ – welcher Umfang? Keine Liste.
4. **Netz-Widerspruch:** „Ohne Internet: immer“ und „Abgleich: nein“ gegenüber K-08/B-35 „auf Wunsch im eigenen Netz suchen“ und KI nach Wahl. Ist lokales Netz erlaubt, und wie wird es eingeschaltet?
5. **B-31 / N-01:** „Schlägt vor, der Kunde bestätigt“ bei B-31 – was genau wird vorgeschlagen (Sicherung? Einordnung?) und wie sieht die Bestätigung aus?
6. **Ersatzschlüssel 3 von 5:** Format, Verteilung an wen, Druck/Export? Nicht beschrieben.
7. **Tresorordner (K-05):** Verschlüsselung, Passwort gemeinsam oder je App, Kennzeichnung des Ordners – nicht beschrieben. Ebenso Format der „Quittung“ (K-09).
8. **KI (B-17):** welche Anbieter, wofür (Felderkennung? Übersetzung?) und ob Übersetzung (K-02) offline gehen muss.
9. **Geräte:** Rahmen sagt „Android-Handy“, B-14 „Android-Tablet“; iPhone/iPad nur als Web-App (B-20) – mit welchem Funktionsumfang (Geräteanbindung, Verschlüsselung)?
10. **O-01:** Brauchen die Mitarbeiterinnen eigene Geräte? Klärung durch die Inhaberin bis 2026-10-25 – Datum liegt vor dem Fassungsdatum, Antwort fehlt im Auftrag. Beeinflusst „ein Gerät reicht“.
11. **Anlass:** „falsche Ordner und leere Dateien“ – die konkreten Fälle fehlen; Abnahme von K-11 braucht sie als Prüffälle.
12. **Einordnen:** wonach wird eingeordnet? Kein Kategorienschema genannt.
