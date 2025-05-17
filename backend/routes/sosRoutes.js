const express = require('express');
const { check } = require('express-validator');
const { createSOSAlert, getUserSOSHistory, getMySOSHistory, updateSOSStatus } = require('../controllers/sosController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Create SOS alert - protected route
router.post(
  '/',
  protect,
  [
    check('latitude', 'Latitude is required').isFloat({ min: -90, max: 90 }),
    check('longitude', 'Longitude is required').isFloat({ min: -180, max: 180 }),
    check('message', 'Message must be a string').optional().isString()
  ],
  createSOSAlert
);

// Get current user's SOS history - protected route
router.get('/me', protect, getMySOSHistory);

// Get user's SOS history by userId - protected route
router.get('/:userId', protect, getUserSOSHistory);

// Update SOS alert status - protected route
router.put(
  '/:id',
  protect,
  [
    check('status', 'Status is required').isIn(['active', 'resolved'])
  ],
  updateSOSStatus
);

module.exports = router;