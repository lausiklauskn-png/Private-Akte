# Marktanalyse 10 – IT-Dienstleister und externer Datenschutzbeauftragter

Blick: IT-Betreuer und externer DSB für rund 40 kleine Betriebe (Praxen, Handwerk, Vereine). Stand der Recherche 13.11.2026,
kurze Websuche. Die meisten Preisangaben stammen von den Anbietern selbst – als Richtwerte lesen, nicht als Messung.

## 1. Was es gibt, was es kostet, worüber geklagt wird

| Bereich | Werkzeuge | Preis (Anbieterangaben) |
|---|---|---|
| Datenschutz-Software / DSB-Dienst | heyData, Proliance 360, DataGuard, Kertos, caralegal, e-recht24 Datenschutz Pro | heyData ab ca. 59–89 €/Monat; Proliance Software ab 125 €/Monat, DSB-Dienst 125–450 €/Monat plus Audit 500–2.000 €; DataGuard nur auf Anfrage |
| Externer DSB (Mensch) | viele Einzel-DSBs, Kanzleien, Händlerbund | kleine Betriebe meist 100–300 €/Monat, Ausreißer ab 32,50 € |
| KI-Filter / DLP | Nightfall, Prompt Security (jetzt SentinelOne), Lakera (jetzt Check Point), Microsoft Purview, KI-Shield, Presidio (frei) | Preise kaum veröffentlicht, Enterprise-Vertrieb |
| Geräteverwaltung | Intune (in M365 Business Premium), Hexnode, NinjaOne, JumpCloud, ManageEngine | Business Premium ca. 19–22 €/Nutzer/Monat |
| Backup | Veeam, Acronis, Datto, Synology | Rundum-IT-Sicherheit für eine Einzelpraxis 450–600 €/Monat (zm) |

**Was ich bei meinen Kunden höre (und was die Quellen stützen):**
- **Fixkosten zu hoch für Kleinstbetriebe** – Plattformen rechnen sich erst ab ~20 Leuten; ein Verein mit 3 PCs zahlt dasselbe Grundpaket.
- **Papier statt Wirklichkeit** – Verarbeitungsverzeichnis und TOMs sind Formulare. Ob das Backup *wirklich* läuft, die Platte verschlüsselt ist,
  die Updates drauf sind, weiß das Tool nicht. Ich trage es von Hand nach.
- **Backups werden nicht zurückgespielt** – nur ~30 % der befragten Kliniken haben einen regelmäßig getesteten Notfallplan (ESET), ein Viertel
  der Befragten kann keine Angabe zur Erfolgsquote von Wiederherstellungen machen (Deloitte 2026). In Praxen ist es eher schlechter.
- **Schatten-KI wächst** – Bitkom: in 8 % der Firmen weit verbreitet, in weiteren 17 % Einzelfälle, 17 % vermuten es (2024: 4 % / 13 %).
  Die Profi-Filter sind für Konzerne gebaut (Proxy, E5-Lizenz, Vertrieb).
- **NIS2** – seit 6.12.2025 in Kraft, rund 29.850 Einrichtungen direkt betroffen (ab 50 MA oder 10 Mio. €). Kleine Betriebe trifft es indirekt:
  Auftraggeber verlangen Nachweise in der Lieferkette.
- **Für Dienstleister wie mich fehlt die Mandanten-Sicht** – heyData & Co. sind für *ein* Unternehmen gebaut. Ich brauche 40 Akten auf einen Blick.

## 2. Drei Werkzeuge, für die ich zahlen würde

### A) „Nachweis-Cockpit“ – Datenschutz-Akte, die sich aus der echten Technik füllt
- **Wer kauft:** externe DSBs und kleine IT-Systemhäuser (Mehrmandanten), mittelbar deren Kunden.
- **Problem:** Verarbeitungsverzeichnis, TOMs, AV-Verträge, Schulungsnachweise und Vorfälle liegen in Word/Excel je Kunde. Bei einer
  Behördenanfrage, Cyberversicherung oder NIS2-Lieferantenfragebogen suche ich Stunden.
