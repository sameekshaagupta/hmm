const mongoose = require('mongoose');

const swapSchema = new mongoose.Schema({
  itemOffered: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  itemRequested: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Swap', swapSchema);
