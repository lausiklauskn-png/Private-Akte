---
art: bauauftrag
format: 1
vorgang: V-2026-0001
fassung: 4
vorher: -
fassungsdatum: 2026-11-13
datum: 2026-11-13
kunde: "⟦KUNDE-1⟧"
verdeckt: ja
stunden: ja
euro: nein
repo: "Workflow-Needs"  # Werkzeug, das den Auftrag erzeugt hat — nicht das Ziel
---

# Bauauftrag · Fassung 4

**Anlass:** Die schon gebauten Apps sollen als Muster dienen; der Bauauftrag muss sich rückwärts an fertigen Apps bewähren  ·  **von:** Betrieb

**Vorhaben:** Bedarf erfassen, Umfang schätzen und Angebot erstellen für Software-Aufträge

**Gesamtauftrag:** keine frühere Fassung in diesem Auftrag — alles unter „Zu tun“ ist neu zu bauen. Das Datum der Fassung steht im Kopf (`fassungsdatum`), `datum` ist der Tag der Erzeugung.

## Rahmen
- Geräte: im Browser, Tablet, Windows-PC
- Ohne Internet: ja, immer
- Abgleich zwischen Geräten: ja, Abgleich ab und zu reicht
- Daten liegen: nur auf dem Gerät
- Sicherung: verschlüsselt, selbst anstoßen
- Eigene Programme: Dateien hin- und hergeben; Aufträge an Mein WorkFloh und Tomys Hub, Angebote an BookLedgerPro
- KI: keine KI
- Nicht bauen: N-01 Der Stundensatz steht nie auf einem Kundenblatt

## Zu tun (für die Sitzung)
| Aktion | Kennung | Was | Größe | Stunden (Schätzung) | deckt Bedarf |
|---|---|---|---|---|---|
| NEU BAUEN | K-01 | Bedarfsprotokoll mit 18 Bereichen, Kennungen und Ausdrucken (Kunde / intern) | groß | 63,2–126,5 | B-11 |
| NEU BAUEN | K-02 | Schätzung aus Bausteinen, Satz-Ebenen, USt, Kosten-Nutzen und Grenzlinie | groß | 50–100 | B-12 |
| NEU BAUEN | K-03 | Angebot mit Positionen, Unterschriften, Fassungen, Vergleich und Nachtrag | mittel | 15,8–26,4 | B-13, B-14 |
| NEU BAUEN | K-04 | Bauauftrag mit Platzhaltern (Modul 25) und Aufdecken | mittel | 3–4,8 | B-15 |
| NEU BAUEN | K-05 | Verschlüsselte Sicherung, Anhänge am Vorgang | mittel | 6,4–11,2 | B-16, B-17 |
| NEU BAUEN | K-06 | Übergabe als Auftragsdatei an WorkFloh | klein | 6–10 | B-18, B-35 |
| NEU BAUEN | K-07 | Erklärung, Vereinbarung und Wartungsvertrag mit Unterschriftsfeld; Sterne der Mitarbeiter | mittel | 26,4–48,4 | B-19, B-20 |
| NEU BAUEN | K-08 | Erklär-Feld an jedem Chip mit vorgerechneter Preiswirkung, Zurück-Stände, neue Fassung im Banner | mittel | 24–44 | B-41 |
| NEU BAUEN | K-09 | Ansicht der Anhänge (Bild, PDF, E-Mail), nichts wird ausgeführt | mittel | 3–4,8 | B-42 |
| NEU BAUEN | K-10 | Muster-Vorgänge aus eigenen Aufträgen mit Ist-Stunden | klein | 10–20 | B-43 |
| NEU BAUEN | K-11 | SBKIM-Knoten: Lampen, Siegel, Mycel mit Netz-Einstellung, Prüfliste vor dem Richter | mittel | 7,8–13 | B-46 |
| NEU BAUEN | K-12 | Übergabe des Angebots an BookLedgerPro | klein | 7,2–12 | B-47, B-51 |
| NEU BAUEN | K-13 | Installieren-Knopf und Manifest-Kennung | klein | 3–5 | B-48 |
| NEU BAUEN | K-14 | Vier fertige Apps als Muster-Vorgänge, Schlüssigkeitsprobe | mittel | 24–44 | B-52 |
| NEU BAUEN | K-15 | Bauauftrag: Namensteile verdecken, Summe mit Zuschlägen | klein | 1,2–2,4 | B-53 |

