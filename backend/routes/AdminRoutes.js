const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");
const db = require("../db");

// Debug middleware for this router
router.use((req, res, next) => {
  console.log(`📥 Admin route hit: ${req.method} ${req.url}`);
  next();
});

// Public routes (keep register if you need it)
router.post("/register", (req, res, next) => {
  console.log("📝 Register endpoint called");
  AdminController.registerAdmin(req, res, next);
});

// ⚠️ LOGIN ROUTE REMOVED - Using the one in index.js instead

// Protected routes
router.get("/dashboard", (req, res, next) => {
  console.log("📊 Dashboard endpoint called");
  AdminController.dashboard(req, res, next);
});

// ============= APPOINTMENTS ROUTES =============
router.get("/appointments", (req, res) => {
  console.log("📅 Appointments endpoint called");
  AdminController.getAppointments(req, res);
});

router.put("/appointments/:id/status", (req, res) => {
  console.log("📅 Update appointment status called");
  AdminController.updateAppointmentStatus(req, res);
});

// ============= SERVICES ROUTES =============
router.get("/services", (req, res) => {
  console.log("🔧 Services endpoint called");
  db.query("SELECT * FROM services", (err, result) => {
    if (err) {
      console.log("Services error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    console.log(`Found ${result.length} services`);
    res.json(result);
  });
});

// ============= CONTACT MESSAGES ROUTES =============
router.get("/contact", (req, res) => {
  console.log("✉️ Contact messages endpoint called");
  db.query("SELECT * FROM contact_messages ORDER BY created_at DESC", (err, result) => {
    if (err) {
      console.log("Contact error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    console.log(`Found ${result ? result.length : 0} messages`);
    res.json(result || []);
  });
});

router.delete("/contact/:id", (req, res) => {
  console.log("🗑️ Delete contact message called");
  const { id } = req.params;
  db.query("DELETE FROM contact_messages WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log("Delete error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    console.log(`Deleted message ${id}`);
    res.json({ message: "Deleted successfully" });
  });
});

module.exports = router;