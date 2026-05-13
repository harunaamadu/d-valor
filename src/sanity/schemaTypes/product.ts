// schemas/product.ts

import { defineArrayMember, defineField, defineType } from 'sanity'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',

  fields: [
    // ─────────────────────────────────────────────
    // Basic Info
    // ─────────────────────────────────────────────

    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(120),
    }),

    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'string',
    }),

    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.max(2000),
    }),

    // ─────────────────────────────────────────────
    // Category / Collections
    // ─────────────────────────────────────────────

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Skincare', value: 'Skincare' },
          { title: 'Body Care', value: 'Body Care' },
          { title: 'Hair Care', value: 'Hair Care' },
          { title: 'Lip Care', value: 'Lip Care' },
          { title: 'Perfumes', value: 'Perfumes' },
        ],
      },
    }),

    defineField({
      name: 'collections',
      title: 'Collections',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.unique(),
    }),

    // ─────────────────────────────────────────────
    // Pricing
    // ─────────────────────────────────────────────

    defineField({
      name: 'price',
      title: 'Base Price',
      description: 'Default product price (usually first size price)',
      type: 'number',
      validation: (rule) => rule.required().positive().precision(2),
    }),

    defineField({
      name: 'comparePrice',
      title: 'Compare Price',
      type: 'number',
      validation: (rule) =>
        rule.min(0).precision(2).custom((value, context) => {
          const price = context.document?.price

          if (typeof value !== 'number' || typeof price !== 'number') {
            return true
          }

          return (
            value >= price ||
            'Compare price must be greater than or equal to price.'
          )
        }),
    }),

    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'GHS',
      options: {
        list: [
          { title: 'GHS', value: 'GHS' },
          { title: 'USD', value: 'USD' },
          { title: 'EUR', value: 'EUR' },
        ],
      },
    }),

    // ─────────────────────────────────────────────
    // Media
    // ─────────────────────────────────────────────

    defineField({
      name: 'imageUrl',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'hoverImageUrl',
      title: 'Hover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (rule) => rule.required(),
            }),

            defineField({
              name: 'isPrimary',
              title: 'Primary Image',
              type: 'boolean',
              initialValue: false,
            }),
          ],
        }),
      ],
      validation: (rule) => rule.min(1),
    }),

    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
    }),

    // ─────────────────────────────────────────────
    // Colors
    // ─────────────────────────────────────────────

    defineField({
      name: 'colors',
      title: 'Color Variants',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),

            defineField({
              name: 'hex',
              title: 'Hex Color',
              type: 'string',
              validation: (rule) => rule.required(),
            }),

            defineField({
              name: 'variantId',
              title: 'Variant ID',
              type: 'string',
              validation: (rule) => rule.required(),
            }),

            defineField({
              name: 'stock',
              title: 'Stock',
              type: 'number',
              initialValue: 0,
              validation: (rule) => rule.required().integer().min(0),
            }),

            defineField({
              name: 'inStock',
              title: 'In Stock',
              type: 'boolean',
              initialValue: true,
            }),

            defineField({
              name: 'imageUrl',
              title: 'Variant Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
          ],

          preview: {
            select: {
              title: 'label',
              subtitle: 'hex',
              media: 'imageUrl',
            },
          },
        }),
      ],
    }),

    // ─────────────────────────────────────────────
    // Sizes
    // ─────────────────────────────────────────────

    defineField({
      name: 'sizes',
      title: 'Size Variants',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',

          fields: [
            defineField({
              name: 'label',
              title: 'Size Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),

            defineField({
              name: 'variantId',
              title: 'Variant ID',
              type: 'string',
              validation: (rule) => rule.required(),
            }),

            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
            }),

            defineField({
              name: 'price',
              title: 'Price',
              type: 'number',
              validation: (rule) =>
                rule.required().positive().precision(2),
            }),

            defineField({
              name: 'comparePrice',
              title: 'Compare Price',
              type: 'number',
              validation: (rule) =>
                rule.min(0).precision(2),
            }),

            defineField({
              name: 'inStock',
              title: 'In Stock',
              type: 'boolean',
              initialValue: true,
            }),
          ],

          preview: {
            select: {
              title: 'label',
              price: 'price',
            },

            prepare({ title, price }) {
              return {
                title,
                subtitle:
                  typeof price === 'number'
                    ? currencyFormatter.format(price)
                    : 'No price',
              }
            },
          },
        }),
      ],
    }),

    // ─────────────────────────────────────────────
    // Product Labels
    // ─────────────────────────────────────────────

    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'New' },
          { title: 'Sale', value: 'Sale' },
          { title: 'Bestseller', value: 'Bestseller' },
          { title: 'Limited', value: 'Limited' },
          { title: 'Popular', value: 'Popular' },
          { title: 'Trending', value: 'Trending' },
          { title: 'Exclusive', value: 'Exclusive' },
        ],
      },
    }),

    defineField({
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'isNew',
      title: 'New Product',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'isBestSale',
      title: 'Best Sale',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'isTrending',
      title: 'Trending',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'isLimited',
      title: 'Limited',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'isExclusive',
      title: 'Exclusive',
      type: 'boolean',
      initialValue: false,
    }),

    // ─────────────────────────────────────────────
    // Ratings
    // ─────────────────────────────────────────────

    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (rule) => rule.min(0).max(5),
    }),

    defineField({
      name: 'reviewCount',
      title: 'Review Count',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.integer().min(0),
    }),

    // ─────────────────────────────────────────────
    // Inventory
    // ─────────────────────────────────────────────

    defineField({
      name: 'stock',
      title: 'Total Stock',
      description:
        'Aggregate stock across all variants/colors',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.integer().min(0),
    }),

    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'lowStockThreshold',
      title: 'Low Stock Threshold',
      type: 'number',
      initialValue: 5,
      validation: (rule) => rule.integer().min(0),
    }),

    defineField({
      name: 'soldCount',
      title: 'Sold Count',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.integer().min(0),
    }),

    // ─────────────────────────────────────────────
    // Shipping
    // ─────────────────────────────────────────────

    defineField({
      name: 'freeShipping',
      title: 'Free Shipping',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'estimatedDelivery',
      title: 'Estimated Delivery',
      type: 'string',
    }),

    // ─────────────────────────────────────────────
    // SEO
    // ─────────────────────────────────────────────

    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      validation: (rule) => rule.max(70),
    }),

    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160),
    }),

    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        layout: 'tags',
      },
    }),

    // ─────────────────────────────────────────────
    // Dates
    // ─────────────────────────────────────────────

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'imageUrl',
      price: 'price',
      tag: 'tag',
      inStock: 'inStock',
    },

    prepare({ title, media, price, tag, inStock }) {
      const formattedPrice =
        typeof price === 'number'
          ? currencyFormatter.format(price)
          : 'No price'

      return {
        title,
        media,
        subtitle: `${formattedPrice} • ${
          tag ?? 'No tag'
        } • ${inStock ? 'In Stock' : 'Out of Stock'}`,
      }
    },
  },
})