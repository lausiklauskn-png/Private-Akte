# Brief für die nächste Sitzung – Übergaben und Aufräumen (Stand: Private Akte 0.7.1, 18.11.2026)

Der ausführliche Stand steht in `CLAUDE.md` (0.7.0 und 0.7.1). Der vorige Sitzungsbrief liegt unter
`docs/BRIEF_SITZUNG_2026-11-19_OFFENE-PUNKTE-UND-NAECHSTE-APPS.md`; seine Liste ist bis auf die Punkte unten abgearbeitet.

## Wie gearbeitet wird

Wie im vorigen Brief: der Reihe nach, keine zusätzlichen Gegenproben, keine Schleifen; je Schritt Fassung erhöhen, `npm run bau`,
`node tests/probe.cjs` einmal, `npm run bau:pruefen`, PR, nach grüner Prüfung zusammenführen; `CLAUDE.md` und
`docs/ANPASSUNGEN-GEGENUEBER-FAMILIENAKTE.md` (zuletzt A43) mitführen. Klone nie von Hand ändern, das Gelernte nie löschen.

## Erledigt in dieser Sitzung (18.11.)

- 0.7.0: Akten je Person (Antworten A–F), echter Eingang, Einordnen (Person, Akten, Absender) beim Ablegen und an jeder Unterlage,
  Übergabe aus dem Organizer nimmt ab Werk nur Unterlagen, Bereiche-Kacheln echt, „Termin dazu“ an der Unterlage, Beispiel-Kalender
  und Beispiel-Notiz heraus, gelber Knopf mit Portemonnaie-Symbol.
- 0.7.1: Private Brain (echte Web-App im Rahmen), Portemonnaie im Tresor mit den Rechenteilen aus BookLedgerPro, Familienbüro nur
  aufrufen, „PDF ausgeben“ in Workflow PDF nicht mehr hervorgehoben.

## Die Liste, in dieser Reihenfolge

1. **Klaus' Test am Tablet abwarten** (Design, Aufbau, Sinn) und die Befunde zuerst bauen.
2. **Mail mit Anlagen → Unterlage.** Übergabe-Stelle im Repo Privat-Brain-Pro bauen, wie `DO_RAHMEN` im Datei-Organizer
   (`src/rahmen.ts` dort): läuft Private Brain im Rahmen der Akte, steht an der geöffneten Mail „An die Private Akte“, das schickt
   `.eml` und Anlagen als Nachricht an die Hülle; die Akte zeigt das Fenster „In die Akte legen“ (Person/Absender aus der Vorsortierung
   `familienakte-begleitung.js`). Achtung: die Browserfassung von Private Brain holt Mails nur über einen eigenen Mail-Dienst.
   Prüfen, ob Klaus das nutzt – sonst bleibt der Weg über die Android-App und den Pro-Tresor (Fach `eingang-familienakte`), den die
   Private Akte im Browser nicht lesen kann.
3. **Familienbüro: Unterlage hin, Ergebnis zurück.** Heute öffnet nur die App. Nachsehen, ob Familienbüro Pro eine Datei über die
   Adresse oder „Teilen“ annimmt; dann wie bei Workflow PDF: Kopie hinein, Ergebnis als neue Unterlage zurück.
4. **Beispiele hinter „Finden“ heraus** (Beispiel-Treffer, „Mappe“, „Bearbeiten mit“, das Beispiel-Fenster „Familienbüro“, Organizer-
   und Mail-Beispiele) – danach `docs`, `eingang`, `organizer`, `mails`, `geld` und die Fenster dazu in `app.js` entfernen; die Probe
   (Zeilen „Bearbeiten mit“, „Pseudo“, „Mappe“) mitziehen.
5. **Akten pflegen:** Akte umbenennen und auflösen, Person umbenennen; dazu im Klon nachsehen (`saveLocalStammRecord` mit `id`).
6. **„⋯“ oben am Handy** neben der Seitenleiste: nach Klaus' Test entscheiden.

## Grenzen, die Klaus kennen muss

- Private Brain im Rahmen ist dieselbe Web-App wie unter ihrer eigenen Adresse – derselbe Speicher, keine Mails ohne Mail-Dienst.
- Portemonnaie: der Betrag vom Bon ist nur ein Vorschlag; Tagesabschluss aus BookLedgerPro ist nicht übernommen (gehört zur Buchhaltung).
- Am Tablet und über Pages ist 0.7.0/0.7.1 ungeprüft.

## Startauftrag

```
Lies im Repo Private-Akte zuerst CLAUDE.md, dann BRIEF_SITZUNG_2026-11-19_UEBERGABEN-UND-AUFRAEUMEN.md.
Du hast meinen Freibrief wie zuvor. Zuerst meine Befunde vom Tablet, dann die Liste im Brief der Reihe nach.
Keine zusätzlichen Gegenproben, keine Schleifen. Was du nicht schaffst, gibst du mit einem Brief weiter.
Arbeite leise, eine Ausgabe am Ende.
```
