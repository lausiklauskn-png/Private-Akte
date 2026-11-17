# Datei-Organizer als Produkt für Betriebe – Prüfung (Runde 3, 13.11.2026)

Grundlage sind nur `REGELN.md`, `ENTSCHEIDUNGEN.md` und `do/01-iststand`, `02-kunde`, `03-markt`, `04-vertrieb`. Alle vier Blickwinkel
stammen von KI-Agenten (Kundin und Systemhaus sind Rollenspiele), und die Marktzahlen sind meist Anbieterangaben. Diese Prüfung hat
mit niemandem gesprochen und nichts gemessen.

## 1 · Ergebnis

**Als Dauerprodukt (DMS für Betriebe) nicht bauen. Als einmaliges Aufräum- und Übergabewerkzeug, das über Systemhäuser verkauft wird,
lohnt ein bezahlter Pilot. Vorher muss die Menge gemessen sein, und ein zahlender Abnehmer muss feststehen. Note 3** (Dauerprodukt: 4–5).

## 2 · Die sechs Prüfsteine

| Prüfstein | Dauerprodukt | Aufräumwerkzeug | Beleg |
|---|---|---|---|
| 1 Bedarf belegt | knapp | **bestanden** | Heute wird schon bezahlt, und zwar für DMS-Einführungen (5.000–15.000 €), Scan- und Migrationsprojekte und Suchzeit (konservativ 22 min/Tag, 03). Die Kundin würde 1.500–2.500 € für einen Pilot zahlen (02 § 3), das Systemhaus 690–990 € für eine Bestandsaufnahme (04 § 2). Gezahlt wird aber für ein DMS oder ein Projekt, nicht für „ordnen ohne Umzug“ (03). |
| 2 Reduktion | **nicht** | **bestanden** | Neben dem nötigen GoBD-Archiv wäre es ein zweites Programm (03, Verlieren 2). Die Kundin rechnet mit 30 min Pflege je Woche (02 § 5). Pflege, die nie aufhört, frisst die Ersparnis, wie im Fall Jens. Als einmaliger Einsatz fällt die laufende Pflege weg, und die Menge schrumpft, bevor jemand ordnet (01 § 4, ENTSCHEIDUNGEN 7). |
| 3 Nicht in einer Stunde | knapp | knapp | Paperless-ngx 3 mit Ollama ist an einem Nachmittag aufgesetzt (03). Was es nicht kann: das Laufwerk an Ort und Stelle lesen, Dubletten über PDF-`/ID`, docProps und Message-ID erkennen, MSG lesen, nie das Original anfassen (01 § 6, 04 § 5). Der Vorsprung ist echt, aber nur so viel wert wie die gemessene Trefferquote, und die ist an echtem Bestand **nie gemessen** (01 § 1). |
| 4 Nicht schon da | **nicht** | knapp | M-Files hat „Ordnung als Sicht“ als Grundidee. Paperless hat lokale KI. Windows indexiert lokal semantisch. Copilot sucht in der Cloud (03). Ein anbieterneutrales Werkzeug für die Bereitschaft der Daten **ohne Umzug** fehlt. Diese Lücke ist schmal (03, „Die konkrete Lücke“). |
| 5 Käufer und Weg | **nicht** | knapp | Der Käufer ist klar (Inhaberin, Büroleitung). Der Weg führt nur über Systemhäuser, die heute an DMS verdienen (03). Für ein Dauerprodukt verlangt das Systemhaus Partner-Konsole, Support mit Vertretung, Escrow und Haftpflicht (04 § 3), und das schafft ein Einzelentwickler nicht. Für einen Einsatz-Auftrag reicht deutlich weniger. |
| 6 Ehrliche Null | – | gesagt | Für Betriebe mit weniger als ~10 Leuten genügen ein Ordnerschema, M365 oder ecoDMS (03). Zielband sind darum Betriebe mit 10–50 Leuten, gewachsenem Altbestand und einem konkreten KI- oder DMS-Vorhaben. |

## 3 · Wo die Blickwinkel übereinstimmen und wo nicht

