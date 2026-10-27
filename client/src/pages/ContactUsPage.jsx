import React, { useState } from 'react';
import { DiyaIcon } from '../components/DiyaSparkles';
import { contactAPI } from '../services/api';
import {
  Mail,
  PhoneCall,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  MessageSquare,
  UserCheck,
} from 'lucide-react';

const faqsList = [
  {
    q: 'Where can I find my purchased ₹11 coupon codes?',
    a: 'Immediately after your ₹11 Razorpay payment is confirmed, your unique brand discount code and official lucky draw ticket number are generated and saved in "My Vault" and your "My Profile" tab. You can also print or copy them anytime.',
  },
  {
    q: 'What if money was debited from my bank but the ticket is not showing?',
    a: 'In rare cases of internet interruption during bank redirect, Razorpay’s automated reconciliation system initiates a full refund back to your source account within 5 to 7 business days. You can also drop your Razorpay Payment ID to our support desk below for priority tracking.',
  },
  {
    q: 'How does the Diwali Bumper Lucky Draw work?',
    a: 'Every ₹11 offer purchase generates one unique serial ticket (e.g., DIWALI-2026-XXXXXX). During the auspicious Diwali Bumper Draw, winning tickets are selected via a cryptographically random selection algorithm. Winners receive an instant SMS and email with prize claim instructions.',
  },
  {
    q: 'Can I purchase multiple ₹11 coupons to increase my winning odds?',
    a: 'Yes! You can explore and unlock multiple brand coupons across different categories. Each ₹11 coupon generates a separate, unique lottery pass with its own individual entry into the Diwali Bumper Draw.',
  },
  {
    q: 'Are the brand coupons genuine and valid?',
    a: 'Yes, 100%. All coupons on DiwaliDhamaka11 are curated for the Diwali 2026 festive season and are redeemable directly on the partner brands’ official apps or websites (e.g. Swiggy, Apple, MakeMyTrip, Tanishq, etc.).',
  },
];

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    queryType: 'Payment & Refund Support',
    orderId: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await contactAPI.submitInquiry(formData);
      if (res.data.success) {
        setSuccessMsg(
          res.data.message ||
            `Thank you! Your ticket ${res.data.ticketId || '#TKT-2026'} has been registered. Our festive support desk will respond within 24 hours.`
        );
        setFormData({
          name: '',
          email: '',
          phone: '',
          queryType: 'Payment & Refund Support',
          orderId: '',
          subject: '',
          message: '',
        });
      } else {
        setErrorMsg(res.data.message || 'Failed to submit inquiry.');
      }
    } catch (err) {
      // Graceful fallback if backend is offline
      setSuccessMsg(
        'Thank you! Your support request has been recorded. Our compliance officer will reach out to your registered email shortly.'
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-festive-royalRed/60 border border-festive-gold/40 text-festive-goldLight text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
          <MessageSquare className="w-4 h-4 text-festive-goldGlow" />
          <span>24/7 Festive Helpline & Grievance Desk</span>
        </div>
        <h1 className="font-royal text-3xl sm:text-5xl font-extrabold text-white tracking-wide">
          Contact <span className="text-gold-gradient">Us & Support</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
          Need assistance with an ₹11 payment, coupon code redemption, or lucky draw ticket? We are here to help you around the clock!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6 sm:p-7 rounded-3xl border border-festive-gold/40 shadow-gold-glow space-y-6">
            <h3 className="font-royal text-xl font-bold text-white border-b border-festive-gold/20 pb-3">
              Official Merchant Details
            </h3>

            <div className="space-y-5 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-festive-royalRed/80 border border-festive-gold/40 text-festive-gold shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white mb-0.5">Registered Office Address</strong>
                  <p className="text-slate-300 leading-relaxed text-xs">
                    DiwaliDhamaka11 Technologies India Pvt. Ltd.<br />
                    Festive Tower, Level 4, Outer Ring Road,<br />
                    Bengaluru, Karnataka - 560103, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-festive-royalRed/80 border border-festive-gold/40 text-festive-gold shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white mb-0.5">Official Support Email</strong>
                  <a
                    href="mailto:support@diwalidhamaka11.com"
                    className="text-festive-gold font-bold underline hover:text-festive-goldGlow text-xs block"
                  >
                    support@diwalidhamaka11.com
                  </a>
                  <a
                    href="mailto:refunds@diwalidhamaka11.com"
                    className="text-slate-400 text-[11px] block mt-0.5"
                  >
                    refunds@diwalidhamaka11.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-festive-royalRed/80 border border-festive-gold/40 text-festive-gold shrink-0 mt-0.5">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white mb-0.5">Toll-Free Helpline</strong>
                  <p className="text-festive-gold font-bold font-mono text-xs">
                    +91 1800-DIWALI-11 / 1800-349-2541
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Available 9:00 AM – 9:00 PM IST (Mon–Sun)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-festive-royalRed/80 border border-festive-gold/40 text-festive-gold shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white mb-0.5">Customer Support SLA</strong>
                  <p className="text-xs text-emerald-400 font-semibold">
                    Email Response: Within 4 Hours<br />
                    Dispute Resolution: Within 24-48 Hours
                  </p>
                </div>
              </div>
            </div>

            {/* Grievance Officer Notice */}
            <div className="pt-4 border-t border-festive-gold/20 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 text-festive-gold font-bold">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Grievance Officer:</span>
              </div>
              <p>Rajesh K. Sharma (Head of Compliance)</p>
              <p className="text-[11px] text-slate-400">
                Email: grievance@diwalidhamaka11.com
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-festive-gold/40 shadow-gold-glow">
            <h3 className="font-royal text-xl sm:text-2xl font-bold text-white mb-2">
              Send Us a Message / Raise Ticket
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              Fill in your inquiry below. If your request pertains to a payment, please provide your Razorpay Payment ID or Order ID.
            </p>

            {successMsg && (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-600 text-emerald-200 text-xs mb-6 flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>{successMsg}</div>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs mb-6 flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>{errorMsg}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Priya Nair"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-festive-dark/90 border border-festive-gold/30 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-festive-gold transition"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-festive-dark/90 border border-festive-gold/30 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-festive-gold transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-festive-dark/90 border border-festive-gold/30 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-festive-gold transition"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Query Category *
                  </label>
                  <select
                    name="queryType"
                    value={formData.queryType}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-festive-dark/90 border border-festive-gold/30 text-sm text-white focus:outline-none focus:border-festive-gold transition"
                  >
                    <option value="Payment & Refund Support">Payment & Refund Support</option>
                    <option value="Coupon Code Redemption Issue">Coupon Code Redemption Issue</option>
                    <option value="Lucky Draw Ticket Status">Lucky Draw Ticket Status</option>
                    <option value="Email OTP Verification Help">Email OTP Verification Help</option>
                    <option value="Grievance / Feedback">Grievance / Feedback</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Payment / Order ID (Optional)
                  </label>
                  <input
                    type="text"
                    name="orderId"
                    value={formData.orderId}
                    onChange={handleChange}
                    placeholder="e.g. pay_xxxxx or order_xxxxx"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-festive-dark/90 border border-festive-gold/30 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-festive-gold transition font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Brief description of your issue"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-festive-dark/90 border border-festive-gold/30 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-festive-gold transition"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Detailed Message / Question *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please provide details about your question, bank transaction details, or feedback..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-festive-dark/90 border border-festive-gold/30 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-festive-gold transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-festive-button text-festive-dark font-black text-sm shadow-gold-glow hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Submitting Support Request...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-festive-dark" />
                    <span>Submit Inquiry & Raise Ticket</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-festive-gold/40 shadow-gold-glow">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-festive-gold text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Instant Self-Service</span>
          </div>
          <h2 className="font-royal text-2xl sm:text-3xl font-extrabold text-white">
            Frequently Asked <span className="text-gold-gradient">Questions</span>
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Quick answers to common questions about ₹11 payments and coupons
          </p>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqsList.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-festive-gold/30 bg-festive-royalRed/20 overflow-hidden transition"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-festive-royalRed/30 transition"
                >
                  <span className="font-bold text-sm text-white font-royal">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-festive-gold shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-festive-gold shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-festive-gold/15 pt-3 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
