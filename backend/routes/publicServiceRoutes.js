const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// CONTROLLER
const {
  getServices,
  getAllServices,
  addService,
  updateService,
  deleteService
} = require("../controllers/PublicServiceController");

// MULTER
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../public/images");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  }
});

const upload = multer({ storage });

// ROUTES
router.get("/services", getServices);

router.get("/admin/services", getAllServices);
router.post("/admin/services", upload.single("image"), addService);
router.put("/admin/services/:id", updateService);
router.delete("/admin/services/:id", deleteService);

module.exports = router;
