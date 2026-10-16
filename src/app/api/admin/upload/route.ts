import { NextRequest, NextResponse } from 'next/server';
import { parseCSVToCreators, bulkImportCreators } from '@/lib/creators';

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const data = await request.json();
      if (data.csvText) {
        const parsed = parseCSVToCreators(data.csvText);
        const result = bulkImportCreators(parsed);
        return NextResponse.json({
          success: true,
          message: `Parsed and imported ${result.imported} channels from CSV`,
          ...result,
        });
      }

      if (Array.isArray(data.creators)) {
        const result = bulkImportCreators(data.creators);
        return NextResponse.json({
          success: true,
          message: `Successfully imported ${result.imported} channels`,
          ...result,
        });
      }

      return NextResponse.json({ success: false, error: 'Invalid JSON payload structure' }, { status: 400 });
    }

    // Direct text / csv
    const rawText = await request.text();
    const parsed = parseCSVToCreators(rawText);
    if (parsed.length === 0) {
      return NextResponse.json({ success: false, error: 'Could not parse any valid rows from CSV' }, { status: 400 });
    }

    const result = bulkImportCreators(parsed);
    return NextResponse.json({
      success: true,
      message: `Successfully imported ${result.imported} channels`,
      ...result,
    });
  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json({ success: false, error: 'Failed to process file upload' }, { status: 500 });
  }
}
