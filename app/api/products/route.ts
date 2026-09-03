import { NextResponse } from 'next/server';
import { getAllProducts, createProduct } from '@/lib/db';

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch product catalog',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.brand || !body.variants || !Array.isArray(body.variants) || body.variants.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: name, brand, and at least 1 variant are required.',
        },
        { status: 400 }
      );
    }

    // Auto-generate clean slug if not explicitly passed
    const slug =
      body.slug && body.slug.trim() !== ''
        ? body.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        : body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newProduct = await createProduct({
      name: body.name,
      brand: body.brand,
      slug,
      description: body.description || '',
      variants: body.variants,
    });

    return NextResponse.json(
      {
        success: true,
        data: newProduct,
        message: `Product '${newProduct.name}' created successfully!`,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating product via API:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create product',
      },
      { status: 500 }
    );
  }
}
