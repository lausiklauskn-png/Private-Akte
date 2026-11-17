# Bauplan · V-2026-0001 · Fassung 4

Kunde: ⟦KUNDE-1⟧ · Fassungsdatum 2026-08-23 · alles unter „Zu tun“ ist NEU BAUEN (K-01 bis K-19). Keine Zeilen UNVERÄNDERT/ANPASSEN/ENTFERNEN, keine Zeile „NOCH NICHT GESCHÄTZT“.

## 1. Zweck und Nutzer
Familienrezepte digital sammeln, planen und teilen (Vorhaben). Heute: Papier, Rezeptkarten, Zeitungsausschnitte, Handyfotos, Browser-Lesezeichen (B-01, B-02); Rezepte werden abgetippt, Einkaufsliste jede Woche von Hand (B-07–B-10).
- Nutzer: 1 Hauptkoch/-köchin, 2 mitkochende Familienmitglieder, 4 Gäste/Verwandte als Empfänger geteilter Rezepte (B-04–B-06).
- Zielgruppe: Hobbyköche ohne Technikwissen (B-27).
- Erfolg: jedes Rezept in Sekunden gefunden, Wochenplan in zehn Minuten (B-18).
- Anlass dieser Fassung: Rezepte ohne Kategorie verschwanden, Kamerafotos wurden abgewiesen, Text ging ungeprüft an die KI → K-11/K-15 (B-59), K-17, K-18.

## 2. Plattformen, Datenort, Sicherung, Netz
- Installierbare Web-App (PWA) im Browser auf Android-Handy, iPhone, Tablet (Rahmen, B-19, B-13); Einsatz: Tablet in der Küche, Handy beim Einkaufen (B-31).
- Ohne Internet immer bedienbar nach dem ersten Besuch (Service Worker, K-03).
- Kein Abgleich zwischen Geräten; ein Gerät reicht.
- Daten nur auf dem Gerät, im Browser-Speicher, dauerhafter Speicher wird angefordert (B-20, B-69). Eigene Speicherschlüssel, getrennt von der Schwester-App (B-39). Keine personenbezogenen Daten (B-36).
- Sicherung: selbst angestoßen (JSON-Datei exportieren/einlesen, B-23/B-70) und von allein (Tresor auf dem Gerät legt Stände an, B-71, K-04).
- Netz: beim Laden geht nichts hinaus (B-52). Netz nur auf Tipp: Webadresse laden, KI-Aufrufe, Verbinden im App-Netz, Teilen/Export (B-37).
- KI über einen Dienst mit eigenem Schlüssel des Nutzers, nur nach Bestätigung (B-26): Claude, Mistral (EU, auch Texterkennung), OpenAI für Bilder (B-72).

## 3. Bereiche/Seiten
Untere Leiste mit fünf Hauptbereichen (B-62):
1. **Rezepte** – Liste/Kategorien, Suche (Wort und Bedeutung), Rezeptansicht, Import.
2. **Menü** – Wochen-Menüplaner, Einkaufsliste, Portionsrechner.
3. **Ordner** – eigene Ordner mit Ziehen und Ablegen, Kategorien verwalten.
4. **Tresor** – automatische Sicherungsstände, Zurückholen.
5. **Einstellungen** – Sprache, Themen, Barrierefreiheit, KI-Schlüssel, Installieren, Handbuch.

Dazu: Kopfleiste mit Installieren-Knopf (K-19), Food-Zine-Galerie (K-10), Kreativbuch (K-09), Siegel/Mycel-Fenster (K-12). Wo Galerie, Kreativbuch und Mycel-Fenster in den fünf Bereichen sitzen, sagt der Auftrag nicht (→ 8).

