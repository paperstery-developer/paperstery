"use client"
import { motion } from "motion/react";
import { Shield, ChevronRight, Mail, Globe2, Lock, FileText, Users, Eye, Cookie, ExternalLink, RefreshCw, AlertCircle } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    number: "01",
    title: "Introduction",
    icon: Shield,
    content: (
      <p className="text-secondary leading-relaxed">
        Welcome to <strong className="text-primary">Paperstery</strong>. We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you interact with our website, submit manuscripts, or engage with our services.
        <br /><br />
        By using our website, you agree to the terms outlined in this policy.
      </p>
    ),
  },
  {
    number: "02",
    title: "Information We Collect",
    icon: Eye,
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary font-bold">a</span>
            Personal Information
          </h4>
          <p className="text-secondary mb-3">When you interact with us, you may provide:</p>
          <ul className="space-y-2">
            {["Name", "Email address", "Phone number", "Manuscripts, proposals, or written materials", "Any information submitted through contact forms or email"].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-secondary">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary font-bold">b</span>
            Usage Data
          </h4>
          <p className="text-secondary mb-3">We may automatically collect:</p>
          <ul className="space-y-2">
            {["IP address", "Browser type", "Pages visited", "Time spent on pages"].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-secondary">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-secondary mt-3 text-sm italic">This helps us improve our website and user experience.</p>
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "How We Use Your Information",
    icon: FileText,
    content: (
      <div>
        <p className="text-secondary mb-4">We use your information to:</p>
        <ul className="space-y-2 mb-4">
          {[
            "Review manuscript submissions and proposals",
            "Communicate with you about your project or inquiry",
            "Provide and improve our publishing services",
            "Respond to questions and support requests",
            "Maintain the security and functionality of our website",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-secondary">
              <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
          <p className="text-primary font-medium text-sm flex items-center gap-2">
            <Shield className="w-4 h-4" />
            We do not sell your personal information.
          </p>
        </div>
      </div>
    ),
  },
  {
    number: "04",
    title: "Manuscripts & Intellectual Property",
    icon: FileText,
    content: (
      <div>
        <p className="text-secondary mb-4">
          All manuscripts, ideas, and materials submitted to Paperstery remain <strong className="text-primary">your intellectual property</strong>.
        </p>
        <p className="text-secondary mb-3">We treat all submissions with confidentiality and only use them for:</p>
        <ul className="space-y-2 mb-4">
          {["Evaluation", "Communication regarding potential collaboration"].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-secondary">
              <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-secondary">We do not share your work with third parties without your consent.</p>
      </div>
    ),
  },
  {
    number: "05",
    title: "Data Sharing",
    icon: Users,
    content: (
      <div>
        <p className="text-secondary mb-4">We may share limited information with:</p>
        <ul className="space-y-2 mb-4">
          {["Trusted service providers (e.g., email platforms, hosting services)", "Legal authorities when required by law"].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-secondary">
              <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-secondary">All third parties are required to handle your data securely.</p>
      </div>
    ),
  },
  {
    number: "06",
    title: "Data Security",
    icon: Lock,
    content: (
      <div>
        <p className="text-secondary mb-4">
          We take reasonable measures to protect your information from unauthorized access, misuse, or disclosure.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-amber-700 text-sm flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            However, no system is completely secure, and we cannot guarantee absolute security.
          </p>
        </div>
      </div>
    ),
  },
  {
    number: "07",
    title: "International Users",
    icon: Globe2,
    content: (
      <p className="text-secondary leading-relaxed">
        Paperstery operates in both the <strong className="text-primary">United States and Nigeria</strong> and works with clients globally. By using our services, you understand that your information may be processed in these or other jurisdictions.
      </p>
    ),
  },
  {
    number: "08",
    title: "Your Rights",
    icon: Shield,
    content: (
      <div>
        <p className="text-secondary mb-4">You may:</p>
        <ul className="space-y-2 mb-4">
          {["Request access to your personal data", "Request correction or deletion", "Withdraw consent for communications"].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-secondary">
              <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-secondary">To do so, contact us at <a href="mailto:info@paperstery.com" className="text-primary font-medium hover:underline">info@paperstery.com</a>.</p>
      </div>
    ),
  },
  {
    number: "09",
    title: "Cookies",
    icon: Cookie,
    content: (
      <p className="text-secondary leading-relaxed">
        We may use cookies to improve your browsing experience and analyze site usage. You can disable cookies in your browser settings.
      </p>
    ),
  },
  {
    number: "10",
    title: "Third-Party Links",
    icon: ExternalLink,
    content: (
      <p className="text-secondary leading-relaxed">
        Our website may contain links to external websites. We are not responsible for their privacy practices.
      </p>
    ),
  },
  {
    number: "11",
    title: "Updates to This Policy",
    icon: RefreshCw,
    content: (
      <p className="text-secondary leading-relaxed">
        We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised date.
      </p>
    ),
  },
  {
    number: "12",
    title: "Contact Us",
    icon: Mail,
    content: (
      <div>
        <p className="text-secondary mb-4">For questions about this policy or your data:</p>
        <Link
          href="mailto:info@paperstery.com"
          className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
        >
          <Mail className="w-4 h-4" />
          info@paperstery.com
        </Link>
      </div>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-linear-to-br from-primary to-[#4a0099] text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 mb-6">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Privacy Policy</span>
            </div>
            <h1 className="mb-6 text-white text-4xl font-bold">Your Privacy Matters</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-6">
              We are committed to protecting your personal information and being transparent about how we use it.
            </p>
            <p className="text-white/70 text-sm">Last Updated: March 2026</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Quick Nav */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-background rounded-2xl border border-light-primary p-6 mb-12"
            >
              <p className="text-sm font-semibold text-primary mb-4 uppercase tracking-wider">Table of Contents</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {sections.map((s) => (
                  <Link
                    key={s.number}
                    href={`#section-${s.number}`}
                    className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors group"
                  >
                    <span className="text-xs font-mono text-primary/50 group-hover:text-primary transition-colors">{s.number}</span>
                    <ChevronRight className="w-3 h-3 text-primary/30 group-hover:text-primary transition-colors" />
                    {s.title}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Sections */}
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={section.number}
                  id={`section-${section.number}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.04 }}
                  viewport={{ once: true }}
                  className="bg-background rounded-2xl border border-light-primary p-8 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <section.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-primary/50 uppercase tracking-widest">Section {section.number}</span>
                      <h3 className="text-xl font-semibold text-primary">{section.title}</h3>
                    </div>
                  </div>
                  <div className="sm:ml-15 pl-1">{section.content}</div>
                </motion.div>
              ))}
            </div>

            {/* Footer tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-16 text-center py-10 border-t border-light-primary"
            >
              <p className="text-primary font-semibold text-lg italic">
                Paperstery — Dare Your Dreams. Publish With Paperstery.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}