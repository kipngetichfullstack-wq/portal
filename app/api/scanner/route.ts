import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { websiteScans } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { isValidUrl } from '@/lib/utils';

const FASTAPI_URL = process.env.FASTAPI_SCANNER_URL || 'http://localhost:8000';

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
    const { url, scanType = 'basic' } = body;

    if (!url || !isValidUrl(url)) {
      return NextResponse.json(
        { error: 'Valid URL is required' },
        { status: 400 }
      );
    }

    // Create scan record
    const [scan] = await db
      .insert(websiteScans)
      .values({
        userId: session.user.id,
        url,
        scanType,
        status: 'pending',
      })
      .returning();

    // Start scan asynchronously
    startScan(scan.id, url, scanType);

    return NextResponse.json({
      scanId: scan.id,
      message: 'Scan initiated successfully',
      status: 'pending',
    });
  } catch (error) {
    console.error('Error initiating scan:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const scanId = searchParams.get('scanId');

    if (scanId) {
      // Get specific scan
      const scanResult = await db
        .select()
        .from(websiteScans)
        .where(eq(websiteScans.id, scanId))
        .limit(1);

      const scan = scanResult[0];

      if (!scan || scan.userId !== session.user.id) {
        return NextResponse.json(
          { error: 'Scan not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ scan });
    } else {
      // Get user's scans
      const scans = await db
        .select()
        .from(websiteScans)
        .where(eq(websiteScans.userId, session.user.id))
        .orderBy(desc(websiteScans.createdAt));

      return NextResponse.json({ scans });
    }
  } catch (error) {
    console.error('Error fetching scans:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function startScan(scanId: string, url: string, scanType: string) {
  try {
    // Update status to scanning
    await db
      .update(websiteScans)
      .set({ status: 'scanning' })
      .where(eq(websiteScans.id, scanId));

    // Call FastAPI scanner
    const response = await fetch(`${FASTAPI_URL}/scan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        scan_type: scanType,
      }),
    });

    if (!response.ok) {
      throw new Error(`FastAPI responded with status: ${response.status}`);
    }

    const results = await response.json();

    // Update scan with results
    await db
      .update(websiteScans)
      .set({
        status: 'completed',
        results: JSON.stringify(results),
        completedAt: new Date(),
      })
      .where(eq(websiteScans.id, scanId));

  } catch (error) {
    console.error('Scan failed:', error);
    
    // Update scan status to failed
    await db
      .update(websiteScans)
      .set({
        status: 'failed',
        results: JSON.stringify({ error: error.message }),
        completedAt: new Date(),
      })
      .where(eq(websiteScans.id, scanId));
  }
}