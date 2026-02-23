const express = require("express");
const router = express.Router();
const db = require("../db");

// Correct import of AdminRoutes
const adminRoute = require("./AdminRoutes"); // ← matches your file exactly

// POST request to book an appointment
router.post("/", (req, res) => {
  const {
    full_name,
    phone,
    email,
    service_id,
    preferred_treatment_type,
    preferred_date,
    message
  } = req.body;

  // Validate required fields
  if (!full_name || !phone || !email || !service_id || !preferred_date) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const sql = `
    INSERT INTO appointments 
      (full_name, phone, email, service_id, preferred_treatment_type, preferred_date, message, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())
  `;

  db.query(
    sql,
    [
      full_name,
      phone,
      email,
      service_id,
      preferred_treatment_type || "",
      preferred_date,
      message || ""
    ],
    (err, result) => {
      if (err) {
        console.log("SQL ERROR:", err); // log the exact database error
        return res.status(500).json({ message: "Database error" });
      }

      res.status(201).json({
        message: "Appointment booked successfully",
        appointmentId: result.insertId
      });
    }
  );
});

module.exports = router;
