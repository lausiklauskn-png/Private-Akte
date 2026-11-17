# Prüfstapel „Familie mit drei Kindern“ (Punkte 3, 4, 5) – Regeln, vorab festgelegt (13.11.2026)

Eingecheckt, bevor es den Stapel gibt. Es gelten `docs/PRUEFREGELN-GRUPPE.md` und `docs/FACHREGEL.md`. Auftrag Klaus 13.11.
(Brief `docs/BRIEF_SITZUNG_2026-11-13_PUNKTE-3-9.md`, Freibrief): Punkte 3 (Fristen), 4 (Absender und Titel in der Familienakte) und
5 (Art des Schreibens) an **einem** neuen fremden Stapel prüfen. Zugleich der „frische Stapel nach dem Einbau“ und die erste Familie mit
drei Kindern.

## Fragen

1. **Punkt 3 – Fristen:** Liefert der verbesserte Kern weniger Fristen, die falsch und als sicher ausgegeben werden (falsches Datum
   oder Frist, wo das Soll keine hat), ohne dass richtige Fristen verloren gehen? Gemessen am Kern selbst und an der Kette bis zur
   geplanten Erinnerung in der Familienakte (`scripts/messen-fristkette.mjs`).
2. **Punkt 5 – Art des Schreibens** (`schriftstueck`): gesichert besser als der alte Kern, und an den verbrauchten Stapeln nicht
   schlechter (Kontrolle, kein Nachweis).
3. **Punkt 4 – Absender und Titel in der Familienakte:** Familienakte 2.28.66 (Absender aus dem eigenen Eingang) gegen die Familienakte
   mit Absender aus dem Kern. Titel wird berichtet (wie oft enthält der vorgeschlagene Titel den Soll-Absender und die Art), nicht gewertet.

## Eingefroren

- **Alt:** Datei-Organizer-Kern `534cc08` (Stand in Familienakte 2.28.66, `a10e96f`), BookLedgerPro `d08c071`.
- **Neu:** der Stand nach dem Lernen; seine Commit-Kennung wird hier eingetragen, bevor der Stapel gelesen oder gemessen wird.
- Lernen nur an Lehrdaten und verbrauchten Stapeln: `pruefstapel-unabhaengig`, `-briefe-2/-a/-b/-h`, `pruefstapel-vermieterin` (2025),
  `pruefstapel-vermieterin-2026` (seit 13.11. mit drei Einordnern ausgewertet), `testdaten-haushalte`. Das Wortmodell wird nur über
  `scripts/briefmodell-abstimmen.mjs` erzeugt.
- **Abweichung von „erst einfrieren, dann schreiben“ (offen benannt):** Damit Codex rechtzeitig einordnen kann, schreibt der
  Stapel-Autor parallel zum Lernen. Der Stapel liegt bis zum Einfrieren **außerhalb des Repos** und wird von der lernenden Sitzung
  weder gelesen noch ausgewertet; zum Verpacken für die Einordner dient ein Skript, das nur Dateinamen und Kopfzeilen setzt. Der
  Zweck der Regel (nicht am Prüfstapel abstimmen) bleibt so gewahrt.

## Stapel `pruefstapel-familie-k3/`

- Ein Agent ohne Zugang zu Apps, Kern, Lehrdaten und früheren Stapeln; er kennt nur Fachregel, Bereiche, Arten und diesen Auftrag.
- Ein Haushalt über ein Jahr (2026): Mutter, verwitwet im Lauf des Jahres (Tod des Mannes, Nachlass, Erbschein, Witwenrente-Antrag,
  Kündigungen und Umschreibungen), drei Kinder: eines volljährig (Ausbildung oder Studium, eigene Verträge, eigene Steuer-ID, Ende
  des Kindergelds), eines in der Schule, eines in der Kita. Dazu ein Elternteil der Mutter mit Pflegegrad im selben Ort (eigener
  Haushalt) – damit die Person nicht immer die Mutter ist.
