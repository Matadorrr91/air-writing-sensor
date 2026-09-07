---
titel: "Air-Writing: Sensorbasierte Erkennung von in die Luft geschriebenen Ziffern mittels eines 1D-Convolutional Neural Networks"
semester: |
  Sommersemester 2026, Applied Machine Learning for Smart and Connected Systems (ML4SCS), Leuphana
  Universität Lüneburg, Betreuung: Prof. Dr. Burkhardt Funk
team: |
  Isa Kilic (Teamleitung: Umstellung von Phyphox auf die eigene Anwendung, Xcode-Einrichtung und
  Build der iOS-App, Trainingsläufe einschließlich Kontrollexperiment; Kapitel 1, 3, 6, 7 sowie
  Abbildungen und Tabellen), Efe Özüm (überwiegender Teil der Trainingsaufnahmen,
  Erhebungsprotokoll und Konvention zur Schreibhaltung, Literaturrecherche; Kapitel 2 und
  Abschnitt 4.3), Tony Duong (Segmentierung und Kalibrierung der Energieschwellen, Aufbau und Test
  der Live-Demo, Fehleranalyse zur Verwechslung von 0 und 6; Abschnitte 4.1, 4.2, 4.4 und Kapitel
  5). Konzeption des Gesamtsystems, Auswertung und Endredaktion gemeinsam. Repository:
  https://github.com/Matadorrr91/air-writing-sensor
forschungsfrage: |
  Wie zuverlässig ermöglicht ein 1D-Convolutional Neural Network die Erkennung von in die Luft
  geschriebenen Ziffern anhand smartphonebasierter IMU-Sensordaten, und welchen Einfluss haben
  unterschiedliche Aufnahmebedingungen auf die Erkennungsleistung? Zwei Teilfragen hängen daran:
  Welchen Beitrag leistet die automatische Segmentierung, und wie robust ist eine
  schwellwertbasierte Zustandsmaschine gegenüber unruhigen Händen? Und lässt sich ein bewusst
  kleines Netz mit wenigen hundert Beispielen überhaupt sinnvoll trainieren?
domäne: |
  Mensch-Maschine-Interaktion / berührungslose Eingabe; technisch Zeitreihenklassifikation auf
  Inertialsensordaten, methodisch im Umfeld der Human Activity Recognition. Motiviert durch
  Situationen, in denen ein Touchdisplay vorhanden, aber nicht bedienbar ist, etwa ein Chirurg mit
  sterilen Handschuhen oder ein Monteur mit dicken Arbeitshandschuhen; getestet wurde keines
  dieser Szenarien, alle Aufnahmen entstanden in normaler Umgebung. Erkannt wird der
  Bewegungsverlauf beim Schreiben, nicht die optische Form der fertigen Ziffer.
sensorik: |
  Handelsübliches Smartphone (iOS), keine Zusatzhardware. Eigene SwiftUI-App liest über
  CoreMotion userAcceleration (in Vielfachen der Erdbeschleunigung, Schwerkraft bereits
  herausgerechnet) und rotationRate (rad/s), je 3 Achsen = 6 Kanäle, mit 50 Hz. Jedes Sample geht
  als JSON mit Zeitstempel per WebSocket an ein FastAPI-Backend, in dem Segmentierung,
  Vorverarbeitung und Inferenz laufen; das Modell ist bewusst klein gehalten, damit die Inferenz
  auf einer CPU laufen kann. Ein zweiter WebSocket liefert das Ergebnis an ein schlankes Web-
  Frontend, das die erkannten Ziffern als wachsende Zahlenfolge anzeigt. Der Vorgängeransatz mit
  Phyphox und manuellem Start/Stopp wurde verworfen.
daten: |
  624 selbst erhobene Segmente über 10 Ziffernklassen, aufgenommen von den 3 Gruppenmitgliedern
  auf einem einzigen Gerät. Verteilung je Ziffer 54 bis 84 Segmente (0: 64, 1: 55, 2: 84, 3: 55,
  4: 55, 5: 54, 6: 64, 7: 55, 8: 55, 9: 83); die beiden Ausreißer bei 2 und 9 stammen aus einer
  zusätzlichen Aufnahmerunde. Mediane Segmentdauer rund 2,5 s, bei 50 Hz etwa 125 Messpunkte. Die
  Ziffer wird von einem Kommandozeilenskript vorgegeben, Labelfehler sind dadurch praktisch
  ausgeschlossen; Ablage als NPZ mit Label und Personenkennung. Cross-Session-Testmenge: 150
  Beispiele aus einer später und unabhängig aufgenommenen Sitzung an einem anderen Tag. Die
  Zwischenstände der sechs Projektiterationen lagen zwischen 474 und 624 Segmenten.
