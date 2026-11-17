---
art: bauauftrag
format: 1
vorgang: V-2026-0001
fassung: 1
vorher: -
fassungsdatum: 2026-11-14
datum: 2026-11-14
kunde: "⟦KUNDE-1⟧"
verdeckt: ja
stunden: ja
euro: nein
repo: "Workflow-Needs"  # Werkzeug, das den Auftrag erzeugt hat — nicht das Ziel
---

# Bauauftrag · Fassung 1

**Vorhaben:** Wartungen nicht mehr vergessen – Protokoll auf dem Handy

**Gesamtauftrag:** keine frühere Fassung in diesem Auftrag — alles unter „Zu tun“ ist neu zu bauen. Das Datum der Fassung steht im Kopf (`fassungsdatum`), `datum` ist der Tag der Erzeugung.

## Rahmen
- Geräte: Android-Handy, Windows-PC
- Ohne Internet: ja, immer
- Daten liegen: eigener Server, Cloud eines Anbieters
- Sicherung: von allein
- Eigene Programme: Dateien hin- und hergeben; Handwerkerprogramm für die Rechnungen bleibt
- Schlägt vor, der Kunde bestätigt: B-22, B-26, B-27
- Darf selbst handeln: B-23, B-24
- Nicht bauen: N-01 Rechnungen schreiben · N-02 Material bestellen · N-03 Plantafel · N-04 Buchhaltung · N-05 Kein neues Programm für alles

## Zu tun (für die Sitzung)
| Aktion | Kennung | Was | Größe | Stunden (Schätzung) | deckt Bedarf |
|---|---|---|---|---|---|
| NEU BAUEN | K-01 | Anlagenkartei: Kunden mit Anlagen (Gerät, Seriennummer, Wartungsintervall), Anlagenhistorie mit Protokollen, getauschten Teilen und offenen Mängeln | mittel | 35,9–65,8 | B-24, B-33, B-35, B-52, B-56 |
| NEU BAUEN | K-02 | Fälligkeitsliste und Erinnerung: bald fällige und überfällige Wartungen je Kunde, Erinnerung fürs Büro | mittel | 7,8–13 | B-22, B-34, B-29 |
| NEU BAUEN | K-03 | Wartungsprotokoll auf dem Handy: Checkliste, Messwerte, Fotos, Unterschrift des Kunden am Bildschirm, Protokoll als PDF | groß | 63,2–126,5 | B-23, B-36, B-37, B-53, B-54, B-55, B-30 |
| NEU BAUEN | K-04 | Android-App für die Monteure und Windows-Fassung fürs Büro | mittel | 8–14 | B-45, B-46 |
| NEU BAUEN | K-05 | Offline-Betrieb mit Abgleich über einen kleinen Betriebsserver (Monteure ↔ Büro, Konflikte sichtbar) | groß | 119,6–239,2 | B-25, B-38, B-47, B-21 |
| NEU BAUEN | K-06 | Terminvorschlag an den Kunden per Link, Kunde bestätigt oder wählt anderen Termin | mittel | 38,4–70,4 | B-26, B-39, B-32 |
| NEU BAUEN | K-07 | Übergabe der Wartungsdaten (Kunde, Leistung, Material, Zeit) als Exportdatei ans Handwerkerprogramm | mittel | 14–26 | B-27, B-40, B-50 |
| NEU BAUEN | K-08 | Einmalige Übernahme der Excel-Wartungsliste (Kunden, Anlagen, letzte Wartung) | mittel | 10–18 | B-44, B-51, B-49 |
| NEU BAUEN | K-09 | Vollständiger Export aller Daten mit Fotos (offenes Format) und automatische Sicherung | klein | 4–7 | B-28, B-41, B-58 |

### Je Baustein: Vorlage und Abnahme
- K-01 · Faktoren Offline ×1,15, Mehrere Nutzer ×1,3
  - Abnahme B-33: Das System muss zu jedem Kunden die Anlagen mit Gerät, Seriennummer und Wartungsintervall führen.
  - Abnahme B-35: Das System muss dem Monteur am Gerät die bisherigen Protokolle, getauschten Teile und offenen Mängel zeigen.
