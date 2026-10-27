const Offer = require('../models/Offer');

// @desc    Get all offers with filtering, search, sorting and pagination
// @route   GET /api/offers
// @access  Public
const getOffers = async (req, res, next) => {
  try {
    const { category, search, featured, sort, page = 1, limit = 100 } = req.query;

    const query = {};

    // Filter by Category
    if (category && category !== 'All' && category !== 'all') {
      query.category = category;
    }

    // Filter by Featured
    if (featured === 'true') {
      query.isFeatured = true;
    }

    // Search query on title, description, brandName
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { brandName: searchRegex },
        { category: searchRegex },
      ];
    }

    // Sorting
    let sortOptions = { isFeatured: -1, createdAt: -1 };
    if (sort === 'price-low') {
      sortOptions = { offerPrice: 1 };
    } else if (sort === 'price-high') {
      sortOptions = { offerPrice: -1 };
    } else if (sort === 'discount') {
      sortOptions = { originalPrice: -1 };
    } else if (sort === 'popular') {
      sortOptions = { claimsCount: -1 };
    } else if (sort === 'newest') {
      sortOptions = { createdAt: -1 };
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Offer.countDocuments(query);
    const offers = await Offer.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: offers.length,
      total,
      totalPages: Math.ceil(total / limitNum) || 1,
      currentPage: pageNum,
      offers,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single offer details
// @route   GET /api/offers/:id
// @access  Public
const getOfferById = async (req, res, next) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found or expired.',
      });
    }

    res.status(200).json({
      success: true,
      offer,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get categories summary with counts
// @route   GET /api/offers/categories
// @access  Public
const getCategories = async (req, res, next) => {
  try {
    const stats = await Offer.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const totalCount = await Offer.countDocuments();

    res.status(200).json({
      success: true,
      categories: [
        { name: 'All', count: totalCount },
        ...stats.map((s) => ({ name: s._id, count: s.count })),
      ],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOffers,
  getOfferById,
  getCategories,
};
