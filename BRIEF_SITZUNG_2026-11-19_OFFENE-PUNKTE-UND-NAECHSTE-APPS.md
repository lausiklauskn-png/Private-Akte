# Brief für die nächste Sitzung – offene Punkte, dann Private Brain, Portemonnaie, Familienbüro (Stand: Private Akte 0.6.5, 18.11.2026)

Der ausführliche Stand steht in `CLAUDE.md` (Abschnitt „Stand“, 0.6.0 bis 0.6.4, und „Feste Regeln“). Der Abschlussbrief der letzten
Sitzung ist `docs/BRIEF_ABSCHLUSS_2026-11-18_KALENDER-UND-NOTIZEN-0.6.3.md`.

## Wie gearbeitet wird (Klaus 18.11.2026)

- **Der Reihe nach die Liste unten abarbeiten.** Jedes Thema anfangen oder fertig machen, dann das nächste. Was in dieser Sitzung
  nicht fertig wird, geht mit einem Brief an die nächste Sitzung weiter (gleiche Form wie dieser Brief).
- **Keine zusätzlichen Gegenproben erfinden, nicht in Schleifen verlieren.** Die vorhandene Probe (`node tests/probe.cjs`) läuft je
  Schritt einmal; neue Prüfungen nur für das, was gerade gebaut wird, und am Ergebnis prüfen, nicht an der Anzahl.
- Ziel: **das Konzept einmal fertig haben**, dann arbeitet Klaus mit der App und testet Design, Aufbau und Sinn – daraus ergibt sich,
  was noch zu tun ist.
- Freibrief wie zuvor: zusammenführen (PR, nach grüner Prüfung gleich auf `main`), Repos hereinholen, Einzelheiten selbst entscheiden
  und kurz in `CLAUDE.md` festhalten. Leise arbeiten, eine Ausgabe am Ende. Was der Freibrief nicht aufhebt: Klone nie von Hand ändern;
  das Gelernte wird nie gelöscht; keine echten Unterlagen, Schlüssel oder Passwörter im Repo oder Chat; keine APK-/Windows-Ausgabe;
  nichts als geprüft melden, was nicht gelaufen ist.
- Je Schritt: Fassung erhöhen (`FASSUNG` in `app.js`, `VERSION` in `sw.js`, `?v=` dreimal in `index.html`, Fassung in
  `tests/probe.cjs`), `npm run bau`, Probe, `npm run bau:pruefen`, PR, zusammenführen; `CLAUDE.md` und
  `docs/ANPASSUNGEN-GEGENUEBER-FAMILIENAKTE.md` (zuletzt A37) mitführen.
- **Aussehen** (feste Regel seit 18.11.): Ansichten aus einem Klon nicht umgestalten – nur Farben, je Tool eine Farbdatei
  (`rahmen/<tool>-thema.css`). Am Handy zählt die Höhe: Köpfe höchstens zwei Zeilen, Zeilen flach, nur Symbol statt dicker Knöpfe.

## Die Liste, in dieser Reihenfolge

### 1. Akten, Unterlagen, Dateien (Konzept, wartet auf Klaus' Antworten)

`docs/VORSCHLAG_2026-11-18_AKTEN-UNTERLAGEN-DATEIEN.md` – Fragen A bis F. **Zuerst Klaus fragen** (eine kurze Nachricht mit den sechs
Fragen, je eine Zeile), dann bauen: „Akten“ echt und je Person; die Beispiele der ersten Vorschau heraus („Akten“, die sechs
„Bereiche“-Kacheln, „Eingang“, „Zuletzt abgelegt“); Person und Akte beim Ablegen; Übergabe aus dem Organizer nimmt ab Werk nur
Unterlagen mit. Die Personen gibt es im Tresor der Familienakte schon – nutzen, nicht neu erfinden.

### 2. Kleine offene Punkte (je kurz)

- Termin zu einer **echten** Unterlage anlegen („Bearbeiten mit › Kalender“ führt noch zum alten Beispiel-Kalender; der Klon kann
  Bezüge über `references`). Danach `kalender()` und `fNotiz` in `app.js` entfernen.
