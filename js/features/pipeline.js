/* ============================================================
   features/pipeline.js — animovaná datová pipeline (Práce)
   Pakety tečou stages; u validační brány nevalidní odpadají.
   Běží jen když je canvas ve viewportu.
   ============================================================ */
import { CONTENT } from '../content.js';
import { getLang } from '../i18n.js';

export function initPipeline() {
  const cv = document.querySelector('[data-pipeline]');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const ST = CONTENT.pipelineStages;
  let W, H, active = false, packets = [], spawnT = 0;

  const size = () => { W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight; };
  const spawn = () => packets.push({
    x: ST[0].x, valid: Math.random() > 0.24, rej: false,
    fy: 0, vy: 0, a: 1, sp: .0015 + Math.random() * .0012,
  });

  function draw() {
    if (!active) { requestAnimationFrame(draw); return; }
    ctx.clearRect(0, 0, W, H);
    const y = H * 0.46;

    // connector
    ctx.strokeStyle = 'rgba(239,233,221,.14)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(ST[0].x * W, y); ctx.lineTo(ST[ST.length - 1].x * W, y); ctx.stroke();

    // stages
    ctx.font = '10px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    ST.forEach((s, i) => {
      const sx = s.x * W, gate = i === 2;
      ctx.strokeStyle = gate ? 'rgba(246,167,0,.55)' : 'rgba(239,233,221,.3)';
      ctx.beginPath(); ctx.moveTo(sx, y - (gate ? 18 : 13)); ctx.lineTo(sx, y + (gate ? 18 : 13)); ctx.stroke();
      ctx.fillStyle = gate ? '#f6a700' : '#857e70';
      ctx.fillText(getLang() === 'cz' ? s.cz : s.en, sx, y - 26);
    });

    // packets
    spawnT++; if (spawnT > 24) { spawnT = 0; spawn(); }
    packets.forEach(p => {
      if (!p.rej) {
        p.x += p.sp;
        if (!p.valid && p.x >= ST[2].x) { p.rej = true; p.vy = .8 + Math.random() * 0.7; }
      } else {
        p.x += p.sp * .25; p.fy += p.vy; p.vy += .06; p.a -= .018;
      }
      const px = p.x * W, py = y + p.fy;
      ctx.fillStyle = p.rej ? 'rgba(229,72,77,' + Math.max(0, p.a).toFixed(2) + ')' : '#f6a700';
      ctx.fillRect(px - 3, py - 3, 6, 6);
    });
    packets = packets.filter(p => p.x < 1.03 && p.a > 0 && p.fy < H);

    requestAnimationFrame(draw);
  }

  new IntersectionObserver(es => es.forEach(e => { active = e.isIntersecting; if (active) size(); }), { threshold: .15 }).observe(cv);
  window.addEventListener('resize', () => { if (active) size(); });
  size();
  draw();
}
