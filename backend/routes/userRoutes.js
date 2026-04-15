// userRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all users (for admin)
router.get('/admin/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
});

// DELETE user by ID (for admin)
router.delete('/admin/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    
    // First check if user exists
    const [existing] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    
    if (existing.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Delete the user
    await db.query('DELETE FROM users WHERE id = ?', [userId]);
    
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Failed to delete user', error: err.message });
  }
});

module.exports = router;