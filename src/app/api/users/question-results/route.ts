import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import db from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { questionId, userId, result } = await request.json();
    const uuid = uuidv4();

    try {
      await db.query(
        'INSERT INTO users_questions(id, user_id, question_id, result) VALUES ($1, $2, $3, $4)',
        [uuid, userId, questionId, result],
      );
    } catch (e) {
      return new NextResponse('Internal error', { status: 500 });
    }
    return new NextResponse('Success', { status: 200 });
  } catch (e) {
    return new NextResponse('Bad request', { status: 400 });
  }
}