**Einig sind sich alle vier:**
- Das Original bleibt unverändert (01 Stärke, 02 K.-o., 03 Lücke, 04 schriftlich gefordert).
- Das Werkzeug ist **kein GoBD-Archiv** und soll keines werden (01 § 3, 02 § 4, 03, 04 § 1).
- Dubletten-Bericht und Bestandsaufnahme öffnen die Tür. Eine eigene Chat- oder KI-Oberfläche will niemand (02 § 2, 04 § 1).
- Der Einzelentwickler ist das Vertrauensrisiko (02 § 6, 04 § 7).
- Mails gehören dazu: PST und MSG (02 § 1, 04 § 5, 01 § 6 Nr. 2/9).

**Widersprüche, und wie sie sich auflösen:**
- **3/5 (Kundin, Systemhaus) gegen 2/5 (Markt):** Kundin und Systemhaus bewerten das Problem und das Versprechen „Original bleibt“.
  Der Markt bewertet, ob sich das Produkt gegen Nachbau und Konkurrenz halten lässt. Beides stimmt. Daraus folgt: Das Problem ist
  verkaufbar, die Software als Dauerbesitz dagegen schwer zu verteidigen. Die Systemhaus-Note steigt nur mit Konsole, Vertretung und
  Escrow auf 4, also mit Dingen, die maximieren und nicht reduzieren.
- **Zugriffsrechte:** Für die Kundin ist das ein K.-o.-Punkt („ein Index, der alles für alle findet, ist ein Datenleck“). Das Systemhaus
  verlangt NTFS-Rechte für die KI-Suche. Heute gibt es dafür nichts (01 § 3). Auflösen lässt sich das so: Im Aufräum-Einsatz sieht nur
  der Admin bzw. das Systemhaus den Bericht. Die Bündel tragen die NTFS-Rechte der Quelle **als Feld** mit, und durchsetzen muss sie das
  Zielsystem (DMS, SharePoint, lokale KI). Die Rechte zu lesen ist billig, sie im Dauerbetrieb durchzusetzen ist teuer.
- **GoBD:** Der Markt sieht darin „zweites Programm, keine Reduktion“. Systemhaus und Kundin finden „kein Archiv, offen gesagt“ in
  Ordnung. Auflösen lässt sich das, wenn das Werkzeug **vor** das Archiv geschaltet wird und es befüllt. Dann ist es kein zweites
  Programm im Alltag.
- **Paperless-ngx mit KI:** Der Markt sieht darin den Hauptgegner. Das Systemhaus würde ohne das Werkzeug selbst Paperless plus
  AnythingLLM bauen. Der Index enthält aber schon einen Feldsatz nach Art von paperless-ngx (01 § 1). Damit wird Paperless zum
  **Abnehmer**: Das Werkzeug liefert die bereinigte, beschriftete Menge, die Paperless sonst unsortiert schlucken würde.
- **Dauerhafte Suche:** Die Kundin will Volltext über alles und auf Dauer (02 § 2), und das wäre wieder Dauerbetrieb. Im Aufräum-Modell
  übernimmt das Ziel diese Aufgabe (DMS, Paperless, Windows-Suche). Höchstens bleibt ein nur lesbarer Blick in den fertigen Index als
  Beigabe, ohne Pflege.

## 4 · Positionierung mit der größten Reduktion

**„Aufräum- und Übergabewerkzeug“, verkauft als Lizenz je Einsatz über Systemhäuser.** Der Einsatz hat vier Schritte:
(1) Bestandsaufnahme nur lesend, (2) Doppelungen raus aus der Sicht (Größe → Fingerabdruck → innere Merkmale), (3) Ordnung als Sicht
nach Kunde, Projekt, Art und Datum, (4) Übergabe als offenes Bündel an ein vorhandenes Archiv, DMS oder eine KI. Danach ist das Werkzeug fertig.

**Was wegfällt:** Rechteverwaltung im Dauerbetrieb, mehrere Nutzer, Partner-Konsole für 60 Kunden, Dauerdienst mit Ordnerüberwachung,
SharePoint/Graph, GoBD-Archiv, eigene Chat- oder KI-Oberfläche, Vektoren (die erzeugt das Ziel), Fristen-Erkennung für Betriebe
(Haftung, 03 Verlieren 6), Lernen über den Einsatz hinaus, PST-Leser (stattdessen „als MSG/EML exportieren“, 01 § 6 Nr. 9).

