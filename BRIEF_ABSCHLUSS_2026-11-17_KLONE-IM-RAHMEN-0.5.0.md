# Abschlussbrief – Private Akte, Vorschau 0.5.0 „Klone im Rahmen“ (17.11.2026, nachts)

Der ausführliche Stand steht in `CLAUDE.md` (Abschnitt „Stand“, Eintrag 0.5.0 mit den eigenen Entscheidungen der Sitzung), die
Liste der Anpassungen in `docs/ANPASSUNGEN-GEGENUEBER-FAMILIENAKTE.md` (A22–A24). Der Brief davor liegt unter `docs/`.

## Was diese Sitzung gebaut hat (auf `main`)

- **Datei-Organizer im Rahmen:** der grüne Knopf „Dateien hineingeben“ und „Datei-Organizer“ im Baum öffnen den echten Organizer
  (Klon @ `f9822b7`, Fassung 0.4.14) in den Farben seines Tools, mit eigenem Speicher und ohne eigenen Service Worker.
- **Übergabe an die Akte:** im Organizer Seite „Familienakte“ › „An die Private Akte übergeben“. Index und Originale kommen ohne
  Ordnerwahl; in der Akte geht das Fenster „Ordner in die Akte legen“ über dem Organizer auf. Die Stelle dafür ist im Repo
  Datei-Organizer gebaut (`src/rahmen.ts`, PR #64 dort, auf `main`; ohne Rahmen ändert sich im Organizer nichts).
- **Workflow PDF im Rahmen:** eigener Klon @ `fe2e20d` (1.1.10). Roter Knopf „PDF scannen“ = Scanner, „Workflow PDF öffnen“ im
  Familienbüro = das ganze Programm, an einer PDF-/Bild-Unterlage „Mit Workflow PDF bearbeiten“. „Teilen“ im Klon legt in die Akte.
- **Bauweise:** `tools/rahmen-bauen.mjs` erzeugt je Klon eine Startseite unter `rahmen/` (Brücke, `<base>`, Farbdatei); die Klone
  bleiben byte-gleich. Brücken `rahmen/organizer-bruecke.js`, `rahmen/wfpdf-bruecke.js`; Farben `rahmen/*-thema.css`.

## Geprüft – und wie

- `node tests/probe.cjs`: 234 Prüfungen grün, Handy- und PC-Breite, im Browser der Sitzung (Chromium, `localhost`).
  Neu darin: beide Klone laden im Rahmen; eigener Speicher und kein Worker (nachgemessen); Testordner des Organizers einlesen →
  übergeben → Fenster mit 98 Dateien samt Bereich → zwei davon liegen in der Akte; „Teilen“ aus Workflow PDF legt in die Akte;
  eine Unterlage aus der Akte ist in Workflow PDF offen; Scanner geht über den roten Knopf auf.
- Von Hand nachgestellt: Neuladen im Rahmen und ein Sprung auf die Startseite des Klons kommen mit Brücke wieder.
- Im Repo Datei-Organizer: `npm run build` grün, UI-Probe 156 grün (6 neu), CI grün.
- `npm run bau:pruefen` und `tools/klon-nachziehen.mjs --pruefen` grün (vier Klone gleich mit ihren Pins).

## Nicht geprüft, nicht gebaut

- **Nichts davon am Tablet, mit echter Kamera, mit einem echten Ordner oder über GitHub Pages gesehen.** Die Sitzung erreicht Pages nicht.
- Scan-PDFs liest der Organizer weiter nur auf den ersten 2 Seiten; die Lage der Zeilen steht nicht im Index (Repo Datei-Organizer).
- Die Farbpalette der Akte wirkt nicht in den Klonen (fest: Grün und Rot der Tools).
- Aus Workflow PDF Abgelegtes kommt nach „Sonstiges“ und ist eine neue Unterlage; die bearbeitete Quelle wird nicht ersetzt.
- Der Organizer spricht in Fuß und Hilfe weiter von der Familienakte (Text des Klons). Seine Discovery-Filme brauchen Netz.
- Offline: die Klone kommen erst beim ersten Gebrauch in den Vorrat – einmal mit Netz öffnen.
- Offen aus dem Brief davor: Rückmeldung zu 0.4.6–0.4.8, Sinn-Treffer, Text über dem Scan, „Guten morgen“-Treffer.

## Für Klaus am Tablet

1. Private Akte öffnen, auf die Fassungsmarke tippen, bis **0.5.0 · Basic** dasteht.
2. Grüner Knopf: der Datei-Organizer. Einen Ordner wählen (oder „Testordner“), sortieren, dann oben **Familienakte** ›
   **An die Private Akte übergeben**. Im Fenster Haken und Bereich prüfen, „… in die Akte legen“. Zurück mit **‹ Akte**.
3. Roter Knopf: Scanner von Workflow PDF. Seite fotografieren, **PDF erstellen** – das PDF soll danach unter „Deine Unterlagen“ liegen.
4. Eine PDF-Unterlage antippen › **Mit Workflow PDF bearbeiten**, etwas ausfüllen, dort **Teilen** – es kommt als neue Unterlage zurück.
5. Sagen, was hakt: Ladezeit des Organizers beim ersten Öffnen, Farben, ob Kamera und Ordnerwahl im Rahmen gehen.

## Auftrag der nächsten Sitzung (Vorschlag)

- Klaus' Befunde vom Tablet zu 0.5.0 abarbeiten.
- Im Repo Datei-Organizer: Scan-PDFs ganz lesen (Sortieren weiter mit 2 Seiten, voller Text im Hintergrund), Lage der Zeilen in
  den Index; danach Klon nachziehen (`node tools/klon-nachziehen.mjs datei-organizer --quelle ../Datei-Organizer`, `npm run bau`).
- Bereich-Vorschlag aus dem Sortier-Kern für einzeln Abgelegtes (auch aus Workflow PDF); Rückgabe an die Quelle statt neuer Unterlage.
- Pages auf „GitHub Actions“ umstellen (ein Klick von Klaus): ausgeliefert werden müssten nur Hülle, `rahmen/`,
  `klone/datei-organizer/app/`, `klone/workflow-pdf/` und die wenigen Dateien aus `klone/familienakte/`.

## Feste Regeln (unverändert)

Klone nie von Hand ändern; keine echten Unterlagen, Schlüssel oder Passwörter im Repo oder Chat; Familienbüro bleibt eine eigene
App; keine Ausgabe von APK oder Windows-Paketen ohne Klaus' Wort; nichts als geprüft melden, was nicht gelaufen ist.
