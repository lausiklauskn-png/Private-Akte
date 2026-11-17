# Prüfstapel „Vermieterin“ (erfunden, Jahr 2025)

Ein Haushalt: Hannelore Wiebusch, Rentnerin (Altersrente und Witwenrente), wohnt im Erdgeschoss ihres Hauses Lindenhofweg 14 in
„Sellenbrück“ und vermietet drei Wohnungen privat (keine Umsatzsteuer). Alles ist erfunden: Personen, Firmen, Orte, Kassen, Banken,
Nummern (IBAN beginnen mit DE00, Kennzeichen XSB-HW 000).

Jahreslauf, auf den alles abgestimmt ist: Sturmschaden am Dach (Januar) mit Versicherungserstattung · Mietrückstand im 1. OG rechts
(März, Mahnung, Ratenzahlung bar und per Überweisung) · Mieterhöhung 1. OG links zum 1. Juli · Nebenkostenabrechnungen 2024 an drei
Mieter (zwei Nachzahlungen, ein Guthaben) · Kündigung Dachgeschoss zum 30. Juni, Badsanierung im Leerstand, Neuvermietung zum
1. August mit Kautionskonto · Pflegegrad 1, Augenoperation · Hausmeister hört auf, neuer Dienst ab Oktober · Zinsbindung des
Darlehens läuft aus, Prolongation · Einkommensteuerbescheid 2024.

## Inhalt und Zahlen

| Teil | Anzahl |
| --- | --- |
| Schriftstücke im Hauptordner (`ERWARTUNG.json`) | 93 |
| Belege in `belege/` (`belege/ERWARTUNG.json`) | 45 |
| Kontoauszüge in `bank/` (`bank/UMSAETZE.json`) | 12 |
| Umsätze | 223 (je Monat 16 bis 20) |
| Umsätze mit mindestens einem Stück | 140 (83 ohne) |
| verschiedene verknüpfte Stücke | 82 |

Schriftstücke je Art: Bescheid 11 · Brief 10 · Rechnung 10 · Termin 9 · Aufforderung 8 · Abrechnung 7 · Bescheinigung 7 ·
Angebot/Werbung 6 · Vertrag 6 · Mahnung 5 · Kündigung 4 · Kassenbon 4 · Befund 3 · Kontoauszug 3.

Schriftstücke je Bereich: Haus & Wohnung 30 · Gesundheit & Pflege 13 · Finanzen & Konten 10 · Versicherungen 6 ·
Verträge & Abonnements 5 · Rente, Arbeit & Sozialversicherung 4 · Energie & Versorgung 4 · Auto & Mobilität 4 ·
Garten & Grundstück 4 · Steuern & Behörden 4 · Reisen & Freizeit 3 · Einkäufe, Rechnungen & Garantien 2 · Korrespondenz 1 ·
Technik, Geräte & Reparaturen 1 · Erbschaft, Vollmachten & Vorsorge 1 · Familie & persönliche Dokumente 1.
Motorrad und Archiv kommen nicht vor.

Mit Zweitfach: 32 · mit Frist: 39 (54 ohne) · mit Person: 47.

Belege je Konto: 4260 14 · 4250 4 · 4980 4 · 8400 4 · 4240 3 · 4910 2 · 4380 2 · 4600 2 · 1800 2 · je 1: 4360, 4930, 4940, 4945,
4670, 4970, 4630, 4920. Davon 13 mit `kontoZweifel`. Richtung: 40 Ausgaben, 5 Einnahmen. Zehn Belege ohne Bankumsatz (bar bezahlt oder bar eingenommen).

Umsätze je Art: Lastschrift 79 · Gutschrift 69 · Überweisung 39 · Karte 11 · Bar 11 · Dauerauftrag 10 · Entgelt 4.

## Wie die Dateien entstanden sind

Alle Texte sind von Hand geschrieben. Zwei Hilfen, damit Soll und Text nicht auseinanderlaufen:

- Die Schriftstücke und Belege standen beim Schreiben hintereinander in Sammeldateien, jeweils mit einer Kopfzeile für das Soll.
  Ein kleines Skript hat sie in Einzeldateien zerlegt und aus den Kopfzeilen die beiden `ERWARTUNG.json` geschrieben.
