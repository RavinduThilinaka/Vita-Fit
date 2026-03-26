"use client";

import { motion } from "framer-motion";
import { Smartphone, ChevronRight } from "lucide-react";
import Image from "next/image";
import appImage from "../app/Images/image.png";

export default function AppBanner() {
  return (
    <section className="py-24 bg-background relative overflow-hidden" id="app">
      <div className="absolute inset-0 bg-primary/5 opacity-50 flex items-center justify-center">
         <div className="w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] absolute -top-40 -right-40" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-foreground/5 border border-foreground/10 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 backdrop-blur-sm">
          <div className="flex-1 space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              <Smartphone className="w-4 h-4" />
              Digital Companion
            </span>
            <h2 className="text-3xl md:text-5xl font-bold">
              Connect with our<br />web app
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl">
              The Vita-Fit app brings all the tools you need for your fitness journey right to your smartphone. Easily track your workouts, monitor progress, and set new goals with a few taps.
            </p>
            <div className="pt-4">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg transition-transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-primary/25">
                Visit app.vitafit.com <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 w-full flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.4, duration: 1 }}
              className="relative w-[300px] h-auto shadow-2xl shadow-primary/30 rounded-[2rem] overflow-hidden border-4 border-foreground/10"
            >
              <Image 
                src={appImage} 
                alt="Vita-Fit App Interface" 
                className="w-full h-auto object-cover rounded-[1.8rem]"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
