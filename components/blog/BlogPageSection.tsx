"use client";
import {
  BookOpen,
  Feather,
  Lightbulb,
  Clock,
  User,
  ArrowRight,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function BlogPageSection() {
  const featuredPost = {
    id: 1,
    icon: BookOpen,
    title: "The Art of Creative Writing: Developing Your Unique Voice",
    excerpt:
      "Discover the essential elements that make a compelling story and how to develop your unique voice as an author. From character development to narrative structure, explore the fundamentals of creative writing.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "January 15, 2026",
    author: "Dr. Njiki Micheline",
    readTime: "8 min read",
    category: "Creative Writing",
  };

  const blogPosts = [
    {
      id: 2,
      icon: Lightbulb,
      title: "Understanding the Publishing Process",
      excerpt:
        "A comprehensive guide to traditional and independent publishing paths for aspiring authors. Learn about the journey from manuscript to published book.",
      image:
        "https://images.unsplash.com/photo-1648536524290-590fb42a04aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWJsaXNoaW5nJTIwYm9va3MlMjBsaWJyYXJ5fGVufDF8fHx8MTc2ODgzNDU1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "January 12, 2026",
      author: "Michael Chen",
      readTime: "6 min read",
      category: "Publishing",
    },
    {
      id: 3,
      icon: Feather,
      title: "From Ideas to Legacies: Building Lasting Impact",
      excerpt:
        "Exploring how your written work can create lasting impact and build a meaningful legacy for generations to come.",
      image:
        "https://images.unsplash.com/photo-1644329771977-0a8c6e3928ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRob3IlMjBtYW51c2NyaXB0fGVufDF8fHx8MTc2ODM1ODIwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "January 10, 2026",
      author: "Emily Johnson",
      readTime: "5 min read",
      category: "Authorship",
    },
    {
      id: 4,
      icon: BookOpen,
      title: "The Power of Storytelling in Non-Fiction",
      excerpt:
        "How to incorporate narrative techniques into professional and academic writing to engage readers and convey complex ideas effectively.",
      image:
        "https://images.unsplash.com/photo-1639917290489-4a4eb2a6aa3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRob3IlMjB3cml0aW5nJTIwZGVza3xlbnwxfHx8fDE3Njg4MTUwNzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "January 8, 2026",
      author: "Dr. James Anderson",
      readTime: "7 min read",
      category: "Professional Writing",
    },
    {
      id: 5,
      icon: Lightbulb,
      title: "Manuscript Development: A Step-by-Step Guide",
      excerpt:
        "Navigate the manuscript development process with expert guidance on outlining, drafting, revising, and preparing your work for publication.",
      image:
        "https://images.unsplash.com/photo-1607703552474-f14ea04d766f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHN0b3J5dGVsbGluZ3xlbnwxfHx8fDE3Njg4MzQ1NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "January 5, 2026",
      author: "Rachel Martinez",
      readTime: "10 min read",
      category: "Manuscript Development",
    },
    {
      id: 6,
      icon: Feather,
      title: "Building Your Author Platform",
      excerpt:
        "Essential strategies for establishing your presence as an author, from social media to website development and reader engagement.",
      image:
        "https://images.unsplash.com/photo-1693075586720-ad1cdebc35c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwZWRpdGluZyUyMG1hbnVzY3JpcHR8ZW58MXx8fHwxNzY4ODM0NTYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "January 3, 2026",
      author: "Kevin Thompson",
      readTime: "6 min read",
      category: "Marketing",
    },
    {
      id: 7,
      icon: BookOpen,
      title: "The Business of Book Publishing",
      excerpt:
        "Understanding contracts, royalties, and the financial aspects of publishing to make informed decisions about your publishing journey.",
      image:
        "https://images.unsplash.com/photo-1765338914560-64a072c06ea3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXRlcmFyeSUyMHN1Y2Nlc3N8ZW58MXx8fHwxNzY4ODM0NTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "December 30, 2025",
      author: "Patricia Williams",
      readTime: "9 min read",
      category: "Business",
    },
    {
      id: 8,
      icon: Lightbulb,
      title: "Writing Rituals: Finding Your Creative Flow",
      excerpt:
        "Discover how successful authors structure their writing routines and create environments that foster creativity and productivity.",
      image:
        "https://images.unsplash.com/photo-1589553787222-7469c73b27d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3cml0ZXJ8ZW58MXx8fHwxNzY4ODM0NTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "December 27, 2025",
      author: "David Park",
      readTime: "5 min read",
      category: "Creativity",
    },
    {
      id: 9,
      icon: Feather,
      title: "Academic Publishing: Best Practices",
      excerpt:
        "Navigate the world of academic publishing with insights on peer review, citation practices, and achieving scholarly impact.",
      image:
        "https://images.unsplash.com/photo-1766128209231-ce21cfc9aca4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0eXBld3JpdGVyJTIwdmludGFnZSUyMHdyaXRpbmd8ZW58MXx8fHwxNzY4MzA5NzIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "December 24, 2025",
      author: "Dr. Olivia Carter",
      readTime: "8 min read",
      category: "Academic",
    },
  ];

  const categories = [
    "All",
    "Creative Writing",
    "Publishing",
    "Authorship",
    "Professional Writing",
    "Marketing",
    "Business",
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* Featured Post */}
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
                FEATURED POST
              </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center bg-background rounded-3xl overflow-hidden shadow-2xl">
              <div className="relative h-96 lg:h-full">
                <Image
                  src={featuredPost.image}
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

                <p className="text-lg text-secondary mb-6">
                  {featuredPost.excerpt}
                </p>

                <Button
                  size="lg"
                  asChild
                  className="bg-primary text-white hover:bg-primary/90 gap-2"
                >
                  <Link href={`/blog/${featuredPost.id}`}>
                    Read Full Article <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-light-primary/50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  className={
                    category === "All"
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
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      unoptimized
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
                        <post.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-secondary mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>

                    <h3 className="mb-3 text-lg">{post.title}</h3>
                    <p className="text-sm text-secondary mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-secondary">
                        <User className="w-3 h-3" />
                        <span>{post.author}</span>
                      </div>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-primary hover:text-primary/80 p-0 h-auto gap-1"
                      >
                        Read More <ArrowRight className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-12">
              <Button
                variant="outline"
                className="border-primary/30"
              >
                Previous
              </Button>
              <Button className="bg-primary text-white hover:bg-primary/90">
                1
              </Button>
              <Button
                variant="outline"
                className="border-primary/30"
              >
                2
              </Button>
              <Button
                variant="outline"
                className="border-primary/30"
              >
                3
              </Button>
              <Button
                variant="outline"
                className="border-primary/30"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-linear-to-br from-primary to-[#4a0099] text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <BookOpen className="w-12 h-12 mx-auto mb-6 text-white" />
            <h2 className="mb-4 text-white">Subscribe to Our Newsletter</h2>
            <p className="text-lg text-white/90 mb-8">
              Get the latest insights on writing, publishing, and creativity
              delivered directly to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white border-white text-primary placeholder:text-gray-400"
              />
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                Subscribe
              </Button>
            </div>

            <p className="text-xs text-white/70 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
