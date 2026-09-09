# Week 08 Report — Machine Learning for Smart and Connected Systems (ML4SCS)

## Weekly Goal
Rebuild the project cleanly: our own app instead of Phyphox, a 1D-CNN instead of the LSTM, end to end.

## Work Done This Week

### 1. Data Work
Dropped Phyphox as the data source: its ZIP export delivers one file per recording after the fact, which does not fit a live application. Technical trouble had piled up as well: hard-coded paths, missing packages, and nothing pushed since week 03. We therefore set the project up from scratch in a new repository.

Nothing recorded so far is usable, as the check planned last week confirmed: the 120 May runs were ruled out in week 06 as test recordings, and the rest comes from a Phyphox setup the new app replaces.

Wrote our own watchOS app and moved back to the Apple Watch: CoreMotion `userAcceleration` and `rotationRate` at 50 Hz, streamed over a WebSocket to a FastAPI backend instead of one ZIP per recording. CoreMotion subtracts gravity itself. Implemented `collect.py` to prompt for the digit, record a segment and store it with label and person id. No real recordings were made this week.

### 2. Analysis / Modeling Work
Replaced the LSTM with a 1D-CNN: three convolution blocks with batch normalisation and max pooling, then global average pooling and two linear layers with dropout. The LSTM went out with Phyphox; its cross-validation figure from last week was never written down.

Added segmentation that cuts segments from the smoothed movement energy with fixed thresholds and resamples them to 100 time steps. Took over the path fix planned last week: training and live inference read their constants from one config file.

Moved the train/val split ahead of augmentation after a review; otherwise variants of the same segment land in both halves.

### 3. Repository / Documentation Work
Created the new repository `airwriting` on 4 June with backend, frontend, watchOS app and tests. Added a CI workflow for the pipeline checks a few days later; the smoke test stayed out because it needs torch and fastapi.

## Experiments Conducted

| Experiment | Change Made | Result | Interpretation |
|-----------|-------------|--------|----------------|
| Sensor source | Own app reading CoreMotion | Continuous stream, acceleration without gravity | Live capable, no ZIP per recording |
| Classifier | Replaced the LSTM with a 1D-CNN | Trains and predicts in the new pipeline | Not measured on our own data yet |
| Full run, synthetic | Trained and ran inference end to end | Accuracy 1.000 | Expected on generated data |

## Results
The chain ran end to end on synthetic data: stream in, segmentation, normalisation, 1D-CNN, prediction back to the browser, accuracy 1.000. Nothing was measured on real recordings.

## Challenges
- The watch app would not install on the Apple Watch Series 4 with a free developer account
- No recordings exist for the new setup, so the energy thresholds stay at their guessed values
- Nothing measurable came out of the week

## Key Insights
- Augmenting before the split puts the same movement into both halves
- Splitting the system into app, backend and frontend made errors easier to locate

## Plan for Next Week
- Get the app running on a device that can install it
- Record real segments for all ten digits, from all three of us
- Train the 1D-CNN on real data, calibrate the energy thresholds and write the result down

## Contributions
- Member 1: Isa Kilic
- Member 2: Efe Özüm
- Member 3: Tony Duong