### Je Baustein: Vorlage und Abnahme
- K-01 · Faktoren Offline ×1,15, Druck / PDF ×1,1
- K-03 · Vorlage BookLedgerPro (40 % wiederverwendet) · Faktoren Druck / PDF ×1,1
- K-04 · Vorlage Sende-Prüfer (70 % wiederverwendet)
- K-05 · Vorlage Datei-Post (60 % wiederverwendet)
- K-06 · Vorlage Mein WorkFloh (50 % wiederverwendet)
- K-07 · Faktoren Druck / PDF ×1,1
- K-09 · Vorlage Auslieferungsprüfer (70 % wiederverwendet)
- K-11 · Vorlage Kimboard (50 % wiederverwendet) · Faktoren Mehrere Nutzer ×1,3
- K-12 · Vorlage BookLedgerPro (40 % wiederverwendet)
- K-13 · Vorlage Mein-Rezeptbuch-Page, Workfloh-PDF-Page (50 % wiederverwendet)
- K-15 · Vorlage Sende-Prüfer (70 % wiederverwendet)
- ohne Baustein (trotzdem abnehmen):
  - B-22: Das System muss als installierbare Web-App im Browser laufen, ohne Build-Schritt und nach dem ersten Besuch ohne Internet
  - B-23: Das System muss den Bedarf in 18 festen Bereichen erfassen, mit Kennungen B-nn/O-nn, die nie neu vergeben werden
  - B-24: Das System muss aus Katalog-Bausteinen (Größe, Faktoren, Wiederverwendung) Stunden und Preis schätzen und eine Grenzlinie nach Kosten-Nutzen ziehen
  - B-25: Das System muss drei getrennte Ausdrucke liefern: Bedarfsprotokoll für den Kunden ohne Preis, Bedarfsanalyse intern, Angebot ohne Stundensatz
  - B-26: Das System muss beim Unterschreiben Satz und Umsatzsteuer einer Fassung einfrieren; Änderungen entstehen nur als neue Fassung
  - B-27: Das System muss den Stundensatz nie hinausgeben, mit einer einzigen Ausnahme: dem Wartungsvertrag
  - B-28: Das System muss einen Bauauftrag als Text erzeugen, in dem Kundendaten durch Platzhalter ersetzt sind, und ihn nach Rückkehr wieder aufdecken
  - B-29: Das System muss alle Daten im Browser des Geräts halten und eine verschlüsselte Sicherung schreiben, die beim Zurückholen nur ergänzt, nie überschreibt
  - B-30: Das System muss nichts selbst verschicken: Mail nur über das Mailprogramm, Übergabe nur als Datei
  - B-44: Das System muss in einer unterschriebenen Fassung nur erklären und mit einem Tipp eine neue offene Fassung anlegen
  - B-45: Das System muss in der Kopfzeile Kunde, Fassung und Titel des offenen Vorgangs nennen
  - B-49: Das System muss Antworten fremder Knoten vor einer KI auf Anweisungen prüfen und sie sonst ausschließen
  - B-50: Das System muss an die Buchhaltung nur Positionen mit Netto und Steuersatz geben, nie Stunden oder Stundensatz
  - B-54: Das System muss für jeden Muss-Bedarf einen Baustein nachweisen und keinen Baustein auf einen fehlenden Bedarf zeigen lassen

