# Brief für die nächste Sitzung – Kalender und Notizen echt (Stand: Private Akte 0.5.6, 18.11.2026)

Der ausführliche Stand steht in `CLAUDE.md` (Abschnitt „Stand“, 0.5.0 bis 0.5.6, und „Feste Regeln“). Der Abschlussbrief zu 0.5.0
liegt unter `docs/`. Dieser Brief nennt, was seit 0.5.0 dazukam, und den Auftrag.

## Seit 0.5.0 gebaut (alles auf `main`, nach Klaus' Test am Tablet am 18.11.)

- 0.5.1: Einordnung aus dem Organizer greift auch für Dateien aus Unterordnern (in 0.5.0 fiel alles auf den ersten Bereich);
  Startseite mit Abschnitten zum Aufklappen, Bereiche seitlich; „Deine Unterlagen“ sortierbar; Bestätigung in der Leiste des Rahmens.
- 0.5.2: „Teilen“ in Workflow PDF fragt „Wohin damit?“ – in die Akte oder an ein anderes Programm.
- 0.5.3/0.5.4: „Exportieren“ › „Akte leeren“ (Unterlagen, Workflow PDF, Liste im Organizer). **Das Gelernte bleibt immer stehen.**
- 0.5.5: das Gelernte des Organizers reist verschlüsselt im Backup mit (`Gelerntes.json`).
- 0.5.6: Workflow PDF hat eine eigene Stadt im Baum (öffnet die Hauptseite, nicht die Kamera).

**Am Tablet von Klaus gesehen:** Organizer im Rahmen, Übergabe von 98 Dateien, Scan über den roten Knopf, eingeklappte Startseite,
Sortierung (0.5.1). **Noch nicht gesehen:** 0.5.2 bis 0.5.6 – vor allem, ob „An ein anderes Programm teilen“ aus dem Rahmen heraus
das Teilen-Fenster von Android öffnet.

## Auftrag: Kalender und Notizen (Klaus 18.11.2026)

Klaus: „Ich klicke oben auf Kalender und dann kommt tatsächlich die richtige Kalenderansicht, wie sie in der Familienakte ist. Mit
Eintrag für die Notizen – die Notizen, die ich mache, gehen direkt in den Kalender oder in die Akte.“ Das Familienbüro kommt später.

1. **Kalender echt.** Der violette Knopf oben und die Stadt „Kalender“ im Baum zeigen heute ein Beispiel (`kalender()` in `app.js`,
   Liste `termine`). Ziel: die Kalenderansicht der Familienakte, mit echten Terminen und Fristen im Tresor.
2. **Notizen echt.** Der Knopf „Notiz“ (`fNotiz` in `app.js`) ist heute Beispiel. Ziel: schreiben oder sprechen, dann geht die Notiz
   in die Akte – und wenn ein Datum daran hängt, in den Kalender. Auf der Startseite ist „Fällig“ dann echt statt Beispiel.

### Was im Klon dafür da ist (nur Namen nachgesehen, nichts gelesen)

- Kalender: `klone/familienakte/lib/kalender.ts`, `kalender-einlesen.ts`, `kalender-konten.ts`; Oberfläche `app/mein-kalender.tsx`,
  `kalender-karte.tsx`, `termin-bearbeiten.tsx`, `kalender-hilfe.tsx`; Abgleich mit fremden Kalendern `app/kalender-abgleich.ts`,
  `kalender-anbieter.ts`.
- Tresor (`app/local-vault.ts`): `createLocalScheduleBundle`, `updateLocalScheduleTermin`, `updateLocalScheduleStatus`,
  `updateLocalScheduleKalender`, `deleteLocalScheduleRecord`.
- Notizen/Erinnerungen: `lib/family-memory.ts`, `app/notiz-knopf.tsx`, `app/memory-bearbeiten.tsx`; im Tresor
  `createLocalMemoryBundle`, `createOrUpdateLocalMemoryDraft`, `updateLocalMemoryRecord`, `addLocalMemoryErinnerung`,
  `deleteLocalMemoryRecord`. Diktat: `lib/browser-dictation.ts` (läuft schon in der Suche).

### Die eine offene Frage – selbst entscheiden, in `CLAUDE.md` festhalten

Der Kalender der Familienakte ist **keine eigene App wie Workflow PDF**, sondern ein Stück ihrer React-Oberfläche. Der Weg „Klon
im Rahmen“ (0.5.0) passt darum nicht ohne Weiteres. Zwei Wege:

- **A – Mechanik aus dem Klon, Oberfläche der Hülle:** Termine und Notizen über die unveränderten Funktionen des Tresors und
  `lib/kalender.ts` (wie `src/tresor.ts` es für Unterlagen, Suche und Backup tut), die Ansicht in `app.js` so nah wie möglich an der
  Familienakte nachgebaut. Passt zur bisherigen Bauweise; Risiko: die Ansicht ist nachgebaut, nicht dieselbe.
- **B – die React-Ansicht des Klons selbst bündeln** (esbuild, wie `tresor.js`) und in ein Fenster setzen. Dann ist es wirklich
  dieselbe Ansicht; Risiko: sie hängt an der übrigen Familienakte (Stile, Zustand, Next) – erst nachsehen, wie tief.

