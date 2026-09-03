'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProductListItem } from '@/lib/types';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

interface ProductCardProps {
  product: ProductListItem;
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80';

export default function ProductCard({ product }: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState(product.thumbnail);

  const formattedMinPrice = product.minPrice.toLocaleString('en-IN');
  const formattedMaxMrp = product.maxMrp.toLocaleString('en-IN');
  const discountPercent =
    product.maxMrp > product.minPrice
      ? Math.round(((product.maxMrp - product.minPrice) / product.maxMrp) * 100)
      : 0;

  const approxStartingEmi = Math.round(product.minPrice / 36).toLocaleString('en-IN');

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-2xl border border-[#E8E0D5] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-[0_4px_20px_rgba(15,109,102,0.06)] hover:shadow-[0_12px_32px_rgba(15,109,102,0.14)] flex flex-col justify-between"
    >
      {/* Compact Image Container with Soft Gradient Wash Background */}
      <div className="relative w-full h-56 sm:h-60 bg-gradient-to-br from-[#E6F3F2]/80 via-[#FBF7F2] to-[#FFEBE4]/60 p-4 flex items-center justify-center overflow-hidden">
        {/* Soft Ambient Radial Glow */}
        <div className="absolute w-36 h-36 bg-[#0F6D66]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur-md border border-[#E8E0D5] text-[#0F6D66] text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
          <Zap className="w-3 h-3 fill-[#0F6D66]" />
          <span>{product.brand}</span>
        </div>

        {discountPercent > 0 && (
          <div className="absolute top-3 right-3 z-20 bg-[#FF7A45] text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm tracking-wide">
            Save {discountPercent}%
          </div>
        )}

        {/* Image: Zoomed in by default (scale-110), Zooms out smoothly on hover (scale-100) */}
        <div className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden">
          <img
            src={imgSrc}
            alt={product.name}
            onError={() => setImgSrc(FALLBACK_IMAGE)}
            className="max-h-48 max-w-[85%] object-contain scale-110 group-hover:scale-100 transition-transform duration-500 ease-out drop-shadow-lg"
          />
        </div>
      </div>

      {/* Card Content Details (Compact Padding) */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white space-y-3">
        <div>
          <h3 className="font-extrabold text-base sm:text-lg text-stone-900 group-hover:text-[#0F6D66] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="pt-3 border-t border-[#F5EFE6] space-y-2">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                Starting Price
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black text-[#0F6D66] tracking-tight">
                  ₹{formattedMinPrice}
                </span>
                {product.maxMrp > product.minPrice && (
                  <span className="text-xs text-stone-400 line-through font-medium">
                    ₹{formattedMaxMrp}
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#3E8E5A]">
                0% EMI AVAILABLE
              </span>
              <p className="text-xs font-extrabold text-stone-800">
                ₹{approxStartingEmi}<span className="text-[10px] font-normal text-stone-500">/mo</span>
              </p>
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between text-xs font-bold text-[#0F6D66] group-hover:text-[#FF7A45] transition-colors">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#FF7A45]" />
              <span>{product.variantCount} Variants Available</span>
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
