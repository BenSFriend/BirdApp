import React from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ searchMode, setSearchMode, searchTerm, setSearchTerm }) => {
  return (
    <>
      <div className="search-toggle">
        <button
          onClick={() => setSearchMode(!searchMode)}
          className={`search-button ${searchMode ? 'active' : ''}`}
        >
          <Search size={20} />
        </button>
      </div>

      {searchMode && (
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search birds..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      )}
    </>
  );
};

export default SearchBar;