# Runde 3 · Datei-Organizer · Sicht 04: Vertrieb über ein Systemhaus

Rolle: Inhaber eines IT-Systemhauses (6 Leute), 60 betreute Kleinbetriebe (Handwerk, Praxen, Kanzleien, Büros).
Rollenspiel, kein echter Kunde. Marktzahlen aus einer kurzen Websuche (13.11.2026), überwiegend Ratgeber und
Herstellerseiten, nicht nachgeprüft.

## Was die kurze Recherche ergab

- **Tagessätze:** KI-Beratung 1.200–2.000 €/Tag (Senior), Workshops 1.400–5.000 €/Tag, Stundensätze 100–180 €;
  KI-Projekte bei KMU meist 5.000–25.000 €. Ein Systemhaus-Beispiel: 12.000 € Einführung + 35 €/Nutzer/Monat (Werbung).
  Faustregel aus einem Ratgeber: RAG/Automatisierung erst, wenn ein häufiger Ablauf ≥ 10.000 € trägt.
- **Förderung:** go-digital und Digital Jetzt sind ausgelaufen, die BAFA-Beratungsförderung läuft bis Ende 2026 aus.
  Bund: nur noch KfW-Kredit Digitalisierung. Zuschüsse kommen von den Ländern: Digitalbonus Bayern bis 31.12.2027,
  DIGI-Zuschuss Hessen 2026 offen, Digitalbonus Thüringen, Sachsen-Anhalt „Digital Innovation“ (kurze Fenster);
  Niedersachsen ausgelaufen, Baden-Württemberg nur Kredit. Flickenteppich.
- **DMS-Partner:** DocuWare-Cloud-Partner 20–35 % Provision je Stufe, kein Mindestumsatz; die ersten drei Projekte
  mit dem Hersteller-Team; On-Premise-Verkauf 3–12 Monate. DocuWare kaufte einen Platin-Partner (Kanalrisiko).
  ecoDMS: Konditionen nicht gefunden; bekannt als günstig (Lizenz um 100 €/Platz einmalig, eigene Erfahrung, nicht belegt).
- **Was Systemhäuser an DMS schätzen:** wiederkehrende Wartung, Referenzkunden, Hersteller-Support, Zertifikate
  (GoBD-Testat), Leads vom Hersteller. **Was sie hassen:** lange Projekte mit Festpreis, Migrationen ohne Ende,
  Lizenzpolitik, die sich ändert, Hersteller, die direkt an den Kunden gehen, und Kunden, die nach dem Projekt
  allein nicht weiterkommen und jeden Anruf als „Gewährleistung“ sehen.

## 1. Würde ich es anbieten – als was?

Ja, aber **nicht als DMS**, sondern als Projekt **„Ablage aufräumen und KI-bereit machen“** mit drei Teilen:
1. **Bestandsaufnahme** (Festpreis, ½–1 Tag): Werkzeug liest Netzlaufwerk read-only ein, Bericht mit Dubletten,
   Speicher, Altlasten, „Wo liegen Personendaten“. Das ist der Türöffner – der Kunde sieht sein Chaos in Zahlen.
2. **Ordnung als Sicht** (Projekt, 2–4 Tage): Regeln je Kunde/Projekt/Art, Korrekturrunde mit den Mitarbeitern,
   Schulung.
3. **KI anbinden** (Option): lokale Suche/Fragen über die Bündel, wahlweise EU-Dienst.
Dazu **Lizenz + Betreuung monatlich**. Kein Ersatz für DMS/GoBD-Archiv – das sage ich dem Kunden offen.

## 2. Preisbild (Kleinbetrieb, 5–15 Arbeitsplätze, ein Server)

