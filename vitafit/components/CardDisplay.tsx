"use client";

import { motion } from "framer-motion";
import { Dumbbell, ShieldCheck, CreditCard, Star } from "lucide-react";
import Link from "next/link";

export default function CardDisplay() {
  return (
    <section className="py-24 bg-background relative overflow-hidden" id="card-display">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Text */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 text-sm font-bold tracking-wide border border-red-500/20">
              <Star className="w-4 h-4" /> EXCLUSIVE ACCESS
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Unlock the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-700">Premium</span> Experience
            </h2>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
              When you join Vita-Fit, you immediately receive our signature ATM-style smart card. This powerful digital asset grants you 24/7 global access to all facilities.
            </p>
            
            <ul className="space-y-4 text-left max-w-md mx-auto lg:mx-0">
              {[
                { icon: ShieldCheck, text: "NFC Contactless Entry at all locations" },
                { icon: CreditCard, text: "Seamless automated billing and upgrades" },
                { icon: Star, text: "Instant VIP recognition by our training staff" }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-gray-300 font-medium">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-red-500" />
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Link href="/#memberships">
                <button className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                  Get Your Card Today
                </button>
              </Link>
            </div>
          </div>

          {/* Right Side: 3D Card Showcase */}
          <div className="flex-1 w-full max-w-lg mx-auto lg:mx-0 relative perspective-1000">
            {/* Ambient Backlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600 to-red-900 rounded-[2rem] blur-[80px] opacity-40 animate-pulse" />
            
            <motion.div
              initial={{ opacity: 0, rotateY: -30, rotateX: 10, scale: 0.8 }}
              whileInView={{ opacity: 1, rotateY: -15, rotateX: 15, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
              className="relative w-full aspect-[1.586/1] rounded-2xl p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-2xl shadow-red-900/50 group hover:rotate-y-0 hover:rotate-x-0 transition-all duration-700 ease-out"
            >
              {/* Metallic Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-red-950 z-0" />
              
              {/* Textures */}
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-500 via-transparent to-transparent z-0" />
              <div className="absolute -bottom-24 -right-12 w-64 h-64 bg-red-600/40 rounded-full blur-[80px] z-0" />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay z-0" />

              {/* Card Elements */}
              <div className="relative z-10 flex justify-between items-start w-full">
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-7 h-7 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                  <span className="text-xl font-black tracking-widest text-white drop-shadow-md">VITA<span className="text-red-500">FIT</span></span>
                </div>
                <div className="px-3 py-1 bg-gradient-to-r from-red-600 to-red-800 rounded-full border border-red-500/30">
                  <span className="text-[10px] font-black tracking-widest text-white">ELITE MEMBER</span>
                </div>
              </div>

              {/* Microchip */}
              <div className="relative z-10 mt-6 w-12 h-10 rounded-md border border-zinc-500 bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 overflow-hidden opacity-90">
                <div className="absolute inset-0 border-[0.5px] border-black/20" style={{ backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.1) 50%), linear-gradient(0deg, transparent 50%, rgba(0,0,0,0.1) 50%)', backgroundSize: '10px 10px' }} />
              </div>

              {/* Card Number */}
              <div className="relative z-10 mt-auto mb-6">
                <p className="font-mono text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-b from-gray-100 to-gray-400 font-bold tracking-[0.2em] filter drop-shadow">
                  VF - 8459 2910 4482 1033
                </p>
              </div>

              {/* Bottom Row */}
              <div className="relative z-10 flex justify-between items-end w-full">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-semibold">Member Name</p>
                  <p className="text-base md:text-lg text-white font-bold tracking-widest drop-shadow-md uppercase">YOUR NAME HERE</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-semibold">Valid Thru</p>
                  <p className="text-base md:text-lg font-mono text-white font-bold tracking-wider drop-shadow-md">12/28</p>
                </div>
              </div>
              
              {/* Contactless Icon */}
              <div className="absolute right-8 top-20 opacity-30 z-10 flex gap-[3px]">
                <div className="w-1 h-3 rounded-full bg-white rotate-[20deg]" />
                <div className="w-1 h-4 rounded-full bg-white rotate-[20deg]" />
                <div className="w-1 h-5 rounded-full bg-white rotate-[20deg]" />
                <div className="w-1 h-4 rounded-full bg-white rotate-[20deg]" />
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
