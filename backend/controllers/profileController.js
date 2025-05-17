const EmergencyProfile = require('../models/EmergencyProfile');
const { validationResult } = require('express-validator');

// @desc    Create or update emergency profile
// @route   POST /api/profile
// @access  Private
exports.createOrUpdateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { bloodType, allergies, medications, medicalConditions, emergencyContacts } = req.body;
    
    // Find profile by userId or create a new one
    let profile = await EmergencyProfile.findOne({ userId: req.user._id });
    
    if (profile) {
      // Update existing profile
      profile = await EmergencyProfile.findOneAndUpdate(
        { userId: req.user._id },
        { 
          bloodType, 
          allergies, 
          medications, 
          medicalConditions, 
          emergencyContacts,
          updatedAt: Date.now()
        },
        { new: true }
      );
    } else {
      // Create new profile
      profile = new EmergencyProfile({
        userId: req.user._id,
        bloodType,
        allergies,
        medications,
        medicalConditions,
        emergencyContacts
      });
      
      await profile.save();
    }
    
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get emergency profile by userId
// @route   GET /api/profile/:userId
// @access  Private
exports.getProfileByUserId = async (req, res) => {
  try {
    const profile = await EmergencyProfile.findOne({ userId: req.params.userId })
      .populate('userId', 'name email');
    
    if (!profile) {
      return res.status(404).json({ message: 'Emergency profile not found' });
    }
    
    // Check if the requesting user is the profile owner
    if (req.user._id.toString() !== req.params.userId && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to access this profile' });
    }
    
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get current user's emergency profile
// @route   GET /api/profile/me
// @access  Private
exports.getMyProfile = async (req, res) => {
  try {
    const profile = await EmergencyProfile.findOne({ userId: req.user._id })
      .populate('userId', 'name email');
    
    if (!profile) {
      return res.status(404).json({ message: 'Emergency profile not found' });
    }
    
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};