'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product, Variant, EmiPlan } from '@/lib/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PriceBlock from '@/components/PriceBlock';
import VariantSwitcher from '@/components/VariantSwitcher';
import EmiPlanCard from '@/components/EmiPlanCard';
import BuyButton from '@/components/BuyButton';
import ConfirmationModal from '@/components/ConfirmationModal';
import {
  ChevronRight,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Truck,
  RotateCcw,
  Headphones,
  MapPin,
  Star,
  Award,
  Lock,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';

interface ProductDetailViewProps {
  product: Product;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  // Currently active variant (defaults to first variant)
  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    product.variants[0] || ({} as Variant)
  );

  // Selected EMI Plan (defaults to first plan or null)
  const plans = selectedVariant.emiPlans || [];
  const [selectedPlan, setSelectedPlan] = useState<EmiPlan | null>(
    plans[0] || null
  );

  // Modal open state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Image source state with fallback fallback
  const [detailImgSrc, setDetailImgSrc] = useState(selectedVariant.imageUrl);

  // Delivery Pincode state
  const [pincode, setPincode] = useState('110001');
  const [isPincodeChecked, setIsPincodeChecked] = useState(true);

  // Specifications Expand state
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  // When variant changes, update selected variant & default to its first EMI plan
  const handleSelectVariant = (variant: Variant) => {
    setSelectedVariant(variant);
    setDetailImgSrc(variant.imageUrl);
    const newPlans = variant.emiPlans || [];
    setSelectedPlan(newPlans[0] || null);
  };

  const FALLBACK_IMAGE =
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80';

  const specsList = [
    { label: 'RAM Memory', value: '12 GB LPDDR5X' },
    { label: 'Internal Storage', value: selectedVariant.storage || '256 GB' },
    { label: 'Color Finish', value: selectedVariant.color || 'Standard' },
    { label: 'Processor / Chipset', value: `${product.brand} Flagship Pro Chipset` },
    { label: 'Display Screen', value: '6.8-inch 120Hz ProXDR OLED (3120 × 1440 Pixels)' },
    { label: 'Rear Camera System', value: '200 MP Primary + 50 MP Ultra-Wide + 50 MP Telephoto' },
    { label: 'Front Selfie Camera', value: '32 MP Ultra-Clear HDR' },
    { label: 'Battery Capacity', value: '5500 mAh Glacier Battery' },
    { label: 'Charging Speed', value: '100W Super Fast Charging + 50W Wireless' },
    { label: 'Operating System', value: 'Latest OS with 4 Years Security Updates' },
  ];

  return (
    <div className="min-h-screen bg-[#FBF7F2] text-stone-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-6">
          <Link href="/" className="hover:text-[#0F6D66] transition-colors">
            Catalog
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-stone-700 font-semibold">{product.brand}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#0F6D66] font-bold truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Core Detail Grid: 2-column on desktop (Left image, Right details + plans), stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Product Image Box & Overview */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-5">
            <div className="relative w-full aspect-square rounded-3xl bg-gradient-to-br from-[#E6F3F2] via-[#FBF7F2] to-[#FFEBE4] p-8 flex flex-col items-center justify-center border border-[#E8E0D5] shadow-layered overflow-hidden">
              {/* Soft Ambient Glowing Orbs */}
              <div className="absolute w-64 h-64 bg-[#0F6D66]/10 rounded-full blur-3xl -top-10 -left-10" />
              <div className="absolute w-64 h-64 bg-[#FF7A45]/15 rounded-full blur-3xl -bottom-10 -right-10" />

              {/* Top Badge Tag */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-[#E8E0D5] text-[#0F6D66] text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF7A45]" />
                <span>OFFICIAL VERIFIED</span>
              </div>

              {/* Main Product Image with Zoom Lens Focus Hover Effect */}
              <img
                src={detailImgSrc}
                alt={selectedVariant.label}
                onError={() => setDetailImgSrc(FALLBACK_IMAGE)}
                className="relative z-10 max-h-80 object-contain drop-shadow-2xl scale-105 hover:scale-95 transition-transform duration-500 ease-out cursor-zoom-in"
              />

              {/* Finishes Indicator Pill */}
              <div className="mt-6 z-10 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#E8E0D5] text-xs text-stone-600 font-semibold flex items-center gap-2">
                <span>Available in {product.variants.length} finishes</span>
                <div className="flex items-center gap-1">
                  {product.variants.map((v) => (
                    <div
                      key={v.id}
                      className={`w-2.5 h-2.5 rounded-full border border-stone-300 ${
                        v.id === selectedVariant.id ? 'ring-2 ring-[#0F6D66]' : ''
                      }`}
                      style={{
                        backgroundColor:
                          v.color === 'Orange'
                            ? '#E06D3B'
                            : v.color === 'Silver'
                            ? '#E1E3E6'
                            : v.color === 'Deep Blue'
                            ? '#1A365D'
                            : v.color === 'Titanium Black'
                            ? '#27272A'
                            : v.color === 'Titanium Gray'
                            ? '#71717A'
                            : v.color === 'Midnight Ocean'
                            ? '#0F2C3C'
                            : '#D9E8E8',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Merchant / Seller Info Box */}
            <div className="bg-white p-4 rounded-2xl border border-[#E8E0D5] text-xs flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E6F3F2] text-[#0F6D66] flex items-center justify-center font-bold text-base shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-stone-900">
                    <span>Sold By: Gadget Hub</span>
                    <span className="bg-[#3E8E5A]/15 text-[#3E8E5A] text-[10px] px-1.5 py-0.5 rounded font-extrabold">
                      4.9 ★ Top Seller
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 font-medium mt-0.5">
                    Official Authorized Brand Partner • Fast Dispatch
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery & Pincode Checker Section */}
            <div className="bg-white p-5 rounded-2xl border border-[#E8E0D5] text-xs space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-stone-900 flex items-center gap-1.5 text-sm">
                  <Truck className="w-4 h-4 text-[#0F6D66]" />
                  <span>Delivery & Dispatch Details</span>
                </span>
                <span className="text-[11px] font-bold text-[#3E8E5A]">
                  FREE Delivery
                </span>
              </div>

              {/* Pincode Input */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={pincode}
                    maxLength={6}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 font-bold text-stone-800 text-xs focus:outline-none focus:ring-2 focus:ring-[#0F6D66]"
                    placeholder="Enter Pincode"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setIsPincodeChecked(true)}
                  className="bg-[#0F6D66] text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-[#0B544F] transition-colors"
                >
                  Check
                </button>
              </div>

              {isPincodeChecked && (
                <div className="bg-[#FBF7F2] p-3 rounded-xl border border-[#E8E0D5] space-y-1.5 text-[11px] font-medium text-stone-700">
                  <p className="flex items-center gap-1.5 text-[#3E8E5A] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Delivery by Saturday, 6 Sep to {pincode}</span>
                  </p>
                  <p className="text-stone-500">
                    Dispatch in less than 24 hours from nearest EasyEMI Hub.
                  </p>
                </div>
              )}
            </div>

            {/* Product Overview Description */}
            <div className="bg-white p-5 rounded-2xl border border-[#E8E0D5] text-xs space-y-2 shadow-sm">
              <h4 className="font-bold text-stone-900 uppercase text-[11px] tracking-wider text-stone-500">
                Product Description
              </h4>
              <p className="text-stone-600 leading-relaxed font-medium">
                {product.description}
              </p>
            </div>
          </div>

          {/* Right Column: Title, Variant Selector, Price, EMI Plans, Specs & Reviews */}
          <div className="lg:col-span-7 space-y-6">
            {/* Title, Rating & Brand Header */}
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-[#E6F3F2] text-[#0F6D66] font-bold text-xs px-2.5 py-0.5 rounded-full">
                  {product.brand}
                </span>

                {selectedVariant.storage && (
                  <span className="text-xs font-bold text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-full">
                    {selectedVariant.storage}
                  </span>
                )}

                {/* Rating Badge */}
                <div className="flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 text-xs px-2.5 py-0.5 rounded-full font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.85</span>
                  <span className="text-stone-400 font-normal">
                    (1,480 Ratings & 230 Reviews)
                  </span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-2">
                {product.name}
              </h1>

              <p className="text-xs text-stone-500 font-semibold mt-1">
                Selected Variant:{' '}
                <span className="text-stone-800 font-bold">
                  {selectedVariant.label}
                </span>
              </p>
            </div>

            {/* Pricing Section */}
            <PriceBlock
              price={selectedVariant.price}
              mrp={selectedVariant.mrp}
            />

            {/* Variant Switcher (Color & Storage Options) */}
            <VariantSwitcher
              variants={product.variants}
              selectedVariantId={selectedVariant.id}
              onSelectVariant={handleSelectVariant}
            />

            {/* EMI Plans Section */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-lg text-stone-900">
                    Select Installment (EMI) Plan
                  </h3>
                  <p className="text-xs text-stone-500">
                    Select your preferred tenure and monthly payment
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#0F6D66] font-bold bg-[#E6F3F2] px-3 py-1 rounded-full border border-[#0F6D66]/15">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Mutual Fund Backed</span>
                </div>
              </div>

              {/* EMI Radio Cards */}
              <div className="space-y-3">
                {plans.map((plan) => (
                  <EmiPlanCard
                    key={plan.id}
                    plan={plan}
                    isSelected={selectedPlan?.id === plan.id}
                    onSelect={(p) => setSelectedPlan(p)}
                  />
                ))}
              </div>
            </div>

            {/* "Shop with Peace of Mind" Trust Badges Grid */}
            <div className="bg-white p-5 rounded-2xl border border-[#E8E0D5] space-y-3 shadow-sm">
              <h4 className="font-extrabold text-sm text-stone-900">
                Shop with Confidence & Peace of Mind
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-[#FBF7F2] border border-[#E8E0D5]">
                  <ShieldCheck className="w-6 h-6 text-[#0F6D66] mb-1.5" />
                  <span className="font-bold text-stone-800">1 Year Brand Warranty</span>
                </div>

                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-[#FBF7F2] border border-[#E8E0D5]">
                  <RotateCcw className="w-6 h-6 text-[#FF7A45] mb-1.5" />
                  <span className="font-bold text-stone-800">7 Days Replacement</span>
                </div>

                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-[#FBF7F2] border border-[#E8E0D5]">
                  <Lock className="w-6 h-6 text-[#3E8E5A] mb-1.5" />
                  <span className="font-bold text-stone-800">100% Encrypted Pay</span>
                </div>

                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-[#FBF7F2] border border-[#E8E0D5]">
                  <Headphones className="w-6 h-6 text-[#0F6D66] mb-1.5" />
                  <span className="font-bold text-stone-800">24x7 Brand Support</span>
                </div>
              </div>
            </div>

            {/* Key Technical Specifications Section */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8E0D5] space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#F5EFE6] pb-3">
                <h4 className="font-extrabold text-base text-stone-900">
                  Key Technical Specifications
                </h4>
                <button
                  type="button"
                  onClick={() => setShowAllSpecs(!showAllSpecs)}
                  className="text-xs font-bold text-[#0F6D66] hover:underline flex items-center gap-1"
                >
                  <span>{showAllSpecs ? 'Show Less' : 'View All Specs'}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      showAllSpecs ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {(showAllSpecs ? specsList : specsList.slice(0, 6)).map(
                  (spec, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#FBF7F2] border border-[#E8E0D5] flex justify-between gap-2"
                    >
                      <span className="text-stone-500 font-medium">
                        {spec.label}:
                      </span>
                      <span className="font-bold text-stone-900 text-right">
                        {spec.value}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Customer Reviews & Rating Section */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8E0D5] space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#F5EFE6] pb-3">
                <div>
                  <h4 className="font-extrabold text-base text-stone-900">
                    Customer Ratings & Reviews
                  </h4>
                  <p className="text-xs text-stone-500">
                    Verified buyers from EasyEMI store
                  </p>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="font-black text-lg text-amber-900">
                    4.85
                  </span>
                  <span className="text-xs font-bold text-amber-700">
                    / 5.0
                  </span>
                </div>
              </div>

              {/* Sample Top Reviews */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-[#FBF7F2] border border-[#E8E0D5] text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-[#3E8E5A] bg-[#E6F3F2] px-2 py-0.5 rounded">
                      Verified Buyer
                    </span>
                  </div>
                  <p className="font-bold text-stone-900">
                    Super smooth 0% EMI process!
                  </p>
                  <p className="text-stone-600 font-medium">
                    Got my phone delivered in 2 days. The mutual fund backed EMI option was hassle-free with zero interest.
                  </p>
                  <p className="text-[10px] text-stone-400 pt-1">
                    — Rahul S. from New Delhi (3 days ago)
                  </p>
                </div>
              </div>
            </div>

            {/* Sticky Buy Button */}
            <BuyButton
              selectedPlan={selectedPlan}
              onBuyNow={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* Confirmation Modal Overlay */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
        variant={selectedVariant}
        plan={selectedPlan}
      />

      <Footer />
    </div>
  );
}
