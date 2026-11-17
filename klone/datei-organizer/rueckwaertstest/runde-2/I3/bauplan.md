# Bauplan · Vorgang V-2026-0001 · Fassung 1 · Kunde ⟦KUNDE-1⟧

## 1. In einem Satz
Eine Wartungs-App für einen Heizungs-/Wärmepumpen-Fachbetrieb (Meister, 5 Monteure, 1 Azubi, Büro; rund 600 Anlagen): Monteure erfassen
Wartungsprotokolle offline auf dem Android-Handy (Messwerte, Fotos, Unterschrift, PDF), das Büro sieht am Windows-PC fällige Wartungen,
schlägt Termine vor und gibt die Daten fürs Handwerkerprogramm weiter.

## 2. Plattformen und Technik-Grundentscheidungen
- **Android** (Monteure, K-04) und **Windows** (Büro, K-04); eine gemeinsame Web-Oberfläche in nativen Hüllen (Vorlage: Android-/Windows-Hülle
  aus Familienakte, BookLedgerPro, Workflow PDF Pro, 50 % wiederverwendet).
- **Offline zuerst, immer** (Rahmen, B-25, B-47): alle Daten lokal auf dem Gerät (lokale Datenbank + Dateiablage für Fotos/PDF), keine Funktion
  der Monteure braucht Netz.
- **Kleiner Betriebsserver** für den Abgleich Monteure ↔ Büro (K-05) und für die Terminseite der Kunden (K-06).
- **Abgleich:** Änderungsprotokoll je Datensatz (Gerät, Zeitpunkt, Version); Protokolle sind nach Unterschrift unveränderlich (nur anhängen),
  Stammdaten mit Konfliktanzeige statt stillem Überschreiben.
- **Rollen:** Inhaber, Büro, Monteur, Azubi (B-09–B-12); Kunden haben keinen Zugang zur App, nur den Terminlink.
- **Handlungsregel aus dem Rahmen:** B-22, B-26, B-27 → die App **schlägt vor**, ein Mensch bestätigt (Fälligkeit, Termin, Rechnungsübergabe).
  B-23, B-24 → die App **handelt selbst** (Protokoll speichern/abgleichen, Anlagenhistorie sofort anzeigen).

## 3. Bereiche / Seiten
Handy (Monteur): Heute/Meine Termine · Kunde & Anlage (Suche, auch per Seriennummer) · Anlagenhistorie · Wartungsprotokoll · Abgleich-Zustand.
PC (Büro): Übersicht Fälligkeiten · Kunden & Anlagen (Pflege, B-43) · Terminvorschläge · Protokolle · Rechnungsübergabe · Excel-Übernahme ·
Export & Sicherung · Benutzer & Geräte · Konflikte.
Kunde (Browser, ohne App): Terminseite per Link.

## 4. Funktionen
1. **Anlagenkartei (K-01):** Kunde mit Anschrift/Kontakt; je Kunde beliebig viele Anlagen mit Gerätetyp, Hersteller, Seriennummer,
   Einbaudatum, Wartungsintervall (Monate). Ausgelegt auf ≥ 600 Anlagen (B-56).
2. **Anlagenhistorie (K-01, B-35, B-31):** am Gerät alle bisherigen Protokolle, getauschte Teile und offene Mängel; offene Mängel oben, markiert.
3. **Fälligkeitsrechnung (K-02, B-34):** nächste Fälligkeit = letzte Wartung + Intervall; Liste „überfällig“, „in den nächsten N Wochen“
   (N einstellbar), je Kunde gruppiert, filterbar.
4. **Erinnerung fürs Büro (K-02, B-22):** Hinweis/Glocke am PC für neu fällig Werdendes (Vorlage Familienakte Kalender/Glocke, 50 %);
   nur Vorschlag, das Büro bestätigt.
5. **Wartungsprotokoll (K-03, B-36):** Checkliste je Gerätetyp (Vorlagen im Büro pflegbar), Messwerte mit Einheit und Plausibilitätsgrenzen,
   Mängel (neu/behoben), getauschte Teile, Arbeitszeit, Material.
