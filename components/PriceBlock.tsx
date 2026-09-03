'use client';

import { TrendingUp, Percent } from 'lucide-react';

interface PriceBlockProps {
  price: number;
  mrp: number;
}

export default function PriceBlock({ price, mrp }: PriceBlockProps) {
  const formattedPrice = price.toLocaleString('en-IN');
  const formattedMrp = mrp.toLocaleString('en-IN');
  const savings = mrp - price;
  const formattedSavings = savings > 0 ? savings.toLocaleString('en-IN') : null;
  const discountPercent = mrp > price ? Math.round((savings / mrp) * 100) : 0;

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline gap-3">
        <span className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          ₹{formattedPrice}
        </span>
        {mrp > price && (
          <span className="text-lg text-stone-400 line-through font-medium">
            ₹{formattedMrp}
          </span>
        )}

        {discountPercent > 0 && (
          <span className="bg-[#FF7A45]/15 text-[#FF7A45] text-xs font-bold px-2.5 py-1 rounded-full border border-[#FF7A45]/30">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {formattedSavings && (
        <p className="text-xs font-semibold text-[#3E8E5A]">
          You save ₹{formattedSavings} on this variant
        </p>
      )}

      {/* Mutual Fund Backing Line */}
      <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 pt-1">
        <div className="w-5 h-5 rounded-full bg-[#E6F3F2] flex items-center justify-center text-[#0F6D66]">
          <TrendingUp className="w-3.5 h-3.5" />
        </div>
        <span>EMI plans backed by mutual funds</span>
      </div>
    </div>
  );
}
