# Prüfregeln für die Gruppe der Pro-Apps

Klaus 12.11.2026: „Die Prüfung soll für die ganze Gruppe gelten.“ Gruppe im Sinn des Mycels: **Familienakte**, **BookLedgerPro**,
**Private Brain Pro** und der **Datei-Organizer** als Prüf- und Sortierwerkzeug. Klaus 12.11. (Nachtrag): Die **Basic-Fassungen gehören
dazu** – Familienakte Basic (die Web-App aus demselben Repo), BookLedger Basic (eigenes Repo, byte-gleich aus Pro nachgezogen) und
Private Brain Basic. Ein Nachweis gilt für eine Basic-Fassung nur, wenn dort derselbe Code läuft (byte-gleich nachgezogen oder
derselbe Bau); weicht sie ab, wird sie eigens gemessen. Ob Workflow PDF Pro dazugehört, ist noch nicht entschieden.

**Ein Kern für alle (Klaus 12.11.):** Die Basic-Fassungen sollen im Kern gleich sein wie der Datei-Organizer – derselbe Sortier-Kern
(`lib/`), einmal gebaut, byte-gleich mit Pin in jedem Knoten, Pro wie Basic; keine zweite Fassung. Das ist das Ziel. Der Weg dorthin
bleibt Regel 8: Ein Knoten übernimmt den Kern erst, wenn er dort am fremden Stapel gesichert besser ist als das Vorhandene.
Klaus dazu (12.11., Nachtrag): Die Basic-Fassungen müssen mit dem Kern **mindestens so weit übereinstimmen, dass eine Verbesserung
dort sichtbar und messbar ist – genau wie bei den Pro-Apps**. Folge: Jede nachgewiesene Verbesserung wird in der Basic-Fassung
nachgezogen und dort am selben Stapel mitgemessen (oder die Byte-Gleichheit mit Pro belegt); ein Bericht nennt Pro und Basic getrennt.
Stand: BookLedger Basic ist byte-gleich mit Pro, trägt aber den Sortier-Kern nicht (Belege: eigene Leser, dort besser gemessen);
Familienakte und Private Brain tragen ihn noch nicht. Dieses Dokument ist die gemeinsame Prüfquelle: Wer eine Erkennung, Zuordnung oder ein gelerntes Modell
in einer dieser Apps verbessert, weist es nach diesen Regeln nach. Die Einzelheiten je Test stehen in
`docs/PRUEFSTAPEL-REGELN.md` (Briefe) und `docs/PRUEFSTAPEL-BLP-REGELN.md` (Belege).

## Die Regeln

1. **Vorab festlegen.** Gegenstand, Felder, Soll-Festlegungen und Auswertung stehen eingecheckt im Repo, bevor der Prüfstapel
   existiert. Was nachträglich geändert wird, steht als Nachtrag mit Datum und Grund dabei.
2. **Fremder Stapel.** Die Prüfunterlagen schreibt ein Agent, der weder die App noch die Lehrdaten noch frühere Stapel kennt.
   Der Stapel wird ungelesen eingecheckt.
3. **Drei unabhängige Einordner**, mindestens einer aus einem anderen KI-System (Briefkasten, siehe Sage-Protokoll
   `docs/ZUSAMMENARBEIT_ANDERES_KI_SYSTEM.md`). Soll = Mehrheit; ohne Mehrheit „strittig“ und getrennt ausgewiesen. Übereinstimmung
   je Paar und Fleiss' Kappa werden berichtet.
4. **Einmal messen**, alter gegen neuen Stand am selben Stapel, jede Zahl mit 95-%-Spanne (Wilson), der Unterschied mit McNemar
   (5 %). „Besser“ heißt gesichert besser. Was nicht gemessen ist, heißt „nicht gemessen“, nie 0 %.
5. **Verbraucht ist verbraucht.** An einem gemessenen Stapel darf danach gelernt werden; als Nachweis taugt er nicht mehr.
6. **Abstimmwerte sind kein Nachweis.** Einstellungen werden nur an verbrauchten Stapeln gewählt und vor dem neuen Stapel eingefroren.
7. **Nichts schönen.** Auch Verschlechterungen, blinde Proben und eigene Fehler stehen im Bericht. Bringt eine Änderung nichts,
   wird sie nicht eingebaut.
8. **Bausteine wandern nur mit Nachweis.** Ein Baustein aus einem Knoten wird in einen anderen nur übernommen, wenn er dort am
   fremden Stapel gesichert besser ist als das Vorhandene – und dann byte-gleich mit Pin, keine zweite Fassung.
