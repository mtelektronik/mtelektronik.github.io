import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, writeFile, rm, access } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

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
