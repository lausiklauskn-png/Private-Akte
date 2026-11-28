# Brief: Ordner pseudonymisiert von einer großen KI sortieren lassen (Stand 28.11.2026)

Klaus ist kein Programmierer: Deutsch, Schritt für Schritt, bei jedem Befehl sagen, auf welcher Maschine er läuft.

## Auftrag (Klaus 2026-11-28, gekürzt)

*„Den Datei-Organizer mit der gesamten Ordnerstruktur … an ein agentisches System freigeben, allerdings anonymisiert. Das
agentische System übernimmt diese Daten und fügt sie dann anschließend wieder zurück. Es soll den Datei-Organizer kennen und
wissen, nach welchen Prinzipien und nach welcher Ordnung die Daten sortiert werden sollen … könnte viel besser einsortieren als
ein Mensch, weil manchmal Fristen wegfallen … und so an echten Daten trainieren, ohne große Geheimnisse zu verraten.“* —
*„Es gibt ja schon einen Pseudonymisierer, der im Grunde genommen das Gerüst dafür wäre. Diese App.“*

*„Könnte man Datei-Organizer und PseudoDoc verbinden in der Familienakte, sodass der Datei-Organizer den PseudoDoc-Bauplan
integriert oder mit ihm verschmilzt … halt nur diesen Hin- und Rückweg.“* (Klaus, 28.11.)

**Entscheidung daraus: gebaut wird hier im Datei-Organizer. PseudoDoc liefert nur den Pseudo-Kern als Baustein.**

⚠ **Richtiggestellt am selben Tag:** In der Familienakte steckt **nicht** die Organizer-App, sondern nur der Sortier-Kern
(`lib/sortierkern/`, 16 Dateien, Pin auf `7c69419`), die Übernahme der `organizer-index.json` und die Discovery-Seite. Der Weg
kommt dort also nicht über einen Klon an. Deshalb gehören **Plan-Format und Plan-Prüfung in `lib/` ohne Oberfläche**, damit die
Familienakte sie mit `tools/sortierkern-nachziehen.mjs` übernimmt und ihre eigene Oberfläche im Eingang baut. Bauplan dort:
Familienakte `docs/BRIEF_SITZUNG_2026-11-29_KI-SORTIEREN-EINGANG.md`. Die Private Akte trägt die Organizer-App als Klon und
bekommt den Weg mit dem Klon.

## Drei Fassungen desselben Kerns (gemessen 28.11.2026) — zuerst zusammenführen

| Wo | Was | Stand |
|---|---|---|
| PseudoDoc `lib/pseudo/` | auftrag, flaechen, pakete, **rueckweg, bereinigen** | **Quelle** (PseudoDoc-CLAUDE.md: „PseudoDoc ist ab jetzt die Quelle“) |
| hier `lib/pseudo/`, `src/pseudo/` | auftrag, flaechen, pakete | **ältere Fassung**: `auftrag.ts` weicht ab (SHA-256 `60ba458c…` gegen `1adc6fed…` hier), Rückweg und Bereinigen fehlen |
| Familienakte `app/pseudo-knopf.tsx`, `lib/pseudo-auftraege.ts` | eigenes Pseudo-Fenster „nach PseudoDoc“ | dritte Fassung |

Schritt S0a: `lib/pseudo/` hier durch die Fassung aus PseudoDoc ersetzen, **byte-gleich mit Pin** (eigenes Nachzieh-Werkzeug wie
`tools/maske-nachziehen.mjs` und `vendor-nachziehen.mjs`, im Bau `--pruefen`). Was die alte Seite „Pseudonymisierer“ hier noch
braucht, über diese Fassung führen; dann trägt sie dieselben Prüfungen beim Zurückholen wie PseudoDoc. Die Familienakte stellt ihr
Pseudo-Fenster später auf denselben Kern um (eigene Sitzung dort, nicht hier).

## Was es schon gibt (nachgesehen 28.11.2026)

