"use client";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { 
  Dumbbell, CheckCircle2, Copy, Download, Share2, ShieldCheck, ChevronRight
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function VirtualCard() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "monthly";
  const planName = plan === "annual" ? "ELITE ANNUAL" : "STANDARD MONTHLY";
  
  // Simulated Card Info
  const memberName = "ALEX MERCER";
  const memberId = "VF - 8459 2910 4482 1033";
  const validThru = "12/28";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-20 pb-32">
      <div className="flex flex-col items-center">
        
        {/* Success Header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 rounded-full mb-6 relative">
            <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full animate-pulse" />
            <CheckCircle2 className="w-10 h-10 text-emerald-500 relative z-10" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Payment Verified</h2>
          <p className="text-gray-400 text-lg max-w-lg mx-auto">
            Your membership is fully active. Present this digital access card at any Vita-Fit location globally.
          </p>
        </motion.div>

        {/* 3D Auto-Generated ATM Card (Red and Black Theme) */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.2, type: "spring" }}
          className="w-full max-w-md relative group perspective-1000"
        >
          {/* Card Container with Hover Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500" />
          
          <div className="relative w-full aspect-[1.586/1] rounded-2xl p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-y-6">
            
            {/* Red and Black Metallic Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-red-950 z-0" />
            
            {/* ATM Card Texture Gradients & Shapes */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-500 via-transparent to-transparent z-0" />
            <div className="absolute -bottom-24 -right-12 w-64 h-64 bg-red-600/30 rounded-full blur-[80px] z-0" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay z-0" />

            {/* Top Row: Logo & Chip */}
            <div className="relative z-10 flex justify-between items-start w-full">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-7 h-7 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                <span className="text-xl font-black tracking-widest text-white drop-shadow-md">VITA<span className="text-red-500">FIT</span></span>
              </div>
              <div className="px-3 py-1 bg-gradient-to-r from-red-600 to-red-800 rounded-full border border-red-500/30 shadow-lg">
                <span className="text-[10px] font-black tracking-widest text-white shadow-sm">{planName}</span>
              </div>
            </div>

            {/* Microchip simulate */}
            <div className="relative z-10 mt-6 w-12 h-10 rounded-md border border-zinc-500 bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 overflow-hidden shadow-sm opacity-90">
              <div className="absolute inset-0 border-[0.5px] border-black/20" style={{ backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.1) 50%), linear-gradient(0deg, transparent 50%, rgba(0,0,0,0.1) 50%)', backgroundSize: '10px 10px' }} />
            </div>

            {/* Middle Row: Card Number */}
            <div className="relative z-10 mt-auto mb-6">
              <p className="font-mono text-2xl md:text-[1.7rem] text-transparent bg-clip-text bg-gradient-to-b from-gray-100 to-gray-400 font-bold tracking-[0.2em] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] filter drop-shadow">
                {memberId}
              </p>
            </div>

            {/* Bottom Row: Name & Expiry */}
            <div className="relative z-10 flex justify-between items-end w-full">
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-semibold">Member Name</p>
                <p className="text-lg text-white font-bold tracking-widest drop-shadow-md uppercase">{memberName}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-semibold">Valid Thru</p>
                <p className="text-lg font-mono text-white font-bold tracking-wider drop-shadow-md">{validThru}</p>
              </div>
            </div>
            
            {/* Contactless Icon */}
            <div className="absolute right-8 top-20 opacity-30 z-10 flex gap-[3px]">
              <div className="w-1 h-4 rounded-full bg-white rotate-[20deg]" />
              <div className="w-1 h-5 rounded-full bg-white rotate-[20deg]" />
              <div className="w-1 h-6 rounded-full bg-white rotate-[20deg]" />
              <div className="w-1 h-5 rounded-full bg-white rotate-[20deg]" />
            </div>
          </div>
        </motion.div>

        {/* Action Buttons Below Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground/10 hover:bg-foreground/20 text-white font-bold transition-colors">
            <Download className="w-5 h-5" /> Save to Phone
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground/10 hover:bg-foreground/20 text-white font-bold transition-colors">
            <Share2 className="w-5 h-5" /> Share Access
          </button>
          <Link href="/profile">
            <button className="flex items-center gap-2 px-8 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition-colors shadow-[0_0_15px_rgba(220,38,38,0.4)]">
              View Profile Dashboard <ChevronRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>

        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-gray-500 font-medium bg-foreground/5 px-6 py-3 rounded-full border border-foreground/10">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          This digital smart-card uses secure NFC validation at all locations.
        </div>

      </div>
    </div>
  );
}

export default function MembershipCardPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Deep Red Hero Background */}
      <div className="pt-32 pb-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-600/10 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <Suspense fallback={<div className="text-center text-white pb-32">Generating your pass...</div>}>
        <VirtualCard />
      </Suspense>

      <Footer />
    </main>
  );
}
