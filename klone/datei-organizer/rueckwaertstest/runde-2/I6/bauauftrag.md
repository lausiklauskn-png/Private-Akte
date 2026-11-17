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

**Vorhaben:** Selbst-Check vor der Qualitätsprüfung

**Gesamtauftrag:** keine frühere Fassung in diesem Auftrag — alles unter „Zu tun“ ist neu zu bauen. Das Datum der Fassung steht im Kopf (`fassungsdatum`), `datum` ist der Tag der Erzeugung.

## Rahmen
- Geräte: Tablet, Windows-PC
- Ohne Internet: reicht unterwegs
- Daten liegen: nur auf dem Gerät, eigener Server
- Sicherung: verschlüsselt, von allein
- Schlägt vor, der Kunde bestätigt: B-18, B-19, B-21
- Nicht bauen: N-01 keine zweite Pflegedokumentation · N-02 keine Klientennamen oder Diagnosen speichern · N-03 kein Versprechen, dass wir die Prüfung sicher bestehen · N-04 keine Bewertung oder Rangliste einzelner Mitarbeitender · N-05 kein Ersatz für das bestehende Pflegeprogramm

## Zu tun (für die Sitzung)
| Aktion | Kennung | Was | Größe | Stunden (Schätzung) | deckt Bedarf |
|---|---|---|---|---|---|
| NEU BAUEN | K-01 | Probeprüfung: Klienten-Stichprobe (nur Nummern) ziehen, Prüffragen je Qualitätsbereich durchgehen, Bewertung je Bereich nach dem Bewertungsschema der Prüfer | groß | 63,2–126,5 | B-18, B-27, B-28, B-10, B-11, B-24, B-42 |
| NEU BAUEN | K-02 | Fragenkatalog als versionierte Datei mit Stand der Prüfregeln; Aktualisierung einspielen, alte Durchläufe behalten ihren Fragenstand | mittel | 38,4–70,4 | B-20, B-33, B-17 |
| NEU BAUEN | K-03 | Maßnahmenliste aus den Bewertungen: Maßnahme, zuständig (Rolle/Team), Termin, Stand; überfällige hervorgehoben | mittel | 13,8–23 | B-19, B-29, B-06 |
| NEU BAUEN | K-04 | Quartalsvergleich der Probeprüfungen je Bereich und je Team (nie je Person), Verlauf über die Durchläufe | mittel | 27,6–50,6 | B-21, B-30, B-23, B-32, B-14, B-26, B-45 |
| NEU BAUEN | K-05 | Bereitlege-Liste für die zwei Tage vor der angekündigten Prüfung, abhakbar und druckbar | klein | 1,3–2,6 | B-22, B-31, B-12, B-25, B-47 |
| NEU BAUEN | K-06 | Verschlüsselte Ablage der Durchläufe auf dem Gerät mit automatischer Sicherung, Abgleich Tablet und Büro-PC | mittel | 9,2–16,1 | B-43, B-44, B-37, B-38 |
| NEU BAUEN | K-07 | Monatliches Abo mit Freischaltung inkl. Fragen-Aktualisierungen | klein | 4–8 | B-46 |

### Je Baustein: Vorlage und Abnahme
- K-01 · Faktoren Offline ×1,15, Druck / PDF ×1,1
  - Abnahme B-27: Das System muss eine Probeprüfung mit einer Auswahl von Klienten (nur Nummern) anhand der aktuellen Prüffragen durchführen lassen
  - Abnahme B-28: Das System muss am Ende eine Bewertung je Prüfbereich anzeigen
- K-02 · Faktoren Server ×1,6
  - Abnahme B-33: Das System muss den Fragenkatalog aktualisieren können, wenn sich die Prüfregeln ändern
- K-03 · Vorlage Mein WorkFloh (50 % wiederverwendet) · Faktoren Offline ×1,15
  - Abnahme B-29: Das System muss aus der Bewertung Maßnahmen mit Zuständigkeit und Termin machen und deren Stand anzeigen
- K-04 · Faktoren Offline ×1,15
  - Abnahme B-30: Das System muss Probeprüfungen speichern und mit früheren vergleichen
  - Abnahme B-32: Das System muss Ergebnisse je Team zusammenfassen, nicht je Person
- K-05 · Vorlage Küchenzettel (60 % wiederverwendet) · Faktoren Druck / PDF ×1,1
  - Abnahme B-31: Das System muss eine kurze Bereitlege-Liste für die zwei Tage vor der Prüfung zeigen
