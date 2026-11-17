# Übernahme in die anderen Apps – vorbereitet, nicht ausgeführt (14.11.2026)

> **Berichtigung 14.11.2026:** Die Absender-Regeln (erste Zeile der Tabelle unten) sind nach unabhängiger Prüfung **wieder aus dem Kern** – ihr Gewinn war ein Kreisschluss mit dem eigenen Setzer (`docs/PRUEFBERICHT-EHRLICHKEIT-2026-11-14.md`). Zu übernehmen bleiben nur die zwei Fehlerbehebungen (Zwischensumme, PDF ohne Text), ohne Nachweis am fremden Stapel. **Nichts davon nachziehen, bevor es unabhängig nachgewiesen ist.**

Klaus 14.11.: „Erst den Datei-Organizer trainieren und danach die Werte vorbereiten für die Übernahme in die anderen Apps.“ Bei der
Familienakte vorher prüfen, ob die Sitzung „Pseudonymisierung“ dort noch umbaut – sonst erst am Ende. Diese Sitzung hat **nur das Repo
Datei-Organizer** im Zugriff; in die anderen Repos wurde nichts geschrieben. Nachziehen ist ein eigener Schritt mit Klaus' Ja (Brief, Regel 8).

## Was sich am Kern geändert hat (gegen `05c7ef0`, Fassung 0.3.4–0.4.3)

| Datei | Änderung | Nachweis |
|---|---|---|
| `lib/erkennen.ts` | Absender: Kopfzeilen von Bildschirmfotos und Portalen übergehen, „Von:“ in Mail-Ansichten, Logo-Kürzel davor, Lesereste und Kopfthema dahinter entfernen; Betrag: „Zwischensumme“ ist kein Betrag | Absender aus Scans/Fotos am ungesehenen Stapel **34,1 → 42,7 %, p = 0,0004**; als Text unverändert. Betrag nur am Generator (73 → 86 %), nicht am fremden Stapel |
| `lib/siebe.ts` | PDF ohne lesbaren Text: Absender „unbekannt“ (offen) statt „eigenes Foto“ (sicher) | Fehlerbehebung, nicht eigens gemessen |
| `kern-js/erkennen.js`, `kern-js/siebe.js` | erzeugt aus `lib/` (`node scripts/kern-js.mjs`) | wie oben |

Pins (SHA-256, Anfang): `lib/erkennen.ts` 578cea29…, `lib/siebe.ts` cd0f2f1b…, `kern-js/erkennen.js` 55db1a9c…, `kern-js/siebe.js` 4ed47040…
(vollständig in `kern-js/HERKUNFT.json`). Wortmodell (`lib/wortmodell-daten.ts`) **unverändert** – neu abgestimmt brachte es nichts.

## Je App

| App | Trägt den Kern? | Was zu tun wäre | Vorher prüfen | Wo messen |
|---|---|---|---|---|
| **Familienakte** Pro/Basic | ja, `lib/sortierkern/` byte-gleich (laut CLAUDE.md zuletzt `534cc08`; Stand dort nachsehen) | `tools/sortierkern-nachziehen.mjs` auf den Datei-Organizer-Stand `bf8b1b6` oder später; dort `check:herkunft` | **ob die Sitzung „Pseudonymisierung“ `lib/sortierkern/`, den Eingang (`lib/document-intake.ts`) oder die Texterkennung anfasst** – solange sie läuft, nicht nachziehen (Klaus 14.11.) | am gescannten Stapel dort (Familienakte-Messung `messen-familienakte-stapel.mjs`), Absender gesetzt; Basic per `pro-nachziehen` |
| **BookLedgerPro** und Basic | nur `erkennen.js`/`kategorien.js` aus `kern-js/` mit Pin | `tools/sortierkern-nachziehen.mjs` dort; betroffen ist `erkennen.js` (Absender, Betrag) | ob BookLedgerPro den Betrag aus `erkennen.js` nutzt oder eigene Leser (dort besser gemessen) – dann bringt die Zwischensummen-Regel dort nichts | Belege-Stapel `pruefstapel-blp-*` (verbraucht) nur als Kontrolle; Nachweis an neuem Belegstapel mit langen Bons |
| **Workflow PDF Pro** | nein (liefert Briefkopf-Leser und Prüfkern **an** den Organizer) | nichts zu übernehmen; umgekehrt nutzt der Organizer dessen Tesseract und Prüfkern byte-gleich | – | – |
| **Private Brain** Pro/Basic | nein (nicht nachgesehen, ob Basic denselben Code trägt) | erst entscheiden, ob es den Kern bekommt (Regel 8: nur mit Nachweis) | – | – |

## Was außerdem übernommen werden kann (Werkzeuge, kein Kern)

- `scripts/setzen-komplex.py` und `scripts/leser-node.mjs`: Prüfstapel als echte Scans/Fotos setzen und wie in der App lesen – brauchbar für
  die Familienakte (Eingang mit Texterkennung) und BookLedgerPro (Bons, lange Bons, App-Bons).
- `src/lauf.ts` `LaufSchreiber` (Stand in Teilen merken): nur Datei-Organizer; die Familienakte hat einen eigenen Eingang.

## Pseudonymisierung

Ob BookLedgerPro, Workflow PDF und Private Brain die Pseudonymisierung bekommen, ist offen (Klaus 14.11.: „da bin ich mir nicht sicher“).
Für den Kern ist das unabhängig: er läuft auf dem Gerät, sieht nur, was die App ihm gibt, und schickt nichts weg. Wird in der Familienakte
vor dem Kern pseudonymisiert, muss am pseudonymisierten Text neu gemessen werden (Absender und Person hängen an Namen).
