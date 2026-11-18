# CLAUDE.md — Datei-Organizer

Diese Datei liest jede Sitzung zuerst.

## Was das ist

Prüf- und Sortierwerkzeug neben Auslieferungsprüfer und Sende-Prüfer (Eingangskontrolle). Dateien von Scanner, Kamera, E-Mail
oder Altbestand kommen in **einen** Ordner; der Organizer sortiert sie Klick für Klick feiner (Siebe: Art → Kopf → Kategorie und
Nummern → Absender → Inhalt) und zeigt sie als Baum nach vielen Gesichtspunkten. Zuerst für die Familienakte gemacht: der Ordner
wird dort nur übernommen und automatisch zugeordnet (`organizer-index.json`). Plan und alle Entscheidungen: `docs/PLAN.md`.

## Stand (18.11.2026 abends): 0.4.19 – Knöpfe „An die Private Akte“ und „An die Familienakte“ in der eigenständigen App

- **Klaus 18.11.: „im blauen Organizer fehlt oben der Knopf an die Familienakte übergeben“; der Organizer in der Privaten Akte bleibt,
  wie er ist.** Basic (Web-App): „An die Private Akte“; Pro (Android/Windows): „An die Familienakte“. Seite „Familienakte“, ganz oben:
  - **„An die Private Akte übergeben“** (`[data-uebergeben-akte]`, nur Web-App ohne Rahmen): öffnet `/Private-Akte/?empfang=organizer`
    im selben Browser (gleiche Adresse github.io); die Akte meldet „pa-empfang-bereit“, bekommt dasselbe Paket wie im Rahmen
    („pa-organizer-uebergabe“) und bestätigt („pa-organizer-angenommen“) – `aktePartner` in `src/rahmen.ts`, Ladeanzeige wie im Rahmen.
  - **„An die Familienakte übergeben“** (`[data-uebergeben-familienakte]`, nur Android und Windows – Klaus: „in die Basic-Variante
    brauchst du es nicht einbauen“; nicht im Rahmen): legt
    `organizer-index.json` in den Ordner (bzw. „Speichern unter …“/Herunterladen) und sagt: „In der Familienakte diesen Ordner als
    Eingangsordner wählen – sie übernimmt die Sortierung“ (Weg wie bisher in der Familienakte, `lib/organizer-uebernahme.ts` dort).
  - Im Rahmen der Privaten Akte unverändert nur „An die Private Akte übergeben“.
  Fassung 0.4.19 (Code 59, Vorrat v40). UI-Probe 218 grün, Native 66 grün. Klaus' Wort 18.11.: als APK und Windows ausgeben.

## Stand (18.11.2026 abends): 0.4.18 – Reihenfolge nach Datum, Ladeanzeige bei der Übergabe

- **Finden (Klaus 18.11., Bild vom Tablet: „das zweite Mal draufklicken – Datum und Jahr in die andere Richtung“):** neben „Sortieren“ ein
  Pfeil (`[data-sicht-richtung]`, „alt“/„neu“, gemerkt `do-finden-neu`): ordnet die Liste nach dem Datum der Datei (ohne Datum ans Ende) und
  in „Datum (Jahr › Monat)“ Jahre und Monate (Monate nach dem Kalender – vorher standen sie nach dem Alphabet). Die Unterordner bleiben.
  Nur Oberfläche (`src/seiten.tsx`), `lib/sichten.ts` unverändert.
- **Übergabe an die Private Akte (Klaus 18.11.: „hat lange gedauert, kein Ladebalken“):** Ladeanzeige in der Übergabe-Karte und oben
  („n von m Dateien für die Übergabe vorbereitet“, dann „Wird an die … übergeben …“), Knopf gesperrt, solange es läuft (Phase `uebergeben`).
  Fassung 0.4.18 (Code 58, Vorrat v39), keine Ausgabe. UI-Probe 213 grün. Am Gerät ungeprüft.

## Stand (18.11.2026 abends): 0.4.17 – Leiste oben im Rahmen einklappbar, Verlauf aufgeräumt

- **Klaus 18.11. (Organizer in der Privaten Akte): „die Navi-Leiste mit einem Klick einklappbar; im Handyformat nur das Flying Widget“.**
  Nur im Rahmen einer anderen App (`DO_RAHMEN`): Pfeil hoch rechts in der Leiste (`[data-nav-klapp]`) klappt die grüne Leiste samt runden
  Knöpfen weg; dann steht oben nur ein kleiner Pfeil ohne sichtbare Fläche (`[data-nav-auf]`, Fläche erst beim Darauf-Gehen), der sie
  zurückholt. Ab Werk ist sie am Handy (unter 700 px) zu – die Seiten stehen in der Seitenleiste –, sonst offen; die eigene Wahl wird
  gemerkt (`do-nav-zu`). Die Leiste bleibt grün (Farbe der Privaten Akte, `rahmen/organizer-thema.css` dort). Ohne Rahmen ändert sich
  nichts.
- **Verlauf aufgeräumt (Klaus 18.11.):** über der Liste eine Zeile – Haken „Alle“, Sortieren, Papierkorb und Rückgängig nur als Symbol
  (`[data-verlauf-loeschen]`, `[data-rueckgaengig]`, mit Hinweis und Vorlese-Text); der Text „n gewählt / Erst Haken setzen“ ist weg.
  Die Liste „Gelernt“ steht nicht mehr auf der Seite (Klaus: „das läuft im Hintergrund“ – die Regeln bleiben unverändert, die Probe liest
  sie aus dem gemerkten Zustand). „Korrekturen“ ist einklappbar (ab Werk offen), die Liste rollt innen mit fester Höhe (`[data-verlauf-liste]`);
  „Stichprobe“ ist einklappbar und ab Werk zu.
  Fassung 0.4.17 (Code 57, Vorrat v38), keine Ausgabe. UI-Probe 209 grün. Am Gerät ungeprüft.

## Stand (18.11.2026 nachmittags): 0.4.16 – Fuß als schmale Zeile

- **Fuß (Klaus 18.11., Bild vom Tablet: „den blauen Container komplett rausnehmen“):** statt des großen dunkelblauen Fußes mit
  „Arbeiten / Weitergeben / Rechtliches“ steht unten nur noch eine Zeile (`[data-fuss]` in `src/app.tsx`): „Family-Projekt ·
  Datei-Organizer <Fassung>“ und die Verweise Impressum, Datenschutz, Haftungsausschluss, Lizenz, Hilfe. Die Rechtsseite
  (`src/public/datenschutz.html`) hat dafür Anker und neu die Abschnitte **Haftungsausschluss** und **Lizenz & Copyright** (mit den
  fremden Bausteinen pdf.js, Tesseract.js, three.js). Fassung 0.4.16 (Code 56, Vorrat v37), keine Ausgabe. UI-Probe 201 grün.

## Stand (18.11.2026): 0.4.15 – nach Klaus' Test am Tablet (nicht ausgegeben, am Gerät ungeprüft)

Klaus 18.11. (sein Wort gilt als Ja zu diesen sichtbaren Änderungen): „man scrollt sich zu Tode“, „was ist, wenn man keine Zeit hat zum
Prüfen?“, im Verlauf versehentlich 25 Dateien zurücksortiert. Nur Oberfläche (`src/`), Kern (`lib/`) unverändert. Vorrat v36, Code 55.

- **Sortieren – alles auf einmal:** über der Prüfliste (`[data-pruef-leiste]`) Haken „Alle auswählen“ (`[data-pruef-alle]`), Haken je Zeile
  (`[data-pruef-wahl]`) und Knopf „Alle übernehmen“ / „Auswahl übernehmen (n)“ (`[data-alle-uebernehmen]`; ohne Haken = alle offenen, bei
  mehr als einer Datei mit Rückfrage). `alleUebernehmen` in `src/app.tsx` bestätigt je Datei jedes offene Feld mit dem Vorschlag – wie
  „Stimmt“ (Verlauf, Lernen); Felder ohne Vorschlag bleiben offen. Zurücknehmen über den Verlauf.
- **Verlauf:** Sortierung (`[data-verlauf-sortieren]`: neueste / älteste zuerst / nach Art = Geändertes vor Bestätigtem), Haken je Eintrag
  (`[data-verlauf-wahl]`, `[data-verlauf-alle]`). An der Zeile steht **kein Knopf mehr** – ein Tipp setzt nur den Haken. Darüber zwei
  beschriftete Knöpfe: „Aus Verlauf löschen“ (`[data-verlauf-loeschen]`, `verlaufLoeschen`: nur die Liste wird kürzer, Dateien und
  Gelerntes bleiben; immer mit Rückfrage) und „Rückgängig machen“ (`[data-rueckgaengig]`; ein Schritt sofort, mehrere nur nach Rückfrage).
  **Gelerntes:** `rueckgaengig` baute die Regeln bisher aus dem übrigen Verlauf neu auf – nach einem Löschen wäre dabei Gelerntes
  verloren gegangen. Jetzt nimmt es nur die eine Stimme dieses Schritts zurück (`verlernen` in `src/verlauf.ts`, Gegenstück zu `lernen`).
- **Finden:** das Auswahlfeld heißt „Sortieren“ statt „Sicht“ (`[data-sicht-wort]`; `[data-sicht]` und die Sichten unverändert – Bereich ›
  Art, Absender, Nummern … sind dabei, nichts Neues).
- **Flache Zeilen** (Finden, Prüfliste, grüne Liste): weniger Innenabstand, Name einzeilig mit …, Pfad bzw. Grund klein darunter,
  Auge/Stift/Papierkorb nur als Symbol (`.nur-symbol`) rechts in der Zeile – auch schmal (bis 640 px; Prüfliste dort: Name oben, darunter
  Grund und Knöpfe; „Noch offen: …“ entfällt schmal). Gemessen bei 390 px: jede Zeile höchstens 64 px, in Finden mindestens 10 Zeilen
  auf 600 px. Der ganze Grund steht im Hinweis der Zeile (title) und hinter dem Auge.
- **Seitenleiste** (`src/seitenleiste.tsx`, unter 1000 px Breite; Vorbild und Maße: Familienakte): Griff 18 × 76 px am rechten Rand,
  mittig, fest (`[data-leiste-griff]`); ein Tipp öffnet „Nach oben“, „Nach unten“, „Zurück“ (nur wenn es in der App eine Seite davor
  gibt) und die sechs Seiten (`[data-leiste=…]`), unten klein die Fassung (`[data-leiste-fassung]`). Klappt nach jedem Tipp zu; Tipp
  daneben oder Esc schließt.
