const express = require('express');
const { check } = require('express-validator');
const { 
  reportPerson, 
  getReports, 
  getReportById, 
  updateReport 
} = require('../controllers/lostFoundController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Report a lost or found person - protected route
router.post(
  '/',
  protect,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('age', 'Age must be a number').isNumeric(),
    check('gender', 'Gender must be male, female, or other').isIn(['male', 'female', 'other']),
    check('status', 'Status must be lost or found').isIn(['lost', 'found']),
    check('description', 'Description is required').not().isEmpty(),
    check('latitude', 'Latitude is required').isFloat({ min: -90, max: 90 }),
    check('longitude', 'Longitude is required').isFloat({ min: -180, max: 180 }),
    check('contactInfo', 'Contact information is required').not().isEmpty()
  ],
  reportPerson
);

// Get all reports with optional filtering - public route
router.get('/', getReports);

// Get a specific report by ID - public route
router.get('/:id', getReportById);

// Update a report - protected route
router.put(
  '/:id',
  protect,
  updateReport
);

module.exports = router;