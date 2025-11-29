import React, { useState } from 'react';
import axios from 'axios';
import '../styles/SalesCoaching.css';

const SalesCoaching = ({ customers }) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [coaching, setCoaching] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCoaching = async (customerId) => {
    if (!customerId) {
      setError('Please select a customer');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/ai/coaching/${customerId}`);
      setCoaching(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch coaching');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sales-coaching-container">
      <div className="coaching-header">
        <h2>👥 Personalized Sales Coaching</h2>
        <p>Get AI-powered coaching tailored to each customer relationship</p>
      </div>

      <div className="coaching-selector">
        <select
          value={selectedCustomerId}
          onChange={(e) => setSelectedCustomerId(e.target.value)}
          className="customer-select"
        >
          <option value="">-- Select a Customer --</option>
          {customers && customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.company})
            </option>
          ))}
        </select>
        <button onClick={() => fetchCoaching(selectedCustomerId)} disabled={loading}>
          {loading ? 'Generating...' : 'Get Coaching'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {coaching && (
        <div className="coaching-content">
          <div className="coaching-customer">
            <h3>{coaching.customerName}</h3>
            <p className="coaching-meta">{coaching.relationshipStage} • {coaching.dealCount} Active Deals</p>
          </div>

          <div className="coaching-sections">
            {coaching.strengths && (
              <div className="coaching-section strengths">
                <h4>💪 Strengths</h4>
                <ul>
                  {coaching.strengths.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            )}

            {coaching.opportunities && (
              <div className="coaching-section opportunities">
                <h4>🎯 Opportunities</h4>
                <ul>
                  {coaching.opportunities.map((o, i) => <li key={i}>{o}</li>)}
                </ul>
              </div>
            )}

            {coaching.nextSteps && (
              <div className="coaching-section actions">
                <h4>📋 Next Steps</h4>
                <ol>
                  {coaching.nextSteps.map((step, i) => <li key={i}>{step}</li>)}
                </ol>
              </div>
            )}

            {coaching.coachingTips && (
              <div className="coaching-section tips">
                <h4>💡 Coaching Tips</h4>
                <p>{coaching.coachingTips}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesCoaching;
