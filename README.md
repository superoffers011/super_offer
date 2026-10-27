# 🪔 DiwaliDhamaka11 — Festive ₹11 Coupon & Bumper Lucky Draw Platform

A production-ready, fully responsive full-stack **MERN** web application built with a royal Diwali festive design theme. Users can browse **100+ exclusive festive offers** from top brands, pay **₹11 via Razorpay** to unlock their secret coupon code, and participate automatically in the **Diwali Bumper Lucky Draw** to win iPhone 16 Pro Max, 24K pure gold coins, and grand cash prizes.

---

## 🌟 Key Features

### 🪔 1. Royal Diwali Festive UI / UX
- **Festive Color Palette**: Deep royal maroons (`#1F0408`), vibrant crimson, sparkling golds (`#D4AF37`, `#FFD700`), warm amber glows, and crisp typography (`Outfit` & `Cinzel`).
- **Interactive Visual Polish**:
  - Animated Diyas with flickering flame glow effects.
  - Floating ambient gold sparkler particles.
  - Glassmorphic offer cards with metallic gold hover borders.
  - Live confetti cracker fireworks celebration on every coupon unlock!
  - Built-in Web Audio API festive chimes and sparkler synthesizer (Zero external MP3 dependencies).
- **100% Mobile First**: Fully responsive across smartphones, tablets, and widescreen displays.

### 🎁 2. 100+ Exclusive Festive Offers Catalog
- Pre-seeded with **108 realistic festive deals** across 9 categories:
  - Electronics (Apple, Sony, Samsung, Bose, MacBook, OnePlus, ASUS ROG)
  - Gold & Jewellery (Tanishq 24K Lakshmi Coins, Kalyan Jewellers, CaratLane, Malabar Gold)
  - Fashion & Apparel (Manyavar Sherwani, Fabindia Banarasi Silk, Raymond, Zara)
  - Food & Dining (Haldiram's, Bikanervala, Barbeque Nation, Swiggy, Zomato Gold)
  - Travel & Flights (MakeMyTrip Flight Pass, Taj Hotels Luxury Palace Stay, EaseMyTrip)
  - Home & Living (Dyson V12, Philips Hue Smart Ambient Lights, Havells Chandelier)
  - Beauty & Wellness (Forest Essentials 24K Gold, Nykaa Luxe, Sephora, Kama Ayurveda)
  - Entertainment & OTT (Amazon Prime Annual, Disney+ Hotstar Super, PVR INOX Gold)
  - Gift Cards & Subscriptions (Amazon Pay, Flipkart Super, Tanishq Gift Cards)
- Search in real-time, filter by category pills, and sort by discount, price, or popularity.

### 🔒 3. 2-Step Email OTP Verification & HTTP-Only Session Cookies
- **Cryptographic 6-Digit OTP Generator**: Generates numeric OTPs using Node.js `crypto.randomInt(100000, 1000000)`.
- **SHA-256 Hashing in Database**: Plaintext OTP is never stored; only SHA-256 cryptographic hashes are saved to prevent exposure in database breaches.
- **Timing Attack & Brute-Force Defenses**:
  - Constant-time hash comparison (`crypto.timingSafeEqual`).
  - Max 5 failed attempts lockout.
  - 30-second cooldown rate limit on OTP resends (HTTP 429 protection).
- **HTTP-Only Secure Session Cookies**:
  - JWT tokens are automatically stored in secure, `httpOnly: true`, `sameSite: 'lax'` cookies, neutralizing XSS document.cookie theft.
  - Browser automatically transmits session cookies via `withCredentials: true`.
  - Secure `/api/auth/logout` endpoint clears session cookies immediately.
- **Purchase Protection Gate**: Only email-verified users can purchase ₹11 lottery tickets and enter the Bumper Draw, completely stopping automated bot purchases and fraudulent claims!

### 💳 4. Razorpay Payment & Unique Lottery Ticket Generation
- Fixed order amount at **₹11.00** (`1100 paise`).
- Official **Razorpay Checkout SDK** integration with cryptographic HMAC-SHA256 signature verification.
- **Zero-Setup Demo Simulation Mode**: Includes an instant test button so users and testers can complete ₹11 payments and test ticket generation out-of-the-box without needing real bank cards!
- Automatically generates unique alphanumeric lottery ticket numbers: `DIWALI-2026-XXXXXX`.

### 🎟️ 4. "My Vault" (User Locker)
- View all purchased ₹11 coupons and official lottery passes.
- Interactive **"Reveal / Hide"** for the unlocked partner discount coupon code.
- 1-click **Copy Promo Code**.
- **Print / Save Pass** option with golden ticket styling.
- Real-time status badges: `Active in Draw`, `Winner 🏆`, `Redeemed`.

### 👑 5. Admin Dashboard (`/admin`)
- **Stats & Revenue Overview**:
  - Total registered users count
  - Total ₹11 collections (Revenue)
  - Total coupons / lottery tickets sold
  - Active offers count
  - Real-time transactions & participant table
- **Manage Offers**:
  - Add new seasonal festive offers
  - Delete offers
  - 1-click **"Re-Seed 100+ Offers"** button to restore sample catalog anytime
- **Live Bumper Lucky Draw Winner Picker**:
  - Select prize tier (iPhone 16 Pro Max, 10g 24K Gold Coin, ₹1,00,000 Cash)
  - Animated spinning wheel trigger
  - Automatically selects a random active ticket from MongoDB
  - Explodes victory confetti & saves winner profile to DB
  - Full history of announced winners

---

## 🛠️ Tech Stack & Architecture

- **Frontend**:
  - React 18 + Vite
  - Tailwind CSS + Custom Festive Theme Configuration
  - Lucide React (Icons)
  - Axios
  - React Router DOM v6
  - Canvas Confetti
  - Web Audio API (Synthesized festive bells & firecrackers)
- **Backend**:
  - Node.js & Express.js
  - MongoDB with Mongoose (Structured Schemas: User, Offer, LotteryCoupon, Transaction)
  - JSON Web Tokens (JWT) & Bcryptjs for secure authentication
  - Razorpay Node.js SDK & Crypto HMAC verification
  - Centralized global error handling middleware

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v22)
- **MongoDB** running locally (`mongodb://127.0.0.1:27017`) or a MongoDB Atlas URI

