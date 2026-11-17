# Family Projekt GO („Chatty“) – Prüfung nach den Runde-3-Maßstäben (13.11.2026)

Grundlage: Repo `family-projekt-go` (README, `docs/Chatty-Konzept.md`, `dist/analyse.html`, `android/README.md`; flacher Klon,
1 Commit sichtbar, Paket 1.5.1), kurze Websuche. Die öffentliche Seite war aus dem Behälter nicht erreichbar (Netz gesperrt) –
beurteilt nach dem Inhalt von `dist/`. Am Repo nichts geändert. Prüfer ist ein KI-Agent, mit niemandem gesprochen.

## 1. Was es ist

Ein Hausbegleiter für ältere, allein lebende Menschen: Ein Präsenzsensor (Matter über Google Home oder Home Assistant) weckt ein
Android-Tablet im Raum, „Chatty“ begrüßt, erinnert an Tabletten und Termine, ruft auf Zuruf an und soll später mit einer KI reden;
das Konzept reicht bis zu Mehrraum-Box, Avatar, Transportroboter und Befüllstation. Für wen: Senioren, eingerichtet von Angehörigen
oder „Paten“. Stand: **Demo und halbe App** – ein 3:39-min-Erklärfilm als PWA (Stockvideo, Sprecherstimmen, Konzeptanimation),
eine Browser-Probe, eine Android-Test-APK (~2 300 Zeilen Kotlin) mit festen Antworten; Google-Home-Anschluss nie übersetzt,
Home Assistant nie mit echten Geräten getestet, kein Hintergrund-Wecker, kein Aktivierungswort, kein KI-Gespräch, kein Pilot.

## 2. Prüfsteine

| # | Prüfstein | Urteil | Beleg |
|---|---|---|---|
| 1 | Bedarf belegt (heute bezahlt) | **knapp** | Bezahlt wird für Nachbarbereiche: Hausnotruf 25,50–40 €/Monat (Kassenzuschuss), Media4Care ab 29,90 €/Monat, ElliQ 49,99–59,99 $/Monat (USA), Pillendosen/Dispenser mit Alarm, ambulante Medikamentengabe. Für „Begrüßen beim Betreten des Raums“ zahlt niemand; die eigene Analyse sagt: „Wirkungen … sind Ziele, keine belegten Ergebnisse.“ |
| 2 | Reduktion (Bilanz positiv, Pflege ≈ 0) | **nicht** | Bringt Tablet, Sensoren, Lampen, App, Google-Konto/OAuth oder Home Assistant, Batterien, KI-Konto ins Haus. Einrichtung laut Analyse 30–60 min, danach „Hilfe bei Problemen durch Familie oder Paten“, Fehlauslösungen. Genau das Jens-Muster. |
| 3 | Nicht in einer Stunde selbst gebaut | **nicht** | Kern = „Bewegung im Raum → Ansage/Licht/Erinnerung“: eine Home-Assistant-Automation oder Alexa-Routine (Auslöser Bewegungsmelder → Ansage) in unter einer Stunde, ohne Code. Kein Fachwissen, keine Haftung, kein gepflegter Inhalt als Vorsprung. |
| 4 | Nicht schon da | **nicht** | Alexa-Routinen mit Bewegungs-/Anwesenheitsauslöser und Erinnerungen; Alexa+ wirbt mit proaktiven Hinweisen; Amazon hatte mit „Alexa Together“ (Sensor-Alarme für Angehörige) genau diese Zielgruppe und hat es eingestellt; Google Gemini for Home, Home Assistant + View Assist, ElliQ, Media4Care, enna, Tablet-Hausnotrufe der Wohlfahrtsverbände. Die eigene Analyse: „Wenn Google oder Amazon nachziehen …“ – sie sind schon da. |
| 5 | Käufer und Weg | **nicht** | Analyse: „kein Pflicht-Abo“, Open Source als Stufe 4, Einrichtung durch Paten/Spenden/Förderung. Kein zahlender Kunde benannt, kein Kanal außer Freundeskreis (Stufe 1: 5–20 Haushalte). |
| 6 | Ehrliche Null | **trifft zu** | Für die Kernfunktionen (Tabletten, Termine, Anrufen) ist die beste Lösung oft: Wochendosierer + Wecker/Alexa-Erinnerung, Seniorenhandy mit Kurzwahl, ambulanter Dienst oder Anruf der Angehörigen. |

## 3. Pflegebilanz (Schätzung, nicht gemessen)

