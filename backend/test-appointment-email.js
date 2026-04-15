// backend/test-appointment-email.js
require('dotenv').config();
const { sendNewAppointmentEmail } = require('./utils/emails');

async function testAppointmentEmail() {
  console.log('=================================');
  console.log('TESTING APPOINTMENT EMAIL');
  console.log('=================================\n');
  
  const testAppointment = {
    full_name: 'Test Patient',
    phone: '0912345678',
    email: 'test@example.com',
    service: 'Dental Checkup',
    preferred_date: '2026-04-15',
    preferred_time: '10:30 AM',
    preferred_mode: 'In-person'
  };
  
  console.log('Sending email for appointment:');
  console.log(testAppointment);
  console.log('\n');
  
  try {
    const result = await sendNewAppointmentEmail(testAppointment);
    
    if (result) {
      console.log('✅ Appointment email sent successfully!');
      console.log('Check your email at:', process.env.ADMIN_EMAIL);
    } else {
      console.log('❌ Failed to send email');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testAppointmentEmail();