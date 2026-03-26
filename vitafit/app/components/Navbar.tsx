"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Story", href: "/story" },
  { label: "Packages", href: "/packages" },
  { label: "Locations", href: "/locations" },
  { label: "Digital", href: "/digital" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Announcement bar ── */}
      <div className="bg-[#E8C230] text-black text-xs font-semibold tracking-widest uppercase text-center py-2 px-4">
        <Link
          href="https://app.powerworldgyms.com/onboarding"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Register Now →
        </Link>
      </div>

      {/* ── Main navbar ── */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-black/95 backdrop-blur-md shadow-lg shadow-black/40"
            : "bg-black"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* ── Logo ── */}
            <Link href="/" className="flex-shrink-0">
              {/* Replace with your actual <Image> component once you have the logo asset */}
              <span className="text-white font-black text-xl tracking-tight leading-none">
                POWER<span className="text-[#E8C230]">WORLD</span>
              </span>
            </Link>

            {/* ── Desktop nav links ── */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-[#E8C230] text-sm font-medium tracking-wide uppercase transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#E8C230] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* ── Desktop CTAs ── */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="https://app.powerworldgyms.com/sign_in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm font-semibold tracking-wide uppercase border border-white/30 px-5 py-2 rounded hover:border-[#E8C230] hover:text-[#E8C230] transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                href="https://app.powerworldgyms.com/onboarding"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#E8C230] text-black text-sm font-black tracking-widest uppercase px-6 py-2 rounded hover:bg-yellow-300 active:scale-95 transition-all duration-200"
              >
                Join Now
              </Link>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] focus:outline-none"
            >
              <span
                className={`block h-[2px] w-6 bg-white transition-all duration-300 origin-center ${
                  menuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-6 bg-white transition-all duration-300 ${
                  menuOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-6 bg-white transition-all duration-300 origin-center ${
                  menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-black border-t border-white/10 px-4 pb-6 pt-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-300 hover:text-[#E8C230] hover:bg-white/5 text-sm font-medium uppercase tracking-wide py-3 px-3 rounded transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="https://app.powerworldgyms.com/sign_in"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="text-center text-white text-sm font-semibold uppercase tracking-wide border border-white/30 py-3 rounded hover:border-[#E8C230] hover:text-[#E8C230] transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                href="https://app.powerworldgyms.com/onboarding"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="text-center bg-[#E8C230] text-black text-sm font-black tracking-widest uppercase py-3 rounded hover:bg-yellow-300 transition-colors duration-200"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}