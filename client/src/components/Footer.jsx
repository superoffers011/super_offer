import React from 'react';
import { Link } from 'react-router-dom';
import { DiyaIcon } from './DiyaSparkles';
import {
  ShieldCheck,
  Zap,
  Sparkles,
  Heart,
  PhoneCall,
  Mail,
  Lock,
  FileText,
  RefreshCw,
  Info,
  MapPin,
  Scale,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-festive-gold/30 bg-festive-dark relative overflow-hidden">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-festive-gold to-transparent opacity-50" />

      {/* Trust Badges Bar */}
      <div className="border-b border-festive-gold/15 bg-festive-deepMaroon/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center gap-1.5">
            <Lock className="w-5 h-5 text-festive-goldGlow" />
            <h5 className="text-xs sm:text-sm font-bold text-white">Razorpay Secured</h5>
            <p className="text-[11px] text-slate-400">256-Bit Encrypted Payments</p>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <Zap className="w-5 h-5 text-festive-amber" />
            <h5 className="text-xs sm:text-sm font-bold text-white">Instant Unlock</h5>
            <p className="text-[11px] text-slate-400">Coupon Code Generated in 1s</p>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h5 className="text-xs sm:text-sm font-bold text-white">100+ Verified Offers</h5>
            <p className="text-[11px] text-slate-400">Authentic Brand Partnerships</p>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <DiyaIcon className="w-5 h-5" />
            <h5 className="text-xs sm:text-sm font-bold text-white">Fair Lucky Draw</h5>
            <p className="text-[11px] text-slate-400">Cryptographically Audited</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-festive-royalRed border border-festive-gold/40 shadow-diya-glow">
                <DiyaIcon className="w-6 h-6" />
              </div>
              <span className="font-royal text-xl font-bold text-gold-gradient tracking-wide">
                DIWALI DHAMAKA 11
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              India's premier festive platform offering ₹11 promotional passes, brand coupons, and transparent bumper lucky draws for Diwali 2026.
            </p>
            <div className="pt-2 text-xs text-festive-goldLight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-festive-goldGlow" />
              <span>Shubh Deepavali & Dhanteras!</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-royal text-sm font-bold text-festive-gold tracking-wider uppercase">
              Festive Highlights
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link to="/" className="hover:text-festive-gold transition">
                  100+ Diwali Deals
                </Link>
              </li>
              <li>
                <Link to="/lucky-draw" className="hover:text-festive-gold transition">
                  iPhone 16 & Gold Draw
                </Link>
              </li>
              <li>
                <Link to="/vault" className="hover:text-festive-gold transition">
                  My Coupon Vault
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-festive-gold transition">
                  About DiwaliDhamaka11
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-festive-gold transition">
                  Contact & Support Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Compliance & Legal Policies */}
          <div className="space-y-3">
            <h4 className="font-royal text-sm font-bold text-festive-gold tracking-wider uppercase flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-festive-amber" />
              <span>Policies & Compliance</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link
                  to="/refund-policy"
                  className="hover:text-festive-gold transition flex items-center gap-1.5 font-medium"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-festive-gold/70" />
                  <span>Return & Refund Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-festive-gold transition flex items-center gap-1.5 font-medium"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/disclaimer"
                  className="hover:text-festive-gold transition flex items-center gap-1.5 font-medium"
                >
                  <FileText className="w-3.5 h-3.5 text-festive-amber" />
                  <span>Terms & Disclaimer</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-festive-gold transition flex items-center gap-1.5 font-medium"
                >
                  <Info className="w-3.5 h-3.5 text-festive-gold/70" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-festive-gold transition flex items-center gap-1.5 font-medium"
                >
                  <Mail className="w-3.5 h-3.5 text-festive-gold/70" />
                  <span>Contact & Grievance Desk</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Helpline & Support */}
          <div className="space-y-3">
            <h4 className="font-royal text-sm font-bold text-festive-gold tracking-wider uppercase">
              Support & Inquiries
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-festive-amber shrink-0" />
                <a href="mailto:support@diwalidhamaka11.com" className="hover:text-festive-gold">
                  support@diwalidhamaka11.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-festive-gold shrink-0" />
                <span className="font-mono font-semibold">+91 1800-DIWALI-11</span>
              </p>
              <p className="flex items-start gap-2 text-[11px] text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-festive-gold/70 shrink-0 mt-0.5" />
                <span>Festive Tower, Level 4, Outer Ring Road, Bengaluru - 560103</span>
              </p>
              <p className="text-[11px] text-emerald-400 font-semibold pt-1">
                Mon - Sun, 24/7 during festive season.
              </p>
            </div>
          </div>
        </div>

        {/* Legal Links Bar */}
        <div className="py-4 border-t border-festive-gold/15 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-300">
          <Link to="/about" className="hover:text-festive-gold transition">
            About Us
          </Link>
          <span className="text-festive-gold/40">•</span>
          <Link to="/contact" className="hover:text-festive-gold transition">
            Contact Us
          </Link>
          <span className="text-festive-gold/40">•</span>
          <Link to="/refund-policy" className="hover:text-festive-gold transition">
            Return & Refund Policy
          </Link>
          <span className="text-festive-gold/40">•</span>
          <Link to="/privacy-policy" className="hover:text-festive-gold transition">
            Privacy Policy
          </Link>
          <span className="text-festive-gold/40">•</span>
          <Link to="/disclaimer" className="hover:text-festive-gold transition">
            Terms of Service & Disclaimer
          </Link>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-festive-gold/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © 2026 DiwaliDhamaka11 Technologies India Pvt. Ltd. All Rights Reserved. Powered by Razorpay.
          </p>
          <p className="flex items-center gap-1.5 text-festive-goldLight">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Diwali Festivities</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
