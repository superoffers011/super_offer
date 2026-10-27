const express = require('express');
const router = express.Router();
const {
  getOffers,
  getOfferById,
  getCategories,
} = require('../controllers/offerController');

router.get('/', getOffers);
router.get('/categories', getCategories);
router.get('/:id', getOfferById);

module.exports = router;
