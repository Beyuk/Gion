const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all users
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
});

module.exports = router;