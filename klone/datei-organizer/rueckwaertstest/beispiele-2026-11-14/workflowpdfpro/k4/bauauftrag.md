---
art: bauauftrag
format: 1
vorgang: V-2026-0001
fassung: 4
vorher: -
fassungsdatum: 2026-11-04
datum: 2026-11-04
kunde: "⟦KUNDE-1⟧"
verdeckt: ja
stunden: ja
euro: nein
repo: "Workflow-Needs"  # Werkzeug, das den Auftrag erzeugt hat — nicht das Ziel
---

# Bauauftrag · Fassung 4

**Anlass:** Beim Einrichten am Gerät entstanden falsche Ordner und leere Dateien; Nutzer sollen verstehen, wo was liegt  ·  **von:** Befund beim Bau

**Vorhaben:** PDFs scannen, ausfüllen und übersetzen — als App auf Tablet und PC

**Gesamtauftrag:** keine frühere Fassung in diesem Auftrag — alles unter „Zu tun“ ist neu zu bauen. Das Datum der Fassung steht im Kopf (`fassungsdatum`), `datum` ist der Tag der Erzeugung.

## Rahmen
- Geräte: Android-Handy, Windows-PC, im Browser
- Ohne Internet: ja, immer
- Abgleich zwischen Geräten: nein, ein Gerät reicht
- Daten liegen: nur auf dem Gerät, eigener Ordner / Speicherkarte
- Sicherung: verschlüsselt, selbst anstoßen
- Eigene Programme: gemeinsamer Ablageort, Dateien hin- und hergeben, gemeinsame Suche; Scanner-Direktstart aus BookLedgerPro; gemeinsamer Tresorordner der Pro-Apps
- KI: beides — der Nutzer wählt in der App
- Schlägt vor, der Kunde bestätigt: B-31
- Nicht bauen: N-01 Prüfen und Einordnen starten nie von selbst · N-02 Kein Hochladen von Dokumenten an fremde Dienste ohne Bestätigung

## Zu tun (für die Sitzung)
| Aktion | Kennung | Was | Größe | Stunden (Schätzung) | deckt Bedarf |
|---|---|---|---|---|---|
| NEU BAUEN | K-01 | Scannen, Formularfelder erkennen und ausfüllen, Ausgabe fest oder ausfüllbar | groß | 5,3–8,8 | B-11, B-12 |
| NEU BAUEN | K-02 | Übersetzen im Aufbau des Originals | mittel | 5,8–10,6 | B-13 |
| NEU BAUEN | K-03 | Android-App (dauerhaft signiert) und Windows-App (Installer zunächst unsigniert) | groß | 50–100 | B-14 |
| NEU BAUEN | K-04 | Verschlüsselte Hauptablage (intern oder im gewählten Ordner), Ersatzschlüssel 3 von 5 | mittel | 6,4–11,2 | B-15 |
| NEU BAUEN | K-05 | Einzug in den gemeinsamen Tresorordner, Einstellungen „Tresor & Ablage“ | mittel | 6,4–11,2 | B-30 |
| NEU BAUEN | K-06 | Gestreamte Sicherung, Hintergrundaufgabe, nichts startet von selbst | mittel | 24–44 | B-31 |
| NEU BAUEN | K-07 | Scanner und Kamera unter Windows, Direktstart aus anderen Apps | mittel | 3,6–6 | B-32 |
| NEU BAUEN | K-08 | „Überall suchen“ über Bibliothek, Ablageort und eigenes Netz | mittel | 12–20,4 | B-35 |
| NEU BAUEN | K-09 | Übergabe an die anderen Apps mit Quittung | mittel | 14–26 | B-36 |
| NEU BAUEN | K-10 | Schriftgröße je Feld, eigene Feldarten | klein | 1,2–2 | B-37 |
| NEU BAUEN | K-11 | Tresor-Schutz beim Einrichten und Speichern | klein | 10–20 | B-40 |
| NEU BAUEN | K-12 | Hilfe „Wo liegt was?“ und Übersichtskarte der Apps | klein | 3–5 | B-41 |

