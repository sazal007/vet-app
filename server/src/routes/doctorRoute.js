const express = require('express');
const router = express.Router();
const { registerDoctor, getDoctor, getAllDoctors } = require('../controllers/usersControllers/doctorController');
const { protect } = require('../middleware/authMiddleware');

router.get('/get-doctor', getDoctor);
router.get('/all-doctors', getAllDoctors);
router.post('/register-doctor', registerDoctor);

module.exports = router