const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "secretkey";

// ====================== REGISTER ADMIN ======================
exports.registerAdmin = (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query(
    "INSERT INTO admins (email, password) VALUES (?, ?)",
    [email, hashedPassword],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Admin registered successfully" });
    }
  );
};

// ====================== LOGIN ADMIN ======================
exports.loginAdmin = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM admins WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0)
      return res.status(404).json({ message: "Admin not found" });

    const admin = result[0];
    const isPasswordCorrect = bcrypt.compareSync(password, admin.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: admin.id }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ message: "Login successful", token });
  });
};

// ====================== APPOINTMENTS ======================

// List all appointments
exports.getAppointments = (req, res) => {
  const sql = `
    SELECT a.id, a.full_name, a.phone, a.email, a.service_id, s.name AS service_name,
           a.preferred_treatment_type, a.preferred_date, a.message, a.status, a.created_at
    FROM appointments a
    LEFT JOIN services s ON a.service_id = s.id
    ORDER BY a.created_at DESC
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// Approve or cancel appointment
exports.updateAppointmentStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // expected "approved" or "canceled"

  if (!["approved", "canceled"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const sql = "UPDATE appointments SET status = ? WHERE id = ?";
  db.query(sql, [status, id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: `Appointment ${status}` });
  });
};
