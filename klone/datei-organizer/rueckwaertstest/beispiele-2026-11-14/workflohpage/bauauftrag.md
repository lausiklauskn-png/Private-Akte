---
art: bauauftrag
format: 1
vorgang: V-2026-0001
fassung: 3
vorher: -
fassungsdatum: 2026-09-08
datum: 2026-09-08
kunde: "⟦KUNDE-1⟧"
verdeckt: ja
stunden: ja
euro: nein
repo: "Workflow-Needs"  # Werkzeug, das den Auftrag erzeugt hat — nicht das Ziel
---

# Bauauftrag · Fassung 3

**Anlass:** Besucher aus dem Ausland, mehr Schutz im Netz und ein sichtbarer Weg zum Installieren  ·  **von:** Kunde

**Vorhaben:** Firmen-Website für einen Werbetechnik-Betrieb, als Vorlage wiederverwendbar

**Gesamtauftrag:** keine frühere Fassung in diesem Auftrag — alles unter „Zu tun“ ist neu zu bauen. Das Datum der Fassung steht im Kopf (`fassungsdatum`), `datum` ist der Tag der Erzeugung.

## Rahmen
- Geräte: im Browser
- Ohne Internet: reicht unterwegs
- Abgleich zwischen Geräten: nein, ein Gerät reicht
- Daten liegen: nur auf dem Gerät
- KI: keine KI
- Nicht bauen: N-01 Keine echten Firmendaten in der Vorlage

## Zu tun (für die Sitzung)
| Aktion | Kennung | Was | Größe | Stunden (Schätzung) | deckt Bedarf |
|---|---|---|---|---|---|
| NEU BAUEN | K-01 | Website mit sechs Bereichen, neutralen Platzhaltern und Themen | mittel | 6–10 | B-11, B-12, B-15 |
| NEU BAUEN | K-02 | Installierbare Web-App mit Offline-Vorrat | klein | 3,5–5,8 | B-13 |
| NEU BAUEN | K-03 | Bilder per Ziehen auf jede Fläche, lokal gespeichert | klein | 10–20 | B-14 |
| NEU BAUEN | K-04 | Glas-Knöpfe und animierter Partikel-Hintergrund | klein | 10–20 | B-16 |
| NEU BAUEN | K-05 | Ladezeit und Kontrast: Hintergrund nach dem Laden, Schutzstufen | klein | 3–5 | B-33 |
| NEU BAUEN | K-06 | Netz-Endknoten mit Netz-Fenster, Gerätename und eigener Ablage | mittel | 2,8–5,2 | B-34, B-40 |
| NEU BAUEN | K-07 | Siegel mit Andock-Assistent und veröffentlichter Spore | klein | 2–4 | B-35 |
| NEU BAUEN | K-08 | Lizenz und Rechte-Erklärung | klein | 10–20 | B-36 |
| NEU BAUEN | K-09 | Netz-Bausteine nachgezogen: Englisch, Sperrliste, Bürgen, Rechenaufwand | mittel | 3,4–6,2 | B-41, B-42 |
| NEU BAUEN | K-10 | Erklärseiten zu Netz, Siegel und Schutz | klein | 3–5 | B-43 |
| NEU BAUEN | K-11 | Installieren-Knopf und Vorlagen-Hinweis auf der Seite | klein | 3–5 | B-44, B-45 |

