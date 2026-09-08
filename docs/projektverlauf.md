# Projektverlauf

Dieses Dokument ist eine nachträglich erstellte Chronologie des Projekts Air-Writing im Kurs Applied Machine Learning for Smart and Connected Systems (Leuphana, Sommersemester 2026). Es wurde am 07.09.2026 aus drei Quellen zusammengesetzt: dem wissenschaftlichen Artikel des Teams, der Git-Historie beider Repositorys samt Quelltext sowie den Kursunterlagen. Es ist kein während des Semesters geführtes Tagebuch: der Artikel enthält praktisch keine Datumsangaben, und die Git-Historie besteht aus neun Commits an fünf Tagen, zwischen denen große Lücken liegen. Jede Phase trägt eine Angabe, wie gut sie belegt ist. Wo die Quellen schweigen, steht das im Text.

---

## 1. Kursbeginn, Teambildung und Themenfindung

**Zeitraum:** Semesterbeginn (Foliensatz datiert 10.04.2026) bis Mitte Mai 2026  
**Belegstatus:** 🟡 teilweise belegt

Der Kurs lag laut Kursunterlage donnerstags um 10:00 Uhr s.t. in Raum 6.316. An welchem Termin die Einführungssitzung stattfand, ist aus den vorliegenden Quellen nicht belegbar: Der 10.04.2026 steht als Fußzeilendatum auf jeder Folie des Einführungssatzes, war aber ein Freitag; alle in der Unterlage genannten Termine (21.05., 28.05., 02.07., 09.07.2026) sind Donnerstage. Vorgegeben waren Teams zu drei Personen, ein Workload von 150 Stunden und regelmäßige Teilnahme an den Veranstaltungen (weekly stand-ups). Die Einführungsfolien kündigen an, dass ab der Folgewoche regelmäßig über die Projektideen gesprochen wird und jedes Team kurz den Stand seiner Überlegungen vorstellt; ob und wie regelmäßig das geschah, ist aus den vorliegenden Quellen nicht belegbar. Wochenberichte nennen die Unterlagen nicht; gefordert sind Anwesenheit, mündlicher Teamstatus und ein semesterbegleitendes GitHub-Repository, wobei kontinuierlicher Projektfortschritt und Abschlussbericht zusammen mit 60 Prozent bewertet werden. Das Team bestand aus Isa Kilic (Teamleitung), Efe Özüm und Tony Duong. Wann sich das Team gebildet und wann es sich auf das Thema Air-Writing festgelegt hat, geht aus keiner der Quellen hervor. Der früheste in Git belegbare Schritt ist der Commit vom 04.06.2026. Inhaltlich früher belegt, aber ohne Tagesdatum, sind der Random-Forest-Ansatz und die Kurzpräsentation, die auf einen der beiden Termine 21.05. oder 28.05.2026 fiel.

<details><summary>Belege</summary>

- ml4scs00.txt Z. 29-34: Foliendatum 10.04.2026, Donnerstag 10:00 s.t., Raum 6.316
- Kalenderprüfung: 10.04.2026 = Freitag; 21.05., 28.05., 02.07., 09.07.2026 = Donnerstage
- ml4scs00.txt Z. 152-164: Teams zu 3 Personen, Workload 150 h, weekly stand-ups, Teamstabilität
- ml4scs00.txt Z. 165-174 und 182-186: Teambildung per Google-Formular; Z. 182-183 als Ankündigung im Futur ("wir werden ab kommender Woche ...")
- ml4scs00.txt Z. 41: "kontinuierlicher Projektfortschritt und Abschlussbericht (60%)"; exam.txt Z. 13 und 45: semesterbegleitendes GitHub-Repository
- artikel.txt Z. 1-4: Autoren Efe Özüm, Isa Kilic, Tony Duong; Betreuung Prof. Dr. Burkhardt Funk
- git: frühester Commit beider Repos ist 03b6477 vom 04.06.2026

</details>

## 2. Erster Ansatz: Phyphox und Random Forest

