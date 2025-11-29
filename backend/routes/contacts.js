const express = require('express');
const router = express.Router();
const db = require('../database');

// Get all contacts
router.get('/', (req, res) => {
  db.all('SELECT * FROM contacts ORDER BY createdAt DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get contacts by customer ID
router.get('/customer/:customerId', (req, res) => {
  const { customerId } = req.params;
  
  db.all('SELECT * FROM contacts WHERE customerId = ? ORDER BY createdAt DESC', [customerId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get contact by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM contacts WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Contact not found' });
      return;
    }
    res.json(row);
  });
});

// Create contact
router.post('/', (req, res) => {
  const { customerId, firstName, lastName, email, phone, position, department } = req.body;

  if (!customerId || !firstName || !lastName) {
    res.status(400).json({ error: 'customerId, firstName, and lastName are required' });
    return;
  }

  db.run(
    `INSERT INTO contacts (customerId, firstName, lastName, email, phone, position, department)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [customerId, firstName, lastName, email, phone, position, department],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Update contact
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { customerId, firstName, lastName, email, phone, position, department } = req.body;

  db.run(
    `UPDATE contacts SET customerId = ?, firstName = ?, lastName = ?, email = ?, phone = ?, position = ?, department = ?, updatedAt = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [customerId, firstName, lastName, email, phone, position, department, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Contact not found' });
        return;
      }
      res.json({ message: 'Contact updated' });
    }
  );
});

// Delete contact
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM contacts WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Contact not found' });
      return;
    }
    res.json({ message: 'Contact deleted' });
  });
});

module.exports = router;
