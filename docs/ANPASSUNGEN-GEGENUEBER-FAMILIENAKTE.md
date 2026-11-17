# Anpassungen gegenüber der Familienakte

Laufende Liste (Klaus 17.11.2026): was beim Schritt-für-Schritt-Ausprobieren der Privaten Akte aufgefallen ist und was hier anders
gemacht wurde als in der Familienakte. **Mit jedem Schritt ergänzen.** Zweck: am Ende ein Überblick, und die Vorlage für die
spätere Überarbeitung der Familienakte.

Die Mechanik darunter (Tresor, Register, Vollsicherung) ist dieselbe wie in der Familienakte und bleibt unverändert
(`klone/familienakte/`). Angepasst werden Wörter, Wege und die Hülle.

Spalte „Für die Familienakte“: was dort zu prüfen wäre. Das sind Hinweise, **dort ist noch nichts nachgesehen oder geändert**.

## A. Wörter und Wege (aus Klaus' Test am Tablet)

| Nr. | Was Klaus aufgefallen ist | Was hier angepasst wurde | Für die Familienakte |
| --- | --- | --- | --- |
| A1 | „Tresor exportieren“ beim ersten Mal irreführend: für ihn entsteht der Tresor erst mit dem sichtbaren Ordner. Dass schon vorher alles unsichtbar im Speicher des Browsers liegt, sagt die App nicht. | 0.3.3 erst eigene Wörter fürs erste Mal, mit 0.3.4 ersetzt: an den Knöpfen heißt es „Akte“ (was in der App liegt) und „Backup“ (die Kopie als Ordner), nicht „Tresor“. | Prüfen, wo „Tresor“, „Vollsicherung“, „Sicherung“ und „Akte“ nebeneinander stehen und ob klar ist, was davon ein Ort und was eine Kopie ist. |
| A2 | „Datei hineinlegen“ stand unter „Was möchtest du finden?“. Hineinlegen ist nicht finden – und wohin: in die Akte oder in den Tresor? | 0.3.4: der Knopf ist von der Startseite weg. Hineinlegen geht über „Importieren“ oben; das Fenster nennt den Ort („Datei in die Akte legen“, liegt danach unter „Deine Unterlagen“). | Prüfen, ob Knöpfe zum Hereinbringen unter Überschriften stehen, die nach Suchen/Finden klingen, und ob beim Ablegen gesagt wird, wo die Datei danach liegt. |
| A3 | Vorbild Rezeptbuch: oben zwei kleine Knöpfe, Import und Export. Import = etwas kommt ins Programm, Export = etwas geht hinaus (auch das Backup). | 0.3.4: zwei Strich-Knöpfe oben rechts, grüner Pfeil nach unten „Importieren“ (Datei in die Akte legen, Backup einlesen), roter Pfeil nach oben „Exportieren“ (Backup erstellen). Schild-Knopf entfernt. | Prüfen, ob „Sicherung einlesen“, „Vollsicherung“, Paket, Eingangsordner als ein Weg „hinein“ und ein Weg „hinaus“ erkennbar sind. |
| A4 | Der Backup-Ordner hieß „Familienakte_Vollsicherung_…“, obwohl er aus der Privaten Akte kam; nicht zu unterscheiden. Die Uhrzeit im Namen war Weltzeit (18-19 statt 19:19). | 0.3.5: außen „Privatakte_Backup_<Datum>_<Uhrzeit>“ in Ortszeit; darin unverändert der Ordner der Familienakte, damit sie dasselbe Backup lesen kann. | Uhrzeit im Ordnernamen der Vollsicherung ist Weltzeit – prüfen, ob Ortszeit verständlicher ist. |
| A5 | Nach dem Export war der Ordner nicht wiederzufinden. Die Ansicht „Downloads“ am Tablet zeigte nur das Notfallblatt, nicht den Ordner. | 0.3.1: das Fenster nennt, wann und in welchen Ordner zuletzt gesichert wurde. Der Browser gibt nur den Namen des gewählten Ordners her, keinen Pfad. | Prüfen, ob nach einer Vollsicherung gesagt wird, wo sie liegt und wie man sie in der Dateien-App findet. |
| A6 | Einlesen in dieselbe Akte meldet „Zusammengeführt: 0 neu, 0 Dateien hereingeholt“. Richtig, aber ohne Erklärung. | Noch nicht angepasst. | Meldung beim Zusammenführen prüfen: sagt sie, dass schon alles da war? |
| A7 | Der Browser zeigte trotz Hard Reload die alte Fassung („Browser sind schwarze Löcher“). | 0.3.2: App-Dateien werden beim Server nachgefragt, die Fassungsmarke ist ein Knopf („Neue Fassung · antippen“). Am Tablet bestätigt. | Die Familienakte hat das Update-Fähnchen; prüfen, ob die PWA dort dasselbe Problem mit dem Zwischenspeicher hat. |