- K-02 · Vorlage Familienakte (Kalender, Glocke) (50 % wiederverwendet) · Faktoren Mehrere Nutzer ×1,3
  - Abnahme B-34: Das System muss anzeigen, welche Wartungen bald fällig oder überfällig sind.
- K-03 · Faktoren Offline ×1,15, Druck / PDF ×1,1
  - Abnahme B-36: Das System muss ein Wartungsprotokoll mit Messwerten und Fotos auf dem Handy erfassen.
  - Abnahme B-37: Das System muss die Unterschrift des Kunden auf dem Handy aufnehmen.
- K-04 · Vorlage Familienakte, BookLedgerPro, Workflow PDF Pro (Android-Hülle, Windows-Hülle) (50 % wiederverwendet)
- K-05 · Faktoren Offline ×1,15, Server ×1,6, Mehrere Nutzer ×1,3
  - Abnahme B-38: Das System muss ohne Netz funktionieren und später abgleichen.
- K-06 · Faktoren Server ×1,6
  - Abnahme B-39: Das System muss einen nächsten Termin vorschlagen, den der Kunde bestätigen kann.
- K-07
  - Abnahme B-40: Das System muss die Daten für die Rechnung an unser Handwerkerprogramm übergeben.
- K-09 · Vorlage Pro-Tresor (Workflow PDF Pro), Vollsicherung der Familienakte (50 % wiederverwendet)
  - Abnahme B-41: Das System muss alle Daten mit Fotos vollständig exportieren können.

