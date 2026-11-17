# Brief für die nächste Sitzung – Rückwärtstest: Bedarfsanalyse (Workflow Needs) an den fertigen Apps

Auftrag Klaus 13.11.2026. Wenig Text, Ergebnis zuerst. Es gelten `docs/PRUEFREGELN-GRUPPE.md` (Regeln vorab, einmal messen, nichts
schönen) und die CLAUDE.md der beteiligten Repos. Forschungseinträge nur nach KimHub.

## Die Frage

Führt eine Bedarfsanalyse mit **Workflow Needs** – und der daraus erzeugte Auftrag (Prompt) an eine Claude-Code-Sitzung – zu ungefähr
der App, die wir schon haben? Geprüft wird rückwärts an vier fertigen Apps: **Familienakte, BookLedgerPro, Workflow PDF Pro,
Private Brain Pro**. Gebaut wird dabei **nichts**; es gibt nur einen **simulierten Bau** (Bauplan auf dem Papier).

## Ablauf je App (vier Durchgänge, getrennt)

1. **Referenz einfrieren (vorab, bevor irgendetwas simuliert wird):** aus der fertigen App eine Merkmalsliste ziehen – Zweck, Nutzer,
   Plattformen, Hauptbereiche, Kernfunktionen, Datenhaltung/Sicherheit, Schnittstellen zu den anderen Apps, bewusste Grenzen.
   Quelle: CLAUDE.md, Hilfe-Texte, `lib/app-stand.ts` (Familienakte), `docs/PULS.md` (BookLedgerPro), `docs/PRODUKTSTAND.md`
   (Workflow PDF Pro). 30–60 prüfbare Merkmale je App, je mit Gewicht (Kern / wichtig / Beiwerk). Datei
   `rueckwaertstest/<app>/REFERENZ.json`, eingecheckt **vor** Schritt 2.
2. **Kunde simulieren:** ein Agent **ohne Zugang zur App, zum Repo und zur Referenz** spielt den Kunden, der genau so eine App haben
   wollte. Er bekommt nur eine kurze Kundenkarte (wer er ist, was ihn stört, was er heute benutzt, was ihm wichtig ist) – in
   Alltagssprache, ohne Funktionsnamen der fertigen App. Die Kundenkarte schreibt ein zweiter Agent aus der Referenz und übersetzt
   Funktionen in Bedürfnisse („ich finde meine Unterlagen nicht wieder“, nicht „Bedeutungssuche“). Pro App **drei Kunden**
   (verschieden gesprächig, einer vergisst Wichtiges, einer will Unnötiges).
3. **Bedarfsanalyse fahren:** der Kunden-Agent beantwortet die Fragen von Workflow Needs so, wie die App sie stellt (Fragebogen und
   Datenmodell aus dem Repo `Workflow-Needs` lesen; die App selbst wird nicht geändert). Ergebnis: der ausgefüllte Bedarf und der
   **Prompt/Auftrag**, den Needs für die Claude-Code-Sitzung erzeugt. Beides ablegen.
4. **Prompt prüfen (Lesen, nicht bauen):** Ist der Auftrag vollständig, eindeutig, ohne Widerspruch? Was fehlt gegenüber der Referenz,
   was ist zu viel? Liste mit Fundstellen.
5. **Simulierter Bau:** ein frischer Agent **ohne Kenntnis der fertigen App** bekommt nur den Prompt und liefert einen Bauplan:
   Bereiche/Seiten, Funktionen, Datenhaltung, Plattformen, Reihenfolge der Bauschritte, offene Fragen an den Kunden. Kein Code.
6. **Vergleich:** Bauplan gegen `REFERENZ.json`, Merkmal für Merkmal: getroffen / teilweise / fehlt / zusätzlich. Zwei unabhängige
   Bewerter (zweiter Claude-Agent, Codex über den Briefkasten, wenn Klaus das Zeichen gibt); Soll = Mehrheit. Berichtet wird je App:
   Anteil getroffener Kern-Merkmale mit Spanne, die fehlenden Kern-Merkmale namentlich, die größten Zusätze.

## Vorab festlegen (in `rueckwaertstest/REGELN.md`, vor Schritt 2)

