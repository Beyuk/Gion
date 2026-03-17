const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "secretkey";

/* LOGIN */
exports.login = (req, res) => {

  const { email, password } = req.body;

  db.query("SELECT * FROM admins WHERE email=?", [email], async (err, result) => {

    if (err) return res.status(500).json({ message: "Database error" });

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const admin = result[0];

    const validPassword = await bcrypt.compare(password, admin.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      admin:{
        id:admin.id,
        email:admin.email,
        mustChangePassword:admin.must_change_password
      }
    });

  });

};


/* CHANGE PASSWORD */
exports.changePassword = async (req,res)=>{

  const {password} = req.body
  const adminId = req.admin.id

  const hash = await bcrypt.hash(password,10)

  db.query(
    "UPDATE admins SET password=?, must_change_password=0 WHERE id=?",
    [hash,adminId],
    (err)=>{

      if(err) return res.status(500).json({message:"Error updating password"})

      res.json({message:"Password updated"})
    }
  )

}


/* RESET PASSWORD (ADMIN EMAIL RESET) */
exports.resetPassword = async (req,res)=>{

  const {email,newPassword} = req.body

  const hash = await bcrypt.hash(newPassword,10)

  db.query(
    "UPDATE admins SET password=? WHERE email=?",
    [hash,email],
    (err)=>{

      if(err) return res.status(500).json({message:"Reset failed"})

      res.json({message:"Password reset successful"})
    }
  )

}