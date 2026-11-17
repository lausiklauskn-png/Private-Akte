---
art: bauauftrag
format: 1
vorgang: V-2026-0001
fassung: 4
vorher: -
fassungsdatum: 2026-11-09
datum: 2026-11-09
kunde: "⟦KUNDE-1⟧"
verdeckt: ja
stunden: ja
euro: nein
repo: "Workflow-Needs"  # Werkzeug, das den Auftrag erzeugt hat — nicht das Ziel
---

# Bauauftrag · Fassung 4

**Anlass:** Die App wirkte wie ein Haushaltsbuch: auf einen Blick Kasse, Umsatzsteuer, Rücklage; Belege ohne Tipparbeit und ohne Datenweitergabe vorkontieren  ·  **von:** Kunde

**Vorhaben:** Buchhaltung für einen kleinen Betrieb, offline und verschlüsselt

**Gesamtauftrag:** keine frühere Fassung in diesem Auftrag — alles unter „Zu tun“ ist neu zu bauen. Das Datum der Fassung steht im Kopf (`fassungsdatum`), `datum` ist der Tag der Erzeugung.

## Rahmen
- Geräte: Android-Handy, Windows-PC, im Browser
- Ohne Internet: ja, immer
- Abgleich zwischen Geräten: ja, Abgleich ab und zu reicht
- Daten liegen: nur auf dem Gerät, eigener Ordner / Speicherkarte
- Sicherung: verschlüsselt, an einen zweiten Ort, von allein
- Eigene Programme: gemeinsamer Ablageort, Dateien hin- und hergeben, gemeinsame Suche; Belege aus Workflow PDF Pro und Mails aus Private Brain Pro; Angebote aus Workflow Calculate und Needs
- KI: beides — der Nutzer wählt in der App
- Schlägt vor, der Kunde bestätigt: B-11, B-12, B-13, B-14, B-39, B-40, B-44, B-45
- Darf selbst handeln: B-16, B-38
- Nicht bauen: N-01 Keine Registrierkasse mit TSE · N-02 Kein Bargeld in einer Kasse verwalten · N-03 Keine Buchung ohne Bestätigung

## Zu tun (für die Sitzung)
| Aktion | Kennung | Was | Größe | Stunden (Schätzung) | deckt Bedarf |
|---|---|---|---|---|---|
| NEU BAUEN | K-01 | Buchhaltungs-Kern: Konten, doppelte Buchführung, Festschreibung mit Storno | groß | 34,5–62,1 | B-11, B-12 |
| NEU BAUEN | K-02 | Belege einlesen mit Erkennung und Buchungsvorschlag | mittel | 3,6–6 | B-13 |
| NEU BAUEN | K-03 | Kunden, Aufträge, Rechnungen mit Buchung | mittel | 12–20 | B-14 |
| NEU BAUEN | K-04 | USt-Voranmeldung, EÜR, Export an den Steuerberater | mittel | 14,4–24 | B-15, B-27 |
| NEU BAUEN | K-05 | Verschlüsselter Tresor, Pflicht-Sicherung, Ersatzschlüssel | mittel | 6,4–11,2 | B-16 |
| NEU BAUEN | K-06 | Übernahme aus Auftrags-App, Angebotsplaner und Shop-Warenwirtschaft | mittel | 14–26 | B-33 |
| NEU BAUEN | K-07 | EU-Texterkennung und Kontierungshilfe mit Prüfung vor der KI | mittel | 3,8–6 | B-34 |
| NEU BAUEN | K-08 | Android- und Windows-App mit Updates vom eigenen Server | groß | 50–100 | B-37 |
| NEU BAUEN | K-09 | Gemeinsamer Tresorordner mit den anderen Apps, automatische Sicherung | mittel | 6,4–11,2 | B-38 |
| NEU BAUEN | K-10 | Scanner und Mail-Teilen mit Rechnungspositionen | mittel | 3,6–6 | B-39 |
| NEU BAUEN | K-11 | Suche über Belege nach Wörtern und Bedeutung | mittel | 12–20,4 | B-40 |
| NEU BAUEN | K-12 | Kasse & Shop: Tagesabschluss, Quittungsvorlage, Rückfrage bei hoher Einnahme | mittel | 14,4–24 | B-42 |
| NEU BAUEN | K-13 | Startseite mit Umsatzsteuer, Rücklage, Kassenstand; mehrere Buchhaltungen | mittel | 24–44 | B-43, B-44 |
| NEU BAUEN | K-14 | Trainierte Belegerkennung auf dem Gerät | mittel | 9,6–17,6 | B-45 |

