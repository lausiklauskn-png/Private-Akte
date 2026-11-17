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

**Vorhaben:** Wareneinsatz jede Woche im Blick, Küche und Getränke getrennt

**Gesamtauftrag:** keine frühere Fassung in diesem Auftrag — alles unter „Zu tun“ ist neu zu bauen. Das Datum der Fassung steht im Kopf (`fassungsdatum`), `datum` ist der Tag der Erzeugung.

## Rahmen
- Geräte: Android-Handy, Windows-PC
- Ohne Internet: nein
- Daten liegen: nur auf dem Gerät, eigener Ordner / Speicherkarte
- Sicherung: verschlüsselt, von allein
- Schlägt vor, der Kunde bestätigt: B-18, B-19
- Darf selbst handeln: B-17, B-20
- Nicht bauen: N-01 Keine neue Kasse · N-02 Keine Buchhaltung · N-03 Kein Bestellsystem · N-04 Keine monatliche Inventur · N-05 Keine Rezepturen aufs Gramm genau · N-06 Einkaufspreise und Umsätze nicht an Dritte weitergeben oder verkaufen

## Zu tun (für die Sitzung)
| Aktion | Kennung | Was | Größe | Stunden (Schätzung) | deckt Bedarf |
|---|---|---|---|---|---|
| NEU BAUEN | K-01 | Beleg-Erfassung: Lieferscheine/Rechnungen per Handyfoto mit Texterkennung, Positionen (Artikel, Menge, Preis, Lieferant) auslesen | groß | 9–15 | B-19, B-25, B-01, B-05, B-24, B-32, B-34 |
| NEU BAUEN | K-02 | Rechnungs-Anhänge aus dem Mail-Postfach abholen und der Beleg-Erfassung übergeben | klein | 4,8–8,4 | B-19, B-25, B-39 |
| NEU BAUEN | K-03 | Prüfschritt: unsicher gelesene Felder markieren und den Inhaber nachfragen lassen; Teillieferungen dem Lieferschein zuordnen, Gutschriften verrechnen | mittel | 24–44 | B-26, B-27, B-13 |
| NEU BAUEN | K-04 | Artikel- und Preisstamm: Einkaufspreis je Artikel und Lieferant mit Verlauf, Artikel Küche oder Getränke zugeordnet (ohne Bestand/Inventur) | mittel | 18–30 | B-28, B-15, B-40 |
| NEU BAUEN | K-05 | Preiswarnung: Meldung, wenn ein Artikel gegenüber dem letzten bzw. gleitenden Preis deutlich teurer wird (Schwelle einstellbar) | klein | 10–20 | B-18, B-29, B-11, B-23 |
| NEU BAUEN | K-06 | Import des Kassen-Exports (CSV/DSFinV-K), Umsatz je Tag/Woche, getrennt nach Küche und Getränke | mittel | 14–26 | B-20, B-30, B-03, B-36, B-38, B-41 |
| NEU BAUEN | K-07 | Wochenbericht Wareneinsatz in Prozent vom Umsatz, Küche und Getränke getrennt, mit Verlauf über die Wochen | mittel | 24–44 | B-17, B-31, B-22, B-06, B-10, B-02, B-14 |
| NEU BAUEN | K-08 | Grobe Tellerkalkulation für 5–6 Hauptgerichte (Zutaten grob, Preise aus dem Preisstamm) | klein | 1,2–2,4 | B-21, B-12 |
| NEU BAUEN | K-09 | Android-App zum Fotografieren und Windows-Fassung fürs Büro | mittel | 8–14 | B-34, B-35 |
| NEU BAUEN | K-10 | Verschlüsselte Ablage der Belege und Zahlen auf dem Gerät mit automatischer Sicherung, keine Weitergabe an Dritte | klein | 4–7 | B-43, B-42 |

