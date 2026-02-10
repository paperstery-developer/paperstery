import { Metadata } from "next";
import { ServicesPageSection } from "@/components/services/ServicePageSection";
import { HeroSection } from "@/components/shared/HeroSection";

export const metadata: Metadata = {
  title: "Our Services | Paperstery",
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
