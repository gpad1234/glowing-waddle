import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { customerService } from '../services/api';
import '../styles/CustomerList.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await customerService.getAll();
      setCustomers(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await customerService.delete(id);
        fetchCustomers();
      } catch (err) {
        alert('Error deleting customer');
      }
    }
  };

  if (loading) return <div className="loading">Loading customers...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="customer-list">
      <div className="list-header">
        <h2>Customers</h2>
        <Link to="/customers/new" className="btn btn-primary">
          + New Customer
        </Link>
      </div>

      {customers.length === 0 ? (
        <p className="no-data">No customers found. Create a new one!</p>
      ) : (
        <table className="customers-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>
                  <Link to={`/customers/${customer.id}`} className="link">
                    {customer.name}
                  </Link>
                </td>
                <td>{customer.email || '-'}</td>
                <td>{customer.phone || '-'}</td>
                <td>{customer.company || '-'}</td>
                <td>
                  <span className={`status ${customer.status}`}>
                    {customer.status}
                  </span>
                </td>
                <td>
                  <Link
                    to={`/customers/${customer.id}/edit`}
                    className="btn btn-small btn-secondary"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(customer.id)}
                    className="btn btn-small btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerList;
