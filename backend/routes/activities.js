const express = require('express');
const router = express.Router();
const db = require('../database');

// Get all activities
router.get('/', (req, res) => {
  db.all('SELECT * FROM activities ORDER BY createdAt DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get activities by customer ID
router.get('/customer/:customerId', (req, res) => {
  const { customerId } = req.params;
  
  db.all('SELECT * FROM activities WHERE customerId = ? ORDER BY createdAt DESC', [customerId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get activity by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM activities WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Activity not found' });
      return;
    }
    res.json(row);
  });
});

// Create activity
router.post('/', (req, res) => {
  const { customerId, type, subject, description, dueDate, status, priority, assignedTo } = req.body;

  if (!customerId || !subject) {
    res.status(400).json({ error: 'customerId and subject are required' });
    return;
  }

  db.run(
    `INSERT INTO activities (customerId, type, subject, description, dueDate, status, priority, assignedTo)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [customerId, type, subject, description, dueDate, status || 'pending', priority || 'medium', assignedTo],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Update activity
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { customerId, type, subject, description, dueDate, status, priority, assignedTo } = req.body;

  db.run(
    `UPDATE activities SET customerId = ?, type = ?, subject = ?, description = ?, dueDate = ?, status = ?, priority = ?, assignedTo = ?, updatedAt = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [customerId, type, subject, description, dueDate, status, priority, assignedTo, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Activity not found' });
        return;
      }
      res.json({ message: 'Activity updated' });
    }
  );
});

// Delete activity
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM activities WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Activity not found' });
      return;
    }
    res.json({ message: 'Activity deleted' });
  });
});

module.exports = router;