### Je Baustein: Vorlage und Abnahme
- K-01 · Vorlage Mein-Rezeptbuch-Page, Workfloh-PDF-Page (50 % wiederverwendet)
- K-02 · Vorlage Mein-Rezeptbuch-Page, Workfloh-PDF-Page (50 % wiederverwendet) · Faktoren Offline ×1,15
- K-05 · Vorlage Mein-Rezeptbuch-Page, Workfloh-PDF-Page (50 % wiederverwendet)
- K-06 · Vorlage – (80 % wiederverwendet)
- K-07 · Vorlage – (80 % wiederverwendet)
- K-09 · Vorlage – (80 % wiederverwendet) · Faktoren Mehrsprachig ×1,2
- K-10 · Vorlage Mein-Rezeptbuch-Page, Workfloh-PDF-Page (50 % wiederverwendet)
- K-11 · Vorlage Mein-Rezeptbuch-Page, Workfloh-PDF-Page (50 % wiederverwendet)
- ohne Baustein (trotzdem abnehmen):
  - B-18: Das System muss als eine selbst-enthaltende Seite mit sechs Bereichen laufen: Start, Leistungen, Anlagen, Fragen und Antworten, Team, Kontakt
  - B-19: Das System muss ohne Bilder ausgeliefert werden und fehlende Fotos durch neutrale Platzhalter ersetzen
  - B-20: Das System muss eigene Bilder per Ziehen oder Kamera-Symbol annehmen und nur im Browser des Geräts speichern
  - B-21: Das System muss sich installieren lassen und nach dem ersten Besuch offline funktionieren (Service Worker, Manifest)
  - B-22: Das System muss die Themen Hell, Dunkel und Kontrast anbieten und die Wahl merken
  - B-23: Das System darf keine echten Firmen- oder Personendaten enthalten; jede Angabe ist ein erkennbarer Platzhalter
  - B-37: Das System muss den animierten Hintergrund erst nach dem Laden starten, damit der erste Aufbau nicht wartet
  - B-38: Das System muss als Netz-Endknoten eine eigene Ablage haben und beim Laden nichts ins Netz senden
  - B-39: Das System muss die eigene Kennung (Spore) unterschrieben veröffentlichen und im Siegel prüfbar zeigen
  - B-47: Das System muss die Netz-Bausteine unverändert aus der gemeinsamen Quelle übernehmen und per Prüfsumme bewachen
  - B-48: Das System muss nur eigene Offline-Vorräte aufräumen, nie die anderer Apps auf derselben Adresse

