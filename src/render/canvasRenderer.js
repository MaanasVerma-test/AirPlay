import { roundRectPath } from "../utils/geometry.js";

export function createRenderer(ctx, els) {
  function drawHands(store, toPxFn) {
    const hands = store.resultsHands.multiHandLandmarks || [];
    hands.forEach((lm) => {
      window.drawConnectors(ctx, lm, window.HAND_CONNECTIONS, { color: "#59ddff", lineWidth: 3 });
      window.drawLandmarks(ctx, lm, { color: "#d6fbff", fillColor: "#36d2ff", radius: 3 });
      lm.forEach((p) => {
        const px = toPxFn(p);
        store.particles.push({ x: px.x, y: px.y, vx: (Math.random() - 0.5) * 1.2, vy: (Math.random() - 0.5) * 1.2, life: 1, color: "rgba(124,236,255,0.9)" });
      });
    });
    if (store.particles.length > 900) store.particles.splice(0, store.particles.length - 900);
  }

  function drawPiano(store, now) {
    const threshold = els.overlay.height * 0.76;
    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.22)";
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 6]);
    ctx.beginPath(); ctx.moveTo(0, threshold); ctx.lineTo(els.overlay.width, threshold); ctx.stroke(); ctx.setLineDash([]);
    store.piano.keyRects.forEach((r, i) => {
      const active = now - (store.piano.activeKeys.get(i) || 0) < 140;
      ctx.fillStyle = active ? "rgba(187,125,255,0.6)" : "rgba(255,255,255,0.09)";
      ctx.strokeStyle = active ? "rgba(214,176,255,0.95)" : "rgba(255,255,255,0.25)";
      ctx.lineWidth = active ? 2.2 : 1;
      ctx.fillRect(r.x, r.y, r.w - 1, r.h);
      ctx.strokeRect(r.x, r.y, r.w - 1, r.h);
    });
    ctx.restore();
  }

  function drawGuitar(store) {
    const x = els.overlay.width * 0.1;
    const y = els.overlay.height * 0.34;
    const w = els.overlay.width * 0.8;
    const h = els.overlay.height * 0.26;
    const zoneW = w / 5;
    ctx.save();
    ctx.fillStyle = "rgba(18,34,45,0.35)";
    ctx.strokeStyle = "rgba(130,230,255,0.56)";
    ctx.lineWidth = 2;
    ctx.fillRect(x, y, w, h); ctx.strokeRect(x, y, w, h);
    for (let i = 1; i < 5; i++) { ctx.strokeStyle = "rgba(140,220,245,0.35)"; ctx.beginPath(); ctx.moveTo(x + i * zoneW, y); ctx.lineTo(x + i * zoneW, y + h); ctx.stroke(); }
    for (let s = 0; s < 6; s++) { const sy = y + (h / 7) * (s + 1); ctx.strokeStyle = "rgba(255,255,255,0.16)"; ctx.beginPath(); ctx.moveTo(x, sy); ctx.lineTo(x + w, sy); ctx.stroke(); }
    ctx.fillStyle = "rgba(98,250,255,0.22)";
    ctx.fillRect(x + (store.guitar.currentZone - 1) * zoneW, y, zoneW, h);
    ctx.restore();
  }

  function drawDrums(store, now) {
    store.drums.pads.forEach((pad) => {
      const active = now - pad.lastHit < 150;
      ctx.fillStyle = active ? "rgba(255,180,107,0.5)" : "rgba(255,255,255,0.13)";
      ctx.strokeStyle = active ? "rgba(255,220,160,0.95)" : "rgba(255,255,255,0.4)";
      ctx.lineWidth = active ? 2.6 : 1.3;
      const { x, y, w, h } = pad.rect;
      ctx.beginPath(); roundRectPath(ctx, x, y, w, h, 15); ctx.fill(); ctx.stroke();
      ctx.fillStyle = active ? "#fff2d2" : "#d9e2f4";
      ctx.font = "bold 14px Inter, Segoe UI, sans-serif";
      ctx.fillText(pad.label, x + 10, y + 24);
    });
  }

  function drawParticles(store) {
    for (let i = store.particles.length - 1; i >= 0; i--) {
      const p = store.particles[i];
      p.life -= 0.03; p.x += p.vx; p.y += p.vy; p.vy -= 0.003;
      if (p.life <= 0) { store.particles.splice(i, 1); continue; }
      ctx.fillStyle = p.color.replace("0.9", `${Math.max(0, p.life * 0.7).toFixed(2)}`);
      ctx.beginPath(); ctx.arc(p.x, p.y, 1.8 * p.life, 0, Math.PI * 2); ctx.fill();
    }
  }

  function drawRipples(store) {
    for (let i = store.ripples.length - 1; i >= 0; i--) {
      const r = store.ripples[i];
      r.radius += 2.4; r.life -= 0.04;
      if (r.life <= 0) { store.ripples.splice(i, 1); continue; }
      ctx.strokeStyle = r.color.replace("0.9", `${Math.max(0, r.life).toFixed(2)}`);
      ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2); ctx.stroke();
    }
  }

  return {
    clear() { ctx.clearRect(0, 0, els.overlay.width, els.overlay.height); },
    drawFrame(store, now, toPxFn) {
      if (store.mode === "piano") drawPiano(store, now);
      if (store.mode === "guitar") drawGuitar(store);
      if (store.mode === "drums") drawDrums(store, now);
      drawHands(store, toPxFn);
      drawParticles(store);
      drawRipples(store);
    }
  };
}
