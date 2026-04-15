const express = require('express');
const router = express.Router();
const db = require('../db');
const { sendNewAppointmentEmail } = require('../utils/email');

router.post('/', async (req, res) => {
  const { full_name, phone, email, service, preferred_mode, preferred_date, preferred_time } = req.body;

  const [result] = await db.query(
    `INSERT INTO appointments 
    (full_name, phone, email, preferred_treatment_type, preferred_date, message, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, 'pending', NOW())`,
    [full_name, phone, email || null, preferred_mode || 'In-person', preferred_date, `${service} at ${preferred_time}`]
  );

  await sendNewAppointmentEmail({
    full_name,
    phone,
    email: email || 'Not provided',
    service: service || 'General Checkup',
    preferred_date,
    preferred_time,
    preferred_mode: preferred_mode || 'In-person'
  });

  res.json({ success: true, message: 'Appointment booked successfully!', appointment_id: result.insertId });
});

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM appointments ORDER BY created_at DESC');
  res.json({ success: true, data: rows });
});

router.get('/:id', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM appointments WHERE id = ?', [req.params.id]);
  res.json({ success: true, data: rows[0] });
});

router.put('/:id', async (req, res) => {
  await db.query('UPDATE appointments SET status = ? WHERE id = ?', [req.body.status, req.params.id]);
  res.json({ success: true });
});

router.delete('/:id', async (req, res) => {
  await db.query('DELETE FROM appointments WHERE id = ?', [req.params.id]);
  res.json({ success: true });
});

module.exports = router;