# Kreuztest: eigener Scan- und Foto-Simulator

Aufruf: `python3 simulator.py /home/user/Datei-Organizer/pruefstapel-rest aus --jobs 4` (etwa 3–4 Minuten für 200 Stücke).
Als Eingabe dienen nur die `.txt` der obersten Ebene, Ausgabe und `aus/SETZEN.json` landen in `aus/`. Kein Code und kein Skript aus dem Repo
wird benutzt. Alles ist über den Dateinamen festgelegt (SHA-256 als Zufallskeim), ein neuer Lauf ergibt dieselben Bilder.

## Zuteilung
- Form: nach `sha256("form|"+name)` sortiert, die ersten 60 % werden `pdf-scan`, der Rest `foto` (120/80).
- Güte: innerhalb jeder Form nach `sha256("guete|"+name)` sortiert, reihum gut/mittel/schlecht (PDF 40/40/40, Foto 27/27/26).
- PDF: nur Seitenbilder ohne Textebene und ohne Schriften (mit Pillow geschrieben, JPEG als DCT, Fax als 1 Bit CCITT G4). Auflösung:
  gut 300 dpi, mittel 200 dpi, schlecht 150 dpi. Mehrseitige Texte ergeben mehrseitige PDFs.
- Foto: JPEG, nur Seite 1. Größe: gut 3024×4032 (q90), mittel 2268×3024 (q78), schlecht 1800×2400 (q62).

## Seitenaufbau
Jeder Text wird einer von vier Arten zugeordnet:
- **Brief** (Standard): Briefkopf mit Wortmarke (erste Zeile groß und farbig; neun Schnitte von Inter Black bis Caladea Bold Italic) und
  Bildmarke ohne Buchstaben (Kreis mit Ring, Schrägstreifen, Balken, Dreieck mit Kreis, versetzte Quadrate, Bögen, Raute). Es gibt fünf
  Kopfformen: links, rechts, mittig, farbiges Band über die ganze Breite, Farbbalken am linken Rand. Dazu kommen die Rücksendezeile klein und
  unterstrichen über dem Anschriftfeld, das Anschriftfeld (DIN-Lage, Falzmarken), ein Infoblock „Schlüssel: Wert“ rechts (manchmal grau
  hinterlegt), der Betreff fett, Tabellen aus Zeilen mit 3+ Leerzeichen (Stile: Gitter, grauer Kopf, Zebra, Linien, Kasten; Zahlen
  rechtsbündig), Zwischenüberschriften fett und eine Fußzeile über einer Linie (die letzte „·“-Zeile, sonst nur „Seite x von n“). Als
  Brotschrift dienen Serifen (Liberation Serif, FreeSerif, DejaVu Serif, Caladea), Groteske (Liberation Sans, FreeSans, DejaVu Sans,
  Carlito, Inter) und bei alten Jahrgängen oft Schreibmaschine (FreeMono, Liberation Mono).
- **Kassenbon**: schmaler Streifen (58/76/80 mm) in Festbreitenschrift, Kopf mittig, Summe fett, manchmal mit Bildmarke und Strichcode ohne
  Ziffern. Lange Bons sind in Stücke geteilt (je Stück eine PDF-Seite), beim Scan liegt der Streifen auf der Glasplatte.
- **Mail-Ausdruck**: schwarzer Balken, Kopffelder mit fettem Schlüssel, darunter eine Trennlinie und der Text, Zitate grau und kursiv, Seitenzahl.
- **Portal/App-Ausdruck**: farbige App-Leiste mit Bildmarke und Titel, Karten mit abgerundeten Ecken, Schlüssel klein und grau links, Wert
  fett rechts.

Papier: weiß, creme, vergilbt, Recycling-grau, farbig (blau, grün, rosa, gelb). Wasserzeichen sind entweder eine blasse Bildmarke oder ein
schräges Wort (KOPIE/DUPLIKAT/ENTWURF/ZWEITSCHRIFT). Eine Lochung ist als echtes Loch umgesetzt (Alpha 0), dahinter sieht man Deckel oder
Tisch. Die Heftklammer hat Schatten und Glanz.

