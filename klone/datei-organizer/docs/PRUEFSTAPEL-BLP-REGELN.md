# Blindtest BookLedgerPro – Regeln, vorab festgelegt (12.11.2026)

Festgelegt und eingecheckt, bevor der Stapel geschrieben und bevor gemessen wird. Grundlage: die Prüfung der Vorgehensweise vom
12.11. (Fehlerspannen, zweiter Einordner, eindeutige Listen, einmal messen).

1. **Gegenstand:** BookLedgerPro, Stand `a705ed5` (main zum Zeitpunkt dieser Festlegung). Gemessen werden die reinen Bausteine
   `src/ai/extract.js` (`extractFromText`: Betrag brutto, Datum, USt-Satz) und `src/ai/categorize.js` (`categorize`: Konto,
   Richtung Einnahme/Ausgabe). Nichts daran wird vor der Messung geändert.
2. **Stapel:** Ein Hilfs-Agent ohne Zugang zu BookLedgerPro, zum Datei-Organizer und zu allen bisherigen Testdaten schreibt
   120 erfundene Belege eines kleinen Betriebs als Text (wie nach Texterkennung): Kassenbons, Tankquittungen, Lieferanten- und
   Ausgangsrechnungen, Abrechnungen von Kartenterminal und Bank, Miete, Versicherung, Beiträge, Telefon, Porto, Bewirtung,
   Reisekosten, Fortbildung, Beratung. Die Kontenliste bekommt er als JSON-Liste (keine Kommas im Fließtext). Ordner
   `pruefstapel-blp/`.
3. **Zweiter Einordner:** Ein zweiter Hilfs-Agent ordnet dieselben 120 Belege unabhängig einem Konto zu, ohne die Soll-Werte des
   ersten zu sehen. Die Übereinstimmung beider (Anteil gleich und Cohens Kappa) zeigt, wie viel Treffer überhaupt erreichbar ist.
   Soll-Wert für die Messung ist der des ersten Agenten; Belege, bei denen beide uneins sind, werden zusätzlich getrennt ausgewiesen.
4. **Einmal messen**, Zahlen wie gemessen, mit 95-%-Fehlerspanne (Wilson). Felder: Betrag brutto (auf den Cent), Datum, USt-Satz,
   Richtung, Konto. Außerdem eine Verwechslungstabelle der Konten.
5. **Nicht gemessene Felder heißen „nicht gemessen“, nie 0 %.** Ein Beleg ohne Soll-Wert für ein Feld zählt bei diesem Feld nicht mit.
6. **Danach** dürfen die Regeln von BookLedgerPro an den Fehlern lernen (eigener Zweig, Entwurfs-PR dort, vorhandene Proben grün).
   Der Stapel ist dann verbraucht; für einen neuen Blindtest braucht es einen neuen Stapel.

## Ergänzung, festgelegt vor dem ersten Beleg (12.11.2026, Klaus: „Kern übernehmen, wenn nachweislich besser“)

7. **Datei-Organizer-Kern als zweite Spalte:** Am selben Stapel wird der Kern (Stand Commit `85526fe`, `lib/` unverändert seit
   `44a88c1`) gemessen: Betrag (`erkenneBetrag`), Datum (`erkenneDatum`), Aussteller (`erkenneAbsender`/Grußformel, nach
   `absenderVereinheitlichen`). Vergleich je Feld mit BookLedgerPro, beide mit Fehlerspanne; dazu McNemar-Test auf den Belegen,
   bei denen beide einen Wert liefern. „Besser“ gilt nur, wenn der Unterschied bei 5 % Irrtum gesichert ist.
8. **Kein Gewinner wird nachträglich gewählt:** Feld für Feld zählt die gemessene Zahl, auch wenn sie gegen den Kern ausfällt.
9. **Verbesserungen am Kern** (aus dem ersten Blindtest des Datei-Organizers) gelten erst als nachgewiesen, wenn alter und neuer
   Kern an einem **neuen**, von einem anderen Agenten geschriebenen Stapel je einmal gemessen sind (McNemar, 5 %).

## Zweiter Blindtest (Nachweis des Trainings), festgelegt vor Stapel und Training (12.11.2026)

10. Ein weiterer Hilfs-Agent ohne Einblick schreibt 120 neue Belege eines **anderen** Betriebs (anderes Gewerbe, andere Lieferanten)
    nach `pruefstapel-blp-2/`, gleiche Felder, gleiche Kontenliste als JSON.
11. Gemessen wird je einmal: BookLedgerPro **alt** (`a705ed5`) und **neu** (Zweig mit den trainierten Regeln) am selben Stapel.
    Felder Konto und Richtung, je mit Wilson-Spanne; Unterschied mit McNemar (5 %). Die übrigen Felder werden mit berichtet.
