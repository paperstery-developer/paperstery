"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Lock, Loader2, Mail } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/shared/Logo";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (credentials: any) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      return data;
    },
    onSuccess: () => {
      toast.success("Login successful");
      router.push("/admin");
    },
    onError: (err: any) => {
      toast.error(err.message || "Invalid credentials");
    }
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }
    mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-32 pb-20">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-light-primary text-primary mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl! font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-500 mt-2">Sign in to access your dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
               <Input
                 type="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 placeholder="admin@paperstery.com"
                 className="w-full"
                 required
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
               <Input
                 type="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 placeholder="••••••••"
                 className="w-full"
                 required
               />
             </div>
          </div>
          
          <div className="flex justify-end mt-2">
            <Link href="/admin/forgot-password" className="text-sm text-primary hover:underline font-medium">
              Forgot your password?
            </Link>
          </div>
          
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary hover:bg-primary/90 text-white py-6"
          >
            {isPending ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
