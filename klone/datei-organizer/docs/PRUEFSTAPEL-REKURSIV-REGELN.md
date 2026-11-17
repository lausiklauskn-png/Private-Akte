# Rekursive Verbesserung – Regeln, vorab festgelegt (15.11.2026)

Eingecheckt, **bevor** die Prüfstadt existiert. Auftrag: `docs/BRIEF_SITZUNG_2026-11-15_REKURSIVE-VERBESSERUNG.md`. Es gelten
`docs/PRUEFREGELN-GRUPPE.md` (Regeln 1–10), `docs/FACHREGEL.md` und die Lehre aus `docs/PRUEFBERICHT-EHRLICHKEIT-2026-11-14.md`
(kein Nachweis an einer Welt, die der eigene Setzer oder Schreiber gebaut hat). Recherche dazu: `docs/RECHERCHE-REKURSIVE-VERBESSERUNG-2026-11-15.md`.

## Zwei getrennte Städte

1. **Lernstadt** (`pruefstapel-stadt-lern/`): eine erfundene Stadt mit Ämtern, Kasse, Vermietern, Firmen, Ärzten, Vereinen und
   Haushalten. Ein **Stadtplaner**-Agent legt Stadt, Haushalte und Ereignisse eines Jahres fest; **mehrere Absender-Agenten**
   (je eine Gruppe: Ämter, Geld und Versicherung, Wohnen und Verträge, Gesundheit und Schule, Privates und Vereine) schreiben die
   Schriftstücke aus ihrer Sicht; ein **Fallen-Autor** schreibt bewusst schwere Stücke (Klaus: „bewusst Fehler einbauen“), z. B. ein
   Brief, der einen Kontoauszug erwähnt, Werbung im Gewand einer Rechnung, Mahnung ohne das Wort „Mahnung“, Absender nur im Logo.
   Soll = Angabe der Schreiber. Die Lernstadt ist **zum Lernen** da und wird angesehen.
2. **Prüfstadt** (`pruefstapel-stadt-pruef/`): gleiche Bauart, aber **andere** Agenten (eigener Planer, eigene Absender-Agenten,
   kein Fallen-Autor), andere Stadt. Kein Agent der Prüfstadt sieht die Lernstadt, das Repo oder den Kern. Bis zur Messung liegt
   sie außerhalb des Repos und wird von mir nicht geöffnet. Soll = Mehrheit von **drei unabhängigen Einordnern** (zwei Sonnet,
   ein Opus) nach den Trainings-Regeln Punkt 3–4; bei drei verschiedenen Urteilen entscheidet der Schreiber, wenn er einem folgt.
3. Alles erfunden (Namen, Firmen mit „Beispiel“ oder sichtbar erfunden, IBAN nur Nullen, Kennzeichen „BSP-…“). Öffentliche Vorlagen
   (Bescheid-Aufbau, Rechnungsfelder, DIN-Brief) nur als Aufbau, nichts wörtlich.

## Schleife (nur an Lerndaten)

4. Lerndaten = alle verbrauchten Stapel (Runden C–F, Rest, Absender, Briefe, Vermieterin, Familie K3) und die Lernstadt.
   Die Schleife ist „raten → Korrektur → lernen“: der Kern rät, das Soll korrigiert, gelernt wird nur aus den Fehlern.
5. Jede Methode wird **reihum** gewählt (ein Stapel ausgelassen, dort gemessen). Die Lernstadt zählt dabei als eigener Stapel.
   Eine Methode kommt in den Kandidaten nur, wenn sie reihum **über alle Stapel zusammen** besser ist und an keinem Stapel um mehr
   als 2 Punkte schlechter. Zahlen reihum sind Abstimmwerte, kein Nachweis.
6. Vor der Messung wird der Kandidat **eingefroren** (Commit-Kennung unten). Danach ändert sich am Kern nichts mehr.

## Nachweis (einmal, an der Prüfstadt)

7. **Alt** = Kern `079dd6d` (Fassung 0.4.4). **Neu** = eingefrorener Kandidat. Gemessen am reinen Text der Prüfstadt,
   `scripts/messen-briefe.mjs` mit dem Soll aus den Einordnern.
8. **Hauptkennzahl (eine):** Anteil richtiger Feld-Urteile über die fünf Felder Bereich, Schriftstück, Absender, Person (nur wo das
   Soll eine nennt), Frist. Test: gepaarte Differenz je Stück, Bootstrap über **Absender** (10 000 Ziehungen), einseitig 5 %.
   Gilt als besser, wenn die untere Grenze der 90-%-Spanne der Differenz über 0 liegt.
9. **Nebenzahlen:** je Feld Wilson-Spanne und McNemar, mit Holm über fünf Felder; nur als Hinweis, kein Nachweis.
   Verschlechterungen werden genannt.
