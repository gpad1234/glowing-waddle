import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { contactService } from '../services/api';
import '../styles/ContactForm.css';

const ContactForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const customerId = searchParams.get('customerId');

  const [formData, setFormData] = useState({
    customerId: customerId || '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    department: '',
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
    if (!formData.customerId) {
      setError('Customer ID is required');
      return;
    }

    try {
      const response = await contactService.create(formData);
      navigate(`/customers/${formData.customerId}`);
    } catch (err) {
      setError('Error creating contact');
    }
  };

  return (
    <div className="contact-form">
      <h2>New Contact</h2>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="position">Position</label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Create Contact
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

export default ContactForm;
