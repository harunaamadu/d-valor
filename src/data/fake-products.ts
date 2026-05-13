// fake-products.ts

import {
  ColorOption,
  SizeOption,
} from "@/components/product/ProductVariantSelector";
import type { FeaturedProduct, ProductImage, ProductTag } from "@/types/featured-product.types";

// ─── Fake Products ────────────────────────────────────────────────────────────
// Development placeholder — delete this file and update the FeaturedSection
// import once you wire up your Sanity GROQ query.
//
// Sanity GROQ tip — project fields to match FeaturedProduct:
//   *[_type == "product" && featured == true]{
//     "id":          _id,
//     "productId":   _id,
//     "slug":        slug.current,
//     name,
//     price,
//     "comparePrice": comparePrice,
//     "imageUrl":    image.asset->url,
//     "hoverImageUrl": hoverImage.asset->url,
//     tag, rating, reviewCount,
//     "colors": colors[]{ label, hex, variantId, stock, inStock, imageUrl }
//   }

// ─── Helper ───────────────────────────────────────────────────────────────────

/** Sum the stock values from a list of ColorOptions to produce a totalStock. */
export function sumColorStock(colors: ColorOption[]): number {
  return colors.reduce((acc, c) => acc + (c.stock ?? 0), 0);
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const FAKE_FEATURED_PRODUCTS: FeaturedProduct[] = [
  // ── 1. Luminous Glow Serum ──────────────────────────────────────────────────
  {
    id: "var_001",
    productId: "prod_001",
    slug: "luminous-glow-serum",
    name: "Luminous Glow Serum",
    brand: "D'valor",

    price: 320,

    imageUrl:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&auto=format&fit=crop",

    images: [
      {
        src: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop",
        alt: "Luminous Glow Serum",
      },
      {
        src: "https://images.unsplash.com/photo-1606830733744-0ad4bfa8b3c5?w=600&auto=format&fit=crop",
        alt: "Luminous Glow Serum texture",
      },
    ],

    description:
      "A brightening serum formulated with Vitamin C, niacinamide, and rare plant extracts to visibly reduce dark spots and enhance radiance.",

    colors: [
      { label: "Original",   hex: "#f5e6cc", variantId: "v-original",   inStock: true,  stock: 8  },
      { label: "Intensive",  hex: "#e8c99a", variantId: "v-intensive",  inStock: true,  stock: 4  },
      { label: "Sensitive",  hex: "#fdf0e0", variantId: "v-sensitive",  inStock: false, stock: 0  },
    ],

    sizes: [
      { label: "30ml",  variantId: "s-30",  inStock: true,  description: "Travel-friendly size", price: 320 },
      { label: "50ml",  variantId: "s-50",  inStock: true,  description: "Full-size",            price: 450 },
      { label: "100ml", variantId: "s-100", inStock: true,  description: "Luxury size",          price: 690, comparePrice: 760 },
    ],

    // stock is the sum of colour stocks — kept for legacy/cart usage
    stock: 12, // 8 + 4 + 0
    inStock: true,

    tag: "Bestseller",
    rating: 4.8,
    reviewCount: 142,
    isFeatured: true,
  },

  // ── 2. Velvet Rose Face Cream ───────────────────────────────────────────────
  {
    id: "var_002",
    productId: "prod_002",
    slug: "velvet-rose-face-cream",
    name: "Velvet Rose Face Cream",
    brand: "D'valor",

    price: 275,

    imageUrl:
      "https://images.unsplash.com/photo-1570194065650-d99fb4b38b5b?w=600&auto=format&fit=crop",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&auto=format&fit=crop",

    images: [
      {
        src: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b5b?w=600&auto=format&fit=crop",
        alt: "Velvet Rose Face Cream",
      },
      {
        src: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&auto=format&fit=crop",
        alt: "Velvet Rose Face Cream texture",
      },
    ],

    description:
      "A luxurious rose-infused face cream designed to deeply hydrate, smooth fine lines, and restore natural skin softness.",

    colors: [
      { label: "Rose Glow",  hex: "#f6d4d4", variantId: "v-rose",  inStock: true, stock: 12 },
      { label: "Soft Beige", hex: "#e8d0c2", variantId: "v-beige", inStock: true, stock: 8  },
    ],

    sizes: [
      { label: "50ml",  variantId: "s-50",  inStock: true, description: "Standard size", price: 275 },
      { label: "100ml", variantId: "s-100", inStock: true, description: "Family size",   price: 420, comparePrice: 480 },
    ],

    stock: 20, // 12 + 8
    inStock: true,

    tag: "New",
    rating: 4.6,
    reviewCount: 58,
    isFeatured: true,
  },

  // ── 3. Shea Butter Body Elixir ──────────────────────────────────────────────
  {
    id: "var_003",
    productId: "prod_003",
    slug: "shea-butter-body-elixir",
    name: "Shea Butter Body Elixir",
    brand: "D'valor",

    price: 180,
    comparePrice: 220,

    imageUrl:
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop",

    images: [
      {
        src: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop",
        alt: "Shea Butter Body Elixir",
      },
      {
        src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop",
        alt: "Shea Butter Body Elixir texture",
      },
    ],

    description:
      "An ultra-rich shea butter body treatment that nourishes dry skin and delivers long-lasting softness and glow.",

    colors: [
      { label: "Classic Shea", hex: "#d8b98a", variantId: "v-classic", inStock: true, stock: 18 },
      { label: "Honey Gold",   hex: "#e3c48f", variantId: "v-honey",   inStock: true, stock: 17 },
    ],

    sizes: [
      { label: "100ml", variantId: "s-100", inStock: true, description: "Daily use",      price: 180, comparePrice: 220 },
      { label: "250ml", variantId: "s-250", inStock: true, description: "Extended care",  price: 320, comparePrice: 380 },
    ],

    stock: 35, // 18 + 17
    inStock: true,

    tag: "Sale",
    rating: 4.9,
    reviewCount: 203,
    isFeatured: true,
    isBestSale: true,
  },

  // ── 4. Midnight Repair Oil ──────────────────────────────────────────────────
  {
    id: "var_004",
    productId: "prod_004",
    slug: "midnight-repair-oil",
    name: "Midnight Repair Oil",
    brand: "D'valor",

    price: 395,

    imageUrl:
      "https://images.unsplash.com/photo-1617897903246-719242758050?w=600&auto=format&fit=crop",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=600&auto=format&fit=crop",

    images: [
      {
        src: "https://images.unsplash.com/photo-1617897903246-719242758050?w=600&auto=format&fit=crop",
        alt: "Midnight Repair Oil",
      },
      {
        src: "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=600&auto=format&fit=crop",
        alt: "Midnight Repair Oil bottle",
      },
    ],

    description:
      "A nighttime facial oil enriched with botanical extracts to repair skin texture and restore overnight hydration.",

    colors: [
      { label: "Night Gold", hex: "#8a6b4f", variantId: "v-night", inStock: true, stock: 5 },
    ],

    sizes: [
      { label: "30ml", variantId: "s-30", inStock: true, description: "Night repair size",      price: 395 },
      { label: "60ml", variantId: "s-60", inStock: true, description: "Extended repair size",   price: 620, comparePrice: 700 },
    ],

    stock: 5, // single colour
    inStock: true,
    lowStockThreshold: 5,

    tag: "Limited",
    rating: 4.7,
    reviewCount: 91,
    isFeatured: true,
  },

  // ── 5. Petal Soft Eye Cream ─────────────────────────────────────────────────
  {
    id: "var_005",
    productId: "prod_005",
    slug: "petal-soft-eye-cream",
    name: "Petal Soft Eye Cream",
    brand: "D'valor",

    price: 240,

    imageUrl:
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&auto=format&fit=crop",

    images: [
      {
        src: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop",
        alt: "Petal Soft Eye Cream",
      },
      {
        src: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&auto=format&fit=crop",
        alt: "Petal Soft Eye Cream texture",
      },
    ],

    description:
      "A lightweight eye cream that helps reduce puffiness, dark circles, and visible signs of fatigue.",

    colors: [
      { label: "Soft Petal", hex: "#f3d8dc", variantId: "v-soft", inStock: true, stock: 18 },
    ],

    sizes: [
      { label: "20ml", variantId: "s-20", inStock: true, description: "Compact care",   price: 240 },
      { label: "40ml", variantId: "s-40", inStock: true, description: "Extended care",  price: 390, comparePrice: 430 },
    ],

    stock: 18, // single colour
    inStock: true,

    tag: "Popular",
    rating: 4.5,
    reviewCount: 77,
    isFeatured: true,
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────

export interface QuickViewProduct {
  id: string;
  productId: string;
  slug: string;

  name: string;
  brand?: string;

  price: number;
  comparePrice?: number;

  imageUrl?: string;
  hoverImageUrl?: string;

  images: ProductImage[];

  description?: string;

  rating?: number;
  reviewCount?: number;

  colors?: ColorOption[];
  sizes?: SizeOption[];

  tag?: ProductTag | string;

  /** Aggregate stock (sum of color stocks) */
  stock?: number;
  inStock?: boolean;

  isFeatured?: boolean;
  isNew?: boolean;
  isBestSale?: boolean;
}

// ─── Fetchers ─────────────────────────────────────────────────────────────────

export async function getFeaturedProducts(): Promise<FeaturedProduct[]> {
  return FAKE_FEATURED_PRODUCTS.filter(
    (p) => p.isFeatured || p.tag === "Bestseller",
  );
}

export async function fetchProductBySlug(
  slug: string,
): Promise<QuickViewProduct | null> {
  const product = FAKE_FEATURED_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return null;

  const colors = product.colors ?? [];

  return {
    id: product.id,
    productId: product.productId,
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    price: product.price,
    comparePrice: product.comparePrice,

    images: product.images?.length
      ? product.images
      : [{ src: product.imageUrl, alt: product.name }],

    description:
      product.description ?? `${product.name} crafted for radiant and healthy skin.`,

    rating: product.rating,
    reviewCount: product.reviewCount,

    colors,
    sizes: product.sizes ?? [],

    // Derive aggregate stock from color-level stocks
    stock: product.stock ?? sumColorStock(colors),
    inStock: product.inStock ?? sumColorStock(colors) > 0,
  };
}