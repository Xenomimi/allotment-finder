import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks'; // Typowane hooki Redux
import {fetchLocations, removeLocation} from '../../redux/locationSlice'; // Akcja usuwania lokalizacji
import './css/SearchHistory.css';

interface SearchHistoryProps {
  history: string[];
  onSelect: (item: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ history, onSelect }) => {
  const locations = useAppSelector((state) => state.locations.locations); // Pobieramy lokalizacje ze stanu Redux
  const dispatch = useAppDispatch(); // Hook do wysyłania akcji Redux

  const handleDelete = (id: string) => {
    dispatch(removeLocation(id)); // Wywołanie akcji usuwania
  };

  useEffect(()=>{
    dispatch(fetchLocations());
  }, [dispatch, locations]);

  return (
    <div className="search-history">
      <h3>Historia wyszukiwań</h3>
      <ul className="search-history__list">
        {locations.map((location) => (
          <li key={location._id} className="search-history__item">
            <span>{location.locationName}</span>
            <div className="search-history__buttons">
              <button
                onClick={() => onSelect(location.locationName)}
                className="search-history__button search-history__button--select"
              >
                Wybierz
              </button>
              <button
                onClick={() => handleDelete(location._id)}
                className="search-history__button search-history__button--delete"
              >
                Usuń
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
