/* ============================================================
   features/ui.js — pražské hodiny v patičce
   ============================================================ */
/* --- pražský čas v patičce (HH:MM) --- */
export function initClock() {
  const el = document.querySelector('[data-clock]');
  if (!el) return;
  const tick = () => {
    try {
      el.textContent = new Date().toLocaleTimeString('cs-CZ', {
        timeZone: 'Europe/Prague', hour: '2-digit', minute: '2-digit', hour12: false,
      });
    } catch (e) { /* timezone API nedostupné */ }
  };
  tick();
  setInterval(tick, 15000);
}
