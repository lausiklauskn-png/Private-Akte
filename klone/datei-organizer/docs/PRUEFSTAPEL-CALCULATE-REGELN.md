# Prüfstapel „Anfragen“ (Punkt 8: Workflow Calculate und Workflow Needs) – Regeln, vorab festgelegt (13.11.2026)

Eingecheckt, bevor es den Stapel gibt. Es gelten `docs/PRUEFREGELN-GRUPPE.md`. Auftrag Klaus 13.11. (Brief Punkte 3–9, Punkt 8, Freibrief).

## Bestandsaufnahme (was die Apps selbst erkennen)

- **Workflow Calculate** liest Anfragen selbst (`assets/kern/anfrage.js`, `lesen(roh, katalog, kunden)`, ohne KI): Absender (Name, E-Mail),
  Kundennummer, Mengen, Maße (B × H), Farbenzahl, passende Produkte aus dem Katalog, dazu den Kunden aus der Kundenliste.
  Preise kommen nur aus dem Katalog bzw. der freiwilligen Recherche, nie aus der Anfrage – sie werden nicht gemessen.
- **Workflow Needs** erkennt aus Dokumenten nichts selbst (E-Mails und PDF nur zur Ansicht/als Anhang). Gemessen wird dort nichts;
  das steht so im Bericht („liest die App nicht“), nicht als 0 %.

## Frage

Wie gut liest Workflow Calculate (Stand main `c6b8dd9`, eingefroren beim Messen) fremde Anfragen? Erster Blindtest, Standmessung.

## Stapel `pruefstapel-anfragen/`

- Ein Agent ohne Zugang zu Apps und früheren Stapeln schreibt **60 Anfragen** (E-Mails als .eml und als Text, Kontaktformular, Notiz
  nach Telefonat) an einen erfundenen Werbetechnik- und Gravurbetrieb; er kennt nur die Liste der Produktarten (`SORTIMENT.json`).
  Mischung: Vereine, Firmen, Privatleute (Hochzeit, Geburtstag), Stammkunden mit Kundennummer, mehrere Produkte in einer Anfrage,
  Mengen als Zahl und als Wort („zwei Dutzend“), Staffelfragen („50 oder 100“), Maße in mm/cm/m, Farbenzahl, Rückfragen ohne Menge.
- Soll je Anfrage (`ERWARTUNG.json`): absender (Name), email, kundennr, produkte [{art, menge}], masse {breiteMm, hoeheMm}, farben.

## Einordner und Messung

Stapel-Autor, zweiter Claude-Agent (Codex optional über den Briefkasten). Soll = Übereinstimmung; ohne sie strittig, nicht gewertet.
Je Feld: richtig, falsch, leer (Wilson-Spanne). Produkt: Produktart der erkannten Katalogvorlage gegen die Soll-Art; Menge je Produkt.
Einmal gemessen, danach verbraucht.

## Grenzen

Erfunden, von einem KI-Agenten geschrieben; kein Gerät. Erster Stand, kein Alt-gegen-Neu-Vergleich.

## Ergebnis (13.11.2026, einmal gemessen, zwei Einordner: Stapel-Autor und Claude-Agent)

Workflow Calculate `c6b8dd9`, `WC.anfrage.lesen` mit Startkatalog + Laser-Gebiet, ohne Kundenliste (`scripts/messen-anfragen.mjs`,
Zahlen `ergebnisse/anfragen-calculate.json`). Codex nicht beteiligt – Ergebnis gilt als „zwei Einordner“.

| Feld | richtig | Anmerkung |
| --- | --- | --- |
| Kundennummer | 44/44 = 100 % (92–100) | 16 strittig (Schreibweise „K-2207“ gegen „2207“) |
| Maße (B × H) | 55/60 = 92 % (82–96) | |
| Farbenzahl | 55/60 = 92 % (82–96) | |
| Produktart erkannt | 87/98 = 89 % (81–94) | 26 Vorlagen fälschlich dazu erkannt |
| E-Mail des Absenders | 45/60 = 75 % (63–84) | Gesprächsnotizen ohne Kopf |
| Menge je Produkt | 43/97 = 44 % (35–54) | Zahlwörter, „ca.“, Staffeln |
| Absender (Name) | 13/57 = 23 % (14–35) | Calculate liest den Namen nur aus der Kopfzeile „Von“ |

Schwächen: Menge und Absendername; fälschlich erkannte Vorlagen (eine Anfrage nennt „Tasse“, erkannt werden Tasse und mehrere
Gravurartikel). Workflow Needs: liest aus Dokumenten nichts – nicht gemessen. Der Stapel ist verbraucht; Verbesserungen an Calculate
(Absender aus Signatur und Grußzeile – der Sortier-Kern kann das –, Zahlwörter) brauchen einen neuen Stapel.
