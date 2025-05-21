import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Test endpoint
router.get("/test", (req, res) => {
  res.json({ message: "Newsletter API is working!" });
});

// Log email configuration (without exposing the password)
console.log("Email configuration check:", {
  hasEmailUser: !!process.env.EMAIL_USER,
  hasEmailPass: !!process.env.EMAIL_PASS,
});

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log("Transporter verification error:", error);
  } else {
    console.log("Server is ready to send emails");
  }
});

// Newsletter subscription endpoint
router.post("/subscribe", async (req, res) => {
  console.log("Received subscription request:", { email: req.body.email });

  try {
    const { email } = req.body;

    if (!email) {
      console.log("Email validation failed: No email provided");
      return res.status(400).json({ message: "Email is required" });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Email configuration missing:", {
        hasEmailUser: !!process.env.EMAIL_USER,
        hasEmailPass: !!process.env.EMAIL_PASS,
      });
      return res
        .status(500)
        .json({ message: "Email service configuration error" });
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Forever Newsletter!",
      html: `
        <h1>Welcome to Forever!</h1>
        <p>Thank you for subscribing to our newsletter. You'll now receive updates about our latest products and exclusive offers.</p>
        <p>As a welcome gift, you get 20% off on your next purchase!</p>
        <p>Use code: <strong>WELCOME20</strong></p>
        <br>
        <p>Best regards,</p>
        <p>The Forever Team</p>
      `,
    };

    console.log("Attempting to send email to:", email);

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);

    res.status(200).json({ message: "Subscription successful!" });
  } catch (error) {
    console.error("Detailed newsletter subscription error:", {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack,
    });

    // More specific error messages based on the error type
    if (error.code === "EAUTH") {
      return res.status(500).json({
        message:
          "Email authentication failed. Please check email configuration.",
        details: "Invalid email credentials",
      });
    }
    if (error.code === "ESOCKET") {
      return res.status(500).json({
        message: "Network error. Please check your internet connection.",
        details: "Connection failed",
      });
    }

    res.status(500).json({
      message: "Failed to subscribe to newsletter. Please try again later.",
      details: error.message,
    });
  }
});

export default router;
