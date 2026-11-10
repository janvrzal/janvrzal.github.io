# Jan Vrzal — osobní web (rozcestník)

Statický web bez build stepu. Vanilla HTML + CSS + ES moduly.
Žádné závislosti, žádný framework → nic nezestárne a nerozbije se při `npm install`.

## Spuštění

ES moduly potřebují HTTP server (přes `file://` je prohlížeč nenačte).
Cokoli z níže uvedeného stačí:

```bash
# Python
python3 -m http.server 8000

# nebo Node
npx serve .
```

Pak otevři `http://localhost:8000`.

**Deploy:** je to čistě statické — nahraj složku na GitHub Pages, Netlify, Vercel
nebo jakýkoli statický hosting. Žádná konfigurace není potřeba.

## Struktura

```
├── index.html          # rozcestník: úvod, výběr práce, jak pracuju, zkušenosti
├── esd/index.html      # případová studie Panelreko ESD
├── cee/index.html      # případová studie Conlang Evolution Engine
├── arthea/index.html   # worldbuilding a stůl
├── scripts/prefill.py  # předvyplní češtinu z data-cz do HTML (spusť po úpravě textů)
├── css/
│   ├── tokens.css      # barvy, fonty, škála
│   ├── base.css        # reset, typografie, 12sloupcová mřížka (.wrap)
│   ├── layout.css      # nav, úvod, záhlaví podstránky, bloky, patička
│   ├── components.css  # dlaždice projektů, tabulky, čísla, seznamy
│   └── features.css    # schémata: stavy zakázky, deník, tok práce, kód, derivace
└── js/
    ├── i18n.js         # přepínání CZ/EN 
    ├── app.js          # vstupní bod, výchozí jazyk podle prohlížeče
    └── features/       # nav (mobilní menu), scroll (scroll-spy), ui (hodiny)
```

## Texty a jazyky

Každý text má `data-cz` a `data-en`; JS přepíná jazyk a pamatuje si volbu napříč stránkami.
Čeština je navíc přímo v HTML, aby stránka fungovala i bez JS (`file://`, vyhledávače).
Po úpravě `data-cz` spusť `python3 scripts/prefill.py`.

Hlavička a patička jsou na každé stránce zkopírované. Při změně menu uprav všechny čtyři soubory.

## Vzhled

Švýcarská mřížka: bílá plocha, 12 sloupců, silné černé linky mezi bloky, písmo Archivo
a IBM Plex Mono pro data. Jediný akcent je oranžová `--c-accent` (plochy, čtverečky);
pro oranžový text na bílé se používá tmavší `--c-accent-text`.

## Zásady obsahu

- Práci popisuju poctivě: navrhl, rozhodl, řídil, uvedl do provozu. Ne „naprogramoval“.
- Žádná jména zákazníků, adresy, interní URL ani screenshoty s reálnými daty.
- Čísla z repa ukazují rozsah systému, ne autorství kódu.
