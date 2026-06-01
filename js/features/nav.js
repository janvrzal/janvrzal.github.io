/* ============================================================
   features/nav.js — mobilní menu (hamburger)
   Otevře/zavře off-canvas panel s odkazy pod 820px.
   Zavírá se po kliku na odkaz a klávesou Esc.
   ============================================================ */
export function initNav() {
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('[data-nav-burger]');
  if (!nav || !burger) return;

  const links = [...nav.querySelectorAll('.nav__links a')];

  const set = open => {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
    // přesuň focus do menu / zpět na hamburger
    if (open) links[0]?.focus();
    else if (document.activeElement && nav.contains(document.activeElement)) burger.focus();
  };

  burger.addEventListener('click', () => set(!nav.classList.contains('is-open')));

  // jednoduchá smyčka focusu uvnitř otevřeného menu (Tab cyklí mezi odkazy)
  nav.addEventListener('keydown', e => {
    if (e.key !== 'Tab' || !nav.classList.contains('is-open') || !links.length) return;
    const first = links[0], last = links[links.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  nav.querySelectorAll('.nav__links a').forEach(a =>
    a.addEventListener('click', () => set(false))
  );

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') set(false);
  });
}