## Bedarfsprotokoll – Änderungen
- NEU B-01 [Bereich 1]: „Website“
- NEU B-02 [Bereich 1]: „eine alte Seite mit festen Firmendaten, Fotos und eingebundenem Instagram und Google Maps“
- NEU B-03 [Bereich 2]: „Werbung“
- NEU B-04 [Bereich 2]: „Anfrage“
- NEU B-05 [Bereich 3]: „Inhaber“
- NEU B-06 [Bereich 3]: „Mitarbeiter in Werkstatt und Montage (pflegen Bilder)“
- NEU B-07 [Bereich 3]: „Kunden und Interessenten (Besucher, nicht Nutzer)“
- NEU B-08 [Bereich 4]: „Die Seite lädt langsam und sieht am Handy veraltet aus“
- NEU B-09 [Bereich 4]: „Fremde Einbettungen (Karte, Instagram) geben Besucherdaten weiter“
- NEU B-10 [Bereich 5]: „Die Seite ist an eine Firma gebunden und lässt sich nicht für einen zweiten Betrieb verwenden“
- NEU B-11 [Bereich 6]: „Eine Website mit Start, Leistungen, Info zu Anlagen, Fragen und Antworten, Team und Kontakt“ (Muss, Nutzen: Kunden finden alles an einem Ort)
- NEU B-12 [Bereich 6]: „Ohne echte Firmendaten: alle Namen, Adressen und Kontakte als Platzhalter, damit die Seite als Vorlage taugt“ (Muss, Nutzen: für mehrere Betriebe verwendbar)
- NEU B-13 [Bereich 6]: „Installierbar und nach dem ersten Besuch ohne Internet lesbar“ (Muss)
- NEU B-14 [Bereich 6]: „Eigene Bilder ohne Programmierkenntnis auf jede Bildfläche ziehen, lokal gespeichert“ (Soll, Nutzen: 1 h/Monat, Fotos aus der Werkstatt selbst einsetzen)
- NEU B-15 [Bereich 6]: „Hell, Dunkel und ein Kontrast-Thema zum Umschalten“ (Soll)
- NEU B-16 [Bereich 6]: „Ein lebendiger Auftritt: Glas-Knöpfe und animierter Hintergrund“ (Kann)
- NEU B-33 [Bereich 6]: „Schneller Seitenaufbau und lesbarer Kontrast am Handy“ (Muss, Nutzen: Besucher springen nicht ab)
- NEU B-34 [Bereich 6]: „Die Seite ist ein Knoten im Netz der eigenen Apps, mit Netz-Fenster und Gerätename“ (Soll, Nutzen: 1 h/Monat)
- NEU B-35 [Bereich 6]: „Ein Siegel zeigt, wer die Seite betreibt, mit eigener unterschriebener Kennung“ (Soll)
- NEU B-36 [Bereich 6]: „Rechte und Lizenz der Vorlage klar benannt“ (Muss)
- NEU B-41 [Bereich 6]: „Netz-Fenster und Siegel auch auf Englisch“ (Soll)
- NEU B-42 [Bereich 6]: „Schutz im Netz: Sperrliste, Bürgen, Aufwand je Zettel, aktuell gehalten“ (Soll)
- NEU B-43 [Bereich 6]: „Eine Seite, die in einfachen Worten erklärt, was Netz, Siegel und Schutz dem Besucher nützen“ (Kann)
- NEU B-44 [Bereich 6]: „Ein fester Installieren-Knopf oben, der als App verschwindet“ (Muss, Nutzen: mehr Besucher installieren die Seite)
- NEU B-45 [Bereich 6]: „Die Seite sagt selbst, dass sie eine Vorlage ist“ (Muss)
- NEU B-17 [Bereich 7]: „Ein Besucher findet am Handy in Sekunden Leistungen und Kontakt; die Vorlage lässt sich für einen neuen Betrieb in einer Stunde anpassen“
- NEU B-18 [Bereich 8]: „Das System muss als eine selbst-enthaltende Seite mit sechs Bereichen laufen: Start, Leistungen, Anlagen, Fragen und Antworten, Team, Kontakt“
- NEU B-19 [Bereich 8]: „Das System muss ohne Bilder ausgeliefert werden und fehlende Fotos durch neutrale Platzhalter ersetzen“
- NEU B-20 [Bereich 8]: „Das System muss eigene Bilder per Ziehen oder Kamera-Symbol annehmen und nur im Browser des Geräts speichern“
- NEU B-21 [Bereich 8]: „Das System muss sich installieren lassen und nach dem ersten Besuch offline funktionieren (Service Worker, Manifest)“
- NEU B-22 [Bereich 8]: „Das System muss die Themen Hell, Dunkel und Kontrast anbieten und die Wahl merken“
- NEU B-23 [Bereich 8]: „Das System darf keine echten Firmen- oder Personendaten enthalten; jede Angabe ist ein erkennbarer Platzhalter“
- NEU B-37 [Bereich 8]: „Das System muss den animierten Hintergrund erst nach dem Laden starten, damit der erste Aufbau nicht wartet“
- NEU B-38 [Bereich 8]: „Das System muss als Netz-Endknoten eine eigene Ablage haben und beim Laden nichts ins Netz senden“
- NEU B-39 [Bereich 8]: „Das System muss die eigene Kennung (Spore) unterschrieben veröffentlichen und im Siegel prüfbar zeigen“
- NEU B-47 [Bereich 8]: „Das System muss die Netz-Bausteine unverändert aus der gemeinsamen Quelle übernehmen und per Prüfsumme bewachen“
- NEU B-48 [Bereich 8]: „Das System muss nur eigene Offline-Vorräte aufräumen, nie die anderer Apps auf derselben Adresse“
- NEU B-24 [Bereich 9]: „für Inhaber ohne Technikwissen; Besucher auf Handy, Tablet und PC“
- NEU B-46 [Bereich 9]: „Oberfläche Deutsch, Netz-Bausteine Deutsch und Englisch“
- NEU B-25 [Bereich 10]: „Browser“
- NEU B-26 [Bereich 10]: „offline“
- NEU B-27 [Bereich 11]: „alte Website mit Fremd-Einbettungen (wird abgelöst)“
- NEU B-40 [Bereich 12]: „Netz der eigenen Apps (SBKIM, Mycel) über Relais“
- NEU B-28 [Bereich 13]: „Leistungen, Projekte, Team, Kontaktangaben, Fotos“
- NEU B-29 [Bereich 14]: „personenbezogene Daten: nur Platzhalter, keine echten“
- NEU B-30 [Bereich 15]: „Vorgaben“
- NEU B-31 [Bereich 15]: „kein Zähldienst, keine Karte und kein Instagram eines Fremdanbieters eingebunden“
- NEU B-32 [Bereich 15]: „keine externen Bibliotheken aus fremden Quellen, alles mitgeliefert“
- NEU O-01 [Bereich 18]: „Welche Leistungen und Projekte sollen als Muster dastehen?“

