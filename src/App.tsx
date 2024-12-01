import React, { useState } from 'react';
import './App.css';
import Map from './components/Map';
import SearchHistory from './components/SearchHistory';
import SearchBar from './components/SearchBar';

const App: React.FC = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

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
        <SearchBar onSearch={handleSearch} />
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
