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
  setLang('cz'); // počáteční jazyk + první notifikace widgetům
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
