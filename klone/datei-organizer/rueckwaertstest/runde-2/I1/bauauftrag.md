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

**Vorhaben:** KI-Programme sicher nutzen, ohne dass Mandantendaten hinausgehen

**Gesamtauftrag:** keine frühere Fassung in diesem Auftrag — alles unter „Zu tun“ ist neu zu bauen. Das Datum der Fassung steht im Kopf (`fassungsdatum`), `datum` ist der Tag der Erzeugung.

## Rahmen
- Geräte: Windows-PC, im Browser
- Ohne Internet: nein
- Daten liegen: nur auf dem Gerät
- Schlägt vor, der Kunde bestätigt: B-16, B-18
- Darf selbst handeln: B-17
- Nicht bauen: N-01 Kein Server dazwischen, der Texte mitliest oder speichert · N-02 Keine Protokollierung, wer was eingegeben hat (keine Überwachung der Mitarbeiterinnen) · N-03 Keine Bindung an einen einzigen KI-Anbieter · N-04 Kein Versprechen hundertprozentiger Sicherheit · N-05 Nicht auf dem Handy für Akten

## Zu tun (für die Sitzung)
| Aktion | Kennung | Was | Größe | Stunden (Schätzung) | deckt Bedarf |
|---|---|---|---|---|---|
| NEU BAUEN | K-01 | Browser-App (Edge/PWA) zum Pseudonymisieren: Text einfügen, Namen/Adressen/IBAN/Beträge/Telefon/Daten automatisch durch Platzhalter ersetzen, Vorschau „Das geht hinaus“ mit Bestätigung, dann kopieren bzw. senden; alles nur im Browser, kein Zwischenserver, kein Protokoll | groß | 7,5–12 | B-16, B-18, B-22, B-25, B-27, B-14, B-10, B-11, B-12, B-23, B-41, B-42 |
| NEU BAUEN | K-02 | Mandantenliste: Namen (verschlüsselt im Browser) hinterlegen, importieren aus einer Liste, beim Erkennen vorrangig verdecken, je Arbeitsplatz | klein | 10–20 | B-19, B-26, B-38 |
| NEU BAUEN | K-03 | Rückübersetzung: KI-Antwort einfügen, Platzhalter werden wieder durch die echten Angaben ersetzt, Ergebnis zum Kopieren nach Word/Outlook | klein | 10–20 | B-17, B-28, B-24, B-04 |
| NEU BAUEN | K-04 | Anbieter frei wählbar: Weg über Zwischenablage für jedes KI-Programm im Browser, optional direkte Anbindung mit eigenem Schlüssel (mehrere Anbieter, ohne Zwischenserver) | mittel | 17,5–32,5 | B-20, B-29 |
| NEU BAUEN | K-05 | Vorzeigeblatt für Kammer und Mandanten (Druck/PDF): was verdeckt wird, wo die Grenzen liegen, kein Versprechen vollständiger Sicherheit | klein | 11–22 | B-21, B-30, B-13, B-44 |
| NEU BAUEN | K-06 | Einrichtung auf vier Windows-PCs als Edge-App (Installieren-Knopf, ohne Admin-Aufwand) und kurze Einweisung mit Büro-Regel | klein | 10–20 | B-31, B-32, B-33, B-34 |

### Je Baustein: Vorlage und Abnahme
- K-01 · Vorlage Sende-Prüfer (70 % wiederverwendet) · Faktoren KI ×1,25
  - Abnahme B-25: Das System muss Namen, Adressen, Kontonummern, Beträge und Telefonnummern im Text vor dem Senden durch Platzhalter ersetzen
  - Abnahme B-27: Das System muss vor dem Senden anzeigen, was genau hinausgeht, und erst nach Bestätigung senden
- K-02
  - Abnahme B-26: Das System muss eine hinterlegte Liste von Mandantennamen beim Erkennen berücksichtigen
- K-03
  - Abnahme B-28: Das System muss in der Antwort der KI die Platzhalter wieder durch die echten Angaben ersetzen
- K-04 · Faktoren KI ×1,25
  - Abnahme B-29: Das System muss mit verschiedenen KI-Anbietern funktionieren
- K-05 · Faktoren Druck / PDF ×1,1
  - Abnahme B-30: Das System muss eine kurze Beschreibung liefern, die man der Kammer oder Mandanten zeigen kann