- K-06 · Vorlage Pro-Tresor (Workflow PDF Pro), Vollsicherung der Familienakte (50 % wiederverwendet) · Faktoren Offline ×1,15

## Bedarfsprotokoll – Änderungen
- NEU B-01 [Bereich 1]: „Dicker Ordner mit Unterlagen zur Qualitätsprüfung“
- NEU B-02 [Bereich 1]: „Checklisten in Excel“
- NEU B-03 [Bereich 1]: „Einmal ein bezahltes Probe-Audit mit einer Beraterin, inzwischen veraltet“
- NEU B-04 [Bereich 1]: „Großes Pflegeprogramm für Doku und Abrechnung, macht aber keinen Probedurchlauf“
- NEU B-05 [Bereich 2]: „Vorbereitung auf die Qualitätsprüfung im ambulanten Dienst“
- NEU B-06 [Bereich 2]: „Maßnahmen nachhalten: was tun wir, wer, bis wann“
- NEU B-07 [Bereich 3]: „Pflegedienstleitung“
- NEU B-08 [Bereich 3]: „Qualitätsbeauftragte (Teilzeit)“
- NEU B-09 [Bereich 3]: „Mitarbeitende in der Pflege, in Teams“
- NEU B-10 [Bereich 4]: „Wir wissen nicht, ob wir eine Prüfung morgen bestehen würden – nur Bauchgefühl“
- NEU B-11 [Bereich 4]: „Seit Juli wird anders geprüft, mehr wie die Versorgung wirklich ist, unsere Unterlagen passen dazu nicht mehr“
- NEU B-12 [Bereich 4]: „Zwei Tage Ausnahmezustand, wenn die Prüfung angekündigt wird“
- NEU B-13 [Bereich 4]: „Probe-Audit mit Beraterin ist teuer und schnell veraltet“
- NEU B-14 [Bereich 4]: „Keine Übersicht, ob wir über die Zeit besser werden“
- NEU B-15 [Bereich 5]: „Das Pflegeprogramm kann keinen ehrlichen Probedurchlauf“
- NEU B-16 [Bereich 5]: „Excel-Listen und Ordner sind nicht auf die neue Prüfart abgestimmt“
- NEU B-17 [Bereich 5]: „Niemand hält die Fragen aktuell, wenn sich die Regeln ändern“
- NEU B-18 [Bereich 6]: „Uns selbst so prüfen wie die Prüfer: ein paar Klienten auswählen, die Fragen durchgehen, eine Bewertung bekommen“ (Muss, Nutzen: 6 h/Monat, erspart das teure Probe-Audit, ehrliches Bild statt Bauchgefühl)
- NEU B-19 [Bereich 6]: „Aus dem Ergebnis eine Maßnahmenliste: was tun wir, wer kümmert sich, bis wann“ (Muss, Nutzen: 3 h/Monat, nichts geht verloren, klare Zuständigkeiten)
- NEU B-20 [Bereich 6]: „Die Fragen sind immer aktuell und werden nachgezogen, wenn sich die Regeln ändern“ (Muss, Nutzen: sonst nützt das Ganze nichts)
- NEU B-21 [Bereich 6]: „Alle drei Monate wiederholen und sehen, ob wir besser werden“ (Soll, Nutzen: 2 h/Monat, Fortschritt sichtbar)
- NEU B-22 [Bereich 6]: „Kurze Liste für die zwei Tage vor der echten Prüfung, was bereitliegen muss“ (Soll, Nutzen: 2 h/Monat, weniger Ausnahmezustand)
- NEU B-23 [Bereich 6]: „Sehen, wo ein Team schwach ist, ohne einzelne Mitarbeitende bloßzustellen“ (Soll, Nutzen: gezielt schulen, Personal halten)
- NEU B-24 [Bereich 7]: „Jederzeit ehrlich wissen, wo wir vor einer Prüfung stehen“
- NEU B-25 [Bereich 7]: „Ruhig in die angekündigte Prüfung gehen, alles liegt bereit“
- NEU B-26 [Bereich 7]: „Über die Quartale sichtbar besser werden“
- NEU B-27 [Bereich 8]: „Das System muss eine Probeprüfung mit einer Auswahl von Klienten (nur Nummern) anhand der aktuellen Prüffragen durchführen lassen“
- NEU B-28 [Bereich 8]: „Das System muss am Ende eine Bewertung je Prüfbereich anzeigen“
- NEU B-29 [Bereich 8]: „Das System muss aus der Bewertung Maßnahmen mit Zuständigkeit und Termin machen und deren Stand anzeigen“
- NEU B-30 [Bereich 8]: „Das System muss Probeprüfungen speichern und mit früheren vergleichen“
- NEU B-31 [Bereich 8]: „Das System muss eine kurze Bereitlege-Liste für die zwei Tage vor der Prüfung zeigen“
- NEU B-32 [Bereich 8]: „Das System muss Ergebnisse je Team zusammenfassen, nicht je Person“
- NEU B-33 [Bereich 8]: „Das System muss den Fragenkatalog aktualisieren können, wenn sich die Prüfregeln ändern“
- NEU B-34 [Bereich 9]: „Qualitätsbeauftragte führt die Probeprüfung durch, Pflegedienstleitung schaut drauf“
- NEU B-35 [Bereich 9]: „Rhythmus: alle drei Monate“
- NEU B-36 [Bereich 9]: „Kurze Einweisung reicht“
- NEU B-37 [Bereich 10]: „Tablet und PC im Büro“
- NEU B-38 [Bereich 10]: „Im Besprechungsraum ist das WLAN schlecht, muss dort trotzdem gehen“
- NEU B-39 [Bereich 11]: „Großes Pflegeprogramm für Doku und Abrechnung, wird nicht gewechselt“
- NEU B-40 [Bereich 11]: „Excel-Checklisten“
- NEU B-41 [Bereich 12]: „Keine Anbindung ans Pflegeprogramm nötig“
- NEU B-42 [Bereich 13]: „Klienten nur als Nummer“
- NEU B-43 [Bereich 13]: „Bewertungen, Maßnahmen, Termine“
- NEU B-44 [Bereich 14]: „personenbezogene Daten: nein – keine Klientennamen, keine Diagnosen“
- NEU B-45 [Bereich 14]: „Mitarbeitende nicht einzeln bewerten“
- NEU B-46 [Bereich 15]: „Budget 60 bis 100 Euro im Monat, wenn es das Probe-Audit spart“
- NEU B-47 [Bereich 15]: „Prüfung wird zwei Arbeitstage vorher angekündigt“
- NEU O-01 [Bereich 18]: „Wer zieht die Fragen nach, wenn sich die Regeln ändern, und wie oft?“
- NEU O-02 [Bereich 18]: „Monatlicher Preis statt Einmalpreis?“

