# Abschlussbrief – Private Akte, Vorschau 0.4.8 (17.11.2026, spät)

Der ausführliche Stand steht in `CLAUDE.md` (Abschnitt „Stand“, 0.4.1 bis 0.4.8), die Liste der Anpassungen in
`docs/ANPASSUNGEN-GEGENUEBER-FAMILIENAKTE.md` (A16–A21). Dieser Brief nennt, was die Sitzung gemacht hat, und den Auftrag für die
nächste, eigene Sitzung (Klaus 17.11.: Workflow PDF und Datei-Organizer als Klone in der Privaten Akte, dazu die Verbesserungen
am Datei-Organizer).

## Was diese Sitzung gebaut hat (alles auf `main`)

- 0.4.1: Sinn-Treffer erst ab 0,2; Rückfall „nicht alle Wörter passen“ ohne Füll- und Bereichswörter.
- 0.4.2–0.4.5: die Suche liest den Inhalt der PDFs; Texterkennung (Tesseract aus dem Klon) für Fotos und Scans beim Ablegen;
  Anzeige, was gerade gelesen oder gerechnet wird; „Inhalt gelesen bei x von y Unterlagen“.
  **Am Tablet bestätigt (0.4.4):** „Essig auf Marmor“ findet das Bonusheft als „im Text gefunden“, 3 von 3 gelesen.
- 0.4.6–0.4.7: Fundstelle am Treffer (Ausschnitt und Seite); Leser in der Akte (Seite der Fundstelle, Wörter markiert, Suche im
  Dokument). Am Tablet noch nicht gesehen.
- 0.4.8: „Importieren“ › „Ordner in die Akte legen“ – ein im Datei-Organizer sortierter Ordner kommt mit Einordnung, Datum und
  gelesenem Text herein. Nur mit gestelltem Ordner geprüft.

## Offen aus dieser Sitzung

- Klaus' Rückmeldung am Tablet zu 0.4.6–0.4.8: Treffer antippen (Leser), ein Beleg-Foto ablegen (Texterkennung, Dauer), Ordner KFZ
  aus dem Datei-Organizer übernehmen (liegt die `organizer-index.json` im gewählten Ordner?).
- Ein Sinn-Treffer, der wirklich passt, wurde noch nicht gesehen; die zweite Grenze („halb so nah wie das Beste“) ist weiter geschätzt.
- Leser: bei Scans nichts markiert. Klaus' Gedanke: den erkannten Text über das Bild legen, ein-/ausblendbar; die Texterkennung
  liefert die Lage der Zeilen, gespeichert wird sie noch nicht.
- Rechnen der Abschnitte geschieht erst beim ersten „Finden“ (50 Abschnitte am Tablet: wenige Minuten), nicht beim Ablegen.
- „Guten morgen“ erschien bei „Ordnung auf japanisch“ als Wort-Treffer – hier nicht nachstellbar, Ursache offen.

## Auftrag der nächsten Sitzung: Klone im Rahmen (Workflow PDF, Datei-Organizer)

**Vorbild** ist die Einbettung von Workflow PDF in die Familienakte (im Klon nachgelesen, `klone/familienakte/`):
`public/apps/workflow-pdf/` (App byte-gleich), `tools/wfpdf-app-patch.mjs` (die eine erlaubte Abweichung in `index.html`: Brücke
als erstes Skript, Farbdatei als letztes Stylesheet, kein eigener Service Worker, kein Mycel-Knoten),
`public/apps/fa-wfpdf-bruecke.js` (eigener Speicher `FamilienakteWFPDF1`, Schlüssel `fa_wfpdf_*`, kein Worker, Dateien hin und
zurück über Nachrichten), `public/apps/fa-wfpdf-thema.css` (Rot → Petrol, Installieren/Netz-Leiste ausgeblendet),
`app/workflow-pdf-seite.tsx` (Rahmen, Nachrichten), `tools/wfpdf-app-nachziehen.mjs`, Pins `public/apps/HERKUNFT.json`.

**Datei-Organizer** (Klaus: Aufbau und Design sollen mitkommen, nur die Farben werden angepasst):
1. Klon auf den Stand von Klaus' App ziehen (am Tablet 0.4.13; Klon hier @ `bcd48a4`). Die fertige Web-App liegt im Klon unter
   `klone/datei-organizer/app/` (Vite, `base: "./"`, also im Rahmen ladbar; rund 77 MB mit Discovery-Filmen).
