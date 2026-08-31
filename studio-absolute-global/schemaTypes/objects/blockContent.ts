import {defineField, defineType} from 'sanity'

/**
 * Portable Text editor configuration shared by posts, services and pages.
 */
export const blockContent = defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    defineField({type: 'block'}),
    defineField({
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        }),
      ],
    }),
  ],
})
