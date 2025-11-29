const db = require('../database');
const Sentiment = require('sentiment');
const compromise = require('compromise');
const natural = require('natural');

const sentiment = new Sentiment();

/**
 * Calculate comprehensive analytics for the CRM
 */
const getAnalytics = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      let analytics = {
        overview: {},
        sales: {},
        customers: {},
        activities: {},
        insights: [],
        recommendations: [],
      };

      // Get customer stats
      db.get(
        'SELECT COUNT(*) as total, SUM(CASE WHEN status="active" THEN 1 ELSE 0 END) as active FROM customers',
        [],
        (err, row) => {
          analytics.overview.totalCustomers = row?.total || 0;
          analytics.overview.activeCustomers = row?.active || 0;
          analytics.overview.inactiveCustomers = (row?.total || 0) - (row?.active || 0);

          // Get deal stats
          db.get(
            `SELECT COUNT(*) as total, 
                    SUM(value) as totalValue,
                    AVG(value) as avgValue,
                    SUM(CASE WHEN stage="closed-won" THEN 1 ELSE 0 END) as closedWon,
                    SUM(CASE WHEN stage="closed-lost" THEN 1 ELSE 0 END) as closedLost,
                    SUM(CASE WHEN stage IN ("proposal", "negotiation") THEN 1 ELSE 0 END) as inProgress
             FROM deals`,
            [],
            (err, row) => {
              analytics.sales.totalDeals = row?.total || 0;
              analytics.sales.totalValue = row?.totalValue || 0;
              analytics.sales.averageDealSize = Math.round(row?.avgValue || 0);
              analytics.sales.closedWon = row?.closedWon || 0;
              analytics.sales.closedLost = row?.closedLost || 0;
              analytics.sales.inProgress = row?.inProgress || 0;
              analytics.sales.winRate =
                row?.total > 0 ? Math.round(((row?.closedWon || 0) / row?.total) * 100) : 0;

              // Get deal pipeline
              db.all(
                'SELECT stage, COUNT(*) as count, SUM(value) as value FROM deals GROUP BY stage',
                [],
                (err, rows) => {
                  analytics.sales.pipeline = rows || [];

                  // Get activity stats
                  db.get(
                    `SELECT COUNT(*) as total,
                            SUM(CASE WHEN status="completed" THEN 1 ELSE 0 END) as completed,
                            SUM(CASE WHEN status="pending" THEN 1 ELSE 0 END) as pending
                     FROM activities`,
                    [],
                    (err, row) => {
                      analytics.activities.totalActivities = row?.total || 0;
                      analytics.activities.completedActivities = row?.completed || 0;
                      analytics.activities.pendingActivities = row?.pending || 0;
                      analytics.activities.completionRate =
                        row?.total > 0 ? Math.round(((row?.completed || 0) / row?.total) * 100) : 0;

                      // Get activity breakdown
                      db.all(
                        'SELECT type, COUNT(*) as count FROM activities GROUP BY type',
                        [],
                        (err, rows) => {
                          analytics.activities.byType = rows || [];

                          // Get customer insights
                          db.all(
                            `SELECT c.id, c.name, COUNT(DISTINCT d.id) as dealCount, 
                                    COUNT(DISTINCT co.id) as contactCount, SUM(d.value) as totalValue
                             FROM customers c
                             LEFT JOIN deals d ON c.id = d.customerId
                             LEFT JOIN contacts co ON c.id = co.customerId
                             GROUP BY c.id
                             ORDER BY totalValue DESC`,
                            [],
                            (err, rows) => {
                              analytics.customers.topByValue = rows || [];

                              // Generate insights
                              generateInsights(analytics, (insights) => {
                                analytics.insights = insights;
                                resolve(analytics);
                              });
                            }
                          );
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    });
  });
};

/**
 * Generate AI insights from data
 */
const generateInsights = (analytics, callback) => {
  const insights = [];

  // Insight 1: Sales performance
  if (analytics.sales.winRate > 50) {
    insights.push({
      type: 'positive',
      title: 'Strong Sales Performance',
      message: `Your team has a ${analytics.sales.winRate}% deal win rate. Keep up the momentum!`,
      icon: '📈',
    });
  } else if (analytics.sales.winRate > 0) {
    insights.push({
      type: 'warning',
      title: 'Sales Opportunities',
      message: `Current win rate is ${analytics.sales.winRate}%. Consider reviewing lost deals to improve strategy.`,
      icon: '⚠️',
    });
  }

  // Insight 2: Deal pipeline
  if (analytics.sales.inProgress > analytics.sales.closedWon) {
    insights.push({
      type: 'info',
      title: 'Pipeline Growth Potential',
      message: `You have ${analytics.sales.inProgress} deals in active negotiation with potential value of $${(
        analytics.sales.totalValue / Math.max(analytics.sales.totalDeals, 1) *
        analytics.sales.inProgress
      ).toLocaleString()}`,
      icon: '💰',
    });
  }

  // Insight 3: Activity completion
  if (analytics.activities.completionRate > 80) {
    insights.push({
      type: 'positive',
      title: 'High Activity Completion',
      message: `Excellent! ${analytics.activities.completionRate}% of activities are completed. Your team is on track!`,
      icon: '✅',
    });
  } else if (analytics.activities.completionRate < 50 && analytics.activities.totalActivities > 0) {
    insights.push({
      type: 'warning',
      title: 'Activity Backlog Alert',
      message: `Only ${analytics.activities.completionRate}% of activities are completed. Review and prioritize pending tasks.`,
      icon: '⏰',
    });
  }

  // Insight 4: Customer base health
  if (analytics.overview.activeCustomers / analytics.overview.totalCustomers > 0.8) {
    insights.push({
      type: 'positive',
      title: 'Healthy Customer Base',
      message: `${Math.round((analytics.overview.activeCustomers / analytics.overview.totalCustomers) * 100)}% of your customers are active.`,
      icon: '👥',
    });
  }

  // Insight 5: Average deal size
  if (analytics.sales.averageDealSize > 50000) {
    insights.push({
      type: 'info',
      title: 'Enterprise Focus',
      message: `Average deal size is $${analytics.sales.averageDealSize.toLocaleString()}. Strong enterprise focus!`,
      icon: '🏢',
    });
  }

  callback(insights);
};

/**
 * Perform sentiment analysis on activity descriptions
 */
const analyzeSentiment = (customerId) => {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT description FROM activities WHERE customerId = ? AND description IS NOT NULL',
      [customerId],
      (err, rows) => {
        if (err) {
          reject(err);
          return;
        }

        let sentiments = [];
        let totalScore = 0;
        let count = 0;

        if (rows && rows.length > 0) {
          rows.forEach((row) => {
            const result = sentiment.analyze(row.description);
            sentiments.push({
              text: row.description,
              score: result.score,
              comparative: result.comparative,
              sentiment: result.score > 0 ? 'positive' : result.score < 0 ? 'negative' : 'neutral',
            });
            totalScore += result.score;
            count++;
          });
        }

        resolve({
          customerId,
          sentiments,
          averageScore: count > 0 ? totalScore / count : 0,
          overallSentiment:
            totalScore > 0 ? 'positive' : totalScore < 0 ? 'negative' : 'neutral',
          totalAnalyzed: count,
        });
      }
    );
  });
};

/**
 * Extract key information using NLP
 */
const extractKeyInsights = (text) => {
  const doc = compromise(text);

  return {
    entities: {
      people: doc.people().out('array'),
      organizations: doc.organizations().out('array'),
      dates: doc.dates().out('array'),
    },
    terms: {
      nouns: doc.nouns().out('array'),
      verbs: doc.verbs().out('array'),
      adjectives: doc.adjectives().out('array'),
    },
    wordCount: text.split(/\s+/).length,
  };
};

/**
 * Generate deal recommendations based on NLP analysis
 */
const getDealRecommendations = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT d.*, c.name as customerName FROM deals d 
       LEFT JOIN customers c ON d.customerId = c.id 
       ORDER BY d.probability ASC, d.value DESC`,
      [],
      (err, deals) => {
        if (err) {
          reject(err);
          return;
        }

        const recommendations = [];

        if (deals && deals.length > 0) {
          // Recommend high-value low-probability deals for attention
          const highValue = deals.filter((d) => d.value > 100000 && d.probability < 50);
          if (highValue.length > 0) {
            recommendations.push({
              type: 'focus',
              title: 'High-Value Deals Need Attention',
              deals: highValue,
              message: `Focus on ${highValue.length} high-value deals (>${100000}) with low probability. These could significantly impact revenue.`,
              priority: 'high',
            });
          }

          // Recommend deals ready to close
          const readyToClose = deals.filter((d) => d.probability > 80 && d.stage !== 'closed-won');
          if (readyToClose.length > 0) {
            recommendations.push({
              type: 'action',
              title: 'Ready to Close',
              deals: readyToClose,
              message: `${readyToClose.length} deals are 80%+ probable. Push for closing!`,
              priority: 'high',
            });
          }

          // Recommend deals at risk
          const atRisk = deals.filter((d) => d.stage === 'proposal' && d.probability < 30);
          if (atRisk.length > 0) {
            recommendations.push({
              type: 'warning',
              title: 'Deals at Risk',
              deals: atRisk,
              message: `${atRisk.length} deals in proposal stage with low probability may be stalled. Follow up required.`,
              priority: 'medium',
            });
          }
        }

        resolve(recommendations);
      }
    );
  });
};

/**
 * Generate performance report for a time period
 */
const generatePerformanceReport = (startDate, endDate) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT d.*, c.name as customerName FROM deals d 
       LEFT JOIN customers c ON d.customerId = c.id 
       WHERE d.updatedAt BETWEEN ? AND ?
       ORDER BY d.updatedAt DESC`,
      [startDate, endDate],
      (err, deals) => {
        if (err) {
          reject(err);
          return;
        }

        const report = {
          period: { startDate, endDate },
          deals: {
            total: deals?.length || 0,
            won: deals?.filter((d) => d.stage === 'closed-won').length || 0,
            lost: deals?.filter((d) => d.stage === 'closed-lost').length || 0,
            totalValue: deals?.reduce((sum, d) => sum + (d.value || 0), 0) || 0,
            wonValue:
              deals?.filter((d) => d.stage === 'closed-won').reduce((sum, d) => sum + (d.value || 0), 0) || 0,
          },
          topDeals: deals?.sort((a, b) => (b.value || 0) - (a.value || 0)).slice(0, 5) || [],
        };

        resolve(report);
      }
    );
  });
};

