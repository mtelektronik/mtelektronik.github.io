import { readFile, writeFile, mkdir, readdir, unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const origin = 'https://mtelektronik.github.io';
const escape = value => value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function inline(text) {
  return escape(text).replace(/\[([^\]]+)\]\(([^\s)]+)\)/g, (_, label, url) => {
    if (!/^(https:\/\/|\/(?!\/)|#[\w-])/.test(url)) throw new Error('Unsupported link: ' + url);
    return `<a href="${url}">${label}</a>`;
  });
}
function markdown(text) {
  return text.trim().split(/\r?\n\s*\r?\n/).map(block => {
    const heading = block.match(/^(#{2,3}) (.+)$/);
    if (heading) return `<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`;
    return `<p>${inline(block.replace(/\r?\n/g, ' '))}</p>`;
  }).join('\n');
}
const posts = [];
for (const file of await readdir(path.join(root, 'posts'))) {
  if (!file.endsWith('.md')) continue;
  const source = await readFile(path.join(root, 'posts', file), 'utf8');
  const match = source.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error('Missing front matter: ' + file);
  const metadata = Object.fromEntries(match[1].split(/\r?\n/).map(line => {
    const split = line.indexOf(':');
    if (split < 1) throw new Error('Invalid metadata: ' + file);
    return [line.slice(0, split).trim(), line.slice(split + 1).trim()];
  }));
  for (const key of ['slug','date','title','description','category']) if (!metadata[key]) throw new Error('Missing ' + key);
  if (!/^[a-z0-9-]+$/.test(metadata.slug)) throw new Error('Invalid slug');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(metadata.date) || !Number.isFinite(Date.parse(metadata.date))) throw new Error('Invalid date');
  posts.push({...metadata, body: markdown(match[2])});
}
posts.sort((a,b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
if (new Set(posts.map(p=>p.slug)).size !== posts.length) throw new Error('Duplicate slug');
const shell = await readFile(path.join(root, 'templates', 'post.html'), 'utf8');
await mkdir(path.join(root, 'blog'), {recursive:true});
// A deleted or renamed Markdown source must not leave a published article behind.
const generatedNames = new Set(posts.map(post => post.slug + '.html'));
for (const file of await readdir(path.join(root, 'blog'))) {
  if (file.endsWith('.html') && !generatedNames.has(file)) {
    await unlink(path.join(root, 'blog', file));
  }
}
for (const post of posts) {
  const replacements = {TITLE:escape(post.title), DESCRIPTION:escape(post.description), DATE:post.date, CATEGORY:escape(post.category), BODY:post.body, URL:`${origin}/blog/${post.slug}.html`};
  const page = shell.replace(/\{\{(TITLE|DESCRIPTION|DATE|CATEGORY|BODY|URL)\}\}/g, (_, key) => replacements[key]);
  await writeFile(path.join(root, 'blog', post.slug + '.html'), page);
}
const rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>MTElektronik — blog</title><link>${origin}/</link><description>Projekty, aplikacje i notatki autora.</description><language>pl</language><atom:link href="${origin}/feed.xml" rel="self" type="application/rss+xml"/>${posts.map(p=>`<item><title>${escape(p.title)}</title><link>${origin}/blog/${p.slug}.html</link><guid isPermaLink="true">${origin}/blog/${p.slug}.html</guid><pubDate>${new Date(p.date+'T12:00:00+02:00').toUTCString()}</pubDate><description>${escape(p.description)}</description></item>`).join('')}</channel></rss>\n`;
await writeFile(path.join(root,'feed.xml'),rss);
const urls = ['/', '/impressum.html','/privacy.html','/fahrtenbuch-privacy.html', '/fahrtenbuch-instrukcja.html', ...posts.map(p=>`/blog/${p.slug}.html`)];
await writeFile(path.join(root,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url=>`<url><loc>${origin}${url}</loc></url>`).join('')}</urlset>\n`);
console.log(`Built ${posts.length} post(s), RSS and sitemap.`);
