import { Link } from 'react-router-dom';
import './ItemCard.css';

const categoryIcons = {
  Electronics: '📱',
  Documents: '📄',
  Accessories: '⌚',
  Clothing: '👕',
  Keys: '🔑',
  Bags: '🎒',
  Books: '📚',
  Other: '📦',
};

export default function ItemCard({ item, type }) {
  const isLost = type === 'lost';
  const linkTo = `/item/${type}/${item.id}`;
  const statusClass = item.status.toLowerCase();

  return (
    <Link to={linkTo} className="item-card glass-card">
      <div className="item-card-header">
        <div className="item-icon">
          {categoryIcons[item.category] || '📦'}
        </div>
        <div className="item-badges">
          <span className={`badge badge-${isLost ? 'lost' : 'active'}`}>
            {isLost ? '🔴 Lost' : '🟢 Found'}
          </span>
          <span className={`badge badge-${statusClass}`}>
            {item.status}
          </span>
        </div>
      </div>
      
      <h3 className="item-title">{item.itemName}</h3>
      
      <p className="item-description">
        {item.description
          ? item.description.length > 100
            ? item.description.substring(0, 100) + '...'
            : item.description
          : 'No description provided'}
      </p>

      <div className="item-meta">
        <div className="meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span>{(isLost ? item.location : item.locationFound) || 'Unknown'}</span>
        </div>
        <div className="meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <span>{(isLost ? item.lostDate : item.foundDate) || 'Not specified'}</span>
        </div>
      </div>

      <div className="item-footer">
        <span className="item-category">{item.category}</span>
        <span className="item-user">by {item.userName}</span>
      </div>
    </Link>
  );
}