- Die Kontoauszüge sind aus einer von Hand geschriebenen Umsatzliste gesetzt (Datum, Betrag, Gegenpartei, Verwendungszweck,
  Rechnungsnummern, Stücke). Das Skript hat nur das Druckbild und die Salden erzeugt; `UMSAETZE.json` stammt aus derselben Liste.
  Das weicht von „kein Generator“ ab; ich habe es wegen der Salden so gemacht. Die Auszüge sehen dadurch alle gleich aus.

Selbstprüfung (eigenes Skript, unabhängig vom Bau): jede Datei genau einmal im Soll, Listenwerte wörtlich aus den Vorgaben, jede
Datei unter `stuecke` vorhanden, Salden und Anschlüsse der zwölf Auszüge stimmen, Betrag und Rechnungsnummer jedes Belegs stehen
im Text, JSON gültig. Ergebnis: 0 Fehler.

## Festlegungen im Soll

- `person`: „Hannelore Wiebusch“, wenn es um sie selbst geht (Rente, Kasse, Arzt, Steuer, eigene Verträge, Auto). Bei Haus, Mietern,
  Garten, Versorgern steht `null`, auch wenn der Brief an sie gerichtet ist.
- `frist`: nur, was die Vermieterin selbst tun oder zahlen muss, oder ein Termin. Fristen, die sie anderen setzt (Mahnung an den
  Mieter, Mieterhöhung, Nebenkostenabrechnung), stehen als `null`. Ebenso Lastschriften, Widerspruchs- und Kündigungsfristen,
  Angebotsbindungen, Laufzeiten.
- `absender`: wie im Briefkopf geschrieben (Großschreibung wie dort); bei ihren eigenen Schreiben „Hannelore Wiebusch“.
- `rechnungsnummern` in den Umsätzen: in der sauberen Schreibweise der Rechnung, auch wenn der Zweck sie verstümmelt zeigt
  („RE 2025 0113“, „RG 0688“). Kundennummern, Kassenzeichen und Vertragsnummern zählen nicht.
- `stuecke`: bei wiederkehrenden Zahlungen das Stück, das den Betrag festlegt (Abschlagsplan, Bescheid, Vertrag, Jahresauszug).
- Belege: `ust` ist der ausgewiesene Satz; 0 bei ausdrücklich steuerfrei (Miete, Post, Seminar), `null` bei Gebühren, Versicherung,
  Bank, Vereinsbeitrag. `umlagefaehig` ist `null` bei Einnahmen und Privatem.

## Stellen, an denen ich gezweifelt habe

Ablage (Fach und Zweitfach)
1. Wohngebäudeversicherung (Schadenpost, Abrechnung): „Versicherungen“ mit Zweitfach „Haus & Wohnung“. Nach dem Grundsatz „die Sache
   entscheidet“ wäre auch das Umgekehrte vertretbar; die Fachregel nennt die Ausnahme nur für Fahrzeuge.
2. Müllgebühren (Bescheid und Mahnung): „Haus & Wohnung“, Zweitfach „Energie & Versorgung“. Möglich wäre auch „Steuern & Behörden“
   als Zweitfach (wie bei der Grundsteuer).
3. Darlehen fürs Haus und Mietkautionskonten: „Finanzen & Konten“, Zweitfach „Haus & Wohnung“. Bei der Kaution könnte man es umdrehen.
4. Telefon/Internet: „Verträge & Abonnements“, Zweitfach „Technik, Geräte & Reparaturen“ – ein gutes „Fach der Sache“ gibt es nicht.
5. Zeitungsabo (Kündigung und Bestätigung): „Verträge & Abonnements“ ohne Zweitfach, weil kein Sachfach passt.
6. Hauswart- und Winterdienstvertrag: „Haus & Wohnung“, Zweitfach „Verträge & Abonnements“ (kein Abo im Sinn von Punkt 6, aber
   Laufzeit und Kündigungsfrist).
7. Lohnsteuerhilfe-Beitragsrechnung: als Mitgliedschaft nach Punkt 6 („Verträge & Abonnements“, Zweitfach „Steuern & Behörden“).
   Die übrige Post der Lohnsteuerhilfe liegt unter „Steuern & Behörden“.
8. Friedhofsgebühr für das Grab des Ehemanns: „Familie & persönliche Dokumente“, Zweitfach „Steuern & Behörden“. Auch „Erbschaft,
   Vollmachten & Vorsorge“ wäre denkbar.