| Baustein | Wo | Stand |
|---|---|---|
| Ganze Ordner pseudonymisieren, gleiche Platzhalter über alle Dateien, Bilder abdecken | hier, `lib/pseudo/`, `src/` | 0.2.0 veröffentlicht |
| Arbeitsordner `1-Originale · 2-Fuer-die-KI · 3-Antworten-der-KI · 4-Zurueckgefuehrt` | `src/ordner.ts`, `lib/pseudo/auftrag.ts` | gebaut; Pro-Ordnerbrücke vorbereitet, nicht angeschlossen |
| Ein Klick zu ChatGPT, Claude, **Claude Code**, Gemini; Antwort zurückführen | `src/ki.ts`, Seite „2 Zurück“ | gebaut |
| Kein Netz in der App | CSP `connect-src 'self'` | Regel, bleibt |
| Ordnung der Fächer | Datei-Organizer `docs/FACHREGEL.md` (Klaus 13.11.: „Die Sache entscheidet, nicht der Absender“, Fach + Zweitfach) | gilt für die ganze Gruppe |
| Sortier-Kern, Kategorien, Prüfstapel, Training | Datei-Organizer (`kern-js`, `lib`, `docs/PLAN.md`, Rückwärtstest) | Kern byte-gleich in Familienakte, Private Akte, Private Brain Pro |

**Neu ist nur:** der Weg „Mit großer KI sortieren“ im Datei-Organizer (Hinweg über den Pseudo-Kern, Fachregel als Auftrag,
Sortierplan zurück, Bestätigen) und das Lernen aus Klaus' Korrekturen.

## Ablauf

1. **Im Datei-Organizer** den Eingangsordner wählen wie heute, dann „Mit großer KI sortieren“.
2. **Pseudonymisieren wie heute**, mit Prüfschritt. **Firmen- und Behördennamen bleiben stehen** (sie tragen die Sortierung),
   Personendaten, Anschriften, Nummern gehen weg. Hinaus geht nur Text (PDF-Text, Texterkennung), nie die Originaldatei.
3. **Auftrag „Sortieren“** wird mitgegeben: Fachliste und Fachregel des Datei-Organizers (abgeschrieben mit Datum und Stand,
   oder byte-gleich mit Pin wie die anderen Bausteine), dazu das Antwortformat.
