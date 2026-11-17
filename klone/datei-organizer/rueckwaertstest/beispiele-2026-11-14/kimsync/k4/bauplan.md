# Bauplan · V-2026-0001 · Fassung 3

Kunde: ⟦KUNDE-1⟧ · Fassungsdatum 2026-10-25 · alles unter „Zu tun“ ist NEU BAUEN (keine frühere Fassung). Geschätzt gesamt 253–460,2 h (inkl. Anpassung, Abstimmung 15 %, Puffer 20 %).

## 1. Zweck und Nutzer
- Bilder, Videos und kurze Nachrichten im kleinen Kreis austauschen, ohne fremden Messenger, ohne Konto und ohne Telefonnummer (B-01, B-02, B-08, B-10, B-31).
- Nutzer: ⟦KUNDE-2⟧ und Mitarbeiter auf der Baustelle (4) und das Büro (1) (B-06, B-07); Leute ohne Technikwissen, ein Knopf je Handgriff (B-24).
- Ziel: Ein Foto ist in Sekunden beim Büro, und man sieht, dass es angekommen ist (B-17, B-09). Inhalte: Baustellenfotos, Videos, kurze Abstimmungen (B-29).
- Anlass dieser Fassung: mehrere Räume, Gruppen mit Leitung, beliebige Dateien, Umzug aufs neue Handy.

## 2. Plattformen, Datenort, Sicherung, Netz
- Installierbare Web-App aus einer einzigen Seite, ohne Bau-Schritt, ohne Konto (B-18, B-52); Geräte laut Rahmen: Android-Handy, iPhone, Tablet, Windows-PC, Browser (B-25–B-27).
- Daten nur auf dem Gerät. Relais speichern nur verschlüsselte Teile (B-12, B-32, N-02).
- Ohne Internet: muss unterwegs reichen (Lesen, Merken von Unversandtem, B-22).
- Abgleich zwischen Geräten: sofort, über die Relais (Nostr, mehrere gleichzeitig, B-55).
- Sicherung: verschlüsselte Datei, vom Nutzer angestoßen, an einen zweiten Ort (B-43, B-57).
- KI nur auf dem Gerät (K-14).
- Beim Laden wird nichts gesendet (B-34).

## 3. Bereiche/Seiten
1. Start/Tresor entsperren (Passwort ≥ 8 Zeichen, einmal beim Öffnen, B-54).
2. Raumliste: Räume mit Namen, ein Tipp wechselt (B-39); neuer Raum, Raum per Code oder Link betreten, Einladen (B-53).
3. Raum/Verlauf: Nachrichten, Bilder, Videos, Dateien, Status (abgeholt/gelesen), private Nachricht.
4. Gruppe: Mitglieder mit Profilbild, Einlass bestätigen, Herausnehmen, Umzug (nur Leitung) (B-40).
5. Galerie und Ansicht mit Videoabspieler (K-04).
6. Einstellungen: Sprache DE/EN/RU, drei Themen, Installieren, Neu laden, Relais, Datei-Dienst-Zugang, Sicherung/Einspielen (K-05, K-08, K-12, K-13).
7. Netz-Knoten: Siegel, Mycel, Lampen (K-07).

## 4. Funktionen
1. **K-01** (B-11, B-12, B-19, B-21, B-55): Raum über Code XXXX-XXXX-XXXX-XXXX öffnen; Schlüssel auf dem Gerät ableiten (PBKDF2, AES-GCM); Bilder, Videos, Nachrichten als signierte, verschlüsselte Zettel über mehrere Relais; Signatur beim Empfang prüfen. Faktor Offline ×1,15.
2. **K-01/B-20/B-56**: Bilder vor dem Senden verkleinern; Videos unverändert in Teilen senden, beim Empfänger zusammensetzen, mit Fortschrittsanzeige.
3. **K-02** (B-13, B-22, B-23, B-47): Abholbestätigung anzeigen; Unversandtes merken und nachsenden, sobald Verbindung zurück; eigene Teile vom Relais löschen lassen — erst, wenn alle abgeholt haben.
4. **K-03** (B-14, B-28): Große Videos (über 20 MB) über den Datei-Dienst des Hauses; Vergleich per SHA-256.
5. **K-04** (B-15): Galerie aller Bilder und Videos des Raums; Auswahl mehrerer, Ziehen zum Auswählen, Löschen; Ansicht mit Videoabspieler.
6. **K-05** (B-16): Oberfläche Deutsch/Englisch/Russisch; Installieren; Neu laden; drei Themen. Faktor Mehrsprachig ×1,2.
7. **K-06** (B-33, B-36): Empfangene Bilder neu zeichnen, bevor sie gezeigt oder gespeichert werden; Bestand einmal nachzeichnen; nicht zeichenbares Bild nicht zeigen, Hinweis setzen, nie das Original.
8. **K-07** (B-34, B-37, B-38): Knoten im Netz der Schwester-Apps (SBKIM) mit Siegel, Mycel und Lampen; eigene Netz-Schublade getrennt vom Raum; beim Laden nichts senden.
9. **K-08** (B-35): Installieren auch in den Einstellungen; eigene Manifest-Kennung.
10. **K-09** (B-39, B-40, B-46, B-54): Räume im Tresor; je Raum eigener Raumschlüssel (Code öffnet nur die Tür); Eintritt nur mit Bestätigung der Leitung; Herausnehmen und Umzug nur durch die Leitung; Profilbild. Faktor Mehrere Nutzer ×1,3.
11. **K-10** (B-41, B-48): Dateien jeder Art (PDF, App-Datei, ZIP) mit Warnung bei Programmen; Zugang zum Datei-Dienst gibt die Leitung an die Gruppe, ohne den Code zu zeigen; Abschluss mit Schreibnachweis.
12. **K-11** (B-42): Lesebestätigung (Gelesen-Haken), private Nachricht an eine Person, Vertrauens-Haken.
13. **K-12** (B-43, B-57): Verschlüsselte Sicherungsdatei mit Räumen, Nachrichten, Bildern und Geräteschlüssel; Einspielen ergänzt nur und erlaubt den Umzug aufs neue Gerät.
14. **K-13** (B-44, B-50): Relais je Gerät und Raum wählbar; Leitung gibt eigene Relais an die Gruppe weiter; Zulassungsdienst auf dem Server: nur zugelassene Geräte schreiben. Faktor Server ×1,6.
15. **K-14** (B-45): Mikrofon (Diktat) in jedem Textfeld; Suche nach Wort und Bedeutung; Übersetzen — alles auf dem Gerät.
16. **B-53**: Einladen per Link oder Raum-Code zum Kopieren/Teilen.

