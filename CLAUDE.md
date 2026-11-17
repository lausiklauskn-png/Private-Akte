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

## Stand (17.11.2026, Vorschau 0.3.9)

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
- **0.3.9 nach dem ersten echten Lauf am Tablet (Klaus 17.11.: Modell geladen, Bedeutungssuche rechnet):** (1) die Schwelle 0,80
  ließ alle Unterlagen als „dem Sinn nach“ durch – jetzt Nähe ≥ 0,84 und höchstens 0,04 unter dem besten, höchstens fünf; weiter
  geschätzt. (2) Was die Wörter treffen, steht oben (deine Unterlagen, dann Beispiele); „Passt vielleicht dem Sinn nach“ ist ein
  eigener Abschnitt ganz unten, nach Nähe sortiert, mit der Zahl an der Zeile („dem Sinn nach · 8,5“ = Nähe mal zehn, wie Klaus sie
  aus der Familienakte kennt) – daran sieht man auch, ob Wort- oder Bedeutungssuche gefunden hat. (3) Passt ein Wort nicht
  („Gehaltsabrechnung September“), wird gezeigt, was die meisten Wörter trifft, mit dem Hinweis „nicht alle Wörter passen“ –
  bei den Beispielen (`suche`) und bei den echten Unterlagen (`echtSuche`, Wort für Wort über die Suche des Klons).
  (4) Mikrofon: lief nach „Finden“ unsichtbar weiter (Klaus am Tablet) – jetzt endet das Diktat bei „Finden“, bei jedem
  Neuzeichnen der Ansicht und wenn die App in den Hintergrund geht. Am Tablet bestätigt: das Mikrofon selbst nimmt auf.
- **0.3.7 Bedeutungssuche hinter „Finden“ und Zurück (Klaus 17.11.):** kein eigener Knopf. Nach jedem „Finden“ steht unter der
  Suchleiste „Auch nach Bedeutung suchen? … (rund 140 MB) · Ja / Nein“, solange das Sprachmodell nicht geladen ist. **Nein** blendet
  die Zeile bis zum nächsten „Finden“ aus (kein „nicht mehr fragen“; später in den Einstellungen wieder einschaltbar – Einstellungen
  gibt es noch nicht). **Ja** lädt mit Ladebalken (Bytes), prüft, liest die Unterlagen und sucht; danach zeigt „Finden“ erst die
  Wort-Treffer und hängt an, was nur dem Sinn nach passt (Marke „dem Sinn nach“). Alles aus dem Klon über `src/tresor.ts`
  (`bedeutung`): `browser-modelle.ts`, `private-meaning-runtime.ts`, `-index.ts`, `-corpus.ts`; der Worker liegt byte-gleich unter
  `native/familienakte-meaning-worker.js` (`npm run bau` kopiert, `bau:pruefen` vergleicht). Kleinste Stufe multilingual-e5-small;
  Quellen: family-projekt.de, sonst Hugging Face; Bibliothek jsDelivr, sonst unpkg. **Grenzen:** mit echtem Modell nie gelaufen
  (die Sitzung erreicht die Quellen nicht; in der Familienakte laut deren Notizen ebenfalls nie echt geladen) – nur Ablauf, Fehlerweg
  und Anzeige mit gestelltem Modell geprüft. Die Schwelle für „dem Sinn nach“ (Nähe ≥ 0,80 und höchstens 0,05 unter dem besten) ist
  geschätzt. PDFs werden noch nicht gelesen (`src/pdf-ersatz.ts` ersetzt beim Bau den React-Import des Klons), sie zählen mit Titel,
  Bereich, Notiz. Die Größe „rund 140 MB“ ist geschätzt (Pins nennen sie für die kleine Stufe nicht). Die Datenschutzerklärung nennt
  das Laden von fremden Servern noch nicht (Klaus: zum Schluss).
  0.3.8: der Ladebalken nennt, von welchem Server gerade geladen wird (Klaus: erst der eigene Server, sonst Hugging Face – so steht
  es in den Pins; die Bibliothek kommt von jsDelivr, nicht vom eigenen Server). Am Tablet bestätigt (0.3.7): das Laden läuft an.
  **Zurück:** Android-/Browser-/Maus-Zurück geht in der App einen Schritt zurück (Fenster, Menü, Suche, Bereich, Ansicht); am Anfang
  bleibt die App offen und sagt es, erst ein zweites Zurück binnen 2,5 s verlässt sie (`zur…` am Ende von `app.js`). Nicht am Gerät.
