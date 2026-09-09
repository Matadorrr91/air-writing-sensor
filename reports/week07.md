# Week 07 Report — Machine Learning for Smart and Connected Systems (ML4SCS)

## Weekly Goal
Train the LSTM on the recordings so far and replace the manual start/stop with automatic segmentation.

## Work Done This Week

### 1. Data Work
Kept recording with the week 06 setup: "Beschleunigung (ohne g)" and gyroscope in one Phyphox experiment, one ZIP per run, unpacked into `real_data/digit_<d>_run<nn>`.

### 2. Analysis / Modeling Work
Trained the LSTM with `train_lstm.py` on the recordings available. The run produced a cross-validation result, but the figure was not written down and cannot be reported.

Implemented `app.py`, a Flask backend for the live demo:
- Polls Phyphox every 100 ms and clears the buffers after each gesture, so two gestures do not land in one recording
- Segments the stream: a gesture starts above 1.5 m/s², ends after 0.6 s of stillness, minimum length 0.5 s
- Resamples the six channels to 100 timesteps, normalises with the saved `norm_mean` / `norm_std`, returns digit and confidence as JSON at `/status`

The rest of the week went into the start threshold and silence window. Tried to get the demo running reliably, and it did not work.

### 3. Repository / Documentation Work
- `app.py` and the browser page `templates/index.html` added to the repository
- README extended with live-demo steps and a troubleshooting table
- Still nothing on GitHub; the last push is the week 03 commit from 7 May

## Experiments Conducted

| Experiment | Change Made | Result | Interpretation |
|-----------|-------------|--------|----------------|
| LSTM run | Trained `train_lstm.py` on the recordings available | Result not written down | No figure to compare later runs against |
| Automatic segmentation | Threshold state machine on the live stream | Gestures cut without a button press | Manual start/stop no longer needed |

## Results
The chain ran end to end: phone → Flask → segmentation → LSTM → browser, without a manual start/stop. No accuracy can be reported, and the tuning brought no measurable improvement.

## Challenges
- Eduroam blocks the connection between phone and laptop, so the demo only runs over a personal hotspot
- Phyphox buffer names differ per experiment (`accX` versus `lin_accX`); wrong names look like wrong predictions
- Data paths are hard-coded per machine, and `requirements.txt` lists neither tensorflow nor flask

## Key Insights
- `norm_mean` and `norm_std` have to come from the training run, otherwise a gesture reaches the model differently than in training
- A result that is not written down in the week it was measured is gone

## Plan for Next Week
- Run `train_lstm.py` again and write down accuracy, classification report and confusion matrix
- Check whether the recordings made so far are usable
- Replace the hard-coded data paths with relative paths

## Contributions
- Member 1: Isa Kilic
- Member 2: Efe Özüm
- Member 3: Tony Duong
