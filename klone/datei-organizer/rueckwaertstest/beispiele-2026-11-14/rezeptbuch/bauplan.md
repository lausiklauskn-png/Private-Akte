# Bauplan · V-2026-0001 · Fassung 4

Kunde: ⟦KUNDE-1⟧ · Fassungsdatum 2026-08-23 · Vorhaben: Familienrezepte digital sammeln, planen und teilen.
Alle 19 Zeilen unter „Zu tun“ sind NEU BAUEN (K-01 … K-19). UNVERÄNDERT, ANPASSEN, ENTFERNEN und NOCH NICHT GESCHÄTZT kommen nicht vor.

## 1. Zweck und Nutzer

- Zweck: ein gemeinsamer Ort für Rezepte aus Papier, Web und Fotos (B-10), mit Kategorien/Ordnern und Suche, Wochenplan und Einkaufsliste (B-03).
  Ziel (B-18): jedes Rezept in Sekunden gefunden, Wochenplan in zehn Minuten.
- Probleme heute: fehlende Übersicht (B-07), Abtippen von Web/Büchern (B-08), Einkaufsliste jede Woche von Hand (B-09).
- Nutzer (B-04–B-06): 1 Hauptkoch/-köchin, 2 mitkochende Familienmitglieder, 4 Gäste/Verwandte, die Rezepte geschickt bekommen.
- Zielgruppe: Hobbyköche ohne Technikwissen (B-27). Einsatz: Tablet in der Küche, Handy beim Einkaufen (B-31).

## 2. Plattformen, Datenort, Sicherung, Netz

- Installierbare Web-App (PWA) im Browser auf Android-Handy, iPhone, Tablet und Desktop-Browser (Rahmen, B-13, B-19).
- Nach dem ersten Besuch vollständig ohne Internet (Service Worker mit Offline-Vorrat, K-03).
- Daten nur auf dem Gerät; kein Konto, keine Anmeldung, kein eigener Server (B-20, N-01). Eigene Speicherschlüssel, getrennt von der Schwester-App (B-39).
- Sicherung nur vom Nutzer angestoßen: JSON-Datei exportieren/einlesen, Backup-Tresor mit mehreren Ständen (K-04, B-23).
- Netz: beim Laden geht nichts hinaus, Verbindungen erst auf Tipp (B-52). Rezepte verlassen das Gerät nur auf ausdrücklichen Tipp (KI, Teilen, Export) (B-37).
- KI nur mit eigenem Schlüssel des Nutzers und nur auf Tipp, nach Bestätigung (B-26, Rahmen „KI: über einen Dienst“).
- Kein Abo, keine Werbung, kein Zähldienst (B-39). Keine personenbezogenen Daten (B-36).
- Darstellung: Themen Landhaus, Frühling, Nacht, Modern, Bunt; Barrierefreiheit einstellbar (B-28).

## 3. Bereiche/Seiten

1. Rezepte (Liste nach Kategorien, Ordner, Suche, Rezeptkarte) – K-01, K-13, K-15
2. Import (Webadresse, Foto/PDF/Ordner-Scan, Eintippen, fremde Datei) – K-02, K-11, K-16, K-17, K-18
3. Menüplan und Einkaufsliste – K-05
4. KI-Bilder, KI-Kreativbuch, Food-Zine mit Galerie – K-08, K-09, K-10
5. Teilen/Druck – K-07
6. Sicherung und Backup-Tresor – K-04
7. Einstellungen (Sprache, Thema, Barrierefreiheit, KI-Schlüssel, Installieren) – K-06, K-19
8. Netz-Knoten (Siegel, Mycel-Fenster) – K-12
9. Handbuch (9 Kapitel) – B-27, K-06

## 4. Funktionen