### Je Baustein: Vorlage und Abnahme
- K-01 · Vorlage BookLedgerPro (40 % wiederverwendet) · Faktoren Offline ×1,15
- K-02 · Vorlage Workflow PDF (70 % wiederverwendet)
- K-03 · Vorlage Mein WorkFloh (50 % wiederverwendet)
- K-04 · Vorlage BookLedgerPro (40 % wiederverwendet)
- K-05 · Vorlage Datei-Post (60 % wiederverwendet)
- K-07 · Vorlage Sende-Prüfer (70 % wiederverwendet) · Faktoren KI ×1,25
- K-09 · Vorlage Datei-Post (60 % wiederverwendet)
- K-10 · Vorlage Workflow PDF (70 % wiederverwendet)
- K-11 · Vorlage Company Brain (40 % wiederverwendet)
- K-12 · Vorlage BookLedgerPro (40 % wiederverwendet)
- K-14 · Vorlage – (60 % wiederverwendet)
- ohne Baustein (trotzdem abnehmen):
  - B-18: Das System muss ohne Internet und ohne Konto beim Anbieter laufen
  - B-19: Das System muss jede Buchung mit Beleg und Zeitstempel unveränderbar festhalten
  - B-20: Das System muss doppelt buchen (Soll/Haben, Kontenrahmen SKR03) und die Umsatzsteuer automatisch aufteilen
  - B-21: Das System muss festgeschriebene Buchungen nie löschen, nur stornieren, und die Unveränderbarkeit mit einer Hash-Kette sichern (GoBD)
  - B-22: Das System muss die Daten als DATEV-orientierte CSV für den Steuerberater ausgeben
  - B-46: Das System muss Kontoauszüge als Text einlesen und mit den Buchungen abgleichen (Saldo-Gegenrechnung), zunächst hinter einem Vorschau-Schalter
  - B-47: Das System muss vier Nutzungsmodi kennen: Privat, Kleinunternehmer, Selbstständig, Berater
  - B-48: Das System muss den Tagesabschluss der offenen Ladenkasse aus dem gezählten Bestand mit Foto erstellen und festschreiben

