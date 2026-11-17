---
art: bauauftrag
format: 1
vorgang: V-2026-0001
fassung: 4
vorher: -
fassungsdatum: 2026-08-23
datum: 2026-08-23
kunde: "⟦KUNDE-1⟧"
verdeckt: ja
stunden: ja
euro: nein
repo: "Workflow-Needs"  # Werkzeug, das den Auftrag erzeugt hat — nicht das Ziel
---

# Bauauftrag · Fassung 4

**Anlass:** Im Alltag fielen Lücken auf: Rezepte ohne Kategorie verschwanden, Kamerafotos wurden abgewiesen, Text ging ungeprüft an die KI  ·  **von:** Kunde

**Vorhaben:** Familienrezepte digital sammeln, planen und teilen

**Gesamtauftrag:** keine frühere Fassung in diesem Auftrag — alles unter „Zu tun“ ist neu zu bauen. Das Datum der Fassung steht im Kopf (`fassungsdatum`), `datum` ist der Tag der Erzeugung.

## Rahmen
- Geräte: Android-Handy, iPhone, Tablet, im Browser
- Ohne Internet: ja, immer
- Abgleich zwischen Geräten: ja, Abgleich ab und zu reicht
- Daten liegen: nur auf dem Gerät
- Sicherung: selbst anstoßen
- Eigene Programme: Dateien hin- und hergeben; Rezepte zwischen Mein Rezeptbuch, Muttis Rezeptbuch und Mein Mixarium austauschen
- KI: über einen Dienst (nach Bestätigung)
- Schlägt vor, der Kunde bestätigt: B-11, B-15, B-43, B-53
- Nicht bauen: N-01 Kein Konto und keine Anmeldung beim Hersteller

## Zu tun (für die Sitzung)
| Aktion | Kennung | Was | Größe | Stunden (Schätzung) | deckt Bedarf |
|---|---|---|---|---|---|
| NEU BAUEN | K-01 | Rezeptbuch: Rezepte, Kategorien, Ordner mit Ziehen und Ablegen, Suche | groß | 7,4–12,9 | B-11 |
| NEU BAUEN | K-02 | Import: Webadresse, KI-Scan von Foto, PDF und ganzen Ordnern, Eintippen | groß | 9–15 | B-12, B-33 |
| NEU BAUEN | K-03 | Installierbare Web-App mit Offline-Vorrat (Service Worker) | mittel | 6–10 | B-13 |
| NEU BAUEN | K-04 | Sicherung als JSON-Datei und Backup-Tresor mit mehreren Ständen | mittel | 6,4–11,2 | B-14 |
| NEU BAUEN | K-05 | Menüplaner mit Einkaufsliste nach Kategorien und Portionsrechner | mittel | 24–44 | B-15 |
| NEU BAUEN | K-06 | 8 Sprachen für Oberfläche, Handbuch und Einheiten; Rezeptübersetzer | mittel | 28,8–52,8 | B-16 |
| NEU BAUEN | K-07 | Teilen per Code zum Scannen, Datei und Druck | klein | 11–22 | B-17 |
| NEU BAUEN | K-08 | KI-Bild je Rezept und für viele Rezepte, mit Kosten und Fortschritt | mittel | 30–55 | B-40 |
| NEU BAUEN | K-09 | KI-Kreativbuch aus gewählten Rezepten, scrollbarer Download | mittel | 30–55 | B-41 |
| NEU BAUEN | K-10 | Food-Zine: Poster-Seite, Prompt-Generator, Galerie mit Ziehen | mittel | 24–44 | B-42 |
| NEU BAUEN | K-11 | Kategorie-Zuordnung beim Import fremder Dateien | klein | 4–8 | B-43 |
| NEU BAUEN | K-12 | Knoten im App-Netz: Identität, Siegel, Mycel-Fenster, Verbinden auf Wunsch | groß | 11,7–23,4 | B-47 |
| NEU BAUEN | K-13 | Bedeutungssuche auf dem Gerät, im Hintergrund gerechnet | mittel | 12–20,4 | B-48 |
| NEU BAUEN | K-14 | Schneller Start: Symbole als Dateien, kleinerer erster Anstrich | klein | 10–20 | B-49 |
| NEU BAUEN | K-15 | Kategorien verwalten: umbenennen, Symbole, löschen, zusammenlegen, sortieren | mittel | 3,2–5,6 | B-53 |
| NEU BAUEN | K-16 | Herkunft am Rezept und Wiedererkennen beim Einlesen | mittel | 10–18 | B-54 |
| NEU BAUEN | K-17 | Kamerafoto verkleinern statt abweisen, ein Weg für alle KI-Bilder | klein | 1,8–3 | B-55 |
| NEU BAUEN | K-18 | Reinigung vor der KI und Dateiprüfung auf Knopfdruck | mittel | 3,8–6 | B-56 |
| NEU BAUEN | K-19 | Installieren-Knopf in Kopfleiste und Einstellungen | klein | 3–5 | B-57 |