10. **Gegenprobe der Methode:** Mit denselben Lerndaten wird auch das **bisherige Vorgehen** gerechnet (nur das Wortmodell neu
    abstimmen mit `scripts/briefmodell-abstimmen.mjs --verbraucht …`, ohne neue Schicht). Es wird ebenfalls eingefroren und an
    der Prüfstadt einmal gemessen. Die neue Methode gilt erst dann als besser als das alte Vorgehen, wenn sie dort auch dieses
    schlägt (gleicher Test wie Punkt 8).
11. **Übertragung:** In die Familienakte nur nach Punkt 8 **und** 10 und mit Klaus' Ja. Veröffentlicht wird nichts ohne sein Wort.
12. **Gesetzte Fassung (Nachtrag 15.11., Klaus: „die Dokumente müssen genauso aufgebaut sein wie heutige, mit Barcode oder QR-Code“;
    eingetragen, bevor die Prüfstadt gelesen oder gemessen ist):** Ein eigener Agent (Simulator 3, kennt weder Repo noch Kern noch die
    früheren Simulatoren) setzt jedes Stück der Prüfstadt als Seitenbild nach heutigem Aufbau: Briefkopf mit Logo, Anschriftfeld,
    Infoblock, Tabellen, Fußzeile, **Barcodes und QR-Codes** (Überweisungs-QR, Sendungs- und Kundencodes, Datamatrix-Frankierung),
    Stempel und Handnotizen; Ausgabe als PDF-Scan und Handyfoto in drei Güten. Gemessen mit der Texterkennung der App
    (`scripts/leser-node.mjs`, `--gesetzt`), alt gegen neu, gleicher Test wie Punkt 8 – als **Nebenzahl**, die Hauptzahl bleibt der Text.
13. **Grenze:** erfundene Unterlagen von Claude-Agenten. Die Zahlen gelten für diese Machart.

## Eingefroren

Eingefroren am 15.11.2026 gegen 01:25 Uhr, **bevor** die Prüfstadt oder ihre gesetzte Fassung gelesen oder gemessen wurde
(die Agenten hatten Stapel und Einordnung fertig, beides ungeöffnet):
- **Alt** = Kern `079dd6d` (0.4.4).
- **Neu** = `ca63f1cdbfa62e405c69e3a9181784e170f8728a`: gelerntes Art-Modell (`lib/artmodell.ts`), gelernte Absender-Wahl (`lib/absenderwahl.ts`, nur wenn die Regel unsicher ist),
  Wortmodell (Bereich) mit allen verbrauchten Stapeln neu gelernt. Lerndaten-Hash (Art-, Absender-, Wortmodell-Daten) `5546e66112abe4b4`.
- **Gegenprobe** (bisheriges Vorgehen, Punkt 10) = `7b07329`: Kern `079dd6d`, nur das Wortmodell mit denselben Stapeln neu gelernt
  (Wortmodell-Daten byte-gleich mit Neu).
- Abstimmung reihum (7 verbrauchte Stapel, kein Nachweis): alt 85,65 · Gegenprobe 86,04 · neu 87,48 % richtige Feld-Urteile.
- Abweichung von Punkt 4/5: Die Lernstadt ist nur Teststapel, nicht im Modell – ihr Soll stammt von einem einzigen Schreiber, sie brachte
  reihum nichts und senkte den Testordner (Art 93 → 87 %).

## Runde 2 (vorab festgelegt am 15.11.2026 gegen 01:55 Uhr, bevor Welt 3 existiert)

R2-1. **Lernen** an allen verbrauchten Stapeln einschließlich der **Prüfstadt** (jetzt verbraucht, Soll aus drei Einordnern), reihum
      gewählt wie Punkt 5. Die Lernstadt bleibt Teststapel.
R2-2. **Welt 3** (`pruefstapel-stadt-3/`): neue Agenten (eigener Planer, vier eigene Absender-Gruppen), eine **Großstadt mit Stadtteilen**
      (Mietshäuser, Familien mit Wurzeln im Ausland, Schichtarbeit, Kleingewerbe), keiner sieht Repo, Kern, frühere Welten. Drei Einordner
      (zwei Sonnet, ein Opus) wie Punkt 2. Dazu ein **eigener Setzer (Simulator 4)** eines anderen Agenten, wieder mit Barcodes, QR-Codes,
      Logos, Stempeln, Scan und Foto.
R2-3. **Einmal messen**, Text und gesetzt. **Hauptzahl diesmal beide zusammen** (Text und gesetzt je Stück zusammengezählt; die App
      bekommt beides), gleicher Test wie Punkt 8 (Bootstrap über Absender, untere Grenze der 90-%-Spanne über 0). Text und gesetzt
      zusätzlich einzeln berichtet.
R2-4. **Alt** = 0.4.4 (`079dd6d`), **Gegenprobe** = bisheriges Vorgehen mit denselben Lerndaten, **Neu** = eingefrorener Kandidat der Runde 2.
      Übertragung in die Familienakte nur, wenn Neu sowohl 0.4.4 als auch die Gegenprobe gesichert schlägt (Hauptzahl) und an keinem
      Feld gesichert schlechter ist – und mit Klaus' Ja.

