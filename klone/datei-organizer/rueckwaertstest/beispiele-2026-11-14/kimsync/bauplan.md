# Bauplan · V-2026-0001 · Fassung 3

Kunde: ⟦KUNDE-1⟧ · Fassungsdatum 2026-10-25 · Gesamtauftrag (keine frühere Fassung, alles unter „Zu tun“ ist NEU BAUEN). Keine Zeile UNVERÄNDERT, ANPASSEN oder ENTFERNEN; keine Zeile NOCH NICHT GESCHÄTZT.

## 1. Zweck und Nutzer

Ein kleiner Messenger für Bilder, Videos, kurze Nachrichten und Dateien im kleinen Kreis, ohne fremden Messenger, ohne Konto und ohne Telefonnummer (B-10, B-31). Anlass: mehrere Räume, Gruppen mit Leitung, beliebige Dateien, Umzug aufs neue Handy.

Nutzer: ⟦KUNDE-2⟧ und Mitarbeiter auf der Baustelle (4) sowie das Büro (1) (B-06, B-07). Leute ohne Technikwissen: ein Knopf je Handgriff (B-24). Hauptfälle: Baustellenfotos, Videos, kurze Abstimmungen (B-29); ein Foto ist in Sekunden beim Büro, und man sieht, dass es angekommen ist (B-17).

Probleme heute: Fotos laufen über einen großen Messenger, der mitliest (B-01, B-08); große Videos scheitern per Mail (B-02); man weiß nicht, ob ein Bild angekommen ist (B-09).

## 2. Plattformen, Datenort, Sicherung, Netz

- Geräte: Android-Handy, iPhone, Tablet, Windows-PC, Browser (Rahmen; B-25–B-27). Form: installierbare Web-App ohne Konto (B-18).
- Offline: muss unterwegs reichen. Unversandtes wird gemerkt und nachgesendet, sobald die Verbindung zurück ist (B-22).
- Abgleich: sofort zwischen Geräten, über Relais (K-01).
- Datenort: auf dem Gerät; eigener Server nur für Relais, Zulassungsdienst und Datei-Dienst (K-03, K-13). Auf Relais nur verschlüsselte Teile (B-12, B-32, N-02).
- Verschlüsselung: Raum-Code im Format XXXX-XXXX-XXXX-XXXX, Schlüssel auf dem Gerät per PBKDF2 abgeleitet, AES-GCM (B-19). Je Raum ein eigener Raumschlüssel; der Code öffnet nur die Tür (B-46). Jeder Zettel signiert, beim Empfang geprüft (B-21).
- Sicherung: verschlüsselte Datei, vom Nutzer angestoßen, an einen zweiten Ort; auf neuem Gerät einspielbar (K-12, B-43).
- KI: nur auf dem Gerät (Diktat, Bedeutungssuche, Übersetzen, K-14).
- Personenbezogene Daten: ja, Fotos (B-30).

## 3. Bereiche/Seiten

1. Raum betreten / Raumliste (mehrere Räume mit Namen, ein Tipp wechselt) – K-09
2. Verlauf eines Raums mit Eingabe (Text, Bild, Video, Datei, Mikrofon) – K-01, K-10, K-14
3. Galerie des Raums mit Auswahl, Ziehen, Löschen; Ansicht mit Videoabspieler – K-04
4. Gruppe: Mitglieder, Leitung, Profilbilder, Einlass bestätigen, Herausnehmen, private Nachricht – K-09, K-11
5. Suche (Wort und Bedeutung) – K-14
6. Einstellungen: Sprache DE/EN/RU, drei Themen, Installieren, Neu laden, Relais, Datei-Dienst-Zugang, Sicherung – K-05, K-08, K-12, K-13
7. Netz-Anzeige (Siegel, Mycel, Lampen) – K-07

## 4. Funktionen

