import { NextRequest, NextResponse } from 'next/server';
import { getCreators, upsertCreator, bulkImportCreators } from '@/lib/creators';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const niche = searchParams.get('niche');
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const featured = searchParams.get('featured');

    let creators = getCreators();

    if (status) {
      creators = creators.filter((c) => c.status.toLowerCase() === status.toLowerCase());
    }

    if (featured === 'true') {
      creators = creators.filter((c) => c.featured === true);
    }

    if (niche && niche !== 'All') {
      creators = creators.filter((c) => c.niche.toLowerCase() === niche.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      creators = creators.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.handle.toLowerCase().includes(q) ||
          c.niche.toLowerCase().includes(q) ||
          c.language.toLowerCase().includes(q) ||
          (c.tags && c.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    return NextResponse.json({
      success: true,
      count: creators.length,
      creators,
    });
  } catch (error) {
    console.error('API Error fetching creators:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if it's a bulk array
    if (Array.isArray(body)) {
      const result = bulkImportCreators(body);
      return NextResponse.json({
        success: true,
        message: `Successfully imported ${result.imported} channels`,
        ...result,
      });
    }

    // Single creator upsert
    if (!body.name || !body.name.trim()) {
      return NextResponse.json({ success: false, error: 'Creator name is required' }, { status: 400 });
    }

    const saved = upsertCreator(body);
    return NextResponse.json({ success: true, creator: saved }, { status: 201 });
  } catch (error) {
    console.error('API Error saving creator:', error);
    return NextResponse.json({ success: false, error: 'Failed to save creator' }, { status: 500 });
  }
}
