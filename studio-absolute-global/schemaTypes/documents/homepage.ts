import {defineArrayMember, defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'

/**
 * Global singleton: site-wide hero content and client logos.
 */
export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'heroHeadline',
      type: 'string',
      description: 'Main hero heading. Line breaks become separate animated lines.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroEyebrow',
      type: 'string',
      description: 'Small text above the headline, e.g. "Absolute Global Outsourcing".',
    }),
    defineField({
      name: 'heroVideo',
      type: 'file',
      description: 'Background video (mp4). Falls back to heroImage if empty.',
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      options: {hotspot: true},
      description: 'Poster/fallback image for the hero background.',
    }),
    defineField({
      name: 'heroTagline',
      type: 'text',
      rows: 2,
      description: 'Supporting text at the bottom of the hero.',
    }),
    defineField({
      name: 'clients',
      title: 'Client logos',
      description: 'Shown in the "Trusted by Industry Leaders" section.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'clientLogo',
          fields: [
            defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'logo', type: 'image', options: {hotspot: true}}),
          ],
          preview: {select: {title: 'name', media: 'logo'}},
        }),
      ],
    }),
    defineField({name: 'seo', type: 'seo'}),
  ],
  preview: {
    select: {title: 'heroHeadline'},
    prepare: ({title}) => ({title: title || 'Homepage', subtitle: 'Singleton — hero & clients'}),
  },
})
