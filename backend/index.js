const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

/* ================= DEPENDENCIES ================= */
const db = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ================= EMAIL SERVICE ================= */
const { sendNewAppointmentEmail, sendNewContactEmail } = require("./utils/email");

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ============== SERVE STATIC IMAGES ============== */
app.use("/images", express.static(path.join(__dirname, "public", "images")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ============= ADMIN LOGIN ROUTE =============
app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;
  
  console.log("Login attempt for:", email);

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password required" });
  }

  try {
    const sql = "SELECT * FROM admins WHERE email = ?";
    const [results] = await db.query(sql, [email]);

    console.log("Found admin:", results.length > 0 ? "Yes" : "No");

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const admin = results[0];
    const validPassword = bcrypt.compareSync(password, admin.password);

    console.log("Password valid:", validPassword);

    if (!validPassword) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, name: admin.name },
      "secretkey",
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token: token,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
/*
// ============= CHANGE PASSWORD ROUTE =============
app.post("/api/admin/change-password", async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  console.log("=== CHANGE PASSWORD REQUEST ===");
  console.log("Email:", email);
  console.log("Current password provided:", currentPassword ? "Yes" : "No");
  console.log("New password provided:", newPassword ? "Yes" : "No");

  if (!email || !currentPassword || !newPassword) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
  }

  try {
    const [results] = await db.query("SELECT * FROM admins WHERE email = ?", [email]);

    console.log("Admin found:", results.length > 0 ? "Yes" : "No");

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    const admin = results[0];
    const validPassword = bcrypt.compareSync(currentPassword, admin.password);

    console.log("Current password valid:", validPassword);

    if (!validPassword) {
      return res.status(401).json({ success: false, message: "Current password is incorrect" });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    await db.query("UPDATE admins SET password = ? WHERE email = ?", [hashedPassword, email]);

    console.log("Password changed successfully for:", email);
    res.json({ success: true, message: "Password changed successfully" });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ success: false, message: "Server error: " + err.message });
  }
});*/

// ============= RESET PASSWORD ROUTE =============
app.post("/api/admin/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ success: false, message: "Token and password are required" });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
  }

  try {
    const decoded = jwt.verify(token, "secretkey");
    
    if (decoded.type !== "reset") {
      return res.status(400).json({ success: false, message: "Invalid reset token" });
    }

    const email = decoded.email;
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    await db.query("UPDATE admins SET password = ? WHERE email = ?", [hashedPassword, email]);

    res.json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(400).json({ success: false, message: "Invalid or expired token" });
  }
});

// ============= CONTACT MESSAGE SUBMISSION ROUTE =============
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  console.log("=== NEW CONTACT MESSAGE ===");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Phone:", phone);
  console.log("Message:", message);

  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: "Name, email and message are required" 
    });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)",
      [name, email, phone || null, message]
    );

    console.log("Message saved with ID:", result.insertId);
    
    // SEND EMAIL NOTIFICATION TO ADMIN
    try {
      await sendNewContactEmail({ name, email, phone, message });
      console.log("📧 Contact email sent to admin");
    } catch (emailError) {
      console.error("⚠️ Email failed but message saved:", emailError.message);
    }

    res.json({ 
      success: true, 
      message: "Message sent successfully! We'll get back to you soon." 
    });
  } catch (err) {
    console.error("Contact error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to send message. Please try again." 
    });
  }
});

// ============= ADMIN USERS ROUTE =============
app.get("/api/admin/users", async (req, res) => {
  try {
    const sql = "SELECT id, full_name, email, phone, created_at, role FROM users ORDER BY id DESC";
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    console.error("Users error:", err);
    res.json([]);
  }
});