12. Das Training nutzt nur den ersten Stapel (`pruefstapel-blp/`, verbraucht). Der zweite Stapel wird vor der Messung nicht gelesen;
    nach der Messung wird an ihm nichts mehr nachgebessert, bevor die Zahl berichtet ist.
13. **Eigener Firmenname (festgelegt vor der Messung des zweiten Stapels, ohne ihn gelesen zu haben):** Die neue Fassung kann den
    Namen aus dem Firmenprofil nutzen (steht er im Briefkopf, ist es eine Ausgangsrechnung). Sie wird deshalb zweimal gemessen:
    **ohne** Namen (wie ein leeres Firmenprofil) und **mit** dem Betriebsnamen des Stapels (Aufruf `--eigen "<Name>"`; der Name
    kommt aus der Rückmeldung des Hilfs-Agenten bzw. dem Feld `betrieb` der ERWARTUNG.json, nicht aus den Belegen). Beide Zahlen
    werden berichtet; der Vergleich alt ⟷ neu (McNemar) gilt für beide Spalten getrennt. Die alte Fassung kennt den Namen nicht.

## Dritter, fremder Einordner (festgelegt 12.11.2026, bevor es ihn gibt; Klaus: „Agent aus einer anderen KI“)

14. Eine **andere KI** (nicht Claude; von Klaus beauftragt) ordnet die 120 Belege des zweiten Stapels unabhängig ein. Sie bekommt nur
    `pruefstapel-blp-2-ohne-loesung.txt` (alle Belege, ohne Soll-Werte) und `pruefstapel-blp-2-kontenliste.json`, keine Regeln von
    BookLedgerPro, keine Messergebnisse, keine ERWARTUNG.json. Ihr Ergebnis kommt als `pruefstapel-blp-2/DRITTER.json`.
15. Dazu ein zweiter Claude-Agent ohne Einblick (`ZWEITER.json`). Berichtet werden: Übereinstimmung je Paar, Fleiss' Kappa über
    alle drei, Mehrheits-Soll (mindestens zwei gleich), Belege ohne Mehrheit als „strittig“ getrennt.
16. Die schon berichteten Zahlen (Soll = erster Agent) bleiben stehen; die Zahlen mit Mehrheits-Soll kommen daneben, für alt und neu.
    An BookLedgerPro wird zwischen beiden Auswertungen nichts geändert (Stand `a443d87`).
17. Alternativ oder zusätzlich darf die andere KI einen **Bauplan für einen Einordner** liefern (Vorgehen, Reihenfolge der Prüfungen,
    Zweifelsregeln), den ein Claude-Agent ausführt. Das zählt als anderes Verfahren, nicht als anderes Modell, und wird so benannt.

## Dritter Blindtest: Datum und Steuersatz (festgelegt 12.11.2026, vor Stapel und Training; Klaus: „dann Datum und Steuersatz trainieren“)

