# Bauplan · V-2026-0001 · Fassung 4

Kunde: ⟦KUNDE-1⟧ · Fassungsdatum 2026-11-06 · Anlass: Gerätetests (Erinnerungen, Kasse, Suche über alle Apps, Übersicht, wie die Apps zusammenhängen).
Es gibt keine frühere Fassung: alle 14 Zeilen unter „Zu tun“ sind NEU BAUEN. Zeilen UNVERÄNDERT/ANPASSEN/ENTFERNEN gibt es nicht.

## 1. Zweck und Nutzer

Ein Verbund aus **vier eigenen Apps** für Familie und Betrieb (Laden), der Papier, Schuhkarton-Belege, ausgedruckte Formulare,
Excel und drei Web-Postfächer ablöst (B-01…B-04, B-28). Ziel (B-21): jede Unterlage ist **einmal** erfasst, liegt an **einem**
Ort und ist von **jeder** App aus zu finden. Abläufe: Belege und Post sofort erfassen (B-24).

Die vier Apps (aus den Bausteinnamen):
1. **BookLedgerPro** – Buchhaltung des Ladens (K-01, K-10, K-12)
2. **Workflow PDF Pro** – Scannen, Formulare, Übersetzen (K-02, K-07)
3. **Private Brain Pro** – Suche über Mails/Dokumente/Fotos, Postfach (K-03, K-04, K-07)
4. **Meine Familienakte** – Familienunterlagen nach Lebensbereichen, Fristen, Kalender (K-05, K-09, K-11)

Nutzer (B-09…B-12): Inhaberin (1), Mitarbeiterinnen im Laden (2), Familie mit Partner, Kindern, pflegebedürftiger Mutter (4),
Steuerberater (1, bekommt nur einen Export, B-29). Probleme: doppelte Eingabe, fehlende Übersicht, verpasste Fristen (B-13…B-15),
getrennte Speicher, Cloud liest mit (B-16).

## 2. Plattformen, Datenort, Sicherung, Netz

- **Geräte:** Android-Handy, Tablet, Windows-PC, Browser (Rahmen). Native Apps auf Android-Tablet und Windows-PC **ohne Konto beim
  Anbieter** (B-20, B-33). Windows-Fassungen: Private Brain Pro und Workflow PDF Pro (K-07), BookLedgerPro (K-10), Familienakte (K-05).
- **Offline immer** (Rahmen, B-22, B-26). Jede Funktion läuft ohne Netz; Netz nur für Postfach, Abgleich, optionale KI.
- **Datenort:** nur auf dem Gerät, eigener Ordner/Speicherkarte (SD-Karte im Tablet, B-27); laut Rahmen auch „Cloud eines Anbieters“
  (Widerspruch, siehe 8).
- **Gemeinsamer Tresorordner (K-06, B-35, B-37):** ein verschlüsselter Ablageort für alle vier Apps, **ein Passwort**, auf SD-Karte
  oder Gerät; darin Fächer je App und Übergabefächer, verschlüsseltes Inhaltsverzeichnis. Das Paket wird in Workflow PDF Pro
  gepflegt und **byte-gleich** in alle Apps kopiert (Vorlage Datei-Post, 60 %).
- **Sicherung:** verschlüsselt, an einen zweiten Ort, selbst anstoßbar **und** von allein (Rahmen); Vollsicherung der Familienakte (K-11).
- **Abgleich:** zwischen Geräten „ab und zu“ genügt; zwischen Familiengeräten **ohne fremden Server** (B-42).
- **KI:** Nutzer wählt in der App (Rahmen „beides“); nur auf Wunsch, aus der EU, eigener Schlüssel, nach Bestätigung (B-22).
- **Datenschutz:** personenbezogene und Gesundheitsdaten (B-31, B-32) → verschlüsselt, keine Nutzungsdaten an den Hersteller (N-03).

## 3. Bereiche/Seiten

| App | Bereiche |
|---|---|
| BookLedgerPro | Startseite (USt, Rücklage), Belege, Rechnungen, Buchungen, USt/EÜR, Export, Kasse & Shop mit Tagesabschluss |
| Workflow PDF Pro | Scanner, Formular ausfüllen, PDF übersetzen, Tresor-Einstellungen |
| Private Brain Pro | Suche (Wort + Bedeutung), Einlesen, Explorer, Postfach |
| Familienakte | Bereiche Gesundheit, Familie, Wohnen, Fahrzeuge, Käufe; Fristen; Eingang (Scanner/OCR/Vorschlag); Kalender mit Glocke; Sicherung; E-Mail-Wege |
| alle | „Überall suchen“, Chef-Code (K-13); Pro-Verbund-Karte und Hilfe „Wo liegt was?“ (K-14); Übergaben mit Quittung (K-08) |

## 4. Funktionen (prüfbar)

1. **K-01 (B-17)** BookLedgerPro-Kern: Belege erfassen, Rechnungen, USt/EÜR, Export; offline, verschlüsselt, „wie das Finanzamt es
   verlangt“. Prüfung: ohne Netz eine Buchung anlegen, USt-Auswertung und Export erzeugen. Vorlage BookLedgerPro (40 %), Faktor
   Offline ×1,15. B-17 im Modus **schlägt vor, Kunde bestätigt**.
