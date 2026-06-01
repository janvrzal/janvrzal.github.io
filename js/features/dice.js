/* ============================================================
   features/dice.js — klikací d20 (Stůl)
   ============================================================ */
import { CONTENT } from '../content.js';
import { getLang } from '../i18n.js';

export function initDice() {
  const die = document.querySelector('[data-die]');
  const out = document.querySelector('[data-die-out]');
  if (!die || !out) return;
  let rolling = false;

  die.addEventListener('click', () => {
    if (rolling) return;
    rolling = true;
    out.textContent = '';
    out.classList.remove('is-crit');
    die.classList.remove('is-rolling');
    void die.offsetWidth;           // reflow → restart animace
    die.classList.add('is-rolling');

    let n = 0;
    const spin = setInterval(() => {
      die.textContent = 1 + Math.floor(Math.random() * 20);
      if (++n > 10) clearInterval(spin);
    }, 55);

    setTimeout(() => {
      const v = 1 + Math.floor(Math.random() * 20);
      const lang = getLang();
      die.textContent = v;
      rolling = false;
      if (v === 20) { out.textContent = CONTENT.dice.nat20[lang]; out.classList.add('is-crit'); }
      else if (v === 1) { out.textContent = CONTENT.dice.nat1[lang]; }
      else { out.textContent = CONTENT.dice.rolled[lang] + v; }
    }, 720);
  });
}
