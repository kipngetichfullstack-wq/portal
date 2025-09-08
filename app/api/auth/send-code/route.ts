import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, emailVerificationCodes } from '@/lib/schema';
import { eq, and, gt } from 'drizzle-orm';
import { sendVerificationEmail } from '@/lib/email';
import { generateVerificationCode, isValidEmail } from '@/lib/utils';

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

    // Generate verification code
    const code = generateVerificationCode();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Clean up old codes for this email
    await db
      .delete(emailVerificationCodes)
      .where(eq(emailVerificationCodes.email, email));

    // Store verification code
    await db.insert(emailVerificationCodes).values({
      email,
      code,
      expires,
      used: false,
    });

    // Send email
    const emailResult = await sendVerificationEmail(email, code);
    
    if (!emailResult.success) {
      return NextResponse.json(
        { error: 'Failed to send verification email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Verification code sent successfully',
      email,
    });
  } catch (error) {
    console.error('Send verification code error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}