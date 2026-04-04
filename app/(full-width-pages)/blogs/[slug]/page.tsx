import { Metadata } from "next";
import { blogPosts, DBPost } from "@/lib/blog-data";
import { prisma } from "@/lib/prisma";
import sanitizeHtml from "sanitize-html";
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

  const sanitizeOptions: sanitizeHtml.IOptions = {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "width", "height", "style", "class"],
    },
    allowedSchemes: ["http", "https", "ftp", "mailto"],
  };

  const sanitizedDbPost = dbPost
    ? { ...dbPost, content: sanitizeHtml(dbPost.content, sanitizeOptions) }
    : null;

  const sanitizedRelated = related?.map(p => ({
    ...p,
    content: p.content ? sanitizeHtml(p.content, sanitizeOptions) : p.content
  })) ?? null;

  return <DynamicBlogPage dbPost={sanitizedDbPost} related={sanitizedRelated} />;
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug: slug,
  }));
}
