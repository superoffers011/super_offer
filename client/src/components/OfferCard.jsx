import React from 'react';
import { DiyaIcon } from './DiyaSparkles';
import { Sparkles, Ticket, Flame, ArrowRight, Eye } from 'lucide-react';

const OfferCard = ({ offer, onViewDetails, onClaimFor11 }) => {
  const savings = offer.originalPrice - offer.offerPrice;
  const savingsPercentage = Math.round((savings / offer.originalPrice) * 100);

  return (
    <div className="group glass-card rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 relative">
      {/* Featured Ribbon */}
      {offer.isFeatured && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-gradient-to-r from-festive-royalRed to-festive-crimson border border-festive-gold/60 text-festive-goldGlow text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-md">
          <DiyaIcon className="w-3.5 h-3.5" withFlame={false} />
          <span>Bumper Pick</span>
        </div>
      )}

      {/* Card Header with Brand & Category */}
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-festive-dark/80 border border-festive-gold/30 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-sm group-hover:border-festive-gold transition">
            <img
              src={offer.brandLogo}
              alt={offer.brandName}
              className="w-full h-full object-cover rounded-lg"
              loading="lazy"
              onError={(e) => {
                e.target.src =
                  'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=200&q=80';
              }}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-festive-gold tracking-wide truncate">
                {offer.brandName}
              </span>
              <span className="text-[10px] text-slate-400">•</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider truncate">
                {offer.category}
              </span>
            </div>
            <h3 className="font-semibold text-sm sm:text-base text-slate-100 line-clamp-1 group-hover:text-festive-goldLight transition">
              {offer.title}
            </h3>
          </div>
        </div>

        {/* Discount Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-festive-royalRed/40 border border-festive-gold/30 text-festive-goldGlow text-xs font-bold mb-3 shadow-inner">
          <Flame className="w-3.5 h-3.5 text-festive-amber" />
          <span>{offer.discountDetails}</span>
        </div>

        {/* Offer Description */}
        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
          {offer.description}
        </p>

        {/* Price & Savings Display */}
        <div className="pt-3 border-t border-festive-gold/15 flex items-baseline justify-between mb-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-royal text-lg sm:text-xl font-black text-white">
                ₹{offer.offerPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ₹{offer.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold">
              Save ₹{savings.toLocaleString('en-IN')} ({savingsPercentage}%)
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-festive-goldLight/70 block uppercase tracking-wider font-semibold">
              Unlock Fee
            </span>
            <span className="font-black text-sm text-gold-gradient">
              Just ₹11
            </span>
          </div>
        </div>

        {/* Mini Lucky Draw Entry Highlight */}
        <div className="bg-festive-deepMaroon/90 rounded-lg p-2 border border-festive-gold/20 flex items-center justify-between text-[11px] text-festive-goldLight">
          <div className="flex items-center gap-1.5">
            <Ticket className="w-3.5 h-3.5 text-festive-goldGlow" />
            <span>Includes 1x Lucky Draw Entry</span>
          </div>
          <span className="text-[10px] text-festive-amber font-mono font-bold">
            {offer.claimsCount || 0} claims
          </span>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="p-4 sm:p-5 pt-0 grid grid-cols-5 gap-2">
        <button
          onClick={() => onViewDetails(offer)}
          className="col-span-2 py-2.5 px-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-festive-gold/25 hover:border-festive-gold/50 transition flex items-center justify-center gap-1 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-festive-gold" />
          <span>Details</span>
        </button>

        <button
          onClick={() => onClaimFor11(offer)}
          className="col-span-3 py-2.5 px-3 rounded-xl text-xs font-bold bg-festive-button text-festive-dark shadow-gold-glow hover:opacity-95 hover:scale-[1.02] transition flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-festive-dark" />
          <span>Unlock for ₹11</span>
        </button>
      </div>
    </div>
  );
};

export default OfferCard;
