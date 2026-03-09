'use client'
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Send, MessageCircle, Info, Globe2 } from "lucide-react";
import { contactInfo, offices } from "@/lib/constants";

export function ContactPageSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit form");
      return data;
    },
    onSuccess: () => {
      setShowModal(true);
      setFormData({
        firstName: "", lastName: "", email: "", phone: "", subject: "", message: ""
      });
    },
    onError: (err: any) => {
      toast.error(err.message || "An error occurred");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message
    };
    mutate(payload);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hidden pt-32 pb-16 bg-linear-to-br from-primary to-[#4a0099] text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-block px-4 py-2 rounded-full bg-white/20 mb-6">
              <span className="text-sm font-medium">Get In Touch</span>
            </div>
            <h1 className="mb-6 text-white">Contact Paperstery</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              We're here to help you bring your publishing dreams to life. Reach
              out to discuss your project, ask questions, or schedule a
              consultation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-3"
              >
                <div className="mb-8">
                  <h2 className="mb-4">Send Us a Message</h2>
                  <p className="text-lg text-secondary">
                    Fill out the form below and we'll get back to you within
                    24-48 hours.
                  </p>
                  <em className="flex items-center gap-1 text-primary text-sm mt-2">
                    <Info size={12} />
                    Fields marked with asterisks (*) are required.
                  </em>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-primary mb-2"
                      >
                        First Name *
                      </label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        type="text"
                        placeholder="John"
                        className="w-full border-primary/20 focus:border-primary"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-primary mb-2"
                      >
                        Last Name *
                      </label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        type="text"
                        placeholder="Doe"
                        className="w-full border-primary/20 focus:border-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-primary mb-2"
                      >
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="john.doe@example.com"
                        className="w-full border-primary/20 focus:border-primary"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-primary mb-2"
                      >
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="w-full border-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-primary mb-2"
                    >
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      type="text"
                      placeholder="How can we help you?"
                      className="w-full border-primary/20 focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-primary mb-2"
                    >
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project, questions, or how we can assist you..."
                      className="w-full min-h-[180px] border-primary/20 focus:border-primary"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isPending}
                    size="lg"
                    className="w-full bg-primary text-white hover:bg-primary/90 transition-all shadow-md gap-2"
                  >
                    {isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-2"
              >
                <div className="bg-background rounded-2xl p-8 border border-light-primary sticky top-24">
                  <div className="mb-8">
                    <MessageCircle className="w-10 h-10 text-primary mb-4" />
                    <h3 className="mb-2">Contact Information</h3>
                    <p className="text-sm text-secondary">
                      Choose the best way to reach us
                    </p>
                  </div>

                  <div className="space-y-8">
                    {contactInfo.map((info, index) => (
                      <div key={index}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-lg linear-primary flex items-center justify-center">
                            <info.icon className="w-5 h-5 text-primary" />
                          </div>
                          <h4 className="text-lg">{info.title}</h4>
                        </div>
                        <div className="space-y-2 ml-13">
                          {info.details.map((detail, idx) => (
                            <div key={idx}>
                              <p className="text-xs text-secondary">
                                {detail.label}
                              </p>
                              <p className="text-sm font-medium text-primary">
                                {detail.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-light-primary/50 pattern-bg">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 rounded-full bg-white/80 mb-4">
              <span className="text-sm text-primary font-medium flex justify-center items-center gap-1">
               <Globe2 size={16} /> Global Presence
              </span>
            </div>
            <h2 className="mb-4">Operating Across Borders</h2>
            <p className="max-w-3xl mx-auto text-lg text-secondary">
              Paperstery is incorporated in the United States and Nigeria, enabling us to deliver
              world-class solutions to our international clientele.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-8 max-w-6xl mx-auto">
            {offices.map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all w-full mx-auto"
              >
                <div className="relative h-40 bg-white flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl text-primary">{office.location}</h3>
                  </div>
                </div>

                <div className="flex justify-center p-8">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div>
                        <p className="font-medium text-primary">
                          {office.address}
                        </p>
                        <p className="text-sm text-secondary">{office.city}</p>
                        <p className="text-sm text-secondary">
                          {office.country}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-center text-primary text-2xl">Thank You!</DialogTitle>
            <DialogDescription className="text-center text-secondary pt-2">
              Your message has been sent successfully. We will get back to you soon.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button onClick={() => setShowModal(false)} className="bg-primary text-white hover:bg-primary/90">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
