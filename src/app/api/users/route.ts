import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import db from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { name, password } = await request.json();
    const uuid = uuidv4();

    try {
      await db.query(
        'INSERT INTO users(id, name, password) VALUES ($1, $2, $3)',
        [uuid, name, password],
      );
    } catch (e) {
      return new NextResponse('Internal error', { status: 500 });
    }
    return new NextResponse('Success', { status: 200 });
  } catch (e) {
    return new NextResponse('Bad request', { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const name = url.searchParams.get('name');
    const password = url.searchParams.get('password');

    let user;
    try {
      user = await db.query(
        'SELECT id, name, experience, currency FROM users WHERE name=$1 AND password=$2',
        [name, password],
      );
    } catch (e) {
      return new NextResponse('Internal error', { status: 500 });
    }

    if (user.rows.length === 0) {
      return new NextResponse('Not Found', { status: 404 });
    }

    return new NextResponse(JSON.stringify(user.rows[0]), { status: 200 });
  } catch (e) {
    return new NextResponse('Bad request', { status: 400 });
  }
}
