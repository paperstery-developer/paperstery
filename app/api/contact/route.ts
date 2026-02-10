import { NextRequest, NextResponse } from "next/server";
import { sendEmail, emailTemplates } from "@/lib/nodemailer";
import { saveContactForm } from "@/lib/db-services";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields (name, email, subject, message) are required" },
        { status: 400 },
      );
    }

    // Validate email format
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 },
      );
    }

    // Save to database
    await saveContactForm(name, email, subject, message);

    // Send email to admin
    const adminTemplate = emailTemplates.contact(name, message);
    await sendEmail({
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER || "",
      subject: adminTemplate.subject,
      html: adminTemplate.html,
    });

    // Send confirmation email to user
    const confirmationTemplate = emailTemplates.contactConfirmation(name);
    await sendEmail({
      to: email,
      subject: confirmationTemplate.subject,
      html: confirmationTemplate.html,
      text: confirmationTemplate.text,
    });

    return NextResponse.json(
      { message: "Contact form submitted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process contact form" },
      { status: 500 },
    );
  }
}
