import fs from 'fs';

const selectHtml = fs.readFileSync('stitch_select.html', 'utf-8');
const liveHtml = fs.readFileSync('stitch_live.html', 'utf-8');

// EXTRACT TAILWIND CONFIG & FONTS FOR APP.HTML
const headMatch = selectHtml.match(/<head>([\s\S]*?)<\/head>/);
let headContent = headMatch[1];
headContent = headContent.replace(/<meta charset="utf-8"\/>/g, '');
headContent = headContent.replace(/<meta content="width=device-width, initial-scale=1.0" name="viewport"\/>/g, '');
headContent = headContent.replace(/<title>.*?<\/title>/g, '');
// Keep tailwind, fonts, icons, tailwind config, style.

const newAppHtml = `<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Air Instrument - Experience</title>
${headContent}
  </head>
  <body class="bg-background text-on-surface font-body-md overflow-hidden">
    <div id="app"></div>
    <script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js"></script>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>`;

fs.writeFileSync('app.html', newAppHtml);

// EXTRACT SELECT SCREEN BODY
const selectBodyMatch = selectHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/);
let selectBody = selectBodyMatch[1];

// Inject IDs into Select Screen for JavaScript
// "Acoustic Drums" card
selectBody = selectBody.replace(
  /<div class="group relative aspect-\[3\/4\](.*?)Acoustic Drums([\s\S]*?)<\/div>\s*<\/div>/,
  '<div class="group relative aspect-[3/4]$1Acoustic Drums$2</div>\n</div>'.replace('group relative', 'instrument-card group relative')
);
selectBody = selectBody.replace(/<h2 class="font-headline-md text-white mb-2">Acoustic Drums<\/h2>/, '<h2 class="font-headline-md text-white mb-2">Acoustic Drums</h2>').replace(/<div class="instrument-card group relative aspect-\[3\/4\](.*?)Acoustic Drums/, '<div data-mode="drums" class="instrument-card group relative aspect-[3/4]$1Acoustic Drums');

// "Electric Guitar" card
selectBody = selectBody.replace(/<div class="group relative aspect-\[3\/4\](.*?)Electric Guitar/, '<div data-mode="guitar" class="instrument-card group relative aspect-[3/4]$1Electric Guitar');

// "Grand Piano" card
selectBody = selectBody.replace(/<div class="group relative aspect-\[3\/4\](.*?)Grand Piano/, '<div data-mode="piano" class="instrument-card group relative aspect-[3/4]$1Grand Piano');

// EXTRACT LIVE SCREEN BODY
const liveBodyMatch = liveHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/);
let liveBody = liveBodyMatch[1];

// Inject IDs into Live Screen for JavaScript
// Video and overlay canvas
liveBody = liveBody.replace(
  /<img class="camera-background"[^>]*>/,
  `<div id="videoContainer" class="fixed top-0 left-0 w-full h-full z-[-1]">
    <video id="video" class="w-full h-full object-cover filter brightness-[0.4] contrast-[1.2]" playsinline></video>
    <canvas id="overlay" class="absolute top-0 left-0 w-full h-full pointer-events-none"></canvas>
  </div>`
);

// Mute button (map to volume icon)
liveBody = liveBody.replace(
  /<span class="material-symbols-outlined text-zinc-500 text-sm"[^>]*>volume_up<\/span>/,
  `<button id="muteBtn" class="material-symbols-outlined text-zinc-500 text-sm hover:text-white transition-colors cursor-pointer focus:outline-none" data-icon="volume_up">volume_up</button>`
);

// FPS Counter (inject next to timer)
liveBody = liveBody.replace(
  /<span class="text-\[12px\] font-\['Space_Grotesk'\] text-zinc-300 font-mono">00:00:00<\/span>/,
  `<span class="text-[12px] font-['Space_Grotesk'] text-zinc-300 font-mono">00:00:00</span>
   <div id="fps" class="text-[10px] text-cyan-400 font-mono mt-1">FPS: --</div>`
);

// Back button (map to AIRPLAY logo)
liveBody = liveBody.replace(
  /<div class="text-2xl font-black tracking-tighter text-cyan-400 drop-shadow-\[0_0_8px_rgba\(0,240,255,0\.6\)\] font-\['Space_Grotesk'\]">[\s\S]*?AIRPLAY[\s\S]*?<\/div>/,
  `<button id="backBtn" class="text-2xl font-black tracking-tighter text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.6)] font-['Space_Grotesk'] hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none border-none bg-transparent">
      AIRPLAY
   </button>`
);

// Instrument Name (Stage Title)
liveBody = liveBody.replace(
  /<a class="text-cyan-400 border-b-2 border-cyan-400 pb-1 font-\['Space_Grotesk'\] tracking-tight[^>]*>Stage<\/a>/,
  `<a id="instrumentName" class="text-cyan-400 border-b-2 border-cyan-400 pb-1 font-['Space_Grotesk'] tracking-tight hover:text-cyan-200 hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.4)] transition-all" href="#">Stage</a>`
);

// Active Chord (map to Library text temporarily or just add it)
liveBody = liveBody.replace(
  /<div class="flex flex-col items-center justify-center text-zinc-500 p-4 font-\['Space_Grotesk'\] text-\[10px\] font-bold uppercase cursor-pointer transition-all hover:text-white">\s*<span class="material-symbols-outlined mb-1" data-icon="inventory_2">inventory_2<\/span>\s*Library\s*<\/div>/,
  `<div class="flex flex-col items-center justify-center text-zinc-500 p-4 font-['Space_Grotesk'] text-[10px] font-bold uppercase cursor-pointer transition-all hover:text-white">
      <span class="material-symbols-outlined mb-1" data-icon="music_note">music_note</span>
      <span id="activeChord">Chord: C</span>
  </div>`
);

// Status Overlay
const statusOverlayHtml = `
<div id="statusOverlay" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm" style="display: none;">
  <div id="statusCard" class="bg-zinc-900/80 border border-white/10 rounded-3xl p-8 max-w-sm w-full text-center shadow-[0_0_50px_rgba(0,240,255,0.2)] flex flex-col items-center">
    <div id="statusSpinner" class="w-12 h-12 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin mb-6 hidden"></div>
    <h3 id="statusTitle" class="text-white font-headline-md text-2xl mb-2">Loading</h3>
    <p id="statusText" class="text-zinc-400 text-sm mb-6">Preparing camera...</p>
    <button id="retryBtn" class="hidden w-full py-3 bg-cyan-400 text-black font-bold uppercase tracking-widest rounded-xl hover:bg-cyan-300 transition-colors">Retry</button>
  </div>
</div>
`;
liveBody += statusOverlayHtml;


const domJsContent = `export function renderAppShell(root) {
  root.innerHTML = \`
    <div id="selectScreen" class="screen w-full min-h-screen">
      \${${JSON.stringify(selectBody)}}
    </div>
    <div id="playScreen" class="screen w-full min-h-screen" style="display: none;">
      \${${JSON.stringify(liveBody)}}
    </div>
  \`;
}

export function getEls() {
  return {
    selectScreen: document.getElementById("selectScreen"),
    playScreen: document.getElementById("playScreen"),
    cards: Array.from(document.querySelectorAll(".instrument-card")),
    video: document.getElementById("video"),
    overlay: document.getElementById("overlay"),
    fps: document.getElementById("fps"),
    muteBtn: document.getElementById("muteBtn"),
    backBtn: document.getElementById("backBtn"),
    instrumentName: document.getElementById("instrumentName"),
    chord: document.getElementById("activeChord"),
    statusOverlay: document.getElementById("statusOverlay"),
    statusTitle: document.getElementById("statusTitle"),
    statusText: document.getElementById("statusText"),
    statusSpinner: document.getElementById("statusSpinner"),
    retryBtn: document.getElementById("retryBtn")
  };
}

export function setStatus(els, { visible, title = "", text = "", spinner = false, retry = false }) {
  if(els.statusOverlay) els.statusOverlay.style.display = visible ? "flex" : "none";
  if(els.statusTitle) els.statusTitle.textContent = title;
  if(els.statusText) els.statusText.textContent = text;
  if(els.statusSpinner) els.statusSpinner.classList.toggle("hidden", !spinner);
  if(els.retryBtn) els.retryBtn.classList.toggle("hidden", !retry);
}
`;

fs.writeFileSync('src/ui/dom.js', domJsContent);
console.log('Successfully built app.html and dom.js');
