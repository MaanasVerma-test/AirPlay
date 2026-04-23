import "./styles/app.css";
import { renderAppShell, getEls, setStatus } from "./ui/dom.js";
import { createStore, resetGestureState } from "./state/store.js";
import { createTracker } from "./tracking/mediapipe.js";
import { createAudioEngine } from "./audio/engine.js";
import { detectPianoPresses } from "./gestures/piano.js";
import { detectGuitarMotion } from "./gestures/guitar.js";
import { detectDrumHits } from "./gestures/drums.js";
import { createRenderer } from "./render/canvasRenderer.js";
import { buildPianoLayout } from "./instruments/pianoLayout.js";
import { buildDrumLayout } from "./instruments/drumLayout.js";
import { toPx } from "./utils/geometry.js";

renderAppShell(document.getElementById("app"));
const els = getEls();
const ctx = els.overlay.getContext("2d");
const store = createStore();
const audio = createAudioEngine();
const renderer = createRenderer(ctx, els);

const tracker = createTracker(els.video, {
  onHands: (results) => { store.resultsHands = results; },
  onPose: (results) => { store.resultsPose = results; }
});

els.cards.forEach((card) => card.addEventListener("click", () => startMode(card.dataset.mode)));
els.muteBtn.addEventListener("click", toggleMute);
els.backBtn.addEventListener("click", stopSessionAndBack);
els.retryBtn.addEventListener("click", () => startMode(store.mode));
window.addEventListener("resize", resizeCanvas);
new ResizeObserver(() => resizeCanvas()).observe(els.video);

function resizeCanvas() {
  const rect = els.video.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  els.overlay.width = rect.width;
  els.overlay.height = rect.height;
  store.piano.keyRects = buildPianoLayout(rect.width, rect.height, store.piano.notes.length);
  store.drums.pads = buildDrumLayout(rect.width, rect.height);
}

function toggleMute() {
  store.muted = !store.muted;
  els.muteBtn.textContent = store.muted ? "Unmute" : "Mute";
  audio.toggleMute(store.muted);
}

async function startMode(mode) {
  store.mode = mode;
  store.running = false;
  store.ready = false;
  store.particles.length = 0;
  store.ripples.length = 0;
  resetGestureState(store);

  els.selectScreen.style.display = "none";
  els.playScreen.style.display = "block";
  els.instrumentName.textContent = mode === "piano" ? "Air Keyboard" : mode === "guitar" ? "Air Guitar" : "Air Drums";
  els.chord.style.display = mode === "guitar" ? "block" : "none";

  setStatus(els, { visible: true, title: "Initializing", text: "Loading hand tracking and audio samples...", spinner: true, retry: false });
  try {
    await audio.warmup(mode, store);
    await tracker.initModels();
    tracker.setMode(mode);
    tracker.setReady(false);
    await tracker.start();
    resizeCanvas();
    store.running = true;
    store.ready = true;
    tracker.setReady(true);
    setStatus(els, { visible: false });
    requestAnimationFrame(renderLoop);
  } catch (error) {
    console.error(error);
    setStatus(els, {
      visible: true,
      title: "Camera Access Needed",
      text: "Please allow webcam permission to play. If blocked, enable it in browser settings and retry.",
      spinner: false,
      retry: true
    });
  }
}

function stopSessionAndBack() {
  store.running = false;
  store.ready = false;
  tracker.setReady(false);
  tracker.stop();
  els.video.srcObject = null;
  els.playScreen.style.display = "none";
  els.selectScreen.style.display = "flex";
  setStatus(els, { visible: false });
}

function updateGestureStateAndTrigger(now) {
  const hands = store.resultsHands.multiHandLandmarks || [];
  const handedness = store.resultsHands.multiHandedness || [];
  const poseLm = store.resultsPose && store.resultsPose.poseLandmarks;
  if (poseLm) {
    store.handState.left.elbowY = poseLm[13] ? poseLm[13].y * els.overlay.height : null;
    store.handState.right.elbowY = poseLm[14] ? poseLm[14].y * els.overlay.height : null;
  }

  for (let i = 0; i < hands.length; i++) {
    const lm = hands[i];
    const labelRaw = handedness[i] && handedness[i].label ? handedness[i].label.toLowerCase() : "";
    const handLabel = labelRaw.includes("left") ? "left" : labelRaw.includes("right") ? "right" : (lm[0].x < 0.5 ? "left" : "right");
    const state = store.handState[handLabel];
    const wrist = toPx(lm[0], els.overlay.width, els.overlay.height);
    state.wristHist.push({ y: wrist.y, ts: now });
    if (state.wristHist.length > 8) state.wristHist.shift();

    if (store.mode === "piano") {
      detectPianoPresses({
        store, handLabel, landmarks: lm, now, width: els.overlay.width, height: els.overlay.height,
        onNote: ({ note, velocity, x, y }) => { audio.playPiano(note, velocity); spawnRipple(x, y, "rgba(188,138,255,0.9)"); }
      });
    }
    if (store.mode === "guitar") {
      detectGuitarMotion({
        store, handLabel, wrist, state, now, width: els.overlay.width,
        onChordChange: (chord) => { els.chord.textContent = `Chord: ${chord.name}`; },
        onStrum: ({ chord, velocity, x, y }) => { audio.playGuitar(chord.notes, velocity); spawnRipple(x, y, "rgba(86,237,255,0.95)"); }
      });
    }
    if (store.mode === "drums") {
      detectDrumHits({
        store, handLabel, wrist, state, now,
        onHit: ({ pad, velocity, x, y }) => { audio.playDrum(pad.sample, velocity); spawnRipple(x, y, "rgba(255,170,90,0.95)"); }
      });
    }
  }
}

function spawnRipple(x, y, color) {
  store.ripples.push({ x, y, radius: 8, life: 1, color });
}

function updateFPS(ts) {
  store.fpsFrames += 1;
  if (ts - store.fpsLastTs >= 500) {
    store.fps = Math.round((store.fpsFrames * 1000) / (ts - store.fpsLastTs));
    store.fpsFrames = 0;
    store.fpsLastTs = ts;
    els.fps.textContent = `FPS: ${store.fps}`;
  }
}

function renderLoop(ts) {
  if (!store.running) return;
  updateFPS(ts);
  renderer.clear();
  renderer.drawFrame(store, ts, (point) => toPx(point, els.overlay.width, els.overlay.height));
  updateGestureStateAndTrigger(ts);
  requestAnimationFrame(renderLoop);
}
