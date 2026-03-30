import { FAQ } from "@/components/shared/FAQ";
import { HeroSection } from "@/components/shared/HeroSection";

export const metadata = {
  title: "Frequently Asked Questions | Paperstery",
  description:
    "Find answers to common questions about publishing, submissions, timelines, and working with Paperstery.",
};

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
