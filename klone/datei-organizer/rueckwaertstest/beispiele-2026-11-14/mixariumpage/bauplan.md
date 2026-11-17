# Bauplan · V-2026-0001 · Fassung 2

Kunde: ⟦KUNDE-1⟧ · Fassungsdatum 2026-07-23 · Grundlage: nur `bauauftrag.md`. Gebaut werden die sechs Zeilen K-01 bis K-06 (alle „NEU BAUEN“); UNVERÄNDERT- oder ENTFERNEN-Zeilen gibt es nicht.

## 1. Zweck und Nutzer

Eine eigene Werbe- und Landingpage für die bestehende Getränke-App „Mein Mixarium“. Bisher führen Verweise direkt in die App, ohne Erklärung; Interessenten verstehen nicht, was die App kann (B-02, B-08, B-09). Ziel (B-15): Wer die Seite öffnet, weiß nach einer Minute, was die App kann, und ist mit einem Tipp in der App.

- Nutzer 1: Besucher der Seite (Interessenten), 1 Rolle (B-06).
- Nutzer 2: der Inhaber, pflegt die Seite selbst, ohne Schulung (B-05, B-22).
- Geschäftszweck: neue Nutzer gewinnen (B-04); Gastronomie ansprechen (B-13).

## 2. Plattformen, Datenort, Sicherung, Netz

- Gerät: im Browser; Handy, Tablet und Rechner, Handy-Ansicht zuerst (B-24).
- Statische Seite ohne Server und ohne Build-Schritt, ausgeliefert über GitHub Pages von `main` (B-17).
- Ohne Internet: nein (keine Offline-Fähigkeit verlangt).
- Daten: nur auf dem Gerät; personenbezogene Daten: nein; kein Formular, keine Anmeldung, kein Zähldienst (B-28, B-29). Gespeichert wird höchstens die Wahl von Sprache und Thema (eigene Annahme, siehe 8).
- Kein Abgleich zwischen Geräten, keine Sicherung.
- Keine KI auf der Seite.
- N-01: beim Laden keine fremden Dienste. Alle Bibliotheken mitgeliefert, three.js unter `vendor/`, kein CDN (B-21).

## 3. Bereiche/Seiten

Eine Seite (K-01) mit Abschnitten, Reihenfolge vorgeschlagen:

1. Kopf: Name, Themenwahl (Dunkel/Neon/Hell), Sprachwahl (DE/EN), Knopf „App öffnen“.
2. Vorstellung: Zweck „persönliches Getränke-Labor“, Besonderheiten (B-16).
3. Videos: Intro-Video und Demo-Video, je in Bildschirmhöhe (K-02).
4. Tauschen und Sichern (B-16).
5. „Bau dir deine eigene Bar“ mit Bildern und Galerie aus dem echten Buch (K-03).
6. Copyright-Kasten mit Kontakt (K-05).
7. Fuß-Block: Verweis auf den Familien-Verbund, zur App, zu Impressum/Datenschutz der App (B-20, B-26); folgt der Seite (K-04).

Dazu im Repo: `LICENSE`, `RECHTE.md` (K-05), `vendor/` (B-21).

## 4. Funktionen

