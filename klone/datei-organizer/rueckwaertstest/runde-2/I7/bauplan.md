# Bauplan · Vorgang V-2026-0001 · Fassung 1 · Kunde ⟦KUNDE-1⟧

## 1. In einem Satz
Eine kleine App für den Inhaber eines Gastronomiebetriebs (⟦KUNDE-1⟧). Sie liest Lieferscheine und Rechnungen per Handyfoto oder aus dem Mail-Postfach ein und merkt sich die Einkaufspreise je Artikel und Lieferant. Sie warnt bei Preissprüngen, übernimmt den Umsatz aus der Kasse und zeigt jeden Montag den Wareneinsatz in Prozent vom Umsatz, getrennt für Küche und Getränke.

## 2. Plattformen und Technik-Grundentscheidungen
- **Geräte:** Android-Handy zum Fotografieren (B-34) und ein alter Windows-PC im Büro (B-35). Laut K-09 gibt es eine Android-App und eine Windows-Fassung.
- **Gemeinsamer Kern:** eine Web-Oberfläche, verpackt in eine Android-Hülle und eine Windows-Hülle (Vorlage: Hüllen aus Familienakte, BookLedgerPro und Workflow PDF Pro, 50 % wiederverwendet). Die Fachlogik ist einmal geschrieben und ohne Oberfläche testbar.
- **Daten:** nur auf dem Gerät, im eigenen Ordner oder auf der Speicherkarte (Rahmen). Es gibt keinen Server des Anbieters.
- **Internet:** „Ohne Internet: nein“ heißt: die App muss nicht ganz offline laufen. Internet braucht sie für den Mail-Abruf (K-02) und für Updates.
- **Texterkennung (K-01, Faktor KI ×1,25):** auf Basis von Workflow PDF (70 % wiederverwendet). Zuerst auf dem Gerät erkennen. Ein Cloud-Dienst kommt nur in Frage, wenn der Kunde das ausdrücklich freigibt (siehe Frage F3, Konflikt mit N-06/B-43).
- **Verschlüsselung und Sicherung:** Bausteine aus dem Pro-Tresor (Workflow PDF Pro) und aus der Vollsicherung der Familienakte (K-10).

## 3. Bereiche und Seiten
1. **Wochenzahl (Start):** Wareneinsatz in % der letzten Woche, Küche und Getränke getrennt. Darunter der Verlauf über die Wochen und offene Hinweise (Preiswarnungen, ungeprüfte Belege).
2. **Belege:** Eingang mit den Wegen Foto aufnehmen, Datei, Mail-Abruf. Die Liste zeigt den Stand jedes Belegs: neu, zu prüfen, bestätigt.
3. **Prüfen:** Beleg und erkannte Positionen nebeneinander. Unsichere Felder sind markiert. Hier werden auch Teillieferungen und Gutschriften zugeordnet.
4. **Artikel & Preise:** Artikelstamm mit Zuordnung Küche oder Getränke, Preis je Lieferant mit Verlauf.
5. **Preiswarnungen:** Liste der Warnungen, jede einzeln bestätigen oder verwerfen.
6. **Umsatz:** Kassen-Export einlesen, Umsatz je Tag und Woche, getrennt nach Küche und Getränke.
7. **Teller (Kann):** grobe Kalkulation für 5–6 Hauptgerichte.
8. **Einstellungen:** Postfach, Schwelle für die Preiswarnung, Speicherort, Sicherung, Zuordnung der Kassen-Warengruppen.

