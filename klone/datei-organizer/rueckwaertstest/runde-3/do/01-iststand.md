# Datei-Organizer als Produkt für Betriebe – Iststand am Code (Runde 3, 13.11.2026)

Ich habe nur gelesen und nichts geändert. Grundlage: `CLAUDE.md`, `README.md`, `docs/PLAN.md`, `docs/FACHREGEL.md`, `docs/PRUEFREGELN-GRUPPE.md`,
`docs/PRUEFSTAPEL-FAMILIE-K3-REGELN.md`, `lib/*.ts`, `src/*.ts(x)`, `ergebnisse/grosslauf/`; außerdem der Prüfkern in Kopie unter
`Workflow-Needs/tests/pruefer-formate.js` und `pruefer-mail.js`. Die Zeitangaben sind geschätzt und nicht gemessen.

## 1 · Was er heute kann (Fassung 0.3.3, am Code belegt)

- **Eingang:** In Chrome/Edge am PC wählt man einen Ordner (`showDirectoryPicker`, mit Schreibrecht für den Index). Außerdem gehen ein Upload über `webkitdirectory`,
  Drag and Drop (Dateien und ganze Ordner, sie kommen zum Bestand dazu) und eine native Ordnerwahl über das Plugin der Familienakte (Android/SD). Alles steht in `src/quellen.ts`.
- **Formate mit gelesenem Text:** PDF mit Textebene (pdf.js), `.eml` mit Anhängen bis Tiefe 3 (`lib/eml.ts`), `.docx`/`.odt` (`lib/zip.ts`, nur `document.xml`/`content.xml`)
  sowie txt/csv/json/xml/html/ics/vcf. Bei Bildern wird nur EXIF gelesen (Aufnahmedatum, Kamera, Maße, GPS; `lib/exif.ts`). Nur erkannt, aber ohne Text: xlsx/pptx/ods/doc/xls, `.msg`, zip/7z/rar, heic/tiff.
- **Texterkennung:** Im Kern gibt es sie (`einlesen(…, bildLesen)`), aber **die App übergibt keinen Bildleser** (`src/app.tsx` Z. 74). Im Browser bleiben
  Scans und Fotos also ohne Text. OCR läuft nur in den Messskripten (tesseract.js). Ein gescanntes PDF ohne Textebene wird nicht gelesen.
- **Siebe** (`lib/siebe.ts`) mit fünf Stufen: Art (Dateikopf und Endung, Fingerabdruck, Auffälliges wie Programme oder doppelte Endungen) → Kopf (Schriftstück aus 16 Arten, Datum) →
  Bereich (18 Fächer der Familienakte) und Nummern (Kunden-, Rechnungs-, Vertragsnummer, Aktenzeichen, Kennzeichen) → Absender (mit Vereinheitlichung
  ähnlicher Schreibweisen, `lib/abgleich.ts`) → Inhalt (wen es betrifft, Frist, Betrag, Gehaltsabrechnung). Es gibt Regeln, ein kleines Wortmodell
  (`lib/wortmodell.ts`, Daten erzeugt) und kein Sprachmodell. Jeder Wert trägt `sicher` und `grund`, und Unsicheres hält das Sieb an.
- **Sichten statt Verschieben** (`lib/sichten.ts`): neun Bäume, nämlich Bereich›Art, Absender, Person, Datum, Dringlichkeit, Nummern, Dateiart, Zu prüfen und Ursprungsordner.
  Dazu kommt eine Wortsuche über Name, Felder und Text (alle Wörter müssen vorkommen). Eine Bedeutungssuche gibt es in der App nicht.
- **Lernen** (`lib/lernen.ts`): Gelernt wird nur der Bereich, und zwar je Absender und je „Absender + Vorschlag des Kerns“. Es wird nach Stimmen entschieden; sicher wird ein Wert erst ab 2 Stimmen,
  und ein sicherer Kernwert wird erst ab 3 Stimmen ohne Widerspruch überstimmt. Die Art wird bewusst nicht gelernt, weil das gemessen schlechter war.
