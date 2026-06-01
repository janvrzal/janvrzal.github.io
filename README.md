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
jan-vrzal-site/
├── index.html          # markup + i18n/widget hooky (data-* atributy)
├── css/
│   ├── tokens.css      # 🎨 design tokeny — barvy, fonty, škála, motion
│   ├── base.css        # reset, body, .wrap, .reveal, a11y
│   ├── layout.css      # nav, hero, kostra sekcí, footer
│   ├── components.css  # opakovatelné prvky (cta, facts, lang, marquee…)
│   └── features.css    # styly interaktivních widgetů
└── js/
    ├── content.js      # 📝 OBSAH widgetů (texty, data) — edituj tady
    ├── i18n.js         # jazyk CZ/EN + pub-sub pro widgety
    ├── app.js          # vstupní bod (importuje a spouští moduly)
    └── features/
        ├── ui.js       # hero rotátor, hodiny, marquee, reveal
        ├── mcda.js     # interaktivní MCDA ranking
        ├── pipeline.js # canvas animace datové pipeline
        ├── carousel.js # carousel říší Arthey
        └── dice.js     # klikací d20
```

## Kde co měnit

| Chci změnit… | Soubor |
|---|---|
| Barvu, font, velikost písma, spacing | `css/tokens.css` |
| Texty widgetů (role v hero, marquee, říše, hlášky kostky) | `js/content.js` |
| Čísla MCDA solverů | `js/content.js` → `mcda.solvers` |
| Texty sekcí (lead, facts, popisky) | `index.html` (atributy `data-cz` / `data-en`) |
| Odkazy v patičce | `index.html` (sekce `.contact`) |
| Chování widgetu | příslušný modul v `js/features/` |

## Dvojjazyčnost (CZ / EN)

- **Statický text:** element dostane `data-cz="…"` a `data-en="…"`. `i18n.js` ho přepne.
- **Dynamický widget:** zaregistruje se přes `onLang(fn)` a při přepnutí se překreslí.

## Přidání nové sekce / featury

1. Sekci přidej do `index.html` (zkopíruj blok `<section class="section">…`).
2. Pokud má interaktivní prvek: nový modul `js/features/mojefeature.js`
   s exportovaným `initMojeFeature()`.
3. V `app.js` přidej import a zavolej `initMojeFeature()` v `boot()`.

To je vše — žádný registr, žádná konfigurace.

## TODO / placeholdery

- `honza@vrzal.cz`, GitHub a LinkedIn jsou reálné; **Threads** odkaz je `[?]`.
- CTA tlačítka vedou na `#` — napoj, až vzniknou samostatné subsity.
- MCDA čísla jsou ilustrativní — nahraď reálnými benchmark daty.
- Popisky říší v Artheji jsou placeholdery.
