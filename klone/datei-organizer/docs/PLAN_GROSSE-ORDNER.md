# Sehr große Ordner (Klaus 14.11.2026) – gebaut in 0.4.3

Klaus 14.11.: „dass eine freie Ordnerwahl stattfindet bei größeren Dateien … einen sehr großen Ordner mit sehr vielen Bytes zu sortieren …
auf die SD-Karte … und verarbeitet sie da … nicht, dass sie in diese Browser-Problematik hineinrutscht, was wir deswegen gemacht haben,
diese APK-App zu bauen.“

## Heute (0.4.2, im Code nachgesehen)

- Freie Ordnerwahl gibt es (Android-Ordnerwahl inkl. SD-Karte, Windows-Ordnerdialog). Originale werden **nicht** kopiert; geschrieben wird nur
  `organizer-index.json`.
- **Bricht bei großen Ordnern:**
  1. Jede Datei wird **ganz** in den Arbeitsspeicher der Oberfläche geladen (`QuellDatei.lesen` → `einlesen`, Fingerabdruck über alle Bytes),
     auch über 30 MB, wo kein Text mehr gelesen wird. Ein Video von mehreren GB bringt die App zum Absturz.
  2. Die Arbeitsdaten (Liste, gelesene Texte, Sortierung, Stand der Blöcke) liegen in IndexedDB der WebView = App-interner Speicher
     (Größe begrenzt, beim Deinstallieren weg).
  3. Die ganze Liste samt Texten liegt gleichzeitig im Arbeitsspeicher.

## Vorschlag (Ja/Nein je Punkt bei Klaus)

- **A** Große Dateien nie ganz laden: Fingerabdruck rechnet die App selbst (Java / Windows-Engine), stückweise am Ort; in die Oberfläche nur der
  Dateikopf und bei Dokumenten bis 30 MB der Text.
- **B** Arbeitsordner frei wählbar (z. B. SD-Karte): Liste, Texte, Stand blockweise als Dateien dorthin; in der App nur der Merker, welcher
  Arbeitsordner gilt. Deinstallieren verliert nichts; Grenze ist die SD-Karte. Offen: **(1) eigener Arbeitsordner** (empfohlen) oder
  (2) versteckter Unterordner im Dateiordner (bricht die Regel „nur organizer-index.json“).
- **C** Schlanke Liste im Arbeitsspeicher; Texte nur bei Bedarf aus dem Arbeitsordner.
- **D** Speicherprüfung vor jedem Block; zu wenig frei → anhalten mit Meldung, Weitermachen später.

Proben nur mit erfundenen Dateien (auch eine sehr große, erzeugt), keine Massenprüfung mit echten Dateien (Klaus 14.11.).
Veröffentlichen erst danach (Empfehlung; Klaus entscheidet).

## Klaus' Antwort (14.11.) und was gebaut ist (0.4.3)

Klaus: A „Stück für Stück … wie mit den Videos; starker Rechner → gleich mitladen, deswegen vorher den Rechner prüfen“ · B „Arbeitsordner
auf der SD-Karte, wählbar; nur auf das Laufwerk gehen, automatisch immer in den richtigen Ordner“ · C Ja · D Ja · (1) eigener Arbeitsordner ·
veröffentlichen erst danach.

| Punkt | gebaut | Wo |
|---|---|---|
| A | Leistung aus Arbeitsspeicher und Kernen: klein (Blöcke 25, ganz bis 30 MB), mittel (50, 64 MB), stark (100, 256 MB). Größere Dateien: nur Dateikopf (600 Bytes) und Prüfsumme – in der App am Ort (`pruefsumme`, Android und Windows), sonst Stück für Stück (`src/sha256.ts`). Ergebnis gleich wie beim ganzen Laden (Art, SHA-256). | `src/arbeit.ts` `leistungAus`, `src/app.tsx`, `src/quellen.ts` |
| B | „Laufwerk wählen“ → darin entsteht `Datei-Organizer-Arbeit` (heißt der gewählte Ordner schon so, gilt er selbst). Nie im Pro-Tresor (`tresorordner.json` → abgewiesen). Liste in Teilen (`stand.json`, `liste-NNNN.json`, je 1000 Dateien, nur geänderte Teile neu), Stand der Blöcke (`lauf.json`, `lauf-NNNN.json`); im App-Speicher nur ein leerer Stand. Nach Neuinstallation: Laufwerk wählen → Stand übernommen. Nichts wird gelöscht. | `arbeitsordner`/`speicherFrei` in `DoOrdnerPlugin`, `DesktopOrdner`; `src/arbeit.ts` `ArbeitSpeicher` |
| C | Mit Arbeitsordner: im Speicher höchstens 20 000 Zeichen Text je Datei; der ganze Text langer Dokumente in `texte-….json`. | `schlank` |
| D | Vor jedem Block: freier Speicher (Arbeitsordner bzw. App-Speicher) ≥ 50 MB + 2 × min(Größe, 1 MB) je Datei des Blocks, sonst Halt mit Meldung, Weitermachen später. Unbekannt → weiter. | `blockBedarf`, `speicherReicht` |

**Abweichung, benannt:** Klaus sagte „unter Familienakte, da wo die anderen liegen“. Der Ordner der Familienakte („Family-Projekt“) ist der
verschlüsselte Pro-Tresor; offene Arbeitsdateien dürfen dort nicht hinein. Deshalb entsteht `Datei-Organizer-Arbeit` **neben** ihm auf dem
gewählten Laufwerk. Der Name steht an einer Stelle je Teil (`ARBEIT` in `src/arbeit.ts`, `NativeUtil.java`, `DesktopOrdner.java`).

**Grenzen:** nicht am Gerät gemessen (SD-Karte, echte GB-Dateien, Android-Ordnerwahl an der Laufwerkswurzel – manche Android-Fassungen
erlauben die Wurzel nicht, dann einen Ordner darauf wählen); Basic (Browser) hat keinen Arbeitsordner; die Index-Datei mit Text trägt bei
Arbeitsordner die gekürzten Texte; die Familienakte kennt `pruefsumme` nicht (Rückfall Stück für Stück über die Brücke, langsamer).
Proben: UI 114 (17 neu, gestellte App mit Laufwerk), Engine 64 (9 neu), native 66, `sha256` 12 Größen gegen node:crypto; Gegenproben 5/5.
