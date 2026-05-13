// queries/product.ts

import { groq } from 'next-sanity'

// ─────────────────────────────────────────────
// Shared Image Projection
// ─────────────────────────────────────────────

const productImageProjection = groq`
  {
    alt,
    isPrimary,
    "src": asset->url,
    "blurDataURL": asset->metadata.lqip,
    "metadata": asset->metadata{
      dimensions {
        width,
        height,
        aspectRatio
      }
    }
  }
`

// ─────────────────────────────────────────────
// Color Variant Projection
// ─────────────────────────────────────────────

const colorProjection = groq`
  {
    label,
    hex,
    variantId,
    stock,
    inStock,
    "imageUrl": imageUrl.asset->url
  }
`

// ─────────────────────────────────────────────
// Size Variant Projection
// ─────────────────────────────────────────────

const sizeProjection = groq`
  {
    label,
    variantId,
    description,
    price,
    comparePrice,
    inStock
  }
`

// ─────────────────────────────────────────────
// Product Card Projection
// ─────────────────────────────────────────────

export const productCardProjection = groq`
{
  "_id": _id,
  "_createdAt": _createdAt,
  "_updatedAt": _updatedAt,

  // ─── Basic Info ───────────────────────────

  name,
  brand,
  subtitle,
  description,

  "slug": slug.current,

  category,
  collections,

  // ─── Pricing ──────────────────────────────

  price,
  comparePrice,
  currency,

  "discountPercentage": select(
    defined(comparePrice) && comparePrice > price =>
      round(((comparePrice - price) / comparePrice) * 100),
    null
  ),

  // ─── Media ────────────────────────────────

  "imageUrl": imageUrl.asset->url,

  "hoverImageUrl": hoverImageUrl.asset->url,

  "images": images[]${productImageProjection},

  videoUrl,

  // ─── Variants ─────────────────────────────

  "colors": colors[]${colorProjection},

  "sizes": sizes[]${sizeProjection},

  // ─── Labels ───────────────────────────────

  tag,

  isFeatured,
  isNew,
  isBestSale,
  isTrending,
  isLimited,
  isExclusive,

  // ─── Ratings ──────────────────────────────

  rating,
  reviewCount,

  // ─── Inventory ────────────────────────────

  stock,

  "inStock": coalesce(inStock, false),

  lowStockThreshold,
  soldCount,

  // ─── Shipping ─────────────────────────────

  freeShipping,
  estimatedDelivery,

  // ─── SEO ──────────────────────────────────

  seoTitle,
  seoDescription,
  seoKeywords,

  // ─── Dates ────────────────────────────────

  publishedAt
}
`

// ─────────────────────────────────────────────
// Queries
// ─────────────────────────────────────────────

export const allProductsQuery = groq`
  *[_type == "product"]
  | order(isFeatured desc, publishedAt desc, _createdAt desc)
  ${productCardProjection}
`

export const featuredProductsQuery = groq`
  *[
    _type == "product" &&
    isFeatured == true
  ]
  | order(publishedAt desc, _createdAt desc)
  ${productCardProjection}
`

export const productBySlugQuery = groq`
  *[
    _type == "product" &&
    slug.current == $slug
  ][0]
  ${productCardProjection}
`

export const relatedProductsQuery = groq`
  *[
    _type == "product" &&
    slug.current != $slug &&
    (
      category == $category ||
      count(collections[@ in $collections]) > 0
    )
  ]
  | order(isFeatured desc, publishedAt desc, _createdAt desc)
  [0...$limit]
  ${productCardProjection}
`

export const productsByCategoryQuery = groq`
  *[
    _type == "product" &&
    category == $category
  ]
  | order(isFeatured desc, publishedAt desc, _createdAt desc)
  ${productCardProjection}
`

export const productsByCollectionQuery = groq`
  *[
    _type == "product" &&
    $collection in collections[]
  ]
  | order(isFeatured desc, publishedAt desc, _createdAt desc)
  ${productCardProjection}
`

export const productSlugsQuery = groq`
  *[
    _type == "product" &&
    defined(slug.current)
  ][].slug.current
`