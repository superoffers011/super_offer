import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { paymentAPI } from '../services/api';
import { launchRazorpayCheckout } from '../services/razorpay';
import { festiveAudio } from './FestiveSoundToggle';
import { DiyaIcon } from './DiyaSparkles';
import OtpVerificationModal from './OtpVerificationModal';
import { useAuth } from '../context/AuthContext';
import {
  X,
  Sparkles,
  Ticket,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  CreditCard,
  Zap,
  ArrowRight,
  Flame,
  AlertCircle,
} from 'lucide-react';

const PaymentModal = ({ offer, isOpen, onClose, user, onSuccessClaim }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successData, setSuccessData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  if (!isOpen || !offer) return null;

  // Trigger grand confetti fireworks
  const triggerCelebrationFireworks = () => {
    festiveAudio.playCrackerBlast();
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#FFD700', '#D4AF37', '#FF2A55', '#F59E0B', '#FFFFFF'],
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  // Process standard payment or simulation
  const handlePayment = async (forceSimulation = false) => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Create real order on backend (fixed ₹11)
      const orderRes = await paymentAPI.createOrder(offer._id);
      const orderData = orderRes.data;

      if (!orderData.success) {
        throw new Error(orderData.message || 'Failed to create payment order');
      }

      // 2. Launch real Razorpay checkout modal
      await launchRazorpayCheckout({
        orderData,
        onSuccess: async (payDetails) => {
          try {
            const verifyRes = await paymentAPI.verifyPayment(payDetails);
            if (verifyRes.data.success) {
              setSuccessData(verifyRes.data);
              triggerCelebrationFireworks();
              if (onSuccessClaim) onSuccessClaim(verifyRes.data.coupon);
            } else {
              setError(verifyRes.data.message || 'Payment verification failed');
            }
          } catch (vErr) {
            setError(vErr.response?.data?.message || 'Verification error');
          } finally {
            setLoading(false);
          }
        },
        onError: (errMessage) => {
          setError(errMessage);
          setLoading(false);
        },
      });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'Something went wrong during payment.');
      setLoading(false);
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-festive-deepMaroon via-festive-maroon to-festive-dark border-2 border-festive-gold/60 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Top Gold Shine */}
        <div className="h-2 bg-gradient-to-r from-festive-gold via-festive-goldGlow to-festive-amber" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 rounded-full bg-festive-dark/60 text-slate-300 hover:text-white hover:bg-festive-royalRed transition border border-festive-gold/30"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* User Not Logged In State */}
          {!user ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-festive-royalRed/60 border-2 border-festive-gold/40 flex items-center justify-center mx-auto shadow-diya-glow">
                <DiyaIcon className="w-8 h-8" />
              </div>
              <h3 className="font-royal text-2xl font-bold text-white">
                Log In to Unlock for ₹11
              </h3>
              <p className="text-sm text-slate-300 max-w-sm mx-auto">
                Please log in or register your account so your unique Diwali Lottery Coupon and unlocked discount codes are saved to your vault.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-3 rounded-full text-sm font-bold bg-festive-button text-festive-dark shadow-gold-glow cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-6 py-3 rounded-full text-sm font-bold bg-white/10 text-white border border-festive-gold/40 hover:bg-white/15 cursor-pointer"
                >
                  Create Account
                </button>
              </div>
            </div>
          ) : successData ? (
            /* Success Screen State */
            <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 p-1 flex items-center justify-center mx-auto shadow-gold-glow animate-bounce">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-festive-goldLight flex items-center justify-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-festive-goldGlow" />
                  Shubh Diwali! Payment Confirmed
                </span>
                <h3 className="font-royal text-2xl sm:text-3xl font-extrabold text-gold-gradient mt-1">
                  You're in the Bumper Draw!
                </h3>
              </div>

              {/* Unique Lottery Coupon Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-b from-festive-royalRed to-festive-deepMaroon border-2 border-festive-gold/70 text-left shadow-card-glow relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-festive-goldGlow uppercase">
                    <Ticket className="w-4 h-4" />
                    <span>Diwali Lottery Ticket</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    ACTIVE ENTRY
                  </span>
                </div>

                <div className="p-3 bg-festive-dark/80 rounded-xl border border-festive-gold/30 text-center mb-3">
                  <span className="text-[11px] text-slate-400 block uppercase tracking-wider">
                    Official Ticket Number
                  </span>
                  <span className="font-mono text-xl sm:text-2xl font-black text-festive-goldGlow tracking-wider">
                    {successData.coupon?.couponNumber || 'DIWALI-2026-X7K9M2'}
                  </span>
                </div>

                {/* Unlocked Brand Code */}
                <div className="pt-2 border-t border-festive-gold/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-300 block">
                      Unlocked Brand Code:
                    </span>
                    <span className="font-mono font-bold text-sm text-white">
                      {successData.unlockedOfferCode || offer.couponCode}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      handleCopyCode(
                        successData.unlockedOfferCode || offer.couponCode
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-festive-gold text-festive-dark hover:bg-festive-goldGlow transition"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-900" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    onClose();
                    navigate('/vault');
                  }}
                  className="w-full py-3.5 rounded-xl text-sm font-bold bg-festive-button text-festive-dark shadow-gold-glow flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Ticket className="w-4 h-4 text-festive-dark" />
                  <span>View in My Vault</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-3.5 rounded-xl text-sm font-semibold bg-white/10 text-white hover:bg-white/15 border border-festive-gold/30 cursor-pointer"
                >
                  Explore More Offers
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Order Summary State */
            <div className="space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <DiyaIcon className="w-6 h-6" />
                <h3 className="font-royal text-xl sm:text-2xl font-bold text-white">
                  Diwali Festive Checkout
                </h3>
              </div>

              {/* Offer Summary Card */}
              <div className="p-4 rounded-2xl bg-festive-dark/60 border border-festive-gold/30 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-festive-deepMaroon border border-festive-gold/40 p-1 shrink-0 flex items-center justify-center">
                    <img
                      src={offer.brandLogo}
                      alt={offer.brandName}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-festive-gold font-bold uppercase tracking-wider block">
                      {offer.brandName}
                    </span>
                    <h4 className="font-semibold text-sm text-slate-100 truncate">
                      {offer.title}
                    </h4>
                  </div>
                </div>

                <div className="p-3 bg-festive-royalRed/30 rounded-xl border border-festive-gold/20 flex items-center justify-between text-xs">
                  <span className="text-festive-goldLight">Included Privilege:</span>
                  <span className="font-bold text-festive-goldGlow flex items-center gap-1">
                    <Ticket className="w-3.5 h-3.5" />
                    1x Diwali Bumper Lucky Draw Pass
                  </span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs sm:text-sm text-slate-300 pt-2 border-t border-festive-gold/20">
                <div className="flex justify-between">
                  <span>Festive Coupon Fee</span>
                  <span className="text-white font-semibold">₹11.00</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Lucky Draw Entry</span>
                  <span>FREE (Worth ₹500)</span>
                </div>
                <div className="flex justify-between text-slate-400 text-xs">
                  <span>GST & Platform Charges</span>
                  <span>₹0.00 (Festive Waiver)</span>
                </div>
                <div className="pt-2 border-t border-festive-gold/30 flex justify-between items-baseline text-base sm:text-lg font-bold text-white">
                  <span>Total Amount Payable</span>
                  <span className="font-royal text-2xl font-extrabold text-gold-gradient">
                    ₹11.00
                  </span>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-600/50 text-rose-200 text-xs">
                  {error}
                </div>
              )}

              {/* Payment Buttons or Email Verification Guard */}
              {user && !user.isEmailVerified && user.role !== 'admin' ? (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/90 to-festive-deepMaroon border-2 border-amber-500/60 text-left space-y-2.5 shadow-lg">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Security Requirement: Verify Email</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    To maintain lucky draw integrity and ensure prize delivery, please complete 6-digit email OTP verification before purchasing ₹11 tickets.
                  </p>
                  <button
                    onClick={() => setShowOtpModal(true)}
                    className="w-full py-3 rounded-xl text-xs font-black bg-gradient-to-r from-amber-400 to-festive-gold text-festive-dark hover:brightness-105 flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition"
                  >
                    <ShieldCheck className="w-4 h-4 text-festive-dark" />
                    <span>Verify Email with 6-Digit OTP Now</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full py-4 rounded-2xl text-base font-black bg-festive-button text-festive-dark shadow-gold-glow hover:shadow-diya-glow transition transform hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <span className="animate-pulse">Processing ₹11 Payment...</span>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 text-festive-dark" />
                        <span>Pay ₹11 with Razorpay</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Encrypted & Secured by Razorpay Gateway</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <OtpVerificationModal
          email={user?.email}
          isOpen={showOtpModal}
          onClose={() => setShowOtpModal(false)}
          onSuccess={() => {
            setShowOtpModal(false);
            if (refreshUser) refreshUser();
          }}
        />
      )}
    </div>
  );
};

export default PaymentModal;
