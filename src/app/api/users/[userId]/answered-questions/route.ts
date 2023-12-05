import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(
  _: NextRequest,
  { params }: { params: { userId: string } },
) {
  const { userId } = params;
  try {
    const answeredQuestions = await db.query(
      'SELECT questions.*, result, created_at FROM questions JOIN users_questions uq ON uq.question_id=questions.id WHERE user_id=$1',
      [userId],
    );
    return new NextResponse(
      JSON.stringify(
        answeredQuestions.rows.map(
          ({ correct_answer, created_at, ...rest }) => ({
            ...rest,
            correctAnswer: correct_answer,
            createdAt: created_at,
          }),
        ),
      ),
      { status: 200 },
    );
  } catch (e) {
    return new NextResponse('Internal error', { status: 500 });
  }
}