**Zeitraum:** undatiert; vor der Kurzpräsentation Ende Mai 2026  
**Belegstatus:** 🟡 teilweise belegt

Der erste Ansatz war ein Random-Forest-Klassifikator auf 24 statistischen Kennwerten je Aufnahme: Mittelwert, Standardabweichung, Maximum und Minimum je Sensorachse. Die Aufnahmen stammten aus der App Phyphox, jede Ziffer wurde manuell per Knopfdruck gestartet und gestoppt. Auf 40 Aufnahmen, bei denen jede Ziffer von genau einer Person geschrieben wurde, ergab die Kreuzvalidierung 100 Prozent. Nach der Erweiterung auf 30 Aufnahmen je Ziffer von drei verschiedenen Personen fiel derselbe Wert auf 62 Prozent; das Modell hatte offenbar die Schreibstile einzelner Personen gelernt und nicht die Ziffern. Der Artikel datiert diese Phase an keiner Stelle. Belegbar ist nur die Reihenfolge: Sie lag vor der Kurzpräsentation.

<details><summary>Belege</summary>

- artikel.txt Abschnitt 1, Z. 10: 24 statistische Kennwerte, Phyphox, manueller Start/Stopp
- artikel.txt Abschnitt 1, Z. 10: 40 Aufnahmen einer Person = 100 %; 30 je Ziffer von drei Personen = 62 %
- Keine Datumsangabe in artikel.txt zu diesem Abschnitt

</details>

## 3. Kurzpräsentation und der Einbruch von 100 auf 62 Prozent

**Zeitraum:** 21.05.2026 oder 28.05.2026 (welcher der beiden Termine, ist nicht belegt)  
**Belegstatus:** 🟡 teilweise belegt

In der Kurzpräsentation stellte das Team den Random-Forest-Ansatz vor. Der Artikel hält fest, dass sich der Einbruch in der Präsentation nicht gut angefühlt habe, bezeichnet ihn rückblickend aber als den nützlichsten Moment des Projekts. Aus ihm wurden drei Schwächen abgeleitet: globale Kennwerte über eine ganze Aufnahme verlieren die zeitliche Abfolge, die eine 2 von einer 7 unterscheidet; der Beschleunigungskanal enthielt noch die Erdanziehung, sodass allein eine veränderte Handhaltung das Signal verschob; und Start und Stopp mussten bei jeder Aufnahme von Hand gedrückt werden, was für eine Live-Demo unbrauchbar ist. Daraus entstand die Forschungsfrage nach der Zuverlässigkeit eines 1D-CNN und nach dem Einfluss der Aufnahmebedingungen. Der Artikel selbst verwendet nur das Wort Kurzpräsentation und nennt kein Datum. Dass damit die Zwischenpräsentation des Kurses gemeint ist, stützt sich darauf, dass die Prüfungsleistung die Kurzpräsentation mit 15 Prozent ausweist und die Kursunterlage die Zwischenpräsentation mit denselben 15 Prozent. Die Kursunterlage nennt dafür zwei Termine, 21.05. und 28.05.2026, je 20 Minuten inklusive Diskussion, und kündigt an, die Termine zu verlosen; welcher Termin auf dieses Team fiel, ist nicht belegt.

<details><summary>Belege</summary>

- artikel.txt Abschnitt 1, Z. 10-11: Vorstellung des Random-Forest-Ansatzes; "auch wenn er sich in der Präsentation nicht gut angefühlt hat"
- artikel.txt Abschnitt 1, Z. 11: die drei abgeleiteten Schwächen (Erstens/Zweitens/Drittens)
- artikel.txt Abschnitt 1, Z. 12: Forschungsfrage und zwei Teilfragen
- exam.txt Z. 20: Kurzpräsentation 15 %; ml4scs00.txt Z. 39: Zwischenpräsentation 15 %, also dieselbe Gewichtung
- ml4scs00.txt Z. 191-193: Zwischenpräsentationen 21.5.2026 und 28.5.2026, 20 min je Team
- ml4scs00.txt Z. 200: "Termine werden zugelost" (Ankündigung, kein Ergebnis)