### Je Baustein: Vorlage und Abnahme
- K-01 · Vorlage Küchenzettel (60 % wiederverwendet) · Faktoren Offline ×1,15
- K-02 · Vorlage Workflow PDF (70 % wiederverwendet) · Faktoren KI ×1,25
- K-03 · Vorlage Mein-Rezeptbuch-Page, Workfloh-PDF-Page (50 % wiederverwendet)
- K-04 · Vorlage Datei-Post (60 % wiederverwendet)
- K-06 · Faktoren Mehrsprachig ×1,2
- K-07 · Faktoren Druck / PDF ×1,1
- K-08 · Faktoren KI ×1,25
- K-09 · Faktoren KI ×1,25
- K-12 · Vorlage – (70 % wiederverwendet) · Faktoren Mehrere Nutzer ×1,3
- K-13 · Vorlage Company Brain (40 % wiederverwendet)
- K-15 · Vorlage Küchenzettel (60 % wiederverwendet)
- K-17 · Vorlage Workflow PDF (70 % wiederverwendet)
- K-18 · Vorlage Sende-Prüfer (70 % wiederverwendet) · Faktoren KI ×1,25
- K-19 · Vorlage Mein-Rezeptbuch-Page, Workfloh-PDF-Page (50 % wiederverwendet)
- ohne Baustein (trotzdem abnehmen):
  - B-19: Das System muss als installierbare Web-App (PWA) im Browser laufen und nach dem ersten Besuch ohne Internet funktionieren
  - B-20: Das System muss alle Rezepte nur auf dem Gerät speichern, ohne Konto und ohne eigenen Server
  - B-21: Das System muss Rezepte in Kategorien und frei benennbaren Ordnern führen, mit Ziehen und Ablegen
  - B-22: Das System muss Rezepte aus einer Webadresse, aus Fotos und PDF-Dateien (KI-Scan, auch ganze Ordner) und aus Text übernehmen
  - B-23: Das System muss alle Rezepte als JSON-Datei sichern und wieder einlesen können und mehrere Sicherungen im Backup-Tresor verwalten
  - B-24: Das System muss einen Menüplan für Tage und Wochen führen und daraus eine Einkaufsliste nach Kategorien bilden
  - B-25: Das System muss Oberfläche, Handbuch und Mengeneinheiten in 8 Sprachen anbieten
  - B-26: Das System muss KI-Funktionen nur mit dem eigenen Schlüssel des Nutzers und nur auf seinen Tipp hin aufrufen
  - B-44: Das System muss vor jedem KI-Bildauftrag die Kosten schätzen und den Fortschritt zeigen
  - B-45: Das System muss beim Einlesen einer fremden Datei für jede unbekannte Kategorie fragen, wohin sie gehört
  - B-51: Das System muss die Bedeutungssuche im Hintergrund rechnen, damit die Oberfläche bedienbar bleibt
  - B-52: Das System muss beim Laden nichts ins Netz senden; Verbindungen entstehen erst auf Tipp
  - B-58: Das System muss eine Kategorie beim Löschen erst fragen, wohin ihre Rezepte gehen
  - B-59: Das System muss Rezepte ohne Kategorie sichtbar unter „Ohne Kategorie“ führen, nie still verlieren
  - B-60: Das System muss PDF-Seiten als gereinigtes Bild an die KI geben und bei einer Anweisung an eine KI einmal anhalten

