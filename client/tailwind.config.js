/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        festive: {
          dark: '#0D0103',
          deepMaroon: '#1F0408',
          maroon: '#3A0810',
          crimson: '#5E0D1B',
          royalRed: '#8C1020',
          brightRed: '#C9182B',
          gold: '#D4AF37',
          goldLight: '#F3E5AB',
          goldGlow: '#FFD700',
          goldDark: '#997316',
          amber: '#F59E0B',
          amberGlow: '#FBBF24',
          cardBg: 'rgba(38, 7, 13, 0.85)',
          glassBorder: 'rgba(212, 175, 55, 0.25)',
        },
      },
      backgroundImage: {
        'diwali-gradient':
          'radial-gradient(circle at 50% 20%, #3d0a13 0%, #1a0307 50%, #0d0103 100%)',
        'gold-metallic':
          'linear-gradient(135deg, #FFF6BD 0%, #D4AF37 50%, #AA771C 100%)',
        'gold-shine':
          'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.35), transparent)',
        'festive-button':
          'linear-gradient(135deg, #FFD700 0%, #D4AF37 50%, #B8860B 100%)',
      },
      boxShadow: {
        'diya-glow': '0 0 25px rgba(255, 180, 0, 0.45)',
        'gold-glow': '0 0 30px rgba(212, 175, 55, 0.35)',
        'card-glow': '0 8px 32px 0 rgba(0, 0, 0, 0.45), 0 0 1px 1px rgba(212, 175, 55, 0.2)',
      },
      animation: {
        'diya-flicker': 'diyaFlicker 2s infinite ease-in-out',
        'shimmer': 'shimmer 2.5s infinite linear',
        'pulse-glow': 'pulseGlow 2.5s infinite',
        'float-slow': 'floatSlow 4s ease-in-out infinite',
      },
      keyframes: {
        diyaFlicker: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9', filter: 'drop-shadow(0 0 8px #FF9900)' },
          '25%': { transform: 'scale(1.08) rotate(-1deg)', opacity: '1', filter: 'drop-shadow(0 0 14px #FFD700)' },
          '50%': { transform: 'scale(0.96) rotate(1deg)', opacity: '0.85', filter: 'drop-shadow(0 0 6px #FF8800)' },
          '75%': { transform: 'scale(1.05)', opacity: '0.95', filter: 'drop-shadow(0 0 12px #FFAA00)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)' },
          '50%': { boxShadow: '0 0 35px rgba(255, 215, 0, 0.65)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
