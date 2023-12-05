import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import db from '@/lib/db';
import { Question } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { question, answers, correctAnswer, tags, difficulty } =
      await request.json();
    const uuid = uuidv4();

    try {
      await db.query(
        'INSERT INTO questions(id, question, answers, correct_answer, tags, difficulty) VALUES ($1, $2, $3, $4, $5, $6)',
        [uuid, question, answers, correctAnswer, tags, difficulty],
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
  try {
    const questions = await db.query('SELECT * FROM questions');

    return new NextResponse(
      JSON.stringify(
        questions.rows.map((question) => {
          const { correct_answer, ...rest } = question;

          return {
            ...rest,
            correctAnswer: correct_answer,
          };
        }),
      ),
      { status: 200 },
    );
  } catch (e) {
    return new NextResponse('Internal error', { status: 500 });
  }
}
