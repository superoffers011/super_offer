const User = require('../models/User');
const Offer = require('../models/Offer');
const LotteryCoupon = require('../models/LotteryCoupon');
const Transaction = require('../models/Transaction');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Admin only
const getAdminStats = async (req, res, next) => {
  try {
    const [totalUsers, totalCoupons, activeOffers, totalTransactions, revenueAgg] =
      await Promise.all([
        User.countDocuments({ role: 'user' }),
        LotteryCoupon.countDocuments(),
        Offer.countDocuments(),
        Transaction.countDocuments({ status: 'success' }),
        Transaction.aggregate([
          { $match: { status: 'success' } },
          { $group: { _id: null, total: { $sum: '$amount' } } },
        ]),
      ]);

    const totalRevenue = revenueAgg[0]?.total || totalTransactions * 11;

    // Recent 10 transactions with user & offer details
    const recentTransactions = await Transaction.find({ status: 'success' })
      .populate('user', 'name email phone')
      .populate('offer', 'title brandName')
      .sort({ createdAt: -1 })
      .limit(10);

    // Recent coupons / participants
    const recentCoupons = await LotteryCoupon.find()
      .populate('user', 'name email phone')
      .populate('offer', 'title brandName')
      .sort({ createdAt: -1 })
      .limit(10);

    // Category distribution
    const categoryStats = await Offer.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalCouponsSold: totalCoupons,
        activeOffers,
        totalRevenue,
        totalSuccessTransactions: totalTransactions,
      },
      recentTransactions,
      recentCoupons,
      categoryStats,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new offer
// @route   POST /api/admin/offers
// @access  Admin only
const createOffer = async (req, res, next) => {
  try {
    const {
      title,
      brandName,
      description,
      category,
      discountDetails,
      originalPrice,
      offerPrice,
      brandLogo,
      bannerImage,
      couponCode,
      terms,
      expiryDate,
      isFeatured,
    } = req.body;

    if (!title || !description || !originalPrice || !offerPrice || !couponCode) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: title, description, originalPrice, offerPrice, couponCode.',
      });
    }

    const offer = await Offer.create({
      title,
      brandName: brandName || 'Festive Partner',
      description,
      category: category || 'Electronics',
      discountDetails: discountDetails || `${Math.round(((originalPrice - offerPrice) / originalPrice) * 100)}% OFF`,
      originalPrice: Number(originalPrice),
      offerPrice: Number(offerPrice),
      brandLogo: brandLogo || 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=200&q=80',
      bannerImage: bannerImage || '',
      couponCode: couponCode.toUpperCase().trim(),
      terms: Array.isArray(terms) ? terms : [terms].filter(Boolean),
      expiryDate: expiryDate ? new Date(expiryDate) : undefined,
      isFeatured: !!isFeatured,
    });

    res.status(201).json({
      success: true,
      message: 'Festive offer created successfully!',
      offer,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update existing offer
// @route   PUT /api/admin/offers/:id
// @access  Admin only
const updateOffer = async (req, res, next) => {
  try {
    let offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found.',
      });
    }

    offer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Offer updated successfully!',
      offer,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete offer
// @route   DELETE /api/admin/offers/:id
// @access  Admin only
const deleteOffer = async (req, res, next) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found.',
      });
    }

    await offer.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Offer deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Select a lucky draw winner randomly from active coupons
// @route   POST /api/admin/draw-winner
// @access  Admin only
const drawWinner = async (req, res, next) => {
  try {
    const { prize = 'Apple iPhone 16 Pro (Festive Gold Edition)' } = req.body;

    // Find eligible coupons
    const totalEligible = await LotteryCoupon.countDocuments({ status: { $ne: 'won' } });

    if (totalEligible === 0) {
      // Check if there are ANY coupons
      const anyCoupons = await LotteryCoupon.countDocuments();
      if (anyCoupons === 0) {
        return res.status(400).json({
          success: false,
          message: 'No ₹11 lottery tickets have been purchased yet. Cannot pick winner.',
        });
      }
    }

    // Pick random coupon
    const coupons = await LotteryCoupon.find({ status: { $ne: 'won' } })
      .populate('user', 'name email phone')
      .populate('offer', 'title brandName');

    if (coupons.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'All existing participants have already won a prize!',
      });
    }

    const randomIndex = Math.floor(Math.random() * coupons.length);
    const winningCoupon = coupons[randomIndex];

    winningCoupon.status = 'won';
    winningCoupon.isWinner = true;
    winningCoupon.prizeWon = prize;
    await winningCoupon.save();

    res.status(200).json({
      success: true,
      message: `🎉 BUMPER WINNER ANNOUNCED! Congratulations to ${winningCoupon.user.name}!`,
      winner: {
        couponNumber: winningCoupon.couponNumber,
        prize: winningCoupon.prizeWon,
        userName: winningCoupon.user.name,
        userEmail: winningCoupon.user.email,
        userPhone: winningCoupon.user.phone,
        offerTitle: winningCoupon.offer ? winningCoupon.offer.title : 'Festive Dhamaka Offer',
        drawDate: new Date(),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all lucky draw winners
// @route   GET /api/admin/winners
// @access  Public
const getWinners = async (req, res, next) => {
  try {
    const winners = await LotteryCoupon.find({ isWinner: true })
      .populate('user', 'name email phone')
      .populate('offer', 'title brandName')
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: winners.length,
      winners,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdminStats,
  createOffer,
  updateOffer,
  deleteOffer,
  drawWinner,
  getWinners,
};