// ============= ADMIN MESSAGES ROUTE =============
app.get("/api/admin/messages", async (req, res) => {
  try {
    const sql = "SELECT id, name, email, phone, message, created_at, is_read FROM contact_messages ORDER BY created_at DESC";
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    console.error("Messages error:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// ============= DELETE MESSAGE ROUTE =============
app.delete("/api/admin/messages/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    const [result] = await db.query("DELETE FROM contact_messages WHERE id = ?", [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Message not found" });
    }
    
    res.json({ success: true, message: "Message deleted successfully" });
  } catch (err) {
    console.error("Delete message error:", err);
    res.status(500).json({ error: "Failed to delete message" });
  }
});

// ============= MARK MESSAGE AS READ ROUTE =============
app.put("/api/admin/messages/:id/read", async (req, res) => {
  const { id } = req.params;
  
  try {
    const [result] = await db.query("UPDATE contact_messages SET is_read = TRUE WHERE id = ?", [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Message not found" });
    }
    
    res.json({ success: true, message: "Message marked as read" });
  } catch (err) {
    console.error("Mark as read error:", err);
    res.status(500).json({ error: "Failed to mark message as read" });
  }
});

// ============= APPOINTMENTS ROUTES =============

// GET all appointments
app.get("/api/appointments", async (req, res) => {
  try {
    const sql = "SELECT * FROM appointments ORDER BY created_at DESC";
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    console.error("Appointments error:", err);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// GET single appointment
app.get("/api/appointments/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const sql = "SELECT * FROM appointments WHERE id = ?";
    const [results] = await db.query(sql, [id]);
    
    if (results.length === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    
    res.json(results[0]);
  } catch (err) {
    console.error("Get appointment error:", err);
    res.status(500).json({ error: "Failed to fetch appointment" });
  }
});

// BOOK APPOINTMENT (POST) - WITH AUTO PATIENT CREATION
app.post("/api/appointments", async (req, res) => {
  const {
    full_name,
    phone,
    email,
    service,
    preferred_mode,
    preferred_date,
    preferred_time
  } = req.body;

  console.log("=== NEW APPOINTMENT BOOKING ===");
  console.log("Name:", full_name);
  console.log("Phone:", phone);
  console.log("Email:", email);
  console.log("Service:", service);
  console.log("Mode:", preferred_mode);
  console.log("Date:", preferred_date);
  console.log("Time:", preferred_time);

  if (!full_name || !phone || !preferred_date || !preferred_time) {
    return res.status(400).json({
      success: false,
      message: "Name, phone, date and time are required"
    });
  }

  try {
    // STEP 1: Check if patient already exists
    let userId = null;
    
    const [existingUsers] = await db.query(
      "SELECT id FROM users WHERE phone = ? OR (email IS NOT NULL AND email = ?)",
      [phone, email || '']
    );
    
    if (existingUsers.length > 0) {
      userId = existingUsers[0].id;
      console.log("Existing patient found with ID:", userId);
      
      // Update patient information
      await db.query(
        "UPDATE users SET full_name = ?, email = COALESCE(?, email) WHERE id = ?",
        [full_name, email, userId]
      );
    } else {
      // Create new patient
      const [newUser] = await db.query(
        `INSERT INTO users (full_name, phone, email, status, role, created_at) 
         VALUES (?, ?, ?, 'Active', 'patient', NOW())`,
        [full_name, phone, email || null]
      );
      userId = newUser.insertId;
      console.log("New patient created with ID:", userId);
    }
    
    // STEP 2: Format date and time
    let formattedDate = preferred_date;
    if (preferred_date && !preferred_date.includes('T')) {
      formattedDate = new Date(preferred_date).toISOString().split('T')[0];
    }
    
    const dateTime = `${formattedDate} ${preferred_time}`;
    const messageText = `${service || 'General Checkup'} | Mode: ${preferred_mode || 'In-person'} | Time: ${preferred_time}`;
    
    // STEP 3: Create appointment
    const [result] = await db.query(
      `INSERT INTO appointments 
       (full_name, phone, email, service_id, preferred_treatment_type, preferred_date, message, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        full_name,
        phone,
        email || null,
        null,
        preferred_mode || "In-person",
        dateTime,
        messageText
      ]
    );
    
    // STEP 4: Update patient's last visit date
    await db.query(
      "UPDATE users SET last_visit_date = CURDATE() WHERE id = ?",
      [userId]
    );

    console.log("Appointment booked with ID:", result.insertId);
    console.log("Linked to patient ID:", userId);
    
    // STEP 5: SEND EMAIL NOTIFICATION TO ADMIN
    try {
      await sendNewAppointmentEmail({
        full_name,
        phone,
        email: email || 'Not provided',
        service: service || 'General Checkup',
        preferred_date: formattedDate,
        preferred_time,
        preferred_mode: preferred_mode || 'In-person'
      });
      console.log("📧 Appointment email sent to admin");
    } catch (emailError) {
      console.error("⚠️ Email failed but appointment saved:", emailError.message);
    }

    res.json({
      success: true,
      message: "Appointment booked successfully! We will contact you soon.",
      appointment_id: result.insertId,
      patient_id: userId
    });
  } catch (err) {
    console.error("Appointment booking error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to book appointment. Please try again.",
      error: err.message
    });
  }
});

// UPDATE APPOINTMENT STATUS
app.put("/api/appointments/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  console.log("=== UPDATE APPOINTMENT ===");
  console.log("ID:", id);
  console.log("Status:", status);

  if (!status) {
    return res.status(400).json({ success: false, message: "Status is required" });
  }

  const validStatuses = ['pending', 'approved', 'rejected', 'completed'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status" });
  }

  try {
    // Get appointment details before updating
    const [appointment] = await db.query(
      "SELECT * FROM appointments WHERE id = ?",
      [id]
    );

    if (appointment.length === 0) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    const appointmentData = appointment[0];
    
    // Update status
    const [result] = await db.query(
      "UPDATE appointments SET status = ? WHERE id = ?",
      [status, id]
    );

    // SEND EMAIL NOTIFICATION TO PATIENT
    if (appointmentData.email && (status === 'approved' || status === 'rejected')) {
      try {
        const { sendAppointmentStatusEmail } = require('./utils/email');
        
        await sendAppointmentStatusEmail({
          email: appointmentData.email,
          full_name: appointmentData.full_name,
          status: status,
          date: appointmentData.preferred_date,
          time: appointmentData.preferred_time,
          service: appointmentData.message
        });
        
        console.log(`📧 Status email sent to ${appointmentData.email}`);
      } catch (emailError) {
        console.error("⚠️ Status email failed:", emailError.message);
      }
    }

    console.log("Appointment updated successfully");
    res.json({ success: true, message: "Appointment updated successfully" });
  } catch (err) {
    console.error("Update appointment error:", err);
    res.status(500).json({ success: false, message: "Failed to update appointment" });
  }
});

// DELETE APPOINTMENT
app.delete("/api/appointments/:id", async (req, res) => {
  const { id } = req.params;

  console.log("=== DELETE APPOINTMENT ===");
  console.log("ID:", id);

  try {
    const [result] = await db.query("DELETE FROM appointments WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    console.log("Appointment deleted successfully");
    res.json({ success: true, message: "Appointment deleted successfully" });
  } catch (err) {
    console.error("Delete appointment error:", err);
    res.status(500).json({ success: false, message: "Failed to delete appointment" });
  }
});

// Add this AFTER your DELETE APPOINTMENT route and BEFORE the ROUTES section
// ============= MONTHLY STATS FOR DASHBOARD CHARTS =============
app.get("/api/admin/monthly-stats", async (req, res) => {
  try {
    console.log("=== FETCHING MONTHLY STATS ===");
    
    // Get last 6 months of appointment data
    const [appointmentStats] = await db.query(`
      SELECT 
        MONTH(preferred_date) as month,
        YEAR(preferred_date) as year,
        COUNT(*) as appointmentCount
      FROM appointments
      WHERE preferred_date >= DATE_SUB(CURDATE(), INTERVAL 5 MONTH)
      GROUP BY YEAR(preferred_date), MONTH(preferred_date)
      ORDER BY year ASC, month ASC
    `);
    
    // Get last 6 months of patient registration data
    const [patientStats] = await db.query(`
      SELECT 
        MONTH(created_at) as month,
        YEAR(created_at) as year,
        COUNT(*) as patientCount
      FROM users
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 5 MONTH)
      GROUP BY YEAR(created_at), MONTH(created_at)
      ORDER BY year ASC, month ASC
    `);
    
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Create a map for the last 6 months
    const result = [];
    const today = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const monthName = monthNames[date.getMonth()];
      
      // Find appointment count for this month
      const apptData = appointmentStats.find(
        stat => stat.month === month && stat.year === year
      );
      
      // Find patient count for this month
      const patientData = patientStats.find(
        stat => stat.month === month && stat.year === year
      );
      
      result.push({
        name: monthName,
        appointments: apptData ? parseInt(apptData.appointmentCount) : 0,
        patients: patientData ? parseInt(patientData.patientCount) : 0
      });
    }
    
    console.log("Monthly stats result:", result);
    res.json(result);
    
  } catch (error) {
    console.error("Error fetching monthly stats:", error);
    res.status(500).json({ error: error.message });
  }
});

// ============= DASHBOARD SUMMARY STATS =============
app.get("/api/admin/dashboard-summary", async (req, res) => {
  try {
    // Get total appointments
    const [totalAppointments] = await db.query("SELECT COUNT(*) as count FROM appointments");
    
    // Get total users/patients
    const [totalUsers] = await db.query("SELECT COUNT(*) as count FROM users");
    
    // Get unread messages
    const [unreadMessages] = await db.query(
      "SELECT COUNT(*) as count FROM contact_messages WHERE is_read = FALSE"
    );
    
    res.json({
      appointments: totalAppointments[0].count,
      patients: totalUsers[0].count,
      messages: unreadMessages[0].count
    });
  } catch (error) {
    console.error("Error fetching dashboard summary:", error);
    res.status(500).json({ error: error.message });
  }
});

// ============= PATIENT MANAGEMENT ROUTES =============

// GET all patients
app.get("/api/admin/patients", async (req, res) => {
  const { search, page = 1, limit = 20 } = req.query;
  const offset = (page - 1) * limit;
  
  try {
    let sql = "SELECT id, full_name, email, phone, status, created_at, last_visit_date FROM users WHERE 1=1";
    let params = [];
    
    if (search) {
      sql += " AND (full_name LIKE ? OR email LIKE ? OR phone LIKE ?)";
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }
    
    sql += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    params.push(parseInt(limit), parseInt(offset));
    
    const [results] = await db.query(sql, params);
    
    const [totalResult] = await db.query("SELECT COUNT(*) as total FROM users");
    const total = totalResult[0].total;
    
    res.json({
      success: true,
      data: results,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error("Patients error:", err);
    res.status(500).json({ success: false, error: "Failed to fetch patients" });
  }
});

// GET single patient
app.get("/api/admin/patients/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    const [patient] = await db.query(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    
    if (patient.length === 0) {
      return res.status(404).json({ success: false, error: "Patient not found" });
    }
    
    const [appointments] = await db.query(
      `SELECT * FROM appointments WHERE phone = ? OR email = ? ORDER BY created_at DESC LIMIT 20`,
      [patient[0].phone, patient[0].email]
    );
    
    res.json({
      success: true,
      data: {
        ...patient[0],
        appointments
      }
    });
  } catch (err) {
    console.error("Get patient error:", err);
    res.status(500).json({ success: false, error: "Failed to fetch patient" });
  }
});

// CREATE new patient
app.post("/api/admin/patients", async (req, res) => {
  const { full_name, email, phone, date_of_birth, gender, address, medical_history, allergies } = req.body;
  
  if (!full_name || !phone) {
    return res.status(400).json({ success: false, error: "Name and phone are required" });
  }
  
  try {
    const [result] = await db.query(
      `INSERT INTO users (full_name, email, phone, date_of_birth, gender, address, medical_history, allergies, status, role) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Active', 'patient')`,
      [full_name, email || null, phone, date_of_birth || null, gender || null, address || null, medical_history || null, allergies || null]
    );
    
    res.json({
      success: true,
      message: "Patient added successfully",
      patient_id: result.insertId
    });
  } catch (err) {
    console.error("Create patient error:", err);
    res.status(500).json({ success: false, error: "Failed to add patient" });
  }
});

// UPDATE patient
app.put("/api/admin/patients/:id", async (req, res) => {
  const { id } = req.params;
  const { full_name, email, phone, date_of_birth, gender, address, medical_history, allergies, status } = req.body;
  
  try {
    await db.query(
      `UPDATE users SET 
        full_name = ?, email = ?, phone = ?, date_of_birth = ?, 
        gender = ?, address = ?, medical_history = ?, allergies = ?, status = ? 
       WHERE id = ?`,
      [full_name, email, phone, date_of_birth, gender, address, medical_history, allergies, status || 'Active', id]
    );
    
    res.json({ success: true, message: "Patient updated successfully" });
  } catch (err) {
    console.error("Update patient error:", err);
    res.status(500).json({ success: false, error: "Failed to update patient" });
  }
});

// DELETE patient
app.delete("/api/admin/patients/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "Patient not found" });
    }
    
    res.json({ success: true, message: "Patient deleted successfully" });
  } catch (err) {
    console.error("Delete patient error:", err);
    res.status(500).json({ success: false, error: "Failed to delete patient" });
  }
});

