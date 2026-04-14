import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <span className="brand-text">
            Lost<span className="brand-accent">&</span>Found
          </span>
        </Link>

        <div className="navbar-links">
          <Link to="/browse" className="nav-link">Browse</Link>
          {user ? (
            <>
              <Link to="/report" className="nav-link">Report Item</Link>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <div className="nav-user">
                <div className="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="user-name">{user.name}</span>
                <button onClick={handleLogout} className="btn btn-sm btn-secondary">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="nav-auth">
              <Link to="/login" className="btn btn-sm btn-secondary">Login</Link>
              <Link to="/register" className="btn btn-sm btn-primary">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
