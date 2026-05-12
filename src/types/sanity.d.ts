// ─────────────────────────────────────────────────────────────
// Sanity Base
// ─────────────────────────────────────────────────────────────

export interface SanityDocument {
  _id: string;
  _type: string;
  _rev?: string;
  _createdAt?: string;
  _updatedAt?: string;
}

export interface SanityReference {
  _type: "reference";
  _ref: string;
}

export interface SanitySlug {
  _type: "slug";
  current: string;
}

// ─────────────────────────────────────────────────────────────
// Sanity Image
// ─────────────────────────────────────────────────────────────

export interface SanityImageAsset {
  _id: string;
  _type: "sanity.imageAsset";
  url: string;
  path: string;
  mimeType: string;
  size: number;
  metadata: {
    lqip?: string;
    blurHash?: string;
    dimensions: {
      width: number;
      height: number;
      aspectRatio: number;
    };
    palette?: {
      dominant?: { background: string; foreground: string };
    };
  };
}

export interface SanityImage {
  _type: "image";
  asset: SanityReference | SanityImageAsset;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  alt?: string;
}

// ─────────────────────────────────────────────────────────────
// Sanity Portable Text
// ─────────────────────────────────────────────────────────────

export interface SanityBlock {
  _type: "block";
  _key: string;
  style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
  children: Array<{
    _type: "span";
    _key: string;
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _type: string;
    _key: string;
    [key: string]: unknown;
  }>;
}

export type SanityPortableText = SanityBlock[];

// ─────────────────────────────────────────────────────────────
// CMS Content Schemas
// ─────────────────────────────────────────────────────────────

export interface SanityHero extends SanityDocument {
  _type: "hero";
  eyebrow?: string;
  headline: string;
  subtext?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  tag?: string;
  backgroundImage?: SanityImage;
  productImage?: SanityImage;
  accentColor?: string;
}

export interface SanityProduct extends SanityDocument {
  _type: "product";
  name: string;
  slug: SanitySlug;
  brand?: string;
  description?: SanityPortableText;
  ingredients?: SanityPortableText;
  howToUse?: SanityPortableText;
  price: number;
  comparePrice?: number;
  images?: SanityImage[];
  category?: SanityReference;
  collections?: SanityReference[];
  tags?: string[];
  badges?: string[];
  isFeatured?: boolean;
  isNew?: boolean;
}

export interface SanityCollection extends SanityDocument {
  _type: "collection";
  name: string;
  slug: SanitySlug;
  description?: SanityPortableText;
  heroImage?: SanityImage;
  products?: SanityReference[];
}

export interface SanityCategory extends SanityDocument {
  _type: "category";
  name: string;
  slug: SanitySlug;
  description?: string;
  image?: SanityImage;
  parent?: SanityReference;
}

export interface SanityAnnouncement extends SanityDocument {
  _type: "announcement";
  title: string;
  subtitle?: string;
  href?: string;
  isActive?: boolean;
  startsAt?: string;
  endsAt?: string;
}

export interface SanitySiteSettings extends SanityDocument {
  _type: "siteSettings";
  siteName: string;
  siteDescription?: string;
  logo?: SanityImage;
  favicon?: SanityImage;
  ogImage?: SanityImage;
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
}