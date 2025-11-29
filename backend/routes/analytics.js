const express = require('express');
const router = express.Router();
const {
  getAnalytics,
  analyzeSentiment,
  extractKeyInsights,
  getDealRecommendations,
  generatePerformanceReport,
  getCustomerHealthScore,
} = require('../services/analyticsService');

// Get comprehensive analytics dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const analytics = await getAnalytics();
    res.json(analytics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get sentiment analysis for a customer
router.get('/sentiment/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    const sentiment = await analyzeSentiment(customerId);
    res.json(sentiment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Extract key insights from text
router.post('/extract-insights', (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ error: 'Text is required' });
      return;
    }
    const insights = extractKeyInsights(text);
    res.json(insights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get deal recommendations
router.get('/deal-recommendations', async (req, res) => {
  try {
    const recommendations = await getDealRecommendations();
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generate performance report
router.get('/performance-report', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      res.status(400).json({ error: 'startDate and endDate are required' });
      return;
    }
    const report = await generatePerformanceReport(startDate, endDate);
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get customer health score
router.get('/customer-health/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    const health = await getCustomerHealthScore(customerId);
    res.json(health);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
