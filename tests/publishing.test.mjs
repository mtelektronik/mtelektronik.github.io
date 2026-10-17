import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, writeFile, rm, access } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

const root = fileURLToPath(new URL('../', import.meta.url));
const scratch = path.join(root, '.test-work');
async function fixture(t) {
  await mkdir(scratch, { recursive: true });
  const directory = await mkdtemp(path.join(scratch, 'publishing-'));
  t.after(async () => {
    assert.ok(directory.startsWith(scratch + path.sep));
    await rm(directory, { recursive: true, force: true });
  });
  for (const source of ['scripts', 'assets', 'templates', 'posts', 'docs', 'index.html', 'impressum.html', 'privacy.html', 'fahrtenbuch-privacy.html', 'robots.txt', '.nojekyll']) {
    await cp(path.join(root, source), path.join(directory, source), { recursive: true });
  }
  return directory;
}
const post = [
  '---', 'slug: automatyczny-test', 'date: 2026-10-17',
  'title: Test & wpis', 'description: Sprawdzenie publikacji.', 'category: Test',
  '---', '', '## Nowy wpis', '', 'Treść dodana wyłącznie jako Markdown.',
].join('\n');
function build(directory) {
  execFileSync(process.execPath, [path.join(directory, 'scripts/build-site.mjs')], { stdio: 'pipe' });
}

test('Markdown addition and deletion update the complete deployment artifact', async t => {
  const directory = await fixture(t);
  const source = path.join(directory, 'posts/automatyczny-test.md');
  await writeFile(source, post);
  build(directory);
  for (const file of ['index.html', 'feed.xml', 'sitemap.xml', 'blog/automatyczny-test.html']) {
    assert.match(await readFile(path.join(directory, 'dist', file), 'utf8'), /automatyczny-test/);
  }
  assert.match(await readFile(path.join(directory, 'dist/blog/automatyczny-test.html'), 'utf8'), /Test &amp; wpis/);
  await access(path.join(directory, 'dist/fahrtenbuch-instrukcja.html'));
  await access(path.join(directory, 'dist/assets/style.css'));
  await access(path.join(directory, 'dist/docs/fahrtenbuch-instrukcja-prototyp-1.8.0.md'));
  for (const file of ['scripts', 'posts', 'templates', '.github', '.git', 'tests']) {
    await assert.rejects(access(path.join(directory, 'dist', file)), { code: 'ENOENT' });
  }
  await rm(source);
  build(directory);
  await assert.rejects(access(path.join(directory, 'dist/blog/automatyczny-test.html')), { code: 'ENOENT' });
  for (const file of ['index.html', 'feed.xml', 'sitemap.xml']) {
    assert.doesNotMatch(await readFile(path.join(directory, 'dist', file), 'utf8'), /automatyczny-test/);
  }
});

test('invalid Markdown metadata fails the build and preserves the previous artifact', async t => {
  const directory = await fixture(t);
  build(directory);
  const previous = await readFile(path.join(directory, 'dist/index.html'), 'utf8');
  await writeFile(path.join(directory, 'posts/broken.md'), post.replace('slug: automatyczny-test\n', ''));
  assert.throws(() => build(directory));
  assert.equal(await readFile(path.join(directory, 'dist/index.html'), 'utf8'), previous);
});

