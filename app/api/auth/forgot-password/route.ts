import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendEmail } from "@/lib/nodemailer"; // assuming this exists and is configured

export async function POST(request: Request) {
  try {
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
    const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour from now

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
    await sendEmail({
      to: admin.email,
      subject: "Paperstery Admin - Password Reset",
      html: `
        <h2>Password Reset Request</h2>
        <p>You requested a password reset for your Paperstery Admin account.</p>
        <p>Click the link below to securely reset your password. This link is valid for 1 hour.</p>
        <a href="${resetUrl}" style="display:inline-block;padding:10px 20px;background-color:#4F46E5;color:white;text-decoration:none;border-radius:5px;margin-top:10px;">Reset Password</a>
        <p style="margin-top:20px;font-size:12px;color:gray;">If you did not request this, please ignore this email.</p>
      `,
    });

    return NextResponse.json({ success: true, message: "If the email is highly recognized, a reset link will be sent." });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
