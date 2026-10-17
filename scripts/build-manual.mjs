import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
export const manualFile = language => language === 'pl'
  ? 'fahrtenbuch-instrukcja-prototyp-1.8.0.md'
  : 'fahrtenbuch-instrukcja-1.8.0-' + language + '.md';
const labels = {
  pl: {
    title: 'Fahrtenbuch — instrukcja obsługi', description: 'Instrukcja obsługi Fahrtenbuch 1.8.0: pojazdy, tankowania, ładowania, raporty CSV/PDF i kopie zapasowe.',
    skip: 'Przejdź do treści', caption: 'PROJEKTY / NOTATKI', navigation: 'Nawigacja główna', blog: 'Blog', projects: 'Projekty', contact: 'Kontakt',
    back: '← Wróć do projektu', eyebrow: 'FAHRTENBUCH / DOKUMENTACJA PL', notice: 'Instrukcja dla aplikacji Android 1.8.0. Wydanie polskie.',
    download: 'Pobierz instrukcję', toc: 'Spis treści', table: 'Tabela instrukcji', backProject: '← Wróć do projektu Fahrtenbuch', feedback: 'Zgłoś uwagę do instrukcji',
    sitePrivacy: 'Prywatność strony', appPrivacy: 'Prywatność Fahrtenbuch', language: 'Język',
  },
  de: {
    title: 'Fahrtenbuch — Bedienungsanleitung', description: 'Bedienungsanleitung für Fahrtenbuch 1.8.0: Fahrzeuge, Tanken, Laden, CSV-/PDF-Berichte und Datensicherungen.',
    skip: 'Zum Inhalt springen', caption: 'PROJEKTE / NOTIZEN', navigation: 'Hauptnavigation', blog: 'Blog', projects: 'Projekte', contact: 'Kontakt',
    back: '← Zurück zum Projekt', eyebrow: 'FAHRTENBUCH / DOKUMENTATION DE', notice: 'Anleitung für die Android-App 1.8.0. Deutsche Ausgabe.',
    download: 'Anleitung herunterladen', toc: 'Inhaltsverzeichnis', table: 'Tabelle der Anleitung', backProject: '← Zurück zum Projekt Fahrtenbuch', feedback: 'Rückmeldung zur Anleitung',
    sitePrivacy: 'Datenschutz der Website', appPrivacy: 'Datenschutz Fahrtenbuch', language: 'Sprache',
  },
  en: {
    title: 'Fahrtenbuch — user guide', description: 'Fahrtenbuch 1.8.0 user guide: vehicles, refuelling, charging, CSV/PDF reports and backups.',
    skip: 'Skip to content', caption: 'PROJECTS / NOTES', navigation: 'Main navigation', blog: 'Blog', projects: 'Projects', contact: 'Contact',
    back: '← Back to the project', eyebrow: 'FAHRTENBUCH / DOCUMENTATION EN', notice: 'Guide for Android app 1.8.0. English edition.',
    download: 'Download the guide', toc: 'Contents', table: 'Guide table', backProject: '← Back to the Fahrtenbuch project', feedback: 'Send feedback about the guide',
    sitePrivacy: 'Website privacy', appPrivacy: 'Fahrtenbuch privacy', language: 'Language',
  },
};
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tick=String.fromCharCode(96);
function inline(s){
  return esc(s).replace(/(https:\/\/[^\s<>]+)/g,'<a href="$1">$1</a>').replace(new RegExp(tick+'([^'+tick+']+)'+tick,'g'),'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
}
export async function renderManual(language) {
const ui = labels[language];
if (!ui) throw new Error('Unsupported manual language: ' + language);
const source = await readFile(path.join(root, 'docs', manualFile(language)), 'utf8');
const lines=source.replace(/^\uFEFF/,'').split(/\r?\n/);
const out=[],toc=[];
let i=0,section=0;
while(i<lines.length){
  const line=lines[i].trim();
  if(!line||/^# /.test(line)){i++;continue}
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
    out.push('<div class="table-scroll" role="region" tabindex="0" aria-label="'+esc(ui.table)+'"><table><thead><tr>'+head.map(c=>'<th scope="col">'+c+'</th>').join('')+'</tr></thead><tbody>'+rows.map(row=>'<tr>'+row.map(c=>'<td>'+c+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>');continue;
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
if (toc.length !== 15) throw new Error('Expected 15 manual chapters: ' + language);
return `<!doctype html>
<html lang="${language}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(ui.title)} 1.8.0 | MTElektronik</title><meta name="description" content="${esc(ui.description)}"><link rel="canonical" href="https://mtelektronik.github.io/fahrtenbuch-instrukcja.html"><link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/style.css"><script src="assets/site-text.js" defer></script><script src="assets/app.js" defer></script></head><body data-page="manual"><a class="skip" href="#main">${esc(ui.skip)}</a><header class="header"><div class="wrap nav"><a class="brand" href="index.html"><span class="mark" aria-hidden="true">M</span><span>MTElektronik<span class="brand-caption">${esc(ui.caption)}</span></span></a><nav aria-label="${esc(ui.navigation)}"><a href="index.html#blog">${esc(ui.blog)}</a><a href="index.html#projects">${esc(ui.projects)}</a><a href="index.html#contact">${esc(ui.contact)}</a></nav><label class="language"><span class="sr-only">${esc(ui.language)}</span><select id="lang" aria-label="${esc(ui.language)}">${['pl','de','en'].map(lang => '<option value="'+lang+'"'+(lang===language?' selected':'')+'>'+({pl:'Polski',de:'Deutsch',en:'English'}[lang])+'</option>').join('')}</select></label></div></header><main id="main" class="wrap article manual"><header class="article-header"><a class="text-link" href="index.html#projects">${esc(ui.back)}</a><p class="eyebrow">${esc(ui.eyebrow)}</p><h1>${esc(ui.title)}</h1><p class="notice">${esc(ui.notice)}</p><a class="text-link" download href="docs/${manualFile(language)}">${esc(ui.download)}</a></header><nav class="manual-toc" aria-label="${esc(ui.toc)}"><h2>${esc(ui.toc)}</h2><ol>${toc.map(t=>'<li><a href="#'+t.id+'">'+esc(t.title.replace(/^\d+\. /,''))+'</a></li>').join('')}</ol></nav><article class="article-body">${out.join('\n')}</article><footer class="article-footer"><a href="index.html#projects">${esc(ui.backProject)}</a><a href="mailto:marcintelektro@gmail.com">${esc(ui.feedback)}</a></footer></main><footer class="footer"><div class="wrap foot"><span>Marcin Tchorz / MTElektronik</span><div><a href="impressum.html">Impressum</a><a href="privacy.html">${esc(ui.sitePrivacy)}</a><a href="fahrtenbuch-privacy.html">${esc(ui.appPrivacy)}</a></div></div></footer></body></html>
`;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await writeFile(path.join(root,'fahrtenbuch-instrukcja.html'), await renderManual('pl'));
  console.log('Built Polish manual alias: 15 chapters.');
}
