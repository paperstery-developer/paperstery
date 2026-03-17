import { NextRequest, NextResponse, after } from "next/server";
import { sendEmail, emailTemplates } from "@/lib/nodemailer";
import { saveBlogPost } from "@/lib/db-services";
import { prisma } from "@/lib/prisma";
import {
  uploadToCloudinary,
  type CloudinaryUploadResult,
} from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const email = formData.get("email") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;

    // Validate required fields
    if (!image || !title || !author || !email || !content) {
      return NextResponse.json(
        {
          error: "Required fields: image, title, author, email, content",
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

    // Validate image type
    const allowedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!allowedImageTypes.includes(image.type)) {
      return NextResponse.json(
        {
          error:
            "Image type not allowed. Only JPEG, PNG, WebP, and GIF are accepted",
        },
        { status: 400 },
      );
    }

    // Validate image size (max 5MB)
    if (image.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image size must be less than 5MB" },
        { status: 400 },
      );
    }

    // Validate content length (min 100 characters)
    if (content.length < 100) {
      return NextResponse.json(
        { error: "Content must be at least 100 characters" },
        { status: 400 },
      );
    }

    // TODO: Upload image to Cloudinary
    // Convert image to buffer and upload
    const buffer = await image.arrayBuffer();
    const cloudinaryResponse: CloudinaryUploadResult = await uploadToCloudinary(
      buffer,
      image.name,
      {
        folder: "blog",
        resource_type: "image",
      },
    );

    // Save to database
    await saveBlogPost({
      title,
      author,
      email,
      content,
      category,
      imageName: image.name,
      imageSize: image.size,
      imageUrl: cloudinaryResponse?.secure_url,
      cloudinaryId: cloudinaryResponse?.public_id,
      status: "published",
    });

    // Offload emails to background
    after(async () => {
      try {
        // Send confirmation email to author
        const template = emailTemplates.blog(author, title);
        await sendEmail({
          to: email,
          subject: template.subject,
          html: template.html,
        });

        // Send notification email to admin
        const adminTemplate = emailTemplates.blogAdminNotification(author, email, title, category, content.length);
        await sendEmail({
          to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER || "",
          subject: adminTemplate.subject,
          html: adminTemplate.html,
        });
      } catch (err) {
        console.error("Background email error (blog):", err);
      }
    });

    return NextResponse.json(
      {
        message: "Blog post submitted successfully",
        imageName: image.name,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Blog submission error:", error);
    return NextResponse.json(
      { error: "Failed to process blog submission" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || undefined;
    const exclude = searchParams.get("exclude") || undefined;

    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { author: { contains: search, mode: "insensitive" } },
      ];
    }
    if (exclude) {
      where.id = { not: exclude };
    }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.blogPost.count({ where }),
    ]);

    return NextResponse.json({
      posts,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}