methode: |
  Segmentierung im laufenden Datenstrom: Zustandsmaschine auf der Bewegungsenergie (euklidische
  Norm des Beschleunigungsvektors, gleitender Mittelwert über 5 Samples); Einschaltschwelle 0,06
  g, Ausschaltschwelle 0,04 g (Hysterese gegen Flattern an der Grenze), Segmentende nach 0,35 s
  unterhalb der unteren Schwelle, Nachlauf wird bis zum letzten aktiven Sample zurückgeschnitten;
  Segmente unter 0,30 s werden als Zucken verworfen, Obergrenze 4,0 s. Vorverarbeitung: lineare
  Interpolation kanalweise auf 100 Zeitschritte (Eingabe 100 x 6), anschliessend Z-Score je Kanal
  mit Kennwerten ausschließlich aus den Trainingsdaten. Augmentation um Faktor 5 (Time-Warp
  0,7-1,4, gemeinsame 3D-Rotation von Beschleunigungs- und Drehratenvektor mit ca. 7 Grad
  Streuung, Amplitudenskalierung, gaußscher Jitter); der Split geschieht vor der Augmentation,
  die Testdaten bleiben unverändert. Modell: 1D-CNN mit 3 Blöcken (Conv Kernel 5 / Padding 2,
  BatchNorm, ReLU, MaxPool 2), Filter 64-128-128, Zeitachse 100-50-25-12, Global Average Pooling
  auf einen Vektor der Länge 128, Kopf aus 2 Linearschichten mit Dropout 0,3 auf 10 Ausgaben.
  Training: Adam, Lernrate 0,001, Weight Decay 0,0001, Kreuzentropie, Batchgröße 64, maximal 80
  Epochen, Early Stopping mit Geduld 12, 15 Prozent der Trainingsdaten als Validierungsteil. Live-
  Betrieb: Konfidenzschwelle 0,6, darunter zeigt das Frontend ein Fragezeichen statt einer Ziffer.
  Evaluation: zufälliger 80/20-Split und Cross-Session-Hold-out; zusätzlich ein
  Kontrollexperiment mit und ohne die Segmente an der 4-Sekunden-Obergrenze.
ergebnis: |
  Zwei Werte, die nur gemeinsam zu lesen sind: 86,3 Prozent Testgenauigkeit im zufälligen
  80/20-Split über die 624 Segmente (finales Demo-Modell) und 96,7 Prozent, also 145 von 150
  Beispielen, im Cross-Session-Hold-out auf einer vollständig getrennten Aufnahmesitzung. Der
  zufällige Split ist optimistisch, weil Aufnahmen derselben Sitzung in Training und Test landen
  können; im Cross-Session-Test wirken zwei Effekte in dieselbe Richtung, denn die neue Sitzung
  brachte zuvor fehlende Variation ins Training und war zugleich in sich sehr konsistent, und mit
  einer einzigen Testsitzung lassen sie sich nicht trennen. Bei 150 Beispielen verschieben schon
  zwei zusätzliche Fehler das Ergebnis um mehr als einen Prozentpunkt. Verlauf über sechs
  Iterationen im 80/20-Split: 81,7 / 85,5 / 84,0 / 84,0 / - / 86,3 Prozent (in Iteration 5 wurde
  nur der Cross-Session-Hold-out ausgewertet). Klassenweise in der Iteration mit 474 Segmenten
  (86,2 Prozent gesamt): die 7 nur 55 Prozent (6 von 11, davon vier als 2 und eine als 1
  klassifiziert), 3 und 8 je 100 Prozent. Im Cross-Session-Test blieben 1, 2, 3, 6, 7 und 8
  fehlerfrei, die fünf Fehler sind je einmal 0 als 6, 4 als 2, 9 als 3 sowie zweimal 5 als 3.
  Kontrollexperiment zu den langen Segmenten (3 Seeds): 80,5 Prozent (Standardabweichung 0,064)
  mit, 77,1 Prozent (0,051) ohne sie, also rund sechs Prozentpunkte Streuung. Zum Vergleich
  berichten Zhang und Kollegen 97,95 Prozent, trainieren dafür aber mit 63.000 Beispielen von 35
  Personen.
