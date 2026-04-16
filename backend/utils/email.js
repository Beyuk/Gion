const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'beyuzeku@gmail.com',
    pass: 'lqmn hctx dnjf afha'
  }
});

const sendNewAppointmentEmail = async (data) => {
  // Send to admin with patient info clearly visible
  await transporter.sendMail({
    from: '"Gion Dental Appointments" <beyuzeku@gmail.com>',
    to: 'beyuzeku@gmail.com',
    subject: `📅 New Appointment - ${data.full_name}`,
    html: `
      <h2>New Appointment Request</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px;"><strong>Patient:</strong></td><td>${data.full_name}</td>
        <tr>
        <tr><td style="padding: 8px;"><strong>Phone:</strong></td><td>${data.phone}</td>
        </tr>
        <tr><td style="padding: 8px;"><strong>Email:</strong></td><td><a href="mailto:${data.email}">${data.email}</a></td>
        </tr>
        <tr><td style="padding: 8px;"><strong>Service:</strong></td><td>${data.service}</td>
        </tr>
        <tr><td style="padding: 8px;"><strong>Date:</strong></td><td>${data.preferred_date}</td>
        </tr>
        <tr><td style="padding: 8px;"><strong>Time:</strong></td><td>${data.preferred_time}</td>
        </tr>
      </table>
      
      <div style="background: #f0f0f0; padding: 15px; margin-top: 20px;">
        <p><strong>📧 To contact ${data.full_name}:</strong></p>
        <p>Click here to email: <a href="mailto:${data.email}">${data.email}</a></p>
        <p>Or call: ${data.phone}</p>
      </div>
      
      <hr>
      <p style="color: #666;">Gion Dental Clinic - Appointment System</p>
    `
  });
  
  // Also send confirmation to patient (optional)
  if (data.email) {
    await transporter.sendMail({
      from: '"Gion Dental Clinic" <beyuzeku@gmail.com>',
      to: data.email,
      subject: '✅ We received your appointment request',
      html: `
        <h2>Thank you, ${data.full_name}!</h2>
        <p>We received your appointment request for ${data.service} on ${data.preferred_date} at ${data.preferred_time}.</p>
        <p>We will confirm your appointment within 24 hours.</p>
        <p>Thank you for choosing Gion Dental Clinic!</p>
      `
    });
  }
  
  return true;
};

const sendNewContactEmail = async (data) => {
  await transporter.sendMail({
    from: '"Gion Dental Contact" <beyuzeku@gmail.com>',
    to: 'beyuzeku@gmail.com',
    subject: `💬 New Message from ${data.name}`,
    html: `
      <h2>New Contact Message</h2>
      <table>
        <tr><td><strong>Name:</strong></td><td>${data.name}</td></tr>
        <tr><td><strong>Email:</strong></td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
        <tr><td><strong>Phone:</strong></td><td>${data.phone || 'Not provided'}</td></tr>
        <tr><td><strong>Message:</strong></td><td>${data.message}</td></tr>
      </table>
      
      <div style="background: #f0f0f0; padding: 15px; margin-top: 20px;">
        <p><strong>📧 To reply to ${data.name}:</strong></p>
        <p>Click here: <a href="mailto:${data.email}">${data.email}</a></p>
      </div>
    `
  });
  
  // Send auto-reply to customer
  await transporter.sendMail({
    from: '"Gion Dental Clinic" <beyuzeku@gmail.com>',
    to: data.email,
    subject: 'Thank you for contacting Gion Dental',
    html: `
      <h2>Thank you for reaching out!</h2>
      <p>We received your message and will respond within 24 hours.</p>
      <p>Best regards,<br>Gion Dental Clinic</p>
    `
  });
  
  return true;
};

// ADD THIS FUNCTION - Send status update email to patient
const sendAppointmentStatusEmail = async (data) => {
  const statusMessages = {
    approved: {
      subject: '✅ Your Appointment is Confirmed - Gion Dental',
      color: '#4caf50',
      message: 'Your appointment has been confirmed! We look forward to seeing you.',
      button: 'Add to Calendar'
    },
    rejected: {
      subject: '❌ Appointment Update - Gion Dental',
      color: '#f44336',
      message: 'We regret to inform you that your appointment could not be confirmed at this time.',
      button: 'Book New Appointment'
    }
  };

  const statusInfo = statusMessages[data.status] || {
    subject: `Appointment ${data.status.toUpperCase()} - Gion Dental`,
    color: '#ff9800',
    message: `Your appointment status has been updated to ${data.status}.`,
    button: 'Contact Us'
  };

  await transporter.sendMail({
    from: '"Gion Dental Clinic" <beyuzeku@gmail.com>',
    to: data.email,
    subject: statusInfo.subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="background: ${statusInfo.color}; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h2 style="margin: 0;">Appointment ${data.status.toUpperCase()}</h2>
        </div>
        
        <div style="padding: 20px;">
          <p>Dear <strong>${data.full_name}</strong>,</p>
          <p>${statusInfo.message}</p>
          
          <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h3 style="margin-top: 0;">Appointment Details:</h3>
            <p><strong>📅 Date:</strong> ${data.date}</p>
            <p><strong>⏰ Time:</strong> ${data.time}</p>
            <p><strong>🦷 Service:</strong> ${data.service || 'Dental Consultation'}</p>
          </div>
          
          ${data.status === 'approved' ? `
            <div style="background: #e8f5e9; padding: 15px; margin: 20px 0; border-radius: 5px;">
              <p><strong>📍 Location:</strong> Gion Speciality Dental Clinic</p>
              <p><strong>📞 Contact:</strong>+251 961 012 087</p>
              <p><strong>⚠️ Please arrive 10 minutes before your appointment.</strong></p>
            </div>
          ` : ''}
          
          ${data.status === 'rejected' ? `
            <div style="background: #ffebee; padding: 15px; margin: 20px 0; border-radius: 5px;">
              <p><strong>Need to reschedule?</strong></p>
              <p>Please contact us to book a different time that works for you.</p>
              <p><strong>📞 Call us:</strong> +251 961 012 087</p>
            
            </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/appointments" 
               style="background: ${statusInfo.color}; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              ${statusInfo.button}
            </a>
          </div>
        </div>
        
        <hr>
        <p style="color: #666; font-size: 12px; text-align: center;">
          Gion Speciality Dental Clinic<br>
          This is an automated message, please do not reply directly.
        </p>
      </div>
    `
  });
  
  console.log(`✅ Status email sent to ${data.email} for status: ${data.status}`);
  return true;
};

// UPDATE EXPORTS - Add sendAppointmentStatusEmail
module.exports = { 
  sendNewAppointmentEmail, 
  sendNewContactEmail,
  sendAppointmentStatusEmail
};