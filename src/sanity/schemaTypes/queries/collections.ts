import { groq } from 'next-sanity'

const collectionBannerProjection = groq`
  {
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

const collectionProductImageProjection = groq`
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

const collectionProductProjection = groq`
  {
    _id,
    title,
    "slug": slug.current,
    description,
    price,
    compareAtPrice,
    inventory,
    featured,
    status,
    "isInStock": coalesce(inventory, 0) > 0 && status != "out-of-stock",
    "primaryImage": images[0]${collectionProductImageProjection},
    "images": images[]${collectionProductImageProjection},
    "category": category->{
      _id,
      title,
      "slug": slug.current
    },
    tags
  }
`

export const collectionCardProjection = groq`
  {
    _id,
    _createdAt,
    _updatedAt,
    title,
    "slug": slug.current,
    description,
    featured,
    "banner": banner${collectionBannerProjection},
    "productCount": count(products[]),
    "products": products[]->${collectionProductProjection}
  }
`

export const allCollectionsQuery = groq`
  *[_type == "collection"] | order(featured desc, title asc) ${collectionCardProjection}
`

export const featuredCollectionsQuery = groq`
  *[_type == "collection" && featured == true] | order(_createdAt desc) ${collectionCardProjection}
`

export const collectionBySlugQuery = groq`
  *[_type == "collection" && slug.current == $slug][0] ${collectionCardProjection}
`

export const collectionSlugsQuery = groq`
  *[_type == "collection" && defined(slug.current)][].slug.current
`
