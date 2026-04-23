export function renderAppShell(root) {
  root.innerHTML = `
    <div id="selectScreen" class="screen">
      <div class="title">
        <h1>Air Instrument</h1>
        <p>Play with your hands in the air using only your webcam.</p>
      </div>
      <div class="cards">
        <div class="instrument-card" data-mode="piano" style="--accent: var(--purple);">
          <div class="instrument-icon">🎹</div><div><h3>Air Keyboard</h3><p>Dip fingertips across virtual keys from C3 to B4 and perform piano phrases in mid-air.</p></div>
        </div>
        <div class="instrument-card" data-mode="guitar" style="--accent: var(--cyan);">
          <div class="instrument-icon">🎸</div><div><h3>Air Guitar</h3><p>Choose chords with your left hand and strum with your right hand for natural guitar rhythm.</p></div>
        </div>
        <div class="instrument-card" data-mode="drums" style="--accent: var(--orange);">
          <div class="instrument-icon">🥁</div><div><h3>Air Drums</h3><p>Snap wrist hits into floating drum pads and build beats with velocity-sensitive dynamics.</p></div>
        </div>
      </div>
      <div class="hint">Desktop recommended (1024px+) for best tracking and pad spacing.</div>
    </div>
    <div id="playScreen" class="screen">
      <div id="videoContainer">
        <video id="video" playsinline></video>
        <canvas id="overlay"></canvas>
      </div>
      <div id="topBar">
        <button id="backBtn">Back</button>
        <div id="instrumentName">Air Instrument</div>
        <div class="top-right"><div id="fps">FPS: --</div><button id="muteBtn">Mute</button></div>
      </div>
      <div id="activeChord">Chord: C</div>
      <div id="statusOverlay">
        <div id="statusCard">
          <div id="statusSpinner" class="spinner hidden"></div>
          <div id="statusTitle">Loading</div>
          <div id="statusText">Preparing camera...</div>
          <button id="retryBtn" class="hidden">Retry</button>
        </div>
      </div>
    </div>
  `;
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
  els.statusOverlay.style.display = visible ? "flex" : "none";
  els.statusTitle.textContent = title;
  els.statusText.textContent = text;
  els.statusSpinner.classList.toggle("hidden", !spinner);
  els.retryBtn.classList.toggle("hidden", !retry);
}
