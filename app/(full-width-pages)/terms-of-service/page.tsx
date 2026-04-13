"use client"
import { motion } from "motion/react";
import { BookOpen, ChevronRight, Mail, Scale, FileSignature, CreditCard, UserX, MessageSquare, ShieldOff, XCircle, Gavel, RefreshCw, CheckCircle } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    number: "01",
    title: "Introduction",
    icon: BookOpen,
    content: (
      <p className="text-secondary leading-relaxed">
        Welcome to <strong className="text-primary">Paperstery</strong>. By
        accessing or using our website and services, you agree to these Terms of
        Service. If you do not agree, please do not use our platform.
      </p>
    ),
  },
  {
    number: "02",
    title: "Our Services",
    icon: CheckCircle,
    content: (
      <div>
        <p className="text-secondary mb-4">
          Paperstery provides publishing-related services, including:
        </p>
        <ul className="space-y-2 mb-4">
          {[
            "Manuscript development and editing",
            "Collaborative writing support",
            "Academic and institutional publishing",
            "Design and production",
            "Publishing guidance",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-secondary">
              <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-secondary text-sm italic">
          All services are provided based on individual agreements or contracts.
        </p>
      </div>
    ),
  },
  {
    number: "03",
    title: "Submissions",
    icon: FileSignature,
    content: (
      <div>
        <p className="text-secondary mb-4">
          By submitting a manuscript, proposal, or idea:
        </p>
        <ul className="space-y-2 mb-4">
          {[
            "You confirm that the work is yours or you have the right to submit it",
            "You grant us permission to review the material",
            "Submission does not guarantee acceptance, publication, or partnership",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-secondary">
              <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-secondary">
          We review submissions at our discretion.
        </p>
      </div>
    ),
  },
  {
    number: "04",
    title: "Intellectual Property",
    icon: Scale,
    content: (
      <div>
        <p className="text-secondary mb-4">
          You retain{" "}
          <strong className="text-primary">ownership of your work</strong>{" "}
          unless otherwise stated in a written agreement.
        </p>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
          <p className="text-primary font-medium text-sm flex items-center gap-2">
            <Scale className="w-4 h-4" />
            No rights are transferred to Paperstery unless explicitly agreed
            upon in a contract.
          </p>
        </div>
      </div>
    ),
  },
  {
    number: "05",
    title: "No Guarantee of Outcomes",
    icon: ShieldOff,
    content: (
      <div>
        <p className="text-secondary mb-4">We do not guarantee:</p>
        <ul className="space-y-2 mb-4">
          {[
            "Publication acceptance",
            "Commercial success or bestseller status",
            "Specific timelines unless agreed in writing",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-secondary">
              <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-secondary text-sm italic">
          Publishing outcomes depend on multiple factors beyond our control.
        </p>
      </div>
    ),
  },
  {
    number: "06",
    title: "Payments & Agreements",
    icon: CreditCard,
    content: (
      <div>
        <p className="text-secondary mb-4">Where applicable:</p>
        <ul className="space-y-2">
          {[
            "Services may require fees",
            "Terms, timelines, and deliverables will be outlined in separate agreements",
            "Work typically begins after agreement and confirmation of payment",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-secondary">
              <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    number: "07",
    title: "Refund Policy",
    icon: CreditCard,
    content: (
      <div className="space-y-4 text-secondary">
        <p>
          Payments are generally non-refundable once a project has commenced,
          as resources are allocated and work begins upon confirmation.
        </p>
        <p>
          Where a project is cancelled before any work has started, a full
          refund may be granted where a reasonable basis for cancellation is
          provided.
        </p>
        <p>
          Once work has started, payments will not be refunded, as time and
          resources have already been committed to the project.
        </p>
        <p>
          Where concerns arise, we will make reasonable efforts to address them
          within the agreed scope of work.
        </p>
        <p>
          Any exceptions to this policy are considered at the sole discretion
          of Paperstery Limited.
        </p>
      </div>
    ),
  },
  {
    number: "08",
    title: "User Conduct",
    icon: UserX,
    content: (
      <div>
        <p className="text-secondary mb-4">You agree not to:</p>
        <ul className="space-y-2">
          {[
            "Submit false, misleading, or unlawful content",
            "Violate intellectual property rights",
            "Use the website for harmful or abusive purposes",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-secondary">
              <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    number: "09",
    title: "Communication",
    icon: MessageSquare,
    content: (
      <div>
        <p className="text-secondary mb-4">
          By contacting us or submitting forms, you agree that we may respond
          via:
        </p>
        <ul className="space-y-2 mb-4">
          {["Email", "Phone"].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-secondary">
              <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-secondary">
          You may opt out of communications at any time.
        </p>
      </div>
    ),
  },
  {
    number: "10",
    title: "Limitation of Liability",
    icon: ShieldOff,
    content: (
      <div>
        <p className="text-secondary mb-4">
          To the fullest extent permitted by law, Paperstery is not liable for:
        </p>
        <ul className="space-y-2">
          {[
            "Indirect or consequential damages",
            "Loss of data, profits, or opportunities",
            "Outcomes related to publishing performance",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-secondary">
              <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    number: "10",
    title: "Termination",
    icon: XCircle,
    content: (
      <div>
        <p className="text-secondary mb-4">We reserve the right to:</p>
        <ul className="space-y-2">
          {[
            "Decline submissions",
            "Refuse service",
            "Terminate engagements where necessary",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-secondary">
              <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    number: "11",
    title: "Governing Law",
    icon: Gavel,
    content: (
      <p className="text-secondary leading-relaxed">
        These Terms are governed by applicable laws in jurisdictions where
        Paperstery operates, including the{" "}
        <strong className="text-primary">United States and Nigeria</strong>.
      </p>
    ),
  },
  {
    number: "12",
    title: "Changes to These Terms",
    icon: RefreshCw,
    content: (
      <p className="text-secondary leading-relaxed">
        We may update these Terms at any time. Continued use of our website
        constitutes acceptance of the updated Terms.
      </p>
    ),
  },
  {
    number: "13",
    title: "Contact",
    icon: Mail,
    content: (
      <div>
        <p className="text-secondary mb-4">
          For any questions regarding these Terms:
        </p>
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

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary to-[#4a0099] text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 mb-6">
              <Scale className="w-4 h-4" />
              <span className="text-sm font-medium">Terms of Service</span>
            </div>
            <h1 className="mb-6 text-white text-4xl font-bold">Terms of Service</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-6">
              Please read these terms carefully before using our website and services.
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
                    href={`#tos-section-${s.number}`}
                    className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors group"
                  >
                    <span className="text-xs font-mono text-primary/50 group-hover:text-primary transition-colors">{s.number}</span>
                    <ChevronRight className="w-3 h-3 text-primary/30 group-hover:text-primary transition-colors" />
                    {s.title}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Agreement Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-10 flex items-start gap-4"
            >
              <BookOpen className="w-6 h-6 text-primary mt-0.5 shrink-0" />
              <p className="text-secondary text-sm leading-relaxed">
                By accessing or using Paperstery's website and services, you confirm that you have read, understood, and agree to be bound by these Terms of Service. These terms apply to all visitors, users, and clients.
              </p>
            </motion.div>

            {/* Sections */}
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={section.number}
                  id={`tos-section-${section.number}`}
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
                Paperstery — We do not just create books; we create legacies.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
