"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Scale, Activity, Flame, StickyNote } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ProgressTracking() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Header */}
      <div className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-cyan-500/5 blur-[100px] rounded-full max-w-2xl mx-auto pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight mb-6"
          >
            LOG <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">PROGRESS</span>
          </motion.h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Track your vital metrics and watch your body transform over time.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-foreground/5 border border-foreground/10 p-8 md:p-12 rounded-3xl shadow-xl backdrop-blur-sm relative"
          >
            <form className="relative z-10 space-y-6" onSubmit={handleSubmit}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold flex items-center gap-2"><Calendar className="w-4 h-4 text-cyan-400"/> Date</label>
                  <input 
                    type="date" 
                    name="date"
                    required
                    className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold flex items-center gap-2"><Scale className="w-4 h-4 text-indigo-400"/> Weight (kg)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    name="weight"
                    required
                    min="1"
                    max="500"
                    placeholder="e.g. 75.5" 
                    className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold flex items-center gap-2"><Activity className="w-4 h-4 text-teal-400"/> BMI</label>
                  <input 
                    type="number" 
                    step="0.1"
                    name="bmi"
                    required
                    min="10"
                    max="100"
                    placeholder="e.g. 24.2" 
                    className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold flex items-center gap-2"><Flame className="w-4 h-4 text-orange-400"/> Calories Burned</label>
                  <input 
                    type="number" 
                    name="caloriesBurned"
                    min="0"
                    placeholder="e.g. 600" 
                    className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-2"><StickyNote className="w-4 h-4 text-yellow-500"/> Notes</label>
                <textarea 
                  name="notes"
                  rows={3}
                  placeholder="How did you feel today? Any personal bests?" 
                  className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-medium resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitted}
                className={`w-full mt-6 text-white px-8 py-4 rounded-xl font-bold transition-all text-lg ${
                  isSubmitted 
                  ? "bg-emerald-500 cursor-not-allowed scale-95" 
                  : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                }`}
              >
                {isSubmitted ? "Progress Saved! ✓" : "Save Progress"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
