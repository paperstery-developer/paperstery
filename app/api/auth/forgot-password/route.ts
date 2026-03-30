import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendEmail, emailTemplates } from "@/lib/nodemailer";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const rateLimitResponse = await checkRateLimit(request as any, 5, "forgot-password");
    if (rateLimitResponse) return rateLimitResponse;

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    // To prevent email enumeration, we always return success even if email not found
    if (!admin) {
      return NextResponse.json({ success: true, message: "If the email is highly recognized, a reset link will be sent." });
    }

    // Generate a secure reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes from now

    // Save token to database
    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    // Create reset URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || (request.headers.get("origin") ?? "http://localhost:3000");
    const resetUrl = `${baseUrl}/admin/reset-password?token=${resetToken}`;

    // Send email to admin
    const template = emailTemplates.forgotPassword(resetUrl);
    await sendEmail({
      to: admin.email,
      subject: template.subject,
      html: template.html,
    });

    return NextResponse.json({ success: true, message: "If the email is highly recognized, a reset link will be sent." });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
