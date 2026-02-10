import { NextRequest, NextResponse } from "next/server";
import { sendEmail, emailTemplates } from "@/lib/nodemailer";
import { saveSubscription, getSubscription } from "@/lib/db-services";

export async function POST(request: NextRequest) {
  try {
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

    // Send confirmation email to subscriber
    const template = emailTemplates.subscription(email);
    await sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
      text: template.text,
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
