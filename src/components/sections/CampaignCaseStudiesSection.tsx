'use client';

import React, { useState } from 'react';
import { TrendingUp, Users, Eye, ArrowUpRight, DollarSign, Target, Award, Sparkles } from 'lucide-react';

const CAMPAIGNS = [
  {
    id: 'camp-01',
    brand: 'Apex Cloud Security',
    industry: 'Enterprise SaaS & Tech',
    title: 'Q4 Global Creator Blitz: Securing Developer Trust',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    creatorsActivated: 8,
    totalReach: '8.4M Impressions',
    roas: '5.2x Measured ROAS',
    cpa: '$14.20 CPA',
    highlightMetric: '142K+ Clicks',
    summary: 'Orchestrated 8 leading tech reviewers with dedicated 90-second workflow integrations, driving enterprise security trial conversions.',
    deliverables: ['Dedicated YouTube Integrations', 'Custom Referral Dashboards', 'Audience Retargeting Whitelist'],
  },
  {
    id: 'camp-02',
    brand: 'Nova Workspace AI',
    industry: 'AI & Productivity',
    title: 'Autonomous Coding Launch: 0 to 250,000 Signups',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
    creatorsActivated: 12,
    totalReach: '12.8M Impressions',
    roas: '4.8x Measured ROAS',
    cpa: '$1.85 Per Signup',
    highlightMetric: '250K+ Users',
    summary: 'Synchronized simultaneous launch videos across 12 tier-1 AI engineers and tech founders, dominating the algorithmic recommendation feed.',
    deliverables: ['Launch Day Video Synchronization', 'Interactive Demo Overlays', 'Founder AMA Streams'],
  },
  {
    id: 'camp-03',
    brand: 'Lumina Clean Skincare',
    industry: 'DTC Beauty & Wellness',
    title: 'High-Conversion Aesthetic Reel & Shorts Surge',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80',
    creatorsActivated: 15,
    totalReach: '6.2M Video Views',
    roas: '6.1x Measured ROAS',
    cpa: '310% DTC Revenue Surge',
    highlightMetric: '$840K Sales',
    summary: 'Activated dermatologists and beauty creators for 30-day honest routines, pairing organic engagement with whitelisted Spark Ads.',
    deliverables: ['Multi-Angle Texture Demos', 'Custom Discount Codes', 'Paid Creator Whitelisting'],
  },
  {
    id: 'camp-04',
    brand: 'Zenith Wealth Management',
    industry: 'Fintech & Investments',
    title: 'Wealth Compounding Push for High-Earner Millennial Base',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
    creatorsActivated: 6,
    totalReach: '4.6M Targeted Views',
    roas: '7.4x Lifetime Value',
    cpa: '$2.4M Direct AUM',
    highlightMetric: '18K Qualified Leads',
    summary: 'Deep-dive educational sponsorships breaking down asset allocation models with financial analysts and top finance educators.',
    deliverables: ['In-Depth Portfolio Breakdowns', 'Compliance-Approved Disclosures', 'Direct Advisory Funnels'],
  },
];

const INDUSTRIES = ['All', 'Enterprise SaaS & Tech', 'AI & Productivity', 'DTC Beauty & Wellness', 'Fintech & Investments'];

export default function CampaignCaseStudiesSection() {
  const [activeIndustry, setActiveIndustry] = useState('All');

  const filteredCampaigns = CAMPAIGNS.filter(
    (c) => activeIndustry === 'All' || c.industry === activeIndustry
  );

  return (
    <section id="campaigns" className="relative py-24 bg-[#090909] border-t border-white/[0.08]">
      {/* Ambient background glow - Yellow/Amber only, STRICTLY ZERO PURPLE */}
      <div className="pointer-events-none absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#FFD100]/[0.03] rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD100]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FFD100]">
                Proven Campaign Performance
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
              Featured Brand <span className="text-gold-gradient">Campaigns</span>
            </h2>
            <p className="text-neutral-400 text-sm max-w-xl font-light">
              Real commercial case studies showing how our agency pairs tier-1 brands with verified creators to unlock outsized ROAS and measurable customer acquisition.
            </p>
          </div>

          {/* Industry Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {INDUSTRIES.map((ind) => (
              <button
                key={ind}
                onClick={() => setActiveIndustry(ind)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                  activeIndustry === ind
                    ? 'bg-[#FFD100] text-[#080808] shadow-[0_0_15px_rgba(255,209,0,0.35)] font-bold'
                    : 'bg-white/[0.04] hover:bg-white/[0.08] text-neutral-400 hover:text-white border border-white/[0.06]'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCampaigns.map((camp) => (
            <div
              key={camp.id}
              className="group relative rounded-2xl bg-[#0f0f0f] border border-white/[0.08] hover:border-white/[0.2] overflow-hidden transition-all duration-300 hover:shadow-[0_0_35px_rgba(255,209,0,0.14)] flex flex-col justify-between"
            >
              {/* Media Container with warm amber/gold overlays - strictly ZERO purple */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900">
                <img
                  src={camp.image}
                  alt={camp.brand}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-70 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-black/40 to-transparent" />

                {/* Overlaid Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[#FFD100] border border-[#FFD100]/30">
                    {camp.brand}
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-neutral-300 border border-white/10 hidden sm:inline">
                    {camp.industry}
                  </span>
                </div>

                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD100] text-[#080808] text-xs font-display font-extrabold shadow-lg">
                  <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{camp.roas}</span>
                </div>

                {/* Bottom Highlight on Image */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                  <span className="font-mono text-neutral-300 flex items-center gap-1.5 bg-black/70 px-2.5 py-1 rounded-lg backdrop-blur-md">
                    <Users className="w-3.5 h-3.5 text-[#FFD100]" />
                    <span>{camp.creatorsActivated} Creators Activated</span>
                  </span>
                  <span className="font-mono font-bold text-white bg-black/70 px-2.5 py-1 rounded-lg backdrop-blur-md">
                    {camp.highlightMetric}
                  </span>
                </div>
              </div>

              {/* Campaign Content */}
              <div className="p-6 sm:p-7 space-y-5">
                <div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-[#FFD100] transition-colors leading-tight mb-2">
                    {camp.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                    {camp.summary}
                  </p>
                </div>

                {/* Deliverables / Scope */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                    Agency Deliverables Executed:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {camp.deliverables.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300"
                      >
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Performance Metric Matrix */}
                <div className="pt-4 border-t border-white/[0.08] grid grid-cols-3 gap-3 text-center">
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-[10px] text-neutral-400 font-mono uppercase">Total Reach</div>
                    <div className="font-display font-bold text-sm text-white mt-0.5">{camp.totalReach}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-[10px] text-neutral-400 font-mono uppercase">Acquisition</div>
                    <div className="font-display font-bold text-sm text-white mt-0.5">{camp.cpa}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-[10px] text-neutral-400 font-mono uppercase">Target ROAS</div>
                    <div className="font-display font-bold text-sm text-[#FFD100] mt-0.5">{camp.roas.split(' ')[0]}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
