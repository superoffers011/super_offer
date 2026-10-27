import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { adminAPI, offersAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { festiveAudio } from '../components/FestiveSoundToggle';
import { DiyaIcon } from '../components/DiyaSparkles';
import {
  ShieldCheck,
  TrendingUp,
  Ticket,
  Users,
  Gift,
  Trophy,
  Sparkles,
  Plus,
  Trash2,
  Edit,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Phone,
  Mail,
  Calendar,
  DollarSign,
} from 'lucide-react';

const AdminDashboardPage = () => {
  const { user, isAdmin, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('stats'); // 'stats' | 'offers' | 'draw'
  const [stats, setStats] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [recentCoupons, setRecentCoupons] = useState([]);
  const [offers, setOffers] = useState([]);
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // New Offer Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newOffer, setNewOffer] = useState({
    title: '',
    brandName: '',
    category: 'Electronics',
    discountDetails: 'FLAT 50% OFF',
    originalPrice: '',
    offerPrice: '',
    brandLogo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=200&q=80',
    couponCode: '',
    description: '',
    isFeatured: false,
  });

  // Lucky Draw Picker State
  const [selectedPrize, setSelectedPrize] = useState('Apple iPhone 16 Pro Max (Festive Gold Edition)');
  const [isDrawing, setIsDrawing] = useState(false);
  const [latestWinner, setLatestWinner] = useState(null);

  // Check admin authorization
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isAdmin)) {
      navigate('/login');
    }
  }, [authLoading, isAuthenticated, isAdmin, navigate]);

  // Load Dashboard Data
  const loadDashboardData = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const [statsRes, offersRes, winnersRes] = await Promise.all([
        adminAPI.getStats(),
        offersAPI.getAll({ limit: 120 }),
        adminAPI.getWinners(),
      ]);

      if (statsRes.data?.stats) {
        setStats(statsRes.data.stats);
        setRecentTransactions(statsRes.data.recentTransactions || []);
        setRecentCoupons(statsRes.data.recentCoupons || []);
      }
      if (offersRes.data?.offers) {
        setOffers(offersRes.data.offers);
      }
      if (winnersRes.data?.winners) {
        setWinners(winnersRes.data.winners);
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Error loading admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadDashboardData();
    }
  }, [isAdmin]);

  // Handle Add Offer
  const handleCreateOffer = async (e) => {
    e.preventDefault();
    try {
      const res = await adminAPI.createOffer(newOffer);
      if (res.data?.success) {
        setActionMessage('✨ Festive offer created successfully!');
        setShowAddModal(false);
        setNewOffer({
          title: '',
          brandName: '',
          category: 'Electronics',
          discountDetails: 'FLAT 50% OFF',
          originalPrice: '',
          offerPrice: '',
          brandLogo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=200&q=80',
          couponCode: '',
          description: '',
          isFeatured: false,
        });
        loadDashboardData();
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to create offer');
    }
  };

  // Handle Delete Offer
  const handleDeleteOffer = async (id) => {
    if (!window.confirm('Are you sure you want to delete this festive offer?')) return;
    try {
      await adminAPI.deleteOffer(id);
      setActionMessage('Offer removed successfully.');
      setOffers((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to delete offer');
    }
  };

  // Handle Seed 100+ Offers on Demand
  const handleSeedDatabase = async () => {
    if (!window.confirm('This will seed/refresh 108 festive offers in the database. Proceed?')) return;
    setLoading(true);
    try {
      const res = await adminAPI.seedDatabase();
      setActionMessage(res.data?.message || 'Seeded successfully!');
      loadDashboardData();
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to seed database');
      setLoading(false);
    }
  };

  // Handle Draw Winner
  const handleDrawWinner = async () => {
    setIsDrawing(true);
    setLatestWinner(null);
    setErrorMessage(null);

    // Festive audio chime while spinning
    festiveAudio.playChime();

    setTimeout(async () => {
      try {
        const res = await adminAPI.drawWinner(selectedPrize);
        if (res.data?.success) {
          setLatestWinner(res.data.winner);
          festiveAudio.playCrackerBlast();
          confetti({
            particleCount: 250,
            spread: 120,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#FF2A55', '#D4AF37', '#FFFFFF'],
          });
          loadDashboardData();
        }
      } catch (err) {
        setErrorMessage(err.response?.data?.message || 'Failed to pick winner.');
      } finally {
        setIsDrawing(false);
      }
    }, 2000);
  };

  if (authLoading || (!isAdmin && isAuthenticated)) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-festive-gold animate-spin" />
        <p className="text-sm text-festive-goldLight">Verifying admin credentials...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-festive-gold/25 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <ShieldCheck className="w-6 h-6 text-festive-amber" />
            <span className="text-xs font-bold uppercase tracking-wider text-festive-goldLight">
              Administrative Control Center
            </span>
          </div>
          <h1 className="font-royal text-2xl sm:text-4xl font-extrabold text-white">
            DiwaliDhamaka11 Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Manage 100+ offers, track ₹11 collections, review participants, and trigger the live Bumper Lucky Draw.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSeedDatabase}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-festive-maroon/70 text-festive-goldLight border border-festive-gold/40 hover:bg-festive-maroon hover:border-festive-gold transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-festive-gold" />
            <span>Re-Seed 100+ Offers</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {actionMessage && (
        <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-600 text-emerald-200 text-xs sm:text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{actionMessage}</span>
          </div>
          <button onClick={() => setActionMessage(null)} className="text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-200 text-xs sm:text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage(null)} className="text-rose-400 hover:text-white">✕</button>
        </div>
      )}

      {/* 3 Main Tab Buttons */}
      <div className="flex items-center gap-2 border-b border-festive-gold/20 overflow-x-auto">
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'stats'
              ? 'border-festive-gold text-festive-gold bg-festive-royalRed/20'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Analytics & Revenue</span>
        </button>

        <button
          onClick={() => setActiveTab('offers')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'offers'
              ? 'border-festive-gold text-festive-gold bg-festive-royalRed/20'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Gift className="w-4 h-4" />
          <span>Manage Offers ({offers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('draw')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'draw'
              ? 'border-festive-gold text-festive-gold bg-festive-royalRed/20'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Trophy className="w-4 h-4 text-festive-goldGlow" />
          <span>Lucky Draw Winner Picker</span>
        </button>
      </div>

      {/* TAB 1: ANALYTICS & STATS */}
      {activeTab === 'stats' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Top 4 Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card rounded-2xl p-5 border border-festive-gold/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 font-semibold uppercase">Total Revenue</span>
                <div className="p-2 rounded-xl bg-festive-royalRed/60 text-festive-gold">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <span className="font-royal text-2xl sm:text-3xl font-black text-gold-gradient">
                ₹{stats?.totalRevenue?.toLocaleString('en-IN') || 0}
              </span>
              <span className="text-[11px] text-emerald-400 block mt-1 font-semibold">
                Fixed ₹11 collections
              </span>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-festive-gold/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 font-semibold uppercase">Coupons Sold</span>
                <div className="p-2 rounded-xl bg-festive-royalRed/60 text-festive-gold">
                  <Ticket className="w-4 h-4" />
                </div>
              </div>
              <span className="font-royal text-2xl sm:text-3xl font-black text-white">
                {stats?.totalCouponsSold || 0}
              </span>
              <span className="text-[11px] text-festive-goldLight block mt-1">
                Active Lottery Entries
              </span>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-festive-gold/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 font-semibold uppercase">Total Users</span>
                <div className="p-2 rounded-xl bg-festive-royalRed/60 text-festive-gold">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <span className="font-royal text-2xl sm:text-3xl font-black text-white">
                {stats?.totalUsers || 0}
              </span>
              <span className="text-[11px] text-slate-400 block mt-1">
                Registered shoppers
              </span>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-festive-gold/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 font-semibold uppercase">Active Offers</span>
                <div className="p-2 rounded-xl bg-festive-royalRed/60 text-festive-gold">
                  <Gift className="w-4 h-4" />
                </div>
              </div>
              <span className="font-royal text-2xl sm:text-3xl font-black text-white">
                {stats?.activeOffers || 0}
              </span>
              <span className="text-[11px] text-emerald-400 block mt-1 font-semibold">
                Across 9 categories
              </span>
            </div>
          </div>

          {/* Recent ₹11 Participants & Transactions Table */}
          <div className="glass-card rounded-3xl p-6 border border-festive-gold/30">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-royal text-lg font-bold text-white">
                  Recent ₹11 Lottery Participants
                </h3>
                <p className="text-xs text-slate-400">
                  Live feed of purchased coupons and transaction details
                </p>
              </div>
              <span className="text-xs text-festive-gold font-bold">
                Showing latest 10
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-festive-gold/20 text-festive-goldLight uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4">Participant</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Offer Claimed</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-festive-gold/10">
                  {recentTransactions.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-8 text-center text-slate-400">
                        No transactions recorded yet.
                      </td>
                    </tr>
                  ) : (
                    recentTransactions.map((tx) => (
                      <tr key={tx._id} className="hover:bg-white/5 transition">
                        <td className="py-3 px-4 font-semibold text-white">
                          {tx.user?.name || 'Festive User'}
                        </td>
                        <td className="py-3 px-4 text-slate-300">
                          <div>{tx.user?.email}</div>
                          <div className="text-[10px] text-slate-400">{tx.user?.phone}</div>
                        </td>
                        <td className="py-3 px-4 text-festive-goldLight max-w-xs truncate">
                          {tx.offer?.title || 'Festive Pass'}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                          ₹{tx.amount}
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                          {tx.orderId}
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            {tx.status?.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MANAGE OFFERS */}
      {activeTab === 'offers' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-royal text-xl font-bold text-white">
                Festive Deals Catalog ({offers.length} Offers)
              </h3>
              <p className="text-xs text-slate-300">
                Create new seasonal promotions or edit existing brand deals
              </p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-festive-button text-festive-dark shadow-gold-glow hover:opacity-95 transition cursor-pointer"
            >
              <Plus className="w-4 h-4 text-festive-dark" />
              <span>Add New Offer</span>
            </button>
          </div>

          {/* Add Offer Modal */}
          {showAddModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
              <div className="w-full max-w-xl glass-card rounded-3xl p-6 sm:p-8 border-2 border-festive-gold/60 max-h-[90vh] overflow-y-auto">
                <h3 className="font-royal text-xl font-bold text-white mb-4">
                  Add New Festive Offer
                </h3>

                <form onSubmit={handleCreateOffer} className="space-y-4 text-xs">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">
                      Offer Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={newOffer.title}
                      onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                      placeholder="e.g. Sony Bravia 65 4K Smart TV"
                      className="w-full px-3 py-2 rounded-xl bg-festive-dark border border-festive-gold/30 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Brand Name</label>
                      <input
                        type="text"
                        value={newOffer.brandName}
                        onChange={(e) => setNewOffer({ ...newOffer, brandName: e.target.value })}
                        placeholder="e.g. Sony"
                        className="w-full px-3 py-2 rounded-xl bg-festive-dark border border-festive-gold/30 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Category</label>
                      <select
                        value={newOffer.category}
                        onChange={(e) => setNewOffer({ ...newOffer, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-festive-dark border border-festive-gold/30 text-white"
                      >
                        <option value="Electronics">Electronics</option>
                        <option value="Gold & Jewellery">Gold & Jewellery</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Food & Dining">Food & Dining</option>
                        <option value="Travel & Flights">Travel & Flights</option>
                        <option value="Home & Living">Home & Living</option>
                        <option value="Beauty & Wellness">Beauty & Wellness</option>
                        <option value="Entertainment & OTT">Entertainment & OTT</option>
                        <option value="Gift Cards">Gift Cards</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Original Price (₹) *</label>
                      <input
                        type="number"
                        required
                        value={newOffer.originalPrice}
                        onChange={(e) => setNewOffer({ ...newOffer, originalPrice: e.target.value })}
                        placeholder="9999"
                        className="w-full px-3 py-2 rounded-xl bg-festive-dark border border-festive-gold/30 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Offer Price (₹) *</label>
                      <input
                        type="number"
                        required
                        value={newOffer.offerPrice}
                        onChange={(e) => setNewOffer({ ...newOffer, offerPrice: e.target.value })}
                        placeholder="4999"
                        className="w-full px-3 py-2 rounded-xl bg-festive-dark border border-festive-gold/30 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Discount Details *</label>
                      <input
                        type="text"
                        required
                        value={newOffer.discountDetails}
                        onChange={(e) => setNewOffer({ ...newOffer, discountDetails: e.target.value })}
                        placeholder="FLAT 50% OFF"
                        className="w-full px-3 py-2 rounded-xl bg-festive-dark border border-festive-gold/30 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Secret Promo Code *</label>
                      <input
                        type="text"
                        required
                        value={newOffer.couponCode}
                        onChange={(e) => setNewOffer({ ...newOffer, couponCode: e.target.value })}
                        placeholder="DIWALI50"
                        className="w-full px-3 py-2 rounded-xl bg-festive-dark border border-festive-gold/30 text-white uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={newOffer.description}
                      onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                      placeholder="Describe the offer details..."
                      className="w-full px-3 py-2 rounded-xl bg-festive-dark border border-festive-gold/30 text-white"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      checked={newOffer.isFeatured}
                      onChange={(e) => setNewOffer({ ...newOffer, isFeatured: e.target.checked })}
                      className="w-4 h-4 text-festive-gold"
                    />
                    <label htmlFor="isFeatured" className="text-slate-200 font-semibold">
                      Mark as Featured Bumper Pick
                    </label>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-festive-gold/20">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 rounded-xl bg-white/10 text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-xl bg-festive-button text-festive-dark font-bold shadow-gold-glow"
                    >
                      Save Offer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Offers Table */}
          <div className="glass-card rounded-3xl p-6 border border-festive-gold/30 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-festive-gold/20 text-festive-goldLight uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Offer / Brand</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Discount</th>
                  <th className="py-3 px-4">Pricing</th>
                  <th className="py-3 px-4">Promo Code</th>
                  <th className="py-3 px-4">Claims</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-festive-gold/10">
                {offers.map((offer) => (
                  <tr key={offer._id} className="hover:bg-white/5 transition">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white max-w-xs truncate">
                        {offer.title}
                      </div>
                      <div className="text-[10px] text-festive-gold">{offer.brandName}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{offer.category}</td>
                    <td className="py-3 px-4 text-festive-goldGlow font-bold">
                      {offer.discountDetails}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-white">₹{offer.offerPrice}</span>{' '}
                      <span className="text-slate-400 line-through text-[10px]">
                        ₹{offer.originalPrice}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-festive-gold">
                      {offer.couponCode}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-200">
                      {offer.claimsCount || 0}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDeleteOffer(offer._id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:text-rose-200 hover:bg-rose-950/60 transition"
                        title="Delete Offer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: LUCKY DRAW WINNER PICKER */}
      {activeTab === 'draw' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="glass-card rounded-3xl p-8 border-2 border-festive-gold/60 shadow-gold-glow max-w-2xl mx-auto text-center space-y-6">
            <div className="w-20 h-20 rounded-2xl bg-festive-royalRed border-2 border-festive-gold flex items-center justify-center mx-auto shadow-diya-glow">
              <Trophy className="w-10 h-10 text-festive-goldGlow" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-festive-goldLight">
                Live Diwali Dhamaka Bumper Picker
              </span>
              <h3 className="font-royal text-2xl sm:text-3xl font-black text-white mt-1">
                Select A Lucky Draw Winner
              </h3>
              <p className="text-xs text-slate-300 mt-2 max-w-md mx-auto">
                The algorithm picks a random ticket from all purchased ₹11 coupons in MongoDB. The winner's profile will be marked permanently and announced live.
              </p>
            </div>

            {/* Select Prize Tier */}
            <div className="text-left max-w-md mx-auto">
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Prize Being Drawn:
              </label>
              <select
                value={selectedPrize}
                onChange={(e) => setSelectedPrize(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-festive-dark border border-festive-gold text-sm text-festive-goldGlow font-bold cursor-pointer"
              >
                <option value="Apple iPhone 16 Pro Max (Festive Gold Edition)">
                  📱 Apple iPhone 16 Pro Max (Festive Gold Edition)
                </option>
                <option value="Tanishq 10g 24K Pure Gold Lakshmi Coin">
                  🪙 Tanishq 10g 24K Pure Gold Lakshmi Coin
                </option>
                <option value="₹1,00,000 Diwali Cash Bumper Prize">
                  💰 ₹1,00,000 Diwali Cash Bumper Prize
                </option>
                <option value="Sony Bravia 65 4K Smart OLED TV">
                  📺 Sony Bravia 65" 4K Smart OLED TV
                </option>
                <option value="Taj Palace 2-Nights Luxury Stay">
                  🏰 Taj Palace 2-Nights Luxury Stay
                </option>
              </select>
            </div>

            {/* Draw Button */}
            <div>
              <button
                onClick={handleDrawWinner}
                disabled={isDrawing}
                className="w-full max-w-md py-4 rounded-full text-base sm:text-lg font-black bg-festive-button text-festive-dark shadow-gold-glow hover:shadow-diya-glow transition transform hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2 mx-auto cursor-pointer"
              >
                {isDrawing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-festive-dark" />
                    <span>Spinning Diwali Wheel...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-festive-dark" />
                    <span>SPIN & DRAW WINNER NOW!</span>
                  </>
                )}
              </button>
            </div>

            {/* Latest Winner Announcement Card */}
            {latestWinner && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-festive-royalRed to-festive-crimson border-2 border-festive-gold text-left space-y-3 animate-in zoom-in-95 shadow-gold-glow">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-festive-goldGlow flex items-center gap-1.5">
                    <Trophy className="w-4 h-4" />
                    Bumper Winner Selected!
                  </span>
                  <span className="font-mono text-xs font-bold bg-festive-dark px-2.5 py-1 rounded-full text-festive-gold border border-festive-gold/40">
                    {latestWinner.couponNumber}
                  </span>
                </div>

                <div className="pt-2 border-t border-festive-gold/30">
                  <h4 className="font-royal text-xl font-extrabold text-white">
                    {latestWinner.userName}
                  </h4>
                  <p className="text-xs text-festive-goldLight font-medium">
                    🏆 Won: {latestWinner.prize}
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-200 mt-2">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-festive-gold" />
                      {latestWinner.userEmail}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-festive-gold" />
                      {latestWinner.userPhone}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Past Winners Table */}
          <div className="glass-card rounded-3xl p-6 border border-festive-gold/30">
            <h3 className="font-royal text-lg font-bold text-white mb-4">
              Announced Winners History ({winners.length})
            </h3>

            {winners.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">
                No winners have been selected yet. Use the tool above to pick winners.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-festive-gold/20 text-festive-goldLight uppercase text-[10px]">
                      <th className="py-2.5 px-4">Coupon Number</th>
                      <th className="py-2.5 px-4">Winner Name</th>
                      <th className="py-2.5 px-4">Contact</th>
                      <th className="py-2.5 px-4">Prize Won</th>
                      <th className="py-2.5 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-festive-gold/10">
                    {winners.map((w) => (
                      <tr key={w._id} className="hover:bg-white/5 transition">
                        <td className="py-3 px-4 font-mono font-bold text-festive-gold">
                          {w.couponNumber}
                        </td>
                        <td className="py-3 px-4 font-semibold text-white">
                          {w.user?.name}
                        </td>
                        <td className="py-3 px-4 text-slate-300">
                          {w.user?.email} • {w.user?.phone}
                        </td>
                        <td className="py-3 px-4 font-bold text-festive-goldGlow">
                          {w.prizeWon}
                        </td>
                        <td className="py-3 px-4 text-slate-400">
                          {new Date(w.updatedAt || Date.now()).toLocaleDateString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