limitationen: |
  Kleiner Datensatz (624 Segmente); die Augmentation erhöht die Beispielzahl, ersetzt aber keine
  echten Aufnahmen, da jede künstliche Variante auf einer bereits vorhandenen Bewegung beruht.
  Nur drei Schreibende, die alle auch Trainingsdaten beigesteuert haben: Ein echter Cross-Person-
  Test, bei dem eine Person ausschließlich als Testperson dient, steht aus. Erhebung über ein
  einziges Gerät, geräteabhängige Sensoreigenschaften sind nicht kontrolliert. Die Ergebnisse
  hängen an der vereinbarten Schreibkonvention (gedachte senkrechte Tafel vor dem Körper,
  möglichst gleichbleibende Größe, gewohnte Strichreihenfolge, etwa eine halbe Sekunde Pause
  zwischen zwei Ziffern). Die Segmentierungsschwellen wurden empirisch kalibriert, nicht
  optimiert; der Parameterraum wurde nicht durchsucht, und in unruhigerer Umgebung dürften kleine
  Bewegungen übersehen und unbeabsichtigte als Ziffernbeginn gedeutet werden. Die
  Konfidenzschwelle 0,6 arbeitet auf Softmax-Ausgaben, die nicht ohne Weiteres kalibrierten
  Wahrscheinlichkeiten entsprechen; wie gut sie mit der tatsächlichen Erkennungsqualität
  übereinstimmen, wurde nicht geprüft. Der Cross-Session-Wert beruht auf einer einzigen Sitzung
  mit 150 Beispielen, das Kontrollexperiment auf drei Seeds mit rund sechs Prozentpunkten
  Streuung.
tags:
  - Air-Writing
  - IMU
  - 1D-CNN
  - Zeitreihenklassifikation
  - Gestenerkennung
  - Berührungslose Eingabe
  - Smartphone-Sensorik
  - CoreMotion
  - WebSocket
  - Echtzeit-Inferenz
  - Segmentierung
  - Data Augmentation
  - Cross-Session-Evaluation
  - Human Activity Recognition
  - ML4SCS
link_repo: https://github.com/Matadorrr91/air-writing-sensor
zustimmung_veroeffentlichung: BITTE_IM_TEAM_ENTSCHEIDEN   # ja | nein
---

# Air-Writing: Sensorbasierte Erkennung von in die Luft geschriebenen Ziffern mittels eines 1D-Convolutional Neural Networks

<!-- BILDER: 1–3 Stück, hier einbinden. Vorschläge stehen unten unter "Noch zu erledigen". -->

Untersucht wird, ob sich frei in die Luft geschriebene Ziffern von 0 bis 9 allein aus den IMU-Daten eines handelsüblichen Smartphones erkennen lassen. Der Ansatz aus der Kurzpräsentation, ein Random Forest auf 24 statistischen Kennwerten, erreichte 100 Prozent Kreuzvalidierungsgenauigkeit auf 40 Aufnahmen, bei denen jede Ziffer von genau einer Person geschrieben worden war, und fiel auf 62 Prozent, sobald der Datensatz auf 30 Aufnahmen je Ziffer von drei Personen erweitert war; er hatte offenbar die Schreibstile einzelner Personen gelernt und nicht die Ziffern selbst. Die daraufhin gebaute Kette sieht so aus: Eine eigene iOS-App erfasst über CoreMotion userAcceleration und rotationRate mit 50 Hz (sechs Kanäle) und streamt sie per WebSocket an ein FastAPI-Backend; dort trennt eine Zustandsmaschine den fortlaufenden Strom über die Bewegungsenergie an den Schreibpausen (Einschaltschwelle 0,06 g, Ausschaltschwelle 0,04 g, Segmentende nach 0,35 s Ruhe, Obergrenze 4,0 s), jedes Segment wird linear auf 100 Zeitschritte resampelt und kanalweise z-normalisiert, wobei die Kennwerte ausschließlich aus den Trainingsdaten stammen. Klassifiziert wird mit einem bewusst kleinen 1D-CNN aus drei Blöcken (Kernel 5, Filter 64/128/128, BatchNorm, ReLU, MaxPool 2), Global Average Pooling und zwei Linearschichten mit Dropout 0,3. Grundlage sind 624 selbst erhobene Segmente von drei Personen auf einem Gerät, deren Trainingsanteil per Augmentation verfünffacht wird.

