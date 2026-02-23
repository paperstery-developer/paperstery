import { FAQ } from "@/components/shared/FAQ";
import { HeroSection } from "@/components/shared/HeroSection";

export default function FAQS() {
  return (
    <div className="font-nobel_uno">
      <HeroSection
        backgroundImage="/contact-hero.webp"
        heading="Frequently Asked Questions"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "FAQs", href: "/faqs" },
        ]}
      />
      <FAQ />
    </div>
  );
}
