const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');
const { protect } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');

// Generate unique ticket number like TKT-2026-X8P2
const generateTicketId = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 5; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `TKT-2026-${rand}`;
};

// @desc    Submit new support inquiry / dispute ticket
// @route   POST /api/contact
// @access  Public
router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone, queryType, orderId, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, phone, subject, message.',
      });
    }

    const ticketId = generateTicketId();

    const contactEntry = await ContactMessage.create({
      ticketId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      queryType: queryType || 'Payment & Refund Support',
      orderId: orderId ? orderId.trim() : '',
      subject: subject.trim(),
      message: message.trim(),
    });

    console.log(`📩 [Support Ticket Created]: ${ticketId} for ${email} (${queryType})`);

    res.status(201).json({
      success: true,
      ticketId,
      message: `Your festive support ticket ${ticketId} has been created successfully. Our grievance team will review your inquiry within 24 hours.`,
      contact: contactEntry,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get all support tickets (Admin only)
// @route   GET /api/contact
// @access  Private/Admin
router.get('/', protect, requireAdmin, async (req, res, next) => {
  try {
    const tickets = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: tickets.length,
      tickets,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