Im zufälligen 80/20-Split über alle 624 Segmente liegt die Testgenauigkeit bei 86,3 Prozent; über sechs Iterationen bewegte sie sich zwischen 81,7 und 86,3 Prozent und ab der zweiten Iteration nur noch im schmalen Band von 84,0 bis 86,3 Prozent, obwohl der Datensatz weiter wuchs. Im Cross-Session-Hold-out auf einer später und unabhängig aufgenommenen Sitzung wurden 145 von 150 Beispielen korrekt erkannt, also 96,7 Prozent; die fünf Fehler sind je einmal 0 als 6, 4 als 2, 9 als 3 und zweimal 5 als 3. Die beiden Zahlen widersprechen sich nicht, sie messen Unterschiedliches: Der zufällige Split ist optimistisch, weil Aufnahmen derselben Sitzung in Training und Test liegen können, und im Cross-Session-Test wirken neue Variation im Training und ein sehr konsistenter Schreibstil in der Testsitzung in dieselbe Richtung, ohne dass sich beides mit einer einzigen Sitzung trennen ließe. Bei 150 Beispielen kosten schon zwei weitere Fehler mehr als einen Prozentpunkt, deshalb sollte die 96,7 nie ohne die 86,3 dastehen. Klassenweise ist die Streuung groß: In der Iteration mit 474 Segmenten (86,2 Prozent gesamt) erreichte die 7 nur 55 Prozent, sechs von elf Testbeispielen, vier davon als 2 klassifiziert, während 3 und 8 fehlerfrei blieben. Zum Größenvergleich berichten Zhang und Kollegen 97,95 Prozent, trainieren dafür aber mit 63.000 Beispielen von 35 Personen gegenüber unseren 624 Segmenten von drei Personen.

Der eigene Beitrag liegt weniger in der Modellarchitektur als in der durchgängigen Kette vom rohen Sensorstrom bis zur Anzeige im Browser: Die meisten der zitierten Arbeiten setzen auf bereits vorsegmentierten Aufnahmen auf, bei uns muss die Trennung live geschehen, während die Person weiterschreibt. Auffällig ist die Verteilung des Ertrags: Sechs Iterationen Modelltraining bewegten die Genauigkeit um knapp fünf Prozentpunkte, eine einzige neue Aufnahmesitzung um über zehn; den größten Fortschritt brachte damit die Datenerhebung, nicht die Arbeit am Modell. Auch das Kontrollexperiment fiel gegen unsere Erwartung aus: Die Segmente an der 4-Sekunden-Obergrenze wegzulassen kostete rund 3,3 Prozentpunkte (80,5 gegenüber 77,1 Prozent, gemittelt über drei Seeds), bei etwa sechs Prozentpunkten Streuung ist das aber eher eine Tendenz als ein gesicherter Effekt. Offen bleiben ein echter Cross-Person-Test, eine empirisch begründete statt gesetzte Konfidenzschwelle und die nur kalibrierten, nicht durchsuchten Segmentierungsschwellen. Als nächste Schritte sind ein Cross-Person-Test mit mindestens fünf unbeteiligten Personen, ein Architekturvergleich (CNN gegen LSTM und Kombinationen) auf dem eigenen Datensatz und der Verzicht auf die Pausentrennung vorgesehen, weil das Innehalten zwischen den Ziffern der unnatürlichste Teil der Bedienung bleibt. Der vollständige Quellcode liegt im Projekt-Repository unter https://github.com/Matadorrr91/air-writing-sensor.

---

## Noch zu erledigen (nicht Teil der Abgabe, hier nur als Merkzettel)