- **Verlauf/Rückgängig:** „Sieb zurück“ (Stapel von Ständen), jede Korrektur einzeln zurücknehmbar, Entfernen aus der Liste mit „Zurück“.
  Die **Originale werden nie angefasst**: Es gibt kein Verschieben, Umbenennen oder Löschen, und Schreiben gibt es nur für `organizer-index.json`.
- **Index/Übergabe** (`lib/index-format.ts`): `organizer-index.json` mit einem Steckbrief je Datei (Felder, Sicherheit und Grund je Feld, sha256,
  Kurzfassung, Text bis 20.000 Zeichen, **Abschnitte ≤ 900 Zeichen mit Steckbrief-Kopf für Vektoren**, höchstens 40 je Datei). Außerdem steht dort ein Feldsatz nach Art von paperless-ngx,
  dazu Lernregeln und Verlauf. Beim erneuten Einlesen erkennt die App Dateien am Fingerabdruck wieder und übernimmt Bestätigtes und Archivnummern. **Vektoren selbst erzeugt sie nicht.**
- **Plattform:** React-PWA (Vite), offline-fähig (`sw.js`). Der Zustand liegt als **ein Objekt** in IndexedDB (`src/zustand.ts`), und das Einlesen läuft
  nacheinander im Hauptfaden. Es gibt keinen Server und keinen Dauerbetrieb.
- **Mengen:** Testordner mit 101 Dateien, 8 Haushalte mit 701 Dateien, Großlauf mit 10 Läufen zu je 693–791 Dateien, Prüfstapel mit 63–162 Stücken. **Nie mehr als
  rund 800 Dateien je Lauf.**
- **Messung** (erfundene Briefe, Mehrheit aus drei Einordnern, je 150 Stück, `PRUEFREGELN-GRUPPE.md`): Bereich 76–87 %, Schriftstück 73–83 %,
  Absender 92–95 %, Person 72–92 %, Frist 89–99 %. Der Fall „falsch und als sicher ausgegeben“ kommt beim Absender 1–6-mal und beim Bereich 10–19-mal je 150 vor. Mit Scan und OCR (K3)
  erreicht der Kern beim Bereich 86 % und bei der Art 84 %. **An echten Unterlagen wurde nie gemessen** (Runde G steht aus).

## 2 · Wofür er gebaut ist – und was daran hängt

Gebaut ist er als Vorsortierer für die **Familienakte**, also für Privatpost. Daran hängen mehrere Annahmen:
- die 18 Lebensbereiche wörtlich aus der Familienakte (Auto, Gesundheit, Rente …) mit Schlüsselwörtern, die auf Haushalte zugeschnitten sind;
- 16 Schriftstückarten aus Briefsicht (Mahnung, Bescheid, Befund …);
- „Betrifft“ ist eine Person im Haushalt, Fristen kommen aus Behördenbriefen, die Fachregel richtet sich nach der Sache;
- das Wortmodell ist an erfundenen Haushaltsbriefen trainiert.

Ein Betrieb denkt dagegen in **Kunde, Projekt/Auftrag, Lieferant, Mitarbeiter und Belegart**. Nummernmuster und Absender sind wiederverwendbar. Bereiche, Wortlisten,
Modell und Fachregel müssen neu gemacht werden.

## 3 · Lücken für einen Betrieb mit 5–50 Leuten