### Runde 2 eingefroren (15.11.2026 gegen 02:10 Uhr, Welt 3 noch im Bau, nichts davon gelesen)

- **Neu** = `a6e471d3bfb39168bfe6985bb697d850ebb561aa`: Art-Modell mit Briefende-Wörtern (ARTMODELL_SICHER 25), Absender-Wahl, **Frist-Wahl** (`lib/fristwahl.ts`, nur wenn die
  Regel unsicher ist), alle gelernt auch an der Prüfstadt (Text und so, wie die App die gesetzten Stücke liest); Wortmodell mit allen
  verbrauchten Stapeln einschließlich Prüfstadt. Lerndaten-Hash `cf02fc4004d11102`.
- **Gegenprobe** = `1d21e2c`: Kern 0.4.4, Wortmodell byte-gleich mit Neu. **Alt** = `079dd6d`.
- Abstimmung reihum (9 Teststapel inkl. gelesener Prüfstadt): alt 83,25 · Gegenprobe 83,88 · neu 85,45 %.

### Runde 2 gemessen (15.11.2026, einmal)

Hauptzahl (R2-3, Text+gesetzt): neu gegen 0.4.4 +2,72 Punkte (Spanne +1,56 bis +3,70), gegen Gegenprobe +2,66 (Spanne +1,73 bis +3,63) –
beides gesichert, kein Feld schlechter. R2-4 erfüllt bis auf Klaus' Ja. Welt 3 ist damit verbraucht. Zahlen in `pruefstapel-stadt-3/`.

## Runde 3 (vorab festgelegt am 15.11.2026 gegen 02:55 Uhr, bevor Welt 4 existiert; Runde 2 ist auf `main`)

R3-1. **Lernen** zusätzlich an Welt 3 (Text und so, wie die App die gesetzten Stücke liest). Reihum gewählt wie Punkt 5.
R3-2. **Welt 4** (`pruefstapel-stadt-4/`): neue Agenten, eine **Mittelstadt im Westen mit Mehrgenerationenhäusern, Pendlern und viel
      digitaler Post** (Portale, Mails mit Anhängen, App-Benachrichtigungen, E-Rechnungen als Ausdruck), dazu Papierpost. Drei Einordner,
      eigener Setzer (Simulator 5) mit Barcodes und QR-Codes, Scan und Foto. Keiner sieht Repo, Kern, frühere Welten.
R3-3. **Alt** = Kern auf `main` nach Runde 2 (`4cba044`), dazu wie bisher 0.4.4 (`079dd6d`) und die **Gegenprobe** (bisheriges Vorgehen mit
      denselben Lerndaten). Hauptzahl wie R2-3 (Text+gesetzt, Bootstrap über Absender). Neu gilt als besser als Runde 2, wenn die untere
      Grenze der 90-%-Spanne gegen `4cba044` über 0 liegt; Verschlechterungen je Feld werden genannt.
R3-4. Ziel nebenbei: Art-Modell kleiner (App-Paket), ohne dass die Abstimmung reihum mehr als 0,3 Punkte verliert.

### Runde 3 eingefroren (15.11.2026 gegen 07:45 Uhr, Welt 4 noch im Bau, nichts davon gelesen)

- **Neu** = `9c87de186b01555a553e783815d4dfe9c1291277`: wie `main` (Runde 2), nur Absender- und Frist-Wahl zusätzlich mit Welt 3 gelernt. Art-Modell unverändert: mit Welt 3
  gelernt fiel der Testordner unter die Grenze (89 statt ≥ 90 %). Kombination Art-Modell + Wortmodell verworfen (reihum nur +0,05).
- **Zusätzliche Frage an Welt 4 (Nachtrag vor der Messung):** Hält der Gewinn von Runde 2 an einer zweiten unabhängigen Welt?
  Gemessen `4cba044` gegen 0.4.4, gleicher Test wie R2-3. Das ist die Wiederholung, die die Recherche verlangt.

### Runde 3 gemessen (15.11.2026, einmal, Welt 4)

- **Wiederholung:** Kern `main` (Runde 2, `4cba044`) gegen 0.4.4: Text+gesetzt +2,06 Punkte (68,83 → 70,90 %, 90-%-Spanne +1,11 bis +3,03) –
  zum zweiten Mal an einer unabhängigen Welt gesichert; kein Feld schlechter (Text: Art 69,0 → 75,0, Bereich 75,5 → 78,5, Absender 74,2 → 75,8,
  Frist 92,5 → 93,5; gesetzt: Art 55,0 → 58,0, Absender 43,4 → 45,5, Frist 79,5 → 81,5, Bereich 62,5 → 64,0).
- **Runde 3** gegen Runde 2: 0,00 Punkte (Spanne −0,20 bis +0,23) – mehr Lernmaterial aus Welt 3 bringt nichts Messbares. Nicht schlechter.
- Welt 4 ist verbraucht. Zahlen in `pruefstapel-stadt-4/`.
