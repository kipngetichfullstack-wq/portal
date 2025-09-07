import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { serviceRequests } from '@/lib/schema';
import { eq, count, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get total service requests
    const totalRequests = await db
      .select({ count: count() })
      .from(serviceRequests)
      .where(eq(serviceRequests.userId, session.user.id));

    // Get active services (in-progress status)
    const activeServices = await db
      .select({ count: count() })
      .from(serviceRequests)
      .where(
        and(
          eq(serviceRequests.userId, session.user.id),
          eq(serviceRequests.status, 'in-progress')
        )
      );

    // Get completed services
    const completedServices = await db
      .select({ count: count() })
      .from(serviceRequests)
      .where(
        and(
          eq(serviceRequests.userId, session.user.id),
          eq(serviceRequests.status, 'completed')
        )
      );

    // Get pending services
    const pendingServices = await db
      .select({ count: count() })
      .from(serviceRequests)
      .where(
        and(
          eq(serviceRequests.userId, session.user.id),
          eq(serviceRequests.status, 'pending')
        )
      );

    const stats = {
      totalRequests: totalRequests[0]?.count || 0,
      activeServices: activeServices[0]?.count || 0,
      completedServices: completedServices[0]?.count || 0,
      pendingServices: pendingServices[0]?.count || 0,
      securityScore: 92, // Mock security score
      lastAssessment: 5, // Mock days since last assessment
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}