## Bedarfsprotokoll – Änderungen
- NEU B-01 [Bereich 1]: „Fällige Wartungen stehen in einer Excel-Tabelle und im Kopf meiner Frau“
- NEU B-02 [Bereich 1]: „Wartungsprotokolle füllen die Monteure auf Papier aus“
- NEU B-03 [Bereich 1]: „Rechnungen schreiben wir mit unserem Handwerkerprogramm“
- NEU B-04 [Bereich 1]: „Termine machen wir per Telefon aus“
- NEU B-05 [Bereich 2]: „Wartung der rund 600 Heizungen und Wärmepumpen bei Kunden“
- NEU B-06 [Bereich 2]: „Termin mit dem Kunden ausmachen“
- NEU B-07 [Bereich 2]: „Protokoll beim Kunden vor Ort“
- NEU B-08 [Bereich 2]: „Daten für die Rechnung ins Büro bringen“
- NEU B-09 [Bereich 3]: „Inhaber (Meister)“
- NEU B-10 [Bereich 3]: „Monteure“
- NEU B-11 [Bereich 3]: „Azubi“
- NEU B-12 [Bereich 3]: „Büro (meine Frau)“
- NEU B-13 [Bereich 3]: „Kunden, die unterschreiben und Termine bestätigen“
- NEU B-14 [Bereich 4]: „Jedes Jahr rutschen Wartungen durch“
- NEU B-15 [Bereich 4]: „Wenn der Kunde selbst anruft, ist es oft zu spät oder er hat einen anderen Betrieb geholt“
- NEU B-16 [Bereich 4]: „Papierprotokolle liegen eine Woche im Auto“
- NEU B-17 [Bereich 4]: „Beim nächsten Besuch weiß keiner, was letztes Jahr war, welche Teile getauscht wurden und was nicht in Ordnung war“
- NEU B-18 [Bereich 4]: „Für einen Termin wird zehnmal telefoniert“
- NEU B-19 [Bereich 5]: „Fälligkeiten hängen an einer Excel-Liste und am Gedächtnis einer Person“
- NEU B-20 [Bereich 5]: „Protokolle gibt es nur auf Papier, nicht beim Gerät gespeichert“
- NEU B-21 [Bereich 5]: „Kein gemeinsamer Stand zwischen Büro und Monteuren“
- NEU B-22 [Bereich 6]: „Rechtzeitig sehen, bei welchem Kunden welche Wartung fällig ist“ (Muss, Nutzen: 4 h/Monat, Zwei, drei Wartungen mehr im Jahr, Kunden bleiben bei uns)
- NEU B-23 [Bereich 6]: „Wartungsprotokoll auf dem Handy mit Fotos, Messwerten und Unterschrift des Kunden“ (Muss, Nutzen: 8 h/Monat, Kein Papier mehr im Auto, Protokoll gleich im Büro)
- NEU B-24 [Bereich 6]: „Am Gerät sofort sehen: welches Gerät, Seriennummer, was letztes Mal war und welche Teile getauscht wurden“ (Muss, Nutzen: 3 h/Monat, Monteur ist vorbereitet, nichts wird übersehen)
- NEU B-25 [Bereich 6]: „Funktioniert auch im Keller ohne Netz“ (Muss, Nutzen: Sonst ist es für uns nicht zu gebrauchen)
- NEU B-26 [Bereich 6]: „Nächsten Termin vorschlagen, Kunde bestätigt ihn einfach“ (Soll, Nutzen: 5 h/Monat, Weniger Telefonieren im Büro)
- NEU B-27 [Bereich 6]: „Daten für die Rechnung kommen ins Handwerkerprogramm rüber“ (Soll, Nutzen: 3 h/Monat, Nicht alles doppelt abtippen)
- NEU B-28 [Bereich 6]: „Alle Daten samt Fotos mitnehmen können, wenn wir wechseln“ (Muss, Nutzen: Die Daten gehören uns)
- NEU B-29 [Bereich 7]: „Keine Wartung wird mehr vergessen“
- NEU B-30 [Bereich 7]: „Protokoll ist fertig, wenn der Monteur das Haus verlässt“
- NEU B-31 [Bereich 7]: „Jeder sieht am Gerät die ganze Geschichte“
- NEU B-32 [Bereich 7]: „Termine ohne langes Telefonieren“
- NEU B-33 [Bereich 8]: „Das System muss zu jedem Kunden die Anlagen mit Gerät, Seriennummer und Wartungsintervall führen.“
- NEU B-34 [Bereich 8]: „Das System muss anzeigen, welche Wartungen bald fällig oder überfällig sind.“
- NEU B-35 [Bereich 8]: „Das System muss dem Monteur am Gerät die bisherigen Protokolle, getauschten Teile und offenen Mängel zeigen.“
- NEU B-36 [Bereich 8]: „Das System muss ein Wartungsprotokoll mit Messwerten und Fotos auf dem Handy erfassen.“
- NEU B-37 [Bereich 8]: „Das System muss die Unterschrift des Kunden auf dem Handy aufnehmen.“
- NEU B-38 [Bereich 8]: „Das System muss ohne Netz funktionieren und später abgleichen.“
- NEU B-39 [Bereich 8]: „Das System muss einen nächsten Termin vorschlagen, den der Kunde bestätigen kann.“
- NEU B-40 [Bereich 8]: „Das System muss die Daten für die Rechnung an unser Handwerkerprogramm übergeben.“
- NEU B-41 [Bereich 8]: „Das System muss alle Daten mit Fotos vollständig exportieren können.“
- NEU B-42 [Bereich 9]: „Monteure kurz einweisen“
- NEU B-43 [Bereich 9]: „Büro pflegt die Kunden und Anlagen“
- NEU B-44 [Bereich 9]: „Bestehende Excel-Liste einmal übernehmen“
- NEU B-45 [Bereich 10]: „Android-Handys der Monteure“
- NEU B-46 [Bereich 10]: „Windows-PC im Büro“
- NEU B-47 [Bereich 10]: „Muss im Keller ohne Netz gehen“
- NEU B-48 [Bereich 11]: „Handwerkerprogramm für Rechnungen“
- NEU B-49 [Bereich 11]: „Excel-Tabelle mit Wartungen“
- NEU B-50 [Bereich 12]: „Daten für die Rechnung ans Handwerkerprogramm“
- NEU B-51 [Bereich 12]: „Übernahme der Excel-Liste“
- NEU B-52 [Bereich 13]: „Kunden, Anlagen, Seriennummern“
- NEU B-53 [Bereich 13]: „Wartungsprotokolle mit Messwerten“
- NEU B-54 [Bereich 13]: „Fotos“
- NEU B-55 [Bereich 13]: „Unterschriften“
- NEU B-56 [Bereich 13]: „Rund 600 Anlagen“
- NEU B-57 [Bereich 14]: „personenbezogene Daten: ja“
- NEU B-58 [Bereich 14]: „Die Daten gehören uns“
- NEU B-59 [Bereich 15]: „Budget: 80 bis 100 Euro im Monat für den ganzen Betrieb, nicht pro Kopf“
- NEU O-01 [Bereich 18]: „Wie kommen die Daten genau ins Handwerkerprogramm (welches Format)?“
- NEU O-02 [Bereich 18]: „Wie bestätigt der Kunde den Termin (Mail, SMS, Link)?“

