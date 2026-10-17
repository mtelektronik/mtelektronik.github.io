# Fahrtenbuch
# Instrukcja obsługi

**Instrukcja obsługi • aplikacja Android 1.8.0 • wydanie PL • 17.10.2026**

Fahrtenbuch służy do zapisywania stanów licznika, tankowań i ładowań. Na podstawie wpisów pokazuje historię pojazdu, dystanse oraz możliwe do obliczenia zużycie paliwa. Koszty można sprawdzić w eksportowanych raportach PDF i CSV.

Instrukcja opisuje obecną wersję aplikacji. Nazwy niektórych przycisków mogą być zapisane bez polskich znaków.

## 1. Szybki start

1. Dodaj samochód i podaj jego aktualny stan licznika jako stan początkowy.
2. Wybierz typ pojazdu oraz walutę raportów.
3. Po przejechaniu kolejnego odcinka wpisz nowy stan licznika.
4. Jeżeli tankujesz lub ładujesz samochód, zaznacz odpowiednią opcję i uzupełnij dane.
5. Zapisz wpis. Sprawdź, czy licznik, ilość paliwa lub energii są poprawne.
6. Regularnie zapisuj kopię zapasową poza aplikacją.

**Najważniejsze:** podawaj stan widoczny na liczniku samochodu, np. **148 501 km**, a nie dystans ostatniej podróży, np. 524 km.

## 2. Dodanie samochodu

Przy pierwszym uruchomieniu dodaj pojazd z ekranu początkowego. Następne samochody dodasz przez **Ustawienia > Dodaj auto**. Ustawienia otwiera ikona zębatki w górnej belce.

Uzupełnij formularz:

| Pole | Co wpisać |
| --- | --- |
| Marka i model | Dane pozwalające rozpoznać samochód. |
| Rocznik | Rok produkcji pojazdu. |
| Rodzaj paliwa / napędu | Właściwy typ samochodu; patrz tabela poniżej. |
| Pojemność silnika | Pojemność silnika spalinowego. Pole jest ukryte dla elektryków. |
| Początkowy stan licznika | Punkt początkowy historii prowadzonej w aplikacji. |
| Tablice rejestracyjne | Numer pozwalający odróżnić pojazdy. |
| Waluta kosztów | Waluta, w której będą oznaczone ceny i koszty. |

### Wybór napędu

| Typ | Sposób rejestrowania |
| --- | --- |
| Benzyna, Diesel, LPG | Tankowanie: litry i cena za litr. |
| Hybryda (HEV) | Zwykła hybryda, bez ładowania z gniazdka. Rejestrujesz tankowania. |
| Hybryda plug-in (PHEV) | Możesz rejestrować tankowania, ładowania lub oba zdarzenia w jednym wpisie. |
| Elektryczny | Ładowanie: kWh i cena za kWh. Bez pojemności silnika i nowych wpisów tankowania. |

Jeżeli wcześniej wybrano ogólną pozycję „Hybryda”, w edycji pojazdu można doprecyzować HEV lub PHEV. Aplikacja nie wybiera tego typu automatycznie i zachowuje historię.

### Kilka samochodów

Przed dodaniem wpisu sprawdź wybrany pojazd na ekranie głównym. Historię i raport przygotowuje się dla konkretnego samochodu. Przełączanie pojazdów jest dostępne w jego sekcji na ekranie głównym; zarządzanie samochodami znajdziesz także w **Ustawienia > Pojazdy**.

**Uwaga:** usunięcie samochodu usuwa również przypisane do niego wpisy. Przed usunięciem wykonaj kopię zapasową.

## 3. Codzienny wpis bez tankowania lub ładowania

1. Wybierz właściwy samochód.
2. W polu **Aktualny stan licznika** wpisz nową wartość.
3. Pozostaw **Tankowanie: Nie** i, jeżeli jest dostępne, **Ładowanie: Nie**.
4. Naciśnij przycisk zapisania wpisu.

Aplikacja sama obliczy różnicę względem poprzedniego stanu licznika. Dla pierwszego wpisu punktem odniesienia jest stan początkowy samochodu.

**Przykład:** poprzedni stan to 148 000 km, nowy to 148 125 km. Zarejestrowany dystans wyniesie **125 km**.

