import {
  ColorOption,
  SizeOption,
} from "@/components/product/ProductVariantSelector";
import type { FeaturedProduct } from "@/types/featured-product.types";

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
//     tag, rating, reviewCount, stock
//   }

export const FAKE_FEATURED_PRODUCTS: FeaturedProduct[] = [
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
      {
        label: "Original",
        hex: "#f5e6cc",
        variantId: "v-original",
        inStock: true,
      },
      {
        label: "Intensive",
        hex: "#e8c99a",
        variantId: "v-intensive",
        inStock: true,
      },
      {
        label: "Sensitive",
        hex: "#fdf0e0",
        variantId: "v-sensitive",
        inStock: false,
      },
    ],
    sizes: [
      {
        label: "30ml",
        variantId: "s-30",
        inStock: true,
        description: "Travel-friendly size",
      },
      {
        label: "50ml",
        variantId: "s-50",
        inStock: true,
        description: "Full-size",
      },
      {
        label: "100ml",
        variantId: "s-100",
        inStock: true,
        description: "Luxury size",
      },
    ],
    tag: "Bestseller",
    rating: 4.8,
    reviewCount: 142,
    stock: 12,
    inStock: true,
    isFeatured: true,
  },

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
      {
        label: "Rose Glow",
        hex: "#f6d4d4",
        variantId: "v-rose",
        inStock: true,
      },
      {
        label: "Soft Beige",
        hex: "#e8d0c2",
        variantId: "v-beige",
        inStock: true,
      },
    ],
    sizes: [
      {
        label: "50ml",
        variantId: "s-50",
        inStock: true,
        description: "Standard size",
      },
      {
        label: "100ml",
        variantId: "s-100",
        inStock: true,
        description: "Family size",
      },
    ],
    tag: "New",
    rating: 4.6,
    reviewCount: 58,
    stock: 20,
    inStock: true,
    isFeatured: true,
  },

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
      {
        label: "Classic Shea",
        hex: "#d8b98a",
        variantId: "v-classic",
        inStock: true,
      },
      {
        label: "Honey Gold",
        hex: "#e3c48f",
        variantId: "v-honey",
        inStock: true,
      },
    ],
    sizes: [
      {
        label: "100ml",
        variantId: "s-100",
        inStock: true,
        description: "Daily use",
      },
      {
        label: "250ml",
        variantId: "s-250",
        inStock: true,
        description: "Extended care",
      },
    ],
    tag: "Sale",
    rating: 4.9,
    reviewCount: 203,
    stock: 35,
    inStock: true,
    isFeatured: true,
    isNew: false,
    isBestSale: true,
  },

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
      {
        label: "Night Gold",
        hex: "#8a6b4f",
        variantId: "v-night",
        inStock: true,
      },
    ],
    sizes: [
      {
        label: "30ml",
        variantId: "s-30",
        inStock: true,
        description: "Night repair size",
      },
    ],
    tag: "Limited",
    rating: 4.7,
    reviewCount: 91,
    stock: 5,
    inStock: true,
    isFeatured: true,
  },

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
      {
        label: "Soft Petal",
        hex: "#f3d8dc",
        variantId: "v-soft",
        inStock: true,
      },
    ],
    sizes: [
      {
        label: "20ml",
        variantId: "s-20",
        inStock: true,
        description: "Compact care",
      },
    ],
    tag: "Popular",
    rating: 4.5,
    reviewCount: 77,
    stock: 18,
    inStock: true,
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
  images: { src: string; alt: string }[];
  description?: string;
  rating?: number;
  reviewCount?: number;
  colors?: ColorOption[];
  sizes?: SizeOption[];
  stock?: number;
  inStock?: boolean;
}

export async function getFeaturedProducts(): Promise<FeaturedProduct[]> {
  return FAKE_FEATURED_PRODUCTS.filter(
    (product) => product.isFeatured || product.tag === "Bestseller",
  );
}

export async function fetchProductBySlug(
  slug: string,
): Promise<QuickViewProduct | null> {
  const product = FAKE_FEATURED_PRODUCTS.find((item) => item.slug === slug);

  if (!product) return null;

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
      : [
          {
            src: product.imageUrl,
            alt: product.name,
          },
        ],

    description:
      product.description ??
      `${product.name} crafted for radiant and healthy skin.`,

    rating: product.rating,
    reviewCount: product.reviewCount,

    colors: product.colors ?? [],
    sizes: product.sizes ?? [],

    stock: product.stock,
    inStock: product.inStock ?? (product.stock ?? 0) > 0,
  };
}