| Thema | Heute | Lücke |
|---|---|---|
| Menge 100.000+ | höchstens rund 800 erprobt; alles im Speicher, ein IndexedDB-Objekt, Bytes jeder Datei ganz gelesen | Datenhaltung je Datei, Worker/Parallelität, Abbruch und Wiederaufnahme, nur Neues lesen, Index in Teilen |
| Netzlaufwerk/NAS | geht, wenn es als Laufwerk eingebunden ist (Ordnerwahl im Browser), aber langsam und ohne Dauerlauf | Dienst oder Desktop-Hülle mit Überwachung des Ordners |
| SharePoint/OneDrive | nur ein synchronisierter Ordner; leere Platzhalter werden als „Sync nicht fertig“ erkannt | Graph-API und Anmeldung, oder Kopie nach lokal |
| Office | Text nur aus docx/odt | xlsx, pptx, ods, doc/xls, rtf fehlen |
| E-Mail | `.eml` ja | `.msg` ohne Inhalt, PST/Outlook-Postfach gar nicht |
| Scans/Fotos | OCR nur im Skript | OCR in der App mit Warteschlange, mehrseitige TIFF, HEIC |
| CAD/Grafik | nur „unbekannt“ | DWG/DXF/CDR: Signatur, Fingerabdruck, Metadaten |
| Dubletten | gleicher Inhalt per SHA-256 | Versionen und fast Gleiches (siehe Abschnitt 6) |
| Rechte/mehrere Nutzer | keine | Anmeldung, Rollen, gemeinsamer Index, Konflikte |
| Firmen-Kategorien | 18 Privatfächer, fest im Code | Kategorien als Daten, Start-Assistent für Kunden/Projekte aus vorhandenen Ordnernamen |
| Aufbewahrung/GoBD | Archivnummer ja, Fristen nur aus Briefen | Aufbewahrungsfristen je Belegart (6/10 Jahre), unveränderbare Ablage, Verfahrensdoku. Der Organizer ist **kein** GoBD-Archiv |
| Export für KI | Text, Abschnitte, Steckbrief, paperless-Felder | Vektoren mit Modellname, JSONL/Markdown je Dokument, Ordnerstruktur als Sicht exportieren, Fremdtext markieren |
| Original unverändert | ja | – (eine Stärke) |
| Rückgängig | ja, Sieb und Korrektur | Rückgängig auch für Zusammenführungen und Ausschlüsse von Dubletten über Sitzungen hinweg |

## 4 · Reduktion gegen Maximierung

**Reduktion** (nimmt Arbeit weg): Dubletten und Müll ausscheiden, bevor jemand ordnet; die Sichten ersetzen das Pflegen von Ordnern; nur Unsicheres anfassen;
einmal korrigieren gilt für den ganzen Absender; die Originale bleiben, also gibt es keine Migration und kein Risiko; ein Index-Dokument ersetzt die eigene KI-Aufbereitung.
**Maximierung** (Arbeit kommt dazu): Rechteverwaltung, SharePoint-Anbindung, Workflows/Freigaben, GoBD-Archiv, eigene Suche mit Chat, Dauer-Server, Viewer.
Ein Paperless- oder DMS-Ersatz wäre Maximierung, und es gibt ihn schon (paperless-ngx, DocuWare, ecoDMS). Das Produkt sollte **Vorarbeit bleiben**:
Bestand einmal sichten, verdichten, beschriften und als KI-fertiges Paket abgeben.

## 5 · Aufwand (Einzelentwickler mit KI, grob)

- **Schlanker Kern, etwa 8–12 Wochen:** Desktop-Hülle oder Worker für 100.000 Dateien mit Wiederaufnahme (3), Dubletten- und Versionsstufe (1–2), Formate
  xlsx/pptx/msg/rtf/OCR in der App (2–3), Firmen-Kategorien als Daten mit Start-Assistent (1–2), KI-Export mit Vektoren (1), dazu eine Messung an einem echten Firmenbestand (1).
- **Voll, etwa 6–9 Monate:** zusätzlich mehrere Nutzer und Rechte, SharePoint/Graph, PST, CAD, Dauerbetrieb, Aufbewahrungsregeln, Updates und Support.

## 6 · Nachtrag: Doppelungen, Lesen aus dem Inneren der Dateien, Prüfkern als Leser

**Was er heute kann** (`lib/einlesen.ts`, `lib/dateiart.ts`):
- SHA-256 über die ganzen Bytes jeder Datei, auch bei auffälligen, zu großen (über 30 MB, dann ohne Text) und unlesbaren Dateien; leere Dateien bekommen bewusst keinen Fingerabdruck.
  Damit gilt: **dieselbe Datei mit anderem Namen oder in anderem Ordner wird erkannt**, auch wenn ihr Inhalt nicht lesbar ist.
- `doppelteMarkieren`: Als Original bleibt die Datei ohne „Kopie/copy/(2)/OneDrive-Gerätekonflikt“ im Namen, sonst die ältere, sonst die nach Pfad. Die übrigen bekommen
  `doppeltVon`, sind gesperrt, werden nicht gesiebt und nicht weitergegeben, stehen aber im Index als „doppelt“. **Nichts wird gelöscht.**