Nowy stan musi być większy od poprzedniego. Obecna wersja nie pozwala dodać kolejnego wpisu z identycznym stanem licznika. Data i godzina wpisu są nadawane automatycznie podczas zapisu; formularz nie służy do dopisywania wpisów z wybraną datą wsteczną.

Można zapisywać wpisy codziennie albo tylko podczas tankowania lub ładowania. Im rzadsze wpisy, tym mniej szczegółowa historia przejazdów.

## 4. Tankowanie

Dla samochodu spalinowego, HEV lub PHEV:

1. Wpisz aktualny stan licznika.
2. Zaznacz **Tankowanie: Tak**.
3. Ustaw **Do pełna: Tak** albo **Nie**, zgodnie z rzeczywistym tankowaniem.
4. Wpisz liczbę zatankowanych litrów.
5. Podaj cenę **jednego litra** w walucie ustawionej dla samochodu.
6. Zapisz wpis.

Możesz używać przecinka lub kropki jako separatora dziesiętnego, np. `41,27` lub `41.27`.

**Nie wpisuj całkowitej kwoty z paragonu.** Aplikacja wylicza koszt na podstawie litrów i ceny za litr. Zakupy takie jak kawa, jedzenie czy płyn do spryskiwaczy nie powinny wpływać na cenę paliwa.

### Co oznacza „Do pełna”?

Zaznacz „Tak”, jeżeli po tankowaniu zbiornik jest pełny. Nie oznacza to, że przed tankowaniem musiał być pusty lub że musiała świecić kontrolka rezerwy.

Dla porównywalnych wyników tankuj do powtarzalnego poziomu, zgodnie z zasadami użytkowania pojazdu i dystrybutora. Nie dolewaj paliwa na siłę w celu uzyskania określonej liczby litrów.

### Jak obliczane jest spalanie?

Potrzebne są dwa tankowania oznaczone jako **do pełna**. Aplikacja dzieli sumę litrów dolanych po pierwszym pełnym tankowaniu, łącznie z kolejnym pełnym tankowaniem, przez przejechany między nimi dystans.

**Spalanie [l/100 km] = dolane litry ÷ dystans [km] × 100**

Przykład:

| Zdarzenie | Stan licznika | Dolane paliwo | Do pełna |
| --- | --- | --- | --- |
| Początek pomiaru | 100 000 km | 35 l | Tak |
| Tankowanie pośrednie | 100 300 km | 15 l | Nie |
| Koniec pomiaru | 100 600 km | 30 l | Tak |

Wynik: `(15 + 30) ÷ 600 × 100 = 7,5 l/100 km`.

Początkowe 35 l nie wchodzi do tego obliczenia. Pierwszy pełny bak wyznacza początek pomiaru.

Wynik pojawi się przy wpisie kończącym pomiar, czyli kolejnym tankowaniu do pełna. Tankowania częściowe są uwzględniane w sumie, ale same nie zamykają pomiaru. Codzienne wpisy licznika nie przerywają pomiaru.

Jeżeli nie ma odpowiednich pełnych tankowań, zamiast wyniku może być widoczny myślnik. Samo podanie litrów nie wystarcza. Stare wpisy bez informacji o pełnym baku nie są automatycznie uznawane za tankowania do pełna.

**Ważne rozróżnienie:** dystans między dwoma tankowaniami może być inny niż dystans całego pomiaru spalania, obejmującego również tankowania częściowe.

## 5. Ładowanie elektryka i hybrydy plug-in

1. Wybierz samochód elektryczny lub PHEV.
2. Podaj aktualny stan licznika.
3. Zaznacz **Ładowanie: Tak**.
4. Wpisz dostarczoną energię w **kWh**, np. `23,456`.
5. Podaj cenę **jednej kWh** w walucie samochodu.
6. Zapisz wpis.

Przy darmowym ładowaniu wpisz cenę **0**. Ilość energii musi być większa od zera. Nie wpisuj w to pole procentów naładowania baterii, mocy ładowarki w kW ani pojemności akumulatora.

W PHEV możesz zaznaczyć jednocześnie tankowanie i ładowanie oraz podać obie ilości i obie ceny. To także sposób na zapisanie obu zdarzeń przy tym samym stanie licznika.

W historii zobaczysz dostarczone kWh oraz, od kolejnego wpisu ładowania, dystans między ładowaniami. Jest to różnica wskazań licznika, a nie deklarowany zasięg elektryczny.

