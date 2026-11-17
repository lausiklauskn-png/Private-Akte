---
art: bauauftrag
format: 1
vorgang: V-2026-0001
fassung: 2
vorher: -
fassungsdatum: 2026-11-13
datum: 2026-11-13
kunde: "⟦KUNDE-1⟧"
verdeckt: ja
stunden: ja
euro: nein
repo: "Workflow-Needs"  # Werkzeug, das den Auftrag erzeugt hat — nicht das Ziel
---

# Bauauftrag · Fassung 2

**Anlass:** Die ersten Treffer galten nur für selbst gebaute Daten; an fremden Stapeln soll der Kern nachweislich besser werden, und die anderen Apps sollen ihn mitnutzen  ·  **von:** Kunde

**Vorhaben:** Eingehende Dateien prüfen und vorsortieren, bevor sie in die Akte gehen

**Gesamtauftrag:** keine frühere Fassung in diesem Auftrag — alles unter „Zu tun“ ist neu zu bauen. Das Datum der Fassung steht im Kopf (`fassungsdatum`), `datum` ist der Tag der Erzeugung.

## Rahmen
- Geräte: im Browser, Tablet, Windows-PC, Android-Handy
- Ohne Internet: ja, immer
- Abgleich zwischen Geräten: nein, ein Gerät reicht
- Daten liegen: nur auf dem Gerät, eigener Ordner / Speicherkarte
- Sicherung: selbst anstoßen
- Eigene Programme: gemeinsamer Ablageort, Dateien hin- und hergeben; Der sortierte Ordner wird in die Familienakte übernommen
- KI: über einen Dienst (nach Bestätigung)
- Schlägt vor, der Kunde bestätigt: B-13, B-15, B-17
- Nicht bauen: N-01 Originale werden nie verändert oder verschoben

## Zu tun (für die Sitzung)
| Aktion | Kennung | Was | Größe | Stunden (Schätzung) | deckt Bedarf |
|---|---|---|---|---|---|
| NEU BAUEN | K-01 | Sortier-Kern mit fünf Sieben, Steckbrief, Archivnummern, Lesen von Mail, docx/odt, PDF und Fotodaten | groß | 57,5–115 | B-13 |
| NEU BAUEN | K-02 | Eingangsprüfung: Dateiart am Kopf, Fingerabdruck, Doppelte, Auffällige anhalten | mittel | 3–4,8 | B-14 |
| NEU BAUEN | K-03 | Sichten als selbstsortierender Baum, Wortsuche | mittel | 12–20,4 | B-16 |
| NEU BAUEN | K-04 | Nur lesen, Begleitdatei organizer-index.json, Verlauf mit Rückgängig | mittel | 6,4–11,2 | B-15, B-18 |
| NEU BAUEN | K-05 | Index-Format für die Übernahme in die Familienakte | klein | 6–12 | B-17, B-36 |
| NEU BAUEN | K-06 | Testordner mit 101 erfundenen Dateien, installierbare Web-App | klein | 10–20 | B-19 |
| NEU BAUEN | K-07 | Kern 0.2/0.3: Wortmodell für Bereich und Art, neue Regeln für Absender, Frist und Person, Nachweis an fremden Stapeln | groß | 57,5–115 | B-43 |
| NEU BAUEN | K-08 | Texterkennung für Fotos und gescannte PDFs | mittel | 4–6,6 | B-44 |
| NEU BAUEN | K-09 | Fachregel als Tabelle, Merken nach Sache, Stichprobe nur mit Zahlen | mittel | 24–44 | B-45, B-46, B-48 |
| NEU BAUEN | K-10 | Kern als JavaScript für die Schwester-Apps, byte-gleich mit Pin | mittel | 5,6–10,4 | B-47, B-54 |
| NEU BAUEN | K-11 | Bedienung: Ladebalken, Aktualisieren, Update-Fähnchen, Leeren, Entfernen, Ziehen und Ablegen, Neues zuerst | mittel | 24–44 | B-49 |

