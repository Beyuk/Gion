const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ============== SERVE STATIC IMAGES ============== */
app.use("/images", express.static(path.join(__dirname, "public", "images")));

/* ================= ROUTES ================= */

// ADMIN ROUTES
const adminRoutes = require("./routes/AdminRoutes");

// PUBLIC ROUTES
const appointmentRoutes = require("./routes/appointmentRoutes");
const publicServiceRoutes = require("./routes/publicServiceRoutes");

// Route prefixes
app.use("/api/admin", adminRoutes);
app.use("/api", publicServiceRoutes);
app.use("/api/appointments", appointmentRoutes);

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.send("Gion Dental Clinic Backend Running...");
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
