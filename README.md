# AIRPLAY — Music Without Boundaries 🎸🎹🥁

[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-00BFFF?style=for-the-badge&logo=google&logoColor=white)](https://mediapipe.dev/)

**Airplay** is a cinematic, AI-powered virtual instrument experience that transforms your physical motion into digital sound. Using advanced computer vision and neural hand tracking, Airplay allows you to perform music in thin air—no hardware, no wires, just pure expression.

---

## ✨ Key Features

- **Neural Hand Engine v4.0**: High-precision hand-to-MIDI translation with 21 key-point mapping.
- **Low Latency Performance**: Optimized for real-time interaction with sub-millisecond gesture detection.
- **Multi-Instrument Support**:
  - **Air Keyboard**: Dynamic polyphonic piano with spatial octave mapping.
  - **Air Guitar**: Strumming-based guitar with vertical chord selection.
  - **Air Drums**: Velocity-sensitive percussion pads triggered by striking gestures.
- **Immersive Visuals**: Real-time particle systems, ripples, and cinematic scrollytelling.
- **Professional Integration**: Built-in support for Web Audio API and extensible for MIDI output.

---

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5 Canvas
- **Styling**: Tailwind CSS & Vanilla CSS (Glassmorphism, Neon Aesthetics)
- **Tracking**: Google MediaPipe (Hands & Pose models)
- **Audio**: Web Audio API with custom sample loading and synthesis
- **Build Tool**: Vite 7.0+

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0 or higher
- **Webcam**: A standard 720p+ webcam is recommended
- **Browser**: Chrome, Edge, or any modern browser with Camera API support

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MaanasVerma-test/AirPlay.git
   cd AirPlay
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Launch the development server**:
   ```bash
   npm run dev
   ```

4. **Access the App**:
   Open `http://localhost:5173` in your browser and grant camera permissions when prompted.

---

## 🎹 How to Play

### 🎹 Air Piano
- **Setup**: Position your hands in the tracking zone.
- **Trigger**: Tap your fingers downward as if striking physical keys.
- **Control**: Move your hands horizontally to shift between different octaves.

### 🎸 Air Guitar
- **Strumming**: Use your right hand to perform up/down strumming motions.
- **Chords**: Hold your left hand steady. Move it vertically to select different chords on the virtual fretboard.
- **Intensity**: Faster strumming results in higher velocity and brighter tone.

### 🥁 Air Drums
- **Basics**: Strike downward with open palms over the virtual drum pads.
- **Velocity**: The speed of your strike determines the volume and intensity of the drum hit.
- **Mapping**: Position your hands over specific zones to trigger Kick, Snare, Hi-Hat, or Toms.

---

## 📂 Project Structure

```text
├── src/
│   ├── audio/           # Web Audio engine & sound libraries
│   ├── gestures/        # AI gesture detection logic (Piano/Guitar/Drums)
│   ├── instruments/     # Layout & UI mapping for instruments
│   ├── render/          # Canvas rendering, particles, & visuals
│   ├── tracking/        # MediaPipe lifecycle management
│   ├── styles/          # Global styles & design tokens
│   └── main.js          # App orchestration & state management
├── public/              # Static assets (images, samples)
├── index.html           # Cinematic Landing Page
├── app.html             # The Interactive Experience
└── features.html        # Features & Specifications
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🤝 Credits

Developed by **Maanas Verma**. Built with 🤍 using **Stitch Design System** and **MediaPipe**.

---

<p align="center">
  © 2025 AIRPLAY VIRTUAL. BEYOND PHYSICAL LIMITS.
</p>
