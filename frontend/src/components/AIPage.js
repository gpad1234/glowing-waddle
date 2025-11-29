import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AIInsights from './AIInsights';
import SalesCoaching from './SalesCoaching';
import EmailGenerator from './EmailGenerator';
import DealRiskAnalyzer from './DealRiskAnalyzer';
import CustomerIntelligence from './CustomerIntelligence';
import '../styles/AIPage.css';

const AIPage = () => {
  const [customers, setCustomers] = useState([]);
  const [deals, setDeals] = useState([]);
  const [activeTab, setActiveTab] = useState('insights');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [customersRes, dealsRes] = await Promise.all([
        axios.get('/api/customers'),
        axios.get('/api/deals'),
      ]);
      setCustomers(customersRes.data);
      setDeals(dealsRes.data);
    } catch (err) {
      setError('Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="ai-page-loading">Loading AI features...</div>;
  }

  return (
    <div className="ai-page">
      <div className="ai-page-header">
        <h1>🚀 AI-Powered CRM Suite</h1>
        <p>Unlock intelligent insights, personalized coaching, and data-driven decisions with advanced AI analysis</p>
      </div>

      <div className="ai-tabs">
        <button
          className={`ai-tab-btn ${activeTab === 'insights' ? 'active' : ''}`}
          onClick={() => setActiveTab('insights')}
        >
          💡 Insights
        </button>
        <button
          className={`ai-tab-btn ${activeTab === 'coaching' ? 'active' : ''}`}
          onClick={() => setActiveTab('coaching')}
        >
          👥 Coaching
        </button>
        <button
          className={`ai-tab-btn ${activeTab === 'email' ? 'active' : ''}`}
          onClick={() => setActiveTab('email')}
        >
          📧 Email
        </button>
        <button
          className={`ai-tab-btn ${activeTab === 'risk' ? 'active' : ''}`}
          onClick={() => setActiveTab('risk')}
        >
          ⚠️ Risk
        </button>
        <button
          className={`ai-tab-btn ${activeTab === 'intelligence' ? 'active' : ''}`}
          onClick={() => setActiveTab('intelligence')}
        >
          🔍 Intelligence
        </button>
      </div>

      <div className="ai-content">
        {error && <div className="error-message">{error}</div>}

        {activeTab === 'insights' && <AIInsights />}

        {activeTab === 'coaching' && <SalesCoaching customers={customers} />}

        {activeTab === 'email' && <EmailGenerator customers={customers} deals={deals} />}

        {activeTab === 'risk' && <DealRiskAnalyzer deals={deals} />}

        {activeTab === 'intelligence' && <CustomerIntelligence customers={customers} />}
      </div>
    </div>
  );
};

export default AIPage;
