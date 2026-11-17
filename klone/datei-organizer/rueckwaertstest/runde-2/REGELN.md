# Runde 2 – Regeln, vorab festgelegt (13.11.2026, vor dem ersten Kunden)

Auftrag Klaus 13.11. (Vorschau Needs, Punkt N1, Anmerkung): statt Kunden aus den eigenen Apps **sieben reale, gewinnbringend
verkaufbare Tool-Ideen** mit Alleinstellungsmerkmal; dafür ein Analyse-Agent mit zehn Berufs-Agenten (darunter KI-Kompetenz-Beratung
als Geschäftsidee). Aus diesen Beispielen sollen später echte Tools werden.

## Was geprüft wird

Führt Workflow Needs **mit dem Rahmen** (PR Workflow-Needs #36: Geräte, Datenort, Sicherung, eigene Programme, nicht gewünscht,
vorschlagen/selbst, Abnahme je Baustein) vom Kundengespräch zu einem Bauauftrag, aus dem ein fremder Bau-Agent das gewollte Werkzeug plant?
Es gibt keine fertige App: Soll ist die Merkmalsliste des Analyse-Agenten (`I<n>/REFERENZ.json`), eingefroren vor den Kundenläufen.

## Grenze (unverändert zu Runde 1)

≥ 80 % der Kern-Merkmale getroffen (getroffen 1, teilweise 0,5, fehlt 0) und kein Kern-Merkmal verkehrt. Zwei Bewerter je Bauplan,
bei Abweichung zählt die strengere Wertung. Vergleich mit Runde 1 (Mittel 43–49 %, gesprächig 59–73 %) nur als Richtung:
andere Kunden, andere Soll-Listen.

## Ablauf je Idee (I1–I7), je ein Kunde

1. Kunde + Betrieb (ein Agent, zwei Rollen nacheinander): kennt nur `KUNDENKARTE.md`, `FRAGEBOGEN.md`, `KATALOG.md` – nicht die
   Referenz, nicht die Auswahl, nicht die Marktdateien, keinen Arbeitstitel. Schreibt `bedarf.json` (als Kunde, nur aus der Karte; was
   die Karte nicht sagt, sagt der Kunde nicht) und `umfang.json` (als Betrieb, nur aus Bedarf und Katalog).
   ⚠ Abweichung von Runde 1 (dort zwei Agenten): der Betrieb kennt hier die Karte mit. Benannte Grenze.
2. Bauauftrag mit dem Code von Needs: `node werkzeug/needs-lauf.mjs auftrag …` → `bauauftrag.md`.
3. Bau-Agent ohne Kenntnis von Idee, Referenz, Karte: nur `bauauftrag.md` → `bauplan.md` (kein Code).
4. Zwei Bewerter je Bauplan gegen `REFERENZ.json` → `bewertung-1.json`, `bewertung-2.json`.

Ein Durchgang je Idee. Was auffällt, wird notiert; Needs wird in diesem Lauf nicht geändert.

## Grenzen

Soll-Liste und Kundenkarte stammen vom selben Analyse-Agenten (der Kunde „weiß“ mittelbar, was gewollt ist). Kein echter Kunde, keine
echte Marktbestätigung; Zahlungsbereitschaft nur geschätzt. Ein Bauplan ist kein Bau. Bewerter sind KI-Agenten. Je Idee ein Kunde.
