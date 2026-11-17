# Abschlussbrief 16.11.2026 – Datei-Organizer 0.4.13, neue Kategorie, Übernahme in die Familienakte

Für die nächste Sitzung. Davor lesen: `CLAUDE.md` (oben: „Veröffentlicht 0.4.13“ und „Inhalt von 0.4.13“), danach
`docs/BRIEF_SITZUNG_2026-11-16_OFFENE-PUNKTE-LANDKARTE.md` (die offenen Punkte der Landkarte gelten weiter).

## Stand

- **Datei-Organizer 0.4.13 ist ausgegeben** (Android, Windows, Basic über Pages; Nachweis `docs/VEROEFFENTLICHUNG-0.4.13.json`).
  Nicht erneut ausgeben. Die Quellen stehen auf **0.4.14** (Code 54, Vorrat v26); `main` = `34514fc`.
- **Familienakte 2.28.72 ist ausgegeben** (von der Nachbarsitzung „Pseudo-Fenster“) und enthält das Gegenstück zur neuen Kategorie
  (dort #214). 2.28.73 (Android-Update unter Android 9/10) liegt dort als Entwurf #212 einer weiteren Sitzung. Vor jeder Arbeit in der
  Familienakte den Brief `BRIEF_ABGLEICH_2026-11-16_PRIVATE-BRAIN-PRO.md` dort lesen und eintragen.
- Sortier-Kern (`lib/`), Discovery und Landkarte sind in Familienakte, BookLedgerPro und BookLedger Basic auf dem Stand des Organizers;
  nachzuziehen ist nichts.

## Was in 0.4.13 neu ist (Klaus am Tablet, 16.11.)

1. **Ordner-Seite:** eine Fläche (Antippen = Ordner oder Dateien wählen, Hineinziehen fügt dazu), Ordner in der Überschrift, Arbeitsordner
   hinter dem Zahnrad.
2. **Neue Kategorie:** Knopf „Neue Kategorie“ neben jeder Bereichs-Auswahl und als letzter Listeneintrag; der Name wird auf dem Gerät
   gemerkt und reist im Index als Bereich „von dir“ mit. Die Familienakte schlägt ihn ab 2.28.72 als neuen Lebensbereich vor.
3. **Prüfliste:** beim Ändern ist jedes Feld wählbar, in jedem Sieb (vorher nur das gerade offene).
4. **Kopf:** Fassung (Link fürs Update) und Fähnchen links neben dem Namen.
5. **Original ansehen:** das Auge zeigt bei einer PDF die ersten drei Seiten als Bild in der App; nach einem Neustart öffnet die App den
   gemerkten Ordner still wieder.
6. Update-Fähnchen prüft öfter (10 Minuten nach „aktuell“, 2 Minuten nach einem Fehlschlag).

Geprüft: Bau, Kern 157, UI-Probe 136, in der Familienakte `run-organizer-uebernahme-tests` 7. **Am Gerät ist nichts davon geprüft.**

## Offen

- **Gerätetest 0.4.13 am Tablet** (Klaus): Ordner-Fläche, Zahnrad, neue Kategorie anlegen, Ändern im ersten Sieb, PDF-Vorschau mit den
  eigenen Dateien, Fassung links, Fähnchen. Danach derselbe Ordner als Eingangsordner in der Familienakte 2.28.72: kommt die neue
  Kategorie als Vorschlag an?
- Ursache des fehlenden Update-Fähnchens ist am Gerät nicht belegt.
- Offene Punkte der Landkarte (unverändert): Kern in BookLedgerPro auf `e4205fa`, Unterordner und Frist bei der Übernahme, Umbenennen und
  Verschieben, eigene Muster und Zweitfach, Lehrer, Outlook-Dateien.
- Die Geschenkbox nennt noch Datei-Organizer 0.4.12; sie gehört der Familienakte (dort Entwurf #215 der Nachbarsitzung, Version 37) –
  dort nachsehen, ob 0.4.13 schon eingetragen ist, und nur nach dem Abgleich-Brief ändern.

## Lehren dieser Sitzung (stehen auch in `CLAUDE.md`)

- Android-Ausgabe erst starten, wenn der Prüflauf `android` auf dem main-Stand grün ist; Windows danach, nie gleichzeitig.
- Ein Prüflauf, der an „HTTP 429“ beim Laden einer Abhängigkeit scheitert, ist ein überlasteter Server: einmal neu starten.
- Was Klaus am Tablet nicht findet, fehlt für ihn: ein Listeneintrag „Unklar“ ist kein Knopf „Neue Kategorie“.

## Forschung und Zeiten

Stehen nur in KimHub: `forschung/messungen/datei-organizer-2026-11-14-bis-16.md` und elf Einträge in `forschung/sitzungen.json`
(Kennungen `2026-11-16-datei-organizer-a` bis `-k`), mit Arbeitsblöcken, Arm und Herkunft der Befunde.

## Startauftrag zum Einfügen

```
Repo lausiklauskn-png/Datei-Organizer (eigener Zweig, Entwurfs-PR; eigene geprüfte PRs selbst zusammenführen, Ausgaben nur mit Klaus' Wort).
Zuerst lesen: CLAUDE.md, docs/BRIEF_ABSCHLUSS_2026-11-16_ORDNERSEITE-KATEGORIE-0.4.13.md,
docs/BRIEF_SITZUNG_2026-11-16_OFFENE-PUNKTE-LANDKARTE.md.
Stand: Datei-Organizer 0.4.13 ausgegeben (Quellen 0.4.14), Familienakte 2.28.72 ausgegeben, 2.28.73 dort in Arbeit einer anderen Sitzung.
Erster Schritt: Klaus nach dem Gerätetest 0.4.13 fragen (Ordner-Fläche, Zahnrad, neue Kategorie, Ändern in jedem Sieb, PDF-Vorschau,
Fassung links) und die Befunde abarbeiten. Danach die offenen Punkte der Landkarte der Reihe nach.
Nicht: eine ausgegebene Fassung erneut ausgeben; in der Familienakte arbeiten, ohne den Abgleich-Brief dort zu lesen und einzutragen;
byte-gleiche Bausteine von Hand ändern; echte Unterlagen oder persönliche Daten ins Repo legen; Filme ohne Klaus' Wort erzeugen.
Forschungseinträge und Zeiten nur nach KimHub (tools/sitzung-eintragen.mjs).
```