### Je Baustein: Vorlage und Abnahme
- K-01 · Faktoren Offline ×1,15
- K-02 · Vorlage Auslieferungsprüfer (70 % wiederverwendet)
- K-03 · Vorlage Company Brain (40 % wiederverwendet)
- K-04 · Vorlage Datei-Post (60 % wiederverwendet)
- K-07 · Faktoren Offline ×1,15
- K-08 · Vorlage Workflow PDF (70 % wiederverwendet) · Faktoren Druck / PDF ×1,1
- K-10 · Vorlage – (60 % wiederverwendet)
- ohne Baustein (trotzdem abnehmen):
  - B-21: Das System muss in einen Eingangsordner geworfene Dateien in fünf Stufen sieben: Art, Kopf, Bereich und Nummern, Absender, Inhalt; jede Stufe zeigt ihr Ergebnis und ist einzeln rückgängig zu machen
  - B-22: Das System muss je Stufe nur so viel lesen, wie sie braucht (Dateikopf, oberes Drittel der ersten Seite, Briefkopf), und den ganzen Text erst zuletzt
  - B-23: Das System muss die Originale nur lesen und höchstens die Datei organizer-index.json schreiben
  - B-24: Das System muss Doppelte am Fingerabdruck erkennen und auffällige Dateien (Endung passt nicht zum Kopf, Daten hinter dem Bildende, Programme, Makros) anhalten und nicht weitergeben
  - B-25: Das System muss je Datei einen Steckbrief führen: Art, Absender, angesprochene Person, Datum, Betreff, Nummern, Bereich, Fristen, Beträge, Prüfstand, Herkunft
  - B-26: Das System muss die Dateien als Baum mit wählbaren Zweigen zeigen, ohne etwas zu verschieben
  - B-27: Das System muss Unsicheres als „bitte prüfen“ anhalten statt sicher falsch einzuordnen
  - B-28: Das System muss Archivnummern A-JJJJ-NNNN nur auf Knopf und nur für fertig gesiebte Dateien vergeben; eine Nummer ändert sich nie
  - B-29: Das System muss Mails samt Anhängen, Word- und LibreOffice-Dateien, PDFs und Fotos mit Aufnahmedaten lesen
  - B-50: Das System muss die Fachregel als Daten führen; eigene Zuordnung von Hand gewinnt immer und wird nie überschrieben
  - B-51: Das System muss den Kern zusätzlich als JavaScript ohne Bau-Schritt bereitstellen, damit Apps ohne Bau-Schritt ihn mit Pin übernehmen
  - B-52: Das System muss beim Entfernen nur die Liste ändern, nie das Original, und „Zurück“ anbieten
  - B-53: Das System muss Fristen aus Zeiträumen, Skonto, Angebotsbindung und dem Briefdatum lesen

