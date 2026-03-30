import { ContactPageSection } from "@/components/contact/ContactPageSection";
import { HeroSection } from "@/components/shared/HeroSection";

export const metadata = {
  title: "Contact Paperstery | Start Your Publishing Journey",
  description:
    "Get in touch with Paperstery to discuss your book, ask questions, or start your publishing journey.",
};

export default function Page() {
    return (
        <div>
            <HeroSection
                    backgroundImage="/contact-hero.webp"
                    heading="Contact Us"
                    breadcrumbs={[
                      { label: "Home", href: "/" },
                      { label: "Contact", href: "/contact" },
                    ]}
                  />
            <ContactPageSection />
        </div>
    )
}