- **Hinein:** Einrichtung 30–60 min (Analyse) plus Konten, Sensorkopplung; laufend etwa 15–30 min/Woche für Angehörige:
  Tablettenzeiten nachpflegen, Kontakte, Fehlauslösungen, Batterien, App-/Android-Updates, Tablet geladen halten, Rückrufe
  „Chatty redet nicht“. Die ältere Person selbst: nahe 0 – gut.
- **Heraus:** vergessene Einnahmen/Termine weniger (unbelegt), Anruf ohne Nummernsuche (Kurzwahl kann das auch), Nachtlicht
  (Bewegungsmelder-Lampe für 15 € kann das ohne Tablet).
- **Bilanz:** für die Familie eher **negativ bis null**, solange keine echte Entlastung (z. B. Anruf der Tochter fällt weg) gemessen ist.

## 4. Reduktion oder Maximierung

Das Projekt ist überwiegend **Maximierung**: Avatar, Mehrraum mit Sitzungsübergabe, Matter über zwei Wege, Roboter mit
Befüllstation, Saugroboter, Geräusch-/Bewegungserkennung je Raum, SB-KIM, Kim-sync, Datei-Post, freies KI-Gespräch, Suchanhänger,
und als größter Bauposten ein Werbefilm mit Stimmen, Stockvideo und Browser-Videoexport.

**Streichen:** Film/Export, Roboter, Befüllstation, Avatar, Mehrraum-Übergabe, KI-Plauderei, Google-Home-SDK, Suchen-Piepen,
eigene Vernetzung (SB-KIM/Kim-sync/Datei-Post).

**Kern, der Bedarf berühren könnte:** *Bestätigte* Tabletteneinnahme mit stiller Nachricht an Angehörige, wenn nicht bestätigt
(„Mama hat um 9 Uhr nicht bestätigt“). Das nimmt den Kontrollanruf weg (Reduktion), filtert (nur melden, wenn etwas fehlt) und
braucht keinen Sensor. Selbst das gibt es jedoch schon (Medikamenten-Apps wie MyTherapy/Medisafe mit Angehörigen-Meldung,
Dispenser mit Alarm, Hausnotruf-Tagestaste „Ich bin okay“).

## 5. Was ChatGPT/Gemini heute schon können

Freies Gespräch auf Deutsch per Stimme (ChatGPT/Gemini Live) – besser als jede vorbereitete Antwort; Erinnerungen und geplante
Aufgaben; Gemini auf Android: Anrufe auf Zuruf, Wecker, Smart-Home-Steuerung über Google Home; Gemini for Home auf Nest-Lautsprechern.
Nicht von selbst: Raum-Präsenz als Auslöser und „bestätigt / nicht bestätigt“ an Angehörige – das liefern Alexa-Routinen bzw. Home
Assistant ohne neue Software.

## 6. Wer zahlt, wie viel, wie erreichbar

- Senioren selbst: zahlen für Sicherheit (Hausnotruf), kaum für Begleit-Software; kaufen kein Tablet + Sensoren.
- Angehörige: zahlen am ehesten 5–10 €/Monat für Gewissheit („hat genommen“), erreichbar nur einzeln.
- Pflegedienste/Wohlfahrt/Hausnotruf-Anbieter: hätten den Kanal, kaufen aber zertifizierte Systeme mit Haftung und Kassenlogik.
- Realistisch 12 Monate: 5–20 Haushalte im Bekanntenkreis zu 0 € (so plant es die eigene Analyse). Herstellung (Film, App,
  Smart-Home-Anschlüsse, Einrichtung und Fernhilfe) übersteigt die Einnahmen des ersten Jahres sicher.

## 7. Urteil

**1 von 5 – lassen** (als Produkt). Prüfsteine 2–5 nicht bestanden, 1 knapp: Die Technik gibt es bei Amazon, Google und Home
Assistant, der Nutzen ist unbelegt, und die Pflege landet wie bei Jens bei der Familie. Wenn überhaupt, nur als Kern
„Einnahme bestätigt – sonst stille Nachricht an Angehörige“, und auch der zuerst mit einer Alexa-Routine oder einer bestehenden
Medikamenten-App plus Wochendosierer bei 3 Haushalten prüfen, bevor eine Zeile Code entsteht.

Quellen (Auswahl): Repo `dist/analyse.html` (Preise Hausnotruf, Media4Care, ElliQ, Alexa+), `android/README.md` (Grenzen);
mobihealthnews.com und engadget.com zu Alexa Together (Sensor-Alarme für Angehörige); aboutamazon.com zu proaktivem Alexa+;
caring.com zu Alexa-Erinnerungen für Senioren. Einstellung von Alexa Together aus Vorwissen, nicht neu nachgesehen.
