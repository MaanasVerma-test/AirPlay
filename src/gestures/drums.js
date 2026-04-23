import { pointInRect } from "../utils/geometry.js";

export function detectDrumHits({ store, handLabel, wrist, state, now, onHit }) {
  if (state.prevWristY == null) {
    state.prevWristY = wrist.y;
    return;
  }
  const velocity = wrist.y - state.prevWristY;
  state.prevWristY = wrist.y;
  const elbowY = state.elbowY == null ? wrist.y : state.elbowY;
  const relativeDrop = wrist.y - elbowY;
  if (velocity < 15 || relativeDrop < -20) return;

  const pad = store.drums.pads.find((p) => pointInRect(wrist, p.rect));
  if (!pad) return;
  const handPadKey = `${handLabel}-${pad.id}`;
  const last = store.drums.cooldowns.get(handPadKey) || 0;
  if (now - last < store.padCooldownMs) return;

  store.drums.cooldowns.set(handPadKey, now);
  pad.lastHit = now;
  onHit({ pad, velocity, x: wrist.x, y: wrist.y });
}
