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
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions) {
  try {
    const mailOptions = {
      from: `"PAPERSTERY" <${process.env.EMAIL_FROM}>`,
      ...options,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
}

// Brand constants
const BRAND_COLOR = "#32007a";
const BRAND_NAME = "Paperstery";
const LOGO_URL = "https://res.cloudinary.com/dwofq1blq/image/upload/v1772991313/logo-with-bg_fvmtre.png";
const WEBSITE_URL = "https://paperstery.com";
const CONTACT_EMAIL = "mailto:info@paperstery.com";

const emailLayout = (content: string, title: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden; }
    .header { 
      background-image: url('${LOGO_URL}'); 
      background-size: cover; 
      background-position: center; 
      background-repeat: no-repeat;
      height: 150px; 
      border-bottom: 1px solid #f0f0f0; 
    }
    .content { padding: 40px 30px; background: #fff; }
    .footer { background: #f9fafb; padding: 30px; text-align: center; color: #6b7280; font-size: 14px; border-top: 1px solid #f0f0f0; }
    .button { display: inline-block; padding: 12px 24px; background: ${BRAND_COLOR}; color: #ffffff !important; text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 20px; }
    h1 { color: #111827; font-size: 24px; font-weight: 700; margin-bottom: 20px; }
    p { margin-bottom: 16px; font-size: 16px; color: #4b5563; }
    .divider { height: 1px; background: #e5e7eb; margin: 30px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header" role="img" aria-label="${BRAND_NAME} Logo">
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved.</p>
      <p>Elevating Authorship and Publishing Excellence.</p>
      <div style="margin-top: 15px;">
        <a href=${WEBSITE_URL} style="color: ${BRAND_COLOR}; margin: 0 10px; text-decoration: none;">Website</a>
        <a href=${CONTACT_EMAIL} style="color: ${BRAND_COLOR}; margin: 0 10px; text-decoration: none;">Contact Us</a>
      </div>
    </div>
  </div>
</body>
</html>
`;

// Email templates
export const emailTemplates = {
  subscription: (email: string) => ({
    subject: `Welcome to ${BRAND_NAME}!`,
    html: emailLayout(`
      <h1>Welcome to the Community!</h1>
      <p>Thank you for subscribing to ${BRAND_NAME}. We're thrilled to have you with us.</p>
      <p>You'll be the first to receive our latest updates, publishing tips, and exclusive insights from the world of books.</p>
      <div class="divider"></div>
      <p>If you have any questions, feel free to reply to this email.</p>
      <p>Best regards,<br>The ${BRAND_NAME} Team</p>
    `, "Welcome to Paperstery"),
    text: `Thank you for subscribing to ${BRAND_NAME}! Welcome to our community.`,
  }),

  contact: (name: string, message: string) => ({
    subject: `New Message from ${name}`,
    html: emailLayout(`
      <h1>New Inquiry Received</h1>
      <p>You've received a new message through the ${BRAND_NAME} website.</p>
      <div style="background: #f3f4f6; padding: 20px; border-radius: 6px; margin: 20px 0;">
        <p><strong>Sender:</strong> ${name}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
      <p>Please respond promptly to the user's inquiry.</p>
    `, "New Contact Form Submission"),
  }),

  contactConfirmation: (name: string) => ({
    subject: "Message Received - Paperstery",
    html: emailLayout(`
      <h1>Hello ${name},</h1>
      <p>Thank you for reaching out to ${BRAND_NAME}. This is to confirm that we've received your message.</p>
      <p>Our team will review your inquiry and get back to you as soon as possible.</p>
      <div class="divider"></div>
      <p>Best regards,<br>The ${BRAND_NAME} Team</p>
    `, "We received your message"),
    text: `Hello ${name}, thank you for contacting Paperstery. We have received your message and will get back to you soon.`,
  }),

  manuscript: (author: string, title: string) => ({
    subject: "Manuscript Submission Received",
    html: emailLayout(`
      <h1>Submission Received!</h1>
      <p>Dear ${author},</p>
      <p>Thank you for submitting your manuscript titled <strong>"${title}"</strong> to ${BRAND_NAME}.</p>
      <p>Our editorial team has received your document and will begin the initial review process. We understand the importance of your work and will evaluate it carefully.</p>
      <p>You will hear from us regarding the next steps soon.</p>
      <div class="divider"></div>
      <p>Best regards,<br>The ${BRAND_NAME} Editorial Team</p>
    `, "Manuscript Submission Confirmation"),
  }),

  blog: (author: string, title: string) => ({
    subject: "Blog Post Submission Received",
    html: emailLayout(`
      <h1>Blog Post Received</h1>
      <p>Hello ${author},</p>
      <p>Thank you for submitting your article <strong>"${title}"</strong>.</p>
      <p>Our blog editors will review your submission for publication on the ${BRAND_NAME} platform. We'll notify you once it's live or if any revisions are needed.</p>
      <div class="divider"></div>
      <p>Best regards,<br>The ${BRAND_NAME} Blog Team</p>
    `, "Blog Post Submission Confirmation"),
  }),

  blogAdminNotification: (author: string, email: string, title: string, category: string, contentLength: number) => ({
    subject: `New Blog Post Submission: ${title}`,
    html: emailLayout(`
      <h1>New Blog Post Submission</h1>
      <p>A new blog post has been submitted for review.</p>
      <div style="background: #f3f4f6; padding: 20px; border-radius: 6px; margin: 20px 0;">
        <p><strong>Author:</strong> ${author}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Category:</strong> ${category || "Uncategorized"}</p>
        <p><strong>Content Length:</strong> ${contentLength} characters</p>
      </div>
      <p>Please log in to the admin dashboard to review and publish this post.</p>
    `, "New Blog Post Submision"),
  }),

  manuscriptAdminNotification: (author: string, email: string, title: string, fileName: string, description?: string) => ({
    subject: `New Manuscript Submission: ${title}`,
    html: emailLayout(`
      <h1>New Manuscript Submission</h1>
      <p>A new manuscript has been submitted for review.</p>
      <div style="background: #f3f4f6; padding: 20px; border-radius: 6px; margin: 20px 0;">
        <p><strong>Author:</strong> ${author}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>File:</strong> ${fileName}</p>
        <p><strong>Description:</strong> ${description || "N/A"}</p>
      </div>
      <p>Please log in to the admin dashboard to review this manuscript.</p>
    `, "New Manuscript Submission"),
  }),
  forgotPassword: (resetUrl: string) => ({
    subject: "Reset Your Password - Paperstery",
    html: emailLayout(`
      <h1>Password Reset Request</h1>
      <p>You recently requested to reset your password for your Paperstery account. Click the button below to proceed.</p>
      <a href="${resetUrl}" class="button">Reset Password</a>
      <p>This link will expire in 10 minutes. If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
      <div class="divider"></div>
      <p>If you're having trouble clicking the "Reset Password" button, copy and paste the URL below into your web browser:</p>
      <p style="word-break: break-all; font-size: 14px; color: #6366f1;">${resetUrl}</p>
    `, "Reset Your Password"),
  }),
};
