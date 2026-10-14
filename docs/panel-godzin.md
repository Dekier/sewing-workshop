# Panel godzin

`/panel` pokazuje wyłącznie pole hasła. Po wpisaniu poprawnego hasła otwiera formularz, bez przycisku logowania. Hasło ustawiamy po stronie serwera w `NUXT_PANEL_PASSWORD`; nie jest częścią kodu przeglądarki. Sesja HttpOnly trwa 8 godzin. Każdy zapis wymaga ważnej sesji i zgodnego źródła żądania. Próby logowania są ograniczone do 15 na 15 minut na adres IP.

Panel ma wybór Pracownia krawiecka / DEŻAL / Obie firmy. Zapis jednej firmy zachowuje dane drugiej. Opcja „Obie firmy” zaczyna od ustawień pracowni i zapisuje je dla obu firm. Kontrola wersji zapobiega nadpisaniu zmian wprowadzonych równocześnie w innym oknie.

Godziny tygodnia są w czasie Europe/Warsaw. Zamknięcie następuje dokładnie o ustawionej godzinie końcowej. Daty wolnego są włączne. „Pokaż zapowiedź od” określa pierwszy dzień wyświetlania zapowiedzi nad bieżącym statusem. Po rozpoczęciu wolnego pojawia się data powrotu wyliczona z tygodnia pracy i kolejnych okresów wolnego. Gdy wszystkie dni są zamknięte, strona informuje, że termin otwarcia nie jest ustalony. Okresy wolnego nie mogą się nakładać.

## Vercel i baza

Backend działa w projekcie Vercel `sewing`, przez funkcje Nuxt/Nitro. Wymagany jest zwykły `nuxt build` na Vercel — `nuxt generate` publikuje stronę statyczną bez backendu. Zmiany w bazie nie wymagają kolejnego wdrożenia strony.

Uzgodniona baza: istniejący Upstash Redis w darmowym planie. Klucz godzin to `sewing-dezal:business-hours:v1`, a klucze ograniczenia prób zaczynają się od `sewing-dezal:panel-attempt:`. Nie modyfikujemy innych kluczy. Obie aplikacje dzielą limit darmowej bazy z jej dotychczasowym projektem.

Połączenie projektu `sewing` z bazą `rozeznanie-lista` zostało zapisane na Vercel dla Production i Preview. Prywatne zmienne `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `NUXT_PANEL_PASSWORD` i `NUXT_PANEL_SESSION_SECRET` są skonfigurowane. Lokalna pracownia korzysta teraz z tej samej bazy przez ignorowany `.env`; odczyt rekordu obu firm został potwierdzony. Nowy panel i API wymagają jeszcze wdrożenia aktualnego kodu na publiczne strony.

Zmienne projektu `sewing` (Production, Preview i Development):

- `UPSTASH_REDIS_REST_URL` oraz `UPSTASH_REDIS_REST_TOKEN` z połączenia Upstash. Obsługiwane są też `KV_REST_API_URL` i `KV_REST_API_TOKEN`, gdy integracja Vercel nada te nazwy.
- `NUXT_PANEL_PASSWORD`: hasło właścicieli.
- `NUXT_PANEL_SESSION_SECRET`: co najmniej 32 losowe znaki, niezależne od hasła. Zmiana sekretu unieważnia sesje.

Sekretów nie umieszczamy w `NUXT_PUBLIC_*`, repozytorium ani w HTML. `.env.example` zawiera wyłącznie nazwy. Po zmianie zmiennych Vercel wymagane jest nowe wdrożenie.

DEŻAL pobiera dane przez swój `/api/hours`, który odpyta publiczny backend pracowni dla firmy `dezal`. Konfiguracja `NUXT_HOURS_API_URL` domyślnie wskazuje `https://pracownia-krawiecka.pl/api/hours`. Nie wymaga tokenów bazy w DEŻAL. Strona główna i Kontakt DEŻAL mają SSR, aby godziny nie zostały utrwalone podczas prerenderowania. Pozostałe podstrony mogą zachować prerenderowanie.

Frontend odświeża godziny co minutę oraz po powrocie do karty. Kontakt, box i dane strukturalne korzystają z tego samego odczytu. Niedostępność backendu pokazuje informację o problemie i kontakt telefoniczny, bez zgadywania godzin.

## Lokalnie

W `.env` ustaw hasło i sekret sesji. Bez danych Upstash tylko w trybie developerskim dane zapisują się w `.data/business-hours.json`. Ten plik jest ignorowany przez Git. W produkcji brak bazy zwraca 503 zamiast używania nietrwałego dysku funkcji Vercel.

Aby sprawdzić oba projekty lokalnie, uruchom pracownię np. na porcie 3001, a w prywatnym `.env` DEŻAL ustaw `NUXT_HOURS_API_URL=http://127.0.0.1:3001/api/hours` i uruchom DEŻAL na 3000. Restart serwera jest wymagany po zmianie `.env`. Bez tej zmiennej lokalny DEŻAL korzysta z produkcyjnego backendu.
