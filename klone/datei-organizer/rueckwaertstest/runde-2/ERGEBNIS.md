# Runde 2 – Ergebnis (13.11.2026)

Regeln vorab: `REGELN.md` (Grenze ≥ 80 % der Kern-Merkmale, kein Kern-Merkmal verkehrt, zwei Bewerter, strengere Wertung zählt).
Zahlen: `ERGEBNIS.json`, nachrechenbar mit `node ../werkzeug/auswertung-runde2.mjs`.

## Ergebnis zuerst

**Alle sieben Ideen bestehen.** Mit dem Rahmen in Needs (Workflow-Needs #36) kommen die Baupläne auf **81–100 % der Kern-Merkmale**,
kein Kern-Merkmal verkehrt; Bewerter einig 88–100 %. Die „wichtigen“ Merkmale liegen bei 57–81 %.
Runde 1 (ohne Rahmen, Kunden aus den eigenen Apps) lag bei 26–73 %. ⚠ Das ist **keine** saubere Vorher-nachher-Messung (andere Kunden,
andere Soll-Listen, Soll und Kunde vom selben Analyse-Agenten) – nur eine Richtung.

| Idee | Käufer | Kern | wichtig | was im Plan nur teilweise oder fehlt (Kern) |
|---|---|---|---|---|
| I1 KI-Schleuse | Kanzleien, Steuerbüros, Praxen | 83 % | 64 % | fehlt: zweite Prüfung auf übrig gebliebenen Klartext vor dem Senden · teilweise: deutsche Muster (Geburtsdaten, Anschriften) |
| I2 KI-Kompetenz-Mappe für Berater | KI-/Datenschutz-Berater | 81 % | 64 % | teilweise: Werkzeugliste in drei Stufen, Teilnahme offline am Tablet, Daten je Mandant getrennt |
| I3 Anlagenpass | SHK-/Elektrobetriebe | 83 % | 75 % | fehlt: QR-Aufkleber je Anlage · teilweise: Fälligkeitsliste je Vertrag |
| I4 Nebenkosten-Prüfer | Hausverwaltungen, Vermieter | 94 % | 81 % | teilweise: unabhängig vom Programm, das die Abrechnung erstellt hat |
| I5 Belegjäger | Steuerkanzleien | 88 % | 64 % | teilweise: kurzlebiger Link mit PIN, Löschung nach Abholung |
| I6 Prüfbereit ambulant | ambulante Pflegedienste | 94 % | 71 % | teilweise: Bewertung A–D nach der Prüfanleitung |
| I7 Wareneinsatz-Wächter | Restaurants | 100 % | 57 % | – (wichtig fehlt: Top-10-Kostentreiber, Auswertung der letzten 3 Monate beim Start) |

Die Bauaufträge (`I<n>/bauauftrag.md`) sind die Startaufträge für spätere echte Tools (Klaus: „aus diesen neuen Beispielen möchte ich
später echte Tools entwickeln“). Marktbegründung, Konkurrenz und Risiko je Idee: `AUSWAHL.md`, Berufs-Recherchen: `markt/`.

## Befunde für Workflow Needs (nicht umgebaut, nur notiert)

1. **Budget je Monat:** alle sieben Kunden nannten einen Monatsbetrag (40–130 €/Monat); das neue Feld fragt „gesamt in €“. Sechs von
   sieben blieben leer, einmal hat der Agent einen Gesamtbetrag geraten. Vorschlag: Feld „€ je Monat (Abo)“ neben „einmalig gesamt“.
2. **Abgleich zwischen Geräten:** I3 und I7 wollen Handy **und** PC; der Katalog hat keinen Baustein „Abgleich zwischen Geräten“, der
   Bau-Agent I7 fand keinen Weg vom Handy zum PC und meldete ihn als größte Lücke.
3. **Faktor „KI“ ohne Ort:** der Faktor sagt nicht, ob die KI auf dem Gerät oder bei einem Dienst läuft; Bau-Agent I7 sah einen
   Widerspruch zu „Daten verlassen das Gerät nicht“. Vorschlag: im Rahmen „KI: keine / nur auf dem Gerät / Dienst nach Bestätigung“.
4. **Größe und Stunden** passen für Bau-Agenten weiter nicht immer („mittel“ mit 24–44 h) – die Faktoren stehen jetzt je Zeile, die
   Wiederverwendung nur bei Katalog-Bausteinen mit Vorlage.

## Grenzen

Soll-Liste und Kundenkarte vom selben Analyse-Agenten; die Karten waren ausführlich (eher „gesprächige“ Kunden), ein knapper Kunde wie in
Runde 1 (Kunde B) wurde nicht gespielt. Kunde und Betrieb waren ein Agent. Ein Bauplan ist kein Bau. Bewerter sind KI-Agenten.
Zahlungsbereitschaft und Marktgrößen stammen aus kurzer Netzrecherche, oft von Anbieter-Seiten; nicht mit echten Kunden gesprochen.
Je Idee ein Durchgang.