- Was „ungefähr dasselbe Ergebnis“ heißt: Vorschlag **≥ 80 % der Kern-Merkmale getroffen, kein Kern-Merkmal ins Gegenteil verkehrt**;
  Klaus kann die Grenze ändern, aber vor der Messung.
- Dichtheit: Kunden- und Bau-Agenten sehen weder Repo noch Referenz noch die Namen der fertigen Apps. Die Kundenkarte wird von einem
  Dritten gegengelesen, ob sie Funktionsnamen verrät.
- Je App einmal messen. Was beim ersten Durchgang auffällt (Fragen fehlen in Needs, Prompt lässt etwas weg), wird als Befund notiert und
  erst danach an Needs verbessert – der nächste Nachweis braucht dann neue Kunden.

## Was dabei herauskommen soll

- Je App zwei Zeilen an Klaus: Trefferquote Kern, die drei wichtigsten Lücken.
- Eine Liste für Workflow Needs: welche Fragen fehlen, welche Antworten gehen auf dem Weg zum Prompt verloren, was der Prompt
  anders sagen müsste. **Needs wird in dieser Sitzung nicht umgebaut**, nur die Liste und (wenn Klaus Ja sagt) eine Vorschau.
- Danach derselbe Lauf für **Workflow Calculate** (Angebot aus dem Bedarf): eigener Brief, erst wenn Needs durch ist.

## Grenzen (gleich mit hinschreiben)

Simulierte Kunden aus der Referenz abgeleitet – sie „wissen“ mittelbar, was herauskam; echte Kunden reden anders. Ein Bauplan ist
kein Bau. Bewerter sind KI-Agenten. Vier Apps desselben Herstellers.

## Daneben offen aus der Sitzung 13.11. (nicht Teil dieses Laufs)

- **Familienakte:** Übernahme aus dem Datei-Organizer bauen – mehrere Blöcke kommen **dazu** (nichts überschreiben); doppelte Stücke
  als Doppelung anzeigen; bei genau gleichem Inhalt (gleicher Fingerabdruck) „auf eine Datei bringen“ anbieten. Erst Vorschau.
- **Datei-Organizer:** Umbeschriften und Verschieben per Drag and Drop; Klaus' Befund „Ordner hochladen zeigt scheinbar den
  Testordner“ am Tablet mit 0.3.2 nachprüfen.
- **Update-Fähnchen** in BookLedgerPro, Workflow PDF (Pro) und Private Brain Pro: Stand siehe Abschlussbrief vom 13.11.
- Gerätetest aller Ausgaben vom 13.11.

## Startauftrag zum Einfügen

```
Repos: Workflow-Needs (zuerst lesen: Fragebogen, Datenmodell, wie der Auftrag an Claude Code entsteht), Datei-Organizer
(docs/BRIEF_SITZUNG_2026-11-14_NEEDS-RUECKWAERTSTEST.md, docs/PRUEFREGELN-GRUPPE.md), dazu lesend Meine-Familienakte, BookLedgerPro,
Workflow-PDF-Pro, Privat-Brain-Pro, Kimhub.
Auftrag: Rückwärtstest der Bedarfsanalyse. Je App (Familienakte, BookLedgerPro, Workflow PDF Pro, Private Brain Pro):
1. Merkmalsliste der fertigen App einfrieren (REFERENZ.json) und Regeln vorab einchecken (Grenze: 80 % der Kern-Merkmale).
2. Drei simulierte Kunden (Agenten ohne Zugang zu App und Referenz) durch Workflow Needs führen; ausgefüllten Bedarf und erzeugten
   Prompt ablegen.
3. Prompt prüfen; mit einem frischen Agenten einen Bau nur simulieren (Bauplan, kein Code).
4. Bauplan gegen die Referenz werten (zwei Bewerter, Mehrheit); je App zwei Ergebniszeilen an mich.
Nichts an den fertigen Apps ändern, Workflow Needs nicht umbauen (nur Liste der Lücken), nichts veröffentlichen.
Wenig Text, Ergebnis zuerst. Forschungseinträge nur nach KimHub. Abschlussbrief mit Stundennachweis.
```
