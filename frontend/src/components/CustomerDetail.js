import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { customerService, contactService, dealService, activityService } from '../services/api';
import '../styles/CustomerDetail.css';

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  const fetchCustomer = async () => {
    try {
      const response = await customerService.getById(id);
      setCustomer(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching customer');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await customerService.delete(id);
        navigate('/customers');
      } catch (err) {
        alert('Error deleting customer');
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!customer) return <div className="error">Customer not found</div>;

  return (
    <div className="customer-detail">
      <div className="detail-header">
        <h2>{customer.name}</h2>
        <div className="header-actions">
          <Link to={`/customers/${id}/edit`} className="btn btn-secondary">
            Edit
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete
          </button>
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'contacts' ? 'active' : ''}`}
          onClick={() => setActiveTab('contacts')}
        >
          Contacts ({customer.contacts?.length || 0})
        </button>
        <button
          className={`tab-btn ${activeTab === 'deals' ? 'active' : ''}`}
          onClick={() => setActiveTab('deals')}
        >
          Deals ({customer.deals?.length || 0})
        </button>
        <button
          className={`tab-btn ${activeTab === 'activities' ? 'active' : ''}`}
          onClick={() => setActiveTab('activities')}
        >
          Activities ({customer.activities?.length || 0})
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview">
            <div className="info-grid">
              <div className="info-item">
                <label>Email</label>
                <p>{customer.email || '-'}</p>
              </div>
              <div className="info-item">
                <label>Phone</label>
                <p>{customer.phone || '-'}</p>
              </div>
              <div className="info-item">
                <label>Company</label>
                <p>{customer.company || '-'}</p>
              </div>
              <div className="info-item">
                <label>Industry</label>
                <p>{customer.industry || '-'}</p>
              </div>
              <div className="info-item">
                <label>Status</label>
                <p>
                  <span className={`status ${customer.status}`}>
                    {customer.status}
                  </span>
                </p>
              </div>
              <div className="info-item">
                <label>Address</label>
                <p>{customer.address || '-'}</p>
              </div>
              <div className="info-item">
                <label>City</label>
                <p>{customer.city || '-'}</p>
              </div>
              <div className="info-item">
                <label>State</label>
                <p>{customer.state || '-'}</p>
              </div>
              <div className="info-item">
                <label>Country</label>
                <p>{customer.country || '-'}</p>
              </div>
              <div className="info-item">
                <label>Created</label>
                <p>{new Date(customer.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <ContactsTab customerId={id} contacts={customer.contacts} />
        )}

        {activeTab === 'deals' && (
          <DealsTab customerId={id} deals={customer.deals} />
        )}

        {activeTab === 'activities' && (
          <ActivitiesTab customerId={id} activities={customer.activities} />
        )}
      </div>
    </div>
  );
};

const ContactsTab = ({ customerId, contacts }) => (
  <div className="tab-section">
    <Link to={`/contacts/new?customerId=${customerId}`} className="btn btn-primary">
      + Add Contact
    </Link>
    {contacts && contacts.length > 0 ? (
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.firstName} {contact.lastName}</td>
              <td>{contact.email || '-'}</td>
              <td>{contact.phone || '-'}</td>
              <td>{contact.position || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p className="no-data">No contacts</p>
    )}
  </div>
);

const DealsTab = ({ customerId, deals }) => (
  <div className="tab-section">
    <Link to={`/deals/new?customerId=${customerId}`} className="btn btn-primary">
      + Add Deal
    </Link>
    {deals && deals.length > 0 ? (
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
          {deals.map((deal) => (
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
      <p className="no-data">No deals</p>
    )}
  </div>
);

const ActivitiesTab = ({ customerId, activities }) => (
  <div className="tab-section">
    <Link to={`/activities/new?customerId=${customerId}`} className="btn btn-primary">
      + Add Activity
    </Link>
    {activities && activities.length > 0 ? (
      <table className="data-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Type</th>
            <th>Status</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id}>
              <td>{activity.subject}</td>
              <td>{activity.type || '-'}</td>
              <td>{activity.status}</td>
              <td>{activity.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p className="no-data">No activities</p>
    )}
  </div>
);

export default CustomerDetail;
