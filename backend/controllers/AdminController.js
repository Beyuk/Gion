const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "secretkey";



// REGISTER ADMIN
exports.registerAdmin = (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query(
    "INSERT INTO admins (email, password) VALUES (?, ?)",
    [email, hashedPassword],
    (err) => {
      if (err) return res.status(500).json({ message: "Database error" });
      res.json({ message: "Admin registered successfully" });
    }
  );
};

// LOGIN ADMIN (YOUR WORKING CODE - UNTOUCHED)
exports.loginAdmin = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM admins WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (result.length === 0) return res.status(404).json({ message: "Admin not found" });

    const admin = result[0];
    if (!bcrypt.compareSync(password, admin.password)) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: admin.id }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ message: "Login successful", token });
  });
};

// GET APPOINTMENTS
exports.getAppointments = (req, res) => {
  db.query(
    `SELECT 
       id,
       full_name AS patient,
       phone,
       email,
       service_id,
       preferred_treatment_type,
       preferred_date,
       message,
       status,
       created_at
     FROM appointments
     ORDER BY created_at DESC`,
    (err, result) => {
      if (err) {
        console.log("Query error:", err.message);
        return res.status(500).json({ message: "Database error" });
      }
      res.json(result);
    }
  );
};

// UPDATE STATUS
exports.updateAppointmentStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) return res.status(400).json({ message: "Status required" });

  db.query(
    "UPDATE appointments SET status = ? WHERE id = ?",
    [status, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Update failed" });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Not found" });
      res.json({ message: `Status changed to ${status}` });
    }
  );
};

// DASHBOARD
exports.dashboard = (req, res) => {
  res.json({ message: "Dashboard is working" });
};

// CONTACT MESSAGES
exports.getContactMessages = (req, res) => {
  res.json([]);
};

exports.deleteContactMessage = (req, res) => {
  res.json({ message: "Deleted" });
};