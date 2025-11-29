import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Analytics.css';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/analytics/dashboard');
      setAnalytics(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching analytics');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading analytics...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!analytics) return <div className="error">No analytics data available</div>;

  return (
    <div className="analytics-dashboard">
      <h2>Advanced Analytics & Insights</h2>

      {/* Key Metrics */}
      <div className="metrics-section">
        <h3>Key Performance Indicators</h3>
        <div className="metrics-grid">
          <MetricCard
            title="Total Revenue"
            value={`$${analytics.sales.totalValue?.toLocaleString() || 0}`}
            icon="💵"
            trend="up"
          />
          <MetricCard
            title="Win Rate"
            value={`${analytics.sales.winRate}%`}
            icon="🎯"
            trend={analytics.sales.winRate > 50 ? 'up' : 'down'}
          />
          <MetricCard
            title="Active Customers"
            value={analytics.overview.activeCustomers}
            icon="👥"
          />
          <MetricCard
            title="Activity Completion"
            value={`${analytics.activities.completionRate}%`}
            icon="✅"
          />
        </div>
      </div>

      {/* Sales Pipeline */}
      <div className="pipeline-section">
        <h3>Sales Pipeline Analysis</h3>
        <div className="pipeline-grid">
          {analytics.sales.pipeline.map((stage) => (
            <div key={stage.stage} className="pipeline-stage">
              <div className="stage-name">{stage.stage}</div>
              <div className="stage-count">{stage.count} deals</div>
              <div className="stage-value">${(stage.value || 0).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* AI-Generated Insights */}
      <div className="insights-section">
        <h3>🤖 AI-Powered Insights</h3>
        <div className="insights-container">
          {analytics.insights && analytics.insights.length > 0 ? (
            analytics.insights.map((insight, idx) => (
              <InsightCard key={idx} insight={insight} />
            ))
          ) : (
            <p className="no-data">No insights available yet</p>
          )}
        </div>
      </div>

      {/* Activities Breakdown */}
      <div className="activities-breakdown">
        <h3>Activity Breakdown</h3>
        <div className="breakdown-grid">
          {analytics.activities.byType.map((activity) => (
            <div key={activity.type} className="activity-type">
              <div className="type-label">{activity.type}</div>
              <div className="type-count">{activity.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Customers by Value */}
      <div className="top-customers-section">
        <h3>Top Customers by Revenue</h3>
        <table className="top-customers-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Deal Count</th>
              <th>Total Value</th>
              <th>Contacts</th>
            </tr>
          </thead>
          <tbody>
            {analytics.customers.topByValue.slice(0, 10).map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.dealCount || 0}</td>
                <td>${(customer.totalValue || 0).toLocaleString()}</td>
                <td>{customer.contactCount || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Stats */}
      <div className="summary-stats">
        <div className="stat">
          <strong>Total Deals:</strong> {analytics.sales.totalDeals}
        </div>
        <div className="stat">
          <strong>Closed Won:</strong> {analytics.sales.closedWon}
        </div>
        <div className="stat">
          <strong>In Progress:</strong> {analytics.sales.inProgress}
        </div>
        <div className="stat">
          <strong>Avg Deal Size:</strong> ${analytics.sales.averageDealSize?.toLocaleString() || 0}
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, icon, trend }) => (
  <div className={`metric-card ${trend ? 'trend-' + trend : ''}`}>
    <div className="metric-icon">{icon}</div>
    <div className="metric-content">
      <div className="metric-title">{title}</div>
      <div className="metric-value">{value}</div>
    </div>
  </div>
);

const InsightCard = ({ insight }) => (
  <div className={`insight-card insight-${insight.type}`}>
    <div className="insight-header">
      <span className="insight-icon">{insight.icon}</span>
      <h4>{insight.title}</h4>
    </div>
    <p>{insight.message}</p>
  </div>
);

export default AnalyticsDashboard;
