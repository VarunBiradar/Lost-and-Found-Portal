import { useState } from 'react';
import { submitClaim } from '../services/api';
import './ClaimModal.css';

export default function ClaimModal({ itemId, itemName, onClose, onSuccess }) {
  const [proof, setProof] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!proof.trim()) {
      setError('Please provide proof of ownership');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await submitClaim({ foundItemId: itemId, proof });
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content claim-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Claim Item</h2>
          <button className="modal-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <p className="claim-item-name">
          Claiming: <strong>{itemName}</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Proof of Ownership</label>
            <textarea
              className="form-input"
              placeholder="Describe how you can prove this item belongs to you. Include details like purchase date, unique markings, contents, etc."
              value={proof}
              onChange={(e) => setProof(e.target.value)}
              rows={5}
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Claim'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