2. **K-01/B-23** Buchungen werden **unveränderbar festgeschrieben** (Korrektur nur als neue Buchung); Originalbelege bleiben byte-gleich.
3. **K-01/B-29** Export an den Steuerberater (Format offen, siehe 8).
4. **K-02 (B-18, B-20)** Workflow PDF Pro als Android-App: Brief scannen, Formular am Gerät ausfüllen, PDF übersetzen (Übersetzen mit
   KI nur nach B-22). Vorlage Workflow PDF (80 %).
5. **K-03 (B-19)** Private Brain Pro: Mails, Dokumente, Fotos einlesen; Explorer; Wortsuche und Bedeutungssuche (auf dem Gerät).
   Vorlage Company Brain (40 %), Offline ×1,15.
6. **K-04 (B-19)** Postfach direkt vom Gerät (kein Zwischenserver); Senden nur auf Tipp (N-02, B-41).
7. **K-05 (B-34)** Familienakte neu ohne Server: Bereiche Gesundheit, Familie, Wohnen, Fahrzeuge, Käufe; Fristen je Unterlage;
   Sicherung; Android und Windows. Ablage nur nach Bestätigung (Modus vorschlagen).
8. **K-06 (B-35, B-37)** Tresorordner: einrichten mit einem Passwort, Fächer je App, Übergabefächer, verschlüsseltes
   Inhaltsverzeichnis. Prüfung: dasselbe Paket in allen vier Apps byte-gleich (Prüfsumme), eine App öffnet den Tresor der anderen.
9. **K-07 (B-36)** Windows-Fassungen von Private Brain Pro und Workflow PDF Pro mit denselben Funktionen wie Android.
10. **K-08 (B-38)** Übergaben mit Quittung zwischen allen vier Apps: Mail → Familienakte, Beleg → Buchhaltung, PDF → Akte. Quittung
    erst, wenn die Empfänger-App übernommen hat; nichts wird ohne Bestätigung abgelegt (N-01). Faktor Mehrere Nutzer ×1,3.
11. **K-09 (B-39)** Familienakte-Eingang: Brief fotografieren/scannen, Texterkennung, **Vorschlag** für Einordnung und Frist,
    Nutzer bestätigt. Vorlage Workflow PDF (70 %).
12. **K-10 (B-40)** BookLedgerPro als Android- und Windows-App; Belege direkt aus Scanner und per Mail-Teilen. Modus vorschlagen.
13. **K-11 (B-42)** Familienakte: Kalender mit Erinnerung („Glocke“), Abgleich zwischen Familiengeräten ohne fremden Server,
    Vollsicherung, E-Mail-Wege, Sortier-Kern (Inhalte der letzten drei offen, siehe 8).
14. **K-12 (B-43)** BookLedgerPro: Kasse mit Tagesabschluss, Startseite mit Umsatzsteuer und Rücklage, Belege **ohne KI**
    vorkontiert („trainierte Belegerkennung“). Vorlage BookLedgerPro (40 %).
15. **K-13 (B-44)** „Überall suchen“: eine Suche über alle Apps gleichzeitig; auf Wunsch im eigenen Netz, abgesichert mit Chef-Code.
    Vorlage Company Brain (40 %). Priorität Kann.
16. **K-14 (B-45)** Pro-Verbund-Karte (wie die Apps zusammenhängen) und Hilfe „Wo liegt was?“. Vorlage Mein-Rezeptbuch-Page,
    Workfloh-PDF-Page (50 %). Priorität Kann.
17. **B-22 (ohne Baustein)** Alles läuft ohne Internet; KI nur auf Wunsch, EU, eigener Schlüssel, nach Bestätigung.
18. **B-23 (ohne Baustein)** Originale unverändert, Buchungen festgeschrieben (in allen Apps, nicht nur K-01).
19. **B-37 (ohne Baustein)** Fächer je App + Übergabefächer + verschlüsseltes Inhaltsverzeichnis (mit K-06 abnehmen).
20. **B-41 (ohne Baustein)** Nichts wird ohne Bestätigung abgelegt, nie wird selbst etwas verschickt.

## 5. Schnittstellen zu anderen Programmen

- Zwischen den vier Apps: gemeinsamer Tresorordner, Übergabefächer mit Quittung (K-06, K-08), gemeinsame Suche (K-13).
- Mail-Server der Kundin: Postfach direkt vom Gerät (K-04); Mail-Teilen an BookLedgerPro (K-10); E-Mail-Wege der Familienakte (K-11).
- Steuerberater: Export (B-29).
- KI-Anbieter in der EU mit eigenem Schlüssel, nur nach Bestätigung (B-22).
- Gerätekalender/Benachrichtigungen für die Erinnerung (K-11) – Umfang offen.
- Vorgänger: Web-Vorgänger der Apps, Excel, Web-Postfächer (B-28) – Übernahme alter Daten nicht beauftragt (siehe 8).

