const SOS = require('../models/SOS');
const { validationResult } = require('express-validator');

// @desc    Create a new SOS alert
// @route   POST /api/sos
// @access  Private
exports.createSOSAlert = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { latitude, longitude, message } = req.body;

    const sosAlert = new SOS({
      userId: req.user._id,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude] // GeoJSON uses [longitude, latitude] order
      },
      message: message || 'Emergency SOS alert!'
    });

    const savedSOS = await sosAlert.save();
    
    // In a real application, you would trigger notifications here
    // For example, send push notifications, SMS, or emails to emergency contacts

    res.status(201).json(savedSOS);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get SOS history for a user
// @route   GET /api/sos/:userId
// @access  Private
exports.getUserSOSHistory = async (req, res) => {
  try {
    // Check if the requesting user is the SOS owner or an admin
    if (req.user._id.toString() !== req.params.userId && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to access this SOS history' });
    }

    const sosAlerts = await SOS.find({ userId: req.params.userId })
      .sort({ timestamp: -1 }) // Sort by timestamp in descending order
      .populate('userId', 'name email phone');

    res.json(sosAlerts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get current user's SOS history
// @route   GET /api/sos/me
// @access  Private
exports.getMySOSHistory = async (req, res) => {
  try {
    const sosAlerts = await SOS.find({ userId: req.user._id })
      .sort({ timestamp: -1 }) // Sort by timestamp in descending order
      .populate('userId', 'name email phone');

    res.json(sosAlerts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update SOS alert status
// @route   PUT /api/sos/:id
// @access  Private
exports.updateSOSStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !['active', 'resolved'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const sosAlert = await SOS.findById(req.params.id);

    if (!sosAlert) {
      return res.status(404).json({ message: 'SOS alert not found' });
    }

    // Check if the requesting user is the SOS owner or an admin
    if (sosAlert.userId.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to update this SOS alert' });
    }

    sosAlert.status = status;
    await sosAlert.save();

    res.json(sosAlert);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};