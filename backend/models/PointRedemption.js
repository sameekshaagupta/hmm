const mongoose = require('mongoose');

const redemptionSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  redeemedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pointsUsed: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('PointRedemption', redemptionSchema);