## Bedarfsprotokoll – Änderungen
- NEU B-01 [Bereich 1]: „Papier“
- NEU B-02 [Bereich 1]: „Rezeptkarten, Zeitungsausschnitte, Fotos auf dem Handy, Lesezeichen im Browser“
- NEU B-03 [Bereich 2]: „Rezepte sammeln, Wochenplan, Einkauf“
- NEU B-04 [Bereich 3]: „Hauptkoch/-köchin im Haushalt“
- NEU B-05 [Bereich 3]: „Mitkochende Familienmitglieder“
- NEU B-06 [Bereich 3]: „Gäste und Verwandte, die Rezepte geschickt bekommen“
- NEU B-07 [Bereich 4]: „fehlende Übersicht“
- NEU B-08 [Bereich 4]: „Rezepte von Webseiten und aus Büchern müssen abgetippt werden“
- NEU B-09 [Bereich 4]: „Einkaufsliste wird jede Woche neu von Hand geschrieben“
- NEU B-10 [Bereich 5]: „Kein gemeinsamer Ort für Rezepte aus Papier, Web und Fotos“
- NEU B-11 [Bereich 6]: „Alle Rezepte an einem Ort, nach Kategorien und eigenen Ordnern geordnet, mit Suche“ (Muss, Nutzen: 2 h/Monat, kein Suchen mehr in Zetteln)
- NEU B-12 [Bereich 6]: „Rezepte per Webadresse, Foto (KI-Scan), Datei oder Eintippen übernehmen“ (Muss, Nutzen: 3 h/Monat, kein Abtippen)
- NEU B-13 [Bereich 6]: „Läuft im Browser, installierbar, auch ohne Internet in der Küche“ (Muss)
- NEU B-14 [Bereich 6]: „Sicherung als Datei und Backup-Tresor mit mehreren Ständen“ (Muss, Nutzen: nichts geht verloren)
- NEU B-15 [Bereich 6]: „Menüplan für die Woche mit Einkaufsliste nach Kategorien, Portionen umrechnen“ (Soll, Nutzen: 1,5 h/Monat)
- NEU B-16 [Bereich 6]: „Oberfläche und Handbuch in 8 Sprachen, Rezepte übersetzen“ (Soll)
- NEU B-17 [Bereich 6]: „Rezepte teilen (Code zum Scannen, Datei) und drucken“ (Kann)
- NEU B-40 [Bereich 6]: „Fehlende Rezeptbilder von einer KI erzeugen lassen, altes Bild bleibt speicherbar“ (Soll, Nutzen: jedes Rezept mit Bild)
- NEU B-41 [Bereich 6]: „Aus ausgewählten Rezepten ein gestaltetes Kochbuch erzeugen, mit Kostenübersicht vorher“ (Kann)
- NEU B-42 [Bereich 6]: „Food-Zine-Poster zu einem Rezept, auch ohne KI-Schlüssel, in einer Galerie sortierbar“ (Kann)
- NEU B-43 [Bereich 6]: „Beim Import fremder Dateien die Kategorien zuordnen, statt Rezepte zu verlieren“ (Muss)
- NEU B-47 [Bereich 6]: „Eigene Identität im App-Netz mit Siegel, Verbindung zu anderen Apps nur auf Wunsch“ (Soll)
- NEU B-48 [Bereich 6]: „Suche nach Bedeutung („etwas Leichtes mit Gemüse“), auf dem Gerät“ (Soll, Nutzen: 1 h/Monat)
- NEU B-49 [Bereich 6]: „Die App startet schneller, auch auf dem Küchentablet“ (Muss, Nutzen: erster Anstrich 4,3 → 2,6 s)
- NEU B-53 [Bereich 6]: „Kategorien umbenennen, mit eigenem Symbol, neu anlegen, löschen, zusammenlegen und sortieren“ (Muss, Nutzen: 0,5 h/Monat)
- NEU B-54 [Bereich 6]: „Rezepte tragen ihre Herkunft; beim Einlesen entsteht kein Doppel, auch nach Umbenennen“ (Soll)
- NEU B-55 [Bereich 6]: „Große Kamerafotos werden verkleinert statt abgewiesen“ (Muss, Nutzen: Foto direkt aus der Küche)
- NEU B-56 [Bereich 6]: „Vor dem Senden an eine KI versteckten Text und Bild-Metadaten entfernen, Datei auf Knopfdruck prüfen“ (Muss)
- NEU B-57 [Bereich 6]: „Installieren-Knopf gut sichtbar, verschwindet nach der Installation“ (Kann)
- NEU B-18 [Bereich 7]: „Jedes Rezept ist in Sekunden gefunden, der Wochenplan steht in zehn Minuten“
- NEU B-19 [Bereich 8]: „Das System muss als installierbare Web-App (PWA) im Browser laufen und nach dem ersten Besuch ohne Internet funktionieren“
- NEU B-20 [Bereich 8]: „Das System muss alle Rezepte nur auf dem Gerät speichern, ohne Konto und ohne eigenen Server“
- NEU B-21 [Bereich 8]: „Das System muss Rezepte in Kategorien und frei benennbaren Ordnern führen, mit Ziehen und Ablegen“
- NEU B-22 [Bereich 8]: „Das System muss Rezepte aus einer Webadresse, aus Fotos und PDF-Dateien (KI-Scan, auch ganze Ordner) und aus Text übernehmen“
- NEU B-23 [Bereich 8]: „Das System muss alle Rezepte als JSON-Datei sichern und wieder einlesen können und mehrere Sicherungen im Backup-Tresor verwalten“
- NEU B-24 [Bereich 8]: „Das System muss einen Menüplan für Tage und Wochen führen und daraus eine Einkaufsliste nach Kategorien bilden“
- NEU B-25 [Bereich 8]: „Das System muss Oberfläche, Handbuch und Mengeneinheiten in 8 Sprachen anbieten“
- NEU B-26 [Bereich 8]: „Das System muss KI-Funktionen nur mit dem eigenen Schlüssel des Nutzers und nur auf seinen Tipp hin aufrufen“
- NEU B-44 [Bereich 8]: „Das System muss vor jedem KI-Bildauftrag die Kosten schätzen und den Fortschritt zeigen“
- NEU B-45 [Bereich 8]: „Das System muss beim Einlesen einer fremden Datei für jede unbekannte Kategorie fragen, wohin sie gehört“
- NEU B-51 [Bereich 8]: „Das System muss die Bedeutungssuche im Hintergrund rechnen, damit die Oberfläche bedienbar bleibt“
- NEU B-52 [Bereich 8]: „Das System muss beim Laden nichts ins Netz senden; Verbindungen entstehen erst auf Tipp“
- NEU B-58 [Bereich 8]: „Das System muss eine Kategorie beim Löschen erst fragen, wohin ihre Rezepte gehen“
- NEU B-59 [Bereich 8]: „Das System muss Rezepte ohne Kategorie sichtbar unter „Ohne Kategorie“ führen, nie still verlieren“
- NEU B-60 [Bereich 8]: „Das System muss PDF-Seiten als gereinigtes Bild an die KI geben und bei einer Anweisung an eine KI einmal anhalten“
- NEU B-27 [Bereich 9]: „für Hobbyköche ohne Technikwissen; Handbuch mit 9 Kapiteln in der App, als PDF und E-Book“
- NEU B-28 [Bereich 9]: „Themen: Landhaus, Frühling, Nacht, Modern, Bunt; Barrierefreiheit einstellbar“
- NEU B-29 [Bereich 10]: „Geräte“
- NEU B-30 [Bereich 10]: „offline“
- NEU B-31 [Bereich 10]: „Tablet in der Küche, Handy beim Einkaufen“
- NEU B-32 [Bereich 11]: „Muttis Rezeptbuch (Schwester-App mit gleichem Aufbau)“
- NEU B-33 [Bereich 12]: „Rezeptseiten im Internet (Übernahme per Adresse)“
- NEU B-34 [Bereich 12]: „KI-Anbieter mit eigenem Schlüssel (Claude, Mistral OCR)“
- NEU B-46 [Bereich 12]: „Bild-KI mit eigenem Schlüssel“
- NEU B-50 [Bereich 12]: „SBKIM-Netz: Sage-Protokol, Mein Mixarium, Muttis Rezeptbuch, Tresor-Apps“
- NEU B-35 [Bereich 13]: „Rezepte mit Zutaten, Schritten, Bildern, Kategorie, Ordner; Menüpläne; Einkaufslisten“
- NEU B-36 [Bereich 14]: „personenbezogene Daten: nein“
- NEU B-37 [Bereich 14]: „Die Rezepte verlassen das Gerät nur auf ausdrücklichen Tipp (KI, Teilen, Export)“
- NEU B-38 [Bereich 15]: „Vorgaben“
- NEU B-39 [Bereich 15]: „kein Abo, keine Werbung, kein Zähldienst; eigene Speicherschlüssel neben der Schwester-App“
- NEU B-61 [Bereich 15]: „Bewusste Grenze: nur die ersten 10 Seiten eines PDF gehen an die KI“
- NEU O-01 [Bereich 18]: „Welche KI-Anbieter sollen wählbar sein?“
- NEU O-02 [Bereich 18]: „Welche Apps dürfen Rezepte finden?“

