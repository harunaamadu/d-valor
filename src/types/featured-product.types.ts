import {
  ColorOption,
  SizeOption,
} from "@/components/product/ProductVariantSelector";

// ─────────────────────────────────────────────────────────────
// Product Image
// ─────────────────────────────────────────────────────────────

export interface ProductImage {
  /** Image URL */
  src: string;

  /** Accessible alt text */
  alt: string;

  /** Optional blur placeholder */
  blurDataURL?: string;

  /** Marks the primary gallery image */
  isPrimary?: boolean;
}

// ─────────────────────────────────────────────────────────────
// Product Badge / Tag
// ─────────────────────────────────────────────────────────────

export type ProductTag =
  | "New"
  | "Sale"
  | "Bestseller"
  | "Limited"
  | "Popular"
  | "Trending"
  | "Exclusive";

// ─────────────────────────────────────────────────────────────
// Featured Product
// ─────────────────────────────────────────────────────────────

export interface FeaturedProduct {
  // ─── Identification ───────────────────────────────────────

  /** Variant-level id (used for cart item keys) */
  id: string;

  /** Product document id */
  productId: string;

  /** Product slug → /products/[slug] */
  slug: string;

  /** Optional SKU */
  sku?: string;

  // ─── Basic Info ───────────────────────────────────────────

  /** Product title */
  name: string;

  /** Brand / manufacturer */
  brand?: string;

  /** Short marketing subtitle */
  subtitle?: string;

  /** Product description */
  description?: string;

  // ─── Pricing ──────────────────────────────────────────────

  /** Current selling price in GHS */
  price: number;

  /** Previous/original price */
  comparePrice?: number;

  /** Currency code */
  currency?: "GHS" | "USD" | "EUR";

  // ─── Media ────────────────────────────────────────────────

  /** Main thumbnail image */
  imageUrl: string;

  /** Hover image */
  hoverImageUrl?: string;

  /** Product gallery */
  images?: ProductImage[];

  // ─── Variants ─────────────────────────────────────────────

  /** Available color variants */
  colors?: ColorOption[];

  /** Available size variants */
  sizes?: SizeOption[];

  /** Selected/default variant id */
  variantId?: string;

  // ─── Product Labels ───────────────────────────────────────

  /** Product badge */
  tag?: ProductTag | string;

  isNew?: boolean;

  isFeatured?: boolean;

  isBestSale?: boolean;

  isTrending?: boolean;

  // ─── Reviews & Ratings ────────────────────────────────────

  /** Average rating out of 5 */
  rating?: number;

  /** Number of reviews */
  reviewCount?: number;

  // ─── Inventory ────────────────────────────────────────────

  /** Quantity in stock */
  stock?: number;

  /** Whether product is available */
  inStock?: boolean;

  /** Low stock warning threshold */
  lowStockThreshold?: number;

  // ─── SEO / Metadata ───────────────────────────────────────

  /** SEO title */
  seoTitle?: string;

  /** SEO description */
  seoDescription?: string;

  // ─── Dates ────────────────────────────────────────────────

  /** Created timestamp */
  createdAt?: string;

  /** Updated timestamp */
  updatedAt?: string;
}