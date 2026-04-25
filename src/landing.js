const canvas = document.getElementById("hero-canvas");
const context = canvas.getContext("2d");
const loadingEl = document.getElementById("loading");
const navbar = document.getElementById("navbar");

const frameCount = 225;
const images = new Array(frameCount);
let lastFrameIndex = 1;

// Helper to get image path
function currentFramePath(index) {
  const paddedIndex = index.toString().padStart(3, '0');
  return `/whiplash/ezgif-frame-${paddedIndex}.jpg`;
}

// 1. Setup Canvas sizing
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  renderFrame(lastFrameIndex); // re-render on resize
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // set initial size

// 2. Render Logic
function renderFrame(index) {
  const img = images[index - 1];
  
  // Clear canvas
  context.fillStyle = '#050505';
  context.fillRect(0, 0, canvas.width, canvas.height);

  if (img && img.complete && img.naturalWidth !== 0) {
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let renderWidth, renderHeight, offsetX, offsetY;
    if (canvasRatio > imgRatio) {
      renderWidth = canvas.width;
      renderHeight = canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - renderHeight) / 2;
    } else {
      renderWidth = canvas.height * imgRatio;
      renderHeight = canvas.height;
      offsetX = (canvas.width - renderWidth) / 2;
      offsetY = 0;
    }
    context.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  } else {
    // If we request a frame that isn't loaded yet, try to load it now
    if (!img && index >= 1 && index <= frameCount) {
        loadImage(index, true); // true = force render when done
    }
  }
  
  lastFrameIndex = index;
}

// 3. Image Loading Logic
function hideLoadingScreen() {
  if (loadingEl && loadingEl.style.display !== 'none') {
    loadingEl.style.opacity = '0';
    setTimeout(() => {
      loadingEl.style.display = 'none';
    }, 500);
  }
}

function loadImage(index, renderWhenDone = false) {
  if (images[index - 1]) return; // Already loading/loaded
  
  const img = new Image();
  img.src = currentFramePath(index);
  images[index - 1] = img; // store immediately so we don't request twice
  
  img.onload = () => {
    // As soon as frame 1 loads, dismiss loading screen and render it
    if (index === 1) {
      hideLoadingScreen();
      if (lastFrameIndex === 1) renderFrame(1);
    }
    
    // If this frame was specifically requested to be rendered
    if (renderWhenDone && lastFrameIndex === index) {
      renderFrame(index);
    }
  };
  
  img.onerror = () => {
    console.error(`Failed to load image: ${img.src}`);
    // If frame 1 fails, we still need to hide loading screen
    if (index === 1) hideLoadingScreen();
  };
}

// Fallback: hide loading screen after 3s no matter what
setTimeout(hideLoadingScreen, 3000);

// Start by ONLY loading the first frame to get pixels on screen fast
loadImage(1);

// Then progressively load the rest in the background
setTimeout(() => {
  for (let i = 2; i <= frameCount; i++) {
    loadImage(i);
  }
}, 500);

// 4. Scroll Logic
const beats = [
  document.getElementById('beat-1'),
  document.getElementById('beat-2'),
  document.getElementById('beat-3'),
  document.getElementById('beat-4'),
  document.getElementById('beat-5')
];

function updateStoryBeats(scrollFraction) {
  beats.forEach(beat => beat.classList.remove('active'));
  
  if (scrollFraction < 0.15) {
    beats[0].classList.add('active');
  } else if (scrollFraction >= 0.15 && scrollFraction < 0.40) {
    beats[1].classList.add('active');
  } else if (scrollFraction >= 0.40 && scrollFraction < 0.65) {
    beats[2].classList.add('active');
  } else if (scrollFraction >= 0.65 && scrollFraction < 0.85) {
    beats[3].classList.add('active');
  } else {
    beats[4].classList.add('active');
  }
  
  if (scrollFraction > 0.05) {
    navbar.classList.add('visible');
  } else {
    navbar.classList.remove('visible');
  }
}

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  // Calculate max scroll from document height
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  let scrollFraction = maxScroll > 0 ? scrollTop / maxScroll : 0;
  
  // Guard against bounds
  if (scrollFraction < 0) scrollFraction = 0;
  if (scrollFraction > 1) scrollFraction = 1;
  
  // Map fraction to 1..225
  let frameIndex = Math.ceil(scrollFraction * frameCount);
  if (frameIndex < 1) frameIndex = 1;
  if (frameIndex > frameCount) frameIndex = frameCount;
  
  requestAnimationFrame(() => {
    renderFrame(frameIndex);
    updateStoryBeats(scrollFraction);
  });
});
