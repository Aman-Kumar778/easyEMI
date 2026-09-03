import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/lib/db';
import { ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';

export const revalidate = 60;

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen bg-[#FBF7F2] text-stone-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Hero Banner Section */}
        <section className="relative rounded-3xl bg-gradient-to-r from-[#0F6D66] via-[#0B544F] to-[#0A4440] text-white p-8 sm:p-12 overflow-hidden shadow-layered mb-12">
          {/* Glowing Orb Accents */}
          <div className="absolute -top-12 -right-12 w-72 h-72 bg-[#FF7A45]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-[#3E8E5A]/20 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#E6F3F2] border border-white/15 mb-4">
              <Sparkles className="w-4 h-4 text-[#FF7A45]" />
              <span>Next-Gen Installment Catalog</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Own Flagship Tech with{' '}
              <span className="text-[#FF7A45] underline decoration-[#FF7A45]/40 underline-offset-4">
                Easy EMI Plans
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-[#E6F3F2]/90 leading-relaxed font-normal">
              Compare flexible monthly installment plans backed by mutual fund investments. Zero hidden fees, instant approval with cashback rewards.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-xs font-semibold">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 text-[#FF7A45]" />
                <span>0% Interest Tiers Available</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                <TrendingUp className="w-4 h-4 text-[#3E8E5A]" />
                <span>Mutual Fund SIP Backed</span>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Grid Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">
              Featured Flagship Electronics
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Select a product to explore color options, pricing, and monthly plans
            </p>
          </div>
          <span className="text-xs font-bold text-[#0F6D66] bg-[#E6F3F2] px-3.5 py-1.5 rounded-full border border-[#0F6D66]/20">
            {products.length} Products Available
          </span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