- **0.3.6 Suche, erster Schritt (Klaus 17.11.: eine Suchleiste, Mikrofon, X, nichts Zusätzliches hinter „Finden“):** das Suchfeld hat
  ein **X** (löscht Eingabe und Treffer) und ein **Mikrofon** (Diktat des Klons, `lib/browser-dictation.ts`; noch einmal tippen
  beendet und sucht; nur wo der Browser Spracherkennung hat). „Finden“ sucht jetzt in den echten Unterlagen mit der Wortsuche des
  Klons (`lib/family-search.ts`, `family-search-text.ts`: Alltagswörter, Monate, Daten, UND) – Treffer „Deine Unterlagen“ oben,
  Beispiele darunter. Gesucht wird in Titel, Dateiname, Bereich, Notiz; **nicht im Inhalt der Datei** (beim Ablegen wird hier noch
  kein Text gelesen). Brücke: `suchen`, `diktat` in `src/tresor.ts`. Mikrofon nicht am Gerät geprüft (Probe hat kein Mikrofon).
  **Zweiter Schritt, noch nicht gebaut: Bedeutungssuche** hinter demselben „Finden“, ohne eigenen Knopf (Klaus). Dafür aus dem
  Klon: `app/browser-modelle.ts` (Laden mit Fortschritt in Bytes, Prüfsummen), `private-meaning-runtime.ts`, `-index.ts`,
  `-corpus.ts`, Worker `public/native/familienakte-meaning-worker.js`, Pins `meaning-models.json`. Zu klären: das Modell muss
  einmal geladen werden (kleinste Stufe multilingual-e5-small, dazu rund 20 MB Bibliothek; Größe der kleinen Stufe steht nicht in
  den Pins) – das braucht einmal Klaus' Ja im Suchfeld samt Ladebalken; Quelle zuerst family-projekt.de, sonst Hugging Face.
- **0.3.5 Backup-Ordner heißt „Privatakte_Backup_<Datum>_<Uhrzeit>“ (Klaus 17.11.: von der Familienakte unterscheidbar; Ortszeit):**
  `src/tresor.ts` legt diesen Ordner am gewählten Ort an und lässt den Klon hineinschreiben – darin liegt unverändert
  „Familienakte_Vollsicherung_…“, damit die Familienakte dasselbe Backup lesen kann (dort den Ordner „Privatakte_Backup_…“ wählen).
  Einlesen: Backup-Ordner selbst oder der Ordner darüber (jüngstes „Privatakte_Backup_…“); ältere Backups ohne den äußeren Ordner
  gehen weiter. Das Notfallblatt heißt nach dem äußeren Ordner. Am Tablet bestätigt (0.3.4): Importieren/Exportieren klappt.
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

- **`docs/ANPASSUNGEN-GEGENUEBER-FAMILIENAKTE.md` still mitführen** (Klaus 17.11.): eine Arbeitsdatei im Hintergrund wie diese hier. Bei jedem
  Schritt von selbst ergänzen, was beim Ausprobieren auffällt und was hier anders gemacht wird als in der Familienakte – ohne Klaus
  jedes Mal darauf hinzuweisen. Vorlage für die spätere Überarbeitung der Familienakte. Klaus geht die App Schritt für Schritt durch.

- **Klone nie von Hand ändern.** Verbesserungen entstehen im Quell-Repo und kommen nur über
  `node tools/klon-nachziehen.mjs <name> --quelle <pfad> [--stand <ref>]` herein. Beim Hinzufügen `git add -f klone/` nehmen
  (die Klone bringen eigene `.gitignore` mit) und danach `--pruefen`.
- Der Sortier-Kern bleibt **eine** Fassung: die aus dem Datei-Organizer.
- Keine echten Dokumente, keine personenbezogenen Daten, keine Schlüssel oder Passwörter im Repo. Das Repo ist öffentlich.
- Sichtbare Änderungen erst als Vorschau zeigen, Klaus sagt Ja. Veröffentlichen nur mit Klaus' Wort.
- Forschungseinträge gehören nur nach KimHub.
