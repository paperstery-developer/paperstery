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
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/lib/blog-data";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface BlogTemplateProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogTemplate({
  post,
  relatedPosts,
}: BlogTemplateProps) {
  const navigation = useRouter()
  return (
    <div className="min-h-screen ">
      {/* Article Header */}
      <section className="pt-24 pb-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/blogs">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
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
            <div className="flex gap-4 mt-4 text-secondary">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <span className="text-gray-500">•</span>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{typeof post.author === 'string' ? post.author : post.author.name}</span>
              </div>  
            </div>
            <div className="py-10 max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_p]:mb-4 [&_a]:text-primary [&_a]:underline [&_a]:cursor-pointer">
              {typeof post.content === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                post.content
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
