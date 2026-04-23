const loaded = new Set();

export async function loadSoundfont(instrumentName) {
  if (loaded.has(instrumentName)) return;
  const scriptId = `sf-${instrumentName}`;
  if (!document.getElementById(scriptId)) {
    await new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.id = scriptId;
      s.src = `https://gleitz.github.io/midi-js-soundfonts/MusyngKite/${instrumentName}-mp3.js`;
      s.onload = resolve;
      s.onerror = () => reject(new Error(`Soundfont load failed: ${instrumentName}`));
      document.head.appendChild(s);
    });
  }
  if (!window.MIDI || !window.MIDI.Soundfont || !window.MIDI.Soundfont[instrumentName]) {
    throw new Error(`Soundfont missing global data for ${instrumentName}`);
  }
  loaded.add(instrumentName);
}

export async function decodeSoundfontNotes(audioCtx, instrumentName, notes, cache) {
  const sfMap = window.MIDI.Soundfont[instrumentName];
  for (const note of notes) {
    if (!sfMap[note] || cache.has(note)) continue;
    const dataUrl = sfMap[note].startsWith("data:") ? sfMap[note] : `data:audio/mp3;base64,${sfMap[note]}`;
    const arr = await (await fetch(dataUrl)).arrayBuffer();
    const buf = await audioCtx.decodeAudioData(arr.slice(0));
    cache.set(note, buf);
  }
}
