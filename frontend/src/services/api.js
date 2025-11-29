import axios from 'axios';

// Use relative path so it works with nginx proxy in production
// In development with npm start, the proxy field in package.json will handle it
const API_BASE_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Customers API
export const customerService = {
  getAll: () => api.get('/customers'),
  getById: (id) => api.get(`/customers/${id}`),
  create: (data) => api.post('/customers', data),
  update: (id, data) => api.put(`/customers/${id}`, data),
  delete: (id) => api.delete(`/customers/${id}`),
};

// Contacts API
export const contactService = {
  getAll: () => api.get('/contacts'),
  getById: (id) => api.get(`/contacts/${id}`),
  getByCustomerId: (customerId) => api.get(`/contacts/customer/${customerId}`),
  create: (data) => api.post('/contacts', data),
  update: (id, data) => api.put(`/contacts/${id}`, data),
  delete: (id) => api.delete(`/contacts/${id}`),
};

// Deals API
export const dealService = {
  getAll: () => api.get('/deals'),
  getById: (id) => api.get(`/deals/${id}`),
  getByCustomerId: (customerId) => api.get(`/deals/customer/${customerId}`),
  create: (data) => api.post('/deals', data),
  update: (id, data) => api.put(`/deals/${id}`, data),
  delete: (id) => api.delete(`/deals/${id}`),
};

// Activities API
export const activityService = {
  getAll: () => api.get('/activities'),
  getById: (id) => api.get(`/activities/${id}`),
  getByCustomerId: (customerId) => api.get(`/activities/customer/${customerId}`),
  create: (data) => api.post('/activities', data),
  update: (id, data) => api.put(`/activities/${id}`, data),
  delete: (id) => api.delete(`/activities/${id}`),
};

export default api;
