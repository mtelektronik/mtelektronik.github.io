# MTElektronik — strona osobista i blog

Statyczna strona Marcina Tchorza. GitHub Actions automatycznie generuje i publikuje witrynę w GitHub Pages po każdej zmianie na gałęzi main. Strona nie wymaga serwera aplikacji ani instalacji npm.

## Dodawanie wpisu

1. Na GitHubie otwórz folder posts i wybierz Add file → Create new file.
2. Nazwij plik, np. 2026-10-18-moj-projekt.md, i wklej poniższy nagłówek wraz z treścią.
3. Wybierz Commit changes i zapisz zmianę na gałęzi main (albo scal pull request do main).
4. Gotowe: proces Publish website w zakładce Actions zaktualizuje stronę, RSS i mapę witryny. Nie uruchamiasz generatora ani nie dodajesz plików HTML.

```markdown
---
slug: moj-projekt
date: 2026-10-18
title: Mój kolejny projekt
description: Krótki opis tego, o czym jest wpis.
category: Projekty
---

Pierwszy akapit mojego wpisu.

## Jak powstawał projekt

Kolejny akapit i [odnośnik](https://mtelektronik.github.io/).
```

Slug musi być unikalny; używaj małych liter bez polskich znaków, cyfr i myślników. Data ma format YYYY-MM-DD. To data widoczna we wpisie, nie harmonogram: każdy plik w posts/ jest publikowany po zapisaniu na main. Obsługiwane są akapity, nagłówki ## i ### oraz linki Markdown z adresem https://, / lub kotwicą #.

Zmiana istniejącego pliku aktualizuje wpis. Usunięcie pliku usuwa artykuł także z opublikowanej witryny, RSS i mapy strony. Błędny nagłówek lub powtórzony slug zatrzymuje publikację; szczegóły są w zakładce Actions, a poprzednia wersja strony pozostaje dostępna. Popraw plik i zapisz kolejny commit, aby ponowić publikację.

Workflow .github/workflows/pages.yml buduje katalog dist/ i publikuje go jako artefakt GitHub Pages. Nie zapisuje wygenerowanych plików z powrotem do repozytorium. Nie edytuj ręcznie fragmentu pomiędzy znacznikami BLOG w index.html. Szablon wpisu znajduje się w templates/post.html.

Opcjonalny podgląd lokalny: uruchom node scripts/build-site.mjs (Node.js 24) i udostępnij katalog dist/ przez lokalny serwer HTTP. Testy publikowania: node --test tests/publishing.test.mjs. GitHub Pages musi mieć ustawione Settings → Pages → Source: GitHub Actions.

## Języki i wygląd

Interfejs: PL/DE/EN. Strona główna i dokumenty informacyjne mają osobne adresy /pl/, /de/ i /en/ (np. /de/privacy.html). Workflow generuje pełny HTML z istniejącego słownika assets/site-text.js, własnym adresem canonical oraz wzajemnymi oznaczeniami hreflang pl/de/en i x-default (PL). Język wynika z adresu; preferencje przeglądarki nie zmieniają treści pod danym URL. Przełącznik zachowuje wygląd, ale przechodzi do równoważnego adresu w wybranym języku, zachowując kotwicę. Stare linki z ?lang=pl, ?lang=de lub ?lang=en prowadzą do nowych adresów. Dawne adresy bez prefiksu pozostają dostępne po polsku z canonical wskazującym /pl/.

Wpisy blogowe pozostają po polsku. Instrukcja ma pełne wersje PL/DE/EN w osobnych plikach Markdown (patrz niżej). Tłumaczenia głównego interfejsu: assets/site-text.js; etykiety szablonu instrukcji: scripts/build-manual.mjs. assets/app.js obsługuje wybór języka, a scripts/build-locales.mjs generuje warianty podczas publikacji. Nie edytuj plików w dist/. Jasny i ciemny motyw zależą od ustawienia systemu. Brak analityki, reklam i zewnętrznych fontów.

## Dane autora

Marcin Tchorz / MTElektronik
Publiczny e-mail: marcintelektro@gmail.com
GitHub: https://github.com/mtelektronik

## Pozostałe uzupełnienia

- Impressum zawiera potwierdzone przez autora dane osoby prywatnej: imię i nazwisko, adres do doręczeń w Niemczech, e-mail i telefon. Po zmianie danych lub sposobu prowadzenia projektu zaktualizuj treść i odpowiednie tłumaczenia.
- Polityki prywatności opisują stronę i sprawdzony APK Fahrtenbuch 1.8.0 (9). Przed publikacją innego APK/AAB należy sprawdzić zgodność z jego faktycznym działaniem, uprawnieniami, bibliotekami i ustawieniami backupu.
- Po publikacji Fahrtenbuch dodaj prawdziwy link Google Play i zaktualizuj status we wszystkich językach.
- Opcjonalnie dodaj prawdziwą ikonę aplikacji. Dostarczone przez autora zrzuty ekranu są w assets/fahrtenbuch/ i w galerii projektu. Galeria zawiera pięć ekranów z przykładowymi danymi pojazdu. Podgląd raportu PDF jest obrazem PNG z trwale zamaskowanym numerem rejestracyjnym. Stare obrazy z rzeczywistym numerem usunięto z publikowanych plików.

## Pliki

- index.html — wizytówka, lista wpisów i projekty.
- posts/ — źródła wpisów Markdown.
- scripts/build-blog.mjs — generator bez zależności npm.
- templates/post.html — szablon artykułu.
- assets/ — CSS, tłumaczenia, favicon i grafika udostępniania.
- feed.xml, sitemap.xml, robots.txt — RSS i informacje dla robotów.
- impressum.html, privacy.html, fahrtenbuch-privacy.html — dane wydawcy i polityki prywatności.

## Instrukcja Fahrtenbuch

Instrukcja 1.8.0 ma trzy źródła:

- PL: docs/fahrtenbuch-instrukcja-prototyp-1.8.0.md (nazwa pliku zachowana dla istniejących linków).
- DE: docs/fahrtenbuch-instrukcja-1.8.0-de.md.
- EN: docs/fahrtenbuch-instrukcja-1.8.0-en.md.

Po zapisaniu zmian na main workflow automatycznie generuje /pl/fahrtenbuch-instrukcja.html, /de/fahrtenbuch-instrukcja.html i /en/fahrtenbuch-instrukcja.html z canonical i hreflang. Każda wersja strony prowadzi do instrukcji i pliku do pobrania w swoim języku. Dotychczasowy adres /fahrtenbuch-instrukcja.html pozostaje polskim aliasem. Aktualizując działanie opisane w instrukcji, popraw wszystkie trzy pliki; każda wersja zawiera 15 rozdziałów.

## Prywatność

Polityki PL/DE/EN są w privacy.html i fahrtenbuch-privacy.html; pełne tłumaczenia pozostają w assets/site-text.js. Strona nie zapisuje już zbędnej preferencji języka w localStorage. Polityka aplikacji rozdziela lokalną historię, eksporty, ręczny JSON, domyślne mechanizmy backupu Androida i dobrowolne zgłoszenia e-mail (opis, opcjonalny zrzut, bez proszenia o kopie JSON). Data safety w Google Play wymaga zgodności z finalnym pakietem. Ocena techniczna: APK com.lipie.fahrtenbuch_app, 1.8.0 (9), bez uprawnienia Internet i bez wyłączenia domyślnego backupu.
