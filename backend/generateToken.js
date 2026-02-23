const jwt = require("jsonwebtoken");
require("dotenv").config();

// This is temporary test admin data
const adminData = { id: "1", email: "admin@giondental.com", role: "admin" };

const token = jwt.sign(adminData, process.env.JWT_SECRET, { expiresIn: "1h" });

console.log("Admin Token:", token);
