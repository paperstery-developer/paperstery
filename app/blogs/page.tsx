import { BlogPageSection } from "@/components/blog/BlogPageSection";
import { HeroSection } from "@/components/shared/HeroSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Blog Posts | Paperstery",
};

export default function Page() {
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
            <BlogPageSection />
        </div>
    )
}