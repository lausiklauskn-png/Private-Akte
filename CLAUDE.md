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

## Stand (17.11.2026, Vorschau 0.4.8)

- **Hülle:** `index.html`, `app.css`, `app.js` – die Vorschau aus PR #3 (0.1.5), von Hand geschrieben, ohne Bauschritt. Die Programme
  heißen „Tools“. Briefe: `BRIEF_ABSCHLUSS_2026-11-17_LESEN-UND-ORGANIZER-0.4.8.md` (aktuell, mit Startauftrag für die Sitzung „Klone im Rahmen“); ältere unter `docs/`.
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
- **0.4.8 Ordner aus dem Datei-Organizer übernehmen (Klaus 17.11.: große Mengen werden im Datei-Organizer gelesen, sortiert und
  angelernt – dort bleibt das Nacharbeiten; einzelne Stücke direkt in der Akte; ein Sortier-Kern):** „Importieren“ › „Ordner in
  die Akte legen“. `organizer` in `src/tresor.ts`: Ordner wählen, `organizer-index.json` lesen – Einordnung über die unveränderte
  `lib/organizer-uebernahme.ts` des Klons (Bereich, Art, Hinweis, Doppelte, Gesperrtes; eigene Bereiche nur „von dir“/„gelernt“),
  dazu hier aus demselben Index **Datum** und der dort **gelesene Text** (wird `textAuszug`, die Akte liest dann nicht noch einmal;
  fehlt er, liest sie selbst). Fenster mit Haken und Bereich je Datei, Doppeltes bleibt im Ordner, Gesperrtes mit Warnung; ohne Index
  ein einfacher Stapel nach „Sonstiges“. Nur Dateien direkt im Ordner; schon Vorhandenes zählt als „waren schon da“.
  **Befund im Klon @ `bcd48a4`:** der Index trägt je Datei Steckbrief, `text` (bis 20.000 Zeichen, Haken „Erkannten Text mitgeben“)
  und `abschnitte`; Scan-PDFs liest der Organizer nur auf den ersten **2 Seiten** (`SCAN_SEITEN`, reicht zum Sortieren, nicht für die
  Suche im ganzen Scan); die Lage der Zeilen steht nicht im Index. **Nicht gebaut:** die Oberfläche des Datei-Organizers ist nicht
  in der Privaten Akte – der grüne Knopf „Dateien hineingeben“ zeigt weiter das Beispiel; Absender/Frist/Betrag stehen nur in der
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

- **Klone nie von Hand ändern.** Verbesserungen entstehen im Quell-Repo und kommen nur über
  `node tools/klon-nachziehen.mjs <name> --quelle <pfad> [--stand <ref>]` herein. Beim Hinzufügen `git add -f klone/` nehmen
  (die Klone bringen eigene `.gitignore` mit) und danach `--pruefen`.
- Der Sortier-Kern bleibt **eine** Fassung: die aus dem Datei-Organizer.
- Keine echten Dokumente, keine personenbezogenen Daten, keine Schlüssel oder Passwörter im Repo. Das Repo ist öffentlich.
- Sichtbare Änderungen erst als Vorschau zeigen, Klaus sagt Ja. Veröffentlichen nur mit Klaus' Wort.
- Forschungseinträge gehören nur nach KimHub.
