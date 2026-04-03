import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { deleteFromCloudinary, uploadToCloudinary, type CloudinaryUploadResult } from "@/lib/cloudinary";

export const runtime = 'nodejs'; 
export const maxDuration = 60;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formData = await request.formData();
    
    // Get fields from FormData
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const email = formData.get("email") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const status = formData.get("status") as string;
    const image = formData.get("image") as File | null;

    // Get the existing post
    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    let updateData: any = {
      title,
      author,
      email,
      content,
      category,
      status,
    };

    // Handle new image upload if provided
    if (image && image.size > 0) {
      // 1. Upload new image
      const cloudinaryResponse: CloudinaryUploadResult = await uploadToCloudinary(
        image.stream(),
        image.name,
        {
          folder: "blog",
          resource_type: "image",
        }
      );

      // 2. Delete old image if it exists
      if (existingPost.cloudinaryId) {
        await deleteFromCloudinary(existingPost.cloudinaryId);
      }

      // 3. Add image data to update object
      updateData = {
        ...updateData,
        imageName: image.name,
        imageSize: image.size,
        imageUrl: cloudinaryResponse.secure_url,
        cloudinaryId: cloudinaryResponse.public_id,
      };
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("PUT blog error:", error);
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Find post to get cloudinaryId
    const post = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    // Delete from Cloudinary if exists
    if (post.cloudinaryId) {
      await deleteFromCloudinary(post.cloudinaryId);
    }

    // Delete from DB
    await prisma.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Delete blog error:", error);
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}
