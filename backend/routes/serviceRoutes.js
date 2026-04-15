const express = require('express');
const router = express.Router();
const db = require('../db');

/* ================= MULTER SETUP ================= */
const multer = require('multer');
const path = require('path');

// storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // make sure folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

/* ================= GET ALL ================= */
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM services ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({ message: 'Failed to fetch services', error: err.message });
  }
});

/* ================= GET ONE ================= */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM services WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Service not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error("GET ONE ERROR:", err);
    res.status(500).json({ message: 'Failed to fetch service', error: err.message });
  }
});

/* ================= CREATE ================= */
router.post('/', upload.single('image'), async (req, res) => {
  const { name, description } = req.body;
  const image = req.file ? req.file.filename : null;

  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  try {
    const [result] = await db.query(
      'INSERT INTO services (name, description, image) VALUES (?, ?, ?)',
      [name, description, image]
    );

    res.status(201).json({
      message: 'Service created',
      id: result.insertId
    });
  } catch (err) {
    console.error("POST ERROR:", err);
    res.status(500).json({
      message: 'Failed to create service',
      error: err.message
    });
  }
});

/* ================= UPDATE (FIXED - WITH IMAGE SUPPORT) ================= */
router.put('/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  
  console.log("=== UPDATE SERVICE ===");
  console.log("ID:", id);
  console.log("Name:", name);
  console.log("Description:", description);
  console.log("Has new image:", !!req.file);
  
  if (!name) {
    return res.status(400).json({ error: "Service name is required" });
  }
  
  try {
    let query;
    let params;
    
    if (req.file) {
      // With new image
      const imageFilename = req.file.filename;
      query = "UPDATE services SET name = ?, description = ?, image = ? WHERE id = ?";
      params = [name, description || null, imageFilename, id];
      console.log("Updating with new image:", imageFilename);
    } else {
      // Without new image
      query = "UPDATE services SET name = ?, description = ? WHERE id = ?";
      params = [name, description || null, id];
      console.log("Updating without image change");
    }
    
    const [result] = await db.query(query, params);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Service not found" });
    }
    
    console.log("Update successful!");
    res.json({ 
      success: true, 
      message: "Service updated successfully" 
    });
    
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ 
      error: "Failed to update service",
      details: err.message 
    });
  }
});

/* ================= DELETE ================= */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM services WHERE id = ?', [id]);
    res.json({ message: 'Service deleted' });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: 'Failed to delete service', error: err.message });
  }
});

module.exports = router;