- **Kopf im Rahmen einer anderen App** (`DO_RAHMEN`, Klasse `.im-rahmen` an `.app-shell`): nur **eine** Zeile – die Leiste der Seiten,
  rechts der Pfeil (`[data-mehr-knopf]`) mit den runden Knöpfen; Name, Fassung und Fähnchen entfallen dort (die Hülle hat ihre eigene
  Titelzeile; Fassung in Seitenleiste und Fuß). Gilt in jeder Breite, also auch am Tablet. Ohne Rahmen wie bisher höchstens zwei Zeilen.
- UI-Probe 195 (39 neu, alle sechs Punkte am Ergebnis geprüft, schmal bei 390 px und im Rahmen bei 390 und 820 px). **Am Gerät ungeprüft**,
  auch im echten Rahmen der Privaten Akte (die muss den Klon erst nachziehen). Nicht gebaut: Seitenleiste in APK/Windows eigens geprüft
  (gleiche Oberfläche, kommt mit der nächsten Ausgabe mit); „Zurück“ der Seitenleiste zählt nur Seitenwechsel in der App.

## Stand (17.11.2026 nachts): Betrieb im Rahmen der Privaten Akte (Übergabe-Stelle)

- **Im Rahmen einer anderen App** (Klaus 17.11.: der Organizer läuft als Klon in der Privaten Akte; Generalvollmacht für die Sitzung
  „Klone im Rahmen“): `src/rahmen.ts`. Setzt die Hülle vor dem Start `window.DO_RAHMEN = { name, uebergeben(paket) }` (ihre Brücke ist
  das erste Skript der Seite), meldet die App **keinen eigenen Service Worker** an, und auf der Seite „Familienakte“ steht zuerst die
  Karte **„An die <Name> übergeben“** (`[data-uebergabe]`, `[data-uebergeben]`): `uebergeben` in `src/app.tsx` gibt den Index als Text
  (`organizer-index.json`, mit oder ohne erkannten Text) und die Originale als `File` an die Hülle – ohne Ordnerwahl; Gesperrtes und
  Doppeltes bleibt zurück, nicht mehr erreichbare Originale werden gezählt (`fehlen`). Ohne `DO_RAHMEN` (Web-App, Android, Windows)
  ändert sich nichts. Kern (`lib/`) unverändert. Vorrat v35. UI-Probe 156 (6 neu). Die Private Akte zieht den Klon nach.
  **Nicht gebaut (aus dem Brief der Privaten Akte):** Scan-PDFs über die ersten 2 Seiten hinaus lesen (`SCAN_SEITEN`), Lage der Zeilen im Index.

## Stand (17.11.2026): Foto / Scan in der Web-App (Basic) – nicht in APK/Windows, erst nach Klaus' Prüfung

- **Foto / Scan (Klaus 17.11.: Dokumente, Rechnungen, Kassenbons mit der Handykamera; „erst einmal in der PWA-Version, dann wird das geprüft“,
  „ohne Erläuterungen“):** Ordner-Seite, erster Weg unter der Fläche (`[data-scan-knopf]`, nur ohne App: `nurWeb` in `src/seiten.tsx`). Die
  Kamera-App des Geräts macht das Bild (`[data-kamera-eingabe]`, `capture="environment"`), `src/scan.ts` verkleinert es (längste Kante 2400,
  JPEG) und dreht es gerade; Seiten sammeln sich im Scan-Kasten (`[data-scan]`: Fertig – übernehmen, Weitere Seite, Verwerfen, Seite entfernen).
  Eine Seite bleibt ein JPG, mehrere werden ein PDF (`pdfAusSeiten`, eigener kleiner Schreiber), Name `Scan_JJJJ-MM-TT_hh-mm-ss`; kommt zum
  Bestand dazu, die Texterkennung liest es. „Kopie speichern“ (gemerkt `do-scan-kopie`) lädt die Datei in Downloads – der Scan liegt sonst nur
  im Speicher der Seite. Kern unverändert. UI-Probe 141 (5 neu). Vorschau `docs/vorschau/scan-2026-11-17.png`. Am Gerät ungeprüft.
- **Klaus 17.11. am Tablet: „Foto hat funktioniert“.** Danach (sein Wort): die Pille „Kein Ordner“ im Kopf ist weg (mit Ordner bleibt
  `[data-ordner-pill]` mit Name und Anzahl), an der Stelle steht der runde Drucker-Knopf (`[data-drucken]`, nur Web-App, öffnet vorerst das
  Druckfenster des Geräts – der eigentliche Drucker-/Scanner-Auftrag kommt als Brief für die nächste Sitzung).
- **Kopf gekürzt (Klaus 17.11.: der Text unter dem Namen ist „viel zu lang“, nur die Nummer als Knopf, „V“ davor):** unter dem Namen steht
  nichts mehr; daneben der Knopf „V 0.4.14“ (`[data-fassung-knopf]`, in der Web-App = Aktualisieren, in der App wie bisher Update suchen), das
  rote Fähnchen kommt daneben. „Basic“/„Pro“ steht in der zweiten Zeile unter „Datei-Organizer“, Knopf und Fähnchen flach daneben
  (`.marke`, `.variante`). Am Handy (bis 480 px) stecken die runden Knöpfe hinter einem Pfeil (`[data-mehr-knopf]` klappt `[data-kopf-knoepfe]`
  auf), damit der Kopf zwei Zeilen hoch bleibt (Name, Leiste); die Ordner-Pille entfällt dort ganz (Klaus: „wir sehen ja, ob ein Ordner
  verbunden ist“; am Tablet/PC bleibt sie mit Ordner). Das gilt auch für APK/Windows ab der nächsten Ausgabe (gleicher Kopf). UI-Probe 141.
