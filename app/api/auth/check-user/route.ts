import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { isValidEmail } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const userResult = await db
      .select({ id: users.id, password: users.password, emailVerified: users.emailVerified })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    const user = userResult[0];

    if (user) {
      // User exists
      if (user.password) {
        // User has password - require password login
        return NextResponse.json({
          exists: true,
          hasPassword: true,
          requiresPassword: true,
        });
      } else {
        // User exists but no password (OAuth user) - allow verification code
        return NextResponse.json({
          exists: true,
          hasPassword: false,
          requiresPassword: false,
        });
      }
    } else {
      // User doesn't exist - will create new account with verification
      return NextResponse.json({
        exists: false,
        hasPassword: false,
        requiresPassword: false,
      });
    }
  } catch (error) {
    console.error('Check user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}