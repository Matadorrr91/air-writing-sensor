# Trainingsdatensatz

624 aufgenommene Schreibbewegungen der Ziffern 0–9, erfasst mit den
Bewegungssensoren eines iPhones (CoreMotion) bei **50 Hz**.

## Dateiformat

Eine `.npz`-Datei pro Segment, benannt nach dem Schema:

```
{person}_{ziffer}_{laufnummer}.npz
```

Beispiel: `efe_6_0042.npz` = Person „efe", Ziffer 6, Exemplar 42.

Jede Datei enthält drei Arrays:

| Schlüssel | Typ | Inhalt |
|---|---|---|
| `x` | `float32`, Form `(N, 6)` | Rohsegment, `N` = Anzahl Samples (variabel) |
| `label` | `int` | Geschriebene Ziffer, 0–9 |
| `person` | `str` | ID der schreibenden Person |

Kanal-Reihenfolge in `x`:

| Index | Kanal | Quelle | Einheit |
|---|---|---|---|
| 0–2 | `ax, ay, az` | `userAcceleration` (Schwerkraft entfernt) | g |
| 3–5 | `gx, gy, gz` | `rotationRate` (Gyroskop) | rad/s |

## Verteilung

| Person-Label | Segmente | Anmerkung |
|---|---|---|
| `efe` | 474 | mehrere Aufnahmesitzungen |
| `efe2` | 150 | separate, spätere Sitzung (15 je Ziffer) |

Die Segmentlänge `N` variiert (ca. 17–200 Samples, Median ~123), weil jede
Schreibbewegung unterschiedlich lang dauert. Die Vereinheitlichung auf
100 Zeitschritte erfolgt erst in `backend/preprocessing.py`.

## Verwendung

Alle Segmente werden automatisch geladen von:

```python
from backend import data
samples = data.load_all()      # list[Sample] mit .x, .label, .person
print(data.summary(samples))   # Verteilung je Person und Ziffer
```

Training direkt darauf:

```bash
python -m backend.train
```

## Aufnahme

Aufgenommen mit `backend/collect.py`. Das Terminal gibt die zu schreibende
Ziffer vor, die Segmentierung (`backend/segmentation.py`) erkennt Anfang und
Ende der Bewegung automatisch über die Bewegungspausen, und jedes erkannte
Segment wird sofort gelabelt gespeichert.

Geschrieben wurde jeweils auf eine gedachte senkrechte Fläche, mit möglichst
gleichbleibender Größe und Strichreihenfolge und einer deutlichen Pause
(~0,5 s) zwischen den Ziffern.
