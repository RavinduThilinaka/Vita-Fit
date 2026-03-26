"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, User, Dumbbell, ArrowRight, UserCircle, Calendar, Users } from "lucide-react";
import { register } from "@/app/login/actions";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }
    
    // Validate password length (minimum 8 characters as per your backend likely expects)
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }
    
    // Prepare data for API
    const userData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      password: formData.password,
      age: formData.age ? parseInt(formData.age) : null,
      gender: formData.gender || null,
    };
    
    try {
      const result = await register(userData);
      
      if (result.success && result.user) {
        // Registration successful - user is automatically logged in
        // You can redirect to dashboard or home page
        window.location.href = "/"; // or use router.push if you have router setup
      } else {
        // Show error message from server
        setError(result.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
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
          src="https://cdn.pixabay.com/photo/2016/11/22/22/25/abs-1850926_1280.jpg" 
          alt="Gym Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      </div>

      {/* Register Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg bg-background/80 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl my-8"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group mb-6 cursor-pointer">
            <div className="p-2 bg-primary/20 rounded-xl group-hover:bg-primary/30 transition-colors">
              <Dumbbell className="h-6 w-6 text-primary" />
            </div>
            <span className="text-2xl font-black tracking-tighter">VITA<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-400">FIT</span></span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Join the Elite</h1>
          <p className="text-gray-400 text-sm">Create your account and power your fitness journey.</p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First & Last Name Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 ml-1">First Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <input 
                  type="text" 
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/10 transition-all"
                  placeholder="John"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 ml-1">Last Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <UserCircle className="h-5 w-5 text-gray-500" />
                </div>
                <input 
                  type="text" 
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/10 transition-all"
                  placeholder="Doe"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300 ml-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/10 transition-all"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/10 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 ml-1">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input 
                  type="password" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/10 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {/* Age and Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 ml-1">Age (Optional)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-500" />
                </div>
                <input 
                  type="number" 
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/10 transition-all"
                  placeholder="25"
                  min="13"
                  max="120"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300 ml-1">Gender (Optional)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Users className="h-5 w-5 text-gray-500" />
                </div>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/10 transition-all appearance-none"
                >
                  <option value="" className="bg-gray-900">Select gender</option>
                  <option value="male" className="bg-gray-900">Male</option>
                  <option value="female" className="bg-gray-900">Female</option>
                  <option value="other" className="bg-gray-900">Other</option>
                </select>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full relative group overflow-hidden bg-primary text-white rounded-2xl py-4 font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(239,68,68,0.25)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] disabled:opacity-70 disabled:hover:scale-100 mt-4"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-rose-500 transition-opacity group-hover:opacity-80" />
            <span className="relative flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                <>Create Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
              )}
            </span>
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-white font-semibold hover:text-primary transition-colors">
            Sign in
          </Link>
        </p>
      </motion.div>
    </main>
  );
}