## Bedarfsprotokoll – Änderungen
- NEU B-01 [Bereich 1]: „Papier“
- NEU B-02 [Bereich 1]: „Gesprächsnotizen im Notizbuch, Preise im Kopf, Angebote als Textdatei“
- NEU B-03 [Bereich 2]: „Kundenkontakt“
- NEU B-04 [Bereich 2]: „Angebot“
- NEU B-05 [Bereich 3]: „Inhaber (führt das Gespräch, schreibt das Angebot)“
- NEU B-06 [Bereich 3]: „Mitarbeiter im Bau“
- NEU B-07 [Bereich 3]: „Buchhaltung“
- NEU B-08 [Bereich 4]: „Angebote dauern zu lange und sind schwer nachzuvollziehen“
- NEU B-09 [Bereich 4]: „Änderungswünsche während des Baus sind nirgends sauber festgehalten“
- NEU B-10 [Bereich 5]: „Bedarf und Lösung werden im Gespräch vermischt, der Kunde unterschreibt einen Preis ohne Begründung“
- NEU B-11 [Bereich 6]: „Den Bedarf des Kunden lösungsneutral in festen Bereichen erfassen, ohne Preis“ (Muss, Nutzen: 3 h/Monat, nichts geht im Gespräch verloren)
- NEU B-12 [Bereich 6]: „Den Umfang aus Bausteinen schätzen, mit Stunden, Preis und Kosten-Nutzen“ (Muss, Nutzen: 4 h/Monat, Angebot in einer Stunde statt einem Tag)
- NEU B-13 [Bereich 6]: „Angebot mit Positionen und zwei Unterschriften, ohne interne Sätze“ (Muss, Nutzen: 2 h/Monat)
- NEU B-14 [Bereich 6]: „Jede Änderung als neue Fassung mit Vergleich und Nachtrag zum Unterschreiben“ (Muss, Nutzen: 2 h/Monat, keine Streitfragen mehr)
- NEU B-15 [Bereich 6]: „Bauauftrag für die nächste Bausitzung, ohne Kundendaten (Platzhalter)“ (Muss, Nutzen: 2 h/Monat)
- NEU B-16 [Bereich 6]: „Alles bleibt auf dem Gerät und lässt sich verschlüsselt sichern“ (Muss, Nutzen: Kundendaten verlassen das Haus nicht)
- NEU B-17 [Bereich 6]: „Anhänge am Vorgang (PDF, E-Mail, Bildschirmfoto)“ (Soll, Nutzen: 1 h/Monat)
- NEU B-18 [Bereich 6]: „Den Auftrag an die Auftragsverwaltung übergeben“ (Soll, Nutzen: 1 h/Monat)
- NEU B-19 [Bereich 6]: „Verschwiegenheitserklärung, Vereinbarung zu Zahlung und Rechten, Wartungsvertrag“ (Soll)
- NEU B-20 [Bereich 6]: „Mitarbeiter bewerten die Bedarfe mit Sternen, beim Bedarf und bei der Abnahme“ (Kann)
- NEU B-41 [Bereich 6]: „Jeder Chip am Baustein erklärt sich und zeigt vorher, wie sich der Preis ändert, mit Zurück“ (Muss, Nutzen: 1 h/Monat, keine Überraschung im Angebot)
- NEU B-42 [Bereich 6]: „Anhänge mit einem Tipp groß ansehen: Bilder, PDFs ganz, E-Mails mit Text und Anhängen“ (Soll)
- NEU B-43 [Bereich 6]: „Fertige Muster-Vorgänge zum Ausprobieren, gleich neben „Neuer Vorgang““ (Kann)
- NEU B-46 [Bereich 6]: „Die App ist ein Knoten im eigenen Netz mit Siegel und Lampen, ohne beim Laden etwas zu senden“ (Soll)
- NEU B-47 [Bereich 6]: „Angebot mit einem Tipp an die Buchhaltung übergeben“ (Muss, Nutzen: 1 h/Monat, kein Abtippen der Positionen)
- NEU B-48 [Bereich 6]: „Installieren-Knopf in den Einstellungen, verschwindet als installierte App“ (Kann)
- NEU B-52 [Bereich 6]: „Fertige Apps als Muster-Vorgänge mit echten Fassungen und Ist-Stunden“ (Soll, Nutzen: 1 h/Monat)
- NEU B-53 [Bereich 6]: „Der Bauauftrag verdeckt auch Namensteile des Ansprechpartners und nennt die Zuschläge der Summe“ (Muss, Nutzen: kein Vorname im Klartext)
- NEU B-21 [Bereich 7]: „Ein Angebot entsteht in einer Stunde, jede Zahl lässt sich auf einen Bedarf zurückführen“
- NEU B-22 [Bereich 8]: „Das System muss als installierbare Web-App im Browser laufen, ohne Build-Schritt und nach dem ersten Besuch ohne Internet“
- NEU B-23 [Bereich 8]: „Das System muss den Bedarf in 18 festen Bereichen erfassen, mit Kennungen B-nn/O-nn, die nie neu vergeben werden“
- NEU B-24 [Bereich 8]: „Das System muss aus Katalog-Bausteinen (Größe, Faktoren, Wiederverwendung) Stunden und Preis schätzen und eine Grenzlinie nach Kosten-Nutzen ziehen“
- NEU B-25 [Bereich 8]: „Das System muss drei getrennte Ausdrucke liefern: Bedarfsprotokoll für den Kunden ohne Preis, Bedarfsanalyse intern, Angebot ohne Stundensatz“
- NEU B-26 [Bereich 8]: „Das System muss beim Unterschreiben Satz und Umsatzsteuer einer Fassung einfrieren; Änderungen entstehen nur als neue Fassung“
- NEU B-27 [Bereich 8]: „Das System muss den Stundensatz nie hinausgeben, mit einer einzigen Ausnahme: dem Wartungsvertrag“
- NEU B-28 [Bereich 8]: „Das System muss einen Bauauftrag als Text erzeugen, in dem Kundendaten durch Platzhalter ersetzt sind, und ihn nach Rückkehr wieder aufdecken“
- NEU B-29 [Bereich 8]: „Das System muss alle Daten im Browser des Geräts halten und eine verschlüsselte Sicherung schreiben, die beim Zurückholen nur ergänzt, nie überschreibt“
- NEU B-30 [Bereich 8]: „Das System muss nichts selbst verschicken: Mail nur über das Mailprogramm, Übergabe nur als Datei“
- NEU B-44 [Bereich 8]: „Das System muss in einer unterschriebenen Fassung nur erklären und mit einem Tipp eine neue offene Fassung anlegen“
- NEU B-45 [Bereich 8]: „Das System muss in der Kopfzeile Kunde, Fassung und Titel des offenen Vorgangs nennen“
- NEU B-49 [Bereich 8]: „Das System muss Antworten fremder Knoten vor einer KI auf Anweisungen prüfen und sie sonst ausschließen“
- NEU B-50 [Bereich 8]: „Das System muss an die Buchhaltung nur Positionen mit Netto und Steuersatz geben, nie Stunden oder Stundensatz“
- NEU B-54 [Bereich 8]: „Das System muss für jeden Muss-Bedarf einen Baustein nachweisen und keinen Baustein auf einen fehlenden Bedarf zeigen lassen“
- NEU B-31 [Bereich 9]: „für den Inhaber am Tablet und am PC, Deutsch und Englisch“
- NEU B-32 [Bereich 10]: „Tablet“
- NEU B-33 [Bereich 10]: „offline“
- NEU B-34 [Bereich 11]: „Textverarbeitung für Angebote (wird abgelöst)“
- NEU B-35 [Bereich 12]: „Auftragsverwaltung (WorkFloh) liest die Übergabedatei“
- NEU B-51 [Bereich 12]: „Buchhaltung (BookLedgerPro) übernimmt das Angebot im Datenvertrag v1“
- NEU B-36 [Bereich 13]: „Gesprächsnotizen, Angebote, Verträge, E-Mails und PDFs des Kunden“
- NEU B-37 [Bereich 14]: „personenbezogene Daten: ja (Kundenkontakte)“
- NEU B-38 [Bereich 15]: „Vorgaben“
- NEU B-39 [Bereich 15]: „kein Server, kein Konto, kein Zähldienst; Rechtstexte sind Entwürfe, kein Rechtsrat“
- NEU B-40 [Bereich 16]: „Eigene Aufträge: Schätzung gegen Ist-Stunden vergleichen“
- NEU O-01 [Bereich 18]: „Welche Faktoren gelten für Offline und KI?“