</details>

## 4. Neuausrichtung: eigene App und eigene Verarbeitungskette

**Zeitraum:** Entscheidung undatiert; Codestand belegt vom 04.06. bis 10.06.2026  
**Belegstatus:** 🟢 belegt

Die erste größere Entscheidung nach der Kurzpräsentation war laut Artikel der Verzicht auf Phyphox zugunsten einer eigenen SwiftUI-Anwendung mit CoreMotion, die userAcceleration und rotationRate mit 50 Hz ausliest und per WebSocket an ein FastAPI-Backend streamt; CoreMotion rechnet die Schwerkraft heraus, womit das Handhaltungsproblem des ersten Ansatzes entfiel. Am 04.06.2026 um 14:56 entstand der Erstcommit des Repositorys airwriting mit 21 Dateien und 1.598 Zeilen in einem Zug: Backend mit Segmentierung, Vorverarbeitung, Augmentation, Modell, Training, Sammelskript und Server, dazu Frontend, watchOS-App und zwei Tests. Der Commit weist im Trailer Claude Opus 4.8 als Mitautor aus; das gilt für sechs der insgesamt neun Commits beider Repositorys, nämlich die drei vom 04.06. und 10.06., den Doku-Commit vom 01.07. und beide vom 07.09.2026. In der Nacht des 10.06. folgten Review-Fixes: Der Train/Val-Split wurde vor die Augmentation gezogen, weil sonst Varianten desselben Originals in Training und Validierung landen und das Early-Stopping-Signal zu optimistisch wird; dazu httpx als fehlende Testabhängigkeit, torch.load mit weights_only und die Beseitigung von totem Code. Dieser Commit nennt eine Inferenz-Accuracy von 1.000 und schreibt selbst dazu, dass sie auf synthetischen Daten gemessen wurde. Neun Minuten später kamen eine ausgebaute README und ein CI-Workflow hinzu, ausdrücklich ohne Codeänderung. Die Meilensteinliste dieses Standes führte drei Punkte als offen: "Watch-App auf echter Hardware bauen (Mac/Xcode) und Verbindung testen", "Echte Daten sammeln" und "Tuning, Energie-Schwellen kalibrieren, Confidence-Schwelle, Fehleranalyse". Bis dahin lief die gesamte Kette nur gegen synthetische Aufnahmen.

<details><summary>Belege</summary>

- artikel.txt Abschnitt 3.1, Z. 23: "Die erste größere Entscheidung nach der Kurzpräsentation war der Verzicht auf Phyphox" (ohne Datum)
- git airwriting 03b6477, 04.06.2026 14:56:17: 21 files changed, 1598 insertions
- Commit-Trailer "Co-Authored-By: Claude Opus 4.8" in 03b6477, 71964ac, ac2fb1a und 8e79fe2; "Claude Opus 5" in d6e71e2 und e84c0db, also sechs von neun Commits
- git airwriting 71964ac, 10.06.2026 02:36:02: "Review-Fixes: Val-Split vor Augmentation, httpx-Dependency, Cleanups", 4 files, +24/-15
- git airwriting 71964ac, Commit-Body: "(Training, Inferenz-Accuracy 1.000 auf synthetischen Daten, Server-End-to-End inkl. Display-WebSocket)"
- git airwriting ac2fb1a, 10.06.2026 02:45:43: README + .github/workflows/tests.yml, Commit-Body "Keine Code-Aenderungen"
- git show ac2fb1a:README.md, Meilensteine 7-9 offen (Z. 179-181), Punkt 7 wörtlich "Watch-App auf echter Hardware bauen"
- tests/test_pipeline.py und tests/smoke_e2e.py: synthetische Aufnahmen

</details>

## 5. Plattformwechsel von der Apple Watch auf das iPhone

**Zeitraum:** Repo-Neuanlage am 14.06.2026; Entschluss undatiert, frühestens nach dem 04.06.2026  
**Belegstatus:** 🟡 teilweise belegt

