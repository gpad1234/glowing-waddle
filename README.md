# CRM Application

A complete Customer Relationship Management (CRM) system built with Node.js backend, React frontend, and SQLite database.

## Project Structure

```
react_screen/
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── database.js
│   ├── .env
│   └── routes/
│       ├── customers.js
│       ├── contacts.js
│       ├── deals.js
│       └── activities.js
└── frontend/
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js
        ├── index.js
        ├── components/
        │   ├── Navigation.js
        │   ├── Dashboard.js
        │   ├── CustomerList.js
        │   ├── CustomerForm.js
        │   ├── CustomerDetail.js
        │   ├── ContactForm.js
        │   ├── DealForm.js
        │   └── ActivityForm.js
        ├── services/
        │   └── api.js
        └── styles/
            ├── global.css
            ├── Navigation.css
            ├── Dashboard.css
            ├── CustomerList.css
            ├── CustomerForm.css
            ├── CustomerDetail.css
            ├── ContactForm.css
            ├── DealForm.css
            └── ActivityForm.css
```

## Features

### Backend (Node.js + Express + SQLite)

- **Customers Management**: Create, read, update, delete customers
- **Contacts Management**: Manage contacts for each customer
- **Deals Management**: Track sales deals and their stages
- **Activities Management**: Log activities related to customers
- RESTful API with CORS support
- SQLite database with proper relationships and cascading deletes

### Frontend (React)

- **Dashboard**: Overview of customers, deals, and statistics
- **Customer Management**: List, create, edit, and view customer details
- **Customer Detail View**: View customer information with related contacts, deals, and activities
- **Forms**: Add contacts, deals, and activities directly from customer pages
- **Navigation**: Easy navigation between different sections
- **Responsive Design**: Works on desktop and mobile devices

## Database Schema

### Tables

1. **customers**: Name, email, phone, company, industry, address, city, state, zipcode, country, status
2. **contacts**: FirstName, LastName, email, phone, position, department, linked to customers
3. **deals**: Title, description, value, stage, probability, expectedCloseDate, owner, linked to customers
4. **activities**: Type, subject, description, dueDate, status, priority, assignedTo, linked to customers

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   or for development with auto-reload:
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will open at `http://localhost:3000`

## API Endpoints

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get customer details with related data
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Contacts
- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/:id` - Get contact by ID
- `GET /api/contacts/customer/:customerId` - Get contacts for a customer
- `POST /api/contacts` - Create new contact
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact

### Deals
- `GET /api/deals` - Get all deals
- `GET /api/deals/:id` - Get deal by ID
- `GET /api/deals/customer/:customerId` - Get deals for a customer
- `POST /api/deals` - Create new deal
- `PUT /api/deals/:id` - Update deal
- `DELETE /api/deals/:id` - Delete deal

### Activities
- `GET /api/activities` - Get all activities
- `GET /api/activities/:id` - Get activity by ID
- `GET /api/activities/customer/:customerId` - Get activities for a customer
- `POST /api/activities` - Create new activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

## Usage

1. **Access the Application**: Open your browser and go to `http://localhost:3000`
2. **Dashboard**: View overall statistics and recent data
3. **Customers**: Manage customer records
4. **Customer Details**: Click on a customer to view all associated information
5. **Add Related Data**: From customer detail page, add contacts, deals, and activities

## Technologies Used

- **Backend**: Node.js, Express.js, SQLite3, CORS, Body-parser
- **Frontend**: React, React Router, Axios
- **Database**: SQLite
- **Styling**: CSS3 with responsive design

## Notes

- The database file `crm.db` is created automatically in the backend directory on first run
- All dates are stored in ISO format
- Cascading deletes are enabled for related records
- The application uses proper error handling and validation
