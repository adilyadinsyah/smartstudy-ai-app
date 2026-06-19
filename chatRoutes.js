const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/chatController');

router.post('/ask', ChatController.askQuestion);
router.get('/history', ChatController.getChatHistory);

module.exports = router;