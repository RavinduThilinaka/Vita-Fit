"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, FileText, Tag, Calendar } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function TipsAdvice() {
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
        <div className="absolute inset-0 bg-blue-500/5 blur-[100px] rounded-full max-w-2xl mx-auto pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight mb-6"
          >
            SHARE <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">ADVICE</span>
          </motion.h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Create and browse expert fitness and wellness tips.
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
              
              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-2"><Lightbulb className="w-4 h-4 text-sky-400"/> Tip Title</label>
                <input 
                  type="text" 
                  name="tipTitle"
                  required
                  placeholder="e.g. How to Perfect Your Squat Form" 
                  className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-2"><FileText className="w-4 h-4 text-blue-400"/> Tip Content</label>
                <textarea 
                  name="tipContent"
                  required
                  rows={5}
                  placeholder="Write your detailed advice here..." 
                  className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all font-medium resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold flex items-center gap-2"><Tag className="w-4 h-4 text-indigo-400"/> Category</label>
                  <div className="relative">
                    <select 
                      name="category"
                      required
                      className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all font-medium appearance-none"
                    >
                      <option value="nutrition">Nutrition</option>
                      <option value="strength">Strength</option>
                      <option value="cardio">Cardio</option>
                      <option value="flexibility">Flexibility</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-foreground">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold flex items-center gap-2"><Calendar className="w-4 h-4 text-teal-400"/> Date Added</label>
                  <input 
                    type="date" 
                    name="dateAdded"
                    required
                    className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all font-medium"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitted}
                className={`w-full mt-6 text-white px-8 py-4 rounded-xl font-bold transition-all text-lg ${
                  isSubmitted 
                  ? "bg-emerald-500 cursor-not-allowed scale-95" 
                  : "bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-300 hover:to-blue-500 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)]"
                }`}
              >
                {isSubmitted ? "Advice Published! ✓" : "Publish Advice"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
