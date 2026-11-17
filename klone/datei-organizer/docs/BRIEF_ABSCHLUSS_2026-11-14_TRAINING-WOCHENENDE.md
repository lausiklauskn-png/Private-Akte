# Abschluss Trainings-Sitzung, Teil 1 (14.11.2026, 07:46–11:05 UTC)

Auftrag: `docs/BRIEF_SITZUNG_2026-11-14_TRAINING-WOCHENENDE.md` (Block 0, dann 1–5, ohne Codex, drei Claude-Einordner + Stapel-Autor,
höchstens 10 Agenten je Workflow, nichts veröffentlichen, nichts in Familienakte/BookLedgerPro nachziehen). Nachträge Klaus 14.11.:
lange Kassenbons und App-Bons mit hinein; Freibrief für selbstständiges Merken; danach Übernahme in die anderen Apps vorbereiten
(Familienakte erst prüfen); bei sichtbarer Verbesserung ein weiteres Training unter anderen Bedingungen; genauere Dokumentation, wer
welche Rolle hatte. Alle Zahlen und Rollen: **`docs/TRAINING-WOCHENENDE-ERGEBNISSE.md`**. Regeln vorab: `docs/PRUEFSTAPEL-TRAINING-WOCHENENDE-REGELN.md`.

> **Berichtigung 14.11.2026 nach unabhängiger Prüfung (`docs/PRUEFBERICHT-EHRLICHKEIT-2026-11-14.md`):** Der einzige „gesicherte“ Gewinn aus Block 5 (Absender aus Scans/Fotos 34 → 43 %) ist ein **Kreisschluss** – 16 von 18 Gewinnen sind Spuren des eigenen Setzers (Logo-Kürzel, App-Leiste). Die Absender-Regeln sind wieder aus dem Kern. „Gesichert“ steht im Folgenden ohne Mehrfachkorrektur (Bonferroni über 10 Tests je Runde: 0,005); danach hielte keine der Verbesserungen. Alle sechs Stapel-Autoren schrieben mit Python-Generatoren; 35 Agenten mit Fehlstart. Runde F Frist nach Regel (nur mit Soll, n = 64): neu 93,8 %, alt 95,3 %. Block-1-„IndexedDB“ ist in Node nachgebildet.

## Ergebnis in einem Satz je Block

- **Block 0 – Stapel komplexer:** Setzer für echte Post (Logo, Spalten, Tabellen, fett/dünn, Fuß, Stempel, Unterschrift; PDF mit Text,
  PDF nur aus Bildern, Handyfoto, Bildschirmfoto; Güte gut/mittel/schlecht), 26 Haushalte, lange Bons, App-Bons, Lesegüte je Stück.
  Befund: der alte Generator lief nach 610 Zufallszügen im Kreis (frühere Trainingszahlen aus gleichförmigen Daten).
- **Block 1 – Tempo:** Stand nach jedem Block merken war die Engstelle (bei 20.000 Dateien 1.069 → 52 ms je 1.000, Speicher 1,4 → 0,5 GB);
  behoben, Weitermachen nach Abbruch gibt dasselbe Ergebnis, 50.000 Dateien in gut 3 Minuten ohne Texterkennung. Offen (Vorschau nötig):
  Texterkennung (~40 h für 50.000 mit einem Worker) und Speicher (1,2 GB bei 50.000).
- **Block 2 – Runde C (300, Vorgänge über Jahre):** Bereich gesichert besser als 0.2.0 (81,7 → 85,3 %); Person bei Rollenwechsel 87,5 %;
  Vorgänge erkennt der Kern über Nummern kaum (10 %).
- **Block 3 – Runde E (200, Foto/Scan):** gesetzt kein Feld gesichert besser; der Absender scheiterte auch bei gutem Lesen (50 %) – Einordnen,
  nicht Lesen. Schlechte Scans: Bereich 55 %, Absender 5 %.
- **Block 4 – Runden D (Vordrucke) und F (andere Jahre):** D: Schriftstück neu **gesichert schlechter** als 0.2.0 (82 → 77 %), Absender 54 %;
  F: kein Unterschied, Bereich 77 %.
- **Block 5 – Lernen:** Wortmodell neu brachte nichts (nicht übernommen). Absender-Regeln und zwei Fehlerbehebungen übernommen; am
  **ungesehenen** Stapel: Absender aus Scans/Fotos **34 → 43 %, gesichert** (falsch und sicher 36 → 21), alles andere gleich.

## Wer was gemacht hat (Agenten)