### Je Baustein: Vorlage und Abnahme
- K-01 · Vorlage Workflow PDF (70 % wiederverwendet) · Faktoren KI ×1,25
  - Abnahme B-25: Das System muss Lieferscheine und Rechnungen per Foto oder aus Mail-Anhängen einlesen
- K-02 · Vorlage Private Brain Pro, Familienakte (E-Mail-Wege) (40 % wiederverwendet)
  - Abnahme B-25: Das System muss Lieferscheine und Rechnungen per Foto oder aus Mail-Anhängen einlesen
- K-03
  - Abnahme B-26: Das System muss bei unsicher gelesenen Belegen nachfragen statt zu raten
  - Abnahme B-27: Das System muss Teillieferungen und Gutschriften richtig verrechnen
- K-04 · Vorlage Alis-Moderaum (Warenwirtschaft) (40 % wiederverwendet)
  - Abnahme B-28: Das System muss Einkaufspreise je Artikel und Lieferant über die Zeit merken
- K-05
  - Abnahme B-29: Das System muss warnen, wenn ein Artikel deutlich teurer wird als zuletzt
- K-06
  - Abnahme B-30: Das System muss den Umsatz aus der Kasse übernehmen, Küche und Getränke getrennt
- K-07
  - Abnahme B-31: Das System muss jede Woche den Wareneinsatz in Prozent vom Umsatz zeigen, Küche und Getränke getrennt
- K-08 · Vorlage Küchenzettel (60 % wiederverwendet)
- K-09 · Vorlage Familienakte, BookLedgerPro, Workflow PDF Pro (Android-Hülle, Windows-Hülle) (50 % wiederverwendet)
- K-10 · Vorlage Pro-Tresor (Workflow PDF Pro), Vollsicherung der Familienakte (50 % wiederverwendet)