### Je Baustein: Vorlage und Abnahme
- K-01 · Vorlage Workflow PDF (80 % wiederverwendet) · Faktoren Druck / PDF ×1,1
- K-02 · Vorlage – (80 % wiederverwendet) · Faktoren Mehrsprachig ×1,2
- K-04 · Vorlage Datei-Post (60 % wiederverwendet)
- K-05 · Vorlage Datei-Post (60 % wiederverwendet)
- K-07 · Vorlage Workflow PDF (70 % wiederverwendet)
- K-08 · Vorlage Company Brain (40 % wiederverwendet)
- K-10 · Vorlage Workflow PDF (80 % wiederverwendet)
- K-12 · Vorlage Mein-Rezeptbuch-Page, Workfloh-PDF-Page (50 % wiederverwendet)
- ohne Baustein (trotzdem abnehmen):
  - B-17: Das System muss ohne Internet arbeiten; KI nur auf Wunsch und mit eigenem Schlüssel
  - B-18: Das System muss Originale unverändert aufbewahren
  - B-19: Das System muss den vollen Funktionsumfang der bestehenden Formular-Web-App übernehmen und um Geräteanbindung und verschlüsselte Ablage ergänzen
  - B-20: Das System muss die Web-App weiterführen (für iPhone und iPad) und auf demselben Stand halten wie die Apps
  - B-21: Das System muss ohne Ordnerwahl mit einer internen Arbeitsablage starten; ein eigener Ordner ist freiwillig
  - B-33: Das System muss im gemeinsamen Ablageort Fächer je App und Übergabefächer führen, mit verschlüsseltem Inhaltsverzeichnis je Fach
  - B-34: Das System muss die Bibliothek als verschlüsselte Sicherungsdatei sichern; Zurückholen fügt hinzu und überschreibt nie
  - B-39: Das System muss mit der Familien-, Mail- und Buchhaltungs-App nur freiwillig zusammenarbeiten: Eingang mit Einzelauswahl, Übergabe mit Quittung
  - B-42: Das System muss eine Bibliothek mit Ordnern haben, in der Dokumente abgelegt, verschoben, als Vorlage dupliziert und gelöscht werden
  - B-43: Das System muss einen Formular-Editor haben, in dem Felder gesetzt, verschoben, vergrößert und auf der Seite ausgefüllt werden
  - B-44: Das System muss PDF und Bilder einlesen, auch ganze Ordner, per Ziehen auf die Seite oder als angehängte Seiten
  - B-45: Das System muss Fotos in PDF wandeln: Blatt finden, Ecken mit Lupe korrigieren, entzerren, auf A4 oder US Letter gerade ziehen
  - B-46: Das System muss vorhandene Formularfelder samt Wert übernehmen und neue Felder ohne Netz aus Linien, Rahmen und Kästchen erkennen
  - B-47: Das System muss als festes PDF, als ausfüllbares PDF und als leere Vorlage ausgeben sowie ansehen und drucken
  - B-48: Das System muss PDFs zwischen Deutsch, Russisch und Englisch übersetzen, Seite für Seite in der Lage des Originals
  - B-49: Das System muss die Hauptablage als verschlüsselten Tresor in einem selbst gewählten Ordner führen (Gerätespeicher, SD-Karte, anderer Datenträger)
  - B-50: Das System muss Tresor und Sicherungen mit Passwort verschlüsseln (PBKDF2-SHA256 mit 600 000 Runden, AES-256-GCM); das Passwort bleibt nur im Arbeitsspeicher

