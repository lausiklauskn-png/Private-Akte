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

**Vorhaben:** Nebenkostenabrechnungen vor dem Versand prüfen

**Gesamtauftrag:** keine frühere Fassung in diesem Auftrag — alles unter „Zu tun“ ist neu zu bauen. Das Datum der Fassung steht im Kopf (`fassungsdatum`), `datum` ist der Tag der Erzeugung.

## Rahmen
- Geräte: Windows-PC
- Ohne Internet: ja, immer
- Daten liegen: nur auf dem Gerät, eigener Ordner / Speicherkarte
- Eigene Programme: gemeinsamer Ablageort; PDFs liegen auf unserem Büro-Laufwerk
- Schlägt vor, der Kunde bestätigt: B-17, B-18, B-19, B-20, B-21, B-22
- Nicht bauen: N-01 Die Abrechnung nicht umschreiben oder verändern · N-02 Nichts selbst verschicken · N-03 Keine Rechtsberatung, nur Hinweise · N-04 Keine Daten in eine fremde Cloud · N-05 Keine Daten an eine KI geben

## Zu tun (für die Sitzung)
| Aktion | Kennung | Was | Größe | Stunden (Schätzung) | deckt Bedarf |
|---|---|---|---|---|---|
| NEU BAUEN | K-01 | Abrechnungs-PDFs vom Büro-Laufwerk einlesen (ganzer Ordner eines Jahres, Textebene, nur lesend, Original unverändert) | mittel | 3,5–5,5 | B-27, B-22, B-34, B-42, B-38 |
| NEU BAUEN | K-02 | Prüfregeln Nebenkosten: nicht umlagefähige Positionen, Verteilerschlüssel-Summe, Abrechnungszeitraum und Abrechnungsfrist; Ergebnis rot/gelb/„bitte prüfen“, nie grün bei Unsicherheit, Hinweis statt Rechtsrat | groß | 57,5–115 | B-17, B-19, B-28, B-29, B-30 |
| NEU BAUEN | K-03 | Sonderregeln je Mietvertrag/Objekt hinterlegen (abweichende Umlage), die die Prüfregeln überschreiben | mittel | 27,6–50,6 | B-20, B-32, B-45 |
| NEU BAUEN | K-04 | Vorjahresvergleich je Einheit und Position mit Ausreißer-Markierung (Vorjahres-PDFs aus demselben Ordner) | mittel | 27,6–50,6 | B-21, B-33, B-44 |
| NEU BAUEN | K-05 | Befundliste je Abrechnung und Gesamtübersicht: rot/gelb/„bitte prüfen“ mit Seite und Zeile der Fundstelle, abhaken durch die Buchhalterin, als PDF druckbar | mittel | 5,3–9,2 | B-18, B-31, B-35 |
| NEU BAUEN | K-06 | Windows-App für die Büro-PCs, alle Daten nur lokal/auf dem Laufwerk, keine Cloud, keine KI | klein | 4–7 | B-37, B-47 |
| NEU BAUEN | K-07 | Freischaltung: Bestandslizenz Verwaltung und günstige Kleinlizenz für bis zu zwei Wohnungen | klein | 4–8 | B-23 |

### Je Baustein: Vorlage und Abnahme
- K-01 · Vorlage Auslieferungsprüfer (70 % wiederverwendet) · Faktoren Offline ×1,15
  - Abnahme B-27: Das System muss die fertigen Abrechnungen als PDF vom Laufwerk lesen können.
  - Abnahme B-34: Das System muss die Abrechnung unverändert lassen und darf nichts selbst verschicken.
- K-02 · Faktoren Offline ×1,15
  - Abnahme B-28: Das System muss Positionen erkennen, die nicht umgelegt werden dürfen.
  - Abnahme B-29: Das System muss prüfen, ob Verteilerschlüssel aufgehen.
  - Abnahme B-30: Das System muss prüfen, ob Abrechnungszeitraum und Fristen stimmen.
- K-03 · Faktoren Offline ×1,15
  - Abnahme B-32: Das System muss abweichende Umlage-Regeln je Mietvertrag hinterlegen können.
- K-04 · Faktoren Offline ×1,15
  - Abnahme B-33: Das System muss die Abrechnung mit dem Vorjahr vergleichen können.
