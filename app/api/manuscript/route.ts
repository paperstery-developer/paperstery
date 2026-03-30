import { NextRequest, NextResponse, after } from "next/server";
import { sendEmail, emailTemplates } from "@/lib/nodemailer";
import { saveManuscript } from "@/lib/db-services";
import { prisma } from "@/lib/prisma";
import {
  uploadToCloudinary,
  type CloudinaryUploadResult,
} from "@/lib/cloudinary";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const rateLimitResponse = await checkRateLimit(request, 3, "manuscript");
    if (rateLimitResponse) return rateLimitResponse;

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const email = formData.get("email") as string;
    const description = formData.get("description") as string;

    // Validate required fields
    if (!file || !title || !author || !email) {
      return NextResponse.json(
        {
          error: "Required fields: file, title, author, email",
        },
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

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: "File type not allowed. Only PDF, DOC, and DOCX are accepted",
        },
        { status: 400 },
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be less than 5MB" },
        { status: 400 },
      );
    }

    // Determine file type
    let fileType = "PDF";
    if (file.type === "application/msword") fileType = "DOC";
    if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )
      fileType = "DOCX";

    // Convert file to buffer and upload
    const buffer = await file.arrayBuffer();
    const cloudinaryResponse: CloudinaryUploadResult = await uploadToCloudinary(buffer, file.name, {
      folder: "manuscripts",
      resource_type: "raw"
    });

    // Save to database
    await saveManuscript({
      title,
      author,
      email,
      description,
      fileName: file.name,
      fileType,
      fileSize: file.size,
      fileUrl: cloudinaryResponse?.secure_url,
      cloudinaryId: cloudinaryResponse?.public_id,
    });

    // Offload emails to background
    after(async () => {
      try {
        // Send confirmation email to author
        const template = emailTemplates.manuscript(author, title);
        await sendEmail({
          to: email,
          subject: template.subject,
          html: template.html,
        });

        // Send notification email to admin
        const adminTemplate = emailTemplates.manuscriptAdminNotification(author, email, title, file.name, description);
        await sendEmail({
          to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER || "",
          subject: adminTemplate.subject,
          html: adminTemplate.html,
        });
      } catch (err) {
        console.error("Background email error (manuscript):", err);
      }
    });

    return NextResponse.json(
      {
        message: "Manuscript submitted successfully",
        fileName: file.name,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Manuscript submission error:", error);
    return NextResponse.json(
      { error: "Failed to process manuscript submission" },
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

    const [manuscripts, total] = await Promise.all([
      prisma.manuscript.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.manuscript.count(),
    ]);

    return NextResponse.json({
      manuscripts,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch manuscripts" },
      { status: 500 },
    );
  }
}
