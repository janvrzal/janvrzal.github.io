/* ============================================================
   features/fit-title.js — obří nadpisy sekcí na míru šířce
   Bleed nadpisy mají font-size v jednotkách vw, takže delší
   slova (RESEARCH, VÝZKUM) přetékala doprava. Tady je po
   vykreslení změříme a případně zmenšíme, aby se vždy vešly.
   Spouští se při loadu, resize a změně jazyka (CZ/EN).
   ============================================================ */
import { onLang } from '../i18n.js';

function fit() {
  document.querySelectorAll('.section__title span').forEach(span => {
    const parent = span.parentElement;
    span.style.fontSize = '';                 // reset na CSS hodnotu (vw)
    const avail = parent.clientWidth;
    const w = span.scrollWidth;
    if (w > avail) {
      const cur = parseFloat(getComputedStyle(span).fontSize);
      span.style.fontSize = (cur * avail / w) + 'px';
    }
  });
}

export function initFitTitle() {
  // počkej na webfont, ať měříme správnou šířku
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fit);
  }
  fit();
  onLang(fit);

  let raf;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(fit);
  });
}
