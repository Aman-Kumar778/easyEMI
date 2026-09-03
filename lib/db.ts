import { PrismaClient } from '@prisma/client';
import { INITIAL_PRODUCTS } from './seedData';
import { Product, ProductListItem } from './types';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  productsStore: Product[] | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Initialize global store with latest seed dataset
globalForPrisma.productsStore = [...INITIAL_PRODUCTS];

const localStore = globalForPrisma.productsStore;

export async function getAllProducts(): Promise<ProductListItem[]> {
  try {
    if (process.env.DATABASE_URL) {
      const products = await prisma.product.findMany({
        include: {
          variants: true,
        },
      });

      if (products.length > 0) {
        return products.map((p) => {
          const prices = p.variants.map((v) => v.price);
          const mrps = p.variants.map((v) => v.mrp);
          const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
          const maxMrp = mrps.length > 0 ? Math.max(...mrps) : 0;
          const thumbnail = p.variants[0]?.imageUrl || '';
          return {
            id: p.id,
            slug: p.slug,
            name: p.name,
            brand: p.brand,
            description: p.description,
            thumbnail,
            minPrice,
            maxMrp,
            variantCount: p.variants.length,
          };
        });
      }
    }
  } catch (error) {
    console.warn('Prisma DB query failed, using fallback seed data:', error);
  }

  // Fallback to seed dataset
  return localStore.map((p) => {
    const prices = p.variants.map((v) => v.price);
    const mrps = p.variants.map((v) => v.mrp);
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxMrp = mrps.length > 0 ? Math.max(...mrps) : 0;
    const thumbnail = p.variants[0]?.imageUrl || '';
    return {
      id: p.id,
      slug: p.slug,
      name: p.name,
      brand: p.brand,
      description: p.description,
      thumbnail,
      minPrice,
      maxMrp,
      variantCount: p.variants.length,
    };
  });
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    if (process.env.DATABASE_URL) {
      const product = await prisma.product.findUnique({
        where: { slug },
        include: {
          variants: {
            include: {
              emiPlans: true,
            },
          },
        },
      });

      if (product) {
        return product as unknown as Product;
      }
    }
  } catch (error) {
    console.warn('Prisma DB query failed for slug, using fallback seed data:', error);
  }

  const fallbackProduct = localStore.find((p) => p.slug === slug);
  return fallbackProduct || null;
}

export async function createProduct(input: {
  name: string;
  brand: string;
  slug: string;
  description: string;
  variants: {
    label: string;
    storage?: string;
    color?: string;
    imageUrl: string;
    mrp: number;
    price: number;
    stock?: number;
    emiPlans: {
      tenureMonths: number;
      monthlyAmount: number;
      interestRate: number;
      cashbackAmount?: number;
      cashbackNote?: string;
      fundedBy?: string;
    }[];
  }[];
}): Promise<Product> {
  // If DATABASE_URL exists, execute Prisma create query
  try {
    if (process.env.DATABASE_URL) {
      const created = await prisma.product.create({
        data: {
          name: input.name,
          brand: input.brand,
          slug: input.slug,
          description: input.description,
          variants: {
            create: input.variants.map((v) => ({
              label: v.label,
              storage: v.storage || null,
              color: v.color || null,
              imageUrl: v.imageUrl,
              mrp: Math.round(v.mrp),
              price: Math.round(v.price),
              stock: v.stock ?? 50,
              emiPlans: {
                create: v.emiPlans.map((emi) => ({
                  tenureMonths: Number(emi.tenureMonths),
                  monthlyAmount: Math.round(emi.monthlyAmount),
                  interestRate: Number(emi.interestRate),
                  cashbackAmount: Math.round(emi.cashbackAmount || 0),
                  cashbackNote: emi.cashbackNote || null,
                  fundedBy: emi.fundedBy || 'Mutual Fund SIP',
                })),
              },
            })),
          },
        },
        include: {
          variants: {
            include: {
              emiPlans: true,
            },
          },
        },
      });

      return created as unknown as Product;
    }
  } catch (error) {
    console.warn('Prisma database creation error, adding to runtime in-memory dataset:', error);
  }

  // In-memory fallback creation if DB is not connected locally
  const newProduct: Product = {
    id: `prod-${Date.now()}`,
    slug: input.slug,
    name: input.name,
    brand: input.brand,
    description: input.description,
    createdAt: new Date(),
    variants: input.variants.map((v, vIdx) => ({
      id: `var-${Date.now()}-${vIdx}`,
      productId: `prod-${Date.now()}`,
      label: v.label,
      storage: v.storage || null,
      color: v.color || null,
      imageUrl: v.imageUrl,
      mrp: Math.round(v.mrp),
      price: Math.round(v.price),
      stock: v.stock ?? 50,
      emiPlans: v.emiPlans.map((emi, eIdx) => ({
        id: `emi-${Date.now()}-${vIdx}-${eIdx}`,
        variantId: `var-${Date.now()}-${vIdx}`,
        tenureMonths: Number(emi.tenureMonths),
        monthlyAmount: Math.round(emi.monthlyAmount),
        interestRate: Number(emi.interestRate),
        cashbackAmount: Math.round(emi.cashbackAmount || 0),
        cashbackNote: emi.cashbackNote || null,
        fundedBy: emi.fundedBy || 'Mutual Fund SIP',
      })),
    })),
  };

  localStore.unshift(newProduct);
  return newProduct;
}

