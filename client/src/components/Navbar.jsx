import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DiyaIcon } from './DiyaSparkles';
import {
  Sparkles,
  Ticket,
  Trophy,
  ShieldCheck,
  User,
  LogOut,
  Menu,
  X,
  Flame,
} from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-festive-deepMaroon/85 backdrop-blur-md border-b border-festive-gold/25 shadow-lg">
      {/* Top micro festive announcement banner */}
      <div className="bg-gradient-to-r from-festive-crimson via-festive-royalRed to-festive-maroon px-4 py-1 text-center text-xs font-medium text-festive-goldLight flex items-center justify-center gap-2 border-b border-festive-gold/20">
        <Sparkles className="w-3.5 h-3.5 text-festive-goldGlow animate-pulse" />
        <span>Diwali Dhamaka Bumper: Buy any coupon for ₹11 & get automatic entry to win an iPhone 16 Pro!</span>
        <span className="hidden md:inline font-bold text-festive-goldGlow underline cursor-pointer" onClick={() => navigate('/lucky-draw')}>
          View Grand Prizes →
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-festive-royalRed to-festive-deepMaroon border border-festive-gold/40 shadow-diya-glow group-hover:scale-105 transition-transform">
              <DiyaIcon className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-royal font-bold text-lg sm:text-2xl tracking-wider text-gold-gradient">
                  DIWALI DHAMAKA
                </span>
                <span className="bg-gradient-to-r from-festive-gold to-festive-amber text-festive-dark font-black text-xs sm:text-sm px-1.5 py-0.5 rounded shadow">
                  11
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-festive-goldLight/75 tracking-wider uppercase flex items-center gap-1 font-medium">
                <Flame className="w-3 h-3 text-festive-amber inline" /> ₹11 Festive Passes & Lucky Draw
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive('/')
                  ? 'text-festive-gold bg-festive-royalRed/40 border border-festive-gold/40 shadow-sm'
                  : 'text-slate-200 hover:text-festive-goldLight hover:bg-white/5'
              }`}
            >
              Exclusive Offers
            </Link>

            <Link
              to="/lucky-draw"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive('/lucky-draw')
                  ? 'text-festive-gold bg-festive-royalRed/40 border border-festive-gold/40'
                  : 'text-slate-200 hover:text-festive-goldLight hover:bg-white/5'
              }`}
            >
              <Trophy className="w-4 h-4 text-festive-goldGlow" />
              <span>Bumper Draw</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-festive-amber opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-festive-gold"></span>
              </span>
            </Link>

            <Link
              to="/about"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive('/about')
                  ? 'text-festive-gold bg-festive-royalRed/40 border border-festive-gold/40'
                  : 'text-slate-200 hover:text-festive-goldLight hover:bg-white/5'
              }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive('/contact')
                  ? 'text-festive-gold bg-festive-royalRed/40 border border-festive-gold/40'
                  : 'text-slate-200 hover:text-festive-goldLight hover:bg-white/5'
              }`}
            >
              Contact
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/vault"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive('/vault')
                      ? 'text-festive-gold bg-festive-royalRed/40 border border-festive-gold/40'
                      : 'text-slate-200 hover:text-festive-goldLight hover:bg-white/5'
                  }`}
                >
                  <Ticket className="w-4 h-4 text-festive-gold" />
                  <span>My Vault</span>
                </Link>

                <Link
                  to="/profile"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive('/profile')
                      ? 'text-festive-gold bg-festive-royalRed/40 border border-festive-gold/40'
                      : 'text-slate-200 hover:text-festive-goldLight hover:bg-white/5'
                  }`}
                >
                  <User className="w-4 h-4 text-festive-gold" />
                  <span>My Profile</span>
                </Link>
              </>
            )}

            {isAdmin && (
              <Link
                to="/admin"
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive('/admin')
                    ? 'text-festive-amber bg-festive-maroon border border-festive-amber'
                    : 'text-festive-amber/90 hover:text-festive-amber hover:bg-white/5'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-festive-amber" />
                <span>Admin Panel</span>
              </Link>
            )}
          </nav>

          {/* Right Action / Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/profile"
                  title="View Your Profile & Bought Tickets"
                  className="flex items-center gap-2 bg-festive-maroon/60 hover:bg-festive-maroon border border-festive-gold/30 hover:border-festive-gold px-3 py-1.5 rounded-full transition group cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-festive-royalRed flex items-center justify-center text-festive-gold font-bold text-xs border border-festive-gold/40 group-hover:scale-105 transition">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-slate-100 max-w-[100px] truncate leading-tight group-hover:text-festive-goldGlow">
                      {user?.name}
                    </p>
                    <span className="text-[10px] text-festive-gold font-medium">
                      {user?.role === 'admin' ? 'Festive Admin' : 'Profile & Tickets'}
                    </span>
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-festive-goldLight hover:text-white transition"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-full text-sm font-bold bg-festive-button text-festive-dark shadow-gold-glow hover:opacity-95 transition transform hover:scale-[1.02]"
                >
                  Join Festive ₹11
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-festive-gold hover:bg-white/5 transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-festive-deepMaroon border-b border-festive-gold/30 px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-slate-200 hover:text-festive-gold hover:bg-white/5"
          >
            Exclusive Offers
          </Link>
          <Link
            to="/lucky-draw"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-semibold text-slate-200 hover:text-festive-gold hover:bg-white/5"
          >
            <Trophy className="w-4 h-4 text-festive-goldGlow" />
            <span>Diwali Bumper Lucky Draw</span>
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-slate-200 hover:text-festive-gold hover:bg-white/5"
          >
            About DiwaliDhamaka11
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-slate-200 hover:text-festive-gold hover:bg-white/5"
          >
            Contact & Support Desk
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-semibold text-slate-200 hover:text-festive-gold hover:bg-white/5"
              >
                <User className="w-4 h-4 text-festive-gold" />
                <span>My Profile & Bought Tickets</span>
              </Link>
              <Link
                to="/vault"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-semibold text-slate-200 hover:text-festive-gold hover:bg-white/5"
              >
                <Ticket className="w-4 h-4 text-festive-gold" />
                <span>My Vault</span>
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-semibold text-festive-amber hover:bg-white/5"
                >
                  <ShieldCheck className="w-4 h-4 text-festive-amber" />
                  <span>Admin Dashboard</span>
                </Link>
              )}
              <div className="pt-2 border-t border-festive-gold/20 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-300">
                  Signed in as <strong className="text-festive-gold">{user?.name}</strong>
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-lg text-sm bg-rose-950/60 text-rose-300 border border-rose-800/40"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="pt-2 border-t border-festive-gold/20 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg text-sm font-semibold text-festive-goldLight border border-festive-gold/30 hover:bg-white/5"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg text-sm font-bold bg-festive-button text-festive-dark shadow-gold-glow"
              >
                Join Festive ₹11
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
