# Brief: nach der Kette „Pseudonymisiert mit großer KI sortieren“ (Stand 28.11.2026)

Klaus ist kein Programmierer: Deutsch, Schritt für Schritt, bei jedem Befehl sagen, auf welcher Maschine er läuft.
Vorgänger: `docs/BRIEF_SITZUNG_2026-11-29_KETTE-PSEUDO-KI-SORTIEREN.md` (Schritte 1–7, Stand dort).

## Was jetzt da ist (alles auf `main`, nichts ausgegeben)

| App | Was | Wo |
|---|---|---|
| Datei-Organizer | Seite „Sortieren“ › „Mit großer KI sortieren“: Auftrag pseudonymisiert (Firmen lesbar), Claude/ChatGPT/Gemini per Klick oder Datei für Claude Code, Plan lesen, ändern, bestätigen, Lehrfälle im App-Speicher | `src/ki-sortieren.tsx`, Kern `lib/ki-sortieren.ts`, Pseudo-Kern `lib/pseudo/` (Pin aus PseudoDoc) |
| PseudoDoc | Quelle des Pseudo-Kerns; `lib/pseudo/zeichen.ts` neu (unsichtbare Zeichen ohne Abhängigkeiten) | `lib/pseudo/` |
| Familienakte | Eingang › Auswahl › „Mit großer KI sortieren“: Vorschläge „große KI“ am Eingang, Bestätigen im Prüf-Fenster; Pseudo-Fenster prüft den Rückweg; Maske: Telefon am Satzende | `app/ki-sortieren-eingang.tsx`, `lib/ki-sortieren-eingang.ts`, Pins `lib/sortierkern/`, `lib/pseudokern/` |
| Private Akte | Klon `datei-organizer` nachgezogen – der Organizer im Rahmen hat den Weg | `klone/datei-organizer` |
| Private Brain Pro | nichts nötig: die gepinnten Kern-Dateien sind unverändert | – |

## Offen (der Reihe nach)

1. **Am Gerät und mit echter KI ungeprüft** – zuerst mit den erfundenen Testdateien des Organizers (Testordner) einmal Hin und Zurück
   mit Claude probieren; dann erst eigene Unterlagen.
2. **Maske ersetzt gelernte Namen auch mitten im Wort** („Stadtwerke ⟦NAME-2⟧stadt“, weil „Beispiel“ als Name gelernt war). Im Organizer
   und in der Familienakte mit `firmenSchuetzen` umgangen; richtig behoben gehört es in die Maske (Familienakte `lib/maske.ts`, Quelle), danach
   Datei-Organizer und PseudoDoc nachziehen (`scripts/maske-nachziehen.mjs`, `scripts/bausteine.mjs`).
3. **Masken-Pins nachziehen:** die Telefon-Lücke ist in der Familienakte geschlossen; Datei-Organizer und PseudoDoc tragen noch die alte Maske.
4. **Lernen (S4/F4):** Lehrfälle werden gesammelt (`do-lehrfaelle`, `fa-lehrfaelle`, je höchstens 2000), der Kern nutzt sie noch nicht.
   Erfolgsmerkmal aus dem Plan: nach 50 Korrekturen sortiert der Kern einen zweiten Ordner gemessen besser.
5. **Lehrfälle verschlüsselt ablegen** (Tresor bzw. Arbeitsordner) statt im App-Speicher.
6. **Familienakte:** Pseudo-Fenster auf denselben Pseudo-Kern umstellen (Auftrag über viele Dateien), nicht nur die Rückweg-Prüfung.
7. **Private Akte:** eigener Eingang der Akte hat den Weg noch nicht (nur über den Organizer im Rahmen).

## Vorschlag zum Veröffentlichen (nur mit Klaus' Wort)

- Datei-Organizer **0.4.26** (Code 66): Android, Windows, Basic.
- Familienakte **2.28.80**: Android, Windows, PWA.
- Private Akte **0.9.13** (Code 103): Android, Windows (Web-App kommt schon über Pages).
- PseudoDoc: keine sichtbare Änderung – keine neue Fassung nötig.

## Startauftrag zum Einfügen

```
Lies im Datei-Organizer docs/BRIEF_SITZUNG_2026-11-30_NACH-DER-KETTE.md. Arbeite „Offen“ ab Punkt 2 der Reihe nach ab (Punkt 1 mache
ich am Gerät). Maske nur in der Familienakte ändern, dann in Datei-Organizer und PseudoDoc nachziehen. Lehrfälle nie in ein Repo.
Je Schritt frisch von origin/main, Proben grün, selbst mergen, eine Zeile unter „Stand“. Nichts veröffentlichen ohne mein Wort.
```

## Stand