## Fehlerbilder (eigene Umsetzung, numpy/Pillow)
**Anmerkungen auf dem Papier (vor dem Gerät):**
- Textmarker: gelb, grün, rosa oder orange, multiplikativ, schräge Ränder.
- Rot- oder Kugelschreiber: Kringel, Wellenlinie, Haken am Rand oder kurze Randnotiz in schräger Kursive („erl.“, „bez.“, „Frist!“ …).
- Eselsohr: Ecke umgeknickt, die Rückseite ist sichtbar, an der Knickkante liegt Schatten.
- Knick/Falten: Drittel-, Halb-, Kreuz- oder Drittel-plus-Senkrechtfalz. Die Teilflächen hinter der Falzlinie sind wirklich versetzt und
  leicht gedreht (Remap). Dazu kommen einseitige Licht/Schatten-Rampe und eine dunkle Knicklinie.

**Scan (PDF):**
- Flachbett: Seite schräg (gut 0,2–0,7°, mittel 0,5–1,6°, schlecht 1–3°) und verschoben auf die Glasplatte gelegt. Ränder und Löcher zeigen den
  Deckel mit Kantenschatten. Optik leicht weich, Rauschen, Staub und Flecken, bei viel Staub ein Haar (Zufallsweg).
- Einzug (ADF): senkrechte dunkle oder helle Streifen (Sensorschmutz) und schwankende Einzugsgeschwindigkeit (Zeilen gestaucht oder gedehnt).
- Moiré/Raster: Druckflächen werden mit Rasterpunkten je Farbkanal gerastert (15°/75°/45°, ohne das Papier). Weichzeichnen und eine
  Schwebungswelle erzeugen Moiré.
- Zu hell (Kontrast gestaucht) oder zu dunkel (Gamma).
- Kopierer, Kopie einer Kopie (2–3 Durchgänge): Graustufen, leicht verkleinert und verschoben, adaptive S-Kurve (Text wird fett, Flächen
  verwaschen), Grauschleier, Tonerspritzer, dunkle Randbalken.
- Fax: Kopfzeile mit Datum und „S. 0x“, Abtastung 204×98 dpi, 1 Bit mit adaptiver Schwelle, Bitfehler, Zeilenaussetzer, grob
  hochskaliert.
- Thermopapier verblasst (Bons): die Schwärzung sinkt ungleichmäßig (Verlauf und Flecken) zu graublau, das Papier wird gelblich.
- JPEG-Artefakte: gut q85–92, mittel q62–76, schlecht q40–55 (Fax: verlustfrei 1 Bit).

**Handyfoto (JPEG):**
- Gewölbtes Papier (Bogen oder Welle, Zeilen biegen sich, Schattierung nach Neigung).
- Perspektive: Trapez (Handy geneigt) plus Zufall je Ecke und eine Drehung bis ±6°.
- Hintergrund am Rand: Holz, dunkler Tisch, heller Tisch, kariertes Tuch oder Stein, mit Schlagschatten der Seite.
- Ungleichmäßiges Licht (Verlauf und Vignette), Schatten von Hand oder Handy, Glanzstelle (Lichtfleck, der den Kontrast schluckt).
- Farbstich: Kunstlicht, Leuchtstoff, bläulicher Schatten, mit unvollständigem Weißabgleich.
- Bewegungsunschärfe (2–6 px in beliebiger Richtung) oder leichte Unschärfe, Sensorrauschen (stärker im Dunkeln) und Farbrauschen,
  Nachschärfen wie am Handy (Halos), bei „schlecht“ manchmal quer aufgenommen (90° gedreht).

Die Stärke hängt von der Güte ab: „gut“ hat kaum Fehler, „mittel“ 2–3 zusätzliche, „schlecht“ das stärkste Gerät (Fax, Kopie der
Kopie, Einzug) und 2–4 zusätzliche Fehler, ist aber für einen Menschen noch lesbar (Stichproben angesehen).

In `SETZEN.json` stehen unter `fehlerbilder` alle angewandten Fehler mit Kennung, z. B. `geraet-fax`, `schraeg-1.6grad`, `knick-kreuz`,
`woelbung-welle`, `jpeg-q62`, `150dpi`, `seiten-2`. Hinzugefügter Text (Fax-Kopfzeile, Wasserzeichenwort, Randnotiz, „Seite x von n“) ist
dort an seiner Kennung zu erkennen.
