/* ============================================================
   features/nav.js — mobilní menu (hamburger)
   Otevře/zavře off-canvas panel s odkazy pod 820px.
   Zavírá se po kliku na odkaz a klávesou Esc.
   ============================================================ */
export function initNav() {
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('[data-nav-burger]');
  if (!nav || !burger) return;

  const set = open => {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  };

  burger.addEventListener('click', () => set(!nav.classList.contains('is-open')));

  nav.querySelectorAll('.nav__links a').forEach(a =>
    a.addEventListener('click', () => set(false))
  );

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') set(false);
  });
}
