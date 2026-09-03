import { PrismaClient } from '@prisma/client';
import { INITIAL_PRODUCTS } from '../lib/seedData';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding EasyEMI database...');

  // Clean existing tables
  await prisma.emiPlan.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  for (const productData of INITIAL_PRODUCTS) {
    const product = await prisma.product.create({
      data: {
        id: productData.id,
        slug: productData.slug,
        name: productData.name,
        brand: productData.brand,
        description: productData.description,
        createdAt: productData.createdAt,
        variants: {
          create: productData.variants.map((v) => ({
            id: v.id,
            label: v.label,
            storage: v.storage,
            color: v.color,
            imageUrl: v.imageUrl,
            mrp: v.mrp,
            price: v.price,
            stock: v.stock,
            emiPlans: {
              create: (v.emiPlans || []).map((emi) => ({
                id: emi.id,
                tenureMonths: emi.tenureMonths,
                monthlyAmount: emi.monthlyAmount,
                interestRate: emi.interestRate,
                cashbackAmount: emi.cashbackAmount,
                cashbackNote: emi.cashbackNote,
                fundedBy: emi.fundedBy,
              })),
            },
          })),
        },
      },
    });

    console.log(`Seeded product: ${product.name} (${product.slug})`);
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