## Bedarfsprotokoll – Änderungen
- NEU B-01 [Bereich 1]: „Papier“
- NEU B-02 [Bereich 1]: „Drucken, von Hand ausfüllen, wieder einscannen“
- NEU B-03 [Bereich 1]: „eine Web-App im Browser, deren Daten beim Löschen des Browsers weg wären“
- NEU B-04 [Bereich 2]: „Dokumente“
- NEU B-05 [Bereich 2]: „Kundenkontakt“
- NEU B-06 [Bereich 3]: „Inhaberin“
- NEU B-07 [Bereich 3]: „Mitarbeiterinnen“
- NEU B-08 [Bereich 4]: „Zeitverlust“
- NEU B-09 [Bereich 4]: „Formulare kommen schief und unleserlich zurück“
- NEU B-10 [Bereich 5]: „Kein Werkzeug, das Formularfelder erkennt und ohne Konto läuft“
- NEU B-11 [Bereich 6]: „Briefe mit Tablet oder Handy abfotografieren und als ordentliches PDF ablegen“ (Muss, Nutzen: 4 h/Monat)
- NEU B-12 [Bereich 6]: „Formularfelder erkennen und am Gerät ausfüllen, als festes oder ausfüllbares PDF ausgeben“ (Muss, Nutzen: 5 h/Monat)
- NEU B-13 [Bereich 6]: „Fremdsprachige Schreiben übersetzen, im Aufbau des Originals“ (Soll, Nutzen: 2 h/Monat)
- NEU B-14 [Bereich 6]: „Als echte App auf Android-Tablet und Windows-PC, ohne Konto“ (Muss)
- NEU B-15 [Bereich 6]: „Ablage verschlüsselt, auf Wunsch in einem selbst gewählten Ordner, Ersatzschlüssel bei vergessenem Passwort“ (Muss)
- NEU B-30 [Bereich 6]: „Ein gemeinsamer verschlüsselter Ablageort für alle Apps des Büros“ (Soll)
- NEU B-31 [Bereich 6]: „Sicherung, die auch bei großen Beständen nicht abstürzt; Prüfen und Einordnen nur auf Knopfdruck“ (Muss)
- NEU B-32 [Bereich 6]: „Scanner und Kamera auch am Windows-PC; andere Apps können den Scanner direkt starten“ (Soll, Nutzen: 1 h/Monat)
- NEU B-35 [Bereich 6]: „In allen Apps gleichzeitig suchen, auf Wunsch auch im eigenen Netz“ (Kann, Nutzen: 1 h/Monat)
- NEU B-36 [Bereich 6]: „Dokumente an die Familien-, Mail- und Buchhaltungs-App übergeben, mit Quittung“ (Soll)
- NEU B-37 [Bereich 6]: „Schriftgröße je Feld, eigene Feldarten“ (Kann)
- NEU B-40 [Bereich 6]: „Ordnerwahl ohne Verschachtelung, Rückfrage vor neuer Ablage, Warnung beim Speichern in den Ablageort“ (Muss)
- NEU B-41 [Bereich 6]: „Eine Übersicht, wie die Apps zusammenhängen, und „Wo liegt was?““ (Kann)
- NEU B-16 [Bereich 7]: „Ein Formular ist in Minuten ausgefüllt und verschickt, ohne Drucker“
- NEU B-17 [Bereich 8]: „Das System muss ohne Internet arbeiten; KI nur auf Wunsch und mit eigenem Schlüssel“
- NEU B-18 [Bereich 8]: „Das System muss Originale unverändert aufbewahren“
- NEU B-19 [Bereich 8]: „Das System muss den vollen Funktionsumfang der bestehenden Formular-Web-App übernehmen und um Geräteanbindung und verschlüsselte Ablage ergänzen“
- NEU B-20 [Bereich 8]: „Das System muss die Web-App weiterführen (für iPhone und iPad) und auf demselben Stand halten wie die Apps“
- NEU B-21 [Bereich 8]: „Das System muss ohne Ordnerwahl mit einer internen Arbeitsablage starten; ein eigener Ordner ist freiwillig“
- NEU B-33 [Bereich 8]: „Das System muss im gemeinsamen Ablageort Fächer je App und Übergabefächer führen, mit verschlüsseltem Inhaltsverzeichnis je Fach“
- NEU B-34 [Bereich 8]: „Das System muss die Bibliothek als verschlüsselte Sicherungsdatei sichern; Zurückholen fügt hinzu und überschreibt nie“
- NEU B-39 [Bereich 8]: „Das System muss mit der Familien-, Mail- und Buchhaltungs-App nur freiwillig zusammenarbeiten: Eingang mit Einzelauswahl, Übergabe mit Quittung“
- NEU B-42 [Bereich 8]: „Das System muss eine Bibliothek mit Ordnern haben, in der Dokumente abgelegt, verschoben, als Vorlage dupliziert und gelöscht werden“
- NEU B-43 [Bereich 8]: „Das System muss einen Formular-Editor haben, in dem Felder gesetzt, verschoben, vergrößert und auf der Seite ausgefüllt werden“
- NEU B-44 [Bereich 8]: „Das System muss PDF und Bilder einlesen, auch ganze Ordner, per Ziehen auf die Seite oder als angehängte Seiten“
- NEU B-45 [Bereich 8]: „Das System muss Fotos in PDF wandeln: Blatt finden, Ecken mit Lupe korrigieren, entzerren, auf A4 oder US Letter gerade ziehen“
- NEU B-46 [Bereich 8]: „Das System muss vorhandene Formularfelder samt Wert übernehmen und neue Felder ohne Netz aus Linien, Rahmen und Kästchen erkennen“
- NEU B-47 [Bereich 8]: „Das System muss als festes PDF, als ausfüllbares PDF und als leere Vorlage ausgeben sowie ansehen und drucken“
- NEU B-48 [Bereich 8]: „Das System muss PDFs zwischen Deutsch, Russisch und Englisch übersetzen, Seite für Seite in der Lage des Originals“
- NEU B-49 [Bereich 8]: „Das System muss die Hauptablage als verschlüsselten Tresor in einem selbst gewählten Ordner führen (Gerätespeicher, SD-Karte, anderer Datenträger)“
- NEU B-50 [Bereich 8]: „Das System muss Tresor und Sicherungen mit Passwort verschlüsseln (PBKDF2-SHA256 mit 600 000 Runden, AES-256-GCM); das Passwort bleibt nur im Arbeitsspeicher“
- NEU B-23 [Bereich 10]: „Geräte“
- NEU B-24 [Bereich 10]: „offline“
- NEU B-25 [Bereich 11]: „Web-App im Browser“
- NEU B-26 [Bereich 12]: „Teilen an Mail und andere Apps“
- NEU B-38 [Bereich 12]: „Familien-App, Mail-App, Buchhaltungs-App des Betriebs“
- NEU B-27 [Bereich 13]: „Briefe, Formulare, Fotos, ausgefüllte PDFs“
- NEU B-28 [Bereich 14]: „personenbezogene Daten: ja“
- NEU B-22 [Bereich 15]: „Windows-Installer zunächst unsigniert (Warnung beim Installieren wird erklärt)“
- NEU B-29 [Bereich 15]: „Vorgaben“

