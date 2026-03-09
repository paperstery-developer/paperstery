"use client";
import {
  BookOpen,
  Feather,
  Lightbulb,
  Clock,
  User,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Newsletter } from "@/components/common/Newsletter";
import Link from "next/link";
import { Inbox } from "lucide-react";
import Image from "next/image";

type PrismaBlogPost = {
    id: string;
    title: string;
    author: string;
    email: string;
    content: string;
    category: string | null;
    imageName: string;
    imageUrl: string | null;
    imageSize: number;
    status: string;
    cloudinaryId: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export function BlogPageSection({
  initialPosts = [],
  currentPage = 1,
  totalPages = 1,
}: {
  initialPosts?: PrismaBlogPost[];
  currentPage?: number;
  totalPages?: number;
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(currentPage);

  const { data, isLoading } = useQuery({
    queryKey: ["blogs", selectedCategory, page],
    queryFn: async () => {
      const url = new URL("/api/blog", window.location.origin);
      url.searchParams.append("page", page.toString());
      url.searchParams.append("limit", "9");
      if (selectedCategory !== "All") {
        url.searchParams.append("category", selectedCategory);
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      return res.json();
    },
    initialData: page === currentPage && selectedCategory === "All" ? { posts: initialPosts, totalPages, total: initialPosts.length, currentPage } : undefined,
  });

  const posts = data?.posts || [];
  const totalP = data?.totalPages || 1;

  const getIcon = (category: string) => {
    switch (category) {
      case "Creative Writing": return Feather;
      case "Publishing": return Lightbulb;
      default: return BookOpen;
    }
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Featured Post */}
      {posts.length > 0 &&
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              <div className="inline-block px-3 pb-0.5 rounded-full bg-light-primary mb-8">
                <span className="text-xs text-primary font-medium">
                  LATEST POST
                </span>
              </div>

              {(() => {
                const featuredPost = posts[0];
                return (
                  <div className="grid lg:grid-cols-2 gap-8 items-center bg-background rounded-3xl overflow-hidden shadow-2xl">
                    <div className="relative h-96 lg:h-full">
                      <Image
                        src={featuredPost.imageUrl || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470&auto=format&fit=crop"}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover"
                        unoptimized
                        width={1080}
                        height={1620}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
                    </div>

                    <div className="p-8 lg:p-12">
                      <div className="inline-block px-3 py-1 rounded-full bg-light-primary mb-4">
                        <span className="text-xs text-primary font-medium">
                          {featuredPost.category}
                        </span>
                      </div>

                      <h2 className="mb-4 text-3xl">{featuredPost.title}</h2>

                      <div className="flex items-center gap-4 text-sm text-secondary mb-6">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{featuredPost.author}</span>
                        </div>
                      </div>

                      <div className="text-lg text-secondary mb-6 line-clamp-3" dangerouslySetInnerHTML={{ __html: featuredPost.content.substring(0, 200) + "..." }} />

                      <Button
                        size="lg"
                        asChild
                        className="bg-primary text-white hover:bg-primary/90 gap-2"
                      >
                        <Link href={`/blogs/${featuredPost.id}`}>
                          Read Full Article <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </div>
        </section>
      }

      {/* Categories Filter */}
      <section className="py-8 bg-light-primary/50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              {["All", "Creative Writing", "Publishing", "Authorship", "Professional Writing", "Marketing", "Business", "Organization"].map((category) => (
                <Button
                  key={category}
                  onClick={() => { setSelectedCategory(category); setPage(1); }}
                  variant={category === selectedCategory ? "default" : "outline"}
                  className={
                    category === selectedCategory
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "border-primary/30 text-primary hover:bg-primary/10"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-background pattern-bg">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl h-[400px] animate-pulse">
                    <div className="h-64 bg-gray-100" />
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-gray-100 rounded w-1/3" />
                      <div className="h-6 bg-gray-100 rounded w-3/4" />
                      <div className="h-4 bg-gray-100 rounded w-full" />
                    </div>
                  </div>
                ))
              ) : posts.length > 0 ? (
                posts.map((post: any, index: number) => {
                  const Icon = getIcon(post.category);
                  return (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all h-full flex flex-col"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={post.imageUrl || "https://res.cloudinary.com/dwofq1blq/image/upload/v1772981660/logo-primary_gbc5jz.svg"}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          width={1080}
                          height={1620}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
                        <div className="absolute top-4 right-4">
                          <div className="px-3 py-1 rounded-full bg-white/90">
                            <span className="text-xs text-primary font-medium">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <div className="w-10 h-10 rounded-lg bg-white/90 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 text-xs text-secondary mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <h3 className="mb-3 text-lg line-clamp-2">{post.title}</h3>
                        <div className="text-sm text-secondary mb-4 line-clamp-2 flex-grow" dangerouslySetInnerHTML={{ __html: post.content.substring(0, 150) + "..." }} />

                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-2 text-xs text-secondary">
                            <User className="w-3 h-3" />
                            <span>{post.author}</span>
                          </div>
                          <Button
                            variant="link"
                            size="sm"
                            asChild
                            className="text-primary hover:text-primary/80 p-0 h-auto gap-1"
                          >
                            <Link href={`/blogs/${post.id}`}>
                              Read More <ArrowRight className="w-3 h-3" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })
              ) : (
                <div className="col-span-full py-20 bg-white rounded-3xl flex flex-col items-center justify-center text-center shadow-sm">
                  <div className="w-20 h-20 rounded-full bg-light-primary flex items-center justify-center mb-6">
                    <Inbox className="w-10 h-10 text-primary opacity-40" />
                  </div>
                  <h3 className="text-2xl font-semibold text-primary mb-2">No articles found</h3>
                  <p className="text-gray-500 max-w-sm px-6">
                    We couldn&apos;t find any articles in this category. Check back soon for new content.
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalP > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              <Button
                variant="outline"
                className="border-primary/30"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              
              {Array.from({ length: totalP }).map((_, i) => (
                <Button
                  key={i}
                  variant={page === i + 1 ? "default" : "outline"}
                  className={page === i + 1 ? "bg-primary text-white hover:bg-primary/90" : "border-primary/30"}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                className="border-primary/30"
                disabled={page >= totalP}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
            )}
          </div>
        </div>
      </section>
      <Newsletter />
    </div>
  );
}
