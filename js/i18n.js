/* ============================================================
   i18n.js — jazyk (CZ/EN), přepínání, notifikace widgetům
   Statický text: elementy s atributy data-cz / data-en.
   Dynamické widgety: zaregistruj se přes onLang(fn).
   ============================================================ */
let lang = 'cz';
const listeners = [];

export function getLang() { return lang; }

/** Zaregistruj callback, který se zavolá při změně jazyka. */
export function onLang(fn) { listeners.push(fn); }

/** Přepíše veškerý statický text dle data-atributů. */
export function applyStatic() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-cz]').forEach(el => {
    const v = el.getAttribute('data-' + lang);
    if (v != null) el.textContent = v;
  });
}

/** Nastaví jazyk, přepíše text, aktualizuje přepínač a notifikuje widgety. */
export function setLang(next) {
  lang = next;
  applyStatic();
  document.querySelectorAll('[data-lang-btn]').forEach(b => {
    b.classList.toggle('is-active', b.dataset.langBtn === lang);
  });
  listeners.forEach(fn => fn(lang));
}

/** Napojí tlačítka přepínače (elementy s [data-lang-btn]). */
export function initToggle() {
  document.querySelectorAll('[data-lang-btn]').forEach(b => {
    b.addEventListener('click', () => setLang(b.dataset.langBtn));
  });
}