**Was bleibt:** nur lesen, kein Verschieben, Umbenennen oder Löschen. Außerdem:
- Dubletten- und Versionsgruppen mit Begründung,
- innere Merkmale aus dem Prüfkern (PDF-ID und XMP, docProps, Message-ID),
- Zuordnung nach Kunde und Projekt aus Ordnernamen und Nummern,
- Bericht in Zahlen,
- Export als JSON/JSONL, CSV und Paperless-Felder, mit den NTFS-Rechten als Feld,
- Prüfbefunde wie Altfassungen in PDFs, Makros und Personenbezug in Metadaten.

**Warum das am schwersten nachzubauen ist:** Der Vorsprung liegt nicht in einer Oberfläche, sondern in der Kombination aus „liest von
innen“ (Prüfkern, ENTSCHEIDUNGEN 8/9), „fasst nie an“ und einer gemessenen Quote für „falsch, aber als sicher ausgegeben“. Paperless,
Windows und Copilot setzen alle **nach** dem Aufräumen an. Für einen Einzelentwickler ist das außerdem die einzige Rolle ohne
Dauerbetrieb: Fällt er aus, bleibt das Bündel lesbar, und der Kunde arbeitet in seinem Ziel weiter. Das Klumpenrisiko schrumpft
damit auf einen einzelnen Einsatz.

## 5 · Schlanker Kern für den ersten bezahlten Pilot (1.500–2.500 €, ein Projektordner und eine Mailablage)

| Baustein | Aufwand (01 § 5/6, geschätzt) |
|---|---|
| Menge: Worker, Ablage je Datei statt eines Objekts, Abbruch/Wiederaufnahme, nur Neues lesen | 2–3 W |
| Größen-Vorsortierung, Versionsgruppen, Namenskonflikte, Nummern-Dubletten | 2–3 T |
| Metadaten als Felder (PDF Info/ID/XMP, docProps, Message-ID), Prüfkern im Repo des Auslieferungsprüfers erweitert und mit Pin übernommen | 2–3 T |
| Office-Text xlsx/pptx/rtf über den vorhandenen Zip-Leser | 2 T |
| MSG/OLE (Betreff, Absender, Text, Anhänge, Message-ID) | 1–1,5 W |
| Kategorien als Daten, Start aus vorhandenen Ordnernamen und Projektnummern | 1 W |
| Bericht und Export (JSONL je Dokument, CSV, Paperless-Felder, NTFS-Rechte als Feld) | 1 W |
| **Summe** | **≈ 7–9 Wochen** |

**Nicht im Pilot:** OCR in der App (zuerst messen, wie hoch der Anteil der Scans im Pilotordner ist; das Skript mit tesseract.js
reicht für den Bericht), DWG/CDR-Inhalt (nur Signatur und Fingerabdruck, 1 T, falls das Ingenieurbüro es braucht),
Bedeutungssuche, Lernen, Fristen.

**Vorher messen, mit Grenzen vorab wie bei den Prüfstapeln:**
1. **Menge:** 50.000 erfundene Dateien gemischt (davon 30 % gleiche Größe, 5 % echte Dubletten) in Chrome auf einem normalen Büro-PC.
   Zu messen sind Laufzeit, Speicher, Wiederaufnahme nach Abbruch und Last auf dem Netzlaufwerk. Bisher sind höchstens ~800 Dateien
   erprobt (01 § 1). Scheitert der Browser, kommt eine Desktop-Hülle; Tauri ist in der Familie schon vorhanden.
2. **Dubletten:** Exakte Dubletten müssen 100 % ohne Fehlalarm erkannt werden. Bei Versionen und fast gleichen Dateien ist die Rate der
   Fehlalarme zu nennen.
3. **Trefferquote am unordentlichen echten Bestand** (erst beim Pilotkunden, Runde G): Projekt- und Kundenzuordnung mit einer vorab
   gesetzten Grenze (Vorschlag ≥ 85 % richtig, „falsch und als sicher ausgegeben“ ≤ 1 %). Die Kundin warnt: „drei Pläne falsch, und
   keiner glaubt mehr dran“ (02 § 6). Heute liegt „falsch-sicher“ beim Bereich bei 10–19 von 150 (01 § 1), und das ist für Betriebe zu viel.
4. **Abnehmer:** Ein Systemhaus oder ein Betrieb sagt den bezahlten Pilot schriftlich zu, **bevor** die 7–9 Wochen beginnen.

## 6 · Erste 12 Monate: Einnahmen gegen Herstellung

