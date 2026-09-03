export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-[#E8E0D5] overflow-hidden animate-pulse">
      <div className="w-full aspect-square bg-stone-200/70" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-stone-200 rounded w-3/4" />
        <div className="h-3 bg-stone-200 rounded w-full" />
        <div className="h-3 bg-stone-200 rounded w-1/2" />
        <div className="pt-4 border-t border-stone-100 flex justify-between items-center">
          <div className="h-6 bg-stone-200 rounded w-1/3" />
          <div className="h-6 bg-stone-200 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse space-y-8">
      <div className="h-4 bg-stone-200 rounded w-48" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 h-[480px] bg-stone-200/80 rounded-3xl" />
        <div className="lg:col-span-7 space-y-6">
          <div className="h-8 bg-stone-200 rounded w-3/4" />
          <div className="h-10 bg-stone-200 rounded w-1/2" />
          <div className="h-20 bg-stone-200 rounded-2xl w-full" />
          <div className="space-y-3">
            <div className="h-20 bg-stone-200 rounded-2xl w-full" />
            <div className="h-20 bg-stone-200 rounded-2xl w-full" />
            <div className="h-20 bg-stone-200 rounded-2xl w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
