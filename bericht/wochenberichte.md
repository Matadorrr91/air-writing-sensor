# Wochenberichte — Air-Writing

Projekt *Air-Writing: Ziffernerkennung in der Luft*  
Applied Machine Learning for Smart and Connected Systems, Sommersemester 2026  
Leuphana Universität Lüneburg · Isa Kilic, Efe Özüm, Tony Duong

---

## Woche 1 — Kursrahmen und erster Ansatz

*KW 20 · 11.–17.05.2026*

Diese Wochenberichte sind nachträglich entstanden. Wir haben während des Semesters kein Tagebuch geführt, deshalb ist manches nicht mehr genau zuzuordnen; solche Stellen sind im Text als Lücke markiert. Den Rahmen gab der Kurs vor: Teams zu drei Personen, ein Workload von 150 Stunden und wöchentliche Stand-ups, in denen jedes Team kurz seinen Stand vorstellt. Unser Team sind Isa Kilic (Teamleitung), Efe Özüm und Tony Duong. Unser Thema ist Air-Writing, also in die Luft geschriebene Ziffern allein aus den Bewegungsdaten eines Smartphones zu erkennen. Die Berichte setzen erst mit dieser Woche ein; Teambildung und Themenentscheidung lagen früher, ein Datum dazu haben wir nicht. [ERGÄNZEN: Wann hat sich das Team gebildet, und wann fiel die Entscheidung für Air-Writing?] Der Ansatz, den wir später in der Kurzpräsentation gezeigt haben, bestand aus Aufnahmen mit der App Phyphox, bei denen jede Ziffer manuell per Knopfdruck gestartet und gestoppt wurde, und einem Random-Forest-Klassifikator auf 24 statistischen Kennwerten je Aufnahme: Mittelwert, Standardabweichung, Maximum und Minimum je Sensorachse. [ERGÄNZEN: Wurde an diesem Ansatz schon in dieser Woche gearbeitet?] [ERGÄNZEN: Fand in dieser Woche ein Stand-up statt, und was haben wir dort berichtet?]

---

## Woche 2 — Erweiterter Datensatz und der Einbruch auf 62 Prozent

*KW 21 · 18.–24.05.2026*

Aus 40 Aufnahmen, bei denen jede Ziffer von genau einer Person geschrieben worden war, wurden 30 Aufnahmen je Ziffer von drei Personen. Am Verfahren selbst haben wir nichts geändert. Die Kreuzvalidierungsgenauigkeit fiel dabei von 100 auf 62 Prozent. Unsere Erklärung ist, dass das Modell die Schreibstile einzelner Personen gelernt hatte und nicht die Ziffern selbst. Angenehm war das nicht, und die 100 Prozent von vorher sagen damit wenig darüber aus, wie gut die Ziffern erkannt werden. [ERGÄNZEN: Fiel die Erweiterung auf 30 Aufnahmen je Ziffer von drei Personen tatsächlich in diese Woche?] Der erste der beiden Termine für die Kurzpräsentation, der 21.05., lag in dieser Woche, der zweite, der 28.05., in der folgenden. Die Kursunterlage nennt denselben Termin Zwischenpräsentation und gewichtet ihn mit 15 Prozent; die Termine sollten verlost werden. [ERGÄNZEN: An welchem der beiden Termine haben wir vorgetragen?] [ERGÄNZEN: Haben wir in dieser Woche an der Präsentation gearbeitet, und wer hat welchen Teil übernommen?]

---

## Woche 3 — Kurzpräsentation und die drei Schwächen

*KW 22 · 25.–31.05.2026*

