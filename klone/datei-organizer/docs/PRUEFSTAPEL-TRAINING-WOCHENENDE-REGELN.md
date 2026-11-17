# Trainings-Wochenende 14.–16.11.2026 – Regeln für die Runden C, E, D, F und den Rest, vorab festgelegt

Eingecheckt am 14.11.2026, **bevor** einer der Stapel existiert. Es gelten `docs/PRUEFREGELN-GRUPPE.md` (Regeln 1–10) und
`docs/FACHREGEL.md`. Auftrag: `docs/BRIEF_SITZUNG_2026-11-14_TRAINING-WOCHENENDE.md` (Klaus 14.11.: ohne Codex, Dokumente komplexer,
mehr Personen; Freibrief zum Mergen eigener geprüfter PRs; nichts veröffentlichen; nicht in Familienakte/BookLedgerPro nachziehen).

## Für alle Runden

1. **Kerne.** Alt = Kern `534cc08` (Datei-Organizer 0.2.0; darin ist der in den Runden A/B/H nachgewiesene Stand `7ac9d4f` aufgegangen,
   die alte Kennung liegt nach dem Zusammenführen nicht mehr im Verlauf). Neu = der Kern **nach Block 1** (Tempo), eingefroren mit
   Commit-Kennung im Abschnitt „Eingefroren“ unten, bevor der erste Stapel-Auftrag vergeben wird. Bis Block 5 ändert sich am Kern nichts.
2. **Stapel-Autoren** sind Claude-Agenten ohne Zugang zum Repo, zum Kern, zu Lehrdaten und früheren Stapeln. Sie bekommen nur die
   18 Fächer, die Liste der Arten, die Fachregel und ihren Auftrag. Alles ist erfunden (Namen, Anschriften, Nummern; IBAN nur mit Nullen,
   Kennzeichen „BSP-…“, Firmen mit „Beispiel“ im Namen oder sichtbar erfunden). Der Stapel wird ungelesen eingecheckt.
3. **Drei unabhängige Einordner** (Claude-Agenten, ohne Codex; Klaus 14.11.) bekommen nur die Texte, Listen, Haushalte und Fachregel
   (`scripts/einordner-paket.mjs`) – nicht das Soll des Autors, nicht den Kern, nicht die anderen Einordner. Sie arbeiten mit
   verschiedenen Modellen (zwei Sonnet, ein Opus), damit nicht dreimal dasselbe Urteil kommt. Bei mehr als 150 Stücken teilt sich
   ein Einordner-Platz in zwei Agenten für je eine Hälfte (beide mit demselben Auftrag und Modell).
4. **Soll = Mehrheit der drei Einordner** je Feld; bei drei verschiedenen Urteilen entscheidet der Stapel-Autor, wenn er einem der drei
   folgt, sonst „strittig“ und nicht gewertet. Berichtet werden Übereinstimmung je Paar, Fleiss' Kappa und wie oft der Autor
   entscheiden musste.
5. **Felder:** Bereich (nur das Fach zählt; daneben Fach oder Zweitfach), Schriftstück, Absender (ohne Rechtsform, Groß/klein,
   Satzzeichen), Person (nur wo das Soll eine nennt), Frist (Datum oder leer).
6. **Einmal messen**, alt gegen neu am selben Stapel, je Feld mit 95-%-Spanne (Wilson) und McNemar (5 %), dazu „falsch und als sicher
   ausgegeben“. Danach ist der Stapel verbraucht. Verschlechterungen werden berichtet.
7. **Form:** Jeder Stapel wird zusätzlich mit `scripts/setzen-komplex.py` gesetzt (Briefkopf mit Logo, Spalten, Tabellen, fett/dünn,
   Fußzeilen, Stempel, Unterschrift; PDF mit Textebene, PDF nur aus Seitenbildern, Handyfoto; Güte gut/mittel/schlecht) und
   **ein zweites Mal** gemessen, mit der Texterkennung wie in der App (`scripts/leser-node.mjs`). Text-Messung und Form-Messung werden
   getrennt berichtet; Hauptergebnis ist je Runde das, was die Runde prüft (C, D, F: Text; E: gesetzt). Je Stück wird die Lesegüte
   (Wortfehler gegen den Ausgangstext) mitgeschrieben, damit klar ist, ob ein Fehler am Lesen oder am Einordnen liegt.
