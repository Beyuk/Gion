// utils/email.js
const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendNewAppointmentEmail = async (appointmentData) => {
  const { full_name, phone, email, service, preferred_date, preferred_time } = appointmentData;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || 'admin@giondental.com',
    subject: 'New Appointment Booking',
    html: `
      <h2>New Appointment Request</h2>
      <p><strong>Patient:</strong> ${full_name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email || 'Not provided'}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Date:</strong> ${preferred_date}</p>
      <p><strong>Time:</strong> ${preferred_time}</p>
      <p><strong>Status:</strong> Pending</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

module.exports = { sendNewAppointmentEmail };