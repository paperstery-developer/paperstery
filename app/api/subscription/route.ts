import { NextRequest, NextResponse, after } from "next/server";
import { sendEmail, emailTemplates } from "@/lib/nodemailer";
import { prisma } from "@/lib/prisma";
import { saveSubscription, getSubscription } from "@/lib/db-services";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const rateLimitResponse = await checkRateLimit(request, 5, "subscription");
    if (rateLimitResponse) return rateLimitResponse;

    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 },
      );
    }

    // Check if email already subscribed
    const existingSubscription = await getSubscription(email);

    if (existingSubscription) {
      return NextResponse.json(
        { error: "Email already subscribed" },
        { status: 400 },
      );
    }

    // Save to database
    await saveSubscription(email);

    // Offload emails to background
    after(async () => {
      try {
        // Send confirmation email to subscriber
        const template = emailTemplates.subscription(email);
        await sendEmail({
          to: email,
          subject: template.subject,
          html: template.html,
          text: template.text,
        });
      } catch (err) {
        console.error("Background email error (subscription):", err);
      }
    });

    return NextResponse.json(
      { message: "Successfully subscribed", email },
      { status: 200 },
    );
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { error: "Failed to process subscription" },
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

    const [subscriptions, total] = await Promise.all([
      prisma.subscription.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.subscription.count(),
    ]);

    return NextResponse.json({
      subscriptions,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch subscriptions" },
      { status: 500 },
    );
  }
}
