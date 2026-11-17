# Recherche: rekursive Verbesserung des Sortier-Kerns (15.11.2026)

Auftrag: `docs/BRIEF_SITZUNG_2026-11-15_REKURSIVE-VERBESSERUNG.md`. Sechs Recherche-Agenten mit Internet (je ein Thema), ein
Agent für die Zusammenfassung, ein Agent, der die Belege gegenprüft. arxiv.org, aclanthology.org und proceedings.mlr.press waren
für die Agenten gesperrt; geprüft wurde über Suchauszüge und Abstracts, **nicht am Volltext**. Zahlen „bis zu“ sind Höchstwerte
aus anderen Aufgaben, keine Erwartung für uns.

## Was die Quellen tragen (nach der Gegenprüfung)

| Methode | Beleg | Für uns |
| --- | --- | --- |
| **Fehlergetriebenes Regel-Lernen (Brill, TBL)**: Kern rät, Korrektur liegt vor, gierig die eine Regel mit dem größten Nettogewinn | Methode stark; Zahlen nur Sekundärquelle (Wortarten, 97,2 % mit 447 Regeln, Sättigung früh). Schablonen entscheiden mehr als die Schleife | genau das Muster „raten – Korrektur – lernen“; Gefahr Überanpassung bei kleinen Mengen → Mindestgewinn, Bestätigung an zweiter Welt |
| **Soll prüfen** (Confident Learning, Northcutt 2021: ≥ 3,3 % Fehler in Testsätzen; Larson 2023: 8,1 % in RVL-CDIP) | stark | Rauschen im Soll ist so groß wie unsere Effekte. Gegenprüfung: Ranglisten kippen erst bei künstlich erhöhtem Rauschen, nicht schon bei 3,3 % |
| **Ehrliches Messprotokoll**: Holdout nur einmal, Ladder/Thresholdout für Zwischenblicke, gepaarter Test, Cluster-Bootstrap, Teststärke vorab, Leckage-Liste | stark (Dwork 2015, Dietterich 1998, Kapoor/Narayanan 2023: Leckage in ≥ 294 Arbeiten) | haben wir weitgehend; neu: Cluster (Absender, Haushalt) statt Einzelbrief; feste 2-Punkte-Schwelle ist bei 200 Briefen so groß wie der Standardfehler → aus Teststärke ableiten |
| **Getrennte Welten**: synthetisch lernen, in fremder Welt nachweisen (TSTR) | mittel; Zahlen aus Bild- bzw. Ergänzungs-Studien, nicht direkt übertragbar | bestätigt unsere Kreisschluss-Lehre; eine Stadt nur als **eine weitere** Welt, klein anfangen |
| **Absender-Archiv** (Gazetteer) mit unscharfem Abgleich, Lernen aus Korrekturen (CloudScan: 0,887 F1 bekannte, 0,788 unbekannte Layouts) | mittel | großer, aber „trivialer“ Gewinn bei bekannten Absendern (Gedächtnis); bei neuen wenig. Gibt es in der App teils schon (`lib/lernen.ts`) |
| Naive Bayes verbessern (Complement NB, NBSVM, logistische Regression auf denselben Merkmalen) | mittel | stärkere einfache Grundlinie als Gegenprobe zur Schleife |
| Schwache Aufsicht (Snorkel): Regeln als Abstimmer mit geschätzter Treffsicherheit | mittel (im Mittel 3,6 % unter Handetiketten) | statt fester Vorrang gewichtete Regeln |
| Aktives Lernen (Unsicherheits-Auswahl) | mittel; „bis zu 500-fach“ nur bei seltener Klasse; Lowell 2019: Vorteil überträgt sich nicht verlässlich | spart Einordner-Läufe, macht den Kern nicht genauer; nie für Messmengen |
| Kalibrierung, ehrliche Enthaltung („bitte prüfen“) | schwach für uns | weniger sichere Fehler statt mehr Treffer |
| Zeichen-n-Gramme, OCR-Normalisierung | schwach | für Fotos/Scans später |
| Self-Training (Modell lernt aus eigenen Urteilen) | Gefahr belegt (Bestätigungsverzerrung, Arazo 2019) | **nicht** tun |
| Curriculum „einfach nach schwer“ | schwach (Wu 2021: Reihenfolge fast gleichgültig) | für Zählmodell und Regelliste kaum Wirkung. Der Wunsch „einfach anfangen“ wird stattdessen über **Verhaltenstests** umgesetzt |
| Verhaltenstests mit Minimaländerungen (CheckList, Ribeiro 2020; Kontrastsätze) | mittel | „Fehler bewusst einbauen“: kleine gezielte Fälle, je Regel als Wächter |
| Negative Flips als Wächter (Yan 2021) | mittel | vorher richtig, nachher falsch – eigene Zahl, wichtig für die Familienakte |

Öffentliche Vorlagen: amtliche Werke (§ 5 UrhG) und offene Testsuiten (KoSIT XRechnung, Apache-2.0) taugen als Aufbau; Musterbriefe
der Verbraucherzentralen ohne geklärte Lizenz nur als Merkmalsliste; ZUGFeRD-Corpus **nicht** (enthält nach eigener Beschreibung echte
Rechnungen). Nichts davon wörtlich ins Repo.

## Was daraus für diese Runde folgt (in `docs/PRUEFSTAPEL-REKURSIV-REGELN.md` festgelegt)

1. Lernen nur an verbrauchten Stapeln und einer **Lernstadt**; Nachweis einmal an einer **Prüfstadt** anderer Agenten mit drei
   Einordnern. Bootstrap über Absender. Eine Hauptkennzahl.
2. Schleife = TBL und stärkere Grundlinie, reihum gewählt; negative Flips werden mitgezählt.
3. **Gegenprobe der Methode**: das bisherige Vorgehen (Wortmodell neu abstimmen) mit denselben Daten muss ebenfalls geschlagen werden.
4. Placebo-Gegenprobe: Schleife mit vertauschten Korrekturen darf nichts gewinnen.
5. Nicht gemacht (Grenzen dieser Runde): kein Nicht-Claude-Einordner (Codex gesperrt), keine Scans, keine echte Stichprobe am Gerät
   (wäre die stärkste Welt, nur mit Klaus' Ja).

Rohdaten der Agenten liegen nicht im Repo (Arbeitsordner der Sitzung).