In der Kurzpräsentation haben wir unseren Stand vorgestellt, den Einbruch aus der Vorwoche eingeschlossen. Der zweite der beiden möglichen Termine, der 28.05., lag in dieser Woche. Aus dem Einbruch haben wir drei Schwächen abgeleitet. Erstens verlieren globale Kennwerte über eine ganze Aufnahme die zeitliche Abfolge der Bewegung, und genau die unterscheidet eine 2 von einer 7. Zweitens enthielt der Beschleunigungskanal noch die Erdanziehung, sodass bereits eine veränderte Handhaltung das Signal verschob. Drittens musste bei jeder Aufnahme jemand von Hand Start und Stopp drücken, was für eine Live-Demo unbrauchbar ist. Daraus ergab sich unsere Forschungsfrage: wie zuverlässig ein 1D-CNN in die Luft geschriebene Ziffern aus IMU-Daten erkennt und welchen Einfluss die Aufnahmebedingungen haben. Dazu kamen zwei Teilfragen, nämlich welchen Beitrag die automatische Segmentierung leistet und ob sich ein bewusst kleines Netz mit wenigen hundert Beispielen überhaupt sinnvoll trainieren lässt. [ERGÄNZEN: Welche Rückmeldungen kamen in der Präsentation, und wann haben wir die Auswertung im Team besprochen?]

---

## Woche 4 — Verzicht auf Phyphox, eigene App

*KW 23 · 01.–07.06.2026*

Der Verzicht auf Phyphox wurde in dieser Woche im Code sichtbar. Die App ist für Laborzwecke gut geeignet, ihr Exportweg über ZIP-Dateien passt aber nicht zu einer Echtzeitanwendung; dazu kam der manuelle Start-Stopp, den wir in der Präsentation als dritte Schwäche genannt hatten. Wir haben uns auf eine eigene Anwendung in SwiftUI festgelegt, die über CoreMotion die userAcceleration und die rotationRate mit 50 Hertz ausliest und die Werte per WebSocket an ein Backend in FastAPI schickt. CoreMotion rechnet die Schwerkraft bereits heraus, damit entfällt das Handhaltungsproblem. Die Umstellung hat Isa Kilic vorangetrieben, ebenso die Xcode-Einrichtung und den Build der App. Am Donnerstag, dem 4. Juni, um 14:56 Uhr stand das Gerüst: ein Backend mit Segmentierung, Vorverarbeitung, Augmentation, Modell, Training, Sammelskript und Server, dazu Frontend, App und zwei Tests. Dieser Stand liegt in unserem ersten Repository, nicht in dem abgegebenen. Die App war zunächst für die Apple Watch gedacht, und die Kette lief bis dahin nur gegen synthetische Testdaten. [ERGÄNZEN: Wann fiel die Entscheidung gegen Phyphox?] [ERGÄNZEN: Wer hat am Backend und wer an der App gearbeitet?]

---

## Woche 5 — Split-Korrektur und Wechsel aufs iPhone

*KW 24 · 08.–14.06.2026*

In der Nacht auf Mittwoch haben wir die Trainingspipeline nachgebessert. Am wichtigsten war, dass die Aufteilung in Trainings- und Validierungsteil bisher hinter der Augmentation lag: So konnten Varianten desselben Originalsegments gleichzeitig in Training und Validierung landen, und das Early-Stopping-Signal fiel zu optimistisch aus. Wir haben den Split davorgezogen, dazu kamen httpx als fehlende Testabhängigkeit und torch.load mit weights_only. Neun Minuten später folgten eine ausgebaute README und ein CI-Workflow für die Pipeline-Tests. Irgendwann zwischen dem 4. und dem 14. Juni scheiterten mehrere Anläufe, die App mit einem kostenlosen Entwickler-Account auf der vorhandenen Apple Watch Series 4 mit watchOS 10.5 zu installieren. Am Sonntag, dem 14. Juni, haben wir um 17:57 Uhr ein neues Repository angelegt und sind aufs iPhone gewechselt. Der Python-Teil wurde unverändert übernommen, die bisherige Historie und der CI-Workflow nicht. Am selben Abend stand die Kette iPhone – Backend – Browser; trainiert war noch kein Modell, gesammelt waren rund acht Testsegmente. [ERGÄNZEN: Wann liefen die Installationsversuche auf der Watch, wie viele Anläufe waren es, und wann fiel der Entschluss zum Wechsel?] [ERGÄNZEN: Warum haben wir am 14. Juni ein neues Repository ohne die bisherige Historie angelegt?] [ERGÄNZEN: Welches iPhone-Modell haben wir ab hier verwendet?]

