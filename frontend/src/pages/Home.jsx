import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStats, getLostItems, getFoundItems } from '../services/api';
import ItemCard from '../components/ItemCard';
import './Home.css';

export default function Home() {
  const [stats, setStats] = useState(null);
  const [recentLost, setRecentLost] = useState([]);
  const [recentFound, setRecentFound] = useState([]);

  useEffect(() => {
    getStats().then(setStats).catch(() => {});
    getLostItems().then(items => setRecentLost(items.slice(0, 3))).catch(() => {});
    getFoundItems().then(items => setRecentFound(items.slice(0, 3))).catch(() => {});
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-shapes">
          <div className="shape shape-1" />
          <div className="shape shape-2" />
          <div className="shape shape-3" />
        </div>
        <div className="container hero-content">
          <div className="hero-badge animate-in">
            <span className="pulse-dot" />
            Centralized Lost & Found Platform
          </div>
          <h1 className="hero-title animate-in">
            Lost Something?<br />
            <span className="gradient-text">We Help You Find It</span>
          </h1>
          <p className="hero-subtitle animate-in">
            Report lost items, browse found belongings, and submit claims to recover 
            what's yours. A digital platform connecting people with their lost items.
          </p>
          <div className="hero-actions animate-in">
            <Link to="/report" className="btn btn-primary btn-lg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Report an Item
            </Link>
            <Link to="/browse" className="btn btn-secondary btn-lg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              Browse Items
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {stats && (
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-card glass-card">
                <div className="stat-icon stat-icon-red">🔴</div>
                <div className="stat-value">{stats.activeLostItems}</div>
                <div className="stat-label">Active Lost Items</div>
              </div>
              <div className="stat-card glass-card">
                <div className="stat-icon stat-icon-green">🟢</div>
                <div className="stat-value">{stats.unclaimedFoundItems}</div>
                <div className="stat-label">Unclaimed Found Items</div>
              </div>
              <div className="stat-card glass-card">
                <div className="stat-icon stat-icon-amber">⏳</div>
                <div className="stat-value">{stats.pendingClaims}</div>
                <div className="stat-label">Pending Claims</div>
              </div>
              <div className="stat-card glass-card">
                <div className="stat-icon stat-icon-cyan">✅</div>
                <div className="stat-value">{stats.resolvedItems}</div>
                <div className="stat-label">Items Resolved</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Three simple steps to recover your lost belongings</p>
          <div className="steps-grid">
            <div className="step-card glass-card">
              <div className="step-number">01</div>
              <h3>Report</h3>
              <p>Report your lost or found item with details like name, category, location, and date.</p>
            </div>
            <div className="step-card glass-card">
              <div className="step-number">02</div>
              <h3>Search</h3>
              <p>Browse through reported items, search by keywords, and filter by categories.</p>
            </div>
            <div className="step-card glass-card">
              <div className="step-number">03</div>
              <h3>Claim</h3>
              <p>Submit a claim with proof of ownership. The finder verifies and approves your claim.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Items */}
      {(recentLost.length > 0 || recentFound.length > 0) && (
        <section className="recent-items">
          <div className="container">
            {recentLost.length > 0 && (
              <>
                <div className="section-header">
                  <h2 className="section-title">Recently Lost</h2>
                  <Link to="/browse" className="btn btn-secondary btn-sm">View All →</Link>
                </div>
                <div className="items-grid">
                  {recentLost.map(item => (
                    <ItemCard key={item.id} item={item} type="lost" />
                  ))}
                </div>
              </>
            )}
            {recentFound.length > 0 && (
              <>
                <div className="section-header">
                  <h2 className="section-title">Recently Found</h2>
                  <Link to="/browse" className="btn btn-secondary btn-sm">View All →</Link>
                </div>
                <div className="items-grid">
                  {recentFound.map(item => (
                    <ItemCard key={item.id} item={item} type="found" />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
