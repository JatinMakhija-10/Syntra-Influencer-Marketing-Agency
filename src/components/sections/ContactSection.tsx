'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, Mail, Sparkles, Phone, ArrowUpRight, Target } from 'lucide-react';

interface ContactSectionProps {
  prefilledCreator?: string;
}

export default function ContactSection({ prefilledCreator }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brand: '',
    service: 'YouTube Sponsorships',
    budget: '$15,000 - $50,000',
    creatorInterest: prefilledCreator || '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    setTimeout(() => {
      setStatus('success');
    }, 1000);
  };

  return (
    <section id="contact" className="relative py-24 bg-[#080808] border-t border-white/[0.08]">
      {/* Ambient background glow - Amber only, strictly zero purple */}
      <div className="pointer-events-none absolute bottom-10 right-10 w-96 h-96 bg-[#FFD100]/[0.04] rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context & Direct Contact */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD100]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FFD100]">
                Brand Partnerships & Campaigns
              </span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Ready to scale your next <span className="text-gold-gradient">influencer campaign</span>?
            </h2>

            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light">
              Connect directly with our senior agency strategist. We will match your target audience with verified high-performance creators, lock optimal CPM terms, and guarantee end-to-end attribution.
            </p>

            {/* Quick Contact Cards */}
            <div className="space-y-3 pt-4">
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800 hover:border-[#FFD100]/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Direct WhatsApp Dispatch</div>
                    <div className="text-[11px] font-mono text-neutral-400">Urgent campaign briefs & creator checks</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-[#FFD100] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="mailto:partnerships@syntra.agency"
                className="flex items-center justify-between p-4 rounded-xl bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800 hover:border-[#FFD100]/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#FFD100]/10 border border-[#FFD100]/30 flex items-center justify-center text-[#FFD100]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Campaign Inquiries</div>
                    <div className="text-[11px] font-mono text-neutral-400">partnerships@syntra.agency</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-[#FFD100] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: Glassmorphism Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="relative p-6 sm:p-10 rounded-2xl bg-neutral-950/80 border border-white/[0.1] shadow-2xl backdrop-blur-xl">
              {status === 'success' ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#FFD100]/20 border border-[#FFD100] flex items-center justify-center mx-auto text-[#FFD100]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white">
                    Campaign Brief Received
                  </h3>
                  <p className="text-neutral-400 text-sm max-w-md mx-auto">
                    Thank you. A campaign director from Syntra will prepare a custom creator shortlist and reach out within 24 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setFormData({
                        name: '',
                        email: '',
                        brand: '',
                        service: 'YouTube Sponsorships',
                        budget: '$15,000 - $50,000',
                        creatorInterest: '',
                        message: '',
                      });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#FFD100] text-[#080808] text-xs font-bold uppercase tracking-wider shadow-lg"
                  >
                    Submit Another Brief
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Mercer"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#FFD100] transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@brand.com"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#FFD100] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Brand Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                        Brand / Company *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        placeholder="e.g. Apex Security"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#FFD100] transition-colors"
                      />
                    </div>

                    {/* Campaign Budget Range */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                        Estimated Campaign Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#FFD100] transition-colors"
                      >
                        <option value="$5,000 - $15,000">$5,000 - $15,000 (Pilot Flight)</option>
                        <option value="$15,000 - $50,000">$15,000 - $50,000 (Multi-Creator Push)</option>
                        <option value="$50,000 - $150,000">$50,000 - $150,000 (Dominant Push)</option>
                        <option value="$150,000+">$150,000+ (Quarterly / Annual Retainer)</option>
                      </select>
                    </div>
                  </div>

                  {/* Primary Campaign Type */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                      Primary Campaign Objective
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'YouTube Sponsorships',
                        'Product Launch Blitz',
                        'Paid Whitelisting',
                        'Long-Term Ambassadorship',
                        'App Installs & DTC ROAS',
                      ].map((svc) => (
                        <button
                          type="button"
                          key={svc}
                          onClick={() => setFormData({ ...formData, service: svc })}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            formData.service === svc
                              ? 'bg-[#FFD100] text-[#080808] font-bold shadow-md'
                              : 'bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-700'
                          }`}
                        >
                          {svc}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Specific Creator or Channel of interest */}
                  {prefilledCreator && (
                    <div className="p-3 rounded-xl bg-[#FFD100]/10 border border-[#FFD100]/30 flex items-center justify-between text-xs">
                      <span className="text-neutral-300">Selected Creator for Campaign:</span>
                      <span className="font-mono font-bold text-[#FFD100]">{prefilledCreator}</span>
                    </div>
                  )}

                  {/* Campaign Brief */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                      Campaign Details & Target Timeline
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your target audience, key deliverables, desired creators, or target launch month..."
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#FFD100] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-shimmer w-full py-4 rounded-xl bg-[#FFD100] hover:bg-[#ffb700] text-[#080808] font-display font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,209,0,0.3)] hover:shadow-[0_0_35px_rgba(255,209,0,0.45)] transition-all hover:scale-[1.01]"
                  >
                    {status === 'submitting' ? (
                      <span>Submitting Campaign Brief...</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Submit Campaign Brief</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
