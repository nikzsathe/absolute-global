import {defineArrayMember, defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'

/**
 * Global singleton: contact details and social links used in the header/footer.
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({name: 'siteName', type: 'string', initialValue: 'Absolute Global Outsourcing'}),
    defineField({name: 'siteUrl', type: 'url', initialValue: 'https://absolute-global.com'}),
    defineField({name: 'contactEmail', type: 'string'}),
    defineField({name: 'contactPhone', type: 'string'}),
    defineField({
      name: 'address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platform',
              type: 'string',
              options: {
                list: ['Facebook', 'Instagram', 'LinkedIn', 'X', 'YouTube'],
                layout: 'radio',
              },
            }),
            defineField({name: 'url', type: 'url', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'platform', subtitle: 'url'}},
        }),
      ],
    }),
    defineField({
      name: 'ogImage',
      type: 'image',
      description: 'Default social sharing image when a page has none.',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Site Settings', subtitle: 'Singleton — contact & social'}),
  },
})
