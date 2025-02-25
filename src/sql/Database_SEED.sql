
-- Kategorie
INSERT INTO Category (cat_name, description) VALUES
    ('Procesory', 'Procesory do komputerów stacjonarnych i laptopów'),
    ('Karty graficzne', 'Karty graficzne do gier i pracy graficznej'),
    ('Płyty główne', 'Płyty główne do różnych typów komputerów'),
    ('Kości RAM', 'Pamięć RAM do komputerów'),
    ('Zasilacze', 'Zasilacze do komputerów stacjonarnych'),
    ('Obudowy', 'Obudowy komputerowe różnych typów'),
    ('Dyski', 'Dyski twarde i SSD');

-- Procesory
INSERT INTO Component (name, description, price, cat_id) VALUES
    ('Intel Core i9-9900K', 'Wysokowydajny procesor idealny dla entuzjastów gier i profesjonalistów tworzących treści, zapewniający wyjątkową wydajność przy pracy wielowątkowej.', 1500.00, 1),
    ('AMD Ryzen 5 3600', 'Sześciordzeniowy procesor zapewniający doskonały stosunek ceny do wydajności, idealny dla graczy i twórców, którzy potrzebują niezawodnej wydajności.', 800.00, 1),
    ('Intel Core i7-10700K', 'Ośmiordzeniowy procesor z linii Core i7, który zapewnia wysoką wydajność w grach i aplikacjach profesjonalnych dzięki zdolności do szybkiego przetwarzania danych i technologii Turbo Boost.', 1200.00, 1);

-- Karty graficzne
INSERT INTO Component (name, description, price, cat_id) VALUES
    ('NVIDIA GeForce RTX 3080', 'Karta graficzna nowej generacji z technologią ray tracingu, oferująca niesamowite doświadczenia w grach dzięki zaawansowanej architekturze Ampere.', 3000.00, 2),
    ('AMD Radeon RX 5700 XT', 'Karta graficzna z architekturą RDNA zapewniająca wyjątkowe doświadczenia w grach 1440p dzięki wysokiej przepustowości i technologii Radeon Image Sharpening.', 1800.00, 2),
    ('NVIDIA GeForce GTX 1660 Ti', 'Karta graficzna idealna dla graczy PC. Zapewnia świetną wydajność w Full HD, obsługując nowoczesne technologie graficzne w przystępnej cenie.', 1200.00, 2);

-- Płyty główne
INSERT INTO Component (name, description, price, cat_id) VALUES
     ('ASUS ROG Maximus XII HERO', 'Płyta główna z serii ROG, zaprojektowana dla zaawansowanych graczy i overclockerów, wyposażona w najnowsze technologie połączeń i dźwięku.', 1200.00, 3),
     ('MSI MPG Z490 Gaming Edge', 'Płyta główna dedykowana graczom, z obsługą procesorów Intel 10. generacji i zaawansowanymi rozwiązaniami sieciowymi dla najlepszego połączenia online.', 900.00, 3),
     ('Gigabyte Z390 Aorus Ultra', 'Płyta główna dla entuzjastów, obsługująca procesory Intel 9. generacji, wyposażona w potrójny system chłodzenia M.2 i wsparcie dla pamięci Intel Optane.', 1100.00, 3);

-- Kości RAM
INSERT INTO Component (name, description, price, cat_id) VALUES
     ('Corsair Vengeance LPX 16GB', 'Niezawodna pamięć RAM typu DDR4, zoptymalizowana do wysokiej wydajności przy niskich opóźnieniach, idealna dla graczy i profesjonalnych konfiguracji.', 300.00, 4),
     ('G.Skill Trident Z RGB 32GB', 'Wysokowydajny zestaw pamięci RAM z efektownym podświetleniem RGB, który łączy w sobie duże prędkości z niskimi opóźnieniami, idealny dla gamingu i zadań wymagających dużych zasobów.', 500.00, 4),
     ('Kingston HyperX Predator 16GB', 'Pamięć RAM DDR4 z agresywnym designem, która oferuje wysoką wydajność i niezawodność dla graczy i entuzjastów overclockingu.', 350.00, 4);

-- Zasilacze
INSERT INTO Component (name, description, price, cat_id) VALUES
      ('Corsair RM750x', 'Niezawodny i cichy zasilacz o mocy 750W z certyfikatem 80 PLUS Gold, który zapewnia wydajne i stabilne zasilanie dla zaawansowanych systemów komputerowych.', 400.00, 5),
      ('EVGA SuperNOVA 850 G5', 'Zasilacz o mocy 850W z pełną modularnością i certyfikatem 80 PLUS Gold, który gwarantuje wyjątkową wydajność energetyczną i długą żywotność.', 450.00, 5),
      ('Seasonic FOCUS GX-650', 'Zasilacz o mocy 650W z linii FOCUS GX, który charakteryzuje się cichą pracą i wysoką efektywnością, idealny dla budowy cichego PC.', 300.00, 5);

-- Obudowy
INSERT INTO Component (name, description, price, cat_id) VALUES
      ('NZXT H510', 'Nowoczesna i stylowa obudowa komputerowa z łatwym dostępem do wnętrza i zarządzaniem kablami, zaprojektowana z myślą o wyeksponowaniu podzespołów.', 200.00, 6),
      ('Phanteks Eclipse P300', 'Obudowa z oknem z hartowanego szkła, która łączy w sobie elegancki wygląd z funkcjonalnością, oferując świetną cyrkulację powietrza i miejsce na rozbudowane chłodzenie.', 150.00, 6),
      ('Corsair Obsidian 500D', 'Premium obudowa komputerowa zbudowana z myślą o najwyższej jakości i wydajności, z łatwym montażem komponentów i systemem chłodzenia.', 250.00, 6);

-- Dyski
INSERT INTO Component (name, description, price, cat_id) VALUES
      ('Samsung 970 EVO Plus 1TB', 'Solidny i szybki dysk SSD NVMe, który zapewnia błyskawiczny dostęp do danych i niezawodność dla wymagających zadań.', 200.00, 7),
      ('Seagate Barracuda 2TB', 'Dysk twardy HDD o pojemności 2TB, który oferuje szybki dostęp do danych i niezawodność przechowywania, idealny do codziennego użytku.', 100.00, 7),
      ('WD Blue 1TB', 'Dysk twardy HDD oferujący duży magazyn danych przy zachowaniu przystępnej ceny, idealny do archiwizacji i codziennego użytku.', 80.00, 7);

-- User
INSERT INTO User VALUES
    ('s24845','Michał','Wiśniewski','s24845@pjwstk.edu.pl','123456','User');

INSERT INTO User VALUES
    ('admin','Jan','Kowalski','jk@gmail.com','admin','Admin');


-- Builds
INSERT INTO Build (Name, date, username, status) VALUES
    ('Zestaw Gamingowy', '2024-01-21', 's24845', 'Złożony'),
    ('Zestaw Biurowy', '2024-01-22', 'admin', 'W trakcie');

-- Components in builds
INSERT INTO BuildInfo (name, component_id, build_id, quantity, price) VALUES
    ('Intel Core i9-9900K', 1, 1, 1, 1500.00),
    ('NVIDIA GeForce RTX 3080', 4, 1, 1, 3000.00),
    ('Corsair Vengeance LPX 16GB', 10, 1, 2, 300.00),
    ('AMD Ryzen 5 3600', 2, 2, 1, 800.00),
    ('Gigabyte Z390 Aorus Ultra', 9, 2, 1, 1100.00),
    ('Samsung 970 EVO Plus 1TB', 19, 2, 1, 200.00);








