"use client";

import { useState, useEffect } from "react";
import { Menu, X, Dumbbell, User, Bell, LogOut } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// Define User Type
interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  age: number | null;
  gender: string | null;
  role: "user" | "admin" | "trainer";
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState<User | null>(null);  // Added proper type
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const notifications = [
    { title: "Workout Reminder", desc: "Leg day begins in 1 hour.", time: "1h ago", unread: true },
    { title: "Membership Active", desc: "Your Elite pass is live.", time: "2h ago", unread: true },
    { title: "Diet Logged", desc: "Breakfast logged successfully.", time: "1d ago", unread: false }
  ];

  // Get user from cookie on mount
  useEffect(() => {
    const getUserFromCookie = () => {
      const cookies = document.cookie.split('; ');
      const userCookie = cookies.find(row => row.startsWith('user='));
      
      if (userCookie) {
        try {
          const userData: User = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
          setUser(userData);
          setIsLoggedIn(true);
        } catch (error) {
          console.error('Error parsing user cookie:', error);
        }
      }
    };
    
    getUserFromCookie();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      // Call logout API
      const response = await fetch('/api/logout', { method: 'POST' });
      
      // Clear cookies manually
      document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      
      setUser(null);
      setIsLoggedIn(false);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Get first letter of user's name
  const getUserInitial = (): string => {
    if (!user) return '?';
    const firstName = user.first_name || '';
    const lastName = user.last_name || '';
    if (firstName) return firstName.charAt(0).toUpperCase();
    if (lastName) return lastName.charAt(0).toUpperCase();
    if (user.email) return user.email.charAt(0).toUpperCase();
    return 'U';
  };

  // Get user's display name
  const getUserDisplayName = (): string => {
    if (!user) return 'User';
    const firstName = user.first_name || '';
    const lastName = user.last_name || '';
    if (firstName && lastName) return `${firstName} ${lastName}`;
    if (firstName) return firstName;
    if (lastName) return lastName;
    return user.email?.split('@')[0] || 'User';
  };

  // Get user role display
  const getUserRole = (): string => {
    if (!user) return 'Member';
    switch (user.role) {
      case 'admin':
        return 'Admin';
      case 'trainer':
        return 'Trainer';
      default:
        return 'Member';
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b border-foreground/10 shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? "h-20" : "h-28"}`}>
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 group cursor-pointer">
            <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
              <Dumbbell className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-3xl font-black tracking-tighter">VITA<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-400">FIT</span></span>
          </Link>
          
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
                {!isLoggedIn ? (
                  <>
                    <Link href="/login" className="text-sm font-bold text-foreground hover:text-primary transition-colors px-4 py-2 rounded-full hover:bg-foreground/5">
                      Login
                    </Link>
                    <Link href="/register" className="bg-gradient-to-r from-primary to-rose-500 hover:from-primary hover:to-rose-400 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 hover:-translate-y-1 shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]">
                      Join Now
                    </Link>
                  </>
                ) : (
                  <>
                    {/* Notification Dropdown */}
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

                    {/* User Profile Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-3 group focus:outline-none"
                      >
                        {/* Profile Circle with First Letter */}
                        <div className="w-11 h-11 rounded-full bg-gradient-to-r from-primary to-rose-500 flex items-center justify-center hover:scale-105 transition-transform shadow-lg hover:shadow-primary/50">
                          <span className="text-white font-bold text-lg">
                            {getUserInitial()}
                          </span>
                        </div>
                      </button>

                      <AnimatePresence>
                        {showUserMenu && (
                          <motion.div
                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 15, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-4 w-72 bg-background/95 backdrop-blur-xl border border-foreground/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden z-50"
                          >
                            {/* User Info Header */}
                            <div className="p-5 border-b border-foreground/10 bg-gradient-to-r from-primary/10 to-rose-500/10">
                              <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-rose-500 flex items-center justify-center shadow-lg">
                                  <span className="text-white font-bold text-2xl">
                                    {getUserInitial()}
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-bold text-white text-lg">
                                    {getUserDisplayName()}
                                  </h3>
                                  <p className="text-sm text-gray-400">
                                    {user?.email}
                                  </p>
                                  <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-primary/20 text-primary rounded-full">
                                    {getUserRole()}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Menu Items */}
                            <div className="py-2">
                              <Link
                                href="/profile"
                                onClick={() => setShowUserMenu(false)}
                                className="flex items-center gap-3 px-5 py-3 hover:bg-foreground/5 transition-colors group"
                              >
                                <User className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                                <span className="font-medium text-white">My Profile</span>
                              </Link>
                              
                              <Link
                                href="/dashboard"
                                onClick={() => setShowUserMenu(false)}
                                className="flex items-center gap-3 px-5 py-3 hover:bg-foreground/5 transition-colors group"
                              >
                                <Dumbbell className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                                <span className="font-medium text-white">Dashboard</span>
                              </Link>

                              <div className="border-t border-foreground/10 my-2"></div>
                              
                              <button
                                onClick={() => {
                                  setShowUserMenu(false);
                                  handleLogout();
                                }}
                                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-red-500/10 transition-colors group"
                              >
                                <LogOut className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
                                <span className="font-medium text-red-400">Logout</span>
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                )}
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
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-foreground/10 overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-4 pb-8 space-y-2 sm:px-3">
              {!isLoggedIn ? (
                <>
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
                </>
              ) : (
                <>
                  {/* User Info in Mobile Menu */}
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/10 to-rose-500/10 rounded-2xl mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-rose-500 flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-2xl">
                        {getUserInitial()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">
                        {getUserDisplayName()}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  {[
                    { name: 'Home', href: '/' },
                    { name: 'Services', href: '/#services' },
                    { name: 'Memberships', href: '/#memberships' },
                    { name: 'Locations', href: '/#locations' },
                    { name: 'Contact', href: '/#contact' },
                    { name: 'My Profile', href: '/profile' },
                    { name: 'Dashboard', href: '/dashboard' },
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
                  
                  <Link href="/notification-service" onClick={() => setIsOpen(false)} className="w-full flex items-center justify-between text-center bg-primary/10 hover:bg-primary/20 text-primary px-6 py-4 rounded-xl font-bold transition-colors border border-primary/20 mt-4">
                    <div className="flex items-center gap-2"><Bell className="w-5 h-5" /> Activity Alerts</div>
                    <span className="bg-red-500 text-white text-[10px] px-2 py-1 rounded-full tracking-widest animate-pulse">2 NEW</span>
                  </Link>
                  
                  <button onClick={() => { setIsOpen(false); handleLogout(); }} className="w-full flex items-center justify-center gap-2 text-center bg-red-500/10 hover:bg-red-500/20 text-red-400 px-6 py-4 rounded-xl font-bold transition-colors mt-4">
                    <LogOut className="w-5 h-5" /> Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}