| Block | Workflow | Agenten | Rollen | Token (Agenten) | Dauer |
|---|---|---|---|---|---|
| 2 Runde C | `runde-c-vorgaenge` | 9 | 2 Autoren (Opus), 1 Paket (Haiku), 6 Einordner (je Platz 2 Agenten: E1, E2 Sonnet, E3 Opus) | 1,78 Mio. | 32 min |
| 3 Runde E | `runde-e-foto-scan` | 8 | 1 Autor (Opus), 1 Paket (Haiku), 6 Einordner | 1,31 Mio. | 21 min |
| 4 Runden D+F | `runden-d-und-f` | 9 | Autor D (Sonnet, Vordrucke), Autor F (Opus), 1 Paket (Haiku), 6 Einordner (je Runde E1, E2 Sonnet, E3 Opus) | 1,25 Mio. | 16 min |
| 5 Rest | `rest-ungesehen` | 8 | 1 Autor (Opus), 1 Paket (Haiku), 6 Einordner | 1,14 Mio. | 22 min |
| (Fehlstart) | Skript von Runde E mit falschem Zielordner | 1 | nach Sekunden abgebrochen, nichts geschrieben | ~0 | – |
| 0, 1, Auswertung | diese Sitzung | – | Generator, Setzer, Messung, Kern-Änderungen, Statistik | – | – |

Zusammen **35 Agenten (mit Fehlstart), rund 5,5 Mio. Token** in Agenten (die Token dieser Hauptsitzung sind nicht einzeln ausgewiesen). Kein Workflow über
10 Agenten. Soll stets = Mehrheit der drei Einordner; der Autor musste zweimal entscheiden (je ein Schriftstück in C und E); nie strittig.
**Alle sechs** Autoren schrieben mit eigenen Python-Generatoren (gleichförmigere Texte); die zwei C-Autoren teilten einen Arbeitsordner (einer überschrieb eine Datei des anderen); Einordner-Hälften teilten Hilfsdateien und sahen per `ls` fremde Ergebnisdateien (gelesen hat sie keiner). D meldete selbst weniger Fristen als verlangt.

## Stundennachweis

| Zeit (UTC) | Was |
|---|---|
| 07:46–08:30 | Lesen, Block 0 (Setzer, Generator, Leser), erste Messung |
| 08:10–09:00 | Kern eingefroren (`05c7ef0`), Runde C vergeben und gemessen; Generator-Befund, Messwerkzeug-Hänger behoben |
| 08:50–09:55 | Runde E vergeben und gemessen; 50.000 Dateien gebaut; CI (app/ neu bauen, Windows-Dateinamen) |
| 09:40–10:15 | Block 1 gemessen; Runden D und F vergeben und gemessen |
| 10:15–11:05 | Block 5: lernen, einfrieren (`156bd4c`), ungesehener Rest, Messung, Dokumentation, Übernahme vorbereitet |

Rund **3 Stunden 20 Minuten**; Budget nicht ausgeschöpft.

## Geändert im Repo (Zweig `ccr-f880e7d7-359udz`, PR #26)

- Kern: `lib/erkennen.ts`, `lib/siebe.ts` (+ `kern-js/`); App: `src/lauf.ts`, `src/zustand.ts`, `src/arbeit.ts`, `src/app.tsx` (Lauf in Teilen), `app/` neu gebaut.
- Werkzeuge: `scripts/setzen-komplex.py`, `leser-node.mjs`, `mengenprobe.mjs`, `stapel-zusammen.mjs`, `soll-aus-einordnern.mjs`, `messen-vorgang.mjs`;
  erweitert: `haushalte-bauen.mjs --komplex`, `belege-bilder.py`, `messen.mjs`, `messen-briefe.mjs --gesetzt/--soll SOLL.json`, `briefmodell-abstimmen.mjs`.
- Stapel (verbraucht): `pruefstapel-runde-c/-d/-e/-f`, `pruefstapel-rest`. Proben: Kern 149 grün, UI 115 grün, CI grün.

## Nicht gemacht / offen

- **Nichts veröffentlicht**, nichts in Familienakte oder BookLedgerPro nachgezogen. Vorbereitung: `docs/UEBERNAHME-VORBEREITUNG-2026-11-14.md`
  (Familienakte erst, wenn die Sitzung „Pseudonymisierung“ dort fertig ist; diese Sitzung hat keinen Zugriff auf die anderen Repos).
- Texterkennung schneller und Speicher kleiner (Block 1) – sichtbares Verhalten, erst Vorschau.
- Schwächen: Absender aus Scans (43 %), schlechte Scans, zwei Stücke in einem Scan, Vordrucke (Schriftstück), alte Behördennamen (Bereich).
- Forschungseintrag nach KimHub: nicht gemacht (KimHub nicht in der Sitzung).
