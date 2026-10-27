import React from 'react';

export const DiyaIcon = ({ className = 'w-6 h-6', withFlame = true }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {withFlame && (
        <div className="absolute -top-3 w-3 h-5 bg-gradient-to-t from-festive-amber to-festive-goldGlow rounded-full flame-glow shadow-diya-glow" />
      )}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-full h-full text-festive-gold drop-shadow-md"
      >
        <path d="M12 7c-1.5 2.5-3 4-3 6 0 1.66 1.34 3 3 3s3-1.34 3-3c0-2-1.5-3.5-3-6zm-8 8.5C4 18 7.58 20 12 20s8-2 8-4.5c0-1.2-.8-2-2-2H6c-1.2 0-2 .8-2 2z" />
      </svg>
    </div>
  );
};

export const FloatingSparkles = () => {
  const sparkles = [
    { top: '15%', left: '8%', delay: '0s', size: 'w-2 h-2' },
    { top: '25%', left: '88%', delay: '1.2s', size: 'w-3 h-3' },
    { top: '65%', left: '4%', delay: '0.8s', size: 'w-2.5 h-2.5' },
    { top: '75%', left: '92%', delay: '2s', size: 'w-2 h-2' },
    { top: '45%', left: '95%', delay: '1.6s', size: 'w-3 h-3' },
    { top: '85%', left: '12%', delay: '2.4s', size: 'w-2.5 h-2.5' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {sparkles.map((s, i) => (
        <div
          key={i}
          className={`sparkle-particle ${s.size} bg-festive-goldGlow rounded-full opacity-60 shadow-diya-glow`}
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        />
      ))}
    </div>
  );
};

export default DiyaIcon;
