import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reportLostItem, reportFoundItem } from '../services/api';
import './ReportItem.css';

const CATEGORIES = ['Electronics', 'Documents', 'Accessories', 'Clothing', 'Keys', 'Bags', 'Books', 'Other'];

export default function ReportItem() {
  const [type, setType] = useState('lost');
  const [form, setForm] = useState({
    itemName: '', description: '', category: '', location: '', date: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (type === 'lost') {
        await reportLostItem({
          itemName: form.itemName,
          description: form.description,
          category: form.category,
          location: form.location,
          lostDate: form.date || null,
        });
      } else {
        await reportFoundItem({
          itemName: form.itemName,
          description: form.description,
          category: form.category,
          locationFound: form.location,
          foundDate: form.date || null,
        });
      }
      setSuccess(`Item reported successfully!`);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-page">
      <div className="container">
        <div className="page-header">
          <h1>Report an Item</h1>
          <p>Help the community by reporting a lost or found item</p>
        </div>

        <div className="report-card glass-card">
          {/* Type Toggle */}
          <div className="type-toggle">
            <button
              className={`toggle-btn ${type === 'lost' ? 'active lost' : ''}`}
              onClick={() => setType('lost')}
            >
              <span className="toggle-icon">🔴</span>
              I Lost Something
            </button>
            <button
              className={`toggle-btn ${type === 'found' ? 'active found' : ''}`}
              onClick={() => setType('found')}
            >
              <span className="toggle-icon">🟢</span>
              I Found Something
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="itemName">Item Name *</label>
                <input
                  id="itemName"
                  name="itemName"
                  type="text"
                  className="form-input"
                  placeholder="e.g., Blue Wallet, iPhone 14, Silver Keys"
                  value={form.itemName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  className="form-input"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className="form-input"
                placeholder="Provide detailed description of the item including color, brand, distinguishing features..."
                value={form.description}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location">
                  {type === 'lost' ? 'Last Seen Location' : 'Location Found'}
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  className="form-input"
                  placeholder="e.g., Library, Cafeteria, Room 204"
                  value={form.location}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="date">
                  {type === 'lost' ? 'Date Lost' : 'Date Found'}
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  className="form-input"
                  value={form.date}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && <p className="form-error">{error}</p>}
            {success && (
              <p className="form-success">{success}</p>
            )}

            <button type="submit" className="btn btn-primary btn-lg report-submit" disabled={loading}>
              {loading ? 'Submitting...' : `Report ${type === 'lost' ? 'Lost' : 'Found'} Item`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
