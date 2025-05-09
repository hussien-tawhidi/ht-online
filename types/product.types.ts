
export interface ProductTypes {
  name: string;
  description: string;
  sku: string;
  price: number;
  category: string;
  subcategories: string;
  stock: number;
  images: { public_id: string; url: string }[];
  brand: string;
  discount?: number;
  ratings: number;
  numReviews: number;
  isFeatured: boolean;
  color?: string[];
  size?: string[];
  weight?: number;
  dimensions?: { width: number; height: number; depth: number };
  warranty?: string;
}