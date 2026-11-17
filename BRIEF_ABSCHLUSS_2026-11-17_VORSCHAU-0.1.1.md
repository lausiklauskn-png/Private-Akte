# Abschlussbrief – Private Akte, Vorschau 0.1.1 (17.11.2026)

Grundlage: `BRIEF_ABSCHLUSS_2026-11-17_VORSCHAU-0.1.0.md` und Klaus' Antworten vom 17.11.

## Klaus' Entscheidungen (17.11.)

- Sammelknopf „Ablegen“ geht in der Leiste auf.
- Kalender bleibt beides: Stadt am Ast und Knopf in der Leiste.
- „Landkarte“ fällt aus der Leiste, „Baum“ in der Navigation bleibt.
- Der Baum erklärt zusätzlich, wo die Speicher sind, wie die App aufgebaut ist und wie die Teile
  zusammenwirken („Wo liegt was?“): ein Tresor, in den alles hineinkommt.

## Gebaut

- Sammelknopf, sein Fenster und der Schalter „Zum Entscheiden“ entfernt; „Landkarte“ aus Leiste und „⋯“ entfernt.
- Im Baum unter den Erklärkarten der Abschnitt „Wo liegt was?“ (`woLiegtWas()` in `app.js`, Stil am Ende von
  `app.css`): 1 Herein → 2 Der Tresor (der einzige Speicher: Unterlagen, Eingang, Termine, Portemonnaie, E-Mails,
  Register; mit den Zahlen der Beispiele, jede Zeile springt hin) ⇄ 3 Die Städte (kein eigener Speicher, Kopie
  holen, neue Fassung zurück); darunter Sicherung (zweiter Ort) und Nach außen (nur BookLedgerPro).
  Sprung „Wo liegt was? ↓“ unter der Überschrift, ein Satz in der Hilfe.
- Fassung 0.1.1 (`FASSUNG`, `VERSION`, `?v=`), README nachgezogen.

## Noch zu entscheiden

- Mit dem Sammelknopf sind zwei Wege verschwunden, die nur dort standen: „Foto: Unterlage“ (Bild direkt in den
  Eingang) und „Eine Datei“. Die Leiste hat Bon, PDF scannen, Dateien hineingeben, Notiz, Kalender.
  In die Leiste aufnehmen, in „Dateien hineingeben“ aufgehen lassen oder weglassen?
- „Wo liegt was?“ ist ein erster Wurf – Wortlaut und Aufbau von Klaus noch nicht gesehen.
- Unverändert offen aus 0.1.0: Erinnerung im Kalender, Helfer auf dem Gerät oder über Server, Größe des
  Familienbüros, AGPL, Markenprüfung, was nur Pro hat, Pseudonymisierer in Private Brain Pro.

## Geprüft und nicht geprüft

- Test-Browser, 390 px und 1280 px: `tests/probe.cjs`, 78 Prüfungen, keine Fehler, kein Querrollen; Bilder des
  neuen Abschnitts in beiden Breiten angesehen.
- Nicht am Gerät. Offline-Vorrat mit 0.1.1 nicht erneut von Hand geprüft. GitHub Pages nicht nachgeprüft.
- Der Tresor ist nur gezeigt; die Vorschau speichert weiter nichts (Datenschutzerklärung unverändert).

## Startauftrag

```
Lies im Repo Private-Akte zuerst BRIEF_ABSCHLUSS_2026-11-17_VORSCHAU-0.1.1.md und README.md.
Frage mich nach meiner Rückmeldung zu „Wo liegt was?“ im Baum und zu den zwei Wegen „Foto: Unterlage“ und
„Eine Datei“. Setze die Antworten um, erhöhe die Fassung (FASSUNG in app.js, VERSION in sw.js, ?v= in
index.html), prüfe mit tests/probe.cjs in Handy- und PC-Breite. Zusammenführen nur auf mein Wort.
```
