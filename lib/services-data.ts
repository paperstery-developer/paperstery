import {
  Search,
  PenTool,
  Fingerprint,
  Users,
  ShieldCheck,
  Clock,
  GraduationCap,
  Globe,
  BarChart3,
  Palette,
  Layout,
  Smartphone,
  Compass,
  BookMarked,
  Calendar,
  FileEdit,
  Book,
} from "lucide-react";

export const servicesData = {
  "manuscript-development": {
    title: "Manuscript Development & Editing",
    heading: "Refine Your Vision with Professional Rigor.",
    subHeading:
      "For authors who have a draft but need structure, clarity, and professional refinement to prepare for the world stage.",
    whoItIsFor: [
      "Fiction writers",
      "Memoirists",
      "Poets with completed or partial drafts",
    ],
    parentIcon: FileEdit,
    approach:
      "We provide deep editorial guidance to ensure your work meets high professional standards while honoring the core of your story.",
    benefits: [
      {
        title: "Structural Analysis",
        description:
          "Deep-dive clarity enhancement to ensure your narrative arc and logic are airtight.",
        icon: Search,
      },
      {
        title: "Professional Refinement",
        description:
          "Polishing every sentence to ensure publication readiness for the global market.",
        icon: PenTool,
      },
      {
        title: "Voice Preservation",
        description:
          "We refine the technicality without losing the unique 'soul' and style of the author.",
        icon: Fingerprint,
      },
    ],
    cta: "Submit Your Draft for Review",
  },
  "collaborative-writing": {
    title: "Collaborative Writing Support",
    heading: "Your Ideas, Our Expertise.",
    subHeading:
      "Structured writing support for professionals and thought leaders who need a partner to build the manuscript.",
    whoItIsFor: [
      "Experts and Founders",
      "Consultants",
      "Thought leaders looking to build authority",
    ],
    parentIcon: Users,
    approach:
      "We work in close collaboration with you to develop your expertise into a publication-ready manuscript.",
    benefits: [
      {
        title: "Expert Translation",
        description:
          "Translates complex expertise into a readable, professional format for your audience.",
        icon: Users,
      },
      {
        title: "Brand Excellence",
        description:
          "Maintains your professional intent and brand excellence in every chapter.",
        icon: ShieldCheck,
      },
      {
        title: "End-to-End Support",
        description:
          "Comprehensive support from the initial ideation to a complete, ready manuscript.",
        icon: Clock,
      },
    ],
    cta: "Start Your Collaboration",
  },
  "academic-publishing": {
    title: "Academic & Institutional Publishing",
    heading: "Institutional Credibility Through Publishing.",
    subHeading:
      "High-standard publishing services for organizations seeking to share research and knowledge products.",
    whoItIsFor: [
      "Academic institutions",
      "Corporate organizations",
      "Research bodies",
    ],
    parentIcon: GraduationCap,
    approach:
      "We deliver materials that reflect your organization's brand excellence and intellectual rigor.",
    benefits: [
      {
        title: "Instructional Expertise",
        description:
          "Specialized knowledge in handling research-based and instructional materials.",
        icon: GraduationCap,
      },
      {
        title: "Corporate Design",
        description:
          "Professional design tailored for corporate reports and institutional books.",
        icon: BarChart3,
      },
      {
        title: "Institutional Reach",
        description:
          "Strategic guidance on global distribution to maximize your institutional impact.",
        icon: Globe,
      },
    ],
    cta: "Commission a Project",
  },
  "design-production": {
    title: "Design & Production",
    heading: "Purposeful Design for Print and Digital.",
    subHeading:
      "Visual storytelling that aligns with the tone and purpose of your unique project.",
    whoItIsFor: [
      "Authors seeking world-class covers",
      "Organizations needing technical layouts",
      "Digital-first publishers",
    ],
    parentIcon: Palette,
    approach:
      "We handle the visual metamorphosis of your book, ensuring it looks as professional as it reads.",
    benefits: [
      {
        title: "Custom Cover Design",
        description:
          "Bespoke cover art tailored specifically to your genre and target audience.",
        icon: Palette,
      },
      {
        title: "Interior Layout",
        description:
          "Professional interior formatting that ensures a seamless reading experience.",
        icon: Layout,
      },
      {
        title: "Multi-Format Optimization",
        description:
          "Perfectly optimized files for both high-quality print and digital editions.",
        icon: Smartphone,
      },
    ],
    cta: "Get in Touch",
  },
  "publishing-guidance": {
    title: "Publishing Guidance",
    heading: "Navigate the Path to Publication.",
    subHeading:
      "Expert support with the technical and administrative details of the publishing world.",
    whoItIsFor: [
      "First-time authors",
      "Self-publishing professionals",
      "International authors",
    ],
    parentIcon: Book,
    approach:
      "We remove the guesswork, providing support with imprint details and distribution decisions.",
    benefits: [
      {
        title: "Strategic Mapping",
        description:
          "Expert guidance on selecting the best publishing formats for your specific goals.",
        icon: Compass,
      },
      {
        title: "Rights & Distribution",
        description:
          "Support with ISBNs, rights retention, and global distribution strategies.",
        icon: BookMarked,
      },
      {
        title: "Project Timelines",
        description:
          "Clear, realistic timelines based on the unique scope of your project.",
        icon: Calendar,
      },
    ],
    cta: "Speak with a Publishing Guide",
  },
};

export type ServiceSlug = keyof typeof servicesData;
