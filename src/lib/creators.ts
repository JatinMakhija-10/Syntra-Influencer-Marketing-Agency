import fs from 'fs';
import path from 'path';
import { Creator, CreatorFilterOptions } from '@/types/creator';

const DATA_FILE = path.join(process.cwd(), 'data', 'creators.json');

export function getCreators(): Creator[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }
    const fileData = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(fileData) as Creator[];
  } catch (error) {
    console.error('Error reading creators data:', error);
    return [];
  }
}

export function saveAllCreators(creators: Creator[]): boolean {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(creators, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving creators data:', error);
    return false;
  }
}

export function getCreatorById(id: string): Creator | undefined {
  const creators = getCreators();
  return creators.find((c) => c.id === id);
}

export function upsertCreator(creatorData: Partial<Creator> & { name: string }): Creator {
  const creators = getCreators();
  const id = creatorData.id || `creator-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  
  const followers = Number(creatorData.followers) || 0;
  const medianViews = Number(creatorData.medianViews) || 0;
  const computedRatio = followers > 0 ? Math.round((medianViews / followers) * 100) : 0;
  const ratio = typeof creatorData.ratio === 'number' && !isNaN(creatorData.ratio) ? creatorData.ratio : computedRatio;

  const now = new Date().toISOString();

  const newCreator: Creator = {
    id,
    name: creatorData.name.trim(),
    handle: creatorData.handle?.trim() || `@${creatorData.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
    url: creatorData.url?.trim() || '#',
    avatar: creatorData.avatar?.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    bannerImage: creatorData.bannerImage?.trim(),
    niche: creatorData.niche || 'Fitness & Health',
    language: creatorData.language || 'English',
    followers,
    medianViews,
    ratio,
    rateCardLink: creatorData.rateCardLink?.trim() || '',
    status: creatorData.status || 'Approved',
    featured: Boolean(creatorData.featured),
    bio: creatorData.bio?.trim() || '',
    recentVideoTitle: creatorData.recentVideoTitle?.trim() || '',
    tags: Array.isArray(creatorData.tags) ? creatorData.tags : [],
    youtubeUrl: creatorData.youtubeUrl?.trim() || undefined,
    youtubeSubs: Number(creatorData.youtubeSubs) || undefined,
    instagramUrl: creatorData.instagramUrl?.trim() || undefined,
    instagramFollowers: Number(creatorData.instagramFollowers) || undefined,
    facebookUrl: creatorData.facebookUrl?.trim() || undefined,
    facebookFollowers: Number(creatorData.facebookFollowers) || undefined,
    createdAt: creatorData.createdAt || now,
    updatedAt: now,
  };

  const existingIndex = creators.findIndex((c) => c.id === id);
  if (existingIndex >= 0) {
    creators[existingIndex] = { ...creators[existingIndex], ...newCreator, createdAt: creators[existingIndex].createdAt };
  } else {
    creators.unshift(newCreator);
  }

  saveAllCreators(creators);
  return newCreator;
}

export function deleteCreator(id: string): boolean {
  const creators = getCreators();
  const filtered = creators.filter((c) => c.id !== id);
  if (filtered.length === creators.length) return false;
  return saveAllCreators(filtered);
}

export function bulkImportCreators(incoming: Partial<Creator>[]): { imported: number; total: number } {
  let count = 0;
  for (const item of incoming) {
    if (item.name && item.name.trim()) {
      upsertCreator(item as any);
      count++;
    }
  }
  return { imported: count, total: getCreators().length };
}

import { formatCompactNumber } from './formatters';
export { formatCompactNumber };

export function parseCSVToCreators(csvText: string): Partial<Creator>[] {
  const lines = csvText.trim().split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];

  // Parse header
  const headers = lines[0].split(',').map((h) => h.trim().replace(/^["']|["']$/g, '').toLowerCase());

  const results: Partial<Creator>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    // Simple CSV parser handling quotes
    const values: string[] = [];
    let insideQuote = false;
    let currentValue = '';

    for (let charIndex = 0; charIndex < line.length; charIndex++) {
      const char = line[charIndex];
      if (char === '"') {
        insideQuote = !insideQuote;
      } else if (char === ',' && !insideQuote) {
        values.push(currentValue.trim().replace(/^["']|["']$/g, ''));
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim().replace(/^["']|["']$/g, ''));

    const rowObj: Record<string, string> = {};
    headers.forEach((header, idx) => {
      rowObj[header] = values[idx] || '';
    });

    const name = rowObj['name'] || rowObj['creator name'] || rowObj['channel'] || '';
    if (!name) continue;

    const followers = parseInt(rowObj['followers'] || rowObj['subscribers'] || '0', 10) || 0;
    const medianViews = parseInt(rowObj['medianviews'] || rowObj['views'] || rowObj['median views'] || '0', 10) || 0;

    results.push({
      name,
      handle: rowObj['handle'] || rowObj['username'] || undefined,
      url: rowObj['url'] || rowObj['profile url'] || rowObj['channel url'] || undefined,
      avatar: rowObj['avatar'] || rowObj['image'] || undefined,
      niche: rowObj['niche'] || rowObj['category'] || 'Fitness & Health',
      language: rowObj['language'] || 'English',
      followers,
      medianViews,
      rateCardLink: rowObj['ratecardlink'] || rowObj['rate card'] || rowObj['ratecard'] || '',
      status: (rowObj['status'] === 'Pending' || rowObj['status'] === 'Draft' ? rowObj['status'] : 'Approved') as any,
      bio: rowObj['bio'] || rowObj['description'] || '',
    });
  }

  return results;
}