| Posten | Kunde zahlt | Bleibt mir | Geht an den Entwickler |
|---|---|---|---|
| Bestandsaufnahme (Festpreis) | 690–990 € einmalig | fast alles (½–1 Tag Technik) | 0 € (oder 50 € Testlizenz) |
| Einrichtung + Regeln + Schulung | 2.500–5.000 € einmalig (2–4 Tage à 950–1.150 €) | ca. 100 % Dienstleistung | 0 € |
| Lizenz Grundpaket (1 Standort, bis ~500.000 Dateien) | 79–149 €/Monat oder ~1.500 € einmalig + 20 %/Jahr Wartung | 30–40 % Marge | 60–70 % (ca. 50–100 €/Monat) |
| Betreuung (Regeln pflegen, Updates einspielen, Rückfragen) | 49–99 €/Monat im Wartungsvertrag | 100 % | 0 € |
| Option lokale KI (Hardware + Einrichtung) | 1.500–4.000 € Hardware (GPU-PC), 1–2 Tage | Hardware-Marge 10–15 % + Tage | 0 € |
| Option EU-Dienst | Verbrauch nach Aufwand, ~20–60 €/Monat | Aufschlag 15–20 % | 0 € |

**Erstes Jahr je Kunde, Grundfall ohne KI-Hardware:** Kunde ~5.000–7.500 €, davon bleiben mir ~4.000–6.000 €,
der Entwickler bekommt ~600–1.200 €. **Ab Jahr 2:** Kunde ~1.500–3.000 €/Jahr, mir ~900–1.600 €, Entwickler ~600–1.200 €.
Mit Landes-Digitalbonus (wo es ihn gibt) sinkt der Eigenanteil des Kunden um 30–50 % – Lizenz meist nicht förderfähig,
Einrichtung/Investition schon.

## 3. Was ich vom Entwickler brauche

- **Installation:** ein Installer (Windows Server + Windows 10/11, ideal Docker/Linux), unbeaufsichtigt per RMM ausrollbar;
  läuft als Dienst, read-only auf Freigaben, eigener Dienstbenutzer. Kein Konto beim Entwickler nötig.
- **Mandantenfähige Partner-Konsole:** alle 60 Kunden, Lizenzen, Zustand, Fehler, Updates an einem Ort.
- **Support:** 2nd-Level per Ticket mit Antwortzeit (z. B. 1 Werktag), bei Datenverlust-Verdacht schneller;
  Vertretung, wenn der Einzelentwickler krank/im Urlaub ist – das ist mein größtes Bauchweh.
- **Schulung:** Partnerschulung (1 Tag), Kurzvideos für Endnutzer, Demo-Daten für Vorführungen.
- **Haftung/Verträge:** AV-Vertrag-Vorlage (Art. 28 DSGVO) für den EU-Dienst, TOM-Beschreibung, klare Aussage
  „Original wird nie verändert“ (schriftlich), Produkthaftpflicht/Vermögensschaden-Versicherung des Entwicklers,
  **Escrow** für den Quellcode oder Weiterbetrieb, falls er aufhört.
- **Updates:** signiert, planbar (kein Zwangsupdate über Nacht), Änderungsprotokoll auf Deutsch, Rückweg auf die Vorversion.
- **Partnerprogramm:** feste Marge 30–40 %, Gebietsschutz für meine Bestandskunden (kein Direktvertrieb an sie),
  NFR-Lizenz zum Üben, Lead-Weitergabe, Logo „zertifizierter Partner“.

## 4. Wie viele meiner 60 Kunden im ersten Jahr?

Realistisch: **Bestandsaufnahme bei 12–18** (billig, Neugier, „Server-Chaos“ ist echt), **Projekt + Lizenz bei 5–8**.
Kanzleien und Praxen zögern (Berufsgeheimnis, § 203 StGB, KBV-/Kammer-Vorgaben) – dort höchstens 1–2 Pilotkunden.
Handwerk und Büros sind die Käufer, aber preissensibel. Optimistisch mit Förderung in Bayern/Hessen: 10.

## 5. Was es können muss, damit ich nicht selbst Paperless-ngx + AnythingLLM baue

