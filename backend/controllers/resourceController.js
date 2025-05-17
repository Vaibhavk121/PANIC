const Resource = require('../models/Resource');
const { validationResult } = require('express-validator');

// @desc    Create a new resource
// @route   POST /api/resources
// @access  Private
exports.createResource = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { type, quantity, latitude, longitude, description } = req.body;

    const resource = new Resource({
      type,
      quantity,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude] // GeoJSON uses [longitude, latitude] order
      },
      description,
      userId: req.user._id
    });

    const savedResource = await resource.save();
    res.status(201).json(savedResource);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all resources
// @route   GET /api/resources
// @access  Public
exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find().populate('userId', 'name email');
    res.json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get nearby resources
// @route   GET /api/resources/nearby
// @access  Public
exports.getNearbyResources = async (req, res) => {
  try {
    const { lat, lng, radius = 10000 } = req.query; // radius in meters, default 10km

    if (!lat || !lng) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    // Convert latitude and longitude to numbers
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    const radiusInMeters = parseFloat(radius);

    // Find resources within the specified radius
    const resources = await Resource.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude] // GeoJSON uses [longitude, latitude] order
          },
          $maxDistance: radiusInMeters
        }
      }
    }).populate('userId', 'name email');

    res.json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};