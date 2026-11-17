# Rekursive Verbesserung des Sortier-Kerns – Ergebnis (15.11.2026)

Auftrag: `docs/BRIEF_SITZUNG_2026-11-15_REKURSIVE-VERBESSERUNG.md` · Recherche: `docs/RECHERCHE-REKURSIVE-VERBESSERUNG-2026-11-15.md` ·
Regeln vorab und Einfrieren: `docs/PRUEFSTAPEL-REKURSIV-REGELN.md`. Nichts veröffentlicht, nichts in die Familienakte übertragen.

## Kurz

- **Zweiter unabhängiger Nachweis (Welt 4 „Musterhausen am Rhein“, digitale Post, Barcode/QR):** der Kern auf `main` schlägt 0.4.4 wieder
  gesichert, +2,06 Punkte (68,83 → 70,90 %, Spanne +1,11 bis +3,03), kein Feld schlechter. Runde 3 (mehr Lernmaterial) brachte 0,00.
- **Runde 2 ist nachgewiesen (Welt 3, einmal gemessen, Text und gesetzte Fassung mit Barcode/QR zusammen):**
  neu gegen 0.4.4 **+2,72 Punkte, gesichert** (76,18 → 78,89 % von 1 952 Feld-Urteilen, 90-%-Spanne +1,56 bis +3,70, p ≈ 0,0006);
  neu gegen das bisherige Vorgehen **+2,66 Punkte, gesichert** (Spanne +1,73 bis +3,63). **Kein Feld schlechter.**
  Damit ist Regel R2-4 erfüllt; die Übernahme in die Familienakte wartet auf Klaus' Ja.
- Was der Kern jetzt lernt (alles „raten → Korrektur → lernen“, gemitteltes Perzeptron, nur aus Fehlern):
  **Art** (`lib/artmodell.ts`), **Absender-Wahl** (`lib/absenderwahl.ts`) und **Frist-Wahl** (`lib/fristwahl.ts`) – die beiden
  Wahlen greifen nur, wenn die feste Regel unsicher ist. Daten nur über `scripts/*-lernen.mjs`.
- Runde 1 (Prüfstadt) war knapp **nicht** gesichert (+1,17, Spanne −0,10 bis +2,29) – daraus gelernt, dann Runde 2.

| Welt 3, je Feld (neu gegen 0.4.4) | Text | gesetzt (Scan/Foto, Barcode/QR) |
| --- | --- | --- |
| Art des Schriftstücks | 72,0 → **80,0 %** (p = 0,009) | 66,0 → **73,0 %** (p = 0,034) |
| Absender | 79,4 → 81,4 % | 56,3 → **59,3 %** (6 gegen 0, p = 0,031) |
| Frist | 92,0 → **94,5 %** (5 gegen 0) | 82,0 → 83,5 % |
| Bereich | 78,5 → 80,5 % | 78,0 → 78,5 % |
| Person | 84,7 → 84,7 % | 73,4 → 73,4 % |
| **alle Felder** | 81,25 → **84,22 %** (+2,97, gesichert) | 71,11 → **73,57 %** (+2,46, gesichert) |

### Runde 1 (Prüfstadt, zuerst)

- Die Schleife „raten → Korrektur → lernen“ ist gebaut: zwei **gelernte Bausteine** im Kern, die nur aus Fehlern lernen
  (gemitteltes Perzeptron): **Art des Schriftstücks** (`lib/artmodell.ts`, Wörter nach Lage im Brief) und **Absender-Wahl**
  unter den Zeilen des Schriftstücks (`lib/absenderwahl.ts`, greift nur, wenn die feste Regel unsicher ist). Daten erzeugt von
  `scripts/artmodell-lernen.mjs` und `scripts/absenderwahl-lernen.mjs` (nie von Hand ändern).
- **Prüfstadt (einmal gemessen, Text):** neu gegen 0.4.4 **+1,17 Punkte** über alle Feld-Urteile (82,60 → 83,78 %),
  **nicht gesichert** (90-%-Spanne −0,10 bis +2,29, p ≈ 0,07). Neu gegen das bisherige Vorgehen (nur Wortmodell neu lernen)
  **+1,17 Punkte, gesichert** (Spanne +0,12 bis +2,25, p ≈ 0,04).