## 6. Ausdrücklich nicht

- **N-01** Nichts wird ohne Bestätigung abgelegt oder gebucht.
- **N-02** Keine Mail geht ohne Tipp hinaus.
- **N-03** Keine Nutzungsdaten an den Hersteller.
- Kein Abo, kein Konto beim Anbieter (B-33). Kein eigener Server des Herstellers (K-05 „ohne Server“, B-42 „ohne fremden Server“).
- Keine KI ohne Wunsch und Bestätigung; keine Vorkontierung per KI (K-12 „ohne KI“).

## 7. Abnahme

- Jede Zeile K-01…K-14 einzeln vorführen, zuerst **ohne Netz** (B-22).
- Bestätigungspflicht in den Vorschlag-Bedarfen B-17, B-20, B-34, B-38, B-39, B-40 zeigen: Vorschlag erscheint, erst der Tipp legt ab/bucht.
- B-23: Original vor/nach Ablage per Prüfsumme gleich; festgeschriebene Buchung lässt sich nicht ändern.
- B-37/K-06: Fächer, Übergabefächer, Inhaltsverzeichnis ist ohne Passwort unlesbar; Paket in allen Apps byte-gleich.
- B-41/N-02: Versuch, eine Mail ohne Tipp zu senden, schlägt fehl; keine automatische Weitergabe.
- N-03: Netzverkehr beim Normalbetrieb mitschneiden – kein Aufruf an Hersteller.
- Geräte: Android-Handy, Tablet (mit SD-Karte), Windows-PC, Browser – je Gerät die passenden Apps.
- Sterne-Erhebung bei Abnahme (B-17, B-34, B-38, B-39, B-43) wiederholen; bisher: B-39 fiel von 4 auf 3 – dort genauer nachfragen.
- Summe zur Einordnung: 513,1–986,6 h (inkl. Anpassung 2–6 h, Abstimmung 15 %, Puffer 20 %); keine Euro-Angaben im Auftrag.

## 8. Offene Fragen und Widersprüche im Auftrag

1. **Cloud:** Rahmen nennt als Datenort „Cloud eines Anbieters“, B-33 sagt „keine Cloud“ und B-16 beklagt mitlesende Cloud-Dienste.
   Ist Cloud nur als (verschlüsselter) zweiter Sicherungsort erlaubt?
2. **Browser:** Rahmen nennt Browser, B-20 will Apps; K-01 heißt „(Web)“, K-10 dann Android/Windows. Welche Apps müssen auch im Browser laufen, und wie
   greift der Browser auf den gemeinsamen Tresor zu?
3. **„Wie das Finanzamt es verlangt“ (B-17):** welche Vorgaben genau (Festschreibung, Aufbewahrung, Verfahrensdoku)? Kasse (K-12):
   ist eine zertifizierte Kassensicherung gefordert oder ausdrücklich nicht? Nicht angegeben.
4. **Exportformat** an den Steuerberater (B-29) fehlt.
5. **Mehrere Nutzer:** Mitarbeiterinnen und Familie (B-10, B-11), K-08 hat Faktor „Mehrere Nutzer“ – Rollen, Rechte, eigene Logins? Teilt die Familie
   die Gesundheitsdaten (B-32) mit allen? Ein Passwort für alle Apps (B-35) – auch für alle Personen?
6. **Chef-Code (K-13):** Bedeutung, wer ihn hat, was er im „eigenen Netz“ erlaubt – nicht beschrieben.
7. **K-11:** „Glocke“, „E-Mail-Wege“, „Sortier-Kern“ sind nur Stichworte; Inhalt offen. Wie läuft der Abgleich ohne fremden Server
   technisch (lokales Netz, Datei, eigener Server)?
8. **KI „beides“ vs. B-22:** heißt „beides“ lokal oder EU-Anbieter? Welche Funktionen dürfen KI nutzen (Übersetzen, OCR, Suche)?
9. **B-20 als „schlägt vor, Kunde bestätigt“:** eine Plattform-Anforderung im Vorschlagsmodus ergibt keinen Sinn – vermutlich Versehen.
10. **Größe vs. Stunden:** K-02 „groß“ mit 4,8–8 h; K-09 „groß“ mit 7,2–12 h (Wiederverwendung erklärt das teilweise) – bitte bestätigen.
11. **Windows für Familienakte und BookLedgerPro** steckt in K-05/K-10, für die anderen in K-07 – Abgrenzung so gewollt?
12. **Datenübernahme** aus Web-Vorgängern, Excel, alten Postfächern (B-28) ist nicht als Baustein enthalten.
13. **Kundenkontakt, Termin** (B-07, B-08) und **Mitarbeiterzeiten** haben keinen eigenen Baustein – bewusst?
14. **Sicherung „von allein“:** Takt, Ziel des zweiten Orts, Wiederherstellung auf neuem Gerät nicht festgelegt.
15. Keine Zeile ist NOCH NICHT GESCHÄTZT; Offene Punkte im Auftrag: „keine“.
