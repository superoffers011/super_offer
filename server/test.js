
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function testEmail() {
    try {
        // Verify SMTP configuration
        await transporter.verify();
        console.log("SMTP connection successful!");

        // Send a test email
        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_USER,
            subject: "DiwaliDhamaka11 - Email Test",
            text: "Congratulations! Your Gmail SMTP configuration is working correctly.",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2 style="color: #ff6600;">DiwaliDhamaka11</h2>
                    <p>Your email service is working correctly!</p>
                    <p>You can now use Nodemailer to send OTPs and verification emails.</p>
                    <p>Happy Diwali! 🎉</p>
                </div>
            `
        });

        console.log("Email sent successfully!");
        console.log("Message ID:", info.messageId);

    } catch (error) {
        console.error("Email test failed:", error.message);
    }
}

testEmail();
