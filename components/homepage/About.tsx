"use client";
import { Medal } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import aboutImage from "@/assets/images/about.jpg";

export function About() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden" id="about">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={aboutImage}
                alt="Book publishing workspace"
                className="w-full h-[500px] object-cover object-center"
                width={1080}
                height={1356}
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center items-center md:items-start md:justify-start"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/80 border-white border mb-4">
              <span className="flex items-center text-sm text-primary font-medium gap-1.5">
                <Medal size={14} />
                Who We Are
              </span>
            </div>

            <h2 className="mb-6 md:text-5xl! text-center md:text-left text-white">
              We do not just create books; we create legacies.
            </h2>

            <p className="mb-4 text-white text-center md:text-left">
              We believe in the metamorphosis of creativity: from dreams to
              stories, and from stories to legacies. Our entire work is thus
              centered on helping your ideas take shape and outlast even you!
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-8">
              <Button variant={"outline"} size={"lg"} asChild>
                <Link href="/about">Read Our Story</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
