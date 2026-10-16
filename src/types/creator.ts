export type CreatorNiche =
  | 'Fitness & Health'
  | 'Tech & Gadgets'
  | 'AI & Automation'
  | 'SaaS & Productivity'
  | 'Beauty & Grooming'
  | 'Finance & Business'
  | 'Lifestyle & Entertainment'
  | 'Gaming & Esports'
  | string;

export type CreatorStatus = 'Approved' | 'Pending' | 'Draft';

export interface Creator {
  id: string;
  name: string;
  handle: string;
  url: string;
  avatar: string;
  bannerImage?: string;
  niche: CreatorNiche;
  language: string;
  followers: number; // Total combined audience
  status: CreatorStatus;
  featured?: boolean;
  
  // Specific Social Channels & Platform Stats
  youtubeUrl?: string;
  youtubeSubs?: number;
  instagramUrl?: string;
  instagramFollowers?: number;
  facebookUrl?: string;
  facebookFollowers?: number;

  // Optional legacy / secondary fields
  medianViews?: number;
  ratio?: number;
  rateCardLink?: string;
  bio?: string;
  recentVideoTitle?: string;
  recentVideoThumbnail?: string;
  tags?: string[];

  createdAt?: string;
  updatedAt?: string;
}

export interface CreatorFilterOptions {
  search: string;
  niche: string;
  language: string;
  sortBy: 'followers' | 'name';
  sortOrder: 'asc' | 'desc';
}

export interface SheetSyncConfig {
  sheetUrl: string;
  appsScriptUrl: string;
  lastSyncedAt?: string;
  autoSync: boolean;
}

export interface FetchedSocialData {
  name?: string;
  handle?: string;
  avatar?: string;
  bio?: string;
  niche?: string;
  youtubeUrl?: string;
  youtubeSubs?: number;
  instagramUrl?: string;
  instagramFollowers?: number;
  facebookUrl?: string;
  facebookFollowers?: number;
  totalFollowers?: number;
  estimatedViews?: number;
  ratio?: number;
}
