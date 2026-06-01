/* ============================================================
   motion.js — respekt k prefers-reduced-motion
   Vrací true, když si uživatel přeje omezený pohyb. Featury si
   tím gateují JS animace (CSS animace řeší base.css).
   ============================================================ */
export const reduceMotion = () =>
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
