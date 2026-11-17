---
art: bauauftrag
format: 1
vorgang: V-2026-0001
fassung: 2
vorher: -
fassungsdatum: 2026-07-23
datum: 2026-07-23
kunde: "⟦KUNDE-1⟧"
verdeckt: ja
stunden: ja
euro: nein
repo: "Workflow-Needs"  # Werkzeug, das den Auftrag erzeugt hat — nicht das Ziel
---

# Bauauftrag · Fassung 2

**Anlass:** Die Seite lädt am Handy zu langsam, Rechte und Copyright fehlen, und ein Versprechen stimmt nicht mit der App überein  ·  **von:** Kunde

**Vorhaben:** Werbe- und Landingpage für eine Getränke-App

**Gesamtauftrag:** keine frühere Fassung in diesem Auftrag — alles unter „Zu tun“ ist neu zu bauen. Das Datum der Fassung steht im Kopf (`fassungsdatum`), `datum` ist der Tag der Erzeugung.

## Rahmen
- Geräte: im Browser
- Ohne Internet: nein
- Abgleich zwischen Geräten: nein, ein Gerät reicht
- Daten liegen: nur auf dem Gerät
- KI: keine KI
- Nicht bauen: N-01 Keine fremden Dienste beim Laden der Seite

## Zu tun (für die Sitzung)
| Aktion | Kennung | Was | Größe | Stunden (Schätzung) | deckt Bedarf |
|---|---|---|---|---|---|
| NEU BAUEN | K-01 | Landing-Page im Verbund-Look: Themen, DE/EN, Abschnitte, Knopf zur App | mittel | 7,2–12 | B-10, B-12, B-26 |
| NEU BAUEN | K-02 | Demo-Video und Intro-Video, Container in Bildschirmhöhe | klein | 10–20 | B-11 |
| NEU BAUEN | K-03 | Abschnitt „Bau dir deine eigene Bar“ mit Bildern und Galerie aus dem echten Buch | klein | 10–20 | B-13, B-14 |
| NEU BAUEN | K-04 | Ladezeit und Barrierefreiheit: Hintergrund nachgeladen, fragt nach dem Grafikchip, Fuß-Block folgt der Seite | mittel | 8,4–14 | B-32 |
| NEU BAUEN | K-05 | Rechte: LICENSE, RECHTE.md, Copyright-Kasten, Wasserzeichen, neues Icon | klein | 10–20 | B-33 |
| NEU BAUEN | K-06 | Texte an die App angeglichen, Mikrofon-Sprache wählbar | klein | 10–20 | B-35, B-34 |

### Je Baustein: Vorlage und Abnahme
- K-01 · Vorlage Mein-Rezeptbuch-Page, Workfloh-PDF-Page (50 % wiederverwendet) · Faktoren Mehrsprachig ×1,2
- K-04 · Vorlage Mein-Rezeptbuch-Page, Workfloh-PDF-Page (30 % wiederverwendet)
- ohne Baustein (trotzdem abnehmen):
  - B-16: Das System muss die App vorstellen: Zweck (persönliches Getränke-Labor), Besonderheiten, Tauschen und Sichern, Umbau zur eigenen Bar
  - B-17: Das System muss als statische Seite ohne Server und ohne Build-Schritt laufen (GitHub Pages, Auslieferung von main)
  - B-18: Das System muss ein Demo-Video und ein Intro-Video in Bildschirmhöhe zeigen
  - B-19: Das System muss zwischen Deutsch und Englisch und zwischen drei Themen (Dunkel, Neon, Hell) umschalten
  - B-20: Das System muss mit einem Knopf „App öffnen“ zur App Mein Mixarium führen und auf den Familien-Verbund verweisen
  - B-21: Das System muss alle Bibliotheken mitliefern (three.js unter vendor/) und darf kein CDN laden
  - B-36: Das System muss den animierten Hintergrund erst nach dem Laden holen und auf schwachen Grafikchips abschalten
  - B-37: Das System muss jede Funktion, die es nennt, gegen die laufende App prüfen lassen; ein Satz ohne Gegenstück in der App wird gestrichen

