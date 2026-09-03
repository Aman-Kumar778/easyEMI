'use client';

import { Variant } from '@/lib/types';
import { Check } from 'lucide-react';

interface VariantSwitcherProps {
  variants: Variant[];
  selectedVariantId: string;
  onSelectVariant: (variant: Variant) => void;
}

// Color map for visual color dots
const COLOR_HEX_MAP: Record<string, string> = {
  Orange: '#E06D3B',
  Silver: '#E1E3E6',
  'Deep Blue': '#1A365D',
  'Titanium Black': '#27272A',
  'Titanium Gray': '#71717A',
  'Midnight Ocean': '#0F2C3C',
  'Arctic Dawn': '#D9E8E8',
};

export default function VariantSwitcher({
  variants,
  selectedVariantId,
  onSelectVariant,
}: VariantSwitcherProps) {
  // Extract unique storage options and colors
  const selectedVariant = variants.find((v) => v.id === selectedVariantId) || variants[0];

  return (
    <div className="space-y-4 bg-white/60 p-4 rounded-2xl border border-[#E8E0D5]">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
          Select Finish / Variant:
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {variants.map((v) => {
            const isSelected = v.id === selectedVariantId;
            const colorHex = (v.color && COLOR_HEX_MAP[v.color]) || '#94A3B8';

            return (
              <button
                key={v.id}
                type="button"
                onClick={() => onSelectVariant(v)}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-[#0F6D66] bg-[#E6F3F2]/60 ring-2 ring-[#0F6D66]/20 font-bold shadow-sm'
                    : 'border-[#E8E0D5] bg-white hover:border-[#0F6D66]/40 hover:bg-stone-50'
                }`}
              >
                <div
                  className="w-6 h-6 rounded-full border border-stone-300 flex items-center justify-center shrink-0 shadow-inner"
                  style={{ backgroundColor: colorHex }}
                >
                  {isSelected && (
                    <Check
                      className={`w-3.5 h-3.5 ${
                        v.color === 'Silver' || v.color === 'Arctic Dawn'
                          ? 'text-stone-900'
                          : 'text-white'
                      }`}
                    />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-stone-900 truncate">
                    {v.label}
                  </p>
                  <p className="text-[11px] text-stone-500 font-medium">
                    ₹{v.price.toLocaleString('en-IN')}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
