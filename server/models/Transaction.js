const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    offer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Offer',
      required: true,
    },
    orderId: {
      type: String,
      required: true,
      trim: true,
    },
    paymentId: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      default: 11, // in Rupees (or 1100 in paise)
      required: true,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    status: {
      type: String,
      enum: ['success', 'failed'],
      default: 'success',
    },
    signature: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Transaction', transactionSchema);
