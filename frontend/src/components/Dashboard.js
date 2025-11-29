import React, { useState, useEffect } from 'react';
import { customerService, dealService } from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalDeals: 0,
    totalDealValue: 0,
    activeDeals: 0,
  });
  const [recentCustomers, setRecentCustomers] = useState([]);
  const [recentDeals, setRecentDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const customersRes = await customerService.getAll();
      const dealsRes = await dealService.getAll();

      const customers = customersRes.data;
      const deals = dealsRes.data;

      const totalDealValue = deals.reduce((sum, deal) => sum + (deal.value || 0), 0);
      const activeDeals = deals.filter((deal) => deal.stage !== 'closed-won' && deal.stage !== 'closed-lost').length;

      setStats({
        totalCustomers: customers.length,
        totalDeals: deals.length,
        totalDealValue: totalDealValue,
        activeDeals: activeDeals,
      });

      setRecentCustomers(customers.slice(0, 5));
      setRecentDeals(deals.slice(0, 5));
      setLoading(false);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.totalCustomers}</h3>
          <p>Total Customers</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalDeals}</h3>
          <p>Total Deals</p>
        </div>
        <div className="stat-card">
          <h3>${stats.totalDealValue.toLocaleString()}</h3>
          <p>Total Deal Value</p>
        </div>
        <div className="stat-card">
          <h3>{stats.activeDeals}</h3>
          <p>Active Deals</p>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section">
          <h3>Recent Customers</h3>
          {recentCustomers.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.email || '-'}</td>
                    <td>{customer.company || '-'}</td>
                    <td>
                      <span className={`status ${customer.status}`}>
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data">No customers yet</p>
          )}
        </div>

        <div className="section">
          <h3>Recent Deals</h3>
          {recentDeals.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Value</th>
                  <th>Stage</th>
                  <th>Probability</th>
                </tr>
              </thead>
              <tbody>
                {recentDeals.map((deal) => (
                  <tr key={deal.id}>
                    <td>{deal.title}</td>
                    <td>${deal.value || 0}</td>
                    <td>{deal.stage}</td>
                    <td>{deal.probability}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data">No deals yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
