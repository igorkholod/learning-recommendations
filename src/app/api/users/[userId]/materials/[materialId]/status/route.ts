import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import db from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string; materialId: string } },
) {
  try {
    const { status } = await request.json();
    const { userId, materialId } = params;
    const uuid = uuidv4();

    try {
      await db.query(
        'INSERT INTO users_materials(id, user_id, material_id, status) VALUES ($1, $2, $3, $4) ON CONFLICT (user_id, material_id) DO UPDATE SET status=excluded.status',
        [uuid, userId, materialId, status],
      );
    } catch (e) {
      return new NextResponse('Internal error', { status: 500 });
    }
    return new NextResponse('Success', { status: 200 });
  } catch (e) {
    return new NextResponse('Bad request', { status: 400 });
  }
}
