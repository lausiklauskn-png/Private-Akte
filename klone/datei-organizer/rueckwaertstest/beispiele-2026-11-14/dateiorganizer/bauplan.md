# Bauplan · V-2026-0001 · Fassung 2

Kunde: ⟦KUNDE-1⟧ · Grundlage: Bauauftrag Fassung 2 vom 2026-11-13 (erzeugt mit Workflow-Needs). Keine frühere Fassung – alles unter „Zu tun“ wird neu gebaut (K-01 bis K-11). Keine Zeile ist UNVERÄNDERT, ENTFERNEN oder NOCH NICHT GESCHÄTZT.

## 1. Zweck und Nutzer

Ein Werkzeug zur **Eingangskontrolle und Vorsortierung**: Scans, Handyfotos, Mail-Anhänge und Altbestand (B-02, B-05) werden in **einen Eingangsordner** geworfen und vom Werkzeug Klick für Klick feiner gesiebt, bevor sie in die Familienakte gehen (B-13, B-31: erst einwerfen, dann sieben, dann übernehmen). Heute liest die Akte jede Datei einzeln und rät Bereich und Frist aus dem Dateinamen (B-03); Doppelte und falsche Endungen fallen niemandem auf (B-10, B-11); jedes Programm liest dieselbe Datei neu (B-12).

Nutzer: Inhaber (1) und Mitarbeiter Büro/Ablage (2) (B-06, B-07). Unterlagen: Briefe, Rechnungen, Bescheide, Verträge, Kassenbons, Fotos, E-Mails mit Anhängen (B-37); personenbezogene Daten: ja (B-38).

Ziel (B-20): ein Stapel von hundert Dateien ist in Minuten vorsortiert, zur Bestätigung bleibt nur das Unsichere.

## 2. Plattformen, Datenort, Sicherung, Netz

- Geräte: Browser, Tablet, Windows-PC, Android-Handy (Rahmen); Browser am PC mit Ordnerwahl und am Handy (B-34). Als **installierbare Web-App** (K-06).
- Ohne Internet: immer (Rahmen, B-33). Kein Abgleich zwischen Geräten – ein Gerät reicht.
- Daten nur auf dem Gerät, eigener Ordner / Speicherkarte; auf der SD-Karte **neben** dem verschlüsselten Tresor, nicht darin (B-34). Keine Datei geht an einen Server (B-39).
- Originale werden nur gelesen; geschrieben wird höchstens `organizer-index.json` (B-15, B-23, N-01).
- Sicherung: vom Nutzer selbst angestoßen (Rahmen).
- Erkennung nur mit Regeln, Mustern und kleinen Modellen auf dem Gerät, kein großes Sprachmodell (B-41).
- KI laut Rahmen „über einen Dienst (nach Bestätigung)“ – siehe Widerspruch unter 8.

## 3. Bereiche/Seiten

Aus dem Auftrag ableitbar (Seitennamen selbst nennt er nicht):
1. **Eingang** – Ordner wählen bzw. Dateien per Ziehen und Ablegen einfügen (B-49), Ladebalken.
2. **Sieben** – fünf Stufen mit Ergebnis je Stufe, „bitte prüfen“-Liste, Neues zuerst (B-21, B-27, B-49).
3. **Sichten/Baum** – selbstsortierender Baum mit wählbaren Zweigen, Wortsuche (B-16, B-26).
4. **Steckbrief** je Datei (B-25).
5. **Verlauf** mit Rückgängig (B-18, B-21).
6. **Übernahme** in die Familienakte über `organizer-index.json` (B-17, B-36).
7. **Fachregel/Stichprobe** (B-45, B-48, B-50).
Bedienung wie ein Explorer, Erklärungen nur hinter einem Fragezeichen (B-30).

## 4. Funktionen

