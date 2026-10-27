import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { DiyaIcon } from './DiyaSparkles';
import { festiveAudio } from './FestiveSoundToggle';
import {
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RotateCcw,
  Sparkles,
  ArrowRight,
  X,
} from 'lucide-react';

const OtpVerificationModal = ({
  email,
  isOpen = true,
  onClose,
  onSuccess,
}) => {
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(30);

  const inputRefs = useRef([]);
  const { verifyOtp, resendOtp } = useAuth();

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [isOpen]);

  // Resend cooldown countdown timer
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleInputChange = (index, value) => {
    // Only accept numeric digit
    if (value && !/^\d+$/.test(value)) return;

    const newDigits = [...otpDigits];
    // Handle paste of full 6 digits
    if (value.length > 1) {
      const pasted = value.slice(0, 6).split('');
      pasted.forEach((char, i) => {
        if (i < 6) newDigits[i] = char;
      });
      setOtpDigits(newDigits);
      const nextFocus = Math.min(pasted.length, 5);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    newDigits[index] = value;
    setOtpDigits(newDigits);

    // Auto move to next input if digit entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // On Backspace, clear current or move to previous
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e) => {
    if (e) e.preventDefault();
    const fullOtp = otpDigits.join('');

    if (fullOtp.length !== 6) {
      setError('Please enter all 6 digits of the OTP.');
      return;
    }

    setLoading(true);
    setError(null);

    const result = await verifyOtp(email, fullOtp);
    setLoading(false);

    if (result.success) {
      setSuccessMsg(result.message || 'Email verified successfully!');
      festiveAudio.playCrackerBlast();
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FF2A55', '#D4AF37', '#FFFFFF'],
      });

      setTimeout(() => {
        if (onSuccess) onSuccess(result.user);
      }, 1500);
    } else {
      setError(result.message || 'Invalid or expired OTP code.');
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setError(null);
    setSuccessMsg(null);

    const result = await resendOtp(email);
    if (result.success) {
      setResendCooldown(30);
      setSuccessMsg('A new 6-digit verification code has been dispatched to your email.');
    } else {
      setError(result.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-card rounded-3xl p-6 sm:p-8 border-2 border-festive-gold/60 shadow-gold-glow overflow-hidden">
        {/* Top Gold Shine */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-festive-gold via-festive-goldGlow to-festive-amber" />

        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-festive-royalRed/80 border-2 border-festive-gold/50 flex items-center justify-center mx-auto shadow-diya-glow">
            <DiyaIcon className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-festive-goldGlow flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-festive-gold" />
              Security Email Verification
            </span>
            <h3 className="font-royal text-2xl font-extrabold text-white mt-1">
              Enter 6-Digit OTP
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
              We sent an authentication code to{' '}
              <strong className="text-festive-gold break-all">{email}</strong>
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-600 text-emerald-200 text-xs flex items-center gap-2 text-left">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* 6 Digit Inputs */}
          <div className="flex justify-center gap-2 sm:gap-2.5 pt-2">
            {otpDigits.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-11 h-14 sm:w-12 sm:h-14 text-center font-mono text-xl sm:text-2xl font-black rounded-xl bg-festive-dark border-2 border-festive-gold/40 text-festive-goldGlow focus:border-festive-gold focus:ring-2 focus:ring-festive-gold/40 outline-none transition shadow-inner"
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="pt-3 space-y-3">
            <button
              onClick={handleVerify}
              disabled={loading || otpDigits.join('').length !== 6}
              className="w-full py-3.5 rounded-xl text-sm font-bold bg-festive-button text-festive-dark shadow-gold-glow hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-festive-dark" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-festive-dark" />
                  <span>Verify Email & Activate Session</span>
                  <ArrowRight className="w-4 h-4 text-festive-dark" />
                </>
              )}
            </button>

            {/* Resend button with cooldown */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <span>Didn't receive the email code?</span>
              <button
                onClick={handleResend}
                disabled={resendCooldown > 0}
                className={`font-semibold transition cursor-pointer ${
                  resendCooldown > 0
                    ? 'text-slate-500 cursor-not-allowed'
                    : 'text-festive-gold hover:text-festive-goldGlow underline'
                }`}
              >
                {resendCooldown > 0 ? (
                  `Resend in ${resendCooldown}s`
                ) : (
                  <span className="flex items-center gap-1">
                    <RotateCcw className="w-3 h-3 inline" /> Resend OTP
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationModal;