## Bedarfsprotokoll – Änderungen
- NEU B-01 [Bereich 1]: „KI-Programme im Internet werden kaum genutzt; wenn ich es ausprobiere, schwärze ich vorher von Hand“
- NEU B-02 [Bereich 1]: „Die Auszubildende kopiert Texte unbearbeitet in KI-Programme, teils am eigenen Handy“
- NEU B-03 [Bereich 1]: „Schriftsätze und Mails schreiben wir selbst in Word bzw. Outlook am Windows-PC“
- NEU B-04 [Bereich 2]: „Entwurf von Schriftsätzen und Mails“
- NEU B-05 [Bereich 2]: „Umgang mit Mandantendaten (Dokumente, Kundenkontakt)“
- NEU B-06 [Bereich 3]: „Inhaberin (Rechtsanwältin)“
- NEU B-07 [Bereich 3]: „Weitere Anwältin“
- NEU B-08 [Bereich 3]: „Rechtsanwaltsfachangestellte“
- NEU B-09 [Bereich 3]: „Auszubildende“
- NEU B-10 [Bereich 4]: „Von Hand schwärzen dauert länger, als den Text selbst zu schreiben“
- NEU B-11 [Bereich 4]: „Beim Schwärzen übersehe ich trotzdem etwas“
- NEU B-12 [Bereich 4]: „Mandantendaten (Namen, Kinder, Gehälter, Adressen, Kontonummern) können ungeschützt bei fremden Firmen landen“
- NEU B-13 [Bereich 4]: „Wir können der Kammer oder Mandanten nicht zeigen, dass wir aufpassen“
- NEU B-14 [Bereich 5]: „Es gibt kein Werkzeug, das Namen und Zahlen vor dem Senden automatisch unkenntlich macht“
- NEU B-15 [Bereich 5]: „Ein Verbot wird umgangen, weil die KI im Alltag nützlich ist“
- NEU B-16 [Bereich 6]: „Namen, Zahlen, Adressen und Kontonummern vor dem Senden an eine KI automatisch unkenntlich machen“ (Muss, Nutzen: 8 h/Monat, kein Schwärzen von Hand, Schweigepflicht gewahrt)
- NEU B-17 [Bereich 6]: „Die Antwort der KI hinterher wieder mit den echten Namen und Zahlen anzeigen“ (Muss, Nutzen: 4 h/Monat, Antwort direkt weiterverwenden)
- NEU B-18 [Bereich 6]: „Vor dem Senden genau sehen, was hinausgeht, und erst dann bestätigen“ (Muss, Nutzen: nichts geht blind hinaus)
- NEU B-19 [Bereich 6]: „Mandantennamen als Liste hinterlegen, damit sie sicher erkannt werden“ (Muss, Nutzen: weniger übersehene Namen)
- NEU B-20 [Bereich 6]: „Frei wählen können, welches KI-Programm benutzt wird“ (Soll, Nutzen: keine Bindung an einen Anbieter)
- NEU B-21 [Bereich 6]: „Etwas Vorzeigbares für Kammer oder Mandanten, dass wir aufpassen“ (Soll, Nutzen: Vertrauen bei Kammer und Mandanten)
- NEU B-22 [Bereich 6]: „Ein Weg, den auch die Auszubildende gern benutzt, statt am eigenen Handy“ (Muss, Nutzen: kein Umgehen mehr)
- NEU B-23 [Bereich 7]: „Alle vier können KI-Programme für Entwürfe nutzen, ohne dass Mandantendaten erkennbar hinausgehen“
- NEU B-24 [Bereich 7]: „Schneller Entwürfe für Schriftsätze und Mails“
- NEU B-25 [Bereich 8]: „Das System muss Namen, Adressen, Kontonummern, Beträge und Telefonnummern im Text vor dem Senden durch Platzhalter ersetzen“
- NEU B-26 [Bereich 8]: „Das System muss eine hinterlegte Liste von Mandantennamen beim Erkennen berücksichtigen“
- NEU B-27 [Bereich 8]: „Das System muss vor dem Senden anzeigen, was genau hinausgeht, und erst nach Bestätigung senden“
- NEU B-28 [Bereich 8]: „Das System muss in der Antwort der KI die Platzhalter wieder durch die echten Angaben ersetzen“
- NEU B-29 [Bereich 8]: „Das System muss mit verschiedenen KI-Anbietern funktionieren“
- NEU B-30 [Bereich 8]: „Das System muss eine kurze Beschreibung liefern, die man der Kammer oder Mandanten zeigen kann“
- NEU B-31 [Bereich 9]: „Kurze Einweisung für alle vier“
- NEU B-32 [Bereich 9]: „Regel im Büro: KI nur über diesen Weg“
- NEU B-33 [Bereich 10]: „Windows-PCs im Büro, Browser Edge“
- NEU B-34 [Bereich 10]: „Einfache Installation, der IT-Dienstleister kommt nur einmal im Monat“
- NEU B-35 [Bereich 11]: „Windows-PCs mit Edge“
- NEU B-36 [Bereich 11]: „Word und Outlook“
- NEU B-37 [Bereich 13]: „Texte aus Akten: Namen, Kinder, Gehälter, Adressen, Kontonummern“
- NEU B-38 [Bereich 13]: „Liste der Mandantennamen“
- NEU B-39 [Bereich 14]: „personenbezogene Daten: ja“
- NEU B-40 [Bereich 14]: „Anwaltliche Schweigepflicht“
- NEU B-41 [Bereich 14]: „Kein Server dazwischen darf Texte mitlesen oder speichern“
- NEU B-42 [Bereich 14]: „Keine Überwachung der Mitarbeiterinnen, wer was eingegeben hat“
- NEU B-43 [Bereich 15]: „Budget-Rahmen (Angabe des Kunden): 40 bis 60 Euro im Monat für alle vier“
- NEU B-44 [Bereich 15]: „Keine Versprechen von hundertprozentiger Sicherheit“
- NEU O-01 [Bereich 18]: „Wie man mit Angaben umgeht, die nicht automatisch erkannt werden“
- NEU O-02 [Bereich 18]: „Laufende Kosten der KI-Anbieter selbst“

