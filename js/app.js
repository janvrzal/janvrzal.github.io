/* ============================================================
   app.js — vstupní bod. Importuje moduly a spustí je.
   Přidání featury = 1 import + 1 init() volání zde.
   ============================================================ */
import { initToggle, setLang } from './i18n.js';
import { initHero, initClock, initMarquee, initReveal } from './features/ui.js';
import { initMcda } from './features/mcda.js';
import { initPipeline } from './features/pipeline.js';
import { initCarousel } from './features/carousel.js';
import { initDice } from './features/dice.js';
import { initFitTitle } from './features/fit-title.js';
import { initNav } from './features/nav.js';
import { initScroll } from './features/scroll.js';

function boot() {
  initToggle();
  initNav();
  initScroll();
  initHero();
  initClock();
  initMarquee();
  initReveal();
  initMcda();
  initPipeline();
  initCarousel();
  initDice();
  initFitTitle();
  initSoon();
  setLang('cz'); // počáteční jazyk + první notifikace widgetům
  hello();
}

/* [soon] odkazy zatím nikam nevedou — ať neskáčou na začátek stránky */
function initSoon() {
  document.querySelectorAll('a[href="#"]').forEach(a => {
    if (!a.querySelector('.cta__soon, .soon')) return;
    a.setAttribute('aria-disabled', 'true');
    a.addEventListener('click', e => e.preventDefault());
  });
}

/* malý vzkaz pro zvědavé, co otevřou konzoli */
function hello() {
  const amber = 'color:#f6a700;font-weight:bold';
  const mute = 'color:#857e70';
  console.log('%cVRZAL', 'color:#f6a700;font-family:monospace;font-weight:bold;font-size:34px');
  console.log('%cKoukáš pod kapotu? Dobře. Tohle je ruční práce — žádný framework, žádný build step.', mute);
  console.log('%c→ Hledám stáž: data / AI / automation.%c  github.com/janvrzal', amber, mute);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
