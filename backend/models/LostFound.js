const mongoose = require('mongoose');

const lostFoundSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  status: {
    type: String,
    enum: ['lost', 'found'],
    required: true
  },
  description: {
    type: String,
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
  reporterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contactInfo: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  resolved: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a 2dsphere index for geospatial queries
lostFoundSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('LostFound', lostFoundSchema);