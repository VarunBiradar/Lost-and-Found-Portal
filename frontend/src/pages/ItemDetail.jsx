import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLostItem, getFoundItem } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ClaimModal from '../components/ClaimModal';
import './ItemDetail.css';

const categoryIcons = {
  Electronics: '📱', Documents: '📄', Accessories: '⌚',
  Clothing: '👕', Keys: '🔑', Bags: '🎒', Books: '📚', Other: '📦',
};

export default function ItemDetail() {
  const { type, id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showClaim, setShowClaim] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = type === 'lost'
          ? await getLostItem(id)
          : await getFoundItem(id);
        setItem(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [type, id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container">
        <div className="empty-state">
          <h3>Item not found</h3>
          <button className="btn btn-primary" onClick={() => navigate('/browse')}>
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  const isLost = type === 'lost';
  const isOwner = user && user.id === item.userId;
  const canClaim = !isLost && user && !isOwner && item.status === 'UNCLAIMED';

  return (
    <div className="item-detail-page container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back
      </button>

      <div className="detail-layout">
        {/* Main Info */}
        <div className="detail-main glass-card">
          <div className="detail-header">
            <div className="detail-icon">
              {categoryIcons[item.category] || '📦'}
            </div>
            <div>
              <div className="detail-badges">
                <span className={`badge badge-${isLost ? 'lost' : 'active'}`}>
                  {isLost ? '🔴 Lost Item' : '🟢 Found Item'}
                </span>
                <span className={`badge badge-${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </div>
              <h1 className="detail-title">{item.itemName}</h1>
            </div>
          </div>

          <div className="detail-description">
            <h3>Description</h3>
            <p>{item.description || 'No description provided.'}</p>
          </div>

          <div className="detail-grid">
            <div className="detail-field">
              <span className="field-label">Category</span>
              <span className="field-value">{item.category}</span>
            </div>
            <div className="detail-field">
              <span className="field-label">{isLost ? 'Last Seen' : 'Found At'}</span>
              <span className="field-value">
                {(isLost ? item.location : item.locationFound) || 'Not specified'}
              </span>
            </div>
            <div className="detail-field">
              <span className="field-label">{isLost ? 'Date Lost' : 'Date Found'}</span>
              <span className="field-value">
                {(isLost ? item.lostDate : item.foundDate) || 'Not specified'}
              </span>
            </div>
            <div className="detail-field">
              <span className="field-label">Reported On</span>
              <span className="field-value">
                {new Date(item.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="detail-sidebar">
          <div className="sidebar-card glass-card">
            <h3>Reported By</h3>
            <div className="reporter-info">
              <div className="reporter-avatar">
                {item.userName.charAt(0).toUpperCase()}
              </div>
              <span className="reporter-name">{item.userName}</span>
            </div>
          </div>

          {canClaim && (
            <div className="sidebar-card glass-card claim-cta">
              <h3>Is this yours?</h3>
              <p>Submit a claim with proof of ownership to recover this item.</p>
              <button
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
                onClick={() => setShowClaim(true)}
              >
                Submit Claim
              </button>
            </div>
          )}

          {!user && !isLost && (
            <div className="sidebar-card glass-card">
              <h3>Want to claim this?</h3>
              <p>You need to be logged in to submit a claim.</p>
              <button
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={() => navigate('/login')}
              >
                Login to Claim
              </button>
            </div>
          )}

          {isOwner && (
            <div className="sidebar-card glass-card">
              <p className="owner-note">✨ You reported this item</p>
            </div>
          )}
        </div>
      </div>

      {showClaim && (
        <ClaimModal
          itemId={item.id}
          itemName={item.itemName}
          onClose={() => setShowClaim(false)}
          onSuccess={() => {
            setShowClaim(false);
            navigate('/dashboard');
          }}
        />
      )}
    </div>
  );
}
