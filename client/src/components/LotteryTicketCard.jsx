import React, { useState } from 'react';
import { DiyaIcon } from './DiyaSparkles';
import {
  Ticket,
  Trophy,
  Copy,
  Check,
  Eye,
  EyeOff,
  Sparkles,
  Calendar,
  Share2,
  Printer,
} from 'lucide-react';

const LotteryTicketCard = ({ coupon }) => {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const offer = coupon.offer || {};
  const isWinner = coupon.isWinner || coupon.status === 'won';

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border-2 transition-all duration-300 shadow-xl ${
        isWinner
          ? 'border-festive-gold bg-gradient-to-br from-festive-royalRed via-festive-deepMaroon to-festive-dark shadow-gold-glow'
          : 'border-festive-gold/40 bg-gradient-to-br from-festive-deepMaroon via-festive-maroon/70 to-festive-dark shadow-card-glow'
      }`}
    >
      {/* Top Foil Banner */}
      <div
        className={`h-2.5 bg-gradient-to-r ${
          isWinner
            ? 'from-festive-goldLight via-festive-goldGlow to-festive-amber animate-pulse'
            : 'from-festive-gold via-festive-amber to-festive-gold'
        }`}
      />

      <div className="p-5 sm:p-6 space-y-4">
        {/* Ticket Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-festive-royalRed/80 border border-festive-gold/40 shadow-sm">
              <DiyaIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-festive-gold block">
                Official Diwali Bumper Pass
              </span>
              <h4 className="font-royal font-bold text-sm sm:text-base text-white">
                {offer.title || 'Festive Dhamaka Exclusive Deal'}
              </h4>
            </div>
          </div>

          {/* Status Badge */}
          {isWinner ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-festive-gold to-festive-amber text-festive-dark font-black text-xs shadow-gold-glow animate-bounce">
              <Trophy className="w-4 h-4" />
              <span>WINNER 🏆</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Active in Draw</span>
            </div>
          )}
        </div>

        {/* Winner Prize Banner if won */}
        {isWinner && coupon.prizeWon && (
          <div className="p-3 rounded-xl bg-gradient-to-r from-festive-gold/20 via-festive-royalRed/50 to-festive-gold/20 border border-festive-gold text-center">
            <span className="text-xs text-festive-goldLight block uppercase tracking-wider font-semibold">
              🎉 Congratulations! You have won:
            </span>
            <span className="font-royal text-lg font-extrabold text-gold-gradient">
              {coupon.prizeWon}
            </span>
          </div>
        )}

        {/* Lottery Ticket Number Display */}
        <div className="p-4 rounded-2xl bg-festive-dark/90 border border-festive-gold/30 text-center relative overflow-hidden group">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-medium mb-1">
            Lucky Draw Ticket Number
          </span>
          <span className="font-mono text-xl sm:text-2xl font-black text-gold-gradient tracking-widest block">
            {coupon.couponNumber}
          </span>
          <span className="text-[10px] text-festive-goldLight/60 mt-1 block">
            Entry Fee: ₹11 Paid (Razorpay Order #{coupon.razorpayOrderId?.slice(-8)})
          </span>
        </div>

        {/* Secret Brand Promo Code Section */}
        <div className="p-3.5 rounded-xl bg-festive-royalRed/20 border border-festive-gold/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left w-full sm:w-auto">
            <span className="text-[10px] text-festive-gold uppercase tracking-wider block font-semibold">
              Partner Promo Discount Code
            </span>
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-0.5">
              <span className="font-mono font-bold text-base text-white tracking-wider">
                {revealed
                  ? offer.couponCode || 'FESTIVE11DIWALI'
                  : '••••••••••••'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
            <button
              onClick={() => setRevealed(!revealed)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-festive-dark/80 text-festive-goldLight border border-festive-gold/30 hover:border-festive-gold transition flex items-center gap-1 cursor-pointer"
            >
              {revealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{revealed ? 'Hide' : 'Reveal'}</span>
            </button>

            <button
              onClick={() =>
                handleCopy(offer.couponCode || 'FESTIVE11DIWALI')
              }
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-festive-button text-festive-dark hover:opacity-90 shadow-sm transition flex items-center gap-1 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-900" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer info: Purchased Date & Print Action */}
        <div className="pt-2 border-t border-festive-gold/15 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-festive-gold/70" />
            <span>
              Purchased:{' '}
              {new Date(coupon.purchasedAt || coupon.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>

          <button
            onClick={handlePrint}
            title="Print Ticket"
            className="flex items-center gap-1 text-festive-goldLight hover:text-festive-gold font-medium transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Pass</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LotteryTicketCard;
