import React, { useState, useEffect } from 'react';
import { Sparkles, Clock } from 'lucide-react';

const DiwaliCountdown = () => {
  // Target Diwali Grand Bumper Lucky Draw Date
  const calculateTimeLeft = () => {
    // Target date set for festive grand draw
    const targetDate = new Date('2026-11-12T20:00:00+05:30').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'DAYS', value: String(timeLeft.days).padStart(2, '0') },
    { label: 'HOURS', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'MINUTES', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'SECONDS', value: String(timeLeft.seconds).padStart(2, '0') },
  ];

  return (
    <div className="inline-flex flex-col items-center bg-gradient-to-r from-festive-deepMaroon/90 via-festive-maroon/90 to-festive-deepMaroon/90 border border-festive-gold/40 rounded-2xl p-4 sm:p-5 shadow-card-glow backdrop-blur-md">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-4 h-4 text-festive-goldGlow animate-spin" style={{ animationDuration: '8s' }} />
        <span className="text-xs uppercase tracking-widest font-semibold text-festive-goldLight flex items-center gap-1">
          Diwali Bumper Lucky Draw Closes In
          <Sparkles className="w-3.5 h-3.5 text-festive-gold" />
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3.5">
        {timeUnits.map((unit, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl bg-gradient-to-b from-festive-crimson to-festive-dark border border-festive-gold/50 flex items-center justify-center shadow-inner relative overflow-hidden group">
              {/* Subtle top shine */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-festive-goldLight opacity-60" />
              <span className="font-royal text-2xl sm:text-3xl font-extrabold text-gold-gradient tracking-tight">
                {unit.value}
              </span>
            </div>
            <span className="text-[10px] font-bold tracking-wider text-festive-goldLight/70 mt-1.5 uppercase">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiwaliCountdown;