9. **Grenze der Aussage.** Solange Prüfstapel von KI-Agenten geschrieben sind, gilt jede Zahl für „erfundene Unterlagen dieser
   Machart“. Für eine Aussage über echte Unterlagen braucht es eine Stichprobe echter Unterlagen, die das Gerät des Nutzers nie
   verlässt; berichtet werden nur Zahlen.
10. **Keine echten Daten in Repos, keine Forschung außerhalb von KimHub.** Stapel und Lehrdaten sind erfunden; Sitzungs-Befunde und
    Stunden stehen in KimHub.

## Die Suche über die Knoten (Klaus 12.11.: „sowohl intern als auch extern muss die Suche valide sein“)

Die Knoten wirken über die Suche zusammen: Wer ein Dokument sucht und nicht weiß, ob es in BookLedgerPro, Private Brain Pro, der
Familienakte oder in den E-Mails liegt, muss es über „Überall suchen“ bzw. das eigene Netz finden. Dafür gilt dasselbe Muster,
mit einem anderen Maß:

11. **Suchprüfstapel:** erfundene Unterlagen, verteilt auf die Knoten (und Mail-Anhänge), dazu Fragen in Alltagssprache, je mit dem
    Dokument, das die Antwort ist. Fragen und Unterlagen schreibt ein Agent, der die Suche nicht kennt; drei Einordner bestätigen
    unabhängig, welches Dokument zur Frage gehört (Fragen ohne Mehrheit zählen nicht).
12. **Gemessen wird je Frage:** steht das richtige Dokument an erster Stelle, unter den ersten drei, oder gar nicht – getrennt für
    Wortsuche und Bedeutungssuche, **intern** (im Knoten, in dem es liegt) und **extern** (von einem anderen Knoten aus über das Netz),
    und ob der richtige Knoten genannt wird. Dazu: wie oft ein falsches Dokument als sicher ausgegeben wird.
13. **Verschiedene Arten zu fragen:** wörtlich, umschrieben, mit Tippfehler, nur mit Datum oder Betrag, mit dem Namen einer Person.
    Jede Art wird getrennt ausgewiesen.
14. Für die Bedeutungssuche zählt nur eine Messung mit dem **echten** Modell der App; eine gestellte Antwort ist kein Nachweis.

## Stand je Knoten (12.11.2026)

| Knoten | Was nach diesen Regeln nachgewiesen ist | Offen |
| --- | --- | --- |
| BookLedgerPro und BookLedger Basic (byte-gleich nachgezogen, Stand Pro `2a3d653`) | Kontoregeln (Stapel 2), Datum und Steuersatz (Stapel 3), Wortmodell (Stapel 4) – je drei Einordner | Kreuztest mit Lehrdaten eines anderen Systems (Auftrag 002), echte Stichprobe; native Pro-Apps erst mit neuer Fassung |
| Datei-Organizer | **Kern `7ac9d4f` an vier fremden Stapeln in allen fünf Feldern gesichert besser als `fe55b5f`** (siehe „Ergebnis“ unten); davor: erster Blindtest Briefe mit **einem** Einordner (Bereich 51–65 %, Absender 54 %); Soll seither von vier Einordnern geprüft, alle fünf Felder tragen: Schriftstück 0,98, Frist 0,93, Person 0,92, Absender 0,91, Bereich 0,90 (Kappa); beim Bereich 24 von 150 nicht einstimmig, keiner ohne Mehrheit. **Berichtigung 12.11.:** zuerst stand hier Bereich 0,80 – der Vergleich hatte die 21 Fächer des Stapel-Autors nicht auf die 18 Fächer der Einordner abgebildet. | Kern liegt weit unter den Einordnern → verbessern (dieser Stapel ist verbraucht), feste Regel für die überschneidenden Fächer, Nachweis an neuem Stapel |
| Familienakte Pro und Basic (ein Repo, derselbe Kern) | Vergleich am selben Briefstapel mit einem Einordner (Bereich 28–36 %, Absender 36 %) | Übernahme des Kerns erst nach Nachweis; Messung mit gefüllter Akte |
| Private Brain Pro und Basic | nichts gemessen; ob Basic denselben Code trägt, ist nicht nachgesehen | Dokumentart-Vorschlag gegen denselben Briefstapel |
| Suche über die Knoten | nichts gemessen (Proben bisher nur mit gestellter Hülle und gestelltem Modell) | Suchprüfstapel nach Regel 11–14, intern und extern |

## Prüfreihe: jede Runde andere Bedingungen (Klaus 13.11.2026)

Klaus: zwischendurch die Prüfungen anpassen – neue Dokumente, neue Familien, neue Vorgänge, andere Standorte, andere
Lebensbedingungen. Daraus wird eine Reihe; jede Runde ist ein neuer Stapel nach den Regeln 1–10, einmal gemessen, danach verbraucht.
Was eine Runde ändert, steht vorab fest; gelernt wird erst nach der Messung.

