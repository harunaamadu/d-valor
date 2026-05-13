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
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.max(1200),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.required().positive().precision(2),
    }),
    defineField({
      name: 'compareAtPrice',
      title: 'Compare-at Price',
      type: 'number',
      validation: (rule) =>
        rule.min(0).precision(2).custom((value, context) => {
          const price = context.document?.price

          if (typeof value !== 'number' || typeof price !== 'number') {
            return true
          }

          return value >= price || 'Compare-at price should be greater than or equal to the price.'
        }),
    }),
    defineField({
      name: 'images',
      title: 'Images',
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
              validation: (rule) => rule.required().max(160),
            }),
          ],
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'collections',
      title: 'Collections',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'collection' }],
        }),
      ],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        layout: 'tags',
      },
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'inventory',
      title: 'Inventory Quantity',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Out of Stock', value: 'out-of-stock' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      price: 'price',
      status: 'status',
    },
    prepare({ title, media, price, status }) {
      const formattedPrice =
        typeof price === 'number' ? currencyFormatter.format(price) : 'No price'
      const formattedStatus =
        typeof status === 'string'
          ? status
              .split('-')
              .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
              .join(' ')
          : 'No status'

      return {
        title,
        media,
        subtitle: `${formattedPrice} • ${formattedStatus}`,
      }
    },
  },
})