Erst nachsehen, dann wählen. Klaus' Maßstab: es soll **aussehen und sich bedienen wie in der Familienakte**, und die Mechanik
darunter darf nicht neu geschrieben werden.

### Grenzen

- Abgleich mit fremden Kalendern (Google, CalDAV …) nicht in dieser Sitzung, außer er fällt ohne Aufwand mit ab.
- Familienbüro bleibt eine eigene App und kommt später.
- Keine Ausgabe von APK oder Windows-Paketen.

## Offen aus dem Test (klein, nebenbei mitnehmen, wenn es passt)

- Im Editor von Workflow PDF leuchtet nach dem Scan „PDF ausgeben“ – das führt weg von der Akte.
- „Eingang“ ist weiter Beispiel; echt Abgelegtes erscheint dort nicht.
- „Deine Unterlagen“ aufgeklappt ist bei 100 Stück eine lange Liste (kein Gruppieren, kein Blättern).
- Kachel „Workflow PDF“ im Familienbüro: bleibt sie, seit es die eigene Stadt gibt? (Klaus gefragt, keine Antwort.)
- Das Gelernte der eigenständigen Apps Datei-Organizer Pro/Basic ist in keinem Backup.
- Die Suche lernt nicht aus dem, was Klaus antippt (sein Beispiel: gemeint war der Name, gesucht wurde im Inhalt).
- Im Repo Datei-Organizer: Scan-PDFs ganz lesen, Lage der Zeilen im Index.

## Vollmacht und Arbeitsweise (Klaus 18.11.2026: „Der Freibrief steht für die nächste Sitzung auch“)

- **Freibrief:** zusammenführen (PR anlegen, nach grüner Prüfung gleich auf `main`), Repos hereinholen, Fragen **selbst entscheiden** –
  wenn es logisch und nachvollziehbar ist, freundlich für den Nutzer und nützlich für die App. Jede eigene Entscheidung kurz in
  `CLAUDE.md` (was, warum).
- **Leise arbeiten:** im Hintergrund, wenig Ausgabe, keine Zwischenberichte, keine Rückfragen. **Eine Ausgabe am Ende:** was
  eingebaut ist, was wie geprüft wurde, was nicht geklappt hat, was Klaus am Tablet tun soll.
- **Einfach halten** (feste Regel in `CLAUDE.md`): einfach in der Nutzung, nicht in der Technik. Wenig Text, Erklärungen hinter
  Fragezeichen oder Knopf und für normale Nutzer verständlich, reine Technik bleibt im Hintergrund.
- **Was der Freibrief nicht aufhebt:** Klone nie von Hand ändern; das Gelernte wird nie gelöscht; keine echten Unterlagen,
  Schlüssel oder Passwörter im Repo oder Chat; Familienbüro bleibt eigene App; keine APK-/Windows-Ausgabe; nichts als geprüft
  melden, was nicht gelaufen ist.
- **Je Schritt:** Fassung erhöhen (`FASSUNG` in `app.js`, `VERSION` in `sw.js`, `?v=` dreimal in `index.html`, Fassung in
  `tests/probe.cjs`), `npm run bau` wenn `src/` oder `rahmen/` geändert ist, Probe (`python3 -m http.server 8765`, dann
  `node tests/probe.cjs` aus einem Ordner mit Unterordner `p/`), `npm run bau:pruefen`, PR, zusammenführen. `CLAUDE.md` und
  `docs/ANPASSUNGEN-GEGENUEBER-FAMILIENAKTE.md` mitführen (zuletzt A30), am Ende ein neuer Abschlussbrief.
- **Lehre dieser Sitzung:** eine Probe, die nur „nicht leer“ zählt, übersieht Fehler (0.5.0: alle Bereiche gleich). Am Ergebnis
  prüfen, nicht an der Anzahl.

## Startauftrag

```
Lies im Repo Private-Akte zuerst CLAUDE.md, dann BRIEF_SITZUNG_2026-11-18_KALENDER-UND-NOTIZEN.md (dort besonders „Auftrag“,
„Die eine offene Frage“ und „Vollmacht und Arbeitsweise“).
Du hast meinen Freibrief: zusammenführen, Repos hereinholen, Fragen selbst entscheiden – wenn es logisch, nachvollziehbar,
freundlich für den Nutzer und nützlich für die App ist. Frag mich nichts, arbeite bis zum Ende durch.
Ziel: der Kalender oben und im Baum zeigt die richtige Kalenderansicht wie in der Familienakte, mit echten Terminen; Notizen
(schreiben oder sprechen) gehen in die Akte und mit Datum in den Kalender. Die Mechanik kommt aus dem Klon der Familienakte,
nichts davon neu schreiben. Einfach in der Nutzung bleiben.
Arbeite leise: wenig lesen, kurze Befehlsausgaben, keine Zwischenberichte. Nur eine Ausgabe im Chat, am Ende: was eingebaut
ist, was wie geprüft wurde, was nicht geklappt hat, was ich am Tablet tun soll.
Je Schritt wie im Brief: Fassung erhöhen, bauen, Probe, PR, zusammenführen. CLAUDE.md und die Anpassungsliste mitführen,
am Ende ein neuer Abschlussbrief.
```
