import { Metadata } from "next";
import { SubmitManuscript } from "@/components/manuscript/SubmitManuscript";
import { HeroSection } from "@/components/shared/HeroSection";

export const metadata: Metadata = {
  title: "Submit Manuscript | Paperstery",
  description:
    "Submit your manuscript, proposal, or idea for review. No submission fee required.",
  keywords: [
    "submit manuscript",
    "publish my book",
    "book proposal submission",
    "publishing company submission",
  ],
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