## Bedarfsprotokoll – Änderungen
- NEU B-01 [Bereich 1]: „Lieferscheine und Rechnungen liegen in einer Kiste, manche kommen per Mail“
- NEU B-02 [Bereich 1]: „Den Wareneinsatz erfahre ich erst vom Steuerberater, Wochen später“
- NEU B-03 [Bereich 1]: „Umsatz steckt in der Kasse, die Daten kann ich dort herausholen“
- NEU B-04 [Bereich 2]: „Wareneinkauf bei den Lieferanten“
- NEU B-05 [Bereich 2]: „Lieferscheine und Rechnungen sammeln und prüfen“
- NEU B-06 [Bereich 2]: „Wareneinsatz im Verhältnis zum Umsatz überwachen“
- NEU B-07 [Bereich 3]: „Inhaber“
- NEU B-08 [Bereich 3]: „Köche (sollen möglichst nichts zusätzlich eintragen müssen)“
- NEU B-09 [Bereich 3]: „Steuerberater (liefert heute die Zahlen, spät)“
- NEU B-10 [Bereich 4]: „Ich sehe zu spät, was mich die Ware kostet“
- NEU B-11 [Bereich 4]: „Preiserhöhungen der Lieferanten kommen in kleinen Schritten und fallen nicht auf – beim Fleisch war die Marge weg“
- NEU B-12 [Bereich 4]: „Ich vermute größere Portionen und Schwund, kann aber nichts beweisen“
- NEU B-13 [Bereich 4]: „Belege sind durcheinander: handschriftlich, Teillieferungen, Gutschriften“
- NEU B-14 [Bereich 5]: „Belege werden nicht zeitnah ausgewertet, nur am Ende vom Steuerberater“
- NEU B-15 [Bereich 5]: „Keine Übersicht über Einkaufspreise je Artikel und Lieferant“
- NEU B-16 [Bereich 5]: „Rezeptprogramme verlangen alles aufs Gramm, dafür fehlt die Zeit“
- NEU B-17 [Bereich 6]: „Jede Woche sehen, wie viel Prozent vom Umsatz für Ware draufgeht, Küche und Getränke getrennt“ (Muss, Nutzen: 4 h/Monat, Ich merke früh, wenn der Wareneinsatz aus dem Ruder läuft, nicht erst Wochen später)
- NEU B-18 [Bereich 6]: „Warnung, wenn ein Artikel bei einem Lieferanten deutlich teurer wird“ (Muss, Nutzen: Schleichende Preiserhöhungen fallen sofort auf, die Marge bleibt)
- NEU B-19 [Bereich 6]: „Lieferscheine und Rechnungen aus Papier und Mail einlesen, ohne alles abzutippen“ (Muss, Nutzen: 3 h/Monat, Keine Zettelwirtschaft mehr in der Kiste)
- NEU B-20 [Bereich 6]: „Umsatz aus der Kasse übernehmen“ (Muss, Nutzen: 1 h/Monat, Umsatz muss ich nicht von Hand eintragen)
- NEU B-21 [Bereich 6]: „Für fünf, sechs Hauptgerichte grob eintragen, was drin ist, und sehen, was ein Teller kostet“ (Kann, Nutzen: Ein Gefühl dafür, ob Portionen oder Schwund das Problem sind)
- NEU B-22 [Bereich 7]: „Jeden Montag eine Zahl: Wareneinsatz in Prozent, Küche und Getränke getrennt“
- NEU B-23 [Bereich 7]: „Preissprünge bei Lieferanten fallen sofort auf“
- NEU B-24 [Bereich 7]: „Belege sind erfasst, ohne großen Aufwand“
- NEU B-25 [Bereich 8]: „Das System muss Lieferscheine und Rechnungen per Foto oder aus Mail-Anhängen einlesen“
- NEU B-26 [Bereich 8]: „Das System muss bei unsicher gelesenen Belegen nachfragen statt zu raten“
- NEU B-27 [Bereich 8]: „Das System muss Teillieferungen und Gutschriften richtig verrechnen“
- NEU B-28 [Bereich 8]: „Das System muss Einkaufspreise je Artikel und Lieferant über die Zeit merken“
- NEU B-29 [Bereich 8]: „Das System muss warnen, wenn ein Artikel deutlich teurer wird als zuletzt“
- NEU B-30 [Bereich 8]: „Das System muss den Umsatz aus der Kasse übernehmen, Küche und Getränke getrennt“
- NEU B-31 [Bereich 8]: „Das System muss jede Woche den Wareneinsatz in Prozent vom Umsatz zeigen, Küche und Getränke getrennt“
- NEU B-32 [Bereich 9]: „Belege landen künftig sofort im Programm statt in der Kiste“
- NEU B-33 [Bereich 9]: „Die Köche sollen nichts Zusätzliches eintragen müssen“
- NEU B-34 [Bereich 10]: „Android-Handy zum Fotografieren der Lieferscheine“
- NEU B-35 [Bereich 10]: „Alter Windows-PC im Büro“
- NEU B-36 [Bereich 11]: „Kassensystem, aus dem man die Umsatzdaten exportieren kann“
- NEU B-37 [Bereich 11]: „Steuerberater macht die Buchhaltung“
- NEU B-38 [Bereich 12]: „Export der Kassendaten einlesen“
- NEU B-39 [Bereich 12]: „Rechnungen aus dem Mail-Postfach“
- NEU B-40 [Bereich 13]: „Einkaufspreise, Lieferanten, Mengen“
- NEU B-41 [Bereich 13]: „Umsätze aus der Kasse“
- NEU B-42 [Bereich 14]: „personenbezogene Daten: nein“
- NEU B-43 [Bereich 14]: „Einkaufspreise und Umsätze sind vertraulich und dürfen nicht weitergegeben oder verkauft werden“
- NEU B-44 [Bereich 15]: „Budget-Rahmen: um die 50 Euro im Monat, wenn am Anfang sichtbar ist, dass es etwas bringt“
- NEU B-45 [Bereich 15]: „Muss mit wenig Zeitaufwand laufen“
- NEU O-01 [Bereich 18]: „Welches Kassensystem genau und in welchem Format der Export kommt“
- NEU O-02 [Bereich 18]: „Wie Küche und Getränke in den Kassendaten getrennt sind“

