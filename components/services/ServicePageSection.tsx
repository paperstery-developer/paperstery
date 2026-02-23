import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { servicesData } from "@/lib/services-data";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import papersteryServes from '@/assets/images/paperstery-serves.jpg';

export function ServicesPageSection() {
  const slugs = Object.keys(servicesData);

  const serviceItems = slugs.map((slug) => ({
    slug,
    ...servicesData[slug as keyof typeof servicesData],
  }));
  return (
    <div className="bg-background pt-24">
      {/* Hero Header */}
      <section className="relative text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
            Professional End-to-End <br />
            <span className="italic opacity-90 text-primary">Publishing Support.</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed">
            Close collaboration at every stage of the writing and publishing
            journey. We transform your ideas into world-class legacies.
          </p>
        </div>
      </section>


      {/* Services Bento Grid Section */}
      <section className="pt-16 pb-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-4 h-full">
          {/* 1. Large Featured Card (Manuscript Development) */}
          <BentoCard
            service={serviceItems[0]}
            className="md:col-span-4 md:row-span-1 bg-slate-900 text-white"
            iconClassName="bg-white/10 text-white"
          />

          {/* 2. Collaborative Writing */}
          <BentoCard
            service={serviceItems[1]}
            className="md:col-span-2 md:row-span-1 bg-white border border-slate-100"
          />

          {/* 3. Academic Publishing */}
          <BentoCard
            service={serviceItems[2]}
            className="md:col-span-2 md:row-span-2 bg-white border border-slate-100"
          />

          {/* 4. Design & Production */}
          <BentoCard
            service={serviceItems[3]}
            className="md:col-span-2 md:row-span-1 bg-primary text-white"
            iconClassName="bg-white/20 text-white"
          />

          {/* 5. Publishing Guidance */}
          <BentoCard
            service={serviceItems[4]}
            className="md:col-span-2 md:row-span-1 bg-white border border-slate-100"
          />
          <div className="group relative overflow-hidden rounded-3xl md:col-span-4 md:row-span-1 transition-all duration-500 shadow hover:shadow-2xl border border-primary/30 hover:border-primary/60">
            {/* Background Decorative Element */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-current opacity-[0.03] rounded-full group-hover:scale-150 transition-transform duration-700" />
            <Image
              src={papersteryServes}
              alt="Paperstery Serves"
              className="aspect-video object-cover object-top max-h-[335px] rounded-3xl"
            />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-8 text-primary">
            Ready to bring your story to life?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="rounded-full px-10 py-7 text-lg" asChild>
              <Link href="/submit-manuscript">
                Publish With Us Today
              </Link>
            </Button>
            <Link
              href="/contact"
              className="text-primary font-semibold hover:underline underline-offset-4"
            >
              Talk to an expert first
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function BentoCard({
  service,
  className,
  iconClassName,
}: {
  service: any;
  className?: string;
  iconClassName?: string;
}) {
  const Icon = service.parentIcon;

  return (
    <Link
      href={`/services/${service.slug}`}
      className={`group relative p-8 rounded-3xl transition-all duration-500 shadow hover:shadow-2xl overflow-hidden flex flex-col justify-between border border-primary/30 hover:border-primary/60 ${className}`}
    >
      {/* Background Decorative Element */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-current opacity-[0.03] rounded-full group-hover:scale-150 transition-transform duration-700 backdrop-blur-sm" />

      <div>
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 ${iconClassName || "bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white"}`}
        >
          <Icon size={24} />
        </div>
        <h3 className="text-2xl font-serif mb-3 leading-tight">
          {service.title}
        </h3>
        <p
          className={`text-sm leading-relaxed mb-6 line-clamp-3 ${className?.includes("text-white") ? "text-slate-300" : "text-foreground"}`}
        >
          {service.subHeading}
        </p>
      </div>

      <div className="flex items-center gap-2 font-medium text-sm mt-auto">
        <span className="group-hover:underline underline-offset-4">
          Explore Service
        </span>
        <ArrowUpRight
          size={16}
          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
        />
      </div>
    </Link>
  );
}