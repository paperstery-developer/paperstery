"use client"
import { useQuery } from "@tanstack/react-query";
import { BlogPost, DBPost } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import BlogTemplate from "@/components/blog/BlogTemplate";
import DOMPurify from "dompurify";

interface Props {
    dbPost: DBPost | null;
    related: DBPost[] | null;
}


export default function DynamicBlogPage({dbPost: initialDbPost, related: initialRelated}: Props) {
  const { data: dbPost } = useQuery({
    queryKey: ['blog', initialDbPost?.id],
    queryFn: async () => {
      if (!initialDbPost?.id) return null;
      const res = await fetch(`/api/blog/${initialDbPost.id}`);
      if (!res.ok) throw new Error("Failed to fetch blog post");
      return res.json();
    },
    initialData: initialDbPost,
    enabled: !!initialDbPost?.id
  });

  const { data: related } = useQuery({
    queryKey: ['blogs', 'related', initialDbPost?.id],
    queryFn: async () => {
      if (!initialDbPost?.id) return [];
      const res = await fetch(`/api/blog?limit=3&status=published&exclude=${initialDbPost.id}`);
      if (!res.ok) throw new Error("Failed to fetch related posts");
      const data = await res.json();
      return data.posts;
    },
    initialData: initialRelated || [],
    enabled: !!initialDbPost?.id
  });

  let formattedPost: BlogPost | null = null;
  let formattedRelated: BlogPost[] = [];


if (dbPost) {
  // Sanitize content
  const sanitizedContent = typeof window !== "undefined"
    ? DOMPurify.sanitize(dbPost.content)
    : dbPost.content;
  
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
    content: <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
  };
  
  formattedRelated = related? related.map((p: any) => ({
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
  })) : [];
}

// if (formattedPost) {
//   if (typeof formattedPost.content === 'string') {
//     formattedPost.content = <div dangerouslySetInnerHTML={{ __html: formattedPost.content }} />;
//   }
// }

  if (!formattedPost) notFound();

  return <BlogTemplate post={formattedPost} relatedPosts={formattedRelated} />;
}

