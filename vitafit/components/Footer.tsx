"use client";

import { Dumbbell, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

const FacebookIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>;
const TwitterIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>;
const InstagramIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;

export default function Footer() {
  return (
    <footer className="relative bg-background pt-20 pb-10 overflow-hidden border-t border-foreground/10 mt-20">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-primary/20 shadow-[0_0_100px_50px_rgba(239,68,68,0.15)] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2 group cursor-pointer inline-flex">
              <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                <Dumbbell className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-3xl font-black tracking-tighter">VITA<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-400">FIT</span></span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
              Sri Lanka's largest fitness network with over 24 convenient locations and world-class workout space. Join the elite.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center text-gray-500 hover:text-white hover:bg-primary hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all duration-300 transform hover:-translate-y-1"><FacebookIcon /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center text-gray-500 hover:text-white hover:bg-primary hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all duration-300 transform hover:-translate-y-1"><InstagramIcon /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center text-gray-500 hover:text-white hover:bg-primary hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all duration-300 transform hover:-translate-y-1"><TwitterIcon /></a>
            </div>
          </div>
          
          {/* Links Column */}
          <div className="lg:col-span-2 lg:ml-auto">
            <h3 className="font-bold text-lg mb-6 text-foreground tracking-wide">Quick Links</h3>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              {['Home', 'Features', 'Memberships', 'Locations'].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase()}`} className="hover:text-primary transition-colors hover:translate-x-1 inline-block transform duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support Column */}
          <div className="lg:col-span-3 lg:ml-auto">
            <h3 className="font-bold text-lg mb-6 text-foreground tracking-wide">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <li className="flex items-start gap-3 group cursor-pointer">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-primary transition-colors">123 Fitness Ave, Colombo 03,<br/>Sri Lanka</span>
              </li>
              <li className="flex items-center gap-3 group cursor-pointer">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-primary transition-colors">+94 11 234 5678</span>
              </li>
              <li className="flex items-center gap-3 group cursor-pointer">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-primary transition-colors">hello@vitafit.lk</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter Column */}
          <div className="lg:col-span-3">
            <h3 className="font-bold text-lg mb-6 text-foreground tracking-wide">Newsletter</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              Subscribe to get the latest fitness tips and exclusive offers.
            </p>
            <form className="relative mt-2 group" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-background transition-all pr-12"
              />
              <button 
                type="submit" 
                className="absolute right-1.5 top-1.5 bottom-1.5 aspect-square bg-primary hover:bg-primary/90 text-white rounded-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Vita-Fit Network. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
