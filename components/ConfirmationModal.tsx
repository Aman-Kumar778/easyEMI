'use client';

import { Product, Variant, EmiPlan } from '@/lib/types';
import { CheckCircle2, ShieldCheck, Sparkles, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  variant: Variant;
  plan: EmiPlan | null;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  product,
  variant,
  plan,
}: ConfirmationModalProps) {
  if (!isOpen || !plan) return null;

  const totalPayment = plan.monthlyAmount * plan.tenureMonths;
  const isZeroInterest = plan.interestRate === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E8E0D5] relative overflow-hidden">
        {/* Top Decorative Banner Wash */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#0F6D66] via-[#FF7A45] to-[#3E8E5A]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E6F3F2] text-[#0F6D66] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-extrabold text-xl text-stone-900">
              Plan Selected!
            </h3>
            <p className="text-xs text-stone-500 font-medium">
              Review your mutual-fund backed installment summary
            </p>
          </div>
        </div>

        {/* Product & Variant Box */}
        <div className="mt-6 p-4 rounded-2xl bg-[#FBF7F2] border border-[#E8E0D5] flex items-center gap-4">
          <img
            src={variant.imageUrl}
            alt={variant.label}
            className="w-16 h-16 object-contain rounded-xl bg-white p-1 border border-stone-200"
          />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#0F6D66]">
              {product.brand}
            </p>
            <h4 className="font-bold text-base text-stone-900">
              {product.name}
            </h4>
            <p className="text-xs text-stone-500 font-medium">
              {variant.label}
            </p>
          </div>
        </div>

        {/* Selected EMI Plan Details */}
        <div className="mt-5 space-y-3 bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-stone-200">
            <span className="text-stone-500 font-medium">Monthly Installment</span>
            <span className="font-extrabold text-base text-[#0F6D66]">
              ₹{plan.monthlyAmount.toLocaleString('en-IN')}{' '}
              <span className="text-xs text-stone-500 font-normal">/ mo</span>
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-stone-500 font-medium">Tenure</span>
            <span className="font-bold text-stone-900">
              {plan.tenureMonths} Months
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-stone-500 font-medium">Interest Rate</span>
            <span
              className={`font-bold ${
                isZeroInterest ? 'text-[#3E8E5A]' : 'text-stone-800'
              }`}
            >
              {isZeroInterest ? '0% (No Extra Cost)' : `${plan.interestRate}% p.a.`}
            </span>
          </div>

          {plan.cashbackNote && (
            <div className="flex justify-between items-center pt-2 border-t border-stone-200 text-[#3E8E5A] font-semibold">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cashback Benefit</span>
              </span>
              <span>{plan.cashbackNote}</span>
            </div>
          )}

          <div className="flex justify-between items-center pt-2 border-t border-stone-200">
            <span className="text-stone-600 font-bold">Total Payable</span>
            <span className="font-extrabold text-stone-900">
              ₹{totalPayment.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-4 flex items-center gap-2 text-[11px] text-stone-500 bg-[#E6F3F2]/60 p-3 rounded-xl border border-[#0F6D66]/20">
          <ShieldCheck className="w-4 h-4 text-[#0F6D66] shrink-0" />
          <span>
            Backed by mutual fund SIP investments. Instant approval without credit card block.
          </span>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-xs font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
          >
            Modify Selection
          </button>
          <button
            onClick={() => {
              alert(`Order submitted for ${product.name} (${variant.label}) on ${plan.tenureMonths}-month EMI plan!`);
              onClose();
            }}
            className="flex-1 py-3 text-xs font-bold text-white bg-[#FF7A45] hover:bg-[#E86733] rounded-xl transition-colors shadow-md"
          >
            Confirm & Proceed
          </button>
        </div>
      </div>
    </div>
  );
}
