import { Metadata } from "next";
import Link from "next/link";
import { SubmitManuscript } from "@/components/manuscript/SubmitManuscript";
import { ChevronRight } from "lucide-react";
import { HeroSection } from "@/components/shared/HeroSection";

export const metadata: Metadata = {
  title: "Submit Manuscript | Paperstery"
};

export default function Page() {
    return (
      <div>
        <HeroSection
          backgroundImage="/submit-hero.webp"
          heading="Submit Manuscript"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Submit Manuscript", href: "/submit-manuscript" },
          ]}
        />
        <SubmitManuscript />
      </div>
    );
}