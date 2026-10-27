import React from 'react';
import { Link } from 'react-router-dom';
import { DiyaIcon } from '../components/DiyaSparkles';
import {
  Sparkles,
  Trophy,
  ShieldCheck,
  Heart,
  Users,
  Zap,
  Gift,
  Flame,
  ArrowRight,
  Target,
  CheckCircle2,
} from 'lucide-react';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Hero Banner */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-festive-royalRed/60 border border-festive-gold/40 text-festive-goldLight text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
          <Sparkles className="w-4 h-4 text-festive-goldGlow" />
          <span>India's Premier Festive Platform</span>
        </div>
        <h1 className="font-royal text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-wide">
          About <span className="text-gold-gradient">DiwaliDhamaka11</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Bringing the divine glow of Deepawali to millions of Indian homes through <span className="text-festive-gold font-bold">₹11 Shagun Passes</span>, massive brand deals, and a 100% transparent Bumper Lucky Draw.
        </p>
      </div>

      {/* The Story Behind ₹11 */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-festive-gold/50 shadow-gold-glow mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-festive-gold/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-festive-gold text-xs font-bold uppercase tracking-wider">
              <Flame className="w-4 h-4 text-festive-amber" />
              <span>The Significance of ₹11 Shagun</span>
            </div>
            <h2 className="font-royal text-2xl sm:text-3xl font-extrabold text-white">
              Why Fixed At <span className="text-gold-gradient">₹11.00?</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              In Indian tradition, presenting an auspicious cash gift ending in <strong className="text-white">"1"</strong> (like ₹11, ₹21, or ₹51) is a sacred <em>Shagun</em>—symbolizing growth, endless prosperity, and positive karma. The extra rupee signifies that the journey continues and blessings never stop.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              We took this sacred Indian tradition into the digital age: instead of paying expensive membership fees, every citizen can grab high-value brand coupons and participate in a genuine lucky draw for an auspicious token of just <strong>₹11</strong>.
            </p>
          </div>

          <div className="relative">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-festive-royalRed/80 to-festive-deepMaroon border-2 border-festive-gold/60 text-center space-y-4 shadow-diya-glow">
              <div className="w-20 h-20 rounded-full bg-festive-dark border-2 border-festive-gold/80 flex items-center justify-center mx-auto shadow-inner">
                <DiyaIcon className="w-10 h-10" />
              </div>
              <div>
                <span className="font-royal text-3xl sm:text-4xl font-extrabold text-gold-gradient block">
                  ₹11 Shagun
                </span>
                <span className="text-xs uppercase tracking-widest text-festive-goldLight font-bold">
                  Auspicious Festive Token
                </span>
              </div>
              <p className="text-xs text-slate-200">
                100% Democratic Access. Every participant enjoys equal odds and genuine partner coupons.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Pillars */}
      <div className="mb-14">
        <div className="text-center mb-8">
          <h2 className="font-royal text-2xl sm:text-3xl font-extrabold text-white">
            Our Core <span className="text-gold-gradient">Pillars</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Built on trust, technological excellence, and festive spirit
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-festive-gold/30 hover:border-festive-gold transition group">
            <div className="w-12 h-12 rounded-xl bg-festive-royalRed/80 border border-festive-gold/40 flex items-center justify-center text-festive-gold mb-4 group-hover:scale-110 transition-transform">
              <Gift className="w-6 h-6 text-festive-goldGlow" />
            </div>
            <h3 className="text-base font-bold text-white mb-2 font-royal">100+ Curated Offers</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Carefully vetted discounts across Electronics, 24K Gold, Fashion, Dining, Flights, and OTT.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-festive-gold/30 hover:border-festive-gold transition group">
            <div className="w-12 h-12 rounded-xl bg-festive-royalRed/80 border border-festive-gold/40 flex items-center justify-center text-festive-gold mb-4 group-hover:scale-110 transition-transform">
              <Trophy className="w-6 h-6 text-festive-amber" />
            </div>
            <h3 className="text-base font-bold text-white mb-2 font-royal">Bumper Lucky Draw</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Audited random selection with mega prizes including iPhone 16 Pro, 10g Gold Coins & Electric Scooters.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-festive-gold/30 hover:border-festive-gold transition group">
            <div className="w-12 h-12 rounded-xl bg-festive-royalRed/80 border border-festive-gold/40 flex items-center justify-center text-festive-gold mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-2 font-royal">Razorpay Security</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Official Razorpay payment gateway integration with 256-bit SSL and cryptographic verification.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-festive-gold/30 hover:border-festive-gold transition group">
            <div className="w-12 h-12 rounded-xl bg-festive-royalRed/80 border border-festive-gold/40 flex items-center justify-center text-festive-gold mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-festive-gold" />
            </div>
            <h3 className="text-base font-bold text-white mb-2 font-royal">2-Step Email OTP</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Cryptographic 6-digit OTP authentication preventing bots and keeping the lucky draw transparent.
            </p>
          </div>
        </div>
      </div>

      {/* Platform Statistics */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-festive-deepMaroon via-festive-royalRed to-festive-maroon border-2 border-festive-gold/50 shadow-gold-glow mb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="font-royal text-3xl sm:text-4xl font-extrabold text-gold-gradient block">
              108+
            </span>
            <span className="text-xs uppercase tracking-wider text-slate-200 font-semibold mt-1 block">
              Curated Deals
            </span>
          </div>

          <div>
            <span className="font-royal text-3xl sm:text-4xl font-extrabold text-gold-gradient block">
              ₹11
            </span>
            <span className="text-xs uppercase tracking-wider text-slate-200 font-semibold mt-1 block">
              Fixed Entry Fee
            </span>
          </div>

          <div>
            <span className="font-royal text-3xl sm:text-4xl font-extrabold text-gold-gradient block">
              100%
            </span>
            <span className="text-xs uppercase tracking-wider text-slate-200 font-semibold mt-1 block">
              Verified Partners
            </span>
          </div>

          <div>
            <span className="font-royal text-3xl sm:text-4xl font-extrabold text-gold-gradient block">
              24/7
            </span>
            <span className="text-xs uppercase tracking-wider text-slate-200 font-semibold mt-1 block">
              Support Desk
            </span>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-festive-gold/40 shadow-gold-glow mb-12 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-festive-royalRed border border-festive-gold/40">
            <Target className="w-5 h-5 text-festive-goldGlow" />
          </div>
          <h2 className="font-royal text-2xl font-bold text-white">Our Mission & Commitment</h2>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          Our mission is to make Diwali festivities more joyful, rewarding, and fair. We strive to be India's most trusted festive aggregator by maintaining strict merchant compliance, protecting consumer privacy, ensuring instantaneous digital delivery, and upholding complete transparency in lucky draw outcomes.
        </p>
      </div>

      {/* CTA Box */}
      <div className="text-center p-8 rounded-3xl glass-card border-2 border-festive-gold/60 shadow-diya-glow">
        <h3 className="font-royal text-2xl sm:text-3xl font-extrabold text-white mb-2">
          Celebrate Diwali with Fortune & Festivity!
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mb-6">
          Browse hundreds of premium festive brand deals and secure your ₹11 Diwali Bumper Lucky Draw ticket today!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-festive-button text-festive-dark font-black text-sm shadow-gold-glow hover:opacity-95 transition flex items-center justify-center gap-2"
          >
            <span>Explore 100+ Offers Now</span>
            <ArrowRight className="w-4 h-4 text-festive-dark" />
          </Link>
          <Link
            to="/lucky-draw"
            className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-festive-royalRed/60 hover:bg-festive-royalRed text-festive-goldLight border border-festive-gold/40 text-sm font-bold transition flex items-center justify-center gap-2"
          >
            <Trophy className="w-4 h-4 text-festive-goldGlow" />
            <span>View Grand Prizes</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
