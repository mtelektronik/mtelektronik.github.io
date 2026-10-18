import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const output = fileURLToPath(new URL('../dist/', import.meta.url));
async function addCounter(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) { await addCounter(file); continue; }
    if (!entry.name.endsWith('.html')) continue;
    const html = await readFile(file, 'utf8');
    if (!html.includes('class="footer"') || html.includes('src="/assets/visitor-counter.js"')) continue;
    await writeFile(file, html.replace('</body>', '<script defer src="/assets/visitor-counter.js"></script></body>'));
  }
}
await addCounter(output);
