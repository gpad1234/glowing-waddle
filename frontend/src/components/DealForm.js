import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { dealService } from '../services/api';
import '../styles/DealForm.css';

const DealForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const customerId = searchParams.get('customerId');

  const [formData, setFormData] = useState({
    customerId: customerId || '',
    title: '',
    description: '',
    value: '',
    stage: 'prospecting',
    probability: 0,
    expectedCloseDate: '',
    owner: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerId || !formData.title) {
      setError('Customer and Title are required');
      return;
    }

    try {
      const response = await dealService.create(formData);
      navigate(`/customers/${formData.customerId}`);
    } catch (err) {
      setError('Error creating deal');
    }
  };

  return (
    <div className="deal-form">
      <h2>New Deal</h2>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="value">Value ($)</label>
            <input
              type="number"
              id="value"
              name="value"
              value={formData.value}
              onChange={handleChange}
              step="0.01"
            />
          </div>
          <div className="form-group">
            <label htmlFor="stage">Stage</label>
            <select
              id="stage"
              name="stage"
              value={formData.stage}
              onChange={handleChange}
            >
              <option value="prospecting">Prospecting</option>
              <option value="qualification">Qualification</option>
              <option value="proposal">Proposal</option>
              <option value="negotiation">Negotiation</option>
              <option value="closed-won">Closed Won</option>
              <option value="closed-lost">Closed Lost</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="probability">Probability (%)</label>
            <input
              type="number"
              id="probability"
              name="probability"
              value={formData.probability}
              onChange={handleChange}
              min="0"
              max="100"
            />
          </div>
          <div className="form-group">
            <label htmlFor="expectedCloseDate">Expected Close Date</label>
            <input
              type="date"
              id="expectedCloseDate"
              name="expectedCloseDate"
              value={formData.expectedCloseDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="owner">Owner</label>
          <input
            type="text"
            id="owner"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Create Deal
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(customerId ? `/customers/${customerId}` : '/customers')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DealForm;