1. **K-01 Sortier-Kern** (B-13, B-21, B-22, B-25, B-28, B-29) – fünf Siebe in fester Reihenfolge: Art → Kopf → Bereich und Nummern → Absender → Inhalt. Jede Stufe liest nur, was sie braucht (Dateikopf, oberes Drittel der ersten Seite, Briefkopf), den ganzen Text erst zuletzt. Jede Stufe zeigt ihr Ergebnis, einzeln rückgängig. Steckbrief: Art, Absender, angesprochene Person, Datum, Betreff, Nummern, Bereich, Fristen, Beträge, Prüfstand, Herkunft. Lesen von Mails samt Anhängen, docx/odt, PDF, Fotos mit Aufnahmedaten. Archivnummern `A-JJJJ-NNNN` nur auf Knopf, nur für fertig gesiebte Dateien, unveränderlich. Prüfbar: Testordner durchsieben, jede Stufe einzeln zurücknehmen; Nummer bleibt nach erneutem Sieben gleich.
2. **K-02 Eingangsprüfung** (B-14, B-24) – Dateiart am Kopf bestimmen, Fingerabdruck, Doppelte erkennen; auffällige Dateien (Endung passt nicht zum Kopf, Daten hinter dem Bildende, Programme, Makros) anhalten und nicht weitergeben. Vorlage Auslieferungsprüfer (70 %).
3. **K-03 Sichten** (B-16, B-26) – Baum nach Datum, Art, Absender, Person, Frist, Nummer, Bereich; Wortsuche; nichts wird verschoben. Vorlage Company Brain (40 %).
4. **K-04 Nur lesen, Begleitdatei, Verlauf** (B-15, B-18, B-23) – Sortierung nur in `organizer-index.json`; Korrekturen merken und daraus besser werden; jeder Schritt rückgängig. Vorlage Datei-Post (60 %).
5. **K-05 Index-Format** (B-17, B-36) – `organizer-index.json` als offenes Format, aus dem die Familienakte automatisch zuordnet.
6. **K-06 Testordner und Web-App** (B-19, B-42) – 101 erfundene Dateien, nur erfundene Daten; installierbare Web-App.
7. **K-07 Kern 0.2/0.3** (B-43, B-55) – Wortmodell für Bereich und Art, neue Regeln für Absender, Frist und Person; Nachweis an fremden, gescannten Stapeln mit drei unabhängigen Einordnern, Regeln vorab festgelegt. Fristen aus Zeiträumen, Skonto, Angebotsbindung und Briefdatum (B-53).
8. **K-08 Texterkennung** (B-44) – Fotos und gescannte PDFs ohne Textebene, auf dem Gerät. Vorlage Workflow PDF (70 %).
9. **K-09 Fachregel, Merken nach Sache, Stichprobe** (B-45, B-46, B-48, B-50) – Fachregel als Datentabelle: passt ein Schriftstück in zwei Fächer, entscheidet die Sache, nicht der Absender; Handzuordnung gewinnt immer und wird nie überschrieben; Absender + Vorschlag ergeben gemerkt den Bereich; Stichprobe der eigenen Unterlagen liefert nur Zahlen je Feld, nichts verlässt das Gerät.
10. **K-10 Kern als JavaScript** (B-47, B-51, B-54) – zusätzlich ohne Bau-Schritt bereitgestellt, byte-gleich mit Pin übernehmbar; Familienakte nutzt Bereich und Frist, Buchhaltungs-App den Aussteller; keine zweite Fassung.
11. **K-11 Bedienung** (B-49, B-52) – Ladebalken, Aktualisieren mit Hinweis auf neue Fassung (Update-Fähnchen), Organizer leeren, einzelne Dateien entfernen (nur die Liste ändert sich, „Zurück“ angeboten), Ziehen und Ablegen, Neues zuerst.
12. **Vorschlagen statt handeln** (Rahmen) – bei B-13, B-15, B-17 schlägt das System vor, der Kunde bestätigt. Unsicheres → „bitte prüfen“ (B-27).

## 5. Schnittstellen zu anderen Programmen

- **Familienakte**: übernimmt den sortierten Ordner über `organizer-index.json` und ordnet automatisch zu (B-17, B-35, B-36); nutzt den Kern für Bereich und Frist (B-54).
- **Buchhaltungs-App**: nutzt den Kern für den Aussteller (B-54).
- Gemeinsamer Ablageort, Dateien hin- und hergeben (Rahmen).
- Kern als JavaScript mit Pin für Apps ohne Bau-Schritt (B-51).

