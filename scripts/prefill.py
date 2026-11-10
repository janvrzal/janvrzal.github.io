"""Předvyplní český text do HTML z atributů data-cz.

Proč: texty přepíná JS (js/i18n.js). Když se JS nenačte (file://, blokovaný
skript, vyhledávač), musí být čeština v HTML přímo. Po úpravě data-cz spusť:

    python3 scripts/prefill.py

Přepíše obsah každého elementu s data-cz jeho hodnotou (u data-html jako HTML).
Element s data-cz proto nesmí obsahovat vnořený element stejného typu.
"""
import html, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
PAT = re.compile(r'<(\w+)((?:\s+[\w-]+(?:="[^"]*")?)*\s+data-cz="([^"]*)"(?:\s+[\w-]+(?:="[^"]*")?)*)\s*>(.*?)</\1>', re.S)

def fill(m):
    tag, attrs, cz = m.group(1), m.group(2), m.group(3)
    inner = cz if re.search(r'\sdata-html\b', attrs) else html.escape(html.unescape(cz), quote=False)
    return f'<{tag}{attrs}>{inner}</{tag}>'

for page in [ROOT / 'index.html', *ROOT.glob('*/index.html')]:
    src = page.read_text()
    out = PAT.sub(fill, src)
    if out != src:
        page.write_text(out)
    print(page.relative_to(ROOT))