- Getragen von der **Art: 74,5 → 80,5 %** (McNemar 11 gegen 23, p = 0,058). Absender +0,5, Bereich **−1** (das neu gelernte
  Wortmodell; das bisherige Vorgehen verliert dort genauso), Person und Frist unverändert.
- **Gesetzte Fassung mit Barcode/QR, Scan und Foto (Nebenzahl):** neu gegen 0.4.4 **+2,56 Punkte, gesichert**, Absender 31,5 → 39,0 %.
- Nach den vorab festgelegten Regeln (Hauptzahl Punkt 8 **und** Punkt 10) ist die Übernahme in die Familienakte **nicht** gedeckt:
  die Hauptzahl verfehlt die Grenze knapp. Der Kern dieses Zweigs bleibt ein Kandidat; ein zweiter unabhängiger Nachweis wäre nötig.

## Was gemacht wurde

1. **Recherche** mit acht Agenten (sechs Themen, Zusammenfassung, Gegenprüfung der Quellen): stärkstes passendes Verfahren ist das
   fehlergetriebene Lernen nach Brill; Warnungen vor Selbst-Training und vor Tests an der eigenen Welt; „einfach → schwer“ bringt laut
   Quellen kaum Genauigkeit.
2. **Zwei Städte von getrennten Agenten:** Lernstadt „Beispielhafen“ (Planer, vier Absender-Gruppen, Fallen-Autor mit 60 bewusst
   schweren Stücken; 240 Stücke, `pruefstapel-stadt-lern/`) und Prüfstadt „Musterbach“ (anderer Planer, andere Absender-Agenten,
   drei Einordner; 200 Stücke, `pruefstapel-stadt-pruef/`).
3. **Versuche reihum** an sieben verbrauchten Stapeln (alles Abstimmung, kein Nachweis):

| Versuch | Ergebnis reihum |
| --- | --- |
| Brill-Regelschicht über der Ausgabe | +0,25 Punkte – zu wenig; Placebo (vertauschte Korrekturen) verdirbt stark → braucht saubere Korrekturen |
| Regel/Modell-Zusammenspiel lernen (Schwelle, Zuverlässigkeit je Regel) | nichts |
| **Perzeptron für die Art** (Lage im Brief) | Art im ganzen Kern 80,4 → 84,8 % |
| Perzeptron für den Bereich | nicht besser als das Wortmodell (85,0 gegen 85,3) – bleibt |
| **Absender-Wahl gelernt** | Absender 81,9 → 84,1 % (Stapel „anderes Schreibsystem“ 58 → 79 %) |
| Gesamt (alle fünf Felder) | 0.4.4 85,65 · bisheriges Vorgehen 86,04 · **neu 87,48 %**, an jedem Stapel ≥ bisheriges Vorgehen bis auf −0,1 |

4. **Messgrundlage geprüft:** Die drei Einordner sind sich je Paar zu 94–100 % einig (Prüfstadt: Bereich 97,7, Art 97,0,
   Absender 94,0, Person 94,3, Frist 99,7) – Luft nach oben ist da (Kern 81–92 %).

## Was die Prüfstadt zeigt (Grenzen)

- Der Gewinn reihum (+1,4 bis +1,8 Punkte) schrumpft an der fremden Stadt auf +1,2 – erwartbar (Recherche: frische Welten sind schwerer).
- Von 39 Absender-Fehlern sind 16 nur Zusatz/Abteilung („Stadt Musterbach“ statt „Stadt Musterbach Bürgerbüro“) – das genaue Maß ist streng.
- Die Lernstadt half nicht als Lernmaterial (Soll nur vom Schreiber, eigenwillige Absender-Angaben wie „… Onlinehändler“) und blieb
  Teststapel. Die Fallen-Stücke waren für den Kern schwer (Lernstadt gesamt 75–76 %).
- Kosten: App-Paket +245 KB (Art-Modell 453 KB als Daten, gzip 222 KB gesamt).
- Erfundene Unterlagen von Claude-Agenten; die gesetzte Fassung (Barcode/QR) steht unten als Nebenzahl.

## Gesetzte Fassung (Nebenzahl, Simulator 3 mit Barcode/QR)

Ein eigener Agent (Simulator 3, `pruefstapel-stadt-pruef/sim3/`) hat die 200 Stücke wie heutige Unterlagen gesetzt: Briefkopf mit
Wort- und Bildmarke, Anschriftfeld, Infoblock, Tabellen, Fußzeilen; **103 Stücke mit Codes** (Code128 47, Datamatrix-Frankierung 39,
Überweisungs-QR 34, Strichcode auf Bescheiden 25, QR-Link 12); 111 PDF-Scans, 89 Handyfotos, Güte gut 66 / mittel 63 / schlecht 71.
Gelesen mit der Texterkennung der App, einmal gemessen:

