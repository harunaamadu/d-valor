import { groq } from 'next-sanity'

const imageProjection = groq`
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

const productProjection = groq`
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
    "primaryImage": images[0]${imageProjection},
    "images": images[]${imageProjection},
    "category": category->{
      _id,
      title,
      "slug": slug.current
    },
    tags
  }
`

const collectionProjection = groq`
  {
    _id,
    title,
    "slug": slug.current,
    description,
    featured,
    "banner": banner${imageProjection},
    "productCount": count(products[]),
    "products": products[]->${productProjection}
  }
`

const editorialProjection = groq`
  {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "coverImage": coverImage${imageProjection},
    content
  }
`

export const homepageQuery = groq`
  {
    "siteSettings": *[_type == "siteSettings"][0]{
      _id,
      siteTitle,
      siteDescription,
      "logo": logo${imageProjection},
      "favicon": favicon${imageProjection},
      "seoImage": seoImage${imageProjection},
      socialLinks,
      contactEmail
    },
    "announcement": *[_type == "announcement" && active == true] | order(_updatedAt desc)[0]{
      _id,
      text,
      link,
      active,
      backgroundColor,
      textColor
    },
    "hero": *[_type == "hero" && active == true] | order(_createdAt asc){
      _id,
      eyebrow,
      headline,
      subtext,
      cta,
      secondaryCta,
      tag,
      "bg": bg.asset->url,
      "product": product.asset->url,
      productAlt,
      accentColor,
      active
    },
    "featuredProducts": *[
      _type == "product" &&
      featured == true &&
      status == "published"
    ] | order(_createdAt desc) [0...8] ${productProjection},
    "featuredCollections": *[
      _type == "collection" &&
      featured == true
    ] | order(_createdAt desc) [0...6] ${collectionProjection},
    "latestEditorials": *[
      _type == "editorial"
    ] | order(coalesce(publishedAt, _createdAt) desc) [0...3] ${editorialProjection}
  }
`
