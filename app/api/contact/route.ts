import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { inquiries } from '@/lib/schema';
import { sendContactNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, phone, service, message } = body;

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save inquiry to database
    const [inquiry] = await db.insert(inquiries).values({
      name,
      email,
      company: company || '',
      phone: phone || '',
      service,
      message,
      status: 'new'
    }).returning();

    // Send email notification
    await sendContactNotification({
      name,
      email,
      company,
      phone,
      service,
      message,
    });

    return NextResponse.json(
      { message: 'Inquiry submitted successfully', id: inquiry.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}