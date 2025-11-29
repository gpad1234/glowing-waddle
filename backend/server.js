const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const db = require('./database');
const loadSampleData = require('./loadSampleData');
const customersRoute = require('./routes/customers');
const contactsRoute = require('./routes/contacts');
const dealsRoute = require('./routes/deals');
const activitiesRoute = require('./routes/activities');
const analyticsRoute = require('./routes/analytics');
const aiRoute = require('./routes/ai');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/customers', customersRoute);
app.use('/api/contacts', contactsRoute);
app.use('/api/deals', dealsRoute);
app.use('/api/activities', activitiesRoute);
app.use('/api/analytics', analyticsRoute);
app.use('/api/ai', aiRoute);

// Load sample data (on first run or if database is empty)
setTimeout(() => {
  loadSampleData();
}, 1000);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`CRM Backend server is running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
