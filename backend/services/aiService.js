const OpenAI = require('openai');
const db = require('../database');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate AI-powered business insights using OpenAI GPT
 */
const generateAIInsights = async (analyticsData) => {
  try {
    const prompt = `
You are an expert CRM analyst. Analyze the following CRM data and provide 3-5 actionable business insights:

CRM Analytics Data:
- Total Customers: ${analyticsData.overview.totalCustomers}
- Active Customers: ${analyticsData.overview.activeCustomers}
- Total Deals: ${analyticsData.sales.totalDeals}
- Deal Win Rate: ${analyticsData.sales.winRate}%
- Total Revenue: $${analyticsData.sales.totalValue}
- Average Deal Size: $${analyticsData.sales.averageDealSize}
- Active Deals (in progress): ${analyticsData.sales.inProgress}
- Closed Won: ${analyticsData.sales.closedWon}
- Closed Lost: ${analyticsData.sales.closedLost}
- Activity Completion Rate: ${analyticsData.activities.completionRate}%
- Sales Pipeline: ${JSON.stringify(analyticsData.sales.pipeline)}

Please provide insights in JSON format:
[
  {
    "type": "insight|warning|opportunity|celebration",
    "title": "Brief title",
    "description": "Detailed insight explanation",
    "actionItems": ["action1", "action2"],
    "priority": "high|medium|low"
  }
]

Focus on:
1. Revenue optimization opportunities
2. Sales process efficiency improvements
3. Customer retention risks
4. Pipeline health
5. Team performance trends

Response must be valid JSON only.
    `;

    const message = await openai.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = message.content[0].text;
    const insights = JSON.parse(responseText);
    return insights;
  } catch (error) {
    console.error('Error generating AI insights:', error);
    return [];
  }
};

/**
 * Generate AI sales coaching recommendations
 */
const generateSalesCoaching = async (customerId) => {
  try {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT c.*, COUNT(DISTINCT d.id) as dealCount, COUNT(DISTINCT co.id) as contactCount
         FROM customers c
         LEFT JOIN deals d ON c.id = d.customerId
         LEFT JOIN contacts co ON c.id = co.customerId
         WHERE c.id = ?
         GROUP BY c.id`,
        [customerId],
        async (err, customer) => {
          if (err) {
            reject(err);
            return;
          }

          if (!customer) {
            resolve(null);
            return;
          }

          db.all(
            'SELECT * FROM deals WHERE customerId = ? ORDER BY createdAt DESC LIMIT 5',
            [customerId],
            async (err, deals) => {
              try {
                const prompt = `
You are an expert sales coach. Based on the following customer information, provide personalized sales coaching:

Customer: ${customer.name}
Industry: ${customer.industry}
Status: ${customer.status}
Total Deals: ${customer.dealCount}
Contacts: ${customer.contactCount}

Recent Deals:
${deals
  ?.map(
    (d) => `
- ${d.title}
  Value: $${d.value}
  Stage: ${d.stage}
  Probability: ${d.probability}%
  Expected Close: ${d.expectedCloseDate}
`
  )
  .join('')}

Please provide:
1. Sales strategy assessment
2. Next steps for this customer
3. Risk factors and mitigation
4. Cross-sell/upsell opportunities
5. Engagement recommendations

Format as JSON with detailed, actionable advice.
                `;

                const message = await openai.messages.create({
                  model: 'claude-3-5-sonnet-20241022',
                  max_tokens: 1024,
                  messages: [
                    {
                      role: 'user',
                      content: prompt,
                    },
                  ],
                });

                const responseText = message.content[0].text;
                const coaching = JSON.parse(responseText);
                resolve(coaching);
              } catch (error) {
                console.error('Error generating coaching:', error);
                resolve(null);
              }
            }
          );
        }
      );
    });
  } catch (error) {
    console.error('Error in generateSalesCoaching:', error);
    throw error;
  }
};

/**
 * Generate smart email templates for sales activities
 */
const generateEmailTemplate = async (customerId, dealId, templateType = 'followup') => {
  try {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT c.*, d.title as dealTitle, d.value FROM customers c
         LEFT JOIN deals d ON d.id = ?
         WHERE c.id = ?`,
        [dealId, customerId],
        async (err, data) => {
          if (err) {
            reject(err);
            return;
          }

          const prompt = `
Generate a professional sales email for a ${templateType} based on:

Customer: ${data?.name || 'Valued Client'}
Company: ${data?.company}
Deal: ${data?.dealTitle}
Value: $${data?.value || 'TBD'}
Type: ${templateType}

Types:
- followup: Polite follow-up after proposal
- closeout: Final closing attempt
- negotiation: Opening negotiation discussion
- appreciation: Thank you for meeting
- proposal: Introducing solution proposal

Generate a compelling, personalized email that:
1. References specific details
2. Adds clear value proposition
3. Includes specific call-to-action
4. Professional but conversational tone

Format as JSON with subject and body.
          `;

          try {
            openai.messages
              .create({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 1024,
                messages: [
                  {
                    role: 'user',
                    content: prompt,
                  },
                ],
              })
              .then((message) => {
                const responseText = message.content[0].text;
                const emailTemplate = JSON.parse(responseText);
                resolve(emailTemplate);
              });
          } catch (error) {
            console.error('Error generating email:', error);
            resolve(null);
          }
        }
      );
    });
  } catch (error) {
    console.error('Error in generateEmailTemplate:', error);
    throw error;
  }
};

