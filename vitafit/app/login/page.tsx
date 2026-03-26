"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, Dumbbell, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { login } from "./actions";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await login(formData);
      
      if (result.success && result.user) {
        // Role-based redirect
        if (result.user.role === "admin") {
          router.push("/admin-dashboard");
        } else {
          router.push("/");
        }
      } else {
        setError(result.error || "Invalid email or password. Please try again.");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image & Overlay */}
      <div className="fixed inset-0 z-0">
        <img 
          src="https://cdn.pixabay.com/photo/2017/08/07/14/02/man-2604149_1280.jpg" 
          alt="Gym Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      </div>

      {/* Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-background/80 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group mb-6 cursor-pointer">
            <div className="p-2 bg-primary/20 rounded-xl group-hover:bg-primary/30 transition-colors">
              <Dumbbell className="h-6 w-6 text-primary" />
            </div>
            <span className="text-2xl font-black tracking-tighter">VITA<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-400">FIT</span></span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400 text-sm">Enter your credentials to access your account.</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300 ml-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/10 transition-all"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between ml-1">
              <label className="text-sm font-semibold text-gray-300">Password</label>
              <Link href="#" className="text-xs text-primary hover:text-rose-400 transition-colors font-medium">Forgot Password?</Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input 
                type="password" 
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/10 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full relative group overflow-hidden bg-primary text-white rounded-2xl py-4 font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(239,68,68,0.25)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] disabled:opacity-70 disabled:hover:scale-100 mt-2"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-rose-500 transition-opacity group-hover:opacity-80" />
            <span className="relative flex items-center justify-center gap-2">
              {isLoading ? "Signing in..." : <>Sign In <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>}
            </span>
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link href="/register" className="text-white font-semibold hover:text-primary transition-colors">
            Create one now
          </Link>
        </p>
      </motion.div>
    </main>
  );
}