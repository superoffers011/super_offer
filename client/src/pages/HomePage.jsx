import React, { useState, useEffect, useRef } from 'react';
import FestiveHero from '../components/FestiveHero';
import LiveWinnerTicker from '../components/LiveWinnerTicker';
import CategoryFilters from '../components/CategoryFilters';
import OfferCard from '../components/OfferCard';
import OfferDetailsModal from '../components/OfferDetailsModal';
import PaymentModal from '../components/PaymentModal';
import { offersAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { DiyaIcon } from '../components/DiyaSparkles';
import {
  Sparkles,
  Trophy,
  Gift,
  HelpCircle,
  CheckCircle,
  Zap,
  ArrowRight,
  Flame,
  PhoneCall,
  Loader2,
} from 'lucide-react';

const HomePage = () => {
  const { user } = useAuth();
  const [offers, setOffers] = useState([]);
  const [categories, setCategories] = useState([{ name: 'All', count: 108 }]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('featured');
  const [loading, setLoading] = useState(true);

  // Modals state
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const offersSectionRef = useRef(null);

  // Load Categories
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await offersAPI.getCategories();
        if (res.data?.categories) {
          setCategories(res.data.categories);
        }
      } catch (e) {
        console.warn('Categories load note:', e.message);
      }
    };
    fetchCats();
  }, []);

  // Load Offers with filters, search, and sorting
  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      try {
        const params = {
          category: selectedCategory !== 'All' ? selectedCategory : undefined,
          search: searchQuery.trim() || undefined,
          sort: sortOption,
          limit: 150, // Display hundreds of offers smoothly
        };

        const res = await offersAPI.getAll(params);
        if (res.data?.offers) {
          setOffers(res.data.offers);
        }
      } catch (e) {
        console.error('Offers fetch error:', e.message);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchOffers();
    }, 250);

    return () => clearTimeout(debounceTimer);
  }, [selectedCategory, searchQuery, sortOption]);

  const scrollToOffers = () => {
    if (offersSectionRef.current) {
      offersSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewDetails = (offer) => {
    setSelectedOffer(offer);
    setIsDetailsOpen(true);
  };

  const handleClaimFor11 = (offer) => {
    setSelectedOffer(offer);
    setIsPaymentOpen(true);
  };

  const handleSuccessClaim = (newCoupon) => {
    // Optionally update offer claim count locally
    setOffers((prev) =>
      prev.map((o) =>
        o._id === selectedOffer?._id
          ? { ...o, claimsCount: (o.claimsCount || 0) + 1 }
          : o
      )
    );
  };

  return (
    <div className="min-h-screen">
      {/* 1. Festive Hero Section */}
      <FestiveHero onExploreClick={scrollToOffers} />

      {/* 2. Live Sliding Marquee of Recent Bumper Winners */}
      <LiveWinnerTicker />

      {/* 3. Main Offers Showcase Section */}
      <section ref={offersSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <DiyaIcon className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider text-festive-goldLight">
                Handpicked Festive Deals
              </span>
            </div>
            <h2 className="font-royal text-2xl sm:text-4xl font-extrabold text-white">
              Explore 100+ Festive Dhamaka Offers
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md">
            Unlock any partner coupon code for <strong className="text-festive-gold">₹11</strong> and receive 1 automatic entry to the Diwali Bumper Lucky Draw.
          </p>
        </div>

        {/* Filters & Search Control Bar */}
        <div className="mb-8">
          <CategoryFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortOption={sortOption}
            onSortChange={setSortOption}
            totalResults={offers.length}
          />
        </div>

        {/* Offers Grid */}
        {loading ? (
          <div className="py-24 text-center space-y-4">
            <Loader2 className="w-10 h-10 text-festive-gold animate-spin mx-auto" />
            <p className="text-sm text-festive-goldLight">
              Lighting festive diyas & fetching exclusive offers...
            </p>
          </div>
        ) : offers.length === 0 ? (
          <div className="py-20 text-center glass-card rounded-3xl p-8 max-w-md mx-auto space-y-4">
            <div className="p-3 w-16 h-16 rounded-full bg-festive-royalRed/60 border border-festive-gold/40 flex items-center justify-center mx-auto">
              <Gift className="w-8 h-8 text-festive-gold" />
            </div>
            <h3 className="font-royal text-xl font-bold text-white">
              No Offers Found
            </h3>
            <p className="text-xs text-slate-300">
              We couldn't find any offers matching "{searchQuery}". Try selecting another category or resetting filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-festive-button text-festive-dark"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {offers.map((offer) => (
              <OfferCard
                key={offer._id}
                offer={offer}
                onViewDetails={handleViewDetails}
                onClaimFor11={handleClaimFor11}
              />
            ))}
          </div>
        )}
      </section>

      {/* 4. Grand Bumper Prizes Showcase Section (#prizes) */}
      <section id="prizes" className="py-16 bg-gradient-to-b from-festive-deepMaroon via-festive-maroon/40 to-festive-dark border-t border-festive-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-festive-royalRed/60 border border-festive-gold/30 text-xs font-bold text-festive-goldLight mb-3">
              <Trophy className="w-4 h-4 text-festive-goldGlow" />
              <span>Diwali Grand Bumper 2026</span>
            </div>
            <h2 className="font-royal text-3xl sm:text-5xl font-extrabold text-white mb-3">
              What Can You Win For Just ₹11?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Every single ₹11 offer pass purchased automatically enters the official Diwali Dhamaka lottery. No extra purchase required!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Prize 1 */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden border-2 border-festive-gold/60 shadow-gold-glow flex flex-col justify-between group">
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-festive-gold text-festive-dark font-black text-xs">
                1st Bumper Prize
              </div>
              <div>
                <div className="w-20 h-20 rounded-2xl bg-festive-dark/90 border border-festive-gold/40 flex items-center justify-center mx-auto mb-5 shadow-diya-glow group-hover:scale-110 transition">
                  <span className="text-4xl">📱</span>
                </div>
                <h3 className="font-royal text-xl sm:text-2xl font-bold text-white mb-2">
                  iPhone 16 Pro Max
                </h3>
                <span className="text-xs font-semibold text-festive-goldLight block mb-4">
                  256GB • Festive Gold Edition • Worth ₹1,44,900
                </span>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Experience Apple's latest flagship with Titanium design, A18 Pro chip, and pro camera system.
                </p>
              </div>
              <button
                onClick={scrollToOffers}
                className="w-full py-3 rounded-xl text-xs font-bold bg-festive-button text-festive-dark shadow-sm hover:opacity-95"
              >
                Enter Lucky Draw for ₹11
              </button>
            </div>

            {/* Prize 2 */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden border-2 border-festive-gold/60 shadow-gold-glow flex flex-col justify-between group">
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-festive-gold text-festive-dark font-black text-xs">
                2nd Bumper Prize
              </div>
              <div>
                <div className="w-20 h-20 rounded-2xl bg-festive-dark/90 border border-festive-gold/40 flex items-center justify-center mx-auto mb-5 shadow-diya-glow group-hover:scale-110 transition">
                  <span className="text-4xl">🪙</span>
                </div>
                <h3 className="font-royal text-xl sm:text-2xl font-bold text-white mb-2">
                  10g 24K Gold Coin
                </h3>
                <span className="text-xs font-semibold text-festive-goldLight block mb-4">
                  Tanishq 999.9 Pure Lakshmi Gold • Worth ₹82,500
                </span>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Certified 24 Karat pure festive gold coin embossed with Goddess Lakshmi for auspicious prosperity.
                </p>
              </div>
              <button
                onClick={scrollToOffers}
                className="w-full py-3 rounded-xl text-xs font-bold bg-festive-button text-festive-dark shadow-sm hover:opacity-95"
              >
                Enter Lucky Draw for ₹11
              </button>
            </div>

            {/* Prize 3 */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden border-2 border-festive-gold/60 shadow-gold-glow flex flex-col justify-between group">
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-festive-gold text-festive-dark font-black text-xs">
                3rd Bumper Prize
              </div>
              <div>
                <div className="w-20 h-20 rounded-2xl bg-festive-dark/90 border border-festive-gold/40 flex items-center justify-center mx-auto mb-5 shadow-diya-glow group-hover:scale-110 transition">
                  <span className="text-4xl">💰</span>
                </div>
                <h3 className="font-royal text-xl sm:text-2xl font-bold text-white mb-2">
                  ₹1,00,000 Cash Bumper
                </h3>
                <span className="text-xs font-semibold text-festive-goldLight block mb-4">
                  Direct Bank Transfer / UPI • 5 Lucky Winners
                </span>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Grand festive cash prize credited directly to winners' verified bank account or UPI on Diwali day.
                </p>
              </div>
              <button
                onClick={scrollToOffers}
                className="w-full py-3 rounded-xl text-xs font-bold bg-festive-button text-festive-dark shadow-sm hover:opacity-95"
              >
                Enter Lucky Draw for ₹11
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-festive-royalRed/50 text-xs font-bold text-festive-goldLight border border-festive-gold/30 mb-2">
            <Sparkles className="w-4 h-4 text-festive-goldGlow" />
            <span>3 Simple Steps</span>
          </div>
          <h2 className="font-royal text-3xl sm:text-4xl font-extrabold text-white">
            How DiwaliDhamaka11 Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-3xl p-6 text-center space-y-3 border border-festive-gold/30">
            <div className="w-12 h-12 rounded-2xl bg-festive-royalRed border border-festive-gold/40 flex items-center justify-center mx-auto font-royal font-black text-xl text-festive-goldGlow">
              1
            </div>
            <h3 className="font-royal font-bold text-lg text-white">Choose Any Festive Offer</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Explore 100+ offers across Electronics, Gold, Fashion, Dining, Flights, and more.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6 text-center space-y-3 border border-festive-gold/30">
            <div className="w-12 h-12 rounded-2xl bg-festive-royalRed border border-festive-gold/40 flex items-center justify-center mx-auto font-royal font-black text-xl text-festive-goldGlow">
              2
            </div>
            <h3 className="font-royal font-bold text-lg text-white">Pay ₹11 via Razorpay</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Complete instant, secure payment of ₹11 to unlock your brand discount promo code.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6 text-center space-y-3 border border-festive-gold/30">
            <div className="w-12 h-12 rounded-2xl bg-festive-royalRed border border-festive-gold/40 flex items-center justify-center mx-auto font-royal font-black text-xl text-festive-goldGlow">
              3
            </div>
            <h3 className="font-royal font-bold text-lg text-white">Automatic Lucky Draw Entry</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Instantly receive a unique lottery ticket (e.g. DIWALI-2026-X7K9) saved in your Vault!
            </p>
          </div>
        </div>
      </section>

      {/* Offer Details Modal */}
      <OfferDetailsModal
        offer={selectedOffer}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onUnlock={(offer) => {
          setSelectedOffer(offer);
          setIsPaymentOpen(true);
        }}
      />

      {/* Payment Checkout Modal */}
      <PaymentModal
        offer={selectedOffer}
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        user={user}
        onSuccessClaim={handleSuccessClaim}
      />
    </div>
  );
};

export default HomePage;