6. **Fotos (K-03, B-54):** Kamera direkt aus dem Protokoll, verkleinert gespeichert, dem Protokoll und der Anlage zugeordnet.
7. **Unterschrift (K-03, B-37):** Unterschriftsfeld am Bildschirm (Finger), Name in Druckschrift, Zeitstempel; danach Protokoll gesperrt.
8. **Protokoll-PDF (K-03, B-30):** sofort nach Unterschrift offline erzeugt; Weitergabe an den Kunden über Teilen (Mail-App) vor Ort.
9. **Offline-Abgleich (K-05, B-38, B-21):** automatischer Abgleich sobald Netz da ist, Warteschlange sichtbar („3 Protokolle warten“),
   Fotos nachgeladen; Konflikte in einer Liste im Büro zur Entscheidung.
10. **Terminvorschlag (K-06, B-39, B-26):** Büro wählt fällige Anlagen → App schlägt Termin(e) vor → Büro bestätigt → Kunde erhält Link;
    Kunde bestätigt oder wählt einen anderen der angebotenen Termine; Ergebnis kommt beim Abgleich zurück. Versandweg offen (O-02).
11. **Rechnungsübergabe (K-07, B-40, B-27):** je abgeschlossener Wartung Exportdatei mit Kunde, Leistung, Material, Zeit; Büro wählt aus und
    bestätigt; Format offen (O-01), zunächst CSV als Annahme; übergebene Wartungen markiert (nicht doppelt).
12. **Excel-Übernahme (K-08, B-44, B-51):** einmaliger Import (Kunden, Anlagen, letzte Wartung) mit Spaltenzuordnung, Vorschau, Fehlerliste,
    Dubletten-Hinweis; erst nach Bestätigung übernommen.
13. **Export (K-09, B-41, B-28):** vollständiger Export aller Daten in offenem Format (JSON/CSV + Fotos + PDFs in ZIP), ohne App lesbar.
14. **Automatische Sicherung (K-09, Rahmen „von allein“):** regelmäßige Sicherung (Vorlage Pro-Tresor/Vollsicherung, 50 %), mit Zustand
    „zuletzt gesichert“ und Prüfung nach dem Schreiben.

## 5. Datenhaltung, Sicherung, Datenschutz
- Lokal auf jedem Gerät (offline-fähig); zentral auf dem Betriebsserver. Rahmen nennt zusätzlich „Cloud eines Anbieters“ → siehe Frage 1.
- Sicherung automatisch auf dem Server; Vollexport jederzeit durch das Büro.
- Personenbezogene Daten (B-57): Namen, Anschriften, Unterschriften, Fotos aus Wohnungen. Verschlüsselung auf dem Gerät und beim Transport,
  Rollenrechte, Geräte-Sperre bei Verlust (Gerät abmelden), Löschfristen/Auskunft für Kunden, Auftragsverarbeitung mit dem Hoster.
- Terminseite zeigt nur Termin und Betriebsname, keine Anlagendaten; Link mit Zufallskennung und Ablaufdatum.
- Daten gehören dem Betrieb (B-58): offenes Format, kein Herstellerzwang.

## 6. Schnittstellen und Zusammenspiel
- Handwerkerprogramm (B-48, bleibt): nur Dateiübergabe, keine Rechnungslogik (Rahmen: „Dateien hin- und hergeben“).
- Excel-Liste (B-49): einmalige Übernahme.
- Kunde: Terminlink (Mail/SMS offen).
- Server: Abgleich und Terminseite; keine weiteren Fremddienste.

## 7. Was ausdrücklich nicht gebaut wird
N-01 Rechnungen schreiben · N-02 Material bestellen · N-03 Plantafel (keine Einsatzplanung/Disposition über die Terminvorschläge hinaus) ·
N-04 Buchhaltung · N-05 kein „Programm für alles“ (Handwerkerprogramm bleibt). Ebenfalls nicht: Kunden-App, Kundenportal mit Historie.

## 8. Reihenfolge der Bauschritte
1. Hüllen Android/Windows und lokale Datenhaltung (K-04).
2. Anlagenkartei und Historie (K-01).
3. Excel-Übernahme (K-08) – früh, damit mit echten Beständen getestet werden kann.
4. Fälligkeitsliste und Erinnerung (K-02).
5. Wartungsprotokoll mit Fotos, Unterschrift, PDF (K-03).
6. Betriebsserver und Abgleich mit Konflikten (K-05).
7. Export und automatische Sicherung (K-09).
8. Rechnungsübergabe (K-07) – nach Klärung O-01.
9. Terminvorschlag per Link (K-06) – nach Klärung O-02.
10. Einweisung der Monteure (B-42), Probebetrieb mit 1–2 Monteuren.
Schätzung laut Auftrag: 409–790,9 h gesamt (inkl. Anpassung, Abstimmung 15 %, Puffer 20 %).