## Bedarfsprotokoll – Änderungen
- NEU B-01 [Bereich 1]: „Papier“
- NEU B-02 [Bereich 1]: „Scans, Handyfotos, Mail-Anhänge und Altbestand liegen durcheinander in Download- und Scanner-Ordnern“
- NEU B-03 [Bereich 1]: „die Akte liest jede Datei einzeln und rät Bereich und Frist aus dem Dateinamen“
- NEU B-04 [Bereich 2]: „Dokumente“
- NEU B-05 [Bereich 2]: „Posteingang des Haushalts und Altbestand mehrerer Jahre“
- NEU B-06 [Bereich 3]: „Inhaber“
- NEU B-07 [Bereich 3]: „Mitarbeiter (Büro, Ablage)“
- NEU B-08 [Bereich 4]: „fehlende Übersicht“
- NEU B-09 [Bereich 4]: „Zeitverlust“
- NEU B-10 [Bereich 4]: „Doppelte Dateien und Dateien, deren Endung nicht zum Inhalt passt, fallen niemandem auf“
- NEU B-11 [Bereich 5]: „Es gibt keine Eingangskontrolle: die Prüfer kontrollieren nur, was hinausgeht“
- NEU B-12 [Bereich 5]: „Jedes Programm liest dieselbe Datei noch einmal von vorn“
- NEU B-13 [Bereich 6]: „Alles in einen Ordner werfen; das Werkzeug sortiert Klick für Klick feiner (Art, Kopf, Bereich und Nummern, Absender, Inhalt)“ (Muss, Nutzen: 6 h/Monat, kein Vorsortieren von Hand)
- NEU B-14 [Bereich 6]: „Beim Eingang auffällige Dateien (Endung passt nicht, Programme, Makros) und Doppelte erkennen und zurückhalten“ (Muss, Nutzen: nichts Fremdes rutscht in die Akte)
- NEU B-15 [Bereich 6]: „Originale bleiben unverändert; die Sortierung steht in einer Begleitdatei, nichts wird verschoben oder kopiert“ (Muss)
- NEU B-16 [Bereich 6]: „Dieselbe Datei unter vielen Gesichtspunkten finden: Datum, Art, Absender, Person, Frist, Nummer, Bereich, Wortsuche“ (Muss, Nutzen: 2 h/Monat)
- NEU B-17 [Bereich 6]: „Die Familienakte übernimmt den vorsortierten Ordner und ordnet automatisch zu“ (Soll, Nutzen: 2 h/Monat)
- NEU B-18 [Bereich 6]: „Korrekturen merken und daraus besser werden, jeder Schritt rückgängig“ (Soll)
- NEU B-19 [Bereich 6]: „Ein Testordner mit erfundenen Dateien zum Ausprobieren“ (Kann)
- NEU B-43 [Bereich 6]: „Bereich, Absender, Art, Frist und Person an fremden, gescannten Stapeln nachweislich besser treffen“ (Muss, Nutzen: 3 h/Monat, weniger Nacharbeit)
- NEU B-44 [Bereich 6]: „Fotos und gescannte PDFs ohne Textebene per Texterkennung lesen“ (Soll, Nutzen: 1 h/Monat)
- NEU B-45 [Bereich 6]: „Feste Regel, in welches Fach ein Schriftstück gehört, das in zwei passt; die Sache entscheidet, nicht der Absender“ (Soll)
- NEU B-46 [Bereich 6]: „Merken nach Sache: Absender und Vorschlag zusammen ergeben den Bereich“ (Soll, Nutzen: 1 h/Monat)
- NEU B-47 [Bereich 6]: „Familienakte und Buchhaltung nutzen denselben Kern, byte-gleich und ohne zweite Fassung“ (Muss, Nutzen: 2 h/Monat)
- NEU B-48 [Bereich 6]: „Stichprobe der eigenen Unterlagen: nur Zahlen je Feld, nichts verlässt das Gerät“ (Kann)
- NEU B-49 [Bereich 6]: „Ladebalken, Aktualisieren mit Hinweis auf neue Fassung, Dateien einfügen per Ziehen und Ablegen, einzelne Dateien entfernen, Neues zuerst“ (Soll)
- NEU B-20 [Bereich 7]: „Ein Stapel von hundert Dateien ist in Minuten vorsortiert; zur Bestätigung bleibt nur das Unsichere“
- NEU B-21 [Bereich 8]: „Das System muss in einen Eingangsordner geworfene Dateien in fünf Stufen sieben: Art, Kopf, Bereich und Nummern, Absender, Inhalt; jede Stufe zeigt ihr Ergebnis und ist einzeln rückgängig zu machen“
- NEU B-22 [Bereich 8]: „Das System muss je Stufe nur so viel lesen, wie sie braucht (Dateikopf, oberes Drittel der ersten Seite, Briefkopf), und den ganzen Text erst zuletzt“
- NEU B-23 [Bereich 8]: „Das System muss die Originale nur lesen und höchstens die Datei organizer-index.json schreiben“
- NEU B-24 [Bereich 8]: „Das System muss Doppelte am Fingerabdruck erkennen und auffällige Dateien (Endung passt nicht zum Kopf, Daten hinter dem Bildende, Programme, Makros) anhalten und nicht weitergeben“
- NEU B-25 [Bereich 8]: „Das System muss je Datei einen Steckbrief führen: Art, Absender, angesprochene Person, Datum, Betreff, Nummern, Bereich, Fristen, Beträge, Prüfstand, Herkunft“
- NEU B-26 [Bereich 8]: „Das System muss die Dateien als Baum mit wählbaren Zweigen zeigen, ohne etwas zu verschieben“
- NEU B-27 [Bereich 8]: „Das System muss Unsicheres als „bitte prüfen“ anhalten statt sicher falsch einzuordnen“
- NEU B-28 [Bereich 8]: „Das System muss Archivnummern A-JJJJ-NNNN nur auf Knopf und nur für fertig gesiebte Dateien vergeben; eine Nummer ändert sich nie“
- NEU B-29 [Bereich 8]: „Das System muss Mails samt Anhängen, Word- und LibreOffice-Dateien, PDFs und Fotos mit Aufnahmedaten lesen“
- NEU B-50 [Bereich 8]: „Das System muss die Fachregel als Daten führen; eigene Zuordnung von Hand gewinnt immer und wird nie überschrieben“
- NEU B-51 [Bereich 8]: „Das System muss den Kern zusätzlich als JavaScript ohne Bau-Schritt bereitstellen, damit Apps ohne Bau-Schritt ihn mit Pin übernehmen“
- NEU B-52 [Bereich 8]: „Das System muss beim Entfernen nur die Liste ändern, nie das Original, und „Zurück“ anbieten“
- NEU B-53 [Bereich 8]: „Das System muss Fristen aus Zeiträumen, Skonto, Angebotsbindung und dem Briefdatum lesen“
- NEU B-30 [Bereich 9]: „Schulung: Erklärungen nur hinter einem Fragezeichen, Bedienung wie ein Explorer“
- NEU B-31 [Bereich 9]: „Abläufe ändern: erst einwerfen, dann sieben, dann übernehmen“
- NEU B-32 [Bereich 10]: „Geräte“
- NEU B-33 [Bereich 10]: „offline“
- NEU B-34 [Bereich 10]: „Browser am PC (Ordnerwahl) und am Handy; Ordner auf der SD-Karte neben dem verschlüsselten Tresor, nicht darin“
- NEU B-35 [Bereich 11]: „Familienakte (nimmt die Dateien heute einzeln)“
- NEU B-36 [Bereich 12]: „organizer-index.json als offenes Format für die Familienakte und andere Programme“
- NEU B-54 [Bereich 12]: „Kern byte-gleich in Familienakte (Bereich und Frist) und Buchhaltungs-App (Aussteller)“
- NEU B-37 [Bereich 13]: „Briefe, Rechnungen, Bescheide, Verträge, Kassenbons, Fotos, E-Mails mit Anhängen“
- NEU B-38 [Bereich 14]: „personenbezogene Daten: ja“
- NEU B-39 [Bereich 14]: „alles bleibt auf dem Gerät; keine Datei geht an einen Server“
- NEU B-40 [Bereich 15]: „Vorgaben“
- NEU B-41 [Bereich 15]: „kein großes Sprachmodell in der ersten Fassung; nur Regeln, Muster und kleine Modelle auf dem Gerät“
- NEU B-42 [Bereich 15]: „nur erfundene Beispieldaten im Testordner“
- NEU B-55 [Bereich 15]: „Nachweis an fremden Stapeln mit drei unabhängigen Einordnern, Regeln vorab festgelegt“
- NEU O-01 [Bereich 18]: „Wo liegt der Eingangsordner am Tablet?“
- NEU O-02 [Bereich 18]: „Eigene Regeln des Nutzers: erst als Vorschau zeigen“