## Offene Punkte
- O-01: Wie kommen die Daten genau ins Handwerkerprogramm (welches Format)?
- O-02: Wie bestätigt der Kunde den Termin (Mail, SMS, Link)?

## Summe
Stunden F1 409–790,9 · Kosten-Nutzen: Grenzlinie keine

Die Summe enthält zusätzlich zu den Zeilen: Anpassung an den Betrieb 2–6 h, Abstimmung 15 % (45,4–87,9 h), Puffer 20 % (60,6–117,2 h).

## Erklärungen und Sterne
- Verschwiegenheitserklärung aktiviert: nein · Vereinbarung Zahlung/Rechte aktiviert: nein · Wartungsvertrag aktiviert: nein
- Sterne der Mitarbeiter: noch keine

## Vollständiger Stand (zum Einlesen)
```json
{"bedarf":[{"id":"B-01","nr":1,"text":"Fällige Wartungen stehen in einer Excel-Tabelle und im Kopf meiner Frau","sichtbar":true},{"id":"B-02","nr":1,"text":"Wartungsprotokolle füllen die Monteure auf Papier aus","sichtbar":true},{"id":"B-03","nr":1,"text":"Rechnungen schreiben wir mit unserem Handwerkerprogramm","sichtbar":true},{"id":"B-04","nr":1,"text":"Termine machen wir per Telefon aus","sichtbar":true},{"id":"B-05","nr":2,"text":"Wartung der rund 600 Heizungen und Wärmepumpen bei Kunden","sichtbar":true},{"id":"B-06","nr":2,"text":"Termin mit dem Kunden ausmachen","sichtbar":true},{"id":"B-07","nr":2,"text":"Protokoll beim Kunden vor Ort","sichtbar":true},{"id":"B-08","nr":2,"text":"Daten für die Rechnung ins Büro bringen","sichtbar":true},{"id":"B-09","nr":3,"text":"Inhaber (Meister)","sichtbar":true,"anzahl":1},{"id":"B-10","nr":3,"text":"Monteure","sichtbar":true,"anzahl":5},{"id":"B-11","nr":3,"text":"Azubi","sichtbar":true,"anzahl":1},{"id":"B-12","nr":3,"text":"Büro (meine Frau)","sichtbar":true,"anzahl":1},{"id":"B-13","nr":3,"text":"Kunden, die unterschreiben und Termine bestätigen","sichtbar":true,"anzahl":600},{"id":"B-14","nr":4,"text":"Jedes Jahr rutschen Wartungen durch","sichtbar":true},{"id":"B-15","nr":4,"text":"Wenn der Kunde selbst anruft, ist es oft zu spät oder er hat einen anderen Betrieb geholt","sichtbar":true},{"id":"B-16","nr":4,"text":"Papierprotokolle liegen eine Woche im Auto","sichtbar":true},{"id":"B-17","nr":4,"text":"Beim nächsten Besuch weiß keiner, was letztes Jahr war, welche Teile getauscht wurden und was nicht in Ordnung war","sichtbar":true},{"id":"B-18","nr":4,"text":"Für einen Termin wird zehnmal telefoniert","sichtbar":true},{"id":"B-19","nr":5,"text":"Fälligkeiten hängen an einer Excel-Liste und am Gedächtnis einer Person","sichtbar":true},{"id":"B-20","nr":5,"text":"Protokolle gibt es nur auf Papier, nicht beim Gerät gespeichert","sichtbar":true},{"id":"B-21","nr":5,"text":"Kein gemeinsamer Stand zwischen Büro und Monteuren","sichtbar":true},{"id":"B-22","nr":6,"text":"Rechtzeitig sehen, bei welchem Kunden welche Wartung fällig ist","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":4,"text":"Zwei, drei Wartungen mehr im Jahr, Kunden bleiben bei uns"},"handeln":"vorschlagen"},{"id":"B-23","nr":6,"text":"Wartungsprotokoll auf dem Handy mit Fotos, Messwerten und Unterschrift des Kunden","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":8,"text":"Kein Papier mehr im Auto, Protokoll gleich im Büro"},"handeln":"selbst"},{"id":"B-24","nr":6,"text":"Am Gerät sofort sehen: welches Gerät, Seriennummer, was letztes Mal war und welche Teile getauscht wurden","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":3,"text":"Monteur ist vorbereitet, nichts wird übersehen"},"handeln":"selbst"},{"id":"B-25","nr":6,"text":"Funktioniert auch im Keller ohne Netz","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"Sonst ist es für uns nicht zu gebrauchen"},"handeln":"egal"},{"id":"B-26","nr":6,"text":"Nächsten Termin vorschlagen, Kunde bestätigt ihn einfach","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":5,"text":"Weniger Telefonieren im Büro"},"handeln":"vorschlagen"},{"id":"B-27","nr":6,"text":"Daten für die Rechnung kommen ins Handwerkerprogramm rüber","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":3,"text":"Nicht alles doppelt abtippen"},"handeln":"vorschlagen"},{"id":"B-28","nr":6,"text":"Alle Daten samt Fotos mitnehmen können, wenn wir wechseln","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"Die Daten gehören uns"},"handeln":"egal"},{"id":"B-29","nr":7,"text":"Keine Wartung wird mehr vergessen","sichtbar":true},{"id":"B-30","nr":7,"text":"Protokoll ist fertig, wenn der Monteur das Haus verlässt","sichtbar":true},{"id":"B-31","nr":7,"text":"Jeder sieht am Gerät die ganze Geschichte","sichtbar":true},{"id":"B-32","nr":7,"text":"Termine ohne langes Telefonieren","sichtbar":true},{"id":"B-33","nr":8,"text":"Das System muss zu jedem Kunden die Anlagen mit Gerät, Seriennummer und Wartungsintervall führen.","sichtbar":true},{"id":"B-34","nr":8,"text":"Das System muss anzeigen, welche Wartungen bald fällig oder überfällig sind.","sichtbar":true},{"id":"B-35","nr":8,"text":"Das System muss dem Monteur am Gerät die bisherigen Protokolle, getauschten Teile und offenen Mängel zeigen.","sichtbar":true},{"id":"B-36","nr":8,"text":"Das System muss ein Wartungsprotokoll mit Messwerten und Fotos auf dem Handy erfassen.","sichtbar":true},{"id":"B-37","nr":8,"text":"Das System muss die Unterschrift des Kunden auf dem Handy aufnehmen.","sichtbar":true},{"id":"B-38","nr":8,"text":"Das System muss ohne Netz funktionieren und später abgleichen.","sichtbar":true},{"id":"B-39","nr":8,"text":"Das System muss einen nächsten Termin vorschlagen, den der Kunde bestätigen kann.","sichtbar":true},{"id":"B-40","nr":8,"text":"Das System muss die Daten für die Rechnung an unser Handwerkerprogramm übergeben.","sichtbar":true},{"id":"B-41","nr":8,"text":"Das System muss alle Daten mit Fotos vollständig exportieren können.","sichtbar":true},{"id":"B-42","nr":9,"text":"Monteure kurz einweisen","sichtbar":true},{"id":"B-43","nr":9,"text":"Büro pflegt die Kunden und Anlagen","sichtbar":true},{"id":"B-44","nr":9,"text":"Bestehende Excel-Liste einmal übernehmen","sichtbar":true},{"id":"B-45","nr":10,"text":"Android-Handys der Monteure","sichtbar":true},{"id":"B-46","nr":10,"text":"Windows-PC im Büro","sichtbar":true},{"id":"B-47","nr":10,"text":"Muss im Keller ohne Netz gehen","sichtbar":true},{"id":"B-48","nr":11,"text":"Handwerkerprogramm für Rechnungen","sichtbar":true},{"id":"B-49","nr":11,"text":"Excel-Tabelle mit Wartungen","sichtbar":true},{"id":"B-50","nr":12,"text":"Daten für die Rechnung ans Handwerkerprogramm","sichtbar":true},{"id":"B-51","nr":12,"text":"Übernahme der Excel-Liste","sichtbar":true},{"id":"B-52","nr":13,"text":"Kunden, Anlagen, Seriennummern","sichtbar":true},{"id":"B-53","nr":13,"text":"Wartungsprotokolle mit Messwerten","sichtbar":true},{"id":"B-54","nr":13,"text":"Fotos","sichtbar":true},{"id":"B-55","nr":13,"text":"Unterschriften","sichtbar":true},{"id":"B-56","nr":13,"text":"Rund 600 Anlagen","sichtbar":true},{"id":"B-57","nr":14,"text":"personenbezogene Daten: ja","sichtbar":true},{"id":"B-58","nr":14,"text":"Die Daten gehören uns","sichtbar":true},{"id":"B-59","nr":15,"text":"Budget: 80 bis 100 Euro im Monat für den ganzen Betrieb, nicht pro Kopf","sichtbar":true},{"id":"O-01","nr":18,"text":"Wie kommen die Daten genau ins Handwerkerprogramm (welches Format)?","sichtbar":true,"wer":"","bis":""},{"id":"O-02","nr":18,"text":"Wie bestätigt der Kunde den Termin (Mail, SMS, Link)?","sichtbar":true,"wer":"","bis":""}],"bausteine":[{"id":"K-01","katalog":"neu","name":"Anlagenkartei: Kunden mit Anlagen (Gerät, Seriennummer, Wartungsintervall), Anlagenhistorie mit Protokollen, getauschten Teilen und offenen Mängeln","menge":1,"groesse":"mittel","faktoren":["offline","nutzer"],"deckt":["B-24","B-33","B-35","B-52","B-56"],"ermaessigt":false},{"id":"K-02","katalog":"kalender","name":"Fälligkeitsliste und Erinnerung: bald fällige und überfällige Wartungen je Kunde, Erinnerung fürs Büro","menge":1,"groesse":"mittel","faktoren":["nutzer"],"deckt":["B-22","B-34","B-29"],"ermaessigt":false},{"id":"K-03","katalog":"neu","name":"Wartungsprotokoll auf dem Handy: Checkliste, Messwerte, Fotos, Unterschrift des Kunden am Bildschirm, Protokoll als PDF","menge":1,"groesse":"gross","faktoren":["offline","druck"],"deckt":["B-23","B-36","B-37","B-53","B-54","B-55","B-30"],"ermaessigt":false},{"id":"K-04","katalog":"plattform","name":"Android-App für die Monteure und Windows-Fassung fürs Büro","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-45","B-46"],"ermaessigt":false},{"id":"K-05","katalog":"neu","name":"Offline-Betrieb mit Abgleich über einen kleinen Betriebsserver (Monteure ↔ Büro, Konflikte sichtbar)","menge":1,"groesse":"gross","faktoren":["offline","server","nutzer"],"deckt":["B-25","B-38","B-47","B-21"],"ermaessigt":false},{"id":"K-06","katalog":"neu","name":"Terminvorschlag an den Kunden per Link, Kunde bestätigt oder wählt anderen Termin","menge":1,"groesse":"mittel","faktoren":["server"],"deckt":["B-26","B-39","B-32"],"ermaessigt":false},{"id":"K-07","katalog":"schnitt","name":"Übergabe der Wartungsdaten (Kunde, Leistung, Material, Zeit) als Exportdatei ans Handwerkerprogramm","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-27","B-40","B-50"],"ermaessigt":false},{"id":"K-08","katalog":"altdaten","name":"Einmalige Übernahme der Excel-Wartungsliste (Kunden, Anlagen, letzte Wartung)","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-44","B-51","B-49"],"ermaessigt":false},{"id":"K-09","katalog":"tresor","name":"Vollständiger Export aller Daten mit Fotos (offenes Format) und automatische Sicherung","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-28","B-41","B-58"],"ermaessigt":false}],"rahmen":{"geraete":["android","windows"],"offline":"immer","eigene":["hinher"],"eigeneText":"Handwerkerprogramm für die Rechnungen bleibt","datenort":["server","cloud"],"sicherung":["allein"]},"nicht":[{"id":"N-01","text":"Rechnungen schreiben","sichtbar":true},{"id":"N-02","text":"Material bestellen","sichtbar":true},{"id":"N-03","text":"Plantafel","sichtbar":true},{"id":"N-04","text":"Buchhaltung","sichtbar":true},{"id":"N-05","text":"Kein neues Programm für alles","sichtbar":true}]}
```