| A8 | Suche: nur eine Suchleiste, mit Mikrofon und X; kein eigener Knopf für die Bedeutungssuche – sie soll verdeckt hinter „Finden“ arbeiten, und wenn sie keinen Zusammenhang findet, greifen die Wörter. | 0.3.6: X und Mikrofon im Suchfeld, „Finden“ sucht mit der Wortsuche der Familienakte in den echten Unterlagen. Bedeutungssuche folgt als zweiter Schritt hinter demselben Knopf. | Dort ist die Bedeutungssuche ein eigener Bereich mit eigenen Schaltern; prüfen, ob sie hinter der einen Suche verschwinden kann. |
| A9 | Gesucht wird hier nur in Titel, Dateiname, Bereich und Notiz, nicht im Inhalt – beim Ablegen wird noch kein Text gelesen. | Noch nicht angepasst (kommt mit dem Eingang aus dem Klon). | – |
| A10 | Bedeutungssuche: nach „Finden“ einmal fragen „Ja / Nein“ mit Ladebalken; bei Nein verschwindet die Frage und kommt beim nächsten „Finden“ wieder, damit man merkt, woran es liegen kann, wenn nichts gefunden wird. Später über Einstellungen wieder einschaltbar. | 0.3.7 so gebaut. Mit echtem Modell noch nie gelaufen. | Dort ist die Bedeutungssuche laut Notizen in der Web-App ebenfalls nie mit echtem Modell gelaufen – am Gerät prüfen. Die Pins nennen für die kleine Stufe keine Dateigrößen (Ladebalken). |
| A11 | Zurück (Android, Browser, Maustaste) schloss die App. Es soll mehrmals zurückgehen, ohne dass sie schließt. | 0.3.7: Zurück geht einen Schritt in der App zurück; am Anfang bleibt sie offen, erst das zweite Zurück verlässt sie. | Prüfen, wie sich die PWA der Familienakte beim Zurück verhält. |
| A12 | Erster echter Lauf der Bedeutungssuche: alle Unterlagen erschienen als „dem Sinn nach“, auch völlig Fremdes; der genaue Wort-Treffer stand darunter; ohne Zahl war nicht zu sehen, ob Wort- oder Bedeutungssuche gefunden hat. | 0.3.9: strengere Schwelle, Wort-Treffer oben, Sinn-Treffer als eigener Abschnitt unten mit der Nähe als Zahl (8,5), nach Nähe sortiert. | Dort steht die Zahl an den Treffern und es wird nach ihr sortiert (Klaus). Eine Schwelle, unter der nichts gezeigt wird, prüfen. |
| A13 | „Gehaltsabrechnung September“ fand nichts, obwohl es eine Gehaltsabrechnung gibt – ein Wort, das nicht passt, darf nicht alles verwerfen. | 0.3.9: findet die Suche mit allen Wörtern nichts, zählt, was die meisten Wörter trifft, mit Hinweis „nicht alle Wörter passen“. | Die Wortsuche dort verlangt alle Wörter (mehr Wörter = weniger Treffer). Prüfen, ob ein Rückfall auf Teil-Treffer gewünscht ist. |
| A14 | Das Mikrofon der Suche lief weiter, wenn man statt Stopp gleich „Finden“ drückte; es war nicht mehr rot, nahm aber auf. | 0.3.9: Diktat endet bei „Finden“, beim Neuzeichnen und im Hintergrund. | Prüfen, ob das Diktat dort bei „Suchen“ oder beim Wechsel der Ansicht sicher endet. |
| A15 | Die Bedeutungssuche der Familienakte nutzt den rohen Cosinus und zeigt ihn als Zahl. Sage-Protokol hat gemessen, dass der rohe Wert bei unverwandten Texten schon bei rund 0,82 liegt, und Abhilfen gebaut: zentrierter Cosinus, BM25 und Vektor verschmolzen, mehrere Formulierungen. | 0.4.0: Suche auf den Baustein aus Sage umgestellt (Klon mit Pin), zentrierte Nähe als Zahl. Am Gerät mit echtem Modell ungeprüft. | Die Verbesserungen aus Sage sind in der Familienakte nicht angekommen – dort ebenfalls nachziehen. |
| A16 | Erster Lauf von 0.4.0 am Tablet (drei Unterlagen): eine fremde Notiz erschien „dem Sinn nach“ mit 0,11 und 0,16. | 0.4.1: gezeigt wird erst ab 0,2. Ein wirklich passender Sinn-Treffer wurde noch nicht gesehen. | Bei kleinem Bestand trägt der Mittelwert wenig – beim Nachziehen dort mit mehr Unterlagen messen. |
| A17 | „Dokumente für eine Auslandsreise“ zeigte alle Unterlagen mit „nicht alle Wörter passen“; „was brauche ich …“ fand die Waschmaschine. | 0.4.1: im Rückfall zählen Füllwörter und Bereichswörter („Dokumente“, „Brief“) nicht mehr einzeln. | Ein Bereichswort allein („Dokumente“) trifft dort jede Unterlage – gewollt, aber bei einem Rückfall auf Teil-Treffer beachten. |

