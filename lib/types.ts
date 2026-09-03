export interface EmiPlan {
  id: string;
  variantId: string;
  tenureMonths: number;
  monthlyAmount: number;
  interestRate: number;
  cashbackAmount: number;
  cashbackNote: string | null;
  fundedBy: string;
}

export interface Variant {
  id: string;
  productId: string;
  label: string;
  storage: string | null;
  color: string | null;
  imageUrl: string;
  mrp: number;
  price: number;
  stock: number;
  emiPlans?: EmiPlan[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string | null;
  createdAt: string | Date;
  variants: Variant[];
}

export interface ProductListItem {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string | null;
  thumbnail: string;
  minPrice: number;
  maxMrp: number;
  variantCount: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