1. **K-01** Zwei oder mehr Geräte mit gleichem Raum-Code tauschen Bilder, Videos und kurze Nachrichten über Relais, signiert und verschlüsselt (B-11, B-12, B-19, B-21). Bilder werden verkleinert, Videos unverändert in Teilen gesendet und beim Empfänger zusammengesetzt (B-20). Prüfung: Relais-Inhalt enthält keinen Klartext; ein veränderter Zettel wird abgewiesen.
2. **K-02** Abholbestätigung sichtbar beim Absender (B-13, B-09); nach Abholung durch **alle** werden die eigenen Teile vom Relais gelöscht (B-23, B-47); Unversandtes wird nachgesendet (B-22). Prüfung: Löschung erst nach der letzten Quittung; offline Gesendetes geht nach Wiederverbindung raus.
3. **K-03** Große Videos (über 20 MB) über den Datei-Dienst des Hauses, Prüfung der Unversehrtheit per SHA-256 (B-14, B-28).
4. **K-04** Galerie aller Bilder und Videos des Raums; mehrere auswählen (auch durch Ziehen) und löschen; Ansicht mit Videoabspieler (B-15).
5. **K-05** Oberfläche Deutsch, Englisch, Russisch; Installieren; Neu laden; drei Themen (B-16).
6. **K-06** Empfangene Bilder werden neu gezeichnet, bevor sie gezeigt oder gespeichert werden (kein Standort, keine versteckte Datei); vorhandener Bestand einmal nachgezeichnet (B-33). Lässt sich ein Bild nicht zeichnen: nicht zeigen, Hinweis setzen, nie das Original (B-36).
7. **K-07** Die App ist ein Knoten im Netz der eigenen Apps (SBKIM, Modulsatz aus Sage-Protokol) mit Siegel, Mycel und Lampen; beim Laden wird nichts gesendet (B-34, B-38). Eigene Netz-Schublade, getrennt vom Raum (B-37).
8. **K-08** Installieren zusätzlich in den Einstellungen; eigene Manifest-Kennung je App (B-35).
9. **K-09** Mehrere Räume mit Namen, verschlüsselt im Tresor gemerkt (B-39). Gruppe mit Leitung: Eintritt nur mit Bestätigung, Herausnehmen nur durch die Leitung, Profilbild (B-40). Umzug des Raums durch die Leitung (neuer Schlüssel), damit ein bekannter Code nicht weiter mitliest (B-51). Prüfung: ohne Bestätigung kein Lesen; nach Umzug liest ein Herausgenommener nichts Neues.
10. **K-10** Beliebige Dateien (PDF, App-Datei, ZIP), Warnung bei Programmen (B-41). Zugang zum Datei-Dienst gibt die Leitung an die Gruppe weiter, ohne den Code zu zeigen (B-48); Abschluss des Hochladens mit Schreibnachweis.
11. **K-11** Gelesen-Haken, private Nachricht an eine Person, Vertrauens-Haken (B-42).
12. **K-12** Sicherung in eine verschlüsselte Datei, Einspielen auf neuem Gerät ohne Verlust (B-43). Prüfung: Räume, Verlauf, Medien nach Einspielen vollständig.
13. **K-13** Relais wählbar je Gerät und je Raum; die Leitung gibt eigene Relais an die Gruppe weiter; Zulassungsdienst auf dem eigenen Server, nur zugelassene Geräte schreiben (B-44, B-50).
14. **K-14** Mikrofon in jedem Textfeld, Suche nach Wort und Bedeutung, Übersetzen – alles auf dem Gerät (B-45).

Ohne eigenen Baustein, aber abzunehmen: B-18, B-19, B-20, B-21, B-22, B-23, B-36, B-37, B-46, B-47, B-48, B-49 (siehe 7).

## 5. Schnittstellen zu anderen Programmen

- Relais (fremde und eigene) – nur verschlüsselte Teile (B-32).
- Datei-Dienst des Hauses („Datei-Post“) für große Dateien (B-28; Vorlage Datei-Post für K-03/K-10).
- Zulassungsdienst am eigenen Relais (B-50).
- Netz der Schwester-Apps, SBKIM (B-38).
- Eigene Programme: Dateien hin- und hergeben (Rahmen). Familienakte: nur Pakete transportieren, nicht einbinden (B-49).

