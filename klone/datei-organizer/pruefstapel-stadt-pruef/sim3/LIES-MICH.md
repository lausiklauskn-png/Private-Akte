# sim3 – eigener Setzer und Scan-/Foto-Simulator

Aufruf: `python3 setzer.py` (liest nur `../stapel/*.txt`, schreibt nach `aus/`, 4 Prozesse, ca. 1 min).

1. **Art erkennen am Inhalt** (`classify`): Mail (Kopfzeilen Von/An), Chat/SMS, Kassenbon/Quittung, Portalausdruck,
   Kontoauszug, Zettel/Terminkarte (handschriftlich), Aushang, Werbung, sonst Brief.
2. **Setzen** (Pillow, 150 dpi, A4): Brief nach DIN 5008 – Wortmarke + Bildmarke (Wappen bei Behörden), Rücksendezeile
   und Anschrift im Fenster, Infoblock rechts (Datum, Zeichen, Nummern), Betreff fett, Tabellen spaltentreu mit
   Zebrastreifen und rechtsbündigen Beträgen, Fußzeile aus Register-/Bankzeilen, Falz- und Lochmarken; Mail als
   Webmail-Druck, Bon schmal in Thermo-Monoschrift, Chat als Bildschirmfoto auf A4, Zettel als Notizpapier mit
   nachgeahmter Handschrift, Konto als Online-Banking-Ausdruck (Navigationsleiste) oder Auszugsdrucker, Werbung mit
   Banner und Angebotskacheln. Schriften aus /usr/share/fonts (Liberation, Carlito, Caladea, DejaVu, Inter, FreeFont, JetBrains Mono).
   Der ganze Text steht auf dem Dokument; Trennlinien aus `----` werden als Linie gezeichnet.
3. **Codes** (reportlab-Barcodes, eigene Rasterung): GiroCode (EPC-QR mit IBAN/Betrag aus dem Text) bei Rechnungen/
   Mahnungen, Code128 mit Kunden-/Vertrags-/Rechnungsnummer, Datamatrix-Frankiervermerk im Fenster, senkrechter
   Strichcode (2/5) auf Bescheiden, QR-Link auf Bons und Werbung.
4. **Beiwerk**: Eingangsstempel, handschriftliche Randnotizen, Unterschrift (je zufällig, fest über den Namen).
5. **Fehlerbilder**: Flachbett (leichte Schräge, Deckelschatten), Einzug schief (Versatz, schwarzer Rand,
   Sensorstreifen), Kopie der Kopie (Graustufen, Kontrast, Tonerpunkte, Unschärfe), Knicke, Locherlöcher, kleines Blatt
   auf der Glasplatte, Thermopapier verblasst; Handyfoto mit Perspektive, Hintergrund (Holz/Stoff/dunkel/hell),
   ungleichem Licht, Vignette, Schatten von Hand/Handy, Lichtreflex, Farbstich, Unschärfe, Verwackeln, JPEG.
6. **Verteilung fest über SHA-256 des Dateinamens**: `h % 100 < 60` → PDF nur aus Seitenbildern (keine Textebene),
   sonst JPEG (nur Seite 1); Güte aus anderen Bits des Hashes (gut/mittel/schlecht).
   Ergebnis und Codes je Stück: `aus/SETZEN.json`.
