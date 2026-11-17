# Runde 3 · Markt · 08-familie

Lebenslage: berufstätiger Elternteil, zwei Kinder (Kita + Schule), Haushalt mit Versicherungen, Verträgen, Steuer,
Behörden. Eine Ordnungs-App schon einmal aufgegeben: Die Pflege (abtippen, einordnen, Listen nachziehen) kostete mehr
als sie brachte. Maßstab hier: Was nimmt mir etwas WEG, ohne dass ich etwas eintrage?

## Was ich verworfen habe (ehrliche Null für die naheliegenden Ideen)

- **Kündigungsfristen / Vertragswecker:** Bedarf echt, aber schon da – Volders/Moneyfix erinnern vor Fristende, Finanzguru
  liest Verträge aus dem Konto, Netzwelt/Stiftung Warentest vergleichen die Dienste
  ([Netzwelt-Vergleich](https://www.netzwelt.de/vergleich/kuendigungsdienste-test-volders-aboalarm-co-vergleich.html)). Prüfstein 4 fällt.
- **Elternpost-Sieb** (aus Kita-App, Schul-App, Zettel nur „was muss ich bis wann tun“): Das nervt mich wirklich, aber ich
  fand keine Messung des Zeitaufwands, nur Belege für den Nutzen zentraler Kita-Apps
  ([Fraunhofer IAO „Hallo Kita“](https://publica-rest.fraunhofer.de/server/api/core/bitstreams/572f3c96-b5b2-4a80-9a3e-0c416544acc0/content));
  und ein KI-affiner Laie macht das in ChatGPT/Gemini mit einem Foto in fünf Minuten. Prüfsteine 1 und 3 fallen.
- **Steuerbescheid prüfen:** Bedarf belegt (rund zwei Drittel der Einsprüche erfolgreich,
  [BMF-Monatsbericht 09/2024](https://www.bundesfinanzministerium.de/Monatsberichte/Ausgabe/2024/09/Inhalte/Kapitel-3-Analysen/3-3-einspruchsbearbeitung-finanzaemter.html)),
  aber WISO, Taxfix, Lohnsteuer kompakt vergleichen Bescheid und Erklärung bereits. Prüfstein 4 fällt.
- **Allgemeiner „Behördenbrief erklären“:** macht jede Chat-KI schon, Jobcenter werden mit KI-Widersprüchen geflutet
  ([Bericht](https://www.gegen-hartz.de/news/ki-ueberlastung-in-jobcentern-bezieher-der-grundsicherung-fluten-erfolgreich-aemter-mit-widerspruechen)).
  Prüfstein 3 fällt – der Vorsprung kann nur im gepflegten Ortswissen liegen, siehe unten.

## Idee 1 – „Kita-Bescheid-Wächter“ (Familienbescheide der eigenen Kommune)

**Szene heute:** Einmal im Jahr (oft öfter: Kind wechselt Gruppe, Einkommen ändert sich, zweites Kind kommt) kommt ein
Beitragsbescheid für Kita/Hort/Ganztag. Ob Geschwisterermäßigung, Einkommensstufe und beitragsfreie Jahre stimmen, prüfe
ich nicht – ich kenne die Satzung meiner Stadt nicht. Manche Ermäßigung kommt **nur auf Antrag** und muss **jährlich**
erneuert werden, sonst wird rückwirkend der volle Beitrag fällig
([Marburg: keine automatische Anpassung](https://www.marburg.de/medien/dokumente/faq_ermaessigungsregelung_eltern.pdf);
[Bayern 2026: Antrag bis Dezember, sonst rückwirkend voll](https://www.gesetze-bayern.de/Content/Document/Y-300-Z-BECKRS-B-2026-N-16502?hl=true)).
Ganze Satzungen sind schon falsch gewesen ([Bonn nichtig](https://www.otto-schmidt.de/news//kita-beitragssatzung-2014-15-der-stadt-bonn-nichtig-2016-09-05.html),
[Potsdam muss korrigieren](https://www.tagesspiegel.de/potsdam/landeshauptstadt/potsdam-muss-kita-beitrage-korrigieren-7117666.html)).
Widerspruchsfrist ein Monat. Kosten heute: bei Fehlern schnell 50–200 € im Monat, bei verpasstem Ermäßigungsantrag ein ganzes Jahr nachzahlen.

**Was das Werkzeug WEGNIMMT:** Bescheid fotografieren (oder aus dem Mail-/Scan-Eingang, der ohnehin da ist) → es sagt
genau eine von drei Sachen: „stimmt nach Satzung deiner Stadt“, „prüfen: Geschwisterermäßigung fehlt, Widerspruch bis TT.MM.“
(mit fertigem Schreiben), oder „Ermäßigung jährlich neu beantragen – Erinnerung im Oktober gesetzt“. Kein Eintragen,
keine Liste, kein Ordner. Der Rest wird vergessen.

**Minuten-Bilanz:** Gespart wird kaum Zeit (ich prüfe heute ja gar nicht), sondern Geld und Sorge. Gerechnet auf die Woche:
~2 Bescheide/Jahr × 45 min Satzung suchen und lesen ≈ 2 min/Woche gespart; Pflege 0 (ein Foto, wenn ein Bescheid kommt).
Bilanz klein, aber positiv – der Wert liegt im Euro-Betrag, nicht in Minuten.

**Warum nicht in einer Stunde selbst gebaut:** Die Programmierung ist trivial (Foto → Text → Regeln). Der Vorsprung ist
**gepflegter Inhalt**: Beitragssatzungen, Stufen, Ermäßigungs- und Antragsregeln von Hunderten Kommunen und Trägern,
jährlich geändert, plus Gerichtsentscheidungen. Eine Chat-KI rät hier und erfindet Fristen (genau davor warnen Ratgeber).

**Wer es schon versucht:** Kommunen selbst (Gebührenrechner einzelner Städte, z. B. Berlin Kita-Gutschein-Infos), Familienberatungsstellen,
Elternvertretungen vor Ort, Anwälte für Verwaltungsrecht – je einzeln, je eine Stadt, nicht am Bescheid. Steuer-Apps (WISO, Taxfix) kennen
nur das Finanzamt. Ein Dienst, der kommunale Familienbescheide gegen die Ortssatzung prüft, war nicht zu finden.

**Käufer, Preis, Weg:** Eltern zahlen kaum für Prüfung „auf Verdacht“. Realistischer: **Erfolgsbeteiligung** (z. B. 20 % der
Erstattung) oder **Multiplikator zahlt**: Arbeitgeber-Familienservice (pme, awo lifebalance), Lohnsteuerhilfevereine als
Zusatzleistung für Mitglieder, Stadt-Elternbeiräte. 12 Monate realistisch: 1–3 Pilotstädte, 200–500 zahlende Familien,
oder 1 Lohnsteuerhilfeverein als Lizenznehmer.

**Größtes Risiko:** Inhaltspflege skaliert nicht – jede Stadt ist eigene Arbeit, und nur in Städten mit einkommensabhängigen
Beiträgen lohnt es (in Ländern mit Beitragsfreiheit fällt der Bedarf weg). Dazu Rechtsdienstleistung (RDG): ein fertiger
Widerspruch an Fremde braucht Haftung/Kooperation mit Beratungsstelle oder Anwalt. Fehlerquote solcher Bescheide ist **nicht
gemessen** – es gibt Einzelfälle und Urteile, keine Statistik.

**Urteil: 2 von 5.** Echter Geldverlust, null Pflege, Vorsprung durch Inhalt – aber der Bedarf ist nicht beziffert, tritt
selten auf und der Inhalt muss Stadt für Stadt gebaut werden. Als Modul in einem vorhandenen Dokumenten-Eingang (der
den Bescheid ohnehin sieht) eher sinnvoll als als eigenes Produkt.

## Gesamturteil

Nur eine Idee besteht knapp. Für meine Lebenslage ist die beste Reduktion meist **keine neue Software**: Verträge über einen
bestehenden Kündigungsdienst, Steuer über die vorhandene Steuer-App, Elternpost über die eine Kita-/Schul-App plus eine
feste Viertelstunde am Sonntag. Ein weiteres Werkzeug, das ich füttern muss, würde ich wieder aufgeben.
