"use client";

import { useState, Suspense } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Lock, Loader2, ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/shared/Logo";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  const { mutate, isPending: loading } = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to reset password");
      return data;
    },
    onSuccess: () => {
      setSuccess(true);
      toast.success("Password reset securely");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to reset password. The link might be expired.");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (password.length < 8) {
       toast.error("Password must be at least 8 characters");
       return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!token) {
      toast.error("Invalid or missing reset token");
      return;
    }

    mutate({ token, password });
  };

  if (!token) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl! font-bold text-red-600 mb-2">Invalid Reset Link</h2>
        <p className="text-gray-500 mb-6">This password reset link is missing a security token or is improperly formatted.</p>
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white">
          <Link href="/admin/forgot-password">Request New Link</Link>
        </Button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl! font-bold text-gray-900 mb-2">Password Reset!</h2>
        <p className="text-gray-500 mb-8">
          Your admin password has been successfully updated. You can now use your new password to log in.
        </p>
        <Button onClick={() => router.push("/admin/login")} className="w-full bg-primary hover:bg-primary/90 text-white py-6">
          Proceed to Login <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-light-primary text-primary mb-4">
          <Lock className="w-6 h-6" />
        </div>
        <h1 className="text-2xl! font-bold text-gray-900">Create New Password</h1>
        <p className="text-gray-500 mt-2 text-sm">
          Please enter your new strong password below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pr-10"
                required
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
        
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-white py-6"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
          {loading ? "Resetting Password..." : "Reset Password"}
        </Button>
      </form>
    </>
  );
}

export default function ResetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        
        <Suspense fallback={<div className="text-center py-8 text-gray-500"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
