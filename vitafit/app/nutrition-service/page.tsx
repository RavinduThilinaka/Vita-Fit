"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Beaker, Activity, Clock, StickyNote } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function NutritionService() {
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
        <div className="absolute inset-0 bg-purple-500/5 blur-[100px] rounded-full max-w-2xl mx-auto pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight mb-6"
          >
            LOG <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-fuchsia-600">NUTRITION</span>
          </motion.h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Record your supplements and vitamin intakes accurately.
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
                <label className="text-sm font-bold flex items-center gap-2"><Beaker className="w-4 h-4 text-purple-400"/> Supplement Name</label>
                <input 
                  type="text" 
                  name="supplementName"
                  required
                  placeholder="e.g. Whey Protein Isolate" 
                  className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold flex items-center gap-2"><Activity className="w-4 h-4 text-pink-400"/> Dosage</label>
                  <input 
                    type="text" 
                    name="dosage"
                    required
                    placeholder="e.g. 2 Scoops (60g)" 
                    className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold flex items-center gap-2"><Clock className="w-4 h-4 text-blue-400"/> Intake Time</label>
                  <input 
                    type="time" 
                    name="intakeTime"
                    required
                    className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-2"><StickyNote className="w-4 h-4 text-yellow-500"/> Notes</label>
                <textarea 
                  name="notes"
                  rows={3}
                  placeholder="Mix with water or milk, any side effects?" 
                  className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitted}
                className={`w-full mt-6 text-white px-8 py-4 rounded-xl font-bold transition-all text-lg ${
                  isSubmitted 
                  ? "bg-emerald-500 cursor-not-allowed scale-95" 
                  : "bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:from-purple-400 hover:to-fuchsia-500 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
                }`}
              >
                {isSubmitted ? "Nutrition Logged! ✓" : "Save Nutrition Entry"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