- Person und Absender an einer Unterlage von Hand setzen (heute nur aus der Übergabe des Organizers).
- „⋯“ oben am Handy neben der Seitenleiste ist doppelt – mit Klaus' Test entscheiden.
- Falls am Ende der Sitzung vom 18.11. nicht mehr geschehen: Datei-Organizer 0.4.17 (PR #67 dort) zusammenführen und
  `node tools/klon-nachziehen.mjs datei-organizer --quelle ../Datei-Organizer`, dann Fassung erhöhen.
- Im Editor von Workflow PDF leuchtet nach dem Scan „PDF ausgeben“ (führt weg von der Akte).
- Kachel „Workflow PDF“ im Familienbüro-Fenster: bleibt sie, seit es die eigene Stadt gibt?

### 3. Private Brain hereinholen (Klaus 18.11.: „wichtig, als nächstes“)

Private Brain Pro holt E-Mails mit Anlagen und legt sie heute für die Familienakte in das Fach `eingang-familienakte` (mit der
Vorsortierung `familienakte-uebergabe.json`, siehe `CLAUDE.md` der Familienakte, „Vorsortierung aus Private Brain Pro“). Die Stadt
„Private Brain“ im Baum und der Abschnitt „Mails“ in der Akte sind noch Beispiel.
- Erst nachsehen: Repo Private-Brain-Pro (bzw. die Web-Fassung) hereinholen, prüfen, ob es eine Web-Seite gibt, die wie Workflow PDF
  und der Datei-Organizer **als Klon im Rahmen** laufen kann (eigener Speicher über eine Brücke, Übergabe an die Akte als Nachricht –
  Vorbild `rahmen/organizer-bruecke.js`, `rahmen/wfpdf-bruecke.js`), oder ob nur die Übergabe (Mail + Anlagen → Unterlage) angeschlossen
  wird. Entscheiden nach demselben Maßstab wie beim Kalender (dort Weg B: die echte Ansicht, nichts nachgebaut).
- Ergebnis: die Stadt „Private Brain“ öffnet das echte Programm oder die echte Liste der Mails; Mails mit Anlagen landen als
  Unterlagen in der Akte (Person/Absender aus der Vorsortierung).

### 4. Portemonnaie (Entscheidung steht in `CLAUDE.md`, „Entschieden“)

„Neu, schlank, offen“: einfache Einträge „Geld rein / Geld raus“, die reinen Rechenteile aus BookLedgerPro (`src/domain/money.js`,
`kassenbuch.js`, `tagesabschluss.js`) als Klon mit Pin (`--nur`), **keine** Kopie der Kasse-Seite. Bon fotografieren (roter/gelber
Knopf oben) legt den Bon als Unterlage ab und den Betrag als Posten. Offen bei Klaus: Portemonnaie offen gespeichert oder gleich im
Tresor – kurz fragen. Der Monat geht später als Datei an BookLedgerPro (BookLedgerPro selbst kommt später).

### 5. Familienbüro (eigene App, „außen“)

`Familienbuero-Pro` bleibt eine eigene App (AGPL-3.0 wegen ONLYOFFICE). Die Private Akte **ruft es auf** (Kachel/Stadt öffnet das
Familienbüro, eine Unterlage geht als Kopie hinein, das Ergebnis kommt als neue Unterlage zurück – wie bei Workflow PDF), baut es aber
nicht ein. Offen bei Klaus: nur aufrufen oder als Vorschau im Rahmen – kurz fragen, dann den einfacheren Weg bauen.

### 6. Danach: Tests mit Klaus

Design, Aufbau, sinnvolle Gestaltung – am Tablet, am Handy, im geteilten Bildschirm. Befunde in `CLAUDE.md` und der Anpassungsliste.

## Was Klaus am Tablet zuletzt bestätigt hat (18.11.)

Notiz einsprechen mit Datum und Uhrzeit („funktioniert astrein“), die verschiebbare Seitenleiste („funktioniert wunderbar“),
Glocke rot mit Zahl in der Leiste des Kalenders. Noch nicht gesehen: 0.6.2–0.6.5 (Baum über „Deine Unterlagen“, Vorschläge beim
Tippen, „Wen es betrifft“, Organizer 0.4.15/0.4.16 im Rahmen (mit schmalem Fuß), „am nächsten Tag um halb drei“), Anmeldung bei Google/Microsoft.

## Startauftrag

```
Lies im Repo Private-Akte zuerst CLAUDE.md, dann BRIEF_SITZUNG_2026-11-19_OFFENE-PUNKTE-UND-NAECHSTE-APPS.md.
Du hast meinen Freibrief wie zuvor. Arbeite die Liste im Brief der Reihe nach ab: zuerst frag mich die Fragen A–F zum Vorschlag
Akten/Unterlagen/Dateien, dann bau es; dann die kleinen offenen Punkte; dann Private Brain hereinholen, dann das Portemonnaie, dann
das Familienbüro (nur aufrufen). Keine zusätzlichen Gegenproben, keine Schleifen. Was du nicht schaffst, gibst du mit einem Brief an
die nächste Sitzung weiter. Arbeite leise, eine Ausgabe am Ende: was eingebaut ist, was wie geprüft wurde, was nicht geklappt hat,
was ich am Tablet tun soll.
```
