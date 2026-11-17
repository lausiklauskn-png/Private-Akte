# 03 – Marktanalyse: lokaler Datei-Organizer für kleine Betriebe (5–50 Leute)

Stand 13.11.2026. Kurze Netzrecherche (Suchmaschine). Die Belege sind meist Vergleichsportale, Anbieter-Blogs oder Verbandszahlen.
Öffentliche Listenpreise gibt es bei den großen DMS kaum. Die Zahlen sind also Richtwerte und nicht nachgeprüft.

**Produkt:** Es liest alle Dateien eines Betriebs ein (Netzlaufwerk, Scans, Mails, Office, PDF) und findet Dubletten. Es ordnet die
Dateien nach Kunde, Projekt, Art, Datum und Frist. Die Ordnung ist nur eine Sicht, das Original bleibt unverändert. Das Werkzeug
macht alles auffindbar und gibt jedes Dokument als Bündel für eine KI aus (Text, Abschnitte, Steckbrief, Vektoren). Es läuft lokal.

## Wettbewerber

| Wer | Was | Preis (Richtwert) | Lokal | Einführung | Was fehlt fürs Produkt |
|---|---|---|---|---|---|
| DocuWare | DMS/ECM, seit 05/2026 KI-Assistent „Aura“ (Suchen, Zusammenfassen, Vergleichen im Archiv) | Cloud grob 25–50 €/Nutzer/Monat, sonst auf Anfrage | Cloud oder On-Prem | Partnerprojekt, Wochen | Ändert den Ablauf: Dateien müssen ins Archiv. Der Altbestand im Laufwerk wird erst nach einer Migration nutzbar |
| ELO | ECM-Suite, KI-Klassifizierung | On-Prem auf Anfrage, Cloud geschätzt 25–40 €/Nutzer/Monat | ja | Partnerprojekt | wie DocuWare, für 5 Leute zu groß |
| d.velop | E-Akte, KI-Indexierung, „Sovereign Cloud“ | auf Anfrage | On-Prem, hybrid, Cloud | Projekt | wie oben |
| M-Files | „Metadaten statt Ordner“ (**Ordnung als Sicht ist dort Kernidee**), KI „Aino“ in allen Cloud-Stufen, Copilot-Anbindung seit 03/2026 | auf Anfrage, Mittelstand aufwärts | auch On-Prem | Projekt | Preis und Einführung zu hoch für 5–20 Leute |
| Amagno | „agentisches DMS“, Trennen und Klassifizieren beim Scan | auf Anfrage | Cloud/On-Prem | Partner | wie oben |
| ecoDMS | günstiges deutsches Archiv-DMS | Business einmalig ca. 149 €/Lizenz, Support 50 €/Lizenz/Jahr | ja | Eigenbau oder Systemhaus, Tage | wenig KI. Ordnet über Ablage-Regeln, keine Bündel für eine KI |
| **Paperless-ngx 3.x** (Open Source) | seit 07/2026 **eigene KI**: schlägt Titel, Tags, Korrespondent und Art vor, Chat über das Archiv, Vektor-Index, **lokal mit Ollama**. Dazu paperless-gpt und paperless-ai | 0 € (Betrieb und Hardware selbst) | ja | Docker, ein Admin-Nachmittag | Nimmt Dateien in die eigene Ablage auf, liest also nicht das Laufwerk mit. Auf PDF und Scans ausgerichtet. Kein Betreuer, keine Haftung |
| M365 Copilot | KI über Mails, Teams, SharePoint/OneDrive | Copilot Business 18,20 € (Aktion 15,60 €) **zusätzlich** zu Business Standard 14 €/Nutzer/Monat | nein | Daten müssen nach SharePoint/OneDrive | Altbestand auf dem NAS bleibt außen vor. Sortiert nichts, findet nur |
| Windows 11 „Semantic Indexing“ / Copilot lokal | Suche in normaler Sprache über lokale PDF, DOCX und Bilder, offline auf der NPU, vorgestellt 10/2026 | im Betriebssystem, Copilot+-PC nötig | ja | keine | arbeitet je PC, nicht über das Netzlaufwerk. Keine Ordnung, keine Dubletten, keine Fristen |
| Google Gemini / Dropbox Dash / Notion AI | KI-Suche über die eigene Cloud | Dash zuletzt ca. 15–35 $/Nutzer (Preisseite entfernt) | nein | Daten in deren Cloud | Cloud-Pflicht |
| Langdock, meinGPT, CompanyGPT | deutsche „KI auf Firmendaten“, EU-Hosting, AVV | ca. 23–29 €/Nutzer/Monat | nein (EU-Cloud) | Tage | Sie setzen geordnete Daten voraus und ordnen selbst nichts |
| AnythingLLM, Open WebUI, GPT4All LocalDocs, PrivateGPT | lokales Fragen an Dokumente (RAG) | 0 € | ja | Bastelarbeit, Admin | Sie ordnen nicht und erkennen keine Dubletten. Bei Teams und Rechten schwach. Ergebnis hängt von schlechtem OCR ab |
| Nextcloud Assistant / Context Chat | Fragen an Dokumente in Nextcloud, lokal möglich | KI laut Anbieter in der „Ultimate“-Stufe | ja | Nextcloud-Betrieb nötig | Daten müssen in Nextcloud liegen. Context Chat beachtet die Zugriffsregeln von files_accesscontrol nicht |
| Scan- und Migrationsdienste (Deutsche Post, Haufe, Iron Mountain, Systemhäuser) | Papier scannen, indexieren, ins DMS migrieren | US-Richtwert 0,07–0,12 $/Seite, DE nur auf Anfrage | – | Projekt | einmalig. Ordnet keinen laufenden digitalen Bestand |

