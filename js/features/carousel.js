/* ============================================================
   features/carousel.js — carousel říší (Arthea)
   Data-driven z CONTENT.realms; auto-advance, šipky, tečky.
   ============================================================ */
import { CONTENT } from '../content.js';
import { getLang, onLang } from '../i18n.js';

export function initCarousel() {
  const root = document.querySelector('[data-carousel]');
  if (!root) return;
  const track = root.querySelector('[data-caro-track]');
  const dots = root.querySelector('[data-caro-dots]');
  const realms = CONTENT.realms;
  let idx = 0, timer = null;

  function render() {
    const lang = getLang();
    track.innerHTML = '';
    dots.innerHTML = '';
    realms.forEach((r, i) => {
      const slide = document.createElement('div');
      slide.className = 'caro__slide';
      slide.innerHTML =
        '<div class="caro__tag">' + r.tag[lang] + '</div>' +
        '<div class="caro__name">' + r.n + '</div>' +
        '<div class="caro__flavor">' + r[lang] + '</div>';
      track.appendChild(slide);
      const dot = document.createElement('i');
      dot.addEventListener('click', () => go(i));
      dots.appendChild(dot);
    });
    update();
  }

  function update() {
    track.style.transform = 'translateX(-' + (idx * 100) + '%)';
    [...dots.children].forEach((d, i) => d.classList.toggle('is-active', i === idx));
  }

  function go(i) { idx = (i + realms.length) % realms.length; update(); reset(); }
  function reset() { clearInterval(timer); timer = setInterval(() => go(idx + 1), 4200); }

  root.querySelector('[data-caro-prev]').addEventListener('click', () => go(idx - 1));
  root.querySelector('[data-caro-next]').addEventListener('click', () => go(idx + 1));
  root.addEventListener('mouseenter', () => clearInterval(timer));
  root.addEventListener('mouseleave', reset);

  render();
  reset();
  onLang(render); // přepnutí jazyka překreslí texty (index zůstává)
}
