'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Creator, CreatorNiche } from '@/types/creator';
import { formatCompactNumber } from '@/lib/formatters';
import RateCardModal from '../ui/RateCardModal';
import {
  Search,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Users,
  Eye,
  FileText,
  Youtube,
  Instagram,
  Facebook,
} from 'lucide-react';

const CATEGORIES: string[] = [
  'All',
  'Fitness & Health',
  'Tech & Gadgets',
  'AI & Automation',
  'SaaS & Productivity',
  'Beauty & Grooming',
  'Finance & Business',
  'Lifestyle & Entertainment',
  'Gaming & Esports',
];

interface CreatorNetworkSectionProps {
  onSelectCreatorForBooking?: (creator: Creator) => void;
}

export default function CreatorNetworkSection({ onSelectCreatorForBooking }: CreatorNetworkSectionProps) {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [selectedNiche, setSelectedNiche] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'followers' | 'medianViews' | 'ratio'>('followers');

  // Selected creator for rate card modal
  const [activeRateCardCreator, setActiveRateCardCreator] = useState<Creator | null>(null);

  const fetchCreators = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/creators?status=Approved');
      const data = await res.json();
      if (data.success && Array.isArray(data.creators)) {
        setCreators(data.creators);
      } else {
        throw new Error(data.error || 'Failed to fetch creators');
      }
    } catch (err: any) {
      console.error('Error fetching creator roster:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreators();
  }, []);

  const filteredCreators = useMemo(() => {
    return creators
      .filter((creator) => {
        const matchesNiche = selectedNiche === 'All' || creator.niche.toLowerCase() === selectedNiche.toLowerCase();
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          !q ||
          creator.name.toLowerCase().includes(q) ||
          creator.handle.toLowerCase().includes(q) ||
          creator.niche.toLowerCase().includes(q) ||
          creator.language.toLowerCase().includes(q) ||
          (creator.bio && creator.bio.toLowerCase().includes(q));

        return matchesNiche && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'followers') return (b.followers || 0) - (a.followers || 0);
        if (sortBy === 'medianViews') return (b.medianViews || 0) - (a.medianViews || 0);
        if (sortBy === 'ratio') return (b.ratio || 0) - (a.ratio || 0);
        return 0;
      });
  }, [creators, selectedNiche, searchQuery, sortBy]);

  return (
    <section id="network" className="relative py-24 bg-[#080808] border-t border-white/[0.08]">
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute top-1/3 left-0 w-96 h-96 bg-[#FFD100]/[0.03] rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/[0.08]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD100]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FFD100]">
                Verified Talent Network
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              Approved Creators & Channels
            </h2>
            <p className="text-neutral-400 text-sm max-w-xl font-light">
              Explore audited metrics, median performance ratios, and approved commercial rate cards for our exclusive creator roster.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Verified Direct Access</span>
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="pt-8 pb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search creator, niche, or language..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 focus:border-[#FFD100] text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono text-neutral-400 uppercase">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-[#FFD100] transition-colors"
              >
                <option value="followers">Highest Followers</option>
                <option value="medianViews">Highest Median Views</option>
                <option value="ratio">Best View-to-Follower Ratio</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedNiche(category)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                  selectedNiche === category
                    ? 'bg-[#FFD100] text-[#080808] shadow-[0_0_15px_rgba(255,209,0,0.35)]'
                    : 'bg-white/[0.04] hover:bg-white/[0.08] text-neutral-400 hover:text-white border border-white/[0.06]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Creator Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="h-80 rounded-2xl bg-neutral-900/50 border border-neutral-800 animate-pulse p-6"
              />
            ))}
          </div>
        ) : filteredCreators.length === 0 ? (
          <div className="text-center py-20 px-4 rounded-2xl border border-dashed border-neutral-800 bg-neutral-950/40 my-6">
            <Users className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
            <h3 className="font-display font-bold text-lg text-white">No creators match your criteria</h3>
            <p className="text-sm text-neutral-400 max-w-sm mx-auto mt-1 mb-6">
              Try adjusting your category filter or search keywords, or request a custom creator shortlist for your brand.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFD100] text-[#080808] text-xs font-bold uppercase tracking-wider shadow-lg"
            >
              <span>Request Custom Sourcing</span>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCreators.map((creator) => (
              <div
                key={creator.id}
                className="group relative rounded-2xl bg-[#0f0f0f] hover:bg-[#141414] border border-white/[0.08] hover:border-white/[0.18] transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-[0_0_30px_rgba(255,209,0,0.12)] hover:-translate-y-1"
              >
                {/* Creator Card Banner or Highlight */}
                <div className="relative h-24 bg-neutral-900 overflow-hidden">
                  {creator.bannerImage ? (
                    <img
                      src={creator.bannerImage}
                      alt={`${creator.name} banner`}
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-opacity"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 opacity-60" />
                  )}

                  {/* Niche Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-neutral-200">
                      {creator.niche}
                    </span>
                  </div>

                  {/* Profile Link Icon */}
                  {creator.url && (
                    <a
                      href={creator.url}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-black/70 hover:bg-[#FFD100] text-neutral-400 hover:text-black transition-colors"
                      title="Open Channel URL"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* Avatar & Info */}
                <div className="px-5 pt-0 pb-5 flex-1 flex flex-col justify-between">
                  <div className="relative -mt-8 mb-3 flex items-end justify-between">
                    <div className="relative">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-16 h-16 rounded-xl object-cover border-2 border-[#0f0f0f] shadow-lg bg-neutral-800"
                      />
                      <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-[#FFD100] text-[#080808]" title="Verified Creator">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <span className="text-[10px] font-mono font-semibold text-[#FFD100] bg-[#FFD100]/10 px-2.5 py-0.5 rounded-full border border-[#FFD100]/20">
                      {creator.language}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-base text-white group-hover:text-[#FFD100] transition-colors">
                      {creator.name}
                    </h3>
                    <p className="text-xs font-mono text-neutral-400 mb-2">{creator.handle}</p>

                    {/* Social Platform Badges */}
                    {(creator.youtubeUrl || creator.instagramUrl || creator.facebookUrl) && (
                      <div className="flex flex-wrap items-center gap-1.5 mb-3">
                        {creator.youtubeUrl && (
                          <a
                            href={creator.youtubeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-500/10 border border-red-500/20 text-[10px] font-mono text-red-400 hover:bg-red-500/20 transition-colors"
                            title="YouTube Channel"
                          >
                            <Youtube className="w-2.5 h-2.5" />
                            <span>{formatCompactNumber(creator.youtubeSubs || creator.followers)}</span>
                          </a>
                        )}
                        {creator.instagramUrl && (
                          <a
                            href={creator.instagramUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono text-amber-300 hover:bg-amber-500/20 transition-colors"
                            title="Instagram Profile"
                          >
                            <Instagram className="w-2.5 h-2.5" />
                            <span>{formatCompactNumber(creator.instagramFollowers || creator.followers)}</span>
                          </a>
                        )}
                        {creator.facebookUrl && (
                          <a
                            href={creator.facebookUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-400 hover:bg-blue-500/20 transition-colors"
                            title="Facebook Page"
                          >
                            <Facebook className="w-2.5 h-2.5" />
                            <span>{formatCompactNumber(creator.facebookFollowers || creator.followers)}</span>
                          </a>
                        )}
                      </div>
                    )}

                    {creator.bio && (
                      <p className="text-xs text-neutral-400 line-clamp-2 mb-4 leading-relaxed font-light">
                        {creator.bio}
                      </p>
                    )}
                  </div>

                  {/* Key Metrics Row */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/[0.06] my-2 bg-neutral-950/40 rounded-xl px-2.5">
                    <div className="text-center">
                      <div className="text-[10px] text-neutral-400 font-mono">Total Reach</div>
                      <div className="font-display font-bold text-sm text-white">
                        {formatCompactNumber(creator.followers)}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-[10px] text-neutral-400 font-mono">
                        {creator.youtubeSubs ? 'YouTube' : creator.instagramFollowers ? 'Instagram' : 'Platform'}
                      </div>
                      <div className="font-display font-bold text-sm text-white">
                        {formatCompactNumber(creator.youtubeSubs || creator.instagramFollowers || creator.facebookFollowers || creator.followers)}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-[10px] text-neutral-400 font-mono">Engagement</div>
                      <div className="font-display font-bold text-sm text-[#FFD100]">
                        {creator.ratio && creator.ratio > 0 ? `${creator.ratio}%` : 'High'}
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-3 flex items-center gap-2">
                    <button
                      onClick={() => setActiveRateCardCreator(creator)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-[#FFD100] text-neutral-300 hover:text-[#080808] border border-white/[0.08] hover:border-[#FFD100] text-xs font-semibold uppercase tracking-wider transition-all"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Rate Card</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rate Card Preview Modal */}
      <RateCardModal
        creator={activeRateCardCreator}
        onClose={() => setActiveRateCardCreator(null)}
        onBookCreator={onSelectCreatorForBooking}
      />
    </section>
  );
}
