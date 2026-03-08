"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "motion/react";
import { BookOpen } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { mutate: subscribe, isPending: subLoading } = useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to subscribe");
      return data;
    },
    onSuccess: () => {
      setShowModal(true);
      setEmail("");
    },
    onError: (err: any) => {
      toast.error(err.message || "An error occurred");
    },
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }
    subscribe(email);
  };

  return (
    <>
      <section className="py-20 bg-light-primary/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <BookOpen className="w-12 h-12 mx-auto mb-6 text-primary" />
            <h2 className="mb-4 text-primary">Subscribe to Our Newsletter</h2>
            <p className="text-lg mb-8">
              Get the latest insights on writing, publishing, and creativity
              delivered directly to your inbox.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="sm:flex-1 bg-white border-white text-primary placeholder:text-gray-400"
                required
              />
              <Button
                type="submit"
                disabled={subLoading}
                size="lg"
                variant={"outline"}
                className="bg-white text-primary hover:bg-white/90 border-primary/30 hover:border-primary gap-2 w-full sm:w-auto"
              >
                {subLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>

            <p className="text-xs text-primary mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-center text-primary text-2xl">
              Successfully Subscribed!
            </DialogTitle>
            <DialogDescription className="text-center text-secondary pt-2">
              Thank you for subscribing to our newsletter. We&apos;ll keep you
              updated with the latest insights.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button
              onClick={() => setShowModal(false)}
              className="bg-primary text-white hover:bg-primary/90"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
