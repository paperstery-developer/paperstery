import { BookOpen, Feather, Lightbulb } from "lucide-react";

export type BlogPost = {
  id: string | number;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt?: string;
  category: string;
  date: string;
  author: {
    name: string;
    role?: string;
    bio?: string;
    image?: string;
  } | string;
  readTime: string;
  featuredImage: string;
  content?: React.ReactNode | string;
  icon?: any;
};

export const blogPosts: Record<string, BlogPost> = {
  "creative-writing-developing-unique-voice": {
    id: 1,
    slug: "creative-writing-developing-unique-voice",
    title: "The Art of Creative Writing: Developing Your Unique Voice",
    subtitle: "Discover the essential elements that make a compelling story...",
    category: "Creative Writing",
    date: "January 15, 2026",
    author: {
      name: "Dr. Sarah Mitchell",
      role: "Senior Editor & Writing Coach",
      bio: "Dr. Sarah Mitchell is an award-winning author...",
      image: "https://images.unsplash.com/...",
    },
    readTime: "8 min read",
    featuredImage: "https://images.unsplash.com/...",
  },
};

export const mockFeaturedPost: BlogPost = {
  id: 1,
  slug: "art-creative-writing-unique-voice",
  icon: BookOpen,
  title: "The Art of Creative Writing: Developing Your Unique Voice",
  excerpt:
    "Discover the essential elements that make a compelling story and how to develop your unique voice as an author. From character development to narrative structure, explore the fundamentals of creative writing.",
  featuredImage:
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  date: "January 15, 2026",
  author: {
    name: "Dr. Njiki Micheline",
    role: "Senior Writing Coach"
  },
  readTime: "8 min read",
  category: "Creative Writing",
};

export const mockBlogPosts: BlogPost[] = [
  {
    id: 2,
    slug: "understanding-publishing-process",
    icon: Lightbulb,
    title: "Understanding the Publishing Process",
    excerpt:
      "A comprehensive guide to traditional and independent publishing paths for aspiring authors. Learn about the journey from manuscript to published book.",
    featuredImage:
      "https://images.unsplash.com/photo-1648536524290-590fb42a04aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWJsaXNoaW5nJTIwYm9va3MlMjBsaWJyYXJ5fGVufDF8fHx8MTc2ODgzNDU1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "January 12, 2026",
    author: "Michael Chen",
    readTime: "6 min read",
    category: "Publishing",
  },
  {
    id: 3,
    slug: "ideas-to-legacies-lasting-impact",
    icon: Feather,
    title: "From Ideas to Legacies: Building Lasting Impact",
    excerpt:
      "Exploring how your written work can create lasting impact and build a meaningful legacy for generations to come.",
    featuredImage:
      "https://images.unsplash.com/photo-1644329771977-0a8c6e3928ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRob3IlMjBtYW51c2NyaXB0fGVufDF8fHx8MTc2ODM1ODIwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "January 10, 2026",
    author: "Emily Johnson",
    readTime: "5 min read",
    category: "Authorship",
  },
  {
    id: 4,
    slug: "power-storytelling-non-fiction",
    icon: BookOpen,
    title: "The Power of Storytelling in Non-Fiction",
    excerpt:
      "How to incorporate narrative techniques into professional and academic writing to engage readers and convey complex ideas effectively.",
    featuredImage:
      "https://images.unsplash.com/photo-1639917290489-4a4eb2a6aa3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRob3IlMjB3cml0aW5nJTIwZGVza3xlbnwxfHx8fDE3Njg4MTUwNzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "January 8, 2026",
    author: "Dr. James Anderson",
    readTime: "7 min read",
    category: "Professional Writing",
  },
  {
    id: 5,
    slug: "manuscript-development-guide",
    icon: Lightbulb,
    title: "Manuscript Development: A Step-by-Step Guide",
    excerpt:
      "Navigate the manuscript development process with expert guidance on outlining, drafting, revising, and preparing your work for publication.",
    featuredImage:
      "https://images.unsplash.com/photo-1607703552474-f14ea04d766f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHN0b3J5dGVsbGluZ3xlbnwxfHx8fDE3Njg4MzQ1NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "January 5, 2026",
    author: "Rachel Martinez",
    readTime: "10 min read",
    category: "Manuscript Development",
  },
  {
    id: 6,
    slug: "building-author-platform",
    icon: Feather,
    title: "Building Your Author Platform",
    excerpt:
      "Essential strategies for establishing your presence as an author, from social media to website development and reader engagement.",
    featuredImage:
      "https://images.unsplash.com/photo-1693075586720-ad1cdebc35c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwZWRpdGluZyUyMG1hbnVzY3JpcHR8ZW58MXx8fHwxNzY4ODM0NTYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "January 3, 2026",
    author: "Kevin Thompson",
    readTime: "6 min read",
    category: "Marketing",
  },
  {
    id: 7,
    slug: "business-book-publishing",
    icon: BookOpen,
    title: "The Business of Book Publishing",
    excerpt:
      "Understanding contracts, royalties, and the financial aspects of publishing to make informed decisions about your publishing journey.",
    featuredImage:
      "https://images.unsplash.com/photo-1765338914560-64a072c06ea3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXRlcmFyeSUyMHN1Y2Nlc3N8ZW58MXx8fHwxNzY4ODM0NTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "December 30, 2025",
    author: "Patricia Williams",
    readTime: "9 min read",
    category: "Business",
  },
  {
    id: 8,
    slug: "writing-rituals-creative-flow",
    icon: Lightbulb,
    title: "Writing Rituals: Finding Your Creative Flow",
    excerpt:
      "Discover how successful authors structure their writing routines and create environments that foster creativity and productivity.",
    featuredImage:
      "https://images.unsplash.com/photo-1589553787222-7469c73b27d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3cml0ZXJ8ZW58MXx8fHwxNzY4ODM0NTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "December 27, 2025",
    author: "David Park",
    readTime: "5 min read",
    category: "Creativity",
  },
  {
    id: 9,
    slug: "academic-publishing-best-practices",
    icon: Feather,
    title: "Academic Publishing: Best Practices",
    excerpt:
      "Navigate the world of academic publishing with insights on peer review, citation practices, and achieving scholarly impact.",
    featuredImage:
      "https://images.unsplash.com/photo-1766128209231-ce21cfc9aca4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0eXBld3JpdGVyJTIwdmludGFnZSUyMHdyaXRpbmd8ZW58MXx8fHwxNzY4MzA5NzIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "December 24, 2025",
    author: "Dr. Olivia Carter",
    readTime: "8 min read",
    category: "Academic",
  },
];