## Die konkrete Lücke

Für kleine Betriebe fehlt ein Werkzeug, das den **vorhandenen Wildwuchs an Ort und Stelle** lesbar macht:
- Es liest das Netzlaufwerk, die Mails und die Scans **ohne Umzug in ein Archiv**.
- Es ordnet automatisch und zeigt Dubletten und Fristen. Die Ordnung ist eine Sicht.
- Es gibt **jeder** KI ein sauberes Bündel, egal ob Copilot, Langdock oder eine lokale KI.
- Es braucht keinen Admin und keine Systemhaus-Einführung.

DMS-Anbieter verlangen eine Migration. Copilot und Gemini verlangen ihre Cloud. Paperless-ngx und die RAG-Werkzeuge verlangen jemanden,
der Docker betreibt. Und keines dieser Werkzeuge stellt die Bereitschaft der Daten für KI („data readiness“) als **eigenes,
anbieterneutrales Produkt** her. Die Lücke ist schmal. Paperless-ngx 3 deckt Klassifizieren, Vektoren und lokale KI bereits kostenlos
ab. M-Files hat „Ordnung als Sicht“ als Grundidee. Windows indexiert lokal bereits semantisch.

## Bedarf (Prüfstein 1)

- **Bitkom (Erhebung 2026, 603 Unternehmen ab 20 Beschäftigten):** 40 % fehlen die nötigen Daten für KI. Den höchsten Aufwand
  sehen die Unternehmen bei Daten aufbereiten und Systeme verbinden. Damit ist Datenbereitschaft als Hürde belegt.
- **KfW (Mittelstandspanel 2025, Fokus 533 vom 02/2026):** 20 % der Mittelständler nutzen KI, rund 780.000 Unternehmen. Im Bau sind es 8 %.
  Laut KfW-Digitalisierungsbericht verlieren die Digitalvorhaben an Schwung, und die Kluft zwischen kleinen und großen Betrieben bleibt.
- **Suchzeit:** Sharp/Censuswide nennt rund 22 Minuten pro Tag und Büroangestellten. Die Werte der Anbieter Kyocera, ABBYY und
  Ambersearch sind viel höher (bis 2 h pro Tag). Alle stammen aus Studien von Interessenten. Der konservative Wert entspricht bei
  10 Büroleuten etwa 18 Stunden pro Woche.
- **Was heute schon bezahlt wird:** DMS-Lizenzen, Einführungen im Bereich 5.000–15.000 € (Modellrechnung alloq), Scan-Dienste,
  Copilot-Lizenzen, die ohne geordnete Daten wenig bringen (Hardwareluxx: Copilot-Nutzung in Business bleibt klein).
  → **Bedarf belegt, aber verteilt.** Es zahlt niemand gezielt für „ordnen ohne Umzug“, sondern für ein DMS oder ein Projekt.

## Wo das Produkt verlieren würde

1. **Paperless-ngx 3 ist kostenlos, lokal und hat eingebaute KI.** Jeder KI-affine Kunde und jedes kleine Systemhaus stellt es auf.
   Prüfstein 3 („nicht in einer Stunde selbst gebaut“) hält nur, solange Laufwerk-Lesen ohne Umzug, gute Dubletten und Fristen
   und die Bündel-Ausgabe deutlich besser sind.
2. **GoBD und Revisionssicherheit:** Steuerrelevante Unterlagen brauchen ein unveränderbares Archiv mit Verfahrensdokumentation.
   Ein Werkzeug, das „nur eine Sicht“ bietet, ersetzt das nicht. Der Betrieb bräuchte also trotzdem ecoDMS oder DocuWare, oder
   einen Steuerberater-Weg über DATEV. Damit wird das Produkt zum zweiten Programm statt zu einer Reduktion.
3. **Microsoft und Google kommen von oben:** Copilot (SharePoint), die semantische Windows-Suche und M-Files mit Copilot-Anbindung.
   Wer M365 hat, bekommt den Rat „leg's in SharePoint“, und das kostet null Zusatz-Software.
4. **Vertrieb:** Die DMS-Hersteller haben Partnernetze in den Systemhäusern. Ein neues Werkzeug müsste genau diese Systemhäuser als
   Multiplikator gewinnen, die heute an DMS-Einführungen verdienen.
5. **Pflege (Prüfstein 2):** Neue Kunden, Projekte und Absender verlangen Korrekturen. Bleibt die Pflege nicht nahe null, ist der
   Gewinn gegen 22 Minuten pro Tag schnell aufgebraucht.
