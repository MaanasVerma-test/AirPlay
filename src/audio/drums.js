export const DRUM_URLS = {
  kick: "https://cdn.jsdelivr.net/gh/nbrosowsky/tonejs-instruments@master/samples/drum-kits/CR78/kick.mp3",
  snare: "https://cdn.jsdelivr.net/gh/nbrosowsky/tonejs-instruments@master/samples/drum-kits/CR78/snare.mp3",
  hihatClosed: "https://cdn.jsdelivr.net/gh/nbrosowsky/tonejs-instruments@master/samples/drum-kits/CR78/hihat.mp3",
  hihatOpen: "https://cdn.jsdelivr.net/gh/nbrosowsky/tonejs-instruments@master/samples/drum-kits/CR78/openhat.mp3",
  crash: "https://cdn.jsdelivr.net/gh/nbrosowsky/tonejs-instruments@master/samples/drum-kits/CR78/ride.mp3",
  tom: "https://cdn.jsdelivr.net/gh/nbrosowsky/tonejs-instruments@master/samples/drum-kits/CR78/tom.mp3"
};

export async function loadDrumSamples(audioCtx, sampleMap) {
  await Promise.all(Object.entries(DRUM_URLS).map(async ([key, url]) => {
    if (sampleMap.has(key)) return;
    const arr = await (await fetch(url)).arrayBuffer();
    const buf = await audioCtx.decodeAudioData(arr.slice(0));
    sampleMap.set(key, buf);
  }));
}
