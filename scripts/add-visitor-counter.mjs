import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const output = fileURLToPath(new URL('../dist/', import.meta.url));
const snapshotPath = path.join(output, 'assets/visitor-count.json');
const parseCount = value => {
  const text = String(value ?? '');
  if (!/^[0-9][0-9\s,.]*$/.test(text)) throw new Error('Invalid count');
  const count = Number(text.replace(/[\s,.]/g, ''));
  if (!Number.isSafeInteger(count) || count < 0) throw new Error('Invalid count');
  return count;
};
let snapshot = JSON.parse((await readFile(snapshotPath, 'utf8')).replace(/^\uFEFF/, ''));
if (process.env.REFRESH_VISITOR_COUNT === '1') {
  try {
    // Read a public aggregate at publication time; never register a visit here.
    const response = await fetch('https://mtelektronik.goatcounter.com/counter/TOTAL.json', { signal: AbortSignal.timeout(5000) });
    if (!response.ok) throw new Error('Counter unavailable');
    snapshot = { count: parseCount((await response.json()).count), updatedAt: new Date().toISOString() };
    await writeFile(snapshotPath, JSON.stringify(snapshot) + '\n');
  } catch { console.log('Using the last verified visitor total.'); }
}
const count = parseCount(snapshot.count);
if (!Number.isFinite(Date.parse(snapshot.updatedAt))) throw new Error('Invalid snapshot date');
const labels = {
  pl: ['Odwiedziny:', 'ostatni zapis', 'Ostatni potwierdzony wynik z'],
  de: ['Besuche:', 'letzter Stand', 'Zuletzt bestätigter Stand vom'],
  en: ['Visits:', 'last saved', 'Last confirmed total from'],
};
async function addCounter(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) { await addCounter(file); continue; }
    if (!entry.name.endsWith('.html')) continue;
    let html = await readFile(file, 'utf8');
    if (!html.includes('class="footer"') || html.includes('src="/assets/visitor-counter.js"')) continue;
    const language = html.match(/<html lang="([^"]+)"/)?.[1] || 'pl';
    const [label, saved, title] = labels[language] || labels.pl;
    const date = new Intl.DateTimeFormat(language, { dateStyle: 'medium', timeZone: 'Europe/Berlin' }).format(new Date(snapshot.updatedAt));
    const span = `<span class="visitor-counter" data-snapshot="${snapshot.updatedAt}" title="${title} ${date}">${label} ${new Intl.NumberFormat(language).format(count)} (${saved}: ${date})</span>`;
    // Ordinary HTML keeps the last confirmed count visible with blocked scripts.
    html = html.replace(/(<footer class="footer">[\s\S]*?)(<\/div>\s*<\/footer>)/,
      (_, content, close) => content + span + close);
    await writeFile(file, html.replace('</body>', '<script defer src="/assets/visitor-counter.js"></script></body>'));
  }
}
await addCounter(output);