// GET patient statistics
app.get("/api/admin/patients/stats/summary", async (req, res) => {
  try {
    const [total] = await db.query("SELECT COUNT(*) as count FROM users");
    const [active] = await db.query("SELECT COUNT(*) as count FROM users WHERE status = 'Active'");
    const [newPatients] = await db.query("SELECT COUNT(*) as count FROM users WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)");
    const [appointmentsThisMonth] = await db.query(`
      SELECT COUNT(DISTINCT email) as count 
      FROM appointments 
      WHERE MONTH(created_at) = MONTH(CURDATE()) 
      AND YEAR(created_at) = YEAR(CURDATE())
    `);
    
    res.json({
      success: true,
      data: {
        total_patients: total[0].count,
        active_patients: active[0].count,
        new_patients_month: newPatients[0].count,
        appointments_this_month: appointmentsThisMonth[0].count
      }
    });
  } catch (err) {
    console.error("Patient stats error:", err);
    res.status(500).json({ success: false, error: "Failed to fetch statistics" });
  }
});

/* ================= ROUTES ================= */
const serviceRoutes = require("./routes/serviceRoutes");
const adminRoutes = require("./routes/AdminRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const publicServiceRoutes = require("./routes/publicServiceRoutes");
const adminAuthRoutes = require("./routes/adminAuth");

/* ================= REGISTER ROUTES ================= */
app.use("/api/services", serviceRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", publicServiceRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin-auth", adminAuthRoutes);

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.send("Gion Dental Clinic Backend Running...");
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Local: http://localhost:${PORT}`);
  console.log(`Network: http://192.168.137.20:${PORT}`);
  console.log(`Login endpoint: http://192.168.137.20:${PORT}/api/admin/login`);
  console.log(`Contact endpoint: http://192.168.137.20:${PORT}/api/contact`);
  console.log(`Messages endpoint: http://192.168.137.20:${PORT}/api/admin/messages`);
  console.log(`Appointments endpoint: http://192.168.137.20:${PORT}/api/appointments`);
  console.log(`Patients endpoint: http://192.168.137.20:${PORT}/api/admin/patients`);
});