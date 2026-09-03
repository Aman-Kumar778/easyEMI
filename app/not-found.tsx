import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { ArrowLeft, SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FBF7F2] text-stone-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center py-16">
        <div className="w-20 h-20 rounded-3xl bg-[#E6F3F2] text-[#0F6D66] flex items-center justify-center mb-6 shadow-layered">
          <SearchX className="w-10 h-10" />
        </div>

        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
          Product Not Found
        </h1>

        <p className="mt-2 text-stone-500 text-sm max-w-md">
          We couldn&apos;t find the product or installment plan you were looking for. It may have been renamed or moved.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 bg-[#0F6D66] hover:bg-[#0B544F] text-white px-6 py-3 rounded-xl font-bold text-xs transition-colors shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Product Catalog</span>
        </Link>
      </main>
    </div>
  );
}
