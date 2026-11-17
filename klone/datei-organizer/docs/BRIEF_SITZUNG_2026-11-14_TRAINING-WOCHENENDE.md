# Brief: Trainings-Sitzung Datei-Organizer (Wochenende 14.–16.11.2026, Budget bis Montag 11:00)

Klaus (14.11.2026): Guthaben ist wieder da; der Datei-Organizer soll trainiert werden, damit die **Vorsortierung schneller und
besser** läuft – parallel zur Plansitzung „Pseudonymisieren“ in der Familienakte. Das Budget muss nicht aufgebraucht werden.

## Was es schon gibt (nicht neu bauen)

- Generator `scripts/haushalte-bauen.mjs` (10 erfundene Haushalte, Behördenpost, Gehalt, Belege, Fotos), `scripts/grosslauf.mjs`,
  Messen `scripts/messen.mjs`, Wortmodell `scripts/briefmodell-abstimmen.mjs` → `lib/wortmodell.ts` (nie von Hand),
  Prüfreihe A–H in `docs/PRUEFREGELN-GRUPPE.md` (A, B, H, Briefe-2 verbraucht; **offen: C, D, E, F, G**).
- Große Ordner in Blöcken seit 0.4.3 (`src/lauf.ts`, `src/arbeit.ts`), aber **nicht gemessen über ~800 Dateien**.

## Zur Zahl 50.000

50.000 Dateien sind sinnvoll als **Mengen- und Tempoprobe** (erfundene Dateien, nur der Kern, keine Agenten – kostet fast nichts
außer Rechenzeit). Als **handeingeordnete Lehrdaten** sind sie weder nötig noch bezahlbar: Die Güte kommt aus etwa **1.000 gut und
unabhängig eingeordneten, möglichst verschiedenen** Schriftstücken; mehr gleichartige Daten bringen kaum etwas. Echte Unterlagen
(Runde G) kommen erst über die Maske aus der Plansitzung.

## Erweiterung (Klaus 14.11.2026: „ohne Codex … Dokumente komplexer … Personenanzahl erweitern“)

- **Ohne Codex.** Einordner sind **drei unabhängige Claude-Agenten** (ohne Kenntnis des Kerns und der Lösung) plus Stapel-Autor;
  Mehrheit aus den drei Agenten, Autor als Schiedsrichter nur bei Gleichstand.
- **Läuft in einer eigenen, neuen Sitzung** (nicht in der Sitzung, die diesen Brief geschrieben hat).
- **Block 0 – Stapel komplexer machen** (vor allen Runden, erweitert `scripts/scan-setzen.py`/Generator, alles erfunden):
  Briefkopf mit Logo und Absenderzeile, **zwei- und dreispaltige** Seiten, **Tabellen** (Rechnungsposten, Kontoauszug, Gehalt),
  **fett und dünn**, verschiedene Schriftgrößen, Fußzeilen mit Bankverbindung, Stempel und Unterschrift, mehrseitig;
  **PDF ohne Textebene** (nur Seitenbild), damit vor dem Einordnen die **Texterkennung** laufen muss; **Bilddateien mit Text**
  (Foto vom Brief, Bon, Schild, Bildschirmfoto); Scanqualität in Stufen **gut – mittel – schlecht** (Schräglage, Rauschen,
  Unschärfe, Flecken, Knick, Schatten, abgeschnittener Rand, niedrige Auflösung), gemischt in jedem Stapel; OCR-Güte je Stück wird
  mitgemessen (`OCR-GUETE.json`), damit klar ist, ob ein Fehler am Lesen oder am Einordnen liegt.
- **Mehr Personen:** statt 7–10 Haushalten **mindestens 25 Haushalte** mit mehr Mitgliedern (Großeltern, Pflegekind,
  Patchwork, WG, Selbstständige, Mehrgenerationen), damit Person und Absender schwerer werden.

## Vorschlag: fünf Blöcke (in dieser Reihenfolge, jeder für sich abschließbar)

