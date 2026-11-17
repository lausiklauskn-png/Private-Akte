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

**Vorhaben:** Überblick über meine Kunden bei KI-Schulungen und erlaubten Programmen

**Gesamtauftrag:** keine frühere Fassung in diesem Auftrag — alles unter „Zu tun“ ist neu zu bauen. Das Datum der Fassung steht im Kopf (`fassungsdatum`), `datum` ist der Tag der Erzeugung.

## Rahmen
- Geräte: Windows-PC, Tablet, Android-Handy
- Ohne Internet: reicht unterwegs
- Daten liegen: nur auf dem Gerät, eigener Ordner / Speicherkarte
- Sicherung: selbst anstoßen
- Schlägt vor, der Kunde bestätigt: B-22, B-23
- Darf selbst handeln: B-21, B-25
- Nicht bauen: N-01 keine Noten oder Bewertungen einzelner Mitarbeiter an den Chef · N-02 keine Rechtsgutachten, und das Programm soll nicht so tun, als ob · N-03 keine Kundendaten bei fremden Anbietern

## Zu tun (für die Sitzung)
| Aktion | Kennung | Was | Größe | Stunden (Schätzung) | deckt Bedarf |
|---|---|---|---|---|---|
| NEU BAUEN | K-01 | Kundenstamm mit Übersicht aller Kunden (Ampel erledigt/fällig/fehlt), Schulungen je Kunde mit Datum, Thema, Inhalten und Teilnehmern; Daten getrennt je Kunde | mittel | 27,6–50,6 | B-19, B-28, B-29, B-12, B-14, B-26, B-40, B-41, B-01, B-02, B-05, B-06, B-09, B-10, B-11, B-16, B-36 |
| NEU BAUEN | K-02 | Teilnahme-Abhaken am Tablet während der Schulung (nur teilgenommen ja/nein, keine Bewertung), läuft ohne Internet | klein | 1,4–2,8 | B-20, B-30, B-38 |
| NEU BAUEN | K-03 | Teilnahmeblatt je Schulung als PDF/Druck: Datum, Teilnehmer, Inhalte, Name und Logo der Beraterin, ohne Einzelbewertung | klein | 2–3,3 | B-21, B-31, O-02 |
| NEU BAUEN | K-04 | Erinnerung nach sechs Monaten seit der letzten Schulung je Kunde, Fälligkeiten in der Übersicht | klein | 3–5 | B-22, B-32, B-08, B-18, O-01 |
| NEU BAUEN | K-05 | Liste erlaubter Programme je Kunde mit Stand-Datum und Hinweis, wenn sie älter als drei Monate ist (nur Dokumentation, keine rechtliche Bewertung) | klein | 1,4–2,8 | B-23, B-33, B-04, B-07, B-13, B-17, B-03 |
| NEU BAUEN | K-06 | Vorlagen je Branche (z. B. Arztpraxis) einmal pflegen und mehreren Kunden zuordnen, ohne Kopie | klein | 10–20 | B-24, B-34, B-15 |
| NEU BAUEN | K-07 | Lokale Ablage je Kunde getrennt, vollständiger Export je Kunde und Sicherung auf Knopfdruck in eigenen Ordner | klein | 4–7 | B-25, B-35, B-41, B-42, B-43 |
| NEU BAUEN | K-08 | Fassung für Windows-Laptop, Android-Tablet und Handy | klein | 4–7 | B-37, B-39 |

### Je Baustein: Vorlage und Abnahme
- K-01 · Faktoren Offline ×1,15
  - Abnahme B-28: Das System muss alle Kunden in einer Übersicht zeigen, mit erledigt, fällig und fehlend
  - Abnahme B-29: Das System muss je Kunde die Schulungen mit Datum, Thema und Teilnehmern festhalten
- K-02 · Vorlage Küchenzettel (60 % wiederverwendet) · Faktoren Offline ×1,15
  - Abnahme B-30: Das System muss die Teilnahme auf dem Tablet ohne Internet abhaken lassen
- K-03 · Vorlage Workflow PDF (70 % wiederverwendet) · Faktoren Druck / PDF ×1,1
  - Abnahme B-31: Das System muss ein Teilnahmeblatt mit Datum, Inhalten, meinem Namen und Logo zum Drucken bzw. als PDF erstellen
- K-04 · Vorlage Familienakte (Kalender, Glocke) (50 % wiederverwendet)
  - Abnahme B-32: Das System muss mich erinnern, wenn bei einem Kunden ein halbes Jahr seit der letzten Schulung um ist
