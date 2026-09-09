# Week 06 Report — Machine Learning for Smart and Connected Systems (ML4SCS)

## Weekly Goal
Apply the supervisor's sensor feedback, rebuild the recording setup, and move to a model that reads the raw time series.

## Work Done This Week

### 1. Data Work
Reworked the recording setup after the supervisor's feedback:
- Switched to the Phyphox experiment "Beschleunigung (ohne g)", where the app subtracts gravity, so hand posture no longer shifts the signal
- Put both sensors into one custom experiment, so acceleration and gyroscope share one time base
- Exported each recording as a ZIP into its own run folder

Set the new target at 10 digits × 30 recordings × 3 persons = 900 recordings.

Dropped the 120 recordings from last week: they had been made quickly to check that the pipeline reads a file, not as training material, and came from the old sensor configuration.

### 2. Analysis / Modeling Work
Drew the consequence from the three weaknesses listed last week: the new experiment removes gravity, dropping the 24 statistics restores the temporal order, and the manual start and stop stays open. Retired the Random Forest, keeping its feature pipeline in the repository.

Wrote `preprocessing_lstm.py`, which loads a recording as a raw sequence, resamples it to 100 timesteps and returns `X` of shape `(n, 100, 6)`, and `train_lstm.py`, a small LSTM with 64 units, dropout, early stopping and 3-fold cross-validation. Neither could be run, as nothing had been recorded in the new configuration yet.

Also tried to improve the existing setup on the data at hand. That did not work.

### 3. Repository / Documentation Work
- `src/preprocessing_lstm.py` and `src/train_lstm.py` written
- README rewritten as the collection and training guide, with the TensorFlow install and `tensorflow-macos` fallback
- `requirements.txt` still lists only the Random Forest packages
- Still nothing on GitHub; the last push remains the week 03 commit from 7 May

## Experiments Conducted

| Experiment | Change Made | Result | Interpretation |
|-----------|-------------|--------|----------------|
| Sensor configuration | "Ohne g" plus gyroscope in one experiment | Gravity subtracted by the app, one time base | Old and new recordings cannot be mixed |
| Input representation | Raw sequences of 100 timesteps × 6 axes | Pipeline returns (100, 6) per recording | Keeps the temporal order |
| Optimisation attempt | Retuned the existing setup | No improvement | Nothing measurable to report |

## Results
Nothing measurable this week. The reworked setup and the LSTM pipeline exist, but nothing was recorded with them.

## Challenges
- Data collection starts over: the May recordings are out, 900 planned
- `train_lstm.py` reads from `U:\Airwriting\real_data`, the older scripts from `/Users/isakilic/Downloads/real_data`, so every path is machine-specific
- Manual start and stop is unchanged, so the live demo problem is untouched
- Who records which digits is not settled

## Key Insights
- Recordings made to test a pipeline do not turn into a training set later
- The "ohne g" experiment is the configuration to keep, but it makes every May recording unusable
- The README has to carry the exact experiment settings, since three people record on three phones

## Plan for Next Week
- Record with the new experiment, 30 per digit per person
- Run `train_lstm.py` and write down the cross-validation result
- Start on automatic segmentation to replace the manual start/stop

## Contributions
- Member 1: Isa Kilic
- Member 2: Efe Özüm
- Member 3: Tony Duong
