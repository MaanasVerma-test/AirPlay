import { toPx } from "../utils/geometry.js";

export function detectPianoPresses({ store, handLabel, landmarks, now, width, height, onNote }) {
  const fingertipIds = [8, 12, 16, 20];
  const threshold = height * 0.76;
  const state = store.handState[handLabel];

  fingertipIds.forEach((tipId) => {
    const fingerPx = toPx(landmarks[tipId], width, height);
    const key = `${handLabel}-${tipId}`;
    const prevY = state.prevTips[tipId];
    state.prevTips[tipId] = fingerPx.y;
    if (prevY == null) return;

    const vel = fingerPx.y - prevY;
    const movingDown = fingerPx.y > prevY;
    const crossed = prevY <= threshold && fingerPx.y > threshold;
    const canTrigger = !store.piano.cooldowns.get(key) || now - store.piano.cooldowns.get(key) > store.keyCooldownMs;
    if (!movingDown || !crossed || vel < 4 || !canTrigger) return;

    const noteIdx = Math.min(store.piano.notes.length - 1, Math.max(0, Math.floor((fingerPx.x / width) * store.piano.notes.length)));
    const note = store.piano.notes[noteIdx];
    store.piano.cooldowns.set(key, now);
    store.piano.activeKeys.set(noteIdx, now);
    onNote({ note, velocity: vel, x: fingerPx.x, y: threshold });
  });
}
