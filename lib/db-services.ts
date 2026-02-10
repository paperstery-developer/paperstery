import { prisma } from "@/lib/prisma";

// Subscription Services
export async function saveSubscription(email: string) {
  return prisma.subscription.create({
    data: { email },
  });
}

export async function getSubscription(email: string) {
  return prisma.subscription.findUnique({
    where: { email },
  });
}

export async function getAllSubscriptions() {
  return prisma.subscription.findMany();
}

// Contact Form Services
export async function saveContactForm(
  name: string,
  email: string,
  subject: string,
  message: string,
) {
  return prisma.contactForm.create({
    data: {
      name,
      email,
      subject,
      message,
    },
  });
}

export async function getAllContactForms() {
  return prisma.contactForm.findMany({
    orderBy: { createdAt: "desc" },
  });
}

// Manuscript Services
export async function saveManuscript(data: {
  title: string;
  author: string;
  email: string;
  description?: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl?: string;
  cloudinaryId?: string;
}) {
  return prisma.manuscript.create({
    data: {
      ...data,
      description: data.description || null,
      fileUrl: data.fileUrl || null,
      cloudinaryId: data.cloudinaryId || null,
    },
  });
}

export async function getManuscripts(status?: string) {
  if (status) {
    return prisma.manuscript.findMany({
      where: { status },
      orderBy: { createdAt: "desc" },
    });
  }
  return prisma.manuscript.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function updateManuscriptStatus(id: string, status: string) {
  return prisma.manuscript.update({
    where: { id },
    data: { status },
  });
}

// Blog Services
export async function saveBlogPost(data: {
  title: string;
  author: string;
  email: string;
  content: string;
  category?: string;
  imageName: string;
  imageSize: number;
  imageUrl?: string;
  cloudinaryId?: string;
}) {
  return prisma.blogPost.create({
    data: {
      ...data,
      category: data.category || null,
      imageUrl: data.imageUrl || null,
      cloudinaryId: data.cloudinaryId || null,
    },
  });
}

export async function getBlogPosts(status?: string) {
  if (status) {
    return prisma.blogPost.findMany({
      where: { status },
      orderBy: { createdAt: "desc" },
    });
  }
  return prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function updateBlogPostStatus(id: string, status: string) {
  return prisma.blogPost.update({
    where: { id },
    data: { status },
  });
}

// Cleanup Services (for deletions)
export async function deleteManuscript(id: string) {
  return prisma.manuscript.delete({
    where: { id },
  });
}

export async function deleteBlogPost(id: string) {
  return prisma.blogPost.delete({
    where: { id },
  });
}

export async function deleteContactForm(id: string) {
  return prisma.contactForm.delete({
    where: { id },
  });
}
