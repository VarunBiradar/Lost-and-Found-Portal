import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="brand-text">
            Lost<span className="brand-accent">&</span>Found Portal
          </span>
          <p className="footer-tagline">Connecting people with their lost belongings</p>
        </div>
        <div className="footer-links">
          <a href="/browse">Browse Items</a>
          <a href="/report">Report Item</a>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Lost & Found Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
