const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide an offer title'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    brandName: {
      type: String,
      trim: true,
      default: 'Festive Partner',
    },
    description: {
      type: String,
      trim: true,
      default: function () {
        return `Celebrate Diwali with this exclusive ${this.title || 'festive'} deal! Unlock discount coupon code for ₹11 & enter the Diwali Bumper Lucky Draw.`;
      },
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      trim: true,
      enum: [
        'Electronics',
        'Fashion',
        'Food & Dining',
        'Travel & Flights',
        'Gold & Jewellery',
        'Home & Living',
        'Beauty & Wellness',
        'Entertainment & OTT',
        'Gift Cards',
      ],
      default: 'Electronics',
    },
    discountDetails: {
      type: String,
      required: [true, 'Please provide discount details (e.g. FLAT 70% OFF or ₹5000 Cashback)'],
      trim: true,
    },
    originalPrice: {
      type: Number,
      required: [true, 'Please provide original price'],
      min: [0, 'Price must be positive'],
    },
    offerPrice: {
      type: Number,
      required: [true, 'Please provide offer price'],
      min: [0, 'Price must be positive'],
    },
    brandLogo: {
      type: String,
      default: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=200&q=80',
    },
    bannerImage: {
      type: String,
      default: '',
    },
    couponCode: {
      type: String,
      required: [true, 'Please provide a festive coupon code'],
      uppercase: true,
      trim: true,
    },
    terms: {
      type: [String],
      default: [
        'Valid during festive Diwali season till 30th Nov 2026',
        'Applicable once per user on partner app/website',
        'Cannot be clubbed with other promotional codes',
        '₹11 entry enters you automatically into the Bumper Lucky Draw',
      ],
    },
    expiryDate: {
      type: Date,
      default: () => new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // ~45 days
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    claimsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

offerSchema.index({ category: 1, isFeatured: -1 });
offerSchema.index({ title: 'text', description: 'text', brandName: 'text' });

module.exports = mongoose.model('Offer', offerSchema);