### Bilder (1–3 nötig)
1. Screenshot des Web-Frontends während der Live-Erkennung: die wachsende Zahlenfolge, möglichst mit mindestens einem Fragezeichen, das eine Vorhersage unterhalb der Konfidenzschwelle 0,6 zeigt. Aus derselben Demo-Sitzung lässt sich zugleich das geforderte kurze Demo-Video schneiden (Schreiben einer mehrstelligen Zahl, Anzeige im Browser) - dieses Video fehlt noch und ist Pflichtbestandteil der Abgabe. Aufwand: eine Bildschirmaufnahme während einer Demo.
2. Foto einer Person beim Schreiben in die Luft: Smartphone in der Hand, Schreibbewegung auf die gedachte senkrechte Tafel vor dem Körper, im Hintergrund der Laptop mit dem laufenden Backend. Zeigt die vereinbarte Schreibkonvention, die für die Ergebnisse mitentscheidend ist. Aufwand: ein Handyfoto, optional mit eingezeichnetem Bewegungspfad.
3. Klassenweise Trefferquote der Iteration mit 474 Segmenten als Balkendiagramm (Zahlen liegen in Tabelle 3 des Artikels vor: 55 bis 100 Prozent) oder alternativ die vollständige Konfusionsmatrix dieser Iteration, die dem Team vorliegt, im Artikel aber nicht abgedruckt ist. Macht den Ausreißer der 7 mit 6 von 11 sichtbar. Aufwand: mit matplotlib plotten, die Daten sind vorhanden.

### Demo-Video (2:05 (Zielkorridor 1:55 bis 2:10) - zehn Szenen, alle mit iPhone, Laptop und der laufenden Anwendung aufnehmbar)