---

## Woche 6 — Beginn der Datenerhebung

*KW 25 · 15.–21.06.2026*

Nach dem Wechsel ins neue Repository am 14. Juni begann die Datenerhebung. Gesammelt wurde über ein Kommandozeilenskript, das die zu schreibende Ziffer vorgibt, das folgende Segment aus dem Live-Stream aufnimmt und es zusammen mit Label und Personenkennung als NPZ-Datei ablegt; Labelfehler sind dadurch praktisch ausgeschlossen. Für die Schreibhaltung haben wir uns auf eine Konvention geeinigt: geschrieben wird auf eine gedachte senkrechte Tafel vor dem Körper, in möglichst gleichbleibender Größe, mit der gewohnten Strichreihenfolge und etwa einer halben Sekunde Pause zwischen zwei Ziffern. Den überwiegenden Teil der Aufnahmen hat Efe Özüm gemacht, das Erhebungsprotokoll hat er mitentwickelt. Aufnehmen und Trainieren liefen danach im Wechsel: Über sechs Iterationen wuchs der Bestand auf 624 Segmente, die Zwischenstände lagen zwischen 474 und 624. Die Genauigkeit im zufälligen 80/20-Split lag bei 81,7 Prozent, dann 85,5, zweimal 84,0 und zuletzt 86,3 Prozent. In der fünften Iteration haben wir stattdessen einen Cross-Session-Hold-out ausgewertet, also eine unabhängige Aufnahmesitzung an einem anderen Tag: 145 von 150 Beispielen korrekt, 96,7 Prozent. Bei 150 Beispielen ist dieser Wert entsprechend empfindlich. [ERGÄNZEN: In welchem Zeitraum wurden die 624 Segmente aufgenommen, und wann liefen die sechs Trainingsiterationen?]

---

## Woche 7 — Fehleranalyse und lange Segmente

*KW 26 · 22.–28.06.2026*

Für die Fehlerbetrachtung eignet sich der frühere Stand mit 474 Segmenten, weil uns dort die vollständige Konfusionsmatrix vorliegt. Bei 86,2 Prozent Gesamtgenauigkeit verteilen sich die Fehler sehr ungleich. Die 7 fällt mit 55 Prozent heraus, sechs von elf Testbeispielen richtig, vier der Fehler gingen auf die 2. Alle diese Ziffern beginnen mit einer waagerechten oder schräg verlaufenden Anfangsbewegung, und in der Luft fehlt die Rückmeldung, die auf Papier für saubere Winkel sorgt. Auffällig war außerdem die Verwechslung von 0 und 6, die wir beide als Schleife ausführen; bei weiteren Aufnahmen haben wir die 0 als schmales Oval und die 6 mit betontem Anlauf von oben geschrieben. Diese Fehleranalyse hat Tony Duong durchgeführt. Das Kontrollexperiment zu den Segmenten, die in die Obergrenze von vier Sekunden gelaufen waren, fiel gegen unsere Erwartung aus: mit ihnen 80,5 Prozent, ohne sie 77,1 Prozent, gemittelt über drei Zufallsstartwerte. Wir haben sie behalten. [ERGÄNZEN: Fielen Fehleranalyse und Kontrollexperiment in diese Woche?] [ERGÄNZEN: Wann wurden die Aufnahmen nach der Fehleranalyse gemacht, aus denen auch die Ausreißer bei der 2 und der 9 stammen?]

---

## Woche 8 — Abschlusspräsentation am 02.07.

*KW 27 · 29.06.–05.07.2026*

