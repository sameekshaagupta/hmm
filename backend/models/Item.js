const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  images: [String],
  category: String,
  size: String,
  condition: String,
  tags: [String],
  points: Number, // ADD THIS
  status: {
    type: String,
    enum: ['available', 'requested', 'redeemed', 'swapped'],
    default: 'available'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // TEMPORARILY make it optional if no login
  }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
