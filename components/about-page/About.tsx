"use client";
import { Globe2, Medal } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import library from "@/assets/images/library.jpeg";
import aboutSection from '@/assets/images/about-section.webp';

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function About() {
  return (
    <section className="pt-24 bg-white relative overflow-hidden" id="about">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src={aboutSection}
                alt="Book publishing workspace"
                className="w-full h-full object-cover"
                width={1080}
                height={1628}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-light-primary border border-primary/20 mb-4">
              <span className="flex items-center gap-1 text-sm text-primary font-medium">
                <Medal size={16} /> About Paperstery
              </span>
            </div>

            <h2 className="mb-6 text-primary">Who We Are</h2>

            <p className="mb-4">
              Paperstery Limited is an independent publishing company incorporated in both the
              United States and Nigeria, helping creatives, professionals, and
              organizations produce world-class books ranging from literary and
              creative works to academic and professional publications.
            </p>

            <p className="mb-6">
              We support authors through different stages of the publishing
              process, including development, editing, and preparation for
              publication.
            </p>
          </motion.div>
        </div>
      </div>
      <div className="bg-primary py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-12 shadow-xl text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-light-primary mb-6">
            <Globe2 className="w-10 h-10 text-primary" />
          </div>

          <h2 className="mb-6 text-primary">What we are about</h2>

          <p className="mb-8 text-lg">
            We believe in the metamorphosis of creativity: from dreams to
            stories, and from stories to legacies. Our entire work is thus
            centered on helping your ideas take shape and outlast even you!
          </p>

          <Button
            size="lg"
            asChild
            className="bg-primary text-white hover:bg-primary/90 transition-all shadow-md text-base px-8"
          >
            <Link href="/submit-manuscript">
              Publish With Us Today
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