- K-05 · Vorlage Küchenzettel (60 % wiederverwendet) · Faktoren Offline ×1,15, Druck / PDF ×1,1, Mehrere Nutzer ×1,3
  - Abnahme B-31: Das System muss je Abrechnung eine Liste mit Rot, Gelb und „bitte prüfen“ zeigen und die Fundstelle nennen.
- K-06 · Vorlage Familienakte, BookLedgerPro, Workflow PDF Pro (Android-Hülle, Windows-Hülle) (50 % wiederverwendet)

## Bedarfsprotokoll – Änderungen
- NEU B-01 [Bereich 1]: „Unser Verwaltungsprogramm erzeugt jedes Jahr ein paar hundert Nebenkostenabrechnungen als PDF, die liegen auf unserem Laufwerk.“
- NEU B-02 [Bereich 1]: „Vor dem Versand schaut die Buchhalterin noch einmal drüber und vergleicht in Excel mit dem Vorjahr – bei rund 600 Einheiten nur stichprobenhaft.“
- NEU B-03 [Bereich 1]: „Nach dem Versand kommen Widersprüche, Mietervereine und Anfragen auf Belegeinsicht.“
- NEU B-04 [Bereich 2]: „Nebenkostenabrechnung (Betriebskosten) vor dem Versand an die Mieter“
- NEU B-05 [Bereich 2]: „Bearbeitung von Widersprüchen und Belegeinsicht nach dem Versand“
- NEU B-06 [Bereich 3]: „Inhaber (Verwalter)“
- NEU B-07 [Bereich 3]: „Buchhalterin“
- NEU B-08 [Bereich 3]: „Mitarbeiter in der Verwaltung“
- NEU B-09 [Bereich 3]: „Mieter und Eigentümer als Empfänger der Abrechnung“
- NEU B-10 [Bereich 4]: „Fehler fallen oft erst beim Mieter oder Mieterverein auf: Positionen, die man nicht umlegen darf, Schlüssel, die nicht aufgehen, falsche Zeiträume.“
- NEU B-11 [Bereich 4]: „Ist die Frist vorbei, ist die Nachzahlung weg – echtes Geld für die Eigentümer und Ärger für uns.“
- NEU B-12 [Bereich 4]: „Prüfen geht nur stichprobenhaft, weil es zu viele Abrechnungen sind.“
- NEU B-13 [Bereich 4]: „Abweichende Umlage-Regeln in einzelnen Mietverträgen gehen leicht unter.“
- NEU B-14 [Bereich 5]: „Das Verwaltungsprogramm prüft die eigenen Abrechnungen nicht gegen.“
- NEU B-15 [Bereich 5]: „Das Verwaltungsprogramm lässt sich kaum mit anderen Programmen verbinden.“
- NEU B-16 [Bereich 5]: „Der Vergleich mit dem Vorjahr läuft von Hand in Excel.“
- NEU B-17 [Bereich 6]: „Jede fertige Abrechnung vor dem Versand so lesen lassen, wie ein Mieterverein sie lesen würde“ (Muss, Nutzen: 10 h/Monat, Fehler vor dem Versand finden statt nach dem Widerspruch)
- NEU B-18 [Bereich 6]: „Eine Liste mit Rot und Gelb, und genau wo in der Abrechnung es steht“ (Muss, Nutzen: 4 h/Monat, schnell sehen, wo man nachschauen muss)
- NEU B-19 [Bereich 6]: „Wenn sich etwas nicht sicher sagen lässt: „bitte prüfen“ statt grün“ (Muss, Nutzen: keine falsche Sicherheit)
- NEU B-20 [Bereich 6]: „Abweichende Umlage-Regeln aus einzelnen Mietverträgen berücksichtigen können“ (Muss, Nutzen: 2 h/Monat, keine Fehlalarme und keine übersehenen Sonderfälle)
- NEU B-21 [Bereich 6]: „Vergleich mit dem Vorjahr, damit Ausreißer auffallen“ (Soll, Nutzen: 4 h/Monat, ersetzt den Excel-Vergleich der Buchhalterin)
- NEU B-22 [Bereich 6]: „Alle Abrechnungen eines Jahres auf einmal prüfen, nicht nur Stichproben“ (Soll, Nutzen: 6 h/Monat, ganzer Bestand statt Stichprobe)
- NEU B-23 [Bereich 6]: „Günstige Fassung für meine zwei eigenen Wohnungen“ (Kann, Nutzen: privat dasselbe Werkzeug nutzen)
- NEU B-24 [Bereich 7]: „Fehler in den Abrechnungen werden vor dem Versand gefunden, nicht erst nach Widerspruch.“
- NEU B-25 [Bereich 7]: „Nachzahlungen gehen nicht mehr durch verpasste Fristen oder angreifbare Abrechnungen verloren.“
- NEU B-26 [Bereich 7]: „Die Buchhalterin muss nicht mehr stichprobenhaft in Excel vergleichen.“
- NEU B-27 [Bereich 8]: „Das System muss die fertigen Abrechnungen als PDF vom Laufwerk lesen können.“
- NEU B-28 [Bereich 8]: „Das System muss Positionen erkennen, die nicht umgelegt werden dürfen.“
- NEU B-29 [Bereich 8]: „Das System muss prüfen, ob Verteilerschlüssel aufgehen.“
- NEU B-30 [Bereich 8]: „Das System muss prüfen, ob Abrechnungszeitraum und Fristen stimmen.“
- NEU B-31 [Bereich 8]: „Das System muss je Abrechnung eine Liste mit Rot, Gelb und „bitte prüfen“ zeigen und die Fundstelle nennen.“
- NEU B-32 [Bereich 8]: „Das System muss abweichende Umlage-Regeln je Mietvertrag hinterlegen können.“
- NEU B-33 [Bereich 8]: „Das System muss die Abrechnung mit dem Vorjahr vergleichen können.“
- NEU B-34 [Bereich 8]: „Das System muss die Abrechnung unverändert lassen und darf nichts selbst verschicken.“
- NEU B-35 [Bereich 9]: „Die Buchhalterin prüft die Liste vor dem Versand, die Entscheidung trifft der Verwalter.“
- NEU B-36 [Bereich 9]: „Kurze Einweisung für uns drei.“
- NEU B-37 [Bereich 10]: „Läuft auf den Windows-PCs im Büro.“
- NEU B-38 [Bereich 10]: „Zugriff auf unser gemeinsames Laufwerk.“
- NEU B-39 [Bereich 11]: „Unser Hausverwaltungsprogramm (erzeugt die Abrechnungen)“
- NEU B-40 [Bereich 11]: „Excel“
- NEU B-41 [Bereich 11]: „Gemeinsames Laufwerk im Büro“
- NEU B-42 [Bereich 12]: „Die PDFs aus dem Verwaltungsprogramm vom Laufwerk lesen; eine direkte Verbindung zum Programm gibt es kaum.“
- NEU B-43 [Bereich 13]: „Nebenkostenabrechnungen als PDF, rund 600 Einheiten im Jahr“
- NEU B-44 [Bereich 13]: „Vorjahresabrechnungen zum Vergleich“
- NEU B-45 [Bereich 13]: „Besondere Umlage-Regeln aus Mietverträgen“
- NEU B-46 [Bereich 14]: „personenbezogene Daten: ja“
- NEU B-47 [Bereich 14]: „Mieternamen und Abrechnungen dürfen nicht in eine fremde Cloud und nicht an eine KI.“
- NEU B-48 [Bereich 15]: „Budget-Rahmen: ein paar hundert Euro im Jahr für den ganzen Bestand“
- NEU B-49 [Bereich 15]: „Für die zwei eigenen Wohnungen höchstens 30 bis 40 Euro im Jahr“
- NEU B-50 [Bereich 15]: „Hinweise, keine Rechtsberatung“
- NEU O-01 [Bereich 18]: „Welche Prüfregeln genau gelten (z. B. was nicht umlagefähig ist) – mit wem abstimmen?“
- NEU O-02 [Bereich 18]: „Wie kommen die Vorjahreswerte hinein, wenn das Verwaltungsprogramm nichts ausgibt?“

