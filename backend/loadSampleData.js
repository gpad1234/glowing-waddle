const db = require('./database');

// Sample data
const sampleCustomers = [
  {
    name: 'Acme Corporation',
    email: 'contact@acme.com',
    phone: '+1-555-0101',
    company: 'Acme Corporation',
    industry: 'Technology',
    address: '123 Tech Avenue',
    city: 'San Francisco',
    state: 'CA',
    zipcode: '94102',
    country: 'USA',
    status: 'active',
  },
  {
    name: 'Global Solutions Ltd',
    email: 'info@globalsolutions.com',
    phone: '+1-555-0102',
    company: 'Global Solutions Ltd',
    industry: 'Consulting',
    address: '456 Business Blvd',
    city: 'New York',
    state: 'NY',
    zipcode: '10001',
    country: 'USA',
    status: 'active',
  },
  {
    name: 'TechStart Industries',
    email: 'hello@techstart.com',
    phone: '+1-555-0103',
    company: 'TechStart Industries',
    industry: 'Software',
    address: '789 Innovation Drive',
    city: 'Austin',
    state: 'TX',
    zipcode: '78701',
    country: 'USA',
    status: 'active',
  },
  {
    name: 'Enterprise Systems Inc',
    email: 'sales@enterprisesys.com',
    phone: '+1-555-0104',
    company: 'Enterprise Systems Inc',
    industry: 'IT Services',
    address: '321 Corporate Park',
    city: 'Seattle',
    state: 'WA',
    zipcode: '98101',
    country: 'USA',
    status: 'active',
  },
  {
    name: 'Digital Innovations',
    email: 'contact@digitalinnovations.com',
    phone: '+1-555-0105',
    company: 'Digital Innovations',
    industry: 'Digital Marketing',
    address: '654 Media Lane',
    city: 'Los Angeles',
    state: 'CA',
    zipcode: '90001',
    country: 'USA',
    status: 'prospect',
  },
];

const sampleContacts = [
  {
    customerId: 1,
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@acme.com',
    phone: '+1-555-0201',
    position: 'CEO',
    department: 'Executive',
  },
  {
    customerId: 1,
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@acme.com',
    phone: '+1-555-0202',
    position: 'CTO',
    department: 'Technology',
  },
  {
    customerId: 2,
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@globalsolutions.com',
    phone: '+1-555-0203',
    position: 'VP Sales',
    department: 'Sales',
  },
  {
    customerId: 2,
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@globalsolutions.com',
    phone: '+1-555-0204',
    position: 'Account Manager',
    department: 'Accounts',
  },
  {
    customerId: 3,
    firstName: 'Robert',
    lastName: 'Wilson',
    email: 'robert.wilson@techstart.com',
    phone: '+1-555-0205',
    position: 'Founder',
    department: 'Executive',
  },
  {
    customerId: 4,
    firstName: 'Jennifer',
    lastName: 'Martinez',
    email: 'jennifer.martinez@enterprisesys.com',
    phone: '+1-555-0206',
    position: 'Director',
    department: 'Operations',
  },
  {
    customerId: 5,
    firstName: 'David',
    lastName: 'Anderson',
    email: 'david.anderson@digitalinnovations.com',
    phone: '+1-555-0207',
    position: 'Marketing Manager',
    department: 'Marketing',
  },
];

const sampleDeals = [
  {
    customerId: 1,
    title: 'Enterprise Software License',
    description: 'Annual software license renewal with premium support',
    value: 75000,
    stage: 'proposal',
    probability: 75,
    expectedCloseDate: '2025-12-31',
    owner: 'Alice Thompson',
  },
  {
    customerId: 1,
    title: 'Cloud Migration Project',
    description: 'Migrate existing infrastructure to cloud',
    value: 150000,
    stage: 'negotiation',
    probability: 60,
    expectedCloseDate: '2026-01-31',
    owner: 'Bob Stevens',
  },
  {
    customerId: 2,
    title: 'Consulting Services Contract',
    description: '6-month consulting engagement',
    value: 120000,
    stage: 'closed-won',
    probability: 100,
    expectedCloseDate: '2025-11-15',
    owner: 'Alice Thompson',
  },
  {
    customerId: 3,
    title: 'API Integration Deal',
    description: 'Custom API development and integration',
    value: 45000,
    stage: 'qualification',
    probability: 50,
    expectedCloseDate: '2026-02-28',
    owner: 'Charlie Davis',
  },
  {
    customerId: 4,
    title: 'IT Infrastructure Upgrade',
    description: 'Hardware and network infrastructure upgrade',
    value: 200000,
    stage: 'prospecting',
    probability: 30,
    expectedCloseDate: '2026-03-31',
    owner: 'Bob Stevens',
  },
  {
    customerId: 5,
    title: 'Social Media Campaign',
    description: '3-month social media marketing campaign',
    value: 35000,
    stage: 'proposal',
    probability: 70,
    expectedCloseDate: '2025-12-15',
    owner: 'Alice Thompson',
  },
];

