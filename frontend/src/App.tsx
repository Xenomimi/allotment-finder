import React, { useState } from 'react';
import './App.css';
import Map from './components/Map';
import SearchHistory from './components/SearchHistory';
import SearchBar from './components/SearchBar';
import Papa from 'papaparse';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addMultipleLocations } from '../redux/locationSlice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  
  // Pobierz istniejące lokalizacje z Redux
  const locations = useAppSelector((state) => state.locations.locations);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
  
    if (fileExtension === 'csv') {
      Papa.parse<string[]>(file, {
        complete: (results: Papa.ParseResult<string[]>) => {
          let addresses = results.data.flat().map(addr => addr.trim()).filter(Boolean);
          addresses = Array.from(new Set(addresses));
          searchMultipleAddresses(addresses);
        },
        error: (err: Error) => {
          console.error('Błąd podczas parsowania pliku CSV:', err);
        },
      });
    } else if (fileExtension === 'txt') {
      const reader = new FileReader();
      reader.onload = (e) => {
        let content = e.target?.result as string;
        let addresses = content.split('\n').map((line) => line.trim()).filter(Boolean);
        addresses = Array.from(new Set(addresses));
        searchMultipleAddresses(addresses);
      };
      reader.readAsText(file);
    } else {
      console.error('Nieobsługiwany format pliku. Użyj pliku CSV lub TXT.');
    }
  };

  const handleSearch = (query: string) => {
    setSearchHistory((prev) => {
      if (prev.includes(query)) {
        return prev;
      }
      return [query, ...prev];
    });
  
    (window as any).ILITEAPI.searchAddress(query, {
      title: query,
      show: true,
    });
  };

  const searchMultipleAddresses = (addresses: string[]) => {
    // Zbierz aktualnie znane adresy z historii i ze stanu Redux
    const knownAddresses = new Set([...searchHistory, ...locations.map(loc => loc.locationName)]);
    
    // Wyfiltrowanie tylko tych adresów, które nie istnieją jeszcze w "knownAddresses"
    const newAddresses = addresses.filter((address) => !knownAddresses.has(address));

    if (newAddresses.length === 0) {
      return;
    }

    setSearchHistory((prev) => [...newAddresses, ...prev]);

    const searchObjects = newAddresses.map((address) => ({
      search: address,
      opts: {
        title: address,
        show: true,
        layerDesc: "geopard.Adresy"
      },
    }));
    
    (window as any).ILITEAPI.searchManyObjects(searchObjects);
    dispatch(addMultipleLocations(newAddresses));
  };

  const handleSelectHistoryItem = (item: string) => {
    handleSearch(item);
  };

  return (
    <div className="app">
      <div className="app__search">
        <h1>Allotment Finder</h1>
        <SearchBar onSearch={handleSearch} />
        <div>
          <label style={{margin: 10}}>Wyszukiwanie wielu adresów:</label>
          <input type="file" accept=".csv, .txt" onChange={handleFileUpload} name="multipleSearch" />
        </div>
      </div>
      
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
