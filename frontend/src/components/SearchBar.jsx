import { useState } from 'react';
import './SearchBar.css';

const CATEGORIES = ['Electronics', 'Documents', 'Accessories', 'Clothing', 'Keys', 'Bags', 'Books', 'Other'];

export default function SearchBar({ onSearch, onCategoryFilter, onTypeFilter, activeType }) {
  const [keyword, setKeyword] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <div className="search-bar glass-card">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-wrapper">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search for items..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="btn btn-primary btn-sm">Search</button>
        </div>
      </form>

      <div className="filter-row">
        <div className="type-filters">
          <button
            className={`filter-btn ${activeType === 'all' ? 'active' : ''}`}
            onClick={() => onTypeFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${activeType === 'lost' ? 'active' : ''}`}
            onClick={() => onTypeFilter('lost')}
          >
            🔴 Lost
          </button>
          <button
            className={`filter-btn ${activeType === 'found' ? 'active' : ''}`}
            onClick={() => onTypeFilter('found')}
          >
            🟢 Found
          </button>
        </div>

        <div className="category-filters">
          <button
            className={`filter-chip ${!onCategoryFilter ? 'active' : ''}`}
            onClick={() => onCategoryFilter('')}
          >
            All Categories
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className="filter-chip"
              onClick={() => onCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
