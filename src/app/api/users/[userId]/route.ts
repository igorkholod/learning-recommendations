import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import db from '@/lib/db';

export const PUT = async (
  request: NextRequest,
  { params }: { params: { userId: string } },
) => {
  try {
    const { addExperience, addCurrency, removeCurrency } = await request.json();
    const { userId } = params;

    try {
      if (addExperience !== undefined) {
        await db.query(
          'UPDATE users SET experience=experience+$1 WHERE id=$2',
          [addExperience, userId],
        );
      }

      if (addCurrency !== undefined) {
        await db.query('UPDATE users SET currency=currency+$1 WHERE id=$2', [
          addCurrency,
          userId,
        ]);
      }

      if (removeCurrency !== undefined) {
        await db.query('UPDATE users SET currency=currency-$1 WHERE id=$2', [
          removeCurrency,
          userId,
        ]);
      }

      const user = (
        await db.query(
          'SELECT id, name, experience, currency FROM users WHERE id=$1',
          [userId],
        )
      )?.rows?.[0];

      return new NextResponse(JSON.stringify(user), { status: 200 });
    } catch (e) {
      return new NextResponse('Internal error', { status: 500 });
    }
    return new NextResponse('Success', { status: 200 });
  } catch (e) {
    return new NextResponse('Bad request', { status: 400 });
  }
};
