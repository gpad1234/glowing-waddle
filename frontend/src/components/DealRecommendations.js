import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/DealRecommendations.css';

const DealRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/analytics/deal-recommendations');
      setRecommendations(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching recommendations');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading recommendations...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="deal-recommendations">
      <h2>🎯 AI Deal Recommendations</h2>

      {recommendations.length === 0 ? (
        <div className="no-data">No recommendations at this time</div>
      ) : (
        <div className="recommendations-list">
          {recommendations.map((rec, idx) => (
            <div key={idx} className={`recommendation-group priority-${rec.priority}`}>
              <div className="rec-header">
                <h3>{rec.title}</h3>
                <span className={`priority-badge ${rec.priority}`}>{rec.priority.toUpperCase()}</span>
              </div>
              <p className="rec-message">{rec.message}</p>

              <div className="deals-list">
                {rec.deals.map((deal) => (
                  <div key={deal.id} className="deal-item">
                    <div className="deal-info">
                      <h4>{deal.title}</h4>
                      <p className="customer">{deal.customerName}</p>
                    </div>
                    <div className="deal-stats">
                      <div className="stat">
                        <span className="label">Value:</span>
                        <span className="value">${(deal.value || 0).toLocaleString()}</span>
                      </div>
                      <div className="stat">
                        <span className="label">Probability:</span>
                        <span className="value">{deal.probability}%</span>
                      </div>
                      <div className="stat">
                        <span className="label">Stage:</span>
                        <span className={`value stage-${deal.stage}`}>{deal.stage}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DealRecommendations;