## Offene Punkte
- O-01: Welche Faktoren gelten für Offline und KI? (klärt Inhaber bis 2026-10-08)

## Summe
Stunden F4 341,7–646 · Kosten-Nutzen: Grenzlinie keine

Die Summe enthält zusätzlich zu den Zeilen: Anpassung an den Betrieb 2–6 h, Abstimmung 15 % (38–71,8 h), Puffer 20 % (50,6–95,7 h).

## Erklärungen und Sterne
- Verschwiegenheitserklärung aktiviert: nein · Vereinbarung Zahlung/Rechte aktiviert: nein · Wartungsvertrag aktiviert: nein
- Sterne B-12: beim Bedarf Ø 4,3 (3) · bei der Abnahme Ø 4,5 (2)
- Sterne B-13: beim Bedarf Ø 3,5 (2) · bei der Abnahme Ø 4 (2)
- Sterne B-14: beim Bedarf Ø 4,5 (2) · bei der Abnahme Ø 4,7 (3)
- Sterne B-15: beim Bedarf Ø 4,5 (2) · bei der Abnahme Ø 5 (2)
- Sterne B-20: beim Bedarf Ø 2,5 (2) · bei der Abnahme Ø 3 (2)

## Vollständiger Stand (zum Einlesen)
```json
{"bedarf":[{"id":"B-01","nr":1,"text":"Papier","sichtbar":true},{"id":"B-02","nr":1,"text":"Gesprächsnotizen im Notizbuch, Preise im Kopf, Angebote als Textdatei","sichtbar":true},{"id":"B-03","nr":2,"text":"Kundenkontakt","sichtbar":true},{"id":"B-04","nr":2,"text":"Angebot","sichtbar":true},{"id":"B-05","nr":3,"text":"Inhaber (führt das Gespräch, schreibt das Angebot)","sichtbar":true,"anzahl":1},{"id":"B-06","nr":3,"text":"Mitarbeiter im Bau","sichtbar":true,"anzahl":2},{"id":"B-07","nr":3,"text":"Buchhaltung","sichtbar":true,"anzahl":1},{"id":"B-08","nr":4,"text":"Angebote dauern zu lange und sind schwer nachzuvollziehen","sichtbar":true},{"id":"B-09","nr":4,"text":"Änderungswünsche während des Baus sind nirgends sauber festgehalten","sichtbar":true},{"id":"B-10","nr":5,"text":"Bedarf und Lösung werden im Gespräch vermischt, der Kunde unterschreibt einen Preis ohne Begründung","sichtbar":true},{"id":"B-11","nr":6,"text":"Den Bedarf des Kunden lösungsneutral in festen Bereichen erfassen, ohne Preis","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":3,"text":"nichts geht im Gespräch verloren"}},{"id":"B-12","nr":6,"text":"Den Umfang aus Bausteinen schätzen, mit Stunden, Preis und Kosten-Nutzen","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":4,"text":"Angebot in einer Stunde statt einem Tag"}},{"id":"B-13","nr":6,"text":"Angebot mit Positionen und zwei Unterschriften, ohne interne Sätze","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":2,"text":""}},{"id":"B-14","nr":6,"text":"Jede Änderung als neue Fassung mit Vergleich und Nachtrag zum Unterschreiben","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":2,"text":"keine Streitfragen mehr"}},{"id":"B-15","nr":6,"text":"Bauauftrag für die nächste Bausitzung, ohne Kundendaten (Platzhalter)","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":2,"text":""}},{"id":"B-16","nr":6,"text":"Alles bleibt auf dem Gerät und lässt sich verschlüsselt sichern","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"Kundendaten verlassen das Haus nicht"}},{"id":"B-17","nr":6,"text":"Anhänge am Vorgang (PDF, E-Mail, Bildschirmfoto)","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":1,"text":""}},{"id":"B-18","nr":6,"text":"Den Auftrag an die Auftragsverwaltung übergeben","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":1,"text":""}},{"id":"B-19","nr":6,"text":"Verschwiegenheitserklärung, Vereinbarung zu Zahlung und Rechten, Wartungsvertrag","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-20","nr":6,"text":"Mitarbeiter bewerten die Bedarfe mit Sternen, beim Bedarf und bei der Abnahme","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-41","nr":6,"text":"Jeder Chip am Baustein erklärt sich und zeigt vorher, wie sich der Preis ändert, mit Zurück","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":1,"text":"keine Überraschung im Angebot"}},{"id":"B-42","nr":6,"text":"Anhänge mit einem Tipp groß ansehen: Bilder, PDFs ganz, E-Mails mit Text und Anhängen","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-43","nr":6,"text":"Fertige Muster-Vorgänge zum Ausprobieren, gleich neben „Neuer Vorgang“","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-46","nr":6,"text":"Die App ist ein Knoten im eigenen Netz mit Siegel und Lampen, ohne beim Laden etwas zu senden","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-47","nr":6,"text":"Angebot mit einem Tipp an die Buchhaltung übergeben","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":1,"text":"kein Abtippen der Positionen"}},{"id":"B-48","nr":6,"text":"Installieren-Knopf in den Einstellungen, verschwindet als installierte App","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-52","nr":6,"text":"Fertige Apps als Muster-Vorgänge mit echten Fassungen und Ist-Stunden","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":1,"text":""}},{"id":"B-53","nr":6,"text":"Der Bauauftrag verdeckt auch Namensteile des Ansprechpartners und nennt die Zuschläge der Summe","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"kein Vorname im Klartext"}},{"id":"B-21","nr":7,"text":"Ein Angebot entsteht in einer Stunde, jede Zahl lässt sich auf einen Bedarf zurückführen","sichtbar":true},{"id":"B-22","nr":8,"text":"Das System muss als installierbare Web-App im Browser laufen, ohne Build-Schritt und nach dem ersten Besuch ohne Internet","sichtbar":true},{"id":"B-23","nr":8,"text":"Das System muss den Bedarf in 18 festen Bereichen erfassen, mit Kennungen B-nn/O-nn, die nie neu vergeben werden","sichtbar":true},{"id":"B-24","nr":8,"text":"Das System muss aus Katalog-Bausteinen (Größe, Faktoren, Wiederverwendung) Stunden und Preis schätzen und eine Grenzlinie nach Kosten-Nutzen ziehen","sichtbar":true},{"id":"B-25","nr":8,"text":"Das System muss drei getrennte Ausdrucke liefern: Bedarfsprotokoll für den Kunden ohne Preis, Bedarfsanalyse intern, Angebot ohne Stundensatz","sichtbar":true},{"id":"B-26","nr":8,"text":"Das System muss beim Unterschreiben Satz und Umsatzsteuer einer Fassung einfrieren; Änderungen entstehen nur als neue Fassung","sichtbar":true},{"id":"B-27","nr":8,"text":"Das System muss den Stundensatz nie hinausgeben, mit einer einzigen Ausnahme: dem Wartungsvertrag","sichtbar":true},{"id":"B-28","nr":8,"text":"Das System muss einen Bauauftrag als Text erzeugen, in dem Kundendaten durch Platzhalter ersetzt sind, und ihn nach Rückkehr wieder aufdecken","sichtbar":true},{"id":"B-29","nr":8,"text":"Das System muss alle Daten im Browser des Geräts halten und eine verschlüsselte Sicherung schreiben, die beim Zurückholen nur ergänzt, nie überschreibt","sichtbar":true},{"id":"B-30","nr":8,"text":"Das System muss nichts selbst verschicken: Mail nur über das Mailprogramm, Übergabe nur als Datei","sichtbar":true},{"id":"B-44","nr":8,"text":"Das System muss in einer unterschriebenen Fassung nur erklären und mit einem Tipp eine neue offene Fassung anlegen","sichtbar":true},{"id":"B-45","nr":8,"text":"Das System muss in der Kopfzeile Kunde, Fassung und Titel des offenen Vorgangs nennen","sichtbar":true},{"id":"B-49","nr":8,"text":"Das System muss Antworten fremder Knoten vor einer KI auf Anweisungen prüfen und sie sonst ausschließen","sichtbar":true},{"id":"B-50","nr":8,"text":"Das System muss an die Buchhaltung nur Positionen mit Netto und Steuersatz geben, nie Stunden oder Stundensatz","sichtbar":true},{"id":"B-54","nr":8,"text":"Das System muss für jeden Muss-Bedarf einen Baustein nachweisen und keinen Baustein auf einen fehlenden Bedarf zeigen lassen","sichtbar":true},{"id":"B-31","nr":9,"text":"für den Inhaber am Tablet und am PC, Deutsch und Englisch","sichtbar":true},{"id":"B-32","nr":10,"text":"Tablet","sichtbar":true},{"id":"B-33","nr":10,"text":"offline","sichtbar":true},{"id":"B-34","nr":11,"text":"Textverarbeitung für Angebote (wird abgelöst)","sichtbar":true},{"id":"B-35","nr":12,"text":"Auftragsverwaltung (WorkFloh) liest die Übergabedatei","sichtbar":true},{"id":"B-51","nr":12,"text":"Buchhaltung (BookLedgerPro) übernimmt das Angebot im Datenvertrag v1","sichtbar":true},{"id":"B-36","nr":13,"text":"Gesprächsnotizen, Angebote, Verträge, E-Mails und PDFs des Kunden","sichtbar":true},{"id":"B-37","nr":14,"text":"personenbezogene Daten: ja (Kundenkontakte)","sichtbar":true},{"id":"B-38","nr":15,"text":"Vorgaben","sichtbar":true},{"id":"B-39","nr":15,"text":"kein Server, kein Konto, kein Zähldienst; Rechtstexte sind Entwürfe, kein Rechtsrat","sichtbar":true},{"id":"B-40","nr":16,"text":"Eigene Aufträge: Schätzung gegen Ist-Stunden vergleichen","sichtbar":true},{"id":"O-01","nr":18,"text":"Welche Faktoren gelten für Offline und KI?","sichtbar":true,"wer":"Inhaber","bis":"2026-10-08"}],"bausteine":[{"id":"K-01","katalog":"neu","name":"Bedarfsprotokoll mit 18 Bereichen, Kennungen und Ausdrucken (Kunde / intern)","menge":1,"groesse":"gross","faktoren":["offline","druck"],"deckt":["B-11"],"ermaessigt":false},{"id":"K-02","katalog":"neu","name":"Schätzung aus Bausteinen, Satz-Ebenen, USt, Kosten-Nutzen und Grenzlinie","menge":1,"groesse":"gross","faktoren":[],"deckt":["B-12"],"ermaessigt":false},{"id":"K-03","katalog":"rechnung","name":"Angebot mit Positionen, Unterschriften, Fassungen, Vergleich und Nachtrag","menge":1,"groesse":"mittel","faktoren":["druck"],"deckt":["B-13","B-14"],"ermaessigt":false},{"id":"K-04","katalog":"kipruef","name":"Bauauftrag mit Platzhaltern (Modul 25) und Aufdecken","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-15"],"ermaessigt":false},{"id":"K-05","katalog":"datei","name":"Verschlüsselte Sicherung, Anhänge am Vorgang","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-16","B-17"],"ermaessigt":false},{"id":"K-06","katalog":"auftrag","name":"Übergabe als Auftragsdatei an WorkFloh","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-18","B-35"],"ermaessigt":false},{"id":"K-07","katalog":"neu","name":"Erklärung, Vereinbarung und Wartungsvertrag mit Unterschriftsfeld; Sterne der Mitarbeiter","menge":1,"groesse":"mittel","faktoren":["druck"],"deckt":["B-19","B-20"],"ermaessigt":false},{"id":"K-08","katalog":"neu","name":"Erklär-Feld an jedem Chip mit vorgerechneter Preiswirkung, Zurück-Stände, neue Fassung im Banner","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-41"],"ermaessigt":false},{"id":"K-09","katalog":"dateipruef","name":"Ansicht der Anhänge (Bild, PDF, E-Mail), nichts wird ausgeführt","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-42"],"ermaessigt":false},{"id":"K-10","katalog":"neu","name":"Muster-Vorgänge aus eigenen Aufträgen mit Ist-Stunden","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-43"],"ermaessigt":false},{"id":"K-11","katalog":"pinnwand","name":"SBKIM-Knoten: Lampen, Siegel, Mycel mit Netz-Einstellung, Prüfliste vor dem Richter","menge":1,"groesse":"mittel","faktoren":["nutzer"],"deckt":["B-46"],"ermaessigt":false},{"id":"K-12","katalog":"rechnung","name":"Übergabe des Angebots an BookLedgerPro","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-47","B-51"],"ermaessigt":false},{"id":"K-13","katalog":"seite","name":"Installieren-Knopf und Manifest-Kennung","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-48"],"ermaessigt":false},{"id":"K-14","katalog":"neu","name":"Vier fertige Apps als Muster-Vorgänge, Schlüssigkeitsprobe","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-52"],"ermaessigt":false},{"id":"K-15","katalog":"kipruef","name":"Bauauftrag: Namensteile verdecken, Summe mit Zuschlägen","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-53"],"ermaessigt":false}],"rahmen":{"eigeneText":"Aufträge an Mein WorkFloh und Tomys Hub, Angebote an BookLedgerPro","geraete":["browser","tablet","windows"],"offline":"immer","abgleich":"abundzu","eigene":["hinher"],"datenort":["geraet"],"sicherung":["verschluesselt","selbst"],"ki":"keine"},"nicht":[{"id":"N-01","text":"Der Stundensatz steht nie auf einem Kundenblatt","sichtbar":true}]}
```