Vorlagen laut Auftrag (nur als Namen; nicht eingesehen): Kim-sync (K-01, K-11), Datei-Post (K-03, K-10), Auslieferungsprüfer (K-06), Mein-Rezeptbuch-Page/Workfloh-PDF-Page (K-08), Sende-Prüfer (K-09), Company Brain (K-14). Faktoren: Offline ×1,15 (K-01), Mehrsprachig ×1,2 (K-05), Mehrere Nutzer ×1,3 (K-09), Server ×1,6 (K-13).

## 6. Ausdrücklich nicht

- N-01: kein Konto, keine Telefonnummer.
- N-02: kein Klartext auf dem Relais.
- Kein Abo, keine Werbung (B-31).
- Keine Einbindung einer fremden App in die Familienakte (B-49).
- Keine KI außerhalb des Geräts (Rahmen).

## 7. Abnahme

Je K-01 bis K-14 die Prüfungen aus Abschnitt 4. Zusätzlich die Systemsätze ohne Baustein:
B-18 installierbar ohne Konto auf Handy/Tablet/PC · B-19 Code-Format und Schlüsselableitung auf dem Gerät · B-20 Bilder verkleinert, Videos unverändert in Teilen · B-21 Signatur geprüft · B-22 Nachsenden · B-23/B-47 Löschen erst nach Abholung durch alle · B-36 kein Original bei nicht zeichenbarem Bild · B-37 Netz-Schublade getrennt · B-46 Raumschlüssel getrennt vom Code · B-48 Datei-Dienst-Zugang ohne Code-Anzeige · B-49 keine Einbindung in die Familienakte.
Ziel aus Nutzersicht: B-17 (Foto in Sekunden im Büro, Ankunft sichtbar).
Summe laut Auftrag: 253–460,2 h (inkl. Anpassung 2–6 h, Abstimmung 15 %, Puffer 20 %); keine Euro (`euro: nein`). Grenzlinie: keine.

## 8. Offene Fragen und Widersprüche im Auftrag

1. **O-01** Welche Relais nutzt der Betrieb? (Kunde, „bis 2026-10-04“ – liegt vor dem Fassungsdatum 2026-10-25: erledigt oder überfällig?)
2. **O-02** Server für das private Relais einrichten (Betrieb, bis 2026-10-27). K-13 hängt davon ab.
3. Datenort „nur auf dem Gerät, eigener Server“ – widersprüchlich formuliert; was genau liegt auf dem Server (nur Relais/Datei-Dienst oder auch Daten)?
4. iPhone und Windows: als Web-App im Browser (B-18) oder eigene native Apps? Der Auftrag nennt nur die Web-App.
5. Unbestimmte Begriffe: „Tresor“ (K-09), „Siegel, Mycel, Lampen“ (K-07), „Vertrauens-Haken“ (K-11), „Schreibnachweis“ (K-10), „Netz-Schublade“ (B-37), „Zettel“ (B-21). Ohne Vorlagen nicht baubar beschrieben.
6. B-51 sagt, wer den Code hat, liest mit, bis umgezogen wird; B-46 sagt, der Code öffnet nur die Tür. Wie verhält sich der Raumschlüssel zum Code beim Einlass (B-40)?
7. „Umzug aufs neue Handy“ (Anlass) vs. „Umzug durch die Leitung“ (K-09): zwei verschiedene Umzüge – bitte bestätigen.
8. Sicherung „an einen zweiten Ort“: welcher Ort (Datei-Dienst, USB, Cloud)?
9. Galerie „Ziehen“ (K-04): Auswahl durch Ziehen oder Verschieben?
10. Warnung bei Programmen (B-41): welche Dateitypen gelten als Programm?
11. B-49 nennt die Familienakte; sonst kommt sie im Auftrag nicht vor. Welche Pakete, welches Format?
12. Datei-Dienst-Grenze 20 MB nur für Videos (B-28) – gilt sie auch für andere Dateien (K-10)?
13. Übersetzen „auf dem Gerät“: welche Sprachpaare, welches Modell, Größe?
14. „Nutzen“-Angaben fehlen bei mehreren Muss-Bedarfen (B-12, B-33, B-40) – für die Abnahme unerheblich, nur vermerkt.