8. **Grenze:** erfundene Unterlagen von Claude-Agenten; die Zahlen gelten für diese Machart. Echte Unterlagen erst über Runde G (Maske).

## Runde C – Vorgänge über Jahre (`pruefstapel-runde-c/`, 300 Stücke)

- Zwei Autoren schreiben je 150 Stücke, jeder für eigene Haushalte; zusammen **vier bis sechs Haushalte über die Jahre 2021–2026**,
  größer als bisher (Großeltern, Pflegekind, Patchwork, Mehrgenerationen). Je Haushalt mindestens drei **Vorgänge**, die sich über
  mehrere Schriftstücke und meist über Jahre ziehen: Umzug (Mietvertrag, Kaution, Ummeldung, Stromwechsel, Nachsendeauftrag), Kind wird
  erwachsen (Kindergeld endet, Ausbildung oder Studium, eigene Krankenversicherung, eigene Steuer-ID, eigener Handyvertrag, Auszug),
  Heirat oder Trennung (Namenswechsel, Steuerklasse), Krankheit und Pflege, Erbfall, Kassen- oder Bankwechsel, neue Steuernummer
  nach Selbstständigkeit.
- Je Stück zusätzlich zum Soll: `vorgang` (Kurzname des Vorgangs, z. B. „Umzug 2023“, oder leer) und `datum`.
- **Fragen:** (a) Felder wie oben, alt gegen neu. (b) **Person bei Rollenwechsel:** Treffer der Person an Stücken, deren Person zum
  Zeitpunkt des Schreibens erwachsen geworden ist oder den Namen gewechselt hat (getrennt ausgewiesen). (c) **Vorgang:** Erkennt der
  Kern, was zusammengehört? Gemessen als Paare innerhalb desselben Haushalts: zwei Stücke gelten beim Kern als verbunden, wenn sie
  eine gleiche Nummer (Aktenzeichen, Kunden-, Vertrags-, Versicherten-, Steuernummer) tragen. Berichtet werden Anteil der erkannten
  Paare eines Vorgangs (Trefferquote) und Anteil der verbundenen Paare, die wirklich zu einem Vorgang gehören (Genauigkeit) – nur
  berichtet, nicht gewertet, weil der Kern keinen eigenen Vorgang ausgibt.

## Runde E – Foto, Scan, Texterkennung (`pruefstapel-runde-e/`, 200 Stücke)

- Ein Autor schreibt 200 Stücke für vier neue Haushalte, so wie sie auf Papier ankommen: mehrseitige Briefe (Anlage, Seite 2 mit
  Rechtsbehelf), Rechnungen mit Postentabellen, Kontoauszüge, Gehaltsabrechnungen, **lange Kassenbons** vom Großeinkauf, **digitale
  Kassenbons aus Supermarkt-Apps**, Mails mit Anlage, Bescheide mit Spalten. Dazu je Stück ein Hinweis zum Satz (`@spalten`, Tabellen
  mit `|`), damit der Satz der Vorlage folgt.
- **Zwei Stücke in einem Scan:** 15 Paare werden nach dem Schreiben zu einem PDF zusammengesetzt (Soll = das erste Stück; das zweite
  wird als „zweites Stück im selben Scan“ gezählt, gemessen: wie oft der Kern das erste richtig einordnet).
- Gesetzt nach Regel 7 mit fester Verteilung **pdf-scan 55 %, foto 30 %, bildschirm 5 %, pdf-text 10 %; Güte gut 30 %, mittel 40 %,
  schlecht 30 %**. Hauptergebnis: gesetzt, alt gegen neu; daneben derselbe Stapel als reiner Text (zeigt, was das Lesen kostet).
