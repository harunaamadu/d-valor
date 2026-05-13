import { type SchemaTypeDefinition } from 'sanity'
import announcement from './announcement'
import category from './category'
import collection from './collection'
import editorial from './editorial'
import hero from './hero'
import product from './product'
import siteSettings from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    announcement,
    category,
    collection,
    editorial,
    hero,
    product,
    siteSettings,
  ],
}
