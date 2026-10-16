'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLiveClock } from '@/hooks/useLiveClock';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const timeString = useLiveClock();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Campaigns', href: '#campaigns' },
    { name: 'Creator Roster', href: '#network' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Inquire', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080808]/90 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/40 py-3.5'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Mark */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-[#FFD100] via-[#ffb700] to-[#e69d00] flex items-center justify-center shadow-[0_0_20px_rgba(255,209,0,0.35)] transition-transform duration-300 group-hover:scale-105">
              <span className="font-display font-extrabold text-[#080808] text-xl tracking-tighter">
                S
              </span>
              <div className="absolute inset-0 rounded-lg ring-1 ring-white/30" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                SYNTRA
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FFD100] animate-pulse" />
              </span>
              <span className="text-[9px] font-semibold tracking-[0.25em] text-neutral-400 uppercase -mt-1 hidden sm:block">
                INFLUENCER AGENCY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] backdrop-blur-md px-5 py-2 rounded-full border border-white/[0.08]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-300 hover:text-[#FFD100] transition-colors rounded-full hover:bg-white/[0.04]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Cluster: Live Clock & Launch Campaign CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Live IST Clock */}
            {timeString && (
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.07] text-[11px] font-mono text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFD100] animate-pulse" />
                <span>{timeString}</span>
              </div>
            )}

            {/* Shimmer CTA: Launch Campaign */}
            <a
              href="#contact"
              className="btn-shimmer relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFD100] hover:bg-[#ffb700] text-[#080808] text-xs font-display font-extrabold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(255,209,0,0.25)] hover:shadow-[0_0_30px_rgba(255,209,0,0.45)] hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Campaign</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-neutral-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.09] px-4 pt-4 pb-6 mt-3 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider text-neutral-300 hover:text-[#FFD100] hover:bg-white/[0.04] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2.5">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-lg bg-[#FFD100] text-[#080808] text-xs font-bold uppercase tracking-wider shadow-md"
            >
              Launch Brand Campaign
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