- Je Güte getrennt: Treffer je Feld und Wortfehler der Texterkennung.

## Runde D – anderer Schreiber (`pruefstapel-runde-d/`, 150 Stücke)

- Anderer Aufbau des Autors: ein Agent mit anderem Modell (Sonnet statt Opus) und anderem Auftrag – er schreibt nicht „Briefe eines
  Jahres“, sondern füllt **Vordrucke und Formularschreiben** aus, wie Verwaltungs- und Firmensoftware sie erzeugt (Felder mit
  Doppelpunkt, Kästchen, Textbausteine, Kürzel, Großbuchstaben-Köpfe, Referenzzeilen statt Fließtext), dazu kurze Mails und
  Benachrichtigungen aus Kundenportalen. Fünf neue Haushalte.
- Frage: Hängt der Kern an der Machart des Schreibers? Vergleich mit den Zahlen der Runden A/B/H (Text, Fließtext-Briefe).

## Runde F – andere Zeit (`pruefstapel-runde-f/`, 150 Stücke)

- Ein Autor schreibt Stücke aus **1998–2015 und 2027–2030**: DM-Beträge (vor 2002), alte Behörden- und Leistungsnamen (Arbeitsamt,
  Arbeitslosengeld II/„Hartz IV“, GEZ-Gebühr, Erziehungsgeld, Landesversicherungsanstalt, Bundesversicherungsanstalt für Angestellte,
  Zivildienst, Wehrbereichsverwaltung, Kfz-Steuer beim Finanzamt, Lohnsteuerkarte), alte Vordrucke und Schreibweisen (alte
  Rechtschreibung wie „daß“), sowie erfundene künftige Namen (z. B. neue Gebühren, umbenannte Kassen) für 2027–2030. Fünf Haushalte.
- Frage: Veralten die Regeln? Felder wie oben; Frist nur, wo das Soll eine nennt.

## Block 5 – Lernen und der ungesehene Rest (`pruefstapel-rest/`, 200 Stücke)

- Gelernt (neues Wortmodell über `scripts/briefmodell-abstimmen.mjs`, Regeln schärfen) wird **erst nach** den Messungen der Runden C,
  E, D, F, nur an verbrauchten Stapeln und Generator-Daten.
- Nachweis an einem **neuen, ungesehenen** Stapel `pruefstapel-rest/` (200 Stücke, ein Autor, Mischung aus den Bedingungen C, E, D, F,
  neue Haushalte), vergeben erst, nachdem der Kern nach dem Lernen eingefroren ist. Drei Einordner wie oben. Gemessen: Kern nach
  Block 1 (eingefroren) gegen Kern nach Block 5, als Text und gesetzt. Übernommen wird nur, was gesichert besser ist; was schlechter
  oder gleich ist, wird zurückgenommen und so berichtet.

## Eingefroren

- Alt: `534cc08`.
- **Neu: Commit `05c7ef0` (14.11.2026, 08:10 UTC)** – `lib/` darin byte-gleich mit `b391aaa` (Fassung 0.3.4 bis 0.4.3). Eingetragen,
  bevor der erste Stapel-Auftrag (Runde C) vergeben wurde.
- **Nachtrag zu Regel 1 (14.11., vor der Vergabe):** Block 1 ändert nur den Ablauf der App (`src/`: Stand in Teilen merken), nicht den
  Kern; deshalb wird schon jetzt eingefroren und Runde C vergeben, während die Mengenprobe läuft. Sollte Block 1 doch am Kern etwas
  für das Tempo ändern, muss es nachweislich dasselbe Ergebnis liefern (gleiche Felder an allen Generator-Dateien), sonst wird es erst
  nach Block 5 eingebaut.

**Block 5 eingefroren (14.11.2026):** Kern nach dem Lernen = Commit `156bd4c` (lib), gegen den eingefrorenen Kern `05c7ef0`.
Eingetragen, bevor der Auftrag für `pruefstapel-rest/` vergeben wurde. Gelernt nur an verbrauchten Stapeln (C, D, E, F, A, B, H, Briefe-2)
und Generator-Daten. Das neu abgestimmte Wortmodell brachte reihum ausgelassen nichts und ist nicht im Kandidaten.