1. **K-01 · Landing-Page im Verbund-Look** (deckt B-10, B-12, B-26; Vorlage Mein-Rezeptbuch-Page, Workfloh-PDF-Page, 50 % wiederverwendet; Faktor mehrsprachig ×1,2). Prüfbar: Seite stellt die App vor; Knopf „App öffnen“ führt zur Adresse der App; Optik aus der Schwester-Seite übernommen, nicht neu erfunden (B-31).
2. **K-01 / B-19 · Umschalten** zwischen Deutsch und Englisch und zwischen drei Themen. Prüfbar: jeder sichtbare Text liegt in beiden Sprachen vor (B-27); alle drei Themen schalten ohne Neuladen.
3. **K-01 / B-20, B-26 · Verweise**: zur App Mein Mixarium, zum Familien-Verbund, zu Impressum und Datenschutz der App. Die App selbst bleibt unverändert (B-25).
4. **K-02 · Videos** (deckt B-11, B-18): Demo-Video zeigt die App in Aktion (Buch, Suche, Wischen, KI-Labor, Themen); dazu ein Intro-Video; Container jeweils in Bildschirmhöhe. Prüfbar: beide Videos spielen am Handy hoch und quer, Container = Bildschirmhöhe; Videos liegen im Repo (N-01).
5. **K-03 · „Bau dir deine eigene Bar“** (deckt B-13, B-14): Abschnitt zeigt, dass die App zu einer eigenen Bar/Theke umgebaut werden kann (Rezept-Paket hereinladen); Bilder und Galerie aus dem echten Buch. Nur Bilder, deren Freigabe O-01 geklärt hat.
6. **K-04 · Ladezeit und Barrierefreiheit** (deckt B-32, B-36; Vorlage wie K-01, 30 % wiederverwendet): animierter Hintergrund (three.js) erst nach dem Laden geholt; Abfrage des Grafikchips, auf schwachen Chips aus; Fuß-Block folgt der Seite. Prüfbar: gemessen, nicht geschätzt (B-32) – Messwerte am Handy für Ladezeit und Barrierefreiheit liegen vor; beim ersten Anstrich kein Hintergrund-Skript geladen; mit gestelltem schwachem Chip kein Hintergrund.
7. **K-05 · Rechte** (deckt B-33): `LICENSE`, `RECHTE.md`, Copyright-Kasten mit Kontakt, Wasserzeichen, neues App-Icon. Prüfbar: alle fünf Teile vorhanden; Kasten auf der Seite sichtbar.
8. **K-06 · Texte an die App angeglichen** (deckt B-35, B-38, B-37): jede genannte Funktion hat ein Gegenstück in der laufenden App; Sätze ohne Gegenstück werden gestrichen. Prüfbar: Liste „Satz → Stelle in der App“, keine Lücke.
9. **K-06 · Mikrofon-Sprache wählbar** (deckt B-34): das Mikrofon im Demo hört die gesprochene Sprache, nicht die Seitensprache; Sprache ist wählbar. Prüfbar: Seite auf EN, Mikrofon auf DE → deutsche Eingabe wird erkannt.

## 5. Schnittstellen zu anderen Programmen

- Nur Verweise (Links), kein Datenaustausch: App Mein Mixarium (eigene Adresse, unverändert), Impressum/Datenschutz der App, Familien-Verbund (B-20, B-25, B-26).
- Vorlagen-Übernahme (Code/Optik) aus Mein-Rezeptbuch-Page und Workfloh-PDF-Page (K-01, K-04) und aus der „Schwester-Seite“ (B-31).
- Abgleich der Texte gegen die laufende App (B-37) – Weg der Prüfung offen (siehe 8).

## 6. Ausdrücklich nicht

- N-01: keine fremden Dienste beim Laden (kein CDN, keine fremden Schriften, keine fremden Video-Plattformen).
- Kein Server, kein Build-Schritt (B-17).
- Kein Formular, keine Anmeldung, kein Zähldienst, keine personenbezogenen Daten (B-28, B-29).
- Keine KI auf der Seite.
- Keine Werbung für Funktionen, die es nicht gibt (B-38).
- Keine Änderung an der App selbst (B-25).
- Keine neue Optik erfinden (B-31).

## 7. Abnahme

Je Baustein wie unter 4 angegeben, zusätzlich ohne eigenen Baustein (aus „Je Baustein“): B-16, B-17, B-18, B-19, B-20, B-21, B-36, B-37 – jeder Satz einzeln abhaken. Muss-Bedarfe: B-10, B-11, B-32, B-33, B-35. Soll: B-12, B-13. Kann: B-14, B-34.

