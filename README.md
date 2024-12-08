
# Projekt: Aplikacja do Wyszukiwania Lokalizacji na Mapie

Aplikacja umożliwia wyszukiwanie adresów oraz ich wizualizację na mapie. Obsługuje jednoczesne wyszukiwanie wielu lokalizacji na podstawie danych z plików CSV/TXT oraz dodawanie wyników do historii wyszukiwań. Backend zarządza historią wyszukiwań, a frontend umożliwia interakcję z mapą i użytkownikiem.

---

## Funkcjonalności

- Wyszukiwanie pojedynczych i wielu adresów na mapie.
- Obsługa plików CSV i TXT do wyszukiwania wielu lokalizacji.
- Dodawanie wyników do historii wyszukiwań.
- Usuwanie zapisanych lokalizacji z historii.
- Wyświetlanie wyników na mapie z dynamicznie generowanymi markerami.

---

## Wymagania

### Frontend:
- Node.js (>= 14.x)
- NPM lub Yarn
- Wtyczka iMapLite API (`imapLiteApi-core.js` i `imapLiteApi-coreEx.js`)

### Backend:
- Node.js (>= 14.x)
- NPM
- Baza danych (np. MongoDB)

---

## Instrukcja Uruchomienia

### 1. Klonowanie Repozytorium
```bash
git clone https://github.com/Xenomimi/allotment-finder.git
cd allotment-finder
```

---

### 2. Uruchomienie Frontendu

#### 2.1 Instalacja Zależności
Przejdź do folderu frontend:
```bash
cd frontend
npm install
```

#### 2.2 Uruchomienie Aplikacji
```bash
npm run dev
```

Domyślnie aplikacja będzie działać pod adresem: `http://localhost:5173`.

---

### 3. Uruchomienie Backend

#### 3.1 Instalacja Zależności
Przejdź do folderu backend:
```bash
cd backend
npm install
```

#### 3.2 Konfiguracja
Skopiuj plik link do bazdy mongoDB i uzupełnij dane dostępu do bazy danych w pliku `index.ts`:
```typescript
await mongoose.connect('__TUTAJ_LINK_DO_BAZY_MONGODB__');
```

#### 3.3 Uruchomienie Serwera
```bash
npm start
```

Domyślnie backend będzie działać pod adresem: `http://localhost:5000`.

---

## Struktura Projektu

### Frontend
- **`src`**: Zawiera kod aplikacji frontendowej.
- **`public`**: Pliki statyczne, w tym konfiguracja mapy i API.

### Backend
- **`routes`**: Endpointy API dla wyszukiwań i historii.
- **`models`**: Schematy bazy danych (np. historia wyszukiwań).
- **`controllers`**: Logika aplikacji backendowej.

---

## Używane Technologie

- **Frontend**:
  - React z TypeScript
  - Vite
  - iMapLite API
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB

---

## Przykład Plików Obsługiwanych przez Frontend

### CSV (`addresses.csv`)
```csv
Rzeszów, Rynek 1
Rzeszów, Marszałkowska 10
Rzeszów, Piłsudskiego 15
```

### TXT (`addresses.txt`)
```
Rzeszów, Rynek 1
Rzeszów, Marszałkowska 10
Rzeszów, Piłsudskiego 15
```

---

## Autorzy

- Michał Biesiadecki
- Filip Liszcz [Github](https://github.com/RybaLP)

