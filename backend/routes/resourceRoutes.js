const express = require('express');
const { check } = require('express-validator');
const { createResource, getAllResources, getNearbyResources } = require('../controllers/resourceController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a resource - protected route
router.post(
  '/',
  protect,
  [
    check('type', 'Resource type is required').not().isEmpty(),
    check('quantity', 'Quantity must be a number').isNumeric(),
    check('latitude', 'Latitude is required').isFloat({ min: -90, max: 90 }),
    check('longitude', 'Longitude is required').isFloat({ min: -180, max: 180 }),
    check('description', 'Description is required').not().isEmpty()
  ],
  createResource
);

// Get all resources - public route
router.get('/', getAllResources);

// Get nearby resources - public route
router.get('/nearby', getNearbyResources);

module.exports = router;