| Runde | Was anders ist | Wozu |
| --- | --- | --- |
| A | andere Gegend und Verwaltung (anderes Bundesland, Dorf statt Stadt, andere Behördennamen und Kassen) | hängt der Kern an Wörtern einer Gegend? |
| B | andere Lebenslagen (Zuwanderung mit Aufenthaltspapieren, Pflegeheim, Scheidung, Insolvenz, Todesfall, Hausbau, Beamte, Grenzpendler) | seltene Fächer und Behörden |
| C | Vorgänge statt Einzelbriefe: ein erfundenes Jahr mit Ereignisregister (Umzug → Mietvertrag, Ummeldung, Stromwechsel, Kaution …), Vorschlag von Codex | gehören Schriftstücke eines Vorgangs zusammen, stimmt die Frist im Verlauf? |
| D | andere Schreiber: Stapel von Codex-Agenten, Lehrdaten gemischt aus beiden Systemen | Machart des Schreibers (Kreuztest Belege: 79 % eigene, 60 % fremde Machart) |
| E | andere Form: dieselben Stücke als Foto/Scan durch die echte Texterkennung, mehrseitig, zwei Stücke in einem Scan, Mail mit Anlage | Lesefehler statt sauberem Text |
| F | Zeit: Stapel mit Daten aus anderen Jahren, neue Gebührennamen, alte Vordrucke | veralten die Regeln? |
| G | echte Stichprobe: 50–100 eigene Unterlagen auf dem Gerät des Nutzers, nur Zahlen verlassen das Gerät | die einzige Aussage über echte Unterlagen |

Reihenfolge: zuerst der laufende zweite Blindtest Briefe, dann A und B (billig, nur neue Stapel), dann D, C, E; G sobald Klaus es will.
Berichtet wird je Runde und als Verlauf über alle Runden – auch, wenn eine Runde schlechter ausfällt als die davor.

**Runden A und B vergeben (13.11.2026):** je 150 Schriftstücke, sieben Haushalte, Auftrag wie beim zweiten Blindtest Briefe
(`docs/PRUEFSTAPEL-BRIEFE-2-REGELN.md`, Regeln 4–9 gelten entsprechend), Kern eingefroren bei `7ac9d4f`, alter Kern `fe55b5f`.
A: ländliche Haushalte in Bayern, Sachsen und im Saarland mit dortigen Behörden- und Kassenbezeichnungen. B: Lebenslagen
Zuwanderung, Pflegeheim, Scheidung, Privatinsolvenz, Todesfall mit Nachlass, Hausbau, Beamtenhaushalt. Ordner
`pruefstapel-briefe-a/`, `pruefstapel-briefe-b/`. Gemessen wird erst nach dem zweiten Blindtest, je einmal.

**Runde H vergeben (Klaus 13.11.2026: Schwerbehinderung mit hinein):** eigener Stapel `pruefstapel-briefe-h/`, 150 Schriftstücke,
sieben Haushalte, in denen ein Mitglied schwerbehindert oder chronisch krank ist – Hilfsmittel (Rollstuhl, Hörgerät, Umbau),
Gutschriften und Rechnungen von Krankenhäusern, Erstattungen privater und gesetzlicher Kassen, Beihilfe, Schwerbehindertenausweis
und Merkzeichen, Erwerbsminderungsrente, Pflegegrad, Eingliederungshilfe, Nachteilsausgleiche (Kfz-Steuer, Wertmarke, Pauschbetrag).
Bedingungen wie bei A und B; Kern `7ac9d4f` gegen `fe55b5f`, einmal gemessen nach dem zweiten Blindtest.

**Zu Runde C (Klaus 13.11.2026):** Familien verändern sich über die Zeit – eine drei- oder fünfköpfige Familie, zwei Kinder werden
erwachsen und fallen aus dem Kindergeld, ziehen aus, beginnen Ausbildung oder Studium, bekommen eigene Verträge und eigene
Steuernummern. Der Stapel für Runde C umfasst deshalb mehrere Jahre derselben Familien; geprüft wird auch, ob die Person stimmt,
wenn sich die Rolle ändert (Kind → eigener Vertragspartner), und ob ein Schriftstück dem richtigen Haushalt zugeordnet bleibt.
Noch nicht vergeben.

## Ergebnis: zweiter Blindtest Briefe und Runden A, B, H (13.11.2026, je einmal gemessen)

