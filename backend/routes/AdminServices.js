const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to uploads folder
  },
  filename: (req, file, cb) => {
    // Create unique filename with timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext); // e.g., "1634567890123-123456789.jpg"
  }
});

// Filter for image files only
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// GET all services
router.get("/", (req, res) => {
  db.query("SELECT * FROM services", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ADD service with image upload
router.post("/", upload.single("image"), (req, res) => {
  const { name, description } = req.body;
  
  // Check if image was uploaded
  let imagePath = null;
  if (req.file) {
    imagePath = req.file.filename; // Store just the filename
  } else {
    return res.status(400).json({ error: "Image is required" });
  }

  const sql = "INSERT INTO services (name, description, image) VALUES (?,?,?)";
  
  db.query(sql, [name, description, imagePath], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    res.json({ message: "Service added successfully", id: result.insertId });
  });
});

// UPDATE service with image upload
router.put("/:id", upload.single("image"), (req, res) => {
  const { name, description } = req.body;
  const serviceId = req.params.id;
  
  let sql;
  let params;
  
  // If new image is uploaded
  if (req.file) {
    sql = "UPDATE services SET name=?, description=?, image=? WHERE id=?";
    params = [name, description, req.file.filename, serviceId];
  } else {
    // Keep existing image
    sql = "UPDATE services SET name=?, description=? WHERE id=?";
    params = [name, description, serviceId];
  }
  
  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    res.json({ message: "Service updated successfully" });
  });
});

// DELETE service
router.delete("/:id", (req, res) => {
  // First get the image filename to delete it
  db.query("SELECT image FROM services WHERE id=?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json(err);
    
    // Delete from database
    db.query("DELETE FROM services WHERE id=?", [req.params.id], (err) => {
      if (err) return res.status(500).json(err);
      
      // Note: You might want to delete the image file from uploads folder too
      // But that requires fs module and error handling
      
      res.json({ message: "Service deleted" });
    });
  });
});

module.exports = router;