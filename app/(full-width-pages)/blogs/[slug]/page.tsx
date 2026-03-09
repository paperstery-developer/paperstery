import { Metadata } from "next";
import { blogPosts, BlogPost } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import BlogTemplate from "@/components/blog/BlogTemplate";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  // Try DB first
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
  
  let formattedPost: BlogPost | null = null;
  let formattedRelated: BlogPost[] = [];

  if (slug.length === 24) {
    try {
      const dbPost = await prisma.blogPost.findUnique({ where: { id: slug } });
      if (dbPost) {
        formattedPost = {
          id: dbPost.id as any,
          slug: dbPost.id,
          title: dbPost.title,
          subtitle: dbPost.category || "General",
          category: dbPost.category || "General",
          date: new Date(dbPost.createdAt).toLocaleDateString(),
          author: {
            name: dbPost.author,
            role: "Paperstery Author",
            bio: "Author at Paperstery",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470"
          },
          featuredImage: dbPost.imageUrl || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470",
          content: <div dangerouslySetInnerHTML={{ __html: dbPost.content }} />
        };
        
        const related = await prisma.blogPost.findMany({
          where: { id: { not: slug }, status: "published" },
          take: 3,
          orderBy: { createdAt: "desc" },
        });
        formattedRelated = related.map((p: any) => ({
          id: p.id as any,
          slug: p.id,
          title: p.title,
          subtitle: p.category || "General",
          category: p.category || "General",
          date: new Date(p.createdAt).toLocaleDateString(),
          author: {
            name: p.author,
            role: "Paperstery Author",
            bio: "Author at Paperstery",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470"
          },
          featuredImage: p.imageUrl || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470",
        }));
      }
    } catch(e) { console.error(e) }
  }

  if (!formattedPost) {
    formattedPost = blogPosts[slug];
    if (formattedPost) {
      formattedRelated = Object.values(blogPosts)
        .filter((p) => p.slug !== slug)
        .slice(0, 3);
    }
  }

  if (!formattedPost) notFound();

  return <BlogTemplate post={formattedPost} relatedPosts={formattedRelated} />;
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug: slug,
  }));
}