## B. Vereinfachungen der Hülle

| Nr. | Was Klaus wollte | Was hier gemacht wurde | Für die Familienakte |
| --- | --- | --- | --- |
| B1 | Die erste Vorschau war zu kompliziert, Überblick verloren. Maßstab: weniger Knöpfe, kürzere Wege, nichts doppelt. | Sammelknopf „Ablegen“ und Knopf „Landkarte“ entfernt (0.1.1). | Prüfen, welche Wege doppelt sind. |
| B2 | Erklärtexte unter dem Baumbild überflüssig, das Bild erklärt sich. | Erklärkarten und Text über dem Film entfernt (0.1.3). | Prüfen, wo Erklärungen neben Bildern stehen, die sich selbst erklären. |
| B3 | Leiste nur als runde farbige Knöpfe; der Name als Tooltip ohne Klick, abschaltbar. | 0.1.3. Mit dem Finger gibt es keinen Tooltip. | Tooltips gibt es dort seit 2.28.57. |
| B4 | „Wo liegt was?“: ein Bild, das zeigt, dass es nur einen Speicher gibt. Überschriften „Hinzufügen“, „Tresor“, „Tools“. | 0.1.2–0.1.5 unter dem Baum. | Dort gibt es „Wo liegt was?“ hinter dem „?“ – Vergleich offen. |
| B5 | Die Programme heißen „Tools“ („Werkzeugstätte“ nur als Erklärung zum Bild). | 0.1.5. | – |

## C. Zusammenarbeit der Sitzungen

- Zwei Sitzungen haben dieselben drei Entscheidungen gleichzeitig als 0.1.1 gebaut. Aufgefallen erst beim Anlegen des PR.
  Folge: Stand der anderen Sitzung übernommen, eigenes Stück daraufgesetzt.
- Beide Sitzungen arbeiten auf `main` und vergeben Fassungsnummern; wer zusammenführt, muss vorher den neuesten Stand holen.
- Ein Brief stand kurz mit „noch nicht zusammengeführt“ auf `main`, obwohl es schon geschehen war.
- Ein Bildschirmfoto im Chat zeigte einen Notfallschlüssel. Feste Regel: keine Schlüssel im Chat. Das betroffene Backup
  (Probe-Unterlagen) nicht weiterverwenden, ein neues erstellen.

## Noch offen aus dem Test

- Der Tresor als wirklich gewählter Ordner (kann der Klon, „Ordner wählen“) – dann gäbe es „Tresor anlegen“ wirklich.
- Einzelne Unterlage exportieren (bisher nur das ganze Backup).
- Am Handy liegen Importieren/Exportieren hinter „⋯“.
