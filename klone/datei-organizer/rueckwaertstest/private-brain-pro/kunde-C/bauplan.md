# Bauplan · Vorgang V-2026-0001 · Fassung 1 · Kunde ⟦KUNDE-1⟧

## 1. Zweck und Nutzer
Ein gemeinsamer, verschlüsselter Ablageort (Tresor) für Mails, Rechnungen, Scans und Fachtexte, den mehrere Programme mit einem Passwort nutzen, dazu Weitergabe von Rechnungsmails an die Buchhaltung, Sinn-Suche und Übersetzung (K-01–K-07).
Nutzerin ist eine allein arbeitende Übersetzerin ohne Fachwissen, die keine Schulung will (B-10, B-20, B-42).

## 2. Plattformen und Laufzeit
- Windows-PC und Android-Tablet nativ, gleiche Bedienung (K-08, B-46); iPhone zusätzlich (K-09).
- Suche, Übersetzung und Tresor laufen auf dem Gerät, also offline (K-01/K-04/K-06 mit Faktor „offline“).
- Online nur für: KI-Gegenlesen (K-07) und Cloud-Abgleich (K-10).
- Kein eigenes Benutzerkonto; Zugang über das eine Tresor-Passwort (Annahme, folgt aus B-19/B-35).

## 3. Bereiche der Oberfläche
- Einrichtung (Assistent, K-02)
- Ablage/Tresor: Fächer für Mails, Rechnungen, Scans, Fachtexte, Eingangsfach Buchhaltung (K-01, K-03)
- Mail-Ansicht mit Übersetzung unter dem Original und Knopf „An Buchhaltung“ (K-03, K-06)
- Suche (Wort + Bedeutung, K-04)
- Schreiben mit KI-Gegenlesen und Vorschau „das geht hinaus“ (K-07)
- Kalender mit Fristen (K-11)
- Einstellungen: Sprache DE/PL (K-05; DE als Grundsprache = Annahme), Cloud-Abgleich (K-10)

## 4. Funktionen (prüfbar)
1. Tresor anlegen: verschlüsselter Ordner mit Fächern Mails/Rechnungen/Scans/Fachtexte (K-01).
2. Ein Passwort öffnet den Tresor für alle beteiligten Programme (K-01, B-35).
3. Assistent: Speicherort wählen → vorhandenen Tresor finden oder neuen anlegen → Passwort setzen; nicht mehr Schritte (K-02).
4. Rechnungsmail samt Anhang mit einem Tipp ins Eingangsfach Buchhaltung im Tresor legen (K-03).
5. Wortsuche über alle Inhalte im Tresor (K-04).
6. Bedeutungssuche über Vektoren, auf dem Gerät gerechnet (K-04).
7. Gesamte Oberfläche auf Polnisch umschaltbar, kein deutscher Rest (K-05).
8. Fremdsprachige Mail automatisch auf dem Gerät übersetzt; Original bleibt unverändert darüber (K-06).
9. KI-Gegenlesen: Kundennamen werden vorher verdeckt, Vorschau zeigt den exakten ausgehenden Text, Senden erst nach Bestätigung (K-07, B-60).
10. Gleiche Bedienung auf Windows und Android (K-08).
11. iPhone-Fassung (K-09).
12. Tresorordner über Cloud-Ordner zwischen Geräten abgleichen; Inhalt bleibt verschlüsselt (K-10; Verschlüsselung in der Cloud = Annahme aus B-61).
13. Fristen eintragen, Erinnerung auslösen (K-11).

## 5. Datenhaltung und Sicherheit
- Alle Inhalte nur im verschlüsselten Tresor am gewählten Speicherort (K-01, B-61); Ort offen (O-04).
- Suchvektoren und Übersetzungen gehören zum jeweiligen Dokument im Tresor (Annahme).
- Personenbezogene Daten vorhanden (B-59): Kundennamen verlassen das Gerät nie unverdeckt (B-60).
- Verfahren: Passwort → Schlüsselableitung → symmetrische Verschlüsselung (Annahme, Verfahren nicht vorgegeben).
- Sicherung: im Auftrag nicht verlangt; Cloud-Abgleich ist kein Backup (Annahme) → offene Frage.

