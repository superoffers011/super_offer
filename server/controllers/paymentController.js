const crypto = require('crypto');
const Razorpay = require('razorpay');
const Offer = require('../models/Offer');
const LotteryCoupon = require('../models/LotteryCoupon');
const Transaction = require('../models/Transaction');
const { sendTicketConfirmationEmail } = require('../utils/sendEmail');

// Initialize Razorpay instance
const getRazorpayInstance = () => {
  const key_id = process.env.RAZORPAY_KEY_ID ? process.env.RAZORPAY_KEY_ID.trim() : '';
  const key_secret = process.env.RAZORPAY_KEY_SECRET ? process.env.RAZORPAY_KEY_SECRET.trim() : '';

  if (!key_id || !key_secret) {
    return null;
  }

  return new Razorpay({
    key_id,
    key_secret,
  });
};

// Generate random unique coupon code e.g. DIWALI-2026-K9P3X8
const generateUniqueCouponNumber = async () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let isUnique = false;
  let code = '';

  while (!isUnique) {
    let randomPart = '';
    for (let i = 0; i < 6; i++) {
      randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    code = `DIWALI-2026-${randomPart}`;

    const existing = await LotteryCoupon.findOne({ couponNumber: code });
    if (!existing) {
      isUnique = true;
    }
  }

  return code;
};

// @desc    Initialize real Razorpay order for ₹11 (1100 paise)
// @route   POST /api/payment/create-order
// @access  Private
const createOrder = async (req, res, next) => {
  try {
    const { offerId } = req.body;

    if (!offerId) {
      return res.status(400).json({
        success: false,
        message: 'Offer ID is required to buy coupon.',
      });
    }

    const offer = await Offer.findById(offerId);
    if (!offer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found or no longer active.',
      });
    }

    // Security check: Email must be verified before purchasing ₹11 lottery tickets
    if (!req.user.isEmailVerified && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        requiresEmailVerification: true,
        message: 'Security Notice: Please verify your email with the 6-digit OTP before purchasing ₹11 lottery tickets.',
      });
    }

    const amountInPaise = 1100; // Fixed ₹11.00
    const receipt = `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const razorpay = getRazorpayInstance();

    if (!razorpay) {
      return res.status(503).json({
        success: false,
        message: 'Razorpay Gateway is not initialized. Please verify RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in server/.env',
      });
    }

    console.log(`💳 [Razorpay Live Mode] Creating real Razorpay order of ₹11 for user ${req.user.email}...`);
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt,
      notes: {
        userId: req.user._id.toString(),
        userName: req.user.name,
        offerId: offer._id.toString(),
        offerTitle: offer.title.substring(0, 30),
      },
    });

    console.log(`✅ [Razorpay Order Created]: ${order.id}`);

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: amountInPaise,
      amountInRupees: 11,
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID.trim(),
      offer: {
        _id: offer._id,
        title: offer.title,
        brandName: offer.brandName,
        discountDetails: offer.discountDetails,
        originalPrice: offer.originalPrice,
        offerPrice: offer.offerPrice,
      },
      user: {
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
      },
    });
  } catch (error) {
    console.error('❌ Razorpay order creation failed:', error);
    const errMsg = error.error?.description || error.message || 'Razorpay order creation failed.';
    res.status(400).json({
      success: false,
      message: `Razorpay Error: ${errMsg}`,
    });
  }
};

// @desc    Verify payment signature, generate unique lottery coupon & save to DB
// @route   POST /api/payment/verify-payment
// @access  Private
const verifyPayment = async (req, res, next) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, offerId } = req.body;

    if (!razorpayOrderId || !razorpayPaymentId || !offerId || !razorpaySignature) {
      return res.status(400).json({
        success: false,
        message: 'Order ID, Payment ID, Signature, and Offer ID are required for verification.',
      });
    }

    const offer = await Offer.findById(offerId);
    if (!offer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found.',
      });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET ? process.env.RAZORPAY_KEY_SECRET.trim() : '';
    if (!keySecret) {
      return res.status(500).json({
        success: false,
        message: 'Razorpay Key Secret is not configured in server/.env.',
      });
    }

    // Cryptographic HMAC-SHA256 signature verification
    console.log(`🔐 [Razorpay Verification] Verifying HMAC signature for order ${razorpayOrderId}...`);
    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    if (generatedSignature !== razorpaySignature) {
      console.error('❌ Razorpay signature mismatch!');
      // Record failed transaction in audit log
      await Transaction.create({
        user: req.user._id,
        offer: offer._id,
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        amount: 11,
        currency: 'INR',
        status: 'failed',
        signature: razorpaySignature,
      });

      return res.status(400).json({
        success: false,
        message: 'Payment verification failed: Invalid transaction signature.',
      });
    }

    console.log('✅ [Razorpay Signature Verified]: Authentic payment confirmed!');

    // Generate unique Diwali Lottery Coupon Number
    const couponNumber = await generateUniqueCouponNumber();

    // Record successful transaction
    const transaction = await Transaction.create({
      user: req.user._id,
      offer: offer._id,
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      amount: 11,
      currency: 'INR',
      status: 'success',
      signature: razorpaySignature,
    });

    // Create Lottery Coupon
    const coupon = await LotteryCoupon.create({
      user: req.user._id,
      offer: offer._id,
      razorpayOrderId,
      razorpayPaymentId,
      couponNumber,
      status: 'active',
      purchasedAt: new Date(),
    });

    // Increment claims count on offer
    offer.claimsCount = (offer.claimsCount || 0) + 1;
    await offer.save();

    // Send real Ticket Confirmation Email to user
    await sendTicketConfirmationEmail({
      toEmail: req.user.email,
      name: req.user.name,
      couponNumber,
      offerTitle: offer.title,
      brandName: offer.brandName,
      unlockedCouponCode: offer.couponCode,
    });

    // Populate coupon with offer details for immediate display
    const populatedCoupon = await LotteryCoupon.findById(coupon._id).populate('offer');

    res.status(200).json({
      success: true,
      message: '🎉 Shubh Diwali! ₹11 Payment Confirmed! Your Lucky Draw Ticket is Active!',
      coupon: populatedCoupon,
      transaction,
      unlockedOfferCode: offer.couponCode,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all coupons purchased by logged-in user
// @route   GET /api/user/my-coupons
// @access  Private
const getMyCoupons = async (req, res, next) => {
  try {
    const coupons = await LotteryCoupon.find({ user: req.user._id })
      .populate('offer')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: coupons.length,
      coupons,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  getMyCoupons,
};
