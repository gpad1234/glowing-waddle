import React, { useState } from 'react';
import axios from 'axios';
import '../styles/DealRiskAnalyzer.css';

const DealRiskAnalyzer = ({ deals }) => {
  const [selectedDealId, setSelectedDealId] = useState('');
  const [riskAnalysis, setRiskAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRiskAnalysis = async (dealId) => {
    if (!dealId) {
      setError('Please select a deal');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/ai/deal-risk/${dealId}`);
      setRiskAnalysis(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze deal risk');
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'high':
        return 'risk-high';
      case 'medium':
        return 'risk-medium';
      case 'low':
        return 'risk-low';
      default:
        return 'risk-unknown';
    }
  };

  return (
    <div className="deal-risk-analyzer-container">
      <div className="analyzer-header">
        <h2>⚠️ Deal Risk Analyzer</h2>
        <p>AI-powered risk assessment for your deals</p>
      </div>

      <div className="analyzer-selector">
        <select
          value={selectedDealId}
          onChange={(e) => setSelectedDealId(e.target.value)}
          className="deal-select"
        >
          <option value="">-- Select a Deal --</option>
          {deals && deals.map((d) => (
            <option key={d.id} value={d.id}>
              {d.title} (${d.value}) - {d.stage}
            </option>
          ))}
        </select>
        <button onClick={() => fetchRiskAnalysis(selectedDealId)} disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze Risk'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {riskAnalysis && (
        <div className="risk-analysis-content">
          <div className="risk-header">
            <h3>{riskAnalysis.dealTitle}</h3>
            <div className={`risk-level-badge ${getRiskColor(riskAnalysis.riskLevel)}`}>
              {riskAnalysis.riskLevel} Risk
            </div>
          </div>

          <div className="risk-score">
            <div className="score-label">Risk Score</div>
            <div className={`score-value ${getRiskColor(riskAnalysis.riskLevel)}`}>
              {riskAnalysis.riskScore}%
            </div>
          </div>

          <div className="risk-sections">
            {riskAnalysis.riskFactors && (
              <div className="risk-section risk-factors">
                <h4>🎯 Risk Factors</h4>
                <ul>
                  {riskAnalysis.riskFactors.map((factor, i) => (
                    <li key={i}>{factor}</li>
                  ))}
                </ul>
              </div>
            )}

            {riskAnalysis.warnings && (
              <div className="risk-section warnings">
                <h4>⚠️ Warnings</h4>
                <ul className="warning-list">
                  {riskAnalysis.warnings.map((warning, i) => (
                    <li key={i} className="warning-item">{warning}</li>
                  ))}
                </ul>
              </div>
            )}

            {riskAnalysis.mitigationStrategies && (
              <div className="risk-section mitigation">
                <h4>✅ Mitigation Strategies</h4>
                <ol className="mitigation-list">
                  {riskAnalysis.mitigationStrategies.map((strategy, i) => (
                    <li key={i}>{strategy}</li>
                  ))}
                </ol>
              </div>
            )}

            {riskAnalysis.recommendations && (
              <div className="risk-section recommendations">
                <h4>💡 Recommendations</h4>
                <p>{riskAnalysis.recommendations}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DealRiskAnalyzer;
