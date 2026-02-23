const express = require("express");
const router = express.Router();
const db = require("../db"); // adjust if your db file path is different

router.post("/", (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const sql =
    "INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, phone, message], (err, result) => {
    if (err) {
      console.error("CONTACT INSERT ERROR:", err);
      return res.status(500).json({ message: "Failed to send message" });
    }

    res.json({
      message: "Thank you for contacting us. We will get back to you shortly."
    });
  });
});

module.exports = router;
