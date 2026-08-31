import {defineArrayMember, defineField, defineType} from 'sanity'
import {BlockquoteIcon} from '@sanity/icons/Blockquote'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: BlockquoteIcon,
  fields: [
    defineField({
      name: 'quote',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().max(600),
    }),
    defineField({
      name: 'authorName',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authorTitle',
      type: 'string',
      description: 'e.g. "Marketing Director"',
    }),
    defineField({
      name: 'company',
      type: 'string',
    }),
    defineField({
      name: 'authorImage',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'companyLogo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      initialValue: false,
      description: 'Featured testimonials are prioritized on the homepage.',
    }),
    defineField({
      name: 'order',
      type: 'number',
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'authorName', subtitle: 'company', media: 'authorImage'},
  },
})