- K-05 · Vorlage Küchenzettel (60 % wiederverwendet) · Faktoren Offline ×1,15
  - Abnahme B-33: Das System muss je Kunde eine Liste erlaubter Programme mit Stand-Datum führen
- K-06
  - Abnahme B-34: Das System muss Vorlagen (z. B. für Arztpraxen) einmal führen und bei mehreren Kunden verwenden
- K-07 · Vorlage Pro-Tresor (Workflow PDF Pro), Vollsicherung der Familienakte (50 % wiederverwendet)
  - Abnahme B-35: Das System muss die Daten je Kunde getrennt halten und vollständig exportieren können
- K-08 · Vorlage Familienakte, BookLedgerPro, Workflow PDF Pro (Android-Hülle, Windows-Hülle) (50 % wiederverwendet)

## Bedarfsprotokoll – Änderungen
- NEU B-01 [Bereich 1]: „Je Kunde ein Ordner mit Word-Dateien“
- NEU B-02 [Bereich 1]: „Teilnahme an Schulungen in einer Excel-Liste“
- NEU B-03 [Bereich 1]: „Fragen der Kunden („Dürfen wir Programm X benutzen?“) kommen per E-Mail“
- NEU B-04 [Bereich 1]: „Liste der erlaubten Programme je Kunde, die keiner pflegt“
- NEU B-05 [Bereich 2]: „Kurze Workshops zum EU-KI-Gesetz vor Ort bei den Kunden“
- NEU B-06 [Bereich 2]: „Nachweis, wer teilgenommen hat und was gelernt wurde“
- NEU B-07 [Bereich 2]: „Pflege der Liste erlaubter Programme je Kunde“
- NEU B-08 [Bereich 2]: „Wiederholung bzw. Nachschauen nach einem halben Jahr“
- NEU B-09 [Bereich 3]: „Ich als Beraterin (allein)“
- NEU B-10 [Bereich 3]: „Kunden: Arztpraxen, zwei Steuerbüros, Handwerker, ein Verein“
- NEU B-11 [Bereich 3]: „Mitarbeiter der Kunden, die an den Schulungen teilnehmen“
- NEU B-12 [Bereich 4]: „Wenn ein Kunde fragt „Was haben wir schon gemacht?“, suche ich eine halbe Stunde“
- NEU B-13 [Bereich 4]: „Die Liste der erlaubten Programme stimmt nach drei Monaten nicht mehr“
- NEU B-14 [Bereich 4]: „Kein Überblick, wo bei welchem Kunden etwas fällig ist oder fehlt“
- NEU B-15 [Bereich 4]: „Vorlagen werden für jede Praxis neu kopiert“
- NEU B-16 [Bereich 5]: „Alles liegt verstreut in Word, Excel und Mails“
- NEU B-17 [Bereich 5]: „Keiner fühlt sich für die Programm-Liste zuständig, ich auch nicht“
- NEU B-18 [Bereich 5]: „Es gibt keine Erinnerung an Fristen“
- NEU B-19 [Bereich 6]: „Ein Blick auf alle Kunden: was erledigt ist, was fällig ist, was fehlt“ (Muss, Nutzen: 3 h/Monat, kein Suchen mehr, wenn ein Kunde fragt)
- NEU B-20 [Bereich 6]: „Teilnahme in der Schulung direkt auf dem Tablet abhaken, auch ohne WLAN“ (Muss, Nutzen: 2 h/Monat, keine Excel-Liste mehr nachtragen)
- NEU B-21 [Bereich 6]: „Ein Nachweisblatt für den Kunden mit Datum, wer was gelernt hat, mit meinem Namen und Logo“ (Muss, Nutzen: 2 h/Monat, Blatt nicht mehr von Hand zusammenbauen)
- NEU B-22 [Bereich 6]: „Erinnerung, wenn bei einem Kunden ein halbes Jahr um ist“ (Muss, Nutzen: 1 h/Monat, nichts mehr vergessen)
- NEU B-23 [Bereich 6]: „Liste der erlaubten Programme je Kunde, die aktuell bleibt“ (Soll, Nutzen: 1 h/Monat, Fragen schneller beantworten)
- NEU B-24 [Bereich 6]: „Eine Vorlage für Arztpraxen einmal gut machen und bei allen Praxen nutzen, ohne sie zu kopieren“ (Soll, Nutzen: 1 h/Monat, nicht zehnmal dasselbe pflegen)
- NEU B-25 [Bereich 6]: „Daten jederzeit herausholen können, je Kunde“ (Muss, Nutzen: ich bleibe unabhängig)
- NEU B-26 [Bereich 7]: „Auf Nachfrage eines Kunden in wenigen Minuten sagen können, was schon gemacht wurde“
- NEU B-27 [Bereich 7]: „Pro Kunde etwa eine Stunde im Quartal sparen“
- NEU B-28 [Bereich 8]: „Das System muss alle Kunden in einer Übersicht zeigen, mit erledigt, fällig und fehlend“
- NEU B-29 [Bereich 8]: „Das System muss je Kunde die Schulungen mit Datum, Thema und Teilnehmern festhalten“
- NEU B-30 [Bereich 8]: „Das System muss die Teilnahme auf dem Tablet ohne Internet abhaken lassen“
- NEU B-31 [Bereich 8]: „Das System muss ein Teilnahmeblatt mit Datum, Inhalten, meinem Namen und Logo zum Drucken bzw. als PDF erstellen“
- NEU B-32 [Bereich 8]: „Das System muss mich erinnern, wenn bei einem Kunden ein halbes Jahr seit der letzten Schulung um ist“
- NEU B-33 [Bereich 8]: „Das System muss je Kunde eine Liste erlaubter Programme mit Stand-Datum führen“
- NEU B-34 [Bereich 8]: „Das System muss Vorlagen (z. B. für Arztpraxen) einmal führen und bei mehreren Kunden verwenden“
- NEU B-35 [Bereich 8]: „Das System muss die Daten je Kunde getrennt halten und vollständig exportieren können“
- NEU B-36 [Bereich 9]: „Ich pflege es allein, es muss also schnell gehen“
- NEU B-37 [Bereich 10]: „Laptop mit Windows, Tablet für unterwegs, Handy“
- NEU B-38 [Bereich 10]: „In Praxen oft kein WLAN für Gäste“
- NEU B-39 [Bereich 11]: „Word, Excel, E-Mail“
- NEU B-40 [Bereich 13]: „Kundenstamm, Schulungen, Teilnehmerlisten, erlaubte Programme, Vorlagen“
- NEU B-41 [Bereich 13]: „Getrennt je Kunde“
- NEU B-42 [Bereich 14]: „personenbezogene Daten: ja (Namen der Teilnehmer)“
- NEU B-43 [Bereich 14]: „Daten der Kunden sollen bei mir bleiben“
- NEU B-44 [Bereich 15]: „Budget-Rahmen: 50 bis 130 Euro im Monat, wenn ich pro Kunde eine Stunde im Quartal spare“
- NEU O-01 [Bereich 18]: „Ob die Erinnerung auch aufs Handy kommen soll“
- NEU O-02 [Bereich 18]: „Wie genau „was gelernt“ auf dem Blatt aussehen soll“

