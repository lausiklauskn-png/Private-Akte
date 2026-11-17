# Rückwärtstest Workflow Needs — Ergebnis (13.11.2026)

Grenze vorab (`REGELN.md`): ≥ 80 % der Kern-Merkmale getroffen, kein Kern-Merkmal verkehrt. Zwei Bewerter je Plan, bei
Abweichung zählt die strengere Wertung. Zahlen: `ERGEBNIS.json`, nachrechenbar mit `node werkzeug/auswertung.mjs`.

## Ergebnis zuerst

**Kein simulierter Kunde erreicht die Grenze.** Mittel 43–49 % der Kern-Merkmale, gesprächige Kunden 59–73 %, knappe 26–44 %.
Der Weg Kunde → Needs → Bauauftrag → Bau verliert vor allem **Plattformen, Datenort/Sicherung und das Zusammenspiel mit den
anderen Apps** — das fragt Needs nicht.

| App | Kunde A (gesprächig) | Kunde B (knapp) | Kunde C (will Unnötiges) | Beispiel K (vorher) | Beispiel K2 (korrigiert) |
|---|---|---|---|---|---|
| Familienakte (20 Kern) | 73 % | 30 % | 40 % | 70 % | **90 % ✓** |
| BookLedgerPro (18 Kern) | 61 % | 44 % | 31 % | 75 % | **83 % ✓** |
| Workflow PDF Pro (17 Kern) | 59 % | 26 % | 44 % | 62 % | 71 % |
| Private Brain Pro (14 Kern) | 68 % | 36 % | 43 % | 79 % | 71 % |

Bewerter einig: 70–100 % je Plan (Mittel rund 90 %).

## Je App zwei Zeilen

- **Familienakte:** Kunden 30–73 %. Am häufigsten fehlen Web-App neben den Apps, „nichts ohne Bestätigung ablegen“, Fristen aus
  Briefen erkennen, Verdecken vor der KI, „nur Entwürfe, nie selbst versenden“.
- **BookLedgerPro:** Kunden 31–61 %. Es fehlen doppelte Buchführung mit USt-Aufteilung (3 von 3 Kunden), die vier Nutzungsmodi,
  Tagesabschluss der Kasse, DATEV-Export, Festschreibung mit Hash-Kette.
- **Workflow PDF Pro:** Kunden 26–59 %. Es fehlen „Pro-Fassung einer bestehenden Web-App“ (3 von 3), gemeinsamer Ablageort,
  Zusammenarbeit mit den Schwester-Apps, Sicherung „fügt hinzu, überschreibt nie“.
- **Private Brain Pro:** Kunden 36–68 %. Es fehlen gemeinsamer Ablageort, Originalkopie öffnen, Prüfung beim Hinzufügen,
  eigenes Postfach mit IMAP/SMTP.

## Gegenprüfung der Beispiele (Klaus 13.11.: „nicht nur selber eingefügt, sondern auch gegenprüfen lassen“)

Die vier neuen Beispiele in Workflow Needs wurden rückwärts geprüft: Bauauftrag aus dem Beispiel → Bau-Agent ohne App-Kenntnis →
zwei Bewerter gegen die Referenz. Erster Lauf (K) 62–79 % — die Beispiele selbst waren unvollständig. Danach habe ich die
fehlenden Kern-Merkmale als „Das System muss …“ nachgetragen und frisch prüfen lassen (K2): Familienakte 90 % und BookLedgerPro
83 % bestehen; Workflow PDF Pro und Private Brain Pro bleiben bei 71 %.

⚠ Private Brain Pro ist im zweiten Lauf **schlechter** als im ersten (79 → 71 %): die Bewerter waren sich uneinig (82 % gegen
71 %), es zählt der strengere. Ein Lauf je Bauplan schwankt also um rund 10 Punkte — das ist die Messgenauigkeit, nicht ein Effekt.
⚠ Nach K2 habe ich bei BookLedgerPro (Kontoauszug) und Workflow PDF Pro (Web-App bleibt, Ordnerwahl freiwillig, Installer
unsigniert) noch einmal nachgebessert — **diese letzte Fassung ist nicht neu gemessen.**

## Grenzen

Simulierte Kunden aus der Referenz abgeleitet; ein Bauplan ist kein Bau; Bewerter und Betrieb sind KI-Agenten; vier Apps eines
Herstellers; je Plan ein Lauf. Dichtheit nur per Anweisung, nicht technisch erzwungen. Codex nicht beteiligt (kein Zeichen von Klaus).
Die Beispiele (K, K2) sind kein Test von Needs, sondern von meinen Beispielen — sie kennen die App.

Was an Needs zu ändern wäre: `NEEDS-LUECKEN.md`.
