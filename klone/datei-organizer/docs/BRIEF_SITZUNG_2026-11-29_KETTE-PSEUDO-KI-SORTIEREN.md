# Brief: Kette „Pseudonymisiert mit großer KI sortieren“ über alle Apps (Stand 28.11.2026)

Klaus 28.11.2026: *„Lies docs/BRIEF_SITZUNG_2026-11-29_KETTE-PSEUDO-KI-SORTIEREN.md und arbeite die Schritte 1 bis 7 nacheinander ab.“*
Freibrief: keine Rückfragen, keine Vorschauen, Fragen aus den Briefen selbst beantworten, Design aus der Wirts-App. Je Schritt frisch
von `origin/main`, Proben grün, selbst mergen, auf main nachsehen, eine Zeile unter „Stand“. Nichts veröffentlichen ohne Klaus' Wort.

⚠ Diese Datei lag zu Beginn der Sitzung in keinem Repo. Sie wurde aus den drei Briefen vom 28.11. zusammengesetzt:
Datei-Organizer `docs/BRIEF_SITZUNG_2026-11-29_SORTIEREN-MIT-GROSSER-KI.md` (S0a–S4), PseudoDoc (Teilauftrag, gleicher Name),
Familienakte `docs/BRIEF_SITZUNG_2026-11-29_KI-SORTIEREN-EINGANG.md` (F0–F4). Die Vorschau-Stufen S0/F0 entfallen (Freibrief).

## Schritte

1. **Datei-Organizer S0a:** Pseudo-Kern aus PseudoDoc (`lib/pseudo/`: auftrag, flaechen, pakete, rueckweg, bereinigen) byte-gleich mit Pin
   (`scripts/pseudo-nachziehen.mjs`, `--pruefen` im Bau); die Seite „Pseudonymisierer“ prüft beim Zurückführen mit `rueckwegPruefen`.
2. **Datei-Organizer S1 (Kern):** `lib/ki-sortieren.ts` ohne Oberfläche und ohne Netz – Auftrag „Sortieren“ (feste Fachliste, Fachregel
   als Daten, Antwortformat), Plan-Prüfung (nur erwartete Felder, Fächer nur aus der Liste, Fremdes verworfen und gemeldet), Lehrfall-Form.
   Probe mit den 101 erfundenen Testdateien (gestellte KI-Antwort).
3. **Datei-Organizer S2 (+S4-Grundlage):** Seite „Sortieren“ › „Mit großer KI sortieren“: Hinweg pseudonymisiert (Firmen bleiben),
   Klick zur KI (Zwischenablage, Seite öffnet sich) oder Datei für eine Claude-Code-Sitzung, Plan zurück, Liste mit Ändern und Bestätigen,
   Übernahme in den Bestand (wie „Stimmt“, mit Verlauf und Lernen). Lehrfälle nur auf dem Gerät. Originale unberührt.
4. **Familienakte F1:** `lib/ki-sortieren.ts` und der Pseudo-Rückweg mit Pin herein (`tools/sortierkern-nachziehen.mjs` erweitern);
   das Pseudo-Fenster prüft den Rückweg über denselben Kern.
5. **Familienakte F2–F3:** im Eingang „Mit großer KI sortieren“: Hinweg über die Maske, Auftrag mit den Bereichen der Akte, Plan zurück
   mit Rückweg-Prüfung, Vorschläge mit Kennzeichen „große KI“, bestätigen.
6. **Private Akte und Private Brain Pro:** Klon `datei-organizer` in der Privaten Akte nachziehen (bringt den Weg mit); Sortier-Kern-Pin in
   Private Brain Pro prüfen (nur nachziehen, wenn sich gepinnte Dateien geändert haben).
7. **Abschluss:** Liste fertig/offen, Vorschlag zum Veröffentlichen, Brief für die nächste Sitzung.

## Stand

- **Schritt 1 fertig (28.11.):** Pseudo-Kern aus PseudoDoc @ `b1a8af4` mit Pin (`lib/pseudo/HERKUNFT.json`), Rückweg-Prüfung im Pseudonymisierer. Datei-Organizer PR #85 auf main (`5bd0fe7`).
- **Schritt 2 fertig (28.11.):** `lib/ki-sortieren.ts` (Auftrag, Fachregel als Daten, Plan-Prüfung, Lehrfall) und `kern-js/ki-sortieren.js`, Probe 22 grün. PR #86 auf main (`58845e5`).
- **Schritt 3 fertig (28.11.):** Seite „Sortieren“ › Karte „Mit großer KI sortieren“ (`src/ki-sortieren.tsx`, `planUebernehmen` in `src/app.tsx`), Firmen vor der Maske geschützt (`firmenSchuetzen`), Lehrfälle im App-Speicher (`do-lehrfaelle`, höchstens 2000). Pseudo-Kern mit `zeichen.ts` (PseudoDoc #14). Probe `tests/ki-sortieren-probe.mjs` 13 grün. Fund: die Maske ersetzt gelernte Namen auch mitten im Wort („Stadtwerke ⟦NAME-2⟧stadt“) – hier umgangen, in der Maske (Familienakte) offen.
- **Schritt 4 fertig (28.11.):** Familienakte PR #238 auf main (`125a8eb`): `lib/sortierkern/ki-sortieren.ts` und `lib/pseudokern/` (PseudoDoc #14:
  `zeichen.ts`) mit Pin, `lib/ki-sortieren-eingang.ts`, Pseudo-Fenster zeigt die Rückweg-Prüfung, Maske: Telefon am Satzende (Lücke vom 14.11. zu).
- **Schritt 5 fertig (28.11.):** Familienakte PR #240: Eingang › Auswahl › „Mit großer KI sortieren“, Vorschläge „große KI“ im Prüf-Fenster, UI-Probe neu.
- **Schritt 6 fertig (28.11.):** Private Akte PR #105 (Klon `datei-organizer` @ `c5f885c`, Probe 536 grün), #106 (CLAUDE.md). Private Brain Pro: Kern-Pin
  unverändert gültig, nichts nachzuziehen.
- **Schritt 7 (28.11.):** Abschluss und Brief für die nächste Sitzung: `docs/BRIEF_SITZUNG_2026-11-30_NACH-DER-KETTE.md`. Klaus 28.11.: **Codex ist raus**
  (in allen fünf CLAUDE.md eingetragen). Nichts veröffentlicht.