## Bedarfsprotokoll – Änderungen
- NEU B-01 [Bereich 1]: „nichts“
- NEU B-02 [Bereich 1]: „die App gibt es schon, aber niemand findet sie; Verweise gehen direkt auf die App ohne Erklärung“
- NEU B-03 [Bereich 2]: „Kundenkontakt“
- NEU B-04 [Bereich 2]: „neue Nutzer gewinnen und ihnen zeigen, was die App kann“
- NEU B-05 [Bereich 3]: „Inhaber“
- NEU B-06 [Bereich 3]: „Besucher der Seite (Interessenten, nicht selbst Nutzer der Seitenpflege)“
- NEU B-07 [Bereich 4]: „fehlende Übersicht“
- NEU B-08 [Bereich 4]: „Interessenten verstehen nicht, was die App kann, bevor sie sie öffnen“
- NEU B-09 [Bereich 5]: „Die App öffnet direkt im Werkzeug, eine Vorstellung fehlt“
- NEU B-10 [Bereich 6]: „Eine eigene Internetseite, die die App vorstellt und mit einem Knopf zur App führt“ (Muss, Nutzen: 2 h/Monat, mehr Besucher finden zur App)
- NEU B-11 [Bereich 6]: „Ein Demo-Video, das die App in Aktion zeigt (Buch, Suche, Wischen, KI-Labor, Themen)“ (Muss, Nutzen: 1 h/Monat, Erklären ohne Text)
- NEU B-12 [Bereich 6]: „Derselbe Auftritt wie die Schwester-Seiten des Familien-Verbunds: Themen Dunkel/Neon/Hell, Deutsch und Englisch“ (Soll)
- NEU B-13 [Bereich 6]: „Zeigen, dass die App zu einer eigenen Bar oder Theke umgebaut werden kann (Rezept-Paket hereinladen)“ (Soll, Nutzen: spricht Gastronomie an)
- NEU B-14 [Bereich 6]: „Bilder aus dem echten Buch als Beleg“ (Kann)
- NEU B-32 [Bereich 6]: „Die Seite lädt am Handy schnell und ist barrierefrei (gemessen, nicht geschätzt)“ (Muss, Nutzen: 1 h/Monat, Besucher springen nicht ab)
- NEU B-33 [Bereich 6]: „Rechte klar: Copyright-Kasten mit Kontakt, Lizenz und Rechte-Erklärung, neues App-Icon“ (Muss)
- NEU B-34 [Bereich 6]: „Das Mikrofon im Demo hört die gesprochene Sprache, nicht die Sprache der Seite“ (Kann)
- NEU B-35 [Bereich 6]: „Die Seite verspricht nur, was die App wirklich kann“ (Muss, Nutzen: keine Enttäuschung nach dem Öffnen)
- NEU B-15 [Bereich 7]: „Wer die Seite öffnet, weiß nach einer Minute, was die App kann, und ist mit einem Tipp in der App“
- NEU B-16 [Bereich 8]: „Das System muss die App vorstellen: Zweck (persönliches Getränke-Labor), Besonderheiten, Tauschen und Sichern, Umbau zur eigenen Bar“
- NEU B-17 [Bereich 8]: „Das System muss als statische Seite ohne Server und ohne Build-Schritt laufen (GitHub Pages, Auslieferung von main)“
- NEU B-18 [Bereich 8]: „Das System muss ein Demo-Video und ein Intro-Video in Bildschirmhöhe zeigen“
- NEU B-19 [Bereich 8]: „Das System muss zwischen Deutsch und Englisch und zwischen drei Themen (Dunkel, Neon, Hell) umschalten“
- NEU B-20 [Bereich 8]: „Das System muss mit einem Knopf „App öffnen“ zur App Mein Mixarium führen und auf den Familien-Verbund verweisen“
- NEU B-21 [Bereich 8]: „Das System muss alle Bibliotheken mitliefern (three.js unter vendor/) und darf kein CDN laden“
- NEU B-36 [Bereich 8]: „Das System muss den animierten Hintergrund erst nach dem Laden holen und auf schwachen Grafikchips abschalten“
- NEU B-37 [Bereich 8]: „Das System muss jede Funktion, die es nennt, gegen die laufende App prüfen lassen; ein Satz ohne Gegenstück in der App wird gestrichen“
- NEU B-22 [Bereich 9]: „Pflege durch den Inhaber selbst, keine Schulung nötig“
- NEU B-23 [Bereich 10]: „Geräte“
- NEU B-24 [Bereich 10]: „Handy, Tablet und Rechner, Handy-Ansicht zuerst“
- NEU B-25 [Bereich 11]: „App Mein Mixarium (eigene Adresse, bleibt unverändert)“
- NEU B-26 [Bereich 12]: „Verweis zur App und zu Impressum/Datenschutz der App“
- NEU B-27 [Bereich 13]: „Videos, Bilder aus dem Buch, Texte in zwei Sprachen“
- NEU B-28 [Bereich 14]: „personenbezogene Daten: nein“
- NEU B-29 [Bereich 14]: „kein Formular, keine Anmeldung, kein Zähldienst“
- NEU B-30 [Bereich 15]: „Vorgaben“
- NEU B-31 [Bereich 15]: „Optik aus der Schwester-Seite übernehmen, nicht neu erfinden“
- NEU B-38 [Bereich 15]: „keine Werbung für Funktionen, die es nicht gibt“
- NEU O-01 [Bereich 18]: „Welche Bilder aus dem Buch dürfen gezeigt werden?“