## Offene Punkte
- O-01: Wer zieht die Fragen nach, wenn sich die Regeln ändern, und wie oft?
- O-02: Monatlicher Preis statt Einmalpreis?

## Summe
Stunden F1 215,4–409,4 · Kosten-Nutzen: Grenzlinie keine

Die Summe enthält zusätzlich zu den Zeilen: Anpassung an den Betrieb 2–6 h, Abstimmung 15 % (23,9–45,5 h), Puffer 20 % (31,9–60,6 h).

## Erklärungen und Sterne
- Verschwiegenheitserklärung aktiviert: nein · Vereinbarung Zahlung/Rechte aktiviert: nein · Wartungsvertrag aktiviert: nein
- Sterne der Mitarbeiter: noch keine

## Vollständiger Stand (zum Einlesen)
```json
{"bedarf":[{"id":"B-01","nr":1,"text":"Dicker Ordner mit Unterlagen zur Qualitätsprüfung","sichtbar":true},{"id":"B-02","nr":1,"text":"Checklisten in Excel","sichtbar":true},{"id":"B-03","nr":1,"text":"Einmal ein bezahltes Probe-Audit mit einer Beraterin, inzwischen veraltet","sichtbar":true},{"id":"B-04","nr":1,"text":"Großes Pflegeprogramm für Doku und Abrechnung, macht aber keinen Probedurchlauf","sichtbar":true},{"id":"B-05","nr":2,"text":"Vorbereitung auf die Qualitätsprüfung im ambulanten Dienst","sichtbar":true},{"id":"B-06","nr":2,"text":"Maßnahmen nachhalten: was tun wir, wer, bis wann","sichtbar":true},{"id":"B-07","nr":3,"text":"Pflegedienstleitung","sichtbar":true,"anzahl":1},{"id":"B-08","nr":3,"text":"Qualitätsbeauftragte (Teilzeit)","sichtbar":true,"anzahl":1},{"id":"B-09","nr":3,"text":"Mitarbeitende in der Pflege, in Teams","sichtbar":true,"anzahl":25},{"id":"B-10","nr":4,"text":"Wir wissen nicht, ob wir eine Prüfung morgen bestehen würden – nur Bauchgefühl","sichtbar":true},{"id":"B-11","nr":4,"text":"Seit Juli wird anders geprüft, mehr wie die Versorgung wirklich ist, unsere Unterlagen passen dazu nicht mehr","sichtbar":true},{"id":"B-12","nr":4,"text":"Zwei Tage Ausnahmezustand, wenn die Prüfung angekündigt wird","sichtbar":true},{"id":"B-13","nr":4,"text":"Probe-Audit mit Beraterin ist teuer und schnell veraltet","sichtbar":true},{"id":"B-14","nr":4,"text":"Keine Übersicht, ob wir über die Zeit besser werden","sichtbar":true},{"id":"B-15","nr":5,"text":"Das Pflegeprogramm kann keinen ehrlichen Probedurchlauf","sichtbar":true},{"id":"B-16","nr":5,"text":"Excel-Listen und Ordner sind nicht auf die neue Prüfart abgestimmt","sichtbar":true},{"id":"B-17","nr":5,"text":"Niemand hält die Fragen aktuell, wenn sich die Regeln ändern","sichtbar":true},{"id":"B-18","nr":6,"text":"Uns selbst so prüfen wie die Prüfer: ein paar Klienten auswählen, die Fragen durchgehen, eine Bewertung bekommen","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":6,"text":"erspart das teure Probe-Audit, ehrliches Bild statt Bauchgefühl"},"handeln":"vorschlagen"},{"id":"B-19","nr":6,"text":"Aus dem Ergebnis eine Maßnahmenliste: was tun wir, wer kümmert sich, bis wann","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":3,"text":"nichts geht verloren, klare Zuständigkeiten"},"handeln":"vorschlagen"},{"id":"B-20","nr":6,"text":"Die Fragen sind immer aktuell und werden nachgezogen, wenn sich die Regeln ändern","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"sonst nützt das Ganze nichts"},"handeln":"egal"},{"id":"B-21","nr":6,"text":"Alle drei Monate wiederholen und sehen, ob wir besser werden","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":2,"text":"Fortschritt sichtbar"},"handeln":"vorschlagen"},{"id":"B-22","nr":6,"text":"Kurze Liste für die zwei Tage vor der echten Prüfung, was bereitliegen muss","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":2,"text":"weniger Ausnahmezustand"},"handeln":"egal"},{"id":"B-23","nr":6,"text":"Sehen, wo ein Team schwach ist, ohne einzelne Mitarbeitende bloßzustellen","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":"gezielt schulen, Personal halten"},"handeln":"egal"},{"id":"B-24","nr":7,"text":"Jederzeit ehrlich wissen, wo wir vor einer Prüfung stehen","sichtbar":true},{"id":"B-25","nr":7,"text":"Ruhig in die angekündigte Prüfung gehen, alles liegt bereit","sichtbar":true},{"id":"B-26","nr":7,"text":"Über die Quartale sichtbar besser werden","sichtbar":true},{"id":"B-27","nr":8,"text":"Das System muss eine Probeprüfung mit einer Auswahl von Klienten (nur Nummern) anhand der aktuellen Prüffragen durchführen lassen","sichtbar":true},{"id":"B-28","nr":8,"text":"Das System muss am Ende eine Bewertung je Prüfbereich anzeigen","sichtbar":true},{"id":"B-29","nr":8,"text":"Das System muss aus der Bewertung Maßnahmen mit Zuständigkeit und Termin machen und deren Stand anzeigen","sichtbar":true},{"id":"B-30","nr":8,"text":"Das System muss Probeprüfungen speichern und mit früheren vergleichen","sichtbar":true},{"id":"B-31","nr":8,"text":"Das System muss eine kurze Bereitlege-Liste für die zwei Tage vor der Prüfung zeigen","sichtbar":true},{"id":"B-32","nr":8,"text":"Das System muss Ergebnisse je Team zusammenfassen, nicht je Person","sichtbar":true},{"id":"B-33","nr":8,"text":"Das System muss den Fragenkatalog aktualisieren können, wenn sich die Prüfregeln ändern","sichtbar":true},{"id":"B-34","nr":9,"text":"Qualitätsbeauftragte führt die Probeprüfung durch, Pflegedienstleitung schaut drauf","sichtbar":true},{"id":"B-35","nr":9,"text":"Rhythmus: alle drei Monate","sichtbar":true},{"id":"B-36","nr":9,"text":"Kurze Einweisung reicht","sichtbar":true},{"id":"B-37","nr":10,"text":"Tablet und PC im Büro","sichtbar":true},{"id":"B-38","nr":10,"text":"Im Besprechungsraum ist das WLAN schlecht, muss dort trotzdem gehen","sichtbar":true},{"id":"B-39","nr":11,"text":"Großes Pflegeprogramm für Doku und Abrechnung, wird nicht gewechselt","sichtbar":true},{"id":"B-40","nr":11,"text":"Excel-Checklisten","sichtbar":true},{"id":"B-41","nr":12,"text":"Keine Anbindung ans Pflegeprogramm nötig","sichtbar":true},{"id":"B-42","nr":13,"text":"Klienten nur als Nummer","sichtbar":true},{"id":"B-43","nr":13,"text":"Bewertungen, Maßnahmen, Termine","sichtbar":true},{"id":"B-44","nr":14,"text":"personenbezogene Daten: nein – keine Klientennamen, keine Diagnosen","sichtbar":true},{"id":"B-45","nr":14,"text":"Mitarbeitende nicht einzeln bewerten","sichtbar":true},{"id":"B-46","nr":15,"text":"Budget 60 bis 100 Euro im Monat, wenn es das Probe-Audit spart","sichtbar":true},{"id":"B-47","nr":15,"text":"Prüfung wird zwei Arbeitstage vorher angekündigt","sichtbar":true},{"id":"O-01","nr":18,"text":"Wer zieht die Fragen nach, wenn sich die Regeln ändern, und wie oft?","sichtbar":true,"wer":"","bis":""},{"id":"O-02","nr":18,"text":"Monatlicher Preis statt Einmalpreis?","sichtbar":true,"wer":"","bis":""}],"bausteine":[{"id":"K-01","katalog":"neu","name":"Probeprüfung: Klienten-Stichprobe (nur Nummern) ziehen, Prüffragen je Qualitätsbereich durchgehen, Bewertung je Bereich nach dem Bewertungsschema der Prüfer","menge":1,"groesse":"gross","faktoren":["offline","druck"],"deckt":["B-18","B-27","B-28","B-10","B-11","B-24","B-42"],"ermaessigt":false},{"id":"K-02","katalog":"neu","name":"Fragenkatalog als versionierte Datei mit Stand der Prüfregeln; Aktualisierung einspielen, alte Durchläufe behalten ihren Fragenstand","menge":1,"groesse":"mittel","faktoren":["server"],"deckt":["B-20","B-33","B-17"],"ermaessigt":false},{"id":"K-03","katalog":"auftrag","name":"Maßnahmenliste aus den Bewertungen: Maßnahme, zuständig (Rolle/Team), Termin, Stand; überfällige hervorgehoben","menge":1,"groesse":"mittel","faktoren":["offline"],"deckt":["B-19","B-29","B-06"],"ermaessigt":false},{"id":"K-04","katalog":"neu","name":"Quartalsvergleich der Probeprüfungen je Bereich und je Team (nie je Person), Verlauf über die Durchläufe","menge":1,"groesse":"mittel","faktoren":["offline"],"deckt":["B-21","B-30","B-23","B-32","B-14","B-26","B-45"],"ermaessigt":false},{"id":"K-05","katalog":"liste","name":"Bereitlege-Liste für die zwei Tage vor der angekündigten Prüfung, abhakbar und druckbar","menge":1,"groesse":"klein","faktoren":["druck"],"deckt":["B-22","B-31","B-12","B-25","B-47"],"ermaessigt":false},{"id":"K-06","katalog":"tresor","name":"Verschlüsselte Ablage der Durchläufe auf dem Gerät mit automatischer Sicherung, Abgleich Tablet und Büro-PC","menge":1,"groesse":"mittel","faktoren":["offline"],"deckt":["B-43","B-44","B-37","B-38"],"ermaessigt":false},{"id":"K-07","katalog":"lizenz","name":"Monatliches Abo mit Freischaltung inkl. Fragen-Aktualisierungen","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-46"],"ermaessigt":false}],"rahmen":{"geraete":["tablet","windows"],"offline":"unterwegs","eigene":[],"eigeneText":"","datenort":["geraet","server"],"sicherung":["verschluesselt","allein"]},"nicht":[{"id":"N-01","text":"keine zweite Pflegedokumentation","sichtbar":true},{"id":"N-02","text":"keine Klientennamen oder Diagnosen speichern","sichtbar":true},{"id":"N-03","text":"kein Versprechen, dass wir die Prüfung sicher bestehen","sichtbar":true},{"id":"N-04","text":"keine Bewertung oder Rangliste einzelner Mitarbeitender","sichtbar":true},{"id":"N-05","text":"kein Ersatz für das bestehende Pflegeprogramm","sichtbar":true}]}
```