## 4. Funktionen
1. **K-01 Foto zu Beleg:** Kamera am Handy, Zuschnitt, Texterkennung. Ausgelesen werden Lieferant, Datum, Belegnummer, Art (Lieferschein, Rechnung, Gutschrift) und die Positionen (Artikel, Menge, Einheit, Einzelpreis, Gesamt). Das Original wird verschlüsselt abgelegt.
2. **K-01 Lieferanten-Wiedererkennung:** Bekannte Lieferanten und Artikelbezeichnungen werden der vorhandenen Stammzeile zugeordnet (Abgleich über Namen und Artikelnummer).
3. **K-02 Mail-Abruf:** Das Postfach (IMAP) wird auf Knopfdruck oder in festen Abständen abgerufen. PDF- und Bild-Anhänge gehen an die Beleg-Erfassung. Bereits geholte Mails werden gemerkt und nicht doppelt geholt.
4. **K-03 Prüfschritt:** Jedes Feld hat einen Sicherheitswert. Ist er unter der Schwelle, ist das Feld markiert und der Inhaber wird gefragt (B-26: nachfragen statt raten). Ein Beleg zählt erst nach dem Bestätigen.
5. **K-03 Summenprobe:** Die Summe der Positionen wird mit der Belegsumme verglichen. Weichen sie ab, muss der Beleg geprüft werden.
6. **K-03 Teillieferungen:** Mehrere Lieferscheine lassen sich einer Rechnung zuordnen und umgekehrt. Jede Ware wird nur einmal gezählt; gezählt wird nach der Rechnung, sobald sie da ist (siehe F6).
7. **K-03 Gutschriften:** Eine Gutschrift wird dem Ursprungsbeleg bzw. Artikel zugeordnet und mindert den Wareneinsatz der Woche, in der sie gebucht wird (siehe F6).
8. **K-03 Handschrift:** Handschriftliche Belege werden immer zur Prüfung vorgelegt. Positionen lassen sich von Hand ergänzen.
9. **K-04 Artikel- und Preisstamm:** Zu jedem Artikel gehören Bereich (Küche/Getränke), Einheit und Preise je Lieferant mit Datum und Herkunftsbeleg. Es gibt keinen Bestand und keine Inventur (N-04).
10. **K-04 Zuordnung:** Neue Artikel bekommen einen Vorschlag für Küche oder Getränke. Der Inhaber bestätigt ihn einmal, danach gilt er für diesen Artikel.
11. **K-05 Preiswarnung:** Der neue Preis wird mit dem letzten Preis und mit dem gleitenden Mittel (zum Beispiel der letzten 3 Käufe) verglichen, nach Einheit normiert. Die Schwelle ist einstellbar (Vorgabe zum Beispiel 5 %). Zusätzlich gibt es eine Warnung bei schleichendem Anstieg über mehrere Käufe (B-11).
12. **K-05 Bestätigen (B-18 „vorschlagen“):** Die Warnung ist ein Hinweis. Der Inhaber bestätigt oder verwirft sie, die App ändert nichts von selbst.
13. **K-06 Kassen-Import:** CSV und DSFinV-K werden eingelesen. Eine Zuordnung legt fest, welche Warengruppen der Kasse zu Küche und welche zu Getränke gehören (O-02). Doppelte Importe derselben Tage werden erkannt. Danach läuft der Import ohne Rückfrage (B-20 „selbst“).
14. **K-07 Wochenbericht:** Wareneinsatz % = bestätigter Einkauf netto der Woche ÷ Umsatz netto der Woche, getrennt für Küche und Getränke. Der Bericht entsteht jeden Montag von selbst (B-17 „selbst“). Er zeigt den Verlauf und die Abweichung zum Mittel.
15. **K-07 Vollständigkeit:** Der Bericht sagt, wie viele Belege der Woche noch ungeprüft sind. Ist die Zahl dadurch unsicher, steht das dabei. Fehlt etwas, zeigt er „unvollständig“ statt einer Null.
16. **K-08 Tellerkalkulation:** Je Gericht werden die Zutaten grob in Menge und Einheit eingetragen. Der Preis kommt aus dem Preisstamm. Ergebnis sind die Kosten je Teller und, wenn ein Verkaufspreis eingetragen ist, der Anteil davon. Nichts muss aufs Gramm genau sein (N-05).
17. **K-10 Ablage und Sicherung:** Belege und Zahlen liegen verschlüsselt auf dem Gerät. Die Sicherung läuft von selbst, wenn sich etwas geändert hat, und schreibt in einen gewählten Ordner bzw. auf die Speicherkarte.

