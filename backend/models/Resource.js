const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['water', 'food', 'shelter', 'medical', 'other']
  },
  quantity: {
    type: Number,
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
  description: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a 2dsphere index for geospatial queries
resourceSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Resource', resourceSchema);