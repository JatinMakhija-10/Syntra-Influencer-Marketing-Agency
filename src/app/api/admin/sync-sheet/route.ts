import { NextRequest, NextResponse } from 'next/server';
import { bulkImportCreators } from '@/lib/creators';

export async function POST(request: NextRequest) {
  try {
    const { endpointUrl } = await request.json();

    if (!endpointUrl || !endpointUrl.startsWith('http')) {
      return NextResponse.json({ success: false, error: 'Valid Apps Script URL is required' }, { status: 400 });
    }

    const response = await fetch(endpointUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: `Remote endpoint returned HTTP ${response.status}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const rows = Array.isArray(data) ? data : data.creators || [];

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No creator records found in endpoint response' },
        { status: 422 }
      );
    }

    const normalized = rows.map((item: any) => ({
      name: item.name || item.creatorName,
      handle: item.handle || (item.url ? `@${item.url.split('/').filter(Boolean).pop()}` : undefined),
      url: item.url || item.profileUrl,
      avatar: item.avatar || item.image,
      niche: item.niche || 'Tech & Gadgets',
      language: item.language || 'English',
      followers: Number(item.followers) || 0,
      medianViews: Number(item.medianViews) || 0,
      ratio: item.ratio !== undefined ? Number(item.ratio) : undefined,
      rateCardLink: item.rateCardLink || item.rateCardUrl || '',
      status: item.status || 'Approved',
      bio: item.bio || '',
    }));

    const result = bulkImportCreators(normalized);

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${result.imported} channels from Google Sheets CRM`,
      ...result,
    });
  } catch (error: any) {
    console.error('Google Sheets sync error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to sync with Google Sheets endpoint' },
      { status: 500 }
    );
  }
}