### Czego aplikacja obecnie nie oblicza?

Aplikacja nie wylicza **kWh/100 km** ani **kosztu energii elektrycznej na 100 km**. Nie zapisuje bilansu energii w baterii na początku i końcu odcinka. Ilość energii pobranej podczas ładowania nie jest więc automatycznie traktowana jako energia zużyta na przejechanym dystansie.

W PHEV dystans obejmuje całą jazdę. Spalanie paliwa odnosi się do całkowitego dystansu między właściwymi tankowaniami, a nie wyłącznie do kilometrów przejechanych na silniku spalinowym. Aplikacja nie rozdziela kilometrów na elektryczne i spalinowe.

Historyczne dane zapisane w litrach nie są przeliczane na kWh po zmianie typu pojazdu.

## 6. Odczytywanie ekranu głównego

| Element | Znaczenie |
| --- | --- |
| Stan licznika | Ostatnie zapisane wskazanie licznika, a nie dystans zarejestrowany przez aplikację. |
| Wpisy | Liczba zapisanych wpisów wybranego pojazdu. |
| Zużycie | Średnia dostępnych wyników spalania z zakończonych pomiarów. Nie jest to odczyt z komputera pokładowego. |
| Energia — dla elektryka | Suma zapisanych kWh, nie zużycie energii na 100 km. |
| Historia | Poszczególne wpisy, najnowsze na górze, z dystansem i danymi tankowania lub ładowania. |

Koszty nie są prezentowane na bieżąco w historii. Znajdziesz je w plikach raportów.

## 7. Poprawianie i usuwanie wpisów

W historii ekranu głównego otwórz menu przy wpisie i wybierz edycję albo usunięcie. Dostępne są tylko wpisy spełniające **oba warunki**:

- zostały utworzone dzisiaj, według lokalnej daty telefonu;
- należą do 10 ostatnich wpisów danego samochodu.

Nie jest to okres 24 godzin. Wpis z godziny 23:50 następnego dnia nie spełnia już warunku „dzisiaj”. Jeżeli jednego dnia zapiszesz ponad 10 wpisów dla samochodu, najstarsze z nich również wypadną poza zakres edycji.

Kłódka oznacza brak dostępnej edycji i usuwania. W widoku raportów wpisy służą tylko do odczytu; do poprawiania wróć na ekran główny.

Podczas zmiany licznika aplikacja sprawdza jego zgodność z sąsiednimi wpisami. Po poprawieniu lub usunięciu wpisu przelicza powiązane dystanse i spalanie. Usuwanie wymaga potwierdzenia.

**Przed zapisaniem zawsze sprawdź dane.** Kopia zapasowa służy do odzyskania całego zestawu danych, a nie do odblokowania pojedynczego wpisu.

## 8. Raporty PDF i CSV

1. Wybierz właściwy samochód.
2. Otwórz **Ustawienia > Raporty** albo przycisk raportów przy historii.
3. Wybierz datę początkową i końcową lub użyj **Wszystkie wpisy**.
4. Sprawdź podsumowanie i listę wpisów.
5. Wybierz eksport CSV albo raport PDF.
6. W systemowym oknie udostępniania wybierz aplikację lub miejsce, w którym chcesz zachować plik.

Wybrane daty są uwzględniane włącznie. Jeśli w okresie nie ma wpisów, nie powstanie raport z danymi.

**PDF** służy do przeglądania i udostępniania czytelnego zestawienia. **CSV** służy do dalszego przetwarzania w arkuszu kalkulacyjnym. W tej wersji nagłówki CSV są po polsku; separatorem kolumn jest średnik.

Raporty uwzględniają odpowiednie dla pojazdu dane:

- stany licznika i dystanse;
- litry, ceny za litr, status pełnego baku i dostępne wyniki spalania;
- koszty paliwa oraz koszt paliwa na 100 km dla odpowiednio zakończonych pomiarów z kompletnymi cenami;
- kWh, ceny za kWh i koszty ładowania;
- dla PHEV osobne dane paliwa i ładowania oraz łączne koszty ich zakupu.

Koszt zakupu paliwa to **litry × cena za litr**, a koszt ładowania to **kWh × cena za kWh**. Koszt paliwa na 100 km nie zawiera kosztu ładowania, serwisu, ubezpieczenia ani innych wydatków na samochód. Nie dziel całkowitych zakupów paliwa przez dowolny dystans, oczekując takiego samego wyniku jak dla zamkniętego pomiaru między pełnymi bakami.

