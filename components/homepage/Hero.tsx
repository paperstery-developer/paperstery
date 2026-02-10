"use client";
import {
  BookOpen,
  Feather,
  Briefcase,
  Building2,
  Stars,
  Lightbulb,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import hero from "@/assets/images/hero.png";
import library from "@/assets/images/library.jpeg";
import Link from "next/link";

export function Hero() {
  const audiences = [
    {
      icon: Lightbulb,
      title: "Creatives",
      description:
        "Fiction writers, memoirists, and poets ready to share their voice with the world.",
    },
    {
      icon: Briefcase,
      title: "Professionals",
      description:
        "Experts and thought leaders looking to become the go-to authority in their industry.",
    },
    {
      icon: Building2,
      title: "Organizations",
      description:
        "Academic and corporate institutions requiring brand excellence and intellectual rigor.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative flex items-center overflow-hidden ">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={library}
            alt="Library books with stairs"
            className="w-full h-full object-cover opacity-10"
            width={1079}
            height={1352}
          />
          <div className="absolute inset-0 bg-linear-to-r from-background/50 via-background/40 to-background/30"></div>
        </div>

        {/* Floating Illustrations */}
        <motion.div
          className="absolute top-12 right-[25%] opacity-10"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <BookOpen className="w-32 h-32 text-primary" />
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-[25%] opacity-10"
          animate={{ y: [0, 20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Feather className="w-24 h-24 text-primary" />
        </motion.div>

        <div className="container mx-auto px-6 py-20 relative z-10 flex gap-12 justify-center items-center">
          <div className="w-1/2 max-w-4xl mx-auto text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-light-primary border border-primary/20 mb-6">
                <Stars className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">
                  Welcome to Paperstery
                </span>
              </div>

              <h1 className="mb-6 text-primary">
                Dare Your Dreams. Publish With Paperstery!
              </h1>
              <p>
                We are an independent publishing house helping creatives,
                professionals, and organizations transform stories into
                world-class legacies.
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
                <Button
                  size="lg"
                  asChild
                  className="bg-primary text-white hover:bg-primary/90 transition-all shadow-lg text-base px-8"
                >
                  <Link href="/submit-manuscript">
                    Publish With Us Today
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 50, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="w-1/2 flex items-center justify-center"
          >
            <Image
              src={hero}
              alt="#"
              width={1500}
              height={1125}
              className="ml-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Who We Cater To Section */}
      <section className="py-20 bg-white" id="who-we-cater-to">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="mb-4 text-primary text-5xl!">Who We Cater To</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {audiences.map((audience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-background rounded-xl p-8 shadow-md hover:shadow-xl transition-all border border-light-primary hover:border-primary/50"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-light-primary mb-6">
                  <audience.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="mb-4 text-2xl">{audience.title}</h3>
                <p className="text-base leading-relaxed">
                  {audience.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
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
    </div>
  );
}
