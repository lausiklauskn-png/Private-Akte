# sim2 – eigener Scan- und Foto-Simulator

Unabhängig gebaut: gelesen wurden nur die Texte `../stapel/*.txt`, keine vorhandenen Setz- oder Bildskripte.

Aufruf: `python3 simulator.py ../stapel aus` (optional einzelne Dateinamen dahinter). Wiederholbar: alles wird über den md5 des Dateinamens ausgewürfelt.

## 1. Setzen (Seitenaufbau)
- Text in Blöcke (Leerzeilen) zerlegt. Erkannt werden: Absenderblock oben → **Briefkopf** (erste Zeile als Wortmarke in einer von neun Display-Schriften, wahlweise Großbuchstaben, links/mittig/rechts, dazu oft eine **Bildmarke ohne Buchstaben** – Ringe, Quadrate, Welle, Blatt, Dreieck, Punkte), einzeilige Absenderangabe → **Absenderzeile** klein unterstrichen, Block mit PLZ → **Anschriftfeld** (teils mit Fenstermarken), `Datum:`/`Unser Zeichen:`/… → **Bezugszeichenzeile** (nebeneinander mit kleinen Überschriften oder untereinander), Betreff fett, Zeilen mit Spaltenabständen → **Tabellen** (Linien, Zebra, Rahmen oder ohne; Beträge rechtsbündig), Trennlinien, Unterschrift als Kritzel, letzter Block mit IBAN/USt/Telefon → **Fußzeile** (Spalten oder Zeilen, farbige Linie).
- Seitenstil zufällig: Farbbalken oben/links, Linie, schlicht, Kopf rechts; neun Textschriften, Größe 10–12 pt, Ränder und Zeilenabstand variieren; Seitenumbruch bei langen Texten.
- Kassenbons (Trenner `-----` + SUMME/Kasse/Bon) eigens: schmales Thermopapier, Festbreitenschrift, 40 Zeichen, Logo ohne Buchstaben, Strichmuster unten.
- Der Text bleibt vollständig und in der Reihenfolge erhalten; nur Stempel, Notizen und Faxkopf kommen als Störung hinzu.

## 2. Fehlerbilder (eigene Umsetzung mit numpy/Pillow)
- Scan-Geräte: **Flachbett** (leichte Schräge, Lampenabfall, Unschärfe), **Einzug** (Schräglage, Glas-Streifen, Walzenschlupf), **Fax** (halbe Zeilenauflösung, Schwellwert, Punkte, verlorene Zeilen, Faxkopf), **Kopie der Kopie** (mehrfach: Kontrast, Toner, dunkle Ränder), **Thermopapier** (ungleich verblasst, gelblich).
- Zusätze: Papierstruktur, **Knicke** (Drittelfaltung, Schatten/Licht, Abrieb), **Stempel** (farbig, schräg, fleckige Farbabgabe), **Handschrift-Notizen** (Kugelschreiber, zittrige Grundlinie, Haken, Kringel, Striche), Lochung, Kaffeefleck, Durchscheinen der Rückseite, Graustufen, JPEG-Verluste, schlecht = 150 dpi und kontrastarm.
- Handyfoto: Papierwölbung, Unterlage mit Maserung, **Perspektive** (verzerrtes Viereck), Schlagschatten, Lichtverlauf und Vignette, Schatten von Hand/Handy, Glanzlicht, Farbstich, Fokus- und Verwacklungsunschärfe, Rauschen, Nachschärfen, JPEG.
- Güte gut/mittel/schlecht skaliert alle Stärken; „schlecht“ ist für Menschen gerade noch lesbar (Stichproben angesehen).

## 3. Zuteilung
Rang nach md5(„form:“+Name): erste 60 % → `pdf-scan` (PDF nur aus Seitenbildern, keine Textebene, mehrseitig), Rest → `foto` (JPEG, nur Seite 1). Güte je Form nach md5(„guete:“+Name) in Dritteln.
Ergebnis und Fehlerbilder je Datei: `aus/SETZEN.json`.
