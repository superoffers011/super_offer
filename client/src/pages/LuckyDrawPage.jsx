import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DiwaliCountdown from '../components/DiwaliCountdown';
import { adminAPI } from '../services/api';
import { DiyaIcon } from '../components/DiyaSparkles';
import {
  Trophy,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Gift,
  ArrowRight,
  Crown,
  Flame,
} from 'lucide-react';

const LuckyDrawPage = () => {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const res = await adminAPI.getWinners();
        if (res.data?.winners) {
          setWinners(res.data.winners);
        }
      } catch (err) {
        console.warn('Winners note:', err.message);
      }
    };
    fetchWinners();
  }, []);

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-festive-royalRed/60 border border-festive-gold/40 text-xs sm:text-sm font-bold text-festive-goldGlow shadow-diya-glow">
            <Trophy className="w-4 h-4" />
            <span>Grand Diwali Bumper Draw 2026</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <h1 className="font-royal text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
            Win <span className="text-gold-gradient">iPhone 16 Pro Max</span> &{' '}
            <span className="text-gold-gradient">24K Gold</span> with Your ₹11 Pass
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Every ₹11 offer pass purchased on DiwaliDhamaka11 assigns you a unique, tamper-proof lottery ticket number. Participate in our audited festive bumper draw!
          </p>

          <div className="pt-2">
            <DiwaliCountdown />
          </div>

          <div className="pt-4 flex justify-center">
            <Link
              to="/"
              className="px-8 py-4 rounded-full text-base sm:text-lg font-black bg-festive-button text-festive-dark shadow-gold-glow hover:scale-105 transition flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-festive-dark" />
              <span>Get ₹11 Ticket & Offer Now</span>
              <ArrowRight className="w-5 h-5 text-festive-dark" />
            </Link>
          </div>
        </div>

        {/* Prize Tiers */}
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-festive-goldLight">
              Mega Festive Prize Pool
            </span>
            <h2 className="font-royal text-2xl sm:text-4xl font-extrabold text-white mt-1">
              Bumper Rewards Lineup
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-festive-gold/60 shadow-gold-glow text-center relative flex flex-col justify-between">
              <div className="w-16 h-16 rounded-2xl bg-festive-royalRed border border-festive-gold flex items-center justify-center mx-auto mb-4 text-3xl shadow-diya-glow">
                📱
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-festive-gold block mb-1">
                  Mega 1st Prize
                </span>
                <h3 className="font-royal text-xl sm:text-2xl font-bold text-white mb-2">
                  Apple iPhone 16 Pro Max
                </h3>
                <p className="text-xs text-slate-300 mb-4">
                  256GB Desert Titanium • Apple Care+ included • Value ₹1,44,900
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-festive-dark/60 border border-festive-gold/20 text-xs font-bold text-festive-goldLight">
                3 Units Guaranteed
              </div>
            </div>

            <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-festive-gold/60 shadow-gold-glow text-center relative flex flex-col justify-between">
              <div className="w-16 h-16 rounded-2xl bg-festive-royalRed border border-festive-gold flex items-center justify-center mx-auto mb-4 text-3xl shadow-diya-glow">
                🪙
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-festive-gold block mb-1">
                  Auspicious 2nd Prize
                </span>
                <h3 className="font-royal text-xl sm:text-2xl font-bold text-white mb-2">
                  10g 24K Gold Coin
                </h3>
                <p className="text-xs text-slate-300 mb-4">
                  Tanishq 999.9 Hallmarked Lakshmi Gold Coin • Value ₹82,500
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-festive-dark/60 border border-festive-gold/20 text-xs font-bold text-festive-goldLight">
                10 Coins Guaranteed
              </div>
            </div>

            <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-festive-gold/60 shadow-gold-glow text-center relative flex flex-col justify-between">
              <div className="w-16 h-16 rounded-2xl bg-festive-royalRed border border-festive-gold flex items-center justify-center mx-auto mb-4 text-3xl shadow-diya-glow">
                💰
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-festive-gold block mb-1">
                  Cash 3rd Prize
                </span>
                <h3 className="font-royal text-xl sm:text-2xl font-bold text-white mb-2">
                  ₹1,00,000 Cash Bumper
                </h3>
                <p className="text-xs text-slate-300 mb-4">
                  Instant UPI / NEFT Bank Transfer on Diwali Night
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-festive-dark/60 border border-festive-gold/20 text-xs font-bold text-festive-goldLight">
                5 Winners Guaranteed
              </div>
            </div>
          </div>
        </div>

        {/* Live Verified Winners Announcement Section */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-festive-gold/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-festive-royalRed border border-festive-gold/40">
              <Crown className="w-6 h-6 text-festive-goldGlow" />
            </div>
            <div>
              <h3 className="font-royal text-xl sm:text-2xl font-bold text-white">
                Official Winner Announcements
              </h3>
              <p className="text-xs text-slate-300">
                Transparent and verified lucky draw winners chosen live by cryptographic hash.
              </p>
            </div>
          </div>

          {winners.length === 0 ? (
            <div className="p-8 rounded-2xl bg-festive-dark/60 border border-festive-gold/20 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-festive-gold mx-auto animate-pulse" />
              <h4 className="font-semibold text-slate-200 text-sm sm:text-base">
                Draw Starts On Diwali Night!
              </h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                No winners announced yet. Buy your ₹11 ticket today to be included in the live grand lucky draw!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {winners.map((winner) => (
                <div
                  key={winner._id}
                  className="p-4 rounded-2xl bg-festive-dark/70 border border-festive-gold/30 space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-festive-goldGlow bg-festive-royalRed/40 px-2 py-0.5 rounded border border-festive-gold/20">
                      {winner.couponNumber}
                    </span>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  </div>

                  <p className="text-sm font-bold text-white">
                    {winner.user?.name || 'Festive Participant'}
                  </p>

                  <div className="text-xs text-festive-amber font-semibold">
                    🏆 Won: {winner.prizeWon}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rules & Transparency */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-5 rounded-2xl bg-festive-deepMaroon/60 border border-festive-gold/20 space-y-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h4 className="font-bold text-sm text-white">100% Genuine & Audited</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every ₹11 transaction creates an immutable database entry. Random winner picker ensures complete fairness.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-festive-deepMaroon/60 border border-festive-gold/20 space-y-2">
            <Gift className="w-5 h-5 text-festive-gold" />
            <h4 className="font-bold text-sm text-white">Guaranteed Prize Delivery</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Physical prizes (iPhones, Gold Coins) are insured and delivered directly to the winner's doorstep across India.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-festive-deepMaroon/60 border border-festive-gold/20 space-y-2">
            <Flame className="w-5 h-5 text-festive-amber" />
            <h4 className="font-bold text-sm text-white">Multiple Entries Allowed</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              You can claim multiple ₹11 offer passes to increase your chances of winning the bumper prizes!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuckyDrawPage;
