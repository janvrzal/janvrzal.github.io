/* ============================================================
   features/ui.js — drobné featury:
   hero rotátor, pražské hodiny, marquee, reveal-on-scroll
   ============================================================ */
import { CONTENT } from '../content.js';
import { getLang, onLang } from '../i18n.js';
import { reduceMotion } from '../motion.js';

/* --- hero: rotující slovo --- */
export function initHero() {
  const el = document.querySelector('[data-hero-swap]');
  if (!el) return;
  let i = 0;
  const set = () => { el.textContent = CONTENT.heroRotate[getLang()][i % CONTENT.heroRotate[getLang()].length]; };
  set();
  onLang(set);
  if (reduceMotion()) return; // bez rotace – jen první slovo
  setInterval(() => {
    el.classList.add('is-out');
    setTimeout(() => { i++; set(); el.classList.remove('is-out'); }, 230);
  }, 2200);
}

/* --- pražské hodiny --- */
export function initClock() {
  const el = document.querySelector('[data-clock]');
  if (!el) return;
  const tick = () => {
    try {
      el.textContent = new Date().toLocaleTimeString('cs-CZ', { timeZone: 'Europe/Prague', hour12: false });
    } catch (e) { /* timezone API nedostupné */ }
  };
  tick();
  setInterval(tick, 1000);
}

/* --- nekonečná marquee --- */
export function initMarquee() {
  const track = document.querySelector('[data-marquee]');
  if (!track) return;
  const render = () => {
    track.innerHTML = '';
    const words = CONTENT.marquee[getLang()];
    const unit = () => words.map((w, idx) => {
      const s = document.createElement('span');
      s.textContent = w + ' ✦';
      if (idx % 2) s.className = 'is-outline';
      return s;
    });
    [...unit(), ...unit()].forEach(s => track.appendChild(s));
  };
  render();
  onLang(render);
}

/* --- reveal on scroll --- */
export function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .16 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}
