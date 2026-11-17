# Workflow Needs — was der Rückwärtstest gezeigt hat (13.11.2026)

Grundlage: 12 simulierte Kunden (4 Apps × 3), 4 Beispiele aus den fertigen Apps, 20 simulierte Baupläne, je zwei Bewerter.
Ergebnis und Zahlen: `ERGEBNIS.md`. Hier nur, was an Needs liegt.

## Schon behoben (in dieser Sitzung, Repo Workflow-Needs, Zweig ccr-8da46c4f-nb1147)

| Fund | gefunden von | Behebung |
|---|---|---|
| Vorname des Ansprechpartners stand im Klartext im Bauauftrag („klärt Sabine“), obwohl der Kopf „verdeckt: ja“ sagt | Bau-Agenten familienakte-A und private-brain-pro-B | Jeder Namensteil (ab 3 Buchstaben) zählt als bekannter Wert; Probe „VERDECKT“ mit Gegenprobe |
| Summe ≠ Summe der Zeilen — alle 20 Baupläne nennen die Summe; die Bau-Agenten haben nachgerechnet und einen Fehler vermutet | alle | Die Summe nennt jetzt ihre Zuschläge (Anpassung an den Betrieb, Abstimmung, Puffer, Fehlerbehebung); Probe „SUMME“ rechnet nach |
| Kopf `repo: "Workflow-Needs"` las sich als Ziel-Repo | 13 von 20 Bauplänen nennen das Repo (Wortsuche) | Kommentar im Kopf: Werkzeug, nicht Ziel (der Leser von Needs überspringt `# …`) |
| „Muss“ unter der Grenzlinie wirkte widersprüchlich | 13 von 20 Bauplänen sprechen die Grenzlinie an (Wortsuche) | Satz im Bauauftrag: unter der Linie entscheidet der Kunde einzeln, auch bei Muss (Regel unverändert, Probe „GRENZE“ verlangt sie) |
| Keine Meldung, wenn ein Muss-Bedarf ohne Baustein bleibt oder ein Baustein auf einen fehlenden Bedarf zeigt | Klaus | Probe „SCHLÜSSIG“ über alle Beispiele (nur Probe, noch keine Anzeige in der App) |

## Offen — Fragen, die Needs nicht stellt

1. **Plattformen und Geräte.** Bereich 10 bietet „Geräte / offline / mehrere Standorte“. Ob Handy, PC, Browser oder alle drei,
   fragt niemand. Kunde B (knapp) sagte nur „Handy“, und jeder Bau wurde zur reinen Handy-App (Kern-Merkmal „Web-App“ bzw.
   „Windows“ fehlt oder ist verkehrt in 5 von 12 Läufen).
2. **Wo die Daten liegen und wie sie gesichert werden.** Kein eigener Bereich, nur „Datenschutz“. Sicherung fehlte in allen
   B-Läufen und ist dort teils sogar „verkehrt“ (Bau legt alles nur aufs Handy).
3. **Was das System ausdrücklich NICHT tun soll.** Es gibt kein Feld für bewusste Grenzen. Kunden-C-Wünsche (iPhone, Cloud-Abgleich,
   ELSTER, Bankabruf) wanderten als „kann“ in den Auftrag und wurden gebaut; das ergibt die meisten „verkehrt“-Wertungen.
4. **Zusammenspiel mit anderen eigenen Programmen.** Bereich 12 „Schnittstellen“ wird mit Fremdsystemen gefüllt; die Kern-Merkmale
   „gemeinsamer Ablageort“ und „Übergabe an die Schwester-Apps“ fehlen in fast allen Kundenläufen.
5. **Bestätigen statt automatisch.** Ob die Lösung vorschlagen oder selbst handeln soll (Ablegen, Versenden), fragt Needs nicht.
6. **Budget gegen Umfang.** Kunden nennen 50–200 €, der Auftrag rechnet 100–500 h; `euro: nein` blendet den Widerspruch aus, und
   jeder Bau-Agent stolpert darüber. Needs könnte melden, wenn die Schätzung den Budget-Rahmen (Bereich 15) übersteigt.

## Offen — Antworten, die auf dem Weg zum Bauauftrag verloren gehen

7. **Bereich 8 ohne Baustein.** Die „Das System muss …“-Sätze tragen die genauesten Anforderungen, hängen aber an keinem
   Baustein; der Betrieb deckt fast nur Bereich 6. Bau-Agenten bauen nach „Zu tun“ und behandeln Bereich 8 als Beiwerk.
8. **Baustein-Katalog ohne Plattform, Verschlüsselung, Kalender, Mail.** Für „App für Android und Windows“, „verschlüsselter
   Ablageort“, „Postfach“ gibt es keinen Baustein; es landet unter „neu“ ohne Vorlage und ohne Größenbezug.
9. **Größe und Stunden passen scheinbar nicht** („klein“ teurer als „mittel“), weil Wiederverwendung und Faktoren nicht im
   Auftrag stehen. Ein Satz je Zeile („Vorlage X, 60 % wiederverwendet“) würde es erklären.
10. **Doppelungen.** Der Auftrag führt jeden Bedarf dreimal (Änderungen, Vollständiger Stand, JSON); Bereich 8 wiederholt
    Bereich 6. Alle 20 Baupläne sprechen Doppeltes an (Wortsuche „doppel“, also eine Obergrenze).
11. **Datum im Kopf ist das Erzeugungsdatum**, nicht das der Fassung; „bis“-Fristen offener Punkte liegen deshalb scheinbar in der
    Vergangenheit. Bei einer ersten Fassung mit späterem Anlass („Fassung 4, vorher: -“) fehlt der Hinweis, dass es ein Gesamtauftrag ist.

## Was der Bauauftrag anders sagen müsste (Vorschlag, nicht gebaut)

- Oben ein Absatz **„Rahmen“**: Plattformen, Datenort und Sicherung, Konto ja/nein, Netz ja/nein, was ausdrücklich nicht gebaut wird.
- **Bereich 8 als Abnahmekriterien** unter „Zu tun“, je Baustein zugeordnet.
- Der Vollständige Stand nur als JSON (für das Einlesen), nicht noch einmal als Liste.

Needs wird in dieser Sitzung **nicht** umgebaut (Brief). Für die Punkte 1–6 und den „Rahmen“-Absatz wäre der nächste Schritt eine
HTML-Vorschau für Klaus.

## Vorschau für Klaus (13.11.2026)

13 Änderungen (F1–F6 Fragen, A1–A5 Bauauftrag, U1–U2 Umfang) und N1 (Rückwärtstest mit neuen Kunden) als Vorschau mit Ja/Nein/Später:
https://claude.ai/artifact/UKsF4XLDoBMhFtVzSsHx8a. Klaus' Wahl liegt in der Datenbank der Vorschau (Sammlung `antworten`, je Punkt
`wahl`, `notiz`); die nächste Sitzung liest sie dort (`ArtifactData list`) und baut nur Punkte mit Ja. Beispielwerte in den Skizzen erfunden.

## Umgesetzt (13.11.2026, Workflow-Needs #36, auf main) und Runde 2

Alle Punkte 1–5 und 7–11 sowie der „Rahmen“-Absatz sind gebaut (Klaus: Ja zu allen Punkten der Vorschau). Runde 2 mit sieben
Marktideen: alle bestanden (81–100 % Kern), siehe `runde-2/ERGEBNIS.md`. Neue Befunde dort: Budget je Monat, Abgleich zwischen Geräten,
Ort der KI.
