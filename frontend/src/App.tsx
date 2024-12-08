import React, { useState } from 'react';
import './App.css';
import Map from './components/Map';
import SearchHistory from './components/SearchHistory';
import SearchBar from './components/SearchBar';
import Papa from 'papaparse';

const App: React.FC = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
  
    if (fileExtension === 'csv') {
      // Parsowanie pliku CSV przy użyciu papaparse
      Papa.parse<string[]>(file, {
        complete: (results: Papa.ParseResult<string[]>) => {
          const addresses = results.data.flat().filter((row) => row.trim());
          searchMultipleAddresses(addresses);
        },
        error: (err: Error) => {
          console.error('Błąd podczas parsowania pliku CSV:', err);
        },
      });
    } else if (fileExtension === 'txt') {
      // Odczyt pliku TXT
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const addresses = content.split('\n').map((line) => line.trim()).filter(Boolean);
        searchMultipleAddresses(addresses);
      };
      reader.readAsText(file);
    } else {
      console.error('Nieobsługiwany format pliku. Użyj pliku CSV lub TXT.');
    }
  };
  

  const searchMultipleAddresses = (addresses: string[]) => {
    // Tworzenie tablicy obiektów dla searchManyObjects
    const searchObjects = addresses
      .filter((address) => address.trim()) // Usunięcie pustych adresów
      .map((address) => ({
        search: address, // Adres
        opts: {
          title: address, // Tytuł dymka
          show: true, // Wyświetlenie dymka
          layerDesc: "geopard.Adresy", // Możesz dostosować identyfikator warstwy
        },
      }));
  
    if (searchObjects.length > 0) {
      // Wywołanie searchManyObjects
      (window as any).ILITEAPI.searchManyObjects(searchObjects);
  
      // Aktualizacja historii wyszukiwań
      setSearchHistory((prev) => {
        const newHistory = addresses.filter(
          (address) => address.trim() && !prev.includes(address)
        );
        return [...newHistory, ...prev];
      });
    }
  };
  
  const handleSearch = (query: string) => {
    setSearchHistory((poprzednie) => {
      // Sprawdź, czy adres już istnieje w historii
      if (poprzednie.includes(query)) {
        return poprzednie; // Nie dodawaj duplikatu
      }
      return [query, ...poprzednie]; // Dodaj adres na początek listy
    });
  
    // Wyszukaj adres na mapie
    (window as any).ILITEAPI.searchAddress(query, {
      title: query,
      show: true,
    });
  };

  const handleSelectHistoryItem = (item: string) => {
    handleSearch(item);
  };

  return (
    <div className="app">
      {/* Sekcja nad mapą */}
      <div className="app__search">
        <h1>Allotment Finder</h1>
        <SearchBar onSearch={handleSearch} />
        <div>
          <label style={{margin: 10}}>Wyszkiwanie wielu adresów:</label>
          <input type="file" accept=".csv, .txt" onChange={handleFileUpload} name="multipleSearch" />
        </div>
      </div>
      
      {/* Sekcja mapy i historii wyszukiwań */}
      <div className="app__content">
        <div className="app__map">
          <Map />
        </div>
        <div className="app__history">
          <SearchHistory history={searchHistory} onSelect={handleSelectHistoryItem} />
        </div>
      </div>
    </div>
  );
};

export default App;
