import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/db';
import ProductDetailView from '@/components/ProductDetailView';

export const revalidate = 60;

interface ProductDetailPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