- **150 Schriftstücke** als Text, Mischung wie im echten Papierkram eines Jahres; rund die Hälfte mit einer eigenen Frist (zahlen ohne
  Lastschrift, antworten, Unterlagen einreichen, Termin), darunter bewusst Fristen, die der Haushalt **anderen** setzt, Fristen nur als
  Wochenzahl („binnen zwei Wochen nach Zugang“), Widerspruchsbelehrungen und Abbuchungstermine (keine Frist).
- Soll des Autors je Stück: Bereich, Zweitfach, Schriftstück, Absender, Person, Frist (`ERWARTUNG.json`), Haushalte (`HAUSHALTE.json`).
- **Gescannt** (`pruefstapel-familie-k3-ocr/`): dieselben Stücke gesetzt und durch die Texterkennung des Workflow-PDF-Klons
  (`scripts/scan-setzen.py`, `scripts/ocr-stapel.mjs`), wie beim Lauf „Vermieterin“.

## Einordner

Stapel-Autor, ein zweiter Claude-Agent (sieht nur Texte und Listen), Codex über den Briefkasten (Auftrag 011). Soll = Mehrheit je
Feld; ohne Mehrheit strittig, nicht gewertet. Fehlt Codex zum Messzeitpunkt, heißt das Ergebnis „vorläufig, zwei Einordner“ und wird
mit Codex nachgerechnet – das Messen selbst (Ausgaben der Apps) geschieht trotzdem nur einmal.

## Gemessen wird, je einmal (Text und gescannt)

- Kern alt gegen neu, fünf Felder (`scripts/messen-briefe.mjs --alt`), Wilson-Spanne, McNemar; je Feld „falsch und sicher“.
- Fristkette: Familienakte 2.28.66 gegen Familienakte mit neuem Kern bis zur geplanten Erinnerung.
- Absender in der Familienakte alt gegen neu; Titel berichtet.

## Fertig, wenn

- Punkt 3: weniger falsche Fristen (gesamt oder „falsch und sicher“), ohne gesicherten Verlust richtiger Fristen.
- Punkt 5: Art gesichert besser, an den verbrauchten Stapeln nicht schlechter.
- Punkt 4: Absender in der Familienakte gesichert besser. Nur was gesichert besser ist, wird ausgegeben; sonst steht es so im Bericht.

## Grenzen

Ein erfundener Haushalt, von einem KI-Agenten geschrieben; gesetzte Seiten sind keine echten Scans; nichts am Gerät.

## Eingefroren (13.11.2026, bevor der Stapel gelesen wird)

Neuer Kern = Commit `f98a400` (Datei-Organizer). Gelernt nur an verbrauchten Stapeln:
- **Fristen** (`lib/erkennen.ts`): Ende eines Zeitraums, Zinsbindung, Beitragszahlungs- und Leistungsdauer, Stichtag, Angebotsbindung
  („halten uns bis“), Werbung („nur bis“, „bei Abschluss bis“) und Skonto-Tage sind keine Frist; Tage vor dem Briefdatum und mehr als
  18 Monate danach auch nicht (nur bei sicher erkanntem Briefdatum); bei mehreren Fristen gilt dann die nächste; „Fälligkeiten: 1. Rate …
  am“, „Zahlungstermine:“, „Zahlungsziel 14 Tage (…)“, nachgestellte Verneinung des Lastschriftmandats; Termine mit „Datum:“, „Aufnahmetag
  ist …“, „– bitte um 7:00 Uhr“. **Briefdatum** (`erkenneDatum`): „den …“/„vom …“ nur als Ortszeile, sonst eine Datumszeile für sich.
- **Wortmodell** (`lib/wortmodell-daten.ts`, `scripts/briefmodell-abstimmen.mjs --verbraucht …`, je Klasse höchstens 250 Beispiele):
  lernt zusätzlich an den sechs verbrauchten Stapeln (Soll = Mehrheit).
- **Abstimmung, kein Nachweis:** an den verbrauchten Stapeln Frist 851 → 881 von 937 (falsch und sicher 35 → 21); Wortmodell reihum
  je Stapel ausgelassen: Art 615 → 650 von 887, Bereich 639 → 647. Eigene Kernprobe 119 grün.