## Bedarfsprotokoll – Änderungen
- NEU B-01 [Bereich 1]: „Papier“
- NEU B-02 [Bereich 1]: „Excel“
- NEU B-03 [Bereich 1]: „Quittungen im Schuhkarton, Monatsende beim Steuerberater“
- NEU B-04 [Bereich 2]: „Buchhaltung“
- NEU B-05 [Bereich 2]: „Auftrag“
- NEU B-06 [Bereich 3]: „Inhaberin“
- NEU B-07 [Bereich 3]: „Steuerberater“
- NEU B-08 [Bereich 4]: „doppelte Eingabe“
- NEU B-09 [Bereich 4]: „fehlende Übersicht über Umsatzsteuer und Kasse“
- NEU B-10 [Bereich 5]: „Cloud-Buchhaltungen kosten monatlich und die Daten liegen beim Anbieter“
- NEU B-11 [Bereich 6]: „Einnahmen und Ausgaben richtig buchen, mit Konten, wie das Finanzamt es verlangt“ (Muss, Nutzen: 6 h/Monat, weniger Zeit beim Steuerberater)
- NEU B-12 [Bereich 6]: „Gebuchtes nicht mehr still änderbar: Korrektur nur als Gegenbuchung“ (Muss)
- NEU B-13 [Bereich 6]: „Belege einlesen und einen Buchungsvorschlag bekommen“ (Muss, Nutzen: 4 h/Monat)
- NEU B-14 [Bereich 6]: „Kunden, Aufträge und Rechnungen, die gleich gebucht werden“ (Soll, Nutzen: 3 h/Monat)
- NEU B-15 [Bereich 6]: „Umsatzsteuer-Voranmeldung und EÜR auf Knopfdruck, Export für den Steuerberater“ (Muss, Nutzen: 3 h/Monat)
- NEU B-16 [Bereich 6]: „Alles mit Passwort verschlüsselt, Sicherung, Ersatzschlüssel bei vergessenem Passwort“ (Muss, Nutzen: Daten bleiben im Betrieb)
- NEU B-33 [Bereich 6]: „Aufträge und Angebote aus der Auftrags-App und dem Angebotsplaner übernehmen“ (Soll, Nutzen: 2 h/Monat)
- NEU B-34 [Bereich 6]: „Texterkennung und Kontierungshilfe nur über EU-Anbieter, mit eigenem Schlüssel und nach Bestätigung“ (Kann, Nutzen: 2 h/Monat)
- NEU B-37 [Bereich 6]: „Als App auf dem Android-Tablet und unter Windows, Updates ohne App-Laden“ (Muss)
- NEU B-38 [Bereich 6]: „Gemeinsamer verschlüsselter Ablageort mit den anderen Apps, automatische Sicherung“ (Soll)
- NEU B-39 [Bereich 6]: „Belege scannen und Rechnungsmails teilen, Positionen werden gelesen“ (Soll, Nutzen: 2 h/Monat)
- NEU B-40 [Bereich 6]: „Belege nach Wörtern und nach Bedeutung durchsuchen“ (Kann, Nutzen: 1 h/Monat)
- NEU B-42 [Bereich 6]: „Offene Ladenkasse mit Tagesabschluss und Quittungsvorlage“ (Muss, Nutzen: 2 h/Monat)
- NEU B-43 [Bereich 6]: „Startseite mit fälliger Umsatzsteuer, Steuer-Rücklage und Kassenstand“ (Soll)
- NEU B-44 [Bereich 6]: „Mehrere Buchhaltungen (Laden, zweiter Laden, Haushalt) auf einem Gerät“ (Soll)
- NEU B-45 [Bereich 6]: „Belegerkennung ohne KI: Konto, Datum, Steuersatz, Rechnungsnummer“ (Soll, Nutzen: 3 h/Monat, kein Abtippen)
- NEU B-17 [Bereich 7]: „Am Monatsende ist alles gebucht, die Umsatzsteuer ist bekannt, der Steuerberater bekommt eine Datei“
- NEU B-18 [Bereich 8]: „Das System muss ohne Internet und ohne Konto beim Anbieter laufen“
- NEU B-19 [Bereich 8]: „Das System muss jede Buchung mit Beleg und Zeitstempel unveränderbar festhalten“
- NEU B-20 [Bereich 8]: „Das System muss doppelt buchen (Soll/Haben, Kontenrahmen SKR03) und die Umsatzsteuer automatisch aufteilen“
- NEU B-21 [Bereich 8]: „Das System muss festgeschriebene Buchungen nie löschen, nur stornieren, und die Unveränderbarkeit mit einer Hash-Kette sichern (GoBD)“
- NEU B-22 [Bereich 8]: „Das System muss die Daten als DATEV-orientierte CSV für den Steuerberater ausgeben“
- NEU B-46 [Bereich 8]: „Das System muss Kontoauszüge als Text einlesen und mit den Buchungen abgleichen (Saldo-Gegenrechnung), zunächst hinter einem Vorschau-Schalter“
- NEU B-47 [Bereich 8]: „Das System muss vier Nutzungsmodi kennen: Privat, Kleinunternehmer, Selbstständig, Berater“
- NEU B-48 [Bereich 8]: „Das System muss den Tagesabschluss der offenen Ladenkasse aus dem gezählten Bestand mit Foto erstellen und festschreiben“
- NEU B-23 [Bereich 9]: „Abläufe ändern: Belege sofort erfassen statt am Monatsende“
- NEU B-24 [Bereich 10]: „offline“
- NEU B-25 [Bereich 10]: „Geräte“
- NEU B-41 [Bereich 10]: „Android-Tablet, Windows-PC, SD-Karte“
- NEU B-26 [Bereich 11]: „Excel-Tabelle, Kassenbuch auf Papier“
- NEU B-27 [Bereich 12]: „Export an den Steuerberater (DATEV-orientiert)“
- NEU B-35 [Bereich 12]: „Auftrags-App, Angebotsplaner, Warenwirtschaft des Ladens“
- NEU B-28 [Bereich 13]: „Belege (Fotos, PDF), Buchungen, Konten, Kunden, Rechnungen“
- NEU B-29 [Bereich 14]: „personenbezogene Daten: ja“
- NEU B-30 [Bereich 14]: „Aufbewahrungsfristen nach GoBD“
- NEU B-36 [Bereich 14]: „Vor jeder KI werden Namen verdeckt“
- NEU B-31 [Bereich 15]: „Vorgaben“
- NEU B-32 [Bereich 15]: „kein Abo“
- NEU O-01 [Bereich 18]: „Welcher Kontenrahmen gilt beim Steuerberater?“
- NEU O-02 [Bereich 18]: „Kontoauszug-Einlesen ab Werk einschalten — erst nach weiterer Messung“

