import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyLostItems, getMyFoundItems, getMyClaims, getClaimsForItem, approveClaim, rejectClaim, updateLostItemStatus } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('lost');
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [claims, setClaims] = useState([]);
  const [itemClaims, setItemClaims] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [lost, found, myClaims] = await Promise.all([
        getMyLostItems(),
        getMyFoundItems(),
        getMyClaims()
      ]);
      setLostItems(lost);
      setFoundItems(found);
      setClaims(myClaims);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadClaimsForItem = async (itemId) => {
    try {
      const claims = await getClaimsForItem(itemId);
      setItemClaims(prev => ({ ...prev, [itemId]: claims }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleApproveClaim = async (claimId) => {
    try {
      await approveClaim(claimId);
      loadData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRejectClaim = async (claimId) => {
    try {
      await rejectClaim(claimId);
      loadData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleMarkFound = async (itemId) => {
    try {
      await updateLostItemStatus(itemId, 'FOUND');
      loadData();
    } catch (err) {
      alert(err.message);
    }
  };

  const tabs = [
    { key: 'lost', label: '🔴 My Lost Items', count: lostItems.length },
    { key: 'found', label: '🟢 My Found Items', count: foundItems.length },
    { key: 'claims', label: '📋 My Claims', count: claims.length },
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="dashboard container">
      <div className="page-header">
        <h1>Welcome, {user?.name}</h1>
        <p>Manage your lost items, found items, and claims</p>
      </div>

      <div className="dashboard-tabs">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            <span className="tab-count">{tab.count}</span>
          </button>
        ))}
      </div>

      <div className="dashboard-content">
        {/* Lost Items Tab */}
        {activeTab === 'lost' && (
          <div className="tab-panel">
            {lostItems.length === 0 ? (
              <div className="empty-state">
                <h3>No lost items reported</h3>
                <p>Report a lost item to start tracking it</p>
                <Link to="/report" className="btn btn-primary" style={{marginTop: '16px'}}>Report Lost Item</Link>
              </div>
            ) : (
              <div className="dashboard-list">
                {lostItems.map(item => (
                  <div key={item.id} className="dashboard-item glass-card">
                    <div className="dashboard-item-info">
                      <h3>{item.itemName}</h3>
                      <p>{item.description}</p>
                      <div className="dashboard-item-meta">
                        <span className="meta-item">📍 {item.location || 'N/A'}</span>
                        <span className="meta-item">📅 {item.lostDate || 'N/A'}</span>
                        <span className={`badge badge-${item.status.toLowerCase()}`}>{item.status}</span>
                      </div>
                    </div>
                    {item.status === 'ACTIVE' && (
                      <button className="btn btn-success btn-sm" onClick={() => handleMarkFound(item.id)}>
                        Mark as Found
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Found Items Tab */}
        {activeTab === 'found' && (
          <div className="tab-panel">
            {foundItems.length === 0 ? (
              <div className="empty-state">
                <h3>No found items reported</h3>
                <p>Report items you've found to help others</p>
                <Link to="/report" className="btn btn-primary" style={{marginTop: '16px'}}>Report Found Item</Link>
              </div>
            ) : (
              <div className="dashboard-list">
                {foundItems.map(item => (
                  <div key={item.id} className="dashboard-item glass-card">
                    <div className="dashboard-item-info">
                      <h3>{item.itemName}</h3>
                      <p>{item.description}</p>
                      <div className="dashboard-item-meta">
                        <span className="meta-item">📍 {item.locationFound || 'N/A'}</span>
                        <span className="meta-item">📅 {item.foundDate || 'N/A'}</span>
                        <span className={`badge badge-${item.status.toLowerCase()}`}>{item.status}</span>
                      </div>
                    </div>
                    <div className="dashboard-item-actions">
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => loadClaimsForItem(item.id)}
                      >
                        View Claims
                      </button>
                    </div>
                    {itemClaims[item.id] && (
                      <div className="item-claims-list">
                        <h4>Claims ({itemClaims[item.id].length})</h4>
                        {itemClaims[item.id].length === 0 ? (
                          <p className="no-claims">No claims yet</p>
                        ) : (
                          itemClaims[item.id].map(claim => (
                            <div key={claim.id} className="claim-entry">
                              <div className="claim-info">
                                <strong>{claim.claimantName}</strong>
                                <p>{claim.proof}</p>
                                <span className={`badge badge-${claim.status.toLowerCase()}`}>{claim.status}</span>
                              </div>
                              {claim.status === 'PENDING' && (
                                <div className="claim-actions">
                                  <button className="btn btn-success btn-sm" onClick={() => handleApproveClaim(claim.id)}>
                                    Approve
                                  </button>
                                  <button className="btn btn-danger btn-sm" onClick={() => handleRejectClaim(claim.id)}>
                                    Reject
                                  </button>
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Claims Tab */}
        {activeTab === 'claims' && (
          <div className="tab-panel">
            {claims.length === 0 ? (
              <div className="empty-state">
                <h3>No claims submitted</h3>
                <p>Browse found items to submit a claim</p>
                <Link to="/browse" className="btn btn-primary" style={{marginTop: '16px'}}>Browse Items</Link>
              </div>
            ) : (
              <div className="dashboard-list">
                {claims.map(claim => (
                  <div key={claim.id} className="dashboard-item glass-card">
                    <div className="dashboard-item-info">
                      <h3>Claim for: {claim.foundItemName}</h3>
                      <p><strong>Proof:</strong> {claim.proof}</p>
                      <div className="dashboard-item-meta">
                        <span className={`badge badge-${claim.status.toLowerCase()}`}>{claim.status}</span>
                        <span className="meta-item">Submitted: {new Date(claim.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
