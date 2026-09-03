'use client';

import Link from 'next/link';
import { ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-[#FBF7F2]/90 backdrop-blur-md border-b border-[#E8E0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-[#0F6D66] text-white flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform duration-200">
            E
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl text-[#0F6D66] tracking-tight">
                Easy<span className="text-[#FF7A45]">EMI</span>
              </span>
              <span className="bg-[#E6F3F2] text-[#0F6D66] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Pro
              </span>
            </div>
            <p className="text-[11px] text-stone-500 font-medium hidden sm:block">
              Backed by Mutual Fund Investments
            </p>
          </div>
        </Link>

        {/* Feature Badges & Info */}
        <div className="flex items-center gap-4 text-xs font-semibold text-stone-700">
          <div className="hidden md:flex items-center gap-1.5 bg-[#E6F3F2] text-[#0F6D66] px-3 py-1.5 rounded-full border border-[#0F6D66]/15">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>SIP Backed Installments</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-stone-600 bg-white/80 border border-[#E8E0D5] px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4 text-[#3E8E5A]" />
            <span>0% Interest Options</span>
          </div>

          <Link
            href="/admin"
            className="flex items-center gap-1.5 text-xs font-bold text-[#0F6D66] bg-[#E6F3F2] px-3.5 py-2 rounded-xl border border-[#0F6D66]/20 hover:bg-[#0F6D66] hover:text-white transition-colors"
          >
            <span>Admin Portal</span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-1 text-xs font-bold bg-[#FF7A45] text-white px-4 py-2 rounded-xl hover:bg-[#E86733] transition-colors shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Explore Catalog</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