## 6. Schnittstellen
- Thunderbird (B-47): Mails kommen von dort – Weg (Import, .eml, Teilen) offen.
- Buchhaltungsprogramm (B-48): liest das Eingangsfach im Tresor (K-03) – ob es das kann, offen (O-01).
- Familienprogramm (B-49, B-52): soll denselben Ablageort nutzen – kein Baustein dafür.
- Dropbox/Cloud-Ordner (B-50, K-10).
- Externe KI-Schnittstelle fürs Gegenlesen (K-07); Anbieter nicht genannt.

## 7. Bewusste Grenzen
- Umbau des Buchhaltungs- und Familienprogramms: nicht im Auftrag, nur der Tresor und das Fach werden bereitgestellt.
- Kein eigenes Mailprogramm statt Thunderbird (nicht verlangt).
- Kein eigener Cloud-Dienst; nur ein vorhandener Cloud-Ordner (K-10).
- Keine Schulung/Handbuch (B-42); Oberfläche muss selbsterklärend sein.
- Keine Preise/Kosten im Plan (`euro: nein`).

## 8. Reihenfolge
1. K-01 Tresor (Grundlage für alles).
2. K-02 Assistent.
3. K-08 Windows + Android-Hülle mit gleicher Bedienung.
4. K-03 Rechnungsmail → Eingangsfach (nach Klärung O-01).
5. K-04 Suche.
6. K-06 Übersetzung, K-07 KI-Gegenlesen.
7. K-05 Polnisch (am Ende, wenn alle Texte stehen).
8. Kann-Teile: K-10 Cloud-Abgleich (nach O-03/O-04), K-11 Kalender (nach O-05), K-09 iPhone zuletzt.

## 9. Offene Fragen an die Kundin
- O-01: Welche Buchhaltungs- und Familienprogramme genau, können sie den Tresor lesen?
- O-02: Zeitaufwand heute pro Monat?
- O-03: Dropbox behalten oder ersetzen?
- O-04: Wo liegt der Tresor (PC, Tablet, Cloud)?
- O-05: Welche Fristen in den Kalender?
- Neu: Wie kommen Mails aus Thunderbird in den Tresor? Gibt es Mails auch am Tablet?
- Neu: Welche KI darf gegenlesen (Anbieter, eigener Schlüssel)? Wer zahlt sie im Rahmen von B-62?
- Neu: Passwort vergessen – gewünschter Ersatzweg?
- Neu: Welche Sprachen kommen in Kundenmails vor (K-06)?
- Neu: Wie soll die Kalender-Erinnerung erscheinen (Gerätemeldung)?

## 10. Unklar, widersprüchlich, doppelt
- **Summe stimmt nicht:** Zeilen K-01–K-11 ergeben 282,2–545,2 h, unter „Summe“ steht 383,6–744,1 h.
- **Doppelt:** B-19/B-30/B-34/B-35, B-21/B-31/B-37, B-22/B-32/B-38, B-24/B-33/B-40, B-23/B-39, B-25/B-41, B-20/B-36 sagen je dasselbe; B-28/B-53 ebenso; B-26/B-46, B-27/B-45; B-15/B-51.
- **Lücke:** Familienunterlagen (B-04, B-52, B-58) sollen in den gemeinsamen Ort, K-01 nennt nur Mails, Rechnungen, Scans, Fachtexte.
- **Lücke:** Thunderbird (B-01, B-47) ist Mailquelle, kein Baustein regelt den Mail-Eingang.
- **Widerspruch:** K-09/K-10/K-11 decken „Kann“-Bedarf (B-27–B-29), stehen aber als NEU BAUEN; „Grenzlinie keine“ heißt wohl alles fest – bitte bestätigen.
- **Spannung:** „auf dem Gerät“/offline (K-04, K-06) vs. Cloud-Abgleich (K-10) und KI-Gegenlesen online (K-07).
- **Unstimmig:** K-07 „mittel“, aber nur 3,8–6 h – kleiner als die „kleinen“ K-02 und K-05.
- **Spannung:** `euro: nein`, aber B-62 nennt einen Betrag (150 €/Jahr); laufende KI-/Cloudkosten nicht eingeplant.
- **Kopf:** `repo: "Workflow-Needs"` scheint das Erfassungswerkzeug zu sein, nicht das Zielprojekt; Datum 2026-11-14 liegt nach heute.
- **„NOCH NICHT GESCHÄTZT“/„UNVERÄNDERT“:** keine Zeilen vorhanden; „Zu tun“ enthält nur NEU BAUEN.