/**
 * Get customer health score (0-100)
 */
const getCustomerHealthScore = (customerId) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      let score = 50; // Base score

      // Check customer status
      db.get('SELECT status FROM customers WHERE id = ?', [customerId], (err, customer) => {
        if (customer?.status === 'active') score += 20;

        // Check deal activity
        db.get(
          'SELECT COUNT(*) as count, SUM(CASE WHEN stage="closed-won" THEN 1 ELSE 0 END) as won FROM deals WHERE customerId = ?',
          [customerId],
          (err, dealStats) => {
            if (dealStats?.count > 0) score += 15;
            if (dealStats?.won > 0) score += 15;

            // Check recent activity
            db.get(
              `SELECT COUNT(*) as count FROM activities 
               WHERE customerId = ? AND status = "completed" 
               AND createdAt > datetime('now', '-30 days')`,
              [customerId],
              (err, activityStats) => {
                if (activityStats?.count > 0) score += 10;
                if (activityStats?.count > 5) score += 10;

                resolve({ customerId, healthScore: Math.min(score, 100) });
              }
            );
          }
        );
      });
    });
  });
};

module.exports = {
  getAnalytics,
  analyzeSentiment,
  extractKeyInsights,
  getDealRecommendations,
  generatePerformanceReport,
  getCustomerHealthScore,
};