Der ursprüngliche Aufbau setzte auf eine Apple Watch. Auf der getesteten Series 4 mit watchOS 10.5 ließ sich mit einem kostenlosen Entwickler-Account keine eigenständige Watch-App installieren; mehrere Anläufe scheiterten. Diese Begründung stand bis zum 01.07.2026 in der Projektdokumentation und ist heute nur noch über die Git-Historie zugänglich. Wann die Installationsversuche liefen und wann der Entschluss fiel, lässt sich nicht eingrenzen: Der watchOS-Code existiert seit dem 04.06.2026, und die README führte die Watch-App am 10.06. noch als offenen Meilenstein, was nicht ausschließt, dass die Versuche da bereits gelaufen waren, ohne dass die README nachgezogen wurde. Am 14.06.2026 um 17:57 entstand das neue Repository air-writing-sensor mit einem eigenen Wurzelcommit: die Historie des Vorgängers wurde nicht übernommen, der Python-Code aber unverändert kopiert: backend/, frontend/, tests/ und requirements.txt sind byte-identisch mit dem Stand vom 10.06. Der Wechsel betraf damit nur die App und die Dokumentation; das Backend spricht bis heute vom Endpunkt /ws/watch, von der Watch-App und von "Watch verbunden". Beim Umzug ging der CI-Workflow verloren, der erst am 07.09.2026 wieder eingesetzt wurde. Der am 14.06. in CLAUDE.md festgehaltene Stand: iPhone-App gebaut und installiert, Kette iPhone – Backend – Browser erfolgreich getestet, aber noch kein Modell trainiert und nur rund acht Testsegmente gesammelt, ausdrücklich als zu wenig bezeichnet. Zwei weitere Commits am selben Abend (22:47 und 23:10) ergänzten nur die README.

<details><summary>Belege</summary>

- git air-writing-sensor 8e79fe2 (Diff): entfernte Zeilen "Apple Watch Series 4 (watchOS 10.5) ... mit einem kostenlosen Apple-Entwickler-Account keine eigenständige Watch-App installieren" und "mehrere Anläufe scheiterten"
- git show ac2fb1a:README.md Z. 179: "Watch-App auf echter Hardware bauen" am 10.06. noch offen, das ist die untere Grenze; obere Grenze c374156 vom 14.06.
- git air-writing-sensor c374156, 14.06.2026 17:57:55: einziger Commit ohne Eltern, 55 files, 2808 insertions
- Byte-Vergleich ac2fb1a gegen c374156: zehn backend/-Dateien, frontend/app.js, frontend/index.html, tests/test_pipeline.py, tests/smoke_e2e.py und requirements.txt identisch; nur .gitignore und README.md unterscheiden sich
- c374156 enthält kein .github/; die Datei erscheint erst am 07.09.2026 in d6e71e2
- git air-writing-sensor 8e79fe2 (Diff): entfernte CLAUDE.md-Zeilen "Es ist noch KEIN Modell trainiert ... nur ~8 Testsegmente gesammelt (zu wenig)"
- git air-writing-sensor bc22fec (14.06. 22:47) und 256d664 (14.06. 23:10): nur README
- backend/server.py:83 @app.websocket("/ws/watch"); backend/config.py:19 "muss mit der Watch-App übereinstimmen"

</details>

## 6. Datenerhebung und sechs Trainingsiterationen

**Zeitraum:** nach dem 14.06.2026; spätestens bis zum Artikelstand vom 01.09.2026 abgeschlossen, kein einzelnes Datum belegt  
**Belegstatus:** 🟡 teilweise belegt