## Offene Punkte
- keine

## Summe
Stunden F4 193,9–366,1 · Kosten-Nutzen: Grenzlinie keine

Die Summe enthält zusätzlich zu den Zeilen: Anpassung an den Betrieb 2–6 h, Abstimmung 15 % (21,5–40,7 h), Puffer 20 % (28,7–54,2 h).

## Erklärungen und Sterne
- Verschwiegenheitserklärung aktiviert: nein · Vereinbarung Zahlung/Rechte aktiviert: nein · Wartungsvertrag aktiviert: nein
- Sterne B-11: beim Bedarf Ø 4,5 (2) · bei der Abnahme Ø 4,5 (2)
- Sterne B-12: beim Bedarf Ø 5 (2) · bei der Abnahme Ø 4,5 (2)
- Sterne B-13: beim Bedarf Ø 3 (1) · bei der Abnahme Ø 4 (1)

## Vollständiger Stand (zum Einlesen)
```json
{"bedarf":[{"id":"B-01","nr":1,"text":"Papier","sichtbar":true},{"id":"B-02","nr":1,"text":"Drucken, von Hand ausfüllen, wieder einscannen","sichtbar":true},{"id":"B-03","nr":1,"text":"eine Web-App im Browser, deren Daten beim Löschen des Browsers weg wären","sichtbar":true},{"id":"B-04","nr":2,"text":"Dokumente","sichtbar":true},{"id":"B-05","nr":2,"text":"Kundenkontakt","sichtbar":true},{"id":"B-06","nr":3,"text":"Inhaberin","sichtbar":true,"anzahl":1},{"id":"B-07","nr":3,"text":"Mitarbeiterinnen","sichtbar":true,"anzahl":2},{"id":"B-08","nr":4,"text":"Zeitverlust","sichtbar":true},{"id":"B-09","nr":4,"text":"Formulare kommen schief und unleserlich zurück","sichtbar":true},{"id":"B-10","nr":5,"text":"Kein Werkzeug, das Formularfelder erkennt und ohne Konto läuft","sichtbar":true},{"id":"B-11","nr":6,"text":"Briefe mit Tablet oder Handy abfotografieren und als ordentliches PDF ablegen","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":4,"text":""}},{"id":"B-12","nr":6,"text":"Formularfelder erkennen und am Gerät ausfüllen, als festes oder ausfüllbares PDF ausgeben","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":5,"text":""}},{"id":"B-13","nr":6,"text":"Fremdsprachige Schreiben übersetzen, im Aufbau des Originals","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":2,"text":""}},{"id":"B-14","nr":6,"text":"Als echte App auf Android-Tablet und Windows-PC, ohne Konto","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-15","nr":6,"text":"Ablage verschlüsselt, auf Wunsch in einem selbst gewählten Ordner, Ersatzschlüssel bei vergessenem Passwort","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-30","nr":6,"text":"Ein gemeinsamer verschlüsselter Ablageort für alle Apps des Büros","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-31","nr":6,"text":"Sicherung, die auch bei großen Beständen nicht abstürzt; Prüfen und Einordnen nur auf Knopfdruck","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":""},"handeln":"vorschlagen"},{"id":"B-32","nr":6,"text":"Scanner und Kamera auch am Windows-PC; andere Apps können den Scanner direkt starten","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":1,"text":""}},{"id":"B-35","nr":6,"text":"In allen Apps gleichzeitig suchen, auf Wunsch auch im eigenen Netz","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":1,"text":""}},{"id":"B-36","nr":6,"text":"Dokumente an die Familien-, Mail- und Buchhaltungs-App übergeben, mit Quittung","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-37","nr":6,"text":"Schriftgröße je Feld, eigene Feldarten","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-40","nr":6,"text":"Ordnerwahl ohne Verschachtelung, Rückfrage vor neuer Ablage, Warnung beim Speichern in den Ablageort","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-41","nr":6,"text":"Eine Übersicht, wie die Apps zusammenhängen, und „Wo liegt was?“","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-16","nr":7,"text":"Ein Formular ist in Minuten ausgefüllt und verschickt, ohne Drucker","sichtbar":true},{"id":"B-17","nr":8,"text":"Das System muss ohne Internet arbeiten; KI nur auf Wunsch und mit eigenem Schlüssel","sichtbar":true},{"id":"B-18","nr":8,"text":"Das System muss Originale unverändert aufbewahren","sichtbar":true},{"id":"B-19","nr":8,"text":"Das System muss den vollen Funktionsumfang der bestehenden Formular-Web-App übernehmen und um Geräteanbindung und verschlüsselte Ablage ergänzen","sichtbar":true},{"id":"B-20","nr":8,"text":"Das System muss die Web-App weiterführen (für iPhone und iPad) und auf demselben Stand halten wie die Apps","sichtbar":true},{"id":"B-21","nr":8,"text":"Das System muss ohne Ordnerwahl mit einer internen Arbeitsablage starten; ein eigener Ordner ist freiwillig","sichtbar":true},{"id":"B-33","nr":8,"text":"Das System muss im gemeinsamen Ablageort Fächer je App und Übergabefächer führen, mit verschlüsseltem Inhaltsverzeichnis je Fach","sichtbar":true},{"id":"B-34","nr":8,"text":"Das System muss die Bibliothek als verschlüsselte Sicherungsdatei sichern; Zurückholen fügt hinzu und überschreibt nie","sichtbar":true},{"id":"B-39","nr":8,"text":"Das System muss mit der Familien-, Mail- und Buchhaltungs-App nur freiwillig zusammenarbeiten: Eingang mit Einzelauswahl, Übergabe mit Quittung","sichtbar":true},{"id":"B-42","nr":8,"text":"Das System muss eine Bibliothek mit Ordnern haben, in der Dokumente abgelegt, verschoben, als Vorlage dupliziert und gelöscht werden","sichtbar":true},{"id":"B-43","nr":8,"text":"Das System muss einen Formular-Editor haben, in dem Felder gesetzt, verschoben, vergrößert und auf der Seite ausgefüllt werden","sichtbar":true},{"id":"B-44","nr":8,"text":"Das System muss PDF und Bilder einlesen, auch ganze Ordner, per Ziehen auf die Seite oder als angehängte Seiten","sichtbar":true},{"id":"B-45","nr":8,"text":"Das System muss Fotos in PDF wandeln: Blatt finden, Ecken mit Lupe korrigieren, entzerren, auf A4 oder US Letter gerade ziehen","sichtbar":true},{"id":"B-46","nr":8,"text":"Das System muss vorhandene Formularfelder samt Wert übernehmen und neue Felder ohne Netz aus Linien, Rahmen und Kästchen erkennen","sichtbar":true},{"id":"B-47","nr":8,"text":"Das System muss als festes PDF, als ausfüllbares PDF und als leere Vorlage ausgeben sowie ansehen und drucken","sichtbar":true},{"id":"B-48","nr":8,"text":"Das System muss PDFs zwischen Deutsch, Russisch und Englisch übersetzen, Seite für Seite in der Lage des Originals","sichtbar":true},{"id":"B-49","nr":8,"text":"Das System muss die Hauptablage als verschlüsselten Tresor in einem selbst gewählten Ordner führen (Gerätespeicher, SD-Karte, anderer Datenträger)","sichtbar":true},{"id":"B-50","nr":8,"text":"Das System muss Tresor und Sicherungen mit Passwort verschlüsseln (PBKDF2-SHA256 mit 600 000 Runden, AES-256-GCM); das Passwort bleibt nur im Arbeitsspeicher","sichtbar":true},{"id":"B-23","nr":10,"text":"Geräte","sichtbar":true},{"id":"B-24","nr":10,"text":"offline","sichtbar":true},{"id":"B-25","nr":11,"text":"Web-App im Browser","sichtbar":true},{"id":"B-26","nr":12,"text":"Teilen an Mail und andere Apps","sichtbar":true},{"id":"B-38","nr":12,"text":"Familien-App, Mail-App, Buchhaltungs-App des Betriebs","sichtbar":true},{"id":"B-27","nr":13,"text":"Briefe, Formulare, Fotos, ausgefüllte PDFs","sichtbar":true},{"id":"B-28","nr":14,"text":"personenbezogene Daten: ja","sichtbar":true},{"id":"B-22","nr":15,"text":"Windows-Installer zunächst unsigniert (Warnung beim Installieren wird erklärt)","sichtbar":true},{"id":"B-29","nr":15,"text":"Vorgaben","sichtbar":true}],"bausteine":[{"id":"K-01","katalog":"scan","name":"Scannen, Formularfelder erkennen und ausfüllen, Ausgabe fest oder ausfüllbar","menge":1,"groesse":"gross","faktoren":["druck"],"deckt":["B-11","B-12"],"ermaessigt":false},{"id":"K-02","katalog":"neu","name":"Übersetzen im Aufbau des Originals","menge":1,"groesse":"mittel","faktoren":["sprachen"],"deckt":["B-13"],"ermaessigt":false},{"id":"K-03","katalog":"neu","name":"Android-App (dauerhaft signiert) und Windows-App (Installer zunächst unsigniert)","menge":1,"groesse":"gross","faktoren":[],"deckt":["B-14"],"ermaessigt":false},{"id":"K-04","katalog":"datei","name":"Verschlüsselte Hauptablage (intern oder im gewählten Ordner), Ersatzschlüssel 3 von 5","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-15"],"ermaessigt":false},{"id":"K-05","katalog":"datei","name":"Einzug in den gemeinsamen Tresorordner, Einstellungen „Tresor & Ablage“","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-30"],"ermaessigt":false},{"id":"K-06","katalog":"neu","name":"Gestreamte Sicherung, Hintergrundaufgabe, nichts startet von selbst","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-31"],"ermaessigt":false},{"id":"K-07","katalog":"scan","name":"Scanner und Kamera unter Windows, Direktstart aus anderen Apps","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-32"],"ermaessigt":false},{"id":"K-08","katalog":"suche","name":"„Überall suchen“ über Bibliothek, Ablageort und eigenes Netz","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-35"],"ermaessigt":false},{"id":"K-09","katalog":"schnitt","name":"Übergabe an die anderen Apps mit Quittung","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-36"],"ermaessigt":false},{"id":"K-10","katalog":"scan","name":"Schriftgröße je Feld, eigene Feldarten","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-37"],"ermaessigt":false},{"id":"K-11","katalog":"neu","name":"Tresor-Schutz beim Einrichten und Speichern","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-40"],"ermaessigt":false},{"id":"K-12","katalog":"seite","name":"Hilfe „Wo liegt was?“ und Übersichtskarte der Apps","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-41"],"ermaessigt":false}],"rahmen":{"eigeneText":"Scanner-Direktstart aus BookLedgerPro; gemeinsamer Tresorordner der Pro-Apps","geraete":["android","windows","browser"],"offline":"immer","abgleich":"eins","eigene":["ablageort","hinher","suche"],"datenort":["geraet","ordner"],"sicherung":["verschluesselt","selbst"],"ki":"wahl"},"nicht":[{"id":"N-01","text":"Prüfen und Einordnen starten nie von selbst","sichtbar":true},{"id":"N-02","text":"Kein Hochladen von Dokumenten an fremde Dienste ohne Bestätigung","sichtbar":true}]}
```
