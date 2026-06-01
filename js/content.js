/* ============================================================
   content.js — DATOVÁ VRSTVA
   Tady edituješ obsah widgetů. Strukturální/SEO copy sekcí
   zůstává v index.html (atributy data-cz / data-en).
   ============================================================ */
export const CONTENT = {

  /* rotující slovo v hero: "Stavím ___" */
  heroRotate: {
    cz: ['software.', 'data pipelines.', 'AI nástroje.', 'celé světy.', 'příběhy u stolu.'],
    en: ['software.', 'data pipelines.', 'AI tools.', 'entire worlds.', 'stories at the table.'],
  },

  /* nekonečná marquee v patičce */
  marquee: {
    cz: ['OPEN TO WORK', 'POJĎME TVOŘIT', 'DATA', 'AI', 'AUTOMATION', 'WORLDBUILDING'],
    en: ['OPEN TO WORK', 'LET\u2019S BUILD', 'DATA', 'AI', 'AUTOMATION', 'WORLDBUILDING'],
  },

  /* MCDA ranking widget (Výzkum)
     skóre = [Přesnost, Rychlost, Robustnost] na škále 0–100
     Pozn.: ilustrativní čísla; nahraď reálnými benchmark daty z thesis. */
  mcda: {
    solvers: [
      { n: 'UTA-NM',    s: [92, 58, 74] },
      { n: 'UTASTAR',   s: [80, 82, 70] },
      { n: 'TOPSIS',    s: [74, 95, 62] },
      { n: 'PROMETHEE', s: [81, 72, 90] },
      { n: 'Ghaderi',   s: [68, 70, 96] },
    ],
  },

  /* carousel říší (Arthea) — popisky jsou placeholdery, klidně přepiš */
  realms: [
    { n: 'HYKARIE',   tag: { cz: 'ŘÍŠE',      en: 'EMPIRE' },     cz: 'Říše oceli a chladného rozumu.',   en: 'An empire of steel and cold reason.' },
    { n: 'DYREKIE',   tag: { cz: 'TEOKRACIE', en: 'THEOCRACY' },  cz: 'Kde se víra mísí s krví.',          en: 'Where faith mingles with blood.' },
    { n: 'ARHESIA',   tag: { cz: 'AKADEMIE',  en: 'ACADEMY' },    cz: 'Učenci, archivy, tisíc tajemství.', en: 'Scholars, archives, a thousand secrets.' },
    { n: 'VORTHÉSIE', tag: { cz: 'KLANY',     en: 'CLANS' },      cz: 'Hory, klany, nezlomená hrdost.',    en: 'Mountains, clans, unbroken pride.' },
    { n: 'KAMIÉRIE',  tag: { cz: 'OBCHOD',    en: 'TRADE' },      cz: 'Obchod, intriky a zlaté smlouvy.',  en: 'Trade, intrigue and golden contracts.' },
    { n: 'RHAVDINI',  tag: { cz: 'KOČOVNÍCI', en: 'NOMADS' },     cz: 'Kočovníci pouští a hvězd.',         en: 'Nomads of deserts and stars.' },
    { n: 'EXORIA',    tag: { cz: 'NEZNÁMO',   en: 'THE UNKNOWN' },cz: 'To, co leží za hranicí mapy.',      en: 'What lies beyond the edge of the map.' },
  ],

  /* popisky stages v data pipeline (Práce) */
  pipelineStages: [
    { x: .08, cz: 'RAW',       en: 'RAW' },
    { x: .30, cz: 'INGEST',    en: 'INGEST' },
    { x: .52, cz: 'VALIDACE',  en: 'VALIDATE' },
    { x: .74, cz: 'TRANSFORM', en: 'TRANSFORM' },
    { x: .93, cz: 'SOLVER',    en: 'SOLVER' },
  ],

  /* hlášky kostky (Stůl) */
  dice: {
    prompt:  { cz: 'HODÍ SE PRO INICIATIVU — KLIKNI NA KOSTKU', en: 'ROLL FOR INITIATIVE — CLICK THE DIE' },
    nat20:   { cz: '✦ NAT 20 — kritický úspěch!', en: '✦ NAT 20 — critical hit!' },
    nat1:    { cz: '// nat 1… to bolelo', en: '// nat 1… that hurt' },
    rolled:  { cz: 'hodil jsi ', en: 'you rolled ' },
  },
};