- **Heute:** Word-Vorlagen, Excel, Ordner; oder je Kunde ein heyData-/Proliance-Konto (teuer, keine Gesamtsicht).
- **USP:** (1) **Mandantenfähig für den Dienstleister** – eine Ampel über alle 40 Betriebe, Vorlagen je Branche (Praxis, Handwerk, Verein)
  einmal pflegen, auf alle verteilen. (2) **Technik-Belege automatisch:** ein kleiner Agent bzw. Anbindung an Intune/NinjaOne/Synology liefert
  „Festplatte verschlüsselt, letztes Backup, Patchstand“ als datierten Nachweis direkt in die TOM. heyData, Proliance, DataGuard, caralegal
  verwalten Formulare, sie messen nichts; RMM-Tools (NinjaOne, Datto) messen, erzeugen aber keine DSGVO-Akte.
  (3) Ein Klick: „Prüfmappe als PDF“ für Behörde, Versicherer oder Auftraggeber.
- **Preis:** Dienstleister-Lizenz 79 €/Monat + 9–15 € je Mandant/Monat (bei 40 Mandanten ~500 €/Monat). Ich verrechne das im DSB-Honorar.
- **Markt:** rund 3,5 Mio. Unternehmen in DE ([Destatis über fmcgroup](https://fmcgroup.com/de/how-many-companies-in-germany/)); die Zahl externer
  DSBs/Systemhäuser ist nicht belegt (eigene Schätzung: einige tausend). Zahlungsbereitschaft je Mandant: DSB-Honorare liegen bei 100–300 €/Monat.
- **Nicht tun:** keine Rechtsberatung, keine „DSGVO-konform“-Siegel, keine Inhaltsdaten (Patientendaten, Kundendaten) einsammeln – nur Metadaten.
- **Geräte/Daten:** Browser am PC (Dienstleister), Agent unter Windows; Daten in EU-Rechenzentrum oder selbst gehostet beim Dienstleister;
  Mandanten strikt getrennt, Ende-zu-Ende-Verschlüsselung der Akten, AV-Vertrag nötig.
- **Risiko:** Konkurrenten bauen die Mehrmandanten-Sicht nach (Proliance hat Partnerprogramme); Schnittstellen zu RMM-Tools sind Pflegearbeit;
  Haftungsfrage, wenn ein automatischer Nachweis falsch grün zeigt.

### B) „Rückspiel-Probe“ – Backup-Wiederherstellung automatisch testen und belegen
- **Wer kauft:** Praxen, Kanzleien, Handwerk mit Server/NAS; IT-Dienstleister als Zusatzleistung.
- **Problem:** Backup „läuft“ (grüner Haken), aber niemand weiß, ob es sich zurückspielen lässt. Art. 32 DSGVO verlangt regelmäßige Überprüfung,
  Cyberversicherer fragen danach.
- **Heute:** einmal im Jahr von Hand eine Datei zurückholen, wenn überhaupt; Veeam SureBackup / Datto Screenshot-Verification nur in teuren Produkten.
- **USP:** arbeitet **über vorhandene Backups** (Synology Hyper Backup, Veeam Agent, Acronis, Windows-Sicherung), spielt monatlich eine Stichprobe
  in eine abgeschottete Umgebung zurück (Dateien öffnen, Praxis-Datenbank startet, Hash-Vergleich) und schreibt **eine Seite Nachweis** für
  DSB und Versicherer. Kein neues Backup-Produkt, kein Anbieterwechsel.
- **Preis:** 19–39 €/Standort/Monat, für Dienstleister Staffel.
- **Markt:** ca. 100.000 Arzt- und Zahnarztpraxen plus Kanzleien/Handwerk mit Server (Größenordnung, nicht genau belegt); IT-Sicherheit einer
  Einzelpraxis kostet heute schon 450–600 €/Monat ([zm](https://www.zm-online.de/news/detail/oft-geht-es-nur-noch-um-schadensbegrenzung)).
- **Nicht tun:** selbst sichern, Daten in die eigene Cloud ziehen, Praxissoftware verändern.
- **Geräte/Daten:** kleiner Dienst auf NAS/Server oder Windows-PC vor Ort; Prüfdaten bleiben lokal, hinaus geht nur das Ergebnis (ok/nicht ok, Zeit, Umfang).
- **Risiko:** viele Backup-Formate (Aufwand), Prüfumgebung braucht Rechenleistung; große Hersteller nehmen die Funktion in Basispakete auf.

### C) „KI-Schleuse“ – ChatGPT & Co. erlauben, ohne Kundendaten hinauszugeben
- **Wer kauft:** Betriebe mit 5–50 Leuten, besonders Praxen, Steuerbüros, Pflegedienste, Vereine mit Mitgliederdaten.
- **Problem:** Mitarbeiter kopieren Briefe, Befunde, Mitgliederlisten in private KI-Konten. Verbieten wirkt nicht (Bitkom-Zahlen steigen).
- **Heute:** Richtlinie auf Papier, ggf. Copilot-Lizenz; Profi-DLP (Nightfall, Prompt Security/SentinelOne, Microsoft Purview mit E5) ist
  für Konzerne bepreist und braucht Proxy oder Cloud-Umleitung.
- **USP:** Browser-Erweiterung + Desktop-Helfer, **Erkennung auf dem Gerät** mit deutschen Mustern (Versichertennummer, IBAN, Steuer-ID,
  Patientennamen aus der eigenen Kundenliste), ersetzt vor dem Absenden durch Platzhalter und setzt die Antwort lokal zurück.
  Protokoll nur „was für Art Daten wurde verdeckt“, nie der Inhalt – damit kein Überwachungswerkzeug (Betriebsrat!). Anders als KI-Shield
  (Server-Proxy) und Nightfall (Cloud-DLP) verlässt kein Klartext das Gerät, auch nicht zum Filter-Anbieter.
- **Preis:** 4–6 €/Nutzer/Monat, Mindestpaket 29 €/Monat; für Dienstleister Weiterverkauf.
- **Markt:** potenziell jedes Büro; Bitkom: rund 40 % der Firmen mit (vermuteter) Schatten-KI ([basicthinking](https://www.basicthinking.de/blog/2025/07/14/schatten-ki-unternehmen/)).
- **Nicht tun:** keine eigene KI anbieten, keine Inhalte speichern, keine Mitarbeiter-Rangliste, kein Sperren ganzer Seiten ohne Wahl.
- **Geräte/Daten:** Windows/Mac-Browser (Chrome, Edge, Firefox); Handy nur teilweise (kein Eingriff in fremde Apps möglich – offen benennen).
  Alle Erkennungsdaten lokal, Verwaltung zentral nur mit Regeln.
- **Risiko:** Umgehung per Privathandy; Fehlalarme nerven; Microsoft/Google bauen ähnliche Funktionen kostenlos ein; KI-Seiten ändern ständig ihr Eingabefeld.

## 3. Ehrliche Bewertung (1 = schwach, 5 = stark)

| Idee | Zahlungsbereitschaft | Abgrenzung | Umsetzbar allein mit KI |
|---|---|---|---|
| A Nachweis-Cockpit | 4 – Dienstleister rechnen Zeitersparnis direkt | 3 – Formular-Teil gibt es oft, Mandanten- und Messteil kaum | 3 – Web-App machbar, Schnittstellen und Sicherheit aufwendig |
| B Rückspiel-Probe | 4 – Versicherer und Art. 32 erzeugen Druck | 4 – in Kleinprodukten fehlt es fast überall | 2 – viele Backup-Formate, Prüfumgebung, Support vor Ort |
| C KI-Schleuse | 3 – Bedarf groß, aber „Verbieten“ ist gratis | 3 – Nische „klein + auf dem Gerät“ ist frei, Großanbieter rücken nach | 4 – Erweiterung + Mustererkennung gut machbar, Pflege der KI-Seiten laufend |

Mein Favorit für einen Einzelentwickler: **A**, gestartet mit wenigen Branchen-Vorlagen und *einer* Schnittstelle (z. B. Synology oder Intune);
**C** als schnell baubares Zusatzmodul.

## Quellen
- [OMR – Datenschutz-Management-Tools](https://omr.com/de/reviews/contenthub/datenschutz-management) · [OMR – heyData vs. Vanta](https://omr.com/de/reviews/contenthub/heydata-vs-vanta)
- [legiscope – DSGVO-Software-Vergleich](https://www.legiscope.com/blog/dsgvo-compliance-software-vergleich.html) · [legiscope – Kosten externer DSB](https://www.legiscope.com/blog/externer-datenschutzbeauftragter-kosten.html)
- [Kertos – DataGuard-Alternativen](https://www.kertos.io/en/compliance-hub/dataguard-alternatives) · [Proliance – externer DSB](https://www.proliance.ai/en/loesungen/externer-datenschutzbeauftragter)
- [Händlerbund – externer DSB](https://www.haendlerbund.de/de/leistungen/rechtssicherheit/agb-service/datenschutzgrundverordnung/datenschutzbeauftragter)
- [basicthinking – Bitkom Schatten-KI](https://www.basicthinking.de/blog/2025/07/14/schatten-ki-unternehmen/) · [trendingtopics – Schatten-KI](https://www.trendingtopics.eu/schatten-ki-am-vormarsch-4-von-10-firmen-vermuten-einschleppung-privater-ai-tools/)
- [datenschutz-notizen – NIS2-Umsetzungsgesetz in Kraft](https://www.datenschutz-notizen.de/das-nis-2-umsetzungsgesetz-ist-in-kraft-getreten-welche-schritte-sind-nun-erforderlich-4457509/) · [openkritis – NIS2](https://www.openkritis.de/it-sicherheitsgesetz/nis2-umsetzung-gesetz-cybersicherheit.html)
- [ESET – IT-Sicherheit Kliniken/Praxen](https://eset.com/blog/de/businessthemen/endpoint-sicherheit-und-xdr/wie-kliniken-arztpraxen-und-gesundheitszentren-ihre-it-sicherheit-starken/) · [Deloitte – Backups richtig umsetzen](https://www.deloitte.com/at/de/what-we-do/regions/praxistipps/03-2026-backups-richtig-umsetzen.html) · [zm – Schadensbegrenzung](https://www.zm-online.de/news/detail/oft-geht-es-nur-noch-um-schadensbegrenzung)
- [Nightfall – Prompt-Security-Alternativen](https://www.nightfall.ai/blog/prompt-security-alternatives) · [idox – Guardrail vs. Lakera/Prompt Security](https://www.idox.ai/blog/guardrail-vs-cyberhaven-lakera-prompt-security) · [t3n – Privacy Gateway](https://t3n.de/news/ki-sicherheit-privacy-gateway-daten-schuetzen-1758725/) · [wavect – Pseudonymisierungs-Gateway](https://wavect.io/de/blog/llm-pseudonymization-gateway-gdpr-2026/)
- [hagel-it – Kosten Microsoft 365](https://www.hagel-it.de/microsoft-365-insights/wie-viel-kostet-microsoft-365-fuer-immer) · [rework – Intune-Alternativen](https://resources.rework.com/de/tools/it-management/best-intune-alternatives)
- [fmcgroup – Unternehmen in Deutschland](https://fmcgroup.com/de/how-many-companies-in-germany/)
