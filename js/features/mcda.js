/* ============================================================
   features/mcda.js — interaktivní MCDA ranking (Výzkum)
   Slidery vah → živé přeřazení solverů (FLIP animace pořadí).
   ============================================================ */
import { CONTENT } from '../content.js';

export function initMcda() {
  const ranksEl = document.querySelector('[data-mcda-ranks]');
  if (!ranksEl) return;
  const sliders = [...document.querySelectorAll('[data-mcda-weight]')];
  const pcts = [...document.querySelectorAll('[data-mcda-pct]')];
  const solvers = CONTENT.mcda.solvers;

  // postav řádky jednou
  solvers.forEach((s, i) => {
    const row = document.createElement('div');
    row.className = 'rk';
    row.dataset.i = i;
    row.innerHTML =
      '<span class="rk__pos"></span>' +
      '<span class="rk__nm">' + s.n + '</span>' +
      '<span class="rk__barwrap"><span class="rk__bar"></span></span>' +
      '<span class="rk__sc"></span>';
    ranksEl.appendChild(row);
  });

  function compute(animate) {
    const w = sliders.map(x => +x.value);
    const sum = w.reduce((a, b) => a + b, 0) || 1;
    const nw = w.map(x => x / sum);
    pcts.forEach((p, i) => p.textContent = Math.round(nw[i] * 100) + '%');

    const scored = solvers
      .map((s, i) => ({ i, sc: s.s.reduce((a, v, k) => a + v * nw[k], 0) }))
      .sort((a, b) => b.sc - a.sc);
    const max = Math.max(...scored.map(x => x.sc));
    const rows = [...ranksEl.children];

    // FLIP: zaznamenej staré pozice
    const first = {};
    rows.forEach(r => first[r.dataset.i] = r.getBoundingClientRect().top);

    scored.forEach((o, rank) => {
      const row = rows.find(r => +r.dataset.i === o.i);
      row.querySelector('.rk__pos').textContent = '#' + (rank + 1);
      row.querySelector('.rk__sc').textContent = o.sc.toFixed(0);
      row.querySelector('.rk__bar').style.width = (o.sc / max * 100) + '%';
      row.classList.toggle('is-lead', rank === 0);
      ranksEl.appendChild(row); // reorder DOM
    });

    if (animate !== false) {
      [...ranksEl.children].forEach(r => {
        const d = first[r.dataset.i] - r.getBoundingClientRect().top;
        if (d) {
          r.style.transition = 'none';
          r.style.transform = 'translateY(' + d + 'px)';
          requestAnimationFrame(() => {
            r.style.transition = 'transform .5s cubic-bezier(.2,.7,.2,1)';
            r.style.transform = '';
          });
        }
      });
    }
  }

  sliders.forEach(s => s.addEventListener('input', () => compute(true)));
  compute(false);
}
