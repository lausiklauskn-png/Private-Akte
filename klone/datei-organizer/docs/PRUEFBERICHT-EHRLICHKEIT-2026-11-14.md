# Prüfbericht: Ehrlichkeit der Trainings-Sitzung (14.11.2026, 12 Uhr)

Klaus 14.11.: „Überprüfe noch einmal die Art und Weise, wie du prüfst, ob es den Prüfrichtlinien … vor allen Dingen Ehrlichkeit entspricht.“
Geprüft hat ein **unabhängiger Claude-Agent** (Opus, nur lesend, ohne meine Schlüsse als Vorgabe) gegen `docs/PRUEFREGELN-GRUPPE.md`
(Regeln 1–10) und `docs/PRUEFSTAPEL-TRAINING-WOCHENENDE-REGELN.md`. Er hat die Zahlen aus dem Zwischenspeicher Stück für Stück nachgerechnet
und alle Werkzeugaufrufe der Autoren und Einordner durchgesehen. Unten seine Befunde, knapp, mit dem, was ich daraufhin geändert habe.

## In Ordnung (nachgeprüft)

Regeln vorab eingecheckt; Kerne eingefroren und byte-gleich mit den genannten Commits; `lib/` bis Block 5 unverändert; alle Zahlen in den
Berichten passen zu den JSON-Dateien; Wilson und McNemar richtig gerechnet; Verschlechterungen genannt (Runde D); Wortmodell nicht übernommen;
**kein Autor und kein Einordner hat Repo, Kern, Lösungen oder Urteile anderer Einordner gelesen**; „nirgends schlechter an den verbrauchten
Stapeln“ stimmt.

## Befunde und was daraus folgt

| Nr. | Schwere | Befund | Folge (umgesetzt 14.11.) |
|---|---|---|---|
| 1 | **hoch** | **Kreisschluss beim einzigen Nachweis.** Der Setzer zeichnet Logos aus den Anfangsbuchstaben des Namens und gibt Bildschirmfotos eine Leiste „Posteingang/Postfach/…“ mit Uhrzeit. Die neuen Absender-Regeln entfernen genau das. Von den 18 Gewinnen am Rest (Absender gesetzt 34,1 → 42,7 %) sind **16 Spuren des eigenen Setzers** (Logo-Kürzel davor/dahinter, App-Leiste), 2 anderes. Als Text: kein Unterschied. | Aussage „gesichert besser“ **zurückgenommen**; die Absender-Regeln sind **wieder aus dem Kern** (Regel 7). Neuer Nachweis nur mit einem unabhängig gebauten Setzer (andere Logo-Machart) oder echten Unterlagen (Runde G). |
| 2 | **hoch** | **Kreisschluss bei der Vorverarbeitung (Teil 2).** Der Setzer schädigt mit multiplikativem Schatten, gesenktem Kontrast und Flecken; die gewählte Vorverarbeitung (Hintergrund herausteilen, Kontrast strecken) ist mathematisch die Umkehrung. Gewählt und gemessen an denselben 537 Stücken; Bildschirmfotos nicht gemessen; nur Wörter, keine Felder. | Zahlen im Code und gegenüber Klaus eingeschränkt („an selbst erzeugten Schäden“). **Nicht in den Hauptzweig**, bis an unabhängig erzeugten Schäden (anderer Agent, eigener Alterungs-Code) und mit Feldern gemessen. |
| 3 | mittel–hoch | An Runde D gelernte Portal-/Vordruck-Regeln bringen am ungesehenen Rest nichts (Vordruck 16 → 16, Portal 11 → 10, App-Bon 3 → 2); trotzdem übernommen, während „Brief statt unklar“ mit derselben Begründung herausgenommen wurde. Zwischensumme nur am eigenen Generator gemessen, „PDF ohne Text“ gar nicht. | Portal-Regeln mit Befund 1 entfernt. Zwischensumme und „PDF ohne Text“ bleiben als **Fehlerbehebung, ausdrücklich ohne Nachweis am fremden Stapel**. |
| 4 | mittel | Der Rest-Stapel wurde 22 s nach dem Einfrieren mit einem Auftrag vergeben, der genau die neuen Fälle verlangte (Haushalt mit „Neue Nachricht“, GROSSBUCHSTABEN-Köpfe, lange Bons). Die Regel nannte nur „Mischung C/E/D/F“. | Offengelegt. Künftig wird die Zusammensetzung des Nachweisstapels **vor dem Lernen** eingecheckt. |
| 5 | mittel | 10 Tests je Runde, „gesichert“ je Feld bei p < 0,05 ohne Korrektur; Stücke nicht unabhängig (gleiche Absender, ein Autor). Mit Bonferroni (0,005) hielte nur der (kreisförmige) Rest-Absender; C-Bereich (0,019), E-Text-Bereich (0,021), D-Schriftstück schlechter (0,016/0,008) nicht. | In den Ergebnissen neben jedes „gesichert“ geschrieben. Künftig je Runde ein **Hauptfeld vorab** oder Holm-Bonferroni. |
| 6 | mittel | Nach der Messung am Rest wurde „Brief statt unklar“ herausgenommen und neu gemessen – Auswahl am Nachweisstapel; „Endstand 78,5 %“ ohne JSON. | Benannt. Mit Befund 1 ist der Kern jetzt ohnehin ohne die Block-5-Regeln. |
| 7 | mittel | „Absender scheitert am Einordnen, nicht am Lesen“ (Runde E) beruht zum Teil auf Setzer-Spuren. | Als Befund über die eigene Prüfmachart umformuliert. |
| 8 | gering–mittel | Rollen ungenau: **alle sechs** Autoren schrieben mit Python-Generatoren (nicht nur zwei); die zwei C-Autoren teilten einen Arbeitsordner, einer überschrieb eine Datei des anderen; die Einordner-Hälften teilten Hilfsdateien und sahen per `ls` die Ergebnisdateien der anderen (keiner hat sie gelesen). 35 Agenten mit dem Fehlstart, nicht 34. | Rollen berichtigt. Künftig je Agent ein eigener Ordner, Ergebnisse außerhalb des gemeinsamen Pakets. |
| 9 | gering | Runde F: Regel „Frist nur, wo das Soll eine nennt“ nicht eingehalten. Nach Regel (n = 64): neu 93,8 %, alt 95,3 %. | Zahl berichtigt. |
| 10 | gering | Block 1 „IndexedDB“ ist in Node mit `structuredClone` nachgebildet, nicht im Browser gemessen. | „nachgebildet, Node“ dazugeschrieben. |
| 11 | gering | Nachträge einzeln nicht eingecheckt (erst im Squash); C-Stapel nicht getrennt ungelesen eingecheckt; Kappa D mit 10 nicht zugeordneten Namen; „Vorgang“/„Rollenwechsel“ nur vom Autor; Einordner untereinander viel einiger als mit dem Autor (gemeinsame Claude-Neigung ohne zweites KI-System). | Offengelegt. |

## Was das für das Wochenende heißt

Die Messwerkzeuge, die Stapel und das Tempo (Block 1) stehen. **Eine nachgewiesene Verbesserung der Einordnung gibt es aus diesem Wochenende
nicht**: was am ungesehenen Stapel besser aussah, war die eigene Machart. Ehrlich bleibt: Runde C Bereich 0.4.3 besser als 0.2.0 (p = 0,019,
ohne Mehrfachkorrektur), Runde D Schriftstück 0.4.3 schlechter als 0.2.0 (p = 0,016), F kein Unterschied – Aussagen über den alten Kern
0.4.3 gegen 0.2.0, nicht über dieses Training.
