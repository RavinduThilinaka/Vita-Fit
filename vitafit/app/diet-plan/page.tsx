"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Utensils, Flame, Leaf, Clock, StickyNote } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function DietPlan() {
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
        <div className="absolute inset-0 bg-emerald-500/5 blur-[100px] rounded-full max-w-2xl mx-auto pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight mb-6"
          >
            CREATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600">DIET PLAN</span>
          </motion.h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Fuel your body with the perfect macronutrient balance.
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
                  <label className="text-sm font-bold flex items-center gap-2"><Utensils className="w-4 h-4 text-emerald-500"/> Meal Name</label>
                  <input 
                    type="text" 
                    name="mealName"
                    required
                    placeholder="e.g. Chicken & Rice" 
                    className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold flex items-center gap-2"><Flame className="w-4 h-4 text-orange-500"/> Calories</label>
                  <input 
                    type="number" 
                    name="calories"
                    required
                    min="1"
                    placeholder="e.g. 500" 
                    className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                  <label className="text-sm font-bold flex items-center gap-2"><Clock className="w-4 h-4 text-blue-400"/> Meal Time</label>
                  <div className="relative">
                    <select 
                      name="mealTime"
                      required
                      className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all font-medium appearance-none"
                    >
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="snack">Snack</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-foreground">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold flex items-center gap-2"><Leaf className="w-4 h-4 text-green-500"/> Nutrients</label>
                  <input 
                    type="text" 
                    name="nutrients"
                    required
                    placeholder="e.g. 40g Protein, 50g Carbs..." 
                    className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-2"><StickyNote className="w-4 h-4 text-yellow-500"/> Notes</label>
                <textarea 
                  name="notes"
                  rows={3}
                  placeholder="Additional prep instructions or warnings..." 
                  className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all font-medium resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitted}
                className={`w-full mt-6 text-white px-8 py-4 rounded-xl font-bold transition-all text-lg ${
                  isSubmitted 
                  ? "bg-emerald-500 cursor-not-allowed scale-95" 
                  : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                }`}
              >
                {isSubmitted ? "Meal Plan Saved Successfully! ✓" : "Save Meal Plan"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
