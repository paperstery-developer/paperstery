import { NextRequest, NextResponse, after } from "next/server";
import { sendEmail, emailTemplates } from "@/lib/nodemailer";
import { saveContactForm } from "@/lib/db-services";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const rateLimitResponse = await checkRateLimit(request, 5, "contact");
    if (rateLimitResponse) return rateLimitResponse;

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

    // Offload emails to background
    after(async () => {
      try {
        // Send email to admin
        const adminTemplate = emailTemplates.contact(name, message);
        await sendEmail({
          to: [
            process.env.ADMIN_EMAIL ? `Admin <${process.env.ADMIN_EMAIL}>` : null,
            process.env.SUPPORT_EMAIL ? `Support <${process.env.SUPPORT_EMAIL}>` : null,
          ].filter(Boolean) as string[],
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
      } catch (err) {
        console.error("Background email error (contact):", err);
      }
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const skip = (page - 1) * limit;

    const [contacts, total] = await Promise.all([
      prisma.contactForm.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.contactForm.count(),
    ]);

    return NextResponse.json({
      contacts,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 },
    );
  }
}