1. **K-01 / B-11, B-21:** Rezepte mit Zutaten, Schritten, Bildern, Kategorie, Ordner anlegen/bearbeiten (B-35); frei benennbare Ordner; Rezepte per Ziehen und Ablegen verschieben; Wortsuche. Faktor Offline. Prüfung: Rezept anlegen, in Ordner ziehen, über Suche finden – offline.
2. **K-02 / B-12, B-22, B-33:** Übernahme per Webadresse, KI-Scan von Foto, PDF und ganzen Ordnern, Eintippen/Text. Faktor KI. Prüfung: je Weg ein Rezept entsteht.
3. **K-03 / B-13, B-19:** Installierbar, Offline-Vorrat. Prüfung: installieren, Netz aus, App startet und zeigt Rezepte.
4. **K-04 / B-14, B-23:** Export als JSON, Einlesen, Backup-Tresor mit mehreren Ständen. Prüfung: exportieren, löschen, einlesen → identischer Bestand; zwei Stände im Tresor wählbar.
5. **K-05 / B-15, B-24:** Menüplan für Tage und Wochen; Einkaufsliste nach Kategorien daraus; Portionsrechner. Prüfung: Woche planen, Liste gruppiert, Portionen ändern skaliert Mengen.
6. **K-06 / B-16, B-25:** Oberfläche, Handbuch und Mengeneinheiten in 8 Sprachen; Rezeptübersetzer. Faktor Mehrsprachig. Prüfung: Sprachwechsel ohne deutschen Rest.
7. **K-07 / B-17:** Teilen per Code zum Scannen, als Datei, Druck. Faktor Druck/PDF. Prüfung: Code einlesen auf zweitem Gerät ergibt Rezept; Druckansicht.
8. **K-08 / B-40, B-44, B-46:** KI-Bild je Rezept und für viele Rezepte; vorher Kostenschätzung, dann Fortschritt; altes Bild bleibt speicherbar. Faktor KI. Prüfung: Kosten vor Start sichtbar, Fortschrittsanzeige, altes Bild abrufbar.
9. **K-09 / B-41:** KI-Kreativbuch aus gewählten Rezepten, Kostenübersicht vorher, scrollbarer Download. Faktor KI.
10. **K-10 / B-42:** Food-Zine: Poster-Seite je Rezept, Prompt-Generator (auch ohne KI-Schlüssel nutzbar), Galerie sortierbar per Ziehen.
11. **K-11 / B-43, B-45:** Beim Einlesen fremder Dateien je unbekannter Kategorie fragen, wohin sie gehört; keine Rezepte verlieren. App schlägt vor, Kunde bestätigt (Rahmen).
12. **K-12 / B-47, B-50:** Eigene Identität im App-Netz, Siegel, Mycel-Fenster, Verbinden nur auf Wunsch. Faktor Mehrere Nutzer. Prüfung: ohne Tipp keine Verbindung (B-52).
13. **K-13 / B-48, B-51:** Bedeutungssuche („etwas Leichtes mit Gemüse“) auf dem Gerät, im Hintergrund gerechnet, Oberfläche bleibt bedienbar.
14. **K-14 / B-49:** Schneller Start: Symbole als Dateien, kleinerer erster Anstrich. Messziel aus dem Auftrag: erster Anstrich 4,3 → 2,6 s.
15. **K-15 / B-53, B-58, B-59:** Kategorien umbenennen, eigenes Symbol, neu anlegen, löschen, zusammenlegen, sortieren. Beim Löschen fragen, wohin die Rezepte gehen; Rezepte ohne Kategorie sichtbar unter „Ohne Kategorie“. App schlägt vor, Kunde bestätigt.
16. **K-16 / B-54:** Herkunft am Rezept; beim Einlesen kein Doppel, auch nach Umbenennen.
17. **K-17 / B-55:** Große Kamerafotos verkleinern statt abweisen; ein gemeinsamer Weg für alle Bilder an die KI.
18. **K-18 / B-56, B-60, B-61:** Vor dem Senden an die KI versteckten Text und Bild-Metadaten entfernen; PDF-Seiten als gereinigtes Bild senden, höchstens die ersten 10 Seiten; bei einer Anweisung an eine KI einmal anhalten; Datei auf Knopfdruck prüfen. Faktor KI.
19. **K-19 / B-57:** Installieren-Knopf in Kopfleiste und Einstellungen, verschwindet nach der Installation.
20. **Ohne Baustein (B-27):** Handbuch mit 9 Kapiteln in der App, als PDF und E-Book (siehe Frage 8.6).
21. **Ohne Baustein (B-28):** fünf Themen, Barrierefreiheit einstellbar (siehe Frage 8.6).

## 5. Schnittstellen zu anderen Programmen

- Rezepte als Dateien hin- und hergeben zwischen Mein Rezeptbuch, Muttis Rezeptbuch (Schwester-App, gleicher Aufbau, B-32) und Mein Mixarium (Rahmen).
- Rezeptseiten im Internet (Übernahme per Adresse, B-33).
- KI-Anbieter mit eigenem Schlüssel: Claude, Mistral OCR (B-34); Bild-KI mit eigenem Schlüssel (B-46).
- SBKIM-Netz: Sage-Protokol, Mein Mixarium, Muttis Rezeptbuch, Tresor-Apps (B-50), nur auf Wunsch (K-12).
- Wiederverwendung laut Auftrag (nur Namen, nicht eingesehen): Küchenzettel (K-01, K-15, je 60 %), Workflow PDF (K-02, K-17, 70 %), Mein-Rezeptbuch-Page/Workfloh-PDF-Page (K-03, K-19, 50 %), Datei-Post (K-04, 60 %), Company Brain (K-13, 40 %), Sende-Prüfer (K-18, 70 %), K-12 ohne genannte Vorlage (70 %).

