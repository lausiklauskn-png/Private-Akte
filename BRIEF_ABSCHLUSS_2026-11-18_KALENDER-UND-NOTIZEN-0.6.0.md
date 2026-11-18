# Abschlussbrief – Kalender und Notizen echt (Private Akte 0.6.0, 18.11.2026)

Der ausführliche Stand steht in `CLAUDE.md` (Abschnitt „Stand“, Punkt 0.6.0, und „Feste Regeln“). Der Auftrag dazu liegt unter
`docs/BRIEF_SITZUNG_2026-11-18_KALENDER-UND-NOTIZEN.md`.

## Was gebaut ist

- **Kalender:** Knopf „Kalender“ oben, Stadt „Kalender“ im Baum und „Fällig“ auf der Startseite öffnen „Mein Kalender“ der
  Familienakte – dieselbe Ansicht, aus dem Klon gebündelt (Weg B aus dem Brief), mit echten Einträgen im Tresor.
- **Notizen:** Knopf „Notiz“ öffnet das Notiz-Fenster der Familienakte (schreiben, sprechen, Foto). Die Notiz liegt in der Akte
  (Liste „Notizen“ unter dem Kalender); steht ein Tag im Text („morgen um 9 Uhr“), geht sie mit „Erinnern lassen“ in den Kalender.
- **Fällig** auf der Startseite ist echt. **Glocke:** oben nur das Symbol – rot mit Zahl (fällig), grün (Einträge gespeichert), grau
  (keine). Ein Tipp klappt das Glockenfeld auf: alle offenen Einträge, je Zeile öffnen oder abhaken.
- **Kalender verbinden** (Google, Microsoft, Gerätekalender, Kalenderdatei) samt Anmeldung und Abgleich aus dem Klon.
- **Farben:** `rahmen/kalender-thema.css`, Violett, nach dem Muster der anderen Tools. **Maße und Lage der Knöpfe unverändert.**
- **Seitenleiste** der Familienakte im Kalender (Griff rechts: auf/zu, hoch, runter, zurück, Startseite, Seite wählen, Hilfe).
- **Höhe am Handy:** keine eigene Kopfreihe im Kalender, Bestätigung und läutende Erinnerung als flache Zeile.
- **Akte leeren:** vierter Haken „Termine und Notizen“. **Baum:** Hinweistexte heraus.

## Was Klaus tun muss, damit die Anmeldung geht

Die Anmeldung bei Google und Microsoft kehrt auf diese Adresse zurück:
`https://lausiklauskn-png.github.io/Private-Akte/rahmen/kalender/`

- Google Cloud › APIs & Dienste › Anmeldedaten › OAuth-Client „Webanwendung“ (Projekt „Familienakte“) › Autorisierte
  Weiterleitungs-URIs: die Adresse dazu eintragen.
- Microsoft Entra › App-Registrierungen › „Familienakte“ › Authentifizierung › Single-Page-Anwendung: die Adresse dazu eintragen.

Ohne diesen Eintrag lehnen beide die Anmeldung ab. Einen Anbieter Telekom/T-Mobile gibt es im Klon nicht (nur Google, Microsoft,
Gerätekalender der Android-App, Kalenderdatei).

## Geprüft / nicht geprüft

- Probe (Handy- und PC-Breite, Chromium): siehe Zahl in `CLAUDE.md`. `npm run bau:pruefen` grün.
- **Nicht geprüft:** Tablet; Sprechen und Foto zur Notiz; Anmeldung und Abgleich mit Google/Microsoft; Auslieferung über Pages.

## Offen

- Termin zu einer echten Unterlage anlegen (der Klon kann Bezüge, die Hülle reicht sie noch nicht durch).
- Beispiel-Unterlagen führen über „Bearbeiten mit › Kalender“ noch zum alten Beispiel-Kalender; `kalender()` und `fNotiz` in `app.js`
  können weg, sobald die Beispiele gehen.
- Notizen in der Suche; Papierkorb für gelöschte Termine und Notizen (im Klon vorhanden, hier ohne Oberfläche).
- Klaus' Gedanken vom 18.11., nicht gebaut: die übrigen Knöpfe oben als Spezialknöpfe (nur Symbol, wie die Glocke); Seitenleiste auch
  in der Hülle und den anderen Tools.
- Glocke bei geschlossener App (nur in einer Android-App möglich).
- Zugang zum verbundenen Kalender gilt nur, solange der Kalender offen ist.
- Aus dem alten Brief weiter offen: „PDF ausgeben“ leuchtet nach dem Scan; „Eingang“ ist Beispiel; lange Liste bei 100 Unterlagen;
  Kachel „Workflow PDF“ im Familienbüro; Gelerntes der eigenständigen Organizer-Apps in keinem Backup; Suche lernt nicht aus Tipps.

## Vollmacht und Arbeitsweise

Wie im Brief vom 18.11. (Freibrief, leise arbeiten, eine Ausgabe am Ende). Neu als feste Regel: Ansichten aus einem Klon nicht
umgestalten – nur Farben, je Tool eine Farbdatei.

## Startauftrag

```
Lies im Repo Private-Akte zuerst CLAUDE.md, dann BRIEF_ABSCHLUSS_2026-11-18_KALENDER-UND-NOTIZEN-0.6.0.md.
Du hast meinen Freibrief wie zuvor. Nimm meine Befunde vom Tablet zu 0.6.0 auf (Kalender, Notiz, Glocke, Anmeldung) und arbeite
danach die Liste „Offen“ ab, zuerst: Termin zu einer echten Unterlage. Arbeite leise, eine Ausgabe am Ende.
```