Sterne der Mitarbeiter bei der Abnahme (bereits eingetragen): B-10 Ø 5, B-11 Ø 4,5, B-12 Ø 4, B-13 Ø 4,5, B-32 Ø 5, B-35 Ø 4,5 (je 2 Stimmen).

Aufwand laut Auftrag: 77,8–151,2 h (Summe der Zeilen 55,6–106 h plus Anpassung 2–6 h, Abstimmung 15 %, Puffer 20 %; nachgerechnet, stimmt). Euro nicht im Auftrag.

## 8. Offene Fragen und Widersprüche im Auftrag

1. **O-01:** Welche Bilder aus dem Buch dürfen gezeigt werden? Klärt ⟦KUNDE-2⟧ „bis 2026-07-05“ – das liegt **vor** dem Fassungsdatum 2026-07-23. Ist es geklärt? Ohne Antwort ist K-03 (Galerie) nicht baubar.
2. **Fassung 2 ohne Vorgänger:** Kopf sagt Fassung 2, aber `vorher: -` und „keine frühere Fassung“. Der Anlass („lädt am Handy zu langsam“, „Rechte fehlen“, „Versprechen stimmt nicht“) beschreibt eine bestehende Seite – gibt es Code, der umzubauen statt neu zu bauen ist?
3. **Schwester-Seite unklar:** Welche Seite ist die Vorlage für die Optik (B-12, B-31)? Genannt sind zwei (Mein-Rezeptbuch-Page, Workfloh-PDF-Page); Farben, Schrift, Aufbau der Themen sind im Auftrag nicht beschrieben.
4. **Videos:** Gibt es die Videos schon, oder sind sie aufzunehmen (Drehbuch, Länge, Hoch/Quer, Format, Größe)? K-02 heißt „klein“, ist aber mit 10–20 h höher geschätzt als die „mittlere“ K-01.
5. **„Mikrofon im Demo“ (B-34):** Ist das Demo ein Video (dann gibt es kein Mikrofon) oder ein eingebetteter, bedienbarer Demo-Teil auf der Seite? Falls bedienbar: welche Spracherkennung, ohne fremde Dienste (N-01)?
6. **Grafikchip-Abfrage (B-36):** Woran gilt ein Chip als „schwach“? Kein Schwellwert genannt. Gibt es einen Knopf, den Hintergrund von Hand aus-/einzuschalten?
7. **Messung (B-32):** Welche Zielwerte gelten für Ladezeit und Barrierefreiheit, mit welchem Werkzeug gemessen?
8. **Prüfung gegen die App (B-37):** Wer prüft wie (von Hand, automatisch)? Liegt eine Funktionsliste der App vor? Das Demo-Video zeigt ein „KI-Labor“ – ist das in der App vorhanden? (Die Seite selbst hat keine KI.)
9. **Wasserzeichen und Icon (K-05):** Auf welchen Inhalten liegt das Wasserzeichen (Bilder, Videos)? Das „neue App-Icon“ – für die Seite oder die App? Die App soll unverändert bleiben (B-25).
10. **Lizenz:** Welche Lizenz in `LICENSE`? Welcher Kontakt im Copyright-Kasten? Nicht genannt.
11. **Speichern der Wahl:** Darf die Wahl von Sprache/Thema im Browser gemerkt werden? „Daten nur auf dem Gerät“ deutet ja an, B-29 schließt nur Zähldienste aus.
12. **Adressen:** Adresse der App, des Familien-Verbunds und von Impressum/Datenschutz der App sind nicht angegeben.
13. **Pflege durch den Inhaber (B-22):** Wie pflegt er Texte ohne Build-Schritt und ohne Schulung – direkt in HTML-Dateien, oder braucht es eine Textdatei je Sprache?
14. **Rezept-Paket (B-13):** Wird es nur beschrieben oder als Datei zum Herunterladen angeboten?
