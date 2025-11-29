# Advanced Analytics & NLP Features

This CRM now includes powerful AI-driven analytics with Natural Language Processing (NLP) capabilities.

## Features

### 1. **Analytics Dashboard** 📊
Comprehensive overview of your CRM performance including:

- **Key Performance Indicators (KPIs)**
  - Total Revenue
  - Win Rate (%)
  - Active Customers
  - Activity Completion Rate

- **Sales Pipeline Analysis**
  - Deal count by stage
  - Revenue by stage
  - Pipeline visibility

- **AI-Powered Insights**
  - Automated performance analysis
  - Trend detection
  - Smart recommendations
  - Risk alerts

- **Activity Breakdown**
  - Calls, emails, meetings, tasks
  - Visual distribution

- **Top Customers**
  - Revenue rankings
  - Deal activity
  - Contact information

### 2. **Deal Recommendations** 🎯
AI-driven recommendations to maximize sales:

- **High-Value Deals Alert**: Focus on high-value deals with low probability
- **Ready to Close**: Identify deals at 80%+ probability ready for closing
- **At-Risk Deals**: Flag deals that may be stalled

Features:
- Automatic analysis of all deals
- Priority-based sorting
- Actionable insights
- Deal metrics at a glance

### 3. **Sentiment Analysis** 📝
NLP-powered sentiment analysis for customer interactions:

- **Activity Analysis**: Analyzes all activity descriptions
- **Sentiment Scoring**: 
  - Positive (+): Favorable interactions
  - Neutral (0): Neutral tone
  - Negative (-): Concerning interactions

- **Overall Customer Sentiment**: Aggregate sentiment score
- **Individual Activity Review**: See sentiment for each activity
- **Trend Detection**: Identify sentiment patterns

### 4. **Key Insights Extraction**
NLP technology extracts important information:

- **Named Entities**: People, organizations, dates
- **Key Terms**: Nouns, verbs, adjectives
- **Word Frequency**: Content analysis
- **Communication Patterns**: Identify decision makers and influencers

### 5. **Customer Health Score** ⚕️
Automated scoring system (0-100):

- Base score: 50
- Customer status: +20 (if active)
- Deal activity: +15 (if deals exist)
- Closed deals: +15 (if won)
- Recent completed activities: +10
- Multiple recent activities: +10

## API Endpoints

### Analytics Dashboard
```
GET /api/analytics/dashboard
```
Returns comprehensive analytics data including overview, sales, customer, and activity metrics.

### Deal Recommendations
```
GET /api/analytics/deal-recommendations
```
Returns AI-generated recommendations organized by priority and action type.

### Sentiment Analysis
```
GET /api/analytics/sentiment/:customerId
```
Returns sentiment analysis for a specific customer's activities.

**Response:**
```json
{
  "customerId": 1,
  "sentiments": [
    {
      "text": "Activity description",
      "score": 2.5,
      "sentiment": "positive"
    }
  ],
  "averageScore": 1.2,
  "overallSentiment": "positive",
  "totalAnalyzed": 5
}
```

### Extract Key Insights
```
POST /api/analytics/extract-insights

{
  "text": "Your text to analyze"
}
```

Returns extracted entities and key terms using NLP.

### Performance Report
```
GET /api/analytics/performance-report?startDate=2025-11-01&endDate=2025-11-30
```

Returns deals closed, revenue, and top performers for a date range.

### Customer Health Score
```
GET /api/analytics/customer-health/:customerId
```

Returns health score (0-100) for a specific customer.

## NLP Technology Stack

The analytics engine uses:

1. **Sentiment Analysis** (`sentiment` library)
   - Analyzes emotional tone of text
   - Provides score-based sentiment classification
   - Works with activity descriptions

2. **Natural Language Processing** (`compromise` library)
   - Named entity recognition (people, organizations, dates)
   - Part-of-speech tagging
   - Text analysis and extraction

3. **Natural Language Toolkit** (`natural` library)
   - Tokenization
   - Stemming
   - Language processing utilities

## Usage Examples

### View Analytics Dashboard
1. Click "📊 Analytics" in navigation
2. View all KPIs and insights
3. Analyze sales pipeline
4. Read AI-powered recommendations

