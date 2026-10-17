import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
const destination = path.join(root, 'dist');

// Fail before packaging or deploying if either source document is invalid.
for (const script of ['build-blog.mjs', 'build-manual.mjs']) {
  execFileSync(process.execPath, [path.join(root, 'scripts', script)], { stdio: 'inherit' });
}

// Only this fixed build directory is disposable. Never copy repository metadata.
await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });
for (const entry of await readdir(root, { withFileTypes: true })) {
  if (entry.isFile() && (entry.name.endsWith('.html') || ['feed.xml', 'sitemap.xml', 'robots.txt', '.nojekyll', 'CNAME'].includes(entry.name))) {
    await cp(path.join(root, entry.name), path.join(destination, entry.name));
  }
}
for (const directory of ['assets', 'blog', 'docs']) {
  await cp(path.join(root, directory), path.join(destination, directory), { recursive: true });
}
console.log('Website ready in dist/.');
