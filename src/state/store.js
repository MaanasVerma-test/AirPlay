import { buildNoteList } from "../utils/notes.js";

export function createStore() {
  return {
    mode: null,
    muted: false,
    running: false,
    ready: false,
    fps: 0,
    fpsFrames: 0,
    fpsLastTs: performance.now(),
    resultsHands: { multiHandLandmarks: [], multiHandedness: [] },
    resultsPose: null,
    keyCooldownMs: 150,
    strumCooldownMs: 200,
    padCooldownMs: 150,
    particles: [],
    ripples: [],
    piano: { notes: buildNoteList("C3", "B4"), keyRects: [], activeKeys: new Map(), cooldowns: new Map() },
    guitar: {
      chords: {
        1: { name: "C Major", notes: ["C3", "E3", "G3", "C4"] },
        2: { name: "G Major", notes: ["G2", "B2", "D3", "G3"] },
        3: { name: "D Major", notes: ["D3", "F#3", "A3", "D4"] },
        4: { name: "A Minor", notes: ["A2", "C3", "E3", "A3"] },
        5: { name: "E Minor", notes: ["E2", "G2", "B2", "E3"] }
      },
      currentZone: 1,
      lastStrumTs: 0,
      lastDir: 0
    },
    drums: { pads: [], cooldowns: new Map() },
    handState: {
      left: { prevTips: {}, wristHist: [], prevWristY: null, elbowY: null },
      right: { prevTips: {}, wristHist: [], prevWristY: null, elbowY: null }
    }
  };
}

export function resetGestureState(store) {
  store.handState.left = { prevTips: {}, wristHist: [], prevWristY: null, elbowY: null };
  store.handState.right = { prevTips: {}, wristHist: [], prevWristY: null, elbowY: null };
  store.guitar.lastStrumTs = 0;
  store.guitar.lastDir = 0;
  store.piano.cooldowns.clear();
  store.drums.cooldowns.clear();
  store.piano.activeKeys.clear();
}
