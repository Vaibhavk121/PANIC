const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  relationship: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
});

const emergencyProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  bloodType: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'],
    default: 'Unknown'
  },
  allergies: [{
    type: String
  }],
  medications: [{
    type: String
  }],
  medicalConditions: [{
    type: String
  }],
  emergencyContacts: [emergencyContactSchema],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('EmergencyProfile', emergencyProfileSchema);