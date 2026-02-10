"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface HeroSectionProps {
  backgroundImage: string;
  heading: string;
  breadcrumbs: BreadcrumbItem[];
}

export function HeroSection({
  backgroundImage,
  heading,
  breadcrumbs,
}: HeroSectionProps) {
  return (
    <section
      className="relative bg-center bg-cover bg-foreground/50 bg-blend-multiply flex justify-center h-[380px]"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <motion.div
        className="flex flex-col justify-center items-center gap-4 z-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h1
          className="text-white text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {heading}
        </motion.h1>

        <motion.div
          className="flex items-center gap-2 text-white mx-auto"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {breadcrumbs.map((item, index) => (
            <motion.div
              key={item.href}
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.2 + index * 0.1,
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {index > 0 && <ChevronRight size={18} />}
              {index === breadcrumbs.length - 1 ? (
                <span>{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="text-white/60 hover:text-white/90 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 bg-foreground/50"></div>
    </section>
  );
}
