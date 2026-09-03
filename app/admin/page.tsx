'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ProductListItem } from '@/lib/types';
import {
  PlusCircle,
  Trash2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Package,
  Layers,
  Calculator,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

interface EmiPlanForm {
  tenureMonths: number;
  monthlyAmount: number;
  interestRate: number;
  cashbackAmount: number;
  cashbackNote: string;
  fundedBy: string;
}

interface VariantForm {
  label: string;
  storage: string;
  color: string;
  imageUrl: string;
  mrp: number;
  price: number;
  stock: number;
  emiPlans: EmiPlanForm[];
}

export default function AdminPage() {
  const [existingProducts, setExistingProducts] = useState<ProductListItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Main Product Form State
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('Apple');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');

  // Variants Array State
  const [variants, setVariants] = useState<VariantForm[]>([
    {
      label: '256GB / Space Black',
      storage: '256GB',
      color: 'Space Black',
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      mrp: 149900,
      price: 139900,
      stock: 50,
      emiPlans: [
        {
          tenureMonths: 6,
          monthlyAmount: 23316,
          interestRate: 0,
          cashbackAmount: 5000,
          cashbackNote: 'Additional cashback of ₹5,000',
          fundedBy: 'Mutual Fund SIP',
        },
        {
          tenureMonths: 12,
          monthlyAmount: 11658,
          interestRate: 0,
          cashbackAmount: 5000,
          cashbackNote: 'Additional cashback of ₹5,000',
          fundedBy: 'Mutual Fund SIP',
        },
        {
          tenureMonths: 36,
          monthlyAmount: 4718,
          interestRate: 10.5,
          cashbackAmount: 5000,
          cashbackNote: 'Additional cashback of ₹5,000',
          fundedBy: 'Mutual Fund SIP',
        },
      ],
    },
  ]);

  // Fetch current products for overview table
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const json = await res.json();
      if (json.success) {
        setExistingProducts(json.data);
      }
    } catch (e) {
      console.error('Failed to fetch existing products:', e);
    }
  };

  // Auto-generate clean slug from product name
  const handleAutoSlug = () => {
    if (!name) return;
    const generated = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setSlug(generated);
  };

  // Variant Helpers
  const addVariant = () => {
    setVariants([
      ...variants,
      {
        label: '512GB / Titanium Gray',
        storage: '512GB',
        color: 'Titanium Gray',
        imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
        mrp: 169900,
        price: 159900,
        stock: 30,
        emiPlans: [
          {
            tenureMonths: 6,
            monthlyAmount: 26650,
            interestRate: 0,
            cashbackAmount: 6000,
            cashbackNote: 'Additional cashback of ₹6,000',
            fundedBy: 'Mutual Fund SIP',
          },
          {
            tenureMonths: 12,
            monthlyAmount: 13325,
            interestRate: 0,
            cashbackAmount: 6000,
            cashbackNote: 'Additional cashback of ₹6,000',
            fundedBy: 'Mutual Fund SIP',
          },
        ],
      },
    ]);
  };

  const removeVariant = (vIndex: number) => {
    if (variants.length <= 1) {
      alert('Product must have at least one variant.');
      return;
    }
    setVariants(variants.filter((_, idx) => idx !== vIndex));
  };

  const updateVariant = (vIndex: number, field: keyof VariantForm, value: any) => {
    const updated = [...variants];
    updated[vIndex] = { ...updated[vIndex], [field]: value };
    setVariants(updated);
  };

  // EMI Plan Helpers inside a specific Variant
  const addEmiPlan = (vIndex: number) => {
    const updated = [...variants];
    const currentVariant = updated[vIndex];
    const defaultTenure = 24;
    const calcMonthly = Math.round(currentVariant.price / defaultTenure);

    currentVariant.emiPlans.push({
      tenureMonths: defaultTenure,
      monthlyAmount: calcMonthly,
      interestRate: 0,
      cashbackAmount: 5000,
      cashbackNote: 'Additional cashback of ₹5,000',
      fundedBy: 'Mutual Fund SIP',
    });
    setVariants(updated);
  };

  const removeEmiPlan = (vIndex: number, eIndex: number) => {
    const updated = [...variants];
    if (updated[vIndex].emiPlans.length <= 1) {
      alert('Each variant must have at least one EMI plan tier.');
      return;
    }
    updated[vIndex].emiPlans = updated[vIndex].emiPlans.filter((_, idx) => idx !== eIndex);
    setVariants(updated);
  };

  const updateEmiPlan = (
    vIndex: number,
    eIndex: number,
    field: keyof EmiPlanForm,
    value: any
  ) => {
    const updated = [...variants];
    const emi = updated[vIndex].emiPlans[eIndex];
    const updatedEmi = { ...emi, [field]: value };

    // Auto calculate monthly amount if tenure changes
    if (field === 'tenureMonths') {
      const tenure = Number(value) || 1;
      updatedEmi.monthlyAmount = Math.round(updated[vIndex].price / tenure);
    }

    updated[vIndex].emiPlans[eIndex] = updatedEmi;
    setVariants(updated);
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const finalSlug =
      slug.trim() ||
      name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const payload = {
      name,
      brand,
      slug: finalSlug,
      description,
      variants,
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (json.success) {
        setSuccessMessage(`Product '${json.data.name}' added successfully to the catalog!`);
        setCreatedSlug(json.data.slug);
        fetchProducts(); // refresh catalog table

        // Reset basic form fields
        setName('');
        setSlug('');
        setDescription('');
      } else {
        setErrorMessage(json.error || 'Failed to create product.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Server error creating product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF7F2] text-stone-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Admin Page Header */}
        <div className="bg-gradient-to-r from-[#0F6D66] to-[#0A4440] rounded-3xl p-6 sm:p-10 text-white shadow-layered mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-[#E6F3F2] mb-2 border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-[#FF7A45]" />
              <span>EasyEMI Admin Portal</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Add New Product & EMI Plans
            </h1>
            <p className="text-xs sm:text-sm text-[#E6F3F2]/90 mt-1 font-medium max-w-xl">
              Create product listings with multiple storage/color variants and mutual-fund backed EMI installment tiers. Updates live in real-time.
            </p>
          </div>

          <Link
            href="/"
            className="self-start md:self-auto bg-[#FF7A45] hover:bg-[#E86733] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-colors shadow-md"
          >
            <span>View Public Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Success Alert Banner */}
        {successMessage && (
          <div className="bg-[#E6F3F2] border-2 border-[#0F6D66] text-[#0F6D66] p-4 rounded-2xl mb-8 flex items-center justify-between gap-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#0F6D66] shrink-0" />
              <div>
                <p className="font-bold text-sm">{successMessage}</p>
                <p className="text-xs font-medium">Data inserted cleanly into API backend.</p>
              </div>
            </div>
            {createdSlug && (
              <Link
                href={`/products/${createdSlug}`}
                className="bg-[#0F6D66] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#0B544F] transition-colors flex items-center gap-1.5 shrink-0"
              >
                <span>View Product Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        )}

        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="bg-red-50 border-2 border-red-300 text-red-800 p-4 rounded-2xl mb-8 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 shrink-0" />
            <p className="font-bold text-sm">{errorMessage}</p>
          </div>
        )}

        {/* Product Creation Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Basic Information */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D5] shadow-layered space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-[#F5EFE6]">
              <Package className="w-5 h-5 text-[#0F6D66]" />
              <h2 className="font-extrabold text-lg text-stone-900">
                1. Basic Product Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MacBook Pro M4"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F6D66]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                  Brand *
                </label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F6D66]"
                >
                  <option value="Apple">Apple</option>
                  <option value="Samsung">Samsung</option>
                  <option value="OnePlus">OnePlus</option>
                  <option value="Google">Google</option>
                  <option value="Sony">Sony</option>
                  <option value="Dell">Dell</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
                  URL Slug *
                </label>
                <button
                  type="button"
                  onClick={handleAutoSlug}
                  className="text-xs text-[#0F6D66] font-bold hover:underline"
                >
                  Auto-generate from Name
                </button>
              </div>
              <input
                type="text"
                required
                placeholder="e.g. macbook-pro-m4"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F6D66]"
              />
              <p className="text-[11px] text-stone-500 mt-1">
                Will be accessible at `/products/{slug || 'macbook-pro-m4'}`
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                Description
              </label>
              <textarea
                rows={3}
                placeholder="Describe key features, processor, design highlights..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F6D66]"
              />
            </div>
          </div>

          {/* Section 2: Product Variants & EMI Tiers */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D5] shadow-layered space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#F5EFE6]">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#0F6D66]" />
                <h2 className="font-extrabold text-lg text-stone-900">
                  2. Variants & EMI Installment Plans
                </h2>
              </div>

              <button
                type="button"
                onClick={addVariant}
                className="flex items-center gap-1.5 text-xs font-bold bg-[#E6F3F2] text-[#0F6D66] px-3.5 py-2 rounded-xl border border-[#0F6D66]/20 hover:bg-[#0F6D66] hover:text-white transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Another Variant</span>
              </button>
            </div>

            {/* Variants Accordion List */}
            {variants.map((v, vIndex) => (
              <div
                key={vIndex}
                className="p-5 sm:p-6 rounded-2xl border-2 border-[#E8E0D5] bg-[#FBF7F2]/50 space-y-5"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#E8E0D5]">
                  <span className="font-extrabold text-sm text-[#0F6D66]">
                    Variant #{vIndex + 1}: {v.label || 'New Variant'}
                  </span>
                  {variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(vIndex)}
                      className="text-xs font-bold text-red-600 hover:text-red-800 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Variant</span>
                    </button>
                  )}
                </div>

                {/* Variant Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-stone-600 mb-1">
                      Variant Label *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 512GB / Space Black"
                      value={v.label}
                      onChange={(e) => updateVariant(vIndex, 'label', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-600 mb-1">
                      Storage Size
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 512GB"
                      value={v.storage}
                      onChange={(e) => updateVariant(vIndex, 'storage', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-600 mb-1">
                      Color Finish
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Orange, Silver, Black"
                      value={v.color}
                      onChange={(e) => updateVariant(vIndex, 'color', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-stone-600 mb-1">
                      Selling Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="127400"
                      value={v.price}
                      onChange={(e) => updateVariant(vIndex, 'price', Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white font-bold text-[#0F6D66]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-600 mb-1">
                      Struck MRP (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="134900"
                      value={v.mrp}
                      onChange={(e) => updateVariant(vIndex, 'mrp', Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-600 mb-1">
                      Stock Count
                    </label>
                    <input
                      type="number"
                      value={v.stock}
                      onChange={(e) => updateVariant(vIndex, 'stock', Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-600 mb-1 text-xs">
                    Product Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/photo-..."
                    value={v.imageUrl}
                    onChange={(e) => updateVariant(vIndex, 'imageUrl', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-xs"
                  />
                </div>

                {/* Sub-section: EMI Plans List */}
                <div className="pt-3 border-t border-[#E8E0D5] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-stone-800 flex items-center gap-1.5">
                      <Calculator className="w-3.5 h-3.5 text-[#FF7A45]" />
                      <span>EMI Plan Options ({v.emiPlans.length} Tiers)</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => addEmiPlan(vIndex)}
                      className="text-xs font-bold text-[#0F6D66] hover:underline flex items-center gap-1"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Add EMI Option</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {v.emiPlans.map((emi, eIndex) => (
                      <div
                        key={eIndex}
                        className="bg-white p-3 rounded-xl border border-stone-200 grid grid-cols-1 sm:grid-cols-6 gap-3 items-center text-xs"
                      >
                        <div>
                          <label className="block text-[10px] font-bold text-stone-500 uppercase">
                            Tenure
                          </label>
                          <select
                            value={emi.tenureMonths}
                            onChange={(e) =>
                              updateEmiPlan(
                                vIndex,
                                eIndex,
                                'tenureMonths',
                                Number(e.target.value)
                              )
                            }
                            className="w-full p-1.5 rounded border border-stone-300 text-xs font-bold"
                          >
                            <option value={3}>3 Months</option>
                            <option value={6}>6 Months</option>
                            <option value={12}>12 Months</option>
                            <option value={24}>24 Months</option>
                            <option value={36}>36 Months</option>
                            <option value={48}>48 Months</option>
                            <option value={60}>60 Months</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-stone-500 uppercase">
                            Monthly (₹/mo)
                          </label>
                          <input
                            type="number"
                            value={emi.monthlyAmount}
                            onChange={(e) =>
                              updateEmiPlan(
                                vIndex,
                                eIndex,
                                'monthlyAmount',
                                Number(e.target.value)
                              )
                            }
                            className="w-full p-1.5 rounded border border-stone-300 font-bold text-[#0F6D66]"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-stone-500 uppercase">
                            Interest %
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            value={emi.interestRate}
                            onChange={(e) =>
                              updateEmiPlan(
                                vIndex,
                                eIndex,
                                'interestRate',
                                Number(e.target.value)
                              )
                            }
                            className="w-full p-1.5 rounded border border-stone-300 font-semibold"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-bold text-stone-500 uppercase">
                            Cashback Note
                          </label>
                          <input
                            type="text"
                            placeholder="Additional cashback of ₹5,000"
                            value={emi.cashbackNote}
                            onChange={(e) =>
                              updateEmiPlan(
                                vIndex,
                                eIndex,
                                'cashbackNote',
                                e.target.value
                              )
                            }
                            className="w-full p-1.5 rounded border border-stone-300 text-xs"
                          />
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => removeEmiPlan(vIndex, eIndex)}
                            className="text-stone-400 hover:text-red-600 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button Bar */}
          <div className="bg-white p-4 rounded-2xl border border-[#E8E0D5] shadow-layered flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-4 rounded-xl font-bold text-sm text-white flex items-center gap-2 transition-all shadow-md ${
                isSubmitting
                  ? 'bg-stone-400 cursor-not-allowed'
                  : 'bg-[#FF7A45] hover:bg-[#E86733] active:scale-98 cursor-pointer'
              }`}
            >
              <Package className="w-5 h-5" />
              <span>{isSubmitting ? 'Saving to Database...' : 'Save Product & Publish to Catalog'}</span>
            </button>
          </div>
        </form>

        {/* Existing Database Products Table Section */}
        <section className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E0D5] shadow-layered">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#F5EFE6]">
            <div>
              <h3 className="font-extrabold text-lg text-stone-900">
                Current Catalog Products ({existingProducts.length})
              </h3>
              <p className="text-xs text-stone-500">
                Products live in your API & PostgreSQL database
              </p>
            </div>
            <span className="text-xs font-bold text-[#0F6D66] bg-[#E6F3F2] px-3 py-1 rounded-full">
              Live DB Sync
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FBF7F2] border-b border-[#E8E0D5] text-stone-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Brand</th>
                  <th className="p-3">Slug</th>
                  <th className="p-3">Starting Price</th>
                  <th className="p-3">Variants</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {existingProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="p-3 font-bold text-stone-900 flex items-center gap-2.5">
                      <img
                        src={p.thumbnail}
                        alt={p.name}
                        className="w-9 h-9 object-contain rounded bg-[#FBF7F2] p-1 border border-stone-200"
                      />
                      <span>{p.name}</span>
                    </td>
                    <td className="p-3 text-stone-600 font-semibold">{p.brand}</td>
                    <td className="p-3 text-stone-500 font-mono text-[11px]">{p.slug}</td>
                    <td className="p-3 font-bold text-[#0F6D66]">
                      ₹{p.minPrice.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-stone-600 font-semibold">
                      {p.variantCount} Variants
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        href={`/products/${p.slug}`}
                        className="inline-flex items-center gap-1 font-bold text-[#FF7A45] hover:text-[#E86733]"
                      >
                        <span>View Live</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