### 2. Installation
From the root workspace directory, install dependencies:
```bash
# Install root, backend, and frontend packages
npm install
npm --prefix server install
npm --prefix client install
```

### 3. Environment Variables
The server `.env` file is pre-configured at `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/diwalidhamaka11
JWT_SECRET=diwali_dhamaka_super_festive_secret_key_2026
RAZORPAY_KEY_ID=rzp_test_diwali11demo
RAZORPAY_KEY_SECRET=festive_secret_diwali11
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 4. Run Concurrently
Launch both backend API (`http://localhost:5000`) and Vite frontend (`http://localhost:5173`) with one command:
```bash
npm run dev
```

Or run them individually:
```bash
# Terminal 1: Backend
npm run server

# Terminal 2: Frontend
npm run client
```

---

## 🔑 Pre-Configured Demo Credentials

The database automatically seeds 108 offers and 2 test accounts upon first startup:

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@diwali11.com` | `DiwaliAdmin@2026` |
| **Demo User** | `user@diwali11.com` | `FestiveUser@2026` |

*(Quick 1-click fill buttons are also available on the Login page!)*

---

## 📡 API Endpoints Reference

### Auth
- `POST /api/auth/register` — Register a new festive user
- `POST /api/auth/login` — Log in & obtain JWT token
- `GET /api/auth/me` — Get authenticated user profile (`protect`)

### Offers
- `GET /api/offers` — List offers (supports `?category=`, `?search=`, `?sort=`, `?page=`, `?limit=`)
- `GET /api/offers/categories` — Get category list with counts
- `GET /api/offers/:id` — Get single offer details

### Payments & Coupons
- `POST /api/payment/create-order` — Initializes ₹11 Razorpay order (`protect`)
- `POST /api/payment/verify-payment` — Verifies signature & generates `DIWALI-2026-XXXX` coupon (`protect`)
- `GET /api/user/my-coupons` — Fetch logged-in user's vault coupons (`protect`)

### Admin Panel (Protected by `protect` + `requireAdmin`)
- `GET /api/admin/stats` — Revenue, coupons sold, total users, active offers, recent transactions
- `POST /api/admin/offers` — Create a new festive offer
- `PUT /api/admin/offers/:id` — Edit an offer
- `DELETE /api/admin/offers/:id` — Delete an offer
- `POST /api/admin/draw-winner` — Randomly pick a lucky draw winner from database
- `GET /api/admin/winners` — List verified lucky draw winners (Public)
- `POST /api/admin/seed` — Re-seed 108 festive offers on demand

---

## 🪔 Shubh Deepavali & Dhanteras!
Enjoy discovering deals, unlocking ₹11 passes, and winning bumper prizes!


# super_offer
