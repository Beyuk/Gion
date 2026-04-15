// test-email-api.js
const axios = require('axios');

async function testEmail() {
  try {
    const response = await axios.post('http://localhost:5000/api/appointments/send-email-test');
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testEmail();