const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [60, 'Name cannot exceed 60 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
        'Please provide a valid email address',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone number'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailOtp: {
      type: String,
      select: false,
    },
    emailOtpExpires: {
      type: Date,
      select: false,
    },
    emailOtpAttempts: {
      type: Number,
      default: 0,
      select: false,
    },
    emailOtpLastSent: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate cryptographically secure 6-digit OTP & store hashed version
userSchema.methods.createEmailOtp = function () {
  // Generate a random 6-digit number between 100000 and 999999
  const rawOtp = crypto.randomInt(100000, 1000000).toString();

  // Store SHA-256 hash in database to prevent plaintext exposure
  this.emailOtp = crypto.createHash('sha256').update(rawOtp).digest('hex');

  // OTP expires in 10 minutes
  this.emailOtpExpires = new Date(Date.now() + 10 * 60 * 1000);

  // Reset failed attempts & mark timestamp
  this.emailOtpAttempts = 0;
  this.emailOtpLastSent = new Date();

  return rawOtp;
};

// Verify entered OTP with timing attack defense & brute-force limits
userSchema.methods.verifyEmailOtp = function (enteredOtp) {
  // 1. Check expiration
  if (!this.emailOtpExpires || this.emailOtpExpires < new Date()) {
    return {
      valid: false,
      reason: 'OTP has expired. Please request a new 6-digit code.',
    };
  }

  // 2. Check maximum failed attempts (rate limit to 5 tries)
  if (this.emailOtpAttempts >= 5) {
    return {
      valid: false,
      reason: 'Maximum verification attempts exceeded. Please request a new OTP.',
    };
  }

  // 3. Hash entered OTP and compare using constant-time check
  const enteredHash = crypto.createHash('sha256').update(enteredOtp.trim()).digest('hex');
  const storedHash = this.emailOtp;

  if (
    enteredHash.length === storedHash.length &&
    crypto.timingSafeEqual(Buffer.from(enteredHash), Buffer.from(storedHash))
  ) {
    this.isEmailVerified = true;
    this.emailOtp = undefined;
    this.emailOtpExpires = undefined;
    this.emailOtpAttempts = 0;
    return { valid: true };
  } else {
    this.emailOtpAttempts = (this.emailOtpAttempts || 0) + 1;
    const remaining = 5 - this.emailOtpAttempts;
    return {
      valid: false,
      reason: `Invalid OTP code. ${remaining > 0 ? `${remaining} attempts remaining.` : 'Code locked. Please request a new OTP.'}`,
    };
  }
};

module.exports = mongoose.model('User', userSchema);
