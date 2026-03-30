import { Metadata } from "next";
import { HeroSection } from "@/components/shared/HeroSection";
import { About } from "@/components/about-page/About";
import { Newsletter } from "@/components/common/Newsletter";

export const metadata: Metadata = {
  title: "About Paperstery | We Create Legacies",
  description:
    "Learn about Paperstery, an independent publishing company helping authors and organizations produce world-class books across the US and Nigeria.",
  keywords: [
    "about publishing company",
    "independent publisher",
    "book publishing Nigeria",
    "publishing company USA and Nigeria",
  ],
};

export default function Page() {
  return (
    <div>
      <HeroSection
        backgroundImage="/about-hero.webp"
        heading="About Us"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      />
      <About />
      <Newsletter />
    </div>
  );
}
