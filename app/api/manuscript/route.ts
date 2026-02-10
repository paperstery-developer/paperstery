import { NextRequest, NextResponse } from "next/server";
import { sendEmail, emailTemplates } from "@/lib/nodemailer";
import { saveManuscript } from "@/lib/db-services";
import {
  uploadToCloudinary,
  type CloudinaryUploadResult,
} from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
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

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be less than 10MB" },
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

    // Send confirmation email to author
    const template = emailTemplates.manuscript(author, title);
    await sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
    });

    // Send notification email to admin
    const adminTemplate = emailTemplates.manuscript(author, title);
    await sendEmail({
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER || "",
      subject: `New Manuscript: ${title}`,
      html: `
        <h2>New Manuscript Submission</h2>
        <p><strong>Author:</strong> ${author}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Description:</strong> ${description || "N/A"}</p>
        <p><strong>File:</strong> ${file.name}</p>
      `,
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
