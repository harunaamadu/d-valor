// ─── Featured Product Type ────────────────────────────────────────────────────
// This mirrors the shape that will eventually come from Sanity.
// When you wire up Sanity, replace this with the inferred type from your GROQ
// query (e.g. using `import type { FeaturedProductQueryResult } from "@/sanity/types"`).

export interface FeaturedProduct {
  productId: string;
  name: string;
  /** Price in GHS (Ghana Cedis) */
  price: number;
  /** Full-resolution product image URL */
  imageUrl: string;
  /** Short category/collection tag e.g. "Serum", "Limited Edition" */
  tag?: string;
  /** URL-safe slug for the product detail page */
  slug: string;
  /** Brief one-liner shown on hover or in quick-view */
  description?: string;
  /** Whether the product is marked as new */
  isNew?: boolean;
  /** Whether the product is currently on sale */
  onSale?: boolean;
  /** Original price before discount (only relevant when onSale is true) */
  originalPrice?: number;
  /** Average star rating out of 5 */
  rating?: number;
  /** Total number of reviews */
  reviewCount?: number;
}