## Offene Punkte
- O-01: Welche Bilder aus dem Buch dürfen gezeigt werden? (klärt ⟦KUNDE-2⟧ bis 2026-07-05)

## Summe
Stunden F2 77,8–151,2 · Kosten-Nutzen: Grenzlinie keine

Die Summe enthält zusätzlich zu den Zeilen: Anpassung an den Betrieb 2–6 h, Abstimmung 15 % (8,6–16,8 h), Puffer 20 % (11,5–22,4 h).

## Erklärungen und Sterne
- Verschwiegenheitserklärung aktiviert: nein · Vereinbarung Zahlung/Rechte aktiviert: nein · Wartungsvertrag aktiviert: nein
- Sterne B-10: beim Bedarf Ø 4,5 (2) · bei der Abnahme Ø 5 (2)
- Sterne B-11: beim Bedarf Ø 4,5 (2) · bei der Abnahme Ø 4,5 (2)
- Sterne B-12: beim Bedarf Ø 3 (2) · bei der Abnahme Ø 4 (2)
- Sterne B-13: beim Bedarf Ø 3,5 (2) · bei der Abnahme Ø 4,5 (2)
- Sterne B-32: beim Bedarf Ø 4,5 (2) · bei der Abnahme Ø 5 (2)
- Sterne B-35: beim Bedarf Ø 3,5 (2) · bei der Abnahme Ø 4,5 (2)

