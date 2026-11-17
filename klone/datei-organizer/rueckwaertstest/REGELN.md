# Rückwärtstest der Bedarfsanalyse (Workflow Needs) – Regeln, vorab festgelegt

Auftrag Klaus 13.11.2026 (Brief `BRIEF_SITZUNG_2026-11-14_NEEDS-RUECKWAERTSTEST.md`, Zweig `claude/familienakte-bildintegration-il59yw`).
Diese Datei ist eingecheckt, **bevor** ein Kunde simuliert wird. Sie gilt unverändert für den ersten Durchgang.

## Frage

Führt eine Bedarfsanalyse mit Workflow Needs – und der daraus erzeugte Bauauftrag – zu ungefähr der App, die es schon gibt?
Geprüft an vier fertigen Apps: Meine Familienakte, BookLedgerPro, Workflow PDF Pro, Private Brain Pro. Gebaut wird nichts.

## Grenze für „ungefähr dasselbe Ergebnis“

- **≥ 80 % der Kern-Merkmale getroffen** (getroffen = 1, teilweise = 0,5, fehlt = 0), **und**
- **kein Kern-Merkmal ins Gegenteil verkehrt** (z. B. „läuft ohne Netz“ → „Daten in der Cloud“).
- Wichtig- und Beiwerk-Merkmale werden mitberichtet, entscheiden aber nicht.

## Ablauf je App

1. `REFERENZ.json`: 40–60 Merkmale aus der fertigen App, je mit Gewicht (kern / wichtig / beiwerk). Eingefroren vor Schritt 2.
2. Kundenkarten: ein Agent schreibt drei Karten aus der Referenz, in Alltagssprache, **ohne Funktionsnamen und ohne den Namen der
   App**. Kunde A gesprächig, Kunde B vergisst Wichtiges, Kunde C will Unnötiges. Ein dritter Agent liest gegen, ob eine Karte
   Funktionsnamen verrät; Treffer werden umformuliert, bevor ein Kunde läuft.
3. Bedarfsanalyse: je Karte ein Kunden-Agent ohne Zugang zu Repos und Referenz. Er beantwortet die 18 Bereiche von Workflow Needs
   (Wortlaut und Datenmodell aus `Workflow-Needs/assets/kern/bedarf.js`, ihm im Auftrag vorgelegt). Danach wählt ein
   „Betrieb“-Agent (kennt nur den Bedarf und den Baustein-Katalog von Needs) die Bausteine, wie Klaus es in Stufe 2 täte.
   Der Bauauftrag entsteht mit dem **unveränderten** Code von Needs (`assets/kern/bauauftrag.js`, Modul 25) über
   `werkzeug/needs-lauf.mjs`. Abgelegt: `kunde-<x>/bedarf.json`, `kunde-<x>/bauauftrag.md`.
4. Prüfen (lesen): Vollständigkeit, Eindeutigkeit, Widersprüche, fehlend/zu viel gegenüber der Referenz.
5. Simulierter Bau: frischer Agent bekommt nur `bauauftrag.md` (und die Leseanweisung aus der CLAUDE.md von Needs, § 7d) und
   liefert einen Bauplan, kein Code.
6. Vergleich: zwei unabhängige Bewerter-Agenten werten jeden Bauplan Merkmal für Merkmal (getroffen / teilweise / fehlt /
   verkehrt) und nennen Zusätze. Soll = Übereinstimmung; bei Abweichung zählt die strengere Wertung (zwei Bewerter haben keine
   Mehrheit). Codex nur, wenn Klaus das Zeichen gibt.

## Dichtheit

- Kunden-, Betriebs- und Bau-Agenten sehen weder Repo noch Referenz noch den Namen der fertigen App; sie werden angewiesen,
  keine Dateien zu lesen. Prüfbar ist das nur an ihrer Antwort, nicht technisch erzwungen (benannte Grenze).
- Die Beispiele aus den fertigen Apps werden in Workflow Needs erst **nach** den Kundenläufen eingebaut.

## Einmal messen

Je App ein Durchgang mit drei Kunden. Auffälligkeiten (Fragen fehlen in Needs, Bauauftrag lässt etwas weg) werden als Befund
notiert, Needs wird in diesem Lauf nicht umgebaut. Ein neuer Nachweis braucht neue Kunden.

## Bericht

Je App: Trefferquote Kern (Mittel und Spanne über drei Kunden), die fehlenden Kern-Merkmale namentlich, die größten Zusätze.
Dazu eine Liste für Workflow Needs: fehlende Fragen, auf dem Weg verlorene Antworten, was der Bauauftrag anders sagen müsste.

## Grenzen

Simulierte Kunden sind aus der Referenz abgeleitet und „wissen“ mittelbar, was herauskam; echte Kunden reden anders. Ein Bauplan
ist kein Bau. Bewerter sind KI-Agenten. Vier Apps desselben Herstellers. Die Stufe-2-Wahl (Bausteine) trifft ein Agent statt Klaus.
