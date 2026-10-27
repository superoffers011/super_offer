import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import LotteryTicketCard from '../components/LotteryTicketCard';
import { DiyaIcon } from '../components/DiyaSparkles';
import OtpVerificationModal from '../components/OtpVerificationModal';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Ticket,
  Trophy,
  DollarSign,
  ShieldCheck,
  Sparkles,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  CreditCard,
  Gift,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

const UserProfilePage = () => {
  const { user: authUser, isAuthenticated, loading: authLoading, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('tickets'); // 'tickets' | 'transactions' | 'edit'

  // Edit Profile Form State
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(null);

  // OTP Verification Modal State
  const [showOtpModal, setShowOtpModal] = useState(false);

  // Filter tickets
  const [ticketFilter, setTicketFilter] = useState('all'); // 'all' | 'active' | 'won'

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchFullProfile = async () => {
      try {
        setLoading(true);
        const res = await authAPI.getFullProfile();
        if (res.data?.success) {
          setProfileData(res.data);
          setName(res.data.user.name || '');
          setPhone(res.data.user.phone || '');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchFullProfile();
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateSuccess(null);
    setError(null);

    try {
      const res = await authAPI.updateProfile({ name, phone });
      if (res.data?.success) {
        setUpdateSuccess('✨ Profile details updated successfully!');
        setProfileData((prev) => ({
          ...prev,
          user: { ...prev.user, name, phone },
        }));
        setIsEditing(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setUpdateLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-festive-gold animate-spin" />
        <p className="text-sm text-festive-goldLight">
          Lighting up your Diwali profile & bought tickets...
        </p>
      </div>
    );
  }

  const user = profileData?.user || authUser;
  const stats = profileData?.stats || {
    totalTicketsBought: 0,
    totalAmountSpent: 0,
    activeDrawTickets: 0,
    prizesWonCount: 0,
    totalEstimatedSavings: 0,
  };
  const coupons = profileData?.coupons || [];
  const transactions = profileData?.transactions || [];

  // Filtered tickets
  const filteredCoupons = coupons.filter((c) => {
    if (ticketFilter === 'active') return c.status === 'active';
    if (ticketFilter === 'won') return c.status === 'won' || c.isWinner;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-festive-gold/25 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <DiyaIcon className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-wider text-festive-goldLight">
              Official Member Profile
            </span>
          </div>
          <h1 className="font-royal text-2xl sm:text-4xl font-extrabold text-white">
            {user?.name}'s Diwali Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Manage your personal info, review all bought ₹11 tickets, and track your Diwali lucky draw prizes.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-festive-button text-festive-dark shadow-gold-glow hover:opacity-95 transition cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-festive-dark" />
          <span>Buy More Tickets (₹11 Each)</span>
        </Link>
      </div>

      {/* Notifications */}
      {updateSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-600 text-emerald-200 text-xs sm:text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{updateSuccess}</span>
          </div>
          <button onClick={() => setUpdateSuccess(null)} className="text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-200 text-xs sm:text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-rose-400 hover:text-white">✕</button>
        </div>
      )}

      {/* User Information Profile Card & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: User Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 border-2 border-festive-gold/50 shadow-gold-glow relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-festive-royalRed/20 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-festive-royalRed to-festive-crimson border-2 border-festive-gold/60 flex items-center justify-center text-festive-goldGlow font-black text-2xl shadow-diya-glow">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>

              <div className="flex flex-col items-end">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-festive-royalRed/60 text-festive-goldGlow border border-festive-gold/40">
                  {user?.role === 'admin' ? '👑 Administrator' : '🪔 Verified Shopper'}
                </span>
                <span className="text-[10px] text-slate-400 mt-1">
                  ID: #{user?._id?.slice(-6).toUpperCase()}
                </span>
              </div>
            </div>

            <h3 className="font-royal text-xl sm:text-2xl font-bold text-white">
              {user?.name}
            </h3>

            {/* Email verification status badge */}
            <div className="mt-2">
              {user?.isEmailVerified ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Email Account</span>
                </span>
              ) : (
                <button
                  onClick={() => setShowOtpModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition cursor-pointer animate-pulse"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Email Unverified • Click to Verify OTP</span>
                </button>
              )}
            </div>

            <div className="space-y-2.5 mt-4 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-festive-gold/80 shrink-0" />
                <span className="truncate">{user?.email}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-festive-gold/80 shrink-0" />
                <span>{user?.phone || 'No phone added'}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-festive-amber shrink-0" />
                <span>
                  Member since:{' '}
                  {new Date(user?.createdAt || Date.now()).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-festive-gold/20 mt-6 flex gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-festive-goldLight border border-festive-gold/30 hover:border-festive-gold transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5 text-festive-gold" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>

        {/* Right: 4 Metrics Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-2 gap-4">
          <div className="glass-card rounded-2xl p-5 border border-festive-gold/30 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Total ₹11 Tickets Bought
              </span>
              <div className="p-2 rounded-xl bg-festive-royalRed/60 text-festive-gold">
                <Ticket className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="font-royal text-3xl sm:text-4xl font-black text-white">
                {stats.totalTicketsBought}
              </span>
              <span className="text-[11px] text-festive-goldLight block mt-1">
                Diwali Bumper Passes
              </span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-festive-gold/30 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Total Amount Paid
              </span>
              <div className="p-2 rounded-xl bg-festive-royalRed/60 text-festive-gold">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="font-royal text-3xl sm:text-4xl font-black text-gold-gradient">
                ₹{stats.totalAmountSpent}
              </span>
              <span className="text-[11px] text-emerald-400 block mt-1 font-semibold">
                Fixed ₹11 per pass
              </span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-festive-gold/30 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Active Draw Entries
              </span>
              <div className="p-2 rounded-xl bg-festive-royalRed/60 text-festive-gold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div>
              <span className="font-royal text-3xl sm:text-4xl font-black text-emerald-400">
                {stats.activeDrawTickets}
              </span>
              <span className="text-[11px] text-slate-300 block mt-1">
                Eligible for iPhone & Gold Coins
              </span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-festive-gold/30 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Prizes Won
              </span>
              <div className="p-2 rounded-xl bg-festive-royalRed/60 text-festive-gold">
                <Trophy className="w-4 h-4 text-festive-goldGlow" />
              </div>
            </div>
            <div>
              <span className="font-royal text-3xl sm:text-4xl font-black text-festive-goldGlow">
                {stats.prizesWonCount}
              </span>
              <span className="text-[11px] text-festive-amber block mt-1 font-semibold">
                {stats.prizesWonCount > 0 ? '🏆 Grand Winner!' : 'Draw Scheduled on Diwali'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Form (if toggled) */}
      {isEditing && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-festive-gold/50 shadow-card-glow max-w-xl mx-auto animate-in fade-in duration-200">
          <div className="flex items-center gap-2 mb-4">
            <Edit2 className="w-5 h-5 text-festive-gold" />
            <h3 className="font-royal text-xl font-bold text-white">
              Update Profile Details
            </h3>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-festive-dark border border-festive-gold/30 text-white text-sm"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Phone Number (for Lucky Draw Winner Contact)
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-festive-dark border border-festive-gold/30 text-white text-sm"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Email Address (Read-only)
              </label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full px-3 py-2.5 rounded-xl bg-festive-dark/50 border border-festive-gold/20 text-slate-400 text-sm cursor-not-allowed"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-festive-gold/20">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updateLoading}
                className="px-6 py-2 rounded-xl bg-festive-button text-festive-dark font-bold shadow-gold-glow cursor-pointer disabled:opacity-50"
              >
                {updateLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabs: "My Bought Tickets" vs "Payment Transactions" */}
      <div className="flex items-center gap-3 border-b border-festive-gold/20">
        <button
          onClick={() => setActiveTab('tickets')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'tickets'
              ? 'border-festive-gold text-festive-gold bg-festive-royalRed/20'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Ticket className="w-4 h-4" />
          <span>My Bought Tickets & Passes ({coupons.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('transactions')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'transactions'
              ? 'border-festive-gold text-festive-gold bg-festive-royalRed/20'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Razorpay Payment History ({transactions.length})</span>
        </button>
      </div>

      {/* TAB 1: ALL BOUGHT TICKETS */}
      {activeTab === 'tickets' && (
        <div className="space-y-6">
          {/* Subfilter pills */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTicketFilter('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
                  ticketFilter === 'all'
                    ? 'bg-festive-gold text-festive-dark font-bold'
                    : 'bg-festive-deepMaroon text-slate-300 border border-festive-gold/30 hover:border-festive-gold'
                }`}
              >
                All Passes ({coupons.length})
              </button>
              <button
                onClick={() => setTicketFilter('active')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
                  ticketFilter === 'active'
                    ? 'bg-festive-gold text-festive-dark font-bold'
                    : 'bg-festive-deepMaroon text-slate-300 border border-festive-gold/30 hover:border-festive-gold'
                }`}
              >
                Active Entries ({coupons.filter((c) => c.status === 'active').length})
              </button>
              <button
                onClick={() => setTicketFilter('won')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
                  ticketFilter === 'won'
                    ? 'bg-festive-gold text-festive-dark font-bold'
                    : 'bg-festive-deepMaroon text-slate-300 border border-festive-gold/30 hover:border-festive-gold'
                }`}
              >
                Won Prizes ({coupons.filter((c) => c.status === 'won' || c.isWinner).length})
              </button>
            </div>

            <span className="text-xs text-festive-goldLight">
              Click 'Reveal' on any pass to see your unlocked promo code
            </span>
          </div>

          {filteredCoupons.length === 0 ? (
            <div className="glass-card rounded-3xl p-10 text-center max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-festive-royalRed/60 border border-festive-gold/40 flex items-center justify-center mx-auto">
                <Ticket className="w-8 h-8 text-festive-gold" />
              </div>
              <h3 className="font-royal text-xl font-bold text-white">
                No Tickets Found
              </h3>
              <p className="text-xs text-slate-300">
                You don't have any tickets under this filter. Buy a ₹11 pass to get instant promo codes and lucky draw numbers!
              </p>
              <Link
                to="/"
                className="inline-block px-5 py-2.5 rounded-xl text-xs font-bold bg-festive-button text-festive-dark"
              >
                Explore 100+ Offers
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCoupons.map((coupon) => (
                <LotteryTicketCard key={coupon._id} coupon={coupon} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: RAZORPAY PAYMENT HISTORY */}
      {activeTab === 'transactions' && (
        <div className="glass-card rounded-3xl p-6 border border-festive-gold/30 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-royal text-lg font-bold text-white">
                Razorpay Payment Records
              </h3>
              <p className="text-xs text-slate-400">
                Official receipts for your ₹11 payments, with Order and Payment IDs
              </p>
            </div>
            <span className="text-xs text-festive-gold font-bold">
              {transactions.length} Transactions
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-festive-gold/20 text-festive-goldLight uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Offer Unlocked</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Razorpay Order ID</th>
                  <th className="py-3 px-4">Razorpay Payment ID</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-festive-gold/10">
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-400">
                      No payment records found yet.
                    </td>
                  </tr>
                ) : (
                  transactions.map((tx) => (
                    <tr key={tx._id} className="hover:bg-white/5 transition">
                      <td className="py-3 px-4 text-slate-300">
                        {new Date(tx.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-3 px-4 font-semibold text-white max-w-xs truncate">
                        {tx.offer?.title || 'Diwali Dhamaka Offer'}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                        ₹{tx.amount}.00
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                        {tx.orderId}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-festive-gold">
                        {tx.paymentId}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          {tx.status?.toUpperCase() || 'SUCCESS'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Email OTP Verification Modal */}
      {showOtpModal && (
        <OtpVerificationModal
          email={user?.email}
          isOpen={showOtpModal}
          onClose={() => setShowOtpModal(false)}
          onSuccess={(verifiedUser) => {
            setShowOtpModal(false);
            setProfileData((prev) => ({
              ...prev,
              user: { ...prev.user, isEmailVerified: true },
            }));
            if (refreshUser) refreshUser();
          }}
        />
      )}
    </div>
  );
};

export default UserProfilePage;
