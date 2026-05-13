import { defineField, defineType } from 'sanity'

const validateLink = (value: string | undefined) => {
  if (!value) return true

  return /^(\/|https?:\/\/)/.test(value)
    ? true
    : 'Use an internal path like /shop or a full URL starting with http:// or https://.'
}

const validateHexColor = (value: string | undefined) => {
  if (!value) return 'Color is required.'

  return /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(value)
    ? true
    : 'Use a valid hex color such as #000000 or #fff.'
}

export default defineType({
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(160),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
      validation: (rule) => rule.custom(validateLink),
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      initialValue: '#000000',
      validation: (rule) => rule.required().custom(validateHexColor),
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      initialValue: '#ffffff',
      validation: (rule) => rule.required().custom(validateHexColor),
    }),
  ],
  preview: {
    select: {
      title: 'text',
      active: 'active',
    },
    prepare({ title, active }) {
      return {
        title,
        subtitle: active ? 'Active announcement' : 'Inactive announcement',
      }
    },
  },
})
