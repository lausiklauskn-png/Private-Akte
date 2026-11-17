# Brief für die nächste Sitzung: Sortier-Kern in die übrigen Apps der Gruppe

Geschrieben 13.11.2026. Auftrag Klaus: Kern in BookLedgerPro, Workflow PDF Pro, die Basic-Fassungen und überall dort einbauen,
wo es in der Gruppe um die Familienakte noch möglich ist. Dazu: Kontoauszug als Foto/PDF bis zu den Umsätzen durchziehen.

## Ausgangslage (nachsehen, nicht glauben)

- Kern: Datei-Organizer `lib/` (Pin `534cc08`). Liegt byte-gleich in der Familienakte (`lib/sortierkern/`, Werkzeug
  `tools/sortierkern-nachziehen.mjs`, geprüft von `check:herkunft`). Familienakte 2.28.66 mit dem Kern: Stand der Ausgabe in der
  Familienakte nachsehen (`docs/VEROEFFENTLICHUNG-2.28.66.json`, CLAUDE.md).
- Messwerte und Regeln: `docs/PRUEFREGELN-GRUPPE.md`, `docs/PRUEFSTAPEL-VERMIETERIN-REGELN.md`; Vorgehen zum Wiederholen:
  Sage-Protokol `docs/VORGEHEN_ANLERNEN_UND_NACHWEIS.md`. Überblick: `docs/vorschau/ergebnis-ueberblick-2026-11-13.html`.
- Offen aus dieser Sitzung: Codex-Auftrag 010 (Vermieterin 2026), KimHub-PR #459 (Entwurf), Datei-Organizer-PR #3 (Entwurf).

## Reihenfolge

1. **Bestandsaufnahme je App, bevor etwas gebaut wird** (je ein Satz: was ordnet die App heute selbst zu, womit, was brächte der
   Kern, gemessen an welchem vorhandenen Stapel). Apps: BookLedgerPro, BookLedger Basic, Workflow PDF Pro, Workflow PDF (PWA),
   Private Brain Pro, Familienakte Basic (gleicher Bau wie Pro – nur bestätigen).
2. **Übergabeform für Apps ohne Bau-Schritt:** der Kern ist TypeScript; BookLedgerPro und Workflow PDF laufen build-frei. Im
   Datei-Organizer ein Skript, das den Kern einmal nach JavaScript (ES-Module) übersetzt und mit SHA-256 je Datei ablegt; die Apps
   ziehen diese Ausgabe byte-gleich mit Pin (Werkzeug wie `sortierkern-nachziehen.mjs`). Keine zweite Fassung des Kerns.
3. **BookLedgerPro:** zuerst nur der Aussteller/Absender (gemessen 44 % → 84 % mit Kern); Konto, Betrag, Datum, Steuersatz
   bleiben beim eigenen Belegleser. Vorher/nachher an den Belegstapeln messen. Neue Fassung nur vorbereiten.
4. **BookLedger Basic:** nur über `tools/pro-nachziehen.mjs`, nie von Hand.
5. **Workflow PDF Pro / Workflow PDF:** nur wenn die Bestandsaufnahme eine Stelle zeigt (Vorschlag für Dateiname/Fach beim
   Ablegen in den Tresor). Sichtbares erst als Vorschau, Klaus sagt Ja je Punkt.
6. **Private Brain Pro:** hat keine Fächer wie die Familienakte; erst Vorschau, was der Kern dort vorschlagen soll.
7. **Kontoauszug als Foto/PDF** (Klaus 13.11.): Die Texterkennung liest den Auszug schon (Workflow-PDF-Kern in Familienakte und
   BookLedgerPro; gemessen 84 % der Umsatzzeilen vollständig lesbar). Es fehlt der Schritt danach: BookLedgerPro macht Umsätze
   nur aus Bankdateien (MT940, CAMT, `src/domain/bankimport.js`), nicht aus dem gelesenen Text. Bauen: reiner Leser „Text eines
   Auszugs → Umsätze“ (Tag, Betrag, Gegenpartei, Zweck, Rechnungsnummer) mit Saldo-Gegenrechnung; unsichere Zeilen sichtbar zur
   Prüfung, nichts still buchen. Das Messwerkzeug `scripts/messen-bank.mjs` enthält einen Zeilenleser als Ausgangspunkt. Nachweis
   an einem **neuen** fremden Stapel (die Vermieterin-Auszüge sind dafür verbraucht), Regeln vorab festlegen.

