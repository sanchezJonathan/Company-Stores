// Mirrors https://omg.engineering/bsites_services/themes/ into ../themes as Markdown.
// Usage (from this folder): npm install, then node mirror-theme-docs.js
const fs = require('fs');
const path = require('path');
const { parse } = require('node-html-parser');
const TurndownService = require('turndown');
const { gfm } = require('turndown-plugin-gfm');

const BASE = 'https://omg.engineering/bsites_services/';
const ROOT = 'https://omg.engineering/bsites_services/themes/';
const OUT = path.join(__dirname, '..', 'themes');
const today = new Date().toISOString().slice(0, 10);

let locs; // page locations, read from the site's search index at startup
const hasChildren = l => locs.some(o => o !== l && o.startsWith(l));
// "themes/pages/emails/" -> "pages/emails/index.md"; leaf "themes/forms/fields/" -> "forms/fields.md"
function localFile(loc) {
  const rel = loc.replace(/^themes\//, '').replace(/\/$/, '');
  if (rel === '') return 'index.md';
  return hasChildren(loc) ? rel + '/index.md' : rel + '.md';
}

const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-' });
td.use(gfm);
td.addRule('fencedLang', {
  filter: n => n.nodeName === 'PRE' && n.querySelector('code'),
  replacement: (_, n) => {
    const wrap = n.closest('div[class*="language-"]') || n.querySelector('code');
    const m = wrap && (wrap.getAttribute('class') || '').match(/language-(\w+)/);
    const code = n.querySelector('code').textContent.replace(/\n$/, '');
    return '\n\n```' + (m ? m[1] : '') + '\n' + code + '\n```\n\n';
  },
});

(async () => {
  const index = await (await fetch(BASE + 'search/search_index.json')).json();
  locs = [...new Set(index.docs.map(d => d.location.split('#')[0]).filter(l => l.startsWith('themes/')))];
  const fileFor = Object.fromEntries(locs.map(l => [BASE + l, localFile(l)]));
  for (const loc of locs) {
    const url = BASE + loc;
    const html = await (await fetch(url)).text();
    const article = parse(html).querySelector('article');
    article.querySelectorAll('a.headerlink, .md-source-file, .md-content__button').forEach(e => e.remove());
    const file = localFile(loc);
    for (const a of article.querySelectorAll('a[href]')) {
      const abs = new URL(a.getAttribute('href'), url);
      const hash = abs.hash; abs.hash = '';
      const target = fileFor[abs.href];
      if (target) {
        let rel = path.posix.relative(path.posix.dirname(file), target);
        a.setAttribute('href', (rel === path.posix.basename(file) && hash ? '' : rel) + hash);
      } else if (!abs.href.startsWith(ROOT) || !hash) {
        a.setAttribute('href', abs.href + hash);
      }
    }
    const md = td.turndown(article.innerHTML).replace(/\n{3,}/g, '\n\n').trim();
    const header = `<!-- Source: ${url} (mirrored ${today}). Do not edit; re-run the mirror script to refresh. -->\n\n`;
    const dest = path.join(OUT, file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, header + md + '\n');
    console.log(file);
  }
})();
