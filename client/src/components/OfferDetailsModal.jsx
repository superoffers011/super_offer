import React from 'react';
import { DiyaIcon } from './DiyaSparkles';
import {
  X,
  Sparkles,
  Ticket,
  Calendar,
  CheckCircle,
  ShieldCheck,
  Flame,
  ArrowRight,
} from 'lucide-react';

const OfferDetailsModal = ({ offer, isOpen, onClose, onUnlock }) => {
  if (!isOpen || !offer) return null;

  const savings = offer.originalPrice - offer.offerPrice;
  const savingsPct = Math.round((savings / offer.originalPrice) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-festive-deepMaroon via-festive-maroon to-festive-dark border-2 border-festive-gold/60 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Top Gold Foil Bar */}
        <div className="h-2 bg-gradient-to-r from-festive-gold via-festive-goldGlow to-festive-amber" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 rounded-full bg-festive-dark/60 text-slate-300 hover:text-white hover:bg-festive-royalRed transition border border-festive-gold/30"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-festive-dark border-2 border-festive-gold/40 p-2 shrink-0 flex items-center justify-center shadow-lg">
              <img
                src={offer.brandLogo}
                alt={offer.brandName}
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  e.target.src =
                    'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=200&q=80';
                }}
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-festive-royalRed/60 text-festive-gold border border-festive-gold/30">
                  {offer.category}
                </span>
                {offer.isFeatured && (
                  <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-festive-amber/20 text-festive-goldGlow border border-festive-amber/50">
                    <DiyaIcon className="w-3 h-3" withFlame={false} />
                    <span>Diwali Bumper Deal</span>
                  </span>
                )}
              </div>

              <h2 className="font-royal text-xl sm:text-2xl font-bold text-white leading-tight">
                {offer.title}
              </h2>
              <p className="text-xs sm:text-sm text-festive-gold font-semibold mt-1">
                Offered by {offer.brandName}
              </p>
            </div>
          </div>

          {/* Discount & Pricing Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-festive-royalRed/50 to-festive-deepMaroon border border-festive-gold/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Flame className="w-4 h-4 text-festive-amber" />
                <span className="text-xs font-bold uppercase tracking-wider text-festive-goldLight">
                  Special Festive Discount
                </span>
              </div>
              <p className="text-lg sm:text-xl font-extrabold text-festive-goldGlow">
                {offer.discountDetails}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <div className="flex items-baseline gap-2">
                <span className="font-royal text-2xl font-black text-white">
                  ₹{offer.offerPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-slate-400 line-through">
                  ₹{offer.originalPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <span className="text-xs text-emerald-400 font-semibold block">
                Total Savings: ₹{savings.toLocaleString('en-IN')} ({savingsPct}%)
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-festive-goldLight mb-2">
              Offer Overview
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed bg-festive-dark/40 p-4 rounded-xl border border-festive-gold/20">
              {offer.description}
            </p>
          </div>

          {/* Terms & Conditions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-festive-goldLight mb-2.5">
              Terms & Instructions
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {(offer.terms || [
                'Unlock code instant delivery upon ₹11 payment confirmation',
                'Each ₹11 pass automatically enters you into the Diwali Bumper Lucky Draw',
                'Valid on partner website/app during festive period',
              ]).map((term, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Expiry & Security Notice */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pt-2 border-t border-festive-gold/20">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-festive-amber" />
              <span>
                Valid Till: {new Date(offer.expiryDate || Date.now() + 30 * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Genuine & Verified Partner Deal</span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onUnlock(offer);
              }}
              className="w-full py-4 rounded-2xl text-base sm:text-lg font-black bg-festive-button text-festive-dark shadow-gold-glow hover:shadow-diya-glow transition transform hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-festive-dark" />
              <span>Unlock Secret Code & Enter Draw (₹11)</span>
              <ArrowRight className="w-5 h-5 text-festive-dark" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetailsModal;
