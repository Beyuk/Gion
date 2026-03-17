const express = require('express');
const router = express.Router();
const db = require('../db'); // your MySQL connection
const { sendNewAppointmentEmail } = require('../utils/email');

/* ================= CREATE APPOINTMENT ================= */
router.post('/', async (req, res) => {
  console.log('='.repeat(50));
  console.log('📥 RECEIVED APPOINTMENT REQUEST');
  console.log('Time:', new Date().toISOString());
  console.log('Request Body:', JSON.stringify(req.body, null, 2));
  console.log('='.repeat(50));
  
  const {
    full_name,
    phone,
    email,
    service,          // This is the service name (Teeth Cleaning, Root Canal, etc.)
    preferred_mode,   // This is In-person/Online
    preferred_date,
    preferred_time,   // This is the time slot
  } = req.body;

  // Validate required fields
  if (!full_name || !phone || !preferred_date || !preferred_time) {
    console.log('❌ Validation failed - missing required fields');
    return res.status(400).json({ 
      message: 'Missing required fields',
      success: false
    });
  }

  try {
    // Check database connection
    console.log('📊 Checking database connection...');
    if (!db) {
      throw new Error('Database connection not available');
    }
    console.log('✅ Database connection OK');

    // Use service_id = 1 as default (matching your existing data)
    const service_id = 1;
    
    // Combine service name and time into message field
    const message = `${service} at ${preferred_time}`;

    // CORRECT QUERY matching your database schema
    const query = `
      INSERT INTO appointments 
      (full_name, phone, email, service_id, preferred_treatment_type, preferred_date, message, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
    `;

    const values = [
      full_name,
      phone,
      email || null,
      service_id,                    // ← service_id (int)
      preferred_mode,                 // ← preferred_treatment_type (varchar)
      preferred_date,                 // ← preferred_date
      message                         // ← message (varchar) - stores service + time
    ];

    console.log('📝 SQL Query:', query);
    console.log('📝 Values:', values);

    // Execute query
    console.log('⚡ Executing query...');
    const [result] = await db.query(query, values);
    
    console.log('✅ Query executed successfully');
    console.log('✅ Appointment created with ID:', result.insertId);

    // Try to send email (optional)
    try {
      console.log('📧 Attempting to send email notification...');
      await sendNewAppointmentEmail({
        full_name,
        phone,
        email,
        service,
        preferred_date,
        preferred_time,
      });
      console.log('📧 Email notification sent successfully');
    } catch (emailError) {
      console.error('⚠️ Email sending failed but appointment saved:', emailError);
    }

    console.log('✅ Sending success response to client');
    res.status(201).json({ 
      message: 'Appointment created successfully',
      id: result.insertId,
      success: true
    });
    
  } catch (error) {
    console.error('❌ SERVER ERROR:', error);
    console.error('❌ Error message:', error.message);
    
    // Check for specific MySQL errors
    if (error.code) {
      console.error('❌ MySQL Error code:', error.code);
      console.error('❌ MySQL Error sqlMessage:', error.sqlMessage);
    }
    
    res.status(500).json({ 
      message: 'Server error: ' + error.message, 
      success: false
    });
  }
});

/* ================= GET ALL APPOINTMENTS ================= */
router.get('/', async (req, res) => {
  try {
    console.log('📋 Fetching all appointments...');
    const [rows] = await db.query('SELECT * FROM appointments ORDER BY created_at DESC');
    console.log(`✅ Found ${rows.length} appointments`);
    res.json({
      success: true,
      data: rows
    });
  } catch (err) {
    console.error('❌ Error fetching appointments:', err);
    res.status(500).json({ 
      message: 'Failed to fetch appointments', 
      error: err.message,
      success: false 
    });
  }
});

/* ================= GET SINGLE APPOINTMENT ================= */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    console.log(`🔍 Fetching appointment ID: ${id}`);
    const [rows] = await db.query('SELECT * FROM appointments WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ 
        message: 'Appointment not found',
        success: false 
      });
    }
    console.log(`✅ Found appointment ID: ${id}`);
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (err) {
    console.error('❌ Error fetching appointment:', err);
    res.status(500).json({ 
      message: 'Failed to fetch appointment', 
      error: err.message,
      success: false 
    });
  }
});

/* ================= UPDATE APPOINTMENT ================= */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status, preferred_date, message, reject_reason } = req.body;

  try {
    const updateFields = [];
    const values = [];

    if (status) {
      updateFields.push('status = ?');
      values.push(status);
    }
    if (preferred_date) {
      updateFields.push('preferred_date = ?');
      values.push(preferred_date);
    }
    if (message) {
      updateFields.push('message = ?');
      values.push(message);
    }
    if (reject_reason) {
      updateFields.push('reject_reason = ?');
      values.push(reject_reason);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ 
        message: 'No fields to update',
        success: false 
      });
    }

    values.push(id);

    const [result] = await db.query(
      `UPDATE appointments SET ${updateFields.join(', ')} WHERE id = ?`,
      values
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        message: 'Appointment not found',
        success: false 
      });
    }

    console.log(`✅ Updated appointment ID: ${id}`);
    res.json({ 
      message: 'Appointment updated successfully',
      success: true 
    });
  } catch (err) {
    console.error('❌ Error updating appointment:', err);
    res.status(500).json({ 
      message: 'Update failed', 
      error: err.message,
      success: false 
    });
  }
});

/* ================= DELETE APPOINTMENT ================= */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    console.log(`🗑️ Deleting appointment ID: ${id}`);
    const [result] = await db.query('DELETE FROM appointments WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        message: 'Appointment not found',
        success: false 
      });
    }

    console.log(`✅ Deleted appointment ID: ${id}`);
    res.json({ 
      message: 'Appointment deleted successfully',
      success: true 
    });
  } catch (err) {
    console.error('❌ Error deleting appointment:', err);
    res.status(500).json({ 
      message: 'Delete failed',
      error: err.message,
      success: false 
    });
  }
});

module.exports = router;