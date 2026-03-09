import { Metadata } from "next";
import { servicesData, ServiceSlug } from "@/lib/services-data";
import { notFound } from "next/navigation";
import Service from "@/components/services/ServiceTemplate";
import { Suspense } from "react";
import { HeroSection } from "@/components/shared/HeroSection";

interface Props {
  params: { slug: ServiceSlug };
}

// Generate metadata dynamically
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug];
  if (!service) return { title: "Service Not Found | Paperstery" };
  return { title: `${service.title} | Paperstery` };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <HeroSection
          backgroundImage="/services-hero.webp"
          heading={service.title}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.title, href: `/services/${slug}` },
          ]}
        />

        <Service data={service} />
      </div>

    </Suspense>
  );
}

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug: slug,
  }));
}
