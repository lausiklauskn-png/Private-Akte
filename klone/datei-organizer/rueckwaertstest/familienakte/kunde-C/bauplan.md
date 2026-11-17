# Bauplan · Vorgang V-2026-0001 · Fassung 1 · Kunde ⟦KUNDE-1⟧

## 1. Zweck und Nutzer
Ein digitales Hängeregister, das Familienunterlagen (Arztbefunde, Bescheide, Policen, Kontoauszüge, Vollmachten,
Pflegeheim-Unterlagen) nach Person und Thema ordnet, an Fristen erinnert und Briefe an Ämter vorbereitet (B-20, B-27–B-29).
Hauptnutzer ist ⟦KUNDE-2⟧ (führt alles, B-09); Bruder und Betreuerin sollen mitlesen/-schreiben (B-10, B-11, B-39), der Neffe richtet ein (B-12, B-38).

## 2. Plattformen und Laufzeit
- Windows-Laptop (B-40) und ein älteres Tablet (B-41, Betriebssystem offen: O-06).
- Grundbetrieb offline, Daten lokal auf dem Gerät (B-21, B-42, Faktor „offline“ an K-01/K-02/K-05).
- Kein Konto für den Grundbetrieb (Annahme). Konten/Zugänge erst mit K-07 (Faktoren „nutzer“, „server“) und K-06 („server“).
- Technik: installierbare Web-App, damit eine Code-Basis Laptop und Tablet bedient (Annahme, abhängig von O-06).

## 3. Bereiche der Oberfläche
- Übersicht (nächste Fristen, Summen Beiträge/Kontostände)
- Register: Personen → Themen → Unterlagen (K-01)
- Abteilungen Versicherungen · Finanzen · Vollmachten (K-05)
- Fristen/Erinnerungen (K-02)
- Briefe: Vorlagen, Entwurf, Druckansicht (K-03)
- Einstellungen: Schriftgröße (K-04), Sicherung, später Freigaben (K-07) und Versand (K-06)

## 4. Funktionen (prüfbar)
1. Person anlegen/umbenennen (mind. ⟦KUNDE-2⟧, Bruder) und Themen je Person anlegen. (K-01)
2. Unterlage (Datei/Foto/PDF) einer Person und einem Thema zuordnen und lokal speichern. (K-01, B-30)
3. Unterlage per Name/Person/Thema wiederfinden. (K-01, B-05)
4. Zu jeder Unterlage eine oder mehrere Fristen mit Datum und Text speichern. (K-02, B-31)
5. Erinnerung vor Ablauf, Vorlauf einstellbar (Annahme: Tage vorher), sichtbar in der Übersicht. (K-02)
6. Erinnerung auch als Gerätemeldung, soweit das Gerät es zulässt (Annahme; abhängig von O-06). (K-02)
7. Briefvorlagen an Ämter verwalten; Platzhalter werden aus Angaben der Unterlage gefüllt (Aktenzeichen, Datum, Absender). (K-03)
8. Briefentwurf bearbeiten und als Druckansicht/PDF ausgeben. (K-03, Faktor „druck“)
9. Schriftgröße in Stufen einstellbar, Einstellung bleibt gespeichert, Bedienung bleibt bei größter Stufe vollständig. (K-04)
10. Abteilungen Versicherungen, Finanzen, Vollmachten als feste Bereiche mit eigenen Unterlagen. (K-05, B-34)
11. Beiträge (Betrag, Rhythmus) und Kontostände (Betrag, Stand-Datum) erfassen; Übersicht mit Summen. (K-05, B-35; Quelle offen: O-04)
12. Antwortbrief einer Frist zuordnen und bei nahender Frist versenden. (K-06, B-36 — Ausführung siehe 7./9.)
13. Bruder und Betreuerin erhalten Zugang über das Internet zum Lesen und Schreiben. (K-07, B-37 — Umfang siehe O-03)
14. Sicherung aller Daten in eine Datei (z. B. auf USB-Stick) und Zurückholen. (Annahme, aus B-04/B-45; Rolle offen: O-05)

## 5. Datenhaltung und Sicherheit
- Alle Unterlagen und Angaben lokal auf dem Gerät (B-21, B-42, B-54). Gesundheitsdaten (B-53) → Ablage verschlüsselt mit Passwort (Annahme, aus B-21/B-52/B-53).
- Sicherung als verschlüsselte Datei, die auf den USB-Stick gelegt werden kann (Annahme, Fortführung von B-45).
- Keine Daten zu einem Server, solange K-06/K-07 nicht freigegeben und O-01 geklärt ist.
- Laptop und Tablet halten je einen eigenen Bestand; ein Abgleich zwischen beiden ist im Auftrag nicht bestellt (siehe 9.).

## 6. Schnittstellen
- Drucker/PDF für Briefe (K-03).
- Dateien vom Gerät einlesen (Scans, PDFs, Fotos) (K-01).
- Versandweg an Ämter für K-06: Kanal nicht benannt (E-Mail? Fax? Post?) → offene Frage.
- Server für gemeinsamen Zugriff (K-07) und für zeitgesteuerten Versand (K-06, Faktor „server“).
- Word bleibt bestehen (B-43); Austausch mit Word nicht bestellt.

