import React from 'react';
import DiwaliCountdown from './DiwaliCountdown';
import { DiyaIcon } from './DiyaSparkles';
import { Sparkles, Trophy, ShieldCheck, Flame, ArrowDown, Gift, Zap } from 'lucide-react';

const FestiveHero = ({ onExploreClick }) => {
  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      {/* Decorative Rangoli & Light circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-festive-royalRed/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-festive-amber/15 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Festive Top Diya Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-festive-maroon/80 border border-festive-gold/40 shadow-diya-glow mb-6 animate-float-slow">
          <DiyaIcon className="w-5 h-5" />
          <span className="text-xs sm:text-sm font-bold text-festive-goldLight tracking-wider uppercase">
            India's Biggest ₹11 Diwali Festival
          </span>
          <Sparkles className="w-4 h-4 text-festive-goldGlow" />
        </div>

        {/* Main Royal Heading */}
        <h1 className="font-royal text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15] max-w-5xl mx-auto mb-6">
          Win <span className="text-gold-gradient underline decoration-festive-amber/40">iPhone 16 Pro</span> &{' '}
          <span className="text-gold-gradient">24K Gold Coins</span> For Just{' '}
          <span className="inline-block relative">
            <span className="bg-gradient-to-r from-festive-gold via-festive-amber to-festive-gold text-festive-dark px-3 py-0.5 rounded-xl font-black shadow-gold-glow">
              ₹11
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto mb-8 font-normal leading-relaxed">
          Browse <span className="text-festive-gold font-bold">100+ exclusive festive deals</span> from Apple, Tanishq,
          Amazon, Swiggy & MakeMyTrip. Pay only <span className="text-festive-gold font-bold">₹11</span> via Razorpay to unlock your brand discount coupon and automatically receive an official{' '}
          <span className="text-festive-gold font-bold">Diwali Bumper Lucky Draw</span> ticket!
        </p>

        {/* Live Diwali Countdown Widget */}
        <div className="mb-10">
          <DiwaliCountdown />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-base sm:text-lg font-black bg-festive-button text-festive-dark shadow-gold-glow hover:shadow-diya-glow hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-festive-dark group-hover:rotate-12 transition-transform" />
            <span>Grab ₹11 Offers & Enter Draw</span>
            <ArrowDown className="w-5 h-5 text-festive-dark group-hover:translate-y-1 transition-transform" />
          </button>

          <a
            href="#prizes"
            className="w-full sm:w-auto px-6 py-4 rounded-full text-sm sm:text-base font-bold bg-festive-maroon/60 text-festive-goldLight border border-festive-gold/40 hover:bg-festive-maroon hover:border-festive-gold transition flex items-center justify-center gap-2"
          >
            <Trophy className="w-4 h-4 text-festive-goldGlow" />
            <span>View Bumper Prizes</span>
          </a>
        </div>

        {/* Festive Trust / Guarantee Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-6 border-t border-festive-gold/20">
          <div className="flex items-center justify-center gap-2 py-2 px-3 bg-festive-cardBg rounded-xl border border-festive-gold/20">
            <Zap className="w-4 h-4 text-festive-goldGlow shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-slate-200">Flat ₹11 Price</span>
          </div>

          <div className="flex items-center justify-center gap-2 py-2 px-3 bg-festive-cardBg rounded-xl border border-festive-gold/20">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-slate-200">Razorpay Verified</span>
          </div>

          <div className="flex items-center justify-center gap-2 py-2 px-3 bg-festive-cardBg rounded-xl border border-festive-gold/20">
            <Gift className="w-4 h-4 text-festive-amber shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-slate-200">100+ Top Brands</span>
          </div>

          <div className="flex items-center justify-center gap-2 py-2 px-3 bg-festive-cardBg rounded-xl border border-festive-gold/20">
            <Flame className="w-4 h-4 text-festive-gold shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-slate-200">Instant Lottery Pass</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FestiveHero;
