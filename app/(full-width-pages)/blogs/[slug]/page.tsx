import { Metadata } from "next";
import { blogPosts, DBPost } from "@/lib/blog-data";
import { prisma } from "@/lib/prisma";
import DOMPurify from "isomorphic-dompurify";
import DynamicBlogPage from "@/components/blog/DynamicBlogPage";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  let postTitle = null;
  if (slug.length === 24) { // MongoDB ObjectId is 24 chars
    const dbPost = await prisma.blogPost.findUnique({ where: { id: slug } });
    if (dbPost) postTitle = dbPost.title;
  }
  
  if (!postTitle) {
    const mockPost = blogPosts[slug];
    if (mockPost) postTitle = mockPost.title;
  }

  if (!postTitle) return { title: "Post Not Found | Paperstery" };
  return { title: `${postTitle} | Paperstery` };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  
  let dbPost: DBPost | null = null;
  let related: DBPost[] | null = null;

  if (slug.length === 24) {
    try {
      dbPost = await prisma.blogPost.findUnique({ where: { id: slug } });
      related = await prisma.blogPost.findMany({
        where: { id: { not: slug }, status: "published" },
        take: 3,
        orderBy: { createdAt: "desc" },
      });
    } catch(e) { console.error(e) }
  }

  const sanitizedDbPost = dbPost
    ? { ...dbPost, content: DOMPurify.sanitize(dbPost.content) }
    : null;

  const sanitizedRelated = related?.map(p => ({
    ...p,
    content: p.content ? DOMPurify.sanitize(p.content) : p.content
  })) ?? null;

  return <DynamicBlogPage dbPost={sanitizedDbPost} related={sanitizedRelated} />;
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug: slug,
  }));
}
