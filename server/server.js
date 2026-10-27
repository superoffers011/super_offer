const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const { seedOffersData } = require('./utils/seedOffers');

// Route imports
const authRoutes = require('./routes/authRoutes');
const offerRoutes = require('./routes/offerRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const contactRoutes = require('./routes/contactRoutes');
const { getMyCoupons } = require('./controllers/paymentController');
const { protect } = require('./middleware/authMiddleware');

const app = express();

// Security Middlewares & Cookie Parser
app.use(cookieParser());

// Dynamic CORS configuration allowing credentials with session cookies
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow any requesting local/deployed web origin or curl/mobile with credentials
      callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    message: '🪔 DiwaliDhamaka11 API is glowing & fully operational!',
    timestamp: new Date(),
    festiveGreeting: 'Shubh Diwali & Dhanteras!',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

// Direct /api/user/my-coupons route as specified in requirements
app.get('/api/user/my-coupons', protect, getMyCoupons);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route ${req.originalUrl} not found on DiwaliDhamaka11 server.`,
  });
});

// Centralized Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect Database and start listening
const startServer = async () => {
  await connectDB();

  // Auto-seed database if empty or has fewer than 100 offers
  try {
    await seedOffersData();
  } catch (err) {
    console.warn('⚠️ Seeding note:', err.message);
  }

  const server = app.listen(PORT, () => {
    console.log(`
  ═══════════════════════════════════════════════════════
  🪔  DIWALI DHAMAKA 11 - FESTIVE MERN SERVER STARTED  🪔
  ═══════════════════════════════════════════════════════
  ✨ Server running on: http://localhost:${PORT}
  🎇 Health Check:      http://localhost:${PORT}/api/health
  💎 Admin Login:       admin@diwali11.com / DiwaliAdmin@2026
  🎁 Demo User:         user@diwali11.com  / FestiveUser@2026
  ═══════════════════════════════════════════════════════
    `);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.error(`Unhandled Rejection Error: ${err.message}`);
  });
};

startServer();
