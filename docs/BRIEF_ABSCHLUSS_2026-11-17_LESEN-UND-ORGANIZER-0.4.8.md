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

## Vollmacht und Arbeitsweise für die Nachfolgesitzung (Klaus 17.11.2026, abends, im Chat)

- **Generalvollmacht für diesen Auftrag:** zusammenführen (PRs anlegen und gleich auf `main` bringen, in der Privaten Akte und im
  Repo Datei-Organizer), Repos in die Sitzung holen (Datei-Organizer, Workflow-PDF, bei Bedarf weitere von Klaus), und offene
  Fragen **selbst entscheiden** – nicht zurückfragen. Entschieden wird nach den Vorlagen in diesem Brief und in `CLAUDE.md`
  (Vorbild Workflow PDF in der Familienakte: Klon unverändert, eine Brücke, eine Farbdatei, eine erlaubte Abweichung). Jede
  eigene Entscheidung kurz in `CLAUDE.md` festhalten (was, warum), damit Klaus sie morgen nachlesen kann.
- **Ziel bis morgen früh:** die beiden Punkte sind in der Privaten Akte eingebaut und laufen als Web-App (PWA): (1) der
  Datei-Organizer als Klon im Rahmen hinter dem grünen Knopf, mit Übergabe an die Akte; (2) Workflow PDF als Klon im Rahmen.
  Klaus sieht es sich morgen früh am Tablet an. Erst alles als PWA; eine APK kommt später, wenn der grobe Kern steht.
- **Durcharbeiten, sparsam:** ohne Zwischenfragen und ohne Zwischenberichte bis zum Ende arbeiten. **Eine Ausgabe im Chat, am
  Ende:** was eingebaut ist, was geprüft ist und wie, was nicht geklappt hat, was Klaus am Tablet tun soll. Wenig lesen: nur die im
  Brief genannten Dateien und was der Bau wirklich braucht; große Ordner nicht durchsuchen, Ausgaben von Befehlen kurz halten.
- **Fassung:** am Ende steht eine größere Fassung, **0.5.0**. Geprüfte Zwischenstände dürfen vorher als 0.4.9, 0.4.10 … auf
  `main` (dann ist auch bei einem Abbruch nichts verloren); der Stand, den Klaus morgen ansieht, heißt 0.5.0.
- **Reihenfolge bei knapper Zeit:** zuerst der Datei-Organizer im Rahmen mit Brücke, dann die Übergabe an die Akte, dann
  Workflow PDF im Rahmen, dann die Farben, zuletzt die Verbesserungen im Repo Datei-Organizer (Scan-PDFs ganz lesen, Lage der
  Zeilen, Übergabe-Stelle) mit Nachziehen des Klons. Was nicht fertig wird, steht ehrlich in der Ausgabe und in `CLAUDE.md`.
- **Was die Vollmacht nicht aufhebt:** die festen Regeln aus `CLAUDE.md` – Klone nie von Hand ändern (nur über
  `tools/klon-nachziehen.mjs`), keine Schlüssel, Passwörter oder echten Unterlagen im Repo oder Chat, Familienbüro bleibt eine
  eigene App. Keine Ausgabe von APK oder Windows-Paketen, weder hier noch im Datei-Organizer oder in der Familienakte – dafür
  gilt weiter Klaus' eigenes Wort. Nichts als geprüft melden, was nicht gelaufen ist.

## Startauftrag

```
Lies im Repo Private-Akte zuerst CLAUDE.md, dann BRIEF_ABSCHLUSS_2026-11-17_LESEN-UND-ORGANIZER-0.4.8.md (dort besonders
„Auftrag der nächsten Sitzung“ und „Vollmacht und Arbeitsweise“). Hole dazu die Repos Datei-Organizer und Workflow-PDF.
Du hast für diesen Auftrag meine Generalvollmacht: zusammenführen, Repos hereinholen, Fragen selbst entscheiden – immer nach
den Vorlagen im Brief (Vorbild: Workflow PDF in der Familienakte). Frag mich nichts, arbeite bis zum Ende durch.
Ziel bis morgen früh: der Datei-Organizer und Workflow PDF laufen als Klone im Rahmen in der Privaten Akte (PWA), der
Organizer mit Übergabe an die Akte; Endstand Fassung 0.5.0 auf main. Reihenfolge und Grenzen stehen im Brief.
Arbeite tokensparend: wenig lesen, kurze Befehlsausgaben, keine Zwischenberichte. Nur eine Ausgabe im Chat, am Ende:
was eingebaut ist, was wie geprüft wurde, was nicht geklappt hat, was ich am Tablet tun soll.
Je Schritt wie gewohnt: Fassung erhöhen (FASSUNG in app.js, VERSION in sw.js, ?v= dreimal in index.html), npm run bau falls
src/ geändert ist, Probe mit python3 -m http.server 8765 und node tests/probe.cjs, PR und gleich zusammenführen.
CLAUDE.md und docs/ANPASSUNGEN-GEGENUEBER-FAMILIENAKTE.md mitführen, am Ende ein neuer Abschlussbrief.
```