## 7. Bewusste Grenzen
- Keine automatische Übernahme von Kontoständen aus Auszügen, solange O-04 offen ist (nur Abtippen).
- Kein Versand ohne Freigabe durch ⟦KUNDE-2⟧, bis O-02 beantwortet ist — Briefe an Ämter sind schwer rückholbar (eigene Vorsicht, nicht im Auftrag).
- Kein Abgleich Laptop ↔ Tablet, kein Kalender-Export, kein Word-Import: nicht bestellt.
- K-06 und K-07 werden nicht vor Klärung von O-01/O-02/O-03 gebaut, weil sie B-21/B-54 („privat und lokal“) berühren.

## 8. Reihenfolge der Bauschritte
1. Grundgerüst, lokale verschlüsselte Ablage, Sicherung (Basis für alles).
2. K-04 Schriftgröße (früh, weil jede weitere Seite darauf geprüft wird).
3. K-01 Register nach Person/Thema.
4. K-05 Abteilungen und Übersicht Beiträge/Kontostände.
5. K-02 Fristen und Erinnerungen.
6. K-03 Briefvorlagen und Druck.
7. Nach Antwort auf O-01/O-03: K-07 gemeinsamer Zugriff.
8. Nach Antwort auf O-02 und Klärung des Versandwegs: K-06.

## 9. Offene Fragen an den Kunden
- O-01: Wie passt „lokal und privat“ zum Mitlesen über das Internet? (Dr. Beispielhofer)
- O-02: Sollen Antworten wirklich ohne Durchsicht rausgehen? (Dr. Beispielhofer)
- O-03: Sieht die Betreuerin alles oder nur die Unterlagen des Bruders? (Dr. Beispielhofer)
- O-04: Beiträge/Kontostände abtippen oder aus Auszügen lesen? (Dr. Beispielhofer)
- O-05: Bleibt der USB-Stick als Sicherung? (Neffe)
- O-06: Welches Betriebssystem hat das Tablet? (Neffe)
- Neu: Über welchen Weg gehen Antworten an Ämter (E-Mail, Fax, Post)?
- Neu: Sollen Laptop und Tablet denselben Bestand zeigen?
- Neu: Wie passen 186,8–344,1 h zum Budget „bis 150 € einmalig“ (B-55)? Was fällt weg?
- Neu: Welche Ämter/Brieftypen braucht es als erste Vorlagen?
- Neu: Darf der Bruder ebenfalls alle Unterlagen sehen (B-39 nennt nur Rollen, keinen Umfang)?

## 10. Unklar, widersprüchlich, doppelt
- Widerspruch: B-21/B-42/B-54 („privat, lokal auf dem Gerät“) gegen K-07/B-26/B-37 (Zugriff über Internet, Faktor „server“). Selbst als O-01 benannt.
- Widerspruch/Risiko: K-06/B-36 „von selbst versenden“ gegen O-02 (ohne Durchsicht?); K-06 trägt zudem Faktor „server“ trotz Lokal-Wunsch.
- Widerspruch: Summe 186,8–344,1 h gegen Budget „bis 150 € einmalig“ (B-55); Kopf sagt `euro: nein`, B-55 nennt trotzdem einen Betrag.
- Unplausible Schätzung: K-01 und K-05 („mittel“) je nur 3,7–6,4 h, K-04 („klein“) dagegen 10–20 h; K-02 („mittel“) 27,6–50,6 h.
- Lücke: K-06 nennt keinen Versandkanal; K-02 keinen Erinnerungsweg (Meldung am Gerät? Mail?).
- Lücke: keine K-Zeile für Sicherung, obwohl B-04/B-45 und O-05 sie nennen; keine K-Zeile für Verschlüsselung trotz Gesundheitsdaten (B-53).
- Doppelt: B-04 = B-45 (USB-Stick); B-03 ≈ B-44 (Papierkalender); B-02 ≈ B-43 (Word); B-21 ≈ B-42 ≈ B-54 (lokal/privat);
  B-20 ≈ B-30 + B-31; B-22 ≈ B-32; B-23 ≈ B-33; B-24 ≈ B-34 + B-35; B-25 ≈ B-36; B-26 ≈ B-37 ≈ B-39.
- Doppelt im Dokument: Bedarf und Bausteine stehen dreimal (Änderungen, „Vollständiger Stand“, JSON); K-Zeilen zweimal.
- Uneinheitliche Verdeckung: Kunde als ⟦KUNDE-1⟧/⟦KUNDE-2⟧ verdeckt, „Dr. Beispielhofer“ in O-01–O-04 aber im Klartext (Kopf `verdeckt: ja`).
- Unklar: ⟦KUNDE-1⟧ (Kopf) und ⟦KUNDE-2⟧ (B-09) — dieselbe Person oder zwei?
- Lücke in der Nummerierung: Bereiche 12, 16, 17 fehlen (evtl. leer).
- Datum `2026-11-14` liegt einen Tag nach dem Bautag (2026-11-13).
- Keine Zeile ist NOCH NICHT GESCHÄTZT, UNVERÄNDERT oder ENTFERNEN; alle sieben sind NEU BAUEN.
