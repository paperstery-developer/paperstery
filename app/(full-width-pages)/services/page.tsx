import { Metadata } from "next";
import { ServicesPageSection } from "@/components/services/ServicePageSection";
import { HeroSection } from "@/components/shared/HeroSection";

export const metadata: Metadata = {
  title: "Our Services | Paperstery",
  description:
    "Explore professional publishing services including manuscript editing, collaborative writing, design, and publishing guidance.",
  keywords: [
    "publishing services",
    "book editing services",
    "ghostwriting support",
    "book design and formatting",
    "ISBN publishing help",
  ],
};

export default function Page() {
  return (
    <div>
      <HeroSection
        backgroundImage="/services-hero.webp"
        heading="Our Services"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
      />
      <ServicesPageSection />
    </div>
  );
}