## Ergebnis (13.11.2026, einmal gemessen; vorläufig zwei Einordner – Codex Auftrag 011 steht aus)

Stapel: 150 Schriftstücke, 69 mit Frist; Einigkeit Autor/Claude-Agent: Kappa Bereich 0,97, Art 0,93, Absender 0,97, Person 0,93, Frist 0,99.
Kern `534cc08` gegen `f98a400` (`ergebnisse/familie-k3-kern*.json`), Familienakte 2.28.66 gegen 2.28.67 (`ergebnisse/familie-k3-fa-*.json`).

| Feld | alt | neu | gesichert? |
| --- | --- | --- | --- |
| Kern Bereich | 118/146 = 81 % | 126/146 = 86 % | nein (p = 0,12) |
| Kern Art (Punkt 5) | 123/141 = 87 % | 119/141 = 84 % | nein – eher schlechter (gescannt 125 → 119) |
| Kern Frist (Punkt 3) | 130/149, falsch und sicher 5 | 131/149, falsch und sicher 3 | nein |
| Kern Absender · Person | 137/146 · 91/120 | gleich | – |
| Familienakte Absender (Punkt 4) | 64/141 = 45 % | 137/141 = 97 % (gescannt 134) | **ja**, p < 0,001 |
| Familienakte Bereich | 112/146 = 77 % | 122/146 = 84 % | **ja**, p = 0,03 |
| Familienakte Frist bis Erinnerung | 54/69, falsches Datum 4, fälschlich 4/80 | 54/69, 2, 3/80 | nein |

Befund: Punkt 4 nachgewiesen und mit 2.28.67 ausgegeben. Punkte 3 und 5 **nicht nachgewiesen** – die Verbesserungen an den verbrauchten
Stapeln tragen am fremden Stapel nicht (Art: das Wortmodell aus den verbrauchten Stapeln verallgemeinert nicht). Der Kern bleibt, weil
er in der Familienakte den Bereich gesichert verbessert und bei Fristen nichts verschlechtert; die Art nutzt die Familienakte nicht.
Private Brain Pro mit Art aus dem Kern (Zuordnung vor der Messung festgelegt): Rechnung/Vertrag/Angebot 31/40 → 36/40, andere fälschlich
19/101 → 20/101 – nicht gesichert, nicht eingebaut.

## Nachgerechnet mit drei Einordnern (13.11.2026, Codex Auftrag 011)

Dieselben eingefrorenen Stände (Kern `534cc08` gegen `f98a400`, Familienakte 2.28.66 gegen `bc7494d`), Soll = Mehrheit aus drei
Einordnern; die Ausgaben der Apps sind dieselben, nur das Soll ist neu. Kappa Bereich 0,96; ohne Mehrheit 0 Stücke.
Zahlen: `ergebnisse/familie-k3-*-drei.json`.

| Feld | alt | neu | gesichert? |
| --- | --- | --- | --- |
| Kern Bereich | 122/150 | 129/150 (gescannt 128) | nein (p = 0,19) |
| Kern Art (Punkt 5) | 128/149 | 124/149 (gescannt 130 → 124) | nein – eher schlechter |
| Kern Frist (Punkt 3) | 130/150, falsch und sicher 6 | 132/150, falsch und sicher 3 | nein (p = 0,63) |
| Familienakte Absender (Punkt 4) | 67/150 = 45 % | 146/150 = 97 % (gescannt 69 → 143) | **ja**, p < 0,001 |
| Familienakte Bereich | 116/150 = 77 % | 125/150 = 83 % (gescannt 124) | **nein** (p = 0,06; vorläufig 0,03) |
| Familienakte Frist bis Erinnerung | 54/70, falsches Datum 5, fälschlich 4/80 | 55/70, 2, 3/80 | nein |

Befund bleibt: Punkt 4 nachgewiesen. Der Bereich der Familienakte ist mit drei Einordnern **nicht mehr gesichert** besser (nur noch
Richtung); die Ausgabe 2.28.67 stützt sich auf den Absender und richtet beim Bereich keinen Schaden an (14 besser, 5 schlechter).
