"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Mail, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/shared/Logo";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { mutate, isPending: loading } = useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to process request");
      return data;
    },
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Reset link sent to your email");
    },
    onError: (err: any) => {
      toast.error(err.message || "Something went wrong");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    mutate(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 border-t-4 border-primary">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        
        {!submitted ? (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-light-primary text-primary mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h1 className="text-2xl! font-bold text-gray-900">Forgot Password</h1>
              <p className="text-gray-500 mt-2 text-sm">
                Enter your admin email address and we'll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@paperstery.com"
                  className="w-full"
                  required
                  autoFocus
                />
              </div>
              
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-white py-6"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                {loading ? "Sending Link..." : "Send Reset Link"}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
              <Mail className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
            <p className="text-gray-500 mb-8">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <Button
              variant="outline"
              onClick={() => setSubmitted(false)}
              className="w-full"
            >
              Try another email address
            </Button>
          </div>
        )}

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <Link href="/admin/login" className="text-sm text-gray-600 hover:text-primary font-medium inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
