export function buildPianoLayout(width, height, keyCount) {
  const h = height * 0.24;
  const y = height - h;
  const w = width / keyCount;
  return Array.from({ length: keyCount }, (_, i) => ({ x: i * w, y, w, h }));
}
