import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { posts } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const postResult = await db
      .select()
      .from(posts)
      .where(
        and(
          eq(posts.slug, slug),
          eq(posts.published, true)
        )
      )
      .limit(1);

    const post = postResult[0];

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Get related posts (same category, excluding current post)
    const relatedPosts = await db
      .select({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        excerpt: posts.excerpt,
        category: posts.category,
        author: posts.author,
        image: posts.image,
        createdAt: posts.createdAt,
      })
      .from(posts)
      .where(
        and(
          eq(posts.category, post.category),
          eq(posts.published, true),
          ne(posts.id, post.id)
        )
      )
      .limit(3);

    return NextResponse.json({
      post,
      relatedPosts,
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}