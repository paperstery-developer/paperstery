"use client";
import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BadgeQuestionMark } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export function FAQ({type = 'faqs'}: {type?: "home" | "faqs"}) {
  const faqsData = [
    {
      question: "Do I need to have a finished manuscript?",
      answer:
        "No. You can come with a complete manuscript, a partial draft, or just an idea. The level of support depends on where you are in the process.",
    },
    {
      question: "Do you work with first-time authors?",
      answer: "Yes. Many of our authors are publishing for the first time.",
    },
    {
      question: "What genres or types of books do you publish?",
      answer:
        "We work on literary, creative, professional, academic, and institutional projects.",
    },
    {
      question: "Do you publish both print and digital books?",
      answer:
        "Yes. We support both print and digital formats, depending on the project's needs.",
    },
    {
      question: "Do you guarantee bestseller status?",
      answer:
        "No. We focus on producing high-quality, professionally developed books. Commercial performance depends on multiple factors beyond publishing alone.",
    },
    {
      question: "How long does the publishing process take?",
      answer:
        "Timelines vary depending on the scope of the project, the level of editorial work required, and the author's availability.",
    },
    {
      question: "Will I retain the rights to my book?",
      answer:
        "Yes. Authors retain the rights to their work unless otherwise agreed in writing.",
    },
    {
      question: "Can you help with editing only?",
      answer:
        "Yes. We work with authors who need editorial support without full publishing services.",
    },
    {
      question: "Do you provide marketing or promotion services?",
      answer:
        "Marketing and promotion depend on the terms of the author's contract and the goals of the project.",
    },
    {
      question: "Can organizations commission books or reports?",
      answer:
        "Yes. We work with academic and corporate organizations on commissioned publishing projects.",
    },
    {
      question:
        "Do you work with authors outside the United States and Nigeria?",
      answer:
        "Yes. While we are based in the United States and Nigeria, we work with authors and organizations globally.",
    },
    {
      question: "Is there a submission fee?",
      answer:
        "No. There is no fee to submit a manuscript or proposal for review.",
    },
    {
      question: "What happens after I submit my manuscript?",
      answer:
        "If your project aligns with our publishing focus, a member of our team will contact you to discuss next steps.",
    },
  ];

  const faqs = type === "home" ? faqsData.slice(0, 6) : faqsData;

  return (
    <section className="py-20 bg-white pattern-bg" id="faq">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-light-primary border-primary/30 border mb-4">
            <span className="flex items-center gap-1.5 text-sm text-primary font-medium">
              <BadgeQuestionMark size={14} />
              Questions And Answers
            </span>
          </div>
          <h2 className="mb-4 text-primary">Frequently Asked Questions</h2>
          <p className="max-w-3xl mx-auto text-lg">
            Got questions for us? We've got answers for you!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-xl px-6 shadow-md border border-light-primary"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {type === "home" ? (
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
                <Link href="/faqs">See More</Link>
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-12 text-center bg-white rounded-xl p-8 shadow-md border border-light-primary"
            >
              <h3 className="mb-3 text-xl">Didn't find your question?</h3>
              <p className="text-base">
                You can reach out to us directly at{" "}
                <a
                  href="mailto:paperstery@gmail.com"
                  className="text-primary hover:underline font-medium"
                >
                  paperstery@gmail.com
                </a>
                , and we will respond.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
