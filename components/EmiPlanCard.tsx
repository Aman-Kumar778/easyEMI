'use client';

import { EmiPlan } from '@/lib/types';
import { Check, Sparkles } from 'lucide-react';

interface EmiPlanCardProps {
  plan: EmiPlan;
  isSelected: boolean;
  onSelect: (plan: EmiPlan) => void;
}

export default function EmiPlanCard({
  plan,
  isSelected,
  onSelect,
}: EmiPlanCardProps) {
  const formattedMonthly = plan.monthlyAmount.toLocaleString('en-IN');
  const formattedCashback = plan.cashbackAmount > 0
    ? plan.cashbackAmount.toLocaleString('en-IN')
    : null;

  const isZeroInterest = plan.interestRate === 0;

  return (
    <div
      onClick={() => onSelect(plan)}
      className={`relative group rounded-2xl p-4 sm:p-4.5 border transition-all duration-200 cursor-pointer select-none ${
        isSelected
          ? 'border-[#0F6D66] bg-[#E6F3F2]/70 ring-2 ring-[#0F6D66]/20 shadow-sm'
          : 'border-[#E8E0D5] bg-white hover:border-[#0F6D66]/40 hover:bg-stone-50/80 shadow-layered'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left Side: Radio Circle + Monthly x Tenure */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Custom Radio Button Circle */}
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
              isSelected
                ? 'border-[#0F6D66] bg-[#0F6D66] text-white shadow-sm'
                : 'border-stone-300 bg-white group-hover:border-[#0F6D66]/60'
            }`}
          >
            {isSelected && (
              <Check className="w-3 h-3 text-white stroke-[3] animate-check-pop" />
            )}
          </div>

          <div>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="font-extrabold text-base sm:text-lg text-stone-900">
                ₹{formattedMonthly}
              </span>
              <span className="text-sm font-semibold text-stone-600">
                x {plan.tenureMonths} months
              </span>
            </div>

            {/* Cashback Line in Sage Green */}
            {plan.cashbackNote ? (
              <p className="text-xs font-semibold text-[#3E8E5A] mt-0.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#3E8E5A]" />
                <span>{plan.cashbackNote}</span>
              </p>
            ) : formattedCashback ? (
              <p className="text-xs font-semibold text-[#3E8E5A] mt-0.5">
                Additional cashback of ₹{formattedCashback}
              </p>
            ) : null}
          </div>
        </div>

        {/* Right Side: Interest Badge & SIP Note */}
        <div className="text-right shrink-0">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
              isZeroInterest
                ? 'bg-[#E6F3F2] text-[#0F6D66] border border-[#0F6D66]/20'
                : 'bg-stone-100 text-stone-700 border border-stone-200'
            }`}
          >
            {isZeroInterest ? '0% interest' : `${plan.interestRate}% interest`}
          </span>

          <p className="text-[10px] text-stone-400 font-medium mt-1">
            Backed by {plan.fundedBy}
          </p>
        </div>
      </div>
    </div>
  );
}
