# Zweiter Blindtest Briefe – Regeln, vorab festgelegt (13.11.2026)

Eingecheckt, bevor der Kern geändert wird und bevor es Lehrdaten oder einen neuen Prüfstapel gibt. Es gelten die Gruppenregeln
(`docs/PRUEFREGELN-GRUPPE.md`) und die Fachregel (`docs/FACHREGEL.md`).

1. **Frage:** Ist der verbesserte Sortier-Kern an fremden Briefen gesichert besser als der Kern im Stand `fe55b5f` (heute)?
   Felder: Bereich, Schriftstück, Absender, Person, Frist. Beim Bereich zählt als richtig nur das **Fach** des Solls; daneben wird
   berichtet, wie oft Fach oder Zweitfach des Solls getroffen ist.
2. **Lernen** darf der Kern an: `pruefstapel-unabhaengig/` (verbraucht), den eigenen Generator-Daten und neuen Lehrdaten
   (`lehrdaten-briefe/`), die Agenten ohne Einblick in Kern und Prüfstapel schreiben. Lehrdaten folgen der Fachregel.
3. **Einfrieren:** Der Stand des Kerns wird mit Commit-Kennung festgehalten, **bevor** der neue Prüfstapel geschrieben wird.
4. **Neuer Stapel** `pruefstapel-briefe-2/`: 150 erfundene Schriftstücke neuer Haushalte, von einem Agenten ohne Zugang zu Kern,
   Lehrdaten und früheren Stapeln; er kennt die 18 Fächer, die Liste der Schriftstück-Arten und die Fachregel. Ungelesen eingecheckt.
5. **Drei Einordner:** Stapel-Autor, ein zweiter Claude-Agent, Codex über den Briefkasten. Soll = Mehrheit je Feld; ohne Mehrheit
   strittig und nicht gewertet. Übereinstimmung je Paar und Fleiss' Kappa werden berichtet.
6. **Einmal messen**, alter gegen neuen Kern am selben Stapel, je Feld mit 95-%-Spanne (Wilson) und McNemar (5 %). Dazu je Feld:
   wie oft der Kern etwas Falsches als sicher ausgibt und wie oft er offen lässt.
7. **Vergleich wie bisher:** Absender ohne Groß-/Kleinschreibung, Satzzeichen und Rechtsform; Person nur, wo das Soll eine nennt;
   Frist als Datum oder leer.
8. **Übernahme:** Nur ein gesichert besserer Kern wandert in die Familienakte (Regel 8 der Gruppe). Ist er nicht besser, steht das
   so im Bericht, und er wandert nicht.
9. **Grenze:** Lehrdaten und Prüfstapel stammen von KI-Agenten; die Zahl gilt für erfundene Schriftstücke dieser Machart, als Text
   (keine Fotos, keine Texterkennung).

**Eingefroren (13.11.2026):** neuer Kern = Commit `7ac9d4f`, alter Kern = `fe55b5f`. Erst danach wurde der Auftrag für den neuen
Stapel vergeben. Der Stapel-Autor bekommt nur Fachregel, Fächerliste, Liste der Arten und den Auftrag („Mischung wie im echten
Papierkram eines Jahres“, sieben Haushalte); keine Lehrdaten, keinen Kern, keine früheren Stapel.
