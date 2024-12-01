interface SearchHistoryProps {
    history: string[];
    onSelect: (item: string) => void;
  }
  
  const SearchHistory: React.FC<SearchHistoryProps> = ({ history, onSelect }) => (
    <div style={{ textAlign: 'center' }}>
      <h3>Poprzednie wyszukiwania</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {history.map((item, index) => (
          <li key={index} onClick={() => onSelect(item)} style={{ cursor: 'pointer', marginBottom: '5px' }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
  
  export default SearchHistory;