## Teil 2 – Kreuztest der Vorverarbeitung (vorab festgelegt 14.11.2026, vor der Messung)

- **Frage:** Hilft die Vorverarbeitung vor der Texterkennung (`src/vorverarbeitung.ts`) an Schäden, die **nicht** vom eigenen Setzer stammen?
- **Bilder:** ein unabhängiger Claude-Agent hat einen eigenen Seitenaufbau und eigene Fehlerbilder gebaut (`/tmp/claude-0/training/kreuz/simulator.py`,
  Beschreibung `LIES-MICH.md`), ohne Setzer, Vorverarbeitung oder Kern zu sehen; 200 Stücke aus den Texten von `pruefstapel-rest/` (Text verbraucht,
  Bilder neu), 120 Scan-PDFs und 80 Fotos, je Güte ein Drittel.
- **Vergleich:** derselbe Kern (main `2ca6f38`), einmal ohne, einmal mit Vorverarbeitung, je Stück; Soll = `pruefstapel-rest/SOLL.json`.
- **Hauptfeld: Bereich** (McNemar, 5 %). Nebenfelder Schriftstück, Absender, Person, Frist mit Holm-Bonferroni; dazu gefundene Wörter und Zeit je Seite.
- **Einschalten** nur, wenn das Hauptfeld gesichert besser ist und kein Feld gesichert schlechter. Sonst bleibt sie aus.
- **Grenze:** Die Texte sind verbraucht (der Kern wurde aber zwischen beiden Läufen nicht geändert); beide Bildquellen sind erfunden; echte Unterlagen nur über Runde G.

## Absender-Runde (vorab festgelegt 14.11.2026, vor jedem Lernen; Klaus: „erst die Absenderoptimierung, danach in die anderen Apps“)

Lehren aus `docs/PRUEFBERICHT-EHRLICHKEIT-2026-11-14.md` sind eingearbeitet.

1. **Ziel:** Absender aus Scans und Fotos besser, ohne den Absender aus Text zu verschlechtern.
2. **Lernen nur an verbrauchten Stapeln:** Texte der Runden C, D, E, F und Rest; als Bilder gesetzt mit dem eigenen Setzer
   (`scripts/setzen-komplex.py`) **und** dem ersten fremden Simulator (`scripts/kreuz/simulator.py`), damit keine Machart allein gelernt wird.
   Generator-Daten erlaubt.
3. **Nachweisstapel `pruefstapel-absender/`:** 200 Stücke, ein neuer Claude-Autor (Opus), fünf neue Haushalte, Auftrag „Mischung wie im
   echten Papierkram eines Jahres“ wie bei den Runden A/B – **ohne** Hinweise auf bekannte Fehlerbilder (keine Vorgaben zu Logos, Portalen,
   App-Leisten, Vordrucken). Der Auftrag steht wörtlich in diesem Commit (unten) und wird vor dem Lernen vergeben. Der Stapel bleibt bis zum
   Einfrieren **außerhalb des Repos und ungelesen** (Verpacken für die Einordner nur über Skript), wie bei `pruefstapel-familie-k3`.
4. **Drei Einordner** (zwei Sonnet, ein Opus), je Agent ein eigener Arbeitsordner, Ergebnisse außerhalb des gemeinsamen Pakets.
5. **Gesetzt** wird der Nachweisstapel von einem **zweiten, neuen** unabhängigen Simulator (anderer Agent, ohne Zugang zu Setzer,
   erstem Simulator, Kern, Vorverarbeitung), der weder zum Lernen noch zum Abstimmen benutzt wird. 120 Scan-PDFs, 80 Fotos, Güten je ein Drittel.
