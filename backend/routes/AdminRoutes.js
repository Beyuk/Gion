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
// ============= CHANGE PASSWORD ROUTE =============
router.post("/change-password", async (req, res) => {
  console.log("🔐 Change password endpoint called");
  
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  let decoded;
  try {
    const jwt = require("jsonwebtoken");
    const JWT_SECRET = "secretkey";
    decoded = jwt.verify(token, JWT_SECRET);
    console.log("Token verified for admin ID:", decoded.id);
  } catch (err) {
    console.log("Token verification failed:", err.message);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }

  const { currentPassword, newPassword } = req.body;
  
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ success: false, message: "Current password and new password are required" });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
  }

  try {
    const bcrypt = require("bcryptjs");
    
    // Get admin from database
    const [results] = await db.query("SELECT * FROM admins WHERE id = ?", [decoded.id]);
    
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    const admin = results[0];
    const validPassword = bcrypt.compareSync(currentPassword, admin.password);

    if (!validPassword) {
      return res.status(401).json({ success: false, message: "Current password is incorrect" });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    await db.query("UPDATE admins SET password = ? WHERE id = ?", [hashedPassword, decoded.id]);

    console.log("Password changed successfully for admin ID:", decoded.id);
    res.json({ success: true, message: "Password changed successfully" });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ success: false, message: "Server error: " + err.message });
  }
});
module.exports = router;