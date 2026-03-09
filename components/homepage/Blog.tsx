'use client'
import { motion } from "motion/react";
import { BookOpen, Feather, Lightbulb, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const iconMap: Record<string, any> = {
  "Creative Writing": Feather,
  "Publishing": Lightbulb,
  "Authorship": BookOpen,
  "default": BookOpen
};

export function Blog() {
  const { data, isLoading } = useQuery({
    queryKey: ["top-blogs"],
    queryFn: async () => {
      const res = await fetch("/api/blog?limit=3&status=published");
      if (!res.ok) throw new Error("Failed to fetch blogs");
      return res.json();
    },
  });

  const posts = data?.posts || [];

  if (isLoading) {
    return (
      <section className="py-20 bg-white border-y border-light-primary/80" id="blog">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white border-y border-light-primary/80" id="blog">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-light-primary border-primary/30 border mb-4">
            <span className="flex gap-1.5 items-center text-sm text-primary font-medium">
              <Lightbulb size={14} />
              Insights & Ideas
            </span>
          </div>
          <h2 className="mb-4 text-primary">Our Blog Posts</h2>
          <p className="max-w-3xl mx-auto text-lg">
            A space where we share thoughts on writing, publishing, creativity,
            authorship, and the ideas that shape meaningful books.
          </p>
        </motion.div>

        {posts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {posts.map((post: any, index: number) => {
              const Icon = iconMap[post.category] || iconMap.default;
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all h-full flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={post.imageUrl || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470&auto=format&fit=crop"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      width={1080}
                      height={720}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 rounded-lg bg-white/90 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="mb-3 text-xl text-primary line-clamp-2">{post.title}</h3>
                    <div className="text-base mb-4 flex-grow line-clamp-3" dangerouslySetInnerHTML={{ __html: post.content.substring(0, 150) + "..." }} />
                    <Link href={`/blogs/${post.id}`}>
                      <Button
                        variant="link"
                        className="text-primary hover:text-primary/80 p-0 h-auto"
                      >
                        Read More →
                      </Button>
                    </Link>
                </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-light-primary flex items-center justify-center mb-6">
              <Inbox className="w-10 h-10 text-primary opacity-40" />
            </div>
            <h3 className="text-2xl font-semibold text-primary mb-2">No posts yet</h3>
            <p className="text-gray-500 max-w-sm">
              We haven&apos;t published any articles yet. Check back soon for insights and ideas on publishing and authorship.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
