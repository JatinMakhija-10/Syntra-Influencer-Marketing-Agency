import { FetchedSocialData } from '../types/creator';

export function parseCompactNumber(input: string | number | undefined): number {
  if (typeof input === 'number') return input;
  if (!input || typeof input !== 'string') return 0;

  const cleaned = input.trim().replace(/,/g, '');
  const match = cleaned.match(/^([0-9.]+)\s*([KkMmBb])?/i);
  if (!match) {
    const directNum = parseFloat(cleaned);
    return isNaN(directNum) ? 0 : Math.round(directNum);
  }

  const base = parseFloat(match[1]);
  if (isNaN(base)) return 0;

  const unit = match[2]?.toUpperCase();
  if (unit === 'K') return Math.round(base * 1000);
  if (unit === 'M') return Math.round(base * 1000000);
  if (unit === 'B') return Math.round(base * 1000000000);

  return Math.round(base);
}

function detectNiche(text: string): string {
  const lower = text.toLowerCase();
  if (lower.match(/fitness|gym|workout|pilates|yoga|bodybuild|muscle|nutrition|crossfit|trainer|health|calisthenic|diet|exercise/)) {
    return 'Fitness & Health';
  }
  if (lower.match(/tech|gadget|smartphone|laptop|hardware|pc|unboxing|apple|android|review/)) {
    return 'Tech & Gadgets';
  }
  if (lower.match(/ai|automation|machine learning|chatgpt|openai|llm|neural|robot/)) {
    return 'AI & Automation';
  }
  if (lower.match(/saas|software|productivity|notion|design|figma|workflow|founder|startup/)) {
    return 'SaaS & Productivity';
  }
  if (lower.match(/beauty|skincare|makeup|glow|hair|cosmetic|dermatolog|fashion|style/)) {
    return 'Beauty & Grooming';
  }
  if (lower.match(/finance|money|invest|stock|crypto|wealth|trading|business|market|economics/)) {
    return 'Finance & Business';
  }
  if (lower.match(/game|gaming|esports|valorant|gta|minecraft|ps5|xbox|streamer/)) {
    return 'Gaming & Esports';
  }
  if (lower.match(/travel|vlog|lifestyle|food|recipe/)) {
    return 'Lifestyle & Entertainment';
  }
  return 'Fitness & Health';
}

const BROWSER_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
};

