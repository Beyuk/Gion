const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");
const AdminAuth = require("../middleware/AdminAuth");

// ----- AUTH -----
router.post("/register", AdminController.registerAdmin);
router.post("/login", AdminController.loginAdmin);

// ----- APPOINTMENTS -----
router.get("/appointments", AdminAuth, AdminController.getAppointments);
router.patch("/appointments/:id", AdminAuth, AdminController.updateAppointmentStatus);

module.exports = router;
