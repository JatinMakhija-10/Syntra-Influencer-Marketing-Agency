'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Users,
  ShieldCheck,
  Target,
  BarChart3,
  DollarSign,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<'roas' | 'reach' | 'creators'>('roas');

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Ambient Radial Glows - Obsidian Black foundation with Amber Yellow Glow (NO PURPLE) */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute top-12 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.045]"
          style={{
            background: 'radial-gradient(circle, #FFD100 0%, transparent 70%)',
            filter: 'blur(75px)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.035]"
          style={{
            background: 'radial-gradient(circle, #FFD100 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Influencer Agency Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Eyebrow Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD100] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFD100]" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FFD100]">
                Premier Influencer Marketing Agency
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl xl:text-7xl tracking-[-0.03em] text-white leading-[1.05]">
              We turn creator attention into <br />
              <span className="text-gold-gradient underline decoration-[#FFD100]/40 decoration-wavy decoration-2">predictable revenue</span>.
            </h1>

            {/* Subtitle / Value Prop */}
            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-xl font-light">
              Syntra connects high-growth brands with audited YouTube and social creators. We engineer data-backed sponsorship campaigns, negotiate transparent pricing, and guarantee measurable ROAS.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                className="btn-shimmer inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#FFD100] hover:bg-[#ffb700] text-[#080808] font-display font-bold text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(255,209,0,0.3)] hover:shadow-[0_0_35px_rgba(255,209,0,0.5)] transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch a Campaign</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#network"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] hover:border-white/[0.2] text-white font-medium text-sm tracking-wide backdrop-blur-md transition-all"
              >
                <span>Browse Creator Roster</span>
              </a>
            </div>

            {/* Micro Stats Bar */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/[0.08] max-w-lg">
              <div>
                <div className="font-display font-extrabold text-2xl sm:text-3xl text-[#FFD100]">4.8x</div>
                <div className="text-[11px] font-mono tracking-wider text-neutral-400 uppercase mt-0.5">Average ROAS</div>
              </div>
              <div>
                <div className="font-display font-extrabold text-2xl sm:text-3xl text-white">45M+</div>
                <div className="text-[11px] font-mono tracking-wider text-neutral-400 uppercase mt-0.5">Audience Reach</div>
              </div>
              <div>
                <div className="font-display font-extrabold text-2xl sm:text-3xl text-white">60+</div>
                <div className="text-[11px] font-mono tracking-wider text-neutral-400 uppercase mt-0.5">Audited Creators</div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Campaign Performance Hub & Creator Match Engine */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[460px] rounded-2xl bg-neutral-950 border border-white/[0.12] shadow-2xl shadow-black/80 overflow-hidden flex flex-col">
              {/* Terminal Header */}
              <div className="h-11 bg-neutral-900/90 border-b border-white/[0.08] px-4 flex items-center justify-between text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFD100]/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[11px] text-neutral-300 ml-1 font-semibold">campaign_attribution_engine.sys</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ACTIVE RUN</span>
                </div>
              </div>

              {/* Campaign Quick Summary */}
              <div className="p-5 border-b border-white/[0.08] bg-neutral-900/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400 uppercase">Live Brand Deal</span>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FFD100]/20 text-[#FFD100] border border-[#FFD100]/30">
                    Q4 MULTI-CREATOR PUSH
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="font-display font-extrabold text-2xl text-white">$148,250</div>
                    <div className="text-[11px] text-neutral-400 font-mono">Total Verified Revenue Generated</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display font-extrabold text-2xl text-[#FFD100]">5.2x</div>
                    <div className="text-[11px] text-emerald-400 font-mono">Blended Campaign ROAS</div>
                  </div>
                </div>

                {/* Progress Tracking Bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                    <span>Campaign Conversion Goal (85% Reached)</span>
                    <span className="text-[#FFD100]">8.4M / 10M Views</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-[#FFD100] w-[85%] rounded-full shadow-[0_0_10px_#FFD100]" />
                  </div>
                </div>
              </div>

              {/* Creator Lineup Roster */}
              <div className="p-5 space-y-3 bg-[#0a0a0a]">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pb-1">
                  <span>ACTIVATED CREATORS IN CAMPAIGN</span>
                  <span className="text-[#FFD100]">3/3 LOCKED</span>
                </div>

                {/* Creator 1 */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/80 border border-white/[0.06] hover:border-[#FFD100]/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      alt="Karan Varma"
                      className="w-9 h-9 rounded-lg object-cover border border-white/10"
                    />
                    <div>
                      <div className="font-bold text-xs text-white flex items-center gap-1">
                        Karan Varma <ShieldCheck className="w-3 h-3 text-[#FFD100]" />
                      </div>
                      <div className="text-[10px] font-mono text-neutral-400">Tech & Gadgets • 1.42M Subs</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-emerald-400">+48.2K Clicks</div>
                    <div className="text-[9px] font-mono text-neutral-400">90s Integrated Video</div>
                  </div>
                </div>

                {/* Creator 2 */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/80 border border-white/[0.06] hover:border-[#FFD100]/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                      alt="Aarav Tech Labs"
                      className="w-9 h-9 rounded-lg object-cover border border-white/10"
                    />
                    <div>
                      <div className="font-bold text-xs text-white flex items-center gap-1">
                        Aarav Tech Labs <ShieldCheck className="w-3 h-3 text-[#FFD100]" />
                      </div>
                      <div className="text-[10px] font-mono text-neutral-400">AI & SaaS • 850K Subs</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-emerald-400">+31.5K Clicks</div>
                    <div className="text-[9px] font-mono text-neutral-400">Dedicated Segment</div>
                  </div>
                </div>

                {/* Creator 3 */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/80 border border-white/[0.06] hover:border-[#FFD100]/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                      alt="Vikram Sethi"
                      className="w-9 h-9 rounded-lg object-cover border border-white/10"
                    />
                    <div>
                      <div className="font-bold text-xs text-white flex items-center gap-1">
                        Vikram Sethi Money <ShieldCheck className="w-3 h-3 text-[#FFD100]" />
                      </div>
                      <div className="text-[10px] font-mono text-neutral-400">Finance & Wealth • 1.85M Subs</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-emerald-400">+62.8K Clicks</div>
                    <div className="text-[9px] font-mono text-neutral-400">Full Video Sponsorship</div>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Action */}
              <div className="p-3 bg-neutral-900/90 border-t border-white/[0.08] flex items-center justify-between text-xs">
                <span className="font-mono text-neutral-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Whitelisted Ad Amplification Active
                </span>
                <a
                  href="#network"
                  className="font-mono text-[#FFD100] hover:underline font-semibold flex items-center gap-1"
                >
                  View Full Roster <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
