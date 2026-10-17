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
  try{localStorage.setItem('mt-language',lang)}catch(e){}
}
let initial='pl';
try{initial=localStorage.getItem('mt-language')||((navigator.language||'pl').slice(0,2))}catch(e){}
const queryLanguage=new URLSearchParams(location.search).get('lang');if(translations[queryLanguage])initial=queryLanguage;
if(!translations[initial])initial='en';
setLanguage(initial);
document.getElementById('lang')?.addEventListener('change',e=>{
  setLanguage(e.target.value);
  const url=new URL(location.href);url.searchParams.set('lang',e.target.value);
  history.replaceState(null,'',url);
});
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
