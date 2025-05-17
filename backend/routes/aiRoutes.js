const express = require('express');
const { generatePrompt, testGeminiAPI } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Generate AI prompt - protected route
router.post('/prompt', protect, generatePrompt);

// Test Gemini API connection - protected route
router.get('/test', protect, testGeminiAPI);

module.exports = router;