- Dateikopf (Magic Bytes): PDF, JPEG, PNG, GIF, WebP, HEIC, TIFF, BMP, EXE/ELF/Skript, ZIP-Behälter, OLE (alt-Office/MSG), Text und Mail. Passen Endung und Kopf nicht zusammen, gilt die Datei als auffällig.
- Beim Wiedereinlesen werden Dateien zuerst am Fingerabdruck wiedererkannt, dann am Pfad.

**Was fehlt:** (1) eine **Vorsortierung nach Größe**: Heute wird alles ganz gelesen und gehasht, obwohl nur Dateien gleicher Größe gehasht werden müssten. Bei 100.000 Dateien
ist das der größte Zeitgewinn. (2) **Versionen** wie `_final`, `_v2`, `neu`, Datumsanhänge, die gleich heißen, aber verschiedenen Inhalt haben: Es gibt keine Gruppe „Versionen von“.
(3) Ein **Namenskonflikt** (gleicher Name, anderer Inhalt) wird nicht gemeldet. (4) **Fast gleiche Dateien:** dasselbe Schreiben als Mail-PDF und als Scan, dasselbe Bild verkleinert.
Es gibt keinen Text-Fingerabdruck (normalisierter Text, MinHash) und keinen Bild-Fingerabdruck (pHash). (5) **„Code-Doppelungen“:** gleiche Rechnungsnummer und gleicher Absender
in zwei Dateien = wahrscheinlich dasselbe Stück. Die Nummern sind schon gelesen (`felder.nummern`), werden aber nicht verglichen. (6) Kein Fallback „Größe + Datum + Name“, wenn eine Datei
nicht lesbar ist. Das ist aber selten nötig, weil der Hash immer geht. (7) Kopf-Signaturen für DWG (`AC10…`), CDR (`RIFF…CDR`), RTF (`{\rtf`), 7z, RAR, MP4 und PST (`!BDN`) fehlen.

**Prüfkern als Leser.** `pruefer-formate.js` (`pruefePdf`) liest heute schon aus PDFs, auch aus gepackten ObjStm-Strömen: Author, Creator, Producer, Title, Subject, Keywords, XMP
(`dc:creator`, `xmp:CreatorTool`, `pdf:Producer`, `xmp:CreateDate`), Aktionen (JavaScript, Launch, OpenAction …), eingebettete Dateien, fremde Verweise, **Altfassungen
(mehrfaches `%%EOF`)** und Verschlüsselung. Dazu kommt `pruefeText` mit Schlüsseln, IBAN und Personenbezug. Er meldet das alles als *Befund* und nicht als Feld. **Im Organizer ist er
nicht eingebunden** (kein Import in `lib/` oder `src/`; der PLAN nennt ihn nur). `pruefer-mail.js` prüft Mails (Tarnung, gefährliche Anhänge, KI-Anweisung,
versteckter Text, SPF/DKIM). Message-ID und In-Reply-To liest er nicht als Feld, und `lib/eml.ts` liest sie auch nicht.

| Merkmal | heute | dazu nötig | (a) Dubletten/Versionen | (b) Zuordnung ohne Text | (c) echtes Datum | (d) Auffälliges |
|---|---|---|---|---|---|---|
| PDF Info/XMP (Autor, Producer, Titel, CreateDate) | Prüfkern liest es, als Befund | als Feld ausgeben, 0,5 T | Herkunft gleich = Kandidat | Producer und Autor deuten auf Absender oder Programm des Kunden | ja | Personenbezug in Metadaten |
| PDF `/ID` im Trailer, `CreationDate` im Info-Wörterbuch | nein | Regex, 2 h | **gleiche erste ID = gleiche Herkunft, zweite ID anders = Version** | – | ja | – |
| PDF Altfassungen, Anhänge, Aktionen | Prüfkern ja | übernehmen, 0,5 T | Speicherstände = Versionen in der Datei | – | – | ja: Geschwärztes steckt noch drin, Makro-ähnliche Aktionen |
| Office docProps (core/app.xml: Autor, Titel, Firma, Vorlage, created/modified, Revision) | nein (`zipEintrag` ist da) | 0,5–1 T | Vorlage und Revision = Versionskette | **Firma/Autor = Kunde oder Mitarbeiter** | ja | Autor ist personenbezogen |
| Office Makros (`vbaProject.bin`, .docm) | nein | 2 h | – | – | – | ja |
| EXIF (Kamera, Datum, GPS) | Organizer ja | – | gleiche Aufnahmezeit + Kamera = dasselbe Foto in anderer Größe | GPS → Baustelle/Objekt | ja | GPS beim Weitergeben entfernen |
| Mail Message-ID, In-Reply-To, References | nein | 2–4 h | gleiche Message-ID = dieselbe Mail doppelt abgelegt | **Thread → Projekt/Kunde** | Mail-Datum gibt es schon | Prüfkern-Befunde |