## Offene Punkte
- O-01: Welches Kassensystem genau und in welchem Format der Export kommt (klärt Kunde)
- O-02: Wie Küche und Getränke in den Kassendaten getrennt sind (klärt Kunde)

## Summe
Stunden F1 160,7–292,7 · Kosten-Nutzen: Grenzlinie keine

Die Summe enthält zusätzlich zu den Zeilen: Anpassung an den Betrieb 2–6 h, Abstimmung 15 % (17,9–32,5 h), Puffer 20 % (23,8–43,4 h).

## Erklärungen und Sterne
- Verschwiegenheitserklärung aktiviert: nein · Vereinbarung Zahlung/Rechte aktiviert: nein · Wartungsvertrag aktiviert: nein
- Sterne der Mitarbeiter: noch keine

## Vollständiger Stand (zum Einlesen)
```json
{"bedarf":[{"id":"B-01","nr":1,"text":"Lieferscheine und Rechnungen liegen in einer Kiste, manche kommen per Mail","sichtbar":true},{"id":"B-02","nr":1,"text":"Den Wareneinsatz erfahre ich erst vom Steuerberater, Wochen später","sichtbar":true},{"id":"B-03","nr":1,"text":"Umsatz steckt in der Kasse, die Daten kann ich dort herausholen","sichtbar":true},{"id":"B-04","nr":2,"text":"Wareneinkauf bei den Lieferanten","sichtbar":true},{"id":"B-05","nr":2,"text":"Lieferscheine und Rechnungen sammeln und prüfen","sichtbar":true},{"id":"B-06","nr":2,"text":"Wareneinsatz im Verhältnis zum Umsatz überwachen","sichtbar":true},{"id":"B-07","nr":3,"text":"Inhaber","sichtbar":true,"anzahl":1},{"id":"B-08","nr":3,"text":"Köche (sollen möglichst nichts zusätzlich eintragen müssen)","sichtbar":true,"anzahl":4},{"id":"B-09","nr":3,"text":"Steuerberater (liefert heute die Zahlen, spät)","sichtbar":true,"anzahl":1},{"id":"B-10","nr":4,"text":"Ich sehe zu spät, was mich die Ware kostet","sichtbar":true},{"id":"B-11","nr":4,"text":"Preiserhöhungen der Lieferanten kommen in kleinen Schritten und fallen nicht auf – beim Fleisch war die Marge weg","sichtbar":true},{"id":"B-12","nr":4,"text":"Ich vermute größere Portionen und Schwund, kann aber nichts beweisen","sichtbar":true},{"id":"B-13","nr":4,"text":"Belege sind durcheinander: handschriftlich, Teillieferungen, Gutschriften","sichtbar":true},{"id":"B-14","nr":5,"text":"Belege werden nicht zeitnah ausgewertet, nur am Ende vom Steuerberater","sichtbar":true},{"id":"B-15","nr":5,"text":"Keine Übersicht über Einkaufspreise je Artikel und Lieferant","sichtbar":true},{"id":"B-16","nr":5,"text":"Rezeptprogramme verlangen alles aufs Gramm, dafür fehlt die Zeit","sichtbar":true},{"id":"B-17","nr":6,"text":"Jede Woche sehen, wie viel Prozent vom Umsatz für Ware draufgeht, Küche und Getränke getrennt","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":4,"text":"Ich merke früh, wenn der Wareneinsatz aus dem Ruder läuft, nicht erst Wochen später"},"handeln":"selbst"},{"id":"B-18","nr":6,"text":"Warnung, wenn ein Artikel bei einem Lieferanten deutlich teurer wird","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"Schleichende Preiserhöhungen fallen sofort auf, die Marge bleibt"},"handeln":"vorschlagen"},{"id":"B-19","nr":6,"text":"Lieferscheine und Rechnungen aus Papier und Mail einlesen, ohne alles abzutippen","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":3,"text":"Keine Zettelwirtschaft mehr in der Kiste"},"handeln":"vorschlagen"},{"id":"B-20","nr":6,"text":"Umsatz aus der Kasse übernehmen","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":1,"text":"Umsatz muss ich nicht von Hand eintragen"},"handeln":"selbst"},{"id":"B-21","nr":6,"text":"Für fünf, sechs Hauptgerichte grob eintragen, was drin ist, und sehen, was ein Teller kostet","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":null,"text":"Ein Gefühl dafür, ob Portionen oder Schwund das Problem sind"},"handeln":"egal"},{"id":"B-22","nr":7,"text":"Jeden Montag eine Zahl: Wareneinsatz in Prozent, Küche und Getränke getrennt","sichtbar":true},{"id":"B-23","nr":7,"text":"Preissprünge bei Lieferanten fallen sofort auf","sichtbar":true},{"id":"B-24","nr":7,"text":"Belege sind erfasst, ohne großen Aufwand","sichtbar":true},{"id":"B-25","nr":8,"text":"Das System muss Lieferscheine und Rechnungen per Foto oder aus Mail-Anhängen einlesen","sichtbar":true},{"id":"B-26","nr":8,"text":"Das System muss bei unsicher gelesenen Belegen nachfragen statt zu raten","sichtbar":true},{"id":"B-27","nr":8,"text":"Das System muss Teillieferungen und Gutschriften richtig verrechnen","sichtbar":true},{"id":"B-28","nr":8,"text":"Das System muss Einkaufspreise je Artikel und Lieferant über die Zeit merken","sichtbar":true},{"id":"B-29","nr":8,"text":"Das System muss warnen, wenn ein Artikel deutlich teurer wird als zuletzt","sichtbar":true},{"id":"B-30","nr":8,"text":"Das System muss den Umsatz aus der Kasse übernehmen, Küche und Getränke getrennt","sichtbar":true},{"id":"B-31","nr":8,"text":"Das System muss jede Woche den Wareneinsatz in Prozent vom Umsatz zeigen, Küche und Getränke getrennt","sichtbar":true},{"id":"B-32","nr":9,"text":"Belege landen künftig sofort im Programm statt in der Kiste","sichtbar":true},{"id":"B-33","nr":9,"text":"Die Köche sollen nichts Zusätzliches eintragen müssen","sichtbar":true},{"id":"B-34","nr":10,"text":"Android-Handy zum Fotografieren der Lieferscheine","sichtbar":true},{"id":"B-35","nr":10,"text":"Alter Windows-PC im Büro","sichtbar":true},{"id":"B-36","nr":11,"text":"Kassensystem, aus dem man die Umsatzdaten exportieren kann","sichtbar":true},{"id":"B-37","nr":11,"text":"Steuerberater macht die Buchhaltung","sichtbar":true},{"id":"B-38","nr":12,"text":"Export der Kassendaten einlesen","sichtbar":true},{"id":"B-39","nr":12,"text":"Rechnungen aus dem Mail-Postfach","sichtbar":true},{"id":"B-40","nr":13,"text":"Einkaufspreise, Lieferanten, Mengen","sichtbar":true},{"id":"B-41","nr":13,"text":"Umsätze aus der Kasse","sichtbar":true},{"id":"B-42","nr":14,"text":"personenbezogene Daten: nein","sichtbar":true},{"id":"B-43","nr":14,"text":"Einkaufspreise und Umsätze sind vertraulich und dürfen nicht weitergegeben oder verkauft werden","sichtbar":true},{"id":"B-44","nr":15,"text":"Budget-Rahmen: um die 50 Euro im Monat, wenn am Anfang sichtbar ist, dass es etwas bringt","sichtbar":true},{"id":"B-45","nr":15,"text":"Muss mit wenig Zeitaufwand laufen","sichtbar":true},{"id":"O-01","nr":18,"text":"Welches Kassensystem genau und in welchem Format der Export kommt","sichtbar":true,"wer":"Kunde","bis":""},{"id":"O-02","nr":18,"text":"Wie Küche und Getränke in den Kassendaten getrennt sind","sichtbar":true,"wer":"Kunde","bis":""}],"bausteine":[{"id":"K-01","katalog":"scan","name":"Beleg-Erfassung: Lieferscheine/Rechnungen per Handyfoto mit Texterkennung, Positionen (Artikel, Menge, Preis, Lieferant) auslesen","menge":1,"groesse":"gross","faktoren":["ki"],"deckt":["B-19","B-25","B-01","B-05","B-24","B-32","B-34"],"ermaessigt":false},{"id":"K-02","katalog":"postfach","name":"Rechnungs-Anhänge aus dem Mail-Postfach abholen und der Beleg-Erfassung übergeben","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-19","B-25","B-39"],"ermaessigt":false},{"id":"K-03","katalog":"neu","name":"Prüfschritt: unsicher gelesene Felder markieren und den Inhaber nachfragen lassen; Teillieferungen dem Lieferschein zuordnen, Gutschriften verrechnen","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-26","B-27","B-13"],"ermaessigt":false},{"id":"K-04","katalog":"lager","name":"Artikel- und Preisstamm: Einkaufspreis je Artikel und Lieferant mit Verlauf, Artikel Küche oder Getränke zugeordnet (ohne Bestand/Inventur)","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-28","B-15","B-40"],"ermaessigt":false},{"id":"K-05","katalog":"neu","name":"Preiswarnung: Meldung, wenn ein Artikel gegenüber dem letzten bzw. gleitenden Preis deutlich teurer wird (Schwelle einstellbar)","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-18","B-29","B-11","B-23"],"ermaessigt":false},{"id":"K-06","katalog":"schnitt","name":"Import des Kassen-Exports (CSV/DSFinV-K), Umsatz je Tag/Woche, getrennt nach Küche und Getränke","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-20","B-30","B-03","B-36","B-38","B-41"],"ermaessigt":false},{"id":"K-07","katalog":"neu","name":"Wochenbericht Wareneinsatz in Prozent vom Umsatz, Küche und Getränke getrennt, mit Verlauf über die Wochen","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-17","B-31","B-22","B-06","B-10","B-02","B-14"],"ermaessigt":false},{"id":"K-08","katalog":"liste","name":"Grobe Tellerkalkulation für 5–6 Hauptgerichte (Zutaten grob, Preise aus dem Preisstamm)","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-21","B-12"],"ermaessigt":false},{"id":"K-09","katalog":"plattform","name":"Android-App zum Fotografieren und Windows-Fassung fürs Büro","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-34","B-35"],"ermaessigt":false},{"id":"K-10","katalog":"tresor","name":"Verschlüsselte Ablage der Belege und Zahlen auf dem Gerät mit automatischer Sicherung, keine Weitergabe an Dritte","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-43","B-42"],"ermaessigt":false}],"rahmen":{"geraete":["android","windows"],"offline":"nein","eigene":[],"eigeneText":"","datenort":["geraet","ordner"],"sicherung":["verschluesselt","allein"]},"nicht":[{"id":"N-01","text":"Keine neue Kasse","sichtbar":true},{"id":"N-02","text":"Keine Buchhaltung","sichtbar":true},{"id":"N-03","text":"Kein Bestellsystem","sichtbar":true},{"id":"N-04","text":"Keine monatliche Inventur","sichtbar":true},{"id":"N-05","text":"Keine Rezepturen aufs Gramm genau","sichtbar":true},{"id":"N-06","text":"Einkaufspreise und Umsätze nicht an Dritte weitergeben oder verkaufen","sichtbar":true}]}
```
