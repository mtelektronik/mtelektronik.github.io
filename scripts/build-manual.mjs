import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
const source=await readFile(path.join(root,'docs/fahrtenbuch-instrukcja-prototyp-1.8.0.md'),'utf8');
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tick=String.fromCharCode(96);
function inline(s){
  return esc(s).replace(/(https:\/\/[^\s<>]+)/g,'<a href="$1">$1</a>').replace(new RegExp(tick+'([^'+tick+']+)'+tick,'g'),'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
}
const lines=source.replace(/^\uFEFF/,'').split(/\r?\n/);
const out=[],toc=[];
let i=0,section=0;
while(i<lines.length){
  const line=lines[i].trim();
  if(!line||line==='# Fahrtenbuch'||line==='# Instrukcja obsługi'){i++;continue}
  if(/^---+$/.test(line)){out.push('<hr>');i++;continue}
  const heading=line.match(/^(#{2,3}) (.+)$/);
  if(heading){
    const id='manual-section-'+(++section);
    if(heading[1].length===2)toc.push({id,title:heading[2]});
    out.push('<h'+heading[1].length+' id="'+id+'">'+inline(heading[2])+'</h'+heading[1].length+'>');i++;continue;
  }
  if(line.startsWith('|')&&lines[i+1]?.match(/^\|[\s:|-]+\|$/)){
    const cells=s=>s.trim().slice(1,-1).split('|').map(c=>inline(c.trim()));
    const head=cells(line);
    i+=2;const rows=[];
    while(i<lines.length&&lines[i].trim().startsWith('|')){rows.push(cells(lines[i]));i++}
    out.push('<div class="table-scroll" role="region" tabindex="0" aria-label="Tabela instrukcji"><table><thead><tr>'+head.map(c=>'<th scope="col">'+c+'</th>').join('')+'</tr></thead><tbody>'+rows.map(row=>'<tr>'+row.map(c=>'<td>'+c+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>');continue;
  }
  const ordered=/^\d+\. /.test(line),unordered=/^- /.test(line);
  if(ordered||unordered){
    const type=ordered?'ol':'ul',pattern=ordered?/^\d+\. /:/^- /;
    const items=[];
    while(i<lines.length&&pattern.test(lines[i].trim())){items.push('<li>'+inline(lines[i].trim().replace(pattern,''))+'</li>');i++}
    out.push('<'+type+'>'+items.join('')+'</'+type+'>');continue;
  }
  const paragraph=[line];i++;
  while(i<lines.length&&lines[i].trim()&&!/^(#{1,3} |---+$|\| |- |\d+\. )/.test(lines[i].trim())){paragraph.push(lines[i].trim());i++}
  out.push('<p>'+inline(paragraph.join(' '))+'</p>');
}
const page='<!doctype html>\n<html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Fahrtenbuch — instrukcja obsługi 1.8.0 (prototyp) | MTElektronik</title><meta name="description" content="Prototyp polskiej instrukcji obsługi Fahrtenbuch 1.8.0: pojazdy, tankowania, ładowania, raporty CSV/PDF i kopie zapasowe."><link rel="canonical" href="https://mtelektronik.github.io/fahrtenbuch-instrukcja.html"><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/style.css"></head><body><a class="skip" href="#main">Przejdź do treści</a><header class="header"><div class="wrap nav"><a class="brand" href="index.html"><span class="mark" aria-hidden="true">M</span><span>MTElektronik<span class="brand-caption">PROJEKTY / NOTATKI</span></span></a><nav aria-label="Nawigacja główna"><a href="index.html#blog">Blog</a><a href="index.html#projects">Projekty</a><a href="index.html#contact">Kontakt</a></nav></div></header><main id="main" class="wrap article manual"><header class="article-header"><a class="text-link" href="index.html#projects">← Wróć do projektu</a><p class="eyebrow">FAHRTENBUCH / DOKUMENTACJA PL</p><h1>Fahrtenbuch — instrukcja obsługi</h1><p class="notice">Prototyp instrukcji dla aplikacji Android 1.8.0. Dokument do przeglądu, wydanie polskie.</p><a class="text-link" download href="docs/fahrtenbuch-instrukcja-prototyp-1.8.0.md">Pobierz prototyp instrukcji (Markdown) ↓</a></header><nav class="manual-toc" aria-label="Spis treści"><h2>Spis treści</h2><ol>'+toc.map(t=>'<li><a href="#'+t.id+'">'+esc(t.title.replace(/^\d+\. /,''))+'</a></li>').join('')+'</ol></nav><article class="article-body">'+out.join('\n')+'</article><footer class="article-footer"><a href="index.html#projects">← Wróć do projektu Fahrtenbuch</a><a href="mailto:marcintelektro@gmail.com">Zgłoś uwagę do instrukcji</a></footer></main><footer class="footer"><div class="wrap foot"><span>Marcin Tchorz / MTElektronik</span><div><a href="impressum.html">Impressum</a><a href="privacy.html">Prywatność strony</a><a href="fahrtenbuch-privacy.html">Prywatność Fahrtenbuch</a></div></div></footer></body></html>\n';
await writeFile(path.join(root,'fahrtenbuch-instrukcja.html'),page);
console.log('Built prototype manual: '+toc.length+' chapters.');
