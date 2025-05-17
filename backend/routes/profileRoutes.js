const express = require('express');
const { check } = require('express-validator');
const { createOrUpdateProfile, getProfileByUserId, getMyProfile } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Create or update emergency profile - protected route
router.post(
  '/',
  protect,
  [
    check('bloodType', 'Blood type must be valid').optional().isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown']),
    check('allergies', 'Allergies must be an array').optional().isArray(),
    check('medications', 'Medications must be an array').optional().isArray(),
    check('medicalConditions', 'Medical conditions must be an array').optional().isArray(),
    check('emergencyContacts', 'Emergency contacts must be an array').optional().isArray(),
    check('emergencyContacts.*.name', 'Contact name is required').optional().notEmpty(),
    check('emergencyContacts.*.relationship', 'Contact relationship is required').optional().notEmpty(),
    check('emergencyContacts.*.phone', 'Contact phone is required').optional().notEmpty()
  ],
  createOrUpdateProfile
);

// Get current user's profile - protected route
router.get('/me', protect, getMyProfile);

// Get profile by userId - protected route
router.get('/:userId', protect, getProfileByUserId);

module.exports = router;