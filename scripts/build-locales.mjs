import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
import { renderManual, manualFile } from './build-manual.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
const origin = 'https://mtelektronik.github.io';
const languages = ['pl', 'de', 'en'];
const pages = {
  'index.html': 'homePageTitle',
  'impressum.html': 'impressumTitle',
  'privacy.html': 'privacyTitle',
  'fahrtenbuch-privacy.html': 'appPageTitle',
  'fahrtenbuch-instrukcja.html': 'manualPageTitle',
};
const context = vm.createContext({});
vm.runInContext(await readFile(path.join(root, 'assets/site-text.js'), 'utf8'), context);
const translations = context.mtSiteText;
const escape = value => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const languagePath = (language, file) => '/' + language + '/' + (file === 'index.html' ? '' : file);

function localize(source, file, language) {
  const text = translations[language];
  let html = source.replace(/<html lang="[^"]+"/, '<html lang="' + language + '"');
  html = html.replace(/<([a-z][\w:-]*)(\s[^>]*\bdata-i18n="([^"]+)"[^>]*)>[\s\S]*?<\/\1>/gi, (_, tag, attributes, key) => {
    if (typeof text[key] !== 'string') throw new Error('Missing translation: ' + language + '/' + key);
    return '<' + tag + attributes + '>' + escape(text[key]) + '</' + tag + '>';
  });
  html = html.replace(/<[^>]+\bdata-i18n-aria="([^"]+)"[^>]*>/g, (tag, key) => {
    if (typeof text[key] !== 'string') throw new Error('Missing aria translation: ' + key);
    return tag.replace(/aria-label="[^"]*"/, 'aria-label="' + escape(text[key]) + '"');
  });
  html = html.replace(/<option\b([^>]*?)\sselected(?:="[^"]*")?([^>]*)>/g, '<option$1$2>');
  html = html.replace('<option value="' + language + '">', '<option value="' + language + '" selected>');
  html = html.replace(/<title>[\s\S]*?<\/title>/, '<title>' + escape(text[pages[file]]) + '</title>');
  if (file === 'index.html') {
    html = html.replace(/(<meta name="description" content=")[^"]*(">)/, '$1' + escape(text.homeMeta) + '$2');
    html = html.replace(/(<meta property="og:description" content=")[^"]*(">)/, '$1' + escape(text.homeMeta) + '$2');
    html = html.replace(/(<meta property="og:title" content=")[^"]*(">)/, '$1' + escape(text[pages[file]]) + '$2');
    html = html.replace(/(<meta property="og:url" content=")[^"]*(">)/, '$1' + origin + languagePath(language, file) + '$2');
  }
  html = html.replace(/\b(href|src)="([^"]+)"/g, (attribute, name, value) => {
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(value)) return attribute;
    const url = new URL(value, origin + '/' + file);
    const target = url.pathname === '/' ? 'index.html' : url.pathname.slice(1);
    const pathname = target === 'docs/' + manualFile('pl')
      ? '/docs/' + manualFile(language)
      : Object.hasOwn(pages, target) ? languagePath(language, target) : url.pathname;
    return name + '="' + pathname + url.search + url.hash + '"';
  });
  const canonical = origin + languagePath(language, file);
  html = html.replace(/<link rel="canonical" href="[^"]+">/, '<link rel="canonical" href="' + canonical + '">');
  const alternates = languages.map(lang => '<link rel="alternate" hreflang="' + lang + '" href="' + origin + languagePath(lang, file) + '">').join('');
  return html.replace('</head>', alternates + '<link rel="alternate" hreflang="x-default" href="' + origin + languagePath('pl', file) + '"></head>');
}

for (const file of Object.keys(pages)) {
  const source = await readFile(path.join(output, file), 'utf8');
  for (const language of languages) {
    await mkdir(path.join(output, language), { recursive: true });
    const content = file === 'fahrtenbuch-instrukcja.html' ? await renderManual(language) : source;
    await writeFile(path.join(output, language, file), localize(content, file, language));
  }
  // Preserve old links as Polish aliases pointing to the new canonical URLs.
  await writeFile(path.join(output, file), localize(source, file, 'pl'));
}
const sitemapPath = path.join(output, 'sitemap.xml');
let sitemap = await readFile(sitemapPath, 'utf8');
const oldUrls = new Set(Object.keys(pages).map(file => origin + '/' + (file === 'index.html' ? '' : file)));
sitemap = sitemap.replace(/<url><loc>([^<]+)<\/loc><\/url>/g, (entry, url) => oldUrls.has(url) ? '' : entry);
const entries = languages.flatMap(language => Object.keys(pages).map(file => '<url><loc>' + origin + languagePath(language, file) + '</loc></url>')).join('');
await writeFile(sitemapPath, sitemap.replace('</urlset>', entries + '</urlset>'));
console.log('Built '+(Object.keys(pages).length * languages.length)+' localized HTML pages with canonical URLs and reciprocal hreflang.');
