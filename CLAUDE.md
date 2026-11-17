# CLAUDE.md — Private-Akte

Diese Datei liest jede Sitzung zuerst.

## Was das ist

Die Private-Akte fasst die fertigen Apps unter einer neuen Hülle zusammen. Angelegt am 17.11.2026 (Klaus' Wort im Chat der Sitzung
„Kalender-Schleife“ der Familienakte).

## Entschieden (Klaus 17.11.2026)

- **Bauweise: Klone mit Pin, neue Hülle.** Jede übernommene App liegt unverändert unter `klone/<name>/`, Datei für Datei gleich mit
  ihrem Quell-Repo an einem festen Stand. Neu gebaut wird nur die Hülle (Start, Kopf, Farben, Wege zwischen den Apps).
  Grund: an den Apps ist viel korrigiert und trainiert worden – nichts davon darf beim Abschreiben verloren gehen.
- **Familienbüro bleibt eine eigene App** (`Familienbuero-Pro`, AGPL-3.0 wegen ONLYOFFICE) und kommt nicht in diese App.
  Die Private-Akte ruft es höchstens auf.
- **Portemonnaie: neu, schlank, offen.** Einfache Einträge „Geld rein / Geld raus“, offen gespeichert; die reinen Rechenteile kommen
  aus BookLedgerPro (`src/domain/money.js`, `kassenbuch.js`, `tagesabschluss.js`). Keine Kopie der Kasse-Seite – die hängt an der
  doppelten Buchführung. Als Arm an der Familienakte.
