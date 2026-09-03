import { NextResponse } from 'next/server';
import { getProductBySlug } from '@/lib/db';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;
    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Product slug is required' },
        { status: 400 }
      );
    }

    const product = await getProductBySlug(slug);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: `Product with slug '${slug}' not found`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Error fetching product details:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch product details',
      },
      { status: 500 }
    );
  }
}
