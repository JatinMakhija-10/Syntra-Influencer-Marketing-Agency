'use client';

import React, { useState } from 'react';
import {
  Users,
  Target,
  FileCheck,
  TrendingUp,
  BarChart3,
  Award,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

const SERVICES = [
  {
    id: 'creator-sourcing',
    title: 'Audited Creator Sourcing',
    eyebrow: 'Audience Intelligence',
    icon: Users,
    description: 'We audit YouTube & social channels for real median viewership, audience demographics, and authentic engagement before committing brand budget.',
    metrics: '99.8% Fraud-Free',
    features: ['Demographic & Geo Mapping', 'View-to-Follower Ratio Audits', 'Historical CPM Benchmarks', 'Brand Safety Screening'],
    tag: 'Intelligence',
  },
  {
    id: 'campaign-strategy',
    title: 'High-ROAS Campaign Strategy',
    eyebrow: 'Full-Funnel Architecture',
    icon: Target,
    description: 'Full-lifecycle influencer campaign design: organic narrative hooks, product launch sequencing, custom discount architectures, and multi-tier flight schedules.',
    metrics: '4.8x Average ROAS',
    features: ['Custom Talking Points', 'High-Retention Video Hooks', 'Multi-Platform Flight Calendars', 'Conversion-Optimized CTAs'],
    tag: 'Core Offering',
  },
  {
    id: 'rate-cards',
    title: 'Rate Card Locking & Contracting',
    eyebrow: 'Commercial Protection',
    icon: FileCheck,
    description: 'We negotiate and lock transparent rate cards directly with top creators, securing optimal CPMs, multi-platform usage rights, and guaranteed delivery.',
    metrics: '-32% Lower Blended CPM',
    features: ['Standardized Legal Contracts', 'Perpetual & Paid Usage Rights', 'Exclusivity Enforcement', 'Milestone Escrow Releases'],
    tag: 'Commercial',
  },
  {
    id: 'paid-whitelisting',
    title: 'Paid Creator Whitelisting',
    eyebrow: 'Ad Amplification',
    icon: TrendingUp,
    description: 'We run targeted performance ads directly through creator handles (Meta Whitelisting, YouTube Partnership Ads & TikTok Spark Ads) to scale winning content.',
    metrics: '+240% Conversion Lift',
    features: ['Creator Handle Ad Access', 'Audience Retargeting Pixels', 'Split-Test Thumbnails & Copy', 'High-LTV Acquisition Funnels'],
    tag: 'Paid Growth',
  },
  {
    id: 'attribution',
    title: 'Full-Funnel Attribution & Analytics',
    eyebrow: 'Performance Tracking',
    icon: BarChart3,
    description: 'Granular post-campaign tracking with customized UTM analytics, coupon redemption monitoring, brand search volume lift, and verified ROAS reports.',
    metrics: '100% Attributed ROI',
    features: ['Custom UTM Tracking Dashboards', 'Affiliate Commission Engines', 'Organic Search Lift Audits', 'Executive Performance Dossiers'],
    tag: 'Analytics',
  },
  {
    id: 'talent-management',
    title: 'Exclusive Creator Roster',
    eyebrow: 'Talent Representation',
    icon: Award,
    description: 'Direct access to an exclusive network of vetted creators in Tech, AI, SaaS, Finance, and Lifestyle for high-touch long-term brand ambassadorships.',
    metrics: 'Priority Booking',
    features: ['Direct Creator Direct-Dial', 'Year-Long Ambassadorships', 'Co-Branded Product Drops', 'Executive Briefings'],
    tag: 'Exclusive',
  },
];

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(SERVICES[0].id);

  return (
    <section id="services" className="relative py-24 bg-[#0a0a0a] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD100]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FFD100]">
              Agency Capabilities
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            Influencer Marketing Engineered for <span className="text-gold-gradient">Revenue</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light">
            We eliminate the guesswork from influencer partnerships by pairing data-driven creator matching with rigorous commercial ROI tracking.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            const isSelected = activeService === service.id;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setActiveService(service.id)}
                className={`group relative p-7 rounded-2xl transition-all duration-300 flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-[#141414] border-[#FFD100]/40 shadow-[0_0_30px_rgba(255,209,0,0.15)] -translate-y-1'
                    : 'bg-[#0e0e0e] border-white/[0.07] hover:border-white/[0.15] hover:bg-[#121212]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] group-hover:bg-[#FFD100] border border-white/[0.1] group-hover:border-[#FFD100] flex items-center justify-center text-[#FFD100] group-hover:text-black transition-all">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-neutral-300">
                      {service.tag}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-[#FFD100] uppercase tracking-wider mb-1">
                    {service.eyebrow}
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD100] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#FFD100]">
                    {service.metrics}
                  </span>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 text-xs font-medium text-neutral-400 group-hover:text-white transition-colors"
                  >
                    <span>Deploy Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#FFD100]" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
