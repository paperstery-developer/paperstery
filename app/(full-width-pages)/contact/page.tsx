import { ContactPageSection } from "@/components/contact/ContactPageSection";
import { HeroSection } from "@/components/shared/HeroSection";

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