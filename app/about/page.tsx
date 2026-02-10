import { Metadata } from "next";
import { HeroSection } from "@/components/shared/HeroSection";
import { About } from "@/components/about-page/About";

export const metadata: Metadata = {
  title: "About Us | Paperstery",
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
    </div>
  );
}
