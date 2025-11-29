import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/SentimentAnalysis.css';

const SentimentAnalysis = ({ customerId }) => {
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (customerId) {
      fetchSentiment();
    }
  }, [customerId]);

  const fetchSentiment = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/analytics/sentiment/${customerId}`
      );
      setSentiment(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching sentiment analysis');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Analyzing sentiment...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!sentiment) return <div className="error">No sentiment data available</div>;

  return (
    <div className="sentiment-analysis">
      <h3>📊 Sentiment Analysis</h3>

      {sentiment.totalAnalyzed === 0 ? (
        <p className="no-data">No activities to analyze</p>
      ) : (
        <div className="sentiment-container">
          <div className="sentiment-summary">
            <div className={`sentiment-indicator ${sentiment.overallSentiment}`}>
              <div className="sentiment-value">
                {sentiment.overallSentiment.charAt(0).toUpperCase() +
                  sentiment.overallSentiment.slice(1)}
              </div>
              <div className="sentiment-score">{sentiment.averageScore.toFixed(2)}</div>
            </div>
            <div className="sentiment-stats">
              <p>
                <strong>Analyzed:</strong> {sentiment.totalAnalyzed} activities
              </p>
              <p>
                <strong>Average Score:</strong> {sentiment.averageScore.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="sentiment-details">
            {sentiment.sentiments.slice(0, 5).map((item, idx) => (
              <div key={idx} className={`sentiment-item sentiment-${item.sentiment}`}>
                <div className="sentiment-badge">{item.sentiment.charAt(0).toUpperCase()}</div>
                <div className="sentiment-text">
                  <p className="text">{item.text}</p>
                  <span className="score">Score: {item.score}</span>
                </div>
              </div>
            ))}
          </div>

          {sentiment.sentiments.length > 5 && (
            <p className="more-info">... and {sentiment.sentiments.length - 5} more activities</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SentimentAnalysis;
