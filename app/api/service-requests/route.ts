import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { serviceRequests, users } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const requests = await db
      .select({
        id: serviceRequests.id,
        service: serviceRequests.service,
        description: serviceRequests.description,
        priority: serviceRequests.priority,
        status: serviceRequests.status,
        createdAt: serviceRequests.createdAt,
        updatedAt: serviceRequests.updatedAt,
      })
      .from(serviceRequests)
      .where(eq(serviceRequests.userId, session.user.id))
      .orderBy(desc(serviceRequests.createdAt));

    return NextResponse.json({ requests });
  } catch (error) {
    console.error('Error fetching service requests:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { service, description, priority = 'medium' } = body;

    if (!service || !description) {
      return NextResponse.json(
        { error: 'Service and description are required' },
        { status: 400 }
      );
    }

    const [newRequest] = await db
      .insert(serviceRequests)
      .values({
        userId: session.user.id,
        service,
        description,
        priority,
        status: 'pending',
      })
      .returning();

    return NextResponse.json({ request: newRequest }, { status: 201 });
  } catch (error) {
    console.error('Error creating service request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}