| Zeit | Bild | Text |
|---|---|---|
| 0:00-0:12 | Nahaufnahme, Laptop-Webcam auf Bücherstapel: eine Hand mit dickem Arbeitshandschuh tippt zweimal auf ein Touchdisplay, nichts passiert. Handschuh bleibt an, dieselbe Hand schreibt stattdessen langsam eine 4 in die Luft. Keine Einblendung. | Sprecher: Mit Arbeitshandschuhen lässt sich ein Touchdisplay nicht bedienen. Ein Chirurg mit sterilen Handschuhen hat dasselbe Problem, nur aus einem anderen Grund. Die Idee dahinter ist einfach: Man schreibt die Ziffer in die Luft, und ein Gerät misst nur noch die Bewegung. |
| 0:12-0:22 | Bildschirmaufnahme des Laptops: eine schlichte Titelfolie (Keynote, PowerPoint oder Google Slides), weisser Hintergrund, keine Animation. | Einblendung: 'Air-Writing - Ziffernerkennung aus Smartphone-Bewegungsdaten mit einem 1D-CNN | Efe Özüm, Isa Kilic, Tony Duong | ML4SCS, Leuphana Universität Lüneburg, SoSe 2026'. Sprecher: Unsere Forschungsfrage: Wie zuverlässig erkennt ein eindimensionales Convolutional Neural Network in die Luft geschriebene Ziffern aus den IMU-Daten eines Smartphones, und welchen Einfluss haben die Aufnahmebedingungen? |
| 0:22-0:33 | Bildschirmaufnahme des Laptops: die Folie aus unserer Kurzpräsentation mit den beiden alten Zahlen. Der Mauszeiger bleibt kurz auf '62 %' stehen. | Sprecher: Der erste Anlauf war ein Random Forest auf 24 statistischen Kennwerten. Mit Aufnahmen von genau einer Person lag die Kreuzvalidierung bei 100 Prozent. Sobald drei Personen geschrieben hatten, waren es 62 Prozent. Das Modell hatte die Schreibstile gelernt, nicht die Ziffern. Danach haben wir den ganzen Aufbau umgestellt. |
| 0:33-0:45 | Zuerst iOS-Bildschirmaufnahme der eigenen App (Verbindungsstatus, durchlaufende Sensorwerte), dann Halbtotale von der Laptop-Webcam: iPhone in der Hand, daneben der Laptop mit dem Backend-Terminal, in dem die Samples eintreffen. | Sprecher: Wir haben eine eigene iOS-App gebaut. CoreMotion liefert die Beschleunigung bereits ohne Erdanziehung und dazu die Drehrate, sechs Kanäle, fünfzig Messungen pro Sekunde. Jedes Sample geht über einen WebSocket an ein Python-Backend. Zusätzliche Hardware braucht es dafür nicht. |
| 0:45-0:57 | Bildschirmaufnahme des Laptops: die Konsolenausgabe des Backends beziehungsweise die Energiekurve, in der man die erkannten Segmentgrenzen mitlaufen sieht. Dazu drei kurze Texteinblendungen mit den Schwellen. | Einblendung nacheinander: '> 0,06 g: Segment beginnt', '< 0,04 g: Hand gilt als ruhig', '0,35 s Pause: Ziffer ist zu Ende'. Sprecher: Das Backend muss selbst herausfinden, wo eine Ziffer anfängt und aufhört. Dafür sehen wir uns nur die Bewegungsenergie an. Jedes Segment wird anschliessend auf 100 Zeitschritte gebracht und je Kanal normalisiert. |
| 0:57-1:05 | Bildschirmaufnahme des Laptops: eine schlichte Skizze der Architektur (drei gleiche Blöcke, dann zehn Ausgaben) oder alternativ die Modellklasse im Editor, langsam gescrollt. | Sprecher: Klassifiziert wird mit einem kleinen eindimensionalen CNN: drei Faltungsblöcke mit 64 bis 128 Filtern, danach zehn Ausgaben. Absichtlich klein gehalten, weil unser Datensatz aus 624 Segmenten von drei Personen besteht. |
| 1:05-1:30 | HERZSTUECK, eine ungeschnittene Einstellung: Bildschirmaufnahme des Laptops, in der links das Kamerafenster mit der schreibenden Hand und rechts der Browser nebeneinanderliegen. Es wird eine 4 geschrieben, kurz innegehalten, dann eine 2 - im Browser erscheint nacheinander 4, dann 42. Danach zwei weitere Ziffern. | Kleine Einblendung unten: 'ungeschnitten, eine Aufnahme'. Sprecher (sparsam, danach Szenenton stehen lassen): Das ist der eigentliche Punkt: keine Taste für Start und Stopp. Geschrieben wird auf eine gedachte senkrechte Tafel, zwischen zwei Ziffern eine knappe halbe Sekunde Pause. Das Trennen übernimmt die Zustandsmaschine. |
| 1:30-1:42 | Gleicher Aufbau, echter Take aus derselben Drehreihe: eine 7 wird geschrieben, im Browser erscheint eine 2 oder ein Fragezeichen. | Sprecher: Es geht auch daneben. Die 7 war unsere schwächste Ziffer, in der Fehleranalyse 55 Prozent Trefferquote, meist als 2 gelesen. Und wenn die höchste Softmax-Wahrscheinlichkeit unter 0,6 liegt, zeigt das Frontend lieber ein Fragezeichen als eine geratene Ziffer. |
| 1:42-1:55 | Bildschirmaufnahme des Laptops: eine schlichte Folie, auf der beide Zahlen gleich groß nebeneinanderstehen, darunter je eine Zeile mit der Bedingung. | Einblendung: '86,3 % - zufälliger 80/20-Split, 624 Segmente' neben '96,7 % - 145 von 150, eine separate Aufnahmesitzung'. Sprecher: Zwei Zahlen, die zusammengehören. Die höhere stammt aus einer einzigen, sehr gleichmäßig geschriebenen Sitzung; schon zwei zusätzliche Fehler verschieben sie um mehr als einen Prozentpunkt. Wir lesen die beiden Werte deshalb nur gemeinsam. |
| 1:55-2:05 | Halbtotale, mit dem iPhone vom Stativ oder Bücherstapel aufgenommen: die drei Teammitglieder am Tisch, Laptop und iPhone davor. Am Ende ruhige Schlusseinblendung. | Sprecher: Offen bleibt das Wichtigste: ein echter Cross-Person-Test mit Personen, die keine Trainingsdaten beigesteuert haben. Zum Größenvergleich: ein publiziertes System erreicht 97,95 Prozent, allerdings mit 63.000 Beispielen von 35 Personen. Einblendung: 'Code, App und Backend: github.com/Matadorrr91/air-writing-sensor | ML4SCS, Leuphana Universität Lüneburg, SoSe 2026'. |

