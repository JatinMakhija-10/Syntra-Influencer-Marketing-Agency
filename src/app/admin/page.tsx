'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Creator, CreatorStatus, FetchedSocialData } from '@/types/creator';
import { formatCompactNumber } from '@/lib/formatters';
import {
  Sliders,
  Plus,
  Upload,
  Download,
  Trash2,
  Edit2,
  ExternalLink,
  ShieldCheck,
  Search,
  RefreshCw,
  FileSpreadsheet,
  FileText,
  Users,
  Eye,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  X,
  ArrowLeft,
  Sparkles,
  Youtube,
  Instagram,
  Facebook,
  Zap,
  Globe,
  Check,
  Share2,
} from 'lucide-react';

export default function AdminPage() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Quick 1-click social importer state on the main dashboard
  const [quickSocialUrl, setQuickSocialUrl] = useState('');
  const [quickFetching, setQuickFetching] = useState(false);

  // Filters & Search
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [nicheFilter, setNicheFilter] = useState<string>('All');

  // Modals state
  const [editingCreator, setEditingCreator] = useState<Partial<Creator> | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [isSheetSyncOpen, setIsSheetSyncOpen] = useState(false);

  // Modal social scraper fields
  const [modalYtUrl, setModalYtUrl] = useState('');
  const [modalIgUrl, setModalIgUrl] = useState('');
  const [modalFbUrl, setModalFbUrl] = useState('');
  const [modalScraping, setModalScraping] = useState(false);
  const [lastFetchedPreview, setLastFetchedPreview] = useState<FetchedSocialData | null>(null);

  // Bulk Upload Form
  const [bulkInputType, setBulkInputType] = useState<'file' | 'text'>('file');
  const [rawTextContent, setRawTextContent] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);

  // Google Sheet Sync Form
  const [appsScriptUrl, setAppsScriptUrl] = useState('');
  const [syncLoading, setSyncLoading] = useState(false);

  // Fetch all creators
  const loadCreators = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/creators');
      const data = await res.json();
      if (data.success) {
        setCreators(data.creators);
      }
    } catch (err: any) {
      showMessage('error', 'Failed to load channel database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCreators();
  }, []);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  // Stats
  const totalFollowers = useMemo(() => creators.reduce((acc, c) => acc + (c.followers || 0), 0), [creators]);
  const totalViews = useMemo(() => creators.reduce((acc, c) => acc + (c.medianViews || 0), 0), [creators]);
  const approvedCount = useMemo(() => creators.filter((c) => c.status === 'Approved').length, [creators]);

  // Filtered Creators list
  const filteredList = useMemo(() => {
    return creators.filter((c) => {
      const matchesSearch =
        !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.handle.toLowerCase().includes(search.toLowerCase()) ||
        c.niche.toLowerCase().includes(search.toLowerCase()) ||
        c.language.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
      const matchesNiche = nicheFilter === 'All' || c.niche === nicheFilter;

      return matchesSearch && matchesStatus && matchesNiche;
    });
  }, [creators, search, statusFilter, nicheFilter]);

  // Handle Quick 1-Click Social Importer from Dashboard
  const handleQuickAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickSocialUrl.trim()) {
      showMessage('error', 'Please enter a YouTube, Instagram, or Facebook URL');
      return;
    }

    try {
      setQuickFetching(true);
      const fetchRes = await fetch('/api/admin/fetch-social-stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ anyUrl: quickSocialUrl.trim() }),
      });
      const fetchJson = await fetchRes.json();

      if (!fetchJson.success || !fetchJson.data) {
        throw new Error(fetchJson.error || 'Failed to detect channel statistics');
      }

      const fetched: FetchedSocialData = fetchJson.data;

      // Automatically create and save the creator
      const computedReach =
        (fetched.youtubeSubs || 0) +
        (fetched.instagramFollowers || 0) +
        (fetched.facebookFollowers || 0) ||
        fetched.totalFollowers ||
        100000;

      const newCreatorPayload = {
        name: fetched.name || 'New Creator',
        handle: fetched.handle || '@creator',
        url: fetched.youtubeUrl || fetched.instagramUrl || fetched.facebookUrl || quickSocialUrl.trim(),
        avatar: fetched.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
        niche: fetched.niche || 'Fitness & Health',
        language: 'English',
        followers: computedReach,
        youtubeUrl: fetched.youtubeUrl,
        youtubeSubs: fetched.youtubeSubs,
        instagramUrl: fetched.instagramUrl,
        instagramFollowers: fetched.instagramFollowers,
        facebookUrl: fetched.facebookUrl,
        facebookFollowers: fetched.facebookFollowers,
        status: 'Approved' as CreatorStatus,
        featured: false,
      };

      const saveRes = await fetch('/api/creators', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCreatorPayload),
      });
      const saveJson = await saveRes.json();

      if (saveJson.success) {
        showMessage('success', `✨ Successfully extracted and added "${fetched.name}" with ${formatCompactNumber(computedReach)} reach!`);
        setQuickSocialUrl('');
        loadCreators();
      } else {
        throw new Error(saveJson.error);
      }
    } catch (err: any) {
      showMessage('error', err.message || 'Error extracting social channel');
    } finally {
      setQuickFetching(false);
    }
  };

  // Handle Multi-Social Auto-Fetch inside the Modal
  const handleFetchInsideModal = async () => {
    if (!modalYtUrl && !modalIgUrl && !modalFbUrl) {
      showMessage('error', 'Please provide at least one social URL (YouTube, Instagram, or Facebook)');
      return;
    }

    try {
      setModalScraping(true);
      const res = await fetch('/api/admin/fetch-social-stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          youtubeUrl: modalYtUrl.trim(),
          instagramUrl: modalIgUrl.trim(),
          facebookUrl: modalFbUrl.trim(),
        }),
      });
      const data = await res.json();

      if (!data.success || !data.data) {
        throw new Error(data.error || 'Failed to extract social statistics');
      }

      const fetched: FetchedSocialData = data.data;
      setLastFetchedPreview(fetched);

      // Populate current editing creator state
      setEditingCreator((prev) => {
        const ytSubs = fetched.youtubeSubs ?? prev?.youtubeSubs ?? 0;
        const igFollowers = fetched.instagramFollowers ?? prev?.instagramFollowers ?? 0;
        const fbFollowers = fetched.facebookFollowers ?? prev?.facebookFollowers ?? 0;
        const total = (ytSubs + igFollowers + fbFollowers) || fetched.totalFollowers || prev?.followers || 0;

        return {
          ...prev,
          name: prev?.name && prev.name !== 'New Creator' && prev.name !== '' ? prev.name : (fetched.name || 'Creator'),
          handle: prev?.handle && prev.handle !== '@' && prev.handle !== '@creator' ? prev.handle : (fetched.handle || '@creator'),
          avatar: fetched.avatar || prev?.avatar,
          niche: (fetched.niche as any) || prev?.niche || 'Fitness & Health',
          youtubeUrl: fetched.youtubeUrl || prev?.youtubeUrl,
          youtubeSubs: ytSubs,
          instagramUrl: fetched.instagramUrl || prev?.instagramUrl,
          instagramFollowers: igFollowers,
          facebookUrl: fetched.facebookUrl || prev?.facebookUrl,
          facebookFollowers: fbFollowers,
          followers: total,
          url: fetched.youtubeUrl || fetched.instagramUrl || fetched.facebookUrl || prev?.url || '#',
        };
      });

      showMessage('success', `✨ Successfully extracted details for ${fetched.name}`);
    } catch (err: any) {
      showMessage('error', err.message || 'Failed to fetch social stats');
    } finally {
      setModalScraping(false);
    }
  };

  // Handle Save / Edit Creator
  const handleSaveCreator = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCreator || !editingCreator.name) {
      showMessage('error', 'Channel name is required');
      return;
    }

    try {
      const computedFollowers =
        (editingCreator.youtubeSubs || 0) +
        (editingCreator.instagramFollowers || 0) +
        (editingCreator.facebookFollowers || 0) ||
        editingCreator.followers ||
        10000;

      const payload = {
        ...editingCreator,
        followers: computedFollowers,
        niche: editingCreator.niche || 'Fitness & Health',
      };

      const res = await fetch('/api/creators', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        showMessage('success', `Channel "${editingCreator.name}" saved successfully`);
        setIsEditorOpen(false);
        setEditingCreator(null);
        setLastFetchedPreview(null);
        setModalYtUrl('');
        setModalIgUrl('');
        setModalFbUrl('');
        loadCreators();
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      showMessage('error', err.message || 'Error saving channel');
    }
  };

  // Handle Delete
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/creators/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showMessage('success', `Channel "${name}" deleted`);
        loadCreators();
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      showMessage('error', err.message || 'Error deleting channel');
    }
  };

  // Handle Bulk Upload
  const handleBulkUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawTextContent.trim()) {
      showMessage('error', 'Please provide CSV or JSON content');
      return;
    }

    try {
      setUploadLoading(true);
      let payload: any = {};
      const trimmed = rawTextContent.trim();

      if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
        try {
          const parsed = JSON.parse(trimmed);
          payload = { creators: Array.isArray(parsed) ? parsed : [parsed] };
        } catch {
          showMessage('error', 'Invalid JSON syntax');
          setUploadLoading(false);
          return;
        }
      } else {
        payload = { csvText: trimmed };
      }

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        showMessage('success', data.message || 'Channels imported successfully');
        setIsBulkUploadOpen(false);
        setRawTextContent('');
        loadCreators();
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      showMessage('error', err.message || 'Failed to upload channels');
    } finally {
      setUploadLoading(false);
    }
  };

  // Handle File Drag & Drop
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setRawTextContent(text);
      setBulkInputType('text');
    };
    reader.readAsText(file);
  };

  // Handle Google Sheet Sync
  const handleSheetSync = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appsScriptUrl || !appsScriptUrl.startsWith('http')) {
      showMessage('error', 'Please enter a valid Google Apps Script Web App URL');
      return;
    }

    try {
      setSyncLoading(true);
      const res = await fetch('/api/admin/sync-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpointUrl: appsScriptUrl }),
      });

      const data = await res.json();
      if (data.success) {
        showMessage('success', data.message || 'Google Sheets CRM sync successful!');
        setIsSheetSyncOpen(false);
        loadCreators();
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      showMessage('error', err.message || 'Google Sheets sync failed');
    } finally {
      setSyncLoading(false);
    }
  };

  // Export Channels as JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(creators, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `syntra_channels_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-white/[0.08] px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Website</span>
            </Link>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FFD100] flex items-center justify-center font-display font-extrabold text-[#080808]">
                S
              </div>
              <div>
                <h1 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  Creator & Channel Admin Portal
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#FFD100]/20 text-[#FFD100] border border-[#FFD100]/30">
                    Auto Social Fetcher
                  </span>
                </h1>
              </div>
            </div>
          </div>

          {/* Action Header Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                setEditingCreator({
                  name: '',
                  handle: '@',
                  url: '',
                  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
                  niche: 'Fitness & Health',
                  language: 'English',
                  followers: 0,
                  youtubeSubs: 0,
                  instagramFollowers: 0,
                  facebookFollowers: 0,
                  status: 'Approved',
                  featured: false,
                });
                setModalYtUrl('');
                setModalIgUrl('');
                setModalFbUrl('');
                setLastFetchedPreview(null);
                setIsEditorOpen(true);
              }}
              className="btn-shimmer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFD100] hover:bg-[#ffb700] text-[#080808] text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(255,209,0,0.25)] transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add / Auto-Fetch Channel</span>
            </button>

            <button
              onClick={() => setIsBulkUploadOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-[#FFD100]" />
              <span>Bulk Upload (CSV/JSON)</span>
            </button>

            <button
              onClick={() => setIsSheetSyncOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold transition-colors"
              title="Sync with Google Sheets CRM"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Google Sheets Sync</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white"
              title="Export Channels as JSON"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Notifications Toast */}
      {message && (
        <div
          className={`fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md border text-xs font-medium ${
            message.type === 'success'
              ? 'bg-neutral-900/95 border-emerald-500/50 text-emerald-300'
              : 'bg-neutral-900/95 border-red-500/50 text-red-300'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Main Admin Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* ⚡ Quick 1-Click Social Link Importer Banner */}
        <div className="relative rounded-2xl bg-gradient-to-r from-neutral-950 via-[#111111] to-neutral-950 border border-[#FFD100]/30 p-6 shadow-2xl shadow-black/80 overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFD100]/[0.05] rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FFD100] uppercase tracking-wider">
                <Zap className="w-4 h-4 text-[#FFD100] animate-pulse" />
                <span>Instant Social Link Auto-Extractor</span>
              </div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
                Give us the social link — we pull the image, followers & stats automatically
              </h2>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Paste any YouTube channel, Instagram profile, or Facebook page link. We extract the creator photo, subscriber / follower count, and channel handle in one click.
              </p>
            </div>

            {/* Quick Input Bar */}
            <form onSubmit={handleQuickAdd} className="flex-1 max-w-xl flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <input
                  type="text"
                  required
                  placeholder="Paste YouTube, Instagram, or Facebook URL (e.g. youtube.com/@mkbhd)"
                  value={quickSocialUrl}
                  onChange={(e) => setQuickSocialUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFD100] transition-colors shadow-inner"
                />
              </div>

              <button
                type="submit"
                disabled={quickFetching || !quickSocialUrl.trim()}
                className="btn-shimmer whitespace-nowrap px-6 py-3 rounded-xl bg-[#FFD100] hover:bg-[#ffb700] text-[#080808] text-xs font-display font-extrabold uppercase tracking-wider shadow-[0_0_20px_rgba(255,209,0,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {quickFetching ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Extracting...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Auto-Add Creator</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-neutral-900/70 border border-white/[0.08]">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-xs font-mono uppercase">Total Channels</span>
              <Users className="w-4 h-4 text-[#FFD100]" />
            </div>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              {creators.length}
            </div>
            <div className="text-[11px] text-emerald-400 font-mono mt-1">
              {approvedCount} Publicly Approved
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/70 border border-white/[0.08]">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-xs font-mono uppercase">Total Reach</span>
              <TrendingUp className="w-4 h-4 text-[#FFD100]" />
            </div>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              {formatCompactNumber(totalFollowers)}
            </div>
            <div className="text-[11px] text-neutral-400 font-mono mt-1">Combined Subscribers</div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/70 border border-white/[0.08]">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-xs font-mono uppercase">Social Platforms</span>
              <Share2 className="w-4 h-4 text-[#FFD100]" />
            </div>
            <div className="font-display font-extrabold text-base sm:text-lg text-white">
              YouTube • IG • FB
            </div>
            <div className="text-[11px] text-[#FFD100] font-mono mt-1">Multi-Channel Sync</div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/70 border border-white/[0.08]">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-xs font-mono uppercase">Live Storage</span>
              <FileText className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="font-display font-bold text-lg text-white">
              data/creators.json
            </div>
            <div className="text-[11px] text-emerald-400 font-mono mt-1">
              Persistent Disk Sync
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-neutral-950 p-4 rounded-2xl border border-white/[0.08]">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by channel name, handle, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#FFD100]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-[#FFD100]"
            >
              <option value="All">All Statuses</option>
              <option value="Approved">Approved (Public)</option>
              <option value="Pending">Pending</option>
              <option value="Draft">Draft</option>
            </select>

            {/* Niche Filter */}
            <select
              value={nicheFilter}
              onChange={(e) => setNicheFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-[#FFD100]"
            >
              <option value="All">All Niches</option>
              <option value="Fitness & Health">Fitness & Health</option>
              <option value="Tech & Gadgets">Tech & Gadgets</option>
              <option value="AI & Automation">AI & Automation</option>
              <option value="SaaS & Productivity">SaaS & Productivity</option>
              <option value="Beauty & Grooming">Beauty & Grooming</option>
              <option value="Finance & Business">Finance & Business</option>
              <option value="Lifestyle & Entertainment">Lifestyle & Entertainment</option>
              <option value="Gaming & Esports">Gaming & Esports</option>
            </select>

            {/* Refresh Button */}
            <button
              onClick={loadCreators}
              className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white"
              title="Reload channels"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#FFD100]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Channels Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-neutral-950">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-900/80 text-neutral-400 uppercase font-mono tracking-wider border-b border-white/[0.08]">
              <tr>
                <th className="py-3.5 px-4">Channel & Image</th>
                <th className="py-3.5 px-4">Social Platforms & Stats</th>
                <th className="py-3.5 px-4">Niche</th>
                <th className="py-3.5 px-4">Total Reach</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-neutral-500">
                    No channel records found. Paste a YouTube, Instagram, or Facebook link above to auto-detect and populate.
                  </td>
                </tr>
              ) : (
                filteredList.map((creator) => (
                  <tr key={creator.id} className="hover:bg-neutral-900/50 transition-colors">
                    {/* Creator Identity & Fetched Image */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={creator.avatar}
                          alt={creator.name}
                          className="w-11 h-11 rounded-xl object-cover bg-neutral-800 border border-white/10 shadow-md shrink-0"
                          onError={(e) => {
                            (e.target as any).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400';
                          }}
                        />
                        <div>
                          <div className="font-bold text-white flex items-center gap-1.5 text-sm">
                            {creator.name}
                            {creator.featured && (
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#FFD100]/20 text-[#FFD100]">
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] font-mono text-neutral-400">
                            {creator.handle}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Social Platforms & Badges */}
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap items-center gap-2">
                        {creator.youtubeUrl && (
                          <a
                            href={creator.youtubeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-red-500/10 border border-red-500/25 text-[11px] font-mono text-red-400 hover:bg-red-500/20"
                            title="YouTube Channel"
                          >
                            <Youtube className="w-3 h-3" />
                            <span>{formatCompactNumber(creator.youtubeSubs || creator.followers)} Subs</span>
                          </a>
                        )}

                        {creator.instagramUrl && (
                          <a
                            href={creator.instagramUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/25 text-[11px] font-mono text-amber-300 hover:bg-amber-500/20"
                            title="Instagram Profile"
                          >
                            <Instagram className="w-3 h-3" />
                            <span>{formatCompactNumber(creator.instagramFollowers || creator.followers)} Followers</span>
                          </a>
                        )}

                        {creator.facebookUrl && (
                          <a
                            href={creator.facebookUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/25 text-[11px] font-mono text-blue-400 hover:bg-blue-500/20"
                            title="Facebook Page"
                          >
                            <Facebook className="w-3 h-3" />
                            <span>{formatCompactNumber(creator.facebookFollowers || creator.followers)} Followers</span>
                          </a>
                        )}

                        {!creator.youtubeUrl && !creator.instagramUrl && !creator.facebookUrl && (
                          <span className="text-[11px] font-mono text-neutral-500">
                            Direct: {creator.handle}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.06] text-neutral-300 font-medium">
                        {creator.niche}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-white text-sm">
                      {formatCompactNumber(creator.followers)}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                          creator.status === 'Approved'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : creator.status === 'Pending'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        {creator.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setEditingCreator(creator);
                            setModalYtUrl(creator.youtubeUrl || '');
                            setModalIgUrl(creator.instagramUrl || '');
                            setModalFbUrl(creator.facebookUrl || '');
                            setLastFetchedPreview(null);
                            setIsEditorOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white"
                          title="Edit Channel Details"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDelete(creator.id, creator.name)}
                          className="p-1.5 rounded-lg bg-neutral-900 hover:bg-red-950 text-neutral-400 hover:text-red-400"
                          title="Delete Channel"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* MODAL 1: ADD / EDIT / AUTO-FETCH CHANNEL */}
      {isEditorOpen && editingCreator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#0f0f0f] border border-white/[0.12] rounded-2xl p-6 sm:p-8 shadow-2xl my-8">
            <button
              onClick={() => {
                setIsEditorOpen(false);
                setEditingCreator(null);
                setLastFetchedPreview(null);
              }}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-display font-bold text-2xl text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FFD100]" />
              <span>{editingCreator.id ? 'Edit Creator Profile' : 'Add New Creator / Channel'}</span>
            </h2>
            <p className="text-xs text-neutral-400 mb-6">
              Enter the creator&apos;s YouTube, Instagram, or Facebook link below. Our auto-extractor will pull the stats, subscriber count, and profile image automatically.
            </p>

            {/* 🔴 AUTO-FETCH SOCIAL SECTION */}
            <div className="mb-6 p-5 rounded-2xl bg-neutral-950/80 border border-[#FFD100]/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFD100] flex items-center gap-1.5">
                  <Zap className="w-4 h-4" />
                  Auto-Detect from Social Links
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">
                  Multi-Platform Sync
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* YouTube */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-300 flex items-center gap-1">
                    <Youtube className="w-3.5 h-3.5 text-red-500" /> YouTube URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://youtube.com/@..."
                    value={modalYtUrl}
                    onChange={(e) => setModalYtUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-[#FFD100]"
                  />
                </div>

                {/* Instagram */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-300 flex items-center gap-1">
                    <Instagram className="w-3.5 h-3.5 text-amber-400" /> Instagram URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://instagram.com/..."
                    value={modalIgUrl}
                    onChange={(e) => setModalIgUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-[#FFD100]"
                  />
                </div>

                {/* Facebook */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-300 flex items-center gap-1">
                    <Facebook className="w-3.5 h-3.5 text-blue-500" /> Facebook URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://facebook.com/..."
                    value={modalFbUrl}
                    onChange={(e) => setModalFbUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-[#FFD100]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={handleFetchInsideModal}
                  disabled={modalScraping || (!modalYtUrl && !modalIgUrl && !modalFbUrl)}
                  className="btn-shimmer px-5 py-2.5 rounded-xl bg-[#FFD100] text-[#080808] text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2 disabled:opacity-40"
                >
                  {modalScraping ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Pulling Stats & Image...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5" />
                      <span>⚡ Auto-Fetch Stats & Creator Image</span>
                    </>
                  )}
                </button>

                {lastFetchedPreview && (
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Stats Extracted & Loaded
                  </span>
                )}
              </div>
            </div>

            {/* FORM */}
            <form onSubmit={handleSaveCreator} className="space-y-4">
              {/* Creator Image & Core Info Row */}
              <div className="flex flex-col sm:flex-row gap-5 p-4 rounded-xl bg-neutral-900/50 border border-white/[0.08] items-center">
                {/* Live Avatar Preview */}
                <div className="relative shrink-0">
                  <img
                    src={editingCreator.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'}
                    alt="Creator avatar"
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-[#FFD100]/40 shadow-xl bg-neutral-800"
                    onError={(e) => {
                      (e.target as any).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400';
                    }}
                  />
                  <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#FFD100] text-[#080808]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase text-neutral-400">Creator / Channel Name *</label>
                    <input
                      type="text"
                      required
                      value={editingCreator.name || ''}
                      onChange={(e) => setEditingCreator({ ...editingCreator, name: e.target.value })}
                      placeholder="e.g. Marques Brownlee"
                      className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#FFD100]"
                    />
                  </div>

                  {/* Handle */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase text-neutral-400">Handle / Username</label>
                    <input
                      type="text"
                      value={editingCreator.handle || ''}
                      onChange={(e) => setEditingCreator({ ...editingCreator, handle: e.target.value })}
                      placeholder="@mkbhd"
                      className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#FFD100]"
                    />
                  </div>
                </div>
              </div>

              {/* Avatar URL direct input */}
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-neutral-400">Avatar Image URL (Auto-filled or Custom)</label>
                <input
                  type="url"
                  value={editingCreator.avatar || ''}
                  onChange={(e) => setEditingCreator({ ...editingCreator, avatar: e.target.value })}
                  placeholder="https://images.unsplash.com/... or channel photo link"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-[#FFD100]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Niche */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-neutral-400">Niche / Category</label>
                  <select
                    value={editingCreator.niche || 'Fitness & Health'}
                    onChange={(e) => setEditingCreator({ ...editingCreator, niche: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#FFD100]"
                  >
                    <option value="Fitness & Health">Fitness & Health</option>
                    <option value="Tech & Gadgets">Tech & Gadgets</option>
                    <option value="AI & Automation">AI & Automation</option>
                    <option value="SaaS & Productivity">SaaS & Productivity</option>
                    <option value="Beauty & Grooming">Beauty & Grooming</option>
                    <option value="Finance & Business">Finance & Business</option>
                    <option value="Lifestyle & Entertainment">Lifestyle & Entertainment</option>
                    <option value="Gaming & Esports">Gaming & Esports</option>
                  </select>
                </div>

                {/* Language */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-neutral-400">Primary Language</label>
                  <input
                    type="text"
                    value={editingCreator.language || 'English'}
                    onChange={(e) => setEditingCreator({ ...editingCreator, language: e.target.value })}
                    placeholder="e.g. Hindi, English"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#FFD100]"
                  />
                </div>

                {/* Status */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-neutral-400">Approval Status</label>
                  <select
                    value={editingCreator.status || 'Approved'}
                    onChange={(e) => setEditingCreator({ ...editingCreator, status: e.target.value as CreatorStatus })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#FFD100]"
                  >
                    <option value="Approved">Approved (Public Listing)</option>
                    <option value="Pending">Pending Review</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* Specific Social Followers Breakdown */}
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/[0.08] space-y-3">
                <div className="text-xs font-mono uppercase text-neutral-300 font-semibold flex items-center justify-between">
                  <span>Platform Followers / Subscribers Breakdown</span>
                  <span className="text-[11px] font-mono text-[#FFD100] font-bold">
                    Combined Reach: {formatCompactNumber(
                      (editingCreator.youtubeSubs || 0) +
                      (editingCreator.instagramFollowers || 0) +
                      (editingCreator.facebookFollowers || 0) ||
                      editingCreator.followers || 0
                    )}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-red-400 flex items-center gap-1">
                      <Youtube className="w-3 h-3" /> YouTube Subscribers
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={editingCreator.youtubeSubs ?? 0}
                      onChange={(e) => {
                        const y = parseInt(e.target.value, 10) || 0;
                        const total = y + (editingCreator.instagramFollowers || 0) + (editingCreator.facebookFollowers || 0);
                        setEditingCreator({ ...editingCreator, youtubeSubs: y, followers: total || y });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-amber-300 flex items-center gap-1">
                      <Instagram className="w-3 h-3" /> Instagram Followers
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={editingCreator.instagramFollowers ?? 0}
                      onChange={(e) => {
                        const ig = parseInt(e.target.value, 10) || 0;
                        const total = (editingCreator.youtubeSubs || 0) + ig + (editingCreator.facebookFollowers || 0);
                        setEditingCreator({ ...editingCreator, instagramFollowers: ig, followers: total || ig });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-blue-400 flex items-center gap-1">
                      <Facebook className="w-3 h-3" /> Facebook Followers
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={editingCreator.facebookFollowers ?? 0}
                      onChange={(e) => {
                        const fb = parseInt(e.target.value, 10) || 0;
                        const total = (editingCreator.youtubeSubs || 0) + (editingCreator.instagramFollowers || 0) + fb;
                        setEditingCreator({ ...editingCreator, facebookFollowers: fb, followers: total || fb });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Featured checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featured-toggle"
                  checked={Boolean(editingCreator.featured)}
                  onChange={(e) => setEditingCreator({ ...editingCreator, featured: e.target.checked })}
                  className="rounded bg-neutral-900 border-neutral-700 text-[#FFD100] focus:ring-[#FFD100]"
                />
                <label htmlFor="featured-toggle" className="text-xs text-neutral-300 font-medium">
                  Feature this channel on homepage highlights
                </label>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditorOpen(false);
                    setEditingCreator(null);
                    setLastFetchedPreview(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-neutral-900 text-neutral-300 text-xs font-semibold hover:bg-neutral-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-shimmer px-6 py-2.5 rounded-xl bg-[#FFD100] text-[#080808] text-xs font-bold uppercase tracking-wider shadow-lg"
                >
                  Save Channel Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: BULK UPLOAD (CSV & JSON) */}
      {isBulkUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#0f0f0f] border border-white/[0.12] rounded-2xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setIsBulkUploadOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-display font-bold text-2xl text-white mb-2 flex items-center gap-2">
              <Upload className="w-5 h-5 text-[#FFD100]" />
              <span>Bulk Channel Uploader</span>
            </h2>
            <p className="text-xs text-neutral-400 mb-6">
              Upload multiple channel records simultaneously via CSV or JSON format.
            </p>

            {/* Template Download Links */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/80 border border-white/[0.06] mb-5 text-xs text-neutral-300">
              <span className="font-mono text-neutral-400">Download Templates:</span>
              <a
                href="/templates/channels-template.csv"
                download="channels-template.csv"
                className="inline-flex items-center gap-1 text-[#FFD100] hover:underline"
              >
                <Download className="w-3.5 h-3.5" /> CSV Sample
              </a>
              <span>•</span>
              <a
                href="/templates/channels-template.json"
                download="channels-template.json"
                className="inline-flex items-center gap-1 text-[#FFD100] hover:underline"
              >
                <Download className="w-3.5 h-3.5" /> JSON Sample
              </a>
            </div>

            {/* Drag & Drop Box */}
            <div className="space-y-4">
              <div className="relative border-2 border-dashed border-neutral-700 hover:border-[#FFD100]/60 rounded-2xl p-6 text-center transition-colors bg-neutral-950/40">
                <input
                  type="file"
                  accept=".csv,.json,text/csv,application/json"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="w-8 h-8 text-[#FFD100] mx-auto mb-2" />
                <div className="text-xs font-semibold text-white">
                  Drop your CSV or JSON file here
                </div>
                <div className="text-[11px] text-neutral-400 mt-1">
                  or click to browse from your computer
                </div>
              </div>

              {/* Paste Text Fallback */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-neutral-400">
                  Or Paste Raw CSV / JSON Data Below:
                </label>
                <textarea
                  rows={6}
                  value={rawTextContent}
                  onChange={(e) => setRawTextContent(e.target.value)}
                  placeholder={`name,handle,url,avatar,niche,language,followers,medianViews,rateCardLink,status,bio\nTech Guy,@techguy,https://youtube.com/@tech,https://...,Tech & Gadgets,Hindi,850000,240000,https://...,Approved,Great tech channel`}
                  className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-white placeholder-neutral-600 focus:outline-none focus:border-[#FFD100]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsBulkUploadOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-neutral-900 text-neutral-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkUploadSubmit}
                  disabled={uploadLoading || !rawTextContent.trim()}
                  className="btn-shimmer px-6 py-2.5 rounded-xl bg-[#FFD100] text-[#080808] text-xs font-bold uppercase tracking-wider shadow-lg disabled:opacity-50"
                >
                  {uploadLoading ? 'Importing Channels...' : 'Parse & Upload Channels'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: GOOGLE SHEETS CRM SYNC */}
      {isSheetSyncOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0f0f0f] border border-white/[0.12] rounded-2xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setIsSheetSyncOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-display font-bold text-2xl text-white mb-2 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
              <span>Google Sheets CRM Bridge</span>
            </h2>
            <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
              Synchronize live approved rows from your Google Sheets CRM using your deployed Google Apps Script Web App URL.
            </p>

            <form onSubmit={handleSheetSync} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-neutral-400">
                  Google Apps Script Web App URL
                </label>
                <input
                  type="url"
                  required
                  value={appsScriptUrl}
                  onChange={(e) => setAppsScriptUrl(e.target.value)}
                  placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#FFD100]"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-white/[0.06] text-xs text-neutral-400 space-y-1.5">
                <div className="font-semibold text-neutral-300">How to set up:</div>
                <p>
                  1. Deploy your <code className="text-[#FFD100]">Code.gs</code> as a Web App (Execute as: Me, Access: Anyone).
                </p>
                <p>
                  2. Paste the Web App URL above and click Sync. All approved creators will be ingested into your database.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setIsSheetSyncOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-neutral-900 text-neutral-300 text-xs font-semibold"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={syncLoading || !appsScriptUrl}
                  className="btn-shimmer px-6 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold uppercase tracking-wider shadow-lg disabled:opacity-50"
                >
                  {syncLoading ? 'Syncing...' : 'Sync from Google Sheets'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
