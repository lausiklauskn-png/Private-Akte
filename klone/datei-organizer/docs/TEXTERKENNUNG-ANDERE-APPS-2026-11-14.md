# Texterkennung in Workflow PDF Pro, BookLedgerPro, Private Brain – Prüfung und Vorschlag (14.11.2026)

Klaus 14.11.: „Wenn du die Texterkennung beschleunigst, prüfe, ob du das in Workflow PDF Pro nachziehen kannst … genauso BookLedgerPro“;
„und Private Brain, falls es da eine Texterkennung gibt; wenn nicht, ziehe sie nach“. Gelesen (nur lesend, Stand der Hauptzweige 14.11.):
Workflow PDF Pro `6207af5`, BookLedgerPro `939f08a`, Private Brain Pro `432baab`. **In keinem der drei Repos wurde etwas geändert.**
Private Brain **hat** eine Texterkennung (App-Fassung, `native/native-ocr.js`) – es gibt nichts nachzuziehen, nur zu beschleunigen.
Nichts davon ist gemessen; Zahlen vom Gerät gibt es in keinem der Repos („nicht gemessen am Tablet“, `pruefer-anhang.js:489`).

## Gemeinsam

Alle drei nutzen Tesseract.js 7.0.0 mit `tessdata_fast` (LSTM). `pruefer-anhang.js` (Prüfkern) ist in allen dreien byte-gleich
(Quelle: Auslieferungsprüfer → Workflow-PDF → Nachziehen). Der Scanner (`scanner.js`, `scan-bild.js`) ist in BookLedgerPro byte-gleich aus
Workflow-PDF. Ändern heißt also: **an der Quelle** ändern und nachziehen – nicht in den Kopien.

## Wahrscheinliche Bremsen (aus dem Code, nicht gemessen)

| App | Bremse | Stelle | Wer ist die Quelle |
|---|---|---|---|
| alle | **Prüfkern liest PDFs mit Textebene trotzdem per Texterkennung gegen** (bis 10 Seiten, „Gegenlesen“, um versteckten Text zu finden) und Bilder **zweimal** (zweiter Durchgang nach Kontrast-Spreizung) | `pruefer-anhang.js` ~793, 830–892, 599–663 | Auslieferungsprüfer |
| alle | Prüfkern erkennt mit **drei Sprachen zugleich** (deu+eng+rus) | `pruefer-anhang.js` ~495 | Auslieferungsprüfer |
| alle | **ein Arbeiter**, Seiten und Dateien **nacheinander** | Scanner `scanner.js:178–192, 229`; Prüfkern Promise-Kette | Workflow-PDF / Auslieferungsprüfer |
| Workflow PDF Pro, BookLedgerPro | Scanner rechnet jede Seite vor der Erkennung auf dem Haupt-Thread neu (Entzerren, Schärfe) bei 200 dpi | `scanner.js:188–192`, `scan-bild.js:191–217` | Workflow-PDF |
| BookLedgerPro | „Durchsuchbar“ immer an → beim Ablegen wird jede Scanseite erkannt | `src/ui/scanner.js:99` | BookLedgerPro selbst |
| **Private Brain** | **jeder Import** (auch Text-PDFs) läuft durch den vollen Prüfkern (Gegenlesen + doppelte Bilder) und der Import **wartet** darauf – entgegen `docs/NATIVE-TEXTERKENNUNG.md` („Text-PDFs direkt gelesen“) | `native/native-ocr.js:269, 365–391` | Private Brain selbst |
| **Private Brain** | **vier Sprachen** (deu, eng, rus, pol) in jedem Durchgang | `native/native-ocr.js:8, 145`, `tools/native/ocr-assets.json` | Private Brain selbst |
| **Private Brain** | Arbeiter wird nach **30 s Leerlauf** und bei jedem Fehler beendet → nächste Datei lädt vier Modelle und WASM neu | `native/native-ocr.js:11, 119–121, 192` | Private Brain selbst |

## Was sich aus dem Datei-Organizer übertragen lässt

