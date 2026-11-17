# Abgleich zwischen Datei-Organizer und den Apps (Klaus 13.11.2026)

Klaus: „Den Sortier-Kern haben wir vom Organizer in die Familienakte gezogen, weil er besser ist. Jetzt kam etwas aus der Familienakte
in den Organizer – da müsste es einen Abgleich geben.“

Es gibt **keine zwei Fassungen derselben Sache**. Jeder Baustein hat genau eine Quelle, die anderen tragen eine byte-gleiche Kopie mit Pin:

| Baustein | Quelle (dort wird gepflegt) | Kopie in | Nachziehen mit |
|---|---|---|---|
| Sortier-Kern (Erkennen, Bereiche, Siebe, Lernen, Wortmodell) | **Datei-Organizer** `lib/` | Familienakte `lib/sortierkern/` | Familienakte `tools/sortierkern-nachziehen.mjs` |
| Sortier-Kern als JavaScript | **Datei-Organizer** `kern-js/` (erzeugt) | BookLedgerPro `src/vendor/sortierkern/` | BookLedgerPro `tools/sortierkern-nachziehen.mjs` |
| Prüfkern (liest das Datei-Innere) | Auslieferungsprüfer → Workflow PDF → **Familienakte** `public/apps/workflow-pdf/assets/pruefer-*.js` | Organizer `src/public/vendor/pruefkern/` | Organizer `scripts/vendor-nachziehen.mjs` |
| Texterkennung (tesseract.js, Deutsch) | Workflow PDF → **Familienakte** `public/apps/workflow-pdf/vendor/tesseract/` | Organizer `src/public/vendor/tesseract/` | Organizer `scripts/vendor-nachziehen.mjs` |

Was aus der Familienakte in den Organizer kam (0.3.4), ist **keine Sortier-Logik**, sondern Lese-Werkzeug: der Prüfkern und die
Texterkennung. Die Sortierung selbst (Bereich, Absender, Frist, Art) kommt weiter nur aus dem Organizer. Beide Apps lesen jetzt mit
denselben Bytes – was die Familienakte damit besser lesen konnte, kann der Organizer jetzt auch.

## Prüfen

`node scripts/abgleich.mjs` vergleicht alle drei Richtungen (Nachbar-Repos müssen daneben liegen) und nennt, was veraltet ist.
Nach jeder Änderung an `lib/` hier: Familienakte nachziehen und dort die Proben laufen lassen; nach jeder Änderung am Prüfkern in der
Familienakte: hier `scripts/vendor-nachziehen.mjs`.

## Noch nicht abgeglichen (benannt)

- **Doppelungen und Ähnliche** (`lib/aehnlich.ts`, `lib/pdfkennung.ts`) stehen nur im Organizer. Die Familienakte findet am Testordner 0 von
  2 Doppelten (Organizer 2/2, `scripts/vergleich-familienakte.mjs`). Übernahme dort erst mit Vorschau (Doppelte anzeigen, zusammenführen).
- **Titel aus dem Briefkopf** (`briefkopf.js` in der Familienakte) nutzt der Organizer nur in den Messungen, nicht in der App.