## 4. Funktionen
1. **K-01** Rezeptbuch: Rezept mit Name, Bild, Zutaten (Menge, Einheit), Schritten, Portionen, Zubereitungszeit, Geschmacks-Merkmalen (B-64). Kategorien für Speisen (Vorspeisen, Suppen, Fleisch, Fisch, Vegetarisch, Kuchen, Desserts) und Getränke (B-63); frei benennbare Ordner, Ziehen und Ablegen (B-21); Suche (B-11). App schlägt Ordnung vor, Kunde bestätigt (Rahmen).
2. **K-02** Import: Webadresse – Rezeptdaten der Seite lesen, Bild übernehmen, KI nur als Rückfall (B-67, B-33); KI-Scan von Foto, PDF und ganzen Ordnern; Eintippen (B-12, B-22). PDF: nur die ersten 10 Seiten an die KI (B-61).
3. **K-03** Installierbare PWA mit Offline-Vorrat (B-13, B-19).
4. **K-04** Sicherung als JSON-Datei; beim Laden Ersetzen oder Hinzufügen, Doppelte erkannt (B-70); Backup-Tresor mit mehreren Ständen, automatisch angelegt, zurückholbar (B-14, B-71).
5. **K-05** Menüplaner: Rezepte auf Tage und Gänge, über mehrere Wochen (B-65); Einkaufsliste nach Kategorien mit Sammelliste zum Abhaken (B-66, B-24); Portionen umrechnen (B-15). Vorschlag der App, Kunde bestätigt.
6. **K-06** Oberfläche, Handbuch und Mengeneinheiten in 8 Sprachen (B-25); Rezeptübersetzer (B-16). Handbuch: 9 Kapitel in der App, als PDF und E-Book (B-27).
7. **K-07** Teilen per Code zum Scannen, als Datei, Druck (B-17).
8. **K-08** KI-Bild je Rezept und für viele Rezepte; vorher Kostenschätzung, dann Fortschritt (B-40, B-44); altes Bild bleibt speicherbar.
9. **K-09** KI-Kreativbuch aus gewählten Rezepten, Kostenübersicht vorher, scrollbarer Download (B-41).
10. **K-10** Food-Zine: Poster-Seite je Rezept, auch ohne KI-Schlüssel; Prompt-Generator; Galerie sortierbar per Ziehen (B-42).
11. **K-11** Import fremder Dateien: je unbekannter Kategorie nachfragen, wohin (B-43, B-45); App schlägt vor, Kunde bestätigt.
12. **K-12** Knoten im App-Netz: eigene Identität, Siegel, Mycel-Fenster, Verbinden nur auf Wunsch (B-47, B-50).
13. **K-13** Bedeutungssuche („etwas Leichtes mit Gemüse“) auf dem Gerät, im Hintergrund gerechnet, Oberfläche bleibt bedienbar (B-48, B-51).
14. **K-14** Schneller Start: Symbole als Dateien, kleinerer erster Anstrich; Ziel erster Anstrich 4,3 → 2,6 s (B-49).
15. **K-15** Kategorien umbenennen, eigenes Symbol, neu anlegen, löschen (vorher fragen, wohin die Rezepte gehen, B-58), zusammenlegen, sortieren (B-53); Rezepte ohne Kategorie sichtbar unter „Ohne Kategorie“ (B-59).
16. **K-16** Herkunft am Rezept; beim Einlesen kein Doppel, auch nach Umbenennen (B-54).
17. **K-17** Große Kamerafotos verkleinern statt abweisen; ein gemeinsamer Weg für alle Bilder an die KI (B-55).
18. **K-18** Vor dem Senden an eine KI versteckten Text und Bild-Metadaten entfernen; PDF-Seiten als gereinigtes Bild; bei einer Anweisung an eine KI einmal anhalten (B-56, B-60); Datei auf Knopfdruck prüfen.
19. **K-19** Installieren-Knopf in Kopfleiste und Einstellungen, verschwindet nach der Installation (B-57).
20. Ohne eigenen Baustein, trotzdem zu bauen und abzunehmen: Ausgabe ganzes Buch als PDF, EPUB, Blätterbuch-HTML, Einzelrezept drucken (B-68); Themen Landhaus, Frühling, Nacht, Modern, Bunt und Barrierefreiheit (B-28); untere Leiste (B-62).

## 5. Schnittstellen zu anderen Programmen
- Rezepte und Dateien hin- und hergeben zwischen Mein Rezeptbuch, Muttis Rezeptbuch (Schwester-App gleichen Aufbaus, B-32) und Mein Mixarium (Rahmen) – über Datei-Austausch; Format nicht festgelegt.
- Rezeptseiten im Internet (B-33).
- KI-Dienste: Claude, Mistral (Chat und OCR), OpenAI (Bilder), je eigener Schlüssel (B-34, B-46, B-72).
- App-Netz „SBKIM“ mit Sage-Protokol, Mein Mixarium, Muttis Rezeptbuch, Tresor-Apps (B-50) – nur auf Wunsch.

