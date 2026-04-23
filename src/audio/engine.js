import { loadSoundfont, decodeSoundfontNotes } from "./soundfonts.js";
import { loadDrumSamples } from "./drums.js";

export function createAudioEngine() {
  let audioCtx = null;
  let masterGain = null;
  const sampleCache = { piano: new Map(), guitar: new Map(), drums: new Map() };

  async function ensureContext(muted) {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = audioCtx.createGain();
      masterGain.gain.value = muted ? 0 : 1;
      masterGain.connect(audioCtx.destination);
    }
    if (audioCtx.state === "suspended") await audioCtx.resume();
  }

  async function warmup(mode, store) {
    await ensureContext(store.muted);
    if (mode === "piano") {
      await loadSoundfont("acoustic_grand_piano");
      await decodeSoundfontNotes(audioCtx, "acoustic_grand_piano", store.piano.notes, sampleCache.piano);
    } else if (mode === "guitar") {
      await loadSoundfont("acoustic_guitar_nylon");
      const notes = [...new Set(Object.values(store.guitar.chords).flatMap((c) => c.notes))];
      await decodeSoundfontNotes(audioCtx, "acoustic_guitar_nylon", notes, sampleCache.guitar);
    } else if (mode === "drums") {
      await loadDrumSamples(audioCtx, sampleCache.drums);
    }
  }

  function mapVelocityToGain(v, min, max) {
    const n = (Math.abs(v) - min) / Math.max(1, max - min);
    return 0.2 + Math.max(0, Math.min(1, n)) * 0.9;
  }

  function playBuffer(buffer, gain = 0.8, when = 0) {
    if (!buffer || !audioCtx) return;
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = Math.max(0.05, Math.min(1.2, gain));
    source.connect(gainNode);
    gainNode.connect(masterGain);
    source.start(audioCtx.currentTime + when);
  }

  return {
    sampleCache,
    warmup,
    toggleMute(muted) {
      if (!masterGain || !audioCtx) return;
      const now = audioCtx.currentTime;
      masterGain.gain.cancelScheduledValues(now);
      masterGain.gain.linearRampToValueAtTime(muted ? 0 : 1, now + 0.03);
    },
    playPiano(note, velocity) {
      playBuffer(sampleCache.piano.get(note), mapVelocityToGain(velocity, 4, 38));
    },
    playGuitar(notes, velocity) {
      const base = mapVelocityToGain(Math.abs(velocity), 6, 50);
      notes.forEach((note, i) => playBuffer(sampleCache.guitar.get(note), base * (1 - i * 0.08), i * 0.005));
    },
    playDrum(sample, velocity) {
      playBuffer(sampleCache.drums.get(sample), mapVelocityToGain(velocity, 8, 45));
    }
  };
}