test('all language URLs contain existing translations, canonical and reciprocal hreflang without JavaScript', async t => {
  const directory = await fixture(t);
  build(directory);
  const origin = 'https://mtelektronik.github.io';
  const languages = ['pl', 'de', 'en'];
  const pages = ['index.html', 'impressum.html', 'privacy.html', 'fahrtenbuch-privacy.html', 'fahrtenbuch-instrukcja.html'];
  const context = vm.createContext({});
  vm.runInContext(await readFile(path.join(directory, 'assets/site-text.js'), 'utf8'), context);
  const escape = s => s.replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  for (const language of languages) {
    for (const file of pages) {
      const html = await readFile(path.join(directory, 'dist', language, file), 'utf8');
      const pathname = '/' + language + '/' + (file === 'index.html' ? '' : file);
      assert.ok(html.includes('<html lang="' + language + '"'));
      assert.ok(html.includes('<link rel="canonical" href="' + origin + pathname + '">'));
      for (const alternate of languages) {
        assert.ok(html.includes('<link rel="alternate" hreflang="' + alternate + '" href="' + origin + '/' + alternate + '/' + (file === 'index.html' ? '' : file) + '">'));
      }
      assert.ok(html.includes('hreflang="x-default" href="' + origin + '/pl/' + (file === 'index.html' ? '' : file) + '"'));
      assert.ok(html.includes('<option value="' + language + '" selected>'));
      for (const [, tag, , key, content] of html.matchAll(/<([a-z][\w:-]*)(\s[^>]*\bdata-i18n="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/gi)) {
        assert.equal(content, escape(context.mtSiteText[language][key]), language + '/' + file + ': ' + key + ' (' + tag + ')');
      }
      const sitemap = await readFile(path.join(directory, 'dist/sitemap.xml'), 'utf8');
      assert.ok(sitemap.includes('<loc>' + origin + pathname + '</loc>'));
    }
  }
  // Every link/resource in the deployed HTML resolves inside the artifact.
  async function checkLinks(folder) {
    const { readdir } = await import('node:fs/promises');
    for (const entry of await readdir(folder, { withFileTypes: true })) {
      const file = path.join(folder, entry.name);
      if (entry.isDirectory()) { await checkLinks(file); continue; }
      if (!entry.name.endsWith('.html')) continue;
      const html = await readFile(file, 'utf8');
      const relative = path.relative(path.join(directory, 'dist'), file).split(path.sep).join('/');
      for (const [, link] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
        const url = new URL(link, origin + '/' + relative);
        if (url.origin !== origin) continue;
        const target = url.pathname + (url.pathname.endsWith('/') ? 'index.html' : '');
        const targetFile = path.join(directory, 'dist', target.slice(1));
        await access(targetFile);
        if (url.hash && target.endsWith('.html')) assert.ok((await readFile(targetFile, 'utf8')).includes('id="' + decodeURIComponent(url.hash.slice(1)) + '"'), relative + ': ' + link);
      }
    }
  }
  await checkLinks(path.join(directory, 'dist'));
  assert.equal(await readFile(path.join(directory, 'dist/assets/style.css'), 'utf8'), await readFile(path.join(root, 'assets/style.css'), 'utf8'));
  const article = await readFile(path.join(directory, 'dist/blog/nowy-rozdzial.html'), 'utf8');
  assert.doesNotMatch(article, /hreflang="(?:de|en)"/);
});

test('manual reading and downloading use the selected language and retain all 15 chapters', async t => {
  const directory = await fixture(t);
  build(directory);
  const editions = {
    pl: { file: 'fahrtenbuch-instrukcja-prototyp-1.8.0.md', download: 'Pobierz instrukcję', first: 'Szybki start', last: 'Informacje o aplikacji', backup: 'Nie łączy dwóch historii.' },
    de: { file: 'fahrtenbuch-instrukcja-1.8.0-de.md', download: 'Anleitung herunterladen', first: 'Schnellstart', last: 'App-Informationen', backup: 'Zwei Historien werden nicht zusammengeführt.' },
    en: { file: 'fahrtenbuch-instrukcja-1.8.0-en.md', download: 'Download the guide', first: 'Quick start', last: 'App information', backup: 'It does not merge two histories.' },
  };
  for (const [language, edition] of Object.entries(editions)) {
    const home = await readFile(path.join(directory, 'dist', language, 'index.html'), 'utf8');
    const manual = await readFile(path.join(directory, 'dist', language, 'fahrtenbuch-instrukcja.html'), 'utf8');
    const markdown = await readFile(path.join(directory, 'dist/docs', edition.file), 'utf8');
    assert.ok(home.includes('href="/' + language + '/fahrtenbuch-instrukcja.html"'));
    for (const html of [home, manual]) {
      assert.ok(html.includes('href="/docs/' + edition.file + '"'));
      assert.ok(html.includes('>' + edition.download + '</a>'));
      const instructionContent = html === home ? html.match(/<aside class="manual-callout"[\s\S]*?<\/aside>/)[0] : html;
      assert.doesNotMatch(instructionContent.replace(/\b(?:href|src)="[^"]*"/g, ''), /prototyp|prototype|Entwurf|\(PL\)/i);
    }
    assert.equal([...markdown.matchAll(/^## \d+\. /gm)].length, 15);
    assert.equal([...manual.matchAll(/<h2 id="manual-section-/g)].length, 15);
    for (const content of [markdown, manual]) {
      assert.ok(content.includes(edition.first));
      assert.ok(content.includes(edition.last));
      assert.ok(content.includes(edition.backup));
      assert.ok(content.includes('10 MiB'));
      assert.ok(content.includes('kWh/100 km'));
    }
    assert.equal(markdown, await readFile(path.join(directory, 'docs', edition.file), 'utf8'));
  }
  const alias = await readFile(path.join(directory, 'dist/fahrtenbuch-instrukcja.html'), 'utf8');
  assert.ok(alias.includes('href="https://mtelektronik.github.io/pl/fahrtenbuch-instrukcja.html"'));
});

test('URL language overrides browser and saved preferences; switching and legacy links preserve page and fragment', async () => {
  const runtime = await readFile(path.join(root, 'assets/app.js'), 'utf8');
  const texts = await readFile(path.join(root, 'assets/site-text.js'), 'utf8');
  function run(href) {
    const url = new URL(href);
    const result = { selected: null, assigned: null, replaced: null, change: null };
    const context = vm.createContext({ URL, URLSearchParams,
      location: { href, search: url.search, replace(value) { result.replaced = value; }, assign(value) { result.assigned = value; } },
      navigator: { language: 'en-US' },
      localStorage: { getItem() { throw new Error('Must not override the URL'); }, setItem() {} },
      document: { documentElement: {}, body: { dataset: { page: 'sitePrivacy' } }, querySelectorAll() { return []; }, querySelector() { return null; },
        getElementById(id) { return id === 'lang' ? { set value(v) { result.selected = v; }, addEventListener(_, fn) { result.change = fn; } } : null; } },
    });
    vm.runInContext(texts, context);
    vm.runInContext(runtime, context);
    return result;
  }
  const german = run('https://mtelektronik.github.io/de/privacy.html?ref=mail#main');
  assert.equal(german.selected, 'de');
  assert.equal(german.replaced, null);
  german.change({ target: { value: 'en' } });
  assert.equal(german.assigned, 'https://mtelektronik.github.io/en/privacy.html?ref=mail#main');
  const manual = run('https://mtelektronik.github.io/de/fahrtenbuch-instrukcja.html#manual-section-7');
  manual.change({ target: { value: 'en' } });
  assert.equal(manual.assigned, 'https://mtelektronik.github.io/en/fahrtenbuch-instrukcja.html#manual-section-7');
  assert.equal(run('https://mtelektronik.github.io/?lang=de#projects').replaced, 'https://mtelektronik.github.io/de/#projects');
  assert.equal(run('https://mtelektronik.github.io/privacy.html?lang=en').replaced, 'https://mtelektronik.github.io/en/privacy.html');
  assert.equal(run('https://mtelektronik.github.io/pl/?lang=constructor').replaced, null);
  assert.equal(run('https://mtelektronik.github.io/').selected, 'pl');
});
