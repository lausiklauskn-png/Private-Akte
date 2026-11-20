# Brief für die nächste Sitzung: Klon nachziehen, Steckbrief, Ausgabe 0.9.4 (Klaus 20.11.2026)

## Stand

- Familienakte **2.28.75** ist ausgegeben (Repo `meine-familienakte`, PR #222/#223, Brief dort
  `BRIEF_ABSCHLUSS_2026-11-20_UEBERSICHTLICH-2.28.75.md`): Klappkarten, Lebensbereiche als Knöpfe, Kopf ohne Neu/Pseudo/Buch,
  Personen mit **Steckbrief im Kern** (`lib/person-steckbrief.ts`, `updateLocalPersonSteckbrief`), Suche nach Personen.
- Private Akte, Zweig mit PR #74 (Entwurf, **nicht veröffentlicht**, Klaus 20.11.: „jetzt nicht veröffentlichen, alles zusammen in der
  nächsten Sitzung“): **0.9.4** – sechs Grundbereiche stehen auf der Startseite immer da, auch bei leerer Akte („noch leer“), dazu jeder
  Bereich mit Unterlagen (`GRUNDBEREICHE`, `bereicheKacheln` in `app.js`; Klaus' Bild der Pro-App mit leerer Akte: „nur leere Container
  sieht hässlich aus, ich will was fürs Auge“). Fassung überall 0.9.4 (Code 94). Probe 508 grün.

## Auftrag

1. PR #74 lesen, auf den neuesten `main` bringen.
2. Klon `klone/familienakte` auf den Stand von 2.28.75 nachziehen (`node tools/klon-nachziehen.mjs familienakte --quelle ../Meine-Familienakte`,
   danach `--pruefen`), `npm run bau`, Probe `tests/probe.cjs` – die gebündelten Teile (Kalender, Notiz, Seitenleiste, Tresor) müssen
   unverändert laufen.
3. **Steckbrief der Person** in der Akte zeigen (Brief vom 20.11., Punkt 9): unter „Akten“ › Person – Kontakt, Ausweise & Nummern
   (Nummer verdeckt, gültig bis, Foto als Unterlage bei der Person), weitere Einträge; Speichern nur über den Kern des Klons
   (`updateLocalPersonSteckbrief`, `updateLocalPersonContact`). Einklappbar, ab Werk zu, Zahl daneben. Keine Erklärsätze.
4. `docs/ANPASSUNGEN-GEGENUEBER-FAMILIENAKTE.md` ergänzen (was die Familienakte mit 2.28.75 übernommen hat).
5. Alles zusammen als **0.9.4** ausgeben, sobald grün (Klaus' Wort 20.11.): PR nach `main`, Lauf „Android-App signiert“ mit
   `veroeffentlichen = ja`, Windows wie bisher als CI-Download, Nachweis `docs/VEROEFFENTLICHUNG-0.9.4.md` (Muster 0.9.3).
6. Abschlussbrief mit Startauftrag.

Freibrief wie zuletzt: tokensparend, Fragen selbst nach Logik und Nutzerfreundlichkeit beantworten, Entscheidungen im Abschlussbrief nennen.
