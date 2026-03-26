"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

export default function Contact() {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => setIsSent(false), 3000);
  };

  return (
    <section className="py-24 bg-foreground/5 relative overflow-hidden" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-white"
          >
            GET IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-400">TOUCH</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Have questions about memberships or personal training? Drop us a line.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-background border border-foreground/10 p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Headquarters</h4>
                    <p className="text-gray-400">123 Commerce Way, City Center<br/>Colombo, Sri Lanka</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Phone</h4>
                    <p className="text-gray-400">+94 77 123 4567<br/>+94 11 987 6543</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Email</h4>
                    <p className="text-gray-400">support@vitafit.com<br/>careers@vitafit.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Map */}
            <div className="h-64 bg-background border border-foreground/10 rounded-3xl overflow-hidden relative group">
              <img 
                src="https://cdn.pixabay.com/photo/2019/09/22/16/20/location-4496459_1280.png" 
                alt="Map Pin" 
                className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500 scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-center">
                <button className="w-full bg-foreground/20 backdrop-blur-md border border-white/10 hover:bg-primary text-white py-3 rounded-xl font-bold transition-colors">
                  Open in Google Maps
                </button>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-background border border-foreground/10 p-8 rounded-3xl shadow-xl relative"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-primary/10 rounded-xl">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-white">Send a Message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe" 
                    className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Email</label>
                  <input 
                    type="email" 
                    required
                    placeholder="john@example.com" 
                    className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">Subject</label>
                <input 
                  type="text" 
                  required
                  placeholder="Membership Inquiry" 
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">Message</label>
                <textarea 
                  required
                  rows={5}
                  placeholder="How can we help you?" 
                  className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white font-medium resize-none shadow-inner"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSent}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform flex items-center justify-center gap-2 ${
                  isSent 
                  ? "bg-emerald-500 scale-95 text-white" 
                  : "bg-gradient-to-r from-primary to-rose-500 hover:from-primary hover:to-rose-400 text-white hover:scale-[1.02] shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                }`}
              >
                {isSent ? "Message Sent! ✓" : <>Send Message <Send className="w-5 h-5" /></>}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