## 6. Ausdrücklich nicht

- N-01: Originale werden nie verändert oder verschoben (auch nicht beim Entfernen, B-52).
- Kein großes Sprachmodell in dieser Fassung (B-41).
- Kein Abgleich zwischen Geräten; keine Datei an einen Server (B-39).
- Keine echten Daten im Testordner (B-42).
- Keine zweite Fassung des Kerns (B-47).

## 7. Abnahme

- Je Baustein K-01 bis K-11 gegen die gedeckten Bedarfe (Tabelle oben).
- Ohne eigenen Baustein, trotzdem abnehmen: B-21, B-22, B-23, B-24, B-25, B-26, B-27, B-28, B-29, B-50, B-51, B-52, B-53.
- Prüfbar: (a) Testordner mit 101 Dateien läuft offline durch alle fünf Siebe; (b) Originale nach dem Lauf byte-gleich, nur `organizer-index.json` neu; (c) präparierte auffällige Dateien und Doppelte werden angehalten; (d) Hundert-Dateien-Stapel in Minuten (B-20); (e) K-07: an fremden Stapeln messbar besser als vorher, mit drei Einordnern und vorab festgelegten Regeln (B-55); (f) Kern-JS byte-gleich mit Pin in Familienakte und Buchhaltung.

## 8. Offene Fragen und Widersprüche im Auftrag

1. **KI über einen Dienst** (Rahmen) widerspricht B-39 („keine Datei geht an einen Server“) und B-41 (nur Regeln/kleine Modelle). Was darf an den Dienst gehen, und wofür?
2. **O-01**: Wo liegt der Eingangsordner am Tablet? (Inhaber, bis 2026-11-15)
3. **O-02**: Eigene Regeln des Nutzers erst als Vorschau zeigen – Form der Vorschau offen (Inhaber, bis 2026-11-20). Verhältnis zur Fachregel ab Werk (B-50) ungeklärt.
4. **Fassung 0.2/0.3** (K-07) obwohl „keine frühere Fassung“ – gegen welchen Ausgangsstand wird „nachweislich besser“ gemessen? Welche fremden Stapel, wer sind die drei unabhängigen Einordner, welche Schwelle gilt?
5. **Format von `organizer-index.json`** ist nicht beschrieben (Felder, Versionierung, wo es liegt, wenn der Ordner schreibgeschützt ist).
6. **Bereichsliste** (Fächer der Akte) und die Fachregel-Tabelle selbst sind nicht angegeben.
7. **„Pin“ / byte-gleich**: Wie wird der Pin geführt (Prüfsumme, Commit?) und wer zieht nach?
8. **Windows/Android**: nur Web-App, oder native Hüllen? Der Auftrag nennt beide Geräte, aber nur „installierbare Web-App“. Ordnerwahl am Handy-Browser ist eingeschränkt.
9. **Sicherung „selbst anstoßen“**: was gesichert wird (Index, Gelerntes, Verlauf?) und wohin, ist offen.
10. **„Auffällige anhalten, nicht weitergeben“**: wohin gehen angehaltene Dateien und wer gibt sie frei?
11. **Archivnummern**: Zähler je Jahr? Reihenfolge der Vergabe bei vielen Dateien?
12. **Texterkennung**: Sprachen, Seitenzahl je Datei, Dauer am Handy – nicht festgelegt. Faktor „Druck/PDF ×1,1“ ohne Erklärung.
13. **Vorlagen** (Auslieferungsprüfer, Company Brain, Datei-Post, Workflow PDF) sind nur benannt; was davon wiederverwendet wird, steht nicht im Auftrag. K-10 hat Vorlage „–“ bei 60 % Wiederverwendung.
14. Sieb 3 heißt „Bereich und Nummern“ – welche Nummern (Kunden-, Rechnungs-, Aktenzeichen)?
15. Mail-Formate (.eml, .msg, mbox?) nicht festgelegt.
