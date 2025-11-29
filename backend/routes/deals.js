const express = require('express');
const router = express.Router();
const db = require('../database');

// Get all deals
router.get('/', (req, res) => {
  db.all('SELECT * FROM deals ORDER BY createdAt DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get deals by customer ID
router.get('/customer/:customerId', (req, res) => {
  const { customerId } = req.params;
  
  db.all('SELECT * FROM deals WHERE customerId = ? ORDER BY createdAt DESC', [customerId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get deal by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM deals WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Deal not found' });
      return;
    }
    res.json(row);
  });
});

// Create deal
router.post('/', (req, res) => {
  const { customerId, title, description, value, stage, probability, expectedCloseDate, owner } = req.body;

  if (!customerId || !title) {
    res.status(400).json({ error: 'customerId and title are required' });
    return;
  }

  db.run(
    `INSERT INTO deals (customerId, title, description, value, stage, probability, expectedCloseDate, owner)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [customerId, title, description, value, stage || 'prospecting', probability || 0, expectedCloseDate, owner],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Update deal
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { customerId, title, description, value, stage, probability, expectedCloseDate, owner } = req.body;

  db.run(
    `UPDATE deals SET customerId = ?, title = ?, description = ?, value = ?, stage = ?, probability = ?, expectedCloseDate = ?, owner = ?, updatedAt = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [customerId, title, description, value, stage, probability, expectedCloseDate, owner, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Deal not found' });
        return;
      }
      res.json({ message: 'Deal updated' });
    }
  );
});

// Delete deal
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM deals WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Deal not found' });
      return;
    }
    res.json({ message: 'Deal deleted' });
  });
});

module.exports = router;