Gesammelt wurde über ein Kommandozeilenskript, das die zu schreibende Ziffer vorgibt, das folgende Segment aus dem Live-Stream aufnimmt und es mit Label und Personenkennung ablegt; voreingestellt sind 60 Aufnahmen je Ziffer. Für die Schreibhaltung galt eine gemeinsame Konvention: auf eine gedachte senkrechte Tafel vor dem Körper, in möglichst gleichbleibender Größe, mit gewohnter Strichreihenfolge und etwa einer halben Sekunde Pause zwischen zwei Ziffern. Der finale Bestand umfasst 624 Segmente über alle zehn Ziffern von allen drei Gruppenmitgliedern, Median der Segmentdauer rund 2,5 Sekunden. Über sechs Iterationen wuchs der Datensatz zwischen 474 und 624 Segmenten. Die Genauigkeit im zufälligen 80/20-Split lag dabei zwischen 81,7 und 86,3 Prozent, ohne stetigen Anstieg: nach 85,5 Prozent in der zweiten Iteration fiel der Wert zweimal auf 84,0 zurück, bevor er in der sechsten Iteration 86,3 Prozent erreichte. Der Artikel führt dieses schmale Band darauf zurück, dass vor allem sehr ähnliche Aufnahmen nachgesammelt wurden. Eine zusätzliche, vollständig unabhängige Aufnahmesitzung "an einem anderen Tag" ergab im Cross-Session-Hold-out 145 von 150 korrekt erkannten Beispielen, also 96,7 Prozent; der Artikel deutet diesen Sprung ausdrücklich vorsichtig, weil neue Variation im Training und ein konsistenter Stil in der Testsitzung gleichgerichtet wirken und sich mit einer einzigen Sitzung nicht trennen lassen. Ein Kontrollexperiment zu den in die Vier-Sekunden-Grenze gelaufenen Segmenten fiel gegen die Erwartung aus: mit ihnen 80,5 Prozent (± 0,064), ohne sie 77,1 Prozent (± 0,051), gemittelt über drei Zufallsstartwerte; bei einer Streuung von rund sechs Prozentpunkten über die Seeds liest der Artikel den Unterschied selbst nur als Tendenz, nicht als gesicherten Effekt. Alle Segmente wurden behalten. Diese gesamte Phase hinterlässt in Git keine Spur. Datensatz und Modelle sind per .gitignore ausgeschlossen; deshalb liegen die Trainingsdaten nicht im Repo. Dass die Iterationen auch sonst keine Spur hinterlassen, weder Ergebnisdatei noch Notiz, ist damit nicht erklärt. Zur zeitlichen Einordnung geben die Quellen nur zwei Ränder her: den Wurzelcommit vom 14.06.2026 und den internen Erstellungszeitpunkt der Artikeldatei am 01.09.2026, zu dem die Ergebnisse vorlagen. Termine, Reihenfolge oder Dauer der Iterationen und der Aufnahmesitzungen sind in keiner Quelle enthalten.

<details><summary>Belege</summary>

