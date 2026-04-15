const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

// Send email function
const sendEmail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            html: html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

// New appointment notification for admin
const sendNewAppointmentEmail = async (appointmentDetails) => {
    const subject = `New Appointment Booking - ${appointmentDetails.patientName}`;
    const html = `
        <h2>New Appointment Booking</h2>
        <p><strong>Patient Name:</strong> ${appointmentDetails.patientName}</p>
        <p><strong>Email:</strong> ${appointmentDetails.patientEmail}</p>
        <p><strong>Phone:</strong> ${appointmentDetails.patientPhone || 'Not provided'}</p>
        <p><strong>Date:</strong> ${appointmentDetails.date}</p>
        <p><strong>Time:</strong> ${appointmentDetails.time}</p>
        <p><strong>Service:</strong> ${appointmentDetails.service}</p>
        <p><strong>Message:</strong> ${appointmentDetails.message || 'No message'}</p>
        <hr>
        <p>Login to admin panel to manage this appointment.</p>
    `;
    
    return await sendEmail(process.env.EMAIL_USER, subject, html);
};

// Appointment status update for patient
const sendAppointmentStatusEmail = async (patientEmail, patientName, status, date, time) => {
    const subject = `Appointment Status Update - Gion Dental`;
    const html = `
        <h2>Appointment Status Updated</h2>
        <p>Dear ${patientName},</p>
        <p>Your appointment on <strong>${date}</strong> at <strong>${time}</strong> has been <strong>${status}</strong>.</p>
        ${status === 'confirmed' ? '<p>We look forward to seeing you!</p>' : ''}
        ${status === 'cancelled' ? '<p>Please contact us to reschedule if needed.</p>' : ''}
        <br>
        <p>Thank you,</p>
        <p><strong>Gion Dental Clinic</strong></p>
    `;
    
    return await sendEmail(patientEmail, subject, html);
};

// New contact message notification for admin
const sendNewContactEmail = async (contactDetails) => {
    const subject = `New Contact Message - ${contactDetails.name}`;
    const html = `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${contactDetails.name}</p>
        <p><strong>Email:</strong> ${contactDetails.email}</p>
        <p><strong>Phone:</strong> ${contactDetails.phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${contactDetails.subject || 'General Inquiry'}</p>
        <p><strong>Message:</strong></p>
        <p>${contactDetails.message}</p>
        <hr>
        <p>Reply to this message from the admin panel.</p>
    `;
    
    return await sendEmail(process.env.EMAIL_USER, subject, html);
};

module.exports = {
    sendEmail,
    sendNewAppointmentEmail,
    sendAppointmentStatusEmail,
    sendNewContactEmail
};
