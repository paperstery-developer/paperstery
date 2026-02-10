import nodemailer from "nodemailer";

// Initialize nodemailer transporter
// Supports Gmail, Outlook, or any SMTP service
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      ...options,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
}

// Email templates
export const emailTemplates = {
  subscription: (email: string) => ({
    subject: "Welcome to Paperstery!",
    html: `
      <h2>Thank you for subscribing!</h2>
      <p>Welcome to Paperstery community.</p>
      <p>We'll keep you updated with the latest news and offerings.</p>
      <p>Best regards,<br>Paperstery Team</p>
    `,
    text: "Thank you for subscribing to Paperstery!",
  }),

  contact: (name: string, message: string) => ({
    subject: "New Contact Form Submission",
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  }),

  contactConfirmation: (name: string) => ({
    subject: "We received your message",
    html: `
      <h2>Thank you for contacting us, ${name}!</h2>
      <p>We have received your message and will get back to you soon.</p>
      <p>Best regards,<br>Paperstery Team</p>
    `,
    text: "Thank you for contacting us. We will get back to you soon.",
  }),

  manuscript: (author: string, title: string) => ({
    subject: "Manuscript Submission Received",
    html: `
      <h2>Manuscript Submission Confirmation</h2>
      <p><strong>Author:</strong> ${author}</p>
      <p><strong>Title:</strong> ${title}</p>
      <p>Thank you for submitting your manuscript. Our editorial team will review it and contact you soon.</p>
      <p>Best regards,<br>Paperstery Editorial Team</p>
    `,
  }),

  blog: (author: string, title: string) => ({
    subject: "Blog Post Submission Received",
    html: `
      <h2>Blog Post Submission Confirmation</h2>
      <p><strong>Author:</strong> ${author}</p>
      <p><strong>Title:</strong> ${title}</p>
      <p>Thank you for submitting your blog post. Our team will review it and publish it soon.</p>
      <p>Best regards,<br>Paperstery Blog Team</p>
    `,
  }),
};
