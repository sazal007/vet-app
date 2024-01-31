const express = require('express');
const router = express.Router();
const { registerDoctor } = require('../controllers/usersControllers/doctorController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register-doctor', registerDoctor);

module.exports = router