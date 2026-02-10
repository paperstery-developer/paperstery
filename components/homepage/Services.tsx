'use client'
import { motion } from "motion/react";
import { 
  FileEdit, 
  Users, 
  GraduationCap, 
  Palette, 
  Book,
  Cog
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Services() {
  const services = [
    {
      icon: FileEdit,
      title: "Manuscript Development & Editing",
      description: "For authors who already have a draft but need structure, clarity, refinement, and professional editorial guidance to prepare the work for publication.",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: Users,
      title: "Collaborative Writing Support",
      description: "For professionals, thought leaders, and organizations who have clear ideas, expertise, or existing material but need structured writing support to develop these into a complete, publication-ready manuscript, produced in close collaboration and in line with the author's voice and intent.",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: GraduationCap,
      title: "Academic & Institutional Publishing",
      description: "For academic and corporate organizations seeking to publish research-based, instructional, or institutional materials that meet high editorial and professional standards.",
      color: "from-indigo-400 to-indigo-600",
    },
    {
      icon: Palette,
      title: "Design & Production",
      description: "Cover design, interior layout, and formatting for print and digital editions, handled in line with the tone and purpose of each project.",
      color: "from-pink-400 to-pink-600",
    },
    {
      icon: Book,
      title: "Publishing Guidance",
      description: "Support with ISBNs, imprint details, publishing formats, and distribution decisions.",
      color: "from-teal-400 to-teal-600",
    },
  ];

  return (
    <section className="py-24 bg-white pattern-bg" id="services">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-light-primary border-primary/30 border mb-4">
            <span className="flex items-center gap-1.5 text-sm text-primary font-medium">
              <Cog size={14} />
              What We Offer
            </span>
          </div>
          <h2 className="mb-4 text-primary">Our Services</h2>
          <p className="max-w-3xl mx-auto text-lg">
            We offer end-to-end publishing support, working closely with authors
            and organizations at different stages of the writing and publishing
            process.
          </p>
        </motion.div>

        <div className="hidden md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-light-primary/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-light-primabg-light-primary"
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-linear-to-br ${service.color} mb-6 shadow-md`}
              >
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-4 text-xl">{service.title}</h3>
              <p className="text-base leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-20">
          {/* The Central Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-[calc(100%-152px)] bg-light-primary/90 hidden md:block" />

          <div className="space-y-16 md:space-y-20">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={index} className="relative md:flex md:items-center">
                  <div
                    className={`flex flex-col md:flex-row items-center justify-center w-full ${
                      isEven ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* The Content Card */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 60 : -60 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="w-full md:w-[45%] relative" // Increased width to 45% to close the gap
                    >
                      <div className="bg-light-primary/50 rounded-2xl p-8 shadow-lg border border-light-primary/20 backdrop-blur-sm relative">
                        {/* Triangular Pointer */}
                        <div
                          className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-0 h-0 
                    border-y-10 border-y-transparent 
                    ${
                      isEven
                        ? "right-full border-r-15 border-r-light-primary"
                        : "left-full border-l-15 border-l-light-primary"
                    }`}
                        />

                        <h3 className="mb-2 text-xl font-bold">
                          {service.title}
                        </h3>
                        <p className="text-sm leading-relaxed opacity-80">
                          {service.description}
                        </p>
                      </div>
                    </motion.div>

                    {/* The Icon as the Dot (The Center Anchor) */}
                    <div className="relative flex items-center justify-center w-20 md:w-32 z-20">
                      {/* Fixed width wrapper helps control gap */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        className={`w-20 h-20 rounded-full bg-linear-to-br from-primary/70 to-primary border-4 border-white shadow-lg flex items-center justify-center shrink-0`}
                      >
                        <service.icon className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>

                    {/* Spacer for Symmetery */}
                    <div className="hidden md:block md:w-[45%]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            size="lg"
            asChild
            className="bg-primary text-white hover:bg-primary/90 transition-all shadow-md text-base px-8"
          >
            <Link href="/services">
              Learn More
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
