const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { addCategory } = require('../controllers/productControllers/categoryController');

router.post('/add-category', addCategory);

module.exports = router;