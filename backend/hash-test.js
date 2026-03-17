const bcrypt = require('bcryptjs');

const storedHash = '$2b$10$j0A2z2/tJCNZSd9vzj7Kb.blJZ8Bo7bF0OqPN8wqQtpHQdxozbT5u';
const testPassword = '123456';

console.log('Testing hash match...');
console.log('Stored hash:', storedHash);
console.log('Test password:', testPassword);

const isValid = bcrypt.compareSync(testPassword, storedHash);
console.log('Password valid?', isValid);

// Also try with the other bcrypt format
try {
  const bcryptAlt = require('bcrypt');
  console.log('\nTrying with bcrypt (not bcryptjs):');
  const isValidAlt = bcryptAlt.compareSync(testPassword, storedHash);
  console.log('Password valid with bcrypt?', isValidAlt);
} catch (e) {
  console.log('bcrypt not installed');
}