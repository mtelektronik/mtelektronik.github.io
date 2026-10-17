const translations = globalThis.mtSiteText;
function setLanguage(lang){
  if(!translations[lang])lang='pl';
  const text=translations[lang];
  document.documentElement.lang=lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{const value=text[el.dataset.i18n];if(value!==undefined)el.textContent=value});
  document.querySelectorAll('[data-i18n-aria]').forEach(el=>{const value=text[el.dataset.i18nAria];if(value!==undefined)el.setAttribute('aria-label',value)});
  const select=document.getElementById('lang');if(select)select.value=lang;
  const page=document.body.dataset.page;
  const key={home:'homePageTitle',impressum:'impressumTitle',sitePrivacy:'privacyTitle',appPrivacy:'appPageTitle'}[page];
  if(text[key])document.title=text[key];
  const title=document.querySelector('meta[property="og:title"]');if(title)title.content=document.title;
  if(page==='home'){
    for(const selector of ['meta[name="description"]','meta[property="og:description"]']){
      const meta=document.querySelector(selector);if(meta)meta.content=text.homeMeta;
    }
  }
}
function languageUrl(lang){
  const url=new URL(location.href);
  const page=url.pathname.replace(/^\/(pl|de|en)(?=\/|$)/,'');
  url.pathname='/'+lang+'/'+(page===''||page==='/'||page==='/index.html'?'':page.replace(/^\//,''));
  url.searchParams.delete('lang');
  return url;
}
// The URL owns the language: a saved preference must not change indexed HTML.
const currentPath=new URL(location.href).pathname;
const initial=currentPath.match(/^\/(pl|de|en)(?:\/|$)/)?.[1]||'pl';
setLanguage(initial);
// Keep old shared links such as /?lang=de working at the new address.
const queryLanguage=new URLSearchParams(location.search).get('lang');
if(Object.hasOwn(translations,queryLanguage))location.replace(languageUrl(queryLanguage).href);
document.getElementById('lang')?.addEventListener('change',e=>{
  if(Object.hasOwn(translations,e.target.value)){
    location.assign(languageUrl(e.target.value).href);
  }
});
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
