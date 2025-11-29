const express = require('express');
const router = express.Router();
const db = require('../database');

// Get all customers
router.get('/', (req, res) => {
  db.all('SELECT * FROM customers ORDER BY createdAt DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get customer by ID with contacts, deals, and activities
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM customers WHERE id = ?', [id], (err, customer) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }

    // Get related data
    db.all('SELECT * FROM contacts WHERE customerId = ?', [id], (err, contacts) => {
      db.all('SELECT * FROM deals WHERE customerId = ?', [id], (err, deals) => {
        db.all('SELECT * FROM activities WHERE customerId = ?', [id], (err, activities) => {
          customer.contacts = contacts || [];
          customer.deals = deals || [];
          customer.activities = activities || [];
          res.json(customer);
        });
      });
    });
  });
});

// Create customer
router.post('/', (req, res) => {
  const { name, email, phone, company, industry, address, city, state, zipcode, country, status } = req.body;

  if (!name) {
    res.status(400).json({ error: 'Name is required' });
    return;
  }

  db.run(
    `INSERT INTO customers (name, email, phone, company, industry, address, city, state, zipcode, country, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, email, phone, company, industry, address, city, state, zipcode, country, status || 'active'],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Update customer
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, phone, company, industry, address, city, state, zipcode, country, status } = req.body;

  db.run(
    `UPDATE customers SET name = ?, email = ?, phone = ?, company = ?, industry = ?, 
     address = ?, city = ?, state = ?, zipcode = ?, country = ?, status = ?, updatedAt = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [name, email, phone, company, industry, address, city, state, zipcode, country, status, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Customer not found' });
        return;
      }
      res.json({ message: 'Customer updated' });
    }
  );
});

// Delete customer
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM customers WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }
    res.json({ message: 'Customer deleted' });
  });
});

module.exports = router;