Alter Kern `fe55b5f` gegen neuen Kern `7ac9d4f`, Soll = Mehrheit aus Stapel-Autor, Claude-Agent und Codex (GPT-6). Je Stapel 150
Schriftstücke; Person nur, wo das Soll eine nennt. Alle Unterschiede gesichert (McNemar, p < 0,05; bis auf den Bereich in Runde H
alle p < 0,001). Zahlen: `ergebnisse/briefe-{2,a,b,h}-kern.json`, Übereinstimmung der Einordner: `ergebnisse/briefe-{2,a,b,h}-einordner.json`.

| Feld | Blindtest 2 | A (andere Gegend) | B (Lebenslagen) | H (Schwerbehinderung) |
| --- | --- | --- | --- | --- |
| Bereich | 72,0 → 86,7 % | 56,7 → 80,7 % | 61,3 → 76,0 % | 67,3 → 76,7 % |
| Schriftstück | 64,0 → 82,7 % | 54,7 → 81,3 % | 53,3 → 80,7 % | 48,0 → 72,7 % |
| Absender | 72,0 → 95,3 % | 66,7 → 93,3 % | 74,0 → 94,0 % | 71,3 → 92,7 % |
| Person | 60,9 → 92,2 % | 62,3 → 90,4 % | 53,8 → 72,3 % | 66,9 → 88,7 % |
| Frist | 50,0 → 91,3 % | 61,3 → 88,7 % | 58,0 → 90,7 % | 62,0 → 98,7 % |

„Falsch und als sicher ausgegeben“ (alt → neu, je 150): Bereich 15→10, 22→14, 15→13, 17→19; Schriftstück 18→11, 17→16, 23→11, 27→24;
Absender 31→1, 37→5, 33→5, 33→6; Frist 56→2, 41→4, 43→7, 35→1.

Einigkeit der drei Einordner (Fleiss' Kappa): Bereich 0,94–0,99, Schriftstück 0,94–0,98, Absender 0,97–0,99, Person 0,90–0,98,
Frist 0,84–0,91; höchstens ein Schriftstück je Feld ohne Mehrheit.

Was die Zahlen nicht zeigen: echte Unterlagen (nicht gemessen), Fotos und Texterkennung (nur Text), Schreiber eines anderen
Systems (Runde D steht aus). Schwächen: Bereich und Schriftstück bei besonderen Lebenslagen und Schwerbehinderung (73–77 %), Person
bei Lebenslagen (72 %); beim Bereich in Runde H ist „falsch und sicher“ nicht gesunken. Die vier Stapel sind damit verbraucht.

## Nachtrag 13.11.2026 abends: dritter Einordner verändert zwei Urteile

Mit Codex als drittem Einordner (Aufträge 011, 012) wurden „Familie mit drei Kindern“ und „Vermieter 2“ neu gegen das Mehrheits-Soll
gerechnet (`ergebnisse/*-drei.json`). Zwei Urteile kippten: Bereich der Familienakte nicht mehr gesichert (77 → 83 %, p = 0,06), Rechnungsnummer
BookLedgerPro jetzt unter der Grenze (2 % falsch statt vorläufig 5,6 %). Lehre: **vorläufige Zahlen mit zwei Einordnern nicht ausgeben** – erst
mit dem dritten entscheiden. Ausgaben danach siehe `docs/BRIEF_ABSCHLUSS_2026-11-13_PUNKTE-3-9.md`.

## Trainings-Wochenende 14.11.2026: Runden C, D, E, F und ein ungesehener Rest

Ohne Codex (Klaus 14.11.): je Runde drei unabhängige Claude-Einordner (zwei Sonnet, ein Opus), Soll = Mehrheit, Autor nur bei drei
verschiedenen Urteilen; Abweichung von Regel 3 („mindestens einer aus einem anderen KI-System“) mit Klaus' Wort. Kern `05c7ef0` gegen
0.2.0 (`534cc08`): C Bereich gesichert besser (85,3 %), E gesetzt nichts gesichert, D Schriftstück gesichert schlechter (77,3 %), F kein
Unterschied. Nach dem Lernen (Block 5) am ungesehenen Rest: Absender aus Scans/Fotos 34,1 → 42,7 % – **berichtigt: Kreisschluss** (Spuren des eigenen Setzers), Regeln zurückgenommen (`docs/PRUEFBERICHT-EHRLICHKEIT-2026-11-14.md`). Neue Lehre zu Regel 2: Bei gesetzten Stapeln gilt „fremd“ auch für den Setzer; Mehrfachtests werden ab jetzt korrigiert oder ein Hauptfeld vorab benannt.
Einzelheiten und Rollen: `docs/TRAINING-WOCHENENDE-ERGEBNISSE.md`. Offen: G (echte Stichprobe über die Maske).