## Offene Punkte
- O-01: Ob die Erinnerung auch aufs Handy kommen soll
- O-02: Wie genau „was gelernt“ auf dem Blatt aussehen soll

## Summe
Stunden F1 74,7–141 · Kosten-Nutzen: Grenzlinie keine

Die Summe enthält zusätzlich zu den Zeilen: Anpassung an den Betrieb 2–6 h, Abstimmung 15 % (8,3–15,7 h), Puffer 20 % (11,1–20,9 h).

## Erklärungen und Sterne
- Verschwiegenheitserklärung aktiviert: nein · Vereinbarung Zahlung/Rechte aktiviert: nein · Wartungsvertrag aktiviert: nein
- Sterne der Mitarbeiter: noch keine

## Vollständiger Stand (zum Einlesen)
```json
{"bedarf":[{"id":"B-01","nr":1,"text":"Je Kunde ein Ordner mit Word-Dateien","sichtbar":true},{"id":"B-02","nr":1,"text":"Teilnahme an Schulungen in einer Excel-Liste","sichtbar":true},{"id":"B-03","nr":1,"text":"Fragen der Kunden („Dürfen wir Programm X benutzen?“) kommen per E-Mail","sichtbar":true},{"id":"B-04","nr":1,"text":"Liste der erlaubten Programme je Kunde, die keiner pflegt","sichtbar":true},{"id":"B-05","nr":2,"text":"Kurze Workshops zum EU-KI-Gesetz vor Ort bei den Kunden","sichtbar":true},{"id":"B-06","nr":2,"text":"Nachweis, wer teilgenommen hat und was gelernt wurde","sichtbar":true},{"id":"B-07","nr":2,"text":"Pflege der Liste erlaubter Programme je Kunde","sichtbar":true},{"id":"B-08","nr":2,"text":"Wiederholung bzw. Nachschauen nach einem halben Jahr","sichtbar":true},{"id":"B-09","nr":3,"text":"Ich als Beraterin (allein)","sichtbar":true,"anzahl":1},{"id":"B-10","nr":3,"text":"Kunden: Arztpraxen, zwei Steuerbüros, Handwerker, ein Verein","sichtbar":true,"anzahl":30},{"id":"B-11","nr":3,"text":"Mitarbeiter der Kunden, die an den Schulungen teilnehmen","sichtbar":true,"anzahl":1},{"id":"B-12","nr":4,"text":"Wenn ein Kunde fragt „Was haben wir schon gemacht?“, suche ich eine halbe Stunde","sichtbar":true},{"id":"B-13","nr":4,"text":"Die Liste der erlaubten Programme stimmt nach drei Monaten nicht mehr","sichtbar":true},{"id":"B-14","nr":4,"text":"Kein Überblick, wo bei welchem Kunden etwas fällig ist oder fehlt","sichtbar":true},{"id":"B-15","nr":4,"text":"Vorlagen werden für jede Praxis neu kopiert","sichtbar":true},{"id":"B-16","nr":5,"text":"Alles liegt verstreut in Word, Excel und Mails","sichtbar":true},{"id":"B-17","nr":5,"text":"Keiner fühlt sich für die Programm-Liste zuständig, ich auch nicht","sichtbar":true},{"id":"B-18","nr":5,"text":"Es gibt keine Erinnerung an Fristen","sichtbar":true},{"id":"B-19","nr":6,"text":"Ein Blick auf alle Kunden: was erledigt ist, was fällig ist, was fehlt","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":3,"text":"kein Suchen mehr, wenn ein Kunde fragt"},"handeln":"egal"},{"id":"B-20","nr":6,"text":"Teilnahme in der Schulung direkt auf dem Tablet abhaken, auch ohne WLAN","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":2,"text":"keine Excel-Liste mehr nachtragen"},"handeln":"egal"},{"id":"B-21","nr":6,"text":"Ein Nachweisblatt für den Kunden mit Datum, wer was gelernt hat, mit meinem Namen und Logo","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":2,"text":"Blatt nicht mehr von Hand zusammenbauen"},"handeln":"selbst"},{"id":"B-22","nr":6,"text":"Erinnerung, wenn bei einem Kunden ein halbes Jahr um ist","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":1,"text":"nichts mehr vergessen"},"handeln":"vorschlagen"},{"id":"B-23","nr":6,"text":"Liste der erlaubten Programme je Kunde, die aktuell bleibt","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":1,"text":"Fragen schneller beantworten"},"handeln":"vorschlagen"},{"id":"B-24","nr":6,"text":"Eine Vorlage für Arztpraxen einmal gut machen und bei allen Praxen nutzen, ohne sie zu kopieren","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":1,"text":"nicht zehnmal dasselbe pflegen"},"handeln":"egal"},{"id":"B-25","nr":6,"text":"Daten jederzeit herausholen können, je Kunde","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"ich bleibe unabhängig"},"handeln":"selbst"},{"id":"B-26","nr":7,"text":"Auf Nachfrage eines Kunden in wenigen Minuten sagen können, was schon gemacht wurde","sichtbar":true},{"id":"B-27","nr":7,"text":"Pro Kunde etwa eine Stunde im Quartal sparen","sichtbar":true},{"id":"B-28","nr":8,"text":"Das System muss alle Kunden in einer Übersicht zeigen, mit erledigt, fällig und fehlend","sichtbar":true},{"id":"B-29","nr":8,"text":"Das System muss je Kunde die Schulungen mit Datum, Thema und Teilnehmern festhalten","sichtbar":true},{"id":"B-30","nr":8,"text":"Das System muss die Teilnahme auf dem Tablet ohne Internet abhaken lassen","sichtbar":true},{"id":"B-31","nr":8,"text":"Das System muss ein Teilnahmeblatt mit Datum, Inhalten, meinem Namen und Logo zum Drucken bzw. als PDF erstellen","sichtbar":true},{"id":"B-32","nr":8,"text":"Das System muss mich erinnern, wenn bei einem Kunden ein halbes Jahr seit der letzten Schulung um ist","sichtbar":true},{"id":"B-33","nr":8,"text":"Das System muss je Kunde eine Liste erlaubter Programme mit Stand-Datum führen","sichtbar":true},{"id":"B-34","nr":8,"text":"Das System muss Vorlagen (z. B. für Arztpraxen) einmal führen und bei mehreren Kunden verwenden","sichtbar":true},{"id":"B-35","nr":8,"text":"Das System muss die Daten je Kunde getrennt halten und vollständig exportieren können","sichtbar":true},{"id":"B-36","nr":9,"text":"Ich pflege es allein, es muss also schnell gehen","sichtbar":true},{"id":"B-37","nr":10,"text":"Laptop mit Windows, Tablet für unterwegs, Handy","sichtbar":true},{"id":"B-38","nr":10,"text":"In Praxen oft kein WLAN für Gäste","sichtbar":true},{"id":"B-39","nr":11,"text":"Word, Excel, E-Mail","sichtbar":true},{"id":"B-40","nr":13,"text":"Kundenstamm, Schulungen, Teilnehmerlisten, erlaubte Programme, Vorlagen","sichtbar":true},{"id":"B-41","nr":13,"text":"Getrennt je Kunde","sichtbar":true},{"id":"B-42","nr":14,"text":"personenbezogene Daten: ja (Namen der Teilnehmer)","sichtbar":true},{"id":"B-43","nr":14,"text":"Daten der Kunden sollen bei mir bleiben","sichtbar":true},{"id":"B-44","nr":15,"text":"Budget-Rahmen: 50 bis 130 Euro im Monat, wenn ich pro Kunde eine Stunde im Quartal spare","sichtbar":true},{"id":"O-01","nr":18,"text":"Ob die Erinnerung auch aufs Handy kommen soll","sichtbar":true,"wer":"","bis":""},{"id":"O-02","nr":18,"text":"Wie genau „was gelernt“ auf dem Blatt aussehen soll","sichtbar":true,"wer":"","bis":""}],"bausteine":[{"id":"K-01","katalog":"neu","name":"Kundenstamm mit Übersicht aller Kunden (Ampel erledigt/fällig/fehlt), Schulungen je Kunde mit Datum, Thema, Inhalten und Teilnehmern; Daten getrennt je Kunde","menge":1,"groesse":"mittel","faktoren":["offline"],"deckt":["B-19","B-28","B-29","B-12","B-14","B-26","B-40","B-41","B-01","B-02","B-05","B-06","B-09","B-10","B-11","B-16","B-36"],"ermaessigt":false},{"id":"K-02","katalog":"liste","name":"Teilnahme-Abhaken am Tablet während der Schulung (nur teilgenommen ja/nein, keine Bewertung), läuft ohne Internet","menge":1,"groesse":"klein","faktoren":["offline"],"deckt":["B-20","B-30","B-38"],"ermaessigt":false},{"id":"K-03","katalog":"scan","name":"Teilnahmeblatt je Schulung als PDF/Druck: Datum, Teilnehmer, Inhalte, Name und Logo der Beraterin, ohne Einzelbewertung","menge":1,"groesse":"klein","faktoren":["druck"],"deckt":["B-21","B-31","O-02"],"ermaessigt":false},{"id":"K-04","katalog":"kalender","name":"Erinnerung nach sechs Monaten seit der letzten Schulung je Kunde, Fälligkeiten in der Übersicht","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-22","B-32","B-08","B-18","O-01"],"ermaessigt":false},{"id":"K-05","katalog":"liste","name":"Liste erlaubter Programme je Kunde mit Stand-Datum und Hinweis, wenn sie älter als drei Monate ist (nur Dokumentation, keine rechtliche Bewertung)","menge":1,"groesse":"klein","faktoren":["offline"],"deckt":["B-23","B-33","B-04","B-07","B-13","B-17","B-03"],"ermaessigt":false},{"id":"K-06","katalog":"neu","name":"Vorlagen je Branche (z. B. Arztpraxis) einmal pflegen und mehreren Kunden zuordnen, ohne Kopie","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-24","B-34","B-15"],"ermaessigt":false},{"id":"K-07","katalog":"tresor","name":"Lokale Ablage je Kunde getrennt, vollständiger Export je Kunde und Sicherung auf Knopfdruck in eigenen Ordner","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-25","B-35","B-41","B-42","B-43"],"ermaessigt":false},{"id":"K-08","katalog":"plattform","name":"Fassung für Windows-Laptop, Android-Tablet und Handy","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-37","B-39"],"ermaessigt":false}],"rahmen":{"geraete":["windows","tablet","android"],"offline":"unterwegs","eigene":[],"eigeneText":"","datenort":["geraet","ordner"],"sicherung":["selbst"]},"nicht":[{"id":"N-01","text":"keine Noten oder Bewertungen einzelner Mitarbeiter an den Chef","sichtbar":true},{"id":"N-02","text":"keine Rechtsgutachten, und das Programm soll nicht so tun, als ob","sichtbar":true},{"id":"N-03","text":"keine Kundendaten bei fremden Anbietern","sichtbar":true}]}
```
