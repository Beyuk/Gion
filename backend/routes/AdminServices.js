const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const AdminAuth = require('../middleware/AdminAuth');
const multer = require('multer');
const path = require('path');

// Setup image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/images/services'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get('/services', AdminAuth, AdminController.getServices);
router.post('/services', AdminAuth, upload.single('image'), AdminController.createService);
router.put('/services/:id', AdminAuth, upload.single('image'), AdminController.updateService);
router.delete('/services/:id', AdminAuth, AdminController.deleteService);

module.exports = router;
