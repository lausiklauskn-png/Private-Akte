# Unabhängiger Prüfstapel – Regeln, vorab festgelegt (12.11.2026)

Festgelegt und eingecheckt, **bevor** der Stapel fertig ist und bevor einmal gemessen wurde (Klaus 12.11.: ehrliche Tests, nichts
anpassen, damit das Ergebnis schöner aussieht).

1. **Wer schreibt:** ein Hilfs-Agent ohne Zugang zum Kern (`lib/`), zu den Generatoren (`scripts/`) und zu allen bisherigen
   Testdaten. Er schreibt 150 erfundene Briefe in eigenen Worten und legt die Soll-Werte selbst fest, wie ein sorgfältiger Mensch
   ablegen würde. Ordner `pruefstapel-unabhaengig/`.
2. **Gemessen wird genau einmal** mit dem Kern in dem Stand, der zum Zeitpunkt dieser Festlegung eingecheckt ist, und mit
   `scripts/messen.mjs` (gleiche Felder wie im Großlauf: Dokumentart, Bereich, Absender, Person, Frist; Familienakte daneben).
3. **Vor dieser Messung** wird am Kern nichts geändert und kein Brief des Stapels gelesen. Soll-Werte werden **nicht** geändert,
   auch wenn sie mir falsch vorkommen; Einwände stehen getrennt im Bericht, die Zahl bleibt die gemessene.
4. **Berichtet wird die Zahl, wie sie kommt** – in der Übersicht neben den Werten des eigenen Generators, mit dem Hinweis, dass
   nur dieser Stapel „ungesehen“ im strengen Sinn ist.
5. **Danach** darf der Kern an Fehlern dieses Stapels lernen. Dann ist der Stapel verbraucht: eine spätere Messung daran zählt nur
   noch als Trainingswert. Für einen neuen Blindtest braucht es einen neuen Stapel.
6. Zum Absender: verglichen wird ohne Groß-/Kleinschreibung und Satzzeichen, sonst genau. Zur Person: nur, wo der Agent eine
   Person angibt; die Angaben eines Start-Assistenten kommen aus seiner `HAUSHALTE.json`.
