"use client";
import {
  Clock,
  Calendar,
  Facebook,
  Twitter,
  Linkedin,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Quote,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function Page() {
  const post = {
    id: 1,
    title: "The Art of Creative Writing: Developing Your Unique Voice",
    subtitle:
      "Discover the essential elements that make a compelling story and how to develop your unique voice as an author",
    category: "Creative Writing",
    date: "January 15, 2026",
    author: {
      name: "Dr. Sarah Mitch  Share2,ell",
      role: "Senior Editor & Writing Coach",
      bio: "Dr. Sarah Mitchell is an award-winning author and creative writing instructor with over 15 years of experience helping writers find their voice. She holds a PhD in Creative Writing from Columbia University.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGF1dGhvcnxlbnwxfHx8fDE3Njg4MzQ1NjJ8MA&ixlib=rb-4.1.0&q=80&w=400",
    },
    readTime: "8 min read",
    featuredImage:
      "https://images.unsplash.com/photo-1612907260223-2c7aff7a7d3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdyaXRpbmclMjBub3RlYm9va3xlbnwxfHx8fDE3NjgzMTA0NzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
  };

  const relatedPosts = [
    {
      id: 2,
      title: "Understanding the Publishing Process",
      excerpt:
        "A comprehensive guide to traditional and independent publishing paths for aspiring authors.",
      image:
        "https://images.unsplash.com/photo-1648536524290-590fb42a04aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWJsaXNoaW5nJTIwYm9va3MlMjBsaWJyYXJ5fGVufDF8fHx8MTc2ODgzNDU1OXww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Publishing",
      readTime: "6 min read",
    },
    {
      id: 3,
      title: "From Ideas to Legacies: Building Lasting Impact",
      excerpt:
        "Exploring how your written work can create lasting impact and build a meaningful legacy.",
      image:
        "https://images.unsplash.com/photo-1644329771977-0a8c6e3928ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRob3IlMjBtYW51c2NyaXB0fGVufDF8fHx8MTc2ODM1ODIwMXww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Authorship",
      readTime: "5 min read",
    },
    {
      id: 4,
      title: "The Power of Storytelling in Non-Fiction",
      excerpt:
        "How to incorporate narrative techniques into professional and academic writing.",
      image:
        "https://images.unsplash.com/photo-1639917290489-4a4eb2a6aa3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRob3IlMjB3cml0aW5nJTIwZGVza3xlbnwxfHx8fDE3Njg4MTUwNzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Professional Writing",
      readTime: "7 min read",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-foreground)]">
      {/* Back to Blog Link */}
      <section className="pt-24 pb-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              className="text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 -ml-4 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
          </div>
        </div>
      </section>

      {/* Article Header */}
      <section className="pt-12 pb-8 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Category Badge */}
            <div className="inline-block px-3 py-1 rounded-full bg-[var(--color-light-primary)] mb-6">
              <span className="text-xs text-[var(--color-primary)] font-medium uppercase tracking-wide">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-6">{post.title}</h1>

            {/* Subtitle */}
            <p className="text-xl text-[var(--color-text-secondary)] mb-8 leading-relaxed">
              {post.subtitle}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[var(--color-light-primary)]">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    className="w-full h-full object-cover"
                    fill
                  />
                </div>
                <div>
                  <div className="font-medium text-[var(--color-text-primary)]">
                    {post.author.name}
                  </div>
                  <div className="text-sm text-[var(--color-text-secondary)]">
                    {post.author.role}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="ml-auto flex items-center gap-2">
                <span className="text-sm text-[var(--color-text-secondary)] mr-2">
                  Share:
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-9 h-9 p-0 border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/10"
                >
                  <Facebook className="w-4 h-4 text-[var(--color-primary)]" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-9 h-9 p-0 border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/10"
                >
                  <Twitter className="w-4 h-4 text-[var(--color-primary)]" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-9 h-9 p-0 border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/10"
                >
                  <Linkedin className="w-4 h-4 text-[var(--color-primary)]" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
                fill
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-3xl mx-auto prose prose-lg prose-slate"
          >
            <div className="space-y-8 text-[var(--color-text-secondary)]">
              <p>
                Finding your unique voice as a writer is one of the most
                important—and often most challenging—aspects of the creative
                writing journey. Your voice is what sets you apart from every
                other writer, the distinctive way you see and interpret the
                world, and how you communicate that vision to your readers.
              </p>

              <p>
                In this comprehensive guide, we'll explore the key elements that
                contribute to developing a strong, authentic writing voice that
                resonates with readers and helps you create stories that leave a
                lasting impact.
              </p>

              <h2>Understanding Voice vs. Style</h2>

              <p>
                Before we dive deep into developing your voice, it's essential
                to understand the distinction between voice and style. While
                often used interchangeably, these terms represent different
                aspects of writing:
              </p>

              <ul className="space-y-3">
                <li>
                  <strong>Voice</strong> is the unique personality that comes
                  through in your writing. It's your perspective, your
                  worldview, the essence of who you are as a writer.
                </li>
                <li>
                  <strong>Style</strong> refers to the techniques and choices
                  you make—sentence structure, word choice, pacing, and literary
                  devices. Style can change from project to project, but voice
                  remains consistent.
                </li>
              </ul>

              <div className="my-12 p-8 bg-[var(--color-light-primary)] rounded-2xl border-l-4 border-[var(--color-primary)]">
                <div className="flex gap-4">
                  <Quote className="w-8 h-8 text-[var(--color-primary)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="italic text-[var(--color-primary)] text-xl mb-2">
                      "Voice is the unique personality that comes through in
                      your writing. It's not something you create—it's something
                      you discover."
                    </p>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-0">
                      — Dr. Sarah Mitchell, Senior Editor
                    </p>
                  </div>
                </div>
              </div>

              <h2>The Five Pillars of Voice Development</h2>

              <h3>1. Authenticity: Write What You Know and Feel</h3>

              <p>
                Authenticity is the foundation of a compelling voice. Readers
                can sense when a writer is being genuine versus when they're
                trying to mimic someone else's style or force a persona that
                doesn't feel natural.
              </p>

              <p>
                To develop authenticity in your writing, start by exploring your
                own experiences, beliefs, and observations. What makes you
                angry? What fills you with joy? What questions keep you up at
                night? These emotional truths become the fuel for authentic
                storytelling.
              </p>

              <h3>2. Consistency: Finding Your Rhythm</h3>

              <p>
                A strong voice maintains consistency across your work. This
                doesn't mean every piece sounds identical, but there should be
                recognizable patterns in how you construct sentences, choose
                words, and approach storytelling.
              </p>

              <p>
                Pay attention to your natural writing tendencies. Do you favor
                short, punchy sentences or long, flowing prose? Do you lean
                toward metaphor and imagery, or do you prefer stark, direct
                language? Understanding these preferences helps you refine and
                strengthen your voice.
              </p>

              <h3>3. Perspective: Your Unique Lens</h3>

              <p>
                Your voice is shaped by your unique perspective on the world.
                Two writers can describe the same scene in entirely different
                ways because they bring different experiences, cultural
                backgrounds, and worldviews to their work.
              </p>

              <p>
                Embrace what makes your perspective unique. Whether it's your
                cultural heritage, professional background, personal struggles,
                or philosophical beliefs, these elements inform how you see the
                world and, consequently, how you write about it.
              </p>

              <div className="my-12">
                <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1455390582262-044cdead277a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3cml0aW5nJTIwZGVzayUyMGF1dGhvcnxlbnwxfHx8fDE3Njg4MzQ1NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Writer's workspace"
                    className="w-full h-full object-cover"
                    fill
                  />
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mt-3 text-center italic">
                  Creating the right environment can help you tap into your
                  authentic voice
                </p>
              </div>

              <h3>4. Emotional Honesty: Connect with Your Readers</h3>

              <p>
                Emotional honesty in writing means being willing to explore
                difficult feelings and vulnerable moments. When you write with
                emotional truth, readers connect with your work on a deeper
                level because they recognize genuine human experience.
              </p>

              <p>
                This doesn't mean every piece needs to be deeply personal or
                confessional. Even in genre fiction or professional writing,
                emotional honesty manifests in how you portray characters,
                describe situations, and explore themes.
              </p>

              <h3>5. Experimentation: Finding What Works</h3>

              <p>
                Developing your voice requires experimentation. Try different
                genres, perspectives, and styles. Write pieces that push you
                outside your comfort zone. Through this exploration, you'll
                discover what feels right and what doesn't.
              </p>

              <p>
                Keep a journal where you experiment with different approaches.
                Write the same scene multiple ways. Try on different voices like
                trying on clothes—some will fit perfectly, others won't feel
                right, and that's exactly how you learn.
              </p>

              <h2>Practical Exercises to Develop Your Voice</h2>

              <p>
                Here are some concrete exercises to help you discover and
                strengthen your unique voice:
              </p>

              <ol className="space-y-3">
                <li>
                  <strong>Free Writing Sessions:</strong> Set a timer for 15
                  minutes and write continuously without editing. This helps you
                  tap into your natural voice without the internal critic
                  interfering.
                </li>
                <li>
                  <strong>Voice Analysis:</strong> Read your favorite authors
                  and identify what makes their voice distinctive. Then analyze
                  your own work looking for similar patterns and unique
                  qualities.
                </li>
                <li>
                  <strong>Perspective Shifting:</strong> Write about the same
                  event from multiple perspectives to understand how point of
                  view influences voice.
                </li>
                <li>
                  <strong>Constraint Writing:</strong> Give yourself specific
                  constraints (no adjectives, only dialogue, one-sentence
                  paragraphs) to discover new aspects of your voice.
                </li>
              </ol>

              <h2>Common Pitfalls to Avoid</h2>

              <p>
                As you work on developing your voice, be aware of these common
                mistakes:
              </p>

              <ul className="space-y-3">
                <li>
                  <strong>Trying to sound like someone else:</strong> Admiring
                  other writers is natural, but mimicking their voice will only
                  delay finding your own.
                </li>
                <li>
                  <strong>Over-editing too early:</strong> If you constantly
                  revise while drafting, you'll suppress your natural voice. Let
                  the first draft flow, then refine in revision.
                </li>
                <li>
                  <strong>Being afraid of judgment:</strong> Authenticity
                  requires vulnerability. Don't let fear of criticism keep you
                  from writing honestly.
                </li>
                <li>
                  <strong>Forcing a voice:</strong> Your voice should feel
                  natural, not manufactured. If it feels forced, you're probably
                  trying too hard.
                </li>
              </ul>

              <h2>The Journey Continues</h2>

              <p>
                Developing your unique voice is not a destination but an ongoing
                journey. Your voice will evolve as you grow as a person and as a
                writer. What matters is staying committed to authenticity,
                continuing to write regularly, and remaining open to discovery.
              </p>

              <p>
                Remember that every great writer started where you are
                now—searching for their voice, questioning their abilities, and
                working to improve their craft. The difference between those who
                succeed and those who don't often comes down to persistence and
                willingness to be authentically themselves on the page.
              </p>

              <p>
                At Paperstery, we understand the importance of nurturing and
                preserving your unique voice throughout the publishing process.
                Our editorial team works collaboratively with authors to refine
                their manuscript while ensuring their authentic voice remains
                strong and clear.
              </p>

              <div className="mt-12 p-8 bg-gradient-to-br from-[var(--color-primary)] to-[#4a0099] rounded-2xl text-white">
                <h3 className="text-white mb-4">
                  Ready to Share Your Voice with the World?
                </h3>
                <p className="text-white/90 mb-6">
                  Whether you're working on your first manuscript or your tenth,
                  Paperstery is here to help you bring your unique voice to
                  readers around the world.
                </p>
                <Button
                  size="lg"
                  className="bg-white text-[var(--color-primary)] hover:bg-white/90"
                >
                  Submit Your Manuscript
                </Button>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Author Bio */}
      <section className="py-16 bg-[var(--color-light-primary)]/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-[var(--color-light-primary)]">
                    <Image
                      src={post.author.image}
                      alt={post.author.name}
                      className="w-full h-full object-cover"
                      fill
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="mb-2">About the Author</h3>
                  <div className="text-[var(--color-primary)] font-medium mb-1">
                    {post.author.name}
                  </div>
                  <div className="text-sm text-[var(--color-text-secondary)] mb-4">
                    {post.author.role}
                  </div>
                  <p className="text-[var(--color-text-secondary)] mb-0">
                    {post.author.bio}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="mb-4">Related Articles</h2>
              <p className="text-lg text-[var(--color-text-secondary)]">
                Continue your journey with these insightful reads
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover"
                      fill
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <div className="px-3 py-1 rounded-full bg-white/90">
                        <span className="text-xs text-[var(--color-primary)] font-medium">
                          {relatedPost.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)] mb-3">
                      <Clock className="w-3 h-3" />
                      <span>{relatedPost.readTime}</span>
                    </div>

                    <h3 className="mb-3 text-lg">{relatedPost.title}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                      {relatedPost.excerpt}
                    </p>

                    <Button
                      variant="ghost"
                      className="text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 p-0 h-auto gap-1"
                    >
                      Read Article <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-[var(--color-primary)] to-[#4a0099] text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <BookOpen className="w-12 h-12 mx-auto mb-6 text-white" />
            <h2 className="mb-4 text-white">Never Miss an Insight</h2>
            <p className="text-lg text-white/90 mb-8">
              Join thousands of writers and creatives who receive our weekly
              newsletter with expert tips, industry insights, and inspiration
              delivered to your inbox.
            </p>

            <Button
              size="lg"
              className="bg-white text-[var(--color-primary)] hover:bg-white/90"
            >
              Subscribe to Newsletter
            </Button>

            <p className="text-xs text-white/70 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