## Offene Punkte
- O-01: Welche KI-Anbieter sollen wählbar sein? (klärt Haushalt bis 2026-04-18)
- O-02: Welche Apps dürfen Rezepte finden? (klärt Haushalt bis 2026-07-15)

## Summe
Stunden F4 321,3–590,3 · Kosten-Nutzen: Grenzlinie keine

Die Summe enthält zusätzlich zu den Zeilen: Anpassung an den Betrieb 2–6 h, Abstimmung 15 % (35,7–65,6 h), Puffer 20 % (47,6–87,5 h).

## Erklärungen und Sterne
- Verschwiegenheitserklärung aktiviert: nein · Vereinbarung Zahlung/Rechte aktiviert: nein · Wartungsvertrag aktiviert: nein
- Sterne B-11: beim Bedarf Ø 4,3 (3) · bei der Abnahme Ø 4,7 (3)
- Sterne B-12: beim Bedarf Ø 4,5 (2) · bei der Abnahme Ø 5 (2)
- Sterne B-13: beim Bedarf Ø 3,5 (2) · bei der Abnahme Ø 4 (2)
- Sterne B-15: beim Bedarf Ø 3,5 (2) · bei der Abnahme Ø 4,5 (2)
- Sterne B-17: beim Bedarf Ø 2,5 (2) · bei der Abnahme Ø 3,5 (2)
- Sterne B-53: beim Bedarf Ø 3,5 (2) · bei der Abnahme Ø 4,5 (2)