## Offene Punkte
- O-01: Welche Prüfregeln genau gelten (z. B. was nicht umlagefähig ist) – mit wem abstimmen?
- O-02: Wie kommen die Vorjahreswerte hinein, wenn das Verwaltungsprogramm nichts ausgibt?

## Summe
Stunden F1 177,4–340,1 · Kosten-Nutzen: Grenzlinie keine

Die Summe enthält zusätzlich zu den Zeilen: Anpassung an den Betrieb 2–6 h, Abstimmung 15 % (19,7–37,8 h), Puffer 20 % (26,3–50,4 h).

## Erklärungen und Sterne
- Verschwiegenheitserklärung aktiviert: nein · Vereinbarung Zahlung/Rechte aktiviert: nein · Wartungsvertrag aktiviert: nein
- Sterne der Mitarbeiter: noch keine

## Vollständiger Stand (zum Einlesen)
```json
{"bedarf":[{"id":"B-01","nr":1,"text":"Unser Verwaltungsprogramm erzeugt jedes Jahr ein paar hundert Nebenkostenabrechnungen als PDF, die liegen auf unserem Laufwerk.","sichtbar":true},{"id":"B-02","nr":1,"text":"Vor dem Versand schaut die Buchhalterin noch einmal drüber und vergleicht in Excel mit dem Vorjahr – bei rund 600 Einheiten nur stichprobenhaft.","sichtbar":true},{"id":"B-03","nr":1,"text":"Nach dem Versand kommen Widersprüche, Mietervereine und Anfragen auf Belegeinsicht.","sichtbar":true},{"id":"B-04","nr":2,"text":"Nebenkostenabrechnung (Betriebskosten) vor dem Versand an die Mieter","sichtbar":true},{"id":"B-05","nr":2,"text":"Bearbeitung von Widersprüchen und Belegeinsicht nach dem Versand","sichtbar":true},{"id":"B-06","nr":3,"text":"Inhaber (Verwalter)","sichtbar":true,"anzahl":1},{"id":"B-07","nr":3,"text":"Buchhalterin","sichtbar":true,"anzahl":1},{"id":"B-08","nr":3,"text":"Mitarbeiter in der Verwaltung","sichtbar":true,"anzahl":1},{"id":"B-09","nr":3,"text":"Mieter und Eigentümer als Empfänger der Abrechnung","sichtbar":true,"anzahl":1},{"id":"B-10","nr":4,"text":"Fehler fallen oft erst beim Mieter oder Mieterverein auf: Positionen, die man nicht umlegen darf, Schlüssel, die nicht aufgehen, falsche Zeiträume.","sichtbar":true},{"id":"B-11","nr":4,"text":"Ist die Frist vorbei, ist die Nachzahlung weg – echtes Geld für die Eigentümer und Ärger für uns.","sichtbar":true},{"id":"B-12","nr":4,"text":"Prüfen geht nur stichprobenhaft, weil es zu viele Abrechnungen sind.","sichtbar":true},{"id":"B-13","nr":4,"text":"Abweichende Umlage-Regeln in einzelnen Mietverträgen gehen leicht unter.","sichtbar":true},{"id":"B-14","nr":5,"text":"Das Verwaltungsprogramm prüft die eigenen Abrechnungen nicht gegen.","sichtbar":true},{"id":"B-15","nr":5,"text":"Das Verwaltungsprogramm lässt sich kaum mit anderen Programmen verbinden.","sichtbar":true},{"id":"B-16","nr":5,"text":"Der Vergleich mit dem Vorjahr läuft von Hand in Excel.","sichtbar":true},{"id":"B-17","nr":6,"text":"Jede fertige Abrechnung vor dem Versand so lesen lassen, wie ein Mieterverein sie lesen würde","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":10,"text":"Fehler vor dem Versand finden statt nach dem Widerspruch"},"handeln":"vorschlagen"},{"id":"B-18","nr":6,"text":"Eine Liste mit Rot und Gelb, und genau wo in der Abrechnung es steht","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":4,"text":"schnell sehen, wo man nachschauen muss"},"handeln":"vorschlagen"},{"id":"B-19","nr":6,"text":"Wenn sich etwas nicht sicher sagen lässt: „bitte prüfen“ statt grün","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"keine falsche Sicherheit"},"handeln":"vorschlagen"},{"id":"B-20","nr":6,"text":"Abweichende Umlage-Regeln aus einzelnen Mietverträgen berücksichtigen können","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":2,"text":"keine Fehlalarme und keine übersehenen Sonderfälle"},"handeln":"vorschlagen"},{"id":"B-21","nr":6,"text":"Vergleich mit dem Vorjahr, damit Ausreißer auffallen","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":4,"text":"ersetzt den Excel-Vergleich der Buchhalterin"},"handeln":"vorschlagen"},{"id":"B-22","nr":6,"text":"Alle Abrechnungen eines Jahres auf einmal prüfen, nicht nur Stichproben","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":6,"text":"ganzer Bestand statt Stichprobe"},"handeln":"vorschlagen"},{"id":"B-23","nr":6,"text":"Günstige Fassung für meine zwei eigenen Wohnungen","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":null,"text":"privat dasselbe Werkzeug nutzen"},"handeln":"egal"},{"id":"B-24","nr":7,"text":"Fehler in den Abrechnungen werden vor dem Versand gefunden, nicht erst nach Widerspruch.","sichtbar":true},{"id":"B-25","nr":7,"text":"Nachzahlungen gehen nicht mehr durch verpasste Fristen oder angreifbare Abrechnungen verloren.","sichtbar":true},{"id":"B-26","nr":7,"text":"Die Buchhalterin muss nicht mehr stichprobenhaft in Excel vergleichen.","sichtbar":true},{"id":"B-27","nr":8,"text":"Das System muss die fertigen Abrechnungen als PDF vom Laufwerk lesen können.","sichtbar":true},{"id":"B-28","nr":8,"text":"Das System muss Positionen erkennen, die nicht umgelegt werden dürfen.","sichtbar":true},{"id":"B-29","nr":8,"text":"Das System muss prüfen, ob Verteilerschlüssel aufgehen.","sichtbar":true},{"id":"B-30","nr":8,"text":"Das System muss prüfen, ob Abrechnungszeitraum und Fristen stimmen.","sichtbar":true},{"id":"B-31","nr":8,"text":"Das System muss je Abrechnung eine Liste mit Rot, Gelb und „bitte prüfen“ zeigen und die Fundstelle nennen.","sichtbar":true},{"id":"B-32","nr":8,"text":"Das System muss abweichende Umlage-Regeln je Mietvertrag hinterlegen können.","sichtbar":true},{"id":"B-33","nr":8,"text":"Das System muss die Abrechnung mit dem Vorjahr vergleichen können.","sichtbar":true},{"id":"B-34","nr":8,"text":"Das System muss die Abrechnung unverändert lassen und darf nichts selbst verschicken.","sichtbar":true},{"id":"B-35","nr":9,"text":"Die Buchhalterin prüft die Liste vor dem Versand, die Entscheidung trifft der Verwalter.","sichtbar":true},{"id":"B-36","nr":9,"text":"Kurze Einweisung für uns drei.","sichtbar":true},{"id":"B-37","nr":10,"text":"Läuft auf den Windows-PCs im Büro.","sichtbar":true},{"id":"B-38","nr":10,"text":"Zugriff auf unser gemeinsames Laufwerk.","sichtbar":true},{"id":"B-39","nr":11,"text":"Unser Hausverwaltungsprogramm (erzeugt die Abrechnungen)","sichtbar":true},{"id":"B-40","nr":11,"text":"Excel","sichtbar":true},{"id":"B-41","nr":11,"text":"Gemeinsames Laufwerk im Büro","sichtbar":true},{"id":"B-42","nr":12,"text":"Die PDFs aus dem Verwaltungsprogramm vom Laufwerk lesen; eine direkte Verbindung zum Programm gibt es kaum.","sichtbar":true},{"id":"B-43","nr":13,"text":"Nebenkostenabrechnungen als PDF, rund 600 Einheiten im Jahr","sichtbar":true},{"id":"B-44","nr":13,"text":"Vorjahresabrechnungen zum Vergleich","sichtbar":true},{"id":"B-45","nr":13,"text":"Besondere Umlage-Regeln aus Mietverträgen","sichtbar":true},{"id":"B-46","nr":14,"text":"personenbezogene Daten: ja","sichtbar":true},{"id":"B-47","nr":14,"text":"Mieternamen und Abrechnungen dürfen nicht in eine fremde Cloud und nicht an eine KI.","sichtbar":true},{"id":"B-48","nr":15,"text":"Budget-Rahmen: ein paar hundert Euro im Jahr für den ganzen Bestand","sichtbar":true},{"id":"B-49","nr":15,"text":"Für die zwei eigenen Wohnungen höchstens 30 bis 40 Euro im Jahr","sichtbar":true},{"id":"B-50","nr":15,"text":"Hinweise, keine Rechtsberatung","sichtbar":true},{"id":"O-01","nr":18,"text":"Welche Prüfregeln genau gelten (z. B. was nicht umlagefähig ist) – mit wem abstimmen?","sichtbar":true,"wer":"","bis":""},{"id":"O-02","nr":18,"text":"Wie kommen die Vorjahreswerte hinein, wenn das Verwaltungsprogramm nichts ausgibt?","sichtbar":true,"wer":"","bis":""}],"bausteine":[{"id":"K-01","katalog":"dateipruef","name":"Abrechnungs-PDFs vom Büro-Laufwerk einlesen (ganzer Ordner eines Jahres, Textebene, nur lesend, Original unverändert)","menge":1,"groesse":"mittel","faktoren":["offline"],"deckt":["B-27","B-22","B-34","B-42","B-38"],"ermaessigt":false},{"id":"K-02","katalog":"neu","name":"Prüfregeln Nebenkosten: nicht umlagefähige Positionen, Verteilerschlüssel-Summe, Abrechnungszeitraum und Abrechnungsfrist; Ergebnis rot/gelb/„bitte prüfen“, nie grün bei Unsicherheit, Hinweis statt Rechtsrat","menge":1,"groesse":"gross","faktoren":["offline"],"deckt":["B-17","B-19","B-28","B-29","B-30"],"ermaessigt":false},{"id":"K-03","katalog":"neu","name":"Sonderregeln je Mietvertrag/Objekt hinterlegen (abweichende Umlage), die die Prüfregeln überschreiben","menge":1,"groesse":"mittel","faktoren":["offline"],"deckt":["B-20","B-32","B-45"],"ermaessigt":false},{"id":"K-04","katalog":"neu","name":"Vorjahresvergleich je Einheit und Position mit Ausreißer-Markierung (Vorjahres-PDFs aus demselben Ordner)","menge":1,"groesse":"mittel","faktoren":["offline"],"deckt":["B-21","B-33","B-44"],"ermaessigt":false},{"id":"K-05","katalog":"liste","name":"Befundliste je Abrechnung und Gesamtübersicht: rot/gelb/„bitte prüfen“ mit Seite und Zeile der Fundstelle, abhaken durch die Buchhalterin, als PDF druckbar","menge":1,"groesse":"mittel","faktoren":["offline","druck","nutzer"],"deckt":["B-18","B-31","B-35"],"ermaessigt":false},{"id":"K-06","katalog":"plattform","name":"Windows-App für die Büro-PCs, alle Daten nur lokal/auf dem Laufwerk, keine Cloud, keine KI","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-37","B-47"],"ermaessigt":false},{"id":"K-07","katalog":"lizenz","name":"Freischaltung: Bestandslizenz Verwaltung und günstige Kleinlizenz für bis zu zwei Wohnungen","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-23"],"ermaessigt":false}],"rahmen":{"geraete":["windows"],"offline":"immer","eigene":["ablageort"],"eigeneText":"PDFs liegen auf unserem Büro-Laufwerk","datenort":["geraet","ordner"],"sicherung":[]},"nicht":[{"id":"N-01","text":"Die Abrechnung nicht umschreiben oder verändern","sichtbar":true},{"id":"N-02","text":"Nichts selbst verschicken","sichtbar":true},{"id":"N-03","text":"Keine Rechtsberatung, nur Hinweise","sichtbar":true},{"id":"N-04","text":"Keine Daten in eine fremde Cloud","sichtbar":true},{"id":"N-05","text":"Keine Daten an eine KI geben","sichtbar":true}]}
```
