"use client";
import { Globe2, Medal } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import library from "@/assets/images/library.jpeg";
import aboutSection from '@/assets/images/about-section.webp';

import { Button } from "@/components/ui/button";

export function About() {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="about">
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
              Paperstery is an independent publishing company based in both the
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

          <h2 className="mb-6 text-primary">We Are Global</h2>

          <p className="mb-8 text-lg">
            We believe in the metamorphosis of creativity: from dreams to
            stories, and from stories to legacies. Our entire work is thus
            centered on helping your ideas take shape and outlast even you!
          </p>

          <Button
            size="lg"
            className="bg-primary text-white hover:bg-primary/90 transition-all shadow-md text-base px-8"
          >
            Publish With Us Today
          </Button>
        </motion.div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 grid-rows-3 gap-12 my-24">
          <div className="row-span-3 grid grid-cols-1 grid-rows-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="group rounded-2xl hover:bg-primary bg-light-primary transition-all duration-200 p-6 shadow-lg"
            >
              <h3 className="mb-4 bg-white w-fit py-3 px-4 rounded-2xl">
                Mission
              </h3>

              <p className="mb-6 group-hover:text-white transition-all">
                To transform ideas into legacies. We are an international
                publishing house helping authors and organizations produce
                world-class publications that endure.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="group rounded-2xl hover:bg-primary bg-light-primary transition-all duration-200 p-6 shadow-lg"
            >
              <h3 className="mb-4 bg-white w-fit py-3 px-4 rounded-2xl">
                Scope
              </h3>

              <p className="mb-6 group-hover:text-white transition-all">
                From soul-stirring literary works and memoirs to high-impact
                academic reports and professional guides, we handle projects
                that demand excellence and intellectual rigor.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="group rounded-2xl hover:bg-primary bg-light-primary transition-all duration-200 p-6 shadow-lg"
            >
              <h3 className="mb-4 bg-white w-fit py-3 px-4 rounded-2xl">
                Support
              </h3>

              <p className="mb-6 group-hover:text-white transition-all">
                We provide end-to-end partnership—guiding you through
                collaborative writing, professional editorial refinement, and
                strategic design to prepare your work for the global stage.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="row-span-3"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={library}
                alt="Library"
                className="w-full h-full object-cover"
                width={1080}
                height={1628}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
