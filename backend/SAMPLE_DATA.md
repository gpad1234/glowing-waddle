# CRM Sample Data Guide

## Overview

The CRM application comes with sample data that is automatically loaded on first run. This document describes the sample data and how to manage it.

## Sample Data Included

The system loads with realistic test data:

### Customers (5)
1. **Acme Corporation** - Technology company in San Francisco
2. **Global Solutions Ltd** - Consulting firm in New York
3. **TechStart Industries** - Software company in Austin
4. **Enterprise Systems Inc** - IT Services in Seattle
5. **Digital Innovations** - Digital Marketing in Los Angeles

### Contacts (7)
- 2 contacts for Acme Corporation
- 2 contacts for Global Solutions Ltd
- 1 contact for TechStart Industries
- 1 contact for Enterprise Systems Inc
- 1 contact for Digital Innovations

### Deals (6)
- Enterprise Software License ($75,000) - Proposal stage
- Cloud Migration Project ($150,000) - Negotiation stage
- Consulting Services Contract ($120,000) - Closed Won
- API Integration Deal ($45,000) - Qualification stage
- IT Infrastructure Upgrade ($200,000) - Prospecting stage
- Social Media Campaign ($35,000) - Proposal stage

**Total Deal Value: $625,000**

### Activities (7)
- Mix of calls, emails, and meetings
- Various statuses: completed, pending
- Different priorities: high, medium
- Assigned to team members

## Data Management Commands

### Automatic Loading (Default)
Sample data loads automatically on first server start if the database is empty.

```powershell
npm start
```

### Manual Load
To manually load sample data:

```powershell
npm run load-data
```

### Clear All Data
To delete all data from the database:

```powershell
npm run clear-data
```

### Reset Database
To clear and reload fresh sample data:

```powershell
npm run reset-data
```

### Export Data
To export current data as JSON file:

```powershell
npm run export-data
```

This creates a `crm-data-export.json` file in the backend directory.

## Database Schema

### Customers Table
```sql
CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  company TEXT,
  industry TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zipcode TEXT,
  country TEXT,
  status TEXT (active|inactive|prospect),
  createdAt DATETIME,
  updatedAt DATETIME
)
```

### Contacts Table
```sql
CREATE TABLE contacts (
  id INTEGER PRIMARY KEY,
  customerId INTEGER NOT NULL,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  position TEXT,
  department TEXT,
  createdAt DATETIME,
  updatedAt DATETIME
)
```

### Deals Table
```sql
CREATE TABLE deals (
  id INTEGER PRIMARY KEY,
  customerId INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  value REAL,
  stage TEXT (prospecting|qualification|proposal|negotiation|closed-won|closed-lost),
  probability INTEGER (0-100),
  expectedCloseDate DATE,
  owner TEXT,
  createdAt DATETIME,
  updatedAt DATETIME
)
```

### Activities Table
```sql
CREATE TABLE activities (
  id INTEGER PRIMARY KEY,
  customerId INTEGER NOT NULL,
  type TEXT (call|email|meeting|task|other),
  subject TEXT NOT NULL,
  description TEXT,
  dueDate DATE,
  status TEXT (pending|in-progress|completed|cancelled),
  priority TEXT (low|medium|high),
  assignedTo TEXT,
  createdAt DATETIME,
  updatedAt DATETIME
)
```

## Sample Data Values

### Status Fields

**Customer Status:**
- `active` - Active customer
- `inactive` - Inactive customer
- `prospect` - Prospect/potential customer

**Deal Stage:**
- `prospecting` - Initial stage
- `qualification` - Qualifying the opportunity
- `proposal` - Proposal sent
- `negotiation` - Negotiating terms
- `closed-won` - Deal closed and won
- `closed-lost` - Deal lost

**Activity Status:**
- `pending` - Not started
- `in-progress` - Currently being worked on
- `completed` - Finished
- `cancelled` - Cancelled

**Priority:**
- `low` - Low priority
- `medium` - Medium priority
- `high` - High priority

**Activity Type:**
- `call` - Phone call
- `email` - Email communication
- `meeting` - In-person or virtual meeting
- `task` - Task to complete
- `other` - Other type

## Data Relationships

- **One Customer → Many Contacts**: A customer can have multiple contacts
- **One Customer → Many Deals**: A customer can have multiple deals
- **One Customer → Many Activities**: A customer can have multiple activities

## Testing Workflows

### Test 1: View Dashboard
1. Start the application
2. Sample data loads automatically
3. Dashboard shows statistics:
   - 5 total customers
   - 6 total deals
   - $625,000 total deal value
   - Various active deals

### Test 2: Create a New Customer
1. Click "Customers" → "+ New Customer"
2. Fill in customer details
3. Click "Create Customer"
4. New customer appears in list

### Test 3: Add Contact to Existing Customer
1. Click on any customer name
2. Go to "Contacts" tab
3. Click "+ Add Contact"
4. Fill in contact details
5. Click "Create Contact"

### Test 4: Add Deal to Customer
1. From customer detail page
2. Go to "Deals" tab
3. Click "+ Add Deal"
4. Fill in deal information
5. Click "Create Deal"

### Test 5: Log Activity
1. From customer detail page
2. Go to "Activities" tab
3. Click "+ Add Activity"
4. Fill in activity details
5. Click "Create Activity"

## Modifying Sample Data

To modify sample data, edit `loadSampleData.js`:

```javascript
const sampleCustomers = [
  {
    name: 'Your Company Name',
    email: 'email@company.com',
    // ... other fields
  },
  // Add more customers
];
```

Then run:
```powershell
npm run reset-data
```

## Troubleshooting

### Data not loading on startup
- Check if database already has data: `npm run export-data`
- Manually load: `npm run load-data`
- Check server console for errors

### Want to start fresh
```powershell
npm run reset-data
```

### Want to save current data before clearing
```powershell
npm run export-data
# Then manually load with your own data
```

## Performance Notes

- Sample dataset is optimized for testing
- Real production databases may contain millions of records
- Adjust queries for pagination as needed for large datasets
- Consider adding indexes on frequently queried fields

## Next Steps

After loading sample data:
1. Explore the dashboard and customer records
2. Test adding new records
3. Modify data through the UI
4. Export data to see the format
5. Build additional features as needed