18. **Gegenstand:** `src/ai/extract.js` (`extractFromText`: `datum`, `ustSatz`, dazu `betragBrutto`). Alt = BookLedgerPro main
    `942e781` (nach #465, `extract.js` unverändert seit `a705ed5`), neu = Zweig mit dem trainierten Belegleser.
19. **Training** nutzt nur die beiden verbrauchten Stapel (`pruefstapel-blp/`, `pruefstapel-blp-2/`).
20. **Neuer Stapel `pruefstapel-blp-3/`:** 120 Belege eines dritten, anderen Betriebs, von einem Hilfs-Agenten ohne Einblick. Soll-Felder
    wie bisher. Festlegungen für die Soll-Werte (dem Agenten vorgegeben, damit sie nicht nachträglich gedeutet werden):
    `datum` = Belegdatum (Rechnungs-/Bon-/Abrechnungsdatum), nicht Liefer-, Leistungs- oder Fälligkeitsdatum;
    `ust` = 19 oder 7 (bei gemischten Belegen der Satz mit dem größeren Betrag), 0 wenn der Beleg ausdrücklich steuerfrei/nicht
    steuerbar ist oder keine Umsatzsteuer ausweist, null wo ein Steuersatz keinen Sinn hat (Lohnabrechnung, Privatentnahme/-einlage,
    Eigenbeleg ohne Rechnung); `betrag` = zu zahlender Bruttobetrag des Belegs.
21. **Drei Einordner:** der Stapel-Autor, ein zweiter Claude-Agent und die fremde KI (Codex) bestimmen Datum, Steuersatz und Betrag
    unabhängig nach derselben Festlegung. Soll = Mehrheit; Belege ohne Mehrheit „strittig“, getrennt ausgewiesen. Fehlt die fremde KI,
    wird das benannt und mit zwei Einordnern berichtet (dann zählt nur, wo beide gleich sind).
22. **Je einmal messen** (alt, neu), Wilson-Spanne, McNemar je Feld. Der Betrag darf durch das Training nicht schlechter werden;
    wird er es, steht das im Bericht. Der Stapel wird vor der Messung nicht gelesen.

## Vierter Blindtest: Kontovorschlag mit Lehrer (festgelegt 12.11.2026, vor Lehrdaten, Bau und Stapel; Klaus: „Schritt 3“)

23. **Ziel:** Der Kontovorschlag ohne KI in BookLedgerPro (`src/ai/categorize.js`, Stand main `1887e25`: 55,8–73,1 % je nach Stapel
    und Firmennamen) soll durch einen kleinen, auf dem Gerät rechnenden Klassifikator besser werden, der aus **Lehrdaten** lernt.
    Lehrer ist Claude: Hilfs-Agenten schreiben erfundene Belege samt Konto. In der App läuft danach **kein** Sprachmodell und es
    verlässt kein Beleg das Gerät (BookLedgerPro Regel 8 bleibt: KI nur Mistral EU, opt-in).
24. **Lehrdaten:** acht Hilfs-Agenten, je ein anderes Gewerbe, je rund 200 Belege mit Konto, Richtung, Betrieb; Ordner `lehrdaten-blp/`.
    Kein Agent sieht die Prüfstapel, BookLedgerPro oder die anderen Lehrdaten.
25. **Abstimmen (Validierung):** Wie Klassifikator und Regeln zusammenwirken, wird nur an den drei verbrauchten Stapeln
    (`pruefstapel-blp`, `-2`, `-3`, je Mehrheits- bzw. Autor-Soll) entschieden. Diese Zahlen sind Abstimmwerte, kein Nachweis.
26. **Neuer Stapel `pruefstapel-blp-4/`:** 120 Belege eines Gewerbes, das weder in den Lehrdaten noch in den Stapeln 1–3 vorkommt,
    geschrieben von einem Agenten ohne Einblick, erst **nach** dem Einfrieren des neuen Stands. Drei Einordner (Autor, zweiter
    Claude-Agent, Codex über den Briefkasten); Soll = Mehrheit; strittige Belege getrennt.
27. **Je einmal messen:** alt (`1887e25`) gegen neu, je ohne und mit Firmennamen; Wilson, McNemar (5 %). Berichtet wird auch, wenn
    der Klassifikator nichts bringt oder schadet; dann wird er nicht eingebaut.
28. **Bekannte Schwäche, vorab benannt:** Lehrdaten und Prüfstapel stammen beide von Claude-Agenten. Ein Gewinn am vierten Stapel
    zeigt, dass der Klassifikator auf **fremde Gewerbe derselben Machart** überträgt, nicht auf echte Belege. Das steht im Bericht.
29. **Abstimmung abgeschlossen (12.11., vor dem vierten Stapel):** Modell aus allen acht Gewerben (1600 Belege), Merkmale nur wenn in
    mindestens 2 Gewerben, je Konto höchstens 400, sparsam abgelegt (294 KB). Zusammenspiel (`scripts/lehrer-kombination.mjs`):
    Briefkopf entscheidet die Richtung, wenn ein Firmenname hinterlegt ist; sonst gilt das Modell ab Abstand 2, darunter die Regeln,
    außer sie kennen nur das Sammelkonto. Abstimmwerte an den verbrauchten Stapeln 2 und 3 (239 Belege): Regeln 139 ohne / 166 mit
    Firmennamen, Modell allein 184, Zusammenspiel 187 ohne / 199 mit. Stapel 1: Regeln 94/111, Zusammenspiel 89/104 von 120 – dort
    schlechter als die Regeln, an denen sie ausgerichtet wurden. Diese Einstellungen werden nicht mehr geändert.
29a. **Nachtrag vor dem vierten Stapel (12.11.):** Eine Probe in BookLedgerPro zeigte, dass das Modell bei „Regeln kennen nur das
    Sammelkonto“ schon aus einem einzigen schwachen Wort einen Vorschlag machte („Zettel ohne Inhalt“ → Erlöse, wegen „ohne“).
    Darum gilt in diesem Fall jetzt ein Mindestabstand von 1 (statt 0). Abstimmwerte Stapel 2+3 damit: 186 ohne / 198 mit
    Firmennamen (vorher 187 / 199) – ein Beleg weniger richtig, dafür kein Vorschlag aus einem Zufallswort. Der vierte Stapel war
    zu diesem Zeitpunkt noch nicht geschrieben.
