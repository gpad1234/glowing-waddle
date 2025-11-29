import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AIInsights.css';

const AIInsights = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/ai/insights');
      setInsights(response.data.insights);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch insights');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-insights-container">
      <div className="ai-insights-header">
        <h2>🤖 AI-Powered Business Insights</h2>
        <button onClick={fetchInsights} disabled={loading} className="refresh-btn">
          {loading ? 'Analyzing...' : 'Refresh Insights'}
        </button>
      </div>

      {loading && <div className="loading-spinner">Generating insights with AI...</div>}
      {error && <div className="error-message">{error}</div>}

      {insights && (
        <div className="insights-grid">
          {insights.map((insight, idx) => (
            <div key={idx} className="insight-card">
              <div className="insight-title">{insight.title}</div>
              <div className="insight-description">{insight.description}</div>
              {insight.recommendation && (
                <div className="insight-recommendation">
                  <strong>Recommendation:</strong> {insight.recommendation}
                </div>
              )}
              {insight.priority && (
                <div className={`insight-priority priority-${insight.priority.toLowerCase()}`}>
                  Priority: {insight.priority}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIInsights;
