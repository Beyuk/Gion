const express = require("express");
const router = express.Router();
const db = require("../db");

// GET services
router.get("/", (req, res) => {
  db.query("SELECT * FROM services", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ADD service
router.post("/", (req, res) => {
  const { title, description, price, image } = req.body;

  const sql = "INSERT INTO services (title, description, price, image) VALUES (?,?,?,?)";

  db.query(sql, [title, description, price, image], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Service added successfully" });
  });
});

// DELETE service
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM services WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Service deleted" });
  });
});

// UPDATE service
router.put("/:id", (req, res) => {
  const { title, description, price } = req.body;

  const sql =
    "UPDATE services SET title=?, description=?, price=? WHERE id=?";

  db.query(sql, [title, description, price, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Service updated" });
  });
});

module.exports = router;