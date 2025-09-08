import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { posts } from '@/lib/schema';
import { eq, desc, like, or } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = db
      .select()
      .from(posts)
      .where(eq(posts.published, true))
      .orderBy(desc(posts.createdAt))
      .limit(limit)
      .offset(offset);

    // Apply filters
    let conditions = [eq(posts.published, true)];

    if (category && category !== 'All') {
      conditions.push(eq(posts.category, category));
    }

    if (search) {
      conditions.push(
        or(
          like(posts.title, `%${search}%`),
          like(posts.excerpt, `%${search}%`),
          like(posts.content, `%${search}%`),
          like(posts.tags, `%${search}%`)
        )
      );
    }

    const blogPosts = await db
      .select()
      .from(posts)
      .where(conditions.length > 1 ? and(...conditions) : conditions[0])
      .orderBy(desc(posts.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const totalResult = await db
      .select({ count: count() })
      .from(posts)
      .where(conditions.length > 1 ? and(...conditions) : conditions[0]);

    const total = totalResult[0]?.count || 0;

    return NextResponse.json({
      posts: blogPosts,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}