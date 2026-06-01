/* ============================================================
   features/scroll.js — chování při scrollu:
   • scroll-bar:  průběh načtené stránky (amber proužek nahoře)
   • nav.is-scrolled: jemné sklo na navbaru po opuštění hero
   • scroll-spy:  zvýraznění odkazu na sekci, ve které právě jsi
   ============================================================ */
export function initScroll() {
  const bar = document.querySelector('[data-scroll-bar]');
  const nav = document.querySelector('.nav');

  function onScroll() {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const p = max > 0 ? (h.scrollTop / max) * 100 : 0;
    if (bar) bar.style.width = p + '%';
    if (nav) nav.classList.toggle('is-scrolled', h.scrollTop > 24);
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { onScroll(); ticking = false; });
  }, { passive: true });
  onScroll();

  // scroll-spy: napoj odkazy navigace na jejich sekce
  const links = [...document.querySelectorAll('.nav__links a[href^="#"]')]
    .map(a => ({ a, el: document.querySelector(a.getAttribute('href')) }))
    .filter(x => x.el);

  if (!links.length || !('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const hit = links.find(x => x.el === e.target);
      if (!hit) return;
      links.forEach(x => {
        const on = x === hit;
        x.a.classList.toggle('is-current', on);
        if (on) x.a.setAttribute('aria-current', 'true');
        else x.a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  links.forEach(x => io.observe(x.el));
}