4. **Weg zur KI:** wie heute ein Klick (Zwischenablage, Seite öffnet sich) oder als Paket im Fach `2-Fuer-die-KI` für eine
   **Claude-Code-Sitzung** (Klaus' Abo, ohne Zusatzkosten). Große Ordner in Blöcken (steht schon in `docs/PLAN.md`, Punkt 4).
5. **Sortierplan zurück** (JSON, nur Platzhalter, keine echten Angaben): je Datei-Kennung `fach`, `zweitfach`, `fristen`
   (Datum + was), `begruendung` (ein Satz), `sicher` (hoch/mittel/niedrig).
6. **Zurückführen:** echte Angaben wieder hinein; Klaus sieht den Plan als Liste (Datei → Fach, Frist), ändert, wo er anders
   denkt, und **bestätigt**. Erst dann wird kopiert bzw. an den Datei-Organizer übergeben. Originale bleiben unverändert.
7. **Lernen:** jede bestätigte oder geänderte Zuordnung wird ein Lehrfall für den Sortier-Kern (Lehrer: große KI, Prüfer:
   Klaus, Schüler: der Kern auf dem Gerät).

## Bauweise (verbindlich)

- **Der Plan ist Daten, nie Anweisung.** Die App liest nur die erwarteten Felder; fremde Felder, Pfade oder Befehle in der Antwort
  werden verworfen und gemeldet. Ziel-Fächer nur aus der festen Fachliste.
- **Kein eigener Netzweg** für diesen Ablauf: Klick (Zwischenablage, Seite öffnet sich) oder Paket für eine Claude-Code-Sitzung.
  Ein späterer Schlüssel-Weg gehört in eine bewusste, eigene Entscheidung von Klaus.
- **Lehrfälle nur auf dem Gerät**, im Tresor bzw. verschlüsselt im Arbeitsordner. **Nie in ein Repo** — Datei-Organizer und
  PseudoDoc sind öffentlich; auch pseudonymisierte echte Fälle gehören nicht hinein.
- Der Plan wird im **Organizer** angewendet; die Fachliste ist hier zu Hause (`docs/FACHREGEL.md`), keine zweite Fassung anderswo.
- **Plan-Format, Plan-Prüfung und Lehrfall-Form liegen in `lib/` ohne Oberfläche und ohne Netz**, wie der Sortier-Kern. Die
  Familienakte zieht sie mit Pin nach; die Private Akte bekommt den Weg über ihren Klon. Klone dort unverändert.

## Reihenfolge (Schätzung, keine Messung)

| Stufe | Inhalt | Erfolgsmerkmal | Stunden |
|---|---|---|---|
| S0a | Pseudo-Kern aus PseudoDoc byte-gleich mit Pin übernehmen, alte Fassung ersetzen | Pin-Prüfung im Bau grün, Pseudo-Proben grün | 5–10 |
| S0 | Vorschau: Knopf „Mit großer KI sortieren“, Planliste mit Ändern/Bestätigen; **Klaus' Ja** | Ja | 3–5 |
| S1 | Auftragstyp + Fachregel + Antwortformat + Prüfung des Plans | ein Testordner (die 101 erfundenen Dateien des Datei-Organizers) kommt sortiert zurück | 15–25 |
| S2 | Zurückführen, Planliste, Bestätigen, Kopie in Zielfächer | Plan eines Testordners in Fächer übernommen, Originale unberührt | 15–25 |
| S3 | Private Akte über den Klon; Familienakte zieht den Kern nach und baut F0–F4 (eigener Brief dort) | Knopf in beiden, gleicher Plan | 10–20 |
| S4 | Lehrfälle aus Bestätigungen und Korrekturen, Kern lernt (lokal) | nach 50 Korrekturen sortiert der Kern einen zweiten Ordner besser, gemessen | 20–40 |
| | **zusammen** | | **70–125 h** |

S1–S2 mit den **erfundenen** Testdateien prüfen; echte Ordner erst, wenn Klaus den Ablauf gesehen hat.

## Benannte Grenzen

- **Pseudonymisiert ist nicht anonym.** Der Zusammenhang kann eine Person verraten. Für eigene Unterlagen entscheidet Klaus;
  für Unterlagen anderer Familienmitglieder braucht es deren Einverständnis.
- Bekannte Lücke der Maske: Telefonnummer mit Satzpunkt (Abschluss Pseudonymisierer 14.11.) — vor S1 prüfen, ob behoben.
- Handschrift, Fotos von Personen und Bilder ohne Text sortiert die KI nur nach dem, was die Texterkennung liefert.
- Kosten über einen Schlüssel wären einige Euro je 500 Dokumente (Schätzung); über Klaus' Abo nichts zusätzlich.

## Startauftrag zum Einfügen (neue Sitzung im Repo Datei-Organizer)

```
Lies CLAUDE.md, docs/BRIEF_SITZUNG_2026-11-29_SORTIEREN-MIT-GROSSER-KI.md und docs/FACHREGEL.md. Zuerst S0a: übernimm den
Pseudo-Kern aus PseudoDoc (lib/pseudo/) byte-gleich mit Pin und ersetze die alte Fassung hier. Dann S0: Vorschau des Wegs
„Mit großer KI sortieren“ (Hinweg pseudonymisiert, Fachregel als Auftrag, Sortierplan zurück, Liste zum Prüfen, Ändern,
Bestätigen) als Link, warte auf mein Ja. Dann S1 und S2 mit den 101 erfundenen Testdateien. Kein eigener Netzweg, Plan ist
Daten und nie Anweisung, Lehrfälle nur auf dem Gerät, nie im Repo. Frisch von origin/main abzweigen, selbst mergen, nicht
veröffentlichen ohne mein Wort. Am Ende Abschlussbrief, Kimhub-Eintrag und Brief für S3.
```