**Herstellung:** 7–9 Wochen Kern, dazu ~3 Wochen für Pilotbegleitung, Nachbesserung, Unterlagen (AV-Vorlage, „Original bleibt“
schriftlich) und Partnerschulung, also **10–12 Wochen**. Bei angesetzten 2.000–2.500 € je Woche sind das **20.000–30.000 €**.

**Einnahmen, realistisch:**
- **Direkt:** 2–3 Pilote zu 1.500–2.500 €, also 3.000–7.500 €.
- **Über Systemhäuser:** Das Systemhaus rechnet mit 5–8 Projekten aus 60 Kunden (04 § 4), braucht aber selbst Monate bis zum ersten
  Projekt (DMS-Vertrieb 3–12 Monate). Im ersten Jahr sind 1–2 Systemhäuser realistisch, mit zusammen 4–10 Einsätzen. Bei einer Lizenz
  je Einsatz von 400–800 € an den Entwickler sind das 1.600–8.000 €. Abos fallen in dieser Rolle bewusst weg.
- **Summe Jahr 1:** **≈ 5.000–15.000 €**, im besten Fall ~20.000 €.

**Bilanz:** Die Herstellung übertrifft die Einnahmen im ersten Jahr wahrscheinlich, um etwa 5.000–25.000 €. Der Abstand bleibt nur
deshalb tragbar, weil Prüfkern, Dubletten-Code und Formatleser **auch der Familienakte** dienen (ENTSCHEIDUNGEN 7–9) und dort ohnehin
gebaut werden. Rechnet man nur den betriebsspezifischen Teil (Menge, MSG, Kategorien als Daten, Bericht), sind es ~5–6 Wochen und
10.000–15.000 €. Damit ist eine schwarze Null im ersten Jahr möglich, aber nicht wahrscheinlich.

## 7 · Die drei größten Risiken

1. **Klumpenrisiko Einzelentwickler** (02 § 6, 04 § 7). Klein halten: kein Dauerbetrieb, kein Wartungsversprechen über den Einsatz
   hinaus, offenes Indexformat mit Beschreibung, Quelltext im öffentlichen Repo statt Escrow, Einsatz und Gewährleistung im Vertrag auf
   30 Tage begrenzt. Die Betreuung übernimmt das Systemhaus.
2. **Menge im Browser** (01 § 3: ein IndexedDB-Objekt, Hauptfaden, ~800 Dateien erprobt). Klein halten: die Mengenprobe mit 50.000
   Dateien ist Schritt 1, vor jedem Verkaufsgespräch. Bei Misserfolg kommt die Desktop-Hülle mit demselben Kern, eine zweite Fassung
   gibt es nicht.
3. **Konkurrenz durch Paperless-ngx, Windows und Copilot** (03). Klein halten: nicht gegen sie positionieren, sondern als
   **Zulieferer**. Export in deren Formate, Werbesatz „bevor Sie Paperless/Copilot/DMS einführen“. Wird Windows auch über
   Netzlaufwerke semantisch, bleibt der Teil „Dubletten raus, Herkunft von innen, Übergabe sauber“ trotzdem bestehen.

## 8 · Empfehlung: als Pilot testen (nicht als Dauerprodukt bauen, nicht ganz lassen)

1. **Mengenprobe zuerst (≈ 2–3 Wochen, nützt auch der Familienakte):** 50.000 erfundene Dateien, Größen-Vorsortierung,
   Wiederaufnahme, Bestandsbericht in Zahlen. Die Grenzen werden vorab gesetzt. Fällt die Probe durch, wird zuerst die Desktop-Hülle
   gebaut, oder die Idee wird gelassen.
2. **Abnehmer vor dem Bau:** Die Vorschau des Bestandsberichts (ENTSCHEIDUNGEN: erst Vorschau) einem echten Systemhaus oder Betrieb
   zeigen und eine schriftliche Zusage für einen bezahlten Pilot (1.500–2.500 €) holen. Ohne Zusage wird nicht gebaut, und das
   Ergebnis wird als ehrliche Null berichtet.
3. **Pilot mit Grenzen vorab:** ein Projektordner und eine MSG-Ablage, Messung der Zuordnung am echten Bestand (≥ 85 % richtig,
   falsch-sicher ≤ 1 %). Danach wird entschieden, ob es eine Lizenz je Einsatz für Systemhäuser wird oder ob die Idee gelassen wird.
