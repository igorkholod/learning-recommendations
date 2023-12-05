import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import db from '@/lib/db';
import { MaterialStatus } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { name, url, tags, difficulty } = await request.json();
    const uuid = uuidv4();

    try {
      await db.query(
        'INSERT INTO materials(id, name, url, tags, difficulty) VALUES ($1, $2, $3, $4, $5)',
        [uuid, name, url, tags, difficulty],
      );
    } catch (e) {
      return new NextResponse(JSON.stringify('Internal error'), {
        status: 500,
      });
    }
    return new NextResponse(JSON.stringify('Success'), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify('Bad request'), { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');

  try {
    const materials = (await db.query('SELECT * FROM materials')).rows;
    const userMaterials = (
      await db.query(
        'SELECT material_id, status FROM users_materials WHERE user_id=$1',
        [userId],
      )
    ).rows;

    const materialStatuses = Object.fromEntries(
      userMaterials.map(({ material_id, status }) => [material_id, status]),
    );

    const materialsWithStatus = materials.map((material) => {
      const materialStatus = materialStatuses[material.id];

      return {
        ...material,
        status: materialStatus ?? MaterialStatus.NotCompleted,
      };
    });

    return new NextResponse(JSON.stringify(materialsWithStatus), {
      status: 200,
    });
  } catch (e) {
    return new NextResponse('Internal error', { status: 500 });
  }
}
