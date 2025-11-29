import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CustomerIntelligence.css';

const CustomerIntelligence = ({ customers }) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [intelligence, setIntelligence] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchIntelligence = async (customerId) => {
    if (!customerId) {
      setError('Please select a customer');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/ai/customer-intelligence/${customerId}`);
      setIntelligence(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch customer intelligence');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customer-intelligence-container">
      <div className="intelligence-header">
        <h2>🔍 Customer Intelligence Report</h2>
        <p>Deep AI analysis of customer profiles, buying signals, and opportunities</p>
      </div>

      <div className="intelligence-selector">
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
        <button onClick={() => fetchIntelligence(selectedCustomerId)} disabled={loading}>
          {loading ? 'Analyzing...' : 'Generate Report'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {intelligence && (
        <div className="intelligence-report">
          <div className="report-header">
            <h3>{intelligence.customerName}</h3>
            <p className="company-info">{intelligence.company}</p>
          </div>

          <div className="intelligence-sections">
            {intelligence.buyingSignals && (
              <section className="intel-section buying-signals">
                <h4>📈 Buying Signals</h4>
                <div className="signal-items">
                  {intelligence.buyingSignals.map((signal, i) => (
                    <div key={i} className="signal-item">
                      <span className="signal-indicator">●</span>
                      <span>{signal}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {intelligence.decisionMakers && (
              <section className="intel-section decision-makers">
                <h4>👥 Key Decision Makers</h4>
                <ul className="decision-makers-list">
                  {intelligence.decisionMakers.map((dm, i) => (
                    <li key={i}>{dm}</li>
                  ))}
                </ul>
              </section>
            )}

            {intelligence.competitionRisk && (
              <section className="intel-section competition">
                <h4>⚔️ Competition Risk</h4>
                <p className="risk-assessment">{intelligence.competitionRisk}</p>
              </section>
            )}

            {intelligence.upsellOpportunities && (
              <section className="intel-section upsell">
                <h4>💰 Upsell Opportunities</h4>
                <ul className="opportunities-list">
                  {intelligence.upsellOpportunities.map((opp, i) => (
                    <li key={i}>{opp}</li>
                  ))}
                </ul>
              </section>
            )}

            {intelligence.engagementStrategy && (
              <section className="intel-section strategy">
                <h4>🎯 Recommended Engagement Strategy</h4>
                <p className="strategy-text">{intelligence.engagementStrategy}</p>
              </section>
            )}

            {intelligence.nextActions && (
              <section className="intel-section actions">
                <h4>📋 Next Actions</h4>
                <ol className="actions-list">
                  {intelligence.nextActions.map((action, i) => (
                    <li key={i}>{action}</li>
                  ))}
                </ol>
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerIntelligence;