2. Der grüne Knopf „Dateien hineingeben“ zeigt den echten Organizer im Rahmen statt des Beispiels. Brücke nötig: der Organizer
   meldet einen eigenen Service Worker an (`app/sw.js`) und liegt unter demselben Ursprung wie die Private Akte – eigener Speicher,
   kein eigener Worker. Er ist ein gebündeltes Paket; die Brücke kommt schlechter an sein Inneres als bei Workflow PDF. Nicht raten:
   erst nachsehen, welche Speicher er benutzt.
3. Farben der Privaten Akte als eigene Farbdatei über dem Klon (ungeprüft, wie weit der Organizer über CSS-Variablen färbbar ist).
4. Direkte Übergabe: der sortierte Stapel samt Index geht ohne Ordnerwahl an die Akte; dort öffnet sich das Fenster von 0.4.8
   (`organizer` in `src/tresor.ts`, `fOrdner` in `app.js`). Ob der Organizer dafür eine Stelle hat oder eine Ergänzung in seinem
   Repo braucht, ist nicht nachgesehen.

**Verbesserungen im Repo Datei-Organizer** (dort bauen, dann als Klon nachziehen – Klone nie von Hand ändern):
- Scan-PDFs werden nur auf den ersten 2 Seiten erkannt (`src/pdf.ts`, `SCAN_SEITEN = 2`). Zum Sortieren reicht das; für die Suche
  im ganzen Scan braucht der Index den Text aller Seiten (Vorschlag: Sortieren weiter mit 2 Seiten, der volle Text im Hintergrund).
- Der Index (`lib/index-format.ts`) trägt `text` bis 20.000 Zeichen und `abschnitte`, aber nicht die Lage der Zeilen – die
  bräuchte der Leser der Akte, um Fundstellen im Scan zu markieren.
- Eine Übergabe-Stelle für den Rahmen (Stapel und Index als Nachricht an die Akte) und ein Betrieb ohne eigenen Service Worker.

**Workflow PDF in der Privaten Akte:** der Klon liegt schon in `klone/familienakte/public/apps/workflow-pdf/`, aber mit der Brücke
der Familienakte (Speicher `FamilienakteWFPDF1`). Für die Private Akte braucht es eine eigene Brücke und damit eine eigene
gepatchte Startseite – oder einen eigenen Klon von Workflow PDF. Offen, welcher Weg; erst vorschlagen. Später (Klaus): die
Kamera oben über Workflow PDF.

**Familienbüro:** nicht auf diesem Weg. Entschieden (siehe `CLAUDE.md`): eigene App, AGPL-3.0 wegen ONLYOFFICE, kommt nicht in
diese App; die Private Akte ruft es höchstens auf. Das Repo wurde in dieser Sitzung nicht angesehen.

## Startauftrag

```
Lies im Repo Private-Akte zuerst CLAUDE.md, dann BRIEF_ABSCHLUSS_2026-11-17_LESEN-UND-ORGANIZER-0.4.8.md und
docs/ANPASSUNGEN-GEGENUEBER-FAMILIENAKTE.md. Hole dazu das Repo Datei-Organizer (dort CLAUDE.md lesen), bei Bedarf Workflow-PDF.
Frage mich zuerst nach meiner Rückmeldung vom Tablet zu 0.4.6–0.4.8 (Leser, Beleg-Foto, Ordner KFZ aus dem Datei-Organizer).
Dann der Auftrag aus dem Brief: den Datei-Organizer als Klon im Rahmen in die Private Akte bringen, nach dem Vorbild von
Workflow PDF in der Familienakte (Klon unverändert, eine Brücke, eine Farbdatei, eine erlaubte Abweichung in der Startseite).
Reihenfolge: Klon auf 0.4.13 ziehen, Organizer im Rahmen hinter dem grünen Knopf, Farben, direkte Übergabe an die Akte.
Die Verbesserungen am Datei-Organizer (Scan-PDFs ganz lesen, Lage der Zeilen im Index, Übergabe-Stelle) im Repo Datei-Organizer
bauen und als Klon nachziehen. Für Workflow PDF erst einen Vorschlag machen. Familienbüro bleibt eine eigene App.
Jeder Schritt: Fassung erhöhen (FASSUNG in app.js, VERSION in sw.js, ?v= dreimal in index.html), npm run bau falls src/ geändert
ist, Probe mit python3 -m http.server 8765 und node tests/probe.cjs, dann PR und gleich zusammenführen.
docs/ANPASSUNGEN-GEGENUEBER-FAMILIENAKTE.md still mitführen.
```
