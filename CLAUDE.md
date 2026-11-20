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

## Stand (20.11.2026, 0.9.4 – Klon 2.28.75, Steckbrief der Person)

- **Klon `familienakte` @ `ef1bb80`** (Familienakte 2.28.75, PR #222/#223 dort: übersichtlich, Steckbrief im Kern). `npm run bau` neu,
  gebündelte Teile (Kalender, Notiz, Seitenleiste, Tresor) laufen unverändert.
- **Steckbrief der Person** unter „Akten“ › Person (`steckbriefTeil`, `stb`, `stb-*` in `app.js`; `T().akten.steckbrief`, `kontaktSpeichern`,
  `steckbriefSpeichern`, `ausweisFoto` in `src/tresor.ts`): Karte über den Unterlagen, ab Werk zu (`pa_klapp.stb`), Zahl daneben; Kontakt,
  Ausweise & Nummern (verdeckt bis Tipp, „gültig bis“ rot/gelb, Foto = Unterlage „betrifft“ die Person), weitere Einträge; ein Stift für alles,
  Speichern nur über den Kern des Klons. Keine Erklärsätze.
- **Sechs Grundbereiche** immer auf der Startseite (PR #74, `GRUNDBEREICHE`).
- Fassung 0.9.4 (Code 94). Probe 518 grün, `test-native` 37 grün (lokal ohne Brain-Web). Am Tablet ungeprüft.
- **Veröffentlicht 20.11. (Klaus' Wort):** Android 0.9.4 (Release `v0.9.4`, Update-Server), Windows als CI-Download; Nachweis
  `docs/VEROEFFENTLICHUNG-0.9.4.md` – nicht erneut ausgeben; nächste 0.9.5 (Code 95). Abschlussbrief `docs/BRIEF_ABSCHLUSS_2026-11-20_KLON-STECKBRIEF-0.9.4.md`.
- **Familienakte, Fuß flach** (Klaus 20.11.): Repo `meine-familienakte` PR #224, Entwurf, nicht ausgegeben.

## Stand (19.11.2026 nachts, 0.9.3 – Telekom-Fenster; veröffentlicht, Nachweis `docs/VEROEFFENTLICHUNG-0.9.3.md`, nicht erneut ausgeben; nächste 0.9.4)

- **Klon `privat-brain-pro` @ `33775c1`** (Private Brain Pro 1.0.57, PR #155 dort): im Fenster „Mailkonto verbinden“ standen bei Telekom
  (oben, schon gewählt) keine Server – jede Anmeldung scheiterte, ohne die Telekom zu fragen. Klaus' Konto mit dem Umweg (anderer Anbieter,
  zurück zu Telekom) in beiden Apps verbunden. Fassung 0.9.3 (Code 93). Proben `test-native` 42, Web-Probe 506 grün.
- **Am Tablet bestätigt (Klaus 19.11.):** das Fähnchen meldete 0.9.2 und installierte sie über die App.
- **Nächste Sitzung:** `docs/BRIEF_SITZUNG_2026-11-20_FAMILIENAKTE-UEBERSICHTLICH.md` (Familienakte übersichtlich, Steckbrief einer Person).

## Stand (19.11.2026 abends, 0.9.2 – Passwort erneuern)

- **Klon `privat-brain-pro` @ `801ae1c`** (Private Brain Pro 1.0.56, PR #153 dort): Mail › „Weitere Aktionen“ › „Passwort erneuern“ für Konten
  mit Passwort (Klaus 19.11.: Telekom-Passwort geändert, beide Apps ohne Zugang). Fassung 0.9.2 (Code 92) – die erste, die sich über das
  Fähnchen meldet. Proben `test-native` 42, Web-Probe 506 grün. **Veröffentlicht 19.11.** (Nachweis `docs/VEROEFFENTLICHUNG-0.9.2.md`, nicht erneut ausgeben; nächste 0.9.3). Am Tablet ungeprüft.

## Stand (19.11.2026 abends, 0.9.1 – Symbol, Mail-Anzeige, Updates mit Fähnchen)

- **Klaus 19.11.: „Du kannst alles veröffentlichen, sobald es grün ist“; Symbol: Ja; Updates: Weg 1.**
- **App-Symbol ohne weißen Rand:** Hintergrund setzt die Ringfarben des Pro-Zeichens nach außen fort, Zeichen etwas größer; alle
  `mipmap-*` aus `tools/native/symbol-pro.py` (Vorschau `docs/vorschau-symbol-2026-11-19.png`).
- **Mail-Anzeige:** Klon `privat-brain-pro` @ `5164a4b` (Private Brain Pro 1.0.55: `<style>`-Inhalt nicht mehr als Mailtext, gespeicherte
  Texte beim Anzeigen bereinigt).
- **Updates mit Fähnchen (nur Android):** `DoUpdatesPlugin`, `UpdateFeed`, `Json` byte-gleich aus dem Klon `datei-organizer` @ `b3cd3a0`
  (dort PR #75: Ziel über Meta-Daten einstellbar). Ziel der Akte im Manifest: `https://family-projekt.de/updates/private-akte/`, App
  `private-akte`, Datei `Private-Akte-Pro-X.Y.Z.apk`, eigener Ed25519-Schlüssel (von Klaus in Termux erzeugt, geheimer Teil bei ihm mit `age`
  gesichert, Gegenprobe GLEICH; Geheimnisse `UPDATE_SIGNING_KEY`, `UPDATE_UPLOAD_KEY` in der Umgebung `android-production`; Server-Ordner
  angelegt). Recht `REQUEST_INSTALL_PACKAGES`, Cache-Ordner `update/`. In `app.js`: still geprüft nach dem Start, beim Zurückholen, höchstens
  alle 15 Minuten (Fehler: 2 Minuten); rotes Fähnchen „Update X.Y.Z“ neben der Fassung, Tipp lädt (Prozent), prüft (Größe, SHA-256, Paket,
  Zertifikat, versionCode) und öffnet Androids Installieren-Fenster; Tipp auf die Fassung prüft sofort. **Veröffentlichen:** Lauf „Android-App
  signiert“ mit `veroeffentlichen = ja` – GitHub-Release `v<Fassung>` und Update-Server (`tools/native/update-feed-android.mjs`, Feed
  gegen den Schlüssel im Manifest geprüft, von außen nachgeladen). Eine Fassung nur einmal. Windows ohne Updates.
- Proben: `test-native` 42 grün, Web-Probe 506 grün, Fähnchen im Browser mit gestellter Brücke. **Am Tablet ungeprüft.** 0.9.1 muss Klaus
  einmal von Hand über die vorhandene App installieren; erst ab der nächsten Fassung meldet sich das Fähnchen.
- **Veröffentlicht 19.11.2026 (Klaus' Wort):** Android 0.9.1 (Release `v0.9.1`, Update-Server), Nachweis `docs/VEROEFFENTLICHUNG-0.9.1.md` –
  nicht erneut ausgeben; nächste Fassung 0.9.2 (Code 92). Klaus hat sie am Tablet installiert. **Abschlussbrief:**
  `docs/BRIEF_ABSCHLUSS_2026-11-19_SYMBOL-MAIL-UPDATES-0.9.1.md`.

## Stand (18./19.11.2026, 0.9.0 – Pro-Akte)

- **0.9.0 Private Akte Pro für Android und Windows (Klaus 18.11., Freibrief; PR #60; Brief `docs/BRIEF_ABSCHLUSS_2026-11-18_PRO-AKTE-0.9.0.md`):**
  `android/` (Capacitor) und `windows/` (Tauri + Java-Engine) im selben Repo, Kennung `de.familyprojekt.privateakte`, Pro-Zeichen als Symbol
  und Favicon; Web-Paket `tools/native/web-paket.mjs` (nur Laufzeit-Teile der Klone); Gerätezugriffe byte-gleich aus den Klonen über
  `tools/native/klon-quellen.mjs` (nie abschreiben); Probe `node tools/native/test-native.mjs`. **Kopie an einem zweiten Ort** (Zweiter Ort der
  Familienakte, verschlüsselt, von selbst aktuell; „Exportieren“ › „Kopie einrichten“), Downloads in der App über „Speichern unter“,
  **Private Brain Pro als 1:1-Klon** `klone/privat-brain-pro` im Rahmen der App. Prüf-APK und Windows-Setup als CI-Downloads, nicht signiert,
  nicht veröffentlicht. Offen: Mail nativ, Workflow PDF Pro, mehrere Kopien (Brief). Fassung 0.9.0 gilt auch für die PWA.
- **Signatur vorbereitet (19.11., Brief 0.9.0 Punkt 1; Anleitung `docs/SIGNIERUNG.md`):** `tools/signing/` aus dem Organizer-Klon (Namen
  und Kennung geändert, Freigabe `PA_SIGNING_UNLOCK`, Umgebung `android-production`; „check“ nennt zusätzlich den SHA-1 für Google),
  `signing-identity.yml` (initialize/check, nur von Hand von `main`), `android-signiert.yml` (Release-APK mit der eigenen Signatur als Download,
  nichts veröffentlicht; bei PRs Probe mit Wegwerf-Identität). **Wartet auf Klaus:** Freigabe erzeugen und hinterlegen, „initialize“ laufen
  lassen. Windows bleibt unsigniert (Klaus 19.11.: „erst mal unsigniert lassen“).
  **Erledigt mit Klaus am 19.11.:** Umgebung `android-production` mit `PA_SIGNING_UNLOCK`, Identität angelegt (PR #62 Werkzeug auf `main`,
  PR #63 Identität; Actions darf hier keine PRs anlegen – der Lauf endet darum rot, den PR von Hand anlegen), Freigabe bei Klaus mit `age`
  gesichert, Google-Client „Private Akte Pro Android“ im Projekt `privat-brain-pro` (SHA-1 in `docs/SIGNIERUNG.md`). Erledigt: #60/#61 auf
  `main`, signierte APK gebaut und am Tablet installiert (unten).
- **Mail nativ in der Android-App (19.11., Brief 0.9.0 Punkt 2; Klaus: „weiter mit Mail nativ“):** in der APK läuft Private Brain Pro als
  **App-Seite** statt als Web-Seite: `tools/native/brain-web.mjs` lässt dessen `prepare-web.mjs` unverändert auf einer Kopie des Klons laufen
  (native/*.js, CSP, Texterkennung, Anleitungsfilm; Vorrat `.cache/privat-brain-pro/`), `web-paket.mjs --android` legt das Ergebnis nach
  `klone/privat-brain-pro/` und an die Wurzel, was dessen Java und Seite dort erwarten (`BRAIN_WURZEL`: `*-model(s).json`, `models/`,
  `vendor/pdfjs/`). Java: `klon-quellen.mjs` nimmt das ganze Paket `privatebrain/pro` und `hintergrund` aus dem Pin (78 Dateien gesamt;
  `tresor/` von dort ist byte-gleich mit dem der Familienakte und wird einmal übersetzt). **Die MainActivity der Akte erbt von der
  unveränderten MainActivity des Klons** (ProMailPlugin holt Gmail über genau diese Klasse; sie meldet die 17 Plugins an, beantwortet
  Modell-Adressen, regelt Links, Zurück und Neuaufbau) – die Akte meldet davor nur ihre vier Plugins an. Manifest: die Rechte aus dem
  Manifest von Private Brain Pro außer REQUEST_INSTALL_PACKAGES, sein Hintergrunddienst; Gradle: android-mail/activation 1.6.8,
  play-services-auth 22.0.0. Windows nimmt weiter die Web-Seite. Probe `test-native` 36 grün (lokal mit Node 24 und
  `NODE_USE_ENV_PROXY=1`; der Film kam über `PB_FILM_SOURCE` aus raw.githubusercontent, Pages ist hier gesperrt). Die App-Seite geht im
  Rahmen mit gestelltem Capacitor ohne Fehler auf. **Ungeprüft:** Gradle (kein Android-SDK in der Sitzung, erst die CI), alles am Gerät –
  vor allem, ob Capacitor-Aufrufe aus dem Rahmen ihre Antwort bekommen (Capacitor 8 antwortet über den Rahmen, der fragt). **Gmail** braucht bei
  Google einen OAuth-Client „Android“ für `de.familyprojekt.privateakte` mit dem SHA-1 aus `signing-identity.yml` › check; IMAP mit
  App-Passwort geht ohne. **Grenzen:** Updates von Private Brain Pro sind in der Akte aus (dessen Plugin lehnt fremde Kennungen ab);
  heruntergeladene Modelle (Bildbeschreibung, große Bedeutungssuche) und die Übersetzung hängen an Wurzel-Adressen und sind am Gerät
  ungeprüft; Mail unter Windows (Java-Engine von Private Brain Pro) nicht gebaut.
- **Am Tablet 19.11. (signierte APK 0.9.0, Lauf „Android-App signiert“ #6):** installiert, startet („0.9.0 · Pro“), Private Brain Pro
  läuft als App-Seite im Rahmen – aber „Mail wird geladen …“ blieb stehen, der Briefumschlag öffnete nichts. **Ursache:** Capacitor 8 nimmt
  Plugin-Aufrufe nur aus dem Hauptfenster an (`MessageHandler`: „Plugin execution is allowed in Main Frame only“); aus dem Rahmen gingen sie
  verloren – das gilt für jedes Tool im Rahmen (auch Organizer, Workflow PDF, Kalender). **Abhilfe:** `rahmen/capacitor-rahmen.js` (wie
  `windows/bridge/capacitor-tauri.js`): im Rahmen derselben Adresse nimmt die Seite `window.top.Capacitor`; `web-paket.mjs --android` setzt
  die Zeile als erstes Skript nach `<head>` in `RAHMEN_SEITEN` (nur im Paket; Klon und `rahmen/` im Repo bleiben). Probe stellt Capacitor 8
  nach (Rahmen antwortet nie): ohne Abhilfe rot, mit grün (38).
- **Am Tablet bestätigt (Klaus 19.11., 14:12, APK aus Lauf 44527171833):** Mail-Seite lädt ohne Hängen, Netz-Schalter richtig, Fenster
  „Mailkonto verbinden“ von Android öffnet, **Gmail angemeldet und Mails abgerufen**. **Offen:** Telekom (Passwort für E-Mail-Programme
  unbekannt, Telekom drosselt nach Fehlversuchen; Weg im Brief). **Abschlussbrief und Startauftrag:**
  `docs/BRIEF_ABSCHLUSS_2026-11-19_SIGNATUR-MAIL-NATIV.md`. 0.9.0 ist auf `main` (PR #60–#64) und damit auch als Web-App veröffentlicht.

## Stand davor (18.11.2026, 0.8.1)

- **Hülle:** `index.html`, `app.css`, `app.js` – die Vorschau aus PR #3 (0.1.5), von Hand geschrieben, ohne Bauschritt. Die Programme
  heißen „Tools“. Briefe: **`docs/BRIEF_SITZUNG_2026-11-19_PRO-AKTE-ANDROID-WINDOWS.md` (nächste Sitzung: Pro-Akte für Android und Windows, mit Startauftrag)**; `BRIEF_SITZUNG_2026-11-19_UEBERGABEN-UND-AUFRAEUMEN.md`; Plansitzung Bank/Portemonnaie/BookLedgerPro: `docs/BRIEF_PLANSITZUNG_2026-11-19_BANK-PORTEMONNAIE-BOOKLEDGER.md`. **Zwei Pläne vom 18.11. abends** (zwei Sitzungen): `docs/PLAN_2026-11-18_PORTEMONNAIE-BANK-BOOKLEDGER.md` – Bank als Fach im Portemonnaie, Konto frei anlegen, Verfahren, Monatsdatei, **Bauauftrag (gilt)**; `docs/PLAN_2026-11-18_PORTEMONNAIE-PRIVATE-BRAIN-ABLAGE.md` – Akte = letzte 5 Jahre nach Datum der Unterlage, Ausweise/Urkunden/Verträge immer in der Akte, Private Brain = älter, gemeinsamer Kern verschlüsselt auf SD-Karte erlaubt (noch nicht gebaut); Klaus' eigene Bank: Openbank (die App bindet an keine Bank); ältere unter `docs/`.
- **Erstes echtes Stück (0.2.0):** Abschnitt „Deine Unterlagen“ auf der Startseite. `src/tresor.ts` reicht an den unveränderten Tresor
  der Familienakte weiter (`klone/familienakte/app/local-vault.ts`: `browserVault`, `saveLocalDocument`, `listLocalDocuments`,
  `readLocalDocumentFile`, `dokumenteAussortieren`); `npm run bau` schreibt daraus `tresor.js` (eingecheckt; `npm run bau:pruefen` in der CI).
  Speicher: Browser-Speicher des Geräts (OPFS, sonst IndexedDB), dasselbe Register wie die Familienakte. Alles andere ist weiter Beispiel.
- **Klaus 17.11.:** die Vorschau allein erfüllt den Zweck nicht; einfach aussehen darf sie, darunter arbeitet die Mechanik der
  Familienakte – nichts davon neu schreiben. Claude entscheidet, wann zusammengeführt wird (kleine geprüfte Stücke gleich auf `main`).
- `tools/klon-nachziehen.mjs` – Klon anlegen/nachziehen und prüfen (`--pruefen`, läuft in der CI `pruefung`).
- `klone/datei-organizer/` – Datei-Organizer @ `c5a27f3` (0.4.21). `klone/workflow-pdf/` – Workflow PDF @ `fe2e20d` (1.1.10).
  `klone/familienakte/` – Familienakte @ `ec258cc` (Fassung 2.28.74 mit der Erkennung „am nächsten Tag“/„um halb drei“).
- **GitHub Pages** veröffentlicht `main` ab der Wurzel, also auch `klone/` (rund 340 MB, seit 0.5.0 mit Workflow PDF). Besser: Pages auf „GitHub Actions“ umstellen
  und nur die App-Dateien ausliefern – braucht einen Klick von Klaus in den Einstellungen des Repos.
- **Als Nächstes (Klaus 18.11.):** die offenen Punkte der Reihe nach (Brief vom 19.11.), dann **Private Brain**, **Portemonnaie**,
  **Familienbüro** (nur aufrufen, eigene App); BookLedgerPro später. Danach Tests mit Klaus (Design, Aufbau, Sinn). Keine zusätzlichen
  Gegenproben, keine Schleifen; was nicht fertig wird, mit einem Brief weitergeben.
- **Offen bei Klaus:** Familienbüro in der App (Vorschau) oder nur aufrufen (unten „Entschieden“); Portemonnaie offen oder gleich im Tresor.
- **Tresor exportieren / importieren (0.3.0, Klaus 17.11.):** Schild-Knopf „Sicherung“. Export = `writeFullFamilyBackup` des Klons mit
  Passwort (mindestens 10 Zeichen, PBKDF2 600.000 Runden) in einen gewählten Ordner, Notfallschlüssel und Notfallblatt; Import =
  `sicherungArt`/`sicherungProben`/`sicherungEinlesen` (Passwort oder Notfallschlüssel; volle Akte wird zusammengeführt, nichts
  überschrieben). Ordnername und Notfallblatt tragen den Namen „Familienakte“ – sie kommen unverändert aus dem Klon, damit die
  Familienakte dieselbe Sicherung lesen kann. Braucht die Ordnerwahl des Browsers (Chrome/Edge); am Handy ungeprüft.
- **0.8.1 Konto herausnehmen; Aufräumen der PRs (Klaus 18.11., Freibrief):** im Stift eines Kontos ein Papierkorb (`pm-konto-weg`, mit Rückfrage) → `T().bank.kontoEntfernen` (archiviert wie `geld.entfernen`; Umsätze und Kontoauszüge bleiben). Umbenennen geht schon über den Stift. **Zwei Sitzungen hatten 0.8.0 gleichzeitig gebaut:** weitergeführt ist Weg A (#56 hier, BookLedgerPro #481, Basic #58); Weg B (#55, BLP #480, Basic #57) geschlossen, sein Format der Monatsdatei (`format:`) liest BookLedgerPro nicht. Aus B nachgetragen: Fächerwahl beim Einlesen der Monatsdatei in BookLedgerPro (#482, Basic #59) und dieses Herausnehmen. Klon `klone/bookledger` bleibt @ `5f7424c` (die zehn Dateien sind in `c597c11` unverändert). Alte Doku-PRs BLP #393/#417, Basic #37 geschlossen (überholt). Probe 506 grün. Am Tablet ungeprüft.
- **0.8.0 Bank im Portemonnaie (Klaus 18.11., Plan `docs/PLAN_2026-11-18_PORTEMONNAIE-BANK-BOOKLEDGER.md` Abschnitte 5/6):** das Portemonnaie hat
  drei Reiter **Bargeld · Bank · Summe** (`pm.fach`, gemerkt `pa_pm_fach`). **Konto** frei angelegt (Bank, Kontoname, IBAN freiwillig – gezeigt und
  weitergegeben nur die letzten vier Stellen, Anfangssaldo, Verfahren von Hand/CSV/CAMT/MT940/PDF/Excel; mehrere Konten, Stift ändert) = Datensatz
  `object` mit Merkmal `bankkonto`; **Umsatz** = `payment` mit Merkmal `bank` (Konto, Richtung, Tag, Gegenseite, `zurKasse`, Doppelten-Schlüssel);
  **Kontoauszug** = Unterlage „Finanzen & Konten“ mit `payment → document „Kontoauszug“` (nur, wenn etwas Neues drin war). `T().bank` in `src/tresor.ts`:
  `lesen` (MT940/CAMT `bankimport.js`; CSV/Excel `bankCsv.js`/`xlsxZeilen.js` mit Spalten-Zuordnung, **am Konto gemerkt**, Windows-1252; PDF über die
  Textebene/Texterkennung der Akte und `leseAuszugText` – als **Vorschlag**, jede Zeile Text und Betrag änderbar, unsichere gelb), `uebernehmen`
  (doppelte nur einmal, „N waren schon da“), `eintragen` (von Hand), `zurKasse`, `bericht` (Kassenbericht aus BookLedgerPro), `monatsdatei`.
  Saldo, der nicht aufgeht, steht rot; übernommen wird nur auf Tipp. **Barabhebung:** am Automaten von selbst „zur Kasse“ (Text wie
  Bargeldauszahlung/Geldautomat/GA; Knopf in der Zeile schaltet um), im Bargeld Haken „vom Konto“; die **Summe** nimmt, was auf beiden Seiten markiert
  ist, aus rein/raus heraus (`pmAbschluss`). **„An BookLedgerPro geben“ = Monatsdatei** `portemonnaie-JJJJ-MM.json` (Fassung 1, `baueMonatsdatei`
  aus dem Klon – dasselbe Format, das BookLedgerPro liest), **„Als Tabelle“** = die CSV wie bisher. Klon `klone/bookledger` @ `5f7424c` (BookLedgerPro
  #481: `bankCsv.js`, `xlsxZeilen.js`, `portemonnaieImport.js` dort neu gebaut, Basic #58 nachgezogen) mit `bankimport.js`, `bankschema.js`,
  `auszugText.js`, `vorschau.js`. PDF-Lesen ist in BookLedgerPro hinter dem Vorschau-Schalter (89 % ganz richtig) – hier darum nur Vorschlag.
  Keine Erklärsätze dazugekommen. **Nicht gebaut:** FinTS, PSD2, Mails der Bank, alte .xls; Umsatz ändern (nur herausnehmen und neu). Probe 502 grün (40 neu: Bank in Handy- und PC-Breite). Am Tablet und mit echten Bankdateien ungeprüft.
- **0.7.7 (Klaus 18.11., Bild vom Tablet):** neben „Alle Kategorien“ (und „Alle Jahre“, „Alle Absender“ …) steht die **Zahl der
  Kategorien**, nicht der Unterlagen (der Hinweis nennt beide); bei „Alle Personen“ in „Akten“ die Zahl der Personen. Die Ordner
  darunter zählen weiter ihre Unterlagen. **Baum:** der Satz „Eine App. In der Mitte die Akte, an den Ästen die Tools.“ und der Link
  „Wo liegt was? ↓“ sind heraus (Klaus: das Bild erklärt sich selbst; „Wo liegt was?“ steht darunter). **Regel:** keine Erklärsätze unter
  Bildern oder Überschriften. Klon Datei-Organizer 0.4.21 nachgezogen (@ `c5a27f3`, dort PR #74, dieselbe Zählung im Baum von „Finden“;
  APK/Windows 0.4.21 erst ab Montag 23.11. – siehe `CLAUDE.md` dort). Probe 460 grün.
- **0.7.6 Unterlagen wie „Finden“ im Datei-Organizer (Klaus 18.11., Bilder vom Tablet):** an jeder Zeile in „Deine Unterlagen“, „Akten“
  und „Eingang“ Auge, Stift, Papierkorb (`echtReihe` in `app.js`), rechts die Archivnummer aus dem Organizer. **Auge** oder Tipp auf die
  Zeile klappt den **Steckbrief** direkt darunter auf (`echtSteckbrief`, `echt.sb`), ein zweiter Tipp schließt ihn: Kurzsatz („Rechnung,
  von …, vom …, für …, über …, Frist …“ aus der Notiz des Organizers), Liegt in, Datei, Art, Bereich, Absender, Betrifft, Akten, Datum,
  Frist (überschritten rot), Betrag, Abgelegt; Knöpfe Vorschau (Auge: PDF Seite 1–3 bzw. das Foto, `echtVorschau`), Teilen (Teilen des
  Geräts, sonst Herunterladen), Stift, Termin dazu, Lesen und darin suchen, Öffnen, Mit Workflow PDF bearbeiten, Aus der Akte nehmen;
  darunter „Erkannter Text“ (`textAuszug`). **Einordnen (Vorschlag umgesetzt):** kein Fenster mehr – der Stift klappt unter der Zeile
  Bereich (auswählen oder neue Kategorie eintippen; `T().bereichSetzen` = `dokumenteBereichSetzen` des Klons), Person, Akten, Absender
  mit Übernehmen/Abbrechen auf. In den Suchtreffern öffnet eine Unterlage weiter das Fenster (`fEcht`). **„Alle Unterlagen“** ist ein
  Knopf zum Einklappen wie „Alle Kategorien“ (`listeKopf`, gemerkt `pa_klapp.eliste`); sind beide zu, werden die Karten niedrig und
  „Fällig“/„Bereiche“ rutschen hoch (`beidezu` in `kartenHoehe`). Der Rollstand der Liste bleibt beim Auf- und Zuklappen (vorher sprang
  sie nach oben). **Datei-Organizer 0.4.20 nachgezogen** (@ `ef33e0c`, dort PR #72): in „Finden“ öffnet das Auge den Steckbrief unter der Zeile
  (zweiter Tipp schließt), die Wurzel heißt „Alle Kategorien“ usw., die Liste rechts klappt ein, beide Karten höchstens fensterhoch. Probe 460 grün. Am Tablet ungeprüft.
- **0.7.5 Kartenhöhe an das Fenster angepasst (Klaus 18.11.: „die rechte Karte höchstens so groß wie die linke, beide höchstens so
  hoch wie der Bildschirm, darin rollen“; dann: „an die Fensterhöhe anpassen, unten ist noch zu viel Platz“):** `kartenHoehe` in `app.js`
  misst nebeneinander, wo die Karten anfangen und was darunter steht („Fällig“, „Bereiche“), und gibt beiden Karten genau die Höhe bis
  zum unteren Fensterrand (mindestens 300 px); der Baum rollt in seiner Karte, rechts rollt nur die Liste, die Überschrift bleibt
  stehen. Untereinander (Handy): Baum höchstens halbe, Liste ganze Fensterhöhe. Neu gerechnet bei jedem Zeichnen, beim Aufklappen und
  bei Größenänderung des Fensters; gilt auch für „Akten“. Probe 440 grün.
- **0.7.4 Empfang aus dem eigenständigen Datei-Organizer (Klaus 18.11.: „Basic soll an die Private Akte übergeben“):** der Organizer
  0.4.19 (Web-App) öffnet `/Private-Akte/?empfang=organizer` im selben Browser; sobald der Tresor offen ist, meldet die Akte dem
  öffnenden Fenster „pa-empfang-bereit“ (alle 0,5 s, höchstens 2 Minuten) und nimmt dasselbe Paket wie aus dem Rahmen an
  („pa-organizer-uebergabe“ → Fenster „Ordner in die Akte legen“, Antwort „pa-organizer-angenommen“; `empfang`, `empfangStarten` in
  `app.js`). Nur Fenster derselben Adresse. Der Organizer im Rahmen der Akte ist unverändert. Klon Datei-Organizer @ `eac6cb9` (0.4.19:
  dazu in APK/Windows „An die Familienakte übergeben“ – Sortierung in den Ordner, Familienakte wählt ihn als Eingangsordner).
  Probe 438 grün (Empfang mit gestelltem Fenster). Über Pages und am Tablet ungeprüft.
- **0.7.3 Zwei Karten wie „Finden“ im Organizer, Akten als Baum mit Pfad, Schnellauswahl, Beispielfamilie (Klaus 18.11., Bilder vom Tablet):**
  (1) **„Deine Unterlagen“** (`echtAbschnitt`, `echtBaum`): links die Karte mit dem Baum (Wurzel „Alle Kategorien“, beim Sortieren nach
  Datum „Alle Jahre“ usw., zusammenklappbar, Baumlinien und Ordnerzeichen wie im Organizer), rechts die Karte mit dem gewählten Ordner
  (Überschrift und Zahl, die Unterlagen) – nicht mehr alles untereinander. Schmal (unter 900 px) untereinander; am großen Monitor breiter
  (`main` 1440 px ab 1500 px, 1680 px ab 1900 px). „Sortieren“ und der Richtungs-Pfeil stehen darüber. (2) **Gleiche Bereiche in
  anderer Schreibweise sind ein Ordner** (`kanonBereich`; Klaus hatte „Haus und Wohnung“ von Hand eingetragen). (3) **Akten**
  (`vAkten`): ebenso zwei Karten – links „Alle Personen“ › Person › ihre Akten (und „ohne Akte“), „Gemeinsam“ (Akten ohne Person),
  „Ohne Akte“; rechts die Unterlagen, darüber der **Pfad** wie im Explorer („Alle Personen › Anna Beispiel › Auto“). Die Reiter je
  Person sind dafür weg; „+ Person“, „+ Neue Akte“ stehen oben. (4) **Beispielfamilie** (Klaus: „erfinde erst einmal Familienmitglieder“):
  Knopf „Beispielfamilie anlegen“ (nur ohne Personen): vier erfundene Personen (Anna, Bernd, Clara, Paul Beispiel) mit Akten, drei
  gemeinsame Akten, die vorhandenen Unterlagen nach Bereich verteilt (nur Verknüpfungen, Quelle „Beispielfamilie“); „Beispielfamilie
  entfernen“ archiviert sie und löst ihre Verknüpfungen, die Unterlagen bleiben (`akten.beispielAnlegen`/`beispielEntfernen`).
  (5) **Bereiche = Schnellauswahl** (Klaus: „ich brauche was vom Arzt, klicke gleich da rein“): ein Tipp öffnet den Ordner im Baum samt
  Unterordnern; die Knöpfe füllen erst eine Reihe, dann die nächste, höchstens drei Reihen, danach seitlich zu schieben
  (`kachelRaster`); Größe der Knöpfe unverändert (Klaus: „nicht größer ziehen“). Probe 437 grün. Am Tablet ungeprüft.
- **0.7.2 Ordnerbaum wie im Datei-Organizer, Richtung, Pfad, Einordnung nachtragen (Klaus 18.11., Bilder vom Tablet):**
  (1) **Ordnerbaum** über „Deine Unterlagen“ jetzt zweistufig wie im Finden des Organizers (`echtBaum`, `echtUnter`): unter einem Bereich
  die Art der Unterlage (Rechnung, Brief, Befund … – kommt seit 0.7.2 als „Art: …“ mit der Übergabe, sonst die Art der Datei), unter einem
  Jahr die Monate (nach dem Kalender), unter Person/Absender/Dateiart der Bereich; Tipp auf eine Gruppe wählt sie und klappt ihre
  Unterordner auf. (2) **Richtung:** Pfeil neben „Sortieren“ (`#echt-richtung`, gemerkt `pa_sort_ab`) dreht Liste und Jahre um.
  (3) **Pfad** an jeder Zeile (`echtPfad`: „Pfad: …“ aus der Übergabe, sonst der Dateiname), gekürzt Anfang … Ende (`kurzPfad`), ganz in
  der Hinweisblase mit der Maus (`data-immer`, auch bei abgeschalteten Tooltips); die Größe steht nur noch bei „Sortieren: Größe“.
  (4) **Einordnung nachtragen (Befund an Klaus' Bildern: 102 Unterlagen blieben unter „Familie & persönliche Dokumente“, weil die
  zweite Übergabe Vorhandenes nur übersprang):** `organizer.uebernehmen` findet vorhandene Unterlagen über die Prüfsumme und setzt
  Bereich, Datum und die Angaben des Organizers (Art, Pfad, Absender, Person …) – einmal am Ende über `akteFuerAbgleich`/
  `akteNachAbgleichSchreiben`; die Meldung sagt es. **Datei-Organizer 0.4.18** (dort PR #68): Pfeil für die Richtung nach Datum im Finden,
  Monate nach dem Kalender, Ladeanzeige bei „An die Private Akte übergeben“. Probe 429 grün, Organizer-Probe 213 grün. Am Tablet ungeprüft.
- **0.7.1 Private Brain, Portemonnaie, Familienbüro (Klaus 18.11., Freibrief; Portemonnaie „gleich im Tresor“, Familienbüro „nur aufrufen“):**
  **Private Brain:** die Stadt öffnet im Rahmen die echte, veröffentlichte Web-App unter ihrer eigenen Adresse (`RAHMEN.brain`,
  `../Privat-Brain-Pro/`), unverändert. Kein Klon: die Web-Seite entsteht dort erst durch `build:web`, ein Klon Datei für Datei liefe
  nicht (und brächte 98 MB). Die Browserfassung holt Mails nur über einen eigenen Mail-Dienst; echte Geräte-Mail gibt es nur in der
  Android-/Windows-App. Dieselbe Adresse (github.io) heißt: derselbe Speicher wie die eigenständige Private-Brain-Web-App.
  **Nicht gebaut:** Mail mit Anlagen → Unterlage (braucht eine Übergabe-Stelle im Repo Privat-Brain-Pro wie `DO_RAHMEN` im Organizer).
  **Portemonnaie** (`T().geld`, `portemonnaie()` in `app.js`): Posten = Datensatz `payment` im Register (Titel, Cent, Richtung, Tag,
  wofür; Merkmal `portemonnaie`), Bon = Unterlage („Einkäufe, Rechnungen & Garantien“) mit `payment → document „Beleg“`; Betrag vom
  Bon gelesen und nur vorgeschlagen (`bonBetrag`). Rechnen: `klone/bookledger` (BookLedgerPro @ `9df9bee`, nur `money.js`,
  `kassenbuch.js`, `LICENSE`; `kassenbericht` mit Anfangsbestand = alles vor dem Monat). `tagesabschluss.js` **nicht** übernommen – es
  hängt an `journal.js` (doppelte Buchführung, Umsatzsteuer) und braucht das Portemonnaie nicht. Monat blättern, „An BookLedgerPro
  geben“ = CSV des Monats, Posten herausnehmen = archiviert. Gelber Knopf oben öffnet das Portemonnaie. Knöpfe im Portemonnaie dezent, hell getönt in seiner Farbe (`.pm-knopf`, Klaus 18.11.: „nicht in Vollton, dem Portemonnaie angepasst“).
  **Familienbüro:** Stadt und Leiste öffnen die eigene App (`../Familienbuero-Pro/`, neues Fenster); das Beispiel-Fenster „Familienbüro“
  ist nur noch über die Beispiele hinter „Finden“ erreichbar. **Workflow PDF:** „PDF ausgeben“ trägt in der Akte die Farben eines
  gewöhnlichen Knopfs (`rahmen/wfpdf-thema.css`, nur Farben). Probe 420 grün. Am Tablet ungeprüft, Private Brain und Familienbüro
  über Pages ungeprüft (die Sitzung erreicht Pages nicht; in der Probe gestellt).
- **0.7.0 Akten, Unterlagen, Dateien (Klaus 18.11. abends, Antworten A–F):** A ja (Datei = Rohmaterial im Organizer, Unterlage = in
  der Akte, Akte = Fach mit Namen, einer Person zugeordnet oder allen), B ja (Personen unter „Akten“, Register der Familienakte), C ja
  (mehrere Akten je Unterlage), D ja, E **echt machen**, F Klaus leert selbst. Gebaut: `T().akten` in `src/tresor.ts` – Person =
  Datensatz `person`, Akte = `case` (Art „Akte“) mit `case → person „betrifft“`; Unterlage → Akte `gehört zu` (confirmLocalContextLink),
  → Person `betrifft` (dokumenteZuordnen), → Absender = `organisation` mit Verknüpfung „Absender“. Lösen über
  `akteFuerAbgleich`/`akteNachAbgleichSchreiben` (der Klon hat sonst nur „Vorgangsbezug lösen“). **Akten** (`vAkten`): Reiter je Person
  („Alle“, Namen, „+ Person“), darunter die Akten mit Zahl, „Alles zu <Person>“ bzw. „Ohne Akte“, „Neue Akte“; eine Akte zeigt ihre
  Unterlagen, „Unterlagen hineinlegen“ (Haken). **Eingang** (`vEingang`) ist echt: Unterlagen ohne Akte und ohne Person; die Zahl steht in
  Leiste/Seitenleiste. **Einordnen** an jeder Unterlage und beim Ablegen (`zuordnenFelder`): Personen-Haken + neue Person, Akten-Haken +
  neue Akte (gehört der ersten gewählten Person), Absender. Person aus der Notiz des Organizers zählt weiter (`echtPersonen`), von Hand
  gesetzt geht vor. **Übergabe aus dem Organizer:** ab Werk nur Unterlagen angehakt (nicht `Angebot/Werbung`, `Foto`, `Unklar`, Gesperrtes;
  „Alle anhaken“), Feld „Akte für alle“. **Startseite:** Bereiche-Kacheln echt (Bereiche mit Unterlagen, Zahl; Tipp zeigt den Bereich im
  Baum), „Zuletzt abgelegt“ (Beispiel) heraus. **Termin dazu** an jeder Unterlage (Frist/Aufgabe des Klons mit Bezug). Beispiel-Kalender
  (`kalender()`), Beispiel-Notiz (`fNotiz`) und „Bearbeiten mit › Kalender“ sind heraus. Gelber Knopf oben: Portemonnaie-Symbol statt
  Kamera (Klaus 18.11.: die Kamera war irreführend). `echtLaden` lässt nur den jüngsten Lauf gelten. Probe 414 grün. Am Tablet ungeprüft.
  **Grenzen:** Akte umbenennen/auflösen und Person ändern/löschen gibt es noch nicht; die Beispiele hinter „Finden“ (Beispiel-Treffer,
  „Bearbeiten mit“) sind noch da.
- **Am Tablet bestätigt (Klaus 18.11. nachmittags, 0.6.2):** die verschiebbare Seitenleiste („Flying Widget“) „funktioniert wunderbar“.
  Darauf: sie bleibt jetzt bis 1400 px Breite stehen (geteilter Bildschirm, Tablet quer), erst am großen Monitor nicht (0.6.3).
- **0.6.5 Navi-Leiste (Klaus 18.11.: „das Flying Widget ist unsere Navigationsleiste“):** am Handy gibt es die untere Leiste
  (Start, Akten, Eingang, Baum) nicht mehr – die Seitenleiste führt, „Eingang“ trägt dort seine Zahl. Am breiten Bildschirm steht sie
  links und klappt mit dem Pfeil oben zu einer schmalen Spalte nur mit Symbolen ein (`navZu`, gemerkt `pa_nav_zu`).
  **Im Datei-Organizer der Akte** (dort 0.4.17, PR #67; als **0.6.6** nachgezogen, Klon @ `edd8987`): die grüne Leiste oben ist einklappbar, am Handy ab Werk zu (die Seitenleiste
  des Organizers führt); der Verlauf hat eine Zeile mit „Alle“, Sortieren, Papierkorb und Rückgängig als Symbol, „Gelernt“ steht nicht
  mehr auf der Seite (läuft im Hintergrund, bleibt erhalten), „Korrekturen“ und „Stichprobe“ sind einklappbar. Die Leiste bleibt grün
  (`rahmen/organizer-thema.css`). Der Organizer ist in Akte und eigenständiger Web-App derselbe Stand, nur die Farben unterscheiden sich.
- **0.6.5 Datei-Organizer 0.4.16 nachgezogen** (@ `5eb1882`, dort PR #66; Klaus 18.11.: „den blauen Container komplett rausnehmen“):
  unten nur eine schmale Zeile mit Family-Projekt, Fassung, Impressum, Datenschutz, Haftungsausschluss, Lizenz, Hilfe; die Rechtsseite
  des Organizers hat neu Haftungsausschluss und Lizenz.
- **0.6.4 Klon der Familienakte nachgezogen** (@ `ec258cc`, dort PR #221): die Notiz erkennt „am nächsten Tag“ (der Tag nach heute)
  und „um halb drei“ (14:30). Probe prüft genau diesen Satz im echten Notiz-Fenster (383 grün).
- **0.6.3 Datei-Organizer 0.4.15 nachgezogen (Klaus 18.11., nach dem Test am Tablet bestellt, gebaut im Repo Datei-Organizer, dort PR #65):**
  „bitte prüfen“ mit „Alle auswählen“/„Alle übernehmen“; Verlauf mit Sortierung und „Aus Verlauf löschen“ (ohne rückgängig zu
  machen – Rückgängig ist ein eigener Knopf, das Gelernte bleibt); „Sortieren“ statt „Sicht“ in Finden; flache Zeilen; eigene
  Seitenleiste (Griff rechts); **Kopf im Rahmen nur noch eine Zeile** – zusammen mit der Leiste der Akte am Handy zwei Zeilen
  (gemessen 43 + 47 px; seit 0.6.6 am Handy nur 43 px, die Leiste des Organizers ist dort ab Werk eingeklappt). Klon @ `f7ecb24`. Probe 381 grün. Am Tablet ungeprüft. Die Seitenleiste im Organizer ist dessen eigene
  (nicht verschiebbar wie die der Akte); in Workflow PDF gibt es noch keine.
  **„Wen es betrifft“ und „Absender“ unter „Sortieren“ (Klaus 18.11.: „ein Ordner für die Familienangehörigen – dasselbe bitte in die
  Privatakte“):** der Baum über „Deine Unterlagen“ gruppiert auch danach (`echtAngabe` in `app.js`); die Angaben kommen aus der
  Notiz, die der Organizer bei der Übergabe schreibt („Absender: … · Person: …“). Unterlagen ohne Übergabe aus dem Organizer stehen
  unter „ohne Angabe“ – von Hand setzen lässt sich die Person in der Akte noch nicht.
  **Klaus' Frage „Akten“ gegen „Deine Unterlagen“ (18.11.):** „Deine Unterlagen“ ist echt (Tresor); „Akten“, die sechs „Bereiche“ der
  Startseite, „Eingang“ und „Zuletzt abgelegt“ sind noch die Beispiele der ersten Vorschau. **Vorschlag dazu, nicht gebaut, wartet auf
  Klaus' Ja je Punkt:** `docs/VORSCHLAG_2026-11-18_AKTEN-UNTERLAGEN-DATEIEN.md` (Datei = Rohmaterial, bleibt draußen; Unterlage = in
  die Akte gelegt; Akte = benanntes Fach, einer Person zugeordnet). Klaus: erst gemeinsam durchgehen, nichts überladen.
- **Am Tablet bestätigt (Klaus 18.11., 12:42, 0.6.0/0.6.1):** Notiz einsprechen mit Datum und Uhrzeit trägt Tag und Uhrzeit ein („funktioniert
  astrein, genau wie ich es wollte“); die Glocke steht rot mit Zahl in der Leiste des Kalenders; „In den Kalender“ zeigt seinen
  verbundenen Google-Kalender – die Verbindung (`familienakte-kalender-v1`) teilt sich die Akte mit der Familienakte unter derselben
  Adresse. Ob Einträge aus der Akte dort wirklich ankommen (Anmeldung, Rückkehr-Adresse), ist damit noch nicht gezeigt.
- **0.6.2 „Deine Unterlagen“ mit Baum, flachen Zeilen und Blättern (Klaus 18.11.: „die Sicht aus dem Finden des Datei-Organizers, mit
  dem einklappbaren Alle-Dateien-Knopf – da sehe ich, wie viele es sind“; „Container viel kleiner, an den Text angepasst“):**
  oben „Alle Unterlagen“ mit der Gesamtzahl (`echtBaum` in `app.js`); ein Tipp klappt die Gruppen mit ihren Zahlen auf, ein Tipp auf
  eine Gruppe zeigt nur sie. Gruppiert wird nach dem, was unter **„Sortieren“** gewählt ist (hieß „Sortiert nach“): Art der Datei
  (neu), Jahr bei „Datum der Unterlage“, sonst der Bereich. Die Liste zeigt je 30 Stück, „Weitere zeigen“ holt mehr (erledigt den
  offenen Punkt „lange Liste bei 100 Stück“). Zeilen dort höchstens 44 px hoch, die Marke „echt“ steht nicht mehr an jeder Zeile.
  Der Text unten auf der Startseite („Vorschau … Gespeichert wird nur …“) ist heraus (Klaus 18.11.).
  Im Kopf „Deine Unterlagen“ steht nur noch die Zahl (am Handy eine Zeile statt zwei). Die Seitenleiste führt jetzt auch zu „Akten“ und
  „Eingang“; ihr Griff sitzt unterhalb der Mitte (64 %), damit er nicht mit der Seitenleiste mancher Handys (Samsung, meist oben
  rechts) zusammenfällt – am Gerät ungeprüft, die Randgeste von Android lässt sich von der Seite aus nicht abstellen.
  **Verschiebbar und selbst verankert (Klaus 18.11., für Linkshänder: „wie ein Flying Widget, das ich selbst fahre“):** den Griff
  lange drücken oder ziehen – er wird rund mit vier Pfeilen, folgt dem Finger und verankert sich beim Loslassen am linken oder rechten
  Rand (Höhe frei) oder **unten** (`leistePos`, gemerkt `pa_leiste`). Unten angedockt liegt der Griff quer, die Knöpfe klappen nach
  oben auf, und die untere Leiste der Akte (Start, Akten, Eingang, Baum) tritt am Handy zurück – die Seitenleiste ersetzt sie dann.
  Die Zahl am „Eingang“ der unteren Leiste ist dann nicht zu sehen (offen).
  **Vorschläge beim Tippen oder Sprechen (Klaus 18.11.: „wie bei den E-Mails von Microsoft – die ersten Buchstaben, und er zeigt
  schon, was es sein könnte“; „nicht, dass wir was zerschießen im Kern“):** ab zwei Zeichen stehen unter dem Suchfeld bis zu sechs
  Unterlagen (`suchVorschlaege`, `#suchvor` in `app.js`): jedes Wort muss ein Wortanfang im Titel, Dateinamen, Bereich, in der Notiz
  oder im gelesenen Text sein (Titel zählt doppelt), dazu die Treffer der Wortsuche des Klons. Nur eine Vorschau der Hülle – „Finden“
  und der Kern (Wortsuche, Bedeutungssuche) sind unverändert; die Bedeutungssuche läuft nicht je Buchstabe mit (zu langsam am Tablet).
  Tipp auf einen Vorschlag öffnet die Unterlage. Gemessen in der Probe: wenige Millisekunden je Eingabe bei rund 35 Unterlagen; mit
  100 und langen Texten am Tablet ungemessen. Nicht gebaut: Vorschläge aus Notizen und Terminen, Tippfehler-Nachsicht.
  **Parallel im Repo Datei-Organizer bestellt (Klaus 18.11., dort 0.4.15, eigener Zweig):** „Alle übernehmen“ bei „bitte prüfen“,
  Verlauf sortieren und Einträge löschen ohne Rückgängig, „Sortieren“ statt „Sicht“, flachere Zeilen, Seitenleiste, Kopf höchstens
  zweizeilig. Kommt über den Klon herein, sobald es dort auf `main` ist.
  Probe 374 grün (Baum, Vorschläge, Seitenleiste: Akten/Eingang, verschieben, unten andocken). Am Tablet ungeprüft.
- **0.6.1 Seitenleiste in der Akte, im Handyformat (Klaus 18.11.: „am Handy auf jeden Fall, weil da die anderen Funktionen
  reingepackt werden können – hochscrollen, runterscrollen“; am Monitor nicht nötig):** Griff am rechten Rand (`seitenleisteZeigen`
  in `app.js`, Maße und Aussehen wie `.seitenleiste` der Familienakte, für die Hülle ohne React geschrieben), nur unter 1000 px
  Breite. Ein Tipp zeigt: nach oben, nach unten, Zurück (wenn es einen Schritt zurück gibt), Startseite, Baum – und darunter, was
  sonst hinter „⋯“ liegt (Importieren, Exportieren, Drucken, Farbpalette, Hilfe). Jeder Tipp klappt sie wieder zu; bei offenem
  Fenster, Menü oder Rahmen tritt sie zurück (im Kalender läuft die Leiste des Klons selbst). „⋯“ oben bleibt vorerst daneben stehen
  (doppelt; ob es weg kann, entscheidet Klaus nach dem Test).
  **Erkennung von Tag und Uhrzeit in der Notiz (Klaus 18.11.: „am nächsten Tag“, „um so und so viel Uhr“):** das Notiz-Fenster des
  Klons füllt Tag und Uhrzeit aus dem Text und klappt bei „erinnere“ den Erinnerungs-Teil auf. Nachgemessen: morgen, übermorgen,
  Wochentag, „24. Dezember“, „3.12.“, „um 9 Uhr“, „8:30 Uhr“, „in 2 Stunden“ stimmen; **„am nächsten Tag“ stand auf heute, „um halb
  drei“ ergab keine Uhrzeit** – behoben in der Familienakte selbst (Repo `meine-familienakte` hereingeholt, PR #221 dort,
  `erinnerungAusText`); **der Klon hier wird nachgezogen, sobald #221 dort zusammengeführt ist** (bis dahin gilt in der Akte noch der alte Stand). Ein Satz nur mit Uhrzeit ohne das Wort „erinnere“ ergibt
  weiter keinen Vorschlag (so in der Familienakte entschieden) – dann „Erinnern lassen“ von Hand anhaken.
  Probe 329 grün (9 neu zur Seitenleiste). Am Tablet ungeprüft.
- **0.6.0 Kalender und Notizen echt (Klaus 18.11., Freibrief; „die richtige Kalenderansicht wie in der Familienakte“):** der violette
  Knopf „Kalender“, die Stadt „Kalender“ im Baum und „Notiz“ öffnen im Rahmen die **Ansichten der Familienakte selbst** – „Mein
  Kalender“ (Monat, Tagesliste, „+ Eintrag“, erledigt, Stift), das Notiz-Fenster (schreiben, sprechen, Foto; Tag und Uhrzeit werden
  aus dem Text erkannt, „Erinnern lassen“ trägt in den Kalender ein), „Notiz bearbeiten“, Löschen, die App-Glocke, „Kalender
  verbinden“. Gespeichert im selben Tresor wie die Unterlagen (Register des Klons: Aufgaben, Fristen, Erinnerungen, Notizen) – also
  auch im Backup und für die Familienakte lesbar.
  **Entschieden – die offene Frage aus dem Brief: Weg B.** Die React-Ansichten des Klons werden gebündelt, nicht nachgebaut
  (nachgesehen: sie hängen nur an `vaultHandle`, `records`, `relations` und an Bausteinen, die esbuild mitnimmt; kein Next, kein
  globaler Zustand). `src/kalender-seite.tsx` ist nur das Gestell (Tresor öffnen, Register lesen, Ansichten hinstellen, Liste
  „Notizen“ aus Bausteinen des Klons); `npm run bau` schreibt `rahmen/kalender/kalender.js` und `kalender.css` (eingecheckt,
  `bau:pruefen` vergleicht). Die Seite `rahmen/kalender/index.html` läuft im Rahmen, damit die Stile der Familienakte gelten, ohne
  die der Hülle zu berühren. Neue Bau-Abhängigkeiten in denselben Fassungen wie im Klon: react, react-dom, lucide-react,
  tailwindcss (+ `@tailwindcss/node`, `@tailwindcss/oxide`).
  **Aussehen (Klaus 18.11. mitten in der Sitzung: Knöpfe rutschten aus der Reihe, zweiter Kreis ums Fragezeichen):** Ursache war die
  Stildatei ohne Tailwind-Grundstil und eine eigene Umgebung. Jetzt: Stildatei mit Tailwind gebaut wie in der Familienakte, die
  Ansichten stehen in derselben Umgebung (`app-shell` › `site-main`). **Regel:** Maße, Lage und
  Form der Knöpfe aus dem Klon nicht verändern und nichts dazubauen; `rahmen/kalender/seite.css` enthält nur Breite und Abstand der Karten.
  **Höhe am Handy (Klaus 18.11.: „die Höhe ist entscheidend … nicht in so monströsen Buttonformen oben“, „du verschenkst eine
  ganze Containerreihe“):** (1) die Bestätigung in der Leiste des Rahmens ist eine flache Zeile, seitlich zu schieben (gilt für alle
  Tools); (2) der Kalender hat **keine eigene Kopfreihe** – der Erinnerungs-Knopf des Klons sitzt im Kopf der Karte „Notizen“
  (wie der Glocken-Schalter im Kopf von „Mein Kalender“); (3) die läutende Erinnerung im Kalender ist eine schmale Zeile, Text seitlich
  zu schieben, Zähler im Knopf des Klons („OK (2)“); in der Hülle steht stattdessen das Glockenfeld. Das sind die einzigen Stellen, an denen
  `rahmen/kalender/seite.css` Maße des Klons anfasst – auf Klaus' Wort. 
  **Glocke und Glockenfeld (Klaus 18.11., zuletzt entschieden, mit Bild vom Benachrichtigungsfeld seines Tablets – ersetzt alles
  Frühere zur Anzeige der Glocke):** in der Kopfleiste der Akte und in der Leiste jedes Rahmens steht nur das Glockensymbol, ohne
  Text (`glockeKnopf`, Klasse `geist`: durchsichtig, die Fläche erscheint erst beim Darauf-Gehen oder Drücken – „wie die Leiste unten
  am Galaxy Tab“). **Rot** = etwas ist fällig (heute oder überfällig; `istFaellig`), mit der **Zahl** der fälligen; **grün** =
  Einträge gespeichert; **grau** = keine. Ein Tipp klappt das **Glockenfeld** auf (`glockenFeld`, über `menue`): alle offenen
  Einträge untereinander, fällige rot markiert; ein Tipp auf die Zeile öffnet den Kalender an dem Tag, der kleine Pfeil klappt sie
  auf (ganzer Text, darunter „Öffnen“ und „Erledigt“ als Wörter – `T().kalender.erledigen`, derselbe Schritt wie ✓ im Kalender); unten „Kalender öffnen“ und „Neue Notiz“. Nichts schiebt sich von
  selbst über die Seite: läutet die App-Glocke des Klons (unsichtbarer Rahmen `#glocke`, liefert Ton und die Meldung des Geräts),
  wackelt das Symbol kurz. **Klaus 18.11. abends: so bleibt es** – keine Zahl ohne Glocke, keine feste Leiste unten, die übrigen
  Knöpfe oben bleiben wie sie sind (aus den Notizen gestrichen). Nicht gebaut: „Zurückstellen“ je Eintrag; die Zeile der läutenden Erinnerung
  aus dem Klon ist in der Hülle nicht mehr zu sehen (im Kalender selbst erscheint sie weiter, dort schlank gemacht).
  **Seitenleiste (Klaus 18.11.: „übernimm die aus der Familienakte, prüf, wo die ist und was die kann“):** `app/seitenleiste.tsx` im
  Klon – Griff am rechten Rand, wandert beim Rollen mit; ein Tipp zeigt: alle auf-/zuklappen, nach oben, nach unten, Zurück,
  Startseite, Seite wählen, Hilfe. Läuft unverändert im Kalender; Zurück schließt den Kalender, Startseite geht zur Startseite der
  Akte, „Seite wählen“ zum Baum, Hilfe zur Hilfe der Akte (`pa-kalender-geh`). Sie lässt sich nicht verschieben (auch im Klon nicht).
  In der Hülle selbst seit 0.6.1 (siehe dort); in Datei-Organizer und Workflow PDF im Rahmen nicht.
  **Farben (Klaus 18.11.: „nach demselben Muster“ wie Datei-Organizer und Workflow PDF):** `rahmen/kalender-thema.css` – nur Farben,
  der Kalender ist violett wie sein Tool. Gilt als Muster für jedes weitere Tool (eine Farbdatei je Tool, letztes Stylesheet).
  **Kalender verbinden (Klaus 18.11.: „die Technik mit übernehmen, da sind die Anmeldungen für Google, Microsoft, T-Mobile drin“):**
  Karte „Kalender verbinden“, Anmeldung und Abgleich unverändert aus dem Klon (`kalender-karte.tsx`, `kalender-anbieter.ts`,
  `kalender-abgleich.ts`; dieselben öffentlichen Client-Kennungen `lib/kalender-konten.ts`). Im Klon gibt es Google, Microsoft,
  Gerätekalender (nur Android-App) und Kalenderdatei (.ics) – **einen eigenen Anbieter Telekom/T-Mobile gibt es dort nicht**.
  **Braucht Klaus:** die Anmeldung kehrt auf `https://lausiklauskn-png.github.io/Private-Akte/rahmen/kalender/` zurück; diese
  Adresse muss bei Google (OAuth-Client „Webanwendung“ › autorisierte Weiterleitungs-URIs) und Microsoft (Entra › App „Familienakte“ ›
  Authentifizierung › Single-Page-Anwendung) eingetragen sein, sonst lehnen beide ab (Anleitung im Klon: `docs/KALENDER-EINRICHTUNG.md`).
  Der Zugang lebt nur im Speicher der Seite: nach dem Schließen des Kalenders neu anmelden. Die gewählte Verbindung
  (`familienakte-kalender-v1` im Browser) teilt sich die Akte mit einer Familienakte unter derselben Adresse. **Nicht geprüft**
  (die Sitzung erreicht Google und Microsoft nicht) – geprüft ist nur, dass die Karte beide anbietet.
  **Hülle:** „Fällig“ auf der Startseite ist echt (`T().kalender.termine()` in `src/tresor.ts`, dieselbe Auswahl wie „Mein Kalender“;
  Tipp öffnet den Kalender an dem Tag), die Zahl am Baum auch. **Glocke:** dieselbe Seite läuft unsichtbar mit (`#glocke`,
  `?nur=glocke`) – solange die Akte offen ist (Anzeige: siehe „Glocke als Symbol“); bei geschlossener App läutet nichts (das kann nur
  die Android-App der Familienakte). Sie startet erst, wenn die Akte den Tresor geöffnet hat (zwei Fenster zugleich stören die
  Schreibprobe des Klons – in der Probe gesehen). **Akte leeren** hat einen vierten Haken „Termine und Notizen“
  (`kalender.leeren`: Löschen des Klons, dann sein Papierkorb). **Baum:** die Hinweistexte sind heraus (kleiner Auftrag aus dem Brief).
  **Eigene Entscheidungen (Freibrief):** Weg B; Notizen als schlichte Liste unter dem Kalender statt eines Tagebuchs; der Knopf heißt
  in der Akte „Notiz“, Fenster und Knopf des Klons „Erinnerung“ (Text des Klons); gleich 0.6.0; Akte leeren nimmt Termine und Notizen
  mit (eigener Haken). **Grenzen:** die Beispiel-Unterlagen führen über „Bearbeiten mit › Kalender“ noch zum alten Beispiel-Kalender
  (`kalender()`, `fNotiz` in `app.js` sind sonst nicht mehr erreichbar); Termin zu einer **echten** Unterlage anlegen geht noch nicht
  (der Klon kann es: `references`); Notizen stehen nicht in der Suche; Papierkorb für Gelöschtes hat keine Oberfläche.
  Probe 320 grün (Notiz mit „morgen um 9 Uhr“ → Liste „Notizen“ und Punkt am Tag im Kalender; Eintrag von Hand; „Fällig“ mit
  heute/morgen; Glocke grau/grün/rot mit Zahl, läutet 15 Min. vorher; Glockenfeld: aufklappen, öffnen, abhaken; Seitenleiste;
  flache Leisten; Leeren). **Am Tablet ungeprüft**, ebenso
  Sprechen (kein Mikrofon in der Probe), Foto zur Notiz und die Anmeldung bei Google/Microsoft.
- **0.5.6 Workflow PDF hat eine eigene Stadt im Baum (Klaus 18.11.: der Datei-Organizer hat eine, das Scannen war im Baum nicht zu
  finden; „der Baum erklärt, wo die Apps sind und wie ich sie direkt ansteuere“):** Schild „Workflow PDF“ bei den Kränen oben
  (`STAEDTE`, `id:'pdf'`); ein Tipp öffnet die **Hauptseite** von Workflow PDF im Rahmen, nicht die Kamera (die bleibt der rote Knopf).
  Steht auch in „Wo liegt was?“ und in der Leiste der Tools. Probe 260 grün. Am Tablet ungeprüft.
  **Entschieden (Klaus 18.11.):** die gelernten Regeln kommen **nicht** an die Oberfläche (keine Liste, kein „vergessen“) – das ist
  Sache des Kerns; ein Nutzer versteht „Regeln“ nicht. Wie der Kern Korrekturen gegen das Training abwägt, entscheidet Claude.
- **0.5.5 Das Gelernte im Backup (Klaus 18.11.: „lass uns das gleich ins Backup mit übernehmen“):** „Backup erstellen“ schreibt neben
  die Vollsicherung des Klons die Datei `Gelerntes.json` in den Ordner „Privatakte_Backup_…“: die gelernten Regeln des Datei-Organizers
  in der Akte („Absender → Bereich“ mit Stimmen, aus `PrivateAkteOrganizer1`) und die eigenen Kategorien, mit dem Passwort des Backups
  verschlüsselt (AES-GCM, PBKDF2 600.000 Runden; `gelerntesSchreiben`/`gelerntesEinlesen` in `src/tresor.ts`). „Backup einlesen“ fügt
  hinzu, was hier fehlt; eine Regel, die es hier schon gibt, bleibt wie sie ist (nichts wird überschrieben, Stimmen werden nicht
  zusammengezählt). Das Fenster nach dem Backup und die Meldung nach dem Einlesen nennen die Zahlen. **Grenzen:** mit dem
  Notfallschlüssel statt des Passworts lässt sich das Gelernte nicht einlesen (die Akte sagt es); die Familienakte liest die Datei
  nicht; gesichert ist nur das Gelernte des Organizers **in der Privaten Akte**, nicht das der eigenständigen Apps Datei-Organizer
  Pro/Basic (eigener Speicher, dort gibt es kein Backup des Gelernten – offen). Probe 254 grün (4 neu). Am Tablet ungeprüft.
- **0.5.4 Das Gelernte bleibt (Klaus 18.11.: „auf gar keinen Fall … das ist der Kern, das Eigentliche“):** „Akte leeren“ nimmt im
  Datei-Organizer nur noch die Liste der Dateien, den Verlauf, den gemerkten Ordner und ein angefangenes Einlesen weg
  (`organizerListeLeeren` in `app.js`); die gelernten Regeln werden zurückgeschrieben, eigene Kategorien und die übrigen Merker
  nicht angefasst – wie „Organizer leeren“ im Organizer selbst. 0.5.3 löschte dort die ganze Datenbank samt Gelerntem; die Angabe
  dazu unten ist überholt. Probe 249 grün. Siehe „Feste Regeln“.
- **0.5.3 Akte leeren (Klaus 18.11.: „Backup anlegen, beiseite räumen, Akte komplett leeren – mit den Nebenprogrammen“; am Tablet
  bestätigt mit 0.5.1: eingeklappte Abschnitte, Sortierung, der Scan steht oben):** „Exportieren“ › „Akte leeren …“ (`fLeeren`).
  Drei Haken, alle gesetzt: Unterlagen in der Akte (`tresor.leeren`: erst `dokumenteAussortieren`, dann `dokumenteEndgueltigLoeschen`
  des Klons – auch früher Herausgenommenes; dazu die Merker der Suche `PrivateAkteSuche1`/`PrivateAkteText1`), Bibliothek von
  Workflow PDF (`PrivateAkteWFPDF1`, `pa_wfpdf_*`), Liste im Datei-Organizer (`PrivateAkteOrganizer1`, `pa_do…` – **damit auch das
  dort Gelernte und eigene Kategorien**, anders als „Organizer leeren“ im Organizer selbst). Das Fenster nennt das letzte Backup
  oder warnt, dass es keines gibt; geleert wird erst, wenn das Wort „leeren“ eingetippt ist. Kein Zurück ohne Backup. Die Beispiele
  der Vorschau, das Sprachmodell und der Offline-Vorrat bleiben. Probe 248 grün (3 neu). Am Tablet ungeprüft.
- **0.5.2 „Teilen“ in Workflow PDF fragt, wohin (Klaus 18.11.: Teilen ging nur an die Akte – E-Mail, BookLedgerPro und andere
  Programme waren versperrt):** die Brücke zeigt ein kleines Fenster „Wohin damit?“ – „In die Private Akte legen“, „An ein anderes
  Programm teilen“ (das Teilen-Fenster des Geräts, der Tipp auf den Knopf ist der nötige frische Tipp), „Abbrechen“
  (`wohin` in `rahmen/wfpdf-bruecke.js`). Der Scan über den roten Knopf geht weiter ohne Frage in die Akte. Probe 242 grün
  (Teilen des Geräts ist dort nicht vorhanden – geprüft ist, dass Abbrechen und „anderes Programm“ nichts in die Akte legen).
  **Am Tablet ungeprüft**, vor allem ob Android das Teilen-Fenster aus dem Rahmen heraus öffnet. Klaus' Frage nach „Modul 25“:
  in den Repos dieser Sitzung ist Modul 25 die Maske zum Pseudonymisieren (`25_pseudonym.js`), kein Teilen-Baustein – nicht weiter nachgesehen.
- **0.5.1 nach Klaus' erstem Test am Tablet (18.11. vormittags, 0.5.0 über Pages: Organizer im Rahmen, Übergabe von 98 Dateien und
  Scan über den roten Knopf liefen):** (1) **Fehler behoben:** bei der Übergabe standen alle Dateien auf „Familie & persönliche
  Dokumente“ und wurden so abgelegt. Zwei Ursachen: die Übernahme des Klons nimmt nur Pfade ohne Schrägstrich (der Testordner und
  jeder Ordner mit Unterordnern fiel durch) – `ausStapel` schreibt den Pfad jetzt für Index und Liste flach (∕ statt /), angezeigt
  wird der echte Pfad; und ohne Vorschlag stand im Auswahlfeld der erste Bereich statt „Sonstiges“. Die Probe hatte das in 0.5.0
  nicht gemerkt (sie zählte nur „nicht Sonstiges“); sie siebt jetzt ganz durch und verlangt mindestens fünf verschiedene Bereiche.
  **Klaus' 98 Testdateien liegen noch falsch unter „Familie & persönliche Dokumente“** (erfundene Dateien; einzeln herausnehmen
  oder Browserdaten leeren – ein Sammel-Löschen gibt es nicht). (2) **Startseite (Klaus: „scrollen bis zum geht nicht mehr“):**
  „Deine Unterlagen“, „Fällig“ und „Zuletzt abgelegt“ sind Knöpfe zum Aufklappen, ab Werk zu, gemerkt (`klappTeil`, `pa_klapp`);
  die Bereiche stehen in einer Zeile zum seitlichen Schieben. (3) **Sortierung von „Deine Unterlagen“** (Klaus: der neue Scan war
  nicht zu finden): zuletzt abgelegt (ab Werk), Datum der Unterlage, Name, Größe, Bereich (`echtSortiert`, gemerkt `pa_sort`).
  (4) **Bestätigung im Rahmen:** nach „PDF erstellen“ lag der Scan schon in der Akte, aber es war nichts zu sehen (die Meldung der
  Akte lag unter dem Rahmen) – jetzt steht sie 12 s grün in der Leiste des Rahmens (`rahmenMelden`), mit „Zurück mit ‹ Akte“.
  Probe 240 grün (6 neu). **Offen aus dem Test:** im Editor von Workflow PDF leuchtet nach dem Scan „PDF ausgeben“ – das führt
  weg von der Akte (Klaus hätte es gedrückt); der Abschnitt „Eingang“ ist weiter Beispiel, echt Abgelegtes erscheint dort nicht;
  „Deine Unterlagen“ aufgeklappt ist bei 100 Stück weiter eine lange Liste (kein Gruppieren nach Bereich, kein Blättern).
- **0.5.0 Klone im Rahmen: Datei-Organizer und Workflow PDF laufen in der Privaten Akte (Klaus 17.11. abends, Generalvollmacht
  für diese Sitzung; Vorbild: Workflow PDF in der Familienakte).** Der grüne Knopf „Dateien hineingeben“ (und „Datei-Organizer“
  im Baum) öffnet den echten Datei-Organizer, der rote Knopf „PDF scannen“ den Scanner von Workflow PDF, „Workflow PDF öffnen“
  (Familienbüro › Workflow PDF) das ganze Programm; an einer PDF- oder Bild-Unterlage steht „Mit Workflow PDF bearbeiten“.
  **Bauweise:** die Klone bleiben byte-gleich. Je Klon eine erzeugte Startseite unter `rahmen/<Pfad im Klon>/index.html`
  (`tools/rahmen-bauen.mjs`, in `npm run bau` und `bau:pruefen`): Brücke der Akte als erstes Skript, `<base>` auf den Klon,
  Farbdatei als letztes Stylesheet; bei Workflow PDF ohne Worker-Anmeldung und ohne Mycel-Knoten (wie in der Familienakte).
  Die Brücke stellt die Adresse der Seite ohne Neuladen auf `klone/<Pfad>/~rahmen` um – der Klon sucht einen Teil seiner Dateien
  über `location.href` (Scanner, Texterkennung, Prüfkern); `<base>` allein gab 404, die Umstellung allein auch (der Browser lädt
  vorab). Die Seite liegt darum spiegelbildlich zum Klon, damit `<base>` vorher und nachher auf denselben Ordner zeigt.
  **Brücken** (`rahmen/organizer-bruecke.js`, `rahmen/wfpdf-bruecke.js`): eigener Speicher (nachgesehen im Organizer: Datenbank
  `DateiOrganizer1` → `PrivateAkteOrganizer1`, Merker `do-…`/`do_…`/`datei-organizer-…` → `pa_…`; Workflow PDF: `WorkflohPDF1` →
  `PrivateAkteWFPDF1`, `wfpdf_*` → `pa_wfpdf_*`), kein eigener Service Worker, nur eigene Vorräte sichtbar. Lädt im Rahmen doch
  einmal die Startseite eines Klons ohne Brücke (Neuladen, Link), leitet der Worker der Akte um und das Rahmen-Fenster lädt neu.
  **Übergabe Organizer → Akte:** Seite „Familienakte“ im Organizer, Karte „An die Private Akte übergeben“ (Stelle im Repo
  Datei-Organizer gebaut: `src/rahmen.ts`, `window.DO_RAHMEN`, PR #64 dort) – Index und Originale kommen als Nachricht, die Akte
  zeigt das Fenster von 0.4.8 über dem Rahmen (`organizer.ausStapel` in `src/tresor.ts`, `fOrdner`); auch Dateien aus Unterordnern.
  **Workflow PDF → Akte:** „Teilen“ im Klon legt die Datei in die Akte (Bereich „Sonstiges“, Text vorher gelesen), ein Scan über
  den roten Knopf geht nach „PDF erstellen“ von selbst hinein. **Akte → Workflow PDF:** die Unterlage wird als Kopie in die
  Bibliothek des Klons gelegt und geöffnet; das Ergebnis kommt über „Teilen“ als **neue** Unterlage zurück (ersetzt nichts).
  **Farben:** `rahmen/organizer-thema.css` (Blau des Organizers → Grün seines Tools), `rahmen/wfpdf-thema.css` (Rot des Tools;
  Installieren, ⟳, Mycel-Leiste ausgeblendet). Das Rahmen-Fenster hat einen eigenen Ort (`#rahmenort`), „‹ Akte“ oder Zurück schließt.
  Der Worker legt die Klon-Dateien beim Gebrauch in den Vorrat (Filme nicht).
  **Eigene Entscheidungen der Sitzung (Vollmacht):** (1) eigener Klon von Workflow PDF auf dem neuesten Stand statt des Klons in
  der Familienakte – der trägt deren Brücke und ist drei Wochen älter; kostet 35 MB. (2) Startseiten unter `rahmen/` statt einer
  Kopie der Klone (die Familienakte kopiert; hier wären es 110 MB doppelt). (3) Übergabe-Stelle im Organizer gebaut statt über
  die Brücke in sein Inneres zu greifen; ohne Rahmen ändert sich dort nichts. (4) Die Beispiel-Fenster „Datei-Organizer“ und
  „Neuer Scan“ sind nicht mehr über Knöpfe erreichbar (Code bleibt für die Probe). (5) Aus Workflow PDF Abgelegtes kommt ohne
  Rückfrage nach „Sonstiges“. (6) Gleich 0.5.0, kein Zwischenstand 0.4.9 auf `main`.
  **Grenzen / nicht gebaut:** die Farbpalette der Akte wirkt nicht in den Klonen (die Brücken nehmen `?a=&b=` schon an);
  der Organizer nennt im Fuß und in der Hilfe weiter die Familienakte (Text des Klons); Scan-PDFs liest der Organizer weiter
  nur auf 2 Seiten, die Lage der Zeilen steht nicht im Index (beides im Repo Datei-Organizer offen); kein Bereich-Vorschlag für
  Abgelegtes aus Workflow PDF; Discovery-Filme des Organizers laufen nur mit Netz. Probe 234 grün (22 neu: beide Klone im Rahmen,
  eigener Speicher, kein Worker, Testordner einlesen → Übergabe → zwei Dateien in der Akte, Teilen aus Workflow PDF, Unterlage
  aus der Akte im Editor; dazu von Hand: Neuladen im Rahmen kommt mit Brücke wieder). **Am Tablet, mit echter Kamera, mit einem
  echten Ordner und über GitHub Pages ungeprüft.**
- **0.4.8 Ordner aus dem Datei-Organizer übernehmen (Klaus 17.11.: große Mengen werden im Datei-Organizer gelesen, sortiert und
  angelernt – dort bleibt das Nacharbeiten; einzelne Stücke direkt in der Akte; ein Sortier-Kern):** „Importieren“ › „Ordner in
  die Akte legen“. `organizer` in `src/tresor.ts`: Ordner wählen, `organizer-index.json` lesen – Einordnung über die unveränderte
  `lib/organizer-uebernahme.ts` des Klons (Bereich, Art, Hinweis, Doppelte, Gesperrtes; eigene Bereiche nur „von dir“/„gelernt“),
  dazu hier aus demselben Index **Datum** und der dort **gelesene Text** (wird `textAuszug`, die Akte liest dann nicht noch einmal;
  fehlt er, liest sie selbst). Fenster mit Haken und Bereich je Datei, Doppeltes bleibt im Ordner, Gesperrtes mit Warnung; ohne Index
  ein einfacher Stapel nach „Sonstiges“. Nur Dateien direkt im Ordner; schon Vorhandenes zählt als „waren schon da“.
  **Befund im Klon @ `bcd48a4`:** der Index trägt je Datei Steckbrief, `text` (bis 20.000 Zeichen, Haken „Erkannten Text mitgeben“)
  und `abschnitte`; Scan-PDFs liest der Organizer nur auf den ersten **2 Seiten** (`SCAN_SEITEN`, reicht zum Sortieren, nicht für die
  Suche im ganzen Scan); die Lage der Zeilen steht nicht im Index. **Nicht gebaut (Stand 0.4.8; seit 0.5.0 ist der Organizer im Rahmen da):** Absender/Frist/Betrag stehen nur in der
  Notiz; Bereich-Vorschlag aus dem Sortier-Kern beim einzelnen Ablegen. Probe mit gestelltem Ordner grün (216); mit einem echten
  Ordner aus dem Organizer und am Tablet ungeprüft.
- **0.4.7 Leser in der Akte (Schritt 2; Klaus 17.11.):** Tipp auf einen Treffer mit Seitenzahl öffnet das PDF im Fenster auf
  dieser Seite (`fLeser` in `app.js`, pdf.js des Klons über `T().pdf`), die Inhaltswörter der Frage gelb markiert (Lage aus der
  Textebene, Breite nach Zeichenzahl geschätzt). Suchfeld für Wörter in dieser Unterlage, „‹ Fund“/„Fund ›“ springt zwischen den
  Seiten mit Fundstellen (Seiten mit allen Wörtern, sonst mit einem), Blättern mit ‹ ›. In der Karte einer PDF-Unterlage:
  „Lesen und darin suchen“, daneben weiter „Im Browser öffnen“. **Grenzen:** nur PDFs; ohne Textebene (Scan) wird nur
  geblättert, nichts markiert („nur mit Textebene“) – Klaus' Gedanke, den erkannten Text über das Bild zu legen, ist nicht gebaut;
  kein Zoom, eine Seite zur Zeit. An Klaus' Heft hier gesehen (Seite 4, „Essig“/„Marmor“ markiert); am Tablet ungeprüft.
- **0.4.6 Fundstelle am Treffer (Klaus 17.11.: „So will ich es haben“, Schritt 1 von 2):** am Tablet bestätigt (0.4.4): „Essig auf
  Marmor“ findet das Bonusheft als „im Text gefunden“, Inhalt gelesen bei 3 von 3, 50 Abschnitte in wenigen Minuten gerechnet.
  Neu: unter dem Treffer steht der Ausschnitt, in dem es gefunden wurde, mit der Seite („Seite 4 · … Kein Essig auf Marmor …“) –
  bei Wort-Treffern im Inhalt die Stelle, an der die Wörter am engsten stehen (`engsteStelle`, `ausschnitt` in `src/tresor.ts`),
  bei „dem Sinn nach“ die Mitte des nächsten Abschnitts (ungefähr; ein Abschnitt hat 1600 Zeichen). Die Seite wird über die
  Textebene je Seite gesucht (`seitenVon`, `seiteFinden`; nur PDFs mit Textebene, sonst keine Seitenzahl). An Klaus' Heft hier
  geprüft (gestellter Rechner). **Schritt 2, noch nicht gebaut:** PDF-Leser in der Akte – Tipp öffnet die Seite, Wörter markiert,
  Suchfeld mit weiter/zurück. Klaus' Gedanke für Scans: den erkannten Text über das Original legen und ein-/ausblenden (wie im
  Familienbüro); Tesseract liefert die Lage der Zeilen, im Klon gibt es das Seitenbild mit Kästen (`lib/pdf-kaesten.ts`).
- **0.4.5 (Klaus gab sein Heft `Bonus_3_Fuenfzig_Hausrezepte.pdf` zum Nachsehen; die Datei liegt nicht im Repo):** an der Datei liegt
  es nicht – Textebene, 48 Seiten, 36.000 Zeichen in 0,3 s gelesen, 26 Abschnitte; mit gestelltem Rechner findet „Essig auf Marmor“
  das Heft als „im Text gefunden“. Klaus' Bild mit 0.4.4 (21:44): „Bedeutung wird gerechnet: Abschnitt 29 von 50“ – die PDFs werden am Tablet gelesen, die
  Wartezeit ist das Rechnen der Abschnitte (einmalig, danach gemerkt); wie lange 50 Abschnitte dauern, ist nicht gemessen. Vorsorge: die Texterkennung gilt nach 90 s je Bild als
  gescheitert und hält die Suche nicht mehr auf (in der Sitzung nicht erneut versucht).
- **0.4.4 (Klaus 17.11.: seine PDFs haben nicht unbedingt eine Textebene; am Tablet stand lange nur „läuft noch …“):** Scan-PDFs
  werden ganz erkannt (bis 60 Seiten statt 5). Solange gelesen oder gerechnet wird, steht dabei, was geschieht
  („Texterkennung: <Datei>, Seite 3 von 30“, „Bedeutung wird gerechnet: Abschnitt 12 von 80“; `bedeutung.lage()`, alle 0,7 s
  abgefragt). Kein Abbruch-Knopf. Dauer je Seite am Tablet ungemessen; ein Scan-PDF ist in der Probe nicht dabei.
- **0.4.3 Text beim Ablegen lesen, Texterkennung für Fotos und Scans (Klaus 17.11.: „Das machen wir“):** `src/text-lesen.ts` –
  PDF: Textebene (bis 60 Seiten); fehlt sie, die ersten 5 Seiten als Bild; Foto (PNG/JPG/WebP): Texterkennung. Tesseract mit
  deutschem Sprachpaket unverändert aus dem Klon (`klone/familienakte/public/apps/workflow-pdf/vendor/tesseract`, Einstellungen wie
  `app/wfpdf-kern.ts`; dessen Lader hängt an den Pfaden der Familienakte, darum eigener kleiner Lader). Der Text geht als
  `textAuszug` in `saveLocalDocument` des Klons (höchstens 20.000 Zeichen) – damit findet die **Wortsuche** den Inhalt auch ohne
  Bedeutungssuche. Gelesen wird **vor** dem Ablegen (Knopf zeigt „Text wird gelesen …“), weil der Klon keinen Weg hat, den Auszug
  nachträglich zu setzen; klappt das Lesen nicht, wird trotzdem abgelegt. **Schon Abgelegtes:** bekommt keinen Auszug; mit
  eingeschalteter Bedeutungssuche liest `readMeaningCorpus` Fotos und Scans einmal über die Texterkennung (gemerkt in der
  Browser-Datenbank `PrivateAkteText1`, Schlüssel Name und Größe) und PDFs über die Textebene. Unter den Treffern steht
  „Inhalt gelesen bei x von y Unterlagen“ (`bedeutung.gelesen()`), damit zu sehen ist, ob gelesen wurde. Der Worker legt die
  Texterkennung (rund 5,5 MB) erst beim Gebrauch in den Vorrat. **Offen:** Klaus am Tablet: „Essig auf Marmor“ fand das Bonusheft
  nicht – unklar, ob dort schon 0.4.2 lief; die Sitzung erreicht Pages nicht und konnte nicht nachsehen, ob `klone/…/pdfjs` dort
  ausgeliefert wird. Später (Klaus): Kamera oben über Workflow PDF. Probe: Foto mit gedrucktem Text wird erkannt und über die
  Wortsuche gefunden (208 grün); echte Belegfotos und Dauer am Tablet ungeprüft.
- **0.4.2 PDFs werden gelesen (Klaus 17.11. am Tablet: Wörter aus dem Inhalt der Bonushefte fanden nichts):** `src/pdf-ersatz.ts`
  lädt jetzt die PDF-Bibliothek des Klons (`klone/familienakte/public/vendor/pdfjs`, auch im Offline-Vorrat) statt abzubrechen; das
  Lesen selbst ist `readMeaningCorpus` des Klons (Textebene, höchstens 60 Seiten; Scans ohne Textebene liefern nichts, OCR nicht
  gebaut). `bedeutung.suchen` meldet je Unterlage `imText` (alle Inhaltswörter der Frage stehen in einem Abschnitt); solche Treffer
  stehen oben unter „Deine Unterlagen“ mit der Marke „im Text gefunden“. **Grenzen:** der Inhalt wird nur gelesen, wenn die
  Bedeutungssuche eingeschaltet ist (Modell geladen) – ohne sie weiter nur Titel, Bereich, Notiz; ein gespeicherter Textauszug beim
  Ablegen ist nicht gebaut. Das erste „Finden“ nach dem Update rechnet alle PDF-Abschnitte ohne Ladebalken (danach gemerkt).
  Probe mit einem gestellten PDF grün; an Klaus' PDFs (7 MB) am Tablet ungeprüft.
- **Inhaltsvektor / Mycel in Sage (Klaus 17.11.: „mach dich schlau“; nur gelesen):** `docs/MEILENSTEIN_VON_DER_HUELLE_ZUM_INHALT.md`,
  `docs/components/03_embedding.md` (`embedContentVector`), `02_spore.md` (`regenerateOwnSpore`, `embeddingVersion`). Das ist **ein**
  Vektor je App für die öffentliche Visitenkarte im Netz (Schwerpunkt aus bis zu 32 Schnipseln, neu gerechnet wenn der Inhalt wächst)
  – er dient dem Finden von Apps untereinander, nicht der Suche in den eigenen Unterlagen. Für Tresore legt Sage fest: **kein
  Inhalts-Sampling**, die Karte ist öffentlich. Die Suche im Rezeptbuch ist `queryLocal` über die einzelnen Einträge – das hat die
  Private Akte seit 0.4.0. Klaus' Idee (pseudonymisieren, großes Sprachmodell, wieder einpflegen): ein Sprachmodell liefert keine
  passenden Vektoren, wohl aber Text (Stichwörter, Kurzfassung, Fragen), den das Gerät selbst einbettet – nicht gebaut, nicht entschieden.
- **0.4.1 nach Klaus' Bildern vom Tablet (17.11., 0.4.0 mit echtem Modell, drei eigene Unterlagen):** (1) Fremdes kam „dem Sinn
  nach“ auf 0,11 und 0,16 (dieselbe Notiz bei „September Gehaltsabrechnung“ und „Zählerstand Nebenkostenabrechnung“) – untere
  Grenze jetzt **0,2** statt 0,1. Ein wirklich passender Sinn-Treffer war auf den Bildern nicht dabei; die Grenze „mindestens halb so
  nah wie das Beste“ ist darum **weiter geschätzt**, ebenso offen, ob 0,2 bei größerem Bestand Passendes abschneidet (bei drei
  Unterlagen trägt der Mittelwert wenig). (2) Rückfall „nicht alle Wörter passen“: „Dokumente für eine Auslandsreise“ zeigte alle
  Unterlagen, „was brauche ich …“ die Waschmaschine. Einzeln gesucht wird jetzt nur, was Inhalt trägt (`teilWoerter` in
  `src/tresor.ts`: ohne Füllwörter und ohne Bereichswörter des Klons wie „Dokumente“, „Brief“); bei den Beispielen Füllwörter in `SYN`.
  Probe 202 grün; am Gerät ungeprüft.
- **0.4.0 Suche nach Sage-Protokol umgestellt (Klaus 17.11.: „Mache das“):** `klone/sage-protokol/src/modules/04_match.js` @ `4e62f90`
  (MIT, mit `LICENSE`; Baustein statt App, darum `klon-nachziehen.mjs … --nur datei,datei` – Pin und `--pruefen` wie bei den anderen
  Klonen). In `src/tresor.ts` (`bedeutung`): Lesen und Teilen in Abschnitte weiter über den Klon der Familienakte (`readMeaningCorpus`,
  `meaningSections`), Rechnen über deren Rechen-Worker; **nicht mehr benutzt:** deren `buildMeaningIndex`/`searchMeaningIndex`.
  Gerechnete Abschnitte liegen in der eigenen Browser-Datenbank `PrivateAkteSuche1` (Schlüssel = Fingerabdruck aus Modell-Stand und
  Text; nur Vektoren, kein Text). Finden: Sage `queryLocal(…, {hybrid:true})` (BM25 + Vektor, Reciprocal Rank Fusion; die Frage holt
  Sage über `window.SbkimEmbedding.embedQuery`, das hier der Rechner der Familienakte bedient), dazu der **zentrierte Cosinus** mit
  dem Mittelwert des eigenen Bestands (ab drei Abschnitten). Anzeige: Wort-Treffer oben wie bisher; „Passt vielleicht dem Sinn nach“
  zeigt die zentrierte Nähe als Zahl (0 = fremd), gezeigt ab 0,1 und mindestens halb so nah wie das Beste, höchstens fünf – beide
  Grenzen geschätzt. Die Schwelle von 0.3.9 auf dem rohen Wert ist weg. **Nicht gebaut:** mehrere Formulierungen (`queryLocalMulti`,
  braucht eine Synonym-Karte), KI-Richter. **Geprüft** nur mit gestelltem Rechner, der den hohen Boden nachahmt (Probe: passende
  Unterlage vorn, Fremdes höchstens halb so nah bei rohem Wert über 0,8); mit dem echten Modell am Gerät ungeprüft.
- **Bedeutungssuche verbessern – Befund aus Sage-Protokol (Klaus 17.11.: „prüf nach, ob wir den Kern übernehmen können“; nur gelesen,
  nichts gebaut):** Sage hat genau das am Tablet Gesehene gemessen und gelöst. Quellen dort: `docs/LEHRE-EMBEDDING-MATCH-KALIBRIERUNG.md`
  (zuerst lesen), `docs/components/04_match.md` (Bau 04.C/F/G/H), `docs/components/22_such_widget.md` (Abschnitt Vorfilter),
  `docs/HYBRID-MATCH-EINBAU.md`, Code `src/modules/04_match.js` (MIT, eine Datei, `window.SbkimMatch`).
  (1) **Ursache:** der rohe Cosinus von multilingual-e5-small hat einen hohen Boden – unverwandte deutsche Texte liegen im Mittel bei
  rund 0,82 (Spanne 0,77–0,85). Eine feste Schwelle auf dem rohen Wert trennt nicht; der Wert ist eine **Rangfolge, kein Urteil**.
  (2) **Zentrierter Cosinus:** Mittelwert-Vektor abziehen, neu normieren – dann liegt Unverwandtes um 0 und nur Verwandtes klar
  darüber. Für freien Text nimmt Sage den Mittelwert aus dem **eigenen wachsenden Bestand** (ab 3 Texten), nicht eine feste Konstante.
  (3) **Hybrid:** BM25 (Wörter) und Vektor über Reciprocal Rank Fusion verschmelzen (`queryLocal` mit `hybrid:true`) – ein genauer
  Wort-Treffer steht oben, auch wenn sein Vektor-Wert niedrig ist; am Tablet dort bestätigt. (4) **Mehrere Formulierungen** einer
  Frage über eine Synonym-Karte, Listen verschmelzen (`queryLocalMulti`). (5) Kontext-Vorspann je Schnipsel wurde gemessen und
  **verworfen**. (6) Schnipsel einzeln vergleichen statt zu einem Vektor mitteln trennt besser als Mitteln.
  **Vorschlag für hier (nicht gebaut):** `04_match.js` als Klon mit Pin hereinholen; das Rechnen der Vektoren bleibt beim Klon der
  Familienakte (über `window.SbkimEmbedding.embedQuery` anschließen), der Korpus kommt aus dem Index. Die Schwelle von 0.3.9
  (roh ≥ 0,84) ist nach dieser Lehre der falsche Hebel und fällt dann weg. Offen: Sage vergleicht je Eintrag einen Vektor, der Klon
  der Familienakte führt Abschnitte je Unterlage in einer eigenen Datenbank – der Anschluss braucht die Vektoren von dort.
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

- **Bedeutungssuche – Merkregel für alle Apps (Klaus 17.11.: „merkt euch das“):** vor jedem Bau an einer Bedeutungssuche
  `docs/LEHRE-EMBEDDING-MATCH-KALIBRIERUNG.md` im Repo Sage-Protokol lesen. Der rohe Cosinus von multilingual-e5-small liegt auch bei
  fremden deutschen Texten um 0,82 – er ist eine Rangfolge, kein Urteil; **nie eine feste Schwelle auf den rohen Wert setzen.**
  Stattdessen der Baustein aus Sage (`src/modules/04_match.js`, als Klon mit Pin): Wörter und Bedeutung verschmelzen (BM25 + Vektor,
  RRF), Mittelwert des eigenen Bestands abziehen (zentrierter Cosinus), Abschnitte einzeln vergleichen statt mitteln. Dieselbe Regel
  steht in der `CLAUDE.md` der Familienakte.

- **`docs/ANPASSUNGEN-GEGENUEBER-FAMILIENAKTE.md` still mitführen** (Klaus 17.11.): eine Arbeitsdatei im Hintergrund wie diese hier. Bei jedem
  Schritt von selbst ergänzen, was beim Ausprobieren auffällt und was hier anders gemacht wird als in der Familienakte – ohne Klaus
  jedes Mal darauf hinzuweisen. Vorlage für die spätere Überarbeitung der Familienakte. Klaus geht die App Schritt für Schritt durch.

- **Das Gelernte wird nie gelöscht (Klaus 18.11.2026):** was ein Sortier- oder Suchkern aus Korrekturen gelernt hat (gelernte Regeln,
  eigene Kategorien, künftig Entsprechendes in der Akte und den anderen Tools), ist fester Bestand. Kein „Leeren“, kein Aufräumen
  und kein Umbau darf es entfernen – geleert werden nur Dateien, Listen und Verläufe. Der Kern wächst; er wird nicht wegrationiert.

- **Einfach halten (Klaus 18.11.2026):** wenig Text auf der Oberfläche. Keine Erklärsätze unter Bildern, Überschriften oder dem Baum (Klaus 18.11.: „als wenn ich zu blöd wäre, das selber zu verstehen“). Erklärungen nur hinter einem Fragezeichen oder Knopf, und
  dann so, dass ein normaler Nutzer sie versteht. Was nur Technik ist (Regeln des Kerns, Speicher, Fassungen der Klone), bleibt im
  Hintergrund – in `CLAUDE.md`, nicht in der App. Der Baum ist das Vorbild: wenige Punkte, antippbar, erklärt die App.

- **Ansichten aus einem Klon: nichts umgestalten (Klaus 18.11.2026):** Maße, Lage und Form von Knöpfen und Feldern bleiben wie im
  Original, nichts kommt dazu (kein zweiter Rahmen, kein verschobener Knopf). Dafür die Stile so bauen wie das Original und dieselbe
  Umgebung geben. Angepasst werden **nur die Farben**, je Tool in einer eigenen Farbdatei (`rahmen/<tool>-thema.css`), alle nach
  demselben Muster.

- **Klone nie von Hand ändern.** Verbesserungen entstehen im Quell-Repo und kommen nur über
  `node tools/klon-nachziehen.mjs <name> --quelle <pfad> [--stand <ref>]` herein. Beim Hinzufügen `git add -f klone/` nehmen
  (die Klone bringen eigene `.gitignore` mit) und danach `--pruefen`.
- Der Sortier-Kern bleibt **eine** Fassung: die aus dem Datei-Organizer.
- Keine echten Dokumente, keine personenbezogenen Daten, keine Schlüssel oder Passwörter im Repo. Das Repo ist öffentlich.
- Sichtbare Änderungen erst als Vorschau zeigen, Klaus sagt Ja. Veröffentlichen nur mit Klaus' Wort.
- Forschungseinträge gehören nur nach KimHub.