## Vollständiger Stand (zum Einlesen)
```json
{"bedarf":[{"id":"B-01","nr":1,"text":"Papier","sichtbar":true},{"id":"B-02","nr":1,"text":"Rezeptkarten, Zeitungsausschnitte, Fotos auf dem Handy, Lesezeichen im Browser","sichtbar":true},{"id":"B-03","nr":2,"text":"Rezepte sammeln, Wochenplan, Einkauf","sichtbar":true},{"id":"B-04","nr":3,"text":"Hauptkoch/-köchin im Haushalt","sichtbar":true,"anzahl":1},{"id":"B-05","nr":3,"text":"Mitkochende Familienmitglieder","sichtbar":true,"anzahl":2},{"id":"B-06","nr":3,"text":"Gäste und Verwandte, die Rezepte geschickt bekommen","sichtbar":true,"anzahl":4},{"id":"B-07","nr":4,"text":"fehlende Übersicht","sichtbar":true},{"id":"B-08","nr":4,"text":"Rezepte von Webseiten und aus Büchern müssen abgetippt werden","sichtbar":true},{"id":"B-09","nr":4,"text":"Einkaufsliste wird jede Woche neu von Hand geschrieben","sichtbar":true},{"id":"B-10","nr":5,"text":"Kein gemeinsamer Ort für Rezepte aus Papier, Web und Fotos","sichtbar":true},{"id":"B-11","nr":6,"text":"Alle Rezepte an einem Ort, nach Kategorien und eigenen Ordnern geordnet, mit Suche","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":2,"text":"kein Suchen mehr in Zetteln"},"handeln":"vorschlagen"},{"id":"B-12","nr":6,"text":"Rezepte per Webadresse, Foto (KI-Scan), Datei oder Eintippen übernehmen","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":3,"text":"kein Abtippen"}},{"id":"B-13","nr":6,"text":"Läuft im Browser, installierbar, auch ohne Internet in der Küche","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-14","nr":6,"text":"Sicherung als Datei und Backup-Tresor mit mehreren Ständen","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"nichts geht verloren"}},{"id":"B-15","nr":6,"text":"Menüplan für die Woche mit Einkaufsliste nach Kategorien, Portionen umrechnen","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":1.5,"text":""},"handeln":"vorschlagen"},{"id":"B-16","nr":6,"text":"Oberfläche und Handbuch in 8 Sprachen, Rezepte übersetzen","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-17","nr":6,"text":"Rezepte teilen (Code zum Scannen, Datei) und drucken","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-40","nr":6,"text":"Fehlende Rezeptbilder von einer KI erzeugen lassen, altes Bild bleibt speicherbar","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":"jedes Rezept mit Bild"}},{"id":"B-41","nr":6,"text":"Aus ausgewählten Rezepten ein gestaltetes Kochbuch erzeugen, mit Kostenübersicht vorher","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-42","nr":6,"text":"Food-Zine-Poster zu einem Rezept, auch ohne KI-Schlüssel, in einer Galerie sortierbar","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-43","nr":6,"text":"Beim Import fremder Dateien die Kategorien zuordnen, statt Rezepte zu verlieren","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":""},"handeln":"vorschlagen"},{"id":"B-47","nr":6,"text":"Eigene Identität im App-Netz mit Siegel, Verbindung zu anderen Apps nur auf Wunsch","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-48","nr":6,"text":"Suche nach Bedeutung („etwas Leichtes mit Gemüse“), auf dem Gerät","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":1,"text":""}},{"id":"B-49","nr":6,"text":"Die App startet schneller, auch auf dem Küchentablet","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"erster Anstrich 4,3 → 2,6 s"}},{"id":"B-53","nr":6,"text":"Kategorien umbenennen, mit eigenem Symbol, neu anlegen, löschen, zusammenlegen und sortieren","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":0.5,"text":""},"handeln":"vorschlagen"},{"id":"B-54","nr":6,"text":"Rezepte tragen ihre Herkunft; beim Einlesen entsteht kein Doppel, auch nach Umbenennen","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-55","nr":6,"text":"Große Kamerafotos werden verkleinert statt abgewiesen","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"Foto direkt aus der Küche"}},{"id":"B-56","nr":6,"text":"Vor dem Senden an eine KI versteckten Text und Bild-Metadaten entfernen, Datei auf Knopfdruck prüfen","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-57","nr":6,"text":"Installieren-Knopf gut sichtbar, verschwindet nach der Installation","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-18","nr":7,"text":"Jedes Rezept ist in Sekunden gefunden, der Wochenplan steht in zehn Minuten","sichtbar":true},{"id":"B-19","nr":8,"text":"Das System muss als installierbare Web-App (PWA) im Browser laufen und nach dem ersten Besuch ohne Internet funktionieren","sichtbar":true},{"id":"B-20","nr":8,"text":"Das System muss alle Rezepte nur auf dem Gerät speichern, ohne Konto und ohne eigenen Server","sichtbar":true},{"id":"B-21","nr":8,"text":"Das System muss Rezepte in Kategorien und frei benennbaren Ordnern führen, mit Ziehen und Ablegen","sichtbar":true},{"id":"B-22","nr":8,"text":"Das System muss Rezepte aus einer Webadresse, aus Fotos und PDF-Dateien (KI-Scan, auch ganze Ordner) und aus Text übernehmen","sichtbar":true},{"id":"B-23","nr":8,"text":"Das System muss alle Rezepte als JSON-Datei sichern und wieder einlesen können und mehrere Sicherungen im Backup-Tresor verwalten","sichtbar":true},{"id":"B-24","nr":8,"text":"Das System muss einen Menüplan für Tage und Wochen führen und daraus eine Einkaufsliste nach Kategorien bilden","sichtbar":true},{"id":"B-25","nr":8,"text":"Das System muss Oberfläche, Handbuch und Mengeneinheiten in 8 Sprachen anbieten","sichtbar":true},{"id":"B-26","nr":8,"text":"Das System muss KI-Funktionen nur mit dem eigenen Schlüssel des Nutzers und nur auf seinen Tipp hin aufrufen","sichtbar":true},{"id":"B-44","nr":8,"text":"Das System muss vor jedem KI-Bildauftrag die Kosten schätzen und den Fortschritt zeigen","sichtbar":true},{"id":"B-45","nr":8,"text":"Das System muss beim Einlesen einer fremden Datei für jede unbekannte Kategorie fragen, wohin sie gehört","sichtbar":true},{"id":"B-51","nr":8,"text":"Das System muss die Bedeutungssuche im Hintergrund rechnen, damit die Oberfläche bedienbar bleibt","sichtbar":true},{"id":"B-52","nr":8,"text":"Das System muss beim Laden nichts ins Netz senden; Verbindungen entstehen erst auf Tipp","sichtbar":true},{"id":"B-58","nr":8,"text":"Das System muss eine Kategorie beim Löschen erst fragen, wohin ihre Rezepte gehen","sichtbar":true},{"id":"B-59","nr":8,"text":"Das System muss Rezepte ohne Kategorie sichtbar unter „Ohne Kategorie“ führen, nie still verlieren","sichtbar":true},{"id":"B-60","nr":8,"text":"Das System muss PDF-Seiten als gereinigtes Bild an die KI geben und bei einer Anweisung an eine KI einmal anhalten","sichtbar":true},{"id":"B-27","nr":9,"text":"für Hobbyköche ohne Technikwissen; Handbuch mit 9 Kapiteln in der App, als PDF und E-Book","sichtbar":true},{"id":"B-28","nr":9,"text":"Themen: Landhaus, Frühling, Nacht, Modern, Bunt; Barrierefreiheit einstellbar","sichtbar":true},{"id":"B-29","nr":10,"text":"Geräte","sichtbar":true},{"id":"B-30","nr":10,"text":"offline","sichtbar":true},{"id":"B-31","nr":10,"text":"Tablet in der Küche, Handy beim Einkaufen","sichtbar":true},{"id":"B-32","nr":11,"text":"Muttis Rezeptbuch (Schwester-App mit gleichem Aufbau)","sichtbar":true},{"id":"B-33","nr":12,"text":"Rezeptseiten im Internet (Übernahme per Adresse)","sichtbar":true},{"id":"B-34","nr":12,"text":"KI-Anbieter mit eigenem Schlüssel (Claude, Mistral OCR)","sichtbar":true},{"id":"B-46","nr":12,"text":"Bild-KI mit eigenem Schlüssel","sichtbar":true},{"id":"B-50","nr":12,"text":"SBKIM-Netz: Sage-Protokol, Mein Mixarium, Muttis Rezeptbuch, Tresor-Apps","sichtbar":true},{"id":"B-35","nr":13,"text":"Rezepte mit Zutaten, Schritten, Bildern, Kategorie, Ordner; Menüpläne; Einkaufslisten","sichtbar":true},{"id":"B-36","nr":14,"text":"personenbezogene Daten: nein","sichtbar":true},{"id":"B-37","nr":14,"text":"Die Rezepte verlassen das Gerät nur auf ausdrücklichen Tipp (KI, Teilen, Export)","sichtbar":true},{"id":"B-38","nr":15,"text":"Vorgaben","sichtbar":true},{"id":"B-39","nr":15,"text":"kein Abo, keine Werbung, kein Zähldienst; eigene Speicherschlüssel neben der Schwester-App","sichtbar":true},{"id":"B-61","nr":15,"text":"Bewusste Grenze: nur die ersten 10 Seiten eines PDF gehen an die KI","sichtbar":true},{"id":"O-01","nr":18,"text":"Welche KI-Anbieter sollen wählbar sein?","sichtbar":true,"wer":"Haushalt","bis":"2026-04-18"},{"id":"O-02","nr":18,"text":"Welche Apps dürfen Rezepte finden?","sichtbar":true,"wer":"Haushalt","bis":"2026-07-15"}],"bausteine":[{"id":"K-01","katalog":"liste","name":"Rezeptbuch: Rezepte, Kategorien, Ordner mit Ziehen und Ablegen, Suche","menge":1,"groesse":"gross","faktoren":["offline"],"deckt":["B-11"],"ermaessigt":false},{"id":"K-02","katalog":"scan","name":"Import: Webadresse, KI-Scan von Foto, PDF und ganzen Ordnern, Eintippen","menge":1,"groesse":"gross","faktoren":["ki"],"deckt":["B-12","B-33"],"ermaessigt":false},{"id":"K-03","katalog":"seite","name":"Installierbare Web-App mit Offline-Vorrat (Service Worker)","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-13"],"ermaessigt":false},{"id":"K-04","katalog":"datei","name":"Sicherung als JSON-Datei und Backup-Tresor mit mehreren Ständen","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-14"],"ermaessigt":false},{"id":"K-05","katalog":"neu","name":"Menüplaner mit Einkaufsliste nach Kategorien und Portionsrechner","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-15"],"ermaessigt":false},{"id":"K-06","katalog":"neu","name":"8 Sprachen für Oberfläche, Handbuch und Einheiten; Rezeptübersetzer","menge":1,"groesse":"mittel","faktoren":["sprachen"],"deckt":["B-16"],"ermaessigt":false},{"id":"K-07","katalog":"neu","name":"Teilen per Code zum Scannen, Datei und Druck","menge":1,"groesse":"klein","faktoren":["druck"],"deckt":["B-17"],"ermaessigt":false},{"id":"K-08","katalog":"neu","name":"KI-Bild je Rezept und für viele Rezepte, mit Kosten und Fortschritt","menge":1,"groesse":"mittel","faktoren":["ki"],"deckt":["B-40"],"ermaessigt":false},{"id":"K-09","katalog":"neu","name":"KI-Kreativbuch aus gewählten Rezepten, scrollbarer Download","menge":1,"groesse":"mittel","faktoren":["ki"],"deckt":["B-41"],"ermaessigt":false},{"id":"K-10","katalog":"neu","name":"Food-Zine: Poster-Seite, Prompt-Generator, Galerie mit Ziehen","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-42"],"ermaessigt":false},{"id":"K-11","katalog":"altdaten","name":"Kategorie-Zuordnung beim Import fremder Dateien","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-43"],"ermaessigt":false},{"id":"K-12","katalog":"schnitt","name":"Knoten im App-Netz: Identität, Siegel, Mycel-Fenster, Verbinden auf Wunsch","menge":1,"groesse":"gross","faktoren":["nutzer"],"deckt":["B-47"],"ermaessigt":false},{"id":"K-13","katalog":"suche","name":"Bedeutungssuche auf dem Gerät, im Hintergrund gerechnet","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-48"],"ermaessigt":false},{"id":"K-14","katalog":"neu","name":"Schneller Start: Symbole als Dateien, kleinerer erster Anstrich","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-49"],"ermaessigt":false},{"id":"K-15","katalog":"liste","name":"Kategorien verwalten: umbenennen, Symbole, löschen, zusammenlegen, sortieren","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-53"],"ermaessigt":false},{"id":"K-16","katalog":"altdaten","name":"Herkunft am Rezept und Wiedererkennen beim Einlesen","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-54"],"ermaessigt":false},{"id":"K-17","katalog":"scan","name":"Kamerafoto verkleinern statt abweisen, ein Weg für alle KI-Bilder","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-55"],"ermaessigt":false},{"id":"K-18","katalog":"kipruef","name":"Reinigung vor der KI und Dateiprüfung auf Knopfdruck","menge":1,"groesse":"mittel","faktoren":["ki"],"deckt":["B-56"],"ermaessigt":false},{"id":"K-19","katalog":"seite","name":"Installieren-Knopf in Kopfleiste und Einstellungen","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-57"],"ermaessigt":false}],"rahmen":{"eigeneText":"Rezepte zwischen Mein Rezeptbuch, Muttis Rezeptbuch und Mein Mixarium austauschen","geraete":["android","iphone","tablet","browser"],"offline":"immer","abgleich":"abundzu","eigene":["hinher"],"datenort":["geraet"],"sicherung":["selbst"],"ki":"dienst"},"nicht":[{"id":"N-01","text":"Kein Konto und keine Anmeldung beim Hersteller","sichtbar":true}]}
```