Der Datei-Organizer hatte dieselbe Bauform (ein Arbeiter, nacheinander). Seit heute: mehrere Arbeiter nach Gerät, Dateien eines Blocks
zugleich (`src/vendor.ts`, `src/app.tsx`, `src/arbeit.ts`). In Node gemessen: 2 nebeneinander 1,9-fach, 4 nebeneinander 2,9-fach (nicht im
Browser, nicht am Gerät). Übertragbar ist das **Muster** (Arbeiter-Pool, Anzahl nach `hardwareConcurrency`/`deviceMemory`), nicht der Code –
die Apps haben eigene Abläufe. Die Vorverarbeitung (`src/vorverarbeitung.ts`) ist **nicht** übertragbar, solange sie nicht unabhängig
nachgewiesen ist (Prüfbericht 14.11., Befund 2); Workflow-PDF hat ohnehin schon eine eigene (Hintergrund-Schätzung im Scanner).

## Vorschlag (Reihenfolge nach Wirkung und Risiko) – braucht Klaus' Ja je Punkt

1. **Private Brain, nur eigener Code (`native/native-ocr.js`), größte Wirkung:** Text-PDFs mit Textebene direkt lesen statt durch den vollen
   Prüfkern (wie die eigene Doku sagt); Sprachen auf deu (+eng) begrenzen oder einstellbar machen; Arbeiter nicht nach 30 s beenden (z. B.
   erst nach 5 min oder beim Verlassen); zwei Arbeiter auf mittleren/starken Geräten. Messen mit der vorhandenen Probe `tools/native/test-ocr.mjs`.
2. **Prüfkern an der Quelle (Auslieferungsprüfer):** Gegenlesen von Text-PDFs abschaltbar oder nur auf Wunsch; zweiter Bild-Durchgang nur,
   wenn der erste wenig liefert; Sprachen deu+eng als Vorgabe. Danach nach Workflow-PDF, Workflow PDF Pro, BookLedgerPro, Private Brain
   nachziehen (byte-gleich mit Pin).
3. **Scanner an der Quelle (Workflow-PDF):** Seiten eines Scans mit zwei Arbeitern nebeneinander erkennen; Vorberechnung der Seite in einen
   Worker verlegen. Danach Workflow PDF Pro und BookLedgerPro (`tools/wfpdf-nachziehen.mjs`).
4. **BookLedgerPro:** „Durchsuchbar“ als Schalter statt immer an (eigener Code) – ändert sichtbares Verhalten, also erst Vorschau.

Vorsicht: In allen drei Repos laufen Zweige anderer Sitzungen („nicht veröffentlicht“, Pro-Verbund, Tresor); die Pseudonymisierung betrifft
die Familienakte (in Private Brain gibt es `modules/25_pseudonym.js`, unabhängig von der Texterkennung). Veröffentlichungen nur mit Klaus' Wort.

## Umgesetzt und gemessen (14.11.2026 abends, Klaus: „weiterarbeiten, auch mit Private Brain“)

- **Private Brain (#141, nicht veröffentlicht):** Arbeiter bleibt 3 Minuten statt 30 s bereit, beim Wechsel in den Hintergrund sofort frei.
- **Sprachsatz – Messung zur Entscheidung (nicht umgesetzt):** 40 deutsche Scans/Fotos (Rest-Stapel, eigener Setzer), tesseract.js 5.1.1 in Node,
  tessdata_fast derselben Herkunft wie Private Brain (Pin `87416418…`, SHA-256 `deu` gleich): 4 Sprachen **1,37 s** je Bild, Wortfund 71,8 % ·
  Deutsch+Englisch **0,94 s** (−31 %), 72,1 % · nur Deutsch **0,73 s** (−47 %), 72,3 %. Ein Zweistufen-Weg (erst Deutsch+Englisch, bei über 50 %
  unsicheren Zeilen nochmal mit allen vier) würde bei 5 von 57 Setzer-Bildern, aber 23 von 60 Bildern des fremden Simulators nachlesen – dort im Mittel
  langsamer als heute. Der Gewinn kommt also nur, wenn Russisch/Polnisch bei deutscher Oberfläche entfallen; das nimmt eine veröffentlichte Fähigkeit
  (Probe `test-ocr.mjs` mit russischem Bild) und liegt bei Klaus. Grenzen: Node statt WebView, andere tesseract.js-Fassung als die App (7.0.0), nur deutsche Vorlagen.
- **Gegenlesen von Text-PDFs** im Prüfkern bleibt (Sicherheitsprüfung auf versteckten Text); zwei Arbeiter nebeneinander nicht gebaut (Speicher am Handy mit vier Sprachen).