- backend/collect.py: Ziffernplan, ">>> Schreibe jetzt: [ {target} ]", --count default 60
- artikel.txt Abschnitt 3.2, Z. 27: Schreibkonvention; Z. 28: 624 Segmente, Median rund 2,5 s
- artikel.txt Abschnitt 6.1, Tabelle 2 (Z. 85-99): 81,7 % / 85,5 % / 84,0 % / 84,0 % / nicht ausgewertet / 86,3 %; Iteration 5 Cross-Session 96,7 %
- artikel.txt Abschnitt 6.1, Z. 100: Plateau, "gleiche Person, gleiches Gerät, gleiche Sitzungsbedingungen"
- artikel.txt Abschnitt 6.3, Z. 140-141: "an einem anderen Tag", 145 von 150, vorsichtige Deutung
- artikel.txt Abschnitt 6.4, Tabelle 4 (Z. 144-153): 80,5 % (± 0,064) mit, 77,1 % (± 0,051) ohne lange Segmente; Z. 154: "eher als Tendenz denn als gesicherten Effekt lesen"
- git: kein Commit berührt backend/ nach c374156; .gitignore Z. 8-11 schließt backend/dataset/* und backend/models/* aus
- bericht/ML4SCS_Artikel_Air-Writing_2.docx, docProps/core.xml: dcterms:created 2026-09-01T22:28:50Z, obere Zeitgrenze für die Ergebnisse

</details>

## 7. Abschlusspräsentation, Demonstration laut Kursvorgabe gefordert

**Zeitraum:** 02.07.2026  
**Belegstatus:** 🟡 teilweise belegt

Die Kursunterlagen sehen zwei Termine für die Abschlusspräsentationen vor, 02.07. und 09.07.2026, je 25 Minuten inklusive Diskussion, mit Fragestellung, Literatur, Demonstration, Übersicht über Experiment und Daten sowie vorläufigen Ergebnissen. Das Team hatte seinen Termin am 02.07.2026. Der Artikel nennt ein finales Demo-Modell mit 86,3 Prozent Testgenauigkeit, das "auch in der Live-Demonstration läuft", nennt dafür aber kein Datum; der Beitragsanhang sagt nur, dass Tony Duong die Live-Demo aufgebaut und getestet hat. Dass diese Live-Demonstration an diesem Termin stattfand, liegt nahe, ist aber nirgends belegt: der Steckbrief führt am 07.09.2026 das Demo-Video noch als offenen Punkt. Wie eine Vorführung im Einzelnen verlief, ist in keiner Quelle festgehalten; es gibt keine Erkennungsrate im laufenden Betrieb und keine Aufzeichnung. Im Repository hinterlässt der Termin keine Spur: keine Folien, keine Notizen, kein Commit an diesem Tag. Der zeitlich nächste Commit stammt vom 01.07.2026 um 12:50 und ändert ausschließlich drei Dokumentationsdateien: Das Projekt wird durchgängig als iOS-App dargestellt, wobei die Begründung des Plattformwechsels und der letzte überlieferte Zwischenstand der Datenmenge aus der Dokumentation entfernt werden. Ob dieser Commit zur Vorbereitung der Präsentation gehörte, lässt sich nicht belegen. Die Umstellung war zudem nur textlich: der watchOS-Code liegt bis heute vollständig im Repository, obwohl die Dokumentation seit dem 01.07. sagt, es gebe keine watchOS-Version.

<details><summary>Belege</summary>

- ml4scs00.txt Z. 195-198: Abschlusspräsentation 2.7 und 9.7.2026, 25 min je Team, Inhalt inkl. "Demonstration"
- Termin 02.07.2026 vom Team bestätigt, nicht aus den Dateien belegbar
- artikel.txt Abschnitt 6.2, Z. 102: "Das finale Modell, das auch in der Live-Demonstration läuft", ohne Datum; artikel.txt Z. 180: Tony Duong hat die Live-Demo aufgebaut und getestet
- bericht/projektsteckbrief.md (07.09.2026) führt das Demo-Video noch als offenen Punkt
- git air-writing-sensor 8e79fe2, 01.07.2026 12:50:09: 3 files (CLAUDE.md, README.md, app/README.md), +20/-44, kein Code
- git ls-files app/: app/AirWriting/ weiterhin im HEAD, project.pbxproj mit SDKROOT = watchos und WATCHOS_DEPLOYMENT_TARGET = 10.5; CLAUDE.md: "Es gibt keine watchOS-Version."
- Kein Commit und keine Foliendatei am 02.07.2026 in beiden Repos

</details>

## 8. Artikel, Steckbrief und Abgabevorbereitung

**Zeitraum:** 03.07. bis 07.09.2026 (Abgabefrist Artikel: 15.09.2026)  
**Belegstatus:** 🟢 belegt

Zwischen dem 01.07. und dem 07.09.2026 liegt kein einziger Commit. Was in diesen gut zwei Monaten geschah, ist bis auf einen Anhaltspunkt undokumentiert: Die Artikeldatei wurde am 07.09.2026 committet, trägt intern aber den 01.09.2026, 22:28 als Erstell- und Änderungszeitpunkt bei Revision 1. Sie lag also sechs Tage vor dem Commit vor. Wann der Text geschrieben wurde, sagt das nicht. Der Dateiname endet auf "_2", was auf eine Vorfassung deutet, die nicht im Repository liegt. Am Abend des 07.09. um 22:16 wurde die Dokumentation auf den tatsächlichen Stand gebracht: ein Ergebniskapitel in der README mit 624 Segmenten, 86,3 Prozent im zufälligen 80/20-Split, 145 von 150 im Cross-Session-Hold-out, dem Verlauf über sechs Iterationen, der Fehleranalyse zur Ziffer 7 und dem Kontrollexperiment. Im selben Commit wurde der beim Repo-Wechsel verlorene CI-Workflow wiederhergestellt und eine Klon-URL korrigiert, die seit dem 14.06. auf air-writing-recognition zeigte; laut Commit-Beschreibung existiert dieses Repository nicht. Die Statusliste hatte seit dem 14.06. "Echte Daten sammeln" und "Tuning" als offen geführt, obwohl beides längst stattgefunden hatte; als offen verbleiben nach der Korrektur der echte Cross-Person-Test und die empirische Begründung der Konfidenzschwelle. Um 22:27 folgte der Projektsteckbrief als geforderter Pflichtbestandteil der Abgabe. Offen blieben zu diesem Zeitpunkt die ein bis drei Bilder, das rund zweiminütige Demo-Video und die Teamentscheidung zur Veröffentlichungszustimmung.

<details><summary>Belege</summary>

- git air-writing-sensor: kein Commit zwischen 8e79fe2 (01.07.) und d6e71e2 (07.09.)
- bericht/ML4SCS_Artikel_Air-Writing_2.docx, docProps/core.xml: cp:revision 1, dcterms:created = dcterms:modified = 2026-09-01T22:28:50.445Z; alle ZIP-Einträge tragen den Zeitstempel 01.09.2026 22:28
- git air-writing-sensor d6e71e2, 07.09.2026 22:16:47: .github/workflows/tests.yml (+19), README.md (+51/-4), bericht/ML4SCS_Artikel_Air-Writing_2.docx (neu), 3 files, 70 insertions, 4 deletions
- Commit-Body d6e71e2: "Klon-URL in der README zeigte auf air-writing-recognition; dieses Repo existiert nicht"
- git show c374156:README.md Z. 198-199: "Echte Daten sammeln" und "Tuning" bis 07.09. als offen markiert
- git air-writing-sensor e84c0db, 07.09.2026 22:27:54: bericht/projektsteckbrief.md, 172 Zeilen; Commit-Body nennt Bilder, Demo-Video und Veröffentlichungszustimmung als offen
- exam.txt Z. 27: Abgabefrist 15. September 2026; Z. 51-52: Steckbrief als Pflichtabgabe

</details>

---

## Offene Punkte

Die folgenden Angaben gehen aus keiner der ausgewerteten Quellen hervor und
müssten vom Team ergänzt werden:

- An welchem der beiden Termine (21.05. oder 28.05.2026) fand die Kurzpräsentation dieses Teams statt? Die Kursunterlagen nennen beide Termine und kündigen ein Losverfahren an, das Ergebnis ist nirgends festgehalten.
- Wann hat sich das Team gebildet und wann fiel die Entscheidung für das Thema Air-Writing? Vor dem 04.06.2026 gibt es dazu keine Spur in Code, Git oder Artikel.
- Wann genau fiel die Entscheidung gegen Phyphox und für die eigene App? Der Artikel sagt nur "die erste größere Entscheidung nach der Kurzpräsentation".
- Wann fiel der Entschluss zum Plattformwechsel von der Apple Watch auf das iPhone, wann liefen die Installationsversuche auf der Series 4 und wie viele Anläufe kostete das? Belegt ist nur, dass es scheiterte und dass die Erklärung am 01.07.2026 aus der Dokumentation entfernt wurde.
- In welchem Zeitraum, an wie vielen Terminen und mit welcher Aufteilung auf die drei Personen wurden die 624 Segmente aufgenommen? Der Datensatz ist in Git nicht enthalten, und das gespeicherte Format kennt weder Sitzung noch Datum.
- Welches Smartphone-Modell wurde verwendet? Artikel und Code sprechen nur von "demselben Gerät".
- Wann fand die zusätzliche Aufnahmesitzung für den Cross-Session-Hold-out statt, und ist es dieselbe Runde, aus der die Ausreißer bei den Ziffern 2 und 9 stammen? Der Artikel stellt diesen Zusammenhang nicht her.
- Wann liefen die sechs Trainingsiterationen, in welcher Reihenfolge und mit welchen Datensatzgrößen? Belegt sind nur die Spanne 474 bis 624 Segmente und der Einzelwert 474.
- Wie wurde der Cross-Session-Hold-out technisch umgesetzt? Der Code kennt kein Sitzungskennzeichen, nur x, label und person.
- Auf welchem Datenstand lief das Kontrollexperiment zu den langen Segmenten, wie viele Segmente waren betroffen, und wie wurde über drei Seeds gemittelt? Im Repository gibt es dafür weder ein Skript noch einen Längenfilter im Training.
- Wann und wie wurden die Segmentierungsschwellen kalibriert? Der Artikel gibt an, sie empirisch kalibriert und nicht optimiert zu haben (Z. 161), und schreibt diese Arbeit Tony Duong zu (Z. 180, ebenso der Steckbrief). In Git ist davon nichts zu sehen: backend/config.py wurde seit dem 04.06.2026 nicht mehr geändert, die Werte 0,06 g / 0,04 g / 0,35 s stehen unverändert im Erstcommit. Der Vorgang selbst ist deshalb nicht nachvollziehbar.
- Woher stammt die Konfidenzschwelle von 0,6? Im Code steht keine Herleitung, und der Artikel räumt selbst ein, ihre Übereinstimmung mit der Erkennungsqualität nicht geprüft zu haben.
- Wann und wie verlief die im Artikel erwähnte Live-Demonstration: wie viele Ziffern wurden erkannt, wie oft griff die Zurückweisung, gab es Zwischenfälle? Der Artikel datiert sie nicht, und es existiert keine Aufzeichnung.
- Wann hat wer woran gearbeitet? Der Anhang des Artikels (Z. 177-181) und das Feld team im Steckbrief teilen die Beiträge personenscharf zu, datieren sie aber nicht; eine zeitliche Zuordnung geben weder Artikel noch Git her. Kein Commit trägt den Namen Isa Kilic; da ein Konto (bauklau91@gmail.com) unter drei Anzeigenamen committet (EfeMain, Efe Oezm, Matadorrr91) und beide Repos dem Konto Matadorrr91 gehören, lässt sich aus den Autorennamen keine Person zuordnen.
- Was geschah zwischen dem 02.07. und dem 07.09.2026? Belegt ist nur, dass die Artikeldatei am 01.09.2026 um 22:28 angelegt wurde; wo die Vorfassung liegt, auf die der Dateiname "_2" deutet, und wann der Text entstand, sagen die Quellen nicht.
- Gab es neben den weekly stand-ups weitere Abgaben oder Zwischenberichte? Die vorliegenden Kursunterlagen nennen keine; verlangt sind Anwesenheit, mündlicher Teamstatus und ein semesterbegleitendes Repository.
- Warum wurde die Git-Historie beim Wechsel auf das neue Repository nicht übernommen und warum ging dabei der CI-Workflow verloren? Kein Commit gibt darüber Auskunft.
- Sechs der neun Commits weisen Claude als Mitautor aus. Wie das Team den KI-Anteil an Code und Dokumentation im Artikel selbst darstellt, ist eine Entscheidung, die das Team treffen muss.
- Bilder, Demo-Video und die Entscheidung zur Veröffentlichungszustimmung waren am 07.09.2026 noch offen. Sind sie inzwischen ergänzt?

---

*Erstellt am 07.09.2026 aus dem wissenschaftlichen Artikel, der Git-Historie beider
Repositorys und den Kursunterlagen. Kein während des Semesters geführtes Tagebuch.*
