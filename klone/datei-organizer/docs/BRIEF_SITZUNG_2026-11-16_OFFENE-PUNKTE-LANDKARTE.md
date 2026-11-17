# Brief an die nächste Sitzung (16.11.2026): offene Punkte der Landkarte, Datei-Organizer

Klaus 16.11.: Freibrief – die Punkte selbstständig umsetzen, eigene geprüfte PRs zusammenführen, nichts nachfragen.
Ausgeben (APK, Windows) weiter nur mit seinem Wort. Sichtbares muss ins Design passen: Knöpfe passend zueinander, keine Leerräume,
keine Doppelung, an der Stelle, wo es Sinn ergibt.

## Stand
- Datei-Organizer **0.4.12** ist draußen (Android, Windows, Basic), Quellen stehen auf 0.4.13. Nachweis `docs/VEROEFFENTLICHUNG-0.4.12.json`.
- In 0.4.13 liegen schon (auf main bzw. #56): Update-Fähnchen prüft öfter, Landkarte auf dem Stand.
- **Übernahme in die Familienakte ist gebaut** (Familienakte #203, geht in 2.28.71): Ordner dort als Eingangsordner wählen,
  `organizer-index.json` wird Vorschlag im Prüf-Fenster. Grenzen: nur Dateien direkt im Ordner, Frist nur als Hinweis.
- Kern (`lib/`) unverändert seit `e4205fa`. Familienakte und Private Brain Pro ziehen ihn mit Familienakte #199 nach;
  **BookLedgerPro noch nicht** (dort `tools/sortierkern-nachziehen.mjs`).
- Abgleich mit der Sitzung Private Brain Pro: `BRIEF_ABGLEICH_2026-11-16_PRIVATE-BRAIN-PRO.md` im Repo Meine-Familienakte (vor jeder
  Übernahme oder Ausgabe dort eintragen und lesen).

## Offene Punkte, in dieser Reihenfolge
1. **Kern in BookLedgerPro nachziehen** (englische Rechnungen, `e4205fa`), danach Basic. Keine App-Ausgabe ohne Klaus' Wort.
2. **Übernahme vertiefen:** Unterordner (der Organizer kennt Pfade, der Eingangsordner der Familienakte liest nur oben);
   Frist des Organizers als Frist-Vorgabe im Prüf-Fenster (`fristVorgabe`), wenn sie „von dir“ bestätigt ist.
3. **Umbenennen und Verschieben** im Organizer (Seite Finden; per Ziehen am Rechner, per Menü am Tablet). Originale ändert der
   Organizer bisher nie – das ist eine neue Art Eingriff: nur mit Rückgängig und nur, wo der Ordner Schreiben erlaubt.
4. **Eigene Muster des Nutzers** (Bedienung zur Fachregel `docs/FACHREGEL.md`: eigene Muster gehen vor) und **Zweitfach** im Kern.
   Kernänderung → messen wie in `docs/PRUEFREGELN-GRUPPE.md`, danach in Familienakte, Private Brain Pro, BookLedgerPro nachziehen.
5. **Lehrer** (Claude Haiku über den Hetzner-Server, KimHub `schicht/api.mjs`; nur Ausschnitte, Namen verdeckt; Schlüssel nur auf dem
   Server) und **Vorarbeit für andere Programme/KI** (Steckbrief, Text, Abschnitte stehen schon im Index).
6. **Outlook-Dateien** (MSG/PST) und gespeicherte Mails mit englischem Kopf.

## Nur Klaus am Gerät
- Große Mengen über rund 800 Dateien, SD-Karte am Tablet (nichts gemessen).
- 0.4.12: Leiste des Intro-Videos, Übersicht nach Stadtwechsel, Start mit der Übersicht.
- 0.4.13: erscheint das Update-Fähnchen von selbst? (Ursache nicht belegt, nur die wahrscheinlichste Stelle behoben.)
- Familienakte 2.28.71: Eingangsordner mit `organizer-index.json` auf dem Gerät (Android-Ordner nur über die gestellte Hülle geprüft).

## Nicht ohne Klaus' Wort
- Keine weiteren Filme oder Higgsfield-Kosten; die Filme sind von Klaus abgenommen („perfekt“).
- Keine App-Ausgaben. Vier-Abschnitte-Umbau von Discovery, drittes Kurzvideo, Runden als Filmfolgen: nur als Drehbuch.

## Startauftrag zum Einfügen
```
Repo Datei-Organizer (dazu Meine-Familienakte, BookLedgerPro, BookLedger-Basic). Lies zuerst CLAUDE.md und
docs/BRIEF_SITZUNG_2026-11-16_OFFENE-PUNKTE-LANDKARTE.md, dann im Repo Meine-Familienakte
BRIEF_ABGLEICH_2026-11-16_PRIVATE-BRAIN-PRO.md. Freibrief von Klaus: die offenen Punkte der Reihe nach selbstständig umsetzen,
eigene geprüfte PRs zusammenführen, nichts nachfragen. Beginne mit Punkt 1 (Kern in BookLedgerPro nachziehen), dann Punkt 2.
Nicht: App-Ausgaben ohne Klaus' Wort, neue Filme, Änderungen an byte-gleichen Bausteinen von Hand, echte Daten im Repo.
```