// 1. YouTube Stats & Metadata Fetcher
export async function fetchYouTubeStats(urlOrHandle: string): Promise<{
  name?: string;
  handle?: string;
  avatar?: string;
  subscribers?: number;
  bio?: string;
  canonicalUrl?: string;
}> {
  try {
    let cleanUrl = urlOrHandle.trim();
    if (!cleanUrl.startsWith('http')) {
      cleanUrl = cleanUrl.startsWith('@')
        ? `https://www.youtube.com/${cleanUrl}`
        : `https://www.youtube.com/@${cleanUrl}`;
    }

    let name = '';
    let avatar = '';
    let subscribers = 0;
    let bio = '';
    let handle = '';

    const handleMatch = cleanUrl.match(/youtube\.com\/(@[\w.-]+)/i);
    if (handleMatch) {
      handle = handleMatch[1];
    }

    // Try YouTube oEmbed first (fast & reliable)
    try {
      const oembedRes = await fetch(
        `https://www.youtube.com/oembed?url=${encodeURIComponent(cleanUrl)}&format=json`,
        { headers: BROWSER_HEADERS, next: { revalidate: 60 } }
      );
      if (oembedRes.ok) {
        const oembedData = await oembedRes.json();
        name = oembedData.title || oembedData.author_name || '';
        if (oembedData.thumbnail_url) {
          avatar = oembedData.thumbnail_url;
        }
      }
    } catch (e) {
      // Continue to HTML scraping
    }

    // Fetch Channel HTML page for subscribers & avatar
    const htmlRes = await fetch(cleanUrl, { headers: BROWSER_HEADERS, next: { revalidate: 60 } });
    if (htmlRes.ok) {
      const html = await htmlRes.text();

      // OpenGraph Image (avatar)
      if (!avatar || avatar.includes('default')) {
        const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
        if (ogImageMatch && ogImageMatch[1]) {
          avatar = ogImageMatch[1];
        }
      }

      // OpenGraph Title
      if (!name) {
        const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
        if (ogTitleMatch && ogTitleMatch[1]) {
          name = ogTitleMatch[1];
        }
      }

      // OpenGraph Description (bio)
      const ogDescMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i);
      if (ogDescMatch && ogDescMatch[1]) {
        bio = ogDescMatch[1];
      }

      // Subscriber Count patterns in ytInitialData or HTML
      const subRegex1 = /"subscriberCountText":\{"accessibility":\{"accessibilityData":\{"label":"([0-9.,]+[KkMmBb]?)\s+subscribers"/i;
      const subRegex2 = /"subscriberCountText":\{"simpleText":"([0-9.,]+[KkMmBb]?)\s+subscribers"/i;
      const subRegex3 = /"canonicalBaseUrl":".*?","subscriberCountText":\{.*?"label":"([0-9.,]+[KkMmBb]?)\s+subscribers"/i;
      const subRegex4 = /([0-9.,]+[KkMmBb]?)\s+subscribers/i;

      const m1 = html.match(subRegex1) || html.match(subRegex2) || html.match(subRegex3) || html.match(subRegex4);
      if (m1 && m1[1]) {
        subscribers = parseCompactNumber(m1[1]);
      }
    }

    if (!avatar && handle) {
      avatar = `https://unavatar.io/youtube/${handle.replace('@', '')}`;
    }

    return {
      name: name || handle.replace('@', '') || 'YouTube Creator',
      handle: handle || (name ? `@${name.toLowerCase().replace(/[^a-z0-9]/g, '')}` : '@creator'),
      avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      subscribers,
      bio,
      canonicalUrl: cleanUrl,
    };
  } catch (error) {
    console.error('Error fetching YouTube stats:', error);
    return {};
  }
}

// 2. Instagram Stats & Metadata Fetcher
export async function fetchInstagramStats(urlOrHandle: string): Promise<{
  name?: string;
  handle?: string;
  avatar?: string;
  followers?: number;
  bio?: string;
  canonicalUrl?: string;
}> {
  try {
    let cleanUrl = urlOrHandle.trim();
    let handle = '';

    const handleMatch = cleanUrl.match(/instagram\.com\/([a-zA-Z0-9_.-]+)/i);
    if (handleMatch) {
      handle = `@${handleMatch[1].replace(/\/$/, '')}`;
    } else if (cleanUrl.startsWith('@')) {
      handle = cleanUrl;
      cleanUrl = `https://www.instagram.com/${cleanUrl.replace('@', '')}/`;
    }

    let followers = 0;
    let name = '';
    let avatar = '';
    let bio = '';

    try {
      const res = await fetch(cleanUrl, { headers: BROWSER_HEADERS, next: { revalidate: 60 } });
      if (res.ok) {
        const html = await res.text();

        // Parse meta description for followers (e.g. "1.2M Followers, 500 Following...")
        const descMatch = html.match(/<meta\s+(?:name=["']description["']|property=["']og:description["'])\s+content=["']([^"']+)["']/i);
        if (descMatch && descMatch[1]) {
          const content = descMatch[1];
          const followerMatch = content.match(/([0-9.,]+[KkMmBb]?)\s+Followers/i);
          if (followerMatch && followerMatch[1]) {
            followers = parseCompactNumber(followerMatch[1]);
          }
          bio = content;
        }

        // Parse og:image for profile photo
        const imageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
        if (imageMatch && imageMatch[1]) {
          avatar = imageMatch[1];
        }

        // Parse og:title for Name
        const titleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
        if (titleMatch && titleMatch[1]) {
          const rawTitle = titleMatch[1];
          const splitTitle = rawTitle.split('(')[0].trim();
          if (splitTitle && !splitTitle.includes('Instagram')) {
            name = splitTitle;
          }
        }
      }
    } catch (e) {
      // Fallback
    }

    const cleanUsername = handle.replace('@', '');
    if (!avatar && cleanUsername) {
      avatar = `https://unavatar.io/instagram/${cleanUsername}`;
    }

    return {
      name: name || cleanUsername || 'Instagram Creator',
      handle: handle || `@${cleanUsername}`,
      avatar: avatar || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
      followers,
      bio,
      canonicalUrl: cleanUrl,
    };
  } catch (error) {
    console.error('Error fetching Instagram stats:', error);
    return {};
  }
}

// 3. Facebook Stats & Metadata Fetcher
export async function fetchFacebookStats(urlOrHandle: string): Promise<{
  name?: string;
  handle?: string;
  avatar?: string;
  followers?: number;
  bio?: string;
  canonicalUrl?: string;
}> {
  try {
    let cleanUrl = urlOrHandle.trim();
    if (!cleanUrl.startsWith('http')) {
      cleanUrl = `https://www.facebook.com/${cleanUrl.replace(/^@/, '')}`;
    }

    const pageSlugMatch = cleanUrl.match(/facebook\.com\/([a-zA-Z0-9_.-]+)/i);
    const pageSlug = pageSlugMatch ? pageSlugMatch[1] : '';

    let followers = 0;
    let name = '';
    let avatar = '';
    let bio = '';

    try {
      const res = await fetch(cleanUrl, { headers: BROWSER_HEADERS, next: { revalidate: 60 } });
      if (res.ok) {
        const html = await res.text();

        // Meta tags
        const descMatch = html.match(/<meta\s+(?:name=["']description["']|property=["']og:description["'])\s+content=["']([^"']+)["']/i);
        if (descMatch && descMatch[1]) {
          const content = descMatch[1];
          const followerMatch = content.match(/([0-9.,]+[KkMmBb]?)\s+(?:followers|likes)/i);
          if (followerMatch && followerMatch[1]) {
            followers = parseCompactNumber(followerMatch[1]);
          }
          bio = content;
        }

        const titleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
        if (titleMatch && titleMatch[1]) {
          name = titleMatch[1].replace(/\|\s*Facebook/i, '').trim();
        }

        const imageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
        if (imageMatch && imageMatch[1]) {
          avatar = imageMatch[1];
        }
      }
    } catch (e) {
      // Fallback
    }

    if (!avatar && pageSlug) {
      avatar = `https://unavatar.io/facebook/${pageSlug}`;
    }

    return {
      name: name || pageSlug || 'Facebook Creator',
      handle: `@${pageSlug || 'creator'}`,
      avatar: avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      followers,
      bio,
      canonicalUrl: cleanUrl,
    };
  } catch (error) {
    console.error('Error fetching Facebook stats:', error);
    return {};
  }
}

// 4. Master Multi-Platform Social Resolver
export async function aggregateCreatorSocials(params: {
  youtubeUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  anyUrl?: string;
}): Promise<FetchedSocialData> {
  let { youtubeUrl, instagramUrl, facebookUrl, anyUrl } = params;

  // If a single URL was entered, detect which platform it belongs to
  if (anyUrl) {
    const trimmed = anyUrl.trim();
    if (trimmed.includes('youtube.com') || trimmed.includes('youtu.be') || trimmed.startsWith('@')) {
      if (!youtubeUrl) youtubeUrl = trimmed;
    } else if (trimmed.includes('instagram.com')) {
      if (!instagramUrl) instagramUrl = trimmed;
    } else if (trimmed.includes('facebook.com') || trimmed.includes('fb.com')) {
      if (!facebookUrl) facebookUrl = trimmed;
    } else {
      // Default guess YouTube
      if (!youtubeUrl) youtubeUrl = trimmed;
    }
  }

  // Fetch in parallel
  const [ytResult, igResult, fbResult] = await Promise.all([
    youtubeUrl ? fetchYouTubeStats(youtubeUrl) : Promise.resolve(null),
    instagramUrl ? fetchInstagramStats(instagramUrl) : Promise.resolve(null),
    facebookUrl ? fetchFacebookStats(facebookUrl) : Promise.resolve(null),
  ]);

  // Aggregate stats
  const name = ytResult?.name || igResult?.name || fbResult?.name || 'New Creator';
  const handle = ytResult?.handle || igResult?.handle || fbResult?.handle || '@creator';
  const avatar = ytResult?.avatar || igResult?.avatar || fbResult?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400';
  const bio = ytResult?.bio || igResult?.bio || fbResult?.bio || '';

  const ytSubs = ytResult?.subscribers || 0;
  const igFollowers = igResult?.followers || 0;
  const fbFollowers = fbResult?.followers || 0;

  // If YouTube has subs, that's primary; otherwise max or sum
  const totalFollowers = ytSubs + igFollowers + fbFollowers || ytSubs || igFollowers || fbFollowers || 100000;

  // Estimated median views (usually 25-35% of YouTube subs, or 15% of total reach)
  const estimatedViews = ytSubs > 0 ? Math.round(ytSubs * 0.28) : Math.round(totalFollowers * 0.22);
  const ratio = totalFollowers > 0 ? Math.round((estimatedViews / totalFollowers) * 100) : 28;

  const detectedNiche = detectNiche(`${name} ${handle} ${bio}`);

  return {
    name,
    handle,
    avatar,
    bio,
    niche: detectedNiche,
    youtubeUrl: ytResult?.canonicalUrl || youtubeUrl,
    youtubeSubs: ytSubs,
    instagramUrl: igResult?.canonicalUrl || instagramUrl,
    instagramFollowers: igFollowers,
    facebookUrl: fbResult?.canonicalUrl || facebookUrl,
    facebookFollowers: fbFollowers,
    totalFollowers,
    estimatedViews,
    ratio,
  };
}
