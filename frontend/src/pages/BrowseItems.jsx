import { useState, useEffect, useCallback } from 'react';
import { getLostItems, getFoundItems, searchLostItems, searchFoundItems, getLostItemsByCategory, getFoundItemsByCategory } from '../services/api';
import SearchBar from '../components/SearchBar';
import ItemCard from '../components/ItemCard';
import './BrowseItems.css';

export default function BrowseItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      let lostItems = [];
      let foundItems = [];

      if (activeType === 'all' || activeType === 'lost') {
        lostItems = await getLostItems();
      }
      if (activeType === 'all' || activeType === 'found') {
        foundItems = await getFoundItems();
      }

      const combined = [
        ...lostItems.map(i => ({ ...i, _type: 'lost' })),
        ...foundItems.map(i => ({ ...i, _type: 'found' })),
      ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setItems(combined);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [activeType]);

  useEffect(() => {
    if (!searchKeyword) {
      loadItems();
    }
  }, [loadItems, searchKeyword]);

  const handleSearch = async (keyword) => {
    setSearchKeyword(keyword);
    if (!keyword.trim()) {
      loadItems();
      return;
    }

    setLoading(true);
    try {
      let lostItems = [];
      let foundItems = [];

      if (activeType === 'all' || activeType === 'lost') {
        lostItems = await searchLostItems(keyword);
      }
      if (activeType === 'all' || activeType === 'found') {
        foundItems = await searchFoundItems(keyword);
      }

      const combined = [
        ...lostItems.map(i => ({ ...i, _type: 'lost' })),
        ...foundItems.map(i => ({ ...i, _type: 'found' })),
      ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setItems(combined);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = async (category) => {
    if (!category) {
      loadItems();
      return;
    }

    setLoading(true);
    try {
      let lostItems = [];
      let foundItems = [];

      if (activeType === 'all' || activeType === 'lost') {
        lostItems = await getLostItemsByCategory(category);
      }
      if (activeType === 'all' || activeType === 'found') {
        foundItems = await getFoundItemsByCategory(category);
      }

      const combined = [
        ...lostItems.map(i => ({ ...i, _type: 'lost' })),
        ...foundItems.map(i => ({ ...i, _type: 'found' })),
      ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setItems(combined);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeFilter = (type) => {
    setActiveType(type);
    setSearchKeyword('');
  };

  return (
    <div className="browse-page container">
      <div className="page-header">
        <h1>Browse Items</h1>
        <p>Search through lost and found items to find what you're looking for</p>
      </div>

      <SearchBar
        onSearch={handleSearch}
        onCategoryFilter={handleCategoryFilter}
        onTypeFilter={handleTypeFilter}
        activeType={activeType}
      />

      {loading ? (
        <div className="loading-container">
          <div className="spinner" />
        </div>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <h3>No items found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      ) : (
        <>
          <p className="results-count">{items.length} item{items.length !== 1 ? 's' : ''} found</p>
          <div className="items-grid">
            {items.map(item => (
              <ItemCard key={`${item._type}-${item.id}`} item={item} type={item._type} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
