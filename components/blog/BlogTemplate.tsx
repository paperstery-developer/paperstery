"use client";
import { motion } from "motion/react";
import Image from "next/image";
import {
  Clock,
  Calendar,
  Facebook,
  Twitter,
  Linkedin,
  Quote,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/lib/blog-data";

interface BlogTemplateProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogTemplate({
  post,
  relatedPosts,
}: BlogTemplateProps) {
  return (
    <div className="min-h-screen bg-[var(--color-foreground)]">
      {/* Article Header */}
      <section className="pt-24 pb-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Button>
        </div>
      </section>

      {/* Render the rest of your UI using 'post' instead of hardcoded data */}
      <section className="pt-12 pb-8 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-[var(--color-light-primary)] mb-6">
              <span className="text-[var(--color-primary)]">
                {post.category}
              </span>
            </div>
            <h1>{post.title}</h1>
            {/* ... rest of the template ... */}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