## 5. Schnittstellen zu anderen Programmen
- Relais (Nostr), mehrere gleichzeitig; eigene Relais mit Zulassungsdienst (K-13, B-50).
- Datei-Dienst des Hauses („Datei-Post“) für große Dateien (K-03, K-10).
- Netz der Schwester-Apps (SBKIM, Modulsatz aus Sage-Protokol) (K-07).
- Dateien mit eigenen Programmen hin- und hergeben (Rahmen); Pakete zur Familienakte nur transportieren, nicht einbinden (B-49).
- Vorlagen laut Auftrag: Kim-sync (K-01, K-11, je 50 %), Datei-Post (K-03, K-10, je 60 %), Auslieferungsprüfer (K-06, 70 %), Mein-Rezeptbuch-Page/Workfloh-PDF-Page (K-08, 50 %), Sende-Prüfer (K-09, 70 %), Company Brain (K-14, 40 %).

## 6. Ausdrücklich nicht
- N-01: kein Konto, keine Telefonnummer.
- N-02: kein Klartext auf dem Relais.
- Kein Abo, keine Werbung (B-31); keine Speicherung außerhalb der Geräte; keine KI außerhalb des Geräts; kein Bau-Schritt (B-52).
- Fremde App nicht in die Familienakte einbinden (B-49).

## 7. Abnahme
- Je Baustein K-01–K-14 die Funktion aus Abschnitt 4 vorführen, auf Handy, Tablet und PC.
- Ohne Baustein trotzdem abnehmen: B-18, B-19, B-20, B-21, B-22, B-23, B-36, B-37, B-46, B-47, B-48, B-49, B-52, B-53, B-54, B-55, B-56, B-57.
- Prüfpunkte u. a.: Relais enthält nur verschlüsselte Teile (B-12/B-32); beim Laden kein Netzverkehr (B-34); Löschen erst nach Abholung durch alle (B-47); nicht zeichenbares Bild wird nicht gezeigt (B-36); Einspielen ergänzt nur, überschreibt nichts (B-57); Foto in Sekunden beim Büro mit sichtbarer Bestätigung (B-17).
- Sternebewertung zu B-11, B-13, B-14, B-33, B-39, B-43 beim Abnahme-Gespräch.

## 8. Offene Fragen und Widersprüche im Auftrag
- **O-02:** Server für das private Relais einrichten (Betrieb, bis 2026-10-27) — Voraussetzung für K-13; ohne ihn kein Zulassungsdienst.
- NOCH NICHT GESCHÄTZT: keine Zeilen so markiert.
- Rahmen nennt iPhone und Windows-PC; Bedarf nennt nur Handy/Tablet/PC. Ob iOS-Besonderheiten (Installation, Hintergrund, Speicher) abgenommen werden, ist offen.
- „Ohne Internet: reicht unterwegs“ vs. „Abgleich sofort“: was offline genau gehen muss (nur lesen? Entwürfe?), ist nicht beschrieben.
- „Sicherung an einen zweiten Ort“: welcher Ort (Datei-Download, Datei-Dienst, Cloud?) ist nicht festgelegt; Daten sollen „nur auf dem Gerät“ liegen.
- „Installieren“ steht in K-05 und K-08 zugleich — Abgrenzung unklar.
- Unklare Begriffe ohne Erklärung im Auftrag: Siegel, Mycel, Lampen, Netz-Schublade (K-07), Vertrauens-Haken (K-11), Schreibnachweis (K-10), „Ziehen“ in der Galerie (Ziehen zum Auswählen oder zum Verschieben?).
- Zwei Schlüssel-Modelle: B-19 leitet den Schlüssel aus dem Code ab, B-46 sagt, der Code öffnet nur die Tür und jeder Raum hat einen eigenen Raumschlüssel. Wie Code und Raumschlüssel zusammenspielen (und wie der Raumschlüssel übergeben wird), muss geklärt werden.
- B-51 (Mitlesen mit Code bis zum Umzug) ist eine bekannte Schwäche — ist sie so akzeptiert?
- Datei-Dienst-Schwelle 20 MB gilt laut B-28 für Videos; gilt sie auch für andere Dateien (K-10)?
- „Warnung bei Programmen“: welche Dateiarten gelten als Programm?
- Wer ist Leitung bei Gründung, kann die Leitung übertragen werden, was passiert, wenn die Leitung ihr Gerät verliert?
- Übersetzen und Bedeutungssuche auf dem Gerät: Sprachen, Modellgröße und Download nicht angegeben.
- Sterne „bei der Abnahme“ sind schon eingetragen, obwohl alles neu zu bauen ist — Herkunft unklar.
- Verschwiegenheitserklärung, Zahlungsvereinbarung, Wartungsvertrag: nicht aktiviert; Euro nicht enthalten.
