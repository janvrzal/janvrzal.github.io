/* ============================================================
   app.js — vstupní bod. Importuje moduly a spustí je.
   ============================================================ */
import { initToggle, setLang } from './i18n.js';
import { initClock } from './features/ui.js';
import { initNav } from './features/nav.js';
import { initScroll } from './features/scroll.js';

function boot() {
  initToggle();
  initNav();
  initScroll();
  initClock();
  setLang(preferredLang());
}

/* uložená volba; jinak angličtina pro návštěvníky, jejichž prohlížeč nemluví česky/slovensky */
function preferredLang() {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'cz' || saved === 'en') return saved;
  } catch (e) { /* bez úložiště */ }
  const l = (navigator.language || 'cs').toLowerCase();
  return l.startsWith('cs') || l.startsWith('sk') ? 'cz' : 'en';
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
