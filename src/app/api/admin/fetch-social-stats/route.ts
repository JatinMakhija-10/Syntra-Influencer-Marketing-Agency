import { NextRequest, NextResponse } from 'next/server';
import { aggregateCreatorSocials } from '@/lib/social-fetcher';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { youtubeUrl, instagramUrl, facebookUrl, anyUrl } = body;

    if (!youtubeUrl && !instagramUrl && !facebookUrl && !anyUrl) {
      return NextResponse.json(
        { success: false, error: 'Please provide at least one social media URL (YouTube, Instagram, or Facebook)' },
        { status: 400 }
      );
    }

    const fetchedData = await aggregateCreatorSocials({
      youtubeUrl,
      instagramUrl,
      facebookUrl,
      anyUrl,
    });

    return NextResponse.json({
      success: true,
      message: 'Creator social statistics & metadata successfully extracted',
      data: fetchedData,
    });
  } catch (error: any) {
    console.error('Error fetching social stats:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch social channel statistics' },
      { status: 500 }
    );
  }
}
