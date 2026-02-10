'use client'
import { motion } from "motion/react";
import { BookOpen, Feather, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Blog() {
  const blogPosts = [
    {
      icon: Feather,
      title: "The Art of Creative Writing",
      excerpt:
        "Discover the essential elements that make a compelling story and how to develop your unique voice.",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      icon: BookOpen,
      title: "Understanding the Publishing Process",
      excerpt:
        "A comprehensive guide to traditional and independent publishing paths for aspiring authors.",
      image:
        "https://images.unsplash.com/photo-1766128209231-ce21cfc9aca4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0eXBld3JpdGVyJTIwdmludGFnZSUyMHdyaXRpbmd8ZW58MXx8fHwxNzY4MzA5NzIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      icon: Lightbulb,
      title: "From Ideas to Legacies",
      excerpt:
        "Exploring how your written work can create lasting impact and build a meaningful legacy.",
      image:
        "https://images.unsplash.com/photo-1644329771977-0a8c6e3928ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRob3IlMjBtYW51c2NyaXB0fGVufDF8fHx8MTc2ODM1ODIwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

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

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  width={1080}
                  height={720}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 rounded-lg bg-white/90 flex items-center justify-center">
                    <post.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-3 text-xl text-primary">{post.title}</h3>
                <p className="text-base mb-4">{post.excerpt}</p>
                <Button
                  variant="link"
                  className="text-primary hover:text-primary/80 p-0 h-auto"
                >
                  Read More →
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}