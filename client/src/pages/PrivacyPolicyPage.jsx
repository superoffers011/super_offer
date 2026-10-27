import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Eye,
  Server,
  UserCheck,
  FileCheck,
  Mail,
  AlertCircle,
} from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-festive-royalRed/60 border border-festive-gold/40 text-festive-goldLight text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Data Protection & Privacy</span>
        </div>
        <h1 className="font-royal text-3xl sm:text-5xl font-extrabold text-white tracking-wide">
          Privacy <span className="text-gold-gradient">Policy</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
          How DiwaliDhamaka11 protects, handles, and secures your personal information, credentials, and payment transactions.
        </p>
        <p className="text-xs text-festive-goldLight/70 mt-2">
          Effective Date: October 2026 | Compliant with Information Technology Act, 2000 & SPDI Rules
        </p>
      </div>

      {/* Trust Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="glass-card p-5 rounded-2xl border border-festive-gold/30 text-center">
          <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center mx-auto mb-3 text-emerald-400">
            <Lock className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white mb-1">Zero Card Storage</h4>
          <p className="text-xs text-slate-300">
            All card & UPI credentials processed exclusively via PCI-DSS Level 1 Razorpay.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-festive-gold/30 text-center">
          <div className="w-10 h-10 rounded-xl bg-festive-royalRed/80 border border-festive-gold/40 flex items-center justify-center mx-auto mb-3 text-festive-gold">
            <Eye className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white mb-1">No Data Selling</h4>
          <p className="text-xs text-slate-300">
            We never sell, rent, or lease your private contact info to any third-party marketing brokers.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-festive-gold/30 text-center">
          <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/50 flex items-center justify-center mx-auto mb-3 text-festive-amber">
            <Server className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white mb-1">Encrypted Sessions</h4>
          <p className="text-xs text-slate-300">
            SHA-256 OTP hashing and secure HTTP-Only session cookies with 256-bit TLS encryption.
          </p>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-festive-gold/40 shadow-gold-glow space-y-8 text-slate-200 text-sm leading-relaxed">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-festive-royalRed border border-festive-gold/40 flex items-center justify-center text-festive-gold font-bold text-xs">
              01
            </div>
            <h3 className="text-lg font-bold text-white font-royal">
              Introduction & Scope
            </h3>
          </div>
          <p>
            DiwaliDhamaka11 ("we", "us", or "our") values the trust you place in us when browsing our platform, claiming festive discounts, and purchasing ₹11 lottery passes. This Privacy Policy outlines our procedures regarding the collection, use, retention, and disclosure of your personal data when you interact with <strong className="text-white">diwalidhamaka11.com</strong>.
          </p>
          <p>
            By accessing or registering on our platform, you consent to the data practices described in this policy in accordance with the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-festive-royalRed border border-festive-gold/40 flex items-center justify-center text-festive-gold font-bold text-xs">
              02
            </div>
            <h3 className="text-lg font-bold text-white font-royal">
              Information We Collect
            </h3>
          </div>
          <p>
            We collect only the essential personal data necessary to provide you with secure access to promotional deals, authenticate your account, and verify lottery draw participation:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-300 text-xs sm:text-sm">
            <li><strong>Personal Identity Data:</strong> Full name, email address, and mobile phone number provided during account registration.</li>
            <li><strong>Authentication Data:</strong> Password (hashed cryptographically with bcrypt; plain text passwords are never stored) and 6-digit Email Verification OTPs (hashed using SHA-256).</li>
            <li><strong>Transaction References:</strong> Razorpay Order IDs, Payment IDs, amounts (₹11.00), timestamps, and generated lottery pass serial numbers.</li>
            <li><strong>Device & Log Information:</strong> IP address, browser type, operating system, and login session timestamps used strictly for fraud prevention and rate-limiting brute force attacks.</li>
          </ul>

          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs flex items-start gap-3 mt-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-emerald-300 mb-0.5">Critical Financial Privacy Guarantee:</strong>
              We do <strong>NOT</strong> collect, view, or store your credit/debit card numbers, CVVs, expiry dates, net banking passwords, or UPI PINs. All financial interactions take place entirely on Razorpay's PCI-DSS Level 1 certified payment infrastructure.
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-festive-royalRed border border-festive-gold/40 flex items-center justify-center text-festive-gold font-bold text-xs">
              03
            </div>
            <h3 className="text-lg font-bold text-white font-royal">
              How We Use Your Information
            </h3>
          </div>
          <p>Your information is utilized solely for lawful business purposes:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-300 text-xs sm:text-sm">
            <li>To verify your identity and prevent bot-driven spam through our 2-Step Email OTP system.</li>
            <li>To process your ₹11 payments and issue cryptographically verifiable Diwali Bumper Lucky Draw tickets.</li>
            <li>To deliver winning notifications, prize claim instructions, and partner discount codes directly to your inbox.</li>
            <li>To provide customer support and process eligible refunds under our Return Policy.</li>
            <li>To comply with legal obligations, tax filings, and law enforcement directives under applicable Indian laws.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-festive-royalRed border border-festive-gold/40 flex items-center justify-center text-festive-gold font-bold text-xs">
              04
            </div>
            <h3 className="text-lg font-bold text-white font-royal">
              Cookies & Session Security Policy
            </h3>
          </div>
          <p>
            DiwaliDhamaka11 utilizes <strong>HTTP-Only, SameSite secure cookies</strong> for user sessions. These cookies cannot be read or stolen by third-party browser scripts, neutralizing Cross-Site Scripting (XSS) risks.
          </p>
          <p>
            We do not use intrusive third-party tracking or advertising cookies. Logging out immediately invalidates and deletes the session cookie from your browser.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-festive-royalRed border border-festive-gold/40 flex items-center justify-center text-festive-gold font-bold text-xs">
              05
            </div>
            <h3 className="text-lg font-bold text-white font-royal">
              Information Sharing & Third Parties
            </h3>
          </div>
          <p>
            We do not sell, trade, or transfer your personally identifiable information. We disclose relevant information only to trusted operational partners bound by strict non-disclosure obligations:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-300 text-xs sm:text-sm">
            <li><strong>Razorpay Software Private Limited:</strong> For payment gateway processing, UPI tokenization, and fraud screening.</li>
            <li><strong>Transactional Email Relays:</strong> For automated dispatch of 6-digit verification OTPs and purchase receipts.</li>
            <li><strong>Statutory Authorities:</strong> When required by Indian law, court order, or regulatory body.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-festive-royalRed border border-festive-gold/40 flex items-center justify-center text-festive-gold font-bold text-xs">
              06
            </div>
            <h3 className="text-lg font-bold text-white font-royal">
              Your Rights & Data Retention
            </h3>
          </div>
          <p>
            You have the right to access your stored profile information in <Link to="/profile" className="text-festive-gold font-bold underline">My Profile</Link>, review all transaction histories, and request correction of inaccurate data. You may also request account deletion or data anonymization by contacting our Grievance Officer, provided there are no active draw disputes or statutory audit obligations.
          </p>
        </section>

        {/* Section 7: Grievance Officer Details */}
        <section className="pt-4 border-t border-festive-gold/20">
          <h3 className="text-lg font-bold text-white font-royal mb-3 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-festive-gold" />
            <span>Grievance Redressal Officer (Mandated under IT Act, 2000)</span>
          </h3>
          <div className="p-4 sm:p-6 rounded-2xl bg-festive-royalRed/20 border border-festive-gold/30 text-xs sm:text-sm space-y-2">
            <p><strong>Name:</strong> Rajesh K. Sharma</p>
            <p><strong>Designation:</strong> Head of Compliance & Data Protection Officer</p>
            <p><strong>Entity:</strong> DiwaliDhamaka11 Technologies Private Limited</p>
            <p><strong>Postal Address:</strong> Festive Tower, Level 4, Outer Ring Road, Bengaluru, Karnataka - 560103, India</p>
            <p><strong>Email:</strong> <a href="mailto:grievance@diwalidhamaka11.com" className="text-festive-gold font-bold underline">grievance@diwalidhamaka11.com</a></p>
            <p className="text-slate-400 text-xs pt-1">
              Any complaint or grievance regarding data handling will be acknowledged within 24 hours and redressed within 15 working days as prescribed by law.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