- Geräterollen vorher festlegen: In der Demo ist das iPhone der Sensor und kann sich nicht selbst filmen. Alle Schreibszenen deshalb mit der Laptop-Webcam aufnehmen; als Kamera dient das iPhone nur in Szene 1 und Szene 10.
- Split-Screen ohne Schnittarbeit: das Kamerafenster (Kamera-App bzw. Photo Booth) links neben den Browser legen und den kompletten Laptop-Bildschirm aufnehmen. Bild und Ergebnis liegen dann in einer Datei und sind automatisch synchron.
- Die App-Oberfläche über die iOS-Bildschirmaufnahme aus dem Kontrollzentrum mitschneiden, nicht abfilmen - abgefilmte Displays flimmern und sind schlecht lesbar.
- Vor jeder Bildschirmaufnahme Fokus/Nicht stören einschalten, überflüssige Tabs schliessen und die Lesezeichenleiste ausblenden, damit keine Benachrichtigung und keine privaten Fenster ins Bild laufen.
- Ton getrennt aufnehmen: den Sprechertext nach dem Dreh mit der Sprachmemo-App des iPhones einsprechen, Gerät etwa eine Handbreit vor dem Mund, in einem Raum mit Vorhängen oder Teppich. Der Szenenton vom Dreh (Lüfter, Klicks) wird nur in der Live-Demo kurz stehen gelassen.
- Licht: mit dem Gesicht zum Fenster arbeiten, nicht dagegen. Die schreibende Hand vor einem ruhigen, hellen Hintergrund halten, sonst ist die Bewegung im Video nicht zu verfolgen.
- Querformat, 1080p bei 30 Bildern pro Sekunde genügt. Den Laptop auf einen Bücherstapel stellen, damit die Hand vollständig im Bild bleibt, und die Standposition mit Klebeband auf dem Boden markieren.
- Die Demo-Szenen zuerst drehen, solange Backend, WLAN und App sicher laufen. Drei bis fünf Durchläufe aufnehmen und den besten echten Take verwenden.
- Szene 8 nicht nachstellen. Wenn in keinem Take etwas danebengeht, das offen sagen und die 55 Prozent aus der Fehleranalyse nur als Einblendung zeigen - ein gestellter Fehler wäre genauso unehrlich wie ein verschwiegener.
- Die beiden Genauigkeitswerte immer gemeinsam ins Bild setzen. Die 96,7 Prozent nie allein stehen lassen, auch nicht im Vorschaubild oder im Dateinamen.
- Einblendungen groß und je eine Zeile - das Video wird auch auf dem Handy angesehen. Keine Ausrufezeichen und keine Superlative in den Bauchbinden.
- Vor dem Dreh einmal laut durchsprechen und mitstoppen: die Texte sind mit rund zwei Wörtern pro Sekunde kalkuliert. Wenn es knapp wird, lieber einen Satz streichen als schneller sprechen.
- Die Schreibkonvention vorher zweimal üben (senkrechte gedachte Tafel, gleichbleibende Größe, etwa eine halbe Sekunde Pause zwischen den Ziffern), sonst schneidet die Zustandsmaschine im Take an der falschen Stelle.
- Das iPhone während des Schreibens fest in der Hand oder mit Handschlaufe halten; die Bewegung ist zügiger, als sie im Standbild aussieht.
- Schnitt in iMovie oder einem vergleichbaren kostenlosen Programm. Keine Musik mit unklarer Lizenz - entweder ein leiser lizenzfreier Titel oder gar keiner.
- Nur Teammitglieder ins Bild, fremde Personen und fremde Namen auf Bildschirmen aushalten. Vor der Abgabe prüfen, ob die Zustimmung zur Veröffentlichung im Steckbrief dazu passt.
- Zeitbudget realistisch: etwa 20 Minuten Aufbau und Technikcheck, 45 Minuten Dreh, 30 Minuten Schnitt und Vertonung.

### Offene Entscheidung
- `zustimmung_veroeffentlichung` im Frontmatter auf `ja` oder `nein` setzen.
