# sim4 – eigener Setzer und Scan-/Foto-Simulator

Eigenbau, unabhängig von vorhandenen Setz- oder Bildskripten. Eingabe nur `stapel/*.txt` (oberste Ebene).

- Aufruf: `python3 setzer.py ../stapel aus` (ein Lauf, 4 Prozesse). Ergebnis: je Textdatei eine Datei in `aus/`, dazu `aus/SETZEN.json`.
- Zuteilung fest über den Dateinamen (SHA-256-Rangfolge): 55 % `pdf-scan` (PDF nur aus Seitenbildern), 45 % `foto` (JPEG);
  je Form Güte gut/mittel/schlecht zu je einem Drittel. Zufall je Datei aus dem Namen gesät, also wiederholbar.
- Gestalten (`gestalt` in SETZEN.json): Brief nach DIN 5008 (Wort-/Bildmarke, Rücksendezeile, Anschriftfeld, Infoblock,
  Falz-/Lochmarken, Fußzeile mit Register- und Bankangaben), Mail-Ausdruck, Portal-Ausdruck, App-Screenshot (Mail, Notiz),
  Kassenbon (schmal, Thermo), Handzettel/Notiz in Handschrift-Nachbildung, Aushang, Werbebrief, Handzettel-Werbung, Trauerkarte.
- Codes (aus reportlab gerastert): `qr-ueberweisung` (GiroCode/EPC mit IBAN, Betrag, Zweck), `code128` (Kunden-/Vorgangsnummer;
  auf Bons Bon-Nr.), `datamatrix-frankierung`, `qr-bon` (TSE-/Link-QR), `qr-link` (Werbung), `strichcode-bescheid` (2/5 interleaved am Rand).
- Zusätze: Handnotizen, Kreis/Unterstreichung, Textmarker, Stempel (Firma, Dienstsiegel, KOPIE), Unterschrift.
- Fehlerbilder Scan: Flachbett mit Deckelschatten, schiefer Einzug mit Hintergrund, Kopie der Kopie (Kontrast, Tonerstreifen,
  Kopierrand), Falz, Knick, Lochung, Thermopapier verblasst, niedrige Auflösung (100–150 dpi), Schwarzweiß-Schwelle, Rauschen.
  Foto: Perspektive, Untergrund, Wölbung, Licht-Verlauf, Vignette, Schatten von Hand/Handy, Spiegelung, Moiré (Bildschirm),
  Unschärfe, Verwacklung, Rauschen, JPEG-Artefakte.
- Der ganze Text jeder .txt steht auf dem Dokument (auch Abtipp-Vermerke in Klammern); Zusätze (Fußzeile, Notizen, Stempel)
  kommen hinzu. Fotos sind immer eine Seite (Schrift wird bis 6 pt verkleinert, sonst Seiten nebeneinander).
- Grenzen: Handschrift ist eine Schrift-Nachbildung mit Zittern, keine echte Hand; Emojis über Ersatzschrift.
