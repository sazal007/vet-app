const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { sendMessage, allMessage } = require('../controllers/chatsControllers/msgController');

router.post('/', protect, sendMessage);
router.get('/:chatId', protect, allMessage);

module.exports = router;