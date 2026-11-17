# Bauplan · Vorgang V-2026-0001 · Fassung 1 · Kundin ⟦KUNDE-1⟧

## 1. Zweck und Nutzer
Ein Programm, in dem die Inhaberin (B-11) ihre Belege für die eigene Steuererklärung und für ihren kleinen Online-Taschen-Shop als Kleinunternehmerin getrennt, aber an einem Ort ablegt, wiederfindet und verschlüsselt sichert (B-21, B-27, B-28).
Einzige Nutzerin, keine Mitarbeiter, keine Rollen (B-39); Bedienung muss sie allein am Wochenende schaffen (B-38).

## 2. Plattformen und Laufzeit
- Android-Tablet (B-40), alter Windows-Laptop (B-41), Browser am Arbeitsplatz-PC (B-42).
- Offline für K-01 bis K-05 und K-08 (Faktor „offline“ im Auftrag); online nur für K-06 Bank und K-07 Finanzamt (Faktor „server“).
- Kein Konto/Login (Annahme: folgt aus „keine Rollen“ und offline; ein Passwort schützt nur die Sicherung).
- Eine Codebasis als installierbare Web-App für alle drei Geräte (Annahme, wegen knappem Budget B-58).

## 3. Bereiche/Seiten
- Start: zwei Kacheln „Eigene Steuer“ / „Shop“ mit Jahr.
- Belege (je Bereich): Liste, Erfassen (Kamera/Galerie), Beleg ansehen.
- Suche (über beide Bereiche, Filter Jahr/Bereich).
- Shop-Monatssummen: Datei einlesen, Zuordnung prüfen.
- Bank (K-06), Steuer übermitteln (K-07) – erst nach Klärung O-02/O-03.
- Warenbestand/Inventur (K-08).
- Sicherung: Sichern auf SD-Karte, Wiederherstellen.

## 4. Funktionen
1. Beleg anlegen und genau einem Bereich zuordnen: eigene Steuer oder Shop (K-01, B-30).
2. Einfache Buchhaltung je Bereich: Betrag, Datum, Kategorie (z. B. Arbeitskleidung, Fahrten, Fortbildung – B-51), Jahresliste (K-01).
3. Shop-Bereich ohne Umsatzsteuer-Ausweis führen (Kleinunternehmerin, B-07) (Annahme: keine USt-Rechnung).
4. Beleg mit Kamera fotografieren und speichern (K-02, B-31).
5. Beleg aus der Galerie übernehmen; Original bleibt in der Galerie unverändert (K-02) (Annahme).
6. Text der Belege offline lesbar machen (Texterkennung auf dem Gerät) (K-04).
7. Suche per Wort und Jahr, z. B. „Sicherheitsschuhe 2025“ findet den Beleg (K-04, B-23).
8. Shop-Export einlesen, Monatssummen erkennen und dem Shop-Bereich zuordnen, vor dem Speichern zur Bestätigung zeigen (K-05).
9. Verschlüsselte Sicherung des ganzen Bestands (Daten + Belegbilder) als eine Datei auf SD-Karte schreiben und nach dem Schreiben zurücklesen/prüfen (K-03, B-20).
10. Wiederherstellen aus dieser Datei auf einem neuen/leeren Gerät mit Passwort (K-03).
11. Kontoumsätze direkt von der Bank abholen und zuordnen (K-06, B-25).
12. Steuererklärung elektronisch ans Finanzamt übermitteln (K-07, B-24).
13. Warenbestand der Taschen führen und Inventur erfassen (K-08, B-37).

## 5. Datenhaltung und Sicherheit
- Daten lokal auf dem jeweiligen Gerät; kein eigener Server für K-01–K-05/K-08.
- Personenbezogene, Bank- und Steuerdaten (B-55, B-57): Sicherungsdatei verschlüsselt (B-56); Passwort nur bei der Nutzerin.
- Lokale Daten verschlüsselt ablegen (Annahme; der Auftrag verlangt Verschlüsselung nur für die Sicherung).
- Kein Abgleich zwischen den drei Geräten vorgesehen; Übertragung nur über Sicherung/Wiederherstellen (Annahme, siehe Frage 9.4).

