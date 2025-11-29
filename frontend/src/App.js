import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import DealRecommendations from './components/DealRecommendations';
import AIPage from './components/AIPage';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import CustomerDetail from './components/CustomerDetail';
import ContactForm from './components/ContactForm';
import DealForm from './components/DealForm';
import ActivityForm from './components/ActivityForm';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="/recommendations" element={<DealRecommendations />} />
          <Route path="/ai" element={<AIPage />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/new" element={<CustomerForm />} />
          <Route path="/customers/:id" element={<CustomerDetail />} />
          <Route path="/customers/:id/edit" element={<CustomerForm />} />
          <Route path="/contacts/new" element={<ContactForm />} />
          <Route path="/deals/new" element={<DealForm />} />
          <Route path="/activities/new" element={<ActivityForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
