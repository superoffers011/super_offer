import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DiyaIcon } from '../components/DiyaSparkles';
import OtpVerificationModal from '../components/OtpVerificationModal';
import {
  Sparkles,
  User,
  Mail,
  Phone,
  Lock,
  UserPlus,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // OTP Verification Modal State
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await register({
      name,
      email,
      phone,
      password,
    });
    setLoading(false);

    if (result.success) {
      if (result.requiresOtp) {
        setPendingEmail(result.email || email);
        setShowOtpModal(true);
      } else {
        navigate('/vault');
      }
    } else {
      setError(result.message || 'Registration failed.');
    }
  };

  const handleOtpSuccess = (user) => {
    setShowOtpModal(false);
    navigate('/profile');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md glass-card rounded-3xl p-6 sm:p-8 border-2 border-festive-gold/50 shadow-gold-glow relative overflow-hidden">
        {/* Top Gold Shine */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-festive-gold via-festive-amber to-festive-gold" />

        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-festive-royalRed/80 border border-festive-gold/50 flex items-center justify-center mx-auto mb-3 shadow-diya-glow">
            <DiyaIcon className="w-8 h-8" />
          </div>
          <h2 className="font-royal text-2xl sm:text-3xl font-extrabold text-white">
            Create Your Account
          </h2>
          <p className="text-xs text-festive-goldLight mt-1">
            Unlock 100+ ₹11 Diwali Deals & Bumper Lucky Draw Passes
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
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-festive-gold/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Arjun Sharma"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-festive-dark/80 border border-festive-gold/30 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-festive-gold transition"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Email Address (OTP will be sent here)
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
              Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-festive-gold/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-festive-dark/80 border border-festive-gold/30 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-festive-gold transition"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Create Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-festive-gold/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-festive-dark/80 border border-festive-gold/30 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-festive-gold transition"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-festive-royalRed/20 border border-festive-gold/20 text-[11px] text-festive-goldLight flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-festive-goldGlow shrink-0" />
            <span>Includes 2-Step Email OTP Verification & Secure Session Cookies</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-bold bg-festive-button text-festive-dark shadow-gold-glow hover:opacity-95 transition transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span>Sending verification OTP...</span>
            ) : (
              <>
                <UserPlus className="w-4 h-4 text-festive-dark" />
                <span>Register & Verify with OTP</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-300">
          Already registered?{' '}
          <Link
            to="/login"
            className="font-bold text-festive-gold underline hover:text-festive-goldGlow"
          >
            Log In Here
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

export default RegisterPage;