## 6. Schnittstellen
- Shop-Programm: Export-Datei einlesen (Format offen, O-01).
- Bank: direkte Abholung (O-02); typischerweise über eine Bank-Schnittstelle/Dienstleister mit Zugangsdaten der Kundin (Annahme).
- Finanzamt: elektronische Übermittlung (O-03); braucht Zertifikat/Registrierung der Kundin (Annahme).
- Kamera und Fotogalerie des Geräts; SD-Karte als Ablageort.

## 7. Bewusste Grenzen
- Keine Mehrbenutzer/Rollen (B-39).
- Kein Cloud-Speicher, keine Synchronisation zwischen Geräten (nicht beauftragt).
- K-06 und K-07 werden erst nach Klärung von O-02/O-03 und Budget (O-06) gebaut: groß, mit Server und je 48–96 h – bei „knapp bei Kasse“ (B-58) nicht ohne Freigabe.
- Keine Steuerberatung, keine Prüfung inhaltlicher Richtigkeit der Erklärung.
- Kein Anfassen von Original-Fotos in der Galerie.

## 8. Reihenfolge
1. K-01 Grundgerüst mit zwei Bereichen und Datenmodell.
2. K-03 Sicherung/Wiederherstellen (Muss, früh, damit nichts verloren geht).
3. K-02 Kamera/Galerie.
4. K-04 Texterkennung und Suche.
5. K-05 Shop-Import (nach O-01).
6. K-08 Warenbestand/Inventur (Kann).
7. K-06 Bank, K-07 Finanzamt – nur nach Klärung und Freigabe.

## 9. Offene Fragen an die Kundin
1. O-01: Welches Shop-Programm, welches Exportformat (Beispieldatei)?
2. O-02: Welche Bank, erlaubt sie direktes Abholen?
3. O-03: Finanzamt-Übermittlung nur für die eigene Erklärung oder auch Shop (z. B. Gewinnermittlung)?
4. O-04: Arbeitsplatz-PC nur lesen oder auch erfassen? Sollen Tablet und Laptop denselben Bestand sehen (dann Abgleich nötig)?
5. O-05: Wie viele Belege und Taschen pro Jahr?
6. O-06: Budget-Rahmen in Euro – reicht er für K-06/K-07?
7. Hat der Laptop/Arbeitsplatz-PC einen SD-Kartenleser, und darf am Arbeitsplatz-PC überhaupt eine Karte gesteckt werden?
8. Wo landen Belege aus dem Regal (B-01): sollen Papierbelege nachträglich abfotografiert werden?

## 10. Unklar, widersprüchlich, doppelt
- Doppelt: Bereich 8 (B-30–B-37) wiederholt Bereich 6 (B-20–B-26) fast wörtlich; B-27/B-28 wiederholen B-21/B-20 nochmals.
- Widerspruch Priorität: B-26 „Kann“, B-24/B-25 „Soll“, aber B-35–B-37 formulieren „Das System muss …“.
- Widerspruch Budget: B-58 „knapp, lieber günstig“ gegen Summe 219,8–415,7 h und „Grenzlinie keine“ (alles beauftragt, auch die zwei großen Bausteine).
- Summe passt nicht zur Tabelle: Einzelschätzungen addieren sich zu 160,9–302,1 h, „Summe“ nennt 219,8–415,7 h – ohne Erklärung (vermutlich Zuschläge/Faktoren, nicht angegeben).
- Offline-Anspruch gegen K-06/K-07 (Faktor „server“): Bank und Finanzamt gehen nur online.
- K-05 liest eine Export-Datei ein, B-25 will bei der Bank ausdrücklich „ohne Datei“ – zwei verschiedene Wege für ähnliche Aufgaben.
- B-32 „gern auf die SD-Karte“: im Browser am Arbeitsplatz-PC (B-42) ist SD-Zugriff unsicher.
- Kopf: Datum 2026-11-14 liegt nach dem heutigen Tag; „repo: Workflow-Needs“ nennt kein Zielprojekt für den Bau.
- Personenbezogene Bank-/Steuerdaten (B-55, B-57), aber Verschwiegenheitserklärung „aktiviert: nein“.
- `euro: nein` – Beträge bewusst weggelassen, keine Kostenaussage möglich.
- „NOCH NICHT GESCHÄTZT“ kommt nicht vor; alle acht Bausteine sind NEU BAUEN.