## Offene Punkte
- O-01: Wo liegt der Eingangsordner am Tablet? (klärt Inhaber bis 2026-11-15)
- O-02: Eigene Regeln des Nutzers: erst als Vorschau zeigen (klärt Inhaber bis 2026-11-20)

## Summe
Stunden F2 286,1–552,7 · Kosten-Nutzen: Grenzlinie keine

Die Summe enthält zusätzlich zu den Zeilen: Anpassung an den Betrieb 2–6 h, Abstimmung 15 % (31,8–61,4 h), Puffer 20 % (42,4–81,9 h).

## Erklärungen und Sterne
- Verschwiegenheitserklärung aktiviert: nein · Vereinbarung Zahlung/Rechte aktiviert: nein · Wartungsvertrag aktiviert: nein
- Sterne B-13: beim Bedarf Ø 4,3 (3) · bei der Abnahme Ø 4,7 (3)
- Sterne B-14: beim Bedarf Ø 3,5 (2) · bei der Abnahme Ø 4 (2)
- Sterne B-16: beim Bedarf Ø 4,5 (2) · bei der Abnahme Ø 4 (2)
- Sterne B-17: beim Bedarf Ø 4,5 (2) · bei der Abnahme Ø 3 (2)
- Sterne B-43: beim Bedarf Ø 4,7 (3) · bei der Abnahme Ø 4,3 (3)
- Sterne B-49: beim Bedarf Ø 3 (2) · bei der Abnahme Ø 4,5 (2)

