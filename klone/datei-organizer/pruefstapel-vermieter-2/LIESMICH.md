# Prüfstapel „vermieter-2“ (erfunden)

Alles ist erfunden: Personen, Firmen, Orte, Anschriften, IBAN (DE00 …), Steuer- und Vertragsnummern.

## Haushalt
- **Martina und Stefan Brenner**, Ahornstraße 12, 79997 Neudorf; beide angestellt (Gehälter laufen über ein anderes Konto).
- Eigene Wohnung in Neudorf selbst genutzt (nicht Teil der Vermietung).
- Vermietet privat: Zweifamilienhaus **Lindenweg 7, 79998 Erlenbach** (EG 82 m², OG 78 m²) und zwei Garagen.
  Keine Umsatzsteuer (Vermietung steuerfrei).
- Konto: Kreisbank Talgau eG, Girokonto Privat Plus, IBAN DE00 6005 0000 0123 4567 89 (Auszüge mit Soll/Haben-Spalten,
  Datum TT.MM., mehrzeilige Verwendungszwecke, Seitenumbruch mit „Übertrag“ in 8 Monaten).

## Mieter und Mieten 2026
| Einheit | Mieter | Zahlung |
| --- | --- | --- |
| EG | Jonas Kessler | 1.040,00 €/Monat (KM 780 + NK 260) |
| OG | Petra Lang bis 30.04.; leer im Mai; Anna und Tim Vogel ab 01.06. | 935,00 € bzw. 1.000,00 €/Monat |
| Garage 1 | Erwin Bauer | 60,00 €/Monat bar, Quittung je Quartal (180,00 €) |
| Garage 2 | Ngozi Okafor | 55,00 €/Monat per Überweisung, Jahresrechnung RE-2026-G2 (660,00 €, steuerfrei § 4 Nr. 12 UStG) |

## Jahreslauf
- **Jan.:** Grundbesitzabgabenbescheid 612,40 € (4 Raten à 153,10 € Feb/Mai/Aug/Nov), Gebäudeversicherung 1.148,52 €
  (Abbuchung 02.02.), Darlehens-Jahresübersicht (Rate 1.150,00 €, Zinsen 2026 4.786,20 €), Hausverwaltung OG Q1 107,10 €,
  Eigentümerverein 96,00 €, Strom-Jahresrechnung 2025 (Nachzahlung 38,44 €).
- **Feb.:** Heizungswartung 214,20 €, Wasser-Jahresabrechnung 2025 (Nachzahlung 146,32 €, 7 % USt), Haftpflicht 89,25 €.
- **März:** Schornsteinfeger 98,77 €; Nebenkostenabrechnung 2025 an beide Mieter: EG Nachzahlung 189,05 €, OG Guthaben 97,39 €
  (Versand per Einschreiben 5,30 € bar, Bürobedarf 23,97 €).
- **April:** Kündigung OG zum 30.04.; Wohnungsanzeige 59,50 € und Online-Inserat 34,90 €; Steuerbüro Anlage V 2025 642,60 €;
  Rasenmäher 499,00 € (GWG).
- **Mai (Leerstand OG):** Schließzylinder 154,70 €, Anwältin Mietvertrag 297,50 €, Baumarkt 87,43 €, Tankbeleg 52,17 €,
  Rechnung Maler 3.213,00 € und Bodenleger 2.165,80 € (bezahlt im Juni); Kaution Lang: Auflösung Kautionskonto 2.087,15 €
  und Rückzahlung an Lang.
- **Juni:** Einzug Vogel, Kaution 2.250,00 € ein und sofort auf ein Kautionskonto; Sondervergütung Hausverwaltung 238,00 €;
  Umbuchung 5.000 € vom Tagesgeld.
- **Juli/Aug.:** Energieberater 714,00 €, Sanitär EG 178,50 €, Rauchmelderwartung 71,40 €, Garagentor 345,10 €;
  Heizungstausch: Abschlag AR-26-0881 9.000,00 € (Umbuchung 10.000 € vom Tagesgeld).
- **Sep./Okt.:** Wärmepumpe läuft ab 26.09.; Gas-Schlussrechnung mit Guthaben 122,10 €, Wärmestrom-Abschlag 95,00 €/Monat;
  Schlussrechnung RE-2026-0934: 27.370,00 € brutto, abzüglich Abschlag noch 18.370,00 € (Umbuchung 19.000 €).
- **Nov.:** Zuschuss Förderbank 6.900,00 € (30 % von 23.000 €), Rückbuchung 3.000 € aufs Tagesgeld, Gartenpflege 249,90 €,
  Dachrinnen 202,30 €.
- **Dez.:** Bareinzahlung Garagenmiete 360,00 € (Quittungen Q3/Q4); private Kaffeemaschine 249,00 €.
- **Privat über dasselbe Konto:** Mobilfunk, Streaming, Bausparrate, Supermärkte, Drogerie, Geldautomat; Belege: Supermarkt,
  Kleidung, Optiker, Kaffeemaschine (Konto 1800).

## Kontierung (nur Konten aus KONTEN.json)
Die Liste hat kein eigenes Konto für Mieterlöse; als nächstes passendes steuerfreies Erlöskonto gilt **8120** (Mieten,
Garagen, Nebenkostenabrechnungen; das Guthaben an die OG-Mieterin als Ausgabe auf 8120). Weitere Zuordnung: Instandhaltung,
Heizungstausch, Wartung und Förderzuschuss (als Einnahme, mindert den Aufwand) 4260; Gas/Strom/Wasser 4240 (Gas-Guthaben als
Einnahme); Schornsteinfeger und Gartenpflege 4250; Grundbesitzabgaben und Vereinsbeitrag 4380; Versicherungen 4360;
Hausverwaltung 4980; Steuerbüro 4955; Anwältin und Energieberater 4950; Darlehenszinsen 4970; Anzeigen 4600; Porto 4910;
Bürobedarf 4930; Fachbuch 4940; Rasenmäher 0480; Tankbeleg 4530; Privates 1800.
Kautionen und Umbuchungen zwischen eigenen Konten haben keinen Beleg.

## Zahlen
- **Belege:** 50 (`belege/ERWARTUNG.json`), 19 davon mit nichtssagendem Dateinamen.
  Konten: 4260 ×12, 8120 ×7, 4980 ×5, 4240 ×4, 1800 ×4, 4250 ×3, 4380/4360/4950/4600 je ×2,
  4955/4970/4910/4930/4940/0480/4530 je ×1. Richtung: 42 Ausgaben, 8 Einnahmen.
- **Kontoauszüge:** 12, 232 Umsätze (16–22 je Monat), 106 davon mit Beleg (`stuecke`).
- **Salden:** Anfang 01.01.2026 6.842,17 €, Ende 31.12.2026 6.610,77 €; alle zwölf Monate rechnerisch geprüft (`python3 pruefe.py`).
- Rechnungsnummern stehen im Verwendungszweck oft anders geschrieben (z. B. „RG26112“ für 26-112, „Re 2026 0112“ für
  RE-2026-0112, „RGNR 2026HV0412“ für 2026-HV-0412); `rechnungsnummern` in `UMSAETZE.json` nennt die saubere Schreibweise.
  Kunden-, Vertrags-, Mandats- und Kassenzeichen stehen daneben und sind keine Rechnungsnummern.
