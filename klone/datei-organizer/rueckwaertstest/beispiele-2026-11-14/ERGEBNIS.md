# Rückwärtsprüfung der Needs-Beispiele K3/K4 (14.11.2026) — Ergebnis

Regeln vorab: `REGELN.md`. Zahlen: `ERGEBNIS.json`, nachrechenbar mit `node ../werkzeug/auswertung-k3.mjs`.
Grenze ≥ 80 % der Kern-Merkmale, kein Kern-Merkmal verkehrt, strengere von zwei Wertungen.

## Ergebnis zuerst

**Alle 13 Einzel-Beispiele bestehen** — 8 gleich im ersten Lauf (K3), 6 nach Nachbesserung (K4, darunter Workflow PDF Pro, das am
13.11. bei 71 % hing). **Der Pro-Verbund gesamt besteht nicht (57 %)** — mit Absicht nicht nachgebessert, siehe unten. **Klaus 15.11.: „Im Pro-Verbund lassen wir so.“** Das Beispiel beschreibt den Verbund; die Fachfunktionen stehen in den vier Einzel-Beispielen.

| Beispiel | K3 | K4 (nachgebessert) |
|---|---|---|
| Familienakte | **90 % ✓** | — |
| BookLedgerPro | **86 % ✓** | — |
| Private Brain Pro | **82 % ✓** | — |
| Workflow PDF Pro | 74 % | **91 % ✓** |
| Workflow Calculate | **85 % ✓** | — |
| Datei-Organizer | **85 % ✓** | — |
| PWA Toolpoint | **88 % ✓** | — |
| Mixarium-Seite | **83 % ✓** | — |
| Kim-sync | 77 % | **100 % ✓** |
| Mein Mixarium | 78 % (1 verkehrt) | **94 % ✓** |
| Workflow Needs | 75 % | **94 % ✓** |
| Mein Rezeptbuch | 68 % | **94 % ✓** |
| Werbetechnik-Vorlage | 60 % | **90 % ✓** |
| Pro-Verbund gesamt | 57 % (69 Kern-Merkmale aus vier Apps) | — |

Bewerter einig 80–100 % je Plan.

## Was nachgebessert wurde (Workflow-Needs, Zweig ccr-8da46c4f-nb1147)

- **Widersprüche, die die Bau-Agenten meldeten:** offene Fragen mit einer Frist vor dem Fassungsdatum (8 von 14 Plänen) gelten in
  späteren Fassungen als geklärt; Rahmen korrigiert (Abgleich „ein Gerät“ wo es keinen Abgleich gibt, KI-Ort bei Needs, Toolpoint,
  Datei-Organizer, Datenort Kim-sync und Pro-Verbund, Sicherung „von allein“ bei Rezeptbuch und Mixarium — das war das eine
  „verkehrt“), zwei „Nicht gewünscht“-Sätze, die dem Bedarf widersprachen (BookLedgerPro Kasse, Needs Stundensatz).
- **K4:** die fehlenden Kern-Merkmale als Muss-Sätze (Bereich 8) in der letzten Fassung der sechs Beispiele.

⚠ **K4 ist nicht unabhängig:** die Muss-Sätze habe ich nach der Liste der fehlenden Referenz-Merkmale geschrieben. K4 zeigt, dass
die Beispiele jetzt vollständig genug sind — nicht, dass Needs diese Punkte von allein erfragt.

## Pro-Verbund gesamt

Die Referenz ist die Vereinigung der vier Pro-Referenzen (232 Merkmale, 69 Kern). Das Gesamt-Beispiel beschreibt den **Verbund**
(ein Tresor, Übergaben, Bestätigungspflicht, Plattformen) — das trafen beide Bewerter; die Fachfunktionen jeder App stehen in
den vier Einzel-Beispielen, die es daneben gibt (Klaus 13.11.: „die einzelnen Apps separat“). Alle 69 Kern-Merkmale in das
Gesamt-Beispiel zu kopieren hieße, vier Beispiele zu verdoppeln. Entscheidung offen bei Klaus.

## Was Needs selbst fehlt (aus den Meldungen der Bau-Agenten, nicht gebaut — sichtbare Änderung, erst Vorschau)

1. **Offene Fragen lassen sich nicht als „geklärt“ markieren** (nur löschen) — in den Beispielen jetzt per Frist gelöst.
2. **„nur auf dem Gerät“** ist eine Mehrfachwahl neben Server und Cloud — das Wort „nur“ widerspricht sich bei mehreren Haken.
3. **„Ohne Internet: ja, immer“** lesen 9 von 14 Bau-Agenten als „nie online“; gemeint ist „die Kernfunktionen gehen ohne Netz“.
4. **Abnahme je Baustein** bleibt leer, wenn Bereich 8 nur allgemeine Sätze hat; die Bau-Agenten vermissen prüfbare Kriterien.
5. **Vorlagen werden nur beim Namen genannt** (Datei-Post, Company Brain, Sortier-Kern, SBKIM) — ohne ein Satz, was sie sind.
6. **Überholte Bedarfe** bleiben in späteren Fassungen stehen (Kim-sync: Schlüssel aus dem Code gegen eigener Raumschlüssel).

## Grenzen

KI-Agenten als Referenz-Schreiber, Bauer und Bewerter; ein Lauf je Plan (Schwankung rund 10 Punkte); die Bauaufträge nennen
Partner-Apps beim Namen; Dichtheit nur per Anweisung. Codex nicht beteiligt.
