'use client';

import React from 'react';

const MARQUEE_ITEMS = [
  'Influencer Marketing',
  'YouTube Sponsorships',
  'Creator Talent Sourcing',
  'Transparent Rate Cards',
  'Campaign ROAS Tracking',
  'High-Conversion Brand Deals',
  'Paid Whitelisting & Spark Ads',
  'Exclusive Creator Roster',
  'Multi-Platform Product Launches',
  'Full-Funnel Attribution',
];

export default function ServiceMarquee() {
  return (
    <div className="relative w-full overflow-hidden border-y border-white/[0.08] bg-[#090909] py-4 select-none">
      {/* Edge gradient masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#080808] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#080808] to-transparent z-10" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {/* Set 1 */}
        <div className="flex items-center gap-8 shrink-0 pr-8">
          {MARQUEE_ITEMS.map((item, idx) => (
            <div key={`m1-${idx}`} className="flex items-center gap-8">
              <span className="font-display text-sm sm:text-base font-bold tracking-wider text-neutral-300 uppercase">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD100] shadow-[0_0_8px_#FFD100]" />
            </div>
          ))}
        </div>

        {/* Set 2 (Duplicate for seamless loop) */}
        <div className="flex items-center gap-8 shrink-0 pr-8" aria-hidden="true">
          {MARQUEE_ITEMS.map((item, idx) => (
            <div key={`m2-${idx}`} className="flex items-center gap-8">
              <span className="font-display text-sm sm:text-base font-bold tracking-wider text-neutral-300 uppercase">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD100] shadow-[0_0_8px_#FFD100]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