- **Scans in den Unterordner „Scans“ (Klaus 17.11., entschieden; gebaut 17.11. nur für „Ordner am PC“ in der Web-App):** ist der gewählte Ordner
  schreibbar, legt „Fertig – übernehmen“ den Scan als gewöhnliche Datei in `<Ordner>/Scans/` (`ablegen` in `src/quellen.ts`, `SCAN_ORDNER`,
  überschreibt nie; `scanAblegen`/`scanZiel` in `src/app.tsx`) und nimmt ihn mit dem Pfad `Scans/…` in den Bestand; der Scan-Kasten nennt dann
  das Ziel (`[data-scan-ziel]`) statt „Kopie speichern“. Ohne schreibbaren Ordner (Handy, Dateiauswahl) bleibt es bei der Kopie in Downloads.
  UI-Probe 145 (3 neu, Ordner im Test = privater Browser-Speicher). An einem echten PC-Ordner ungeprüft. **Am Handy ändert das nichts** – dort
  kommt der Unterordner erst mit Foto / Scan in der Android-App (Klaus' Wort offen).
- **Symbol der Basic-Fassung umgedreht (Klaus 17.11.: „innen die Strichgrafik blau, außen weiß … nur umgedreht, so pro Version“):** die Web-App
  trägt das blaue Zeichen auf einem Verlauf von Blau (außen) nach Weiß (nur in der Mitte hinter dem Zeichen; Klaus: „kräftiger, deutlicher“) (`symbolSvg(form, groesse, "basic")` in `scripts/symbol-bauen.mjs`;
  `icon-192/512`, `icon-maskable-512`, `favicon.svg`). Pro bleibt weiß auf Blau: Android `mipmap-*`, Windows nimmt jetzt
  `src/public/icon-pro-192.png` (byte-gleich mit dem bisherigen). Vorschau `docs/vorschau/symbol-basic-2026-11-17.png`. Das Zeichen im Kopf der
  Seite ist in Basic ebenso umgedreht (`.brand-symbol.basic`, Klaus' Ja 17.11.), in Pro unverändert. Ein schon installiertes Symbol auf dem Startbildschirm wechselt je nach Gerät erst nach Neuinstallieren.
- **Drucken (Klaus 17.11. abends):** gedruckt werden soll vor allem **vom Handy** (Web-App am Handy), am PC über die Windows-Fassung; beides testen.
  **Gebaut für die Web-App (Klaus' Ja 17.11. zur Vorschau `docs/vorschau/drucken-2026-11-17.png`):** der Drucker-Knopf im Kopf (`[data-drucken]`)
  druckt die Datei des zuletzt geöffneten Steckbriefs (`src/drucken.ts`: `druckZielSetzen`, `drucken`); ohne offene Datei druckt er die Seite, wie sie ist (Klaus 17.11.: der ausgegraute Knopf wirkte „zerschossen“). Foto als
  Bild, PDF als gezeichnete Seiten (höchstens 40, `DRUCK_SEITEN`), sonst der erkannte Text – in einem eigenen Blatt der Seite (`#druck-blatt`,
  `body.druckt`), weil ein PDF im neuen Fenster am Handy nicht verlässlich druckt. Den Drucker wählt das Druckfenster des Geräts. UI-Probe 149
  (4 neu, Druckfenster im Test ersetzt). Am Handy mit echtem Drucker ungeprüft. Offen: Android-App (eigener Aufruf nötig), Windows; welche
  „Notiz“ Klaus meinte. Recherche: Bluetooth aus dem Browser erreicht nur stromsparende Geräte, keine üblichen Drucker.
- **Installationsknopf für die Erstinstallation (Klaus 17.11.):** bietet der Browser an, die Web-App zu installieren, steht neben „V 0.4.14“ der
  Knopf „Installieren“ (`[data-installieren]`, `src/installieren.ts`, merkt das Angebot gleich beim Laden); nach dem Installieren und in der
  installierten App ist er weg. iPhone/Safari bietet das nicht an – dort kein Knopf. UI-Probe 150. Am Gerät ungeprüft.
- **Für APK/Windows offen (erst mit Klaus' Wort):** Android braucht dafür im FileProvider einen Pfad für das Kamerabild und die Abfrage
  `IMAGE_CAPTURE` im Manifest (`tools/native/test-native.mjs` prüft heute „nur update/“); **entschieden (Klaus 17.11.): Scans kommen in den Unterordner
  „Scans“ des gewählten Ordners** (heute schreibt die App dort nur den Index) und müssen später wieder herausgenommen und in ein Modul
  einsortiert werden können (Familienakte in Modulen – noch nicht entschieden).
- **Auftrag für die nächste Sitzung:** `docs/BRIEF_SITZUNG_2026-11-18_DRUCKER-SCANNER.md` (Drucken, externer Scanner über „Teilen“, Foto / Scan in APK/Windows; mit Startauftrag).
- **Ideen von Klaus (17.11., nice to have, nichts gebaut):** externer Dokumentenscanner am Handy (Bluetooth), Druckersymbol oben („Drucker
  verbinden“, drucken ohne Kabel). Einschätzung im Chat: Scanner-/Drucker-Apps (z. B. vom Hersteller) über „Teilen“ an die App geht in der
  Android-App schon (0.4.1); in der Web-App ginge „Teilen an“ und Drucken über das Druckfenster des Geräts, Bluetooth direkt aus der Seite nicht.

## Stand (15.11.2026): englische Rechnungen im Kern (für Private Brain)

- Kern erkennt Belege von Online-Diensten auf Englisch („Invoice“, „Receipt from …“, „Amount due/paid“, „Total due“, „Bill to“) als Rechnung;
  bei überwiegend englischem Text überstimmt das (deutsch gelernte) Art-Modell eine sichere Regel nicht mehr (`englischerText` in
  `lib/wortmodell.ts`); englische Feldnamen („Date due“, „Bill to“) und US-Ortszeilen sind keine Absender (`englischesFeld`, `US_ORT`).
  16 deutsche Prüfstapel (2.892 Stücke): Art, Bereich, Absender, Frist unverändert; Probe in `run-kern-tests.mjs` (4 neu, Gegenprobe 3/3).
  Auftrag aus Private Brain Pro (Brief dort `BRIEF_SITZUNG_2026-11-15_SUCHE-SORTIERKERN.md`). Familienakte und BookLedgerPro noch nicht nachgezogen.

## Veröffentlicht (16.11.2026 abends, Klaus' Wort „kannst du zusammenführen und veröffentlichen“): Datei-Organizer 0.4.13 – nicht erneut ausgeben

- **Android** `Datei-Organizer-Pro-0.4.13.apk` (Code 53, 72.127.288 B, SHA-256 `ec7a5e0b…7eec`, Lauf 43933651627), **Windows**
  `Datei-Organizer-Pro-Windows-0.4.13-x64-setup.exe` (87.293.242 B, SHA-256 `2b413a7c…5b07`, Lauf 43934877194), **Basic** über Pages. Stand `79e546c`.
  Inhalt: der folgende Abschnitt. Nachweis `docs/VEROEFFENTLICHUNG-0.4.13.json`. Nächste Ausgabe: **0.4.15** (Code 55, steht in den Quellen; 0.4.14 wurde nie ausgegeben).
  **Lehre:** die Android-Ausgabe erst starten, wenn der Prüflauf `android` auf dem main-Stand grün ist – sonst hält sie sich selbst an.
  Familienakte: Gegenstück zur neuen Kategorie auf main (#214), dort nicht ausgegeben (Klaus: noch nicht); Kern, Discovery, Landkarte dort auf dem Stand.

- **Abschlussbrief:** `docs/BRIEF_ABSCHLUSS_2026-11-16_ORDNERSEITE-KATEGORIE-0.4.13.md` (Stand, Gerätetest, Startauftrag). Familienakte 2.28.72 ist
  ausgegeben und enthält das Gegenstück zur neuen Kategorie. Forschung und Zeiten: KimHub `forschung/messungen/datei-organizer-2026-11-14-bis-16.md`.

## Inhalt von 0.4.13 (16.11.2026)

- **Update-Fähnchen (Klaus 16.11.: Update über den Knopf lief, das Fähnchen erschien nicht):** die stille Prüfung sperrte nach jeder Antwort – auch
  nach einem Fehlschlag gleich beim Start – eine volle Stunde. Jetzt nach „aktuell“ 10 Minuten, nach einem Fehlschlag 2 Minuten, Takt 15 Minuten
  (`RUHE_OK`/`RUHE_FEHLER` in `src/nativ.ts`). Ursache am Gerät nicht belegt, nur die wahrscheinlichste Stelle.
- **Ordner-Seite neu (Klaus 16.11.: „ein Klick oder hineinziehen, den oberen Container brauche ich nicht, der Pfad muss zu sehen sein, Arbeitsordner
  unter Einstellungen mit Zahnrad“):** eine Karte mit einer Fläche (`[data-ablage]`, Antippen = Ordner auf dem Gerät / am PC bzw. Dateien wählen,
  Hineinziehen fügt dazu), darunter klein „Einzelne Dateien“, „Ordner hochladen“, „Testordner“, „Zuletzt“. Überschrift nennt den Ordner, die Zeile
  darunter den Arbeitsordner. Der Arbeitsordner liegt hinter dem Zahnrad (`[data-einstellungen]`, nur in der App; klappt von selbst auf, wenn er fehlt).
- **Neue Kategorie erstellen (Klaus 16.11.):** jede Bereichs-Auswahl endet mit „+ Neue Kategorie erstellen …“ (`WertWahl` in `src/seiten.tsx`); der Name
  wird auf dem Gerät gemerkt (`do-eigene-kategorien`, höchstens 50) und steht danach in jeder Liste. Im Index reist er als Bereich der Datei mit
  („von dir“); die Familienakte schlägt ihn als neuen Lebensbereich vor (dort `lib/organizer-uebernahme.ts`, ab 2.28.72). Kern (`lib/`) unverändert –
  der Kern selbst ordnet nie in eine eigene Kategorie ein, das Lernen aus Korrekturen (`lib/lernen.ts`) schon. UI-Probe 130.
  Nachtrag (Klaus: „Unklar“ in der Liste war nicht als neue Kategorie zu erkennen; ändern ging nur im letzten Sieb): neben der Bereichs-Auswahl steht
  sichtbar der Knopf „Neue Kategorie“ (`[data-neue-kategorie-knopf]`); in der Prüfliste ist beim Ändern jedes Feld wählbar (`[data-feld-wahl]`),
  nicht mehr nur das gerade offene. UI-Probe 133.
- **Kopf und Vorschau (Klaus 16.11.):** Fassung (Link fürs Update) und Fähnchen stehen links neben dem Namen (`[data-fassung-platz]`), am Handy
  leichter zu treffen. Das Auge im Steckbrief zeigt bei einer PDF die ersten drei Seiten als Bild in der App (`pdfVorschau` in `src/pdf.ts`,
  `[data-pdf-vorschau]`, „Ganze PDF öffnen“) – vorher nur ein neues Fenster, das am Handy oft nicht aufging. Nach einem Neustart öffnet `original()` den gemerkten Ordner still wieder (Testordner, PC-Ordner mit Erlaubnis, App-Ordner). UI-Probe 136.
- **Landkarte Organizer auf den Stand gebracht** (`docs/landkarte/…`, `node scripts/landkarte-bauen.mjs`): Texterkennung, Datei-Innere, Ähnliche,
  Dashboard, große Mengen, Ordner auf dem Gerät sind „fertig“; neu „Teilen, Öffnen mit“ und „Arbeitsordner“. Seit 16.11. ist auch die **Übernahme in die
  Familienakte** „fertig“ (dort #203, `lib/organizer-uebernahme.ts`: Ordner als Eingangsordner wählen, der Index wird Vorschlag im Prüf-Fenster;
  ab Familienakte 2.28.71, am Gerät ungeprüft). Geplant bleiben: Vorarbeit für andere Programme/KI, Lehrer. Das Artefakt der Landkarte ist nicht neu veröffentlicht.

## Veröffentlicht (16.11.2026 vormittags, Klaus' Wort „kannst du zusammenführen und veröffentlichen“): Datei-Organizer 0.4.12 – nicht erneut ausgeben

- **Android** `Datei-Organizer-Pro-0.4.12.apk` (Code 52, 72.127.288 B, SHA-256 `e3532c3b…545b`, Lauf 43830528268), **Windows**
  `Datei-Organizer-Pro-Windows-0.4.12-x64-setup.exe` (87.291.066 B, SHA-256 `d9bebb29…4f1d`, Lauf 43831504145), **Basic** über Pages. Stand `b3517cc`.
  Inhalt: der folgende Abschnitt. Nachweis `docs/VEROEFFENTLICHUNG-0.4.12.json`. Nächste Ausgabe: **0.4.13** (Code 53).
  Discovery in den anderen Apps auf `b3517cc`: Familienakte #200, BookLedgerPro #479 (Basic danach); App-Ausgaben dort nur mit Klaus' Wort.

## Inhalt von 0.4.12 (16.11.2026, Gerätetest Klaus am Tablet)

- Discovery: unsichtbare Szenen der Film-Ansicht fangen keine Tipps mehr ab (`.sf-szene:not(.an){pointer-events:none}` – das Startbild lag über der
  Leiste des großen Videos: Lautstärke, Vollbild, Spulen gingen nicht); die Übersicht behält ihr Baum-Bild (`laden()` überschrieb es mit „undefined“,
  sobald eine Stadt gewählt war); der Knopf heißt „Intro abspielen“/„Intro anhalten“ (`fName`, „Führung“ nur noch ohne Film) und springt zurück,
  wenn während des Intros eine Stadt gewählt wird. Die 3D-Welt zum Drehen erreicht man über „In 3D erkunden“ unten links (Klaus: so logisch). **Start immer mit der Übersicht** (Baum-Bild mit den Städten; Klaus 16.11.: „soll immer so starten“, `App.filmZuerst = !LEICHT`, die 3D-Wahl wird nicht mehr als Start gemerkt – ersetzt „Tablet startet wieder mit dem 3D-Baum“ weiter unten); der Hinweis heißt nur noch „Die 3D-Ansicht läuft auf diesem Gerät nicht flüssig.“ und erscheint nur nach einer schlechten Messung. Der Rückweg aus 3D (`#bStadtfilm`) heißt jetzt „Übersicht“ wie der Eintrag in der Stadtwahl (Klaus' Ja 16.11.).
  Die anderen Apps (Familienakte, BookLedgerPro, Basic) tragen noch den Stand `213c81b` – mit 0.4.12 nachziehen.

## Veröffentlicht (16.11.2026 morgens, Klaus' Wort „auch die 0411 … ausgeben“): Datei-Organizer 0.4.11 – nicht erneut ausgeben

- **Android** `Datei-Organizer-Pro-0.4.11.apk` (Code 51, 72.127.288 B, SHA-256 `11b4881f…580f`, Lauf 43820511694), **Windows**
  `Datei-Organizer-Pro-Windows-0.4.11-x64-setup.exe` (87.288.785 B, SHA-256 `e9ae19ab…0edc`, Lauf 43821311206), **Basic** über Pages. Stand `213c81b`.
  Inhalt: alles, was unten als „nach 0.4.10“ steht (neue Kiosk-Szene, Film bei „Führung starten“ mit Spul-Leiste, Untertitel, 3D-Baum als Start
  am Tablet, Zugabe-Murmel, neuer Schluss von „Runde für Runde“). Nachweis `docs/VEROEFFENTLICHUNG-0.4.11.json`. Nächste Ausgabe: **0.4.12** (Code 52).
  **Discovery in den anderen Apps (Klaus 16.11.: im Paket, nicht nachladen):** BookLedgerPro #478 und BookLedger Basic #55 zusammengeführt, Familienakte
  #196 offen bis zur grünen Prüfung – je mit Fernrohr in der Kopfleiste, Stand `213c81b`; App-Ausgaben dort (rund 55 MB größer) nur mit Klaus' Wort.

## Veröffentlicht (16.11.2026 nachts, Klaus' Wort „Prüf weiter und dann veröffentliche bitte“): Datei-Organizer 0.4.10 – nicht erneut ausgeben

- **Android** `Datei-Organizer-Pro-0.4.10.apk` (Code 50, 72.287.032 B, SHA-256 `37a49cfb…9a51`, Lauf 43787235867), **Windows**
  `Datei-Organizer-Pro-Windows-0.4.10-x64-setup.exe` (87.427.855 B, SHA-256 `a01cb836…5aeb`, Lauf 43787862699; nacheinander gestartet, beide im
  ersten Versuch grün), **Basic** über Pages. Stand `63a2cb5`. Inhalt: „reihum“ neu gesprochen, nur noch der Klick als Geräusch, Stadtwahl immer
  antippbar, Standbild beim Laden, Ladeanzeige mit drei Murmeln. Nachweis `docs/VEROEFFENTLICHUNG-0.4.10.json`.
  Nächste Ausgabe: **0.4.11** (Code 51, steht in den Quellen). Offen: Figur mit mehreren Augen (Kiosk-Schlange), ältere Ladeanzeige am Kugel-Film.

## Veröffentlicht (16.11.2026, Klaus' Wort „49 kannst du starten“): Datei-Organizer 0.4.9 – nicht erneut ausgeben

- **Android** `Datei-Organizer-Pro-0.4.9.apk` (Code 49, 72.282.936 B, SHA-256 `0bed7948…3ba1`, Lauf 43783092615), **Windows**
  `Datei-Organizer-Pro-Windows-0.4.9-x64-setup.exe` (87.423.909 B, SHA-256 `16132f92…3af4`, Lauf 43783094960, Hochladen erst im zweiten Versuch),
  **Basic** über Pages. Stand `6665bae`. Inhalt: ohne erzeugte Hintergrundmusik, ruhige Musik in den vier Filmen, „Film-Ansicht“ als Rückweg aus 3D,
  kein Knopf „Stadtfilm“. **Nicht** darin: „reihum“ neu gesprochen (0.4.10 auf main). Nachweis `docs/VEROEFFENTLICHUNG-0.4.9.json`.
  Nächste Ausgabe: **0.4.10** (Code 50, steht in den Quellen). **Lehre: Android- und Windows-Ausgabe nicht gleichzeitig starten** – beide laden auf
  denselben Server, der zweite bricht ab („Another instance of rrsync“); erst Android, dann Windows, oder den abgebrochenen Schritt einmal neu starten.

## Veröffentlicht (15.11.2026 nachts, Klaus' Wort „0.4.8 veröffentlichen“): Datei-Organizer 0.4.8 – nicht erneut ausgeben

- **Android** `Datei-Organizer-Pro-0.4.8.apk` (Code 48, 71.185.208 B, SHA-256 `e137adbc…ca2f`, Zertifikat `594e44df…365d`, Lauf 43776349955), **Windows**
  `Datei-Organizer-Pro-Windows-0.4.8-x64-setup.exe` (86.209.730 B, SHA-256 `ee747b76…3133`, Lauf 43776351795), beide auf
  `family-projekt.de/updates/datei-organizer/`, **Basic** über Pages. Stand `908b3d3`. Inhalt: Discovery mit Stimme „Arthur“, echten Kurzfilmen,
  Murmel-Kreislauf-Film, Stadtfilm, zwei Kurzvideos, Film-Ansicht der Bühne, großem Video bei „Führung starten“, Ladebalken (unten als „nicht
  ausgegeben“ beschrieben – das ist mit 0.4.8 ausgegeben). **Paket durch die Filme viel größer** (APK 16 → 71 MB, Windows 31 → 86 MB).
  Nachweis `docs/VEROEFFENTLICHUNG-0.4.8.json`. Nächste Ausgabe: **0.4.9** (steht schon in den Quellen). Vorher: 0.4.7, 0.4.6, 0.4.5, 0.4.4, 0.4.3.
  Die Läufe brauchen ein öffentliches Repo (privat: „spending limit“, nichts startet).

## Stand (15.11.2026, Discovery – bis 0.4.8 veröffentlicht, 0.4.9 auf main)

- **Discovery (Klaus 15.11.: „mache aus der Doku einen Teil des Repos, Button Discovery“):** Fernrohr-Knopf im Kopf (`data-discovery-knopf`,
  `src/app.tsx`) öffnet `src/public/discovery.html` – die interaktive Doku „so wurde der Sortier-Kern trainiert“: 3D-Baum mit den Test-Welten,
  Kreislauf aus sechs Glaskugeln (Raten, Soll, Lernen, Reihum, Einfrieren, Messen), Führung, drei Kurzfilme. **Ton aus dem Browser nur noch der Klick beim Antippen** (Klaus 16.11.: keine erzeugte Hintergrundmusik – das Klingeln lenkt ab, seit 0.4.9; kein Briefrascheln alle paar Sekunden und keine anderen Geräusche – „stört und ergibt keinen Sinn“, 0.4.10; `spiel()` lässt nur `klick` durch). **Ruhige Musik in den vier Filmen mit eingebranntem Ton** (Klaus 16.11.: je Film eine andere, aber ähnlich; Higgsfield/ElevenLabs Music, rund 19 LU unter Arthur, ein- und ausgeblendet): `discovery-geschichte.mp4` Klavier/Streicher, `-kurzgeschichte.mp4` Gitarre/Cello, `-runden.mp4` E-Piano/Streicher, `-kreislauf.mp4` Fläche/Klavier – bei neuem Schnitt die Musik wieder daruntermischen (nur die Tonspur, Bild unverändert).
  **Gerätetest 0.4.9 (Klaus 16.11., Tablet, 0.4.10):** Stadtfilme zeigen beim Laden ihr Standbild (`poster`; Android zeigte sonst ein graues Abspiel-Zeichen) und laufen beim Wählen der Stadt von selbst; die Leiste unten (`.sf-leiste`) ist nur so breit wie ihre Knöpfe (sie deckte die zweite Zeile der Stadtwahl zu – „Musterhausen am Rhein“ und „Familienakte“ ließen sich nicht antippen); bei offener Karte rückt die Stadtwahl neben die Karte (`.buehne.karte-offen`). **Ladeanzeige** = drei kreisende Murmeln mit der Prozentzahl in der Mitte (`.film-lade`, `ladeBalken`).
  **Nach 0.4.10 (16.11., auf main bzw. Arbeitszweig, nicht ausgegeben):** Untertitel laufen auch beim großen Video (`UT_GROSS` in `App.stadtFilm`: Zeitmarken der fünf Abschnitte – bei neuem Schnitt mitziehen; vorher tat der Knopf in der Film-Ansicht nichts); Knopf „Stimme“ ist aus der Bühne heraus (die Stimmwahl steht nur noch bei den Kurzfilmen); im Text `welten` füllt „Der Zettel fliegt weg.“ die Pause, danach „Den fängt der Kern ein und ordnet ihn richtig zu.“ (Tonspur: wA + neuer Satz bei 19,3 s + Schlusssatz bei 22,76 s). Die Kurzform, „Runde für Runde“ und der Kugel-Film haben keine Untertitel (Ton eingebrannt, nur die Steuerung des Browsers).
  **Großes Video bedienbar (Klaus 16.11., Tablet 0.4.10: „kann nicht abbrechen, nicht spulen; nach Anhalten schwarzes Bild mit Punkten“):** beim großen Video zeigt der Film die Leiste des Browsers (Anhalten, Spulen; `landV.controls`, Klasse `gross` an `.stadt-film` rückt die eigenen Leisten darüber); nicht aktive Filme sind `visibility:hidden` (Android zeichnet Videos zum Teil in eigener Ebene, die Durchsichtigkeit zählt dort nicht – Vermutung, am Gerät nicht geprüft). Offen bei Klaus: der drehbare 3D-Baum ist am Tablet nur über „In 3D erkunden“ zu erreichen und zeigt dort offenbar nichts Brauchbares; die Geschichte oben und die Kurzform darunter wirken doppelt (siehe Vorschlag vier Abschnitte).
  **Tablet startet wieder mit dem 3D-Baum (Klaus 16.11.):** abgestürzt waren die 3D-Kugeln unten bzw. beide 3D-Flächen zusammen, nicht der Baum – die Schritt-Führung (3D-Baum und Filme im Wechsel) lief am Tablet. `App.filmZuerst` hängt darum nicht mehr an `MOBIL`, nur noch an der gemerkten Wahl (`tw-buehne`) und der Messung (`tw-buehne-schwach`). In der 3D-Ansicht läuft bei „Führung starten“ die Schritt-Führung, in der Film-Ansicht das große Video. Die Kugeln unten bleiben am Tablet als Film vorgewählt. Der Kugel-Film nutzt dieselbe Ladeanzeige (`ladeBalken`), sie erscheint erst nach dem Start.
  **Ablauf der Bühne (Klaus 16.11. morgens, sein Wort):** Start mit dem drehbaren 3D-Baum; **„Führung starten“ spielt in jeder Ansicht das große Video** im Rahmen (`App.stadtFilm.hatGross`, aus 3D wechselt `gross()` in den Film-Rahmen); nach dem Film bleibt das Baum-Bild mit den antippbaren Städten, „In 3D erkunden“ führt zurück. Die Schritt-Führung läuft nur noch, wo es den Film nicht gibt (leichte Ansicht, weniger Bewegung, Einzeldatei). **Die 43-Sekunden-Kurzform ist nur noch eine Zugabe** hinter einer kleinen Murmel unter „Runde für Runde“ (`#zugabeKnopf`), weil sie dieselbe Geschichte wie der Film oben erzählt.
  **Aussprache (Klaus 16.11.):** „reihum“ spricht Arthur sonst mit hörbarem H – für die Aufnahme „Rei-um“ schreiben (`kreis_reihum.mp3` und der Abschnitt im Kugel-Film sind so neu gesprochen; der Text auf der Seite bleibt „Reihum“). **Kiosk-Szene neu (16.11., Klaus' Ja, nach 0.4.10, nicht ausgegeben):** `discovery-stadt-leben-2.mp4` neu gedreht – hinten hatte eine Figur mehrere Augen. Lehre: der Fehler steckte im Ausgangsbild (lange Schlange kleiner Figuren); ein Neudreh vom selben Bild brachte ihn wieder (56 Credits ohne Nutzen). Erst ein neues Ausgangsbild mit nur vier Figuren am Schalter, dann der Film – sauber. Bei Filmfehlern zuerst das Ausgangsbild prüfen. Das große Video ist damit neu geschnitten (Rezept wie zuvor: sieben Clips mit 0,8 s Überblendung; Ton: begruessung 0,4 s · welten Teil A 6,4 s · „Der Zettel fliegt weg.“ 24,9 s · Schlusssatz 28,2 s · stadt_agenten 32,3 s · stadt_punkte 45,5 s · schluss 61,0 s; danach die Musik). Die Kurzform und „Runde für Runde“ sind unverändert.
  Sprecher: 13 Tonspuren `src/public/discovery-ton/<schluessel>.mp3` (seit 15.11. abends Stimme „Arthur“ über Higgsfield/ElevenLabs, Klaus' Wahl, auf main, nicht ausgegeben; vorher Sprachgenerator, Tempo 0,9; der Kreislauf-Film trägt dieselbe Stimme, Bild unverändert; Texte im
  Objekt `SPRECHTEXTE` der Seite – bei Textänderung neu vertonen), sonst Browserstimme. three.js r128 liegt bei (`discovery-three.min.js`, MIT),
  keine fremden Quellen. **Segmente:** am Tablet/Handy ist immer nur eine 3D-Fläche geladen (`window.Segmente`: die andere gibt ihre Grafik
  frei, lädt in Sicht oder auf Tipp nach) – Grund: das Galaxy Tab S6 zeigte mit zwei 3D-Flächen fehlende Schrift und schwarze Flächen.
  **Kreislauf als Film** (`discovery-kreislauf.mp4`, 64 s, mit den Tonspuren; Knöpfe „Als Film“/„Interaktiv in 3D“, am Tablet/Handy ist der
  Film vorgewählt, Ladebalken; aufgenommen Bild für Bild aus der 3D-Fassung – bei geänderten Kugeln oder Tonspuren neu aufnehmen). Die drei
  Kurzfilme laufen lückenlos hintereinander, ohne Ansage „Erster Film“.
  Knopf „Leichte Ansicht (ohne 3D)“ als Notausgang, Rückweg „‹ Zurück“ (im Rahmen einer anderen App ohne Knopf). Zahlen stammen aus der eingebetteten Messdatei (`const D`) –
  nicht von Hand ändern. UI-Probe 126 (4 neu). Dasselbe als Artefakt: https://claude.ai/artifact/1G6GPbK29HpWaTCGV5bBCk.
  **Führung:** bei den sechs Kugel-Schritten läuft der Kreislauf-Film stumm im Rahmen der Stadt (`App.kreisBuehne`), kein Sprung nach unten.
  **Untertitel** (für Hörbehinderte) sind ab Werk aus: Knopf „Untertitel“ im Rahmen schaltet die Textleiste unten ein (gemerkt); ist der Ton aus,
  erscheint sie von selbst. „Weiter“ steht während der Führung oben neben „Führung anhalten“.
  **Kurzfilme wie ein Video** (0.4.8, nicht ausgegeben): keine Überschrift, keine Kästen daneben; Abspielen und Lautsprecher als runde Knöpfe im
  Bild, der Sprechtext darunter nur mit Untertiteln.
  **Kurzfilme als echte Filme (15.11. abends, Higgsfield, nicht ausgegeben):** „Der Briefträger“ und „Der Kern rät“ laufen als Video
  (`discovery-film-brieftraeger.mp4`, `discovery-film-kern.mp4`, je 8 s, ohne Ton – gesprochen wird weiter über die Tonspuren; Figuren mit
  Gesicht, Klaus: „absolut cool“); fehlt die Datei oder ist „weniger Bewegung“ gewünscht, läuft die gezeichnete Fassung (`filmAdr`, `zeigVideo`).
  „Der Strafzettel“ ebenfalls als Film (`discovery-film-strafzettel.mp4`, 10 s, Murmel schwebt). Die Einzeldatei bettet die Kurzfilme mit ein.
  **Kreislauf-Film im Murmel-Stil (15.11. nachts, nicht ausgegeben):** `discovery-kreislauf.mp4` ist jetzt aus sechs Higgsfield-Filmen geschnitten
  (je Kugel eine Murmel mit Gesicht: Raten türkis, Soll orange, Lernen violett, Reihum grün, Einfrieren eisblau, Messen rosa), Längen genau wie
  `FILM.zeiten`, Tonspur = die sechs `kreis_*`-Tonspuren, schwebender Titel je Schritt eingebrannt; zeigt keine Zahlen mehr (die stehen im Text daneben).
  Die interaktive 3D-Fassung der Kugeln ist unverändert.
  **Stadtfilm (15.11. nachts; seit 16.11. gibt es den Knopf „Stadtfilm“ nicht mehr – Klaus: Doppelung zu „Führung starten“, bei ihm ohne Arthur. `#bStadtfilm` heißt jetzt „Film-Ansicht“, ist nur in der 3D-Ansicht zu sehen und führt zurück zum Baum-Bild, ohne etwas abzuspielen; die Szenen laufen weiter in der Schritt-Führung der 3D-Ansicht):** Knopf „Stadtfilm“ im Rahmen und Führungsschritte „Die Welten“/„Die Punkte“ (`App.stadtFilm`,
  14. Tonspur `stadt_punkte`): vier Städte in vier Bildwelten als Filmsequenzen (`discovery-stadt-0…3.mp4`, Standbild `.jpg` als Ersatz: Hafen am
  Abend, Landstädtchen am Morgen, Steampunk-Großstadt, Zukunftsstadt am Fluss), Stadtname als große dünne Filmschrift im Bild (Klaus: keine
  Knopf-Optik, Schrift soll sich ins Bild einfügen); dann `discovery-stadt-landung.mp4` (die Murmeln landen in der Hafenstadt und übernehmen die
  Aufgaben der Agenten), danach die Punkte je Stadt (aus `D.welten[].agenten`) – Antippen öffnet die Karte der Stadt. Bei „weniger Bewegung“ und
  in der Einzeldatei nur die Standbilder. **Drehbuch (Klaus' Ja 15.11. nachts: „Drehbuch passt, Baum als Ende, Bewohner wie der Briefträger“), zwei Geschichten:**
  (1) **oben im Rahmen, interaktiv** (`App.stadtFilm`, Tabelle `CLIPS`, Führung in dieser Reihenfolge): Baum mit vier Städten (`discovery-stadt-baum.mp4`,
  zum Text `begruessung`) → Recherche in 3D → die Städte leben, Bewohner = bunte Figuren mit Beinen im Stil des Briefträgers (`…-leben-1/2.mp4`,
  `welten`) → Zwischenszene Strafzettel (derselbe Film wie der dritte Kurzfilm, Klaus' Wunsch; `welten` endet darum mit „… auch Strafzettel.“ – Pause, bis die
  Murmel im Film fängt – „Die fängt der Kern ein und ordnet sie richtig zu.“; die Tonspur ist aus zwei Aufnahmen gesetzt, zweiter Satz bei 22,7 s; die Kurzform behält den kürzeren Satz, weil ihr Bild kürzer ist) → die Murmeln (= die Agenten, schwebend) teilen sich auf die vier Städte auf, Zoom in die Hafenstadt (`…-flug.mp4`, neuer Text
  `stadt_agenten`) → Landung und Aufgaben (`…-landung.mp4`, `stadt_punkte` neu gesprochen), dann die Punkte zum Antippen → sechs Kugeln →
  Finale: die Murmeln verschmelzen zu einer und liefern im Archivhaus in der Baummitte ab (`…-finale.mp4`, `schluss` neu gesprochen, beginnt jetzt
  mit „Aus vier Städten kommt alles wieder zusammen.“). 15 Tonspuren. Die Filme sind stumm, Arthur kommt aus den Tonspuren; allein über den Knopf
  „Stadtfilm“ wartet jede Szene, bis Film und Text zu Ende sind. (2) **unter dem Rahmen die Kurzform** nur mit den Murmeln:
  `discovery-kurzgeschichte.mp4` (43 s, Ton eingebrannt, älteres Finale und ältere Texte – so von Klaus gelobt, nicht neu schneiden ohne sein Wort;
  einzige Änderung auf seinen Wunsch: der Satz beginnt mit „Wir haben Städte erfunden.“ statt „Dann haben wir …“, auch in `welten`).
  Die Führung wartet, bis der laufende Erzähl-Film zu Ende ist (`App.stadtFilm.wartet`).
  **Zweites Kurzvideo „Runde für Runde“ (Klaus' Ja zum Drehbuch 15.11. spät):** `discovery-runden.mp4` (58 s, Ton eingebrannt; Schluss seit 16.11.: das letzte Bild wird blasser statt wegzuzoomen (Klaus), darüber Schrift und Arthur „Je mehr du einordnest und verbesserst, umso besser wird sie/die App.“) unter der Kurzform:
  erste Stadt → neuer Ast, neue Stadt, Blick hinein (neu gedreht) → Folge der vier Städte → was nicht hilft, fliegt raus (7 Versuche, 3 behalten) →
  Verschmelzen und Archivhaus (ohne echten Brief, rund 4.700 erfundene Stücke) → zu Hause: eigene Unterlagen, die App lernt aus Korrekturen
  (neu gedreht). Zahlen aus `const D`. Offen bei Klaus: ob es die Kurzform ersetzen soll; ob die Strafzettel-Murmel Beine bekommen soll.
  Weitere Filme nur nach Drehbuch und Klaus' Ja; Übergänge durch Überblenden statt Neudreh. Discovery-Ordner rund 50 MB.
  **Film-Ansicht der Bühne (Klaus 15.11. nachts, nach #47, nicht ausgegeben):** der Baum als Standbild (`discovery-kurzgeschichte.jpg`) ist der
  Hintergrund der Bühne, die vier Städte und die Familienakte darin sind antippbar (`start()` in `App.stadtFilm`), die Erklärfilme laufen im selben
  Rahmen; „In 3D erkunden“ schaltet auf die 3D-Ansicht. Vorgewählt am Tablet/Handy; am Rechner misst die Seite den Bildabstand der 3D-Bühne
  (`messeB`, über 40 ms → Film-Ansicht mit Hinweis, gemerkt `tw-buehne-schwach`, Wahl `tw-buehne`); solange die Film-Ansicht die Bühne deckt, ruht
  die 3D-Schleife (`App.buehneRuht`); ist die Film-Ansicht vorgewählt, wird die 3D-Welt gar nicht erst gebaut (`App.baue3D`, erst auf „In 3D
  erkunden“; Klaus: das Tablet stürzt bei 3D ab), am Tablet rechnet sie mit einfacher Auflösung. **„Führung starten“ spielt in der Film-Ansicht
  das große Video am Stück** (`discovery-geschichte.mp4`, 75 s, Ton eingebrannt, `App.stadtFilm.gross`); die Schritt-Führung bleibt der 3D-Ansicht.
  Leichte Ansicht (2D) bleibt der Notausgang. **Ladebalken an jedem Film** (`ladeBalken`). **Die alten
  gezeichneten Kurzfilme werden nicht mehr gezeigt** (Klaus: „grottenschlecht“; kein Rückfall mehr, der Zeichen-Code steht nur noch ungenutzt in der Seite).
  **Vorschlag für eine klare Reihenfolge (15.11. nachts, von Klaus nur zur Kenntnis genommen – „merke das erstmal“, NICHT gebaut, erst nach seinem
  Ja):** vier Abschnitte – (1) Die Geschichte: Baum-Bild, ein Knopf „Geschichte abspielen“ statt „Führung starten“ und „Stadtfilm“, 3D und einfache
  Ansicht als kleine Wahlknöpfe; (2) So lernt der Kern: Kugel-Film mit den sechs Schritten; (3) Runde für Runde mit den Ergebnissen darunter;
  (4) Zum Schmunzeln: Kurzfilme. Dafür entfielen die 43-s-Kurzform und der Strafzettel bei den Kurzfilmen. Außerdem offen (nur als Drehbuch, nichts
  drehen ohne Ja): ein neues drittes Kurzvideo mit denselben Figuren (Poststelle, andere Geschichte) und die Runden 1–3 als Filmfolgen zum Antippen
  der Murmeln. Klaus sah am 15.11. nachts auf dem Tablet noch eine alte Fassung (App 0.4.7 oder Vorrat des Browsers) – vor weiteren Wünschen erst
  sicherstellen, dass er den aktuellen Stand sieht.
  **Idee von Klaus für den nächsten Umbau (15.11., nichts ändern ohne sein Wort):** Stadtname nach
  dem Einblenden wieder verschwinden lassen; Rollen-Namen nicht dauernd mitfliegen lassen, sobald die Rolle bekannt ist (die Murmel/der Punkt
  wird größer, wenn sie gerade erklärt wird). Discovery-Ordner jetzt rund 50 MB – **Paketgröße von APK/Windows vor der nächsten Ausgabe prüfen.**
  **Leistungsprüfung:** im Hintergrund wird gemessen, wie flüssig das Gerät zeichnet (`messe`); zu langsam, ruckelnde oder abgebrochene
  Kugeln → Hinweis „geht auf diesem Gerät nicht flüssig“, Film statt 3D, gemerkt (`tw-kugeln-schwach`), „Trotzdem versuchen“.
  **Nach 0.4.6 (auf main, nicht in den Apps):** Schilder blenden sich aus, wenn eine andere Stadt davor steht; **Einzeldatei zum Versenden**
  `node scripts/discovery-einzeldatei.mjs [ziel]` (≈ 8 MB, alles eingebettet, nicht ins Repo legen). Klaus 15.11. am Galaxy Tab S6: „läuft alles“
  (Artefakt Version 12: Film, Kurzfilme, Umschalter).

## Stand (14.11.2026): Pseudonymisierer 0.1.0 (PWA, zweite Seite in diesem Repo)

- **Pseudonymisierer** (Klaus 14.11.): Ordner/Dateien → pseudonymisierte Fassung für jede KI → Antwort zurückführen; Bilder mit frei setzbaren
  schwarzen Flächen (Bedienung wie Kontur-Werkzeug Tomys Hub), Bild zurück mit Original an den Stellen. Seite `app/pseudonymisierer.html`
  (Quelle `src/pseudonymisierer.html`, `src/pseudo/`, Kern `lib/pseudo/`), Kurzadresse `/pseudonymisierer/`. **Maske byte-gleich aus der
  Familienakte** in `lib/maske/` + `src/public/vendor/maske/` (Pin, nur `node scripts/maske-nachziehen.mjs`, im Bau geprüft) – nie von Hand.
  Proben `scripts/run-pseudo-tests.mjs` (im Bau), `tests/pseudo-probe.mjs` (CI). Alles: `docs/PSEUDONYMISIERER.md`, Brief
  `docs/BRIEF_ABSCHLUSS_2026-11-14_PSEUDONYMISIERER.md`. APK/Windows erst mit eigenem Repo (Klaus legt es an). Fassung steht in
  `src/pseudo/app.tsx` (`FASSUNG`), unabhängig vom Datei-Organizer.

## Stand (14.11.2026, Absender-Runde, nicht veröffentlicht)

- **Absender aus Scans/Fotos nachgewiesen besser** (Klaus: „erst die Absenderoptimierung, danach in die anderen Apps“): am neuen Stapel
  `pruefstapel-absender` mit Bildern des zweiten unabhängigen Simulators (`scripts/kreuz2/`) 29,5 → 49,0 % (nur neu 39, nur alt 0, p ≈ 4·10⁻¹²),
  Text und Nebenfelder nicht schlechter. Kern `079dd6d` (`ocrRand`, `KEIN_ABSENDER` in `lib/erkennen.ts`). Alles: `docs/TRAINING-WOCHENENDE-ERGEBNISSE.md`
  (letzter Abschnitt), Regeln und Rollen `docs/PRUEFSTAPEL-TRAINING-WOCHENENDE-REGELN.md`. Werkzeuge: `scripts/absender-lernstand.mjs`, `kopf-zeigen.mjs`,
  `absender-nachweis.mjs`. Nächster Schritt: in die anderen Apps (Familienakte erst nach der Pseudonymisierungs-Sitzung, mit Klaus' Ja).
- **App-Symbol in 3D** (Klaus 14.11.: Ja, runde Ecken, kein Außenrand): Quelle `scripts/symbol-bauen.mjs` (`--schreiben` setzt PWA, Windows, Android), eingesetzt (#31), ausgegeben mit 0.4.4.
- **Nachgezogen:** BookLedgerPro #474 und BookLedger Basic #53 (Sortier-Kern `079dd6d`, nicht veröffentlicht). **Familienakte noch nicht:** 14.11. abends liefen dort noch
  Pseudonymisierungs-Sitzungen („Pseudo-Fenster Weiterentwicklung“, „Datei-Pseudonymisierer Tool“) – erst nachziehen, wenn sie fertig sind.

## Stand (14.11.2026, Trainings-Wochenende Teil 1, nicht veröffentlicht)

- **Training (Freibrief, ohne Codex):** Block 0 (Setzer `scripts/setzen-komplex.py`, Generator `--komplex` mit 26 Haushalten, lange Bons,
  App-Bons, Leser `scripts/leser-node.mjs`), Block 1 (Lauf in Teilen: `src/lauf.ts` `LaufSchreiber`; Merken bei 20.000 von 1.069 auf 52 ms je
  1.000), Runden C, E, D, F und ungesehener Rest (je drei Claude-Einordner + Autor, alle verbraucht), Block 5: der Absender-Gewinn (34 → 43 %) war ein
  Kreisschluss mit dem eigenen Setzer – Regeln wieder aus dem Kern (`docs/PRUEFBERICHT-EHRLICHKEIT-2026-11-14.md`); Wortmodell unverändert.
  **Lehre:** Nachweise an gesetzten Scans nur mit einem unabhängig gebauten Setzer oder echten Unterlagen. Alles: `docs/TRAINING-WOCHENENDE-ERGEBNISSE.md`, Brief
  `docs/BRIEF_ABSCHLUSS_2026-11-14_TRAINING-WOCHENENDE.md`, Übernahme vorbereitet `docs/UEBERNAHME-VORBEREITUNG-2026-11-14.md`.
- Messen am Prüfstapel: alt/neu als Worktrees (`laeufe/kern-…`), Soll = `SOLL.json` aus drei Einordnern (`scripts/soll-aus-einordnern.mjs`),
  gesetzt mit `--gesetzt` (Texterkennung wie die App). Generator ohne `--komplex` ist absichtlich alt (Zufall im Kreis, nur für alte Vergleiche).

## Stand (14.11.2026, Fassung 0.4.3, große Ordner)

- **A–D gebaut** (Klaus' Ja 14.11.): Leistung des Geräts, große Dateien Stück für Stück (Prüfsumme in der App am Ort), **Arbeitsordner**
  `Datei-Organizer-Arbeit` auf dem gewählten Laufwerk (nie im Pro-Tresor), schlanke Liste, Speicherprüfung vor jedem Block. Alles:
  `docs/PLAN_GROSSE-ORDNER.md` (Abschnitt „gebaut“, Abweichung beim Ort benannt). Code `src/arbeit.ts`, `src/sha256.ts`; Verträge
  `pruefsumme`/`speicherFrei`/`arbeitsordner` in `windows/bridge/contracts.json` = Android.

## Offen (Klaus 14.11.2026)

- **Sehr große Ordner:** gebaut und veröffentlicht in 0.4.3 (oben).
- **Signier-Identität der APK** steht (#17, Fingerabdruck `594e44df…365d`); Update-Schlüssel eingetragen (#16). Geheimnisse bei Klaus im Tresor.
- **Browser-Tresor → Tresor-APK:** Plan `docs/PLAN_MEIN-TRESOR-APK.md` (später, eigenes Repo).

## Stand (14.11.2026 nachts, Fassung 0.4.2, große Mengen in Blöcken, nicht veröffentlicht)

- **Große Mengen in Blöcken mit Weitermachen nach Abbruch** (Auftrag aus dem Brief vom 14.11., Klaus: „Schritt für Schritt“): das Einlesen merkt nach
  jedem Block (50 Dateien, `BLOCK` in `src/lauf.ts`) den Stand in IndexedDB (`laufSpeichern`, Schlüssel `lauf` neben dem Zustand). Knopf **„Anhalten“**
  unter dem Ladebalken der Ordner-Karte; Kasten **„Einlesen angefangen“** mit „Weitermachen“/„Verwerfen“ (auch nach Neustart oder Absturz).
  Weitermachen öffnet die Quelle ohne Auswahl-Fenster, wo das geht (Testordner, gemerkter PC-Ordner, gemerkter App-Ordner), sonst die Bitte, sie
  noch einmal zu wählen; schon Gelesenes (Pfad + Änderungsdatum) wird übersprungen, das Ergebnis ist dasselbe wie in einem Zug. UI-Probe 97 (8 neu),
  Gegenprobe 3/3. Kern (`lib/`) unverändert.
  **Update-Schlüssel eingetragen (Klaus 14.11., Schritt b):** `UpdateFeed.SCHLUESSEL` = `DesktopUpdates.SCHLUESSEL`, Geheimnisse `UPDATE_SIGNING_KEY`/`UPDATE_UPLOAD_KEY`
  gesetzt. Klaus 14.11.: **erst die App fertig** (Signier-Identität, Veröffentlichen), **keine Tests mit großen Mengen** davor. ⚠ Nicht gemessen: echte Mengen über ~800 Dateien (Speicher, Dauer), am Gerät. Brief:
  `docs/BRIEF_ABSCHLUSS_2026-11-14_GROSSE-MENGEN.md`. Baut auf PR #15 (Windows) auf.

## Stand (14.11.2026 nachts, Fassung 0.4.1, Windows-App und Android-Lücken, nicht veröffentlicht)

- **Datei-Organizer Pro für Windows** (Auftrag aus dem Brief vom 13.11.): `windows/` nach dem Muster von BookLedgerPro – Tauri 2 + Java-Engine
  (`windows/engine/src/`: `DesktopOrdner` = Vertrag `FamilyFolders`, `DesktopEingang` = „Öffnen mit“, `DesktopUpdates` = eigener Server,
  Speichern unter), Brücke `windows/bridge/` (Verträge in `contracts.json`), Installer (NSIS, „Öffnen mit“ nur für diesen Benutzer),
  `windows.yml` (Prüfbau installiert, zweimal gestartet) und `windows-release.yml` (nur von Hand, Feld „ja“). Alles in `docs/WINDOWS.md`.
- **Android-Lücken geschlossen:** dauerhafte Ordnerfreigabe („Zuletzt: …“, die letzten 5), Teilen an die App und „Öffnen mit“ (`DoEingangPlugin`,
  Kopie in einen Stapel, `EingangStapel`), „Speichern unter …“ (`DoDateienPlugin`) – gleiche Verträge wie Windows; Oberfläche in `src/quellen.ts`/`src/app.tsx`.
- **Ein Update-Schlüssel für Android und Windows** (`UpdateFeed.SCHLUESSEL` = `DesktopUpdates.SCHLUESSEL`, geprüft) – noch leer, bis Klaus ihn gibt
  (Anleitung Schritt für Schritt im Chat; Block in `docs/ANDROID.md` (b)).
- ⚠ Kein Windows-PC, kein Android-Gerät, kein Rust- oder Gradle-Bau in der Sitzung: erst `windows.yml`/`android.yml` zeigen, ob es baut.
  (Große Mengen in Blöcken: seit 0.4.2, oben.) Brief: `docs/BRIEF_ABSCHLUSS_2026-11-14_ORGANIZER-PRO-WINDOWS.md`.

## Stand (13.11.2026 nachts, Fassung 0.4.0, Android-App, nicht veröffentlicht)

- **Freibrief zum Mergen (Klaus 13.11. nachts, „auch an die neue Sitzung weitergeben“):** eigene geprüfte PRs (CI und Proben grün) selbst
  nach `main` mergen, in allen Repos dieser Arbeit. Veröffentlichen (APK, Windows, Releases) weiter nur mit Klaus' Wort.

- **Datei-Organizer Pro für Android (Klaus 13.11.: „die APK-App und die Windows-App mit der Download-Funktion … oder Update-Funktionen“):**
  Capacitor-Hülle `android/` (Paket `de.familyprojekt.dateiorganizer`, Vorbild BookLedgerPro), Web-Paket aus `app/` über
  `tools/native/prepare-web.mjs` (ohne `sw.js`, mit Testordner), **Ordner auf dem Gerät** (`DoOrdnerPlugin`, Name `FamilyFolders` wie in
  der Familienakte), **Updates vom eigenen Server** (`UpdateFeed`/`DoUpdatesPlugin`, Fähnchen und Fassung laden direkt, `src/nativ.ts`),
  Signieren und Veröffentlichen (`tools/signing/`, `android.yml`, `signing-identity.yml`, `android-release.yml` – nur von Hand).
  **Namen (Klaus 13.11.):** Web-App „Datei-Organizer Basic“, App „Datei-Organizer Pro“ – festgelegt nur in `src/nativ.ts` (`APP_VARIANTE`);
  Speicher-Namen nicht umbenennen. Alles Weitere, Proben und **was Klaus einmalig tun muss** (Signier-Freigabe `DO_SIGNING_UNLOCK`,
  Update-Server, öffentlicher Schlüssel – bis dahin Platzhalter, Updates „nicht eingerichtet“): `docs/ANDROID.md`.
  ⚠ Kein Android-Bau, kein Gerät in der Sitzung – erst `android.yml` zeigt, ob Gradle/Lint bestehen. (Speichern unter, Teilen, Windows: seit 0.4.1, oben.)

## Stand (13.11.2026 nachts, Fassung 0.3.4, nicht veröffentlicht)

- **Landkarte und Dashboard in der App (Klaus 13.11.: „Landkarte ist okay … mit dem Landkarten-Button wie bei der Familienakte“):** Knopf
  (Kartensymbol) im Kopf → Seite `#landkarte` (`src/landkarte.tsx`): Dashboard live aus der Liste – jeder Kasten ist ein Link (zu entscheiden →
  Sortieren, eingeordnet/doppelt/gesperrt/Bereich/Format → der passende Ordner im Baum, `oeffne(sicht, knoten)`); Landkarten im Rahmen aus
  `src/public/landkarte.html`, erzeugt von `scripts/landkarte-bauen.mjs` aus `docs/landkarte/…` (= Artefakt; im Bau geprüft). **Auge, Stift,
  Papierkorb** nur als Strichsymbol an jeder Datei (Finden, grüne Liste, Steckbrief); Stift ändert jedes Feld auch nachträglich (`FeldAendern`).
  Behoben: Finden zeigte nach einer Änderung den alten Ordnerinhalt; der Worker legte jede Nebenseite als index.html in den Vorrat (v9).

- **PDF-Kennung und Abgleich (Klaus 13.11.):** `lib/pdfkennung.ts` liest das /ID-Paar aus dem Trailer (erste = Herkunft); gleiche Herkunft bei
  anderem Inhalt → „ähnlich: fassung“ (über 20 Dateien mit derselben Kennung = feste Gerätekennung, übergangen). Eigener Code, Prüfkern
  unverändert. **Abgleich** in beide Richtungen: `docs/ABGLEICH.md`, Prüfung `node scripts/abgleich.mjs`.

- **0.3.4 (Klaus 13.11.: „das, was noch fehlt im Code, soll mit eingebaut werden“):** **Texterkennung in der App** (Fotos und gescannte
  PDFs ohne Textebene, erste 2 Seiten; `src/vendor.ts`, `src/pdf.ts`), **Prüfkern des Auslieferungsprüfers eingebunden** (Merkmale aus
  dem Datei-Innern: Autor, Programm, Titel, Erstelldatum, Befunde → `d.innen`, `lib/innen.ts`; Text aus Excel/PowerPoint), **Doppelungen
  über den gleichen Inhalt hinaus** (`lib/aehnlich.ts`: ältere Fassung, gleicher Text, gleicher Beleg, gleiches Foto, gleicher Name – nur
  markiert, nicht entfernt; `gleicheGroesse` für große Bestände). Prüfkern und Tesseract (nur Deutsch) **byte-gleich mit Pin** aus der
  Familienakte: `src/public/vendor/` + `HERKUNFT.json`, nur über `node scripts/vendor-nachziehen.mjs`, im Bau geprüft (`--pruefen`).
  Proben: Kern 141 (17 neu, gegengeprüft 5/5 nach Schärfen), UI 58 (2 neu, OCR-Probe gegengeprüft). ⚠ Noch nicht: Mengen über ~800
  Dateien (Klaus: die nächsten 2–3 Wochen Schritt für Schritt), Outlook-MSG/PST, PDF-/ID, Familienakte-Kern nicht nachgezogen.

## Stand (13.11.2026 abends, Needs mit Rahmen, Runde 2)

- Needs-Vorschau: Klaus Ja zu allen 14 Punkten, gebaut in Workflow-Needs #36. **Runde 2** des Rückwärtstests mit sieben Marktideen
  (zehn Berufs-Agenten, `rueckwaertstest/runde-2/`): alle bestehen (81–100 % Kern). Brief `docs/BRIEF_ABSCHLUSS_2026-11-13_NEEDS-RAHMEN-RUNDE-2.md`.

## Stand (13.11.2026 spät, Fassung 0.3.3)

- **0.3.3 (Klaus 13.11., Bild vom Tablet: „6 bitte prüfen“ bei 18 in der Liste, Fertige nicht zu sehen):** Seite Sortieren – die Meldung nennt
  „N neu zu prüfen, M insgesamt offen“; neu hängen Gebliebenes steht zuerst mit Marke „neu in Sieb N“; eigene grüne Liste „Sicher bis hierher“
  bzw. „Fertig“ (`SicherZeile`, mit Auge). UI-Probe 56. Brief nächste Sitzung: `docs/BRIEF_SITZUNG_2026-11-14_NEEDS-RUECKWAERTSTEST.md`.

## Stand (13.11.2026, Fassung 0.3.2)

- **0.3.2 (Klaus 13.11.):** Block „Dateien einfügen per Drag and Drop“ (Dateien und ganze Ordner, `ausZiehen` in `src/quellen.ts`; kommt zum
  Bestand **dazu**, gleiche Inhalte werden als doppelt markiert, `einlesenAus(q, true)`), **Entfernen** einzelner Dateien (Steckbrief) und ganzer
  Ordner/Treffer (Seite Finden, „Entfernen“ über der Liste; `entfernen` – nur die Liste, Originale unberührt, „Zurück“ holt sie wieder),
  **Auge** an jeder Prüfzeile (Steckbrief mit Ansehen/vergrößern, Teilen, Entfernen). UI-Probe 54.
  Noch offen: umbenennen, verschieben per Drag and Drop; Familienakte: Blöcke hinzufügen, Doppelte zusammenführen (Index-Übernahme dort nicht gebaut).

## Stand (13.11.2026, Fassung 0.3.1)

- **Ladebalken und Aktualisieren (Klaus 13.11.: „sofort veröffentlichen“):** Ladeanzeige oben im Kopf auf jeder Seite und in der Ordner-Karte
  (`Ladebalken` in `src/app.tsx`: gemerkter Stand · Ordner wird durchgesehen (laufender Streifen) · Datei für Datei mit Prozent und Dateiname);
  Knopf „Aktualisieren“ (⟳) im Kopf holt die neueste Fassung und lädt neu, die Sortierung bleibt gemerkt. Leere Auswahl bei „Ordner hochladen“
  sagt jetzt, dass nichts übergeben wurde. Der Worker löscht nur noch eigene Vorräte (`datei-organizer-v…`, vorher alle am gemeinsamen Ursprung).
  **Update-Fähnchen** neben der Fassung (`useNeueFassung`, fragt `version.json` – bei jeder Fassung mit erhöhen, die UI-Probe vergleicht),
  **„Organizer leeren“** (Seite Familienakte und Überblick; Liste und Verlauf weg, Gelerntes bleibt, Originale unberührt). UI-Probe 50.
  Offen (Klaus 13.11., nächste Fassung): einzelne Dateien/Ordner entfernen mit Auge-Ansicht, umbenennen/teilen/verschieben, Block „Dateien
  einfügen per Drag and Drop“; in der Familienakte Blöcke hinzufügen statt überschreiben, Doppelte anzeigen und zusammenführen. Klaus' Befund „Ordner hochladen lädt scheinbar den Testordner“ im Test-Browser nicht nachstellbar (Upload lädt den gewählten Ordner);
  am Tablet offen. Codex 011/012 übernommen, Zahlen mit drei Einordnern in den Regeldateien.

## Stand (13.11.2026 abends, Fassung 0.3.0)

- **Sitzung Punkte 3–9 (13.11., Freibrief):** Brief `docs/BRIEF_ABSCHLUSS_2026-11-13_PUNKTE-3-9.md`. Neue fremde Stapel `pruefstapel-familie-k3`
  (+`-ocr`, Punkte 3–5), `pruefstapel-vermieter-2` (+`-ocr`, Punkt 6), `pruefstapel-anfragen` (Punkt 8) – je Regeln vorab
  (`docs/PRUEFSTAPEL-FAMILIE-K3-REGELN.md`, `-VERMIETER-2-`, `-CALCULATE-`), vorläufig zwei Einordner (Codex-Aufträge 011/012 im Briefkasten).
  Kern 0.3.0: Fristen, Briefdatum, Wortmodell aus verbrauchten Stapeln (`briefmodell-abstimmen.mjs --verbraucht …`), **Merken nach Sache**
  (`lib/lernen.ts`), **Stichprobe nur Zahlen** (`lib/stichprobe.ts`, Seite „Verlauf“). **Kern als JavaScript** für Apps ohne Bau-Schritt:
  `kern-js/` (`node scripts/kern-js.mjs`, im Bau geprüft) – BookLedgerPro zieht `erkennen.js`/`kategorien.js` mit Pin.
  Ergebnisse: Familienakte-Absender 45 → 97 % (gesichert), Fristen und Art am fremden Stapel **nicht** besser; Calculate erster Blindtest.

## Stand (13.11.2026, Fassung 0.2.0)

- **Lauf „Vermieterin“ (13.11., PR #3 Entwurf):** Regeln und alle Ergebnisse in `docs/PRUEFSTAPEL-VERMIETERIN-REGELN.md`. Stapel
  `pruefstapel-vermieterin/` (2025, drei Einordner, verbraucht) und `pruefstapel-vermieterin-2026/` (zwei Einordner, Codex-Auftrag 010
  offen), je mit `-ocr` (Text aus der Texterkennung). Werkzeuge: `scripts/scan-setzen.py`, `ocr-stapel.mjs`, `messen-bank.mjs`,
  `messen-fristkette.mjs`, `messen-privatebrain.mjs`, `merken.mjs`, alles zusammen `bash scripts/lauf-vermieterin.sh`.
  **Der Kern liegt seit 13.11. byte-gleich in der Familienakte** (`lib/sortierkern/` dort, @ `534cc08`): Änderungen an `lib/` hier
  wirken dort erst nach `tools/sortierkern-nachziehen.mjs` in der Familienakte – nach jeder Kernänderung nachziehen und dort messen.

- **Fassung 0.2.0 (13.11.):** Kern verbessert und nachgewiesen. Wortmodell für Bereich und Art (`lib/wortmodell.ts`, Daten erzeugt von
  `scripts/briefmodell-abstimmen.mjs` – nie von Hand ändern), neue Regeln für Absender, Frist, Person. An vier fremden Stapeln mit je
  drei Einordnern (Stapel-Autor, Claude-Agent, Codex) in allen fünf Feldern gesichert besser als 0.1.0; Zahlen und Grenzen in
  `docs/PRUEFREGELN-GRUPPE.md` („Ergebnis“). **Fachregel** `docs/FACHREGEL.md` (Klaus: acht Punkte Ja; Vorgabe ab Werk, eigene Muster
  gehen vor – Bedienung dafür noch nicht gebaut, erst Vorschau). **Prüfreihe** A–H in `docs/PRUEFREGELN-GRUPPE.md`; verbraucht:
  `pruefstapel-unabhaengig`, `pruefstapel-briefe-2/-a/-b/-h`. Lehrdaten `lehrdaten-briefe/`. Messen: `scripts/messen-briefe.mjs`.
  Offen: Runden C (Familien im Wandel), D (Schreiber eines anderen Systems), E (Foto/OCR), G (echte Stichprobe); Zweitfach im Kern;
  gespeicherte Mails mit englischem Kopf werden nicht gelesen; Übernahme in die Familienakte.

- **Erste Fassung gebaut** (Freibrief Klaus 12.11.): Kern `lib/`, Oberfläche `src/` → gebaut nach `app/` (Pages:
  https://lausiklauskn-png.github.io/Datei-Organizer/ leitet auf `app/` weiter). `app/` nie von Hand ändern: `npm run build`.
- Testordner `testdaten/Eingang/` (101 erfundene Dateien, `node scripts/testdaten-bauen.mjs`), Erwartung `testdaten/ERWARTUNG.json`.
- Installierbar als Web-App (PWA, „Datei-Organizer Basic“): `src/public/sw.js` (Offline-Vorrat nur der App; Nummer `VORRAT` bei jeder Fassung erhöhen),
  Symbole `src/public/icon-192.png`/`icon-512.png`.
- Proben: `npm run build` (Kern + Typen + Bau), `node tests/ui-probe.mjs` (Browser, 43 Prüfungen). CI `.github/workflows/pruefung.yml`.
- Entschieden: S1–S11 (S8: Archivnummern parallel, fortlaufend erst wenn die Reihenfolge steht). Einzelheiten `docs/PLAN.md`,
  Abschnitt „Stand 0.1.0“.
- **Training (12.11.):** Generator mit 10 erfundenen Haushalten, Messung, Großlauf und Übersicht – siehe `docs/PLAN.md`,
  Abschnitt „Training“. Proben: `node scripts/messen.mjs testdaten-haushalte`, `node scripts/grosslauf.mjs`.
  Texterkennung in den Proben über tesseract.js mit den deutschen Sprachdaten der Familienakte (Nachbarordner).
- Offen: Klaus' Gerätetest (SD-Karte über Familienakte Pro, PC), OCR, Lehrer-Dienst, Übernahme des Index in der Familienakte.

- **Nächste Sitzungen:** `docs/BRIEF_SITZUNG_2026-11-13_KERN-IN-DIE-GRUPPE.md` (Kern in die übrigen Apps, Jahr 2026 abschließen),
  danach `docs/BRIEF_SITZUNG_2026-11-13_PUNKTE-3-9.md` (Punkte 3–9 der Empfehlung, Anleitung Zusammenarbeit mit Codex).

## Feste Regeln

- **Keine echten Dokumente, keine personenbezogenen Daten im Repo** – nur erfundene Beispiele (Kennzeichen ungültig, Firmen erfunden).
  Das Repo ist öffentlich lesbar (Pages).
- Keine Schlüssel, PINs, Passwörter im Repo oder im Chat. Der Claude-Schlüssel liegt nur auf dem Server.
- Sichtbare Änderungen erst als Vorschau zeigen, Klaus sagt Ja je Punkt.
- Bausteine aus Familienakte/Workflow PDF (Briefkopf-Leser, Prüfkern, Modul 25) byte-gleich mit Pin übernehmen, nie nachbauen.
- Der Sortier-Kern wird **einmal** gebaut und in der Familienakte byte-gleich genutzt – keine zweite Fassung.
- Forschungseinträge gehören nur nach KimHub, nicht hierher.
- Kein Merge nach `main` ohne Klaus' Wort; eigener Zweig, Entwurfs-PR. **Klaus 13.11. (Rückwärtstest Needs): Freibrief —
  eigene geprüfte PRs (CI und Proben grün) selbst mergen und den Auftrag selbstständig zu Ende führen; Veröffentlichen weiter nur
  mit seinem Wort.** Brief: `docs/BRIEF_ABSCHLUSS_2026-11-13_NEEDS-RUECKWAERTSTEST.md`.
