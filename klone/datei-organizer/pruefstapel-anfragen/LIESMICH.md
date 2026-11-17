# Prüfstapel „Anfragen“ – Beschriftung & Gravur Hellwig (erfunden)

60 erfundene Kundenanfragen an einen erfundenen kleinen Werbetechnik- und Gravurbetrieb.
Alle Personen, Firmen, Vereine, Adressen und Nummern sind erfunden: E-Mail-Adressen auf `.example`,
Telefonnummern beginnen mit `0000`, Postleitzahlen mit `00`.

## Dateien

- `anfrage-01.eml` … `anfrage-25.eml` – E-Mails mit Kopfzeilen (From, To, Subject, Date, Content-Type
  `text/plain; charset=utf-8`, 8bit), teils mit Signatur und zitiertem Verlauf.
- `anfrage-26.txt` … `anfrage-35.txt` – aus einem Mailprogramm kopierte Mails (Von/An/Gesendet/Betreff).
- `anfrage-36.txt` … `anfrage-45.txt` – Ausgaben eines Kontaktformulars mit Feldern.
- `anfrage-46.txt` … `anfrage-60.txt` – Gesprächsnotizen nach Telefonat.
- `ERWARTUNG.json` – Soll je Datei.

## Soll-Regeln (`ERWARTUNG.json`)

- `absender`: anfragender Verein/Firma/Schule; bei Privatleuten die Person.
- `email`: Absenderadresse; bei Formularen das Feld E-Mail; bei Notizen nur, wenn eine Adresse notiert ist, sonst `null`.
- `kundennr`: Schreibweise wie genannt (z. B. „Kd.-Nr. 10234“, „K-2207“, im Formularfeld nur der Feldwert);
  „–“, leer oder „keine Kundennummer zur Hand“ → `null`.
- `produkte[].art`: wörtlich aus `produktarten` (SORTIMENT.json); Etiketten, Fensterfolie, Briefkastenaufkleber →
  „Aufkleber/Folie“; Klingelschilder → „Schild“; Taschenuhr, Pokale, Magnetschilder, Erinnerungskiste, Messer → „anderes“.
- `menge`: Zahl; Wörter umgerechnet („zwei Dutzend“ 24, „hundert“ 100, „zwanzig“ 20, „zweihundert“ 200);
  bei Staffel („50 oder 100“) die erste Zahl; bei „ca. 30 Gäste“ die Zahl; „ein Banner/ein Schild“ 1;
  keine Menge genannt (reine Rückfrage) → `null`.
- `masse`: das erste genannte Maß in mm (Breite × Höhe in der genannten Reihenfolge), sonst `null`.
  „rund, 8 x 8 cm“ → 80 × 80.
- `farben`: „einfarbig“ 1, „zweifarbig“/„2-farbig“ 2, „dreifarbig“/„3-farbig“ 3, „4c“/„vierfarbig“/„4-farbig“ 4; sonst `null`
  (Farbangaben wie „bunt (4c)“ zählen als 4).

## Störungen im Text

Datumsangaben (Fest-, Liefertermine), Jahreszahlen (Gründung 1902, Abi 2027), Jubiläumszahlen (50, 70, 125 Jahre),
Telefon-, Fax- und Postleitzahlen, Preise (1,20 €, 3,90 €, 150 €, 600 €), Raum- und Kostenstellennummern,
Baujahre und Kalenderwochen. Sie sind keine Mengen.
