import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DiyaIcon } from '../components/DiyaSparkles';
import OtpVerificationModal from '../components/OtpVerificationModal';
import { Sparkles, Mail, Lock, LogIn, AlertCircle, ShieldCheck, User } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // OTP Verification Modal State
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } else if (result.requiresOtp) {
      setPendingEmail(result.email || email);
      setShowOtpModal(true);
    } else {
      setError(result.message || 'Login failed.');
    }
  };

  const handleOtpSuccess = (user) => {
    setShowOtpModal(false);
    if (user?.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/profile');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md glass-card rounded-3xl p-6 sm:p-8 border-2 border-festive-gold/50 shadow-gold-glow relative overflow-hidden">
        {/* Top Gold Shine */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-festive-gold via-festive-amber to-festive-gold" />

        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-festive-royalRed/80 border border-festive-gold/50 flex items-center justify-center mx-auto mb-3 shadow-diya-glow">
            <DiyaIcon className="w-8 h-8" />
          </div>
          <h2 className="font-royal text-2xl sm:text-3xl font-extrabold text-white">
            Welcome Back
          </h2>
          <p className="text-xs text-festive-goldLight mt-1">
            Access your DiwaliDhamaka11 Vault & Lottery Passes
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs mb-6 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-festive-gold/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-festive-dark/80 border border-festive-gold/30 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-festive-gold transition"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-festive-gold/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-festive-dark/80 border border-festive-gold/30 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-festive-gold transition"
              />
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-festive-royalRed/20 border border-festive-gold/20 text-[11px] text-festive-goldLight flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-festive-goldGlow shrink-0" />
            <span>Protected by HTTP-Only Session Cookies & 256-Bit SSL</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-bold bg-festive-button text-festive-dark shadow-gold-glow hover:opacity-95 transition transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span>Signing in...</span>
            ) : (
              <>
                <LogIn className="w-4 h-4 text-festive-dark" />
                <span>Log In to Vault</span>
              </>
            )}
          </button>
        </form>

        {/* Production Security & Privacy Notice */}
        <div className="mt-6 pt-5 border-t border-festive-gold/20 flex items-center justify-center gap-2 text-[11px] text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Protected with HTTP-Only Session Security & OTP Verification</span>
        </div>

        <div className="mt-6 text-center text-xs text-slate-300">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-bold text-festive-gold underline hover:text-festive-goldGlow"
          >
            Join DiwaliDhamaka11
          </Link>
        </div>
      </div>

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <OtpVerificationModal
          email={pendingEmail}
          isOpen={showOtpModal}
          onClose={() => setShowOtpModal(false)}
          onSuccess={handleOtpSuccess}
        />
      )}
    </div>
  );
};

export default LoginPage;
