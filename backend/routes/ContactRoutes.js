const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM contact ORDER BY created_at DESC');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;
  await db.query('INSERT INTO contact (name, email, phone, message) VALUES (?, ?, ?, ?)', [name, email, phone, message]);
  res.json({ message: 'Message sent successfully' });
});

router.delete('/:id', async (req, res) => {
  await db.query('DELETE FROM contact WHERE id = ?', [req.params.id]);
  res.json({ message: 'Message deleted' });
});

module.exports = router;