const express = require('express');
const router = express.Router();
const db = require('../db');
const { sendNewContactEmail } = require('../utils/email');

router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;
  
  await db.query('INSERT INTO contact (name, email, phone, message) VALUES (?, ?, ?, ?)', 
    [name, email, phone, message]);
  
  await sendNewContactEmail({ name, email, phone, message });
  
  res.json({ success: true, message: 'Message sent successfully' });
});

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM contact ORDER BY created_at DESC');
  res.json(rows);
});

router.delete('/:id', async (req, res) => {
  await db.query('DELETE FROM contact WHERE id = ?', [req.params.id]);
  res.json({ message: 'Message deleted' });
});

module.exports = router;