- **Netzlaufwerk an Ort und Stelle lassen** (Ordnung als Sicht) – Paperless will alles importieren und umbenennen.
- **PST/MSG, Office, verschachtelte Anhänge, alte Scans** ohne Bastelei; OCR deutsch gut.
- **Dubletten über Ordner und Postfächer** mit sicherem Zusammenführen und Rückgängig.
- **Rechte aus NTFS übernehmen:** die KI darf nur zeigen, was der Fragende auf der Freigabe sehen darf. Das fehlt
  bei AnythingLLM praktisch – ohne das kein Einsatz in Kanzlei/Praxis.
- **Lernen aus Korrekturen** ohne Regelbastelei, und nachvollziehbar („warum steht das hier?“).
- **Fertige Branchen-Vorlagen** (Handwerk: Kunde/Baustelle/Angebot/Rechnung; Kanzlei: Mandant/Akte).
- **Wartungsarm:** ein Update-Weg, Zustandsbericht an mich, keine Python-/Docker-Pflege beim Kunden.
- **Löschfristen/Aufbewahrung anzeigen** (GoBD-Hinweise, DSGVO-Löschkandidaten) – das verkauft sich besser als „KI“.
Kann es das, spare ich pro Kunde 2–3 Tage Bastelei und habe einen Ansprechpartner. Kann es das nicht, baue ich
das Open-Source-Bündel selbst und verdiene an den Tagen.

## 6. Fördermittel als Hebel?

Nur **regional**. go-digital und Digital Jetzt sind weg, BAFA läuft aus. Bayern (Digitalbonus bis 2027), Hessen,
Thüringen, Sachsen-Anhalt: ja, als Argument für die Einrichtung und die KI-Hardware. Der Antrag kostet uns ½ Tag,
Bewilligung dauert Wochen, kurze Fenster. Ich würde es als **Zugabe** nutzen („wir machen den Antrag mit“), nie das
Geschäft darauf bauen. Der bessere Hebel ist die Bestandsaufnahme zum Festpreis.

## 7. Urteil

**3 von 5.** Der Bedarf ist echt, und „Ordnung als Sicht, Original bleibt“ plus „KI-bereite Bündel lokal“ trifft genau
die Kundenfrage. Was fehlt, ist das, was ein Systemhaus braucht: Rechte aus den Freigaben, Partner-Konsole, Support
mit Vertretung, Haftung/Escrow. Ein Einzelentwickler ist für 60 Kunden ein Klumpenrisiko. Mit diesen Punkten: 4.

Quellen: [Skill Sprinters, Förderung 2026](https://skill-sprinters.de/blog/foerderung/foerderung-digitalisierung-unternehmen-2026/),
[Digitalbonus nach Bundesland](https://skill-sprinters.de/blog/foerderung/digitalbonus-nach-bundesland-2026/),
[Hessenmetall Förderübersicht 05/2026](https://www.hessenmetall.de/files/themen/foerderung/pdf/foerderuebersicht_05_2026.pdf),
[ChannelPartner: DocuWare Cloud-Partnerprogramm](https://www.channelpartner.de/article/3891395/docuware-startet-partnerprogramm-fuer-cloud-reseller.html),
[ChannelPartner: DocuWare kauft Platinum-Partner](https://www.channelpartner.de/article/3907291/docuware-kauft-seinen-platinum-partner.html),
[DocuWare Partnerschaft](https://start.docuware.com/en-gb/partnership-opportunities),
[CIO: IT-Berater-Tagessätze 2026](https://www.cio.de/article/4141771/it-berater-tagessaetze-2026-das-ende-der-preisrallye.html),
[Selbstständig als KI-Berater 2026](https://kostenlose-erechnung.de/ratgeber/selbststaendig-ki-berater/),
[KI-Beratung Österreich 2026](https://wavect.io/de/blog/ki-beratung-oesterreich-2026/),
[ChannelPartner: MSPs und KI-Margen](https://www.channelpartner.de/article/4185483/wie-msps-in-der-ki-ara-neue-margen-schopfen.html).