## Offene Punkte
- O-01: Wie man mit Angaben umgeht, die nicht automatisch erkannt werden
- O-02: Laufende Kosten der KI-Anbieter selbst

## Summe
Stunden F1 91,8–178,9 · Kosten-Nutzen: Grenzlinie keine

Die Summe enthält zusätzlich zu den Zeilen: Anpassung an den Betrieb 2–6 h, Abstimmung 15 % (10,2–19,9 h), Puffer 20 % (13,6–26,5 h).

## Erklärungen und Sterne
- Verschwiegenheitserklärung aktiviert: nein · Vereinbarung Zahlung/Rechte aktiviert: nein · Wartungsvertrag aktiviert: nein
- Sterne der Mitarbeiter: noch keine

## Vollständiger Stand (zum Einlesen)
```json
{"bedarf":[{"id":"B-01","nr":1,"text":"KI-Programme im Internet werden kaum genutzt; wenn ich es ausprobiere, schwärze ich vorher von Hand","sichtbar":true},{"id":"B-02","nr":1,"text":"Die Auszubildende kopiert Texte unbearbeitet in KI-Programme, teils am eigenen Handy","sichtbar":true},{"id":"B-03","nr":1,"text":"Schriftsätze und Mails schreiben wir selbst in Word bzw. Outlook am Windows-PC","sichtbar":true},{"id":"B-04","nr":2,"text":"Entwurf von Schriftsätzen und Mails","sichtbar":true},{"id":"B-05","nr":2,"text":"Umgang mit Mandantendaten (Dokumente, Kundenkontakt)","sichtbar":true},{"id":"B-06","nr":3,"text":"Inhaberin (Rechtsanwältin)","sichtbar":true,"anzahl":1},{"id":"B-07","nr":3,"text":"Weitere Anwältin","sichtbar":true,"anzahl":1},{"id":"B-08","nr":3,"text":"Rechtsanwaltsfachangestellte","sichtbar":true,"anzahl":1},{"id":"B-09","nr":3,"text":"Auszubildende","sichtbar":true,"anzahl":1},{"id":"B-10","nr":4,"text":"Von Hand schwärzen dauert länger, als den Text selbst zu schreiben","sichtbar":true},{"id":"B-11","nr":4,"text":"Beim Schwärzen übersehe ich trotzdem etwas","sichtbar":true},{"id":"B-12","nr":4,"text":"Mandantendaten (Namen, Kinder, Gehälter, Adressen, Kontonummern) können ungeschützt bei fremden Firmen landen","sichtbar":true},{"id":"B-13","nr":4,"text":"Wir können der Kammer oder Mandanten nicht zeigen, dass wir aufpassen","sichtbar":true},{"id":"B-14","nr":5,"text":"Es gibt kein Werkzeug, das Namen und Zahlen vor dem Senden automatisch unkenntlich macht","sichtbar":true},{"id":"B-15","nr":5,"text":"Ein Verbot wird umgangen, weil die KI im Alltag nützlich ist","sichtbar":true},{"id":"B-16","nr":6,"text":"Namen, Zahlen, Adressen und Kontonummern vor dem Senden an eine KI automatisch unkenntlich machen","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":8,"text":"kein Schwärzen von Hand, Schweigepflicht gewahrt"},"handeln":"vorschlagen"},{"id":"B-17","nr":6,"text":"Die Antwort der KI hinterher wieder mit den echten Namen und Zahlen anzeigen","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":4,"text":"Antwort direkt weiterverwenden"},"handeln":"selbst"},{"id":"B-18","nr":6,"text":"Vor dem Senden genau sehen, was hinausgeht, und erst dann bestätigen","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"nichts geht blind hinaus"},"handeln":"vorschlagen"},{"id":"B-19","nr":6,"text":"Mandantennamen als Liste hinterlegen, damit sie sicher erkannt werden","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"weniger übersehene Namen"},"handeln":"egal"},{"id":"B-20","nr":6,"text":"Frei wählen können, welches KI-Programm benutzt wird","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":"keine Bindung an einen Anbieter"},"handeln":"egal"},{"id":"B-21","nr":6,"text":"Etwas Vorzeigbares für Kammer oder Mandanten, dass wir aufpassen","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":"Vertrauen bei Kammer und Mandanten"},"handeln":"egal"},{"id":"B-22","nr":6,"text":"Ein Weg, den auch die Auszubildende gern benutzt, statt am eigenen Handy","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"kein Umgehen mehr"},"handeln":"egal"},{"id":"B-23","nr":7,"text":"Alle vier können KI-Programme für Entwürfe nutzen, ohne dass Mandantendaten erkennbar hinausgehen","sichtbar":true},{"id":"B-24","nr":7,"text":"Schneller Entwürfe für Schriftsätze und Mails","sichtbar":true},{"id":"B-25","nr":8,"text":"Das System muss Namen, Adressen, Kontonummern, Beträge und Telefonnummern im Text vor dem Senden durch Platzhalter ersetzen","sichtbar":true},{"id":"B-26","nr":8,"text":"Das System muss eine hinterlegte Liste von Mandantennamen beim Erkennen berücksichtigen","sichtbar":true},{"id":"B-27","nr":8,"text":"Das System muss vor dem Senden anzeigen, was genau hinausgeht, und erst nach Bestätigung senden","sichtbar":true},{"id":"B-28","nr":8,"text":"Das System muss in der Antwort der KI die Platzhalter wieder durch die echten Angaben ersetzen","sichtbar":true},{"id":"B-29","nr":8,"text":"Das System muss mit verschiedenen KI-Anbietern funktionieren","sichtbar":true},{"id":"B-30","nr":8,"text":"Das System muss eine kurze Beschreibung liefern, die man der Kammer oder Mandanten zeigen kann","sichtbar":true},{"id":"B-31","nr":9,"text":"Kurze Einweisung für alle vier","sichtbar":true},{"id":"B-32","nr":9,"text":"Regel im Büro: KI nur über diesen Weg","sichtbar":true},{"id":"B-33","nr":10,"text":"Windows-PCs im Büro, Browser Edge","sichtbar":true},{"id":"B-34","nr":10,"text":"Einfache Installation, der IT-Dienstleister kommt nur einmal im Monat","sichtbar":true},{"id":"B-35","nr":11,"text":"Windows-PCs mit Edge","sichtbar":true},{"id":"B-36","nr":11,"text":"Word und Outlook","sichtbar":true},{"id":"B-37","nr":13,"text":"Texte aus Akten: Namen, Kinder, Gehälter, Adressen, Kontonummern","sichtbar":true},{"id":"B-38","nr":13,"text":"Liste der Mandantennamen","sichtbar":true},{"id":"B-39","nr":14,"text":"personenbezogene Daten: ja","sichtbar":true},{"id":"B-40","nr":14,"text":"Anwaltliche Schweigepflicht","sichtbar":true},{"id":"B-41","nr":14,"text":"Kein Server dazwischen darf Texte mitlesen oder speichern","sichtbar":true},{"id":"B-42","nr":14,"text":"Keine Überwachung der Mitarbeiterinnen, wer was eingegeben hat","sichtbar":true},{"id":"B-43","nr":15,"text":"Budget-Rahmen (Angabe des Kunden): 40 bis 60 Euro im Monat für alle vier","sichtbar":true},{"id":"B-44","nr":15,"text":"Keine Versprechen von hundertprozentiger Sicherheit","sichtbar":true},{"id":"O-01","nr":18,"text":"Wie man mit Angaben umgeht, die nicht automatisch erkannt werden","sichtbar":true,"wer":"","bis":""},{"id":"O-02","nr":18,"text":"Laufende Kosten der KI-Anbieter selbst","sichtbar":true,"wer":"","bis":""}],"bausteine":[{"id":"K-01","katalog":"kipruef","name":"Browser-App (Edge/PWA) zum Pseudonymisieren: Text einfügen, Namen/Adressen/IBAN/Beträge/Telefon/Daten automatisch durch Platzhalter ersetzen, Vorschau „Das geht hinaus“ mit Bestätigung, dann kopieren bzw. senden; alles nur im Browser, kein Zwischenserver, kein Protokoll","menge":1,"groesse":"gross","faktoren":["ki"],"deckt":["B-16","B-18","B-22","B-25","B-27","B-14","B-10","B-11","B-12","B-23","B-41","B-42"],"ermaessigt":false},{"id":"K-02","katalog":"neu","name":"Mandantenliste: Namen (verschlüsselt im Browser) hinterlegen, importieren aus einer Liste, beim Erkennen vorrangig verdecken, je Arbeitsplatz","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-19","B-26","B-38"],"ermaessigt":false},{"id":"K-03","katalog":"neu","name":"Rückübersetzung: KI-Antwort einfügen, Platzhalter werden wieder durch die echten Angaben ersetzt, Ergebnis zum Kopieren nach Word/Outlook","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-17","B-28","B-24","B-04"],"ermaessigt":false},{"id":"K-04","katalog":"schnitt","name":"Anbieter frei wählbar: Weg über Zwischenablage für jedes KI-Programm im Browser, optional direkte Anbindung mit eigenem Schlüssel (mehrere Anbieter, ohne Zwischenserver)","menge":1,"groesse":"mittel","faktoren":["ki"],"deckt":["B-20","B-29"],"ermaessigt":false},{"id":"K-05","katalog":"neu","name":"Vorzeigeblatt für Kammer und Mandanten (Druck/PDF): was verdeckt wird, wo die Grenzen liegen, kein Versprechen vollständiger Sicherheit","menge":1,"groesse":"klein","faktoren":["druck"],"deckt":["B-21","B-30","B-13","B-44"],"ermaessigt":false},{"id":"K-06","katalog":"neu","name":"Einrichtung auf vier Windows-PCs als Edge-App (Installieren-Knopf, ohne Admin-Aufwand) und kurze Einweisung mit Büro-Regel","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-31","B-32","B-33","B-34"],"ermaessigt":false}],"rahmen":{"geraete":["windows","browser"],"offline":"nein","eigene":[],"eigeneText":"","datenort":["geraet"],"sicherung":[]},"nicht":[{"id":"N-01","text":"Kein Server dazwischen, der Texte mitliest oder speichert","sichtbar":true},{"id":"N-02","text":"Keine Protokollierung, wer was eingegeben hat (keine Überwachung der Mitarbeiterinnen)","sichtbar":true},{"id":"N-03","text":"Keine Bindung an einen einzigen KI-Anbieter","sichtbar":true},{"id":"N-04","text":"Kein Versprechen hundertprozentiger Sicherheit","sichtbar":true},{"id":"N-05","text":"Nicht auf dem Handy für Akten","sichtbar":true}]}
```