| Block | Was | Größe | Agenten | Ergebnis |
|---|---|---|---|---|
| 1 Tempo | Mengenprobe 1.000 → 5.000 → 20.000 → **50.000** erfundene Dateien durch Kern und Block-Lauf; Dauer je 1.000, Speicher, Arbeitsordner, Weitermachen nach Abbruch; Engstellen messen, dann beheben (z. B. Art nur aus dem Dateikopf, Kopf nur die ersten Bytes, Texterkennung nur wenn nötig, Arbeit in einem Worker) | Skript | keine | Messbericht + schnellere Vorsortierung, vorher/nachher in Zahlen |
| 2 Runde C | Vorgänge über mehrere Jahre derselben Familien (Umzug, Kinder kommen/gehen, neue Kassen- und Steuernummern), komplex gesetzt nach Block 0 | 300 Schriftstücke | 3 Einordner-Agenten + Stapel-Autor | Bereich/Absender/Person/Vorgang je Feld, gesichert oder nicht |
| 3 Runde E | dieselbe Art Stücke als Foto/Scan durch die echte Texterkennung, mehrseitig, zwei Stücke in einem Scan, Mail mit Anlage | 200 | 3 + Autor | Lesefehler statt sauberer Text |
| 4 Runde D + F | D: anderer Schreiber (Stapel von einem anderen Agenten-Aufbau); F: andere Jahre, alte Vordrucke, neue Gebührennamen | je 150 | 3 + Autor | Kreuztest: hängt der Kern an der Machart? |
| 5 Lernen | erst **nach** den Messungen: Wortmodell neu abstimmen aus allen verbrauchten Stapeln, Regeln schärfen, an einem **ungesehenen** Rest gegenmessen; nur übernehmen, was gesichert besser ist | – | keine | neuer Kern mit Zahlen |

Zusammen rund **950 neu eingeordnete Schriftstücke** (je drei unabhängige Agenten + Autor) und eine 50.000er-Mengenprobe.
Ohne Codex (Klaus 14.11.): drei unabhängige Claude-Agenten je Runde.
Je Workflow höchstens 10 Agenten; jeder Block ein eigener Lauf, damit Klaus nach jedem Block anhalten kann.
Ist Block 1–3 fertig und Budget übrig: Block 4, dann 5. Reicht es nicht: 1, 2, 5 sind das Wichtigste.

## Regeln (stehen fest)

- Nur **erfundene** Daten; nichts Echtes, keine pseudonymisierten Texte ins Repo (öffentlich).
- Regeln je Runde **vorab** festschreiben (`docs/PRUEFSTAPEL-…-REGELN.md`), Kern vor der Messung einfrieren (Commit nennen),
  einmal messen, danach verbraucht; berichten auch, wenn es schlechter wird.
- **Nicht in die Familienakte nachziehen**, solange dort die Plansitzung läuft; Kernänderungen nur im Datei-Organizer, Nachziehen
  (`tools/sortierkern-nachziehen.mjs`) ist ein eigener späterer Schritt mit Klaus' Ja.
- Eigene geprüfte PRs selbst mergen (Freibrief), **nichts veröffentlichen** ohne Klaus' Wort.
- Abschlussbrief mit Stundennachweis und verbrauchtem Budget je Block; Forschungsbefunde nur nach KimHub.

## Startauftrag zum Einfügen

```
Repo lausiklauskn-png/Datei-Organizer (eigener Zweig). TRAININGS-SITZUNG bis Montag 11:00, Budget muss nicht ausgeschöpft werden.
Zuerst lesen: CLAUDE.md, docs/BRIEF_SITZUNG_2026-11-14_TRAINING-WOCHENENDE.md, docs/PRUEFREGELN-GRUPPE.md, docs/PLAN.md
(Abschnitt „Training an erfundenen Haushalten“), scripts/haushalte-bauen.mjs, scripts/grosslauf.mjs, scripts/messen.mjs.
Ziel: Vorsortierung schneller und besser. Zuerst Block 0 (Stapel komplexer: Spalten, Tabellen, fett/dünn, PDF ohne Textebene → OCR,
Bilder mit Text, Scans gut/mittel/schlecht, mindestens 25 Haushalte). Dann fünf Blöcke in dieser Reihenfolge, jeder für sich abschließen und berichten:
1 Tempo (Mengenprobe bis 50.000 erfundene Dateien, nur Kern, Engstellen messen und beheben, vorher/nachher),
2 Runde C (300, Vorgänge über Jahre), 3 Runde E (200, Foto/Scan/Texterkennung), 4 Runden D+F (je 150),
5 Lernen erst nach den Messungen (Wortmodell neu, an ungesehenem Rest gegenmessen, nur gesichert Besseres übernehmen).
Je Runde: Regeln vorab, Kern einfrieren, drei unabhängige Claude-Einordner (ohne Codex) + Stapel-Autor, einmal messen, dann verbraucht.
Höchstens 10 Agenten je Workflow, je Block ein Lauf. Nach jedem Block kurzer Stand an Klaus mit verbrauchtem Budget.
Nicht: echte oder pseudonymisierte Daten ins Repo, nicht in Familienakte/BookLedgerPro nachziehen (dort läuft die Plansitzung),
nichts veröffentlichen, keine Schlüssel im Chat. Eigene geprüfte PRs selbst mergen. Abschlussbrief mit Stundennachweis.
```