## Offene Punkte
- O-01: Welche Leistungen und Projekte sollen als Muster dastehen? (klärt ⟦KUNDE-2⟧ bis 2026-07-15)

## Summe
Stunden F3 79,1–151,5 · Kosten-Nutzen: Grenzlinie keine

Die Summe enthält zusätzlich zu den Zeilen: Anpassung an den Betrieb 2–6 h, Abstimmung 15 % (8,8–16,8 h), Puffer 20 % (11,7–22,4 h).

## Erklärungen und Sterne
- Verschwiegenheitserklärung aktiviert: nein · Vereinbarung Zahlung/Rechte aktiviert: nein · Wartungsvertrag aktiviert: nein
- Sterne B-11: beim Bedarf Ø 4,5 (2) · bei der Abnahme Ø 4,5 (2)
- Sterne B-13: beim Bedarf Ø 3,5 (2) · bei der Abnahme Ø 4,5 (2)
- Sterne B-14: beim Bedarf Ø 3,5 (2) · bei der Abnahme Ø 4,5 (2)
- Sterne B-33: beim Bedarf Ø 4,5 (2) · bei der Abnahme Ø 5 (2)
- Sterne B-44: beim Bedarf Ø 3,5 (2) · bei der Abnahme Ø 3,5 (2)

