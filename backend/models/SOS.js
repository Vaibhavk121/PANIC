const mongoose = require('mongoose');

const sosSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  message: {
    type: String,
    default: 'Emergency SOS alert!'
  },
  status: {
    type: String,
    enum: ['active', 'resolved'],
    default: 'active'
  }
});

// Create a 2dsphere index for geospatial queries
sosSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('SOS', sosSchema);