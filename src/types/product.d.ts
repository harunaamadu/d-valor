import type { ColorOption, SizeOption } from "@/components/product/ProductVariantSelector";
import type { Review } from "@/components/product/ProductReviews";

// ─────────────────────────────────────────────────────────────
// Re-exports from existing types
// ─────────────────────────────────────────────────────────────

export type {
  ProductImage,
  ProductTag,
  FeaturedProduct,
} from "./featured-product.types";

// ─────────────────────────────────────────────────────────────
// Category
// ─────────────────────────────────────────────────────────────

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  parentId?: string;
  productCount?: number;
}

// ─────────────────────────────────────────────────────────────
// Collection
// ─────────────────────────────────────────────────────────────

export interface ProductCollection {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  products?: Product[];
}

// ─────────────────────────────────────────────────────────────
// Product Variant
// ─────────────────────────────────────────────────────────────

export interface ProductVariant {
  id: string;
  productId: string;
  sku?: string;
  size?: string;
  color?: string;
  colorHex?: string;
  price?: number;
  comparePrice?: number;
  stock: number;
  inStock: boolean;
  imageUrl?: string;
}

// ─────────────────────────────────────────────────────────────
// Full Product (PDP)
// ─────────────────────────────────────────────────────────────

export interface Product {
  // ─── Identification ───────────────────────────────────────
  id: string;
  slug: string;
  sku?: string;

  // ─── Content ──────────────────────────────────────────────
  name: string;
  brand?: string;
  subtitle?: string;
  description?: string;
  ingredients?: string;
  howToUse?: string;

  // ─── Pricing ──────────────────────────────────────────────
  price: number;
  comparePrice?: number;
  currency?: "GHS" | "USD" | "EUR";

  // ─── Media ────────────────────────────────────────────────
  imageUrl: string;
  hoverImageUrl?: string;
  images: { src: string; alt: string; blurDataURL?: string }[];

  // ─── Taxonomy ─────────────────────────────────────────────
  category?: ProductCategory;
  collections?: ProductCollection[];
  tags?: string[];

  // ─── Variants ─────────────────────────────────────────────
  variants?: ProductVariant[];
  colors?: ColorOption[];
  sizes?: SizeOption[];

  // ─── Labels ───────────────────────────────────────────────
  tag?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSale?: boolean;
  isTrending?: boolean;
  badges?: string[];

  // ─── Reviews ──────────────────────────────────────────────
  rating?: number;
  reviewCount?: number;
  reviews?: Review[];
  ratingBreakdown?: Record<number, number>;

  // ─── Inventory ────────────────────────────────────────────
  stock?: number;
  inStock?: boolean;
  lowStockThreshold?: number;

  // ─── SEO ──────────────────────────────────────────────────
  seoTitle?: string;
  seoDescription?: string;

  // ─── Dates ────────────────────────────────────────────────
  createdAt?: string;
  updatedAt?: string;
}

// ─────────────────────────────────────────────────────────────
// Shop Filters
// ─────────────────────────────────────────────────────────────

export type SortOption =
  | "newest"
  | "oldest"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "popular";

export interface ProductFilters {
  category?: string;
  collection?: string;
  tags?: string[];
  minPrice?: number;
  maxPrice?: number;
  colors?: string[];
  sizes?: string[];
  inStock?: boolean;
  sort?: SortOption;
  search?: string;
  page?: number;
  limit?: number;
}

// ─────────────────────────────────────────────────────────────
// Paginated Product Response
// ─────────────────────────────────────────────────────────────

export interface PaginatedProducts {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}