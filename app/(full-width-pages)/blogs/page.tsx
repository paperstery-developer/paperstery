import { BlogPageSection } from "@/components/blog/BlogPageSection";
import { HeroSection } from "@/components/shared/HeroSection";
import { Metadata } from "next";
import { getBlogPostsPaginated } from "@/lib/db-services";

export const metadata: Metadata = {
  title: "Our Blog Posts | Paperstery",
  description:
    "Explore insights on writing, publishing, authorship, and building meaningful books that last.",
  keywords: [
    "writing tips",
    "publishing advice",
    "how to write a book",
    "author insights",
  ],
};

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const sp = await searchParams;
    const page = Number(sp?.page) || 1;
    const limit = 6;
    const { posts, totalPages } = await getBlogPostsPaginated(page, limit, "published");

    return (
        <div>
            <HeroSection
                backgroundImage="/blog-hero.webp"
                heading="Blogs"
                breadcrumbs={[
                  { label: "Home", href: "/" },
                  { label: "Blogs", href: "/blogs" },
                ]}
            />
            <BlogPageSection initialPosts={posts} currentPage={page} totalPages={totalPages} />
        </div>
    )
}