const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const AdminAuth = require('../middleware/AdminAuth');

// List all appointments
router.get('/appointments', AdminAuth, AdminController.getAppointments);

// Approve or cancel appointment
router.patch('/appointments/:id', AdminAuth, AdminController.updateAppointmentStatus);

module.exports = router;