## Daneben: Jahr 2026 abschließen und frischer Stapel (Klaus 13.11., „Punkt 2“)

- **Auftrag 010** (Vermieterin 2026) liegt im Briefkasten der Familienakte (`docs/fremdpruefung/`), Stand „offen“. Sobald Codex
  geliefert hat: Ergebnis unverändert nach `pruefstapel-vermieterin-2026` (+ `-ocr`) übernehmen, mit drei Einordnern neu auswerten
  (`bash scripts/lauf-vermieterin.sh pruefstapel-vermieterin-2026 pruefstapel-vermieterin-2026-ocr vermieterin-2026 merken/vermieterin-2025.json`),
  im Briefkasten quittieren.
- **Frischer Stapel nach dem Einbau:** anderer Lebenslauf (z. B. Witwe mit drei Kindern, Mann verstorben, Nachlass), Regeln vorab,
  Autor ohne Einblick, zweiter Einordner, Codex als dritter über **Auftrag 011**; gemessen wird die Familienakte mit eingebautem
  Kern, einmal.

## Regeln

- Nach jeder Kernänderung in jeder App nachziehen und dort messen. Byte-gleiche Bausteine nie von Hand ändern.
- Nachweis nur an fremden, unverbrauchten Stapeln, drei Einordner, einmal messen, Soll nie ändern, Schwächen berichten.
- Nichts veröffentlichen ohne Klaus' Wort; veröffentlichte Fassungen nicht erneut auslösen. Sichtbares erst als Vorschau.
- Keine echten Unterlagen, keine Schlüssel. Forschungseinträge nur nach KimHub. Kein „@codex review“; Codex nur über den Briefkasten.
- Nächster Prüfstapel: mindestens eine Familie mit drei oder mehr Kindern (fehlte bisher).

## Startauftrag zum Einfügen

```
Repos: Datei-Organizer, Meine-Familienakte, BookLedgerPro, BookLedger-Basic, Workflow-PDF-Pro, Privat-Brain-Pro, Kimhub, Sage-Protokol.
Lies zuerst: Datei-Organizer CLAUDE.md und docs/BRIEF_SITZUNG_2026-11-13_KERN-IN-DIE-GRUPPE.md, dann Familienakte CLAUDE.md.
Auftrag (Klaus): Sortier-Kern aus dem Datei-Organizer in die übrigen Apps der Gruppe bringen, in der Reihenfolge des Briefs:
1. Bestandsaufnahme je App (ein Satz je App), mir kurz zeigen.
2. Übersetzte, gepinnte Ausgabe des Kerns für Apps ohne Bau-Schritt.
3. BookLedgerPro: Aussteller aus dem Kern, vorher/nachher messen; Basic nur per Nachziehen.
4. Workflow PDF Pro und Private Brain Pro: erst Vorschau, ich sage Ja je Punkt.
5. Kontoauszug als Foto/PDF: aus dem gelesenen Text Umsätze machen (BookLedgerPro), Nachweis an neuem fremdem Stapel.
Daneben: Codex-Auftrag 010 auswerten, sobald geliefert; frischer Stapel nach dem Einbau (anderer Lebenslauf, Familie mit drei Kindern), Codex als dritter Einordner über Auftrag 011.
Nicht: veröffentlichen ohne mein Wort, byte-gleiche Dateien von Hand ändern, verbrauchte Stapel als Nachweis nehmen.
Wenig Text, Ergebnis zuerst.
```
