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
// Product Category
// ─────────────────────────────────────────────────────────────

export type ProductCategory =
  | "Skincare"
  | "Body Care"
  | "Hair Care"
  | "Lip Care"
  | "Perfumes";

// ─────────────────────────────────────────────────────────────
// Product Variant
// ─────────────────────────────────────────────────────────────

export interface ProductVariant {
  id: string;
  sku?: string;
  color?: ColorOption;
  size?: SizeOption;
  image?: string;
  price: number;
  comparePrice?: number;
  /**
   * Total stock for this variant, calculated dynamically from the sum
   * of `stock` across all ColorOptions associated with this variant.
   */
  totalStock: number;
  inStock: boolean;
}

// ─────────────────────────────────────────────────────────────
// Product Review
// ─────────────────────────────────────────────────────────────

export interface ProductReview {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

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

  /** Product category */
  category?: ProductCategory;

  /** Product collections */
  collections?: string[];

  // ─── Pricing ──────────────────────────────────────────────

  /** Current selling price */
  price: number;

  /** Previous/original price */
  comparePrice?: number;

  /** Currency code */
  currency?: "GHS" | "USD" | "EUR";

  /** Discount percentage */
  discountPercentage?: number;

  // ─── Media ────────────────────────────────────────────────

  /** Main thumbnail image */
  imageUrl: string;

  /** Hover image */
  hoverImageUrl?: string;

  /** Product gallery */
  images?: ProductImage[];

  /** Short promotional video */
  videoUrl?: string;

  // ─── Variants ─────────────────────────────────────────────

  /** Available color variants — each carries its own stock count */
  colors?: ColorOption[];

  /** Available size variants */
  sizes?: SizeOption[];

  /** Full variants */
  variants?: ProductVariant[];

  /** Selected/default variant id */
  variantId?: string;

  // ─── Product Labels ───────────────────────────────────────

  /** Product badge */
  tag?: ProductTag | string;

  isNew?: boolean;

  isFeatured?: boolean;

  isBestSale?: boolean;

  isTrending?: boolean;

  isLimited?: boolean;

  isExclusive?: boolean;

  // ─── Reviews & Ratings ────────────────────────────────────

  /** Average rating out of 5 */
  rating?: number;

  /** Number of reviews */
  reviewCount?: number;

  /** Customer reviews */
  reviews?: ProductReview[];

  // ─── Inventory ────────────────────────────────────────────

  /**
   * Aggregate quantity in stock across all colour/size combinations.
   * Derived at runtime: sum of `color.stock` for all ColorOptions.
   */
  stock?: number;

  /** Whether product is available */
  inStock?: boolean;

  /** Low stock warning threshold */
  lowStockThreshold?: number;

  /** Sold quantity */
  soldCount?: number;

  // ─── Shipping ─────────────────────────────────────────────

  /** Free shipping availability */
  freeShipping?: boolean;

  /** Estimated delivery text */
  estimatedDelivery?: string;

  // ─── SEO / Metadata ───────────────────────────────────────

  /** SEO title */
  seoTitle?: string;

  /** SEO description */
  seoDescription?: string;

  /** SEO keywords */
  seoKeywords?: string[];

  // ─── Dates ────────────────────────────────────────────────

  /** Created timestamp */
  createdAt?: string;

  /** Updated timestamp */
  updatedAt?: string;

  /** Published timestamp */
  publishedAt?: string;
}