## 9. Abnahmekriterien
- B-33: zu jedem Kunden Anlagen mit Gerät, Seriennummer, Intervall angelegt und angezeigt.
- B-34: bald fällige und überfällige Wartungen erscheinen korrekt (Prüffall: Intervall 12 Monate, letzte Wartung vor 13 Monaten → überfällig).
- B-35: am Gerät bisherige Protokolle, getauschte Teile, offene Mängel sichtbar – auch offline.
- B-36: Protokoll mit Messwerten und Fotos auf dem Handy im Flugmodus erfassbar.
- B-37: Unterschrift aufgenommen, im PDF sichtbar, Protokoll danach unveränderlich.
- B-38: zwei Handys offline erfassen, dann Netz an → beide Protokolle im Büro, Konflikt bei gleichzeitiger Stammdatenänderung angezeigt.
- B-39: Termin vorgeschlagen, Kunde bestätigt bzw. wählt Alternative über Link, Ergebnis im Büro.
- B-40: Exportdatei vom Handwerkerprogramm fehlerfrei eingelesen (mit echtem Programm geprüft).
- B-41: Vollexport enthält alle Datensätze und Fotos, ohne App lesbar; Rückspielbarkeit geprüft.
- Excel-Übernahme: Anzahl übernommener Anlagen = Zeilen der Liste minus gemeldete Fehler.
- Leistung: 600 Anlagen, Suche/Liste am Handy ohne spürbare Wartezeit.

## 10. Offene Fragen und Unklarheiten
- **O-01** Welches Handwerkerprogramm, welches Importformat (CSV, GAEB, DATANORM, eigene Schnittstelle)?
- **O-02** Wie erreicht der Terminlink den Kunden (Mail, SMS, beides)? Wer zahlt SMS? Was, wenn der Kunde weder Mail noch Handy hat?
1. **Datenort widersprüchlich:** Rahmen nennt „eigener Server“ **und** „Cloud eines Anbieters“. Beides parallel, Cloud nur für die Sicherung,
   oder Server bei einem Cloud-Anbieter gemietet?
2. **Budget vs. Server:** 80–100 €/Monat für den ganzen Betrieb (B-59) – deckt das Server, Wartung, SMS? Laufende Kosten offenlegen.
3. **„Ohne Internet: immer“ vs. K-05/K-06:** Abgleich und Terminlink brauchen zwangsläufig zeitweise Netz; Annahme: „offline arbeiten, Abgleich
   bei Netz“. Bitte bestätigen.
4. **N-05 „kein neues Programm für alles“** vs. Bau einer neuen App: Annahme, dass ein eng begrenztes Wartungsprogramm gemeint ist. Bestätigen.
5. **Nicht durch einen Baustein abgedeckt:** B-42 (Einweisung), B-43 (Büro pflegt Stammdaten – teils K-01), B-57 (Datenschutzmaßnahmen),
   B-13 (Kunden unterschreiben – K-03/K-06 indirekt). Gehört Einweisung/Datenschutz zum Auftrag?
6. **Checklisten und Messwerte:** Gibt es Herstellervorgaben/Normen je Gerätetyp (Heizung vs. Wärmepumpe, z. B. Abgasmessung)? Wer liefert sie?
7. **Protokoll an den Kunden:** Soll der Kunde das PDF automatisch per Mail bekommen oder nur auf Wunsch?
8. **Rechte des Azubis:** darf er Protokolle abschließen und Unterschriften einholen?
9. **Handlungsregel B-25/B-28 „egal“:** keine Festlegung, ob vorgeschlagen oder selbst gehandelt wird – Annahme: automatisch.
10. **Erinnerung fürs Büro:** nur in der App, oder auch per Mail? Wie weit im Voraus („bald fällig“ = 4 Wochen?).
11. **Verträge:** Verschwiegenheitserklärung und Vereinbarung zu Zahlung/Rechten sind nicht aktiviert – vor Baubeginn klären.
NOCH NICHT GESCHÄTZT: keine Zeile im Auftrag so markiert.
