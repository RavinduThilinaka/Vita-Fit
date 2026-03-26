"use client";

import { motion } from "framer-motion";
import { ArrowRight, Activity } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20" id="home">
      <div className="absolute inset-0 z-0 bg-black">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          {/* Replace this src with your own actual fitness video URL or a local file path like '/hero-video.mp4' */}
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Removed black transparent overlay */}
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 text-sm font-semibold border border-primary/20">
            <Activity className="w-4 h-4" />
            Sri Lanka's Largest Fitness Network
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            POWER YOUR <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-400">FITNESS JOURNEY</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 mb-10">
            Experience unmatched accessibility with over 24 state-of-the-art locations and 100,000 sq ft of dedicated workout space.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 transform hover:scale-105 shadow-lg shadow-primary/25">
              Explore Memberships <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-foreground/5 border border-foreground/10 text-foreground rounded-full font-bold text-lg hover:bg-foreground/10 transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
              View Locations
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