| Vergleich | alt | neu | Differenz | 90-%-Spanne | Ergebnis |
| --- | --- | --- | --- | --- | --- |
| neu gegen 0.4.4 | 67,66 % | 70,22 % | **+2,56** | +1,01 bis +4,10 | gesichert (p ≈ 0,003) |
| neu gegen bisheriges Vorgehen | 67,98 % | 70,22 % | **+2,24** | +0,95 bis +3,48 | gesichert (p ≈ 0,005) |

Je Feld (neu gegen 0.4.4): **Absender 31,5 → 39,0 %** (17 gegen 2, p < 0,001), Art 72,5 → 75,5 %, Bereich 77,5 → 79,0 %,
Person und Frist gleich. Der Absender aus Scans und Fotos bleibt trotzdem schwach (39 %); die Lesegüte ist die Grenze
(Wortfehler 19–57 % je Form und Güte).

**Einordnung:** Die Hauptzahl (Text) ist nach den Regeln nicht gesichert gegen 0.4.4; die gesetzte Fassung ist es. Beides zusammen
ist ein deutlicher Hinweis, aber kein Freibrief: Hauptzahl war vorab der Text.

## Runde 2 im Einzelnen

- Lernmaterial zusätzlich: die verbrauchte Prüfstadt als Text **und so, wie die App die gesetzten Stücke liest** (`pruefstapel-stadt-pruef-ocr/`,
  `scripts/gesetzt-texte.mjs`) – Lernen mit echten Lesefehlern.
- Neu: **Frist-Wahl** (Kandidaten = alle Daten im Text, Regel-Vorschlag, „keine Frist“; Merkmale Wörter davor/danach, Uhrzeit, Wochentag,
  Abstand zum Briefdatum). Art-Merkmale um das Briefende erweitert (Gruß, Rechtsbehelf, „bitte überweisen“); „sicher“ erst ab Abstand 25.
- Reihum (9 Teststapel): 0.4.4 83,25 · bisheriges Vorgehen 83,88 · neu 85,45 %.
- **Welt 3** „Beispielstadt-Nord“ (Großstadt, neue Agenten, sechs Haushalte u. a. Familie mit Aufenthaltstitel, Imbiss, Studentinnen),
  200 Stücke, drei Einordner (ein Absender strittig). **Simulator 4** (eigener Agent): 110 PDF-Scans, 90 Fotos, je ein Drittel gut/mittel/schlecht,
  69 mit Codes (Datamatrix-Frankierung 38, Code128 28, Strichcode auf Bescheiden 18, Überweisungs-QR 11, QR auf Bons/Links 9).
  Lesegüte: Wortfehler 34–74 % je Form und Güte (schlechte Fotos: nur 45 % der Wörter gefunden).
- Personen-Zuordnung: unverändert – sie läuft nur in der Messung, nicht in der App.

## Grenzen

- Erfundene Unterlagen von Claude-Agenten (Schreiber, Einordner, Setzer); kein Nicht-Claude-Einordner, keine echten Unterlagen, kein Gerät.
- Absender aus schlechten Scans/Fotos bleibt schwach (59 %); die Lesegüte ist die Grenze.
- App-Paket wächst von 0,66 auf 1,19 MB (gzip 214 → 285 KB), vor allem durch das Art-Modell (685 KB Daten).

## Nächste Schritte (Vorschlag)

- **Familienakte:** Kern nachziehen (`tools/sortierkern-nachziehen.mjs` dort) und dort messen – nur mit Klaus' Ja.
- Art-Modell verkleinern (ganzzahlige Gewichte, weniger Merkmale) und prüfen, was es kostet.

- Einen zweiten, unabhängigen Nachweis bauen, bevor etwas in die Familienakte geht (Regel 8 der Gruppe).
- Art: die häufigsten Restfehler sind „Aufforderung ← Brief“ und „Mahnung ← Rechnung“ – mehr Lehrmaterial mit drei Einordnern genau dafür.
- Bereich: das neu gelernte Wortmodell verliert an der Prüfstadt 1 Punkt – nicht übernehmen, ohne es eigens zu prüfen.
