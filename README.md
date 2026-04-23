# Air Instrument App (Vite)

Webcam-based Air Keyboard, Air Guitar, and Air Drums built with vanilla JavaScript, MediaPipe, and Web Audio.

## Requirements

- Node.js 18+ recommended
- Webcam-enabled browser

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, then allow camera permission.

## Production Build

```bash
npm run build
npm run preview
```

Build output is generated in `dist/`.

## Deploy (Static Hosting)

- Upload `dist/` to Netlify, Vercel static, GitHub Pages, or any static host.
- `vite.config.js` uses `base: "./"` so assets resolve in subpaths by default.

## Project Structure

- `src/main.js`: app orchestration/state flow
- `src/tracking/`: MediaPipe camera/hands/pose lifecycle
- `src/audio/`: Web Audio engine, soundfonts, drum samples
- `src/gestures/`: piano/guitar/drum gesture detectors
- `src/render/`: canvas overlays, particles, ripples, skeleton rendering
- `src/styles/`: app styling
