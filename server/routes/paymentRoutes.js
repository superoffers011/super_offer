const express = require('express');
const router = express.Router();
const {
  createOrder,
  verifyPayment,
  getMyCoupons,
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create-order', protect, createOrder);
router.post('/verify-payment', protect, verifyPayment);
router.get('/my-coupons', protect, getMyCoupons);

module.exports = router;