Brakujące ceny w starszych danych oznaczają niepełne informacje o kosztach. Sumy znanych kosztów nie potwierdzają wtedy pełnej wysokości wydatków.

**Granice okresu:** daty filtrują wpisy, a nie rzeczywiste godziny przejazdów. Odcinek przypisany do pierwszego wpisu raportu może zaczynać się przed wybraną datą początkową. Aplikacja nie śledzi trasy GPS ani nie dzieli przejazdu dokładnie na granicy dnia lub miesiąca.

## 9. Waluta

Walutę wybierasz w formularzu samochodu. Dostępne są:

| Waluta | Kod | Symbol |
| --- | --- | --- |
| Euro | EUR | € |
| Złoty polski | PLN | zł |
| Dolar amerykański | USD | $ |
| Funt brytyjski | GBP | £ |
| Frank szwajcarski | CHF | CHF |
| Korona czeska | CZK | Kč |

Możesz zmienić walutę także później, w edycji pojazdu. **Zmiana nie przelicza kwot według kursów walut.** Zmienia oznaczenie również wcześniejszych cen i kosztów tego samochodu.

Jeżeli prowadzisz historię w EUR, wpisuj ceny w EUR. Gdy płacisz w innej walucie, samodzielnie przelicz cenę jednostkową do waluty samochodu przed wpisaniem jej do aplikacji. Aplikacja nie pobiera kursów i nie zapisuje osobnej waluty dla każdego tankowania lub ładowania.

Zmiana waluty nie zamyka okresu rozliczeniowego ani nie generuje automatycznie raportu.

## 10. Kopia zapasowa i przywracanie

### Zapisanie kopii

1. Otwórz **Ustawienia > Kopia zapasowa**.
2. Wybierz **Zapisz kopię**.
3. W systemowym oknie wybierz lokalizację i zapisz plik `.json`.
4. Sprawdź komunikat potwierdzający zapis.
5. Zachowaj plik także poza telefonem, np. na komputerze lub w wybranym przez siebie miejscu przechowywania plików.

Kopia zawiera samochody i ich historię, w tym dane paliwa i ładowania. Nie jest szyfrowana; może zawierać numery rejestracyjne i informacje o użytkowaniu samochodu. Udostępniaj ją ostrożnie.

Wykonuj kopię regularnie, zwłaszcza przed aktualizacją aplikacji, zmianą telefonu, przywracaniem danych i usuwaniem samochodu. Nie zakładaj, że aplikacja automatycznie synchronizuje historię z chmurą.

### Przywrócenie kopii

1. Najpierw zapisz kopię obecnych danych.
2. Wybierz **Ustawienia > Kopia zapasowa > Przywróć z kopii**.
3. Wskaż plik kopii Fahrtenbuch.
4. Sprawdź datę kopii oraz liczbę samochodów i wpisów w oknie potwierdzenia.
5. Potwierdź przywrócenie tylko wtedy, gdy chcesz zastąpić obecne dane.

**Przywracanie zastępuje cały obecny zestaw samochodów i wpisów. Nie łączy dwóch historii.** Nowsze wpisy, których nie ma w wybranej kopii, nie zostaną zachowane w przywróconym zestawie.

Wersja 1.8.0 obsługuje również starsze kopie formatu 1. Kopie zawierające nowe dane ładowania mają format 2; starsza aplikacja może ich nie obsługiwać. Nie edytuj ręcznie pliku kopii. Nieprawidłowy, nieobsługiwany lub zbyt duży plik nie zostanie przywrócony; limit wynosi 10 MiB.

**Raport to nie kopia zapasowa.** Plików PDF i CSV nie można użyć do przywrócenia historii w aplikacji.

## 11. Język i wygląd

### Język

Otwórz **Ustawienia > Język** i wybierz polski, angielski lub niemiecki. Zmiana języka nie przelicza kwot i nie zmienia waluty samochodu.

### Motyw

W **Ustawienia > Wygląd** wybierz:

- **Zgodny z systemem** — jasny lub ciemny tryb zależy od ustawienia telefonu;
- **Jasny** — aplikacja pozostaje jasna;
- **Ciemny** — aplikacja pozostaje ciemna.