## Offene Punkte
- O-01: Welcher Kontenrahmen gilt beim Steuerberater? (klärt Inhaberin bis 2026-06-15)
- O-02: Kontoauszug-Einlesen ab Werk einschalten — erst nach weiterer Messung (klärt Inhaberin)

## Summe
Stunden F4 284,4–519,1 · Kosten-Nutzen: Grenzlinie keine

Die Summe enthält zusätzlich zu den Zeilen: Anpassung an den Betrieb 2–6 h, Abstimmung 15 % (31,6–57,7 h), Puffer 20 % (42,1–76,9 h).

## Erklärungen und Sterne
- Verschwiegenheitserklärung aktiviert: nein · Vereinbarung Zahlung/Rechte aktiviert: nein · Wartungsvertrag aktiviert: nein
- Sterne B-11: beim Bedarf Ø 5 (2) · bei der Abnahme Ø 4,5 (2)
- Sterne B-13: beim Bedarf Ø 5 (1) · bei der Abnahme Ø 4 (1)
- Sterne B-15: beim Bedarf Ø 4 (1) · bei der Abnahme Ø 5 (1)
- Sterne B-16: beim Bedarf Ø 4 (1) · bei der Abnahme Ø 4 (1)

## Vollständiger Stand (zum Einlesen)
```json
{"bedarf":[{"id":"B-01","nr":1,"text":"Papier","sichtbar":true},{"id":"B-02","nr":1,"text":"Excel","sichtbar":true},{"id":"B-03","nr":1,"text":"Quittungen im Schuhkarton, Monatsende beim Steuerberater","sichtbar":true},{"id":"B-04","nr":2,"text":"Buchhaltung","sichtbar":true},{"id":"B-05","nr":2,"text":"Auftrag","sichtbar":true},{"id":"B-06","nr":3,"text":"Inhaberin","sichtbar":true,"anzahl":1},{"id":"B-07","nr":3,"text":"Steuerberater","sichtbar":true,"anzahl":1},{"id":"B-08","nr":4,"text":"doppelte Eingabe","sichtbar":true},{"id":"B-09","nr":4,"text":"fehlende Übersicht über Umsatzsteuer und Kasse","sichtbar":true},{"id":"B-10","nr":5,"text":"Cloud-Buchhaltungen kosten monatlich und die Daten liegen beim Anbieter","sichtbar":true},{"id":"B-11","nr":6,"text":"Einnahmen und Ausgaben richtig buchen, mit Konten, wie das Finanzamt es verlangt","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":6,"text":"weniger Zeit beim Steuerberater"},"handeln":"vorschlagen"},{"id":"B-12","nr":6,"text":"Gebuchtes nicht mehr still änderbar: Korrektur nur als Gegenbuchung","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":""},"handeln":"vorschlagen"},{"id":"B-13","nr":6,"text":"Belege einlesen und einen Buchungsvorschlag bekommen","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":4,"text":""},"handeln":"vorschlagen"},{"id":"B-14","nr":6,"text":"Kunden, Aufträge und Rechnungen, die gleich gebucht werden","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":3,"text":""},"handeln":"vorschlagen"},{"id":"B-15","nr":6,"text":"Umsatzsteuer-Voranmeldung und EÜR auf Knopfdruck, Export für den Steuerberater","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":3,"text":""}},{"id":"B-16","nr":6,"text":"Alles mit Passwort verschlüsselt, Sicherung, Ersatzschlüssel bei vergessenem Passwort","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"Daten bleiben im Betrieb"},"handeln":"selbst"},{"id":"B-33","nr":6,"text":"Aufträge und Angebote aus der Auftrags-App und dem Angebotsplaner übernehmen","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":2,"text":""}},{"id":"B-34","nr":6,"text":"Texterkennung und Kontierungshilfe nur über EU-Anbieter, mit eigenem Schlüssel und nach Bestätigung","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":2,"text":""}},{"id":"B-37","nr":6,"text":"Als App auf dem Android-Tablet und unter Windows, Updates ohne App-Laden","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-38","nr":6,"text":"Gemeinsamer verschlüsselter Ablageort mit den anderen Apps, automatische Sicherung","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""},"handeln":"selbst"},{"id":"B-39","nr":6,"text":"Belege scannen und Rechnungsmails teilen, Positionen werden gelesen","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":2,"text":""},"handeln":"vorschlagen"},{"id":"B-40","nr":6,"text":"Belege nach Wörtern und nach Bedeutung durchsuchen","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":1,"text":""},"handeln":"vorschlagen"},{"id":"B-42","nr":6,"text":"Offene Ladenkasse mit Tagesabschluss und Quittungsvorlage","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":2,"text":""}},{"id":"B-43","nr":6,"text":"Startseite mit fälliger Umsatzsteuer, Steuer-Rücklage und Kassenstand","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-44","nr":6,"text":"Mehrere Buchhaltungen (Laden, zweiter Laden, Haushalt) auf einem Gerät","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""},"handeln":"vorschlagen"},{"id":"B-45","nr":6,"text":"Belegerkennung ohne KI: Konto, Datum, Steuersatz, Rechnungsnummer","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":3,"text":"kein Abtippen"},"handeln":"vorschlagen"},{"id":"B-17","nr":7,"text":"Am Monatsende ist alles gebucht, die Umsatzsteuer ist bekannt, der Steuerberater bekommt eine Datei","sichtbar":true},{"id":"B-18","nr":8,"text":"Das System muss ohne Internet und ohne Konto beim Anbieter laufen","sichtbar":true},{"id":"B-19","nr":8,"text":"Das System muss jede Buchung mit Beleg und Zeitstempel unveränderbar festhalten","sichtbar":true},{"id":"B-20","nr":8,"text":"Das System muss doppelt buchen (Soll/Haben, Kontenrahmen SKR03) und die Umsatzsteuer automatisch aufteilen","sichtbar":true},{"id":"B-21","nr":8,"text":"Das System muss festgeschriebene Buchungen nie löschen, nur stornieren, und die Unveränderbarkeit mit einer Hash-Kette sichern (GoBD)","sichtbar":true},{"id":"B-22","nr":8,"text":"Das System muss die Daten als DATEV-orientierte CSV für den Steuerberater ausgeben","sichtbar":true},{"id":"B-46","nr":8,"text":"Das System muss Kontoauszüge als Text einlesen und mit den Buchungen abgleichen (Saldo-Gegenrechnung), zunächst hinter einem Vorschau-Schalter","sichtbar":true},{"id":"B-47","nr":8,"text":"Das System muss vier Nutzungsmodi kennen: Privat, Kleinunternehmer, Selbstständig, Berater","sichtbar":true},{"id":"B-48","nr":8,"text":"Das System muss den Tagesabschluss der offenen Ladenkasse aus dem gezählten Bestand mit Foto erstellen und festschreiben","sichtbar":true},{"id":"B-23","nr":9,"text":"Abläufe ändern: Belege sofort erfassen statt am Monatsende","sichtbar":true},{"id":"B-24","nr":10,"text":"offline","sichtbar":true},{"id":"B-25","nr":10,"text":"Geräte","sichtbar":true},{"id":"B-41","nr":10,"text":"Android-Tablet, Windows-PC, SD-Karte","sichtbar":true},{"id":"B-26","nr":11,"text":"Excel-Tabelle, Kassenbuch auf Papier","sichtbar":true},{"id":"B-27","nr":12,"text":"Export an den Steuerberater (DATEV-orientiert)","sichtbar":true},{"id":"B-35","nr":12,"text":"Auftrags-App, Angebotsplaner, Warenwirtschaft des Ladens","sichtbar":true},{"id":"B-28","nr":13,"text":"Belege (Fotos, PDF), Buchungen, Konten, Kunden, Rechnungen","sichtbar":true},{"id":"B-29","nr":14,"text":"personenbezogene Daten: ja","sichtbar":true},{"id":"B-30","nr":14,"text":"Aufbewahrungsfristen nach GoBD","sichtbar":true},{"id":"B-36","nr":14,"text":"Vor jeder KI werden Namen verdeckt","sichtbar":true},{"id":"B-31","nr":15,"text":"Vorgaben","sichtbar":true},{"id":"B-32","nr":15,"text":"kein Abo","sichtbar":true},{"id":"O-01","nr":18,"text":"Welcher Kontenrahmen gilt beim Steuerberater?","sichtbar":true,"wer":"Inhaberin","bis":"2026-06-15"},{"id":"O-02","nr":18,"text":"Kontoauszug-Einlesen ab Werk einschalten — erst nach weiterer Messung","sichtbar":true,"wer":"Inhaberin","bis":""}],"bausteine":[{"id":"K-01","katalog":"rechnung","name":"Buchhaltungs-Kern: Konten, doppelte Buchführung, Festschreibung mit Storno","menge":1,"groesse":"gross","faktoren":["offline"],"deckt":["B-11","B-12"],"ermaessigt":false},{"id":"K-02","katalog":"scan","name":"Belege einlesen mit Erkennung und Buchungsvorschlag","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-13"],"ermaessigt":false},{"id":"K-03","katalog":"auftrag","name":"Kunden, Aufträge, Rechnungen mit Buchung","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-14"],"ermaessigt":false},{"id":"K-04","katalog":"rechnung","name":"USt-Voranmeldung, EÜR, Export an den Steuerberater","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-15","B-27"],"ermaessigt":false},{"id":"K-05","katalog":"datei","name":"Verschlüsselter Tresor, Pflicht-Sicherung, Ersatzschlüssel","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-16"],"ermaessigt":false},{"id":"K-06","katalog":"schnitt","name":"Übernahme aus Auftrags-App, Angebotsplaner und Shop-Warenwirtschaft","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-33"],"ermaessigt":false},{"id":"K-07","katalog":"kipruef","name":"EU-Texterkennung und Kontierungshilfe mit Prüfung vor der KI","menge":1,"groesse":"mittel","faktoren":["ki"],"deckt":["B-34"],"ermaessigt":false},{"id":"K-08","katalog":"neu","name":"Android- und Windows-App mit Updates vom eigenen Server","menge":1,"groesse":"gross","faktoren":[],"deckt":["B-37"],"ermaessigt":false},{"id":"K-09","katalog":"datei","name":"Gemeinsamer Tresorordner mit den anderen Apps, automatische Sicherung","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-38"],"ermaessigt":false},{"id":"K-10","katalog":"scan","name":"Scanner und Mail-Teilen mit Rechnungspositionen","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-39"],"ermaessigt":false},{"id":"K-11","katalog":"suche","name":"Suche über Belege nach Wörtern und Bedeutung","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-40"],"ermaessigt":false},{"id":"K-12","katalog":"rechnung","name":"Kasse & Shop: Tagesabschluss, Quittungsvorlage, Rückfrage bei hoher Einnahme","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-42"],"ermaessigt":false},{"id":"K-13","katalog":"neu","name":"Startseite mit Umsatzsteuer, Rücklage, Kassenstand; mehrere Buchhaltungen","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-43","B-44"],"ermaessigt":false},{"id":"K-14","katalog":"neu","name":"Trainierte Belegerkennung auf dem Gerät","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-45"],"ermaessigt":false}],"rahmen":{"eigeneText":"Belege aus Workflow PDF Pro und Mails aus Private Brain Pro; Angebote aus Workflow Calculate und Needs","geraete":["android","windows","browser"],"offline":"immer","abgleich":"abundzu","eigene":["ablageort","hinher","suche"],"datenort":["geraet","ordner"],"sicherung":["verschluesselt","zweiterort","allein"],"ki":"wahl"},"nicht":[{"id":"N-01","text":"Keine Registrierkasse mit TSE","sichtbar":true},{"id":"N-02","text":"Kein Bargeld in einer Kasse verwalten","sichtbar":true},{"id":"N-03","text":"Keine Buchung ohne Bestätigung","sichtbar":true}]}
```
