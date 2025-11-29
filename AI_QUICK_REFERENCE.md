# 🤖 AI Suite Quick Reference

## Navigation
- **URL**: http://localhost:3000/ai
- **Access**: Click "🤖 AI Suite" in the main navigation bar
- **Tabs**: 💡 Insights | 👥 Coaching | 📧 Email | ⚠️ Risk | 🔍 Intelligence

## Features at a Glance

### 💡 AI-Powered Insights
**What it does**: Analyzes your entire CRM and generates strategic business insights
**Input**: Automatic (uses all CRM data)
**Output**: 3-5 prioritized insights with recommendations
**Time**: ~2-3 seconds

```
Button: "Refresh Insights"
Result: Insights cards with title, description, recommendation, and priority
```

---

### 👥 Sales Coaching
**What it does**: Provides personalized sales strategies for each customer
**Input**: Select a customer
**Output**: Strengths, opportunities, next steps, coaching tips
**Time**: ~2-3 seconds

```
1. Select customer from dropdown
2. Click "Get Coaching"
3. Review: Strengths • Opportunities • Next Steps • Tips
```

---

### 📧 Email Generator
**What it does**: Creates professional sales emails for different scenarios
**Input**: Customer, optional deal, email type
**Output**: Subject line + professional email body
**Time**: ~2-3 seconds

```
Email Types:
- FollowUp: Post-meeting check-in
- CloseOut: Final discussion before close
- Negotiation: Address objections/terms
- Introduction: First contact outreach
- Proposal: Present your solution

Feature: One-click copy to clipboard
```

---

### ⚠️ Deal Risk Analyzer
**What it does**: Assesses deal risk and provides mitigation strategies
**Input**: Select a deal
**Output**: Risk score, factors, warnings, mitigation strategies
**Time**: ~2-3 seconds

```
Risk Levels:
🔴 HIGH (≥70%) - Urgent intervention needed
🟡 MEDIUM (40-70%) - Monitor closely, act proactively
🟢 LOW (<40%) - On track, standard follow-up

Includes: Risk factors • Warnings • Mitigation strategies • Recommendations
```

---

### 🔍 Customer Intelligence
**What it does**: Deep analysis of customer profiles and opportunities
**Input**: Select a customer
**Output**: Buying signals, decision makers, competition risk, upsell opportunities
**Time**: ~3-5 seconds

```
Sections:
- Buying Signals: What indicates they might buy
- Decision Makers: Who needs to approve
- Competition Risk: Likelihood of losing to competitors
- Upsell Opportunities: Additional revenue potential
- Engagement Strategy: How to work with them
- Next Actions: Specific steps to take
```

---

## Common Workflows

### Close a Deal
1. Go to Risk analyzer
2. Select your deal
3. Check for warnings
4. Use recommended mitigation strategies
5. Generate followup email if needed

### Prepare for Customer Meeting
1. Go to Customer Intelligence
2. Select the customer
3. Review buying signals and decision makers
4. Check upsell opportunities
5. Get coaching on next steps

### Handle Struggling Deal
1. Go to Risk analyzer
2. See risk factors and warnings
3. Review mitigation strategies
4. Generate negotiation email if needed
5. Set reminder for next action

### Weekly Sales Review
1. Go to Insights tab
2. Get weekly business highlights
3. Review coaching for top customers
4. Check for high-risk deals
5. Plan weekly activities

### Create Sales Email
1. Go to Email Generator
2. Select customer and deal
3. Choose email type based on situation
4. Generate
5. Copy and customize if needed

---

## Tips & Tricks

### Get Better Insights
- ✅ Ensure sample data is loaded
- ✅ Keep customer details updated
- ✅ Log all activities and interactions
- ✅ Keep deal stages current
- ✅ Add notes to customer records

### Generate Better Emails
- ✅ Select specific deals when possible
- ✅ Choose the right email type
- ✅ Customize after generation
- ✅ Test different approaches

