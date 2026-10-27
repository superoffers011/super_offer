import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  AlertTriangle,
  Scale,
  Award,
  CheckCircle2,
  HelpCircle,
  ShieldAlert,
} from 'lucide-react';

const TermsDisclaimerPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-festive-royalRed/60 border border-festive-gold/40 text-festive-goldLight text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
          <Scale className="w-4 h-4 text-festive-goldGlow" />
          <span>Legal Agreement & Disclaimers</span>
        </div>
        <h1 className="font-royal text-3xl sm:text-5xl font-extrabold text-white tracking-wide">
          Terms of Service & <span className="text-gold-gradient">Disclaimer</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
          Please read these terms and conditions carefully before purchasing ₹11 festive passes or participating in the Diwali Bumper Lucky Draw.
        </p>
        <p className="text-xs text-festive-goldLight/70 mt-2">
          Effective for Diwali Season 2026 | Governing Indian Commercial Law
        </p>
      </div>

      {/* Main Content Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-festive-gold/40 shadow-gold-glow space-y-8 text-slate-200 text-sm leading-relaxed">
        
        {/* Section 1: User Eligibility */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-festive-royalRed border border-festive-gold/40 flex items-center justify-center text-festive-gold font-bold text-xs">
              01
            </div>
            <h3 className="text-lg font-bold text-white font-royal">
              Eligibility to Participate
            </h3>
          </div>
          <p>
            To use DiwaliDhamaka11, purchase promotional passes, or participate in the Diwali Bumper Lucky Draw, you must satisfy the following criteria:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-300 text-xs sm:text-sm">
            <li>You must be an individual citizen and resident of the Republic of India.</li>
            <li>You must be at least 18 years of age at the time of account registration.</li>
            <li>You must hold a valid Indian mobile number and an active, verified email address.</li>
            <li>You must possess a valid Indian payment instrument (UPI, Debit Card, Credit Card, or Netbanking) in your own name.</li>
          </ul>
        </section>

        {/* Section 2: Promotional ₹11 Passes */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-festive-royalRed border border-festive-gold/40 flex items-center justify-center text-festive-gold font-bold text-xs">
              02
            </div>
            <h3 className="text-lg font-bold text-white font-royal">
              Nature of the ₹11 Promotional Pass
            </h3>
          </div>
          <p>
            The ₹11.00 fee paid for each offer is an administrative festive facilitation fee that grants:
          </p>
          <ol className="list-decimal pl-5 space-y-1.5 text-slate-300 text-xs sm:text-sm">
            <li>Immediate access to unlock exclusive partner brand promo codes and discount vouchers.</li>
            <li>One (1) official, cryptographically generated Diwali Bumper Lucky Draw serial number (format: <code className="text-festive-gold font-mono">DIWALI-2026-XXXXXX</code>).</li>
          </ol>
          <p>
            Each purchased pass is individual and non-transferable once assigned to a user's account vault.
          </p>
        </section>

        {/* Section 3: Brand Partner Disclaimer */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-festive-royalRed border border-festive-gold/40 flex items-center justify-center text-festive-gold font-bold text-xs">
              03
            </div>
            <h3 className="text-lg font-bold text-white font-royal">
              Merchant & Brand Partner Disclaimer
            </h3>
          </div>
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Independent Aggregator Disclaimer</span>
            </div>
            <p>
              DiwaliDhamaka11 operates as an independent festive promotional platform. All brand logos, trademarks, and trade names (including but not limited to Apple, Tanishq, Swiggy, Zomato, MakeMyTrip, Sony, Samsung, Nykaa, etc.) are the intellectual property of their respective owners.
            </p>
            <p>
              The display of these brands does not imply direct sponsorship, endorsement, or formal partnership unless explicitly specified. Brand coupons unlocked on this portal are subject to the respective merchant's own terms of use, minimum order values, and validity schedules.
            </p>
          </div>
        </section>

        {/* Section 4: Lucky Draw Rules & Fair Play */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-festive-royalRed border border-festive-gold/40 flex items-center justify-center text-festive-gold font-bold text-xs">
              04
            </div>
            <h3 className="text-lg font-bold text-white font-royal">
              Diwali Bumper Lucky Draw Fair Play Rules
            </h3>
          </div>
          <p>
            To guarantee absolute fairness, transparency, and integrity for all festive participants:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-300 text-xs sm:text-sm">
            <li><strong>Automated Random Selection:</strong> Lucky Draw winners are chosen using an audited pseudorandom number algorithm operating over active tickets stored in the database.</li>
            <li><strong>Bot Prohibition:</strong> Automated scripts, bots, fake emails, or manipulated transaction payloads are strictly prohibited. Accounts engaging in suspicious activity will be permanently banned and associated passes invalidated.</li>
            <li><strong>Winner Verification & KYC:</strong> For high-value prizes (such as the iPhone 16 Pro, 10g Gold Coins, and Electric Scooters), the winner must verify their identity with a government-issued photo ID (Aadhaar or PAN Card) matching their registered account profile.</li>
            <li><strong>Tax Deductions (TDS):</strong> Winnings from promotional lucky draws exceeding statutory limits are subject to Tax Deducted at Source (TDS) under Section 194B of the Indian Income Tax Act. Winners are responsible for applicable taxes as mandated by law.</li>
          </ul>
        </section>

        {/* Section 5: Limitation of Liability */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-festive-royalRed border border-festive-gold/40 flex items-center justify-center text-festive-gold font-bold text-xs">
              05
            </div>
            <h3 className="text-lg font-bold text-white font-royal">
              Limitation of Liability
            </h3>
          </div>
          <p>
            In no event shall DiwaliDhamaka11, its founders, directors, employees, or technological partners be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use the service, server downtime, banking network latency, or partner coupon redemption issues.
          </p>
          <p>
            Our total aggregate liability for any claim arising out of an order is strictly capped at the actual amount paid by you for that specific transaction (i.e. ₹11.00 INR).
          </p>
        </section>

        {/* Section 6: Governing Law */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-festive-royalRed border border-festive-gold/40 flex items-center justify-center text-festive-gold font-bold text-xs">
              06
            </div>
            <h3 className="text-lg font-bold text-white font-royal">
              Governing Law & Dispute Resolution
            </h3>
          </div>
          <p>
            These terms are governed by and construed in accordance with the substantive laws of India. Any legal dispute, controversy, or claim arising out of these terms shall be subject to the exclusive jurisdiction of the competent civil courts situated at Bengaluru, Karnataka, India.
          </p>
        </section>

        {/* Section 7: Agreement Acknowledgement */}
        <section className="pt-4 border-t border-festive-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            By proceeding with an ₹11 payment on our platform, you acknowledge that you have read, understood, and agreed to these Terms and Disclaimers.
          </p>
          <Link
            to="/privacy-policy"
            className="text-festive-gold font-bold text-xs underline hover:text-festive-goldGlow shrink-0"
          >
            View Privacy Policy →
          </Link>
        </section>
      </div>
    </div>
  );
};

export default TermsDisclaimerPage;