Przełącznik **Kolory systemowe** steruje paletą niezależnie od wyboru jasności. Włączony korzysta z systemowego akcentu telefonu na Androidzie 12 i nowszym. Wyłączony pozostawia bazową niebieską paletę. Jeśli systemowy akcent nie jest dostępny, aplikacja również używa niebieskiej palety.

Domyślnie aplikacja korzysta z trybu zgodnego z systemem i ma włączone kolory systemowe. Ustawienia wyglądu są zapamiętywane.

## 12. Widżet na pulpicie

1. Przytrzymaj wolne miejsce na ekranie głównym telefonu.
2. Otwórz listę widżetów i znajdź Fahrtenbuch.
3. Umieść widżet na pulpicie. Jest przeznaczony do układu około **3 kolumn × 1 wiersz**; rzeczywisty rozmiar zależy od programu uruchamiającego telefonu.
4. Dotknij widżetu lub jego przycisku, aby otworzyć dodawanie wpisu w aplikacji.
5. Sprawdź samochód, wpisz licznik i zapisz dane.

Widżet jest skrótem do formularza, a nie osobnym polem do zapisywania licznika bez otwierania aplikacji. Jego jasność i, na obsługiwanym Androidzie, akcent dopasowują się do systemu telefonu.

## 13. Aktualizacja i bezpieczeństwo danych

Przed instalacją nowej wersji zapisz kopię `.json` poza aplikacją. Jeżeli instalator pozwala zaktualizować obecną aplikację, użyj aktualizacji zamiast odinstalowania.

Odinstalowanie aplikacji lub wyczyszczenie jej danych może usunąć lokalną historię. Samo zachowanie pliku APK nie zabezpiecza samochodów i wpisów. Przy przejściu na wydanie z innego źródła nie zakładaj, że instalator zachowa dane; najpierw upewnij się, że masz dostępną kopię.

Nie zmieniaj daty telefonu, aby próbować omijać blokadę edycji. Daty mają znaczenie dla historii, raportów i dostępności poprawiania wpisów.

## 14. Najczęstsze pytania

**Dlaczego nie ma wyniku spalania, mimo że wpisano litry?**  
Sprawdź, czy istnieją dwa odpowiednie tankowania do pełna. Pierwsze rozpoczyna pomiar, następne go zamyka. Brak informacji o pełnym baku w starszych wpisach nie jest automatycznie uzupełniany.

**Czy przed tankowaniem muszę jechać do rezerwy?**  
Nie. Ważny jest porównywalny pełny poziom po tankowaniach wyznaczających pomiar, a nie stan kontrolki rezerwy przed tankowaniem.

**Dlaczego widzę 148 501 km, chociaż nie przejechałem tyle z aplikacją?**  
To stan licznika samochodu. Dystans zarejestrowany w danym okresie sprawdzisz w raportach.

**Dlaczego wpis ma kłódkę?**  
Nie spełnia warunku daty dzisiejszej albo nie należy już do 10 ostatnich wpisów samochodu. W raporcie wszystkie wpisy są tylko do odczytu.

**Gdzie są koszty?**  
W wyeksportowanym PDF lub CSV. Nie są pokazywane na bieżąco przy rekordach historii.

**Czy można zapisać darmowe ładowanie?**  
Tak. Podaj dodatnią ilość kWh i cenę za kWh równą 0.

**Czy po zmianie PLN na EUR aplikacja przeliczy stare kwoty?**  
Nie. Zmieni ich oznaczenie, bez przeliczenia wartości.

**Czy PDF wystarczy do przeniesienia danych na nowy telefon?**  
Nie. Do przywracania potrzebujesz pliku kopii zapasowej `.json`.

## 15. Informacje o aplikacji

W **Ustawienia > O twórcy** znajdziesz numer zainstalowanej wersji i odnośniki do strony autora oraz polityki prywatności.

- Strona autora: https://mtelektronik.github.io/pl/
- Polityka prywatności: https://mtelektronik.github.io/pl/fahrtenbuch-privacy.html

---

Instrukcja opisuje istniejące zachowanie wersji 1.8.0, a nie listę planowanych funkcji. Jeśli znajdziesz niejasny opis, zgłoś go autorowi, podając numer zainstalowanej wersji aplikacji.
