const express = require('express');
const router = express.Router();
const {
  generateAIInsights,
  generateSalesCoaching,
  generateEmailTemplate,
  analyzeDealRisk,
  generateCustomerIntelligence,
} = require('../services/aiService');
const { getAnalytics } = require('../services/analyticsService');

// Generate AI business insights
router.get('/insights', async (req, res) => {
  try {
    const analytics = await getAnalytics();
    const insights = await generateAIInsights(analytics);
    res.json({ insights, analytics });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generate sales coaching for a customer
router.get('/coaching/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    const coaching = await generateSalesCoaching(customerId);
    res.json(coaching);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generate email templates
router.post('/email-template', async (req, res) => {
  try {
    const { customerId, dealId, templateType } = req.body;
    if (!customerId) {
      res.status(400).json({ error: 'customerId is required' });
      return;
    }
    const template = await generateEmailTemplate(customerId, dealId, templateType || 'followup');
    res.json(template);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Analyze deal risk
router.get('/deal-risk/:dealId', async (req, res) => {
  try {
    const { dealId } = req.params;
    const riskAnalysis = await analyzeDealRisk(dealId);
    res.json(riskAnalysis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generate customer intelligence
router.get('/customer-intelligence/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    const intelligence = await generateCustomerIntelligence(customerId);
    res.json(intelligence);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
