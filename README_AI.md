# 🚀 AI-Powered CRM Application

A complete, production-ready Customer Relationship Management (CRM) system with cutting-edge AI capabilities built with Node.js backend, React frontend, and SQLite database.

## ✨ What's New: AI Suite

Your CRM now includes **5 powerful AI-powered features** leveraging Claude 3.5 Sonnet:

- 💡 **AI Business Insights** - Strategic analysis of your CRM data
- 👥 **Personalized Sales Coaching** - Customer-specific engagement strategies
- 📧 **Email Template Generator** - AI-generated professional sales emails
- ⚠️ **Deal Risk Analyzer** - Intelligent deal risk assessment
- 🔍 **Customer Intelligence** - Deep customer profile analysis

**→ Navigate to `/ai` in your browser to access the AI Suite**

## 🎯 Quick Start

### Prerequisites
- Node.js (v14+)
- npm
- OpenAI API key (for AI features)

### Installation

**1. Clone/setup the project:**
```bash
cd react_screen
```

**2. Backend Setup:**
```bash
cd backend
npm install
```

**Create `.env` file with:**
```
PORT=5000
OPENAI_API_KEY=sk-your-key-here
```

**3. Frontend Setup:**
```bash
cd ../frontend
npm install
```

**4. Start Backend (Terminal 1):**
```bash
cd backend
npm start
```

**5. Start Frontend (Terminal 2):**
```bash
cd frontend
npm start
```

**6. Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- AI Suite: http://localhost:3000/ai

## 📚 Documentation

- **[AI_FEATURES.md](./AI_FEATURES.md)** - Comprehensive AI feature documentation
- **[AI_QUICK_REFERENCE.md](./AI_QUICK_REFERENCE.md)** - Quick reference guide
- **[AI_IMPLEMENTATION_SUMMARY.md](./AI_IMPLEMENTATION_SUMMARY.md)** - Implementation overview
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture & design
- **[QUICKSTART.md](./QUICKSTART.md)** - Getting started guide
- **[ANALYTICS.md](./ANALYTICS.md)** - Analytics features

## 🏗️ Project Structure

```
react_screen/
├── backend/
│   ├── routes/
│   │   ├── ai.js ........................ AI endpoints
│   │   ├── analytics.js
│   │   ├── customers.js
│   │   ├── contacts.js
│   │   ├── deals.js
│   │   └── activities.js
│   ├── services/
│   │   ├── aiService.js ................. AI processing
│   │   └── analyticsService.js
│   ├── server.js
│   ├── database.js
│   ├── loadSampleData.js
│   ├── .env ............................ API keys
│   └── package.json
│
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── AIPage.js .............. AI Hub
│       │   ├── AIInsights.js
│       │   ├── SalesCoaching.js
│       │   ├── EmailGenerator.js
│       │   ├── DealRiskAnalyzer.js
│       │   ├── CustomerIntelligence.js
│       │   ├── Navigation.js
│       │   ├── Dashboard.js
│       │   ├── AnalyticsDashboard.js
│       │   ├── DealRecommendations.js
│       │   ├── CustomerList.js
│       │   ├── CustomerForm.js
│       │   ├── CustomerDetail.js
│       │   └── ... more components
│       ├── styles/
│       │   ├── AIPage.css
│       │   ├── AIInsights.css
│       │   ├── SalesCoaching.css
│       │   ├── EmailGenerator.css
│       │   ├── DealRiskAnalyzer.css
│       │   ├── CustomerIntelligence.css
│       │   └── ... more styles
│       ├── services/
│       │   └── api.js
│       └── App.js
│
├── AI_FEATURES.md .................... AI documentation
├── AI_QUICK_REFERENCE.md ............ Quick guide
├── AI_IMPLEMENTATION_SUMMARY.md ...... Implementation
├── ARCHITECTURE.md ................... System design
├── README.md (this file)
├── QUICKSTART.md
└── ANALYTICS.md
```

## 🎓 Core Features

### Backend

#### Database (SQLite)
- **Customers**: Company information, contact details, status tracking
- **Contacts**: Individual contacts per customer with roles
- **Deals**: Sales pipeline with stages and probability
- **Activities**: Tasks, calls, emails with due dates and status

#### API Endpoints
- `/api/customers` - CRUD operations for customers
- `/api/contacts` - CRUD operations for contacts
- `/api/deals` - CRUD operations for deals
- `/api/activities` - CRUD operations for activities
- `/api/analytics/*` - Analytics and insights
- `/api/ai/*` - **NEW** AI-powered features