- **Verschlüsselung an einem Ort** (Klaus' Richtung, noch nicht gebaut): gearbeitet wird offen, verschlüsselt wird bei der Abgabe in die
  Akte. Vorbehalt: offen nur im eigenen Speicher der App, nicht auf SD-Karte oder in frei gewählten Ordnern.
- **Farben** (Klaus' Richtung): Stil des Familienbüros (Knöpfe mit Verlauf, Kopfleiste, Palette). Portemonnaie startet im Grün des
  Familienbüros, Workflow PDF rötlich; jede App startet in ihrer Farbe, bis der Nutzer umstellt.

## Stand (17.11.2026, Vorschau 0.3.4)

- **Hülle:** `index.html`, `app.css`, `app.js` – die Vorschau aus PR #3 (0.1.5), von Hand geschrieben, ohne Bauschritt. Die Programme
  heißen „Tools“. Briefe: `BRIEF_ABSCHLUSS_2026-11-17_VORSCHAU-0.1.5.md`.
- **Erstes echtes Stück (0.2.0):** Abschnitt „Deine Unterlagen“ auf der Startseite. `src/tresor.ts` reicht an den unveränderten Tresor
  der Familienakte weiter (`klone/familienakte/app/local-vault.ts`: `browserVault`, `saveLocalDocument`, `listLocalDocuments`,
  `readLocalDocumentFile`, `dokumenteAussortieren`); `npm run bau` schreibt daraus `tresor.js` (eingecheckt; `npm run bau:pruefen` in der CI).
  Speicher: Browser-Speicher des Geräts (OPFS, sonst IndexedDB), dasselbe Register wie die Familienakte. Alles andere ist weiter Beispiel.
- **Klaus 17.11.:** die Vorschau allein erfüllt den Zweck nicht; einfach aussehen darf sie, darunter arbeitet die Mechanik der
  Familienakte – nichts davon neu schreiben. Claude entscheidet, wann zusammengeführt wird (kleine geprüfte Stücke gleich auf `main`).
- `tools/klon-nachziehen.mjs` – Klon anlegen/nachziehen und prüfen (`--pruefen`, läuft in der CI `pruefung`).
- `klone/datei-organizer/` – Datei-Organizer @ `bcd48a4`. `klone/familienakte/` – Familienakte @ `de4571e` (Fassung 2.28.74).
- **GitHub Pages** veröffentlicht `main` ab der Wurzel, also auch `klone/` (rund 313 MB). Besser: Pages auf „GitHub Actions“ umstellen
  und nur die App-Dateien ausliefern – braucht einen Klick von Klaus in den Einstellungen des Repos.
- **Offen bei Klaus:** Familienbüro in der App (Vorschau) oder nur aufrufen (unten „Entschieden“); Portemonnaie offen oder gleich im Tresor.
- **Tresor exportieren / importieren (0.3.0, Klaus 17.11.):** Schild-Knopf „Sicherung“. Export = `writeFullFamilyBackup` des Klons mit
  Passwort (mindestens 10 Zeichen, PBKDF2 600.000 Runden) in einen gewählten Ordner, Notfallschlüssel und Notfallblatt; Import =
  `sicherungArt`/`sicherungProben`/`sicherungEinlesen` (Passwort oder Notfallschlüssel; volle Akte wird zusammengeführt, nichts
  überschrieben). Ordnername und Notfallblatt tragen den Namen „Familienakte“ – sie kommen unverändert aus dem Klon, damit die
  Familienakte dieselbe Sicherung lesen kann. Braucht die Ordnerwahl des Browsers (Chrome/Edge); am Handy ungeprüft.
- **0.3.4 Importieren / Exportieren wie im Rezeptbuch (Klaus 17.11.; ersetzt die Wörter von 0.3.3 und den Schild-Knopf):**
  Klaus: „Datei hineinlegen“ unter „Was möchtest du finden?“ irritiert (hineinlegen ist nicht finden, und wohin?), „Tresor
  exportieren“ sagt nicht, dass es ein Backup ist. Jetzt oben rechts zwei Strich-Knöpfe: **Importieren** (grüner Pfeil nach unten;
  Fenster mit „Datei in die Akte legen“ und „Backup einlesen“) und **Exportieren** (roter Pfeil nach oben; Fenster „Sichern &
  Exportieren“ mit „Backup erstellen“). Der Knopf „Datei hineinlegen“ auf der Startseite und der Schild-Knopf sind weg; der grüne
  runde Knopf „Dateien hineingeben“ bleibt der Datei-Organizer (Klaus: das ist logisch). An den Knöpfen steht nicht mehr „Tresor“,
  sondern „Akte“ (was in der App liegt) und „Backup“ (die Kopie als Ordner); „Tresor“ nur noch in „Wo liegt was?“. Am Handy liegen
  beide hinter „⋯“ (oben in der Liste). Das Datei-Feld `#echt-datei` steht jetzt in `index.html`. Nicht am Gerät.
- **0.3.3 (Klaus am Tablet: „Tresor exportieren“ war beim ersten Mal irreführend – für ihn entsteht der Tresor erst mit dem Ordner):**
  solange von diesem Browser aus noch nie exportiert wurde, heißt es im Fenster „Tresor sichern“: „Noch kein Ordner angelegt“,
  Knöpfe „Tresor als Ordner anlegen“ und „Vorhandenen Tresor importieren“, Hinweis, dass der Ordner eine Sicherung ist. Danach
  wie bisher „Tresor exportieren/importieren“ (Klaus: dann stimmt es). Offen: Tresor wirklich in einem gewählten Ordner führen
  (kann der Klon, „Ordner wählen“), und nach „Datei hineinlegen“ sagen, wo die Datei liegt.
- **0.3.2 (Klaus: der Browser zeigt trotz Hard Reload die alte Fassung):** der Worker fragt App-Dateien jetzt beim Server nach
  (`cache:'no-cache'`, Pages hält sie sonst 10 Minuten), `sw.js` wird nie aus dem Zwischenspeicher geprüft (`updateViaCache:'none'`,
  beim Start und beim Zurückkommen), die Fassungsmarke im Kopf ist ein Knopf: Tipp sieht nach und lädt neu; liegt eine neue Fassung
  bereit, steht dort „Neue Fassung · antippen“ (kein Neuladen von selbst, damit keine Eingabe verloren geht). `?v=` steht in
  `index.html` dreimal. Nicht am Gerät; wirkt erst, wenn 0.3.2 einmal geladen ist.
- **0.3.1 (Klaus am Tablet: Export gemacht, Ordner nicht wiedergefunden):** das Fenster „Tresor sichern“ nennt, wann und in welchen
  Ordner zuletzt exportiert wurde (Merker im Browser; der Browser gibt nur den Namen des gewählten Ordners her, keinen Pfad).
  „Haus und Wohnung“ = „Haus & Wohnung“ (`bereichKern`). Am Tablet bestätigt: Ablegen, eigene Bereiche, Ordnerwahl beim Export.
- **Oberfläche (Klaus 17.11.):** Knöpfe, Suchfeld, Zeilen und Felder flacher; Textfelder wachsen mit dem Text; Startseite ohne Erklärsatz
  und ohne Beispiel-Suchen, Überschrift „Was möchtest du finden?“ nur in der breiten Ansicht.
- **Bereiche (Klaus 17.11.):** die 18 festen der Familienakte, dazu eigene – wie dort ist ein eigener Bereich ein frei eingetragener
  Name an der Unterlage (`category`), er entsteht mit dem Ablegen; andere Schreibweise = derselbe Bereich (`echtBereich` in `app.js`).
  Noch offen: eigene Kategorien aus dem Datei-Organizer kommen erst mit der Übernahme des Index (`lib/organizer-uebernahme.ts` im Klon)
  herein; die sechs Kacheln „Bereiche“ der Startseite sind weiter Beispiele.
- **Als Nächstes (Klaus 17.11.):** Die Suche soll eine Bedeutungssuche werden (Embedding-Modell wird geladen, dafür ein Ladebalken) –
  aus der Familienakte übernehmen (`app/private-meaning-*.ts`, `app/browser-modelle.ts`), nicht neu schreiben. Danach der Eingang
  (Text lesen, Bereich/Absender/Frist vorschlagen) aus dem Klon.
- Probe: `python3 -m http.server 8765` im Repo-Ordner, dann `node tests/probe.cjs` (Ordner `p/` am Aufrufort anlegen).

## Feste Regeln

- **Klone nie von Hand ändern.** Verbesserungen entstehen im Quell-Repo und kommen nur über
  `node tools/klon-nachziehen.mjs <name> --quelle <pfad> [--stand <ref>]` herein. Beim Hinzufügen `git add -f klone/` nehmen
  (die Klone bringen eigene `.gitignore` mit) und danach `--pruefen`.
- Der Sortier-Kern bleibt **eine** Fassung: die aus dem Datei-Organizer.
- Keine echten Dokumente, keine personenbezogenen Daten, keine Schlüssel oder Passwörter im Repo. Das Repo ist öffentlich.
- Sichtbare Änderungen erst als Vorschau zeigen, Klaus sagt Ja. Veröffentlichen nur mit Klaus' Wort.
- Forschungseinträge gehören nur nach KimHub.
