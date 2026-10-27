const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
  const user = process.env.EMAIL_USER || process.env.SMTP_USER;
  const pass = process.env.EMAIL_PASS || process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  // Clean password (remove spaces if user copied from Google App Password formatted like 'xxxx xxxx xxxx xxxx')
  const cleanPass = pass.replace(/\s+/g, '');

  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: user.trim(),
        pass: cleanPass,
      },
    });
  }

  // Default to Gmail service if host not specified
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user.trim(),
      pass: cleanPass,
    },
  });
};

/**
 * Send real 6-digit Email OTP for user verification
 */
const sendOtpEmail = async ({ toEmail, name, otp }) => {
  const transporter = createTransporter();

  const festiveHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your DiwaliDhamaka11 OTP</title>
      <style>
        body { margin: 0; padding: 0; background-color: #1A0507; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FFFFFF; }
        .wrapper { width: 100%; max-width: 580px; margin: 30px auto; background: #2A080D; border: 2px solid #D4AF37; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(212, 175, 55, 0.2); }
        .header { background: linear-gradient(135deg, #4A0E17 0%, #1A0507 100%); padding: 35px 25px; text-align: center; border-bottom: 2px solid #D4AF37; }
        .logo { font-size: 26px; font-weight: 900; letter-spacing: 1px; color: #FFD700; text-transform: uppercase; margin: 0; }
        .tagline { color: #F5E6BE; font-size: 13px; margin-top: 6px; letter-spacing: 0.5px; }
        .content { padding: 35px 30px; text-align: center; background-color: #24060A; }
        .greeting { font-size: 20px; font-weight: 700; color: #FFFFFF; margin-bottom: 12px; }
        .desc { font-size: 14px; color: #D1D5DB; line-height: 1.6; margin-bottom: 25px; }
        .otp-container { background: linear-gradient(135deg, #3A0810, #1A0507); border: 2px dashed #FFD700; border-radius: 16px; padding: 22px; margin: 20px 0 30px; display: inline-block; width: 85%; }
        .otp-code { font-family: 'Courier New', Courier, monospace; font-size: 40px; font-weight: 900; letter-spacing: 10px; color: #FFD700; margin: 0; text-shadow: 0 0 12px rgba(255, 215, 0, 0.4); }
        .expiry { font-size: 12px; color: #FBBF24; margin-top: 10px; font-weight: 600; }
        .footer { background: #150305; padding: 22px; text-align: center; font-size: 11px; color: #9CA3AF; border-top: 1px solid rgba(212, 175, 55, 0.2); }
        .security-note { color: #EF4444; font-size: 11px; margin-top: 15px; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1 class="logo">🪔 DiwaliDhamaka11</h1>
          <div class="tagline">Exclusive ₹11 Festive Offers & Bumper Lucky Draw</div>
        </div>
        <div class="content">
          <div class="greeting">Shubh Deepawali, ${name || 'Festive Shopper'}! ✨</div>
          <div class="desc">
            Thank you for registering on <strong>DiwaliDhamaka11</strong>. Please use the 6-digit One-Time Password (OTP) below to verify your email address and activate your session:
          </div>
          <div class="otp-container">
            <div class="otp-code">${otp}</div>
            <div class="expiry">⏳ Valid for 10 minutes only</div>
          </div>
          <div class="desc" style="font-size: 13px;">
            Once verified, you can immediately browse 100+ curated festive deals and grab ₹11 passes for our Diwali Bumper Lucky Draw!
          </div>
          <div class="security-note">
            ⚠️ <strong>Security Advisory:</strong> Never share this OTP with anyone. Our team will never ask for your code or password.
          </div>
        </div>
        <div class="footer">
          © 2026 DiwaliDhamaka11. All rights reserved.<br>
          This is an automated security verification email.
        </div>
      </div>
    </body>
    </html>
  `;

  if (!transporter) {
    console.warn(`
    ⚠️ [REAL EMAIL WARNING] EMAIL_USER / EMAIL_PASS (or SMTP credentials) not configured in server/.env.
    Please set EMAIL_USER and EMAIL_PASS to deliver real emails to inbox!
    ➡️ Dispatched OTP for ${toEmail}: [ ${otp} ]
    `);
    return { sent: false, reason: 'SMTP not configured in .env' };
  }

  try {
    const fromAddress = process.env.EMAIL_FROM || `"DiwaliDhamaka11" <${process.env.EMAIL_USER || process.env.SMTP_USER}>`;
    const info = await transporter.sendMail({
      from: fromAddress,
      to: toEmail,
      subject: `🪔 Your DiwaliDhamaka11 Verification Code: ${otp}`,
      html: festiveHtml,
    });

    console.log(`✨ [Real Email Dispatched] OTP successfully sent to ${toEmail}. Message ID: ${info.messageId}`);
    return { sent: true, messageId: info.messageId };
  } catch (error) {
    console.error(`❌ [Real Email Dispatch Error]:`, error.message);
    return { sent: false, error: error.message };
  }
};

/**
 * Send real Ticket & Lucky Draw confirmation email upon successful ₹11 purchase
 */
const sendTicketConfirmationEmail = async ({ toEmail, name, couponNumber, offerTitle, brandName, unlockedCouponCode }) => {
  const transporter = createTransporter();
  if (!transporter) return;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Your ₹11 Diwali Lucky Draw Ticket</title>
      <style>
        body { margin: 0; padding: 0; background-color: #1A0507; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #FFFFFF; }
        .wrapper { width: 100%; max-width: 580px; margin: 30px auto; background: #2A080D; border: 2px solid #D4AF37; border-radius: 20px; overflow: hidden; }
        .header { background: #4A0E17; padding: 30px; text-align: center; border-bottom: 2px solid #D4AF37; }
        .content { padding: 30px; text-align: center; }
        .pass-box { background: #1A0507; border: 2px dashed #D4AF37; border-radius: 14px; padding: 20px; margin: 20px 0; }
        .ticket-no { font-family: monospace; font-size: 26px; font-weight: bold; color: #FFD700; letter-spacing: 2px; }
        .promo-box { background: #3A0810; border-radius: 10px; padding: 15px; margin-top: 15px; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1 style="color: #FFD700; margin: 0;">🎉 Payment Confirmed (₹11.00)</h1>
          <p style="color: #F5E6BE; margin: 5px 0 0;">Diwali Bumper Lucky Draw 2026</p>
        </div>
        <div class="content">
          <p>Hi <strong>${name}</strong>, your ₹11 payment was successfully processed!</p>
          <div class="pass-box">
            <div style="font-size: 12px; color: #D1D5DB; margin-bottom: 6px;">OFFICIAL LUCKY DRAW PASS NUMBER:</div>
            <div class="ticket-no">${couponNumber}</div>
            <div style="font-size: 11px; color: #10B981; margin-top: 6px;">● Active & Eligible for Bumper Draw</div>
          </div>
          <div class="promo-box">
            <div><strong>Unlocked Deal:</strong> ${offerTitle} (${brandName})</div>
            <div style="margin-top: 8px;"><strong>Brand Promo Code:</strong> <span style="color: #FFD700; font-family: monospace; font-size: 16px;">${unlockedCouponCode}</span></div>
          </div>
          <p style="font-size: 12px; color: #9CA3AF; margin-top: 25px;">
            View and manage all your purchased passes anytime in <strong>My Vault</strong> on the DiwaliDhamaka11 portal.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const fromAddress = process.env.EMAIL_FROM || `"DiwaliDhamaka11" <${process.env.EMAIL_USER || process.env.SMTP_USER}>`;
    await transporter.sendMail({
      from: fromAddress,
      to: toEmail,
      subject: `🪔 Ticket Confirmed: ${couponNumber} - ₹11 Diwali Bumper Draw Entry`,
      html,
    });
    console.log(`✨ [Real Email Dispatched] Ticket confirmation sent to ${toEmail}`);
  } catch (err) {
    console.error('Failed to send ticket email:', err.message);
  }
};

module.exports = {
  sendOtpEmail,
  sendTicketConfirmationEmail,
};