## Vollständiger Stand (zum Einlesen)
```json
{"bedarf":[{"id":"B-01","nr":1,"text":"Website","sichtbar":true},{"id":"B-02","nr":1,"text":"eine alte Seite mit festen Firmendaten, Fotos und eingebundenem Instagram und Google Maps","sichtbar":true},{"id":"B-03","nr":2,"text":"Werbung","sichtbar":true},{"id":"B-04","nr":2,"text":"Anfrage","sichtbar":true},{"id":"B-05","nr":3,"text":"Inhaber","sichtbar":true,"anzahl":1},{"id":"B-06","nr":3,"text":"Mitarbeiter in Werkstatt und Montage (pflegen Bilder)","sichtbar":true,"anzahl":2},{"id":"B-07","nr":3,"text":"Kunden und Interessenten (Besucher, nicht Nutzer)","sichtbar":true,"anzahl":1},{"id":"B-08","nr":4,"text":"Die Seite lädt langsam und sieht am Handy veraltet aus","sichtbar":true},{"id":"B-09","nr":4,"text":"Fremde Einbettungen (Karte, Instagram) geben Besucherdaten weiter","sichtbar":true},{"id":"B-10","nr":5,"text":"Die Seite ist an eine Firma gebunden und lässt sich nicht für einen zweiten Betrieb verwenden","sichtbar":true},{"id":"B-11","nr":6,"text":"Eine Website mit Start, Leistungen, Info zu Anlagen, Fragen und Antworten, Team und Kontakt","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"Kunden finden alles an einem Ort"}},{"id":"B-12","nr":6,"text":"Ohne echte Firmendaten: alle Namen, Adressen und Kontakte als Platzhalter, damit die Seite als Vorlage taugt","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"für mehrere Betriebe verwendbar"}},{"id":"B-13","nr":6,"text":"Installierbar und nach dem ersten Besuch ohne Internet lesbar","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-14","nr":6,"text":"Eigene Bilder ohne Programmierkenntnis auf jede Bildfläche ziehen, lokal gespeichert","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":1,"text":"Fotos aus der Werkstatt selbst einsetzen"}},{"id":"B-15","nr":6,"text":"Hell, Dunkel und ein Kontrast-Thema zum Umschalten","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-16","nr":6,"text":"Ein lebendiger Auftritt: Glas-Knöpfe und animierter Hintergrund","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-33","nr":6,"text":"Schneller Seitenaufbau und lesbarer Kontrast am Handy","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"Besucher springen nicht ab"}},{"id":"B-34","nr":6,"text":"Die Seite ist ein Knoten im Netz der eigenen Apps, mit Netz-Fenster und Gerätename","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":1,"text":""}},{"id":"B-35","nr":6,"text":"Ein Siegel zeigt, wer die Seite betreibt, mit eigener unterschriebener Kennung","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-36","nr":6,"text":"Rechte und Lizenz der Vorlage klar benannt","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-41","nr":6,"text":"Netz-Fenster und Siegel auch auf Englisch","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-42","nr":6,"text":"Schutz im Netz: Sperrliste, Bürgen, Aufwand je Zettel, aktuell gehalten","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-43","nr":6,"text":"Eine Seite, die in einfachen Worten erklärt, was Netz, Siegel und Schutz dem Besucher nützen","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-44","nr":6,"text":"Ein fester Installieren-Knopf oben, der als App verschwindet","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"mehr Besucher installieren die Seite"}},{"id":"B-45","nr":6,"text":"Die Seite sagt selbst, dass sie eine Vorlage ist","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-17","nr":7,"text":"Ein Besucher findet am Handy in Sekunden Leistungen und Kontakt; die Vorlage lässt sich für einen neuen Betrieb in einer Stunde anpassen","sichtbar":true},{"id":"B-18","nr":8,"text":"Das System muss als eine selbst-enthaltende Seite mit sechs Bereichen laufen: Start, Leistungen, Anlagen, Fragen und Antworten, Team, Kontakt","sichtbar":true},{"id":"B-19","nr":8,"text":"Das System muss ohne Bilder ausgeliefert werden und fehlende Fotos durch neutrale Platzhalter ersetzen","sichtbar":true},{"id":"B-20","nr":8,"text":"Das System muss eigene Bilder per Ziehen oder Kamera-Symbol annehmen und nur im Browser des Geräts speichern","sichtbar":true},{"id":"B-21","nr":8,"text":"Das System muss sich installieren lassen und nach dem ersten Besuch offline funktionieren (Service Worker, Manifest)","sichtbar":true},{"id":"B-22","nr":8,"text":"Das System muss die Themen Hell, Dunkel und Kontrast anbieten und die Wahl merken","sichtbar":true},{"id":"B-23","nr":8,"text":"Das System darf keine echten Firmen- oder Personendaten enthalten; jede Angabe ist ein erkennbarer Platzhalter","sichtbar":true},{"id":"B-37","nr":8,"text":"Das System muss den animierten Hintergrund erst nach dem Laden starten, damit der erste Aufbau nicht wartet","sichtbar":true},{"id":"B-38","nr":8,"text":"Das System muss als Netz-Endknoten eine eigene Ablage haben und beim Laden nichts ins Netz senden","sichtbar":true},{"id":"B-39","nr":8,"text":"Das System muss die eigene Kennung (Spore) unterschrieben veröffentlichen und im Siegel prüfbar zeigen","sichtbar":true},{"id":"B-47","nr":8,"text":"Das System muss die Netz-Bausteine unverändert aus der gemeinsamen Quelle übernehmen und per Prüfsumme bewachen","sichtbar":true},{"id":"B-48","nr":8,"text":"Das System muss nur eigene Offline-Vorräte aufräumen, nie die anderer Apps auf derselben Adresse","sichtbar":true},{"id":"B-24","nr":9,"text":"für Inhaber ohne Technikwissen; Besucher auf Handy, Tablet und PC","sichtbar":true},{"id":"B-46","nr":9,"text":"Oberfläche Deutsch, Netz-Bausteine Deutsch und Englisch","sichtbar":true},{"id":"B-25","nr":10,"text":"Browser","sichtbar":true},{"id":"B-26","nr":10,"text":"offline","sichtbar":true},{"id":"B-27","nr":11,"text":"alte Website mit Fremd-Einbettungen (wird abgelöst)","sichtbar":true},{"id":"B-40","nr":12,"text":"Netz der eigenen Apps (SBKIM, Mycel) über Relais","sichtbar":true},{"id":"B-28","nr":13,"text":"Leistungen, Projekte, Team, Kontaktangaben, Fotos","sichtbar":true},{"id":"B-29","nr":14,"text":"personenbezogene Daten: nur Platzhalter, keine echten","sichtbar":true},{"id":"B-30","nr":15,"text":"Vorgaben","sichtbar":true},{"id":"B-31","nr":15,"text":"kein Zähldienst, keine Karte und kein Instagram eines Fremdanbieters eingebunden","sichtbar":true},{"id":"B-32","nr":15,"text":"keine externen Bibliotheken aus fremden Quellen, alles mitgeliefert","sichtbar":true},{"id":"O-01","nr":18,"text":"Welche Leistungen und Projekte sollen als Muster dastehen?","sichtbar":true,"wer":"⟦KUNDE-2⟧","bis":"2026-07-15"}],"bausteine":[{"id":"K-01","katalog":"seite","name":"Website mit sechs Bereichen, neutralen Platzhaltern und Themen","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-11","B-12","B-15"],"ermaessigt":false},{"id":"K-02","katalog":"seite","name":"Installierbare Web-App mit Offline-Vorrat","menge":1,"groesse":"klein","faktoren":["offline"],"deckt":["B-13"],"ermaessigt":false},{"id":"K-03","katalog":"neu","name":"Bilder per Ziehen auf jede Fläche, lokal gespeichert","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-14"],"ermaessigt":false},{"id":"K-04","katalog":"neu","name":"Glas-Knöpfe und animierter Partikel-Hintergrund","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-16"],"ermaessigt":false},{"id":"K-05","katalog":"seite","name":"Ladezeit und Kontrast: Hintergrund nach dem Laden, Schutzstufen","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-33"],"ermaessigt":false},{"id":"K-06","katalog":"schnitt","name":"Netz-Endknoten mit Netz-Fenster, Gerätename und eigener Ablage","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-34","B-40"],"ermaessigt":false},{"id":"K-07","katalog":"neu","name":"Siegel mit Andock-Assistent und veröffentlichter Spore","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-35"],"ermaessigt":false},{"id":"K-08","katalog":"neu","name":"Lizenz und Rechte-Erklärung","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-36"],"ermaessigt":false},{"id":"K-09","katalog":"schnitt","name":"Netz-Bausteine nachgezogen: Englisch, Sperrliste, Bürgen, Rechenaufwand","menge":1,"groesse":"mittel","faktoren":["sprachen"],"deckt":["B-41","B-42"],"ermaessigt":false},{"id":"K-10","katalog":"seite","name":"Erklärseiten zu Netz, Siegel und Schutz","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-43"],"ermaessigt":false},{"id":"K-11","katalog":"seite","name":"Installieren-Knopf und Vorlagen-Hinweis auf der Seite","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-44","B-45"],"ermaessigt":false}],"rahmen":{"eigeneText":"","geraete":["browser"],"offline":"unterwegs","abgleich":"eins","eigene":[],"datenort":["geraet"],"sicherung":[],"ki":"keine"},"nicht":[{"id":"N-01","text":"Keine echten Firmendaten in der Vorlage","sichtbar":true}]}
```
