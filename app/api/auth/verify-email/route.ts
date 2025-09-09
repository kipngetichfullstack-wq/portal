import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, emailVerificationCodes } from '@/lib/schema';
import { eq, and, gt } from 'drizzle-orm';
import { hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, code, name, company, phone, password } = body;

    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email and verification code are required' },
        { status: 400 }
      );
    }

    // Find valid verification code
    const verificationResult = await db
      .select()
      .from(emailVerificationCodes)
      .where(
        and(
          eq(emailVerificationCodes.email, email),
          eq(emailVerificationCodes.code, code),
          eq(emailVerificationCodes.used, false),
          gt(emailVerificationCodes.expires, new Date())
        )
      )
      .limit(1);

    const verification = verificationResult[0];

    if (!verification) {
      return NextResponse.json(
        { error: 'Invalid or expired verification code' },
        { status: 400 }
      );
    }

    // Mark code as used
    await db
      .update(emailVerificationCodes)
      .set({ used: true })
      .where(eq(emailVerificationCodes.id, verification.id));

    // Check if user exists
    const existingUserResult = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    const existingUser = existingUserResult[0];

    let user;
    if (existingUser) {
      // Update existing user if needed
      user = existingUser;
      if (!user.emailVerified) {
        await db
          .update(users)
          .set({ emailVerified: new Date() })
          .where(eq(users.id, user.id));
      }
    } else {
      // Create new user
      const hashedPassword = password ? await hashPassword(password) : null;
      const [newUser] = await db
        .insert(users)
        .values({
          email,
          name: name || '',
          password: hashedPassword,
          company: company || '',
          phone: phone || '',
          role: 'client',
          emailVerified: new Date(),
        })
        .returning();
      user = newUser;
    }

    return NextResponse.json({
      message: 'Email verified successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        company: user.company,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}