## 5. Datenhaltung, Sicherung, Datenschutz
- **Gespeichert werden:** Belege (Originalbild/PDF), erkannte Positionen, Artikel, Lieferanten, Preisverlauf, Umsätze je Tag und Bereich, Warnungen, Gerichte.
- **Verschlüsselung:** alles verschlüsselt auf dem Gerät, mit Passwort und Ersatzschlüssel.
- **Sicherung:** verschlüsselt und von allein (Rahmen), eingespielt wird nur auf Knopfdruck.
- **Datenschutz:** Personenbezogene Daten gibt es nicht (B-42). Einkaufspreise und Umsätze sind vertraulich (B-43, N-06): keine Übertragung an Dritte, keine Auswertung, keine Telemetrie.
- **Lesbare Ausfuhr:** nur auf ausdrücklichen Wunsch des Inhabers (zum Beispiel für den Steuerberater, siehe F8).

## 6. Schnittstellen und Zusammenspiel
- **Kasse:** Datei-Import (CSV/DSFinV-K), keine Live-Verbindung. Das genaue Format ist offen (O-01).
- **Mail-Postfach:** IMAP nur lesend. Die Zugangsdaten liegen verschlüsselt im Gerät.
- **Handy und PC:** Weg zwischen Handy und PC ist **offen** (siehe F2). Mögliche Wege: gemeinsamer Ordner, Speicherkarte, Abgleich im eigenen Netz.
- **Steuerberater:** keine Schnittstelle (N-02).

## 7. Ausdrücklich nicht gebaut
- N-01: keine neue Kasse
- N-02: keine Buchhaltung, keine Buchungen, kein DATEV
- N-03: kein Bestellsystem
- N-04: keine Inventur und kein Bestand
- N-05: keine grammgenauen Rezepturen
- N-06: keine Weitergabe und kein Verkauf von Einkaufspreisen oder Umsätzen
- keine Eingaben durch die Köche (B-33)

## 8. Reihenfolge der Bauschritte
1. **K-09 Hüllen und K-10 Ablage:** Android- und Windows-Hülle, verschlüsselter Speicher, Sicherung.
2. **K-04 Artikel- und Preisstamm:** Datenmodell und Seite „Artikel & Preise“, zunächst mit Eingabe von Hand.
3. **K-01 Beleg-Erfassung per Foto:** Texterkennung und Positionen.
4. **K-03 Prüfschritt:** Markierungen, Summenprobe, Teillieferungen, Gutschriften.
5. **K-06 Kassen-Import:** sobald O-01 und O-02 geklärt sind und Beispieldateien vorliegen.
6. **K-07 Wochenbericht:** erster sichtbarer Nutzen (B-44: „am Anfang sichtbar, dass es etwas bringt“).
7. **K-05 Preiswarnung.**
8. **K-02 Mail-Abruf.**
9. **K-08 Tellerkalkulation (Kann).**
10. **Gerätetest beim Kunden:** echtes Handy, alter PC, echte Belege.

## 9. Abnahmekriterien
- **B-25:** Ein Foto eines Lieferscheins und ein PDF-Anhang aus einer Mail werden zu je einem Beleg mit Positionen.
- **B-26:** Ein absichtlich unscharfer oder handschriftlicher Beleg wird nie still übernommen. Die unsicheren Felder sind markiert und müssen bestätigt werden.
- **B-27:**
  - Zwei Teillieferungen und eine Rechnung zählen zusammen genau einmal.
  - Eine Gutschrift mindert den Einkauf um ihren Betrag.
- **B-28:** Nach drei Belegen desselben Lieferanten zeigt der Artikel drei Preise mit Datum.
- **B-29:**
  - Ein Preisanstieg über der Schwelle löst eine Warnung aus, einer darunter nicht.
  - Die Schwelle lässt sich ändern.
- **B-30:** Ein Kassen-Export wird eingelesen.
  - Die Tagesumsätze stimmen mit der Kasse überein, getrennt nach Küche und Getränke.
  - Ein doppelter Import ändert nichts.
- **B-31 / B-22:**
  - Am Montag steht der Wochenwert für Küche und Getränke da, nachgerechnet von Hand an einer Beispielwoche.
  - Fehlende Daten werden als „unvollständig“ gezeigt.
- **B-43 / N-06:** Bei einem Mitschnitt des Netzverkehrs ist keine Übertragung von Belegdaten zu sehen, außer dem Mail-Abruf vom eigenen Postfach.
- **Sicherung:**
  - Die Sicherung entsteht von selbst und ist nur mit Passwort lesbar.
  - Das Einspielen auf einem frischen Gerät stellt alles wieder her.
