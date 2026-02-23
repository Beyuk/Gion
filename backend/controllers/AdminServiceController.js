const db = require("../db");

// GET all services (admin)
exports.getAllServices = (req, res) => {
  const sql = "SELECT * FROM services ORDER BY created_at DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("GET SERVICES ERROR:", err);
      return res.status(500).json({ message: "Failed to load services" });
    }
    res.json(results);
  });
};

// ADD service
exports.addService = (req, res) => {
  const { name, description, price, status } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO services (name, description, price, image, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, description, price, image, status], (err) => {
    if (err) {
      console.error("ADD SERVICE ERROR:", err);
      return res.status(500).json({ message: "Failed to add service" });
    }
    res.json({ message: "Service added successfully" });
  });
};

// DELETE service
exports.deleteService = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM services WHERE id = ?", [id], (err) => {
    if (err) {
      console.error("DELETE SERVICE ERROR:", err);
      return res.status(500).json({ message: "Failed to delete service" });
    }
    res.json({ message: "Service deleted" });
  });
};