## Vollständiger Stand (zum Einlesen)
```json
{"bedarf":[{"id":"B-01","nr":1,"text":"nichts","sichtbar":true},{"id":"B-02","nr":1,"text":"die App gibt es schon, aber niemand findet sie; Verweise gehen direkt auf die App ohne Erklärung","sichtbar":true},{"id":"B-03","nr":2,"text":"Kundenkontakt","sichtbar":true},{"id":"B-04","nr":2,"text":"neue Nutzer gewinnen und ihnen zeigen, was die App kann","sichtbar":true},{"id":"B-05","nr":3,"text":"Inhaber","sichtbar":true,"anzahl":1},{"id":"B-06","nr":3,"text":"Besucher der Seite (Interessenten, nicht selbst Nutzer der Seitenpflege)","sichtbar":true,"anzahl":1},{"id":"B-07","nr":4,"text":"fehlende Übersicht","sichtbar":true},{"id":"B-08","nr":4,"text":"Interessenten verstehen nicht, was die App kann, bevor sie sie öffnen","sichtbar":true},{"id":"B-09","nr":5,"text":"Die App öffnet direkt im Werkzeug, eine Vorstellung fehlt","sichtbar":true},{"id":"B-10","nr":6,"text":"Eine eigene Internetseite, die die App vorstellt und mit einem Knopf zur App führt","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":2,"text":"mehr Besucher finden zur App"}},{"id":"B-11","nr":6,"text":"Ein Demo-Video, das die App in Aktion zeigt (Buch, Suche, Wischen, KI-Labor, Themen)","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":1,"text":"Erklären ohne Text"}},{"id":"B-12","nr":6,"text":"Derselbe Auftritt wie die Schwester-Seiten des Familien-Verbunds: Themen Dunkel/Neon/Hell, Deutsch und Englisch","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-13","nr":6,"text":"Zeigen, dass die App zu einer eigenen Bar oder Theke umgebaut werden kann (Rezept-Paket hereinladen)","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":"spricht Gastronomie an"}},{"id":"B-14","nr":6,"text":"Bilder aus dem echten Buch als Beleg","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-32","nr":6,"text":"Die Seite lädt am Handy schnell und ist barrierefrei (gemessen, nicht geschätzt)","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":1,"text":"Besucher springen nicht ab"}},{"id":"B-33","nr":6,"text":"Rechte klar: Copyright-Kasten mit Kontakt, Lizenz und Rechte-Erklärung, neues App-Icon","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-34","nr":6,"text":"Das Mikrofon im Demo hört die gesprochene Sprache, nicht die Sprache der Seite","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-35","nr":6,"text":"Die Seite verspricht nur, was die App wirklich kann","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"keine Enttäuschung nach dem Öffnen"}},{"id":"B-15","nr":7,"text":"Wer die Seite öffnet, weiß nach einer Minute, was die App kann, und ist mit einem Tipp in der App","sichtbar":true},{"id":"B-16","nr":8,"text":"Das System muss die App vorstellen: Zweck (persönliches Getränke-Labor), Besonderheiten, Tauschen und Sichern, Umbau zur eigenen Bar","sichtbar":true},{"id":"B-17","nr":8,"text":"Das System muss als statische Seite ohne Server und ohne Build-Schritt laufen (GitHub Pages, Auslieferung von main)","sichtbar":true},{"id":"B-18","nr":8,"text":"Das System muss ein Demo-Video und ein Intro-Video in Bildschirmhöhe zeigen","sichtbar":true},{"id":"B-19","nr":8,"text":"Das System muss zwischen Deutsch und Englisch und zwischen drei Themen (Dunkel, Neon, Hell) umschalten","sichtbar":true},{"id":"B-20","nr":8,"text":"Das System muss mit einem Knopf „App öffnen“ zur App Mein Mixarium führen und auf den Familien-Verbund verweisen","sichtbar":true},{"id":"B-21","nr":8,"text":"Das System muss alle Bibliotheken mitliefern (three.js unter vendor/) und darf kein CDN laden","sichtbar":true},{"id":"B-36","nr":8,"text":"Das System muss den animierten Hintergrund erst nach dem Laden holen und auf schwachen Grafikchips abschalten","sichtbar":true},{"id":"B-37","nr":8,"text":"Das System muss jede Funktion, die es nennt, gegen die laufende App prüfen lassen; ein Satz ohne Gegenstück in der App wird gestrichen","sichtbar":true},{"id":"B-22","nr":9,"text":"Pflege durch den Inhaber selbst, keine Schulung nötig","sichtbar":true},{"id":"B-23","nr":10,"text":"Geräte","sichtbar":true},{"id":"B-24","nr":10,"text":"Handy, Tablet und Rechner, Handy-Ansicht zuerst","sichtbar":true},{"id":"B-25","nr":11,"text":"App Mein Mixarium (eigene Adresse, bleibt unverändert)","sichtbar":true},{"id":"B-26","nr":12,"text":"Verweis zur App und zu Impressum/Datenschutz der App","sichtbar":true},{"id":"B-27","nr":13,"text":"Videos, Bilder aus dem Buch, Texte in zwei Sprachen","sichtbar":true},{"id":"B-28","nr":14,"text":"personenbezogene Daten: nein","sichtbar":true},{"id":"B-29","nr":14,"text":"kein Formular, keine Anmeldung, kein Zähldienst","sichtbar":true},{"id":"B-30","nr":15,"text":"Vorgaben","sichtbar":true},{"id":"B-31","nr":15,"text":"Optik aus der Schwester-Seite übernehmen, nicht neu erfinden","sichtbar":true},{"id":"B-38","nr":15,"text":"keine Werbung für Funktionen, die es nicht gibt","sichtbar":true},{"id":"O-01","nr":18,"text":"Welche Bilder aus dem Buch dürfen gezeigt werden?","sichtbar":true,"wer":"⟦KUNDE-2⟧","bis":"2026-07-05"}],"bausteine":[{"id":"K-01","katalog":"seite","name":"Landing-Page im Verbund-Look: Themen, DE/EN, Abschnitte, Knopf zur App","menge":1,"groesse":"mittel","faktoren":["sprachen"],"deckt":["B-10","B-12","B-26"],"ermaessigt":false},{"id":"K-02","katalog":"neu","name":"Demo-Video und Intro-Video, Container in Bildschirmhöhe","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-11"],"ermaessigt":false},{"id":"K-03","katalog":"neu","name":"Abschnitt „Bau dir deine eigene Bar“ mit Bildern und Galerie aus dem echten Buch","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-13","B-14"],"ermaessigt":false},{"id":"K-04","katalog":"seite","name":"Ladezeit und Barrierefreiheit: Hintergrund nachgeladen, fragt nach dem Grafikchip, Fuß-Block folgt der Seite","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-32"],"ermaessigt":false},{"id":"K-05","katalog":"neu","name":"Rechte: LICENSE, RECHTE.md, Copyright-Kasten, Wasserzeichen, neues Icon","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-33"],"ermaessigt":false},{"id":"K-06","katalog":"neu","name":"Texte an die App angeglichen, Mikrofon-Sprache wählbar","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-35","B-34"],"ermaessigt":false}],"rahmen":{"eigeneText":"","geraete":["browser"],"offline":"nein","abgleich":"eins","eigene":[],"datenort":["geraet"],"sicherung":[],"ki":"keine"},"nicht":[{"id":"N-01","text":"Keine fremden Dienste beim Laden der Seite","sichtbar":true}]}
```
