const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "secretkey";

// ADMIN LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM admins WHERE email=?", [email], (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (!result.length) return res.status(401).json({ message: "Invalid email or password" });

    const admin = result[0];
    if (!bcrypt.compareSync(password, admin.password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: "1d" });

    res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        mustChangePassword: admin.mustChangePassword === 1
      }
    });
  });
});

// CHANGE PASSWORD
router.post("/change-password", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }

  const { newPassword } = req.body;
  const hashed = await bcrypt.hash(newPassword, 10);

  db.query(
    "UPDATE admins SET password=?, mustChangePassword=0 WHERE id=?",
    [hashed, decoded.id],
    (err) => {
      if (err) return res.status(500).json({ message: "Failed to update password" });
      res.json({ message: "Password changed successfully" });
    }
  );
});

module.exports = router;