/**
 * Analyze deal risk using AI
 */
const analyzeDealRisk = async (dealId) => {
  try {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT d.*, c.name as customerName, c.status FROM deals d
         LEFT JOIN customers c ON d.customerId = c.id
         WHERE d.id = ?`,
        [dealId],
        async (err, deal) => {
          if (err) {
            reject(err);
            return;
          }

          if (!deal) {
            resolve(null);
            return;
          }

          const prompt = `
Analyze the risk level for this sales deal:

Deal: ${deal.title}
Customer: ${deal.customerName}
Customer Status: ${deal.status}
Value: $${deal.value}
Stage: ${deal.stage}
Probability: ${deal.probability}%
Expected Close: ${deal.expectedCloseDate}
Days in Stage: Calculate if possible

Provide risk assessment in JSON with:
1. Overall Risk Level (critical|high|medium|low)
2. Risk Factors (array of identified risks)
3. Warning Signs (specific concerns)
4. Mitigation Strategies (how to address risks)
5. Success Probability (realistic assessment)
6. Recommended Actions (next steps)

Be specific and data-driven in assessment.
          `;

          try {
            openai.messages
              .create({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 1024,
                messages: [
                  {
                    role: 'user',
                    content: prompt,
                  },
                ],
              })
              .then((message) => {
                const responseText = message.content[0].text;
                const riskAnalysis = JSON.parse(responseText);
                resolve(riskAnalysis);
              });
          } catch (error) {
            console.error('Error analyzing deal risk:', error);
            resolve(null);
          }
        }
      );
    });
  } catch (error) {
    console.error('Error in analyzeDealRisk:', error);
    throw error;
  }
};

/**
 * Generate customer intelligence report
 */
const generateCustomerIntelligence = async (customerId) => {
  try {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT c.*, 
                COUNT(DISTINCT co.id) as contactCount,
                COUNT(DISTINCT d.id) as dealCount,
                SUM(d.value) as totalValue,
                COUNT(DISTINCT a.id) as activityCount
         FROM customers c
         LEFT JOIN contacts co ON c.id = co.customerId
         LEFT JOIN deals d ON c.id = d.customerId
         LEFT JOIN activities a ON c.id = a.customerId
         WHERE c.id = ?
         GROUP BY c.id`,
        [customerId],
        async (err, customer) => {
          if (err) {
            reject(err);
            return;
          }

          if (!customer) {
            resolve(null);
            return;
          }

          db.all(
            `SELECT a.type, COUNT(*) as count FROM activities 
             WHERE customerId = ? GROUP BY type`,
            [customerId],
            async (err, activityBreakdown) => {
              const prompt = `
Generate a comprehensive customer intelligence report:

Customer Profile:
- Company: ${customer.name}
- Industry: ${customer.industry}
- Status: ${customer.status}
- Location: ${customer.city}, ${customer.state}, ${customer.country}
- Total Revenue Potential: $${customer.totalValue || 0}
- Contacts: ${customer.contactCount}
- Active Deals: ${customer.dealCount}
- Recent Activity: ${customer.activityCount} activities

Activity Types: ${activityBreakdown?.map((a) => `${a.type}(${a.count})`).join(', ')}

Provide analysis in JSON:
{
  "companyProfile": "Brief company assessment",
  "buyingSignals": ["signal1", "signal2"],
  "decision_makers": "Assessment of key stakeholders",
  "opportunity_assessment": "Revenue potential analysis",
  "competition_risk": "Competitive threat assessment",
  "engagement_strategy": "Recommended approach",
  "next_30_days": "Strategic plan for next month",
  "long_term_potential": "Assessment of long-term value"
}

Provide actionable, strategic insights.
              `;

              try {
                openai.messages
                  .create({
                    model: 'claude-3-5-sonnet-20241022',
                    max_tokens: 1024,
                    messages: [
                      {
                        role: 'user',
                        content: prompt,
                      },
                    ],
                  })
                  .then((message) => {
                    const responseText = message.content[0].text;
                    const intelligence = JSON.parse(responseText);
                    resolve(intelligence);
                  });
              } catch (error) {
                console.error('Error generating intelligence:', error);
                resolve(null);
              }
            }
          );
        }
      );
    });
  } catch (error) {
    console.error('Error in generateCustomerIntelligence:', error);
    throw error;
  }
};

module.exports = {
  generateAIInsights,
  generateSalesCoaching,
  generateEmailTemplate,
  analyzeDealRisk,
  generateCustomerIntelligence,
};
