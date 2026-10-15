# MTElektronik — GitHub Pages

Statyczna strona WWW: HTML, CSS i JavaScript. Nie wymaga kompilacji, npm ani zewnętrznych usług.

## Instalacja
1. Otwórz repozytorium `mtelektronik/mtelektronik.github.io`.
2. Wgraj **zawartość** tego katalogu do głównego katalogu repozytorium (nie sam folder `mtelektronik-site`).
3. W `Settings → Pages` wybierz `Deploy from a branch`, `main`, `/(root)`.
4. Sprawdź `https://mtelektronik.github.io`.

## Konieczne przed publiczną publikacją
- Uzupełnij prawdziwe dane wydawcy i zweryfikuj obowiązek Impressum w `impressum.html`.
- Zweryfikuj i uzupełnij `privacy.html` (strona WWW) oraz `fahrtenbuch-privacy.html` (aplikacja) na podstawie faktycznej konfiguracji i końcowego APK/AAB.
- W `index.html` zastąp tekst zastępczy w sekcji kontaktu prawdziwym adresem e-mail (najlepiej linkiem `mailto:`), a tłumaczenia odpowiednio zmień w `assets/app.js`.
- Po opublikowaniu Fahrtenbuch dodaj prawdziwy link Google Play.
- Nie umieszczaj w publicznym repozytorium haseł, kluczy API ani prywatnych danych, których nie chcesz ujawniać.

## Języki i motyw
PL/DE/EN — przełącznik w nagłówku; wybór jest zapamiętywany w localStorage. Domyślnie język przeglądarki (dla innych języków: EN). Motyw jasny/ciemny automatycznie przez `prefers-color-scheme`.

## Struktura
- `index.html` — strona główna
- `impressum.html` — szablon informacji prawnych
- `privacy.html` — szablon polityki prywatności strony
- `fahrtenbuch-privacy.html` — szablon polityki prywatności aplikacji
- `assets/style.css` — wygląd
- `assets/app.js` — tłumaczenia i obsługa języka
- `assets/favicon.svg` — ikona witryny
