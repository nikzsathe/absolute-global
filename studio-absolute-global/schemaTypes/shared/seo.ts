import {defineField, defineType} from 'sanity'

/**
 * Reusable SEO metadata object. Embed per document with `type: 'seo'`.
 */
export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({
      name: 'title',
      title: 'Meta title',
      type: 'string',
      description: 'Falls back to the document title if empty. Recommended: max ~60 characters.',
    }),
    defineField({
      name: 'description',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'Recommended: 150–160 characters.',
    }),
    defineField({
      name: 'image',
      title: 'Social sharing image',
      type: 'image',
      options: {hotspot: true},
      description: 'Used for Open Graph / Twitter cards. Recommended: 1200×630px.',
    }),
  ],
})