## Vollständiger Stand (zum Einlesen)
```json
{"bedarf":[{"id":"B-01","nr":1,"text":"Papier","sichtbar":true},{"id":"B-02","nr":1,"text":"Scans, Handyfotos, Mail-Anhänge und Altbestand liegen durcheinander in Download- und Scanner-Ordnern","sichtbar":true},{"id":"B-03","nr":1,"text":"die Akte liest jede Datei einzeln und rät Bereich und Frist aus dem Dateinamen","sichtbar":true},{"id":"B-04","nr":2,"text":"Dokumente","sichtbar":true},{"id":"B-05","nr":2,"text":"Posteingang des Haushalts und Altbestand mehrerer Jahre","sichtbar":true},{"id":"B-06","nr":3,"text":"Inhaber","sichtbar":true,"anzahl":1},{"id":"B-07","nr":3,"text":"Mitarbeiter (Büro, Ablage)","sichtbar":true,"anzahl":2},{"id":"B-08","nr":4,"text":"fehlende Übersicht","sichtbar":true},{"id":"B-09","nr":4,"text":"Zeitverlust","sichtbar":true},{"id":"B-10","nr":4,"text":"Doppelte Dateien und Dateien, deren Endung nicht zum Inhalt passt, fallen niemandem auf","sichtbar":true},{"id":"B-11","nr":5,"text":"Es gibt keine Eingangskontrolle: die Prüfer kontrollieren nur, was hinausgeht","sichtbar":true},{"id":"B-12","nr":5,"text":"Jedes Programm liest dieselbe Datei noch einmal von vorn","sichtbar":true},{"id":"B-13","nr":6,"text":"Alles in einen Ordner werfen; das Werkzeug sortiert Klick für Klick feiner (Art, Kopf, Bereich und Nummern, Absender, Inhalt)","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":6,"text":"kein Vorsortieren von Hand"},"handeln":"vorschlagen"},{"id":"B-14","nr":6,"text":"Beim Eingang auffällige Dateien (Endung passt nicht, Programme, Makros) und Doppelte erkennen und zurückhalten","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":"nichts Fremdes rutscht in die Akte"}},{"id":"B-15","nr":6,"text":"Originale bleiben unverändert; die Sortierung steht in einer Begleitdatei, nichts wird verschoben oder kopiert","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":null,"text":""},"handeln":"vorschlagen"},{"id":"B-16","nr":6,"text":"Dieselbe Datei unter vielen Gesichtspunkten finden: Datum, Art, Absender, Person, Frist, Nummer, Bereich, Wortsuche","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":2,"text":""}},{"id":"B-17","nr":6,"text":"Die Familienakte übernimmt den vorsortierten Ordner und ordnet automatisch zu","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":2,"text":""},"handeln":"vorschlagen"},{"id":"B-18","nr":6,"text":"Korrekturen merken und daraus besser werden, jeder Schritt rückgängig","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-19","nr":6,"text":"Ein Testordner mit erfundenen Dateien zum Ausprobieren","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-43","nr":6,"text":"Bereich, Absender, Art, Frist und Person an fremden, gescannten Stapeln nachweislich besser treffen","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":3,"text":"weniger Nacharbeit"}},{"id":"B-44","nr":6,"text":"Fotos und gescannte PDFs ohne Textebene per Texterkennung lesen","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":1,"text":""}},{"id":"B-45","nr":6,"text":"Feste Regel, in welches Fach ein Schriftstück gehört, das in zwei passt; die Sache entscheidet, nicht der Absender","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-46","nr":6,"text":"Merken nach Sache: Absender und Vorschlag zusammen ergeben den Bereich","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":1,"text":""}},{"id":"B-47","nr":6,"text":"Familienakte und Buchhaltung nutzen denselben Kern, byte-gleich und ohne zweite Fassung","sichtbar":true,"prio":"muss","nutzen":{"stundenMonat":2,"text":""}},{"id":"B-48","nr":6,"text":"Stichprobe der eigenen Unterlagen: nur Zahlen je Feld, nichts verlässt das Gerät","sichtbar":true,"prio":"kann","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-49","nr":6,"text":"Ladebalken, Aktualisieren mit Hinweis auf neue Fassung, Dateien einfügen per Ziehen und Ablegen, einzelne Dateien entfernen, Neues zuerst","sichtbar":true,"prio":"soll","nutzen":{"stundenMonat":null,"text":""}},{"id":"B-20","nr":7,"text":"Ein Stapel von hundert Dateien ist in Minuten vorsortiert; zur Bestätigung bleibt nur das Unsichere","sichtbar":true},{"id":"B-21","nr":8,"text":"Das System muss in einen Eingangsordner geworfene Dateien in fünf Stufen sieben: Art, Kopf, Bereich und Nummern, Absender, Inhalt; jede Stufe zeigt ihr Ergebnis und ist einzeln rückgängig zu machen","sichtbar":true},{"id":"B-22","nr":8,"text":"Das System muss je Stufe nur so viel lesen, wie sie braucht (Dateikopf, oberes Drittel der ersten Seite, Briefkopf), und den ganzen Text erst zuletzt","sichtbar":true},{"id":"B-23","nr":8,"text":"Das System muss die Originale nur lesen und höchstens die Datei organizer-index.json schreiben","sichtbar":true},{"id":"B-24","nr":8,"text":"Das System muss Doppelte am Fingerabdruck erkennen und auffällige Dateien (Endung passt nicht zum Kopf, Daten hinter dem Bildende, Programme, Makros) anhalten und nicht weitergeben","sichtbar":true},{"id":"B-25","nr":8,"text":"Das System muss je Datei einen Steckbrief führen: Art, Absender, angesprochene Person, Datum, Betreff, Nummern, Bereich, Fristen, Beträge, Prüfstand, Herkunft","sichtbar":true},{"id":"B-26","nr":8,"text":"Das System muss die Dateien als Baum mit wählbaren Zweigen zeigen, ohne etwas zu verschieben","sichtbar":true},{"id":"B-27","nr":8,"text":"Das System muss Unsicheres als „bitte prüfen“ anhalten statt sicher falsch einzuordnen","sichtbar":true},{"id":"B-28","nr":8,"text":"Das System muss Archivnummern A-JJJJ-NNNN nur auf Knopf und nur für fertig gesiebte Dateien vergeben; eine Nummer ändert sich nie","sichtbar":true},{"id":"B-29","nr":8,"text":"Das System muss Mails samt Anhängen, Word- und LibreOffice-Dateien, PDFs und Fotos mit Aufnahmedaten lesen","sichtbar":true},{"id":"B-50","nr":8,"text":"Das System muss die Fachregel als Daten führen; eigene Zuordnung von Hand gewinnt immer und wird nie überschrieben","sichtbar":true},{"id":"B-51","nr":8,"text":"Das System muss den Kern zusätzlich als JavaScript ohne Bau-Schritt bereitstellen, damit Apps ohne Bau-Schritt ihn mit Pin übernehmen","sichtbar":true},{"id":"B-52","nr":8,"text":"Das System muss beim Entfernen nur die Liste ändern, nie das Original, und „Zurück“ anbieten","sichtbar":true},{"id":"B-53","nr":8,"text":"Das System muss Fristen aus Zeiträumen, Skonto, Angebotsbindung und dem Briefdatum lesen","sichtbar":true},{"id":"B-30","nr":9,"text":"Schulung: Erklärungen nur hinter einem Fragezeichen, Bedienung wie ein Explorer","sichtbar":true},{"id":"B-31","nr":9,"text":"Abläufe ändern: erst einwerfen, dann sieben, dann übernehmen","sichtbar":true},{"id":"B-32","nr":10,"text":"Geräte","sichtbar":true},{"id":"B-33","nr":10,"text":"offline","sichtbar":true},{"id":"B-34","nr":10,"text":"Browser am PC (Ordnerwahl) und am Handy; Ordner auf der SD-Karte neben dem verschlüsselten Tresor, nicht darin","sichtbar":true},{"id":"B-35","nr":11,"text":"Familienakte (nimmt die Dateien heute einzeln)","sichtbar":true},{"id":"B-36","nr":12,"text":"organizer-index.json als offenes Format für die Familienakte und andere Programme","sichtbar":true},{"id":"B-54","nr":12,"text":"Kern byte-gleich in Familienakte (Bereich und Frist) und Buchhaltungs-App (Aussteller)","sichtbar":true},{"id":"B-37","nr":13,"text":"Briefe, Rechnungen, Bescheide, Verträge, Kassenbons, Fotos, E-Mails mit Anhängen","sichtbar":true},{"id":"B-38","nr":14,"text":"personenbezogene Daten: ja","sichtbar":true},{"id":"B-39","nr":14,"text":"alles bleibt auf dem Gerät; keine Datei geht an einen Server","sichtbar":true},{"id":"B-40","nr":15,"text":"Vorgaben","sichtbar":true},{"id":"B-41","nr":15,"text":"kein großes Sprachmodell in der ersten Fassung; nur Regeln, Muster und kleine Modelle auf dem Gerät","sichtbar":true},{"id":"B-42","nr":15,"text":"nur erfundene Beispieldaten im Testordner","sichtbar":true},{"id":"B-55","nr":15,"text":"Nachweis an fremden Stapeln mit drei unabhängigen Einordnern, Regeln vorab festgelegt","sichtbar":true},{"id":"O-01","nr":18,"text":"Wo liegt der Eingangsordner am Tablet?","sichtbar":true,"wer":"Inhaber","bis":"2026-11-15"},{"id":"O-02","nr":18,"text":"Eigene Regeln des Nutzers: erst als Vorschau zeigen","sichtbar":true,"wer":"Inhaber","bis":"2026-11-20"}],"bausteine":[{"id":"K-01","katalog":"neu","name":"Sortier-Kern mit fünf Sieben, Steckbrief, Archivnummern, Lesen von Mail, docx/odt, PDF und Fotodaten","menge":1,"groesse":"gross","faktoren":["offline"],"deckt":["B-13"],"ermaessigt":false},{"id":"K-02","katalog":"dateipruef","name":"Eingangsprüfung: Dateiart am Kopf, Fingerabdruck, Doppelte, Auffällige anhalten","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-14"],"ermaessigt":false},{"id":"K-03","katalog":"suche","name":"Sichten als selbstsortierender Baum, Wortsuche","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-16"],"ermaessigt":false},{"id":"K-04","katalog":"datei","name":"Nur lesen, Begleitdatei organizer-index.json, Verlauf mit Rückgängig","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-15","B-18"],"ermaessigt":false},{"id":"K-05","katalog":"schnitt","name":"Index-Format für die Übernahme in die Familienakte","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-17","B-36"],"ermaessigt":false},{"id":"K-06","katalog":"neu","name":"Testordner mit 101 erfundenen Dateien, installierbare Web-App","menge":1,"groesse":"klein","faktoren":[],"deckt":["B-19"],"ermaessigt":false},{"id":"K-07","katalog":"neu","name":"Kern 0.2/0.3: Wortmodell für Bereich und Art, neue Regeln für Absender, Frist und Person, Nachweis an fremden Stapeln","menge":1,"groesse":"gross","faktoren":["offline"],"deckt":["B-43"],"ermaessigt":false},{"id":"K-08","katalog":"scan","name":"Texterkennung für Fotos und gescannte PDFs","menge":1,"groesse":"mittel","faktoren":["druck"],"deckt":["B-44"],"ermaessigt":false},{"id":"K-09","katalog":"neu","name":"Fachregel als Tabelle, Merken nach Sache, Stichprobe nur mit Zahlen","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-45","B-46","B-48"],"ermaessigt":false},{"id":"K-10","katalog":"schnitt","name":"Kern als JavaScript für die Schwester-Apps, byte-gleich mit Pin","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-47","B-54"],"ermaessigt":false},{"id":"K-11","katalog":"neu","name":"Bedienung: Ladebalken, Aktualisieren, Update-Fähnchen, Leeren, Entfernen, Ziehen und Ablegen, Neues zuerst","menge":1,"groesse":"mittel","faktoren":[],"deckt":["B-49"],"ermaessigt":false}],"rahmen":{"eigeneText":"Der sortierte Ordner wird in die Familienakte übernommen","geraete":["browser","tablet","windows","android"],"offline":"immer","abgleich":"eins","eigene":["ablageort","hinher"],"datenort":["geraet","ordner"],"sicherung":["selbst"],"ki":"dienst"},"nicht":[{"id":"N-01","text":"Originale werden nie verändert oder verschoben","sichtbar":true}]}
```