Alles davon ist **Reduktion**: Die Menge schrumpft vor dem Ordnen, die Zuordnung braucht keinen lesbaren Text, und das Datum ist ohne Raten richtig.
Laut Hinweis gehört der Ausbau des Prüfkerns ins Repo des Auslieferungsprüfers, danach wird er byte-gleich mit Pin in den Organizer nachgezogen. Der Prüfkern liefert dann
neben den Befunden ein Feld `merkmale` (Rückgabe erweitert, Befunde unverändert, damit „zwei Fassungen, ein Ergebnis“ mit der Python-Fassung hält).

**Formate im Betrieb** (Reihenfolge nach Häufigkeit, geschätzt):

| Nr. | Format | heute | ohne große Bibliothek in JS | Aufwand | Nutzen |
|---|---|---|---|---|---|
| 1 | XLSX/ODS | nur erkannt | Text aus `sharedStrings.xml`/`content.xml`, docProps; Zip-Leser ist da | 0,5–1 T | Angebote, Listen, Kunden-/Projektnummern |
| 2 | Outlook-MSG | nur erkannt | OLE/CFB-Leser: Betreff, Absender, Text, Anhänge, Message-ID | 3–5 T | groß: Mail-Ablage der meisten Betriebe |
| 3 | Scan-PDF ohne Text, TIFF mehrseitig, JPEG | OCR nur im Skript | Tesseract ist im Klon vorhanden; TIFF zerlegen | 3–5 T | groß: Papierbestand |
| 4 | PPTX | nur erkannt | `ppt/slides/*.xml` und docProps | 0,5 T | mittel |
| 5 | DOC/XLS alt | nur erkannt | OLE-Leser (aus 2) plus Text-Ströme; Text aus Word97 gut, aus XLS mühsam | 2–4 T nach 2 | Altbestand |
| 6 | ZIP | erkannt | Liste der Einträge und Hash je Eintrag (`zipEintrag`); 7z/RAR nur Signatur | 1 T | Dubletten in Archiven |
| 7 | RTF | als Text | Steuerwörter entfernen, `\info` (Autor, Datum) | 0,5 T | klein |
| 8 | HEIC | EXIF-Kopf teils | Metadaten ja, Bild/OCR nur mit Decoder-Bibliothek | 1 T Metadaten | Handyfotos |
| 9 | PST | nein | eigener Leser (NDB-B-Baum), groß | 2–4 W oder Export nach EML verlangen | groß, aber einmalig: **besser „aus Outlook als .eml/.msg exportieren“** |
| 10 | DWG/DXF/CDR | unbekannt | DWG: Fassung aus der Signatur, Fingerabdruck. DXF ist Text (Ebenen, Blocknamen). CDR: RIFF, nur Signatur | 1 T | Dubletten, Projektzuordnung über Ordner und Name |

Empfohlen sind zuerst die Größen-Vorsortierung und Versionsgruppen (1–2 T), dann 1 → 4 → 7 (Office über den vorhandenen Zip-Leser, 2 T), dann Metadaten als Felder (PDF, docProps, Message-ID; 2 T),
dann 2 und 5 (OLE, 1–1,5 W), dann OCR in der App (1 W), Text- und Bild-Fingerabdruck für fast Gleiches (1 W) und Nummern-Dubletten (1 T). PST, CAD-Inhalt und HEIC-Bilder kommen zuletzt oder über einen Export.
**Der ganze Nachtrag kostet rund 4–6 Wochen und steckt zum größten Teil schon im „schlanken Kern“ oben.**
