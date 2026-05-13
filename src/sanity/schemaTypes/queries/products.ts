import { groq } from 'next-sanity'

const productImageProjection = groq`
  {
    alt,
    asset->{
      _id,
      url,
      metadata {
        lqip,
        dimensions {
          width,
          height,
          aspectRatio
        }
      }
    }
  }
`

const categoryProjection = groq`
  "category": category->{
    _id,
    title,
    "slug": slug.current
  }
`

const collectionReferenceProjection = groq`
  collections[]->{
    _id,
    title,
    "slug": slug.current
  }
`

export const productCardProjection = groq`
  {
    _id,
    _createdAt,
    _updatedAt,
    title,
    "slug": slug.current,
    description,
    price,
    compareAtPrice,
    inventory,
    featured,
    status,
    "isInStock": coalesce(inventory, 0) > 0 && status != "out-of-stock",
    "primaryImage": images[0]${productImageProjection},
    "images": images[]${productImageProjection},
    ${categoryProjection},
    "collections": ${collectionReferenceProjection},
    tags
  }
`

export const allProductsQuery = groq`
  *[_type == "product"] | order(featured desc, _createdAt desc) ${productCardProjection}
`

export const publishedProductsQuery = groq`
  *[_type == "product" && status == "published"] | order(featured desc, _createdAt desc) ${productCardProjection}
`

export const featuredProductsQuery = groq`
  *[_type == "product" && featured == true && status == "published"] | order(_createdAt desc) ${productCardProjection}
`

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] ${productCardProjection}
`

export const relatedProductsQuery = groq`
  *[
    _type == "product" &&
    status == "published" &&
    slug.current != $slug &&
    (
      category._ref == $categoryId ||
      count(collections[@._ref in $collectionIds]) > 0
    )
  ] | order(featured desc, _createdAt desc) [0...$limit] ${productCardProjection}
`

export const productsByCategoryQuery = groq`
  *[
    _type == "product" &&
    status == "published" &&
    category->slug.current == $categorySlug
  ] | order(featured desc, _createdAt desc) ${productCardProjection}
`

export const productsByCollectionQuery = groq`
  *[
    _type == "product" &&
    status == "published" &&
    $collectionSlug in collections[]->slug.current
  ] | order(featured desc, _createdAt desc) ${productCardProjection}
`

export const productSlugsQuery = groq`
  *[_type == "product" && defined(slug.current)][].slug.current
`
