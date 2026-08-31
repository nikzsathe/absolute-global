import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          {title: 'Lead Generation', value: 'leadGeneration'},
          {title: 'Marketing', value: 'marketing'},
          {title: 'Consulting', value: 'consulting'},
          {title: 'Solutions', value: 'solutions'},
        ],
        layout: 'radio',
      },
      initialValue: 'leadGeneration',
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary used on cards and listings.',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'featuredImage',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
    defineField({
      name: 'ctaLabel',
      type: 'string',
      description: 'e.g. "Get Started", "Learn More"',
    }),
    defineField({
      name: 'ctaRoute',
      type: 'string',
      description: 'App route for the CTA, e.g. /b2b or /contact',
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Display order',
      description: 'Lower numbers appear first in listings.',
      initialValue: 100,
    }),
    defineField({name: 'seo', type: 'seo'}),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'featuredImage'},
  },
})
