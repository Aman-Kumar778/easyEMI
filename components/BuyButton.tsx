'use client';

import { EmiPlan } from '@/lib/types';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface BuyButtonProps {
  selectedPlan: EmiPlan | null;
  onBuyNow: () => void;
}

export default function BuyButton({
  selectedPlan,
  onBuyNow,
}: BuyButtonProps) {
  const isEnabled = Boolean(selectedPlan);

  const buttonText = selectedPlan
    ? `Buy on ${selectedPlan.tenureMonths} Months EMI — ₹${selectedPlan.monthlyAmount.toLocaleString('en-IN')}/mo`
    : 'Select an EMI Plan to Proceed';

  return (
    <div className="sticky bottom-4 z-30 mt-8">
      <div className="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-[#E8E0D5] shadow-2xl">
        <button
          type="button"
          disabled={!isEnabled}
          onClick={onBuyNow}
          className={`w-full py-4 px-6 rounded-xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-200 shadow-md ${
            isEnabled
              ? 'bg-[#FF7A45] hover:bg-[#E86733] text-white active:scale-[0.98] cursor-pointer'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span>{buttonText}</span>
          {isEnabled && <ArrowRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