9. Brief des Enkels: „Korrespondenz“, Zweitfach „Familie & persönliche Dokumente“.
10. Einladung und Adventsfahrt des Landfrauenvereins: „Reisen & Freizeit“ (nicht als Mitgliedschaft gewertet).
11. Widerspruch an das Inkassobüro: wie die Inkassomahnung „Finanzen & Konten“ mit Zweitfach „Einkäufe, Rechnungen & Garantien“.
12. Ausweis-Termin beim Bürgerbüro: „Steuern & Behörden“, Zweitfach „Familie & persönliche Dokumente“.
13. Pflegekasse (Bescheid, Erstattung): wie Krankenkasse nach Punkt 2 behandelt.

Art des Schriftstücks
14. Mieterhöhungsverlangen: „Aufforderung“. Übergabeprotokoll: „Bescheinigung“. Auftragsbestätigung des Installateurs und Nachtrag
    zum Versicherungsschein: „Vertrag“. Kündigungsbestätigung der Zeitung: „Kündigung“. Reisebestätigung mit Zahlplan: „Rechnung“.
    Prolongationsangebot der Bank: „Angebot/Werbung“. Erstattungsmitteilung der Pflegekasse: „Abrechnung“. Krankenkassen-Info zum
    Zusatzbeitrag: „Brief“. Bezahlte Waschmaschinen-Rechnung mit Garantie: „Rechnung“, der Rasenmäher-Bon: „Kassenbon“.

Fristen
15. Kündigung der Mieter zum 30.06.: `null`; der Übergabetermin steht erst in der Bestätigung der Vermieterin (dort 30.06.).
16. Angebot Baumschnitt: 21.02. (Rückmeldung nötig, sonst kein Termin vor dem Schnittverbot), nicht die Bindefrist 28.02.
17. Prolongationsangebot: 31.08. (ohne Antwort läuft das Darlehen variabel weiter).
18. Laborbefund: der Kontrolltermin 23.04. Krankenkasse Zusatzbeitrag: Sonderkündigung bis 31.01. zählt nicht.
19. Adventsfahrt: Anmeldung bis 21.11. zählt nicht (freiwillig), obwohl sie dann tatsächlich überweist.

Belege und Konten
20. Mieteinnahmen, Stellplatz, Nebenkostennachforderung und -guthaben: 8400 mit Zweifel – der Kontenplan hat kein Konto für
    steuerfreie Mieterlöse. Das Guthaben an den Mieter ist als Ausgabe auf 8400 (Erlösminderung) gesetzt.
21. Gartenpflege, Streusalz, Heizkostenabrechnungsdienst: 4980 mit Zweifel. Schornsteinfeger: 4260 mit Zweifel.
22. Sperrmüllgebühr: 4380 mit Zweifel. Blumen für den Hausmeister: 4630 mit Zweifel.
23. Telefonrechnung: 4920 mit Zweifel, `wohnung` „privat“ (Anschluss in ihrer Wohnung, für die Vermietung mitgenutzt).
24. Tankquittung für das private Auto: 1800 mit Zweifel (4530 wäre es nur bei einem Betriebsfahrzeug).
25. Schlussrechnung Bad: `betrag` ist der Zahlbetrag 5.942,85 (Rechnungssumme 8.942,85 abzüglich Abschlag 3.000,00, der als
    eigener Beleg vorliegt).
26. Schornsteinfeger und Kontoführung sind als Ganzes der Vermietung zugeordnet, obwohl ein Teil die eigene Wohnung betrifft.
27. Abschlagspläne Gas und Strom: `betrag` ist der Monatsabschlag; sie sind keine Rechnungen.

Bank
28. Eingehende Mieten sind als `gutschrift` geführt (aus Sicht des Kontos), `dauerauftrag` nur ihr eigener an den Hausmeister.
29. Der Auflösungsbetrag des Kautionskontos und der Übertrag der neuen Kaution laufen über das Girokonto; Gegenpartei ist sie selbst.
30. Drei Schriftstücke nennen Dinge, die im Stapel fehlen: die Vorauszahlungsbescheide für März und Juni, Rechnungen der
    Haushaltshilfe, die Registergebühr des Vorsorgeregisters.
