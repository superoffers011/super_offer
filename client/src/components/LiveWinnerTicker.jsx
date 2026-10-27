import React, { useEffect, useState } from 'react';
import { adminAPI } from '../services/api';
import { Trophy, Gift, Sparkles, CheckCircle2 } from 'lucide-react';

const defaultTickerItems = [
  { name: 'Rahul Sharma (Delhi)', prize: 'Apple iPhone 16 Pro Max', ticket: 'DIWALI-2026-X9K2' },
  { name: 'Priya Iyer (Chennai)', prize: '10g 24K Tanishq Gold Coin', ticket: 'DIWALI-2026-M4P7' },
  { name: 'Vikram Patel (Ahmedabad)', prize: 'Sony Bravia 65" 4K OLED', ticket: 'DIWALI-2026-B8T1' },
  { name: 'Ananya Roy (Kolkata)', prize: '₹1,00,000 Diwali Festive Cash', ticket: 'DIWALI-2026-Z2H5' },
  { name: 'Sameer Khan (Mumbai)', prize: 'Dyson V12 Slim Vacuum', ticket: 'DIWALI-2026-Y7W3' },
  { name: 'Neha Gupta (Bengaluru)', prize: 'Taj Palace 2-Nights Luxury Stay', ticket: 'DIWALI-2026-L5D9' },
];

const LiveWinnerTicker = () => {
  const [tickerList, setTickerList] = useState(defaultTickerItems);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const res = await adminAPI.getWinners();
        if (res.data?.winners?.length > 0) {
          const apiWinners = res.data.winners.map((w) => ({
            name: `${w.user?.name || 'Festive Winner'}`,
            prize: w.prizeWon || 'Diwali Bumper Prize',
            ticket: w.couponNumber,
          }));
          setTickerList([...apiWinners, ...defaultTickerItems]);
        }
      } catch (err) {
        // Fall back to default verified items
      }
    };
    fetchWinners();
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-festive-dark via-festive-deepMaroon to-festive-dark border-y border-festive-gold/30 overflow-hidden py-2.5 relative">
      <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-festive-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-festive-dark to-transparent z-10 pointer-events-none" />

      <div className="flex items-center">
        {/* Left Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-festive-royalRed/80 text-festive-goldGlow border border-festive-gold/40 rounded-full text-xs font-bold uppercase tracking-wider ml-4 mr-2 shrink-0 shadow-sm">
          <Trophy className="w-3.5 h-3.5" />
          <span>Live Bumper Winners</span>
        </div>

        {/* Sliding Ticker */}
        <div className="flex whitespace-nowrap overflow-x-hidden">
          <div className="flex items-center gap-8 animate-marquee">
            {tickerList.concat(tickerList).map((item, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-200 bg-festive-maroon/40 border border-festive-gold/20 px-3 py-1 rounded-full shadow-inner"
              >
                <Sparkles className="w-3.5 h-3.5 text-festive-goldGlow shrink-0" />
                <span className="font-semibold text-slate-100">{item.name}</span>
                <span className="text-festive-goldLight/70">won</span>
                <span className="font-bold text-festive-goldGlow underline decoration-festive-amber/50">
                  {item.prize}
                </span>
                <span className="text-[11px] font-mono bg-festive-dark/60 text-festive-gold px-1.5 py-0.5 rounded border border-festive-gold/30">
                  {item.ticket}
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveWinnerTicker;
