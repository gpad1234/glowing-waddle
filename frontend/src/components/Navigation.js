import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          📊 CRM System
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/analytics" className="nav-links">
              📊 Analytics
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/ai" className="nav-links ai-link">
              🤖 AI Suite
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/recommendations" className="nav-links">
              🎯 Recommendations
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/customers" className="nav-links">
              Customers
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/deals" className="nav-links">
              Deals
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/activities" className="nav-links">
              Activities
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