## 6. Ausdrücklich nicht
- N-01: kein Konto, keine Anmeldung beim Hersteller.
- Kein eigener Server (B-20), kein Abo, keine Werbung, kein Zähldienst (B-39).
- Kein Abgleich zwischen Geräten.
- Kein KI-Aufruf ohne Tipp und eigenen Schlüssel; nichts ins Netz beim Laden.
- Nicht mehr als 10 PDF-Seiten an die KI.

## 7. Abnahme
Je Baustein K-01…K-19 die in 4. genannten Bedarfe vorführen; zusätzlich die Liste „ohne Baustein“ (B-19–B-26, B-44, B-45, B-51, B-52, B-58–B-60, B-62–B-72) einzeln prüfen. Prüfpunkte u. a.:
- Flugmodus nach erstem Besuch: App startet, alles außer Netzfunktionen geht.
- Netzmitschnitt beim Laden: keine Anfrage.
- Rezept ohne Kategorie bleibt sichtbar; Kategorie löschen fragt nach Ziel.
- Fremde Datei mit unbekannten Kategorien: Rückfrage je Kategorie; erneut einlesen nach Umbenennen: kein Doppel.
- Kamerafoto in voller Auflösung wird angenommen.
- Datei mit verstecktem Text/KI-Anweisung: Reinigung, einmal anhalten.
- KI-Bildauftrag: Kosten vorher, Fortschritt sichtbar.
- Start auf dem Küchentablet gemessen gegen 2,6 s.
- Sterne-Erwartung aus dem Auftrag: B-11, B-12, B-13, B-15, B-17, B-53 wurden bei der Abnahme bewertet.

## 8. Offene Fragen und Widersprüche im Auftrag
1. „Ohne Internet: ja, immer“ gegen Webadresse-Import, KI-Funktionen und App-Netz – vermutlich „Grundfunktionen offline“; bitte bestätigen.
2. Geräte Android/iPhone: nur PWA (B-19) oder auch native Apps? Ich plane nur PWA.
3. Mitkochende Familienmitglieder (B-05) und Gäste, aber kein Abgleich und ein Gerät: wie arbeiten mehrere Personen? K-12 trägt Faktor „Mehrere Nutzer ×1,3“ ohne erklärten Mehrnutzerbetrieb.
4. KI-Anbieter: B-34 nennt Claude und Mistral, B-72 zusätzlich OpenAI; Rahmen „über einen Dienst“ – welcher Anbieter wofür, wählbar?
5. Austauschformat zwischen den drei Rezept-Apps nicht beschrieben; ebenso Begriffe Siegel, Mycel-Fenster, SBKIM-Identität – technisch nicht spezifiziert.
6. Bedarfe ohne Baustein (B-68 PDF/EPUB/Blätterbuch, B-28 Themen, B-62 Leiste, B-27 Handbuch-PDF/E-Book): Aufwand steckt in keiner Zeile – Schätzung fehlt.
7. „Schlägt vor, der Kunde bestätigt“ für B-11 und B-15: was genau schlägt die App vor?
8. Kostenschätzung KI-Bilder (B-44): Preisgrundlage je Anbieter fehlt.
9. Rezeptübersetzer (K-06): lokal oder per KI?
10. Ziel 2,6 s (B-49): auf welchem Gerät/welcher Verbindung gemessen?
11. Sicherungsstände im Tresor: wie viele, wie oft, wann gelöscht?
12. „Datei auf Knopfdruck prüfen“ (K-18): Prüfumfang nicht beschrieben.
13. Vorlagen nennen andere Programme (Küchenzettel, Workflow PDF, Datei-Post, Company Brain, Sende-Prüfer); K-12 hat Vorlage „–“ bei 70 % Wiederverwendung – Widerspruch.
14. Platzierung von Food-Zine-Galerie, Kreativbuch und Mycel-Fenster in den fünf Bereichen offen.
15. Die acht Sprachen sind nicht genannt.
