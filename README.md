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

Wpisy blogowe i instrukcja pozostają po polsku; nie deklarujemy nieistniejących tłumaczeń tych dokumentów. Wszystkie aktywne tłumaczenia interfejsu: assets/site-text.js (jeden słownik PL/DE/EN). assets/app.js zawiera obsługę interfejsu i wyboru języka, a scripts/build-locales.mjs generuje warianty podczas publikacji. Zmiana tłumaczeń nadal wymaga edycji tylko słownika; nie edytuj plików w dist/. Jasny i ciemny motyw zależą od ustawienia systemu. Brak analityki, reklam i zewnętrznych fontów.

## Dane autora

Marcin Tchorz / MTElektronik
Publiczny e-mail: marcintelektro@gmail.com
GitHub: https://github.com/mtelektronik

## Pozostałe uzupełnienia

- Impressum zawiera potwierdzone przez autora dane osoby prywatnej: imię i nazwisko, adres do doręczeń w Niemczech, e-mail i telefon. Po zmianie danych lub sposobu prowadzenia projektu zaktualizuj treść i odpowiednie tłumaczenia.
- Polityki prywatności opisują stronę i sprawdzony APK Fahrtenbuch 1.8.0 (9). Przed publikacją innego APK/AAB należy sprawdzić zgodność z jego faktycznym działaniem, uprawnieniami, bibliotekami i ustawieniami backupu.
- Po publikacji Fahrtenbuch dodaj prawdziwy link Google Play i zaktualizuj status we wszystkich językach.
- Opcjonalnie dodaj prawdziwą ikonę aplikacji. Dostarczone przez autora zrzuty ekranu są w assets/fahrtenbuch/ i w galerii projektu; podgląd raportu PDF jest obrazem, a nie plikiem PDF do pobrania.

## Pliki

- index.html — wizytówka, lista wpisów i projekty.
- posts/ — źródła wpisów Markdown.
- scripts/build-blog.mjs — generator bez zależności npm.
- templates/post.html — szablon artykułu.
- assets/ — CSS, tłumaczenia, favicon i grafika udostępniania.
- feed.xml, sitemap.xml, robots.txt — RSS i informacje dla robotów.
- impressum.html, privacy.html, fahrtenbuch-privacy.html — dane wydawcy i polityki prywatności.

## Instrukcja Fahrtenbuch

Prototyp instrukcji 1.8.0 (PL) znajduje się w docs/fahrtenbuch-instrukcja-prototyp-1.8.0.md. Po zapisaniu zmiany tego pliku na main workflow automatycznie odświeża także stronę instrukcji. Dokument jest jawnie oznaczony jako prototyp. Łącze do czytania i pobrania jest w dziale projektu.

## Prywatność

Polityki PL/DE/EN są w privacy.html i fahrtenbuch-privacy.html; pełne tłumaczenia pozostają w assets/site-text.js. Strona nie zapisuje już zbędnej preferencji języka w localStorage. Polityka aplikacji rozdziela lokalną historię, eksporty, ręczny JSON, domyślne mechanizmy backupu Androida i dobrowolne zgłoszenia e-mail (opis, opcjonalny zrzut, bez proszenia o kopie JSON). Data safety w Google Play wymaga zgodności z finalnym pakietem. Ocena techniczna: APK com.lipie.fahrtenbuch_app, 1.8.0 (9), bez uprawnienia Internet i bez wyłączenia domyślnego backupu.