- **B-45:** Ein Beleg ist am Handy in unter einer Minute erfasst und bestätigt (Zielwert, mit dem Kunden abstimmen).

## 10. Offene Fragen und Unklarheiten
- **O-01 (klärt Kunde):** Welches Kassensystem genau, und in welchem Format kommt der Export? Bitte eine Beispieldatei.
- **O-02 (klärt Kunde):** Wie sind Küche und Getränke in den Kassendaten getrennt (Warengruppe, Steuersatz, Artikelnummer)?
- **F1 Wareneinsatz ohne Inventur:**
  - Der Wochenwert ist „Einkauf der Woche ÷ Umsatz der Woche“. Eine große Lieferung verzerrt ihn, es gibt keine Bestandsänderung (N-04).
  - Frage an den Kunden: Ist ihm das bewusst, und soll es zusätzlich einen gleitenden 4-Wochen-Wert geben?
- **F2 Handy und PC:**
  - Daten liegen „nur auf dem Gerät“, aber fotografiert wird am Handy und ausgewertet im Büro. Wie kommen die Daten vom Handy zum PC?
  - Kein Baustein deckt den Abgleich. Das ist eine Lücke im Umfang.
- **F3 Texterkennung und Vertraulichkeit:**
  - Der Faktor „KI“ an K-01 lässt einen KI-Dienst vermuten. Eine Cloud-Erkennung widerspräche N-06/B-43 und „Daten nur auf dem Gerät“.
  - Ist eine Erkennung nur auf dem Gerät gewollt, auch wenn sie schwächer ist?
  - Falls ein Dienst gewünscht ist: welcher (EU), und auf eigenen Schlüssel?
- **F4 Budget:** Um die 50 €/Monat (B-44). Ist das Betrag für Lizenz/Wartung? Laufende Kosten für einen KI-Dienst müssten hineinpassen. Beträge stehen nicht im Auftrag (euro: nein).
- **F5 Wer erfasst die Belege?**
  - Die Köche sollen nichts eintragen (B-33/B-08). Fotografiert also der Inhaber alle Lieferscheine?
  - Oder nehmen die Köche nur das Foto an, ohne etwas einzutippen?
- **F6 Stichtag der Woche:** Zählt ein Beleg nach Lieferdatum oder nach Rechnungsdatum? Wie werden Gutschriften zeitlich verrechnet?
- **F7 Netto oder brutto:** Wird mit Netto gerechnet? Welche Steuersätze gelten für Küche und Getränke? Wie wird mit Pfand und Leergut bei Getränken umgegangen?
- **F8 Ausfuhr an den Steuerberater:** Soll es eine Ausfuhr geben? Sie wäre keine Buchhaltung (N-02), aber vielleicht nützlich. Bisher nicht beauftragt.
- **F9 Postfach:** Welcher Anbieter (IMAP, Microsoft, Gmail)? Zugang mit App-Passwort? Werden nur Mails bestimmter Absender geholt?
- **F10 Alter Windows-PC:** Welche Windows-Fassung, wie viel Arbeitsspeicher? Davon hängt ab, ob die Windows-Hülle und die Texterkennung dort laufen.
- **Unklarheit Schätzung:** K-08 ist mit 1,2–2,4 h sehr knapp geschätzt, die Eingabe der Gerichte und Zutaten kommt hinzu. K-03 ist als „mittel“ eingestuft, aber mit 24–44 h hoch geschätzt. Beides vor dem Bau prüfen.
- **Unklarheit B-18 / B-19 „vorschlagen“:**
  - Bei B-19 heißt „vorschlagen“: erkannte Belege werden erst nach Bestätigung übernommen. So ist es im Plan umgesetzt.
  - Bei B-18 ist offen, ob die Warnung nur angezeigt wird oder ob etwas vorgeschlagen werden soll, zum Beispiel ein anderer Lieferant. Ein Lieferantenvergleich ist nicht beauftragt.
- **Noch nicht geschätzt:** keine Zeile so markiert. Die Lücke „Abgleich Handy–PC“ (F2) ist aber nirgends geschätzt.
