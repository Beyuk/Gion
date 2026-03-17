const express = require('express');
const router = express.Router();
const db = require('../db'); // Your MySQL connection

// GET all services
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM services ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch services', error: err.message });
  }
});

// GET single service
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM services WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Service not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch service', error: err.message });
  }
});

// POST – create service
router.post('/', async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO services (name, price, description) VALUES (?, ?, ?)',
      [name, price, description]
    );
    res.status(201).json({ message: 'Service created', id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create service', error: err.message });
  }
});

// PUT – update service
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  try {
    await db.query(
      'UPDATE services SET name = ?, price = ?, description = ? WHERE id = ?',
      [name, price, description, id]
    );
    res.json({ message: 'Service updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update service', error: err.message });
  }
});

// DELETE – remove service
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM services WHERE id = ?', [id]);
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete service', error: err.message });
  }
});

module.exports = router;