### Get Deal Recommendations
1. Click "🎯 Recommendations" in navigation
2. Review prioritized recommendations
3. Click on deals for details
4. Take action on high-priority items

### Check Customer Sentiment
1. Open a customer detail page
2. View sentiment analysis in activities
3. See overall sentiment score
4. Read individual activity sentiments

### Generate Reports
Use API directly or extend UI:
```bash
curl "http://localhost:5000/api/analytics/performance-report?startDate=2025-11-01&endDate=2025-11-30"
```

## Insights Examples

### Performance Insights
- ✅ "Strong Sales Performance: Your team has a 75% deal win rate. Keep up the momentum!"
- ⚠️ "Sales Opportunities: Current win rate is 45%. Review lost deals to improve strategy."
- 💰 "Pipeline Growth Potential: You have 5 deals in active negotiation..."
- ✅ "High Activity Completion: Excellent! 85% of activities are completed..."

### Recommendations
- 🎯 "High-Value Deals Need Attention": 2 deals over $100K with <50% probability
- 🚀 "Ready to Close": 3 deals at 80%+ probability - push for closing!
- ⚠️ "Deals at Risk": 2 deals in proposal stage with low probability

## Integration Points

### Customer Detail Page
Sentiment analysis can be embedded in customer detail to show:
- Overall interaction sentiment
- Recent activity sentiment
- Trend over time

### Deal View
Recommendations appear when viewing deals to:
- Prioritize next actions
- Identify at-risk deals
- Focus on high-value opportunities

### Dashboard
Analytics insights appear on main dashboard to:
- Show business metrics at a glance
- Alert to important trends
- Provide quick recommendations

## Customization

### Adding Custom Insights
Edit `backend/services/analyticsService.js` in `generateInsights()` function:

```javascript
const generateInsights = (analytics, callback) => {
  const insights = [];

  // Add your custom insight logic
  if (someCondition) {
    insights.push({
      type: 'positive',
      title: 'Your Insight Title',
      message: 'Your insight message',
      icon: '🎯',
    });
  }

  callback(insights);
};
```

### Adjusting Sentiment Thresholds
Modify sentiment scoring in `analyticsService.js`:

```javascript
const result = sentiment.analyze(text);
// Customize how score is interpreted
```

### Customer Health Score Calculation
Adjust weights in `getCustomerHealthScore()`:

```javascript
let score = 50; // Base score
if (customer?.status === 'active') score += 20; // Active bonus
// Add or modify conditions as needed
```

## Performance Considerations

- Analytics caching: Results are computed on-demand
- Large datasets: For 1000+ records, consider implementing pagination
- Real-time updates: Dashboard updates on page load
- NLP processing: Sentiment analysis processes all activity descriptions

## Future Enhancements

- 🔮 Predictive analytics for deal closure probability
- 📈 Trend forecasting and seasonal analysis
- 🤖 Chatbot integration for natural language queries
- 📧 Email content analysis for communication quality
- 🎓 ML-based customer segmentation
- 💬 Conversational insights assistant

## Troubleshooting

### Sentiment analysis not working
- Ensure `sentiment` package is installed: `npm list sentiment`
- Check that activities have descriptions
- Verify backend is running

### Recommendations not appearing
- Check that deals exist in database
- Ensure backend analytics route is accessible
- Check browser console for errors

### Performance slow
- Clear browser cache
- Reduce date range for reports
- Optimize database queries

## API Testing

Test analytics endpoints using curl:

```bash
# Get analytics dashboard
curl http://localhost:5000/api/analytics/dashboard

# Get deal recommendations
curl http://localhost:5000/api/analytics/deal-recommendations

# Get sentiment for customer 1
curl http://localhost:5000/api/analytics/sentiment/1

# Get customer health score
curl http://localhost:5000/api/analytics/customer-health/1

# Generate report
curl "http://localhost:5000/api/analytics/performance-report?startDate=2025-01-01&endDate=2025-12-31"
```

## Support

For issues or questions about analytics:
1. Check backend logs: `npm start`
2. Verify API responses using curl
3. Check browser console for frontend errors
4. Review database integrity
