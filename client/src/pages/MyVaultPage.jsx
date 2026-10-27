import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { paymentAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import LotteryTicketCard from '../components/LotteryTicketCard';
import { DiyaIcon } from '../components/DiyaSparkles';
import {
  Ticket,
  Trophy,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Gift,
  Loader2,
  AlertCircle,
} from 'lucide-react';

const MyVaultPage = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchCoupons = async () => {
      try {
        const res = await paymentAPI.getMyCoupons();
        if (res.data?.coupons) {
          setCoupons(res.data.coupons);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load your vault passes');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchCoupons();
    }
  }, [isAuthenticated, authLoading, navigate]);

  const activeEntries = coupons.filter((c) => c.status === 'active').length;
  const wonEntries = coupons.filter((c) => c.status === 'won' || c.isWinner).length;
  const totalSaved = coupons.reduce((acc, c) => {
    const orig = c.offer?.originalPrice || 0;
    const off = c.offer?.offerPrice || 0;
    return acc + (orig - off);
  }, 0);

  if (authLoading || loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-festive-gold animate-spin" />
        <p className="text-sm text-festive-goldLight">
          Unlocking your festive vault...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <DiyaIcon className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-wider text-festive-goldLight">
              Personal Festive Locker
            </span>
          </div>
          <h1 className="font-royal text-2xl sm:text-4xl font-extrabold text-white">
            My Diwali Vault
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Welcome, <strong className="text-festive-gold">{user?.name}</strong>! Here are all your ₹11 unlocked coupon codes and verified lucky draw lottery passes.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-festive-button text-festive-dark shadow-gold-glow hover:opacity-95 transition"
        >
          <Sparkles className="w-4 h-4 text-festive-dark" />
          <span>Claim Another Offer (₹11)</span>
        </Link>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-festive-gold/30">
          <span className="text-xs text-slate-400 block font-medium">Total Passes</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-royal text-2xl sm:text-3xl font-extrabold text-white">
              {coupons.length}
            </span>
            <span className="text-xs text-festive-goldLight">Coupons</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-festive-gold/30">
          <span className="text-xs text-slate-400 block font-medium">Active Lottery Passes</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-royal text-2xl sm:text-3xl font-extrabold text-gold-gradient">
              {activeEntries}
            </span>
            <span className="text-xs text-emerald-400 font-semibold">Eligible</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-festive-gold/30">
          <span className="text-xs text-slate-400 block font-medium">Prizes Won</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-royal text-2xl sm:text-3xl font-extrabold text-festive-goldGlow">
              {wonEntries}
            </span>
            <span className="text-xs text-festive-gold">Bumper Prizes</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-festive-gold/30">
          <span className="text-xs text-slate-400 block font-medium">Estimated Brand Savings</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-royal text-xl sm:text-2xl font-extrabold text-emerald-400">
              ₹{totalSaved.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-200 text-sm mb-6 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Coupons List */}
      {coupons.length === 0 ? (
        <div className="glass-card rounded-3xl p-10 sm:p-16 text-center max-w-lg mx-auto space-y-5 border-2 border-festive-gold/30 shadow-card-glow">
          <div className="w-20 h-20 rounded-full bg-festive-royalRed/60 border border-festive-gold/40 flex items-center justify-center mx-auto shadow-diya-glow">
            <Ticket className="w-10 h-10 text-festive-gold" />
          </div>

          <h3 className="font-royal text-xl sm:text-2xl font-bold text-white">
            Your Vault is Empty
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            You haven't unlocked any ₹11 festive offers yet. Choose from 100+ offers across Electronics, Gold, Fashion, and Dining to get instant discount codes and lottery passes!
          </p>

          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-black bg-festive-button text-festive-dark shadow-gold-glow hover:scale-105 transition"
            >
              <Sparkles className="w-4 h-4 text-festive-dark" />
              <span>Browse 100+ Offers & Claim for ₹11</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-royal text-lg sm:text-xl font-bold text-white">
              Your Purchased Passes ({coupons.length})
            </h3>
            <span className="text-xs text-festive-goldLight">
              Click 'Reveal' to view your promo codes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coupons.map((coupon) => (
              <LotteryTicketCard key={coupon._id} coupon={coupon} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyVaultPage;