6. **Einmal messen**, Kern vor dem Lernen (main `a9068c6`) gegen Kern nach dem Lernen **`079dd6d`** (eingefroren 14.11.2026, eingetragen vor der Messung).
   **Hauptfeld: Absender gesetzt** (McNemar, 5 %). Nebenfelder (Absender Text, Bereich, Schriftstück, Person, Frist – gesetzt und Text) mit
   Holm-Bonferroni; sie dürfen nicht gesichert schlechter werden. Abhängigkeit: zusätzlich Bootstrap nach Absender (gleicher Absender = ein Block).
7. **Übernommen** wird nur, was das Hauptfeld gesichert besser macht und kein Nebenfeld gesichert schlechter. Einzelne Regeln, die zum
   Gewinn nichts beitragen (Abzug-Probe am Lernstapel), werden vor dem Einfrieren herausgenommen.
8. **Grenze:** erfundene Unterlagen, Claude-Autoren und -Einordner; echte Unterlagen nur über Runde G.

**Vermerke vor der Messung:** (a) Beim Prüfen des Fortschritts wurden einmal die ersten 10 Dateinamen des Nachweisstapels gesehen (`ls | head`),
keine Inhalte; keine Regel danach ausgerichtet. (b) Abzug-Probe: „ : “ als Trennpunkt ohne Beitrag (Setzer 542 = 542, Simulator 1 412 = 412) →
entfernt; „Stelle mitnennen“ (Text +10/−9) → verworfen. (c) Lernwerte (keine Nachweise): Text 79,7 → 79,7 %, eigener Setzer 40,4 → 55,9 %,
Simulator 1 22,7 → 41,2 %. (d) Der erste Messlauf wurde abgebrochen, bevor ein Ergebnis gelesen war, um im Messwerkzeug den Export je Stück
(`--stuecke`, für den Bootstrap) zu ergänzen; der Kern blieb `079dd6d`. Ausgewertet wird nur der zweite Lauf (`scripts/absender-nachweis.mjs`).

**Ergebnis (gemessen 14.11.2026, einmal, `pruefstapel-absender/NACHWEIS.txt`; Stapel jetzt verbraucht):**
Hauptfeld **Absender gesetzt 29,5 → 49,0 %** (59 → 98 von 200; nur alt 0, nur neu 39; McNemar p = 3,6·10⁻¹²). Bootstrap nach Absender
(137 Blöcke, 10.000 Ziehungen): Gewinn 95-%-Bereich 25–54 Stück, keine Ziehung ≤ 0. Nebenfelder (Holm): keins gesichert anders;
Absender Text 83,0 → 85,0 % (nur neu 4), Bereich gesetzt 78,0 → 78,5 %, Schriftstück, Person, Frist unverändert. **Übernommen** (Regel 7 erfüllt).
Je Form (neu, Absender): Foto gut 70 %, mittel 33 %, schlecht 12 %; Scan gut 63 %, mittel 60 %, schlecht 45 %.
**Rollen:** Autor 1 (Opus), Einordner 6 Läufe (E1, E2 Sonnet; E3 Opus; je Hälfte ein eigener Agent), Verpacken 1, Simulator 2 1 (Opus, eigener
Code `scripts/kreuz2/`, ohne Zugang zu Setzer, Simulator 1, Kern) – 9 Agenten in einem Workflow, rund 1,7 Mio. Tokens, 22 Minuten.
Lernen, Einfrieren, Messen: diese Sitzung (Claude). **Grenzen:** erfundene Briefe von Claude-Autoren; Bilder von einem Simulator, nicht von
echten Scannern; ein Soll aus Claude-Einordnern. Echte Unterlagen nur über Runde G.

**Auftrag an den Autor (wörtlich vergeben):** „Schreibe 200 erfundene Schriftstücke für fünf neue Haushalte (eine Familie mit Kindern,
ein älteres Paar, eine Alleinlebende mit Nebenjob, eine Wohngemeinschaft, ein Selbstständiger mit Familie) über ein Jahr, Mischung wie im
echten Papierkram eines Jahres, alle 18 Bereiche, etwa 40 % mit eigener Frist. Wie echte Briefe als reiner Text.“ (Format, Listen,
Fachregel und Soll-Felder wie in den Runden C–F.)
