export function createTracker(video, handlers) {
  let hands = null;
  let pose = null;
  let camera = null;
  let readyRef = { current: false };
  let modeRef = { current: null };

  async function initModels() {
    if (!hands) {
      hands = new window.Hands({ locateFile: (f) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}` });
      hands.setOptions({ maxNumHands: 2, modelComplexity: 1, minDetectionConfidence: 0.7, minTrackingConfidence: 0.5 });
      hands.onResults(handlers.onHands);
    }
    if (!pose) {
      pose = new window.Pose({ locateFile: (f) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${f}` });
      pose.setOptions({ modelComplexity: 1, smoothLandmarks: true, minDetectionConfidence: 0.5, minTrackingConfidence: 0.5 });
      pose.onResults(handlers.onPose);
    }
  }

  async function start() {
    if (camera) camera.stop();
    camera = new window.Camera(video, {
      onFrame: async () => {
        if (!readyRef.current) return;
        await hands.send({ image: video });
        if (modeRef.current === "drums") await pose.send({ image: video });
      },
      width: 1280,
      height: 720
    });
    await camera.start();
  }

  function stop() {
    if (camera && camera.video && camera.video.srcObject) camera.video.srcObject.getTracks().forEach((t) => t.stop());
    if (camera) camera.stop();
  }

  return {
    initModels,
    start,
    stop,
    setReady: (v) => { readyRef.current = v; },
    setMode: (m) => { modeRef.current = m; }
  };
}
