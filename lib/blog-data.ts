export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  author: {
    name: string;
    role: string;
    bio: string;
    image: string;
  };
  readTime: string;
  featuredImage: string;
  content?: React.ReactNode; // Or a string if using MDX/HTML
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
  // Add more posts here
};