### Accurate Risk Analysis
- ✅ Keep deal close dates accurate
- ✅ Log all deal interactions
- ✅ Update deal stages promptly
- ✅ Add notes about obstacles

### Useful Coaching
- ✅ Review customer history first
- ✅ Log all activities and outcomes
- ✅ Update contact information
- ✅ Note any special circumstances

---

## API Reference

### Get Insights
```bash
GET /api/ai/insights
```
Returns strategic business insights with recommendations

### Get Coaching
```bash
GET /api/ai/coaching/1
```
Replace `1` with customer ID

### Generate Email
```bash
POST /api/ai/email-template
Body: { customerId: 1, dealId: 5, templateType: "followup" }
```
Optional: omit `dealId` if not related to specific deal

### Analyze Risk
```bash
GET /api/ai/deal-risk/3
```
Replace `3` with deal ID

### Get Intelligence
```bash
GET /api/ai/customer-intelligence/2
```
Replace `2` with customer ID

---

## Response Times

| Feature | Time | Notes |
|---------|------|-------|
| Insights | 2-3s | Fast, uses cached analytics |
| Coaching | 2-3s | Standard API speed |
| Email | 2-3s | Quick generation |
| Risk | 2-3s | Fast analysis |
| Intelligence | 3-5s | More detailed, takes longer |

---

## Keyboard Shortcuts

- `Tab` - Navigate between form fields
- `Enter` - Submit form (when button focused)
- `Ctrl+C` / `Cmd+C` - Copy generated email

---

## Error Messages

| Error | Meaning | Solution |
|-------|---------|----------|
| "Please select a customer" | No customer chosen | Pick from dropdown |
| "Failed to fetch..." | API error | Check internet, restart backend |
| "Error generating..." | AI processing failed | Try again, check data |
| "Cannot find module" | Missing dependency | Run `npm install` |

---

## Data Requirements

For best results, your CRM should have:
- ✅ At least 5 customers
- ✅ Multiple deals in different stages
- ✅ Recent activities and notes
- ✅ Accurate close dates
- ✅ Detailed customer information

Use `npm run load-data` in the backend to load sample data if needed.

---

## Settings & Customization

### Add AI to Dashboard
Edit `frontend/src/components/Dashboard.js`:
```javascript
import AIInsights from './AIInsights';

// Add to dashboard
<AIInsights />
```

### Modify AI Behavior
Edit `backend/services/aiService.js` to customize prompts and analysis logic

### Change Colors/Styling
Edit CSS files in `frontend/src/styles/AI*.css`

---

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Move to next field |
| `Shift+Tab` | Move to previous field |
| `Enter` | Submit form or click button |
| `Escape` | May close modals (in future) |

---

## Mobile Usage

AI Suite is fully responsive:
- ✅ Works on tablets
- ✅ Works on mobile phones
- ✅ Touch-friendly buttons
- ✅ Scrollable on small screens

---

## Offline Capability

- ❌ NOT available offline (requires OpenAI API)
- ⚠️ Requires internet connection
- ⚠️ Requires valid API key

---

## Support & Help

For detailed documentation: See `AI_FEATURES.md`
For implementation notes: See `AI_IMPLEMENTATION_SUMMARY.md`
For overall project info: See `README.md`

---

## Keyboard Shortcuts (Advanced)

### Developer Console
Press `F12` to open browser console for debugging

### Clear Cache
If something seems wrong:
1. Ctrl+Shift+Del (or Cmd+Shift+Del)
2. Select "Cached images and files"
3. Clear data
4. Refresh page

---

## Version Information

- **AI Model**: Claude 3.5 Sonnet (via OpenAI API)
- **Frontend**: React 18.2.0
- **Backend**: Node.js + Express
- **Database**: SQLite3
- **Release**: Full Production Build

---

**Need help? Check AI_FEATURES.md for comprehensive documentation!**
