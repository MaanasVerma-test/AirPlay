export function detectGuitarMotion({ store, handLabel, wrist, state, now, width, onStrum, onChordChange }) {
  if (handLabel === "left") {
    store.guitar.currentZone = Math.min(5, Math.max(1, Math.floor((wrist.x / width) * 5) + 1));
    onChordChange(store.guitar.chords[store.guitar.currentZone]);
    return;
  }
  if (handLabel !== "right" || state.wristHist.length < 5) return;

  const h = state.wristHist;
  const delta = h[h.length - 1].y - h[h.length - 4].y;
  const absDelta = Math.abs(delta);
  const dir = delta > 0 ? 1 : -1;
  const debounceOk = now - store.guitar.lastStrumTs > store.strumCooldownMs;
  const changedDirection = store.guitar.lastDir !== 0 && dir !== store.guitar.lastDir;

  if (absDelta > 25 && debounceOk && (changedDirection || store.guitar.lastDir === 0)) {
    const chord = store.guitar.chords[store.guitar.currentZone];
    store.guitar.lastStrumTs = now;
    store.guitar.lastDir = dir;
    onStrum({ chord, velocity: delta, x: wrist.x, y: wrist.y });
  } else if (absDelta <= 8) {
    store.guitar.lastDir = dir;
  }
}
