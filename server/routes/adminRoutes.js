const express = require('express');
const router = express.Router();
const {
  getAdminStats,
  createOffer,
  updateOffer,
  deleteOffer,
  drawWinner,
  getWinners,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');
const { seedOffersData } = require('../utils/seedOffers');

// Public winners route (to show festive transparency on landing page ticker!)
router.get('/winners', getWinners);

// Protected Admin Routes
router.use(protect);
router.use(requireAdmin);

router.get('/stats', getAdminStats);
router.post('/offers', createOffer);
router.put('/offers/:id', updateOffer);
router.delete('/offers/:id', deleteOffer);
router.post('/draw-winner', drawWinner);

// Admin seed trigger
router.post('/seed', async (req, res, next) => {
  try {
    const result = await seedOffersData();
    res.status(200).json({
      success: true,
      message: `✨ Database successfully seeded with ${result.count} festive offers!`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
