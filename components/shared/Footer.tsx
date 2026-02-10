"use client";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import Link from "next/link";
import LogoWhite from "./LogoWhite";
import IconWhite from "./IconWhite";
import { offices } from "@/lib/constants";

export function Footer() {
  return (
    <footer
      className="bg-linear-to-br from-primary to-[#4a0099] text-white font-nobel_uno font-semibold"
      id="contact"
    >
      {/* CTA Section */}
      <section className="py-20 border-b border-white/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 mb-6">
              <IconWhite />
            </div>

            <h2 className="mb-6 text-white">Ready to Publish Your Legacy?</h2>
            <p className="mb-8 text-white/90 text-2xl font-normal">
              Join authors and organizations who trust Paperstery to transform
              their ideas into world-class publications.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 transition-all shadow-lg"
              >
                <Link href="/submit-manuscript">Submit a Manuscript</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Links */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div>
              <Link href={"/"} className="flex items-center gap-2 mb-4">
                <LogoWhite />
              </Link>
              <p className="text-white/70 text-sm mb-4">
                Independent publishing company helping creatives, professionals,
                and organizations create legacies through world-class books.
              </p>
              <div className="flex gap-3">
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="mb-4 text-white font-semibold">Services</h4>
              <ul className="space-y-6 text-white/70 text-sm">
                <li>
                  <Link
                    href="/#services"
                    className="hover:text-white transition-colors"
                  >
                    Manuscript Development
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#services"
                    className="hover:text-white transition-colors"
                  >
                    Collaborative Writing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#services"
                    className="hover:text-white transition-colors"
                  >
                    Academic Publishing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#services"
                    className="hover:text-white transition-colors"
                  >
                    Design & Production
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#services"
                    className="hover:text-white transition-colors"
                  >
                    Publishing Guidance
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="mb-4 text-white font-semibold">Links</h4>
              <ul className="space-y-6 text-white/70 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="hover:text-white transition-colors"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#faq"
                    className="hover:text-white transition-colors"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/submit-manuscript"
                    className="hover:text-white transition-colors"
                  >
                    Submit Manuscript
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-4 text-white font-semibold">Contact</h4>
              <ul className="space-y-3 text-white/70 text-sm">
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-white mt-1 shrink-0" />
                  <Link
                    href="mailto:paperstery@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    paperstery@gmail.com
                  </Link>
                </li>
                <li className="flex flex-col gap-6">
                  {offices.map((office, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-white mt-1 shrink-0" />
                      <p className="text-sm leading-relaxed">
                        <strong className="text-white block mb-1">
                          {office.location} Address:
                        </strong>
                        {office.address},
                        <br />
                        {office.city},
                        <br />
                        {office.country}
                      </p>
                    </div>
                  ))}
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/10 text-center text-white/60 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Paperstery. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
