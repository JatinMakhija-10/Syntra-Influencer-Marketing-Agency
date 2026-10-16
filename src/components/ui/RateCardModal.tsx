'use client';

import React, { useEffect } from 'react';
import { Creator } from '@/types/creator';
import { formatCompactNumber } from '@/lib/formatters';
import { X, ExternalLink, ShieldCheck, Sparkles, Eye, Users, TrendingUp, FileText, Youtube, Instagram, Facebook } from 'lucide-react';

interface RateCardModalProps {
  creator: Creator | null;
  onClose: () => void;
  onBookCreator?: (creator: Creator) => void;
}

export default function RateCardModal({ creator, onClose, onBookCreator }: RateCardModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!creator) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Modal Dialog Surface */}
      <div
        className="relative w-full max-w-lg bg-[#0e0e0e] border border-white/[0.12] rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Ambient Yellow Glow */}
        <div className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 bg-[#FFD100]/10 rounded-full blur-2xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-neutral-400 hover:text-white transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Creator Identity Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-white/[0.08]">
          <img
            src={creator.avatar}
            alt={creator.name}
            className="w-16 h-16 rounded-xl object-cover border border-white/[0.15] shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-xl text-white tracking-tight">
                {creator.name}
              </h3>
              <ShieldCheck className="w-4 h-4 text-[#FFD100]" />
            </div>
            <p className="text-xs font-mono text-neutral-400">{creator.handle}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/[0.06] text-neutral-300">
                {creator.niche}
              </span>
              <span className="text-[10px] font-mono text-[#FFD100]">
                {creator.language}
              </span>
            </div>

            {/* Social Platform Badges */}
            {(creator.youtubeUrl || creator.instagramUrl || creator.facebookUrl) && (
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {creator.youtubeUrl && (
                  <a
                    href={creator.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-500/10 border border-red-500/20 text-[10px] font-mono text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    <Youtube className="w-3 h-3" />
                    <span>{formatCompactNumber(creator.youtubeSubs || creator.followers)}</span>
                  </a>
                )}
                {creator.instagramUrl && (
                  <a
                    href={creator.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono text-amber-300 hover:bg-amber-500/20 transition-colors"
                  >
                    <Instagram className="w-3 h-3" />
                    <span>{formatCompactNumber(creator.instagramFollowers || creator.followers)}</span>
                  </a>
                )}
                {creator.facebookUrl && (
                  <a
                    href={creator.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-400 hover:bg-blue-500/20 transition-colors"
                  >
                    <Facebook className="w-3 h-3" />
                    <span>{formatCompactNumber(creator.facebookFollowers || creator.followers)}</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Verified Metrics Overview */}
        <div className="grid grid-cols-3 gap-3 my-6">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-neutral-400 font-mono mb-1">
              <Users className="w-3.5 h-3.5 text-[#FFD100]" /> Total Reach
            </div>
            <div className="font-display font-bold text-lg text-white">
              {formatCompactNumber(creator.followers)}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-neutral-400 font-mono mb-1">
              <Eye className="w-3.5 h-3.5 text-[#FFD100]" />
              <span>{creator.youtubeSubs ? 'YouTube' : creator.instagramFollowers ? 'Instagram' : 'Platform'}</span>
            </div>
            <div className="font-display font-bold text-lg text-white">
              {formatCompactNumber(creator.youtubeSubs || creator.instagramFollowers || creator.facebookFollowers || creator.followers)}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-neutral-400 font-mono mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#FFD100]" /> Engagement
            </div>
            <div className="font-display font-bold text-lg text-[#FFD100]">
              {creator.ratio && creator.ratio > 0 ? `${creator.ratio}%` : 'High'}
            </div>
          </div>
        </div>

        {/* Deliverables & Commercial Package Overview */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-300">
            Approved Commercial Deliverables
          </h4>
          <div className="space-y-2 text-xs text-neutral-300">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-900/60 border border-neutral-800">
              <span className="font-medium">Integrated Video Sponsorship (60s-90s)</span>
              <span className="font-mono text-[#FFD100]">Available</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-900/60 border border-neutral-800">
              <span className="font-medium">Dedicated Product Deep Dive (8-12 min)</span>
              <span className="font-mono text-[#FFD100]">Available</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-900/60 border border-neutral-800">
              <span className="font-medium">Shorts / Reels Multi-Platform Blast</span>
              <span className="font-mono text-[#FFD100]">Available</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {creator.rateCardLink ? (
            <a
              href={creator.rateCardLink}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] text-white text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              <FileText className="w-4 h-4 text-[#FFD100]" />
              <span>Open Document Link</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <div className="flex-1 py-3 px-4 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs text-center">
              Custom Rates Upon Inquiry
            </div>
          )}

          <button
            onClick={() => {
              if (onBookCreator) onBookCreator(creator);
              onClose();
              const contactEl = document.getElementById('contact');
              if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex-1 btn-shimmer inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#FFD100] hover:bg-[#ffb700] text-[#080808] text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,209,0,0.25)]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Book Collaboration</span>
          </button>
        </div>
      </div>
    </div>
  );
}
