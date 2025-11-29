# Quick Start Guide

## Installation & Running the CRM Application

### Step 1: Install Backend Dependencies

Open PowerShell and navigate to the backend folder:

```powershell
cd c:\Users\giris\node-work\react_screen\backend
npm install
```

### Step 2: Start the Backend Server

```powershell
npm start
```

You should see:
```
CRM Backend server is running on http://localhost:5000
Connected to SQLite database at: ...
Database tables created successfully
```

### Step 3: Install Frontend Dependencies

Open a new PowerShell terminal and navigate to the frontend folder:

```powershell
cd c:\Users\giris\node-work\react_screen\frontend
npm install
```

### Step 4: Start the Frontend Application

```powershell
npm start
```

The React app will automatically open at `http://localhost:3000`

## What You Can Do

### Dashboard
- View total customers, deals, and revenue
- See recent customer and deal activity

### Customers
- **View**: Click "Customers" in the navigation to see all customers
- **Create**: Click "+ New Customer" button and fill the form
- **Edit**: Click "Edit" on any customer row
- **Delete**: Click "Delete" on any customer row
- **View Details**: Click on a customer name to see all associated data

### Customer Detail Page
Once you open a customer, you can:
- View complete customer information
- Switch between tabs (Overview, Contacts, Deals, Activities)
- Add new contacts, deals, or activities specific to that customer

### Quick Actions from Customer Detail
- **+ Add Contact**: Add a person to this customer
- **+ Add Deal**: Add a potential or active deal
- **+ Add Activity**: Log a call, email, meeting, or task

## Test the Application

1. **Create a Customer**:
   - Click "Customers" → "+ New Customer"
   - Fill in the form and click "Create Customer"

2. **Add a Contact**:
   - From the customer detail page, go to "Contacts" tab
   - Click "+ Add Contact" and fill the form

3. **Add a Deal**:
   - From the customer detail page, go to "Deals" tab
   - Click "+ Add Deal" and fill the form

4. **Add an Activity**:
   - From the customer detail page, go to "Activities" tab
   - Click "+ Add Activity" and fill the form

## Troubleshooting

### Backend won't start
- Make sure port 5000 is not in use
- Check if SQLite is properly installed: `npm list sqlite3`

### Frontend won't connect to backend
- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify the proxy in `frontend/package.json` is set to `http://localhost:5000`

### Port already in use
To change ports:
- Backend: Update PORT in `.env` file (default: 5000)
- Frontend: Use `PORT=3001 npm start` (if port 3000 is in use)

## Database
- SQLite database file: `backend/crm.db`
- Auto-created on first run
- All data is persistent between application restarts