#### AI Endpoints
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/ai/insights` | GET | Generate business insights |
| `/api/ai/coaching/:customerId` | GET | Personalized coaching |
| `/api/ai/email-template` | POST | Generate sales emails |
| `/api/ai/deal-risk/:dealId` | GET | Assess deal risk |
| `/api/ai/customer-intelligence/:customerId` | GET | Customer analysis |

### Frontend

#### Navigation & Routing
- Dashboard with KPI metrics
- Customer management (list, create, edit, delete)
- Related entities (contacts, deals, activities)
- Analytics dashboard
- **AI Suite** (new centralized hub)

#### Pages
- **Dashboard**: Overview with key metrics
- **Analytics**: CRM analytics and trends
- **Recommendations**: Deal recommendations
- **AI Suite**: All AI features in one place
- **Customers**: Customer management
- **Deals**: Sales pipeline
- **Activities**: Task management

#### UI Components
- Responsive design for mobile/tablet/desktop
- Form validation
- Loading states
- Error handling
- Status badges
- Progress indicators

## 🤖 AI Features in Detail

### 1. Business Insights
```
Endpoint: GET /api/ai/insights
Purpose: Generate strategic insights from CRM data
Output: 3-5 insights with recommendations and priorities
```

### 2. Sales Coaching
```
Endpoint: GET /api/ai/coaching/:customerId
Purpose: Personalized coaching for each customer
Output: Strengths, opportunities, next steps, tips
```

### 3. Email Generator
```
Endpoint: POST /api/ai/email-template
Purpose: Generate professional sales emails
Output: Subject line + email body ready to send
```

### 4. Risk Analyzer
```
Endpoint: GET /api/ai/deal-risk/:dealId
Purpose: AI risk assessment of deals
Output: Risk score, factors, warnings, mitigation
```

### 5. Customer Intelligence
```
Endpoint: GET /api/ai/customer-intelligence/:customerId
Purpose: Deep customer analysis and opportunities
Output: Buying signals, decision makers, upsell opportunities
```

## 🔒 Security

- **API Keys**: Stored securely in backend `.env` (never exposed to frontend)
- **CORS**: Configured for local development
- **Validation**: Request validation on all endpoints
- **Error Handling**: Graceful error responses
- **Database**: SQLite with proper schema and indexes

## 📊 Sample Data

The application comes with sample data loader that includes:
- 5 sample customers with varied industries
- 7 contacts across customers
- 6 deals in different pipeline stages
- 7 activities with varied types

**To load sample data:**
```bash
cd backend
npm run load-data
```

## 🚀 Usage Examples

### Access AI Suite
1. Open http://localhost:3000/ai
2. Click "🤖 AI Suite" in navigation
3. Select a feature from tabs
4. Follow on-screen prompts

### Generate Business Insights
```bash
curl http://localhost:5000/api/ai/insights
```

### Get Sales Coaching
```bash
curl http://localhost:5000/api/ai/coaching/1
```

### Generate Email
```bash
curl -X POST http://localhost:5000/api/ai/email-template \
  -H "Content-Type: application/json" \
  -d '{"customerId": 1, "templateType": "followup"}'
```

### Analyze Deal Risk
```bash
curl http://localhost:5000/api/ai/deal-risk/1
```

### Get Customer Intelligence
```bash
curl http://localhost:5000/api/ai/customer-intelligence/1
```

## 📈 Tech Stack

**Frontend**
- React 18.2.0
- React Router 6.8.0
- Axios (HTTP client)
- CSS3 with responsive design

**Backend**
- Node.js
- Express 4.18.2
- SQLite3
- OpenAI 4.20.0 (AI integration)
- dotenv (environment configuration)

**AI**
- OpenAI API
- Claude 3.5 Sonnet model
- Streaming responses
- JSON output parsing

## 🔧 Configuration

### Environment Variables (.env)
```
PORT=5000
OPENAI_API_KEY=sk-your-key-here
ANTHROPIC_API_KEY=optional-for-future
CLAUDE_CODE_KEY=optional-for-future
```

### Database
- SQLite3 database stored at `backend/crm.db`
- Automatic initialization on first run
- Schema includes 4 main tables + relationships

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot find module" | Run `npm install` in backend and frontend |
| "Port 5000 in use" | Change PORT in `.env` or kill process on port |
| "OpenAI API error" | Check API key in `.env`, verify credits |
| "Database locked" | Restart backend server |
| "No data showing" | Run `npm run load-data` in backend |
| "Slow AI responses" | OpenAI calls take 2-5s - this is normal |

## 📱 Responsive Design

The application is fully responsive:
- ✅ Desktop (1200px+)
- ✅ Tablet (768px-1199px)
- ✅ Mobile (320px-767px)

## 🎯 Key Highlights

✅ **Complete CRM System** - Full customer lifecycle management
✅ **AI-Powered** - Claude 3.5 Sonnet integration
✅ **Production-Ready** - Error handling, validation, security
✅ **Modern Stack** - React + Node.js + SQLite
✅ **Responsive UI** - Works on all devices
✅ **Well-Documented** - Comprehensive guides and API docs
✅ **Sample Data** - Comes with realistic test data
✅ **Easy to Extend** - Modular component architecture

## 🚀 Next Steps

1. **Load Sample Data**: `npm run load-data` (backend)
2. **Start Backend**: `npm start` (backend)
3. **Start Frontend**: `npm start` (frontend)
4. **Visit AI Suite**: http://localhost:3000/ai
5. **Explore Features**: Try each AI capability

## 📞 Support

For detailed documentation:
- **Quick Start**: See [QUICKSTART.md](./QUICKSTART.md)
- **AI Features**: See [AI_FEATURES.md](./AI_FEATURES.md)
- **Quick Reference**: See [AI_QUICK_REFERENCE.md](./AI_QUICK_REFERENCE.md)
- **Architecture**: See [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Analytics**: See [ANALYTICS.md](./ANALYTICS.md)

## 📝 License

This project is provided as-is for educational and commercial use.

## 🎉 Summary

You have a **complete, AI-powered CRM system** ready to use:

- ✅ Full customer, contact, deal, and activity management
- ✅ Advanced analytics with NLP
- ✅ AI-powered insights, coaching, and recommendations
- ✅ Professional email generation
- ✅ Deal risk assessment
- ✅ Customer intelligence reports
- ✅ Responsive, modern UI
- ✅ Production-ready code quality

**Start exploring your AI-powered CRM today! 🚀**

For the latest documentation, check the markdown files in the project root:
- `AI_FEATURES.md` - Complete API reference
- `AI_QUICK_REFERENCE.md` - Quick command reference
- `ARCHITECTURE.md` - System design and data flow
- `QUICKSTART.md` - Getting started guide
