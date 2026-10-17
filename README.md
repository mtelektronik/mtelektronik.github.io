# MTElektronik — strona osobista i blog

Statyczna strona Marcina Tchorza, publikowana przez GitHub Pages z gałęzi main (katalog główny). Pliki HTML są gotowe do udostępnienia; strona nie wymaga serwera aplikacji ani instalacji npm.

## Dodawanie wpisu

1. Dodaj plik Markdown w katalogu posts/. Skopiuj nagłówek istniejącego wpisu:
   - slug: unikalny adres, małe litery bez polskich znaków, cyfry i myślniki;
   - date: data publikacji YYYY-MM-DD;
   - title: tytuł;
   - description: krótkie streszczenie;
   - category: kategoria.
2. Pod nagłówkiem pisz treść. Obsługiwane są akapity, nagłówki ## i ### oraz linki Markdown z adresem https://, / lub kotwicą #.
3. Uruchom z katalogu repozytorium: node scripts/build-blog.mjs (Node.js 18 lub nowszy).
4. Dodaj plik źródłowy i wygenerowane zmiany do commita i wyślij do main.

Generator aktualizuje blog/*.html, listę wpisów na stronie głównej, feed.xml i sitemap.xml. Po usunięciu wpisu usuń także jego wygenerowany plik blog/*.html przed publikacją. Nie edytuj ręcznie fragmentu pomiędzy znacznikami BLOG w index.html. Szablon wpisu znajduje się w templates/post.html.

## Języki i wygląd

Interfejs: PL/DE/EN. Wpisy blogowe: język polski, jawnie opisany również w pozostałych wersjach interfejsu. Tłumaczenia: assets/site-text.js oraz assets/app.js. Wybór języka jest zapisywany lokalnie; link z ?lang=pl, ?lang=de lub ?lang=en ma pierwszeństwo. Jasny i ciemny motyw zależą od ustawienia systemu. Brak analityki, reklam i zewnętrznych fontów.

## Dane autora

Marcin Tchorz / MTElektronik
Publiczny e-mail: marcintelektro@gmail.com
GitHub: https://github.com/mtelektronik

## Pozostałe uzupełnienia

- Adres do doręczeń w impressum.html: autor uzupełni później. Dokument jest oznaczony jako nieukończony.
- Polityki prywatności wymagają ukończenia i weryfikacji zgodnie z faktyczną konfiguracją hostingu oraz finalnej aplikacji (w szczególności kopie zapasowe, eksport, biblioteki).
- Po publikacji Fahrtenbuch dodaj prawdziwy link Google Play i zaktualizuj status we wszystkich językach.
- Opcjonalnie dodaj prawdziwą ikonę aplikacji. Dostarczone przez autora zrzuty ekranu są w assets/fahrtenbuch/ i w galerii projektu; podgląd raportu PDF jest obrazem, a nie plikiem PDF do pobrania.

## Pliki

- index.html — wizytówka, lista wpisów i projekty.
- posts/ — źródła wpisów Markdown.
- scripts/build-blog.mjs — generator bez zależności npm.
- templates/post.html — szablon artykułu.
- assets/ — CSS, tłumaczenia, favicon i grafika udostępniania.
- feed.xml, sitemap.xml, robots.txt — RSS i informacje dla robotów.
- impressum.html, privacy.html, fahrtenbuch-privacy.html — dokumenty informacyjne w trakcie uzupełniania.
