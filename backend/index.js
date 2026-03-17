const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

/* ================= DEPENDENCIES ================= */
const db = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ============== SERVE STATIC IMAGES ============== */
app.use("/images", express.static(path.join(__dirname, "public", "images")));

/* ================= LOGIN ROUTE ================= */
/* This login route is independent and will not affect other routes */
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt:", email);

  db.query("SELECT * FROM admins WHERE email = ?", [email], (err, result) => {

    if (err) {
      console.log("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const admin = result[0];

    const validPassword = bcrypt.compareSync(password, admin.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, type: "admin" },
      "secretkey",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin.id,
        email: admin.email
      }
    });
  });
});

/* ================= ROUTES ================= */
const serviceRoutes = require("./routes/serviceRoutes");
const adminRoutes = require("./routes/AdminRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const publicServiceRoutes = require("./routes/publicServiceRoutes");

/* ✅ NEW ADMIN AUTH ROUTES */
const adminAuthRoutes = require("./routes/adminAuth");

/* ================= REGISTER ROUTES ================= */
app.use("/api/services", serviceRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", publicServiceRoutes);
app.use("/api/appointments", appointmentRoutes);

/* ✅ REGISTER NEW AUTH ROUTES */
app.use("/api/admin-auth", adminAuthRoutes);

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.send("Gion Dental Clinic Backend Running...");
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});