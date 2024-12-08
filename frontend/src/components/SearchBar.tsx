import React, { useState } from 'react';
import { createLocation } from '../../api/locationService';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      await createLocation(query);
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Szukaj adresu..."
      />
      <button type="submit">
        Szukaj
      </button>
    </form>
  );
};

export default SearchBar;
