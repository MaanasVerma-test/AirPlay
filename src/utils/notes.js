const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export function buildNoteList(start, end) {
  const list = [];
  const startMidi = noteToMidi(start);
  const endMidi = noteToMidi(end);
  for (let m = startMidi; m <= endMidi; m++) list.push(midiToNote(m));
  return list;
}

export function noteToMidi(note) {
  const m = /^([A-G]#?)(-?\d+)$/.exec(note);
  const idx = noteNames.indexOf(m[1]);
  const octave = Number(m[2]);
  return (octave + 1) * 12 + idx;
}

export function midiToNote(midi) {
  const name = noteNames[midi % 12];
  const octave = Math.floor(midi / 12) - 1;
  return `${name}${octave}`;
}
