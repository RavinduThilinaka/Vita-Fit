"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CreditCard, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "monthly";

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const price = plan === "annual" ? "120,000" : "15,000";
  const planName = plan === "annual" ? "Annual Elite" : "Monthly Standard";

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Redirect to Auto-Generated Card
      setTimeout(() => {
        router.push(`/membership-card?plan=${plan}`);
      }, 1500);
    }, 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-20 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Order Summary Summary */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-foreground/5 border border-foreground/10 p-8 rounded-3xl backdrop-blur-sm h-fit"
        >
          <h2 className="text-2xl font-bold mb-6 text-white">Order Summary</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center pb-4 border-b border-foreground/10">
              <div>
                <h3 className="font-bold text-white text-lg">Vita-Fit {planName}</h3>
                <p className="text-sm text-gray-400">Recurring Subscription</p>
              </div>
              <span className="font-bold text-lg">Rs. {price}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-foreground/10">
              <span className="text-gray-400">Initiation Fee</span>
              <span className="font-bold">Waived</span>
            </div>
            <div className="flex justify-between items-center text-xl">
              <span className="font-black text-white">Total Due</span>
              <span className="font-black text-primary">Rs. {price}</span>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm flex-1 text-gray-300">
              By proceeding, you agree to our terms of service. You will receive an instant digital ATM-style membership card after payment!
            </p>
          </div>
        </motion.div>

        {/* Payment Details Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-background border border-foreground/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden"
        >
          {isSuccess ? (
            <div className="absolute inset-0 z-20 bg-background flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Payment Successful!</h2>
              <p className="text-gray-400">Generating your Virtual Membership Card...</p>
            </div>
          ) : null}

          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-primary/10 rounded-xl">
              <CreditCard className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Payment Details</h2>
              <p className="text-sm text-gray-500">Secure AES-256 encrypted checkout.</p>
            </div>
          </div>

          <form onSubmit={handlePayment} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-300">Cardholder Name</label>
              <input 
                type="text" 
                required
                placeholder="Alex Mercer" 
                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-300">Card Number</label>
              <div className="relative">
                <input 
                  type="text" 
                  required
                  placeholder="0000 0000 0000 0000" 
                  maxLength={19}
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white font-medium font-mono"
                />
                <CreditCard className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">Expiry Date</label>
                <input 
                  type="text" 
                  required
                  placeholder="MM/YY" 
                  maxLength={5}
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white font-medium font-mono center"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">CVV</label>
                <div className="relative">
                  <input 
                    type="password" 
                    required
                    placeholder="123" 
                    maxLength={4}
                    className="w-full bg-foreground/5 border border-foreground/10 rounded-xl pl-4 pr-10 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white font-medium font-mono"
                  />
                  <Lock className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading || isSuccess}
              className="w-full mt-4 bg-gradient-to-r from-primary to-rose-500 hover:from-primary hover:to-rose-400 text-white py-4 rounded-xl font-bold transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:hover:scale-100"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">Processing Securely <span className="animate-spin text-xl leading-none block">⟳</span></span>
              ) : (
                <>Pay Rs. {price} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>
          
          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-600 font-medium">
            <span>Powered by Vita-Pay</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Lock className="w-3 h-3"/> SSL Encrypted</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Header */}
      <div className="pt-32 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full max-w-2xl mx-auto pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            SECURE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-400">CHECKOUT</span>
          </h1>
          <p className="text-gray-400">Complete your signup and claim your Virtual Card.</p>
        </div>
      </div>

      <Suspense fallback={<div className="text-center pb-24 text-white">Loading checkout...</div>}>
        <CheckoutForm />
      </Suspense>

      <Footer />
    </main>
  );
}
