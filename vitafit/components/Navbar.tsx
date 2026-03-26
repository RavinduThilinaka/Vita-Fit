"use client";

import { useState, useEffect } from "react";
import { Menu, X, Dumbbell, User, Bell } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const notifications = [
    { title: "Workout Reminder", desc: "Leg day begins in 1 hour.", time: "1h ago", unread: true },
    { title: "Membership Active", desc: "Your Elite pass is live.", time: "2h ago", unread: true },
    { title: "Diet Logged", desc: "Breakfast logged successfully.", time: "1d ago", unread: false }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b border-foreground/10 shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? "h-20" : "h-28"}`}>
          <div className="flex-shrink-0 flex items-center gap-2 group cursor-pointer">
            <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
              <Dumbbell className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-3xl font-black tracking-tighter">VITA<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-400">FIT</span></span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {[
                { name: 'Home', href: '/' },
                { name: 'Services', href: '/#services' },
                { name: 'Memberships', href: '/#memberships' },
                { name: 'Locations', href: '/#locations' },
                { name: 'Contact', href: '/#contact' },
              ].map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className="relative group px-1 py-2 text-sm font-semibold hover:text-primary transition-colors"
                >
                  {item.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 rounded-full" />
                </Link>
              ))}
              <div className="flex items-center gap-4 ml-6">
                <Link href="/login" className="text-sm font-bold text-foreground hover:text-primary transition-colors px-4 py-2 rounded-full hover:bg-foreground/5">
                  Login
                </Link>
                <Link href="/register" className="bg-gradient-to-r from-primary to-rose-500 hover:from-primary hover:to-rose-400 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 hover:-translate-y-1 shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]">
                  Join Now
                </Link>

                {/* Advanced Notification Dropdown */}
                <div className="relative ml-2">
                  <button 
                    onClick={() => setShowNotes(!showNotes)}
                    className="w-11 h-11 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors hover:border-primary/50 text-foreground group relative"
                  >
                    <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="absolute top-2.5 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background animate-pulse" />
                  </button>
                  
                  <AnimatePresence>
                    {showNotes && (
                      <motion.div 
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-4 w-80 bg-background/95 backdrop-blur-xl border border-foreground/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden z-50 origin-top-right text-left"
                      >
                        <div className="p-4 border-b border-foreground/10 flex justify-between items-center bg-foreground/5 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none -mr-16 -mt-16" />
                          <h3 className="font-bold text-white relative z-10">Notifications</h3>
                          <span className="text-[10px] bg-primary/20 text-primary px-2 py-1 rounded-full font-black tracking-widest relative z-10">2 NEW</span>
                        </div>
                        
                        <div className="max-h-[300px] overflow-y-auto">
                          {notifications.map((note, i) => (
                            <div key={i} className={`p-4 border-b border-foreground/5 hover:bg-foreground/5 transition-colors cursor-pointer group ${note.unread ? 'bg-primary/5' : ''}`}>
                              <h4 className={`text-sm tracking-wide flex justify-between ${note.unread ? 'font-bold text-white' : 'font-medium text-gray-300'}`}>
                                {note.title}
                                {note.unread && <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 group-hover:scale-150 transition-transform" />}
                              </h4>
                              <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">{note.desc}</p>
                              <span className="text-[10px] text-primary/60 mt-2 block tracking-wider font-bold">{note.time}</span>
                            </div>
                          ))}
                        </div>
                        
                        <Link 
                          href="/notification-service" 
                          onClick={() => setShowNotes(false)} 
                          className="block p-4 text-center text-sm font-bold text-primary hover:bg-primary/10 transition-colors uppercase tracking-widest"
                        >
                          View All Activity
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link href="/profile" className="w-11 h-11 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors hover:border-primary/50 text-foreground group ml-2" title="User Profile">
                  <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-foreground hover:text-primary transition-colors bg-foreground/5 rounded-full"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-foreground/10 overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-4 pb-8 space-y-2 sm:px-3">
               {[
                 { name: 'Home', href: '/' },
                 { name: 'Services', href: '/#services' },
                 { name: 'Memberships', href: '/#memberships' },
                 { name: 'Locations', href: '/#locations' },
                 { name: 'Contact', href: '/#contact' },
               ].map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    onClick={() => setIsOpen(false)}
                    className="block hover:bg-primary/10 hover:text-primary transition-all px-4 py-3 rounded-xl text-base font-semibold"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <Link href="/login" onClick={() => setIsOpen(false)} className="w-full text-center bg-foreground/5 hover:bg-foreground/10 text-foreground px-6 py-4 rounded-xl font-bold transition-colors">
                    Login
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)} className="w-full text-center bg-gradient-to-r from-primary to-rose-500 text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-primary/25">
                    Join Now
                  </Link>
                </div>
                <Link href="/notification-service" onClick={() => setIsOpen(false)} className="w-full mt-4 flex items-center justify-between text-center bg-primary/10 hover:bg-primary/20 text-primary px-6 py-4 rounded-xl font-bold transition-colors border border-primary/20">
                  <div className="flex items-center gap-2"><Bell className="w-5 h-5" /> Activity Alerts</div>
                  <span className="bg-red-500 text-white text-[10px] px-2 py-1 rounded-full tracking-widest animate-pulse">2 NEW</span>
                </Link>
                <Link href="/profile" onClick={() => setIsOpen(false)} className="w-full mt-4 flex items-center justify-center gap-2 text-center bg-foreground/5 hover:bg-foreground/10 text-foreground px-6 py-4 rounded-xl font-bold transition-colors">
                  <User className="w-5 h-5" /> Profile Dashboard
                </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