const sampleActivities = [
  {
    customerId: 1,
    type: 'call',
    subject: 'Initial discovery call',
    description: 'Discussed company needs and pain points',
    dueDate: '2025-11-25',
    status: 'completed',
    priority: 'high',
    assignedTo: 'Alice Thompson',
  },
  {
    customerId: 1,
    type: 'email',
    subject: 'Follow-up with proposal',
    description: 'Sent proposal document for review',
    dueDate: '2025-11-28',
    status: 'completed',
    priority: 'high',
    assignedTo: 'Alice Thompson',
  },
  {
    customerId: 1,
    type: 'meeting',
    subject: 'Executive presentation',
    description: 'Present solution to executive team',
    dueDate: '2025-12-05',
    status: 'pending',
    priority: 'high',
    assignedTo: 'Bob Stevens',
  },
  {
    customerId: 2,
    type: 'call',
    subject: 'Contract negotiation',
    description: 'Discuss terms and conditions',
    dueDate: '2025-11-20',
    status: 'completed',
    priority: 'high',
    assignedTo: 'Alice Thompson',
  },
  {
    customerId: 3,
    type: 'email',
    subject: 'Technical specifications needed',
    description: 'Request detailed tech requirements',
    dueDate: '2025-11-30',
    status: 'pending',
    priority: 'medium',
    assignedTo: 'Charlie Davis',
  },
  {
    customerId: 4,
    type: 'meeting',
    subject: 'Budget approval meeting',
    description: 'Get budget approval from finance',
    dueDate: '2025-12-10',
    status: 'pending',
    priority: 'high',
    assignedTo: 'Bob Stevens',
  },
  {
    customerId: 5,
    type: 'call',
    subject: 'Campaign kickoff call',
    description: 'Discuss campaign strategy and timeline',
    dueDate: '2025-11-26',
    status: 'pending',
    priority: 'medium',
    assignedTo: 'Alice Thompson',
  },
];

// Load sample data
const loadSampleData = () => {
  db.serialize(() => {
    // Check if data already exists
    db.get('SELECT COUNT(*) as count FROM customers', [], (err, result) => {
      if (result && result.count > 0) {
        console.log('Sample data already loaded. Skipping...');
        return;
      }

      console.log('Loading sample data...');

      // Insert customers
      sampleCustomers.forEach((customer) => {
        db.run(
          `INSERT INTO customers (name, email, phone, company, industry, address, city, state, zipcode, country, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            customer.name,
            customer.email,
            customer.phone,
            customer.company,
            customer.industry,
            customer.address,
            customer.city,
            customer.state,
            customer.zipcode,
            customer.country,
            customer.status,
          ]
        );
      });

      // Insert contacts
      sampleContacts.forEach((contact) => {
        db.run(
          `INSERT INTO contacts (customerId, firstName, lastName, email, phone, position, department)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            contact.customerId,
            contact.firstName,
            contact.lastName,
            contact.email,
            contact.phone,
            contact.position,
            contact.department,
          ]
        );
      });

      // Insert deals
      sampleDeals.forEach((deal) => {
        db.run(
          `INSERT INTO deals (customerId, title, description, value, stage, probability, expectedCloseDate, owner)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            deal.customerId,
            deal.title,
            deal.description,
            deal.value,
            deal.stage,
            deal.probability,
            deal.expectedCloseDate,
            deal.owner,
          ]
        );
      });

      // Insert activities
      sampleActivities.forEach((activity) => {
        db.run(
          `INSERT INTO activities (customerId, type, subject, description, dueDate, status, priority, assignedTo)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            activity.customerId,
            activity.type,
            activity.subject,
            activity.description,
            activity.dueDate,
            activity.status,
            activity.priority,
            activity.assignedTo,
          ]
        );
      });

      console.log('✅ Sample data loaded successfully!');
      console.log(`   - ${sampleCustomers.length} customers`);
      console.log(`   - ${sampleContacts.length} contacts`);
      console.log(`   - ${sampleDeals.length} deals`);
      console.log(`   - ${sampleActivities.length} activities`);
    });
  });
};

module.exports = loadSampleData;
