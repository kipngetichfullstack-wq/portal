import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { posts } from '@/lib/schema';
import { eq, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    // Get all unique categories from published posts
    const categories = await db
      .select({
        category: posts.category,
        count: sql<number>`count(*)`.as('count'),
      })
      .from(posts)
      .where(eq(posts.published, true))
      .groupBy(posts.category)
      .orderBy(posts.category);

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}