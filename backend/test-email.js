// test-email.js
require('dotenv').config();

console.log('\n========== TESTING NEW EMAIL ==========');
console.log('Email:', process.env.EMAIL_USER);
console.log('Password length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);
console.log('========================================\n');

const nodemailer = require('nodemailer');

// Create transporter with new credentials
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS  // This is "lqmn hctx dnjf afha" with spaces
  },
  tls: {
    rejectUnauthorized: false
  }
});

async function testEmail() {
  try {
    console.log('1️⃣  Testing connection to Gmail...');
    await transporter.verify();
    console.log('✅ Connected successfully!\n');
    
    console.log('2️⃣  Sending test email...');
    const info = await transporter.sendMail({
      from: `"Gion Dental Clinic" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,  // Sending to yourself
      subject: '✅ Email Working - Gion Dental Clinic',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #0066cc; border-radius: 10px;">
          <div style="text-align: center; background: #0066cc; color: white; padding: 10px; border-radius: 5px;">
            <h2>🎉 Email Configuration Successful!</h2>
          </div>
          <div style="padding: 20px;">
            <p><strong>Dear Admin,</strong></p>
            <p>Your email system for <strong>Gion Speciality Dental Clinic</strong> is now working!</p>
            <p>Test details:</p>
            <ul>
              <li>✅ SMTP Connection: Successful</li>
              <li>✅ Authentication: Successful</li>
              <li>✅ Email Sent: ${new Date().toLocaleString()}</li>
              <li>✅ From: ${process.env.EMAIL_USER}</li>
            </ul>
            <p>You can now send appointment confirmations, reminders, and notifications to patients.</p>
            <hr>
            <p style="color: #666; font-size: 12px;">Gion Speciality Dental Clinic - Automated System</p>
          </div>
        </div>
      `
    });
    
    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('📧 Check your inbox at:', process.env.EMAIL_USER);
    console.log('\n🎉🎉🎉 CONGRATULATIONS! EMAIL IS WORKING! 🎉🎉🎉\n');
    
  } catch (error) {
    console.error('\n❌ ERROR:');
    console.error('Code:', error.code);
    console.error('Message:', error.message);
    if (error.response) console.error('Response:', error.response);
    
    console.error('\n🔧 FIXES:');
    if (error.code === 'EAUTH') {
      console.error('• Password issue - make sure you used the EXACT App Password');
      console.error('• Your password should be: lqmn hctx dnjf afha (with spaces)');
      console.error('• Try without spaces: lqmnhctxdnjfafha');
      console.error('• Generate new App Password if needed');
    } else if (error.code === 'ECONNECTION') {
      console.error('• Network issue - check your internet');
      console.error('• Try running: ping smtp.gmail.com');
    }
  }
}

testEmail();