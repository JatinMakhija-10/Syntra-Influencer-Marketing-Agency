import { NextRequest, NextResponse } from 'next/server';
import { getCreatorById, upsertCreator, deleteCreator } from '@/lib/creators';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const creator = getCreatorById(params.id);
    if (!creator) {
      return NextResponse.json({ success: false, error: 'Creator not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, creator });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = upsertCreator({ ...body, id: params.id });
    return NextResponse.json({ success: true, creator: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update creator' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = deleteCreator(params.id);
    if (!success) {
      return NextResponse.json({ success: false, error: 'Creator not found or could not be deleted' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Creator deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete creator' }, { status: 500 });
  }
}
