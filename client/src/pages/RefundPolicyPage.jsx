import React from 'react';
import { Link } from 'react-router-dom';
import { DiyaIcon } from '../components/DiyaSparkles';
import {
  RefreshCw,
  ShieldCheck,
  AlertCircle,
  Clock,
  CheckCircle2,
  HelpCircle,
  Mail,
  ArrowRight,
  FileText,
} from 'lucide-react';

const RefundPolicyPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-festive-royalRed/60 border border-festive-gold/40 text-festive-goldLight text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
          <RefreshCw className="w-4 h-4 text-festive-goldGlow" />
          <span>Payment & Merchant Compliance</span>
        </div>
        <h1 className="font-royal text-3xl sm:text-5xl font-extrabold text-white tracking-wide">
          Return, Cancellation & <span className="text-gold-gradient">Refund Policy</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
          Clear, transparent, and fair policies for ₹11 festive coupon purchases, digital promo vouchers, and lucky draw passes on DiwaliDhamaka11.
        </p>
        <p className="text-xs text-festive-goldLight/70 mt-2">
          Last Updated: Diwali Season 2026 | Compliant with Indian Consumer Protection (E-Commerce) Rules
        </p>
      </div>

      {/* Quick Summary Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="glass-card p-5 rounded-2xl border border-festive-gold/30 text-center">
          <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center mx-auto mb-3 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white mb-1">Failed Payment Refund</h4>
          <p className="text-xs text-slate-300">
            Auto-refunded to source account within <strong>5 to 7 business days</strong> via Razorpay.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-festive-gold/30 text-center">
          <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/50 flex items-center justify-center mx-auto mb-3 text-festive-amber">
            <Clock className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white mb-1">Digital Delivery</h4>
          <p className="text-xs text-slate-300">
            Instant code generation & ticket activation in <strong>My Vault</strong> upon ₹11 confirmation.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-festive-gold/30 text-center">
          <div className="w-10 h-10 rounded-xl bg-festive-royalRed/80 border border-festive-gold/40 flex items-center justify-center mx-auto mb-3 text-festive-gold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white mb-1">Grievance Support</h4>
          <p className="text-xs text-slate-300">
            24/7 dedicated support desk with <strong>48-hour resolution commitment</strong>.
          </p>
        </div>
      </div>

      {/* Policy Details Container */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-festive-gold/40 shadow-gold-glow space-y-8 text-slate-200 text-sm leading-relaxed">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-festive-royalRed border border-festive-gold/40 flex items-center justify-center text-festive-gold font-bold text-xs">
              01
            </div>
            <h3 className="text-lg font-bold text-white font-royal">
              Nature of Services & Digital Offer Passes
            </h3>
          </div>
          <p>
            DiwaliDhamaka11 (operated by DiwaliDhamaka11 Technologies Private Limited) provides users with promotional digital coupons, partner brand discount vouchers, and entry passes for the Diwali Bumper Lucky Draw for a nominal festive shagun fee of <strong>₹11.00 (inclusive of applicable GST)</strong> per entry.
          </p>
          <p>
            All coupons, passes, and promotional voucher codes purchased on the platform are <strong>intangible digital goods</strong> delivered instantly and automatically to your account’s <em>"My Vault"</em> upon successful transaction confirmation.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-festive-royalRed border border-festive-gold/40 flex items-center justify-center text-festive-gold font-bold text-xs">
              02
            </div>
            <h3 className="text-lg font-bold text-white font-royal">
              Cancellation & Non-Refundability of Active Passes
            </h3>
          </div>
          <p>
            Because unique voucher codes and lottery ticket serial numbers (e.g., <code className="text-festive-gold font-mono">DIWALI-2026-XXXXXX</code>) are generated and entered into the tamper-proof Lucky Draw pool immediately upon payment:
          </p>
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Standard Non-Refundability Policy</span>
            </div>
            <p>
              Once a payment is successfully completed and the unique lottery coupon code has been generated and displayed in your vault, the ₹11 order <strong>cannot be cancelled, returned, or refunded</strong>, as the lucky draw entry becomes active and legally binding for the prize draw.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-festive-royalRed border border-festive-gold/40 flex items-center justify-center text-festive-gold font-bold text-xs">
              03
            </div>
            <h3 className="text-lg font-bold text-white font-royal">
              Exceptions & Conditions Where Refunds Are Granted
            </h3>
          </div>
          <p>
            We take customer satisfaction and fair business practices seriously. A full 100% refund of ₹11.00 will be initiated under the following specific circumstances:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-300 text-xs sm:text-sm">
            <li>
              <strong>Payment Deducted but Pass Not Generated:</strong> If money was debited from your bank account, credit/debit card, or UPI app, but due to a network glitch or server disruption the ticket was not created in your Vault, Razorpay’s reconciliation system will automatically refund the full amount.
            </li>
            <li>
              <strong>Duplicate / Multiple Deductions:</strong> If you were charged more than once for a single ₹11 ticket purchase due to gateway latency or multiple button clicks, all excess deductions will be refunded immediately without any cancellation fee.
            </li>
            <li>
              <strong>Unauthorized Fraudulent Transactions:</strong> In the event of confirmed unauthorized use of payment credentials, upon verification with Razorpay and your issuing bank.
            </li>
            <li>
              <strong>Partner Brand Invalidation:</strong> If a specific partner discount code is proven non-functional on the partner's official portal during its valid validity window and our support team cannot issue a replacement code within 48 hours.
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-festive-royalRed border border-festive-gold/40 flex items-center justify-center text-festive-gold font-bold text-xs">
              04
            </div>
            <h3 className="text-lg font-bold text-white font-royal">
              Refund Timeline & Processing Method
            </h3>
          </div>
          <p>
            All eligible refunds are processed strictly to the <strong>original payment method</strong> used during checkout (Original UPI ID, Debit/Credit Card, or Netbanking account). No cash or third-party transfers are permitted under RBI regulations.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-festive-gold/30 rounded-xl overflow-hidden">
              <thead className="bg-festive-royalRed/60 text-festive-gold font-bold">
                <tr>
                  <th className="p-3 border-b border-festive-gold/30">Payment Mode</th>
                  <th className="p-3 border-b border-festive-gold/30">Refund Initiation</th>
                  <th className="p-3 border-b border-festive-gold/30">Expected Bank Credit Timeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-festive-gold/20">
                <tr>
                  <td className="p-3 font-semibold text-white">UPI (Google Pay, PhonePe, Paytm, BHIM)</td>
                  <td className="p-3">Within 24 Hours</td>
                  <td className="p-3 text-emerald-400 font-bold">Instant to 48 Hours</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Debit / Credit Cards (Visa, Mastercard, RuPay)</td>
                  <td className="p-3">Within 24 Hours</td>
                  <td className="p-3 text-emerald-400 font-bold">5 to 7 Working Days</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Netbanking (SBI, HDFC, ICICI, etc.)</td>
                  <td className="p-3">Within 24 Hours</td>
                  <td className="p-3 text-emerald-400 font-bold">3 to 5 Working Days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-festive-royalRed border border-festive-gold/40 flex items-center justify-center text-festive-gold font-bold text-xs">
              05
            </div>
            <h3 className="text-lg font-bold text-white font-royal">
              How to Raise a Refund Request
            </h3>
          </div>
          <p>
            To submit a claim or dispute regarding an ₹11 transaction, please follow these steps:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-slate-300 text-xs sm:text-sm">
            <li>
              Visit our <Link to="/contact" className="text-festive-gold font-bold underline hover:text-festive-goldGlow">Contact Us / Grievance Page</Link> or send an email to <a href="mailto:refunds@diwalidhamaka11.com" className="text-festive-gold font-bold underline">refunds@diwalidhamaka11.com</a>.
            </li>
            <li>
              Include your <strong>Registered Email Address</strong>, <strong>Razorpay Payment ID</strong> (starts with <code className="text-slate-100 font-mono">pay_...</code>, visible in your profile receipt), and a brief explanation with bank SMS/screenshot if applicable.
            </li>
            <li>
              Our compliance team will acknowledge your request within <strong>4 hours</strong> and resolve the matter within <strong>48 hours</strong>.
            </li>
          </ol>
        </section>

        {/* Section 6: Grievance Desk */}
        <section className="pt-4 border-t border-festive-gold/20">
          <div className="p-4 sm:p-6 rounded-2xl bg-festive-royalRed/20 border border-festive-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-bold text-white text-base">Have questions about your ₹11 transaction?</h4>
              <p className="text-xs text-slate-300">
                Our festive payment support desk is available 24/7 to assist you.
              </p>
            </div>
            <Link
              to="/contact"
              className="py-2.5 px-5 rounded-xl bg-festive-button text-festive-dark font-black text-xs sm:text-sm shadow-gold-glow hover:opacity-95 transition flex items-center gap-2 shrink-0"
            >
              <Mail className="w-4 h-4 text-festive-dark" />
              <span>Contact Support Desk</span>
              <ArrowRight className="w-4 h-4 text-festive-dark" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
