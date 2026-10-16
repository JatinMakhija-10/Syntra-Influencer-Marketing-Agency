'use client';

import React from 'react';
import { Search, FileSignature, Sparkles, Rocket, TrendingUp, Users, DollarSign, ShieldCheck } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    title: 'Audit & Match',
    icon: Search,
    description: 'We audit your target customer demographics, analyze creator follower validity, and match your brand with high-retention channels.',
    deliverable: 'Custom Creator Roster & Fraud Audit',
  },
  {
    number: '02',
    title: 'Rate Card Locking',
    icon: FileSignature,
    description: 'We negotiate and secure verified commercial rate cards directly, locking in optimal CPMs, legal usage rights, and guaranteed delivery.',
    deliverable: 'Binding Commercial Agreements & Deliverables',
  },
  {
    number: '03',
    title: 'Narrative Integration',
    icon: Sparkles,
    description: 'We co-develop high-converting sponsorship briefs and organic talking points with creators, eliminating audience fatigue.',
    deliverable: 'Pre-Approved Video Cuts & Tracking Links',
  },
  {
    number: '04',
    title: 'Attribution & Scale',
    icon: Rocket,
    description: 'We coordinate synchronized releases, track real-time discount/UTM conversions, and whitelist winning creator videos for paid ads.',
    deliverable: 'Live ROAS Dashboard & Scaling Report',
  },
];

const METRICS = [
  { value: '4.8x', label: 'Average Client ROAS', sub: 'Performance Campaign Benchmark' },
  { value: '$18.5M+', label: 'Attributed Brand Sales', sub: 'Direct Creator Conversions' },
  { value: '60+', label: 'Vetted Channel Partners', sub: 'Across Tier-1 Verticals' },
  { value: '100%', label: 'Attributed Tracking', sub: 'Real-Time UTM & Conversion Audit' },
];

export default function ProcessSection() {
  return (
    <section id="process" className="relative py-24 bg-[#080808] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD100]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FFD100]">
              The Campaign Lifecycle
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            How We Execute <span className="text-gold-gradient">High-ROAS Campaigns</span>
          </h2>
          <p className="text-neutral-400 text-sm font-light">
            A frictionless, full-service workflow designed to turn creator sponsorships into measurable customer acquisition.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="group relative p-6 rounded-2xl bg-[#0e0e0e] hover:bg-[#131313] border border-white/[0.08] hover:border-white/[0.18] transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Ghost Number in Syne Font */}
                <div className="absolute top-2 right-4 font-display font-extrabold text-7xl text-white/[0.03] group-hover:text-[#FFD100]/[0.08] select-none pointer-events-none transition-colors">
                  {step.number}
                </div>

                <div>
                  <div className="w-11 h-11 rounded-xl bg-white/[0.04] group-hover:bg-[#FFD100] border border-white/[0.08] group-hover:border-[#FFD100] flex items-center justify-center text-[#FFD100] group-hover:text-black transition-all mb-6">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="font-mono text-xs text-[#FFD100] mb-1 font-semibold">
                    STAGE {step.number}
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] text-[11px] font-mono text-neutral-300 flex items-center justify-between">
                  <span className="text-neutral-500">Output:</span>
                  <span className="text-neutral-300 font-semibold">{step.deliverable}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Agency Performance Metrics Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-neutral-900/90 via-[#111111] to-neutral-900/90 border border-white/[0.1] p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {METRICS.map((metric, idx) => (
              <div key={idx} className="space-y-1 text-center md:text-left">
                <div className="font-display font-extrabold text-3xl sm:text-5xl text-[#FFD100] tracking-tight">
                  {metric.value}
                </div>
                <div className="font-display font-bold text-sm text-white pt-1">
                  {metric.label}
                </div>
                <div className="text-[11px] font-mono text-neutral-400">
                  {metric.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
