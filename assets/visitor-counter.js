// Public GoatCounter site URL only; never put passwords or API tokens here.
const counterSite = 'https://mtelektronik.goatcounter.com';

(async () => {
  if (!/^https:\/\/[a-z0-9][a-z0-9-]*\.goatcounter\.com$/.test(counterSite)) return;
  if (location.hostname !== 'mtelektronik.github.io') return;
  if (navigator.webdriver || navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true) return;
  if (new URLSearchParams(location.search).has('lang')) return;
  const footer = document.querySelector('.footer .foot');
  if (!footer) return;
  const labels = {
    pl: ['Odwiedziny:', 'Łącznie od uruchomienia licznika. Wynik aktualizuje się z opóźnieniem.'],
    de: ['Besuche:', 'Gesamtzahl seit Aktivierung des Zählers. Aktualisierung erfolgt verzögert.'],
    en: ['Visits:', 'Total since the counter was enabled. Updates are delayed.'],
  };
  const language = document.documentElement.lang;
  const [label, explanation] = labels[language] || labels.pl;
  const options = () => ({ credentials: 'omit', referrerPolicy: 'no-referrer', signal: AbortSignal.timeout(5000) });
  try {
    // Fixed path only: no page URL, query, referrer, dimensions or identifier.
    await fetch(counterSite + '/count?p=%2F&t=MTElektronik&r=&rnd=' + Date.now(), { ...options(), mode: 'no-cors', cache: 'no-store' });
  } catch {
    // A blocked registration must not prevent reading the public aggregate.
  }
  try {
    const response = await fetch(counterSite + '/counter/TOTAL.json', { ...options(), mode: 'cors' });
    if (!response.ok) return;
    const result = await response.json();
    const value = String(result.count ?? '');
    if (!/^[0-9][0-9\s,.]*$/.test(value)) return;
    const number = Number(value.replace(/[\s,.]/g, ''));
    if (!Number.isSafeInteger(number) || number < 0) return;
    const existing = document.querySelector('.visitor-counter');
    const counter = existing || document.createElement('span');
    counter.className = 'visitor-counter';
    counter.title = explanation;
    counter.textContent = label + ' ' + new Intl.NumberFormat(language || 'pl').format(number);
    if (existing) counter.removeAttribute('data-snapshot');
    else footer.append(counter);
  } catch {
    // Keep the last confirmed total already present in the HTML.
  }
})();
