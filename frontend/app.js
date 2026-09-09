// Verbindet sich mit dem Backend und zeigt erkannte Ziffern live an.

const statusEl = document.getElementById("status");
const statusText = document.getElementById("status-text");
const latestEl = document.getElementById("latest");
const sequenceEl = document.getElementById("sequence");
const clearBtn = document.getElementById("clear");
const undoBtn = document.getElementById("undo");
const confidenceEl = document.getElementById("confidence");

let sequence = "";

clearBtn.addEventListener("click", () => {
  sequence = "";
  sequenceEl.textContent = "";
  latestEl.textContent = "";
  showConfidence(null);
});

// Einzelne Fehlerkennung zurücknehmen, ohne die ganze Folge zu verlieren.
undoBtn.addEventListener("click", () => {
  sequence = sequence.slice(0, -1);
  sequenceEl.textContent = sequence;
  latestEl.textContent = "";
  showConfidence(null);
});

/** Konfidenz anzeigen. `null` blendet aus.
 *  Eingefärbt relativ zur Schwelle 0.6 aus backend/config.py, damit beim
 *  Vorführen sichtbar wird, wie knapp eine Entscheidung war. */
function showConfidence(conf, prefix = "") {
  if (conf === null || conf === undefined) {
    confidenceEl.textContent = "";
    confidenceEl.className = "";
    return;
  }
  const prozent = (conf * 100).toFixed(0);
  confidenceEl.textContent = `${prefix}${prozent} % sicher`;
  confidenceEl.className = conf >= 0.85 ? "hoch" : conf >= 0.6 ? "knapp" : "unter";
}

function showDigit(digit, confidence) {
  showConfidence(confidence);
  latestEl.textContent = digit;
  latestEl.classList.remove("rejected");
  latestEl.classList.add("pulse");
  setTimeout(() => latestEl.classList.remove("pulse"), 130);
  sequence += digit;
  sequenceEl.textContent = sequence;
}

function showRejected(digit, confidence) {
  latestEl.textContent = "?";
  latestEl.classList.add("rejected");
  // Der Server verrät, worauf es hinausgelaufen wäre -- für die Fehleranalyse
  // interessanter als ein blosses Fragezeichen.
  showConfidence(confidence, digit === undefined ? "" : `wäre ${digit} — nur `);
  setTimeout(() => {
    latestEl.classList.remove("rejected");
    latestEl.textContent = "";
  }, 600);
}

function connect() {
  const proto = location.protocol === "https:" ? "wss" : "ws";
  const ws = new WebSocket(`${proto}://${location.host}/ws/display`);

  ws.onopen = () => {
    statusEl.classList.add("connected");
    statusText.textContent = "verbunden";
  };

  ws.onclose = () => {
    statusEl.classList.remove("connected");
    statusText.textContent = "getrennt – neuer Versuch…";
    setTimeout(connect, 1500); // automatisch neu verbinden
  };

  ws.onmessage = (ev) => {
    let msg;
    try { msg = JSON.parse(ev.data); } catch { return; }

    switch (msg.type) {
      case "status":
        statusText.textContent = msg.model_loaded
          ? "verbunden – Modell aktiv"
          : "verbunden – DEBUG (kein Modell, nur Segmentierung)";
        break;
      case "digit":
        showDigit(msg.digit, msg.confidence);
        break;
      case "rejected":
        showRejected(msg.digit, msg.confidence);
        break;
      case "segment": // DEBUG-Modus: nur Segment erkannt
        latestEl.textContent = "•";
        showConfidence(null);
        latestEl.classList.add("pulse");
        setTimeout(() => {
          latestEl.classList.remove("pulse");
          latestEl.textContent = "";
        }, 200);
        break;
    }
  };
}

connect();
