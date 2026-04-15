// backend/test-email-function.js
require('dotenv').config();
const { sendNewAppointmentEmail } = require('./utils/email');

async function test() {
  console.log('=================================');
  console.log('Testing email function directly');
  console.log('=================================\n');
  
  const testData = {
    full_name: 'TEST - John Doe',
    phone: '0912345678',
    email: 'test@example.com',
    service: 'Dental Checkup',
    preferred_date: '2026-04-15',
    preferred_time: '10:30 AM',
    preferred_mode: 'In-person'
  };
  
  console.log('Sending test email with data:', testData);
  console.log('\n');
  
  const result = await sendNewAppointmentEmail(testData);
  
  if (result) {
    console.log('\n✅ SUCCESS! Email was sent');
    console.log('📧 Check your inbox at:', process.env.ADMIN_EMAIL);
  } else {
    console.log('\n❌ FAILED! Email was not sent');
  }
}

test();