## 6. Ausdrücklich nicht

- N-01: kein Konto, keine Anmeldung beim Hersteller.
- Kein eigener Server, keine Cloud-Speicherung (B-20).
- Kein Abo, keine Werbung, kein Zähldienst (B-39).
- Keine Netzverbindung beim Laden (B-52); KI nie ohne Tipp und eigenen Schlüssel (B-26).
- Nicht mehr als die ersten 10 PDF-Seiten an die KI (B-61).

## 7. Abnahme

- Je Baustein K-01 … K-19 die Prüfung aus Abschnitt 4, zusätzlich ohne Baustein abzunehmen: B-19, B-20, B-21, B-22, B-23, B-24, B-25, B-26, B-44, B-45, B-51, B-52, B-58, B-59, B-60.
- Offline-Probe auf Android, iPhone und Tablet nach Installation.
- Netzprobe: beim Start keine Anfrage nach außen.
- Messung erster Anstrich ≤ 2,6 s (Ziel aus B-49).
- Muss-Bedarfe zuerst: B-11, B-12, B-13, B-14, B-43, B-49, B-53, B-55, B-56. Soll: B-15, B-16, B-40, B-47, B-48, B-54. Kann: B-17, B-41, B-42, B-57.
- Stundenrahmen gesamt F4: 321,3–590,3 h (inkl. Betrieb, Abstimmung 15 %, Puffer 20 %). Euro nicht im Auftrag.

## 8. Offene Fragen und Widersprüche im Auftrag

1. **O-01** Welche KI-Anbieter sollen wählbar sein? Frist 2026-04-18 liegt vor dem Fassungsdatum – geklärt oder nicht? B-34 nennt Claude und Mistral OCR, B-46 eine ungenannte Bild-KI.
2. **O-02** Welche Apps dürfen Rezepte finden? Frist 2026-07-15 ebenfalls verstrichen; betrifft K-12/K-13.
3. **Abgleich zwischen Geräten:** Rahmen sagt „ja, ab und zu“, zugleich „Daten nur auf dem Gerät“, kein Server, kein Konto. Kein Baustein deckt einen Abgleich ab – nur über Datei/Code (K-04, K-07)? Oder über das Netz (K-12)?
4. **„KI über einen Dienst (nach Bestätigung)“** vs. B-26 „eigener Schlüssel des Nutzers“ – wer stellt den Dienst, wo wird der Schlüssel gespeichert (verschlüsselt?).
5. **„Schlägt vor, der Kunde bestätigt: B-11, B-15, B-43, B-53“** – was genau schlägt die App bei B-11 (Ablage?) und B-15 (Menüvorschläge?) vor? Nicht beschrieben.
6. **Ohne Baustein:** Handbuch (9 Kapitel, PDF und E-Book, B-27) und fünf Themen mit Barrierefreiheit (B-28) haben keine Zeile/Stunden; K-06 nennt nur die Übersetzung des Handbuchs. Zu bauen oder vorhanden?
7. **Fassung 4 ohne Vorgänger** („vorher: -“, „keine frühere Fassung“), aber Anlass beschreibt Lücken aus dem Alltag und es gibt Sterne „bei der Abnahme“ – gibt es einen Bestand, auf dem gebaut wird? Dann wären viele Zeilen eher ANPASSEN.
8. **K-12** Vorlage „–“ bei 70 % Wiederverwendung – woraus wird wiederverwendet? Was sind „Siegel“ und „Mycel-Fenster“ inhaltlich? Wie verträgt sich der Knoten mit B-52?
9. **Rezeptübersetzer (K-06):** über KI (dann B-26/K-18) oder auf dem Gerät?
10. **Webadresse-Import (K-02):** Abruf fremder Seiten aus der PWA (CORS) – über KI oder direkt? Nicht festgelegt.
11. **Herkunft (K-16):** welche Angaben trägt die Herkunft (Quelle-URL, Gerät, App)? Wie wird „dasselbe Rezept“ nach Umbenennen erkannt?
12. **Verkleinern (K-17):** Zielgröße/Auflösung nicht angegeben.
13. **Bedeutungssuche (K-13):** Modell und Größe, Sprachen der Suche nicht angegeben; Download erst auf Tipp (B-52)?
14. **Backup-Tresor (K-04):** verschlüsselt? Wie viele Stände, wo gespeichert?
15. **B-29 „Geräte“, B-30 „offline“, B-38 „Vorgaben“** sind nur Stichworte ohne Inhalt.
16. **Teilen per Code (K-07):** wie groß darf ein Rezept im Code sein, Bilder mit?
17. **Verschwiegenheit, Zahlung/Rechte, Wartung:** alle nicht aktiviert – ohne Folge für den Bau, nur festgehalten.
