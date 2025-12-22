import { defineField, defineType } from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Generic Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [
        { type: 'heroBlock' },
        { type: 'brandBlock' },
        { type: 'pillarsBlock' },
        { type: 'benefitsBlock' },
        { type: 'mediaTextBlock' },
        { type: 'imageBlock' },
        { type: 'videoBlock' },
        { type: 'testimonialBlock' },
        { type: 'teamBlock' },
        { type: 'richTextBlock' },
        { type: 'ctaBlock' },
      ],
    }),
  ],
})
