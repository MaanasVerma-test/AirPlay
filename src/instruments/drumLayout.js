export function buildDrumLayout(width, height) {
  const mkPad = (id, label, rect, sample) => ({ id, label, rect, sample, lastHit: 0 });
  return [
    mkPad("kick", "Kick", { x: 0.05 * width, y: 0.58 * height, w: 0.18 * width, h: 0.28 * height }, "kick"),
    mkPad("snare", "Snare", { x: 0.28 * width, y: 0.56 * height, w: 0.2 * width, h: 0.3 * height }, "snare"),
    mkPad("hatC", "Hi-Hat", { x: 0.5 * width, y: 0.56 * height, w: 0.18 * width, h: 0.3 * height }, "hihatClosed"),
    mkPad("hatO", "Open Hat", { x: 0.23 * width, y: 0.22 * height, w: 0.18 * width, h: 0.24 * height }, "hihatOpen"),
    mkPad("crash", "Crash", { x: 0.56 * width, y: 0.2 * height, w: 0.18 * width, h: 0.24 * height }, "crash"),
    mkPad("tom", "Tom", { x: 0.78 * width, y: 0.5 * height, w: 0.17 * width, h: 0.32 * height }, "tom")
  ];
}
