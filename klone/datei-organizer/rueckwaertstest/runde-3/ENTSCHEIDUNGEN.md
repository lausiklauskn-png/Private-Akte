# Klaus' Entscheidungen nach der Diskussionsseite „Gewinn durch Reduktion“ (13.11.2026)

Seite: https://claude.ai/artifact/KNCi8QwJPWXSVGRfu9nbR3 (Kopie `REDUKTION.html`).

1. **Familienakte = das eigentliche Plus.** Wenn alles eingepflegt ist, gibt es nur drei Fragen: *Muss ich etwas tun? Gibt es einen
   Termin, den ich einhalten muss? Muss ich eine Nachricht an jemand anderen weitergeben?* Die „Pflege-Post“ ist kein eigenes Produkt,
   sondern dieser reduzierte Blick in der Familienakte. Lese-Post verschwindet nach 30 Tagen **aus der Sicht**, bleibt aber gespeichert
   und auffindbar.
2. **Chatty (family-projekt-go): ruhen lassen.**
3. **Workflow Needs:** Einstieg mit drei Fragen – *Was tut weh? Wer tut was auf welchem Gerät? Was darf es höchstens kosten?* –
   wobei der Preis am Nutzen gemessen wird (es darf kosten, wenn der Nutzen die Kosten weit überdeckt). Pflichtfragen dazu: *Was nimmt
   es an Aufwand weg? Wie viel Pflege kostet es?* Idee (Klaus erwägt): **kostenlose Bedarfsanalyse** als Einstieg für Kunden.
4. **Verantwortung:** Fristen und Termine pflegt und prüft jeder selbst. Die App legt jeden erkannten Termin **zur Gegenprüfung** vor
   (stimmt er, steht er im Kalender?) und übernimmt keine Haftung.
5. **Aufbewahrung:** 10 Jahre und länger. Daher regelmäßig auf einen **neuen Datenträger** umziehen (Erinnerung, Prüfung, dass die
   Kopie lesbar ist), damit nichts auf alten Datenträgern verloren geht.
6. **Hauptprüfung als Nächstes: Datei-Organizer als Produkt für Betriebe** – Daten des ganzen Betriebs einscannen/zusammenführen,
   logisch ordnen, kategorisieren, jederzeit finden und für die Arbeit mit KI bereitstellen, alles auf dem eigenen Rechner
   („wer will nicht seine Daten auf seinem eigenen Rechner organisiert haben?“). Ergebnis: `DATEI-ORGANIZER-PRUEFUNG.md`.

Gebaut wird aus 1, 3, 4, 5 erst nach einer Vorschau mit Klaus' Ja je Punkt (sichtbare Änderungen).
7. **Doppelungen zuerst (Klaus, Nachtrag):** Anhand von Dateigröße und Ordner Doppelungen finden, auch über den Code der Datei
   (Fingerabdruck): gleicher Name doppelt vergeben, gleiche Datei unter anderem Namen – Doppelungen fliegen raus (aus der Sicht, nicht
   von der Platte). Kann eine Datei nicht gelesen werden, wird sie über ihren Code erkannt (Dateisignatur, Fingerabdruck, Größe, Datum)
   und so eingeordnet. Das ist Reduktion: die Menge schrumpft, bevor geordnet wird.
8. **Mit dem Auslieferungsprüfer kombinieren (Klaus, Nachtrag):** Dessen Prüfkern liest Dokumente von innen (Dateikopf, PDF-Metadaten,
   innere Ströme). Aus diesem Code heraus Zuordnung, Sortierung und Erkennung: z. B. gleiche PDF-/ID = gleiche Herkunft, Ersteller/Firma
   aus den Office-Metadaten, echtes Erstellungsdatum statt Dateidatum, Message-ID bei Mails. Der Prüfkern ist im Plan schon als
   byte-gleicher Baustein vorgesehen (`docs/PLAN.md`), keine zweite Fassung.
9. **Prüfkern ausbauen (Klaus, Nachtrag):** Den Auslieferungsprüfer so erweitern, dass er Formate liest, die heute nicht lesbar sind
   (z. B. Office-Dateien, Outlook-Mails, Archive, Bildformate), damit der Organizer sie erkennen, zuordnen und Doppelungen finden kann.
   Ausbau im Repo des Auslieferungsprüfers, dann byte-gleich mit Pin in Organizer und Familienakte nachziehen.
10. **Umsetzung (Klaus, 13.11. nachts):** Texterkennung, Prüfkern und Doppelungen über den gleichen Inhalt hinaus werden eingebaut
    (Fassung 0.3.4). Mengen über ~800 Dateien: in den nächsten 2–3 Wochen Schritt für Schritt; dafür die Hälfte bis zwei Drittel des Budgets.
    Klaus' Begründung für den Vorsprung: Wer Paperless, Windows oder eine lokale KI hat, hat damit noch keinen sortierten Bestand – die
    **trainierte Vorsortierung** (an Prüfstapeln gemessen) nimmt die Fehler weg, das Programm allein nicht.
