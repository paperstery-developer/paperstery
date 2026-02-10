import { Metadata } from "next";
import { blogPosts } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import BlogTemplate from "@/components/blog/BlogTemplate";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) return { title: "Post Not Found | Paperstery" };
  return { title: `${post.title} | Paperstery` };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) notFound();

  // Logic to get related posts (excluding current)
  const relatedPosts = Object.values(blogPosts)
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return <BlogTemplate post={post} relatedPosts={relatedPosts} />;
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug: slug,
  }));
}