6. **Haftung bei Fristen:** Wird eine Frist falsch erkannt, haftet am Ende der Betrieb. Ein Versprechen wie „findet Fristen“ verlangt
   Vorsicht in der Formulierung.

## Marktgröße

- **Destatis Unternehmensregister:** rund 3,5 Mio. rechtliche Einheiten (2023), alle Größen.
- **Kleine Unternehmen mit 10–49 Beschäftigten:** etwa 429.000 (Drittquelle fmcgroup, Primärquelle nicht gefunden). Länder-Tabelle nach
  IfM/Destatis in BT-Drs. 21/7502. Dazu kommt ein Teil der Kleinstbetriebe mit 5–9 Beschäftigten (Zahl nicht gefunden).
- **Davon mit KI im Einsatz:** rund 20 % (KfW). Davon wiederum haben nur einige einen nennenswerten Dateibestand und einen Grund,
  ihn für KI aufzubereiten.
- **Grob gerechnet:** 400.000–600.000 Betriebe im Zielband. Realistisch erreichbar über Systemhäuser in den ersten 12 Monaten sind
  einige Dutzend bis wenige Hundert. Bei angenommenen 50–150 €/Monat je Betrieb oder 1.500–3.000 € als Einrichtungspaket sind das
  im ersten Jahr eher 20.000–150.000 € Umsatz, nicht mehr. Das ist eine Schätzung, keine Messung.

## Ehrliche Null (Prüfstein 6)

Für viele 5-Leute-Betriebe ist die beste Lösung **keine neue Software**: ein festes Ordnerschema plus Benennungsregel,
die Ablage eines Scan-Dienstes und M365 mit OneDrive/SharePoint oder ecoDMS als Archiv. Erst ab etwa 10–15 Büroleuten mit
gewachsenem Altbestand und konkretem KI-Vorhaben trägt ein Werkzeug „aufräumen ohne Umzug“.

## Urteil: 2 von 5

| Prüfstein | Ergebnis |
|---|---|
| 1 Bedarf belegt | knapp ja: Datenbereitschaft ist die belegte KI-Hürde, Suchzeit ist bezahlt. Gezahlt wird aber für ein DMS oder ein Projekt |
| 2 Reduktion | nur, wenn es Migration, DMS-Einführung oder Aufräumprojekt **ersetzt**. Neben dem GoBD-Archiv ist es ein zweites Programm |
| 3 nicht selbst gebaut | gefährdet: Paperless-ngx 3 mit Ollama ist an einem Nachmittag aufgesetzt |
| 4 nicht schon da | teilweise da: M-Files (Sicht statt Ordner), Paperless (lokale KI), Windows (lokale semantische Suche), Copilot (Cloud) |
| 5 Käufer und Weg | Käufer klar (Inhaber, Büroleitung). Der Weg führt nur über Systemhäuser, IT-Betreuer und Steuerberater, und die verdienen heute an DMS-Projekten |
| 6 ehrliche Null | für Kleinstbetriebe ja: Ordnerschema plus vorhandene Werkzeuge |

Eine Chance besteht als **Einstiegs- und Aufräumwerkzeug für Systemhäuser**: einmal den Altbestand lesen, Dubletten und Ordnung
vorschlagen und das Ergebnis als Bündel an das spätere DMS oder an eine KI übergeben. Das wäre dann eher ein Projektwerkzeug mit
Lizenz je Einsatz als ein Abo-Produkt für den Betrieb.

## Quellen (Auswahl)

- DMS-Preise: hagel-it.de (DocuWare), trusted.de/ecodms-kosten, ki-syndikat.de/tools/elo-ecm, alloq.digital (KMU-Vergleich 2026), yagemi.de
- DMS-KI: borncity.com (DocuWare Aura), reworked.co und m-files.com (Aino, Copilot), softguide.de (Amagno)
- Paperless-ngx 3 KI: wz-it.com/blog/paperless-ngx-ki-einrichten; paperless-gpt/paperless-ai (sourceforge-Spiegel)
- Copilot-Preise: skill-sprinters.de, nordflux.de, hardwareluxx.de
- Windows Semantic Indexing: winfuture.de (News 148279, 153106), pcgameshardware.de, windowscentral.com
- Langdock/meinGPT: ki-syndikat.de, bakedwith.com, innfactory.ai
- Dropbox Dash: softwareadvice.com, sagnikbhattacharya.com
- Nextcloud: nextcloud.com/de/assistant, docs.nextcloud.com (Context Chat)
- AnythingLLM/Open WebUI: docs.openwebui.com, administrator.de
- Bitkom: bitkom.org „Erstmals nutzt die Mehrheit der Unternehmen KI“; KfW: Fokus Nr. 533 (02/2026), Digitalisierungsbericht 2025
- Suchzeit: it-daily.net (Kyocera), cetpm.de (Sharp/Censuswide), ambersearch.de
- Unternehmenszahlen: destatis.de Business Register, dserver.bundestag.de/btd/21/075/2107502.pdf, fmcgroup.com
- Scan-Dienste: securescan.com, deutschepost.de, clutch.co
