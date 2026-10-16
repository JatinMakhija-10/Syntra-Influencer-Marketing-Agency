'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Youtube, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#070707] text-neutral-400 border-t border-white/[0.08] overflow-hidden pt-16 pb-12">
      {/* Ambient background glow - Yellow/Amber only (NO PURPLE) */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-[#FFD100]/[0.04] to-transparent rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/[0.08]">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FFD100] flex items-center justify-center font-display font-extrabold text-[#080808] text-lg shadow-[0_0_15px_rgba(255,209,0,0.3)]">
                S
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                SYNTRA
              </span>
            </Link>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              Performance-driven influencer marketing agency and verified creator talent network. We pair ambitious brands with audited creators to engineer high-ROAS sponsorship integrations, locked rate cards, and multi-platform customer acquisition.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#FFD100] hover:border-[#FFD100]/40 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#FFD100] hover:border-[#FFD100]/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#FFD100] hover:border-[#FFD100]/40 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#FFD100] hover:border-[#FFD100]/40 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Agency Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#campaigns" className="hover:text-[#FFD100] transition-colors">
                  Featured Brand Campaigns
                </a>
              </li>
              <li>
                <a href="#network" className="hover:text-[#FFD100] transition-colors">
                  Audited Creator Roster
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#FFD100] transition-colors">
                  Influencer Marketing Services
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#FFD100] transition-colors">
                  Campaign Execution Lifecycle
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#FFD100] transition-colors">
                  Brand Collaboration Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Brand Partnerships Desk Column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Campaign Partnerships Desk
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Ready to launch a high-ROAS creator campaign? Connect directly with our agency strategy desk to lock verified creator rate cards and flight schedules.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FFD100] hover:bg-[#ffb700] text-[#080808] text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(255,209,0,0.25)] group"
            >
              <span>Inquire for Campaign</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-[11px] text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Booking Select Q4/Q1 Brand Flights
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {currentYear} Syntra Influencer Marketing Agency. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-neutral-400">Dark Luxury Cyber-Editorial</span>
            <span>•</span>
            <span className="text-neutral-400">Mumbai • New Delhi • Global</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