Am Mittwoch, dem 01.07., haben wir die Dokumentation überarbeitet und die Erwähnungen der Apple Watch entfernt, sodass README, App-README und CLAUDE.md ab da von einer iOS-App sprechen. Geändert wurde dabei nur der Text; der watchOS-Code blieb im Repository liegen. Ob diese Änderung zur Vorbereitung der Präsentation gehörte, ist nicht festgehalten. Am Donnerstag, dem 02.07., haben wir präsentiert. Vorgesehen waren 25 Minuten einschließlich Diskussion, gefordert waren Fragestellung, Literatur, eine Demonstration, ein Überblick über Experimente und Daten sowie die vorläufigen Ergebnisse. Aufgebaut und getestet hat die Live-Demo Tony Duong. Welche Ergebnisse wir im Einzelnen gezeigt haben und ob dabei bereits das Modell mit 86,3 Prozent lief, haben wir nicht notiert. [ERGÄNZEN: Wie haben wir die Präsentation vorbereitet — Folien, Probelauf, Aufteilung der Vortragsteile?] [ERGÄNZEN: Welche Ergebnisse haben wir am 02.07. gezeigt, und lief dort bereits das Modell mit 86,3 Prozent oder ein früherer Stand?] [ERGÄNZEN: Wie ist die Live-Demo gelaufen, wurden die Ziffern vor Publikum erkannt, und welche Rückfragen kamen in der Diskussion?]

---

## Noch auszufüllen

Im Text stehen **18 Stellen** als `[ERGÄNZEN: …]`. Das sind Angaben,
die aus Artikel, Git-Historie und Kursunterlagen nicht hervorgehen — nur ihr wisst sie.
Sucht im Dokument nach `[ERGÄNZEN` und ersetzt jede Stelle durch die Antwort
(oder streicht die Frage, wenn sie sich erübrigt).

1. Woche 1: [ERGÄNZEN: Wann hat sich das Team gebildet, und wann fiel die Entscheidung für Air-Writing?]
2. Woche 1: [ERGÄNZEN: Wurde an diesem Ansatz schon in dieser Woche gearbeitet?]
3. Woche 1: [ERGÄNZEN: Fand in dieser Woche ein Stand-up statt, und was haben wir dort berichtet?]
4. Woche 2: [ERGÄNZEN: Fiel die Erweiterung auf 30 Aufnahmen je Ziffer von drei Personen tatsächlich in diese Woche?]
5. Woche 2: [ERGÄNZEN: An welchem der beiden Termine haben wir vorgetragen?]
6. Woche 2: [ERGÄNZEN: Haben wir in dieser Woche an der Präsentation gearbeitet, und wer hat welchen Teil übernommen?]
7. Woche 3: [ERGÄNZEN: Welche Rückmeldungen kamen in der Präsentation, und wann haben wir die Auswertung im Team besprochen?]
8. Woche 4: [ERGÄNZEN: Wann fiel die Entscheidung gegen Phyphox?]
9. Woche 4: [ERGÄNZEN: Wer hat am Backend und wer an der App gearbeitet?]
10. Woche 5: [ERGÄNZEN: Wann liefen die Installationsversuche auf der Watch, wie viele Anläufe waren es, und wann fiel der Entschluss zum Wechsel?]
11. Woche 5: [ERGÄNZEN: Warum haben wir am 14. Juni ein neues Repository ohne die bisherige Historie angelegt?]
12. Woche 5: [ERGÄNZEN: Welches iPhone-Modell haben wir ab hier verwendet?]
13. Woche 6: [ERGÄNZEN: In welchem Zeitraum wurden die 624 Segmente aufgenommen, und wann liefen die sechs Trainingsiterationen?]
14. Woche 7: [ERGÄNZEN: Fielen Fehleranalyse und Kontrollexperiment in diese Woche?]
15. Woche 7: [ERGÄNZEN: Wann wurden die Aufnahmen nach der Fehleranalyse gemacht, aus denen auch die Ausreißer bei der 2 und der 9 stammen?]
16. Woche 8: [ERGÄNZEN: Wie haben wir die Präsentation vorbereitet — Folien, Probelauf, Aufteilung der Vortragsteile?]
17. Woche 8: [ERGÄNZEN: Welche Ergebnisse haben wir am 02.07. gezeigt, und lief dort bereits das Modell mit 86,3 Prozent oder ein früherer Stand?]
18. Woche 8: [ERGÄNZEN: Wie ist die Live-Demo gelaufen, wurden die Ziffern vor Publikum erkannt, und welche Rückfragen kamen in der Diskussion?]
