const User = require('../models/User');
const LotteryCoupon = require('../models/LotteryCoupon');
const Transaction = require('../models/Transaction');
const jwt = require('jsonwebtoken');
const { sendOtpEmail } = require('../utils/sendEmail');

// Generate JWT token helper
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'diwali_dhamaka_super_festive_secret_key_2026', {
    expiresIn: '30d',
  });
};

// Helper to set HTTP-Only Session Cookie and return user response
const sendTokenResponse = (user, statusCode, res, message) => {
  const token = generateToken(user._id);

  // Security Hardened Cookie Options
  const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true, // Defends against XSS / theft via document.cookie
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // CSRF protection
    path: '/',
  };

  res
    .status(statusCode)
    .cookie('token', token, cookieOptions)
    .json({
      success: true,
      message,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
      },
    });
};

// @desc    Register new user & dispatch email OTP
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, phone, password.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if user already exists
    let existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      if (existingUser.isEmailVerified) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email address is already registered and verified. Please log in.',
        });
      }

      // If user exists but is not yet verified, refresh OTP and allow verification!
      const rawOtp = existingUser.createEmailOtp();
      existingUser.name = name.trim();
      existingUser.phone = phone.trim();
      existingUser.password = password; // Pre-save hook will hash
      await existingUser.save();

      // Dispatch real email with 6-digit OTP
      await sendOtpEmail({
        toEmail: existingUser.email,
        name: existingUser.name,
        otp: rawOtp,
      });

      return res.status(200).json({
        success: true,
        requiresOtp: true,
        email: existingUser.email,
        message: 'Account pending verification. A fresh 6-digit OTP has been sent to your email.',
      });
    }

    // Create user with isEmailVerified: false
    const userRole = role === 'admin' ? 'admin' : 'user';

    const user = new User({
      name: name.trim(),
      email: cleanEmail,
      phone: phone.trim(),
      password,
      role: userRole,
      isEmailVerified: false,
    });

    // Generate cryptographic 6-digit OTP
    const rawOtp = user.createEmailOtp();
    await user.save();

    // Dispatch real email with 6-digit OTP
    await sendOtpEmail({
      toEmail: user.email,
      name: user.name,
      otp: rawOtp,
    });

    res.status(201).json({
      success: true,
      requiresOtp: true,
      email: user.email,
      message: 'Registration successful! Please check your email inbox for the 6-digit verification OTP.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify 6-digit email OTP
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyEmailOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and 6-digit OTP are required.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanOtp = otp.toString().trim();

    if (!/^\d{6}$/.test(cleanOtp)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP format. OTP must be exactly 6 digits.',
      });
    }

    // Find user with OTP fields selected
    const user = await User.findOne({ email: cleanEmail }).select(
      '+emailOtp +emailOtpExpires +emailOtpAttempts'
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User account not found with this email.',
      });
    }

    if (user.isEmailVerified) {
      return sendTokenResponse(
        user,
        200,
        res,
        'Email is already verified. Session activated!'
      );
    }

    // Verify OTP securely
    const verifyResult = user.verifyEmailOtp(cleanOtp);

    if (!verifyResult.valid) {
      await user.save();
      return res.status(400).json({
        success: false,
        message: verifyResult.reason,
      });
    }

    // Mark verified and clear OTP fields
    await user.save();

    console.log(`✨ [OTP Success] Email verified for: ${user.email}`);

    sendTokenResponse(
      user,
      200,
      res,
      '🎉 Email verified successfully! Your festive session is active.'
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Resend 6-digit OTP with rate limiting & cooldown
// @route   POST /api/auth/resend-otp
// @access  Public
const resendEmailOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email to resend OTP.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail }).select('+emailOtpLastSent');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Account not found with this email address.',
      });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: 'Your email address is already verified.',
      });
    }

    // Cooldown check (minimum 30 seconds to prevent spam)
    if (user.emailOtpLastSent) {
      const timeElapsed = Date.now() - new Date(user.emailOtpLastSent).getTime();
      const cooldownMs = 30 * 1000;
      if (timeElapsed < cooldownMs) {
        const remainingSeconds = Math.ceil((cooldownMs - timeElapsed) / 1000);
        return res.status(429).json({
          success: false,
          message: `Please wait ${remainingSeconds} seconds before requesting another OTP.`,
        });
      }
    }

    const rawOtp = user.createEmailOtp();
    await user.save();

    // Dispatch real email with 6-digit OTP
    await sendOtpEmail({
      toEmail: user.email,
      name: user.name,
      otp: rawOtp,
    });

    res.status(200).json({
      success: true,
      message: 'A fresh 6-digit verification code has been sent to your email.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & set HTTP-Only session cookie
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Find user with password selected
    const user = await User.findOne({ email: cleanEmail }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Check if email is verified
    if (!user.isEmailVerified && user.role !== 'admin') {
      const rawOtp = user.createEmailOtp();
      await user.save();

      // Dispatch real email with 6-digit OTP
      await sendOtpEmail({
        toEmail: user.email,
        name: user.name,
        otp: rawOtp,
      });

      return res.status(403).json({
        success: false,
        requiresOtp: true,
        email: user.email,
        message: 'Your email address is not yet verified. A 6-digit OTP has been sent to your email to complete verification.',
      });
    }

    // Issue secure session cookie & return response
    sendTokenResponse(user, 200, res, 'Logged in successfully! Welcome to DiwaliDhamaka11.');
  } catch (error) {
    next(error);
  }
};

// @desc    Log out user & clear HTTP-Only session cookie
// @route   POST /api/auth/logout
// @access  Public
const logoutUser = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/',
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully. Session cookie cleared.',
  });
};

// @desc    Get current logged in user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found.',
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile (name, phone)
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const { name, phone } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    if (name) user.name = name.trim();
    if (phone) user.phone = phone.trim();

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get complete user profile with statistics, all bought tickets, and transactions
// @route   GET /api/auth/profile-full
// @access  Private
const getUserFullProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    // Fetch all user's lottery coupons / passes
    const coupons = await LotteryCoupon.find({ user: user._id })
      .populate('offer')
      .sort({ createdAt: -1 });

    // Fetch all user's transactions
    const transactions = await Transaction.find({ user: user._id })
      .populate('offer', 'title brandName')
      .sort({ createdAt: -1 });

    // Calculate aggregated user stats
    const totalTicketsBought = coupons.length;
    const activeDrawTickets = coupons.filter((c) => c.status === 'active').length;
    const wonCoupons = coupons.filter((c) => c.isWinner || c.status === 'won');
    const totalAmountSpent = totalTicketsBought * 11;
    const totalEstimatedSavings = coupons.reduce((sum, c) => {
      const orig = c.offer?.originalPrice || 0;
      const off = c.offer?.offerPrice || 0;
      return sum + (orig - off);
    }, 0);

    res.status(200).json({
      success: true,
      user,
      stats: {
        totalTicketsBought,
        totalAmountSpent,
        activeDrawTickets,
        prizesWonCount: wonCoupons.length,
        totalEstimatedSavings,
      },
      coupons,
      transactions,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  verifyEmailOtp,
  resendEmailOtp,
  loginUser,
  logoutUser,
  getMe,
  updateProfile,
  getUserFullProfile,
};
