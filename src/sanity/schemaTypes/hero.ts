import { defineArrayMember, defineField, defineType } from 'sanity'

const validateLink = (value: string | undefined) => {
  if (!value) return true

  return /^(\/|https?:\/\/)/.test(value)
    ? true
    : 'Use an internal path like /shop or a full URL starting with http:// or https://.'
}

const validateHexColor = (value: string | undefined) => {
  if (!value) return 'Accent color is required.'

  return /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(value)
    ? true
    : 'Use a valid hex color such as #c9a96e or #fff.'
}

const getCtaField = (parent: unknown, key: 'label' | 'href') => {
  if (!parent || typeof parent !== 'object') return undefined

  const value = (parent as Record<string, unknown>)[key]
  return typeof value === 'string' ? value : undefined
}

export default defineType({
  name: 'hero',
  title: 'Hero Slide',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(80),
    }),
    defineField({
      name: 'headline',
      title: 'Headline Lines',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.required().min(1).max(4),
      description: 'Add each line as a separate item to match the staggered headline animation.',
    }),
    defineField({
      name: 'subtext',
      title: 'Subtext',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: 'cta',
      title: 'Primary CTA',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          validation: (rule) => rule.required().max(40),
        }),
        defineField({
          name: 'href',
          title: 'Link',
          type: 'string',
          validation: (rule) => rule.required().custom(validateLink),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          validation: (rule) =>
            rule.custom((value, context) => {
              const href = getCtaField(context.parent, 'href')

              if (!href || value) return true

              return 'Secondary CTA label is required when a link is set.'
            }),
        }),
        defineField({
          name: 'href',
          title: 'Link',
          type: 'string',
          validation: (rule) =>
            rule.custom((value, context) => {
              const label = getCtaField(context.parent, 'label')

              if (label && !value) {
                return 'Secondary CTA link is required when a label is set.'
              }

              return validateLink(value)
            }),
        }),
      ],
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      validation: (rule) => rule.required().max(40),
      description: 'Short label such as New Arrival, Bestseller, or Limited Edition.',
    }),
    defineField({
      name: 'bg',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'product',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'productAlt',
      title: 'Product Image Alt Text',
      type: 'string',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (!context.document?.product || value) return true

          return 'Product image alt text is required when a product image is set.'
        }),
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      type: 'string',
      initialValue: '#c9a96e',
      validation: (rule) => rule.required().custom(validateHexColor),
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'eyebrow',
      subtitle: 'tag',
      media: 'bg',
      active: 'active',
    },
    prepare({ title, subtitle, media, active }) {
      return {
        title,
        subtitle: `${subtitle || 'Hero slide'}${active ? ' • Active' : ' • Inactive'}`,
        media,
      }
    },
  },
})
